import TokenExpireHandler from "@/components/TokenExpireHandler";
import Providers from "@/lib/Provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoimPod: 취미 모임 플랫폼",
  description: "취미 모임 플랫폼",
  icons: "/images/icon.svg",
};

const pretendard = localFont({
  src: "../../public/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} bg-gray-100 font-pretendard`}>
        <Providers>
          <TokenExpireHandler />
          <div>
            <main className="flex flex-col">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
