export interface Clinic {
  id: string
  name: string
  address: string
  town: string
  county: string
  eircode: string
  phone: string
  email: string
  acceptingPatients: "yes" | "no" | "unknown"
  lat: number
  lng: number
}

export const CLINICS: Clinic[] = [
  {
    id: "1",
    name: "Glasnevin Medical Centre",
    address: "12 Botanic Road",
    town: "Glasnevin, Dublin 9",
    county: "Dublin",
    eircode: "D09 X3F2",
    phone: "+353 1 837 4521",
    email: "info@glasnevinmedical.ie",
    acceptingPatients: "unknown",
    lat: 53.3698,
    lng: -6.2703,
  },
  {
    id: "2",
    name: "Drumcondra Family Practice",
    address: "45 Drumcondra Road Upper",
    town: "Drumcondra, Dublin 9",
    county: "Dublin",
    eircode: "D09 A4K1",
    phone: "+353 1 837 0912",
    email: "reception@drumcondrafp.ie",
    acceptingPatients: "unknown",
    lat: 53.3651,
    lng: -6.2622,
  },
  {
    id: "3",
    name: "Phibsborough Health Clinic",
    address: "3 North Circular Road",
    town: "Phibsborough, Dublin 7",
    county: "Dublin",
    eircode: "D07 Y8R3",
    phone: "+353 1 868 2244",
    email: "hello@phibsboroughhealth.ie",
    acceptingPatients: "unknown",
    lat: 53.362,
    lng: -6.281,
  },
  {
    id: "4",
    name: "Cabra GP Surgery",
    address: "88 Cabra Road",
    town: "Cabra, Dublin 7",
    county: "Dublin",
    eircode: "D07 N2P8",
    phone: "+353 1 838 5500",
    email: "appointments@cabragp.ie",
    acceptingPatients: "unknown",
    lat: 53.3661,
    lng: -6.2966,
  },
  {
    id: "5",
    name: "Finglas Medical Centre",
    address: "22 Finglas Road",
    town: "Finglas, Dublin 11",
    county: "Dublin",
    eircode: "D11 FK82",
    phone: "+353 1 834 6101",
    email: "info@finglasmedical.ie",
    acceptingPatients: "unknown",
    lat: 53.3887,
    lng: -6.3005,
  },
  {
    id: "6",
    name: "Artane Primary Care",
    address: "5 Collins Avenue",
    town: "Artane, Dublin 5",
    county: "Dublin",
    eircode: "D05 C7W4",
    phone: "+353 1 851 3377",
    email: "care@artaneprimarycare.ie",
    acceptingPatients: "unknown",
    lat: 53.3797,
    lng: -6.2271,
  },
  {
    id: "7",
    name: "Clontarf Family Doctors",
    address: "31 Vernon Avenue",
    town: "Clontarf, Dublin 3",
    county: "Dublin",
    eircode: "D03 AH59",
    phone: "+353 1 833 0055",
    email: "reception@clontarfdoctors.ie",
    acceptingPatients: "unknown",
    lat: 53.3639,
    lng: -6.2076,
  },
  {
    id: "8",
    name: "Raheny Health Practice",
    address: "14 Station Road",
    town: "Raheny, Dublin 5",
    county: "Dublin",
    eircode: "D05 XE22",
    phone: "+353 1 831 4488",
    email: "info@rahenyhealth.ie",
    acceptingPatients: "unknown",
    lat: 53.3738,
    lng: -6.1936,
  },
]

