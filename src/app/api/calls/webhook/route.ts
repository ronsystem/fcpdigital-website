import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * POST /api/calls/webhook
 *
 * Receives call data from Vapi webhook and stores it in Supabase
 * This endpoint is called by Vapi after each call completes
 *
 * Configure in Vapi dashboard:
 * - Call End Webhook: https://fcpdigital.com/api/calls/webhook
 * - Method: POST
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

interface VapiCallData {
  call: {
    id: string
    phoneNumber: string
    endedReason: string
    duration?: number
    analysis?: {
      summary?: string
      extractedData?: {
        [key: string]: string
      }
    }
    messages?: Array<{
      role: 'user' | 'assistant'
      content: string
    }>
  }
  assistant: {
    id: string
    name?: string
  }
}

function parseUrgency(summary: string): 'low' | 'medium' | 'high' | 'urgent' {
  const lowerSummary = summary.toLowerCase()

  if (
    lowerSummary.includes('emergency') ||
    lowerSummary.includes('urgent') ||
    lowerSummary.includes('critical') ||
    lowerSummary.includes('immediately')
  ) {
    return 'urgent'
  }

  if (
    lowerSummary.includes('important') ||
    lowerSummary.includes('high priority') ||
    lowerSummary.includes('asap')
  ) {
    return 'high'
  }

  if (
    lowerSummary.includes('medium') ||
    lowerSummary.includes('soon') ||
    lowerSummary.includes('this week')
  ) {
    return 'medium'
  }

  return 'low'
}

function extractServiceNeeded(summary: string, extractedData?: Record<string, string>): string {
  // Try extracted data first
  if (extractedData?.serviceType) {
    return extractedData.serviceType
  }
  if (extractedData?.service) {
    return extractedData.service
  }

  // Fall back to parsing summary
  const lowerSummary = summary.toLowerCase()

  if (lowerSummary.includes('plumb')) return 'Plumbing Service'
  if (lowerSummary.includes('hvac') || lowerSummary.includes('heating')) return 'HVAC Service'
  if (lowerSummary.includes('electric')) return 'Electrical Service'
  if (lowerSummary.includes('appointment')) return 'Appointment Scheduling'
  if (lowerSummary.includes('quote') || lowerSummary.includes('estimate')) return 'Quote Request'
  if (lowerSummary.includes('emergency')) return 'Emergency Service'
  if (lowerSummary.includes('maintenance')) return 'Maintenance Service'
  if (lowerSummary.includes('repair')) return 'Repair Service'
  if (lowerSummary.includes('inspection')) return 'Inspection Service'

  return 'Service Inquiry'
}

function extractCallerName(summary: string, extractedData?: Record<string, string>): string | null {
  if (extractedData?.callerName) {
    return extractedData.callerName
  }
  if (extractedData?.name) {
    return extractedData.name
  }

  // Try to extract from summary (very basic)
  const nameMatch = summary.match(/(?:caller named|name is|i'm|this is)\s+([A-Z][a-z]+)/i)
  if (nameMatch) {
    return nameMatch[1]
  }

  return null
}

export async function POST(req: NextRequest) {
  try {
    const body: VapiCallData = await req.json()

    // Validate webhook structure
    if (!body.call || !body.assistant) {
      return NextResponse.json(
        { error: 'Invalid webhook payload structure' },
        { status: 400 }
      )
    }

    const {
      call: {
        id: callId,
        phoneNumber,
        duration = 0,
        analysis = {},
      },
      assistant: {
        id: assistantId,
      }
    } = body

    const summary = analysis?.summary || ''
    const extractedData = analysis?.extractedData

    // Find the client by matching Vapi assistant ID
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('vapi_assistant_id', assistantId)
      .single()

    if (clientError || !client) {
      console.error('Client not found for assistant:', assistantId, clientError)
      return NextResponse.json(
        { error: 'Client not found for this assistant' },
        { status: 404 }
      )
    }

    // Prepare call record
    const callerName = extractCallerName(summary, extractedData)
    const urgency = parseUrgency(summary)
    const serviceNeeded = extractServiceNeeded(summary, extractedData)
    const durationSeconds = Math.floor(duration)

    // Insert call record
    const { error: insertError } = await supabase
      .from('calls')
      .insert({
        client_id: client.id,
        caller_name: callerName,
        caller_phone: phoneNumber,
        service_needed: serviceNeeded,
        urgency: urgency,
        duration_seconds: durationSeconds,
        transcript: summary || null,
        created_at: new Date().toISOString(),
        metadata: {
          vapi_call_id: callId,
          vapi_assistant_id: assistantId,
          extracted_data: extractedData,
        }
      })

    if (insertError) {
      console.error('Error inserting call:', insertError)
      return NextResponse.json(
        { error: 'Failed to insert call record' },
        { status: 500 }
      )
    }

    // Update usage tracking
    const today = new Date().toISOString().split('T')[0]
    const callMinutes = Math.ceil(durationSeconds / 60)

    const { data: todayUsage, error: usageSelectError } = await supabase
      .from('usage_tracking')
      .select('id, calls_count, call_minutes')
      .eq('client_id', client.id)
      .eq('date', today)
      .single()

    if (!usageSelectError && todayUsage) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('usage_tracking')
        .update({
          calls_count: (todayUsage.calls_count || 0) + 1,
          call_minutes: (todayUsage.call_minutes || 0) + callMinutes,
        })
        .eq('id', todayUsage.id)

      if (updateError) {
        console.error('Error updating usage:', updateError)
      }
    } else {
      // Create new record
      const { error: insertUsageError } = await supabase
        .from('usage_tracking')
        .insert({
          client_id: client.id,
          date: today,
          calls_count: 1,
          call_minutes: callMinutes,
          emails_sent: 0,
        })

      if (insertUsageError) {
        console.error('Error inserting usage:', insertUsageError)
      }
    }

    // Update client's total minutes used
    const { data: currentClient, error: currentClientError } = await supabase
      .from('clients')
      .select('call_minutes_used')
      .eq('id', client.id)
      .single()

    if (!currentClientError && currentClient) {
      const { error: updateClientError } = await supabase
        .from('clients')
        .update({
          call_minutes_used: (currentClient.call_minutes_used || 0) + callMinutes,
        })
        .eq('id', client.id)

      if (updateClientError) {
        console.error('Error updating client minutes:', updateClientError)
      }
    }

    // Log to audit trail (fire and forget)
    supabase
      .from('audit_log')
      .insert({
        user_type: 'system',
        action: 'create',
        resource_type: 'call',
        resource_id: callId,
        success: true,
        metadata: {
          caller_phone: phoneNumber,
          service_needed: serviceNeeded,
          duration: durationSeconds,
          urgency: urgency,
        }
      })
      .then(result => {
        if (result.error) {
          console.error('Error logging to audit trail:', result.error)
        }
      })

    return NextResponse.json({
      success: true,
      callId: callId,
      clientId: client.id,
      durationSeconds: durationSeconds,
      callMinutes: callMinutes,
    })
  } catch (error) {
    console.error('Webhook processing error:', error)

    // Log the error for debugging
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    console.error('Webhook error details:', errorMsg)

    return NextResponse.json(
      {
        error: 'Webhook processing failed',
        details: errorMsg,
      },
      { status: 500 }
    )
  }
}
