import { Poppins } from 'next/font/google';
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxProvider from '@/utils/ReduxProvider';




const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700'], // Choose weights you need
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Podcast App',
  description: 'podcast',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <ReduxProvider>
          <Toaster position="top-right" />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