// Irish Eircode routing key to approximate lat/lng
const EIRCODE_ROUTING_KEYS: Record<string, { lat: number; lng: number; name: string }> = {
  D01: { lat: 53.3441, lng: -6.2675, name: "Dublin 1" },
  D02: { lat: 53.3399, lng: -6.2591, name: "Dublin 2" },
  D03: { lat: 53.358, lng: -6.2147, name: "Dublin 3" },
  D04: { lat: 53.3259, lng: -6.2271, name: "Dublin 4" },
  D05: { lat: 53.374, lng: -6.2193, name: "Dublin 5" },
  D06: { lat: 53.333, lng: -6.2752, name: "Dublin 6" },
  D07: { lat: 53.3598, lng: -6.2849, name: "Dublin 7" },
  D08: { lat: 53.3362, lng: -6.2959, name: "Dublin 8" },
  D09: { lat: 53.3665, lng: -6.2558, name: "Dublin 9" },
  D10: { lat: 53.3273, lng: -6.3271, name: "Dublin 10" },
  D11: { lat: 53.389, lng: -6.2972, name: "Dublin 11" },
  D12: { lat: 53.3133, lng: -6.3068, name: "Dublin 12" },
  D13: { lat: 53.3859, lng: -6.2103, name: "Dublin 13" },
  D14: { lat: 53.2997, lng: -6.2641, name: "Dublin 14" },
  D15: { lat: 53.3946, lng: -6.3538, name: "Dublin 15" },
  D16: { lat: 53.2875, lng: -6.2951, name: "Dublin 16" },
  D17: { lat: 53.3501, lng: -6.1755, name: "Dublin 17" },
  D18: { lat: 53.2825, lng: -6.2125, name: "Dublin 18" },
  D20: { lat: 53.3198, lng: -6.3648, name: "Dublin 20" },
  D22: { lat: 53.3263, lng: -6.3935, name: "Dublin 22" },
  D24: { lat: 53.2949, lng: -6.3857, name: "Dublin 24" },
  A41: { lat: 53.5221, lng: -6.2426, name: "Swords, Co. Dublin" },
  A42: { lat: 53.4939, lng: -6.1017, name: "Malahide, Co. Dublin" },
  A45: { lat: 53.5097, lng: -6.4536, name: "Balbriggan, Co. Dublin" },
  A63: { lat: 53.2857, lng: -6.1251, name: "Bray, Co. Wicklow" },
  A67: { lat: 53.1484, lng: -6.0567, name: "Wicklow Town" },
  A84: { lat: 53.3951, lng: -6.5704, name: "Maynooth, Co. Kildare" },
  A86: { lat: 53.3331, lng: -6.5917, name: "Celbridge, Co. Kildare" },
  A96: { lat: 53.2726, lng: -6.1353, name: "Greystones, Co. Wicklow" },
  A98: { lat: 53.1399, lng: -6.3587, name: "Blessington, Co. Wicklow" },
  C15: { lat: 53.7521, lng: -6.3539, name: "Drogheda, Co. Louth" },
  K32: { lat: 53.4613, lng: -6.2985, name: "Blanchardstown" },
  K34: { lat: 53.4351, lng: -6.3501, name: "Castleknock" },
  K36: { lat: 53.4099, lng: -6.3817, name: "Lucan" },
  K45: { lat: 53.2859, lng: -6.4735, name: "Naas, Co. Kildare" },
  K56: { lat: 53.3477, lng: -6.4447, name: "Clondalkin" },
  K67: { lat: 53.2953, lng: -6.1356, name: "Shankill, Co. Dublin" },
  K78: { lat: 53.3243, lng: -6.4416, name: "Tallaght" },
  W91: { lat: 52.2593, lng: -7.1101, name: "Waterford City" },
  T12: { lat: 51.8985, lng: -8.4756, name: "Cork City" },
  T23: { lat: 51.8987, lng: -8.4738, name: "Cork South" },
  V94: { lat: 52.6638, lng: -8.6267, name: "Limerick City" },
  H91: { lat: 53.274, lng: -9.0488, name: "Galway City" },
  F91: { lat: 54.2766, lng: -8.4761, name: "Sligo Town" },
  E91: { lat: 53.7798, lng: -7.7992, name: "Longford Town" },
  N37: { lat: 53.5228, lng: -7.3397, name: "Mullingar, Co. Westmeath" },
  R21: { lat: 52.3317, lng: -6.4637, name: "Wexford Town" },
}

export function getLocationFromEircode(eircode: string): { lat: number; lng: number; name: string } | null {
  const cleaned = eircode.replace(/\s/g, "").toUpperCase()
  const routing = cleaned.slice(0, 3)
  return EIRCODE_ROUTING_KEYS[routing] ?? null
}

export function validateEircode(eircode: string): boolean {
  // Irish Eircode: A12 BC3D format — routing key (letter + 2 digits) + space + 4 alphanumeric
  const cleaned = eircode.replace(/\s/g, "").toUpperCase()
  return /^[A-Z]\d{2}[A-Z0-9]{4}$/.test(cleaned)
}

export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function getClinicsNearLocation(
  lat: number,
  lng: number,
  radiusKm = 15
): (Clinic & { distanceKm: number })[] {
  return CLINICS.map((clinic) => ({
    ...clinic,
    distanceKm: haversineDistance(lat, lng, clinic.lat, clinic.lng),
  }))
    .filter((c) => c.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm)
}

/**
 * Geocode an address using the backend API
 * Returns latitude, longitude, and formatted address
 */
export async function geocodeAddress(
  address: string
): Promise<{ lat: number; lng: number; formattedAddress: string } | null> {
  try {
    const response = await fetch("/api/geocode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    })

    if (!response.ok) return null

    const data = await response.json()
    return {
      lat: data.lat,
      lng: data.lng,
      formattedAddress: data.formattedAddress,
    }
  } catch (error) {
    console.error("[v0] Geocoding error:", error)
    return null
  }
}
