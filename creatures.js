// Creature types — color, resource drop, icon filename, and crafting uses
const creatureTypes = {
  "Kokoraptor": {
    color: "#d946a8",   // magenta
    resource: "Brilliant Scale",
    icon: "assets/icons/brilliant_scale.png",
    crafting: ""
  },
  "Dawnfeather": {
    color: "#a0721a",   // golden brown
    resource: "Dawnfeather Egg",
    icon: "assets/icons/dawnfeather_egg.png",
    crafting: ""
  },
  "Elderbraun": {
    color: "#c8a882",   // soft tan
    resource: "Eldermilk",
    icon: "assets/icons/eldermilk.png",
    crafting: ""
  },
  "Mocadiles": {
    color: "#b5896a",   // light coffee brown
    resource: "Mocha Scale",
    icon: "assets/icons/mocha_scale.png",
    crafting: ""
  },
  "Quackari": {
    color: "#6ee7b7",   // mint green
    resource: "Quackari Egg",
    icon: "assets/icons/quackari_egg.png",
    crafting: ""
  },
  "Awesomesaurus": {
    color: "#06b6d4",   // cyan
    resource: "Radiant Scale",
    icon: "assets/icons/radiant_scale.png",
    crafting: ""
  },
  "Sorellisk": {
    color: "#86c98a",   // soft green
    resource: "Sorelleon Scale",
    icon: "assets/icons/sorelleon_scale.png",
    crafting: ""
  },
  "Wisperhooves": {
    color: "#f5f0e8",   // cream
    resource: "Whisperwool",
    icon: "assets/icons/whisperwool.png",
    crafting: ""
  },
  "Ahria": {
    color: "#1e5fcc",   // sapphire
    resource: "Ahriatuft",
    icon: "assets/icons/ahriatuft.png",
    crafting: ""
  },
  "Emberlyn": {
    color: "#f43f0a",   // bright orange-red
    resource: "Embertuft",
    icon: "assets/icons/embertuft.png",
    crafting: ""
  },
  "Jasper": {
    color: "#6b3a1f",   // rich brown
    resource: "Jaspertuft",
    icon: "assets/icons/jaspertuft.png",
    crafting: ""
  },
  "Maple": {
    color: "#6b3a1f",   // rich brown
    resource: "Mapletuft",
    icon: "assets/icons/mapletuft.png",
    crafting: ""
  },
  "Wimblehop": {
    color: "#4a3f35",   // dark grey-brown
    resource: "Wimbletuft",
    icon: "assets/icons/wimbletuft.png",
    crafting: ""
  },
  "Wortles": {
    color: "#2a9d8f",   // sea green-blue
    resource: "Wortle Scale",
    icon: "assets/icons/wortle_scale.png",
    crafting: ""
  },
  "Azurepinch": {
    color: "#2251cc",   // royal blue
    resource: null,
    icon: null,
    info: "wheeeee!",
    crafting: ""
  }
};

const creatureLocations = [
  { id: 1,  coords: [3463, 2326], radius: 10,  creatures: ["Kokoraptor"] },
  { id: 2,  coords: [2777, 2240], radius: 50,  creatures: ["Dawnfeather"] },
  { id: 3,  coords: [2433, 2564], radius: 50,  creatures: ["Elderbraun"] },
  { id: 4,  coords: [2662, 2079], radius: 50,  creatures: ["Elderbraun"] },
  { id: 5,  coords: [1878, 2343], radius: 150, creatures: ["Elderbraun"] },
  { id: 6,  coords: [1635, 3016], radius: 50,  creatures: ["Elderbraun"] },
  { id: 16, coords: [2313, 3627], radius: 50,  creatures: ["Elderbraun"] },
  { id: 7,  coords: [2192, 3170], radius: 100, creatures: ["Mocadiles"] },
  { id: 8,  coords: [2690, 988],  radius: 100, creatures: ["Quackari"] },
  { id: 9,  coords: [3443, 2306], radius: 10,  creatures: ["Awesomesaurus"] },
  { id: 10, coords: [2184, 1702], radius: 150, creatures: ["Sorellisk"] },
  { id: 11, coords: [2896, 2732], radius: 50,  creatures: ["Wisperhooves"] },
  { id: 12, coords: [1665, 2498], radius: 50,  creatures: ["Wisperhooves"] },
  { id: 13, coords: [1793, 2862], radius: 50,  creatures: ["Wisperhooves"] },
  { id: 14, coords: [1247, 2180], radius: 100, creatures: ["Ahria"] },
  { id: 15, coords: [2300, 3637], radius: 10, creatures: ["Emberlyn"] },
  { id: 17, coords: [3551, 2958], radius: 20,  creatures: ["Jasper"] },
  { id: 18, coords: [3509, 2969], radius: 20,  creatures: ["Maple"] },
  { id: 19, coords: [2838, 1466], radius: 100, creatures: ["Wimblehop"] },
  { id: 20, coords: [2800, 3716], radius: 100, creatures: ["Wortles"] },
  { id: 21, coords: [3000, 2976], radius: 100, creatures: ["Azurepinch"] }
];
