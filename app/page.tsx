"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ClinicResults } from "@/components/clinic-results"
import type { Clinic } from "@/lib/clinics"

export default function Home() {
  const [clinics, setClinics] = useState<(Clinic & { distanceKm: number })[]>([])
  const [locationName, setLocationName] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleResults(results: (Clinic & { distanceKm: number })[], name: string) {
    setClinics(results)
    setLocationName(name)
    setHasSearched(true)
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header onResults={handleResults} onLoading={setIsLoading} />
      <main>
        <ClinicResults
          clinics={clinics}
          locationName={locationName}
          hasSearched={hasSearched}
          isLoading={isLoading}
        />
      </main>
      <footer className="max-w-4xl mx-auto px-4 py-8 mt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          CuramConnect helps patients in Ireland find GP practices near them.
          <br />
          Clinic information is for reference only — please contact your chosen clinic directly to confirm availability.
        </p>
      </footer>
    </div>
  )
}
