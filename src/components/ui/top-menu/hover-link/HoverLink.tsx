import Link from "next/link";

export default function HoverLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative inline-block before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[0.5px] before:bg-white before:transition-all before:duration-300 hover:before:w-full"
    >
      {label}
    </Link>
  );
}