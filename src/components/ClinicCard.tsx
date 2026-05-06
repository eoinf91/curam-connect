"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone } from "lucide-react";
import { getStaticMapUrl } from "@/lib/google-maps";
import Image from "next/image";

import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

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
        <div className="">
            <div className="w-full h-[250px] overflow-hidden relative rounded-xl sm:rounded-none mt-4 sm:mt-0 mb-2 sm:mb-0">
                <Image
                    src={getStaticMapUrl(data.lat, data.lng)}
                    alt={data.formattedName}
                    fill
                    className="absolute w-full h-full overflow-hidden object-cover"
                />
            </div>
            <div className="flex flex-col justify-between mx-3 sm:mx-0 lg:space-y-6 lg:p-6">
                <div className="flex flex-col gap-0">
                    <div className="flex justify-between items-baseline">
                        <div className="w-60">
                            <h3 className="font-bold text-slate-900 text-lg mb-0">
                                {data.formattedName}
                            </h3>
                            <p className="text-sky-900/70 text-sm">
                                { data.address ? `${data.address}, ` : null }
                                { data.town ? `${data.town}, ` : null }
                                { data.county ? `${data.county}, ` : null }
                                { data.eircode ? `${data.eircode} ` : null }
                            </p>
                        </div>
                        <Badge variant="secondary"><MapPin strokeWidth={2} className="w-[24px]" />0.8km</Badge>
                    </div>
                    <div className="my-4">
                        <h5 className="text-sm text-slate-600 font-bold mb-0">
                            Accepting patients
                        </h5>
                        <div className="flex gap-2 items-center">
                            <div className="bg-orange-500 rounded-lg w-[6px] h-[6px]" />
                            <p className="text-slate-600 text-sm">Medical card holders: </p>
                            <p className="text-slate-600 text-sm">Unknown</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="bg-orange-500 rounded-lg w-[6px] h-[6px]" />
                            <p className="text-slate-600 text-sm">Private patients: </p>
                            <p className="text-slate-600 text-sm">Unknown</p>
                        </div>
                    </div>
                </div>
                <a href={`tel:${data.phone}`} className="bg-cta text-center w-full w-full py-3 px-8 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-full cursor-pointer transition-all hover:shadow-lg active:scale-95 flex gap-4 justify-center items-center">
                    <Phone strokeWidth={2} className="w-[16px]" />
                    <span className="sm:hidden text-sm font-bold">Call clinic</span>
                    <span className="hidden sm:block text-sm font-bold">{data.phone}</span>
                </a>
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
                        <DrawerHeader className="absolute top-0">
                            <DrawerTitle className="sr-only">Clinic Details</DrawerTitle>
                            <DrawerDescription className="sr-only">Detailed information about this GP clinic</DrawerDescription>
                        </DrawerHeader>
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
                    <SheetContent className="rounded-2xl overflow-hidden m-2 box-border max-h-[98vh]">
                        <SheetHeader className="absolute top-0">
                            <SheetTitle className="sr-only">Clinic Details</SheetTitle>
                            <SheetDescription className="sr-only">Detailed information about this GP clinic</SheetDescription>
                        </SheetHeader>
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
        if(km === undefined || km === null || isNaN(km)) {
            return null;
        }
        if(km < 1) {
            return `${Math.round(km * 1000)}m`;
        }
        return `${km.toFixed(1)}km`;
    }
        
    const distanceLabel = getDistanceLabel(data.distance);

    return (
        <div className="w-full p-4 bg-white border border-sky-200 rounded-lg">
            <div className="flex flex-col justify-between lg:h-full">
                <div className="flex justify-between items-baseline">
                    <div className="flex-1 min-w-0 pr-2">
                        <h3 className="font-bold text-sky-800 text-lg mb-0">
                            {data.formattedName}
                        </h3>
                        <p className="text-sky-900/70 text-sm">
                            { data.address ? `${data.address}, ` : null }
                            { data.town ? `${data.town}, ` : null }
                            { data.county ? `${data.county}, ` : null }
                            { data.eircode ? `${data.eircode} ` : null }
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
                        <div className="bg-orange-500 rounded-lg w-[6px] h-[6px]" />
                        <p className="text-sky-900/70 text-sm">Medical card holders: </p>
                        <p className="text-sky-900/70 text-sm">Unknown</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="bg-orange-500 rounded-lg w-[6px] h-[6px]" />
                        <p className="text-sky-900/70 text-sm">Private patients: </p>
                        <p className="text-sky-900/70 text-sm">Unknown</p>
                    </div>
                </div>
                <ClinicDetailsTrigger data={data} />
                
            </div>
        </div>
    )
}