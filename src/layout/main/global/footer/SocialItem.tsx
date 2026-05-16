// components/footer/SocialItem.tsx

import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  icon: ReactNode;
}

export default function SocialItem({ href, icon }: Props) {
  return (
    <Link
      href={href}
      className="
        group
        flex h-11 w-11 items-center justify-center
        rounded-full
        bg-neutral-800
        text-neutral-300
        transition-all
        duration-300
        hover:scale-110
        hover:bg-purple-500
        hover:text-white
      "
    >
      {icon}
    </Link>
  );
}
