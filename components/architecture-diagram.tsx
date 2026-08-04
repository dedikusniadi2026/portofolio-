"use client"

import { ArrowDown } from "lucide-react"

export interface ArchLayer {
  label: string
  items: string[]
}

interface ArchitectureDiagramProps {
  layers: ArchLayer[]
  caption?: string
}

export function ArchitectureDiagram({ layers, caption }: ArchitectureDiagramProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          System Architecture
        </span>
      </div>

      <div className="flex flex-col">
        {layers.map((layer, i) => (
          <div key={layer.label}>
            {i > 0 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
              </div>
            )}
            <div className="arch-node flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <span className="arch-label">{layer.label}</span>
              <span className="text-xs leading-relaxed text-muted-foreground md:text-right">
                {layer.items.join("  ·  ")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {caption && (
        <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  )
}
