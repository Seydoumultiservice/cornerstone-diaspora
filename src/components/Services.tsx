
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, ShoppingCart, Map, Settings } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-cornerstone-gold" />,
      title: t('onlineOrdering'),
      description: t('onlineOrderingDesc')
    },
    {
      icon: <Calendar className="w-12 h-12 text-cornerstone-gold" />,
      title: t('flexiblePayment'),
      description: t('flexiblePaymentDesc')
    },
    {
      icon: <Map className="w-12 h-12 text-cornerstone-gold" />,
      title: t('delayedDelivery'),
      description: t('delayedDeliveryDesc')
    },
    {
      icon: <Settings className="w-12 h-12 text-cornerstone-gold" />,
      title: t('realTimeTracking'),
      description: t('realTimeTrackingDesc')
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">{t('ourServices')}</h2>
          <p className="section-subtitle">{t('servicesSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4 font-playfair">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
