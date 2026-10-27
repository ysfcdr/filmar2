import './globals.css';

export const metadata = {
  title: 'Film Sitem',
  description: 'Film Scraper App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
