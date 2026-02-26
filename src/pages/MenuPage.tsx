import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import coffeeLatte from "@/assets/coffee-latte.jpg";
import icedCoffee from "@/assets/iced-coffee.jpg";
import espresso from "@/assets/espresso.jpg";
import matcha from "@/assets/matcha.jpg";
import pastry from "@/assets/pastry.jpg";
import brownie from "@/assets/brownie.jpg";

const categories = ["All", "Hot Beverages", "Cold Beverages", "Snacks", "Desserts"] as const;

type Category = (typeof categories)[number];

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  category: Category;
}

const menuItems: MenuItem[] = [
  { name: "Classic Latte", description: "Rich espresso with velvety steamed milk", price: "₹220", image: coffeeLatte, category: "Hot Beverages" },
  { name: "Espresso", description: "Bold single-origin shot, pure & intense", price: "₹150", image: espresso, category: "Hot Beverages" },
  { name: "Matcha Latte", description: "Ceremonial grade matcha with oat milk", price: "₹280", image: matcha, category: "Hot Beverages" },
  { name: "Cappuccino", description: "Perfect balance of espresso, milk & foam", price: "₹200", image: coffeeLatte, category: "Hot Beverages" },
  { name: "Iced Caramel Latte", description: "Chilled espresso with house-made caramel", price: "₹260", image: icedCoffee, category: "Cold Beverages" },
  { name: "Cold Brew", description: "18-hour steeped, smooth & refreshing", price: "₹240", image: icedCoffee, category: "Cold Beverages" },
  { name: "Iced Matcha", description: "Shaken matcha over ice with vanilla", price: "₹290", image: matcha, category: "Cold Beverages" },
  { name: "Butter Croissant", description: "Flaky, golden, baked fresh every morning", price: "₹180", image: pastry, category: "Snacks" },
  { name: "Almond Croissant", description: "Filled with almond cream & toasted nuts", price: "₹220", image: pastry, category: "Snacks" },
  { name: "Chocolate Brownie", description: "Dense, fudgy, with Belgian chocolate", price: "₹200", image: brownie, category: "Desserts" },
  { name: "Tiramisu", description: "Classic Italian, espresso-soaked layers", price: "₹320", image: brownie, category: "Desserts" },
  { name: "Cheesecake", description: "New York style with berry compote", price: "₹300", image: brownie, category: "Desserts" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const MenuPage = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? menuItems : menuItems.filter((i) => i.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-3">Explore</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Our Menu</h1>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.name}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif font-semibold text-lg text-foreground">{item.name}</h3>
                        <span className="text-primary font-sans font-bold text-lg">{item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MenuPage;
