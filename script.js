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
  ore:             L.layerGroup().addTo(map),
  creatures:       L.layerGroup().addTo(map),
  magicalVisitors: L.layerGroup().addTo(map)
};

// ---------------- FRUIT COLOURS ----------------
const fruitColors = {
  // Persistent
  "Azureberry":        "#4cc9f0",
  "Ghost Berry":       "#dddddd",
  // Spring
  "Skydrop Berry":     "#4895ef",
  "Nightshade Berry":  "#560bad",
  "Emberberry":        "#ff8800",
  "Bloodberry":        "#e63946",
  // Summer
  "Solberry":          "#ffb703",
  "Nightblush Berry":  "#c77dff",
  "Tigermelon":        "#fb8500",
  "Velvenight Berry":  "#6a0572",
  "Heartgleam":        "#ff6b9d",
  "Honeycran Berry":   "#f4a261",
  // Fall
  "Mirthshade":        "#b5838d",
  "Mireberry":         "#6d6875",
  "Mellowspike":       "#a8dadc",
  "Scarletip":         "#e76f51",
  "Seafallow Berry":   "#52b788",
  "Amberburst":        "#e9c46a",
  // Winter
  "Velvitfrost Berry":  "#dde5b6",
  "Twilipuff":         "#bde0fe",
  "Faepeach":          "#ffccd5",
  "Frostgleam":        "#caf0f8",
  "Icerose Berry":     "#90e0ef",
  "Lunabright":        "#e2cfee"
};

// ---------------- ACTIVE SEASON ----------------
let activeSeason = "spring";

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

// ---------------- DRAW ORE ----------------
oreLocations.forEach(location => {
  L.circleMarker(location.coords, {
    radius: 6, fillColor: "#c0c0c0", color: "#222", weight: 1, fillOpacity: 0.9
  })
  .bindPopup("<b>Ore</b>")
  .addTo(layers.ore);
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
  "toggle-ore":              layers.ore,
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
    document.querySelectorAll(".season-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    activeSeason = this.dataset.season;
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
