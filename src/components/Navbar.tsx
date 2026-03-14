import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Coffee, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/#about" },
  { label: "Location", href: "/#location" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Coffee className="h-7 w-7 text-primary" />
          <span className="text-xl font-serif font-bold text-foreground tracking-tight">
            Brew & Bloom
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/reserve">
                <Button size="sm" className="rounded-full px-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Reserve Table
                </Button>
              </Link>
              <Button size="sm" variant="outline" className="rounded-full px-6 gap-2" onClick={signOut}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="rounded-full px-6">
                Sign In
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-background border-b border-border",
          open ? "max-h-80" : "max-h-0 border-b-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="py-3 px-4 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="mt-2 flex flex-col gap-2">
              <Link to="/reserve" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Reserve Table
                </Button>
              </Link>
              <Button variant="outline" className="w-full rounded-full gap-2" onClick={() => { signOut(); setOpen(false); }}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button className="w-full mt-2 rounded-full">Sign In</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
