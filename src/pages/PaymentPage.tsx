import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// TODO: Replace with your actual Payment Gateway API Key (e.g. Razorpay, Stripe)
const PAYMENT_GATEWAY_API_KEY = "rzp_test_SMRNg8dqPsAaHZ";

const PaymentPage = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    }

    const handlePayment = () => {
        setIsProcessing(true);

        // Simulate payment gateway processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            toast({
                title: "Payment Successful!",
                description: "Your order has been confirmed.",
            });

            // Redirect to order status after a short delay
            setTimeout(() => {
                navigate("/order-status");
            }, 2000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <section className="flex-1 py-12 md:py-20 flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg"
                >
                    <AnimatePresence mode="wait">
                        {!isSuccess ? (
                            <motion.div
                                key="payment-form"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                            >
                                <Card className="border-0 shadow-xl overflow-hidden">
                                    <div className="h-2 bg-primary w-full" />
                                    <CardHeader className="space-y-1 pb-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2bg-primary/10 rounded-full">
                                                <CreditCard className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl font-serif">Complete Payment</CardTitle>
                                                <CardDescription>Enter your card details to finalize your order.</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input id="cardNumber" placeholder="0000 0000 0000 0000" disabled={isProcessing} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry">Expiry Date</Label>
                                                <Input id="expiry" placeholder="MM/YY" disabled={isProcessing} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvv">CVV</Label>
                                                <Input id="cvv" placeholder="123" type="password" disabled={isProcessing} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name on Card</Label>
                                            <Input id="name" placeholder="John Doe" disabled={isProcessing} />
                                        </div>

                                        <div className="pt-2 flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                            <ShieldCheck className="w-4 h-4 text-green-500" />
                                            <p>Payments are secure and encrypted. API Key Integration Ready.</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col gap-3">
                                        <Button
                                            className="w-full text-lg h-12 relative overflow-hidden group"
                                            onClick={handlePayment}
                                            disabled={isProcessing}
                                        >
                                            {isProcessing ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                                                    Processing...
                                                </span>
                                            ) : (
                                                <span className="relative z-10">Pay Now</span>
                                            )}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success-message"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center rounded-2xl bg-card border shadow-xl p-10 flex flex-col items-center justify-center space-y-4"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2"
                                >
                                    <CheckCircle2 className="w-10 h-10" />
                                </motion.div>
                                <h2 className="text-2xl font-serif font-bold text-foreground">Payment Successful!</h2>
                                <p className="text-muted-foreground">Redirecting to order status...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default PaymentPage;
