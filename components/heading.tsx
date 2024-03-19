import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as: "h1" | "h2";
  alignment?: string;
  isBlack?: boolean;
  children: ReactNode;
};

const Heading = ({
  as,
  children,
  alignment = "left",
  isBlack,
  ...props
}: HeadingProps) => {
  const Tag = as;

  return (
    <Tag
      {...props}
      className={cn(
        "text-[clamp(2rem,48px,5vw)] font-bold mb-4 group-data-[bg='black']:text-white",
        alignment === "center" ? "text-center" : "text-left"
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
