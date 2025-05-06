
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, ShoppingCart, Clock } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';
import Flags from './Flags';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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

  // Only render ScrollLink components on homepage
  const isHomePage = location.pathname === '/';

  const toggleLanguage = () => {
    if (language === 'fr') {
      setLanguage('en');
    } else if (language === 'en') {
      setLanguage('ee');
    } else {
      setLanguage('fr');
    }
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'fr': return 'EN';
      case 'en': return 'EE';
      case 'ee': return 'FR';
      default: return 'FR';
    }
  };

  return (
    <header className={`py-4 sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-cornerstone-white shadow-md border-b border-cornerstone-orange/30' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className={`text-xl sm:text-2xl font-playfair font-bold transition-colors ${
            scrolled ? 'text-cornerstone-orange' : 'text-cornerstone-orange'
          }`}>
            <span className="text-cornerstone-orange">Cornerstone</span> Briques
          </Link>
          <Flags />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {isHomePage ? (
            <>
              <ScrollLink 
                to="home" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500}
                className={`hover:text-cornerstone-gray transition-colors cursor-pointer ${
                  scrolled ? 'text-cornerstone-orange' : 'text-cornerstone-orange'
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
                className={`hover:text-cornerstone-gray transition-colors cursor-pointer ${
                  scrolled ? 'text-cornerstone-orange' : 'text-cornerstone-orange'
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
                className={`hover:text-cornerstone-gray transition-colors cursor-pointer ${
                  scrolled ? 'text-cornerstone-orange' : 'text-cornerstone-orange'
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
                className={`hover:text-cornerstone-gray transition-colors cursor-pointer ${
                  scrolled ? 'text-cornerstone-orange' : 'text-cornerstone-orange'
                }`}
              >
                {t('contact')}
              </ScrollLink>
            </>
          ) : (
            <Link to="/" className={`hover:text-cornerstone-gray transition-colors ${
              scrolled ? 'text-cornerstone-orange' : 'text-cornerstone-orange'
            }`}>
              {t('home')}
            </Link>
          )}
          
          <Button 
            variant="ghost"
            className="flex items-center gap-2 hover:text-cornerstone-gray transition-colors"
            onClick={() => handleExternalLink('https://www.cornerstonebrique.com/services')}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className={`${scrolled ? 'text-cornerstone-orange' : 'text-cornerstone-orange'}`}>
              {t('onlineOrdering')}
            </span>
          </Button>
          
          <Link to="/order-tracking">
            <Button 
              variant="ghost"
              className="flex items-center gap-2 hover:text-cornerstone-gray transition-colors"
            >
              <Clock className="h-5 w-5" />
              <span className={`${scrolled ? 'text-cornerstone-orange' : 'text-cornerstone-orange'}`}>
                {t('realTimeTracking')}
              </span>
            </Button>
          </Link>
          
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-cornerstone-orange text-cornerstone-white rounded-md hover:bg-opacity-80 transition-colors"
          >
            {getLanguageLabel()}
          </button>
          
          {isHomePage && (
            <ScrollLink 
              to="estimate-project" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              className="bg-cornerstone-orange text-cornerstone-white px-4 lg:px-6 py-2 rounded-lg hover:bg-opacity-90 transition-transform hover:scale-105 cursor-pointer text-sm lg:text-base whitespace-nowrap"
            >
              {t('estimateProject')}
            </ScrollLink>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-cornerstone-orange text-cornerstone-white rounded-md hover:bg-opacity-80 transition-colors"
          >
            {getLanguageLabel()}
          </button>
          
          <button onClick={toggleMenu} className={`${
            scrolled ? 'text-cornerstone-orange' : 'text-cornerstone-orange'
          }`}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-cornerstone-white shadow-lg animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {isHomePage ? (
              <>
                <ScrollLink 
                  to="home" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={500}
                  className="text-cornerstone-orange hover:text-cornerstone-gray transition-colors py-2 cursor-pointer"
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
                  className="text-cornerstone-orange hover:text-cornerstone-gray transition-colors py-2 cursor-pointer"
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
                  className="text-cornerstone-orange hover:text-cornerstone-gray transition-colors py-2 cursor-pointer"
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
                  className="text-cornerstone-orange hover:text-cornerstone-gray transition-colors py-2 cursor-pointer"
                  onClick={toggleMenu}
                >
                  {t('contact')}
                </ScrollLink>
              </>
            ) : (
              <Link 
                to="/"
                className="text-cornerstone-orange hover:text-cornerstone-gray transition-colors py-2"
                onClick={toggleMenu}
              >
                {t('home')}
              </Link>
            )}
            
            <button 
              className="flex items-center gap-2 text-cornerstone-orange hover:text-cornerstone-gray transition-colors py-2"
              onClick={() => handleExternalLink('https://www.cornerstonebrique.com/services')}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{t('onlineOrdering')}</span>
            </button>
            
            <Link 
              to="/order-tracking"
              className="flex items-center gap-2 text-cornerstone-orange hover:text-cornerstone-gray transition-colors py-2"
              onClick={toggleMenu}
            >
              <Clock className="h-5 w-5" />
              <span>{t('realTimeTracking')}</span>
            </Link>
            
            {isHomePage && (
              <ScrollLink 
                to="estimate-project" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500}
                className="bg-cornerstone-orange text-cornerstone-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors w-full text-center cursor-pointer"
                onClick={toggleMenu}
              >
                {t('estimateProject')}
              </ScrollLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
