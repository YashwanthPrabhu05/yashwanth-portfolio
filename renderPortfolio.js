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
      ${hero.greeting} ${hero.titleRole} <img class="hero-icon hero-icon--star" src="assets/images/hero-head-2.png" alt="">
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
        <h2><span>Featured</span><span class="featured__doodle-slot heading-motion-slot"><img class="featured__doodle heading-motion-icon" src="assets/images/Feature%20project.png" alt=""></span><span>Project</span></h2>
      </div>
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
      <h2><span>Selected</span><span class="projects__folder-slot heading-motion-slot"><img class="projects__folder heading-motion-icon" src="assets/images/Selected%20project.png" alt=""></span><span>Projects</span></h2>
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
  const [featuredAchievement, ...otherAchievements] = flexData.achievements;

  section.innerHTML = `
    <div class="section-heading">
      <div class="section-kicker">${flexData.sectionLabel}</div>
      <h2>${flexData.heading.replace("Expected", '<img class="highlight__heading-icon" src="assets/images/Flex.png" alt=""> Expected')}</h2>
    </div>
    <p class="highlight__intro">${flexData.paragraphs.join(" ")}</p>
    <div class="highlight__feature">
      <div class="highlight__poster">
        <img src="assets/images/Flex.png" alt="">
        <div><span>CREATIVE HIGHLIGHTS</span><strong>${featuredAchievement.badge}</strong><b>${featuredAchievement.title}</b><small>${featuredAchievement.venue}</small></div>
      </div>
      <div class="highlight__side">
        <article class="highlight__story">
          <img src="assets/images/Flex.png" alt="">
          <div><h3>${featuredAchievement.title}</h3><span>${featuredAchievement.badge} · ${featuredAchievement.venue}</span></div>
          <p>${featuredAchievement.highlight || `${featuredAchievement.title} — ${featuredAchievement.venue}.`}</p>
        </article>
        <div class="highlight__achievements">
          <span class="highlight__eyebrow">MORE MOMENTS</span>
          <div class="highlight__metrics">
            ${otherAchievements
              .map((item) => `
              <article>
                <strong>${item.badge}</strong>
                <span>${item.title}</span>
                <small>${item.venue}</small>
              </article>
            `)
              .join("")}
          </div>
          <div class="highlight__actions">
            <span class="button button--muted" aria-label="More moments will be added">More soon</span>
            <a class="button button--white" href="#projects">Explore my work</a>
          </div>
        </div>
      </div>
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
            <div>
              <span>${d.label}</span>
              <strong>${d.isLink ? `<a href="${d.href}">${d.value}</a>` : d.value}</strong>
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
      <article class="grass-break">
        <div>
          <span>${j.transitionStatement.prefix}</span>
          <strong>${j.transitionStatement.highlight}</strong>
        </div>
        <img src="assets/Grass/Super%20Fun%20Easter%20Party%20Games%20For%20Kids%20-%20The%20Busy%20Bee%20At%20Kimberlys%201.png" alt="">
        <div class="grass-break__meadow" aria-hidden="true"></div>
      </article>
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
