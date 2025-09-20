import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navigationLinks = [
  {
    title: "Our Range",
    links: [
      { href: "/products?category=traditional", label: "Traditional Sweets" },
      { href: "/products?category=fusion", label: "Fusion Delights" },
      { href: "/products?category=seasonal", label: "Seasonal Specials" },
      { href: "/products?category=premium", label: "Premium Collection" },
      { href: "/products", label: "Gift Boxes" },
      { href: "/products", label: "Dry Fruits" },
    ],
  },
  {
    title: "About Us",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/about#mission", label: "Our Mission" },
      { href: "/about#team", label: "Meet The Team" },
      { href: "/contact", label: "Contact Us" },
      { href: "/products", label: "Track Your Order" },
      { href: "/about#heritage", label: "Bengali Heritage" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/shipping", label: "Shipping Policy" },
      { href: "/returns", label: "Return & Exchange Policy" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

const timingInfo = ["Monday To Sunday", "9:00 AM to 9:00 PM IST"];
const emailInfo = "support@roshogolpo.in";

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "tel:+919899743002", icon: MessageCircle, label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--roshogolpo-cream)] text-[var(--roshogolpo-active)] border-t border-[#b39402]/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/footer/bird.png"
          alt="Footer Decorative Background"
          fill
          className="object-contain object-bottom opacity-8 p-5"
          priority={false}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header with logo and decorative element */}
        <div className="flex items-center justify-between mb-8 border-b border-[#b39402]/20">
          <div className="flex items-center space-x-3 pb-4">
            <div className="relative h-12 w-12">
              <Image
                src="/images/roshogolpo-logo.png"
                alt="Roshogolpo Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold font-playfair text-[var(--roshogolpo-gold)]">
                ROSHOGOLPO
              </h3>
              <p className="text-xs sm:text-sm text-[var(--roshogolpo-active)]/70 font-medium">
                রসগোল্প
              </p>
              <p className="text-xs text-[var(--roshogolpo-active)]/60">
                Kolkata's Timeless Sweets, Reimagined...
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/footer/bird.png"
              alt="Mango Sweet"
              width={140}
              height={140}
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
          {/* Navigation Sections */}
          {navigationLinks.map((section, index) => (
            <div key={index} className="space-y-4 pb-4 sm:pb-0">
              <h4 className="text-sm sm:text-lg font-semibold text-[var(--roshogolpo-gold)]">
                {section.title}
              </h4>
              <nav className="flex flex-col space-y-2">
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-700 hover:text-[var(--roshogolpo-active)] transition-colors duration-200 w-fit relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[var(--roshogolpo-hover)] after:left-0 after:-bottom-1 after:rounded-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm sm:text-lg font-semibold text-[var(--roshogolpo-gold)]">
              We'd Be Happy To Assist You!
            </h4>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 bg-white border-[#b39402]/30 text-[var(--roshogolpo-active)] placeholder:text-[var(--roshogolpo-active)]/50"
                />
                <Button className="bg-[#b39402] hover:bg-[#710014] text-white px-6">
                  Subscribe
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <p className="text-md font-medium text-[var(--roshogolpo-gold)]">
                  Timing :
                </p>
                {timingInfo.map((time, index) => (
                  <p key={index} className="text-xs sm:text-sm text-gray-700">
                    {time}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-md font-medium text-[var(--roshogolpo-gold)]">
                  Email :
                </p>
                <Link
                  href={`mailto:${emailInfo}`}
                  className="text-xs sm:text-sm text-gray-700 transition-colors"
                >
                  {emailInfo}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0 py-6 border-t border-[#b39402]/20">
          <div>
            <p className="text-md font-medium text-[var(--roshogolpo-active)] mb-3">
              Payment Methods
            </p>
            <Image
              src="/footer/footer-payment-method.svg"
              alt="Payment Methods"
              width={380}
              height={100}
              className="object-contain"
            />
          </div>

          <div>
            <p className="text-md font-medium text-[var(--roshogolpo-active)] mb-3">
              Follow Us On
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-[var(--roshogolpo-gold)] hover:text-[#710014] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#b39402]/20 pt-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-xs sm:text-sm text-[var(--roshogolpo-active)]/70">
            © 2025 Copyright. Roshogolpo Sweet Shop LLP. All Rights Reserved
          </p>
          <p className="text-xs sm:text-sm text-[var(--roshogolpo-active)]/70">
            Site By: <Link target="_blank" href="https://www.linkedin.com/in/rahul-verma-09227a263" className="font-medium hover:underline text-[var(--roshogolpo-active)] transition-colors">Rahul Verma</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
