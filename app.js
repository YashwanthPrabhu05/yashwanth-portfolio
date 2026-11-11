import { portfolioData } from "./portfolioData.js";
import { renderAll } from "./renderPortfolio.js";

// Dynamically render all portfolio sections from single data source
renderAll(portfolioData);

const localAssetUrls = import.meta.glob("./assets/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

document.querySelectorAll("img[src^='assets/']").forEach((image) => {
  const assetPath = decodeURIComponent(image.getAttribute("src"));
  const bundledUrl = localAssetUrls[`./${assetPath}`];

  if (bundledUrl) {
    image.src = bundledUrl;
  } else {
    console.error(`Unable to resolve local image asset: ${assetPath}`);
  }
});

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
  let latestCursorEvent = null;
  let cursorFrame = 0;

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
    latestCursorEvent = { target: event.target, x: event.clientX, y: event.clientY };
    if (cursorFrame) return;
    cursorFrame = window.requestAnimationFrame(() => {
      cursorFrame = 0;
      if (!latestCursorEvent) return;
      const { target, x, y } = latestCursorEvent;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      updateCursorTarget(target, x, y);
    });
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

const headingMotionSections = document.querySelectorAll(".featured, .projects");
const headingMotionPlayed = new WeakSet();
const headingMotionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animateHeadingAsset = (section) => {
  const slot = section.querySelector(".heading-motion-slot");
  const asset = slot?.querySelector(".heading-motion-icon");
  if (!slot || !asset || headingMotionPlayed.has(section) || headingMotionReduced) return;
  headingMotionPlayed.add(section);

  const cursor = document.createElement("div");
  cursor.className = "heading-motion-cursor";
  cursor.setAttribute("aria-hidden", "true");
  const carriedAsset = document.createElement("img");
  carriedAsset.className = "heading-motion-cursor__asset";
  carriedAsset.src = asset.currentSrc || asset.src;
  carriedAsset.alt = "";
  carriedAsset.draggable = false;
  cursor.innerHTML = `
    <svg width="20" height="25" viewBox="0 0 24 30" aria-hidden="true">
      <path d="M2 2 22 19l-9 1-4 8L2 2Z" fill="#ff7957" stroke="#fff" stroke-linejoin="round" stroke-width="1.5"/>
    </svg>
    <span>Placing it</span>
  `;
  cursor.prepend(carriedAsset);
  document.body.append(cursor);

  const assetRect = asset.getBoundingClientRect();
  const headingFontSize = Number.parseFloat(getComputedStyle(asset.parentElement.parentElement).fontSize);
  const assetWidth = assetRect.width || Number.parseFloat(getComputedStyle(asset).width) || headingFontSize * 0.78;
  const assetHeight = assetRect.height || Number.parseFloat(getComputedStyle(asset).height) || headingFontSize * 0.78;
  const cursorWidth = cursor.getBoundingClientRect().width;
  const startX = window.innerWidth + cursorWidth + assetWidth + 24;
  const startY = Math.max(-assetHeight, slot.getBoundingClientRect().top - 100);
  cursor.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;
  cursor.style.setProperty("--carried-asset-width", `${assetWidth}px`);
  cursor.style.setProperty("--carried-asset-height", `${assetHeight}px`);
  cursor.setAttribute("data-on", "");

  const moveToSlot = () => {
    const targetRect = slot.getBoundingClientRect();
    cursor.style.transform = `translate3d(${targetRect.left + assetWidth + cursorWidth + 6}px, ${targetRect.top + assetHeight}px, 0)`;
  };
  const followSlotOnScroll = () => moveToSlot();
  window.addEventListener("scroll", followSlotOnScroll, { passive: true });

  window.setTimeout(() => {
    moveToSlot();
  }, 80);

  window.setTimeout(() => {
    window.removeEventListener("scroll", followSlotOnScroll);
    moveToSlot();
    section.classList.add("has-heading-asset");
    cursor.setAttribute("data-placed", "");
  }, 950);

  window.setTimeout(() => {
    const targetRect = slot.getBoundingClientRect();
    cursor.style.transform = `translate3d(${targetRect.right + 120}px, ${targetRect.top - 70}px, 0)`;
  }, 1180);

  window.setTimeout(() => {
    cursor.removeAttribute("data-on");
    window.setTimeout(() => cursor.remove(), 220);
  }, 1750);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      if (entry.target.matches(".featured, .projects")) {
        animateHeadingAsset(entry.target);
      }
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
} else {
  headingMotionSections.forEach((section) => {
    section.classList.add("is-visible");
  });
}

const hero = document.querySelector(".hero-art");
const parallaxItems = document.querySelectorAll("[data-parallax]");

if (hero && parallaxItems.length) {
  const stickers = [...hero.querySelectorAll(".hero-art__sticker")];
  const ghostCursor = hero.querySelector(".hero-art__ghost-cursor");
  const ghostSticker = ghostCursor?.querySelector(".hero-art__ghost-cursor-sticker");
  const ghostLabel = ghostCursor?.querySelector("span");
  if (ghostCursor) document.body.append(ghostCursor);
  const dragOffsets = new Map(stickers.map((item) => [item, { x: 0, y: 0 }]));
  const replacementAssets = [
    { path: "assets/images/hero-head-1.png", alt: "Orange sweets decoration", width: 10 },
    { path: "assets/images/hero-head-2.png", alt: "Purple star decoration", width: 9 },
    { path: "assets/images/Globe.png", alt: "Fabric globe decoration", width: 12 },
  ].map((asset) => {
    const src = localAssetUrls[`./${asset.path}`];
    if (!src) throw new Error(`Unable to resolve board sticker: ${asset.path}`);
    return { ...asset, src: new URL(src, window.location.href).href };
  });
  const assetCatalog = [
    ...stickers.map((item) => ({
      src: new URL(item.currentSrc || item.src, window.location.href).href,
      alt: item.alt,
      width: item.offsetWidth / hero.clientWidth * 100,
    })),
    ...replacementAssets,
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const autonomousCursorsEnabled = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reducedMotion;
  if (autonomousCursorsEnabled && (!ghostCursor || !ghostSticker || !ghostLabel)) {
    throw new Error("The autonomous sticker cursor is missing its board elements.");
  }
  let activeDrag = null;
  let activeAutoItem = null;
  let autoTimer = 0;
  let autoRun = 0;
  let parallaxFrame = 0;
  let latestPointer = null;
  let heroIsVisible = true;

  const resetParallax = () => {
    window.cancelAnimationFrame(parallaxFrame);
    parallaxFrame = 0;
    parallaxItems.forEach((item) => {
      item.style.setProperty("--px", "0px");
      item.style.setProperty("--py", "0px");
    });
  };

  const setGhostPosition = (x, y) => {
    ghostCursor.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  };

  const clampStickersToBoard = () => {
    stickers.forEach((item) => {
      const offset = dragOffsets.get(item);
      const minX = 8 - item.offsetLeft;
      const maxX = hero.clientWidth - item.offsetWidth - 8 - item.offsetLeft;
      const minY = 8 - item.offsetTop;
      const maxY = hero.clientHeight - item.offsetHeight - 8 - item.offsetTop;
      offset.x = Math.min(Math.max(offset.x, minX), maxX);
      offset.y = Math.min(Math.max(offset.y, minY), maxY);
      item.style.setProperty("--drag-x", `${offset.x}px`);
      item.style.setProperty("--drag-y", `${offset.y}px`);
    });
  };

  clampStickersToBoard();

  const cancelAutoDemo = () => {
    autoRun += 1;
    window.clearTimeout(autoTimer);
    ghostCursor?.removeAttribute("data-on");
    ghostCursor?.removeAttribute("data-carrying");
    if (ghostLabel) ghostLabel.textContent = "Grab it";
    if (activeAutoItem) {
      activeAutoItem.removeAttribute("data-hidden");
      activeAutoItem.classList.remove("is-lifted");
    }
    activeAutoItem = null;
  };

  const scheduleAutoDemo = (delay = 1800) => {
    if (!autonomousCursorsEnabled || !ghostCursor || !heroIsVisible) return;
    window.clearTimeout(autoTimer);
    autoTimer = window.setTimeout(runAutoDemo, delay);
  };

  let resizeFrame = 0;
  window.addEventListener("resize", () => {
    if (resizeFrame) return;
    resizeFrame = window.requestAnimationFrame(() => {
      resizeFrame = 0;
      cancelAutoDemo();
      if (activeDrag) {
        activeDrag.item.classList.remove("is-dragging");
        if (activeDrag.item.hasPointerCapture(activeDrag.pointerId)) {
          activeDrag.item.releasePointerCapture(activeDrag.pointerId);
        }
        activeDrag = null;
      }
      clampStickersToBoard();
      scheduleAutoDemo(900);
    });
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroIsVisible = entry.isIntersecting;
      if (heroIsVisible) {
        scheduleAutoDemo(900);
      } else {
        cancelAutoDemo();
      }
    }, { threshold: 0.05 });
    heroObserver.observe(hero);
  }

  const runAutoDemo = async () => {
    const heroRect = hero.getBoundingClientRect();
    if (!heroIsVisible || heroRect.bottom < 0 || heroRect.top > window.innerHeight) {
      return;
    }

    const occupiedAssets = new Set(stickers.map((item) => item.src));
    const availableAssets = assetCatalog.filter((asset) => !occupiedAssets.has(asset.src));
    if (!availableAssets.length) throw new Error("No replacement stickers are available for the board.");

    const run = ++autoRun;
    const item = stickers[Math.floor(Math.random() * stickers.length)];
    const incomingAsset = availableAssets[Math.floor(Math.random() * availableAssets.length)];
    const itemRect = item.getBoundingClientRect();
    const slot = {
      x: itemRect.left + itemRect.width * 0.55,
      y: itemRect.top + itemRect.height * 0.5,
    };
    const offscreenSide = Math.random() < 0.5 ? -1 : 1;
    const offscreenPoint = {
      x: offscreenSide < 0 ? -110 : window.innerWidth + 110,
      y: Math.min(Math.max(slot.y + (Math.random() - 0.5) * 100, 40), window.innerHeight - 40),
    };

    activeAutoItem = item;
    ghostSticker.src = item.src;
    setGhostPosition(slot.x, slot.y);
    ghostCursor.setAttribute("data-on", "");

    const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));
    await wait(820);
    if (run !== autoRun) return;

    item.classList.add("is-lifted");
    item.setAttribute("data-hidden", "");
    ghostCursor.setAttribute("data-carrying", "");
    ghostLabel.textContent = "Taking it";
    await wait(160);
    if (run !== autoRun) return;

    setGhostPosition(offscreenPoint.x, offscreenPoint.y);
    await wait(920);
    if (run !== autoRun) return;

    ghostSticker.src = incomingAsset.src;
    ghostLabel.textContent = "New sticker";
    await wait(620);
    if (run !== autoRun) return;

    setGhostPosition(slot.x, slot.y);
    ghostLabel.textContent = "Placing it";
    item.src = incomingAsset.src;
    item.alt = incomingAsset.alt;
    item.style.width = `${incomingAsset.width}%`;
    await wait(920);
    if (run !== autoRun) return;

    item.removeAttribute("data-hidden");
    item.classList.remove("is-lifted");
    clampStickersToBoard();
    ghostCursor.removeAttribute("data-carrying");
    ghostLabel.textContent = "Grab it";
    activeAutoItem = null;
    await wait(250);
    if (run === autoRun) {
      ghostCursor.removeAttribute("data-on");
      scheduleAutoDemo(1400 + Math.random() * 1800);
    }
  };

  stickers.forEach((item) => {
    item.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || activeDrag) return;
      event.preventDefault();
      item.classList.add("is-dragging");
      cancelAutoDemo();
      resetParallax();
      item.setPointerCapture(event.pointerId);
      const offset = dragOffsets.get(item);
      const transform = new DOMMatrixReadOnly(getComputedStyle(hero).transform);
      activeDrag = {
        item,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startOffsetX: offset.x,
        startOffsetY: offset.y,
        transform,
        baseX: item.offsetLeft,
        baseY: item.offsetTop,
      };
    });

    item.addEventListener("pointermove", (event) => {
      if (!activeDrag || activeDrag.item !== item || activeDrag.pointerId !== event.pointerId) return;
      const { transform, startX, startY, startOffsetX, startOffsetY, baseX, baseY } = activeDrag;
      const determinant = transform.a * transform.d - transform.b * transform.c;
      const screenX = event.clientX - startX;
      const screenY = event.clientY - startY;
      const deltaX = (transform.d * screenX - transform.c * screenY) / determinant;
      const deltaY = (-transform.b * screenX + transform.a * screenY) / determinant;
      const minX = 8 - baseX;
      const maxX = hero.clientWidth - item.offsetWidth - 8 - baseX;
      const minY = 8 - baseY;
      const maxY = hero.clientHeight - item.offsetHeight - 8 - baseY;
      const offset = dragOffsets.get(item);
      offset.x = Math.min(Math.max(startOffsetX + deltaX, minX), maxX);
      offset.y = Math.min(Math.max(startOffsetY + deltaY, minY), maxY);
      item.style.setProperty("--drag-x", `${offset.x}px`);
      item.style.setProperty("--drag-y", `${offset.y}px`);
    });

    const finishDrag = (event) => {
      if (!activeDrag || activeDrag.item !== item || activeDrag.pointerId !== event.pointerId) return;
      item.classList.remove("is-dragging");
      activeDrag = null;
      resetParallax();
      scheduleAutoDemo(5000);
    };

    item.addEventListener("pointerup", finishDrag);
    item.addEventListener("pointercancel", finishDrag);
  });

  if (window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("pointermove", (event) => {
      if (activeDrag) return;
      latestPointer = { x: event.clientX, y: event.clientY };
      if (parallaxFrame) return;
      parallaxFrame = window.requestAnimationFrame(() => {
        parallaxFrame = 0;
        if (!latestPointer || activeDrag) return;
        const rect = hero.getBoundingClientRect();
        const x = (latestPointer.x - rect.left) / rect.width - 0.5;
        const y = (latestPointer.y - rect.top) / rect.height - 0.5;
        parallaxItems.forEach((element) => {
          const depth = Number(element.dataset.parallax) || 1;
          element.style.setProperty("--px", `${x * 10 * depth}px`);
          element.style.setProperty("--py", `${y * 8 * depth}px`);
        });
      });
    });
  }

  hero.addEventListener("pointerleave", resetParallax);
  scheduleAutoDemo(1400);
}

