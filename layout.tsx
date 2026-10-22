import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'FinEdge Trade',
  description: 'Premium Full-Stack Trading Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 👇 THE UNBEATABLE FIX: FORCES CHROME TO LOAD THE REAL GATEWAY ENGINE NATIVELY ON EVERY SINGLE SCREEN */}
        <script src="https://razorpay.com" async></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
