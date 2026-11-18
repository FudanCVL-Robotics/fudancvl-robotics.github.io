(() => {
  "use strict";

  const planets = [
    ["00", "Earth", "Solar System · Project World", "../assets/planets/planet-00-earth.webp", ["project", "solar"], "WBench"],
    ["01", "Continuum", "Original · Project World", "../assets/planets/planet-01-wbench-long.webp", ["project", "original"], "WBench-Long"],
    ["02", "Red Frontier", "Original · Project World", "../assets/planets/planet-02-wbench-robo.webp", ["project", "original"], "WBench-Robo"],
    ["03", "Mosaic", "Original · Project World", "../assets/planets/planet-03-wbench-plus-plus.webp", ["project", "original"], "WBench++"],
    ["04", "Loop", "Original · Project World", "../assets/planets/planet-04-agent-loop.webp", ["project", "original"], "AgentLoop"],
    ["05", "Arena", "Original · Project World", "../assets/planets/planet-05-agent-arena.webp", ["project", "original"], "AgentArena"],
    ["06", "Archive", "Original · Project World", "../assets/planets/planet-06-agent-memory.webp", ["project", "original"], "AgentMemory"],
    ["07", "Prism", "Original · Project World", "../assets/planets/planet-07-scene-edit.webp", ["project", "original"], "SceneEdit"],
    ["08", "Chronos", "Original · Project World", "../assets/planets/planet-08-video-reason.webp", ["project", "original"], "VideoReason"],
    ["09", "Trace", "Original · Project World", "../assets/planets/planet-09-world-trace.webp", ["project", "original"], "WorldTrace"],
    ["10", "Sun", "Solar System · Star", "../assets/planets/planet-10-sun.webp", ["solar"]],
    ["11", "Mercury", "Solar System · Planet", "../assets/planets/planet-11-mercury.webp", ["solar"]],
    ["12", "Venus", "Solar System · Planet", "../assets/planets/planet-12-venus.webp", ["solar"]],
    ["13", "Mars", "Solar System · Planet", "../assets/planets/planet-13-mars.webp", ["solar"]],
    ["14", "Jupiter", "Solar System · Planet", "../assets/planets/planet-14-jupiter.webp", ["solar"]],
    ["15", "Saturn", "Solar System · Planet", "../assets/planets/planet-15-saturn.webp", ["solar"]],
    ["16", "Uranus", "Solar System · Planet", "../assets/planets/planet-16-uranus.webp", ["solar"]],
    ["17", "Neptune", "Solar System · Planet", "../assets/planets/planet-17-neptune.webp", ["solar"]],
    ["18", "Moon", "Solar System · Moon", "../assets/planets/planet-18-moon.webp", ["solar", "moons"]],
    ["19", "Pluto", "Solar System · Dwarf Planet", "../assets/planets/planet-19-pluto.webp", ["solar"]],
    ["20", "Titan", "Solar System · Moon", "../assets/planets/planet-20-titan.webp", ["solar", "moons"]],
    ["21", "Europa", "Solar System · Moon", "../assets/planets/planet-21-europa.webp", ["solar", "moons"]],
    ["22", "Io", "Solar System · Moon", "../assets/planets/planet-22-io.webp", ["solar", "moons"]],
    ["23", "Ganymede", "Solar System · Moon", "../assets/planets/planet-23-ganymede.webp", ["solar", "moons"]],
    ["24", "Enceladus", "Solar System · Moon", "../assets/planets/planet-24-enceladus.webp", ["solar", "moons"]],
    ["25", "Triton", "Solar System · Moon", "../assets/planets/planet-25-triton.webp", ["solar", "moons"]],
    ["26", "Ceres", "Solar System · Dwarf Planet", "../assets/planets/planet-26-ceres.webp", ["solar"]],
    ["27", "Callisto", "Solar System · Moon", "../assets/planets/planet-27-callisto.webp", ["solar", "moons"]],
    ["28", "Cybertron", "Original Rendering · Machine World", "../assets/planets/planet-28-mechworld.webp", ["original"]],
    ["29", "Forgeworld", "Original · Machine World", "../assets/planets/planet-29-forgeworld.webp", ["original"]],
    ["30", "Duneworld", "Original · Desert World", "../assets/planets/planet-30-duneworld.webp", ["original"]],
    ["31", "Cryoworld", "Original · Ice World", "../assets/planets/planet-31-cryoworld.webp", ["original"]],
    ["32", "Copper Giant", "Original · Gas Giant", "../assets/planets/planet-32-copper-giant.webp", ["original"]],
    ["33", "Pearl Ringworld", "Original · Ringed World", "../assets/planets/planet-33-pearl-ringworld.webp", ["original"]],
    ["34", "Verdant World", "Original · Jungle World", "../assets/planets/planet-34-verdant-world.webp", ["original"]],
    ["35", "Ember World", "Original · Volcanic World", "../assets/planets/planet-35-ember-world.webp", ["original"]],
    ["36", "Cyan Ice", "Original · Ice World", "../assets/planets/planet-36-cyan-ice.webp", ["original"]],
    ["37", "Lavender Giant", "Original · Gas Giant", "../assets/planets/planet-37-lavender-giant.webp", ["original"]],
    ["38", "Iron World", "Original · Rocky World", "../assets/planets/planet-38-iron-world.webp", ["original"]],
    ["39", "Coral Ocean", "Original · Ocean World", "../assets/planets/planet-39-coral-ocean.webp", ["original"]],
    ["40", "Jade Tempest", "Original · Storm World", "../assets/planets/planet-40-jade-tempest.webp", ["original"]],
    ["41", "Argent", "Original · Metallic World", "../assets/planets/planet-41-argent.webp", ["original"]],
    ["42", "Mesa World", "Original · Desert World", "../assets/planets/planet-42-mesa-world.webp", ["original"]],
    ["43", "Abyss Storm", "Original · Gas World", "../assets/planets/planet-43-abyss-storm.webp", ["original"]],
    ["44", "Mint Veil", "Original · Ocean World", "../assets/planets/planet-44-mint-veil.webp", ["original"]],
    ["45", "Crimson Rift", "Original · Volcanic World", "../assets/planets/planet-45-crimson-rift.webp", ["original"]],
    ["46", "Aurelia", "Original · Gas Giant", "../assets/planets/planet-46-aurelia.webp", ["original"]],
    ["47", "Obsidian Aurora", "Original · Crystal World", "../assets/planets/planet-47-obsidian-aurora.webp", ["original"]],
    ["48", "Opal World", "Original · Iridescent World", "../assets/planets/planet-48-opal-world.webp", ["original"]],
    ["49", "Moss Ocean", "Original · Wetland World", "../assets/planets/planet-49-moss-ocean.webp", ["original"]]
  ].map(([id, name, type, src, groups, project]) => ({ id, name, type, src, groups, project }));

  const grid = document.querySelector("#planet-library-grid");
  const count = document.querySelector("#planet-library-count");
  const filters = [...document.querySelectorAll("[data-planet-filter]")];
  const projectUrls = new Map(window.RESEARCH_CONTENT.map(project => [project.coverTitle, project.url]));
  // Saturn's ring system needs its wider native frame.
  const nativeSizes = { "15": [1774, 887] };
  let selected = "all";

  function card(planet, index) {
    const article = document.createElement("article");
    article.className = "planet-library-card";
    const stage = document.createElement("a");
    stage.className = "planet-library-stage";
    const full = planet.src.replace(/\.webp$/, "-full.webp");
    stage.href = full;
    stage.target = "_blank";
    stage.rel = "noopener";
    stage.setAttribute("aria-label", `Open the full-size image of ${planet.name} in a new tab`);

    const [width, height] = nativeSizes[planet.id] || [1536, 1024];
    const thumb = planet.src;
    const thumbWidth = planet.project ? 1024 : 768;
    const image = document.createElement("img");
    image.alt = "";
    image.width = width;
    image.height = height;
    image.loading = index < 6 ? "eager" : "lazy";
    image.sizes = "(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 47vw, (max-width: 1272px) 32vw, 378px";
    const sources = [`${thumb} ${thumbWidth}w`, `${full} ${width}w`];
    if (planet.project) sources.unshift(planet.src.replace(/\.webp$/, "-512.webp") + " 512w");
    image.srcset = sources.join(", ");
    image.src = thumb;
    stage.append(image);
    const meta = document.createElement("div");
    meta.className = "planet-library-meta";
    const title = document.createElement("h2");
    title.textContent = planet.name;
    const type = document.createElement("p");
    type.textContent = planet.type;
    meta.append(title, type);
    const url = projectUrls.get(planet.project);
    if (url) {
      const link = document.createElement("a");
      link.href = `../${url}`;
      link.textContent = `${planet.project} →`;
      link.setAttribute("aria-label", `View the ${planet.project} project`);
      meta.append(link);
    }
    article.append(stage, meta);
    return article;
  }

  const cards = planets.map(card);
  grid.append(...cards);
  function render() {
    let visible = 0;
    planets.forEach((planet, index) => {
      cards[index].hidden = selected !== "all" && !planet.groups.includes(selected);
      if (!cards[index].hidden) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? "World" : "Worlds"}`;
    filters.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.planetFilter === selected)));
  }

  filters.forEach(button => button.addEventListener("click", () => {
    selected = button.dataset.planetFilter;
    render();
  }));
  render();
})();
