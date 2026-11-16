/* =====================================================================
   SITE DATA — edit this file to update the website's content.
   Everything marked PLACEHOLDER must be confirmed with the owner
   before the site goes live.
   ===================================================================== */

window.SITE_DATA = {
  business: {
    name: "Mirna's Kitchen RCB",
    street: "803 N Sylvania Ave",
    city: "Fort Worth, TX 76111",
    // PLACEHOLDER — replace with the verified number, then set phoneVerified to true
    phone: "(817) 000-0000",
    phoneVerified: false,
    // PLACEHOLDER — add an email if the owner wants one listed (leave "" to hide)
    email: "",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=803+N+Sylvania+Ave+Fort+Worth+TX+76111"
  },

  // PLACEHOLDER hours — all values must be confirmed with the owner
  hours: [
    { day: "Monday",    time: "Hours TBD" },
    { day: "Tuesday",   time: "Hours TBD" },
    { day: "Wednesday", time: "Hours TBD" },
    { day: "Thursday",  time: "Hours TBD" },
    { day: "Friday",    time: "Hours TBD" },
    { day: "Saturday",  time: "Hours TBD" },
    { day: "Sunday",    time: "Hours TBD" }
  ],
  hoursVerified: false,

  /* MENU — every dish and price below is a PLACEHOLDER for layout only.
     Replace with the restaurant's real menu. Set `placeholder: false`
     on an item (or remove the line) once it is real to hide the "Sample" tag. */
  menu: [
    {
      id: "breakfast",
      label: "Breakfast",
      note: "Served [breakfast hours TBD]",
      items: [
        { name: "Sample Breakfast Plate 1", desc: "Placeholder description — eggs, salsa, beans and warm tortillas.", price: "$0.00", placeholder: true },
        { name: "Sample Breakfast Plate 2", desc: "Placeholder description — crisp tortilla chips simmered in salsa, topped with crema.", price: "$0.00", placeholder: true },
        { name: "Sample Breakfast Taco", desc: "Placeholder description — choice of filling in a fresh tortilla.", price: "$0.00", placeholder: true },
        { name: "Sample Breakfast Burrito", desc: "Placeholder description — eggs, potato and cheese, wrapped and grilled.", price: "$0.00", placeholder: true }
      ]
    },
    {
      id: "lunch",
      label: "Lunch",
      note: "Served [lunch hours TBD]",
      items: [
        { name: "Sample Lunch Special 1", desc: "Placeholder description — plate with rice and beans.", price: "$0.00", placeholder: true },
        { name: "Sample Taco Plate", desc: "Placeholder description — three tacos with onion, cilantro and lime.", price: "$0.00", placeholder: true },
        { name: "Sample Torta", desc: "Placeholder description — toasted roll, protein, avocado and pickled jalapeño.", price: "$0.00", placeholder: true },
        { name: "Sample Quesadilla", desc: "Placeholder description — melted cheese and filling, grilled until golden.", price: "$0.00", placeholder: true }
      ]
    },
    {
      id: "mains",
      label: "Main Dishes",
      note: "Served with [sides TBD]",
      items: [
        { name: "Sample Main Dish 1", desc: "Placeholder description — enchiladas topped with house sauce and cheese.", price: "$0.00", placeholder: true },
        { name: "Sample Main Dish 2", desc: "Placeholder description — slow-cooked meat in a rich red chile sauce.", price: "$0.00", placeholder: true },
        { name: "Sample Main Dish 3", desc: "Placeholder description — grilled meat with peppers, onions and tortillas.", price: "$0.00", placeholder: true },
        { name: "Sample Main Dish 4", desc: "Placeholder description — roasted chile filled and fried, with ranchero sauce.", price: "$0.00", placeholder: true }
      ]
    },
    {
      id: "sides",
      label: "Sides",
      note: "",
      items: [
        { name: "Sample Side · Rice", desc: "Placeholder description.", price: "$0.00", placeholder: true },
        { name: "Sample Side · Beans", desc: "Placeholder description.", price: "$0.00", placeholder: true },
        { name: "Sample Side · Guacamole", desc: "Placeholder description.", price: "$0.00", placeholder: true },
        { name: "Sample Side · Chips & Salsa", desc: "Placeholder description.", price: "$0.00", placeholder: true }
      ]
    },
    {
      id: "drinks",
      label: "Drinks",
      note: "",
      items: [
        { name: "Sample Agua Fresca", desc: "Placeholder description — flavor of the day.", price: "$0.00", placeholder: true },
        { name: "Sample Horchata", desc: "Placeholder description — sweet rice and cinnamon.", price: "$0.00", placeholder: true },
        { name: "Sample Coffee", desc: "Placeholder description.", price: "$0.00", placeholder: true },
        { name: "Sample Soft Drink", desc: "Placeholder description.", price: "$0.00", placeholder: true }
      ]
    }
  ]
};
