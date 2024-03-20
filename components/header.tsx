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
    <header className="sticky top-0 z-10 bg-white px-4 shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-2">
        <Link className="text-xl font-bold" href="/">
          {title}
        </Link>
        {menu?.items && (
          <ul className="hidden gap-6 md:flex">
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
        {menu?.cta?.link && menu?.cta?.text && (
          <ButtonLink
            text={menu.cta.text}
            href={`/${menu.cta.link}`}
            variant="primary"
          />
        )}
      </nav>
    </header>
  );
}
