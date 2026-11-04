"use client"

import { Boxes, Database, Globe, Layers, MonitorSmartphone, Network } from "lucide-react"

export interface ArchLayer {
  label: string
  items: string[]
}

interface ArchitectureDiagramProps {
  layers: ArchLayer[]
  caption?: string
}

function iconFor(label: string) {
  const l = label.toLowerCase()
  if (l.includes("edge")) return Globe
  if (l.includes("client")) return MonitorSmartphone
  if (l.includes("gateway")) return Network
  if (l.includes("service")) return Boxes
  if (l.includes("data")) return Database
  return Layers
}

export function ArchitectureDiagram({ layers, caption }: ArchitectureDiagramProps) {
  return (
    <div className="arch-wrap">
      <div className="mb-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            System Architecture
          </span>
        </div>
        <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
          {layers.length} layers
        </span>
      </div>

      <div className="relative pl-10">
        <span className="arch-rail" aria-hidden />
        <div className="space-y-3">
          {layers.map((layer, i) => {
            const Icon = iconFor(layer.label)
            return (
              <div key={layer.label} className="group relative">
                <span className="arch-step">{i + 1}</span>
                <div className="arch-node flex items-center gap-3.5">
                  <span className="arch-icon">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="arch-label">{layer.label}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {layer.items.map((item) => (
                        <span key={item} className="arch-chip">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {caption && (
        <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  )
}
