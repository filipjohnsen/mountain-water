import { cva } from "class-variance-authority";
import Link from "next/link";

const buttonVariants = cva(
  "py-6 px-8 block border-2 text-[20px] font-bold leading-normal tracking-[20%] uppercase text-black transition-all outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#FFD600] border-[#FFD600] hover:border-black group-data-[bg='yellow']:border-white group-data-[bg='black']:hover:border-white group-data-[bg='yellow']:hover:border-black",
        secondary: "bg-white border-black hover:bg-[#E9E9E9]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
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
