import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as: "h1" | "h2";
  isBlack?: boolean;
  children: ReactNode;
};

const Heading = ({
  as,
  children,

  isBlack,
  ...props
}: HeadingProps) => {
  const Tag = as;

  return (
    <Tag
      {...props}
      className={cn(
        "mb-4 text-left text-[clamp(2rem,48px,5vw)] font-bold group-data-[alignment='center']:text-center group-data-[bg='black']:text-white",
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
