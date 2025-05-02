
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, PackageCheck, PackageOpen, Truck, Clock } from 'lucide-react';

type OrderStatus = 'pending' | 'preparing' | 'production' | 'shipping' | 'delivered';

type Order = {
  id: string;
  status: OrderStatus;
  created_at: string;
  estimated_delivery: string;
  current_step: number;
  total_steps: number;
};

const OrderTracking: React.FC = () => {
  const { t, language } = useLanguage();
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const statusLabels = {
    pending: { fr: 'Commande reçue', en: 'Order received' },
    preparing: { fr: 'Préparation', en: 'Preparation' },
    production: { fr: 'Production', en: 'Production' },
    shipping: { fr: 'Expédition', en: 'Shipping' },
    delivered: { fr: 'Livré', en: 'Delivered' }
  };

  const getStatusLabel = (status: OrderStatus) => {
    return statusLabels[status][language as 'fr' | 'en'] || status;
  };

  const getProgressValue = (order: Order) => {
    return (order.current_step / order.total_steps) * 100;
  };

  const handleSearch = () => {
    if (!invoiceNumber.trim()) {
      setError(language === 'fr' ? 
        'Veuillez entrer un numéro de facture' : 
        'Please enter an invoice number');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call for demo purposes
    setTimeout(() => {
      // For demo, we'll simulate different statuses based on the invoice number
      if (invoiceNumber === 'CSB12345') {
        setOrder({
          id: 'CSB12345',
          status: 'production',
          created_at: '2025-04-25',
          estimated_delivery: '2025-05-10',
          current_step: 3,
          total_steps: 5
        });
      } else if (invoiceNumber === 'CSB54321') {
        setOrder({
          id: 'CSB54321',
          status: 'shipping',
          created_at: '2025-04-20',
          estimated_delivery: '2025-05-05',
          current_step: 4,
          total_steps: 5
        });
      } else {
        setError(language === 'fr' ? 
          'Commande non trouvée. Veuillez vérifier le numéro de facture.' : 
          'Order not found. Please verify the invoice number.');
        setOrder(null);
      }
      setIsLoading(false);
    }, 1500);
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    // Real-time simulation - if order exists, update its status periodically
    if (!order) return;

    const interval = setInterval(() => {
      setOrder(prevOrder => {
        if (!prevOrder) return null;
        
        // For demo purposes, simulate progress by incrementing current_step
        if (prevOrder.current_step < prevOrder.total_steps) {
          const newStep = prevOrder.current_step + 0.1;
          
          // Update status based on new step
          let newStatus: OrderStatus = prevOrder.status;
          if (newStep >= 4.5) newStatus = 'delivered';
          else if (newStep >= 3.5) newStatus = 'shipping';
          else if (newStep >= 2.5) newStatus = 'production';
          else if (newStep >= 1.5) newStatus = 'preparing';
          
          return {
            ...prevOrder,
            current_step: newStep,
            status: newStatus
          };
        }
        return prevOrder;
      });
    }, 5000); // Update every 5 seconds for demo purposes

    return () => clearInterval(interval);
  }, [order]);

  return (
    <div className="min-h-screen flex flex-col bg-cornerstone-lightgray">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-playfair text-cornerstone-marine">
          {language === 'fr' ? 'Suivi de Commande' : 'Order Tracking'}
        </h1>
        
        <Card className="w-full max-w-3xl mx-auto mb-8 border-cornerstone-marine/20">
          <CardHeader>
            <CardTitle className="text-xl text-cornerstone-marine">
              {language === 'fr' ? 'Entrez votre numéro de facture' : 'Enter your invoice number'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Input
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={language === 'fr' ? 'Ex: CSB12345' : 'E.g. CSB12345'}
                  className="pr-10 border-cornerstone-marine/30 focus:border-cornerstone-gold"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <Button 
                onClick={handleSearch} 
                className="bg-cornerstone-marine hover:bg-cornerstone-marine/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Clock className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    {language === 'fr' ? 'Recherche...' : 'Searching...'}
                  </span>
                ) : language === 'fr' ? 'Rechercher' : 'Search'}
              </Button>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {!error && invoiceNumber && !order && !isLoading && (
              <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md">
                {language === 'fr' ? 
                  'Pour tester, essayez les numéros de facture CSB12345 ou CSB54321' : 
                  'For testing, try invoice numbers CSB12345 or CSB54321'}
              </div>
            )}
          </CardContent>
        </Card>
        
        {order && (
          <div className="space-y-8 max-w-3xl mx-auto">
            <Card className="border-cornerstone-marine/20">
              <CardHeader>
                <CardTitle className="text-xl text-cornerstone-marine flex justify-between">
                  <span>
                    {language === 'fr' ? 'Commande #' : 'Order #'}{order.id}
                  </span>
                  <span className="text-cornerstone-gold">
                    {getStatusLabel(order.status)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'fr' ? 'Progression de votre commande' : 'Your order progress'}
                  </p>
                  <Progress value={getProgressValue(order)} className="h-2 bg-gray-200">
                    <div className="h-full bg-cornerstone-gold rounded-full"></div>
                  </Progress>
                </div>
                
                <div className="grid grid-cols-5 gap-2 relative">
                  {/* Progress line */}
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
                  
                  {/* Order received */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.current_step >= 1 ? 'bg-cornerstone-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
                      <Package className="h-4 w-4" />
                    </div>
                    <p className="text-xs mt-2 text-center">{language === 'fr' ? 'Commande reçue' : 'Order received'}</p>
                    <p className="text-xs text-gray-500">{order.created_at}</p>
                  </div>
                  
                  {/* Preparing */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.current_step >= 2 ? 'bg-cornerstone-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
                      <PackageOpen className="h-4 w-4" />
                    </div>
                    <p className="text-xs mt-2 text-center">{language === 'fr' ? 'Préparation' : 'Preparation'}</p>
                  </div>
                  
                  {/* Production */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.current_step >= 3 ? 'bg-cornerstone-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
                      <PackageCheck className="h-4 w-4" />
                    </div>
                    <p className="text-xs mt-2 text-center">{language === 'fr' ? 'Production' : 'Production'}</p>
                  </div>
                  
                  {/* Shipping */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.current_step >= 4 ? 'bg-cornerstone-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
                      <Truck className="h-4 w-4" />
                    </div>
                    <p className="text-xs mt-2 text-center">{language === 'fr' ? 'Expédition' : 'Shipping'}</p>
                  </div>
                  
                  {/* Delivered */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.current_step >= 5 ? 'bg-cornerstone-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
                      <PackageCheck className="h-4 w-4" />
                    </div>
                    <p className="text-xs mt-2 text-center">{language === 'fr' ? 'Livré' : 'Delivered'}</p>
                    <p className="text-xs text-gray-500">{order.estimated_delivery}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-cornerstone-marine/20">
              <CardHeader>
                <CardTitle className="text-xl text-cornerstone-marine">
                  {language === 'fr' ? 'Flux vidéo en direct' : 'Live video feed'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-white text-center p-4">
                    {language === 'fr' 
                      ? 'Flux vidéo en direct de notre usine de production' 
                      : 'Live video feed from our production facility'}
                    <br/>
                    <span className="text-sm text-gray-300">
                      {language === 'fr' 
                        ? '(Cette fonctionnalité sera intégrée ultérieurement)' 
                        : '(This feature will be integrated later)'}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
