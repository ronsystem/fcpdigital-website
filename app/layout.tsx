export const metadata = {
  title: 'FCP Digital — AI Receptionist for Service Businesses',
  description: 'AI-powered call answering for plumbers, HVAC, electricians, and service businesses. Never miss a call again.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; background: #060606; }
          a { color: inherit; }
          input, button, select, textarea { font-family: monospace; }
          @media (max-width: 768px) {
            input, button, select, textarea { font-size: 16px; }
          }
        `}} />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#060606' }}>
        {children}
      </body>
    </html>
  )
}
