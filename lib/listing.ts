import type { Listing, Photo, PhotoGroup } from "./types";

const P = "/photos";

// Raw room -> image mapping (order preserved), transcribed from the reference
// photo tour. The flat `photos` array and index-based groups are derived below
// so the lightbox sequence and the tour stay in sync automatically.
const ROOMS: { title: string; subtitle: string; files: string[] }[] = [
  {
    title: "Living room 1",
    subtitle: "Sofa • Air conditioning • Ceiling fan • TV",
    files: ["1-vZ6fKh2f.jpeg", "2-U6Fh-z-t.jpeg", "3-EeCJMjww.jpeg"],
  },
  {
    title: "Living room 2",
    subtitle: "Ceiling fan • Hot tub",
    files: [
      "1-D6DP_NhK.jpeg", "2-kXn5mfy1.jpeg", "3-w40Q75OB.jpeg", "1-CYKI6X5Y.jpeg",
      "5-DmvTLEqJ.jpeg", "6-AWYqGh7w.jpeg", "7-Dcui_DLo.jpeg",
    ],
  },
  {
    title: "Full kitchen",
    subtitle:
      "Freezer • Fridge • Blender • Cooker • Cooking basics • Kettle • Microwave • Toaster • Wine glasses • Coffee • Crockery and cutlery",
    files: ["1-D8YM_FVx.jpeg", "2-cSyHIF8F.jpeg"],
  },
  {
    title: "Bedroom",
    subtitle:
      "Double bed • Air conditioning • Bed linen • Ceiling fan • Clothes storage • Cot • Hangers • Iron • Room-darkening blinds • Cleaning available during stay • Cleaning products • Long-term stays allowed • Private entrance • Wifi",
    files: ["1-CkhgeWg2.jpeg", "2-BHyDnMEq.jpeg", "3-C0q-WjWm.jpeg", "5-YOk2EqKI.jpeg", "6-E6QcUWFq.jpeg"],
  },
  {
    title: "Full bathroom",
    subtitle: "Shower • Hair dryer • Hot water",
    files: ["1-BTSBvkUh.jpeg"],
  },
  {
    title: "Gym",
    subtitle: "Exercise equipment",
    files: ["1-D6r2l8r0.jpeg", "2-IuQXiSu_.jpeg", "3-D-KPV5Hp.jpeg", "4-ucitmXAc.jpeg", "5-DRRWi9qk.jpeg"],
  },
  {
    title: "Exterior",
    subtitle: "Outdoor seating • Patio or balcony",
    files: ["1-CRVx7Z8O.jpeg", "2-tHFzobJK.jpeg", "3-9VJPfXnE.jpeg", "4-DCdhFrS3.jpeg", "6-BlizIqk1.jpeg"],
  },
  {
    title: "Pool",
    subtitle: "Shared pool",
    files: ["1-C41aCaFt.jpeg", "2-lYSfaBAx.jpeg"],
  },
  {
    title: "Additional photos",
    subtitle: "Washing machine",
    files: [
      "1-DUHBHKZy.jpeg", "2-BAge9HE_.jpeg", "3-CJel4pAq.jpeg", "4-CsC5-GzA.jpeg", "5-XsGO5HbS.jpeg",
      "6-D5Cbzl-g.jpeg", "7-CazFSrqK.jpeg", "8-C1HZJC3l.jpeg", "9-D76DjQ2I.jpeg", "2-U6Fh-z-t.jpeg",
    ],
  },
];

const photos: Photo[] = [];
const photoGroups: PhotoGroup[] = [];
for (const room of ROOMS) {
  const idxs: number[] = [];
  room.files.forEach((f, i) => {
    idxs.push(photos.length);
    photos.push({ src: `${P}/${f}`, room: room.title, alt: `${room.title} – photo ${i + 1}` });
  });
  photoGroups.push({ title: room.title, subtitle: room.subtitle, photoIndexes: idxs });
}

