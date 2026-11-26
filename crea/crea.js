/**
 * Interactive blocks for the CREA case study.
 * Each one is built from the cards and tables already in the page, so the text
 * is edited in index.html and still reads normally if this script doesn't run.
 */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function button(className, text, onClick) {
  const node = el("button", className, text);
  node.type = "button";
  node.addEventListener("click", onClick);
  return node;
}

function findTable(firstHeading) {
  return [...document.querySelectorAll(".zs-table")].find(
    (table) => table.querySelector("th").textContent.trim() === firstHeading
  );
}

const headings = (table) => [...table.querySelectorAll("th")].map((th) => th.textContent);
const rows = (table) => [...table.querySelectorAll("tbody tr")].map((tr) => [...tr.cells].map((td) => td.textContent));

// 1. "The loop": step through it, and after step 6 go back to step 3
function buildLoop() {
  const heading = [...document.querySelectorAll("#how-i-work .zs-sub")].find((h) => h.textContent === "The loop");
  const grid = heading?.nextElementSibling;
  if (!grid) return;
  const steps = [...grid.children].map((card) => ({
    title: card.querySelector("h3").textContent.replace(/^\d+\.\s*/, ""),
    text: card.querySelector("p").textContent,
  }));

  const box = el("div", "zs-card cx-loop");
  const track = el("div", "cx-track");
  const panel = el("div", "cx-panel");
  panel.setAttribute("aria-live", "polite");
  let current = 0;

  const dots = steps.map((step, index) => {
    const dot = button("cx-dot", String(index + 1), () => show(index));
    dot.setAttribute("aria-label", `Step ${index + 1}: ${step.title}`);
    track.append(dot);
    return dot;
  });
  const next = button("cx-action", "", () => show(current === steps.length - 1 ? 2 : current + 1));

  function show(index) {
    current = index;
    dots.forEach((dot, i) => {
      dot.setAttribute("aria-pressed", String(i === index));
      dot.classList.toggle("is-done", i < index);
    });
    panel.replaceChildren(el("strong", "", steps[index].title), el("p", "", steps[index].text));
    next.textContent = index === steps.length - 1 ? "↺ Back to step 3" : "Next step →";
  }

  box.append(track, panel, next);
  grid.replaceWith(box);
  show(0);
}

// 2. Switch between what I saw and what users felt
function buildEyes() {
  const table = findTable("What I saw as a designer");
  if (!table) return;
  const labels = headings(table);
  const data = rows(table);

  const box = el("div", "zs-card cx-eyes");
  const switcher = el("div", "cx-switch");
  const caption = el("p", "cx-caption");
  const list = el("ul", "cx-list");
  list.setAttribute("aria-live", "polite");

  const tabs = ["Designer eyes", "User eyes"].map((name, view) => {
    const tab = button("cx-tab", name, () => show(view));
    switcher.append(tab);
    return tab;
  });

  function show(view) {
    tabs.forEach((tab, i) => tab.setAttribute("aria-pressed", String(i === view)));
    box.classList.toggle("is-user", view === 1);
    caption.textContent = labels[view];
    list.replaceChildren(...data.map((row) => el("li", "", row[view])));
  }

  box.append(switcher, caption, list);
  table.replaceWith(box);
  show(0);
}

// 3. Doubts open one at a time to show what each one changed
function buildDoubts() {
  const table = findTable("My doubt");
  if (!table) return;
  const [, answerLabel] = headings(table);
  const box = el("div", "cx-doubts");

  rows(table).forEach(([doubt, answer]) => {
    const item = el("details", "cx-doubt");
    item.name = "crea-doubts";
    const body = el("p");
    body.append(el("b", "", `${answerLabel}: `), answer);
    item.append(el("summary", "", doubt), body);
    box.append(item);
  });

  table.replaceWith(box);
}

// 4. One week: pick a day
function buildWeek() {
  const table = findTable("Day");
  if (!table) return;
  const days = rows(table);

  const box = el("div", "zs-card cx-week");
  const strip = el("div", "cx-days");
  const bar = el("div", "cx-bar");
  const fill = el("i");
  const panel = el("p", "cx-focus");
  panel.setAttribute("aria-live", "polite");
  bar.append(fill);

  const tabs = days.map(([day], index) => {
    const tab = button("cx-tab", `Day ${day}`, () => show(index));
    strip.append(tab);
    return tab;
  });

  function show(index) {
    tabs.forEach((tab, i) => tab.setAttribute("aria-pressed", String(i === index)));
    fill.style.width = `${((index + 1) / days.length) * 100}%`;
    panel.textContent = days[index][1];
  }

  box.append(strip, bar, panel);
  table.replaceWith(box);
  show(0);
}

// 5. Tap a marketing line to rewrite it as a record
function buildVoice() {
  const table = findTable("Marketing voice");
  if (!table) return;
  const [before, after] = headings(table);
  const box = el("div", "zs-card cx-voice");
  const hint = el("p", "cx-caption", "Tap a line to rewrite it.");

  const lines = rows(table).map(([claim, record]) => {
    const line = button("cx-line", "", () => set(line, line.getAttribute("aria-pressed") !== "true"));
    line.dataset.claim = claim;
    line.dataset.record = record;
    return line;
  });
  const all = button("cx-action", "", () => {
    const rewrite = lines.some((line) => line.getAttribute("aria-pressed") !== "true");
    lines.forEach((line) => set(line, rewrite));
  });

  function set(line, rewritten) {
    line.setAttribute("aria-pressed", String(rewritten));
    line.replaceChildren(el("small", "", rewritten ? after : before), el("span", "", line.dataset[rewritten ? "record" : "claim"]));
    all.textContent = lines.every((item) => item.getAttribute("aria-pressed") === "true") ? "Show marketing voice" : "Rewrite all";
  }

  box.append(hint, ...lines, all);
  table.replaceWith(box);
  lines.forEach((line) => set(line, false));
}


buildLoop();
buildEyes();
buildDoubts();
buildWeek();
buildVoice();
