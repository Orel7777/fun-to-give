import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import "./fonts/almoni.css";
import "./fonts/quicksand.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "כיף לתת",
  description: "אפליקציית כיף לתת",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${playfair.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
