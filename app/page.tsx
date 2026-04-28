"use client";

import { useState } from "react";
import { useGPData } from "@/hooks/use-gp-data";
import SearchHeader from "@/components/SearchHeader";

import ClinicCard from "@/components/ClinicCard";

export default function Home() {
  // Search logic from custom hook
  const { setUserLocation, nearestGPs, userLocation } = useGPData();
  const [searchedLabel, setSearchedLabel] = useState("");

  const handleLocationUpdate = (coords: { lat: number, lng: number }, fullAddress: string) => {
    setUserLocation(coords);

    if (fullAddress && typeof fullAddress === 'string') {
      const cleanAddress = fullAddress.replace(", Ireland", "");
      setSearchedLabel(cleanAddress);
    } else {
      // Fallback if the address is missing for some reason
      setSearchedLabel("Your Location");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <SearchHeader onLocationFound={ handleLocationUpdate } />

      {userLocation ?(
        <>

          <div className="p-8 w-full">
          <div className="w-full max-w-6xl mx-auto text-slate-400">
            <h2 className="text-md font-bold uppercase text-sky-800/70 tracking-loose mb-4">
              There are {nearestGPs.length} clinics near <span >{searchedLabel}</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearestGPs.length === 0 ? (
                <p className="text-slate-500">No clinics found within 15km of your location</p>
              ) : (
                nearestGPs.map((gp) => (
                  <ClinicCard key={gp.id} data={gp} />
                ))
              )};
            </div>
          </div>
        </div>
        </>
      ) :(
        <div className="text-center py-20">
          <p className="text-slate-500">Enter your Eircode to see nearby clinics</p>
        </div>
      )};

    </main>
  );
}
