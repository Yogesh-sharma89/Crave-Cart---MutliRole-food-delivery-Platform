export const CATEGORY_OPTIONS = ["Coffee", "Bakery", "Cold Brew", "Snacks", "Tea"];

export const seedItems = () => [
  {
    _id: "it_01",
    itemName: "Signature Cappuccino",
    price: 189,
    category: "Coffee",
    description:
      "Double espresso shot with velvety steamed milk foam, dusted with cocoa. Our most-ordered item.",
    itemImage:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
    isAvailable: true,
    rating: 4.8,
    prepTime: 6,
  },
  {
    _id: "it_02",
    itemName: "Iced Cold Brew",
    price: 219,
    category: "Cold Brew",
    description:
      "Slow-steeped for 18 hours, served over ice with a hint of oat milk. Smooth, never bitter.",
    itemImage:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    isAvailable: true,
    rating: 4.6,
    prepTime: 4,
  },
  {
    _id: "it_03",
    itemName: "Butter Croissant",
    price: 149,
    category: "Bakery",
    description:
      "Flaky, laminated pastry baked fresh every morning. Pairs perfectly with any coffee on the menu.",
    itemImage:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
    isAvailable: false,
    rating: 4.7,
    prepTime: 2,
  },
  {
    _id: "it_04",
    itemName: "Masala Chai",
    price: 99,
    category: "Tea",
    description:
      "Hand-pounded spices simmered slow with Assam tea leaves and full-cream milk.",
    itemImage:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80",
    isAvailable: true,
    rating: 4.9,
    prepTime: 5,
  },
];