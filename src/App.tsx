import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import Login from "./pages/Login";
import OrderStatus from "./pages/OrderStatus";
import StoreSelection from "./pages/StoreSelection";
import PaymentPage from "./pages/PaymentPage";
import NotFound from "./pages/NotFound";
import TableReservation from "./pages/TableReservation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/store-selection" element={<StoreSelection />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/reserve" element={<TableReservation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
