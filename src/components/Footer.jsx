import { Facebook, Github, Linkedin } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-[#FFF6F3] pt-14 text-sm text-gray-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <FooterCol
            title="Product"
            items={[
              { label: "Point Of Sale (POS)", href: "/features#pos" },
              { label: "Kitchen Display (KDS)", href: "/features#kds" },
              { label: "Business Analytics", href: "/features#analytics" },
              { label: "Inventory Management", href: "/features#inventory" },
              { label: "Self‑Service Ordering", href: "/features#selfservice" },
              { label: "Customer Management", href: "/features#customers" },
              { label: "SMS Marketing", href: "/features#sms" },
            ]}
          />
          <FooterCol
            title="Information"
            items={[
              { label: "How It Works", href: "/aboutus" },
              { label: "Implementation", href: "/aboutus" },
              { label: "Support", href: "/contact" },
            ]}
          />
          <FooterCol
            title="Company"
            items={[
              { label: "About Us", href: "/aboutus" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "#privacy" },
            ]}
          />
        </div>

        {/* Divider */}
        <hr className="my-10 border-t border-gray-200" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 pb-10 md:flex-row">
          {/* Logo */}
          <img src="/resto logo.png" alt="Resto logo" className="h-10 w-auto" />

          {/* Legal links */}
          <ul className="flex items-center gap-6 text-gray-700">
            <li>
              <a className="hover:text-[#E6533C]" href="#terms">
                Terms
              </a>
            </li>
            <li>
              <a className="hover:text-[#E6533C]" href="#privacy">
                Privacy
              </a>
            </li>
            <li>
              <a className="hover:text-[#E6533C]" href="#cookies">
                Cookies
              </a>
            </li>
          </ul>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <CircleIcon label="LinkedIn" href="#">
              <Linkedin className="h-4 w-4" />
            </CircleIcon>
            <CircleIcon label="Facebook" href="#">
              <Facebook className="h-4 w-4" />
            </CircleIcon>
            <CircleIcon label="Github" href="#">
              <Github className="h-4 w-4" />
            </CircleIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-gray-900">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="hover:text-[#E6533C] transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CircleIcon({ label, href, children }) {
  return (
    <a
      aria-label={label}
      href={href}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:text-[#E6533C] hover:border-[#E6533C] transition-colors"
    >
      {children}
    </a>
  );
}
