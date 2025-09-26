"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  ArrowRight,
  LogOut,
  Settings,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleMobileMenu, closeMobileMenu } from "@/lib/features/uiSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Chevron } from "react-day-picker";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop All", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export function Header() {
  const dispatch = useAppDispatch();
  const { itemCount } = useAppSelector((state) => state.cart);
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email?.slice(0, 2).toUpperCase() || "AD";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--roshogolpo-header)] backdrop-blur supports-[backdrop-filter]:bg-[var(--roshogolpo-header)]/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => dispatch(closeMobileMenu())}
          >
            <div className="relative size-16 sm:size-20">
              <Image
                src="/images/roshogolpo-logo.png"
                alt="Roshogolpo Logo"
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>
            <div className="">
              <h1 className="text-xl sm:text-3xl font-bold text-[var(--roshogolpo-gold)] font-playfair">
                Roshogolpo
              </h1>
              <p className="text-[0.6rem] text-[var(--roshogolpo-hover)] font-medium">
                Stories Wrapped in Sugar Syrup
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-md font-medium hover:text-[var(--roshogolpo-hover)] transition-colors duration-200 w-fit relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[var(--roshogolpo-hover)] after:left-0 after:-bottom-1 after:rounded-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              size="lg"
              className="bg-[var(--roshogolpo-active)] hover:bg-[var(--roshogolpo-gold)] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold group rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/products" className="flex items-center gap-2">
                Order Now
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-1">
            {/* Search */}
            <div className="hidden sm:block">
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <Input
                      type="search"
                      placeholder="Search sweets..."
                      className="w-full"
                      onBlur={() => setIsSearchOpen(false)}
                      autoFocus
                    />
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(true)}
                    className="text-[var(--roshogolpo-gold)] hover:text-[var(--roshogolpo-hover)] hover:cursor-pointer hover:bg-[var(--bg-roshogolpo-gold)]"
                  >
                    <Search className="size-md" />
                  </Button>
                )}
              </AnimatePresence>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                {user && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative text-[var(--roshogolpo-gold)] hover:text-[var(--roshogolpo-hover)] hover:cursor-pointer hover:bg-[var(--bg-roshogolpo-gold)] cursor-pointer"
                  >
                    <User className="size-md" />
                  </Button>
                )}{" "}
                {/* <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {getInitials(user?.name, user?.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "Admin"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.role === "admin" && (
                  <DropdownMenuItem>
                    <Link href="/admin" className="flex items-center w-full">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <CartDrawer>
              <Button
                variant="ghost"
                size="sm"
                className="relative text-[var(--roshogolpo-gold)] hover:text-[var(--roshogolpo-hover)] hover:cursor-pointer hover:bg-[var(--bg-roshogolpo-gold)]"
              >
                <ShoppingCart className="size-md" />
              </Button>
            </CartDrawer>

            {!user && (
              <Button
                asChild
                size="lg"
                className="bg-[var(--roshogolpo-active)] hover:bg-[var(--roshogolpo-gold)] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold group transition-all duration-300 shadow-lg hover:shadow-xl ml-5"
              >
                <Link href="/auth/login" className="flex items-center gap-2">
                  Login/Signup
                </Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-[var(--roshogolpo-gold)] hover:text-[var(--roshogolpo-hover)] hover:cursor-pointer hover:bg-[var(--bg-roshogolpo-gold)]"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              {isMobileMenuOpen ? (
                <X className="size-md" />
              ) : (
                <Menu className="size-md" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-[var(--roshogolpo-light)] mt-2 pt-4 pb-4"
            >
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-xs sm:text-sm font-medium text-[var(--roshogolpo-gold)] hover:text-[var(--roshogolpo-hover)] hover:cursor-pointer transition-colors duration-200"
                    onClick={() => dispatch(closeMobileMenu())}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <Input
                    type="search"
                    placeholder="Search sweets..."
                    className="w-full"
                  />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
