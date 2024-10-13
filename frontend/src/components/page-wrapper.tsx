import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function PageWrapper({
  children,
  additionalStyles,
  innerRef,
}: {
  children: ReactNode;
  additionalStyles?: string;
  innerRef?: React.MutableRefObject<HTMLElement | null>;
}) {
  return (
    <section ref={innerRef} className={cn("px-4 md:px-28 lg:px-40 xl:px-52  pt-28 ", additionalStyles)}>
      {children}
    </section>
  );
}
