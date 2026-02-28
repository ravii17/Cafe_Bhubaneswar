import { motion } from "framer-motion";
import { CheckCircle2, Clock, Coffee, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderStatus = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-card rounded-2xl shadow-xl overflow-hidden border"
                >
                    <div className="bg-primary p-6 text-center">
                        <h2 className="text-primary-foreground text-lg font-medium opacity-90">Order #{(Math.random() * 100000).toFixed(0).padStart(5, '0')}</h2>
                    </div>
                    <div className="p-8 text-center space-y-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                            className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto relative"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full opacity-20"
                            />
                            <Clock className="w-12 h-12 text-primary" />
                        </motion.div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-serif font-bold text-foreground">Preparing...</h1>
                            <p className="text-muted-foreground">
                                Your delicious order is being crafted by our baristas and will be ready for pickup soon.
                            </p>
                        </div>

                        <div className="bg-muted p-6 rounded-xl space-y-4 text-left">
                            <div className="flex items-center gap-3">
                                <div className="bg-background p-2 rounded-full">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Order Confirmed</p>
                                    <p className="text-xs text-muted-foreground">We've received your order</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="bg-background p-2 rounded-full relative">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-primary/20 rounded-full"
                                    />
                                    <Coffee className="w-5 h-5 text-primary relative z-10" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-primary">Preparing Order</p>
                                    <p className="text-xs text-muted-foreground">Brewing your coffee right now</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 opacity-40">
                                <div className="bg-background p-2 rounded-full">
                                    <MapPin className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Ready for Pickup</p>
                                    <p className="text-xs text-muted-foreground">We'll notify you when it's ready</p>
                                </div>
                            </div>
                        </div>

                        <Button onClick={() => navigate("/menu")} className="w-full" size="lg" variant="outline">
                            Back to Menu
                        </Button>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderStatus;
