"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function FloatingHireButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 400)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <a href="mailto:dedikusniadi.bisnis@gmail.com">
        <Button size="lg" className="rounded-full shadow-lg transition-transform hover:scale-105">
          <MessageCircle className="mr-2 h-4 w-4" />
          Hire Me
        </Button>
      </a>
    </div>
  )
}
