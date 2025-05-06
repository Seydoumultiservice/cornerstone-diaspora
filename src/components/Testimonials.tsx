
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star } from 'lucide-react';
import ReviewDialog from './ReviewDialog';

const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  
  const testimonials = [
    {
      name: 'Brice Koumessi',
      location: language === 'fr' ? 'Paris, France' : 'Paris, France',
      text: language === 'fr' 
        ? "J'ai pu acheter des briques pour ma maison à Lomé tout en étant à Paris. Le suivi en temps réel est fantastique."
        : "I was able to buy bricks for my house in Lomé while being in Paris. The real-time tracking is fantastic."
    },
    {
      name: 'Marie Koné',
      location: language === 'fr' ? 'Bruxelles, Belgique' : 'Brussels, Belgium',
      text: language === 'fr'
        ? "Le paiement échelonné m'a permis de gérer mon budget plus facilement. Service client excellent et réactif."
        : "The installment payment allowed me to manage my budget more easily. Excellent and responsive customer service."
    },
    {
      name: 'Kofi Mensah',
      location: language === 'fr' ? 'New York, USA' : 'New York, USA',
      text: language === 'fr'
        ? "La possibilité de stocker mes matériaux jusqu'à mon retour au Togo est exactement ce dont j'avais besoin."
        : "The ability to store my materials until my return to Togo is exactly what I needed."
    }
  ];

  return (
    <section className="py-20 bg-cornerstone-brown text-cornerstone-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-cornerstone-white">{t('testimonials')}</h2>
          <p className="section-subtitle text-gray-300 font-bold text-black">{t('testimonialsSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-cornerstone-white/5 backdrop-blur-sm p-6 rounded-lg border border-cornerstone-white/10 hover:border-cornerstone-orange/30 transition-colors"
            >
              <p className="text-black font-bold mb-6">{testimonial.text}</p>
              <div>
                <p className="font-bold text-cornerstone-orange">{testimonial.name}</p>
                <p className="text-gray-300">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button 
            className="bg-cornerstone-orange text-cornerstone-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-opacity-90 transition-colors"
            onClick={() => setIsReviewDialogOpen(true)}
          >
            <Star className="w-5 h-5" />
            <span>{language === 'fr' ? 'Laissez un avis' : 'Leave a review'}</span>
          </button>
        </div>
      </div>

      <ReviewDialog 
        open={isReviewDialogOpen} 
        onClose={() => setIsReviewDialogOpen(false)} 
      />
    </section>
  );
};

export default Testimonials;