export const listing: Listing = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  subtitle: "Entire serviced apartment in Candolim, India",
  specs: "3 guests · 1 bedroom · 1 bed · 1 bathroom",
  rating: 4.95,
  reviewCount: 19,
  guestFavourite: true,

  hero: [
    `${P}/1-vZ6fKh2f.jpeg`,
    `${P}/2-U6Fh-z-t.jpeg`,
    `${P}/1-CYKI6X5Y.jpeg`,
    `${P}/1-CkhgeWg2.jpeg`,
    `${P}/4-DCdhFrS3.jpeg`,
  ],
  photos,
  photoGroups,

  highlights: [
    { icon: "outdoor", title: "Outdoor entertainment", body: "The pool and alfresco dining are great for summer trips." },
    { icon: "cool", title: "Designed for staying cool", body: "Beat the heat with the A/C and ceiling fan." },
    { icon: "key", title: "Self check-in", body: "You can check in with the building staff." },
  ],

  descriptionShort:
    "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and st…",
  descriptionFull:
    "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors designed for a relaxed getaway.\n\nThe apartment comes with a fully equipped kitchen, a comfortable double bed, and a spacious living area that opens onto a private balcony. Guests also have access to a shared pool and a gym.\n\nLocated just minutes from Candolim beach, cafes and nightlife, this is the perfect base to explore North Goa while enjoying a peaceful, private retreat.",

  sleep: [
    { title: "Bedroom", detail: "1 double bed", image: `${P}/1-CkhgeWg2.jpeg` },
    { title: "Living room", detail: "1 sofa", image: `${P}/1-vZ6fKh2f.jpeg` },
  ],

  amenitiesPreview: [
    { icon: "kitchen", label: "Kitchen" },
    { icon: "wifi", label: "Wifi" },
    { icon: "workspace", label: "Dedicated workspace" },
    { icon: "parking", label: "Free parking on premises" },
    { icon: "pool", label: "Pool" },
    { icon: "tv", label: "TV" },
    { icon: "ac", label: "Air conditioning" },
    { icon: "camera", label: "Exterior security cameras on property" },
    { icon: "smoke", label: "Smoke alarm" },
    { icon: "co", label: "Carbon monoxide alarm" },
  ],
  amenitiesTotal: 50,

  ratingCategories: [
    { label: "Cleanliness", score: 5.0, icon: "cleanliness" },
    { label: "Accuracy", score: 5.0, icon: "accuracy" },
    { label: "Check-in", score: 5.0, icon: "checkin" },
    { label: "Communication", score: 5.0, icon: "communication" },
    { label: "Location", score: 4.8, icon: "location" },
    { label: "Value", score: 4.8, icon: "value" },
  ],
  ratingDistribution: [0.97, 0.02, 0.005, 0.0, 0.005],

  reviewTags: [
    { icon: "🛏", label: "Comfort", count: 6 },
    { icon: "🟢", label: "Accuracy", count: 5 },
    { icon: "🛁", label: "Hot tub", count: 5 },
    { icon: "🛋", label: "Condition", count: 4 },
    { icon: "🎁", label: "Hospitality", count: 8 },
    { icon: "🧼", label: "Cleanliness", count: 4 },
    { icon: "🏠", label: "Amenities", count: 2 },
  ],

  reviews: [
    { name: "Amit", tenure: "2 months on Airbnb", when: "1 week ago", stars: 5,
      text: "Very helpful and responsive team. Safe and peaceful stay. Loved everything about the property." },
    { name: "Aheesh", avatar: "/avatars/aheesh.png", tenure: "3 years on Airbnb", when: "2 weeks ago", stars: 5,
      text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again." },
    { name: "Samiksha", avatar: "/avatars/samiksha.png", tenure: "5 years on Airbnb", when: "3 weeks ago", stars: 5,
      text: "Lovely stay at this place. Extremely well located, clean, and has all the amenities you would need. The private pool is perfect for relaxing. Highly recommend!" },
    { name: "Vedant", tenure: "1 year on Airbnb", when: "1 month ago", stars: 5,
      text: "Great property and location. Very peaceful neighborhood. The check-in process was smooth. The property looked exactly like the photos." },
    { name: "Vishvraj", avatar: "/avatars/vishvraj.png", tenure: "4 years on Airbnb", when: "1 month ago", stars: 5,
      text: "Beautiful place with great comfort. The pool was amazing. Cleanliness was exceptional. The host made sure we had everything we needed." },
    { name: "Mohd", tenure: "2 years on Airbnb", when: "2 months ago", stars: 5,
      text: "Highly recommended for families. Safe environment, close to the market and beaches, yet very quiet. The workspace was perfect for remote work." },
  ],

  host: {
    name: "Mirashya Homes",
    logoText: ["MIRASHYA", "HOMES"],
    reviews: 1463,
    rating: 4.68,
    yearsHosting: 2,
    facts: ["Born in the 80s", "Where I went to school: NICMAR GOA"],
    responseRate: "Response rate: 100%",
    responseTime: "Responds within an hour",
  },

  coHosts: [
    { name: "Sharath", avatar: "/avatars/sharath.png" },
    { name: "Simran" },
    { name: "Shruti" },
    { name: "Aman Dev Pahwa", avatar: "/avatars/aman.png" },
    { name: "Pallavi" },
    { name: "Amisha" },
    { name: "Maria Karen Priyanka", avatar: "/avatars/maria.png" },
    { name: "Sanyukta" },
  ],

  booking: {
    price: "₹28,499",
    period: "for 5 nights",
    checkIn: "10/18/2026",
    checkOut: "10/23/2026",
    guests: "2 guests",
    freeCancellation: "Free cancellation before 17 October",
    promo: { title: "Get 10% off your next stay.", terms: "Terms apply" },
  },

  stayNights: { title: "5 nights in Candolim", range: "18 Oct 2026 – 23 Oct 2026" },

  location: {
    heading: "Candolim, Goa, India",
    proviso: "Exact location will be provided after booking.",
    highlightsShort:
      "Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés and popular attractions.",
    highlightsFull:
      "The neighbourhood is vibrant yet peaceful. Candolim beach is just a short walk away, offering water sports, shacks, and beautiful sunsets. You will find some of Goa's best restaurants, bars, and boutique stores within a 5-minute radius. Despite being close to the action, the property is situated in a quiet lane surrounded by lush greenery, giving you the best of both worlds.",
  },

  thingsToKnow: [
    { title: "Cancellation policy", lines: ["Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.", "Review this host's full policy for details."] },
    { title: "House rules", lines: ["Check-in after 2:00 pm", "Checkout before 11:00 am", "3 guests maximum"] },
    { title: "Safety & property", lines: ["Carbon monoxide alarm not reported", "Smoke alarm not reported", "Exterior security cameras on property"] },
  ],

  nearby: [
    { title: "Beautiful Studio with a view to die for", price: "₹23,600", rating: 4.91, image: "/nearby/s1.jpeg" },
    { title: "NAQAB - 1bhk with private pool", price: "₹42,218", rating: 4.95, image: "/nearby/s2.jpeg" },
    { title: "Greentique Luxury Flat with plunge pool, Calangute", price: "₹44,506", rating: 4.94, image: "/nearby/s3.jpeg" },
    { title: "The Tropical Studio | 5 mins to Beach", price: "₹22,824", rating: 4.96, image: "/nearby/s4.jpeg" },
    { title: "Luxury Casa Bella 1BHK with plunge pool, Calangute", price: "₹39,942", rating: 4.95, image: "/nearby/s5.jpeg" },
  ],
};

export function getListing(): Listing {
  return listing;
}
