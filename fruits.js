// ---------------- FRUIT TYPES ----------------
// Seasonal rotations — same location, fruit changes by season
const seasonalGroups = [
  { spring: "Ghost Berry",      summer: "Solberry",        fall: "Mirthshade",   winter: "Velvitfrost Berry" },
  { spring: "Azureberry",       summer: "Nightblush Berry", fall: "Mireberry",    winter: "Twilipuff" },
  { spring: "Skydrop Berry",    summer: "Tigermelon",      fall: "Mellowspike",  winter: "Faepeach" },
  { spring: "Nightshade Berry", summer: "Velvenight Berry", fall: "Scarletip",    winter: "Frostgleam" },
  { spring: "Emberberry",       summer: "Heartgleam",      fall: "Seafallow Berry", winter: "Icerose Berry" },
  { spring: "Bloodberry",       summer: "Honeycran Berry",  fall: "Amberburst",   winter: "Lunabright" }
];

// Persistent fruits — present all year at these locations
// Azureberry and Ghost Berry have persistent locations separate from their seasonal ones

const fruitLocations = [
  // PERSISTENT:
  { id: 1, coords: [2349, 818], type: "persistent", fruit: "Azureberry" },
  { id: 2, coords: [2239, 873], type: "persistent", fruit: "Azureberry" },
  { id: 3, coords: [2302, 1251], type: "persistent", fruit: "Azureberry" },
  { id: 4, coords: [2166, 1118], type: "persistent", fruit: "Azureberry" },

  { id: 5, coords: [2626, 2456], type: "persistent", fruit: "Ghostberry" },
  { id: 6, coords: [2697, 2376], type: "persistent", fruit: "Ghostberry" },  
  { id: 6, coords: [2585, 2356], type: "persistent", fruit: "Ghostberry" }

  // SEASONAL:
  { id: 7, coords: [2942, 2344], type: "seasonal", fruits: {
   spring: "Ghost Berry",
  summer: "Solberry",
  fall:   "Mirthshade",
  winter: "Velvitfrost Berry"
   }}

  { id: 8, coords: [2986, 2274], type: "seasonal", fruits: {
   spring: "Ghost Berry",
  summer: "Solberry",
  fall:   "Mirthshade",
  winter: "Velvitfrost Berry"
   }}

  { id: 9, coords: [2965, 2250], type: "seasonal", fruits: {
   spring: "Ghost Berry",
  summer: "Solberry",
  fall:   "Mirthshade",
  winter: "Velvitfrost Berry"
   }}

  { id: 10, coords: [2842, 2287], type: "seasonal", fruits: {
   spring: "Ghost Berry",
  summer: "Solberry",
  fall:   "Mirthshade",
  winter: "Velvitfrost Berry"
   }}
];
