import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import ClientLayout from "./client-layout"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Shield Hub - 파일 보호와 웹 보안 통합 플랫폼",
  description: "파일 암호화부터 웹사이트 보안 검사까지, 하나의 솔루션으로",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
