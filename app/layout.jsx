import './globals.css'
import Navigation from '@components/Navigation.jsx'

export const metadata = {
  title: 'GLOBAL CITIZEN',
  description: 'Demo application for Nextar',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;