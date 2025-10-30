import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect, lazy } from "react";
import { initReveal } from "./lib/gsapReveal.js";

// Route-level code splitting
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Feature = lazy(() => import("./pages/Feature.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));

function ScrollRevealOnRouteChange() {
  const loc = useLocation();
  useEffect(() => {
    // re-init reveals on route change after idle to reduce TBT
    const run = () => initReveal(document);
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 500 });
    } else {
      setTimeout(run, 50);
    }
  }, [loc.pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <ScrollRevealOnRouteChange />
        <Header />
        <main className="flex-1">
          <Suspense
            fallback={<div className="px-6 py-10 text-gray-500">Loading…</div>}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<About />} />
              <Route path="/services" element={<Home />} />
              <Route path="/features" element={<Feature />} />
              {/* How it works is now the About page */}
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
