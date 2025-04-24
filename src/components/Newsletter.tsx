
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Newsletter: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: language === 'fr' ? "Merci pour votre inscription !" : "Thank you for subscribing!",
        description: language === 'fr' 
          ? "Vous recevrez nos actualités et offres spéciales." 
          : "You will receive our news and special offers.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-cornerstone-orange/20 to-cornerstone-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-cornerstone-red p-8 text-white">
              <div className="flex items-center justify-center h-16 w-16 bg-white rounded-full mb-6">
                <Mail className="h-8 w-8 text-cornerstone-red" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-playfair">
                {language === 'fr' ? 'Restez Connecté' : 'Stay Connected'}
              </h3>
              <p className="mb-6">
                {language === 'fr' 
                  ? 'Inscrivez-vous à notre newsletter pour recevoir nos actualités, conseils et offres spéciales directement dans votre boîte mail.' 
                  : 'Subscribe to our newsletter to receive our news, tips and special offers directly in your inbox.'}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
                  {language === 'fr' ? 'Actualités immobilières au Togo' : 'Real estate news in Togo'}
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
                  {language === 'fr' ? 'Conseils pour votre projet de construction' : 'Tips for your construction project'}
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
                  {language === 'fr' ? 'Offres et promotions exclusives' : 'Exclusive offers and promotions'}
                </li>
              </ul>
            </div>
            
            <div className="p-8 flex flex-col justify-center">
              <h4 className="text-xl font-bold mb-4 text-cornerstone-navy">
                {language === 'fr' ? 'Inscrivez-vous à notre newsletter' : 'Subscribe to our newsletter'}
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="newsletter-email" className="block mb-2 text-sm font-medium text-gray-700">
                    {language === 'fr' ? 'Votre adresse email' : 'Your email address'}
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'fr' ? 'exemple@email.com' : 'example@email.com'}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cornerstone-orange"
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <input 
                    type="checkbox" 
                    id="privacy-consent" 
                    className="mr-2" 
                    required 
                  />
                  <label htmlFor="privacy-consent" className="text-xs text-gray-600">
                    {language === 'fr' 
                      ? "J'accepte de recevoir des communications marketing de Cornerstone Briques." 
                      : "I agree to receive marketing communications from Cornerstone Briques."}
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      {language === 'fr' ? 'Envoi...' : 'Sending...'}
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{language === 'fr' ? "S'inscrire" : "Subscribe"}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
