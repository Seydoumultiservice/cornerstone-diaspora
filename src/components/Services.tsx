
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, ShoppingCart, Map, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  
  const services = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-cornerstone-orange" />,
      title: t('onlineOrdering'),
      description: t('onlineOrderingDesc')
    },
    {
      icon: <Calendar className="w-12 h-12 text-cornerstone-orange" />,
      title: t('flexiblePayment'),
      description: t('flexiblePaymentDesc')
    },
    {
      icon: <Map className="w-12 h-12 text-cornerstone-orange" />,
      title: t('delayedDelivery'),
      description: t('delayedDeliveryDesc')
    },
    {
      icon: <Settings className="w-12 h-12 text-cornerstone-orange" />,
      title: t('realTimeTracking'),
      description: t('realTimeTrackingDesc')
    }
  ];

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="services" className="py-20 bg-cornerstone-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair text-cornerstone-orange">{t('ourServices')}</h2>
          <p className="text-xl font-medium mb-12 text-cornerstone-gray max-w-3xl mx-auto">{t('servicesSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-cornerstone-white p-8 rounded-lg border border-cornerstone-orange/20 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4 font-playfair text-cornerstone-orange">{service.title}</h3>
              <p className="text-cornerstone-gray">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button
            onClick={() => handleExternalLink('https://www.cornerstonebrique.com/services')}
            className="bg-cornerstone-orange hover:bg-cornerstone-orange/90 text-cornerstone-white px-8 py-6 rounded-lg text-lg font-bold flex items-center gap-2 mx-auto transition-transform hover:scale-105"
          >
            {language === 'fr' ? 'Commander maintenant' : 'Order Now'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
