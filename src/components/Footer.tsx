import { useState } from "react";
import { Coffee, Instagram, Facebook, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Subscribed successfully!",
      description: `A promotional email has been sent to ${email}. Check your inbox!`,
    });

    setEmail("");
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() && rating === 0) {
      toast({
        title: "Empty Feedback",
        description: "Please provide a rating or some comments.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the feedback to your backend/database
    console.log({ rating, feedback });

    toast({
      title: "Thank you!",
      description: "Your feedback has been submitted successfully.",
    });

    setFeedback("");
    setRating(0);
    setHoverRating(0);
  };

  return (
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
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm"
                required
              />
              <Button type="submit" variant="secondary" size="sm" className="rounded-full px-4 shrink-0">
                Join
              </Button>
            </form>
            <div className="flex gap-4 mt-5">
              <Instagram className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Facebook className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Twitter className="h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
          </div>
        </div>

        {/* Customer Feedback Form */}
        <div className="mt-16 pt-10 border-t border-primary-foreground/10 max-w-2xl mx-auto text-center">
          <h4 className="font-serif text-xl font-semibold mb-2">We Value Your Feedback</h4>
          <p className="text-sm opacity-80 mb-6">Let us know how we did today!</p>
          
          <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-primary-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us about your experience..."
              className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 min-h-[100px] resize-none focus-visible:ring-primary-foreground/30"
            />
            
            <Button 
              type="submit" 
              variant="secondary" 
              className="w-full sm:w-auto sm:self-end px-8"
              disabled={!feedback.trim() && rating === 0}
            >
              Submit Feedback
            </Button>
          </form>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-sm opacity-60">
          © 2026 Brew & Bloom. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
