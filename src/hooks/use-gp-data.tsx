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
    const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
    const [isLocating, setIsLocating] = useState(false);

    const nearestGPs = useMemo(() => {
        if(!userLocation) return [];

        const records = allGPs.features;
        const seenAddresses = new Set();
        const results: any[] = [];

        // Map through features to calculate distance
        const withDistance = records.map((feature: any) => {
            // Extract from GeoJSON
            const props = feature.properties;
            const geometry = feature.geometry;

            // GeoJSON coordinates (Lat, Lng)
            const gpLat = geometry?.coordinates[1];
            const gpLng = geometry?.coordinates[0];

            let distance = 9999; // Default for missing coords
            if(gpLat && gpLng) {
                distance = getDistance(userLocation.lat, userLocation.lng, gpLat, gpLng);
            }

            return {
                id: props.ID || props.OBJECTID,
                name: props.ServiceName,
                address: props.Address,
                town: props.Town_City,
                county: props.County,
                eircode: props.Eircode,
                distance: distance,
                phone: props.Telephone,
                lat: gpLat,
                lng: gpLng,
                formattedName: props.ServiceName
                    ? props.ServiceName.toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())
                    : "Unknown Clinic"
            };
        }).filter(gp => gp.distance <= 15);
        // Filter to show clinics within 15km
        

        // Sory by closest
        withDistance.sort((a, b) => a.distance - b.distance);

        // Deduplicate addresses
        for (const gp of withDistance) {
            const key = gp.eircode || gp.id;
            if(key && !seenAddresses.has(key)) {
                seenAddresses.add(key);
                results.push(gp);
            }
        }
        return results;
    }, [userLocation]);

    return {
        nearestGPs,
        setUserLocation,
        userLocation,
        isLocating,
        setIsLocating
    };
}