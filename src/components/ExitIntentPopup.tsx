
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from '../context/LanguageContext';
import { X } from 'lucide-react';

type ExitIntentFormData = {
  name: string;
  email: string;
  phone: string;
};

const ExitIntentPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const [hasShown, setHasShown] = useState(false);
  const form = useForm<ExitIntentFormData>();

  useEffect(() => {
    if (hasShown) return;

    let showExitIntent = false;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Only track if mouse is moving toward the top of the page
      const y = e.clientY;
      const isMovingUp = y < lastY;
      lastY = y;

      // If the mouse is at the top of the page heading upwards
      if (y < 10 && isMovingUp && !showExitIntent) {
        showExitIntent = true;
        setIsOpen(true);
        setHasShown(true);
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };

    // Set timer to only start tracking after 5 seconds on the page
    const timer = setTimeout(() => {
      document.addEventListener('mousemove', handleMouseMove);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasShown]);

  const onSubmit = (data: ExitIntentFormData) => {
    console.log('Exit intent form submitted:', data);
    // Here you would typically send this data to your backend
    setIsOpen(false);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-xl">
        <div className="bg-cornerstone-red text-white p-4">
          <DialogHeader className="relative">
            <button 
              onClick={closeDialog}
              className="absolute right-0 top-0 text-white hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
            <DialogTitle className="text-xl sm:text-2xl font-playfair font-bold text-center">
              {language === 'fr' 
                ? 'Attendez ! Ne partez pas si vite !' 
                : 'Wait! Don\'t leave so quickly!'}
            </DialogTitle>
            <p className="text-center mt-2">
              {language === 'fr'
                ? 'Laissez-nous vos coordonnées pour recevoir des offres exclusives et suivre votre projet de construction.'
                : 'Leave us your contact information to receive exclusive offers and follow your construction project.'}
            </p>
          </DialogHeader>
        </div>

        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'fr' ? 'Nom complet' : 'Full Name'}
                    </FormLabel>
                    <FormControl>
                      <Input required placeholder={language === 'fr' ? 'Votre nom' : 'Your name'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'fr' ? 'Email' : 'Email'}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        required 
                        placeholder={language === 'fr' ? 'Votre email' : 'Your email'} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'fr' ? 'Téléphone' : 'Phone'}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        required 
                        placeholder={language === 'fr' ? 'Votre numéro' : 'Your number'} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6 flex gap-3">
                <Button type="button" variant="outline" onClick={closeDialog} className="flex-1">
                  {language === 'fr' ? 'Non merci' : 'No thanks'}
                </Button>
                <Button type="submit" className="bg-cornerstone-red hover:bg-cornerstone-red/90 text-white flex-1">
                  {language === 'fr' ? 'Envoyer' : 'Submit'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
