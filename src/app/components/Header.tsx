"use client";

import Button from "@mui/material/Button";
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
  borderColor: isHome ? "rgba(255, 255, 255, 0.35)" : "rgba(0, 0, 0, 0.25)",
  color: isHome ? "#fff" : "#000",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: isHome ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.45)",
    backgroundColor: isHome
      ? "rgba(255, 255, 255, 0.12)"
      : "rgba(0, 0, 0, 0.06)",
  },
});

export default function HeaderSection() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="mx-auto flex items-center justify-between px-10 py-7 ">
        <Link href="/" aria-label="Home" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b88a3e] text-lg font-semibold">
            S
          </span>
          <div>
            <p
              className={`text-2xl font-semibold tracking-wide ${isHome ? "text-white" : "text-black"}`}
            >
              Sophia
            </p>
            <p
              className={`text-xs uppercase tracking-[0.35em] ${isHome ? "text-white/70" : "text-black/70"}`}
            >
              All Purpose Theme
            </p>
          </div>
        </Link>
        <nav
          className={`hidden items-center gap-7 text-sm font-medium ${isHome ? "text-white/90" : "text-black/90"} lg:flex`}
        >
          <Link
            className={`flex items-center gap-1 transition ${isHome ? "hover:text-white" : "hover:text-black"}`}
            href="/"
          >
            Home
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
          </Link>

          <Link
            className={`flex items-center gap-1 transition ${isHome ? "hover:text-white" : "hover:text-black"}`}
            href="#products"
          >
            Shop
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
          </Link>
          <Link
            className={`flex items-center gap-1 transition ${isHome ? "hover:text-white" : "hover:text-black"}`}
            href="#"
          >
            Blog
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
          </Link>

          <Link
            className={`transition ${isHome ? "hover:text-white" : "hover:text-black"}`}
            href="/about-us"
          >
            About Us
          </Link>
          <Link
            className={`transition ${isHome ? "hover:text-white" : "hover:text-black"}`}
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
          <Button
            variant="contained"
            sx={{
              borderRadius: "999px",
              backgroundColor: "#d26a10",
              color: isHome ? "#fff" : "#000",
              paddingX: 3,
              paddingY: 1,
              fontSize: "0.9rem",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#bb5c0e" },
            }}
          >
            Book Online
          </Button>
        </div>
      </div>
    </header>
  );
}
