"use client"

import { useState } from "react"
import { MapPin, SearchX } from "lucide-react"
import { ClinicCard } from "@/components/clinic-card"
import { ContactDetails } from "@/components/contact-details"
import type { Clinic } from "@/lib/clinics"

interface ClinicResultsProps {
  clinics: (Clinic & { distanceKm: number })[]
  locationName: string
  hasSearched: boolean
  isLoading: boolean
}

export function ClinicResults({ clinics, locationName, hasSearched, isLoading }: ClinicResultsProps) {
  const [selectedClinic, setSelectedClinic] = useState<(Clinic & { distanceKm: number }) | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  function handleViewContact(clinic: Clinic & { distanceKm: number }) {
    setSelectedClinic(clinic)
    setModalOpen(true)
  }

  function handleClose() {
    setModalOpen(false)
  }

  if (isLoading) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-8" aria-label="Loading results">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card rounded-3xl border border-border p-5 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="h-5 bg-muted rounded-xl w-3/5" />
                <div className="h-6 bg-muted rounded-full w-16" />
              </div>
              <div className="h-4 bg-muted rounded-xl w-4/5 mb-2" />
              <div className="h-4 bg-muted rounded-xl w-2/5 mb-5" />
              <div className="h-6 bg-muted rounded-full w-32 mb-4" />
              <div className="h-11 bg-muted rounded-2xl w-full mt-2" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (!hasSearched) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-16 text-center" aria-label="Search prompt">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 mb-4">
          <MapPin size={28} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Find clinics near you</h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
          Enter your Eircode above or use your current location to find GP practices accepting new
          patients within 15km.
        </p>
      </section>
    )
  }

  if (clinics.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-16 text-center" aria-label="No results">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-muted mb-4">
          <SearchX size={28} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">No clinics found nearby</h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
          We couldn&apos;t find any GP clinics within 15km of {locationName}. Try a different
          location or expand your search.
        </p>
      </section>
    )
  }

  return (
    <>
      <section className="max-w-4xl mx-auto px-4 py-6" aria-label="Clinic results">
        {/* Results header */}
        <div className="mb-5 flex items-center gap-2">
          <div className="flex-1">
            <h2 className="text-base font-semibold text-foreground">
              {clinics.length} clinic{clinics.length !== 1 ? "s" : ""} near {locationName}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sorted by distance · Within 15km
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} onViewContact={handleViewContact} />
          ))}
        </div>
      </section>

      <ContactDetails
        clinic={selectedClinic}
        open={modalOpen}
        onClose={handleClose}
      />
    </>
  )
}
