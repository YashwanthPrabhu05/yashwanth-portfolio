/**
 * renderPortfolio.js
 * Dynamically renders portfolio data into the DOM.
 * Any edits to portfolioData.js will automatically reflect on the page.
 */

export function renderNavigation(data) {
  const navLogo = document.querySelector(".site-nav__logo");
  if (navLogo) {
    navLogo.innerHTML = `<img src="${data.personal.logoImage}" alt="${data.personal.name}">`;
    navLogo.setAttribute("aria-label", `${data.personal.name} home`);
  }

  const preloaderLogo = document.querySelector(".preloader img");
  if (preloaderLogo) {
    preloaderLogo.src = data.personal.logoImage;
    preloaderLogo.style.borderRadius = "8px";
  }

  const navLinksContainer = document.querySelector(".site-nav__links");
  if (navLinksContainer && data.navigation) {
    navLinksContainer.innerHTML = data.navigation
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");
  }
}

export function renderHero(data) {
  const heroCopy = document.querySelector(".hero-copy");
  if (!heroCopy) return;
  const { hero } = data;

  heroCopy.innerHTML = `
    <h1>
      ${hero.greeting}<br class="hero-br">
      <span class="hero-role">${hero.titleRole} <img class="hero-icon hero-icon--star" src="assets/images/hero-head-2.png" alt=""></span><br class="hero-br">
      <span class="accent">${hero.accentText}</span>
    </h1>
    <p>${[hero.description, hero.workSnippet].filter(Boolean).join(" ")}</p>
    <div class="button-row">
      <a class="button button--dark" href="${hero.ctaPrimary.href}">${hero.ctaPrimary.label}</a>
      <a class="button button--light" href="${hero.ctaSecondary.href}" ${hero.ctaSecondary.external ? 'target="_blank" rel="noreferrer"' : ""}>${hero.ctaSecondary.label}</a>
    </div>
  `;
}

export function renderFeaturedProject(data) {
  const section = document.querySelector(".featured");
  if (!section) return;
  const feat = data.featuredProject;
  const [headingLead, ...headingRest] = feat.heading.split(" ");

  section.innerHTML = `
    <div class="featured__heading">
      <div>
        <div class="section-kicker">${feat.sectionLabel}</div>
        <h2><span>${headingLead}</span><span class="featured__doodle-slot heading-motion-slot"><img class="featured__doodle heading-motion-icon" src="assets/images/Feature%20project.png" alt=""></span><span>${headingRest.join(" ")}</span></h2>
      </div>
    </div>
    <a class="featured-card" href="${feat.cta.href}" aria-label="See ${feat.projectName}">
      <img class="featured-card__thumb" src="${feat.image}" alt="${feat.projectName} web app on a laptop">
    </a>
    <div class="featured-summary">
      <div class="featured-summary__title">
        <img class="featured-summary__logo" src="${feat.logo || data.personal.logoImage}" alt="${feat.projectName} logo">
        <div>
          <strong>${feat.projectName}${feat.status ? `<em class="status-pill"><i aria-hidden="true"></i>${feat.status}</em>` : ""}</strong>
          <span>${feat.subtitle}</span>
        </div>
      </div>
      <p>${feat.description}</p>
      <div class="featured-summary__bottom">
        <span>${feat.footerNote}</span>
        <a class="button button--dark" href="${feat.cta.href}">${feat.cta.label} <span>↗</span></a>
      </div>
    </div>
  `;
}

export function renderSelectedProjects(data) {
  const section = document.querySelector(".projects");
  if (!section) return;
  const sel = data.selectedProjects;

  section.innerHTML = `
    <div class="section-heading">
      <div class="section-kicker">${sel.sectionLabel}</div>
      <h2><span>Selected</span><span class="projects__folder-slot heading-motion-slot"><img class="projects__folder heading-motion-icon" src="assets/images/Selected%20project.png" alt=""></span><span>Projects</span></h2>
    </div>
    <div class="project-grid">
      ${sel.items
        .map(
          (item) => `
        <a class="project-card ${item.wide ? "project-card--wide" : ""}" href="${item.href}" ${item.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}${item.cursorLabel ? ` data-cursor-label="${item.cursorLabel}"` : ""}>
          <div class="project-card__image ${item.bgClass || ""}">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="project-card__info">
            <div>
              <h3>${item.number}. ${item.title.toUpperCase()}</h3>
              <p>${item.description}</p>
            </div>
            <span class="project-card__arrow">↗</span>
            <div class="tag-row">
              ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
          </div>
        </a>
      `
        )
        .join("")}
    </div>
  `;
}

