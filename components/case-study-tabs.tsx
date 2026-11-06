"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface CaseStudyTab {
  value: string
  label: string
  anchorId: string
  children: ReactNode
}

export function CaseStudyTabs({ tabs }: { tabs: CaseStudyTab[] }) {
  const [active, setActive] = useState(tabs[0]?.value ?? "")

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1)
      const match = tabs.find((tab) => tab.anchorId === hash)
      if (match) setActive(match.value)
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [tabs])

  return (
    <Tabs value={active} onValueChange={setActive} className="mt-5 gap-0">
      <TabsList className="cs-tabs h-auto w-full justify-start gap-1.5 rounded-none bg-transparent p-0">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="cs-tab">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          forceMount
          hidden={active !== tab.value}
          id={tab.anchorId}
          className="cs-panel mt-5 scroll-mt-28"
        >
          {tab.children}
        </TabsContent>
      ))}
    </Tabs>
  )
}
