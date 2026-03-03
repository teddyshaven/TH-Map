// --- MAP SETUP ---
const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -2
});

// IMPORTANT: matches your 4096 image
const bounds = [[0,0],[4096,4096]];

// THIS IS THE LINE THAT SHOWS YOUR MAP
L.imageOverlay("worldmap.png", bounds).addTo(map);

map.fitBounds(bounds);


// --- LAYERS ---
const layers = {
  fruits: L.layerGroup().addTo(map)
};


// --- FRUIT COLOURS ---
const fruitColors = {
  "Azureberry": "#4cc9f0",
  "Sunapple": "#ffd166",
  "Ghost Berry": "#cdb4db",
  "Bloodberry": "#e63946",
  "Emberberry": "#ff6b6b",
  "Nightshade Berry": "#560bad",
  "Skydrop": "#4895ef"
};


// --- CREATE MARKERS ---
fruitLocations.forEach(location => {

  Object.values(location.fruits).flat().forEach(fruit => {

    if (!fruitColors[fruit]) return;

    L.circleMarker(location.coords, {
      radius: 6,
      fillColor: fruitColors[fruit],
      color: "#222",
      weight: 1,
      fillOpacity: 0.9
    })
    .bindPopup(`<b>${fruit}</b>`)
    .addTo(layers.fruits);

  });

});


// --- LEGEND TOGGLE ---
document
  .getElementById("toggle-fruits")
  .addEventListener("change", e => {

    if (e.target.checked) {
      map.addLayer(layers.fruits);
    } else {
      map.removeLayer(layers.fruits);
    }

});
