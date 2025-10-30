export function useSEO({ title, description, path, image } = {}) {
  // Compute absolute URL if possible
  const origin =
    import.meta?.env?.VITE_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const url =
    origin && path
      ? origin + path
      : typeof window !== "undefined"
      ? window.location.href
      : "";
  const img = image
    ? image.startsWith("http")
      ? image
      : origin + image
    : origin + "/media/CTA%20img.jpg";

  if (typeof document === "undefined") return; // SSR/No DOM safety

  if (title) document.title = title;

  const ensure = (selector, attr, content, tag = "meta") => {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement(tag);
      // Infer attribute type from selector
      if (selector.startsWith('meta[name="')) {
        const nameVal = selector.substring(
          'meta[name="'.length,
          selector.length - 2
        );
        el.setAttribute("name", nameVal);
      } else if (selector.startsWith('meta[property="')) {
        const propVal = selector.substring(
          'meta[property="'.length,
          selector.length - 2
        );
        el.setAttribute("property", propVal);
      } else if (tag === "link" && selector.startsWith('link[rel="')) {
        const relVal = selector.substring(
          'link[rel="'.length,
          selector.length - 2
        );
        el.setAttribute("rel", relVal);
      }
      document.head.appendChild(el);
    }
    if (attr) el.setAttribute(attr, content);
  };

  if (description) ensure('meta[name="description"]', "content", description);
  if (title) ensure('meta[property="og:title"]', "content", title);
  if (description)
    ensure('meta[property="og:description"]', "content", description);
  ensure('meta[property="og:type"]', "content", "website");
  if (url) ensure('meta[property="og:url"]', "content", url);
  if (img) ensure('meta[property="og:image"]', "content", img);

  ensure('meta[name="twitter:card"]', "content", "summary_large_image");
  if (title) ensure('meta[name="twitter:title"]', "content", title);
  if (description)
    ensure('meta[name="twitter:description"]', "content", description);
  if (img) ensure('meta[name="twitter:image"]', "content", img);

  // Canonical link
  if (url) {
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }
}
