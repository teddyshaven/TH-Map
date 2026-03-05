// ---------------- MAP ----------------
const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -2
});
const bounds = [[0, 0], [4096, 4096]];
L.imageOverlay("worldmap.png", bounds).addTo(map);
map.fitBounds(bounds);

// ---------------- LAYERS ----------------
const layers = {
  fruits:          L.layerGroup().addTo(map),
  stone:           L.layerGroup().addTo(map),
  crystal:         L.layerGroup().addTo(map),
  creatures:       L.layerGroup().addTo(map),
  magicalVisitors: L.layerGroup().addTo(map)
};

// ---------------- FRUIT COLOURS ----------------
const fruitColors = {
  // Persistent
  "Azureberry":        "#2196f3", // bright blue
  "Ghost Berry":       "#e8e4dc", // off-white
  // Spring
  "Skydrop Berry":     "#1b3a6e", // midnight blue
  "Nightshade Berry":  "#1a0033", // darkest purple
  "Emberberry":        "#e8a020", // orange-yellow
  "Bloodberry":        "#6b0a0a", // dark red
  "Greenwhistle Apple":"#8db87a", // pale forest green
  // Summer
  "Solberry":          "#a0621a", // autumn bronze
  "Nightblush Berry":  "#5c1a2e", // muted burgundy
  "Tigermelon":        "#2d6b2d", // rich green
  "Velvenight Berry":  "#0d0d2b", // blue-black
  "Heartgleam":        "#7a1a1a", // muted dark red
  "Honeycran Berry":   "#8b5e1a", // golden brown
  "Sunapple":          "#cc1f1f", // vibrant red
  // Fall
  "Mirthshade":        "#5b1a8b", // rich purple
  "Mireberry":         "#1a4d1a", // forest green
  "Mellowspike":       "#c8e88a", // pale lime green
  "Scarletip":         "#4d0000", // darkest red
  "Seafallow Berry":   "#0a0a2e", // darkest midnight blue
  "Amberburst":        "#d4a800", // gold-yellow
  "Amberfall Apple":   "#c87800", // amber
  // Winter
  "Velvitfrost Berry": "#6a3a8b", // wintery purple
  "Twilipuff":         "#d8c8f0", // pale purple
  "Faepeach":          "#f5c8d0", // soft pink
  "Frostgleam":        "#a8d4f0", // light blue
  "Icerose Berry":     "#b30000", // crimson
  "Lunabright":        "#a8e8c8", // mint green
  "Frostveil Apple":   "#c8e8f5", // icy blue
  // Coming later
  "Royal Peach":       "#f5a0b8"  // pink
};

// ---------------- ACTIVE SEASON ----------------
let activeSeason = "spring";
let activeFruit = ""; // empty = show all fruits for the season

// ---------------- DRAW FRUITS ----------------
function drawFruits() {
  layers.fruits.clearLayers();

  fruitLocations.forEach(location => {
    let fruitName, color;

    if (location.type === "persistent") {
      // Always show, regardless of season
      fruitName = location.fruit;
      color = fruitColors[fruitName] || "#aaaaaa";
      L.circleMarker(location.coords, {
        radius: 6, fillColor: color, color: "#222", weight: 1, fillOpacity: 0.9
      })
      .bindPopup(`<b>${fruitName}</b><br><i>Year-round</i>`)
      .addTo(layers.fruits);

    } else if (location.type === "seasonal") {
      if (activeSeason === "all") {
        // Hide seasonal locations when "All Year" is selected
        return;
      } else {
        // Show only the fruit for the active season
        fruitName = location.fruits[activeSeason];
        if (!fruitName) return;
        // If a specific fruit filter is active, skip non-matching locations
        if (activeFruit && fruitName !== activeFruit) return;
        color = fruitColors[fruitName] || "#aaaaaa";
        L.circleMarker(location.coords, {
          radius: 6, fillColor: color, color: "#222", weight: 1, fillOpacity: 0.9
        })
        .bindPopup(`<b>${fruitName}</b>`)
        .addTo(layers.fruits);
      }
    }
  });
}
drawFruits();

