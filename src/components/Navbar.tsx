
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import Flags from './Flags';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`py-4 sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-md border-b border-cornerstone-red/30' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="/" className={`text-2xl font-playfair font-bold transition-colors ${
            scrolled ? 'text-cornerstone-navy' : 'text-cornerstone-navy'
          }`}>
            <span className="text-cornerstone-red">Cornerstone</span> Briques
          </a>
          <Flags />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <ScrollLink 
            to="home" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className={`hover:text-cornerstone-red transition-colors cursor-pointer ${
              scrolled ? 'text-cornerstone-navy' : 'text-cornerstone-navy'
            }`}
          >
            {t('home')}
          </ScrollLink>
          <ScrollLink 
            to="services" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className={`hover:text-cornerstone-red transition-colors cursor-pointer ${
              scrolled ? 'text-cornerstone-navy' : 'text-cornerstone-navy'
            }`}
          >
            {t('services')}
          </ScrollLink>
          <ScrollLink 
            to="faq" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className={`hover:text-cornerstone-red transition-colors cursor-pointer ${
              scrolled ? 'text-cornerstone-navy' : 'text-cornerstone-navy'
            }`}
          >
            {t('faq')}
          </ScrollLink>
          <ScrollLink 
            to="contact" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className={`hover:text-cornerstone-red transition-colors cursor-pointer ${
              scrolled ? 'text-cornerstone-navy' : 'text-cornerstone-navy'
            }`}
          >
            {t('contact')}
          </ScrollLink>
          
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="px-3 py-1 bg-cornerstone-orange text-white rounded-md hover:bg-opacity-80 transition-colors"
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          
          <ScrollLink 
            to="estimate-project" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className="bg-cornerstone-red text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-transform hover:scale-105 cursor-pointer"
          >
            {t('estimateProject')}
          </ScrollLink>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="px-3 py-1 bg-cornerstone-orange text-white rounded-md hover:bg-opacity-80 transition-colors"
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          
          <button onClick={toggleMenu} className={`${
            scrolled ? 'text-cornerstone-navy' : 'text-cornerstone-navy'
          }`}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <ScrollLink 
              to="home" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              className="text-cornerstone-navy hover:text-cornerstone-red transition-colors py-2 cursor-pointer"
              onClick={toggleMenu}
            >
              {t('home')}
            </ScrollLink>
            <ScrollLink 
              to="services" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              className="text-cornerstone-navy hover:text-cornerstone-red transition-colors py-2 cursor-pointer"
              onClick={toggleMenu}
            >
              {t('services')}
            </ScrollLink>
            <ScrollLink 
              to="faq" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              className="text-cornerstone-navy hover:text-cornerstone-red transition-colors py-2 cursor-pointer"
              onClick={toggleMenu}
            >
              {t('faq')}
            </ScrollLink>
            <ScrollLink 
              to="contact" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              className="text-cornerstone-navy hover:text-cornerstone-red transition-colors py-2 cursor-pointer"
              onClick={toggleMenu}
            >
              {t('contact')}
            </ScrollLink>
            
            <ScrollLink 
              to="estimate-project" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              className="bg-cornerstone-red text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors w-full text-center cursor-pointer"
              onClick={toggleMenu}
            >
              {t('estimateProject')}
            </ScrollLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
