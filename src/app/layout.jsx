// Root layout: loads global styles, wraps app with store + navbar + footer
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import StoreProvider from '@/components/layout/StoreProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: { default: 'FaizMart — Modern Online Store', template: '%s | FaizMart' },
  description: 'Shop electronics, fashion, home décor and more at unbeatable prices.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          <main style={{ minHeight: '65vh' }}>{children}</main>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={2200} theme="light" />
        </StoreProvider>
      </body>
    </html>
  );
}
