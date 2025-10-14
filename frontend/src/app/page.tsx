"use client";

import { WelcomeMessage } from "@/components/ui/WelcomeMessage";
import { Travel } from "@/components/ui/rides/Travel";
import { DynamicTravelMap } from "@/components/ui/rides/DynamicTravelMap";

export default function RidesPage() {
  return (
    <>
      <main className="flex relative max-w-11/12 mx-auto w-full">
        <WelcomeMessage />
        <Travel />
        <div className="w-full h-[calc(100vh-5.1rem)]">
          <DynamicTravelMap />
        </div>
      </main>
    </>
  );
}
