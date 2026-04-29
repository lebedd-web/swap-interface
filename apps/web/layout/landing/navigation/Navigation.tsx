"use client"

import { Link, usePathname } from "@/i18n/navigation"

type NavigationItem = {
  href: string
  label: string
}

type NavigationProps = {
  items: NavigationItem[]
  ariaLabel: string
  showActiveIndicator?: boolean
}

const isActiveRoute = (pathname: string, href: string): boolean => {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export const Navigation = ({
  items,
  ariaLabel,
  showActiveIndicator = true,
}: NavigationProps): React.JSX.Element => {
  const pathname = usePathname()

  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex items-center gap-6">
        {items.map((item) => {
          const isActive = isActiveRoute(pathname, item.href)

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="relative font-f11 md:font-f9 text-main-3 transition-colors hover:text-main-2"
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                {showActiveIndicator && isActive && (
                  <span className="absolute left-1/2 top-[calc(100%+25px)] h-[2px] w-[100%] -translate-x-1/2 rounded-[20px] bg-main-2" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
