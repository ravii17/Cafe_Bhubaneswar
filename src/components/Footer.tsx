import { Coffee, Instagram, Facebook, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="h-6 w-6" />
            <span className="text-lg font-serif font-bold">Brew & Bloom</span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            Crafting premium coffee experiences in the heart of Bhubaneswar since 2020.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/menu" className="hover:opacity-100 transition-opacity">Menu</Link>
            <Link to="/#about" className="hover:opacity-100 transition-opacity">About Us</Link>
            <Link to="/#location" className="hover:opacity-100 transition-opacity">Location</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <p>Saheed Nagar, Bhubaneswar</p>
            <p>Odisha, India 751007</p>
            <p>+91 98765 43210</p>
            <p>hello@brewandbloom.in</p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-serif font-semibold mb-4">Newsletter</h4>
          <p className="text-sm opacity-80 mb-3">Get updates on new blends & events.</p>
          <div className="flex gap-2">
            <Input
              placeholder="Your email"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm"
            />
            <Button variant="secondary" size="sm" className="rounded-full px-4 shrink-0">
              Join
            </Button>
          </div>
          <div className="flex gap-4 mt-5">
            <Instagram className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
            <Facebook className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
            <Twitter className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-sm opacity-60">
        © 2026 Brew & Bloom. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
