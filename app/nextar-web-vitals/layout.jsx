export const metadata = {
    title: 'Nextar | Web Vitals Dashboards',
    description: 'Demo application for Nextar',
  };
  
  const RootLayout = ({ children }) => {
    return (
      <html lang='en'>
        <body>
          <main>{children}</main>
        </body>
      </html>
    );
  };
  
  export default RootLayout;
  