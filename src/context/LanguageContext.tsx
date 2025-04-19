
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'fr' | 'en';

type Translations = {
  [key: string]: {
    fr: string;
    en: string;
  };
};

// Our translations
const translations: Translations = {
  // Navbar
  home: { fr: 'Accueil', en: 'Home' },
  services: { fr: 'Services', en: 'Services' },
  about: { fr: 'À Propos', en: 'About' },
  contact: { fr: 'Contact', en: 'Contact' },
  estimateProject: { fr: 'Estimer mon projet', en: 'Estimate my project' },

  // Hero Section
  heroTitle: { 
    fr: 'Construisez au Togo depuis l\'étranger, sans stress !', 
    en: 'Build in Togo from abroad, stress-free!' 
  },
  heroSubtitle: { 
    fr: 'Solutions premium pour la diaspora africaine', 
    en: 'Premium solutions for the African diaspora' 
  },
  getStarted: { fr: 'Commencer', en: 'Get Started' },
  learnMore: { fr: 'En savoir plus', en: 'Learn More' },

  // Services Section
  ourServices: { fr: 'Nos Services', en: 'Our Services' },
  servicesSubtitle: { 
    fr: 'Des solutions sur mesure pour la diaspora', 
    en: 'Tailored solutions for the diaspora' 
  },
  
  // Service 1
  onlineOrdering: { fr: 'Commande en ligne', en: 'Online Ordering' },
  onlineOrderingDesc: { 
    fr: 'Commandez vos matériaux de construction directement depuis l\'étranger.', 
    en: 'Order your building materials directly from abroad.' 
  },
  
  // Service 2
  flexiblePayment: { fr: 'Paiement Échelonné', en: 'Flexible Payment' },
  flexiblePaymentDesc: { 
    fr: 'Optez pour un plan de paiement personnalisé qui correspond à votre budget.', 
    en: 'Choose a customized payment plan that fits your budget.' 
  },
  
  // Service 3
  delayedDelivery: { fr: 'Livraison Différée', en: 'Delayed Delivery' },
  delayedDeliveryDesc: { 
    fr: 'Stockage gratuit jusqu\'à votre date de retour au Togo.', 
    en: 'Free storage until your return date to Togo.' 
  },
  
  // Service 4
  realTimeTracking: { fr: 'Suivi en Temps Réel', en: 'Real-Time Tracking' },
  realTimeTrackingDesc: { 
    fr: 'Suivez l\'avancement de votre projet avec des mises à jour visuelles.', 
    en: 'Track your project progress with visual updates.' 
  },

  // Currency Converter
  currencyConverter: { fr: 'Convertisseur de Devises', en: 'Currency Converter' },
  amount: { fr: 'Montant', en: 'Amount' },
  from: { fr: 'De', en: 'From' },
  to: { fr: 'À', en: 'To' },
  convert: { fr: 'Convertir', en: 'Convert' },
  result: { fr: 'Résultat', en: 'Result' },
  
  // Testimonials
  testimonials: { fr: 'Témoignages', en: 'Testimonials' },
  testimonialsSubtitle: { 
    fr: 'Ce que dit notre diaspora', 
    en: 'What our diaspora says' 
  },
  
  // FAQ
  faq: { fr: 'Questions Fréquentes', en: 'FAQ' },
  faqSubtitle: { 
    fr: 'Réponses à vos questions', 
    en: 'Answers to your questions' 
  },
  
  // FAQ Questions
  question1: { 
    fr: 'Comment fonctionne la livraison différée ?', 
    en: 'How does delayed delivery work?' 
  },
  answer1: { 
    fr: 'Nous stockons gratuitement vos matériaux dans notre entrepôt sécurisé jusqu\'à votre date de retour au Togo.', 
    en: 'We store your materials free of charge in our secure warehouse until your return date to Togo.' 
  },
  
  question2: { 
    fr: 'Puis-je payer en plusieurs fois ?', 
    en: 'Can I pay in installments?' 
  },
  answer2: { 
    fr: 'Oui, nous proposons des plans de paiement personnalisés. Par exemple, vous pouvez payer 30% à la commande et le reste sur 3 mois.', 
    en: 'Yes, we offer customized payment plans. For example, you can pay 30% when ordering and the rest over 3 months.' 
  },
  
  question3: { 
    fr: 'Comment suivre l\'avancement de mon projet ?', 
    en: 'How can I track my project progress?' 
  },
  answer3: { 
    fr: 'Via votre espace personnel, vous aurez accès à des mises à jour visuelles et des notifications à chaque étape.', 
    en: 'Through your personal account, you will have access to visual updates and notifications at each stage.' 
  },
  
  question4: { 
    fr: 'Puis-je faire livrer à un proche au Togo ?', 
    en: 'Can I have my order delivered to a relative in Togo?' 
  },
  answer4: { 
    fr: 'Absolument ! Vous pouvez choisir l\'option de livraison directe à l\'adresse d\'un proche ou d\'un membre de votre famille.', 
    en: 'Absolutely! You can choose the direct delivery option to the address of a relative or family member.' 
  },
  
  // Contact Form
  contactUs: { fr: 'Contactez-nous', en: 'Contact Us' },
  contactSubtitle: { 
    fr: 'Une question ? Nous sommes là pour vous aider', 
    en: 'Have a question? We\'re here to help' 
  },
  name: { fr: 'Nom', en: 'Name' },
  email: { fr: 'Email', en: 'Email' },
  message: { fr: 'Message', en: 'Message' },
  send: { fr: 'Envoyer', en: 'Send' },
  
  // Footer
  allRightsReserved: { 
    fr: 'Tous droits réservés', 
    en: 'All rights reserved' 
  },
  privacyPolicy: { fr: 'Politique de confidentialité', en: 'Privacy Policy' },
  terms: { fr: 'Conditions d\'utilisation', en: 'Terms of Use' },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation '${key}' not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
