import { Button } from "@/ui/Button";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-primary/70 backdrop-blur-lg border-b border-gray-500 z-50">
      <div className="flex items-center justify-between max-w-9/12 mx-auto w-full h-20">
        <div>
          <h2 className="text-blue-400 text-3xl font-bold">RideNow</h2>
        </div>
        <aside className="flex items-center gap-4">
          <Button type="outline" href="auth/login">
            Iniciar Sesión
          </Button>
          <Button href="auth/register">Registrarse</Button>
        </aside>
      </div>
    </header>
  );
}
