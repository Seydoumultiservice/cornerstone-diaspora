
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";
import ExitIntentPopup from "./components/ExitIntentPopup";
import OrderTracking from "./pages/OrderTracking";
import { LanguageProvider } from "./context/LanguageContext";

// Create QueryClient outside of component
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatBot />
            <ExitIntentPopup />
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
