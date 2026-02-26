import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";
import cafeAbout from "@/assets/cafe-about.jpg";
import coffeeLatte from "@/assets/coffee-latte.jpg";
import icedCoffee from "@/assets/iced-coffee.jpg";
import pastry from "@/assets/pastry.jpg";
import matcha from "@/assets/matcha.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const menuPreview = [
  { name: "Classic Latte", price: "₹220", image: coffeeLatte },
  { name: "Iced Caramel", price: "₹260", image: icedCoffee },
  { name: "Matcha Latte", price: "₹280", image: matcha },
  { name: "Butter Croissant", price: "₹180", image: pastry },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Cozy cafe interior with coffee"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center px-4 max-w-2xl"
        >
          <motion.p variants={fadeUp} className="text-accent font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Bhubaneswar's Finest
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground leading-tight mb-6"
          >
            Where Every Sip Tells a Story
          </motion.h1>
          <motion.p variants={fadeUp} className="text-primary-foreground/80 text-lg mb-8 font-sans">
            Handcrafted coffees, artisan pastries, and a warm space to call your own.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link to="/menu">
              <Button size="lg" className="rounded-full px-8 text-base gap-2">
                View Menu <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp}>
              <img
                src={cafeAbout}
                alt="Brew & Bloom cafe exterior"
                className="rounded-2xl shadow-xl w-full object-cover max-h-[500px]"
                loading="lazy"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Rooted in Bhubaneswar, Brewed with Love
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nestled in the vibrant heart of Saheed Nagar, Brew & Bloom is more than just a cafe — 
                it's a celebration of Odisha's warmth, combined with the world's finest coffee traditions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every bean is carefully sourced, every drink thoughtfully crafted. Whether you're 
                starting your morning or winding down your evening, we offer the perfect brew and a 
                blooming atmosphere to match.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-3">
              Featured
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Our Popular Picks
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {menuPreview.map((item) => (
              <motion.div key={item.name} variants={fadeUp}>
                <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-serif font-semibold text-foreground">{item.name}</h3>
                    <p className="text-primary font-sans font-medium mt-1">{item.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link to="/menu">
              <Button variant="outline" className="rounded-full px-8 gap-2">
                View Full Menu <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-3">
              Visit Us
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Find Us in Bhubaneswar
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <Card className="text-center p-8 border-0 shadow-md hover:shadow-lg transition-shadow">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-serif font-semibold mb-2">Address</h3>
                <p className="text-sm text-muted-foreground">
                  Plot 42, Saheed Nagar<br />
                  Bhubaneswar, Odisha 751007
                </p>
              </Card>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card className="text-center p-8 border-0 shadow-md hover:shadow-lg transition-shadow">
                <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-serif font-semibold mb-2">Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Mon – Sat: 7 AM – 10 PM<br />
                  Sunday: 8 AM – 9 PM
                </p>
              </Card>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card className="text-center p-8 border-0 shadow-md hover:shadow-lg transition-shadow">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-serif font-semibold mb-2">Contact</h3>
                <p className="text-sm text-muted-foreground">
                  +91 98765 43210<br />
                  hello@brewandbloom.in
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
