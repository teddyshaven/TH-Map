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
creatureLocations.forEach(location => {
  (location.creatures || []).forEach(name => {
    const type = creatureTypes[name] || { color: "#e05252" };
    L.circleMarker(location.coords, {
      radius: 6, fillColor: type.color, color: "#222", weight: 1, fillOpacity: 0.9
    })
    .bindPopup(`<b>${name}</b>`)
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
