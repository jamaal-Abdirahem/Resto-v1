import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ShieldCheck,
  TrendingUp,
  Clock,
  Recycle,
  HandCoins,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";
import { useSEO } from "../lib/useSEO";

export default function Home() {
  useSEO({
    title: "Resto — Free Restaurant Management System",
    description:
      "Resto is a $0/month, all‑in‑one restaurant management system with POS, KDS, analytics, inventory, self‑service, CRM, and SMS. Local Somali support.",
    path: "/",
    image: "/media/CTA%20img.jpg",
  });
  const heroRef = useRef(null);
  // State and ref to control the tour video
  const tourRef = useRef(null);
  const [tourPlaying, setTourPlaying] = useState(false);
  const [tourTime, setTourTime] = useState(0); // seconds
  const [tourDuration, setTourDuration] = useState(0); // seconds

  const toggleTour = () => {
    const v = tourRef.current;
    if (!v) return;
    // Lazy set src on first interaction to defer network
    if (!v.getAttribute("src")) {
      v.setAttribute("src", "/media/latest video edited.webm ");
      // Ensure the tour video stays muted even if the file has audio
      try {
        v.muted = true;
        v.defaultMuted = true;
        v.volume = 0;
      } catch {
        // ignore
      }
      try {
        v.load();
      } catch {
        // ignore load errors in older browsers
      }
    }
    if (v.paused) {
      v.play();
      setTourPlaying(true);
    } else {
      v.pause();
      setTourPlaying(false);
    }
  };

  const onLoaded = () => {
    const v = tourRef.current;
    if (!v) return;
    setTourDuration(v.duration || 0);
  };

  const onTime = () => {
    const v = tourRef.current;
    if (!v) return;
    setTourTime(v.currentTime || 0);
  };

  const seekTo = (timeSec) => {
    const v = tourRef.current;
    if (!v) return;
    const t = Math.min(Math.max(timeSec, 0), tourDuration || 0);
    v.currentTime = t;
    setTourTime(t);
  };

  const seekBy = (delta) => {
    seekTo((tourRef.current?.currentTime || 0) + delta);
  };

  const fmt = (s) => {
    if (!isFinite(s)) return "0:00";
    const total = Math.max(0, Math.floor(s));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const sec = total % 60;
    const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
    const ss = String(sec).padStart(2, "0");
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  };
  useEffect(() => {
    // Defer hero video load to idle to improve FCP/LCP
    const run = () => {
      const v = heroRef.current;
      if (!v) return;
      if (!v.getAttribute("src")) {
        // Use the newly added hero clip (filename contains spaces)
        v.setAttribute("src", "/media/1026(1).webm");
        // Force mute the hero clip (some browsers or streams may carry audio)
        try {
          v.muted = true;
          v.defaultMuted = true;
          v.volume = 0;
        } catch {
          // ignore
        }
        try {
          v.load();
          v.play().catch(() => {});
        } catch {
          // ignore autoplay/load errors
        }
      }
    };
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 1000 });
    } else {
      setTimeout(run, 250);
    }
  }, []);
  return (
    <>
      {/* Hero (inline) */}
      <section className="relative isolate overflow-hidden reveal" data-y="28">
        {/* Background video using webm file */}
        <div className="absolute inset-0 -z-10">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            ref={heroRef}
            poster="/media/CTA%20img.jpg"
          >
            {/* src set after idle by JS to defer network */}
          </video>
          {/* Professional overlay: subtle dark with blur for contrast */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </div>

        {/* Foreground content */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <h1 className="title md:text-6xl leading-tight text-[#FFF5F1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Run Your Restaurant On A
            <br className="hidden sm:block" />
            Free Professional System
          </h1>
          <p className="mx-auto mt-4 max-w-2xl body text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            Stop using pen and paper. Get the powerful, all-in-one restaurant
            management software you need to streamline operations and eliminate
            waste—for zero monthly fees.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-md bg-[#E6533C] px-5 py-3 text-white text-sm font-medium hover:opacity-95 shadow-lg shadow-black/10"
            >
              Get Started for Free
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center rounded-md border border-[#8AA2FF] px-5 py-3 text-[#2E4BFF] bg-white/90 text-sm font-medium hover:bg-[#F3F6FF] shadow-lg shadow-black/5"
            >
              Find Out How it Works
            </Link>
          </div>
        </div>
      </section>

      {/* 2-minute tour section with placeholder video */}
      <section className="bg-[#FFF6F3] reveal">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <p className="eyebrow">A 2-MINUTE TOUR</p>
          <h2 className="mt-3 title text-gray-900">
            See How Resto Transforms Your
            <br className="hidden sm:block" />
            Restaurant.
          </h2>
          <p className="mt-3 max-w-2xl mx-auto body text-gray-600">
            Watch how a simple order flows from the customer's tablet, to the
            kitchen, to your sales reports—instantly and without errors.
          </p>

          {/* Video placeholder card */}
          <div className="mt-8 rounded-xl ring-1 ring-gray-200 bg-[#EEF4FF] overflow-hidden">
            <div className="relative aspect-video w-full">
              /* Keep this video as a placeholder. Replace the src when you have
              the final clip. */
              <video
                ref={tourRef}
                className="absolute inset-0 h-full w-full object-cover"
                preload="none"
                playsInline
                muted
                poster="/media/latest video edited-Cover.jpg"
                onLoadedMetadata={onLoaded}
                onPlay={() => setTourPlaying(true)}
                onPause={() => setTourPlaying(false)}
                onEnded={() => setTourPlaying(false)}
                onTimeUpdate={onTime}
              />
              {/* Center play icon (visual only for now) */}}
              {!tourPlaying && (
                <button
                  type="button"
                  aria-label="Play video"
                  onClick={toggleTour}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleTour();
                    }
                  }}
                  className="absolute inset-0 m-auto h-14 w-14 flex items-center justify-center rounded-full bg-white/85 text-[#2E4BFF] ring-2 ring-[#2E4BFF] shadow-sm hover:bg-white"
                >
                  <Play className="h-7 w-7" />
                </button>
              )}
              {/* Bottom controls */}
              <div className="absolute inset-x-0 bottom-0 bg-black/40 text-white">
                <div className="flex items-center gap-3 px-3 py-2">
                  <button
                    type="button"
                    aria-label={tourPlaying ? "Pause" : "Play"}
                    onClick={toggleTour}
                    className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-white/20"
                  >
                    {tourPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label="Back 10 seconds"
                    onClick={() => seekBy(-10)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-white/20"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Forward 10 seconds"
                    onClick={() => seekBy(10)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-white/20"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>

                  {/* Timeline */}
                  <input
                    type="range"
                    min={0}
                    max={tourDuration || 0}
                    step="0.1"
                    value={tourTime}
                    onChange={(e) => seekTo(parseFloat(e.target.value))}
                    className="mx-1 flex-1 accent-[#2E4BFF]"
                  />
                  <span className="whitespace-nowrap text-xs tabular-nums">
                    {fmt(tourTime)} / {fmt(tourDuration)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="bg-white reveal">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-center title text-gray-900">
            The Power Of A $0/Month System.
          </h2>
          <p className="mt-3 text-center max-w-3xl mx-auto body text-gray-600">
            This isn’t a ‘lite’ version or a temporary trial. You get the
            complete, professional system to solve your most expensive
            problems—with no monthly software fees, forever.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FeatureCard
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Reduction In Order Errors"
              text="Eliminate costly mistakes from messy handwriting. Ensure the kitchen gets the perfect order, every time."
            />
            <FeatureCard
              icon={<TrendingUp className="h-4 w-4" />}
              title="Increase In Peak-Hour Sales"
              text="Our self-service & POS tablets speed up ordering, letting you serve more customers, faster."
            />
            <FeatureCard
              icon={<Clock className="h-4 w-4" />}
              title="Hours Saved Per Week"
              text="Your sales reports are 100% accurate and generated instantly. Stop counting receipts and start growing your business."
            />
            <FeatureCard
              icon={<Recycle className="h-4 w-4" />}
              title="Reduction In Food Waste"
              text="Stop wasting food on wrong orders. Our real-time inventory helps you track every ingredient."
            />
          </div>
        </div>
      </section>

      {/* Win‑win partnership blurb */}
      <section className="bg-white reveal">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2E4BFF] ring-1 ring-[#BFD1FF]">
            <HandCoins className="h-6 w-6" />
          </div>
          <p className="mt-5 body text-gray-500">
            How Can The Software Be Free?
          </p>
          <h3 className="mt-3 title text-gray-900">
            It's A True Win-Win Partnership
          </h3>
          <p className="mt-3 body text-gray-600">
            We are Keyd Solutions, a Somali company in Mogadishu. Our mission is
            to empower Somali businesses.
          </p>
          <div className="mt-6">
            <Link
              to="/aboutus"
              className="inline-flex items-center gap-2 text-[#E6533C] font-medium hover:underline"
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#FFF6F3]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-center title text-gray-900">Why Choose Us</h2>
          <p className="mt-3 text-center max-w-3xl mx-auto body text-gray-600">
            Experience unmatched value with local support, zero fees, and an
            all‑in‑one system built for Somali businesses.
          </p>

          <div className="mt-12 space-y-12 reveal-children">
            <WhyRow
              title="Local Somali Support"
              text="If you have a problem, you are calling us, your local partners. We provide free installation, free training, and free ongoing support."
              src="/media/picture%201.png"
              alt="Local Somali Support"
            />
            <WhyRow
              reversed
              title="No Monthly Fees, Ever"
              text="You pay $0 in software fees to get started. You have absolutely nothing to lose and a more efficient, profitable business to gain."
              src="/media/picture%202.png"
              alt="No Monthly Fees"
            />
            <WhyRow
              title="The Power Of One"
              text="Get your POS, KDS, inventory, and payment processing from one trusted local company. One phone call solves any problem."
              src="/media/picture%203.png"
              alt="The Power Of One"
            />
          </div>
        </div>
      </section>

      {/* All-in-one features list */}
      <section className="bg-white reveal">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="text-center eyebrow">Every Feature Included</p>
          <h2 className="mt-2 text-center title text-gray-900">
            This Is The Complete, All‑in‑One System. You Get Every Feature To
            Run Your Business
          </h2>

          <div className="mt-10 space-y-12 reveal-children">
            <ProductRow
              title="Digital Point Of Sale (POS)"
              text="Take orders fast with a modern, reliable POS that handles dine‑in and takeaway and works smoothly at peak hours."
              src="/media/feature 1.png"
              alt="POS system screenshot"
            />
            <ProductRow
              reversed
              title="Kitchen Display System (KDS)"
              text="Real‑time order tickets keep the kitchen organized, reduce wait times, and eliminate handwriting errors."
              src="/media/feature 2.png"
              alt="Kitchen Display System screenshot"
            />
            <ProductRow
              title="Business Analytics"
              text="Instant, accurate sales and performance reports help you understand what’s working and what needs attention."
              src="/media/feature 3.png"
              alt="Business Analytics screenshot"
            />
            <ProductRow
              reversed
              title="Inventory Management"
              text="Track ingredients in real time to control costs and stop running out during the rush."
              src="/media/feature 4.png"
              alt="Inventory Management screenshot"
            />
            <ProductRow
              title="Self‑Service Ordering"
              text="Customer‑facing tablets speed up ordering, reduce queues, and free up staff."
              src="/media/feature 5.png"
              alt="Self-Service Ordering screenshot"
            />
            <ProductRow
              reversed
              title="Customer Management"
              text="Keep customer details and visit history to deliver a more personal experience."
              src="/media/feature 6.png"
              alt="Customer Management screenshot"
            />
            <ProductRow
              title="SMS Marketing"
              text="Send timely promotions and order updates by SMS to bring customers back."
              src="/media/feature 7.png"
              alt="SMS Marketing screenshot"
            />
          </div>
        </div>
      </section>
      {/* Testimonials Slider Section */}
      <section className="bg-white reveal">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <h2 className="title text-gray-900">What Our Clients Says</h2>
          <p className="mt-2 body text-gray-600">
            See Why Restaurant Owners Are Switching To Resto
          </p>

          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate bg-[#E6533C] reveal" data-y="36">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center text-white">
          <h2 className="title uppercase text-white">
            Say Goodbye To
            <br className="hidden sm:block" />
            Monthly Fees!
          </h2>
          <p className="mt-4 body text-white/90 max-w-2xl mx-auto">
            Stop using pen and paper. There is zero risk and no monthly software
            fee. Get the complete Resto system and our local Somali support
            today.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-md bg-white px-6 py-3 text-[#2E4BFF] text-sm font-semibold shadow-sm ring-1 ring-[#D7E0FF] hover:bg-[#F7F9FF]"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Profitability’s Secret Ingredient (final pre-footer section) */}
      <section className="bg-white reveal">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Make the image larger by giving it equal grid space: 1fr / 1fr */}
          <div className="grid items-center gap-10 sm:gap-12 sm:grid-cols-2">
            {/* Left copy (1fr) */}
            <div className="sm:col-span-1">
              <h2 className="title text-gray-900">
                Profitability’s Secret
                <br className="hidden sm:block" />
                Ingredient
              </h2>
              <p className="mt-3 body text-gray-600 max-w-md">
                Ask us how our $0/month software can cut your waste, protect
                your profits, and help you grow
              </p>
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-md bg-[#E6533C] px-5 py-3 text-white text-sm font-semibold shadow-sm hover:opacity-95"
                >
                  Book a Free Demo
                </Link>
              </div>
            </div>
            {/* Right media (1fr) */}
            <div
              className="w-full sm:col-span-1"
              style={{ perspective: "1000px" }}
            >
              <img
                src="/media/resto laptop design.png"
                alt="Resto system helping restaurants improve profitability"
                className="w-full rounded-xl object-cover tilt-3d sm:h-[420px] lg:h-[560px]"
                loading="lazy"
                decoding="async"
                data-tilt-max="8"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// --- Testimonial Slider Section ---
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    text: "Orci Vel Eget In Eu. Integer Amet Porttitor Hendrerit Etiam Arcu, Aliquet Duis Pretium Consequat. Semper Sed Viverra Enim Ut Nunc.",
    name: "Courtney Henry",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
  },
  {
    text: "Tincidunt Risus, Blandit Proin Semper. Tellus Ac Pellentesque Convallis Vitae. Lorem Enim Cursus Et Consequat Viverra Id Justo Ullamcorper. Vel.",
    name: "Courtney Henry",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
  },
  // Add more testimonials as needed
];

function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(window.innerWidth < 768 ? 1 : 2);

  useEffect(() => {
    function handleResize() {
      setPerPage(window.innerWidth < 768 ? 1 : 2);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Build slides: each is an array of perPage testimonials
  const slides = [];
  for (let i = 0; i < testimonials.length; i += perPage) {
    slides.push(testimonials.slice(i, i + perPage));
  }
  const maxIndex = slides.length - 1;

  const prev = () => setIndex((i) => (i === 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i === maxIndex ? 0 : i + 1));

  // Clamp index if perPage changes
  useEffect(() => {
    if (index > maxIndex) setIndex(0);
  }, [perPage, maxIndex, index]);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-center gap-4">
        <button
          aria-label="Previous"
          onClick={prev}
          className="rounded-full p-2 hover:bg-gray-100 text-gray-400 border border-gray-200"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div
          className={`flex-1 grid gap-8 ${
            perPage === 2 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {slides[index].map((t, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="flex justify-center mb-2">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-[#2E4BFF] fill-[#2E4BFF]"
                    fill="#2E4BFF"
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 text-lg font-medium leading-relaxed mb-4">
                “{t.text}”
              </blockquote>
              <div className="flex flex-col items-center gap-1">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-8 w-8 rounded-full object-cover mb-1"
                />
                <span className="text-xs text-gray-700 font-semibold">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          aria-label="Next"
          onClick={next}
          className="rounded-full p-2 hover:bg-gray-100 text-gray-400 border border-gray-200"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
// (removed duplicate broken code)

// Simple card used in the benefits grid
function FeatureCard({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2E4BFF] ring-1 ring-[#BFD1FF]">
        {icon}
      </div>
      <h3 className="mt-4 title-sm text-gray-900">{title}</h3>
      <p className="mt-2 body text-gray-600">{text}</p>
    </div>
  );
}

// Row with image and copy, alternating layout with 'reversed'
function WhyRow({ title, text, src, alt = "", reversed = false }) {
  return (
    <div
      className={`grid items-center gap-8 sm:gap-10 lg:gap-12 sm:grid-cols-2 ${
        reversed ? "sm:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Image */}
      <div className="w-full">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="aspect-4/3 w-full rounded-xl object-cover ring-1 ring-[#E4ECFF]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="aspect-4/3 w-full rounded-xl bg-[#EEF4FF] ring-1 ring-[#E4ECFF] flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-[#2E4BFF]" />
          </div>
        )}
      </div>
      {/* Copy */}
      <div>
        <h3 className="title-sm text-gray-900">{title}</h3>
        <p className="mt-2 body text-gray-600">{text}</p>
      </div>
    </div>
  );
}

// Product row with placeholder image, alternating layout and a learn-more link
function ProductRow({
  title,
  text,
  src,
  alt = "",
  reversed = false,
  href = "/features",
}) {
  return (
    <div
      className={`grid items-center gap-6 sm:gap-10 lg:gap-12 sm:grid-cols-2 ${
        reversed ? "sm:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text */}
      <div>
        <h3 className="title-sm text-gray-900">{title}</h3>
        <p className="mt-2 body text-gray-600">{text}</p>
        <Link
          to={href}
          className="mt-3 inline-flex items-center gap-1 text-[#E6533C] text-xs font-medium hover:underline"
        >
          Learn More <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      {/* Media: real image if src, else placeholder */}
      <div className="w-full">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="aspect-4/3 w-full rounded-xl object-cover ring-1 ring-[#E4ECFF]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="aspect-4/3 w-full rounded-xl bg-[#EEF4FF] ring-1 ring-[#E4ECFF] flex items-center justify-center">
            <ImageIcon className="h-6 w-6 text-[#2E4BFF]" />
          </div>
        )}
      </div>
    </div>
  );
}