export function renderAbout(data) {
  const section = document.querySelector(".about");
  if (!section) return;
  const ab = data.about;
  const toolkitIcons = [
    { name: "VS Code", image: "assets/images/new%20tech%20stack/vs%20code.png" },
    { name: "Figma", image: "assets/images/new%20tech%20stack/figma.png" },
    { name: "Framer", image: "assets/images/new%20tech%20stack/framer.png" },
    { name: "ProtoPie", image: "assets/images/new%20tech%20stack/protopie.png" },
    { name: "Figr", image: "assets/images/new%20tech%20stack/figr.png" },
    { name: "Notion", image: "assets/images/new%20tech%20stack/notion.png" },
    { name: "Stitch", image: "assets/images/new%20tech%20stack/stitch.png" },
    { name: "Claude", image: "assets/images/new%20tech%20stack/ckaude.png" },
    { name: "Gemini", image: "assets/images/new%20tech%20stack/gemini.png" },
  ];

  section.innerHTML = `
    <div class="section-heading">
      <div class="section-kicker">${ab.sectionLabel}</div>
      <h2>${ab.heading.replace("Me", '<img class="about__heading-icon" src="assets/images/About%20me.png" alt=""> Me')}</h2>
    </div>
    <div class="about__bio">
      ${ab.bio.map((p) => `<p>${p}</p>`).join("")}
    </div>
    <div class="about__bento">
      <div class="about__portrait">
        <img src="${ab.portrait}" alt="${data.personal.name}">
      </div>
      <div class="about__details">
        <div class="about-facts">
          ${ab.details
            .map(
              (d) => `
            <div class="${d.isLink ? "about-facts__email" : ""}">
              <span>${d.label}</span>
              <strong>${d.isLink ? `<a href="${d.href}">${d.value}</a><button class="about-facts__copy" type="button" data-copy="${d.value}" aria-label="Copy email address" title="Copy email"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg></button>` : d.value}${d.note ? ` <em>(${d.note})</em>` : ""}</strong>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="toolkit">
          <span class="toolkit__label">${ab.toolkit.sectionLabel}</span>
          <div class="toolkit__icons">
            ${toolkitIcons.map((tool) => `<img src="${tool.image}" alt="${tool.name}" title="${tool.name}">`).join("")}
          </div>
        </div>
      </div>
    </div>
    <div class="about__cards">
      <article class="about__card">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3.75h11.5A2.5 2.5 0 0 1 19 6.25v14H7.5A2.5 2.5 0 0 1 5 17.75z"/><path d="M5 17.75a2.5 2.5 0 0 1 2.5-2.5H19M9 8h6"/></svg>
        <div><h3>${ab.outsideOfDesign.heading}</h3><p>${ab.outsideOfDesign.text}</p></div>
      </article>
      <article class="about__card">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></svg>
        <div><h3>${ab.opportunities.title}</h3><p>${ab.opportunities.text}</p></div>
      </article>
    </div>
  `;

  const copyButton = section.querySelector(".about-facts__copy");
  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy);
      copyButton.classList.add("is-copied");
      copyButton.title = "Copied!";
      window.setTimeout(() => { copyButton.classList.remove("is-copied"); copyButton.title = "Copy email"; }, 1600);
    } catch {
      window.location.href = `mailto:${copyButton.dataset.copy}`;
    }
  });
}

function setupJourneyRider(section) {
  const grid = section.querySelector(".experience-grid");
  const rider = grid?.querySelector(".journey-rider");
  const items = grid ? [...grid.querySelectorAll(".experience-item")] : [];
  if (!grid || !rider || items.length < 2) return;

  // The rider travels up the rail: from the last card (college) to the first (Fyrasoft).
  const measure = () => {
    const centre = (el) => el.offsetTop + el.offsetHeight / 2;
    grid.style.setProperty("--rider-start", `${centre(items[items.length - 1])}px`);
    grid.style.setProperty("--rider-end", `${centre(items[0])}px`);
  };
  measure();
  window.addEventListener("resize", measure, { passive: true });
  window.addEventListener("load", measure, { once: true });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    grid.classList.add("is-rider-done");
    return;
  }

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (!entry.isIntersecting) return;
      measure();
      grid.classList.add("is-riding");
      obs.disconnect();
    },
    { threshold: 0.55 }
  );
  observer.observe(grid);
}

export function renderJourney(data) {
  const section = document.querySelector(".experience");
  if (!section) return;
  const j = data.journey;

  section.innerHTML = `
    <div class="section-heading">
      <div class="section-kicker">${j.sectionLabel}</div>
      <h2>My Design <img class="journey__heading-icon" src="assets/images/How%20i%20work-1.png" alt=""> Journey</h2>
    </div>
    <div class="experience-grid">
      <div class="journey-rider" aria-hidden="true">
        <img class="journey-rider__cycle" src="assets/images/journey/rider-cycle.png" alt="">
        <img class="journey-rider__bike" src="assets/images/journey/rider-bike.png" alt="">
      </div>
      ${j.timeline
        .map(
          (item) => `
        <article class="experience-item">
          <img src="${item.icon}" alt="">
          <div class="experience-item__heading">
            <h3>${item.company}</h3>
            <strong>${item.role.toUpperCase()}</strong>
          </div>
          <span class="experience-item__duration">${item.duration.toUpperCase()}</span>
        </article>
      `
        )
        .join("")}
    </div>
  `;

  setupJourneyRider(section);
}

export function renderContact(data) {
  const section = document.querySelector(".contact");
  if (!section) return;
  const c = data.contact;

  section.innerHTML = `
    <div class="section-heading">
      <div class="section-kicker">${c.sectionLabel}</div>
      <h2>${c.heading}</h2>
      <p>${c.description}</p>
    </div>
    <form class="contact-form">
      <label>${c.fields.nameLabel}<input name="name" autocomplete="name" required placeholder="${c.fields.namePlaceholder}"></label>
      <label>${c.fields.emailLabel}<input name="email" type="email" autocomplete="email" required placeholder="${c.fields.emailPlaceholder}"></label>
      <label>${c.fields.messageLabel}<textarea name="message" rows="5" required placeholder="${c.fields.messagePlaceholder}"></textarea></label>
      <button class="button button--dark" type="submit">${c.cta}</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  `;
}

export function renderFindMeOnline(data) {
  const section = document.querySelector(".socials");
  if (!section) return;
  const f = data.findMeOnline;

  section.innerHTML = `
    <div class="section-heading">
      <div class="section-kicker">${f.sectionLabel}</div>
      <h2>${f.heading}</h2>
      <p>${f.subtitle}</p>
    </div>
    ${f.socialLinks
      .map(
        (link) => `
      <a class="social-link" href="${link.href}" ${link.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""} ${link.copy ? `data-copy="${link.copy}" aria-label="Copy email address ${link.copy}"` : ""}>
        <span>${link.name}</span>
        <span>${link.detail}</span>
        <b>${link.copy ? "⧉" : "↗"}</b>
      </a>
    `
      )
      .join("")}
  `;

  section.querySelectorAll(".social-link[data-copy]").forEach((link) => {
    const detail = link.querySelector("span:nth-child(2)");
    const original = detail.textContent;
    let timer;
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(link.dataset.copy);
        detail.textContent = `Copied ${link.dataset.copy}`;
        link.classList.add("is-copied");
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          detail.textContent = original;
          link.classList.remove("is-copied");
        }, 2000);
      } catch {
        window.location.href = link.href;
      }
    });
  });
}

export function renderFooter(data) {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;
  const ft = data.footer;
  const logoImg = data.personal.logoImage;

  footer.innerHTML = `
    <div class="footer-art">
      <img class="footer-art__board" src="assets/footer%20section%20image/board.png" alt="">
      <img class="footer-art__item footer-art__paper" src="assets/footer%20section%20image/paper.png" alt="">
      <img class="footer-art__item footer-art__sign" src="assets/footer%20section%20image/sign.png" alt="">
      <img class="footer-art__item footer-art__phone" src="assets/footer%20section%20image/phone.png" alt="">
      <img class="footer-art__item footer-art__uno-back" src="assets/footer%20section%20image/uno%20back.png" alt="">
      <img class="footer-art__item footer-art__uno-front" src="assets/footer%20section%20image/uno%20front.png" alt="">
      <img class="footer-art__logo" src="${logoImg}" alt="${ft.monogram}">
    </div>
    <p>${ft.monogram} ${ft.tagline} &bull; ${ft.copyright}</p>
  `;
}

export function renderAll(data) {
  // Only the homepage takes its title/description from portfolioData; case-study pages keep their own.
  if (data.meta && !document.querySelector(".case-shell")) {
    if (data.meta.title) document.title = data.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && data.meta.description) metaDesc.content = data.meta.description;
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon && data.meta.favicon) favicon.href = data.meta.favicon;
  }

  renderNavigation(data);
  renderHero(data);
  renderFeaturedProject(data);
  renderSelectedProjects(data);
  renderAbout(data);
  renderJourney(data);
  renderContact(data);
  renderFindMeOnline(data);
  renderFooter(data);
}
