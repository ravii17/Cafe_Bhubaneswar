import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Users, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import emailjs from '@emailjs/browser';
import heroBg from "@/assets/hero-bg.jpg";

const TableReservation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("2");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time slots from 8 AM to 9 PM
  const timeSlots = Array.from({ length: 27 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const isHalfPast = i % 2 !== 0;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour.toString().padStart(2, "0")}:${isHalfPast ? "30" : "00"} ${period}`;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to reserve a table.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!date || !time) {
      toast({
        title: "Missing details",
        description: "Please select both date and time for your reservation.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // These are placeholders. You will need to replace them with your actual EmailJS credentials
      const serviceId = "YOUR_SERVICE_ID";
      const templateId = "YOUR_TEMPLATE_ID";
      const publicKey = "YOUR_PUBLIC_KEY";

      const templateParams = {
        to_email: user.email,
        to_name: user.displayName || "Guest",
        date: format(date, "PPP"),
        time: time,
        guests: guests,
        special_requests: specialRequests || "None",
      };

      // Uncomment this line when you have your EmailJS credentials
      // await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Simulate API call delay for now
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Reservation Confirmed!",
        description: `Your table for ${guests} on ${format(date, "PPP")} at ${time} is booked. A confirmation email has been sent to ${user.email}.`,
      });
      
      // Reset form but keep user context
      setDate(undefined);
      setTime("");
      setGuests("2");
      setSpecialRequests("");
      navigate("/");
    } catch (error) {
      console.error("Failed to send email:", error);
      toast({
        title: "Reservation successful, but email failed",
        description: "Your table is booked, but we couldn't send the confirmation email.",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex w-full">
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src={heroBg}
            alt="Cafe Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground p-12 text-center">
            <Coffee className="h-16 w-16 mb-6 text-accent" />
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              Reserve Your Core Memory
            </h1>
            <p className="text-lg lg:text-xl max-w-md mx-auto text-primary-foreground/80 font-sans">
              Whether it's a quiet morning coffee, a catching-up lunch, or an evening date. Book your spot today.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden text-center">
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
                Reserve a Table
              </h1>
              <p className="text-muted-foreground">
                Book your perfect spot at Brew & Bloom.
              </p>
            </div>

            <div className="lg:block hidden mb-8">
               <h2 className="text-3xl font-serif font-bold text-foreground">
                Booking Details
              </h2>
              <p className="text-muted-foreground mt-2">
                Let us know when you'd like to visit.
              </p>
            </div>


            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Select Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal h-12",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => {
                         // Disable past dates and dates naturally disabled in UI
                         const today = new Date();
                         today.setHours(0, 0, 0, 0);
                         return date < today;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Select Time
                </label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="h-12 w-full">
                    <div className="flex items-center">
                       <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                       <SelectValue placeholder="Select arrival time" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Guest Count */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Number of Guests
                </label>
                 <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="h-12 w-full">
                     <div className="flex items-center">
                       <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                       <SelectValue placeholder="Party size" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                    <SelectItem value="large">9+ (Requires Call)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Special Requests (Optional)
                </label>
                <Textarea
                  placeholder="Window seat, celebrating an anniversary, dietary restrictions..."
                  className="resize-none h-24"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base rounded-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Confirming..." : "Confirm Reservation"}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TableReservation;
