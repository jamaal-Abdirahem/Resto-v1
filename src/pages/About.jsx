import { HandCoins, Headset, ShieldCheck, Layers } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="bg-white">
      {/* Hero/Intro */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid items-start gap-10 sm:gap-12 sm:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.22em] text-gray-500 uppercase">
              About Us
            </p>
            <h1 className="mt-2 title text-gray-900">
              How Can the Software Be Free?
            </h1>
            <p className="mt-2 text-[#E6533C] font-semibold">
              It's a true win-win partnership.
            </p>

            <div className="mt-5 space-y-3 body text-gray-700">
              <p>
                We are Keyd Solutions, a Somali company in Mogadishu. Our
                mission is to empower Somali businesses.
              </p>
              <p>
                We give you the entire Resto management software for free,
                forever. No monthly fees, no license costs. You simply purchase
                your own compatible hardware (like iPads, tablets, and kitchen
                screens).
              </p>
              <p>
                We make money by being your payment partner. The Resto system is
                powered by PayPoint, our secure, unified payment gateway. We
                process your transactions (like EVCPlus, Zaad, etc.) at a
                simple, competitive rate.
              </p>
              <p>
                You get a free, world-class management system. We get a new
                payment partner. Your success is our success.
              </p>
            </div>

            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md bg-[#E6533C] px-5 py-3 text-white text-sm font-semibold shadow-sm hover:opacity-95"
              >
                Get Started for Free
              </Link>
            </div>
          </div>

          {/* Visual card */}
          <div className="w-full">
            <div className="aspect-4/3 w-full rounded-xl bg-[#EEF4FF] ring-1 ring-[#E4ECFF] flex items-center justify-center">
              <HandCoins className="h-10 w-10 text-[#2E4BFF]" />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-[#FFF6F3]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-center title text-gray-900">
            Why This Model Works
          </h2>
          <p className="mt-3 text-center max-w-3xl mx-auto body text-gray-600">
            You get the tools you need without the monthly bill, and a local
            partner focused on helping you grow.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <BenefitCard
              icon={<Headset className="h-5 w-5" />}
              title="In-Person Somali Support"
              text="If you have a problem, you are calling us, your local partners. We provide free installation, free training, and free ongoing support."
            />
            <BenefitCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="A Zero-Risk Upgrade"
              text="You pay $0 in software fees to get started. You have absolutely nothing to lose and a more efficient, profitable business to gain."
            />
            <BenefitCard
              icon={<Layers className="h-5 w-5" />}
              title="One System, One Partner"
              text="Get your POS, KDS, Inventory, and Payment processing from one trusted local company. One phone call solves any problem."
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <h3 className="title text-gray-900">
          Ready to switch to a $0/month system?
        </h3>
        <p className="mt-2 body text-gray-600">
          Let us help you eliminate waste and grow with Resto.
        </p>
        <div className="mt-6">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md bg-[#E6533C] px-5 py-3 text-white text-sm font-semibold shadow-sm hover:opacity-95"
          >
            Talk To Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2E4BFF] ring-1 ring-[#BFD1FF]">
        {icon}
      </div>
      <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
    </div>
  );
}
