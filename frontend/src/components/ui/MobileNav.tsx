import { MOBILE_NAV } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-20 bg-zinc-800 rounded-t-2xl">
      <ul className="flex items-center justify-evenly w-full">
        {MOBILE_NAV.map(({ id, label, href, icon: Icon }) => (
          <li key={id}>
            <Link
              className={`flex flex-col items-center transition +
                ${pathname === href ? "text-blue-400" : "hover:text-blue-400"}`}
              href={href}
            >
              <Icon className="size-7" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
