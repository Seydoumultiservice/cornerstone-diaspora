
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'ee';

type Translations = {
  [key: string]: {
    fr: string;
    en: string;
    ee: string;
  };
};

// Our translations
const translations: Translations = {
  // Navbar
  home: { fr: 'Accueil', en: 'Home', ee: 'Aƒeme' },
  services: { fr: 'Services', en: 'Services', ee: 'Subɔsubɔwo' },
  about: { fr: 'À Propos', en: 'About', ee: 'Mía ŋuti' },
  contact: { fr: 'Contact', en: 'Contact', ee: 'Kpɔ mí' },
  estimateProject: { fr: 'Estimer mon projet', en: 'Estimate my project', ee: 'Ðo ŋkunɔ nye dɔwɔna' },

  // Hero Section
  heroTitle: { 
    fr: 'Construisez au Togo depuis l\'étranger, sans stress !', 
    en: 'Build in Togo from abroad, stress-free!', 
    ee: 'Tu xɔ le Togo tso dzronyigba dzidzimenya manɔmee!'
  },
  heroSubtitle: { 
    fr: 'Solutions premium pour la diaspora africaine', 
    en: 'Premium solutions for the African diaspora',
    ee: 'Dɔwɔna nyuitɔwo na Afrika dzidzimeviwo'
  },
  getStarted: { fr: 'Commencer', en: 'Get Started', ee: 'Dze egɔme' },
  learnMore: { fr: 'En savoir plus', en: 'Learn More', ee: 'Srɔ̃ nu bubuwo' },

  // Services Section
  ourServices: { fr: 'Nos Services', en: 'Our Services', ee: 'Míaƒe subɔsubɔwo' },
  servicesSubtitle: { 
    fr: 'Des solutions sur mesure pour la diaspora', 
    en: 'Tailored solutions for the diaspora',
    ee: 'Dɔwɔna siwo sɔ na dzidzimeviwo'
  },
  
  // Service 1
  onlineOrdering: { fr: 'Commande en ligne', en: 'Online Ordering', ee: 'Nudɔdzradzra le Internet dzi' },
  onlineOrderingDesc: { 
    fr: 'Commandez vos matériaux de construction directement depuis l\'étranger.', 
    en: 'Order your building materials directly from abroad.',
    ee: 'Ƒle wò xɔtunu siwo nèhiã tso dzronyigba.'
  },
  
  // Service 2
  flexiblePayment: { fr: 'Paiement Échelonné', en: 'Flexible Payment', ee: 'Fexe ga le ɣeyiɣiwo me' },
  flexiblePaymentDesc: { 
    fr: 'Optez pour un plan de paiement personnalisé qui correspond à votre budget.', 
    en: 'Choose a customized payment plan that fits your budget.',
    ee: 'Tia fexe ga mɔnu si asɔ na wò gadzraɖoƒe.'
  },
  
  // Service 3
  delayedDelivery: { fr: 'Livraison Différée', en: 'Delayed Delivery', ee: 'Nutsɔtsɔ va aƒe emegbe' },
  delayedDeliveryDesc: { 
    fr: 'Stockage gratuit pour 3 mois.', 
    en: 'Free storage for 3 months.',
    ee: 'Nudzraɖoƒe femaxee na ɣleti 3.'
  },
  
  // Service 4
  realTimeTracking: { fr: 'Suivi en Temps Réel', en: 'Real-Time Tracking', ee: 'Nukpɔkpɔ le ɣeyiɣi me' },
  realTimeTrackingDesc: { 
    fr: 'Suivez l\'avancement de votre projet avec des mises à jour visuelles.', 
    en: 'Track your project progress with visual updates.',
    ee: 'Kpɔ wò dɔwɔna ƒe ŋgɔyiyi kple fotowo.'
  },

  // Currency Converter
  currencyConverter: { fr: 'Convertisseur de Devises', en: 'Currency Converter', ee: 'Gatrɔtrɔ' },
  amount: { fr: 'Montant', en: 'Amount', ee: 'Ga home' },
  from: { fr: 'De', en: 'From', ee: 'Tso' },
  to: { fr: 'À', en: 'To', ee: 'Yi' },
  convert: { fr: 'Convertir', en: 'Convert', ee: 'Trɔ' },
  result: { fr: 'Résultat', en: 'Result', ee: 'Numedzodzro' },
  
  // Testimonials
  testimonials: { fr: 'Témoignages', en: 'Testimonials', ee: 'Ðaseɖiɖiwo' },
  testimonialsSubtitle: { 
    fr: 'Ce que dit notre diaspora', 
    en: 'What our diaspora says',
    ee: 'Nya siwo míaƒe dzidzimeviwo gblɔ'
  },
  
  // FAQ
  faq: { fr: 'Questions Fréquentes', en: 'FAQ', ee: 'Biabia siwo wobia zi geɖe' },
  faqSubtitle: { 
    fr: 'Réponses à vos questions', 
    en: 'Answers to your questions',
    ee: 'Ŋuɖeɖewo na wò biabiawo'
  },
  
  // FAQ Questions
  question1: { 
    fr: 'Comment fonctionne la livraison différée ?', 
    en: 'How does delayed delivery work?',
    ee: 'Aleke nutsɔtsɔ va aƒe emegbe wɔna?'
  },
  answer1: { 
    fr: 'Nous stockons gratuitement vos matériaux dans notre entrepôt sécurisé jusqu\'à votre date de retour au Togo.', 
    en: 'We store your materials free of charge in our secure warehouse until your return date to Togo.',
    ee: 'Míedzra wò nuwo ɖo femaxee le míaƒe nudzraɖoƒe dedie me vaseɖe esi nàtrɔ ava Togo.'
  },
  
  question2: { 
    fr: 'Puis-je payer en plusieurs fois ?', 
    en: 'Can I pay in installments?',
    ee: 'Mate ŋu axe fe le akpawo me?'
  },
  answer2: { 
    fr: 'Oui, nous proposons des plans de paiement personnalisés. Par exemple, vous pouvez payer 30% à la commande et le reste sur 3 mois.', 
    en: 'Yes, we offer customized payment plans. For example, you can pay 30% when ordering and the rest over 3 months.',
    ee: 'Ɛ, míena mɔnukpɔkpɔ be nàxe fe le akpawo me. Le kpɔɖeŋu me, àte ŋu axe 30% gbãdaga eye àxe mamlɛawo le ɣleti 3 me.'
  },
  
  question3: { 
    fr: 'Comment suivre l\'avancement de mon projet ?', 
    en: 'How can I track my project progress?',
    ee: 'Aleke mate ŋu akpɔ nye dɔwɔna ƒe ŋgɔyiyi?'
  },
  answer3: { 
    fr: 'Via votre espace personnel, vous aurez accès à des mises à jour visuelles et des notifications à chaque étape.', 
    en: 'Through your personal account, you will have access to visual updates and notifications at each stage.',
    ee: 'To wò ŋutɔ wò akɔŋta me, àte ŋu akpɔ fotowo kple nyadzɔdzɔwo le afisiafi.'
  },
  
  question4: { 
    fr: 'Puis-je faire livrer à un proche au Togo ?', 
    en: 'Can I have my order delivered to a relative in Togo?',
    ee: 'Mate ŋu ana wòatsɔ nusiwo meƒle ayi na ƒometɔ aɖe le Togo?'
  },
  answer4: { 
    fr: 'Absolument ! Vous pouvez choisir l\'option de livraison directe à l\'adresse d\'un proche ou d\'un membre de votre famille.', 
    en: 'Absolutely! You can choose the direct delivery option to the address of a relative or family member.',
    ee: 'Ɛ, àte ŋu atia be woatsɔ nuawo aɖo wò ƒometɔ alo xɔlɔ̃ aɖe ƒe aƒe.'
  },
  
  // Contact Form
  contactUs: { fr: 'Contactez-nous', en: 'Contact Us', ee: 'Kpɔ mí' },
  contactSubtitle: { 
    fr: 'Une question ? Nous sommes là pour vous aider', 
    en: 'Have a question? We\'re here to help',
    ee: 'Biabia aɖe le asiwòa? Míeli be míakpe ɖe ŋuwò'
  },
  name: { fr: 'Nom', en: 'Name', ee: 'Ŋkɔ' },
  email: { fr: 'Email', en: 'Email', ee: 'Email' },
  message: { fr: 'Message', en: 'Message', ee: 'Gbedeasi' },
  send: { fr: 'Envoyer', en: 'Send', ee: 'Ðo ɖa' },
  
  // Footer
  allRightsReserved: { 
    fr: 'Tous droits réservés', 
    en: 'All rights reserved',
    ee: 'Gomekpɔkpɔ ɖe dzidewonya nu'
  },
  privacyPolicy: { fr: 'Politique de confidentialité', en: 'Privacy Policy', ee: 'Ameŋutinunya ŋu ɖoɖo' },
  terms: { fr: 'Conditions d\'utilisation', en: 'Terms of Use', ee: 'Zãzã ƒe ɖoɖowo' },
  language: { fr: 'fr', en: 'en', ee: 'ee' },
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
