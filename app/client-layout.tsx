// 📂 app/client-layout.tsx

"use client"

import type React from "react"
import { Suspense, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/main-header"
import { Footer } from "@/components/main-footer"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    if (isHomePage) {
      // 홈페이지: 스크롤 완전히 숨김
      body.style.overflow = "hidden"
      html.style.overflow = "hidden"
    } else {
      // 다른 페이지: 스크롤바 공간 확보
      body.style.overflow = ""
      html.style.overflow = ""
      html.style.scrollbarGutter = "stable"
    }

    return () => {
      body.style.overflow = ""
      html.style.overflow = ""
      html.style.scrollbarGutter = ""
    }
  }, [isHomePage])

  return (
    <Suspense>
      <Header />
      <main>{children}</main>
      {!isHomePage && <Footer />}
      <Toaster />
      <Sonner />
    </Suspense>
  )
}