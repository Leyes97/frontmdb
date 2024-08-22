import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { StoreProvider } from './store/StoreProvider';

// components
import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrainsMono',
});

export const metadata = {
  title: 'TMDB-LEY',
  description: 'TMDB-API',
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={jetbrainsMono.variable}>
          <Header />
          <PageTransition>{children}</PageTransition>
        </body>
      </html>
    </StoreProvider>
  );
}
