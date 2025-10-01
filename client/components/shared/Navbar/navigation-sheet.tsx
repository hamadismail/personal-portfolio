import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";
import Link from "next/link";

export const NavigationSheet = () => {
  return (
    <Sheet>
      {/* Mobile Menu Trigger */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border border-gray-300 hover:bg-gray-100 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>

      {/* Off-canvas Menu */}
      <SheetContent side="right" className="w-64 sm:w-72 p-6">
        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>

        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Portfolio
          </Link>
        </div>

        {/* Nav Menu */}
        <NavMenu
          orientation="vertical"
          className="text-lg font-medium"
        />

        <SheetDescription className="sr-only">
          Mobile navigation links
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
