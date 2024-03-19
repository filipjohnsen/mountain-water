import { HeaderMenu, RecursivePartial } from "@/types";
import Link from "next/link";
import { ButtonLink } from "./button-link";

export function Header({
  title,
  menu,
}: {
  title: string;
  menu: RecursivePartial<HeaderMenu>;
}) {
  return (
    <header className="sticky z-10 top-0 bg-white shadow-md px-4">
      <nav className="container py-2 mx-auto flex items-center justify-between">
        <Link className="font-bold text-xl" href="/">
          {title}
        </Link>
        {menu?.items && (
          <ul className="hidden md:flex gap-6">
            {menu.items.map((item) => (
              <li key={item.link}>
                <Link
                  className="text-lg transition-colors hover:text-[#FFD600]"
                  href={`/${item.link}`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {menu?.cta && (
          <ButtonLink
            text={menu.cta.text ?? ""}
            href={`/${menu.cta.link}`}
            variant="primary"
          />
        )}
      </nav>
    </header>
  );
}
