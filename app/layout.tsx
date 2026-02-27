export const metadata = {
  title: 'FCP Digital — AI Receptionist for Service Businesses',
  description: 'AI-powered call answering for plumbers, HVAC, electricians, and service businesses. 24/7 availability. Setup in 24 hours.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; background: #060606; }
          a { color: inherit; }
          input, button, select, textarea { font-family: monospace; }
        ` }} />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#060606' }}>
        {children}
      </body>
    </html>
  )
}
