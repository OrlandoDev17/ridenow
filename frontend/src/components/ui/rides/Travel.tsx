"use client";

import { useState, useEffect } from "react";
import { PAYMENT_METHODS, TRAVEL_FORM, TRAVEL_OPTIONS } from "@/lib/constants";
import { ArrowRightIcon, CalendarIcon } from "../Icons";
import { useRides } from "@/hooks/useRides";
import { useAuth } from "@/context/AuthContext";
import { useMessage } from "@/context/MessageContext";
import type {
  TravelProps,
  PaymentMethodCode,
  TravelOptionCode,
} from "@/lib/types";

export function Travel({ origin, destination }: TravelProps) {
  // ESTADOS QUE CAPTURAN LOS DATOS PARA EL FORMULARIO

  // Opciones de viaje
  const [selectedTravelOption, setSelectedTravelOption] =
    useState<TravelOptionCode>("ONE_WAY");

  // Metodo de pago
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodCode>("CASH");

  // Es Programado
  const [isScheduled, setIsScheduled] = useState(false);

  // Estado para los valores de los inputs
  const [formValues, setFormValues] = useState({
    origin: "",
    destination: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const { solicitarViaje } = useRides();

  const { user } = useAuth();

  const { setShowMessage, setRequestRide } = useMessage();

  const userCedula = user?.cedula;

  // Efecto para actualizar los inputs cuando cambien los valores del mapa
  useEffect(() => {
    setFormValues({
      origin: origin?.name || "",
      destination: destination?.name || "",
    });
  }, [origin, destination]);

  // Funciones para manejar los clicks

  //Opciones de viaje
  const handleTravelOptionClick = (id: TravelOptionCode) => {
    setSelectedTravelOption(id);
  };

  //Metodo de pago
  const handlePaymentMethodClick = (id: PaymentMethodCode) => {
    setSelectedPaymentMethod(id);
  };

  //Programar viaje
  const handleScheduleClick = () => {
    setIsScheduled(!isScheduled);
  };

  //Funcion para abrir el modal
  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  //Funcion para manejar los cambios en los inputs
  const handleInputChange = (name: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.origin || !formValues.destination || !userCedula) {
      console.warn("⚠️ Faltan datos para solicitar el viaje");
      return;
    }

    const originData = {
      name: formValues.origin,
      latlng: origin?.latlng,
    };

    const destinationData = {
      name: formValues.destination,
      latlng: destination?.latlng,
    };

    try {
      await solicitarViaje({
        origin: originData,
        destination: destinationData,
        userCedula,
        scheduled: isScheduled,
        paymentMethod: selectedPaymentMethod,
        travelOption: selectedTravelOption,
      });
    } catch (error) {
      console.error("Error al solicitar el viaje:", error);
      // Handle error (e.g., show error message to user)
      return;
    }

    setShowMessage(true);
    setRequestRide(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 2xl:gap-6 flex-1">
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
                value={formValues[name as keyof typeof formValues]}
                onChange={(e) => handleInputChange(name, e.target.value)}
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
                onClick={() => handleTravelOptionClick(id as TravelOptionCode)}
                className={`flex flex-col items-center justify-center gap-2 2xl:gap-4 py-6 2xl:py-10 rounded-lg transition cursor-pointer ${
                  selectedTravelOption === id
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
            onClick={handleOpenModal || handleScheduleClick}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600/20 rounded-xl font-medium disabled:hover:bg-blue-600/20 transition cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={true}
          >
            <CalendarIcon className="size-6" />
            Programar Viaje
          </button>
          <div className="flex flex-col gap-4 mt-2">
            <h3 className="text-xl font-semibold">
              Seleccione su metodo de pago
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() =>
                    handlePaymentMethodClick(id as PaymentMethodCode)
                  }
                  className={`flex flex-col items-center justify-center gap-4 py-6  rounded-lg  transition cursor-pointer ${
                    selectedPaymentMethod === id
                      ? "bg-blue-500"
                      : "bg-secondary hover:bg-blue-700/20"
                  }`}
                >
                  <Icon className="text-gray-300 size-10" />
                  <span className="text-lg font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer>
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-500 rounded-xl font-medium hover:bg-blue-600 hover:-translate-y-1 transition cursor-pointer"
        >
          Solicitar Viaje <ArrowRightIcon className="size-6" />
        </button>
      </footer>
    </>
  );
}
