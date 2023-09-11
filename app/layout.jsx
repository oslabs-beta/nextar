import './globals.css'
import Navigation from '@components/Navigation.jsx'
import { WebVitals } from '@components/Web-Vitals'

export const metadata = {
  title: 'GLOBAL CITIZEN',
  description: 'Demo application for Nextar',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>
          <WebVitals />
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;