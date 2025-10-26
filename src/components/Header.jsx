import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/aboutus" },
  { label: "Features", to: "/features" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/70 border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/resto logo.png"
              alt="Resto logo"
              className="h-8 w-auto sm:h-10"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `transition-colors ${
                      isActive || item.to === "/"
                        ? "text-[#E6533C] font-medium"
                        : "text-gray-700"
                    } hover:text-[#E6533C]`
                  }
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA button (desktop) */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg bg-[#E6533C] px-4 py-2 text-white text-sm font-medium shadow-sm hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E6533C]"
            >
              Get Started for Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={toggle}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden pb-4">
            <ul className="mt-2 space-y-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${
                        isActive || item.to === "/"
                          ? "text-[#E6533C] font-medium"
                          : "text-gray-700"
                      }`
                    }
                    end={item.to === "/"}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/contact"
                  className="block w-full rounded-md bg-[#E6533C] px-3 py-2 text-center text-white text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  Get Started for Free
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
