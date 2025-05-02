
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-cornerstone-lightgray to-cornerstone-white py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-2 bg-cornerstone-marine"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-2 bg-cornerstone-gold"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col order-2 lg:order-1 text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair text-cornerstone-marine">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <ScrollLink 
                to="estimate-project" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500}
                className="bg-cornerstone-marine hover:bg-cornerstone-marine/90 text-cornerstone-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 group transition-all cursor-pointer transform hover:scale-105"
              >
                <span>{t('estimateProject')}</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </ScrollLink>
              <button className="border-2 border-cornerstone-gold bg-white hover:bg-cornerstone-gold/10 text-cornerstone-marine px-6 py-3 rounded-lg transition-all transform hover:scale-105">
                {t('learnMore')}
              </button>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2 animate-slide-in-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-lg shadow-xl animate-float">
                <img 
                  src="/lovable-uploads/bd364861-29a7-4ec2-9839-64c288e87ccf.png" 
                  alt="Cornerstone Briques Logo" 
                  className="w-full h-auto transform transition-transform hover:scale-105"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <img 
                  src="/lovable-uploads/ae1110ef-479b-48e8-80c3-dd5f3811ded9.png" 
                  alt="Togo Diaspora Logo" 
                  className="w-full h-auto transform transition-transform hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform translate-y-1">
        <svg className="relative block w-full h-10 md:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
