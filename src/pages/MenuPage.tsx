import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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

interface CartItem extends MenuItem {
  quantity: number;
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
  const { user } = useAuth();
  const [active, setActive] = useState<Category>("All");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const filtered = active === "All" ? menuItems : menuItems.filter((i) => i.category === active);

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.name === name) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const removeItem = (name: string) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const checkout = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with your order.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    toast({
      title: "Proceeding to checkout",
      description: "Please select a store to pick up your order.",
    });
    setCartItems([]);
    navigate("/store-selection");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace("₹", ""));
    return acc + priceNum * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-background relative">
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
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${active === cat
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
                  <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif font-semibold text-lg text-foreground">{item.name}</h3>
                        <span className="text-primary font-sans font-bold text-lg">{item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground flex-grow mb-4">{item.description}</p>

                      <Button onClick={() => addToCart(item)} className="w-full mt-auto" variant="outline">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Floating Cart Button & Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl z-50 transition-transform hover:scale-105"
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl">Your Cart</SheetTitle>
          </SheetHeader>

          <div className="flex-grow overflow-hidden mt-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mb-4 opacity-50" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.name, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.name, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <div className="flex-1" />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => removeItem(item.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="pt-6 mt-auto">
              <Separator className="mb-4" />
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-xl">₹{totalPrice}</span>
              </div>
              <Button className="w-full" size="lg" onClick={checkout}>
                Proceed to Checkout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default MenuPage;
