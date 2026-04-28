"use client";

import { useState, useMemo } from 'react';
import allGPs from '@/data/gps.json';

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

export function useGPData() {
    const [searchTerm, setSearchTerm] = useState("");
    const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

    const filteredGPs = useMemo(() => {
        const records = allGPs.features || []; // Getting features array from GeoJSON
        if(!searchTerm.trim()) return []; // IF no search term, return empty

        // Store seen addresses
        const seenAddresses = new Set();
        const results: any[] = [];

        // Map and calculate distances

        const searchLower = searchTerm.toLowerCase();

        for (const feature of records) {
            const props = feature.properties;

            const matchesSearch = 
                props.ServiceName?.toLowerCase().includes(searchLower) ||
                props.Address?.toLowerCase().includes(searchLower) ||
                props.Town_City?.toLowerCase().includes(searchLower) ||
                props.County?.toLowerCase().includes(searchLower) ||
                props.Eircode?.toLowerCase().includes(searchLower)

            if (matchesSearch) {
                const clinicKey = props.Address?.toLowerCase().trim();

                if(!seenAddresses.has(clinicKey)) {
                    seenAddresses.add(clinicKey);

                    results.push({
                        id: props.ID || props.OBJECTID,
                        name: props.ServiceName,
                        address: props.Address,
                        town: props.Town_City,
                        county: props.County,
                        eircode: props.Eircode,
                        phone: props.Telephone,
                        formattedName: props.ServiceName
                            ? props.ServiceName.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())
                            : "Unknown Clinic"
                    });
                }
            }

            if (results.length >= 20) break;
        }
        return results;
    }, [searchTerm]);

return {
        searchTerm,
        setSearchTerm,
        filteredGPs
    };
}