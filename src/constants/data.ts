export const RESTAURANT_DATA = {
  name: "Aetheria Gastronomy",
  slogan: "The Future of Flavor",
  description: "Experience a culinary journey beyond time and space. Aetheria blends molecular gastronomy with zero-gravity aesthetics to redefine the dining experience in 2026.",
  cuisine: "Neo-Molecular Fusion",
  established: 2026,
  contact: {
    address: "7 Nova Plaza, Neo-Tokyo District, SF 94103",
    phone: "+1 (555) AETHERIA",
    email: "concierge@aetheria.future",
    googleMaps: "https://maps.google.com/?q=San+Francisco",
  },
  hours: [
    { day: "Monday", open: "17:00", close: "23:00" },
    { day: "Tuesday", open: "17:00", close: "23:00" },
    { day: "Wednesday", open: "17:00", close: "23:00" },
    { day: "Thursday", open: "17:00", close: "00:00" },
    { day: "Friday", open: "17:00", close: "02:00" },
    { day: "Saturday", open: "12:00", close: "02:00" },
    { day: "Sunday", open: "12:00", close: "22:00" },
  ],
  social: {
    instagram: "https://instagram.com/aetheria",
    facebook: "https://facebook.com/aetheria",
    twitter: "https://twitter.com/aetheria",
  },
};

export const MENU_CATEGORIES = [
  "Starters",
  "Nebula Mains",
  "Quantum Burgers",
  "Stardust Desserts",
  "Astral Drinks",
];

export const MENU_ITEMS = [
  {
    id: "1",
    name: "Plasma Scallops",
    description: "Searing scallops with bioluminescent citrus foam and neon radish.",
    price: "$28",
    category: "Starters",
    dietary: ["GF", "Seafood"],
  },
  {
    id: "2",
    name: "Cyber-Steak 2.0",
    description: "Lab-grown wagyu with carbon-infused butter and digital truffle essence.",
    price: "$85",
    category: "Nebula Mains",
    dietary: ["Halal"],
  },
  {
    id: "3",
    name: "The Event Horizon Burger",
    description: "Black charcoal bun, synthetic gold leaf, and pressurized onion rings.",
    price: "$42",
    category: "Quantum Burgers",
    dietary: [],
  },
  {
    id: "4",
    name: "Liquid Nitrogen Mousse",
    description: "Sub-zero chocolate sphere that shatters upon sonic resonance.",
    price: "$24",
    category: "Stardust Desserts",
    dietary: ["V"],
  },
  {
    id: "5",
    name: "Supernova Cocktail",
    description: "Floating gin pearls in a shimmering violet elderflower nebula.",
    price: "$19",
    category: "Astral Drinks",
    dietary: ["Vegan"],
  },
];
