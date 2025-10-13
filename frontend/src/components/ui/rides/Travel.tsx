"use client";

import { useState } from "react";
import { TRAVEL_FORM, TRAVEL_OPTIONS } from "@/lib/constants";
import { ArrowRightIcon, CalendarIcon } from "../Icons";

export function Travel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "one-way"
  );

  const handleOptionClick = (id: string) => {
    setSelectedOption(id);
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="flex flex-col gap-6 max-w-lg w-full border-r-2 border-gray-800 py-6 pr-16 h-[calc(100vh-5.1rem)]">
      <div className="flex flex-col gap-6 flex-1">
        <form className="flex flex-col gap-6">
          {TRAVEL_FORM.map(({ id, name, icon: Icon, placeholder }) => (
            <label
              htmlFor={name}
              key={id}
              className="flex flex-col gap-2 relative"
            >
              <Icon className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-300" />
              <input
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                className="w-full px-12 py-4 bg-secondary rounded-xl placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </label>
          ))}
          <hr className="border-gray-700 mt-2" />
        </form>
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold">Opciones de Viaje</h3>
          <div className="grid grid-cols-2 gap-4">
            {TRAVEL_OPTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleOptionClick(id)}
                className={`flex flex-col items-center justify-center gap-4 py-10  rounded-lg  transition cursor-pointer ${
                  selectedOption === id
                    ? "bg-blue-500"
                    : "bg-secondary hover:bg-blue-700/20"
                }`}
              >
                <Icon className="text-gray-300 size-10" />
                <span className="text-lg font-medium">{label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={handleOpenModal}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600/20 rounded-xl font-medium hover:bg-blue-500 transition cursor-pointer mt-2"
          >
            <CalendarIcon className="size-6" />
            Programar Viaje
          </button>
        </div>
      </div>
      <footer>
        <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-500 rounded-xl font-medium hover:bg-blue-600 hover:-translate-y-1 transition cursor-pointer">
          Solicitar Viaje <ArrowRightIcon className="size-6" />
        </button>
      </footer>
    </aside>
  );
}
