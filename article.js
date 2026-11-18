(() => {
  "use strict";
  const tocLinks = [...document.querySelectorAll(".article-toc a")];
  const sections = tocLinks.map(link => document.querySelector(link.getAttribute("href")));
  let ticking = false;
  function updateSection() {
    const sectionStart = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) + 2;
    let current = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= sectionStart) current = section; });
    tocLinks.forEach(link => {
      if (link.hash === `#${current.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    ticking = false;
  }
  function scheduleUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateSection);
  }
  window.addEventListener("scroll", scheduleUpdate, {passive:true});
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("pageshow", scheduleUpdate);
  updateSection();
  async function copy(text, status, success, failure) {
    try { await navigator.clipboard.writeText(text); status.textContent = success; }
    catch { status.textContent = failure; }
  }
  document.querySelector("#share-link").addEventListener("click", () => {
    const url = new URL(window.location.href); url.hash = "";
    copy(url.href, document.querySelector("#share-status"), "Link copied", "Copy the page URL from your address bar.");
  });
  document.querySelector("#copy-citation")?.addEventListener("click", () => {
    copy(document.querySelector("#bibtex").textContent, document.querySelector("#citation-status"), "Citation copied", "Select and copy the citation below.");
  });
})();
