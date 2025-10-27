"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { User } from "@/lib/types";
import { Sidebar } from "@/components/ui/profile/Sidebar";
import { PROFILE_FORM } from "@/lib/constants";

export default function ProfilePage() {
  const [formData, setFormData] = useState<Partial<User>>({});
  const { profile, updateProfile, loading, error, success } = useProfile();

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        cedula: profile.cedula,
        phone: profile.phone,
        email: profile.email,
        address: profile.address,
        photoUrl: profile.photoUrl,
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const firstLetter = profile?.name.charAt(0).toUpperCase();

  const completedFields = PROFILE_FORM.slice(0, 3);
  const remainingFields = PROFILE_FORM.slice(3);

  return (
    <main className="flex w-full min-h-screen">
      {profile ? (
        <Sidebar
          name={profile.name}
          cedula={profile.cedula}
          photoUrl={profile.photoUrl}
        />
      ) : (
        <div>Por favor, inicia sesión</div>
      )}
      <section className="flex flex-col gap-6 px-6 lg:px-16 mx-auto w-full py-8">
        <header className="flex flex-col gap-2">
          <h2 className="text-4xl font-semibold">Mi perfil</h2>
          <p className="text-lg text-gray-400 text-balance">
            Completa tu perfil para acceder a todas las funcionalidades y una
            mejor experiencia.
          </p>
        </header>
        <div className="flex sm:flex-row flex-col gap-6 sm:gap-12 mt-4">
          <div>
            {profile?.photoUrl ? (
              <img
                className="size-24 rounded-full"
                src={profile.photoUrl}
                alt="Foto de perfil"
              />
            ) : (
              <span className="flex items-center justify-center text-5xl font-semibold text-blue-500 size-24 bg-blue-500/10 rounded-full">
                {firstLetter}
              </span>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-8 flex-1 h-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedFields.map(({ id, label, name, icon: Icon }) => (
                <label
                  key={id}
                  className="flex flex-col gap-2 font-medium relative"
                >
                  {label}
                  <input
                    className="px-12 py-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    type="text"
                    name={name}
                    value={formData[name as keyof User] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [name]: e.target.value,
                      }))
                    }
                  />
                  <Icon className="absolute left-4 bottom-4.5 text-gray-400" />
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {remainingFields.map(
                ({ id, label, name, placeholder, icon: Icon }) => (
                  <label
                    key={id}
                    className="flex flex-col gap-2 font-medium relative"
                  >
                    {label}
                    <input
                      className="px-12 py-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                      type="text"
                      value={formData[name as keyof User] || ""}
                      placeholder={placeholder}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [name]: e.target.value,
                        }))
                      }
                    />
                    <Icon className="absolute left-4 bottom-4.5 text-gray-400" />
                  </label>
                )
              )}
            </div>
            <footer className="flex justify-end mt-2 sm:mt-8">
              <button className="px-8 py-4 bg-blue-500 rounded-xl hover:bg-blue-600 hover:-translate-y-1 transition duration-200 cursor-pointer">
                Guardar Cambios
              </button>
            </footer>
            {loading && <p>Cargando...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {success && (
              <p className="text-green-500">Perfil actualizado exitosamente</p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