const footerArt = document.querySelector(".footer-art");

if (footerArt) {
  const footerItems = [...footerArt.querySelectorAll(".footer-art__item")];
  const footerOffsets = new Map(footerItems.map((item) => [item, { x: 0, y: 0 }]));
  let footerDrag = null;

  const clampFooterItems = () => {
    footerItems.forEach((item) => {
      const offset = footerOffsets.get(item);
      const minX = -item.offsetLeft;
      const maxX = footerArt.clientWidth - item.offsetWidth - item.offsetLeft;
      const minY = -item.offsetTop;
      const maxY = footerArt.clientHeight - item.offsetHeight - item.offsetTop;
      offset.x = Math.min(Math.max(offset.x, minX), maxX);
      offset.y = Math.min(Math.max(offset.y, minY), maxY);
      item.style.setProperty("--footer-drag-x", `${offset.x}px`);
      item.style.setProperty("--footer-drag-y", `${offset.y}px`);
    });
  };

  clampFooterItems();
  window.addEventListener("resize", clampFooterItems, { passive: true });

  footerItems.forEach((item) => {
    item.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || footerDrag) return;
      event.preventDefault();
      item.classList.add("is-dragging");
      item.setPointerCapture(event.pointerId);
      const offset = footerOffsets.get(item);
      footerDrag = {
        item,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startOffsetX: offset.x,
        startOffsetY: offset.y,
        baseX: item.offsetLeft,
        baseY: item.offsetTop,
      };
    });

    item.addEventListener("pointermove", (event) => {
      if (!footerDrag || footerDrag.item !== item || footerDrag.pointerId !== event.pointerId) return;
      const { startX, startY, startOffsetX, startOffsetY, baseX, baseY } = footerDrag;
      const offset = footerOffsets.get(item);
      const minX = -baseX;
      const maxX = footerArt.clientWidth - item.offsetWidth - baseX;
      const minY = -baseY;
      const maxY = footerArt.clientHeight - item.offsetHeight - baseY;
      offset.x = Math.min(Math.max(startOffsetX + event.clientX - startX, minX), maxX);
      offset.y = Math.min(Math.max(startOffsetY + event.clientY - startY, minY), maxY);
      item.style.setProperty("--footer-drag-x", `${offset.x}px`);
      item.style.setProperty("--footer-drag-y", `${offset.y}px`);
    });

    const finishFooterDrag = (event) => {
      if (!footerDrag || footerDrag.item !== item || footerDrag.pointerId !== event.pointerId) return;
      item.classList.remove("is-dragging");
      footerDrag = null;
    };

    item.addEventListener("pointerup", finishFooterDrag);
    item.addEventListener("pointercancel", finishFooterDrag);
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
