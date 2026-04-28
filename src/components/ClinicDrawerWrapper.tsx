import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function ClinicDrawerWrapper({ children, data } : { children: React.ReactNode, data: any }) {
    return (
        <>
            {/* Mobile Version */}
            <div className="sm:hidden w-full">
                <Drawer>
                    <DrawerTrigger>
                        { children }
                    </DrawerTrigger>
                    <DrawerContent>
                        <p>Drawer content TBA</p>
                    </DrawerContent>
                </Drawer>
            </div>

            {/* Desktop Version */}
            <div className="hidden sm:block w-full">
                <Sheet>
                    <SheetTrigger>
                        { children }
                    </SheetTrigger>
                    <SheetContent>
                        <p>Sheet content TBA</p>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}