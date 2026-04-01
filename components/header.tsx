"use client"

import { useState, useRef } from "react"
import { MapPin, Search, Loader2, LocateFixed, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { validateEircode, getLocationFromEircode, getClinicsNearLocation } from "@/lib/clinics"
import type { Clinic } from "@/lib/clinics"

interface HeaderProps {
  onResults: (clinics: (Clinic & { distanceKm: number })[], locationName: string) => void
  onLoading: (loading: boolean) => void
}

type InputState = "idle" | "valid" | "invalid"

export function Header({ onResults, onLoading }: HeaderProps) {
  const [eircode, setEircode] = useState("")
  const [inputState, setInputState] = useState<InputState>("idle")
  const [isSearching, setIsSearching] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function handleEircodeChange(value: string) {
    // Auto-format: insert space after 3rd char
    const cleaned = value.replace(/\s/g, "").toUpperCase().slice(0, 7)
    const formatted = cleaned.length > 3 ? `${cleaned.slice(0, 3)} ${cleaned.slice(3)}` : cleaned
    setEircode(formatted)
    setErrorMessage("")

    if (cleaned.length === 7) {
      if (validateEircode(cleaned)) {
        setInputState("valid")
      } else {
        setInputState("invalid")
      }
    } else {
      setInputState("idle")
    }
  }

  async function handleSearch() {
    const cleaned = eircode.replace(/\s/g, "").toUpperCase()
    if (!validateEircode(cleaned)) {
      setInputState("invalid")
      setErrorMessage("Please enter a valid Irish Eircode (e.g. D09 X3F2)")
      inputRef.current?.focus()
      return
    }

    const location = getLocationFromEircode(cleaned)
    if (!location) {
      setInputState("invalid")
      setErrorMessage("We couldn't recognise that Eircode routing key. Please try again.")
      return
    }

    setIsSearching(true)
    onLoading(true)
    // Simulate brief async lookup
    await new Promise((r) => setTimeout(r, 600))
    const results = getClinicsNearLocation(location.lat, location.lng)
    onResults(results, location.name)
    setIsSearching(false)
    onLoading(false)
  }

  async function handleUseLocation() {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser.")
      return
    }
    setIsLocating(true)
    onLoading(true)
    setErrorMessage("")

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        await new Promise((r) => setTimeout(r, 400))
        const results = getClinicsNearLocation(latitude, longitude)
        onResults(results, "your current location")
        setIsLocating(false)
        onLoading(false)
      },
      () => {
        setErrorMessage("Unable to retrieve your location. Please check your browser permissions.")
        setIsLocating(false)
        onLoading(false)
      }
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <header className="bg-[var(--header-bg)] text-white">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Logo row */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="white"
                opacity="0.9"
              />
              <circle cx="12" cy="9" r="2.5" fill="var(--header-bg)" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-semibold tracking-tight text-white">CuramConnect</span>
            <p className="text-xs text-white/60 leading-none mt-0.5">Find a GP near you</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-balance leading-tight mb-2">
            Find a GP clinic near you
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Enter your Eircode to discover GP practices within 15km of your location.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                size={16}
              />
              <Input
                ref={inputRef}
                value={eircode}
                onChange={(e) => handleEircodeChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. D09 X3F2"
                maxLength={8}
                aria-label="Enter your Eircode"
                className={[
                  "pl-9 h-12 rounded-2xl bg-white/10 border text-white placeholder:text-white/40",
                  "focus-visible:ring-white/30 focus-visible:ring-2 focus-visible:border-white/40",
                  "text-base font-medium tracking-widest uppercase",
                  inputState === "invalid"
                    ? "border-red-400/60 bg-red-500/10"
                    : inputState === "valid"
                      ? "border-green-400/60"
                      : "border-white/20",
                ].join(" ")}
              />
              {inputState === "valid" && (
                <CheckCircle2
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-400 pointer-events-none"
                  size={16}
                />
              )}
              {inputState === "invalid" && (
                <AlertCircle
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-400 pointer-events-none"
                  size={16}
                />
              )}
            </div>
            <Button
              onClick={handleSearch}
              disabled={isSearching || isLocating}
              className="h-12 px-5 rounded-2xl bg-white text-[var(--header-bg)] hover:bg-white/90 font-semibold shrink-0 transition-all"
              aria-label="Search clinics"
            >
              {isSearching ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              <span className="hidden sm:inline ml-2">Search</span>
            </Button>
          </div>

          {/* Error message */}
          {errorMessage && (
            <p className="text-red-300 text-xs flex items-center gap-1.5 px-1" role="alert">
              <AlertCircle size={13} />
              {errorMessage}
            </p>
          )}

          {/* Use current location */}
          <button
            onClick={handleUseLocation}
            disabled={isLocating || isSearching}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors w-fit group"
            aria-label="Use my current location"
          >
            {isLocating ? (
              <Loader2 size={14} className="animate-spin text-white/60" />
            ) : (
              <LocateFixed size={14} className="group-hover:text-white transition-colors" />
            )}
            <span className="underline underline-offset-2 decoration-white/30 group-hover:decoration-white/70 transition-all">
              {isLocating ? "Detecting your location…" : "Use my current location"}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
