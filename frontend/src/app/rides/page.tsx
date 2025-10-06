"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { ButtonGroupItem } from "@/components/ui/ButtonGroupItem";
import { WelcomeMessage } from "@/components/ui/WelcomeMessage";
import { BUTTON_GROUP } from "@/lib/constants";
import { RequestTravel } from "@/components/ui/rides/RequestTravel";

export default function RidesPage() {
  const [selectedButton, setSelectedButton] = useState<string>("request");

  const { user } = useAuth();

  const handleButtonClick = (id: string) => {
    setSelectedButton(id);
  };

  return (
    <>
      <main className="flex flex-col min-h-screen relative max-w-11/12 mx-auto w-full">
        <WelcomeMessage />
        <div className="flex flex-col gap-4 mt-10">
          <h2 className="text-3xl font-semibold">{user?.name}</h2>
          <h4 className="text-lg text-gray-500">Gestiona tus viajes</h4>
          <div className="flex items-center bg-secondary w-fit p-1.5 rounded-lg">
            {BUTTON_GROUP.map(({ id, label }) => (
              <ButtonGroupItem
                key={id}
                id={id}
                label={label}
                onClick={() => handleButtonClick(id)}
                selected={selectedButton}
              />
            ))}
          </div>
          {selectedButton === "request" && <RequestTravel />}
        </div>
      </main>
    </>
  );
}
