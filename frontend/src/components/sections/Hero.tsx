"use client";

import { useState } from "react";
import { ElectionCard } from "@/ui/ElectionCard";
import { ELECTION_CARDS } from "@/lib/constants";
import { ArrowRightIcon, WhatsappIcon } from "@/ui/Icons";
import { Button } from "@/ui/Button";

export function Hero() {
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const handleSelectCard = (index: number) => {
    setIsSelected(index);
  };

  return (
    <section className="relative h-screen mt-20">
      <img
        className="w-full h-full object-cover absolute inset-0"
        src="/images/hero.webp"
        alt="Imagen Hero"
      />
      <div className="flex flex-col gap-6 justify-center items-center relative bg-primary/95 z-10 h-full">
        <h1 className="text-6xl font-bold text-center">
          Tu transpote confiable
          <br />
          <span className="text-blue-500">en Charallave</span>
        </h1>
        <p className="text-center text-lg text-gray-500 max-w-xl">
          Servicio de transporte disponible 24/7. Conductores validados y pagos
          flexibles.
        </p>
        <article className="flex flex-col justify-center items-center gap-6 bg-secondary/80 p-8 rounded-lg border border-gray-600">
          <h2 className="text-2xl font-semibold">
            ¿Como quieres usar RideNow?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {ELECTION_CARDS.map((card, index) => (
              <ElectionCard
                key={card.id}
                index={index}
                onClick={() => handleSelectCard(index)}
                isSelected={isSelected}
                {...card}
              />
            ))}
          </div>
          <button
            className={`flex items-center gap-2 justify-center text-lg font-medium bg-blue-500 py-2 w-full rounded-lg ${
              isSelected !== null
                ? "cursor-pointer opacity-100"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            Comenzar <ArrowRightIcon />
          </button>
        </article>
        <Button type="outline" href="https://wa.me/584123257467" target>
          <WhatsappIcon />
          0412-325-7467
        </Button>
      </div>
    </section>
  );
}
