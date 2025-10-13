"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { WelcomeMessage } from "@/components/ui/WelcomeMessage";
import { Travel } from "@/components/ui/rides/Travel";

export default function RidesPage() {
  const [selectedButton, setSelectedButton] = useState<string>("request");

  const { user } = useAuth();

  const handleButtonClick = (id: string) => {
    setSelectedButton(id);
  };

  return (
    <>
      <main className="flex flex-col relative max-w-11/12 mx-auto w-full">
        <WelcomeMessage />
        <Travel />
      </main>
    </>
  );
}
