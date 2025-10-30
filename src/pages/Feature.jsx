import {
  TabletSmartphone,
  Monitor,
  BarChart3,
  Boxes,
  UsersRound,
  MessageSquareText,
  ShoppingBasket,
} from "lucide-react";
import { useSEO } from "../lib/useSEO";

function FeatureCard({ id, icon, title, text }) {
  return (
    <div
      id={id}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2E4BFF] ring-1 ring-[#BFD1FF]">
        {icon}
      </div>
      <h2 className="mt-4 title-sm text-gray-900">{title}</h2>
      <p className="mt-2 body text-gray-600">{text}</p>
    </div>
  );
}

export default function Feature() {
  useSEO({
    title: "All‑in‑one Features | Resto",
    description:
      "Explore Resto features: POS, KDS, analytics, inventory, self‑service, customer management, SMS marketing.",
    path: "/features",
    image: "/media/feature%201.png",
  });
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 reveal">
      <h1 className="title text-gray-900 text-center">All‑in‑one Features</h1>
      <p className="mt-3 body text-gray-600 text-center max-w-3xl mx-auto">
        Explore the complete toolkit you get with Resto—no monthly software
        fees.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 reveal-children">
        <FeatureCard
          id="pos"
          icon={<TabletSmartphone className="h-4 w-4" />}
          title="Point Of Sale (POS)"
          text="Fast, reliable order taking for dine‑in or takeaway with clear modifiers and notes."
        />
        <FeatureCard
          id="kds"
          icon={<Monitor className="h-4 w-4" />}
          title="Kitchen Display (KDS)"
          text="Real‑time digital tickets that keep the kitchen organized and reduce wait times."
        />
        <FeatureCard
          id="analytics"
          icon={<BarChart3 className="h-4 w-4" />}
          title="Business Analytics"
          text="Instant sales and performance insights—no spreadsheets or manual counting."
        />
        <FeatureCard
          id="inventory"
          icon={<Boxes className="h-4 w-4" />}
          title="Inventory Management"
          text="Track ingredients live to control costs and stop running out during peak hours."
        />
        <FeatureCard
          id="selfservice"
          icon={<ShoppingBasket className="h-4 w-4" />}
          title="Self‑Service Ordering"
          text="Customer‑facing tablets that shorten queues and boost peak‑hour throughput."
        />
        <FeatureCard
          id="customers"
          icon={<UsersRound className="h-4 w-4" />}
          title="Customer Management"
          text="Keep visit history and preferences to deliver more personal service."
        />
        <FeatureCard
          id="sms"
          icon={<MessageSquareText className="h-4 w-4" />}
          title="SMS Marketing"
          text="Send targeted promos and order updates to bring customers back."
        />
      </div>
    </section>
  );
}
