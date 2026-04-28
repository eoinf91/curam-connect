"use client"
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCoordsFromEircode } from "@/lib/google-maps";

interface SearchHeaderProps {
    onLocationFound: (coords: { lat: number; lng: number }, label: string) => void;
}

export default function SearchHeader({ onLocationFound }: SearchHeaderProps){
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSearch = async () => {
        if(!inputValue.trim()) return;

        setIsLoading(true);
        const result = await getCoordsFromEircode(inputValue);
        setIsLoading(false);

        if(result) {
            onLocationFound({ lat: result.lat, lng: result.lng }, result.address);
        } else {
            alert("We couldn't find that location. Try a full Eircode (e.g. D02 X585");
        }
    };

    return(
        <header className="pt-16 pb-8 sm:pb-16 px-4 bg-gradient-to-b from-blue-50/50 to-white rounded-b-4xl shadow-xl shadow-sky-400/5">
            <div className="max-w-3xl mx-auto text-center space-y-4">
                <h1 className="text-4xl w-75 mx-auto sm:w-full md:text-5xl font-extrabold text-sky-800 tracking-tight">
                    Care that's close to home.
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                    Connecting you with trusted local GPs in your community. Because when you're not feeling your best, the last thing you need is a long journey.
                    </p>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Enter your Eircode (e.g. D02 X585)" 
                            className="pl-10 sm:pl-12 h-14 border-none rounded-full focus-visible:ring-0 text-lg placeholder:text-slate-400 placeholder:text-sm"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <Button 
                        disabled={isLoading}
                        className="h-14 w-14 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-full cursor-pointer relative transition-all hover:shadow-lg active:scale-95 flex gap-2"
                        onClick={handleSearch}
                    >
                        { isLoading 
                            ? <Loader2 className="animate-spin" /> 
                            : <Search className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 text-white-400" /> 
                        }
                    </Button>
                </div>
            </div>
        </header>
    )
}