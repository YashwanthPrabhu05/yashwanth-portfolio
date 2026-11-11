import { portfolioData } from "./portfolioData.js";
import { renderAll } from "./renderPortfolio.js";

// Dynamically render all portfolio sections from single data source
renderAll(portfolioData);

const preloader = document.querySelector(".preloader");

document.querySelectorAll("img").forEach((image) => {
  if (!image.closest(".preloader, .site-nav, .hero-art, .hero-copy, .logo-strip, .case-brand, .case-hero-image")) {
    image.loading = "lazy";
  }
});

if (preloader) {
  const count = preloader.querySelector(".preloader__count");
  const progress = preloader.querySelector(".preloader__line span");
  const started = performance.now();
  const duration = 1050;
  let finished = false;

  const tick = () => {
    const value = Math.min(100, Math.round(((performance.now() - started) / duration) * 100));
    count.textContent = String(value).padStart(3, "0");
    progress.style.width = `${value}%`;

    if (value < 100 || finished) return;
    finished = true;
    window.clearInterval(timer);

    window.setTimeout(() => {
      preloader.classList.add("is-hidden");
      window.setTimeout(() => preloader.remove(), 600);
    }, 140);
  };

  const timer = window.setInterval(tick, 40);
  tick();
}

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = `
    <div class="custom-cursor__shape">
      <svg class="custom-cursor__glyph" width="15.2" height="18.4" viewBox="128 65 319 382" aria-hidden="true">
        <path d="M128 112 Q128 65 172 65 Q188 65 202 76 L432 262 Q447 275 447 295 Q447 335 407 335 L330 335 Q292 335 266 366 L214 430 Q200 447 180 447 Q143 447 141 405 Z" fill="#0D99FF"></path>
      </svg>
      <span class="custom-cursor__pill"><span class="custom-cursor__label"></span></span>
    </div>`;
  document.body.append(cursor);

  const shape = cursor.querySelector(".custom-cursor__shape");
  const pill = cursor.querySelector(".custom-cursor__pill");
  const label = cursor.querySelector(".custom-cursor__label");
  const textEntrySelector = 'input:not([type="submit"], [type="button"], [type="checkbox"], [type="radio"]), textarea, [contenteditable=""], [contenteditable="true"]';

  const getCursorTarget = (target) => {
    if (!(target instanceof Element)) return null;
    return target.closest("[data-cursor-label], .site-nav__logo, .site-nav__links a, .button, .featured-card, .project-card, .social-link, .case-section aside a, .case-footer a, .contact-form .button, a[href^='mailto:']");
  };

  const getCursorLabel = (target) => {
    const explicitLabel = target.dataset.cursorLabel;
    if (explicitLabel) return explicitLabel;
    if (target.matches(".site-nav__logo")) return "Home";
    if (target.matches(".site-nav__links a")) return "You";
    if (target.matches(".button--dark")) return "Show me";
    if (target.matches(".button--light")) return "Resume";
    if (target.matches(".featured-card, .project-card")) return "Case study";
    if (target.matches(".social-link")) return "Connect";
    if (target.matches(".case-section aside a")) return "Jump to";
    if (target.matches(".case-footer a")) return "Back to work";
    if (target.matches(".contact-form .button")) return "Send message";
    if (target.matches("a[href^='mailto:']")) return "Email me";
    return "";
  };

  const updateCursorTarget = (target, x, y) => {
    const textEntry = target instanceof Element && target.closest(textEntrySelector);
    cursor.toggleAttribute("data-hide", Boolean(textEntry));

    const cursorTarget = getCursorTarget(target);
    const nextLabel = cursorTarget ? getCursorLabel(cursorTarget) : "";

    if (label.textContent !== nextLabel) {
      label.textContent = nextLabel;
      pill.style.width = nextLabel ? `${Math.ceil(label.getBoundingClientRect().width + 20)}px` : "0px";
    }

    shape.toggleAttribute("data-flip-x", window.innerWidth - x < 145);
    shape.toggleAttribute("data-flip-y", window.innerHeight - y < 50);
  };

  document.addEventListener("pointermove", (event) => {
    document.documentElement.classList.add("has-custom-cursor");
    cursor.removeAttribute("data-hide");
    cursor.setAttribute("data-on", "");
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    updateCursorTarget(event.target, event.clientX, event.clientY);
  }, { passive: true });

  document.addEventListener("pointerdown", () => cursor.setAttribute("data-pressed", ""), { passive: true });
  document.addEventListener("pointerup", () => cursor.removeAttribute("data-pressed"), { passive: true });
  document.documentElement.addEventListener("pointerleave", () => cursor.setAttribute("data-hide", ""));
  window.addEventListener("blur", () => cursor.setAttribute("data-hide", ""));
}

const navToggle = document.querySelector(".site-nav__toggle");
const navLinks = document.querySelector(".site-nav__links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const revealTargets = document.querySelectorAll(
  ".section-block, .project-card, .case-section, .case-stat, .case-note, .case-hero-image"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
}

const hero = document.querySelector(".hero-art");
const parallaxItems = document.querySelectorAll("[data-parallax]");

if (hero && parallaxItems.length && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    parallaxItems.forEach((item) => {
      const depth = Number(item.dataset.parallax) || 1;
      item.style.setProperty("--px", `${x * 18 * depth}px`);
      item.style.setProperty("--py", `${y * 14 * depth}px`);
    });
  });

  hero.addEventListener("pointerleave", () => {
    parallaxItems.forEach((item) => {
      item.style.setProperty("--px", "0px");
      item.style.setProperty("--py", "0px");
    });
  });
}

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  const updateTopButton = () => backToTop.classList.toggle("is-visible", window.scrollY > 420);
  window.addEventListener("scroll", updateTopButton, { passive: true });
  updateTopButton();
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

const sectionLinks = [...document.querySelectorAll('.site-nav__links a[href^="#"]')];

if ("IntersectionObserver" in window && sectionLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        link.classList.toggle("is-active", link.hash === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-25% 0px -65% 0px" });

  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) navObserver.observe(section);
  });
}

const caseSections = document.querySelectorAll(".case-section[id]");

if ("IntersectionObserver" in window && caseSections.length) {
  const caseObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".case-section aside a").forEach((link) => {
        link.classList.toggle("is-active", link.hash === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-20% 0px -65% 0px" });

  caseSections.forEach((section) => caseObserver.observe(section));
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.get("name")}`);
    const body = encodeURIComponent(
      `${formData.get("message")}\n\nFrom: ${formData.get("name")} (${formData.get("email")})`
    );
    const status = contactForm.querySelector(".form-status");
    status.textContent = "Opening your email app…";
    const recipient = portfolioData.personal?.email || portfolioData.contact?.recipientEmail || "syashwanthprabhu@gmail.com";
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}
