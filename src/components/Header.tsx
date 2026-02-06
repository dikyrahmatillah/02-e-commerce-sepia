"use client";

import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconButtonSx = (isHome: boolean) => ({
  height: 40,
  width: 40,
  border: "1px solid",
  color: isHome ? "var(--background)" : "var(--foreground)",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "var(--accent-peach)",
  },
});

export default function HeaderSection() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const headerTextClass = isHome ? "color-background" : "color-foreground";

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="flex items-center justify-between px-10 py-7">
        <Link href="/" aria-label="Home" className="flex items-center gap-3">
          <div>
            <p
              className={`text-2xl font-semibold tracking-wide ${headerTextClass}`}
            >
              Sepia
            </p>
            <p
              className={`text-xs uppercase tracking-[0.35em] ${headerTextClass}`}
            >
              All Purpose Theme
            </p>
          </div>
        </Link>
        <nav
          className={`hidden items-center gap-7 text-sm font-medium ${headerTextClass} lg:flex`}
        >
          <Link className={`transition hover:text-accent-peach`} href="/">
            Home
          </Link>

          <Link className={`transition hover:text-accent-peach`} href="/shop">
            Shop
          </Link>
          <Link className={`transition hover:text-accent-peach`} href="/blog">
            Blog
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
          </Link>

          <Link
            className={`transition hover:text-accent-peach`}
            href="/about-us"
          >
            About Us
          </Link>
          <Link
            className={`transition hover:text-accent-peach`}
            href="/contact-us"
          >
            Contact Us
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <IconButton aria-label="Account" sx={iconButtonSx(isHome)}>
            <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton aria-label="Cart" sx={iconButtonSx(isHome)}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton aria-label="Call" sx={iconButtonSx(isHome)}>
            <LocalPhoneOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
