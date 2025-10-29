import { AssignedRide } from "@/lib/types";

interface Props {
  ride: AssignedRide;
}

export function AssignedRideCard({ ride }: Props) {
  const { conductor, fare, status } = ride;

  return (
    <section className="bg-secondary rounded-xl p-6 w-full max-w-2xl mx-auto mt-8 shadow-lg">
      <header className="flex items-center justify-between border-b border-gray-500 pb-4 mb-4">
        <div className="flex items-center gap-4">
          {conductor.vehiclePhotoUrl ? (
            <img
              src={conductor.vehiclePhotoUrl}
              alt="Vehículo"
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-500 rounded-lg flex items-center justify-center text-white font-bold">
              🚗
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{conductor.name}</h2>
            <p className="text-sm text-gray-300">📞 {conductor.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-400">${fare.toFixed(2)}</p>
          <span className="text-xs text-gray-400">Estado: {status}</span>
        </div>
      </header>
      <div className="flex flex-col gap-2 text-sm">
        <p>
          🚙 Vehículo: {conductor.vehicleBrand} {conductor.vehicleModel}
        </p>
        <p>🕒 Tu conductor está en camino. Prepárate para el viaje.</p>
      </div>
    </section>
  );
}
