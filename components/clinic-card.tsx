"use client"

import { MapPin, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Clinic } from "@/lib/clinics"

interface ClinicCardProps {
  clinic: Clinic & { distanceKm: number }
  onViewContact: (clinic: Clinic & { distanceKm: number }) => void
}

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`
  return `${km.toFixed(1)} km`
}

function AcceptingBadge({ status }: { status: Clinic["acceptingPatients"] }) {
  if (status === "yes") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
        Accepting patients
      </span>
    )
  }
  if (status === "no") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
        Not accepting patients
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
      <HelpCircle size={11} />
      Status unknown
    </span>
  )
}

export function ClinicCard({ clinic, onViewContact }: ClinicCardProps) {
  return (
    <article className="bg-card rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
      <div className="p-5 flex-1">
        {/* Title row with distance chip */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-base font-semibold text-foreground leading-snug text-balance">
            {clinic.name}
          </h2>
          <span
            className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{
              background: "var(--distance-chip-bg)",
              color: "var(--distance-chip-text)",
            }}
            aria-label={`${formatDistance(clinic.distanceKm)} away`}
          >
            <MapPin size={10} />
            {formatDistance(clinic.distanceKm)}
          </span>
        </div>

        {/* Address */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {clinic.address}, {clinic.town}
          <br />
          <span className="font-mono text-xs tracking-widest">{clinic.eircode}</span>
        </p>

        {/* Accepting status */}
        <AcceptingBadge status={clinic.acceptingPatients} />
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 pt-0">
        <Button
          onClick={() => onViewContact(clinic)}
          className="w-full rounded-2xl h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm transition-all"
        >
          View contact details
        </Button>
      </div>
    </article>
  )
}
