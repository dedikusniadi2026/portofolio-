"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function FloatingHireButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <a href="mailto:dedikusniadi.bisnis@gmail.com">
        <Button
          size="lg"
          className="rounded-full bg-gradient-to-r from-primary to-accent hover:scale-110 transition-all duration-300 animate-bounce shadow-2xl"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Hire Me
        </Button>
      </a>
    </div>
  )
}
