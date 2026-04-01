"use client"

import { useState, useCallback } from "react"
import {
  Phone,
  Mail,
  MapPin,
  Copy,
  Check,
  PhoneCall,
  Share2,
  HelpCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Clinic } from "@/lib/clinics"

interface ContactDetailsProps {
  clinic: (Clinic & { distanceKm: number }) | null
  open: boolean
  onClose: () => void
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

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea")
      ta.value = value
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [value])

  return (
    <button
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className="w-8 h-8 flex items-center justify-center rounded-xl bg-muted hover:bg-secondary text-muted-foreground hover:text-foreground transition-all shrink-0"
    >
      {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
    </button>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/60 border border-border">
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block">
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-foreground truncate">{value}</p>
        )}
      </div>
      <CopyButton value={value} label={label} />
    </div>
  )
}

function ClinicDetailsContent({ clinic, onClose }: { clinic: Clinic & { distanceKm: number }; onClose: () => void }) {
  const handleShare = useCallback(async () => {
    const text = `${clinic.name}\n${clinic.address}, ${clinic.town}\nPhone: ${clinic.phone}\nEmail: ${clinic.email}`
    if (navigator.share) {
      try {
        await navigator.share({ title: clinic.name, text })
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(text)
    }
  }, [clinic])

  return (
    <div className="flex flex-col gap-0">
      {/* Clinic info header */}
      <div className="p-5 sm:p-6 border-b border-border">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="text-lg font-bold text-foreground leading-snug text-balance">
              {clinic.name}
            </h2>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
              <MapPin size={13} />
              <span>
                {clinic.address}, {clinic.town}
              </span>
            </div>
            <p className="font-mono text-xs tracking-widest text-muted-foreground mt-0.5 ml-[18px]">
              {clinic.eircode}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0"
              style={{
                background: "var(--distance-chip-bg)",
                color: "var(--distance-chip-text)",
              }}
            >
              <MapPin size={10} />
              {formatDistance(clinic.distanceKm)}
            </span>
            <AcceptingBadge status={clinic.acceptingPatients} />
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div className="p-5 sm:p-6 flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          Contact Details
        </h3>
        <ContactRow
          icon={<Phone size={15} />}
          label="Phone"
          value={clinic.phone}
          href={`tel:${clinic.phone.replace(/\s/g, "")}`}
        />
        <ContactRow
          icon={<Mail size={15} />}
          label="Email"
          value={clinic.email}
          href={`mailto:${clinic.email}`}
        />
      </div>

      {/* Action buttons */}
      <div className="px-5 sm:px-6 pb-6 flex items-center gap-2">
        <Button
          asChild
          className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm"
        >
          <a href={`tel:${clinic.phone.replace(/\s/g, "")}`}>
            <PhoneCall size={16} className="mr-2" />
            Call the clinic
          </a>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleShare}
          aria-label="Share this clinic"
          className="h-12 w-12 rounded-2xl border-border shrink-0"
        >
          <Share2 size={16} />
        </Button>
      </div>
    </div>
  )
}

export function ContactDetails({ clinic, open, onClose }: ContactDetailsProps) {
  const isMobile = useIsMobile()

  if (!clinic) return null

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
        <DrawerContent className="rounded-t-3xl border-t border-border">
          <DrawerTitle className="sr-only">{clinic.name} contact details</DrawerTitle>
          <ClinicDetailsContent clinic={clinic} onClose={onClose} />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="rounded-3xl border-border p-0 max-w-md overflow-hidden shadow-xl gap-0"
      >
        <DialogTitle className="sr-only">{clinic.name} contact details</DialogTitle>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-secondary text-muted-foreground hover:text-foreground transition-all z-10"
        >
          <X size={15} />
        </button>
        <ClinicDetailsContent clinic={clinic} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}
