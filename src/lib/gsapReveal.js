import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function initReveal(root = document) {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  // Simple fade-up for any .reveal element
  const els = root.querySelectorAll?.(".reveal");
  els.forEach((el) => {
    if (el.dataset.gsapInit) return; // avoid duplicate
    el.dataset.gsapInit = "1";

    const y = parseFloat(el.getAttribute("data-y")) || 24;
    const duration = parseFloat(el.getAttribute("data-duration")) || 0.6;
    const delay = parseFloat(el.getAttribute("data-delay")) || 0;

    gsap.from(el, {
      autoAlpha: 0,
      y,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // Stagger children inside .reveal-children container
  const containers = root.querySelectorAll?.(".reveal-children");
  containers.forEach((el) => {
    if (el.dataset.gsapInit) return;
    el.dataset.gsapInit = "1";

    const items = Array.from(el.children);
    if (!items.length) return;

    gsap.from(items, {
      autoAlpha: 0,
      y: 16,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // Gentle 3D tilt on hover + idle float for elements with .tilt-3d
  const tilts = root.querySelectorAll?.(".tilt-3d");
  tilts.forEach((el) => {
    if (el.dataset.gsapTilt) return;
    el.dataset.gsapTilt = "1";

    // Idle float animation (very subtle)
    gsap.to(el, {
      y: "+=8",
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Interactive tilt on pointer move (desktop only)
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const max = parseFloat(el.getAttribute("data-tilt-max")) || 8; // degrees
      gsap.to(el, {
        rotateY: dx * max,
        rotateX: -dy * max,
        transformPerspective: 800,
        transformOrigin: "center",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
  });
}
