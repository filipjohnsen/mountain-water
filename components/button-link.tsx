import { cva } from "class-variance-authority";
import Link from "next/link";

const buttonVariants = cva(
  "py-6 px-8 block border-2 text-[20px] font-bold leading-normal tracking-[20%] uppercase text-black transition-all",
  {
    variants: {
      variant: {
        primary: "bg-[#FFD600] border-[#FFD600] hover:border-black",
        secondary: "bg-white border-black",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export function ButtonLink({
  href,
  text,
  variant = "primary",
}: {
  href: string;
  text: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link className={buttonVariants({ variant })} href={href}>
      {text}
    </Link>
  );
}
