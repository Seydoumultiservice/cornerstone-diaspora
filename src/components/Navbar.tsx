
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-cornerstone-black py-4 sticky top-0 z-50 border-b border-cornerstone-gold/30">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-white text-2xl font-playfair font-bold">
            <span className="text-cornerstone-gold">Cornerstone</span> Briques
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white hover:text-cornerstone-gold transition-colors">
            {t('home')}
          </a>
          <a href="#services" className="text-white hover:text-cornerstone-gold transition-colors">
            {t('services')}
          </a>
          <a href="#faq" className="text-white hover:text-cornerstone-gold transition-colors">
            {t('faq')}
          </a>
          <a href="#contact" className="text-white hover:text-cornerstone-gold transition-colors">
            {t('contact')}
          </a>
          
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="px-3 py-1 bg-cornerstone-navy text-white rounded-md hover:bg-opacity-80 transition-colors"
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          
          <button className="btn-primary">
            {t('estimateProject')}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="px-3 py-1 bg-cornerstone-navy text-white rounded-md hover:bg-opacity-80 transition-colors"
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          
          <button onClick={toggleMenu} className="text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-cornerstone-black border-t border-cornerstone-gold/20 animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#" className="text-white hover:text-cornerstone-gold transition-colors py-2">
              {t('home')}
            </a>
            <a href="#services" className="text-white hover:text-cornerstone-gold transition-colors py-2">
              {t('services')}
            </a>
            <a href="#faq" className="text-white hover:text-cornerstone-gold transition-colors py-2">
              {t('faq')}
            </a>
            <a href="#contact" className="text-white hover:text-cornerstone-gold transition-colors py-2">
              {t('contact')}
            </a>
            <button className="btn-primary w-full">
              {t('estimateProject')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
