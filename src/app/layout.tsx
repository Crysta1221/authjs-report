import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "@/assets/css/style.scss";
import { ThemeProvider } from "@/components/theme/provider";
import { AuthProvider } from "@/components/oauth/auth_provider";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
  variable: "--font-noto-sans-jp",
  display: "swap",
  fallback: ["Hiragino Sans", "Hiragino Kaku Gothic ProN", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#43af12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' suppressHydrationWarning={true}>
      <body className={noto.variable}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const runtime = "edge";
