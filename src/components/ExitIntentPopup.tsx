
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from '../context/LanguageContext';
import { X, Mail } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

type NewsletterFormData = {
  email: string;
};

const ExitIntentPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const [hasShown, setHasShown] = useState(false);
  const { toast } = useToast();
  const form = useForm<NewsletterFormData>();

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

  const onSubmit = (data: NewsletterFormData) => {
    console.log('Newsletter subscription:', data);
    // Here you would typically send this data to your backend
    toast({
      title: language === 'fr' ? "Merci pour votre inscription !" : "Thank you for subscribing!",
      description: language === 'fr' 
        ? "Vous recevrez bientôt nos actualités et offres spéciales." 
        : "You will soon receive our news and special offers.",
    });
    setIsOpen(false);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-xl">
        <div className="bg-cornerstone-orange text-white p-4">
          <DialogHeader className="relative">
            <button 
              onClick={closeDialog}
              className="absolute right-0 top-0 text-white hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="flex justify-center mb-3">
              <Mail size={36} className="text-white" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-playfair font-bold text-center">
              {language === 'fr' 
                ? 'Inscrivez-vous à notre newsletter pour ne rien rater' 
                : 'Subscribe to our newsletter to stay updated'}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 bg-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cornerstone-gray">
                      {language === 'fr' ? 'Email' : 'Email'}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        required 
                        placeholder={language === 'fr' ? 'Votre email' : 'Your email'} 
                        {...field} 
                        className="border-cornerstone-gray/30 focus:border-cornerstone-orange"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6 flex gap-3">
                <Button type="button" variant="outline" onClick={closeDialog} className="flex-1 border-cornerstone-gray/30 text-cornerstone-gray hover:bg-cornerstone-gray/10">
                  {language === 'fr' ? 'Non merci' : 'No thanks'}
                </Button>
                <Button type="submit" className="bg-cornerstone-orange hover:bg-cornerstone-orange/90 text-white flex-1">
                  {language === 'fr' ? "S'inscrire" : "Subscribe"}
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
