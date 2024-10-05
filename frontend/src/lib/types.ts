import { LucideProps } from "lucide-react";

export interface SocialHandleProps {
  link: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  name: string;
  nameDisable ?: boolean
}