// ---------------- DRAW STONE ----------------
stoneLocations.forEach(location => {
  L.circleMarker(location.coords, {
    radius: 6, fillColor: "#a89070", color: "#222", weight: 1, fillOpacity: 0.9
  })
  .bindPopup("<b>Stone</b>")
  .addTo(layers.stone);
});

// ---------------- DRAW CRYSTAL ----------------
crystalLocations.forEach(location => {
  (location.crystals || []).forEach(name => {
    const type = crystalTypes[name] || { color: "#a78bfa", info: null };
    const popup = type.info
      ? `<b>${name}</b><br><i>⚠️ ${type.info}</i>`
      : `<b>${name}</b>`;
    L.circleMarker(location.coords, {
      radius: 6, fillColor: type.color, color: "#222", weight: 1, fillOpacity: 0.9
    })
    .bindPopup(popup)
    .addTo(layers.crystal);
  });
});

// ---------------- DRAW CREATURES ----------------
const CREATURE_RADIUS = 150;

creatureLocations.forEach(location => {
  // Draw spawn radius circle
  L.circle(location.coords, {
    radius: location.radius || CREATURE_RADIUS,
    color: "#e05252",
    weight: 1.5,
    opacity: 0.6,
    fillColor: "#e05252",
    fillOpacity: 0.08
  }).addTo(layers.creatures);

  // Draw marker and popup for each creature at this location
  (location.creatures || []).forEach(name => {
    const type = creatureTypes[name] || { color: "#e05252", resource: name, icon: null, crafting: "" };

    const iconHtml = type.icon
      ? `<img src="${type.icon}" style="width:40px;height:40px;object-fit:contain;display:block;margin:0 auto 6px auto;">`
      : "";
    const craftingHtml = type.crafting
      ? `<div style="margin-top:6px;font-size:11px;color:#666;"><b>Used in:</b> ${type.crafting}</div>`
      : "";

    const popupHtml = `
      <div style="text-align:center;min-width:120px;">
        ${iconHtml}
        <b style="font-size:13px;">${name}</b><br>
        <span style="font-size:12px;color:#444;">${type.resource || ""}</span>
        ${craftingHtml}
      </div>`;

    L.circleMarker(location.coords, {
      radius: 6,
      fillColor: type.color,
      color: "#222",
      weight: 1,
      fillOpacity: 0.9
    })
    .bindPopup(popupHtml)
    .addTo(layers.creatures);
  });
});

// ---------------- DRAW MAGICAL VISITORS ----------------
magicalVisitorLocations.forEach(location => {
  L.circleMarker(location.coords, {
    radius: 6, fillColor: "#c77dff", color: "#222", weight: 1, fillOpacity: 0.9
  })
  .bindPopup("<b>Ulmbrow</b>")
  .addTo(layers.magicalVisitors);
});

// ---------------- LAYER TOGGLES ----------------
const toggleMap = {
  "toggle-fruits":           layers.fruits,
  "toggle-stone":            layers.stone,
  "toggle-crystal":          layers.crystal,
  "toggle-creatures":        layers.creatures,
  "toggle-magical-visitors": layers.magicalVisitors
};
Object.entries(toggleMap).forEach(([id, layer]) => {
  document.getElementById(id).addEventListener("change", function () {
    this.checked ? map.addLayer(layer) : map.removeLayer(layer);
  });
});

// ---------------- SEASON FILTER ----------------
document.querySelectorAll(".season-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    // Set active season
    document.querySelectorAll(".season-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    activeSeason = this.dataset.season;
    activeFruit = "";

    // Show/hide dropdowns
    document.querySelectorAll(".fruit-dropdown").forEach(d => d.classList.remove("open"));
    const dropdown = document.getElementById("dropdown-" + activeSeason);
    if (dropdown) dropdown.classList.add("open");

    // Reset fruit filter buttons
    document.querySelectorAll(".fruit-filter-btn").forEach(b => b.classList.remove("active"));

    drawFruits();
  });
});

