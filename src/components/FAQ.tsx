
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  
  const faqItems = [
    {
      question: "Qui sommes-nous ?",
      answer: "Cornerstone Briques est une entreprise basée à Lomé, Togo, spécialisée dans la confection de briques de haute qualité. Forts d'une expertise reconnue dans le secteur de la construction, nous combinons savoir-faire traditionnel et technologie moderne pour offrir à nos clients des produits fiables et un suivi en temps réel de leurs projets."
    },
    {
      question: "Quels types de briques proposez-vous ?",
      answer: "Nous fabriquons des briques adaptées à divers types de projets de construction, qu'il s'agisse de projets résidentiels, commerciaux ou industriels. Nos briques se distinguent par leur durabilité, leur finition soignée et leur qualité exceptionnelle."
    },
    {
      question: "Comment fonctionne le suivi de production ?",
      answer: "Grâce à notre technologie innovante, chaque client peut suivre à distance la production de ses briques ainsi que l'évolution de son projet de construction. Ce système de traçabilité permet d'avoir un aperçu détaillé des différentes étapes, depuis la fabrication jusqu'à la finition, en passant par le contrôle qualité."
    },
    {
      question: "Comment accéder au suivi de production de ma commande ?",
      answer: "Une fois votre commande passée, vous recevrez des identifiants permettant de vous connecter à notre plateforme en ligne. Vous pourrez alors visualiser en temps réel le statut de la production, consulter des rapports d'étape et même intervenir si nécessaire via des alertes ou messages personnalisés."
    },
    {
      question: "Quelles sont les modalités de stockage de vos briques ?",
      answer: "Pour garantir la qualité et la disponibilité de nos produits, nous proposons un service de stockage gratuit des briques commandées pendant une durée de 6 mois. Au-delà de cette période, un coût additionnel pourra être appliqué selon la durée de stockage souhaitée."
    },
    {
      question: "Comment se passe la livraison dans la ville de Lomé ?",
      answer: "Pour nos clients établis à Lomé, nous offrons une livraison gratuite directement sur le site de construction ou à l'adresse de votre choix dans la ville. Nos équipes logistiques veillent à ce que la livraison se fasse dans les délais convenus et en parfait état."
    },
    {
      question: "Quelles options proposez-vous pour les Togolais résidant à l'étranger ?",
      answer: "Conscients des besoins spécifiques des Togolais vivant à l'étranger, nous offrons la possibilité de créer un compte personnalisé sur notre site. Cela permet à ces clients de passer commande depuis l'étranger et de bénéficier de modalités de paiement flexibles, adaptées à leur capacité financière. Le suivi et la gestion de leur commande se font également depuis leur espace sécurisé en ligne."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons différents modes de paiement, incluant les virements bancaires, paiements par carte de crédit/débit ainsi que des solutions de paiement en ligne sécurisées. Pour les clients internationaux, des facilités de paiement adaptées sont mises à disposition."
    },
    {
      question: "Y a-t-il des garanties sur la qualité des briques ?",
      answer: "Absolument. Chaque brique fabriquée chez Cornerstone Briques est soumise à des contrôles qualité rigoureux à chaque étape de la production. Nous garantissons la résistance, la texture et la finition de nos produits afin d'assurer la pérennité de vos constructions."
    },
    {
      question: "Puis-je faire modifier certains paramètres de ma commande ?",
      answer: "Oui, grâce à notre plateforme interactive, vous avez la possibilité de suivre l'avancement de votre commande et de demander des modifications ou ajustements en cours de production, en fonction de vos besoins spécifiques."
    },
    {
      question: "Comment puis-je contacter votre service client ?",
      answer: "Notre équipe de support est disponible via téléphone, email ou chat en ligne. Vous trouverez toutes les informations de contact sur la page « Contact » de notre site web. Nous nous engageons à répondre à toutes vos questions dans les plus brefs délais."
    },
    {
      question: "Où puis-je obtenir de plus amples informations sur vos services ou prendre rendez-vous ?",
      answer: "Pour plus de détails sur nos services, nos technologies de suivi, et pour organiser une rencontre ou une visite de nos installations, vous pouvez remplir notre formulaire de contact en ligne ou appeler directement notre bureau situé à Lomé."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">{t('faq')}</h2>
          <p className="section-subtitle">{t('faqSubtitle')}</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 font-bold font-playfair hover:bg-gray-50 hover:text-cornerstone-red">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
