
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cornerstone-brown text-cornerstone-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="text-2xl font-playfair font-bold mb-4 block">
              <span className="text-cornerstone-red">Cornerstone</span> Briques
            </a>
            <p className="mb-6 text-gray-300 max-w-md">
              {t('language') === 'fr'
                ? "Solutions premium pour la diaspora africaine souhaitant construire au Togo sans stress et avec un service d'excellence."
                : "Premium solutions for the African diaspora looking to build in Togo stress-free with excellent service."}
            </p>
            <div className="text-gray-300 mb-4">
              <p className="mb-2"><strong>Adresse :</strong> Akodessewa, Après les rails, non loin de la station d'essence CM, Lomé.</p>
              <p className="mb-2"><strong>Tél :</strong> (+228) 90 96 49 93 / 99 87 01 95</p>
              <p><strong>Email :</strong> contact@cornerstonebriques.com</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-bold mb-4 text-cornerstone-orange">
              {t('language') === 'fr' ? "Liens Rapides" : "Quick Links"}
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-cornerstone-red transition-colors">{t('home')}</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-cornerstone-red transition-colors">{t('services')}</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-cornerstone-red transition-colors">{t('faq')}</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-cornerstone-red transition-colors">{t('contact')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-bold mb-4 text-cornerstone-orange">
              {t('language') === 'fr' ? "Légal" : "Legal"}
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-cornerstone-red transition-colors">{t('privacyPolicy')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cornerstone-red transition-colors">{t('terms')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-cornerstone-white/10 text-center text-gray-300">
          <p>&copy; {currentYear} Cornerstone Briques. {t('allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
