import { socialHandles } from "@/lib/constant";
import { SocialHandleProps } from "@/lib/types";

export default function SocialHandles({nameDisable} : {nameDisable ?: boolean}) {
  return (
    <nav className="flex space-x-4">
      {socialHandles.map((socialHandle) => (
        <SocialHandle
          key={socialHandle.name}
          name={socialHandle.name}
          link={socialHandle.link}
          icon={socialHandle.icon}
          nameDisable = {nameDisable}
        />
      ))}
    </nav>
  );
}

function SocialHandle({
  link,
  icon: Icon,
  name,
  nameDisable = false,
}: SocialHandleProps) {
  return (
    <a
      href={link}
      target = "_blank"
      className="flex items-center text-gray-300 hover:text-blue-500 transition-colors"
    >
      <Icon className="h-5 w-5 mr-2" />
      {!nameDisable && <span>{name}</span>}
    </a>
  );
}
