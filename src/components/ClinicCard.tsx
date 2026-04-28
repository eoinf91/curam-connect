"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ClinicCardProps {
    data: {
        formattedName: string;
        address: string;
        town?: string;
        county?: string;
        phone?: string;
        eircode?: string;
        distance? :number;
    }
}

// Drawer & Sheet `brain`
function ClinicDetailsTrigger({ data }: {data: any}) {
    const DetailView = () => (
        <div className="space-y-6 p-12">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-baseline">
                    <div className="w-60">
                        <h3 className="font-bold text-slate-900 text-lg mb-0">
                            {data.formattedName}
                        </h3>
                        <p className="text-slate-600 text-sm">
                            {data.address}, {data.town}, {data.county}, {data.eircode}
                        </p>
                    </div>
                    <Badge variant="secondary"><MapPin strokeWidth={2} className="w-[24px]" />0.8km</Badge>
                </div>
                <div className="my-4">
                    <h5 className="text-sm text-slate-600 font-bold mb-1">
                        Accepting patients
                    </h5>
                    <div className="flex gap-2 items-center">
                        <div className="bg-red-500 rounded-lg w-[6px] h-[6px]" />
                        <p className="text-slate-600 text-sm">Medical card holders: </p>
                        <p className="text-slate-600 text-sm">No</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="bg-green-500 rounded-lg w-[6px] h-[6px]" />
                        <p className="text-slate-600 text-sm">Private patients: </p>
                        <p className="text-slate-600 text-sm">Yes</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Version */}
            <div className="sm:hidden w-full">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button className="w-full px-8 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-full cursor-pointer transition-all hover:shadow-lg active:scale-95 flex gap-2">
                            View details
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DetailView />
                    </DrawerContent>
                </Drawer>
            </div>

            {/* Desktop Version */}
            <div className="hidden sm:block w-full">
                <Sheet>
                    <SheetTrigger render={(props) => (
                        <Button {...props} className="w-full px-8 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-full cursor-pointer transition-all hover:shadow-lg active:scale-95 flex gap-2">
                            View details
                        </Button>
                    )} />
                    <SheetContent>
                        <DetailView />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default function ClinicCard({ data }: ClinicCardProps) {

    // Distance to 1 decimal place
    const getDistanceLabel = (km: number | undefined) => {
        if(km < 1) {
            return `${Math.round(km * 1000)}m`;
        }
        return `${km.toFixed(1)}km`;
    }
        
    const distanceLabel = getDistanceLabel(data.distance);

    return (
        <div className="p-4 bg-white border border-sky-200 rounded-lg">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-baseline">
                    <div className="w-60">
                        <h3 className="font-bold text-sky-800 text-lg mb-0">
                            {data.formattedName}
                        </h3>
                        <p className="text-sky-900/70 text-sm">
                            {data.address}, {data.town}, {data.county}, {data.eircode}
                        </p>
                    </div>
                    {/* Distance badge */}
                    {distanceLabel && (
                        <Badge variant="secondary" className="bg-sky-50 text-sky-800 font-bold">
                            <MapPin strokeWidth={2} className="w-[24px] text-sky-800" />
                            {distanceLabel}
                        </Badge>
                    )}
                </div>
                <div className="my-4">
                    <h5 className="text-sm text-sky-700 font-bold mb-1">
                        Accepting patients
                    </h5>
                    <div className="flex gap-2 items-center">
                        <div className="bg-red-500 rounded-lg w-[6px] h-[6px]" />
                        <p className="text-sky-900/70 text-sm">Medical card holders: </p>
                        <p className="text-sky-900/70 text-sm">No</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="bg-green-500 rounded-lg w-[6px] h-[6px]" />
                        <p className="text-sky-900/70 text-sm">Private patients: </p>
                        <p className="text-sky-900/70 text-sm">Yes</p>
                    </div>
                </div>
                <ClinicDetailsTrigger data={data} />
                
            </div>
        </div>
    )
}