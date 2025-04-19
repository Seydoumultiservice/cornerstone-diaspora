
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-cornerstone-black text-white py-24">
      {/* Gold accent */}
      <div className="absolute top-0 left-0 w-1/3 h-1 bg-cornerstone-gold"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-cornerstone-gold"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto font-playfair animate-fade-in">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto animate-fade-in">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
            <button className="btn-primary flex items-center justify-center space-x-2 group">
              <span>{t('estimateProject')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary">
              {t('learnMore')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-64 w-1 bg-cornerstone-gold opacity-50 hidden lg:block"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-64 w-1 bg-cornerstone-gold opacity-50 hidden lg:block"></div>
    </section>
  );
};

export default Hero;
