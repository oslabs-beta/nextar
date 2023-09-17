export const metadata = {
  title: 'Nextar | Server Side Network Activity',
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
