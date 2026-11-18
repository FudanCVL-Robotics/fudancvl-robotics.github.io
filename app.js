(() => {
  "use strict";
  const menuToggle = document.querySelector("#menu-toggle");
  const mobileNav = document.querySelector("#mobile-nav");
  function closeMenu() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const opening = mobileNav.hidden;
      mobileNav.hidden = !opening;
      menuToggle.setAttribute("aria-expanded", String(opening));
      menuToggle.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
    });
    mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  }
  document.addEventListener("click", event => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && mobileNav && !mobileNav.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  });
  window.matchMedia("(min-width: 761px)").addEventListener("change", event => { if (event.matches) closeMenu(); });

  const grid = document.querySelector("#research-grid");
  if (!grid) return;
  const search = document.querySelector("#research-search");
  const searchToggle = document.querySelector("#search-toggle");
  const research = document.querySelector("#research");
  const topicButtons = [...document.querySelectorAll("[data-topic]")];
  const emptyState = document.querySelector("#empty-state");
  const reset = document.querySelector("#reset-search");
  let selectedTopic = "all";

  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const projectHref = project => /^research\/[a-z0-9-]+\/$/.test(project.url) ? project.url : "index.html#research";

  function makeVisual(project) {
    const art = window.projectCoverImage(project, "", "card");
    const visual = make("div", "project-cover");
    visual.setAttribute("aria-hidden", "true");
    if (art || project.cover || project.planet) {
      visual.classList.add(art ? "cover-plate" : project.cover ? "earth-cover" : "planet-cover");
      const image = make("img");
      image.alt = "";
      image.loading = "lazy";
      image.width = art?.width || (project.cover ? 1672 : 1024);
      image.height = art?.height || (project.cover ? 941 : 683);
      if (art) {
        image.sizes = art.sizes;
        image.srcset = art.srcset;
      }
      image.src = art?.src || project.cover || project.planet;
      visual.append(image);
    } else {
      visual.classList.add("gradient-cover", "abstract-cover", `art-${project.coverStyle}`);
      visual.append(make("span", "art-orbit"), make("span", "art-caption", project.topic));
    }
    const label = make("span", "cover-title", project.coverTitle);
    label.setAttribute("aria-hidden", "true");
    visual.append(label);
    return visual;
  }

  function createCard(project) {
    const article = make("article", "work-card");
    const link = make("a", "work-link");
    link.href = projectHref(project);
    const meta = make("div", "work-meta");
    meta.append(make("span", "topic-label", project.topic || project.category));
    if (project.date) {
      const timeElement = document.createElement("time");
      timeElement.textContent = new Intl.DateTimeFormat("en-US", { month:"short", day:"numeric", year:"numeric", timeZone:"UTC" }).format(new Date(project.date + "T00:00:00Z"));
      timeElement.dateTime = project.date; meta.append(timeElement);
    } else meta.append(make("span", "preview-label", project.preview));

    const heading = make("h3", "work-title", project.title);
    heading.id = `work-${project.id}`;
    link.setAttribute("aria-labelledby", heading.id);
    const description = make("p", "work-description", project.description);
    link.append(makeVisual(project), meta, heading, description);
    article.append(link);
    return article;
  }

  const works = (window.RESEARCH_CONTENT || []).map(project => ({
    topic: project.topic,
    text: `${project.title} ${project.description} ${project.keywords} ${project.topic}`.normalize("NFKC").toLowerCase(),
    card: createCard(project)
  }));
  grid.append(...works.map(work => work.card));
  for (const button of topicButtons) {
    const topic = button.dataset.topic;
    button.querySelector("span").textContent = topic === "all" ? works.length : works.filter(work => work.topic === topic).length;
  }

  function filterProjects() {
    const terms = search.value.trim().normalize("NFKC").toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const work of works) {
      const matchesTopic = selectedTopic === "all" || selectedTopic === work.topic;
      work.card.hidden = !(matchesTopic && terms.every(term => work.text.includes(term)));
      if (!work.card.hidden) shown++;
    }
    emptyState.hidden = shown > 0;
    document.querySelector("#result-count").textContent = `${shown} ${shown === 1 ? "project" : "projects"}`;
    for (const button of topicButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.topic === selectedTopic));
    }
  }

  function focusSearch() {
    closeMenu();
    research.scrollIntoView({ block: "start" });
    search.focus({ preventScroll: true });
  }
  searchToggle.addEventListener("click", focusSearch);
  document.addEventListener("keydown", event => {
    if (event.key !== "/" || event.isComposing || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.matches("input, textarea, select") || event.target.isContentEditable) return;
    event.preventDefault();
    focusSearch();
  });
  search.addEventListener("input", filterProjects);
  search.addEventListener("keydown", event => {
    if (event.key !== "Escape" || event.isComposing) return;
    event.preventDefault();
    if (search.value) {
      search.value = "";
      filterProjects();
    } else {
      searchToggle.focus();
    }
  });
  document.querySelector("#project-search").addEventListener("submit", event => {
    event.preventDefault();
    const links = grid.querySelectorAll(".work-card:not([hidden]) .work-link");
    if (links.length === 1) links[0].click();
    else (links[0] || reset).focus();
  });
  reset.addEventListener("click", () => {
    search.value = "";
    selectedTopic = "all";
    filterProjects();
    focusSearch();
  });
  for (const button of topicButtons) {
    button.addEventListener("click", () => {
      selectedTopic = button.dataset.topic;
      filterProjects();
    });
  }
  for (const link of document.querySelectorAll("[data-explore-topic]")) {
    link.addEventListener("click", () => {
      selectedTopic = link.dataset.exploreTopic;
      search.value = "";
      filterProjects();
    });
  }
  filterProjects();
})();