// ---------------- FRUIT FILTER ----------------
document.querySelectorAll(".fruit-filter-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".fruit-filter-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    activeFruit = this.dataset.fruit; // empty string = show all
    drawFruits();
  });
});

// ---------------- COORD CAPTURE ----------------
const coordBox = document.getElementById("coord-display");

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showCopied())
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const el = document.createElement("textarea");
  el.value = text;
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.focus();
  el.select();
  try {
    document.execCommand("copy");
    showCopied();
  } catch (err) {
    console.warn("Copy failed:", err);
  }
  document.body.removeChild(el);
}

function showCopied() {
  coordBox.dataset.prev = coordBox.textContent;
  coordBox.textContent = "✓ Copied!";
  coordBox.classList.add("copied");
  setTimeout(() => {
    coordBox.textContent = coordBox.dataset.prev;
    coordBox.classList.remove("copied");
  }, 1200);
}

map.on("click", e => {
  const lat = Math.round(e.latlng.lat);
  const lng = Math.round(e.latlng.lng);
  const coordText = `[${lat}, ${lng}]`;
  coordBox.textContent = coordText;
  copyToClipboard(coordText);
  console.log(coordText);
});

// ---------------- SEARCH ----------------
let highlightCircle = null;

function buildSearchIndex() {
  const index = [];

  // Fruits
  fruitLocations.forEach(location => {
    if (location.type === "persistent") {
      index.push({ label: location.fruit, category: "Fruit", coords: location.coords });
    } else if (location.type === "seasonal") {
      Object.entries(location.fruits).forEach(([season, name]) => {
        if (!index.find(e => e.label === name && e.category === "Fruit")) {
          index.push({ label: name, category: "Fruit", coords: location.coords, season });
        }
      });
    }
  });

  // Crystals
  crystalLocations.forEach(location => {
    (location.crystals || []).forEach(name => {
      index.push({ label: name, category: "Crystal", coords: location.coords });
    });
  });

  // Creatures — index both creature name and resource name
  creatureLocations.forEach(location => {
    (location.creatures || []).forEach(name => {
      const type = creatureTypes[name];
      index.push({ label: name, category: "Creature", coords: location.coords });
      if (type && type.resource) {
        index.push({ label: type.resource, category: "Resource", coords: location.coords, creatureName: name });
      }
    });
  });

  return index;
}

function showHighlight(coords) {
  if (highlightCircle) map.removeLayer(highlightCircle);
  highlightCircle = L.circleMarker(coords, {
    radius: 18,
    color: "#ffffff",
    weight: 3,
    fillColor: "#ffffff",
    fillOpacity: 0.25,
    opacity: 0.9
  }).addTo(map);

  // Fade out after 3 seconds
  setTimeout(() => {
    if (highlightCircle) {
      map.removeLayer(highlightCircle);
      highlightCircle = null;
    }
  }, 3000);
}

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  searchResults.innerHTML = "";

  if (query.length < 2) {
    searchResults.style.display = "none";
    return;
  }

  const index = buildSearchIndex();
  const matches = index.filter(e => e.label.toLowerCase().includes(query));

  // Deduplicate by label
  const seen = new Set();
  const unique = matches.filter(e => {
    const key = e.label + e.category;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (unique.length === 0) {
    searchResults.style.display = "none";
    return;
  }

  unique.slice(0, 10).forEach(result => {
    const item = document.createElement("div");
    item.className = "search-result-item";
    item.innerHTML = `<span class="search-result-label">${result.label}</span><span class="search-result-category">${result.category}</span>`;
    item.addEventListener("click", () => {
      map.setView(result.coords, 1);
      showHighlight(result.coords);
      searchResults.style.display = "none";
      searchInput.value = result.label;
    });
    searchResults.appendChild(item);
  });

  searchResults.style.display = "block";
});

// Hide results when clicking outside
document.addEventListener("click", e => {
  if (!document.getElementById("search-wrapper").contains(e.target)) {
    searchResults.style.display = "none";
  }
});
