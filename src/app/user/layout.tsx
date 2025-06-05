import '../globals.css'

export const metadata = {
  title: 'TapTag',
  description: 'Instant digital portfolio sharing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-neutral-700 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
