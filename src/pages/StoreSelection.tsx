import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stores = [
    {
        id: "1",
        name: "Brew & Bloom",
        address: "Patia KIIT University, Bhubaneswar",
        distance: "0.8 km away",
        status: "Open until 11:00 PM",
    },
    {
        id: "2",
        name: "Brew & Bloom",
        address: "Airport Road, Bhubaneswar",
        distance: "15.2 km away",
        status: "Open 24/7",
    },
    {
        id: "3",
        name: "Esplanade OneMall",
        address: "Esplanade OneMall Rasulgarg, Bhubaneswar",
        distance: "8.5 km away",
        status: "Open until 9:00 PM",
    }
];

const StoreSelection = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [selectedStore, setSelectedStore] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    }

    const handleConfirm = () => {
        if (selectedStore) {
            navigate("/payment");
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <section className="flex-1 py-12 md:py-20 flex flex-col items-center justify-center">
                <div className="container max-w-2xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <MapPin className="w-12 h-12 mx-auto text-primary mb-4" />
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Choose a Store</h1>
                        <p className="text-muted-foreground">Select a location to pick up your order</p>
                    </motion.div>

                    <div className="space-y-4 mb-8">
                        {stores.map((store, index) => (
                            <motion.div
                                key={store.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    className={`cursor-pointer transition-all duration-300 ${selectedStore === store.id
                                        ? "border-primary shadow-md bg-primary/5"
                                        : "hover:border-primary/50 hover:shadow-sm"
                                        }`}
                                    onClick={() => setSelectedStore(store.id)}
                                >
                                    <CardContent className="p-5 flex items-start gap-4">
                                        <div className={`p-3 rounded-full ${selectedStore === store.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                                            <Store className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-semibold text-lg">{store.name}</h3>
                                                <span className="text-sm font-medium text-primary flex items-center gap-1">
                                                    <Navigation className="w-3 h-3" />
                                                    {store.distance}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground text-sm mb-2">{store.address}</p>
                                            <p className="text-xs font-medium text-green-600">{store.status}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-end"
                    >
                        <Button variant="outline" size="lg" onClick={() => navigate("/menu")}>
                            Back to Menu
                        </Button>
                        <Button
                            size="lg"
                            onClick={handleConfirm}
                            disabled={!selectedStore}
                            className="px-8"
                        >
                            Confirm Store
                        </Button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default StoreSelection;
