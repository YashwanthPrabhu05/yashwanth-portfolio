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
      ${hero.greeting} <br class="desktop-break">
      ${hero.titleRole} <img class="hero-icon hero-icon--star" src="assets/images/hero-head-2.png" alt=""> 
      <span class="accent">${hero.accentText}</span>
    </h1>
    <p>${hero.description} ${hero.workSnippet}</p>
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

  section.innerHTML = `
    <div class="featured__heading">
      <div>
        <div class="section-kicker">${feat.sectionLabel}</div>
        <h2>${feat.heading.replace(" ", "<br>")}</h2>
      </div>
      <img class="featured__doodle" src="assets/images/Feature%20project.png" alt="">
    </div>
    <a class="featured-card" href="${feat.cta.href}" aria-label="Read the ${feat.projectName} case study">
      <img class="featured-card__bg" src="assets/Zeno%20image/bg.png" alt="">
      <img class="featured-card__pattern" src="assets/Zeno%20image/patterns.png" alt="">
      <div class="featured-card__copy">
        <strong>${feat.subtitle.replace(". ", ".<br>")}</strong>
        <span class="featured-card__caption">${feat.description}</span>
      </div>
      <img class="featured-card__phone" src="assets/Zeno%20image/ZENO%20App.png" alt="${feat.projectName}">
      <span class="featured-card__brand" style="color: #fff; font-weight: 800; font-size: 20px; letter-spacing: 0.12em;">${feat.projectName}</span>
    </a>
    <div class="featured-summary">
      <div class="featured-summary__title">
        <img src="${data.personal.logoImage}" style="border-radius: 8px; width: 44px; height: 44px; object-fit: cover;" alt="${feat.projectName}">
        <div>
          <strong>${feat.projectName}</strong>
          <span>${feat.subtitle}</span>
        </div>
      </div>
      <p>${feat.description}</p>
      <div class="featured-summary__grid">
        ${feat.points
          .map(
            (pt) => `
          <article>
            <strong>${pt.title}</strong>
            <span>${pt.description}</span>
          </article>
        `
          )
          .join("")}
      </div>
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
      <h2>${sel.heading.replace(" ", "<br>")}</h2>
    </div>
    <div class="project-grid">
      ${sel.items
        .map(
          (item) => `
        <a class="project-card ${item.wide ? "project-card--wide" : ""}" href="${item.href}" ${item.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>
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

export function renderMoreThanExpected(data) {
  const section = document.querySelector("#flex, #more-than-expected, .highlight");
  if (!section) return;
  const flexData = data.moreThanExpected;

  section.innerHTML = `
    <div class="section-heading">
      <div class="section-kicker">${flexData.sectionLabel}</div>
      <h2>${flexData.heading.replace(" ", "<br>")}</h2>
    </div>
    ${flexData.paragraphs.map((p) => `<p class="highlight__intro">${p}</p>`).join("")}
    <div class="achievements-grid">
      ${flexData.achievements
        .map(
          (item) => `
        <div class="achievement-card">
          <span class="achievement-card__badge">${item.badge}</span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.venue}</p>
          </div>
        </div>
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

  section.innerHTML = `
    <div class="section-heading">
      <div class="section-kicker">${ab.sectionLabel}</div>
      <h2>${ab.heading.replace(" ", "<br>")}</h2>
    </div>
    <div class="about__intro">
      <div class="about__portrait">
        <img src="${ab.portrait}" alt="${data.personal.name}">
      </div>
      <div class="about__copy">
        ${ab.bio.map((p) => `<p>${p}</p>`).join("")}
      </div>
    </div>
    <div class="about-facts">
      ${ab.details
        .map(
          (d) => `
        <div>
          <span>${d.label}</span>
          <strong>${d.isLink ? `<a href="${d.href}">${d.value}</a>` : d.value}</strong>
        </div>
      `
        )
        .join("")}
    </div>
    <div class="toolkit">
      <div class="toolkit__heading">
        <div>
          <div class="section-kicker">${ab.toolkit.sectionLabel}</div>
          <h3>${ab.toolkit.heading}</h3>
        </div>
        <span>${ab.toolkit.subheading}</span>
      </div>
      <div class="toolkit-categories">
        ${ab.toolkit.categories
          .map(
            (cat) => `
          <div class="toolkit-group">
            <h4>${cat.name}</h4>
            <div class="toolkit-tags">
              ${cat.items.map((tool) => `<span class="toolkit-tag">${tool}</span>`).join("")}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    <div class="outside">
      <div>
        <div class="section-kicker">${ab.outsideOfDesign.sectionLabel}</div>
        <h3>${ab.outsideOfDesign.heading}</h3>
        <p>${ab.outsideOfDesign.text}</p>
      </div>
      <img src="assets/Grass/Super%20Fun%20Easter%20Party%20Games%20For%20Kids%20-%20The%20Busy%20Bee%20At%20Kimberlys%201.png" alt="Creative spirit">
    </div>
    <div class="opportunity">
      <img src="assets/images/Globe.png" alt="Open to opportunities">
      <div>
        <strong>${ab.opportunities.title}</strong>
        <p>${ab.opportunities.text}</p>
      </div>
      <span class="opportunity__status"><i></i> ${ab.opportunities.statusText}</span>
    </div>
  `;
}

export function renderJourney(data) {
  const section = document.querySelector(".experience");
  if (!section) return;
  const j = data.journey;

  section.innerHTML = `
    <div class="section-heading">
      <div class="section-kicker">${j.sectionLabel}</div>
      <h2>${j.heading.replace(" ", "<br>")}</h2>
    </div>
    <div class="experience-list">
      ${j.timeline
        .map(
          (item) => `
        <article class="experience-item">
          <img src="${item.icon}" style="object-fit: cover; border-radius: 8px;" alt="${item.company}">
          <div>
            <h3>${item.company}</h3>
            <strong>${item.role.toUpperCase()}</strong>
            <span>${item.duration.toUpperCase()}</span>
            <p>${item.description}</p>
          </div>
          <b>↗</b>
        </article>
      `
        )
        .join("")}
    </div>
    <div class="grass-break">
      <img src="assets/images/How%20i%20work-1.png" alt="">
      <div>
        <span>${j.transitionStatement.prefix}</span>
        <strong>${j.transitionStatement.highlight}</strong>
      </div>
    </div>
  `;
}

export function renderContact(data) {
  const section = document.querySelector(".contact");
  if (!section) return;
  const c = data.contact;

  section.innerHTML = `
    <div class="section-heading">
      <div class="section-kicker">${c.sectionLabel}</div>
      <h2>${c.heading.replace(" ", "<br>")}</h2>
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
      <h2>${f.heading.replace(" ", "<br>")}</h2>
      <p>${f.subtitle}</p>
    </div>
    ${f.socialLinks
      .map(
        (link) => `
      <a class="social-link" href="${link.href}" ${link.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>
        <span>${link.name}</span>
        <span>${link.detail}</span>
        <b>↗</b>
      </a>
    `
      )
      .join("")}
  `;
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
      <img class="footer-art__item footer-art__credit" src="assets/footer%20section%20image/credit%20text.png" alt="">
      <img class="footer-art__logo" src="${logoImg}" alt="${ft.monogram}">
    </div>
    <p>${ft.monogram} ${ft.tagline} &bull; ${ft.copyright}</p>
  `;
}

export function renderAll(data) {
  if (data.meta) {
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
  renderMoreThanExpected(data);
  renderAbout(data);
  renderJourney(data);
  renderContact(data);
  renderFindMeOnline(data);
  renderFooter(data);
}

