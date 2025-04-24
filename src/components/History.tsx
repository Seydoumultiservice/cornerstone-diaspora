
import React from 'react';
import { Clock } from 'lucide-react';  // Replace 'history' with an appropriate icon from lucide-react

const History: React.FC = () => {
  return (
    <section className="py-20 bg-cornerstone-beige">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-cornerstone-red mr-3" />  {/* Changed from 'history' to 'Clock' */}
            <h2 className="section-title">Notre Histoire</h2>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 space-y-6">
          <p className="animate-fade-in">
            Chez Cornerstone Briques, nous sommes bien plus qu'un simple fabricant de briques de haute qualité. 
            Nous incarnons l'espoir et la confiance de toute une communauté togolaise dispersée à travers le monde.
          </p>
          
          <p className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Trop souvent, les Togolais de la diaspora envoient leur soutien financier à leurs proches pour réaliser 
            le rêve d'un foyer sûr et pérenne. Mais, à leur retour, force est de constater que les projets de 
            construction n'ont pas toujours abouti – parfois, les maisons construites ne portent même pas leur nom.
          </p>
          
          <p className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            Fort de cette réalité lourde d'injustice et de frustration, notre fondateur a décidé de transformer 
            cette expérience personnelle en une opportunité d'innovation. Ayant lui-même vécu ces désillusions, 
            il a créé Cornerstone Briques afin d'établir une solution légale et technologique qui redonne aux 
            Togolais de la diaspora le contrôle total sur leurs projets immobiliers.
          </p>
          
          <p className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
            Notre technologie de pointe assure un suivi détaillé et interactif, garantissant que chaque 
            investissement est sécurisé et que chaque étape respecte rigoureusement les normes de qualité 
            et de légalité. Nous offrons également des services complémentaires, tels que le stockage gratuit 
            de vos briques pendant six mois et des options de paiement souples, pour répondre aux besoins 
            spécifiques des Togolais résidant à l'étranger comme sur le sol national.
          </p>
          
          <p className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
            Cornerstone Briques, c'est la promesse d'un futur où vos projets prennent vie avec rigueur, 
            clarté et dignité. En redonnant aux Togolais de la diaspora le pouvoir de voir leur rêve se 
            concrétiser, nous bâtissons ensemble des fondations solides pour l'avenir.
          </p>
        </div>
      </div>
    </section>
  );
};

export default History;
