import Link from "next/link"
import { IconType } from "react-icons"
import { Button } from "../ui/button"

interface NavLink {
  title: string
  icon: IconType 
  variant: "default" | "ghost"
  href: string
}

interface NavProps {
  links: NavLink[]
}

export default function AdminSidebar({ links }: NavProps) {
  return (
    <nav className="grid items-start px-2 py-5 gap-2 text-sm font-medium lg:px-4">
      {links.map((link) => (
        <Button
          asChild
          key={link.href}
          variant={link.variant}
          className="w-full justify-start"
        >
          <Link
            href={link.href}
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
          >
            <link.icon className="h-4 w-4 mr-2" />
            {link.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
