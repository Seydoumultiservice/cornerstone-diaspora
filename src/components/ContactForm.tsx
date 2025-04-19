
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">{t('contactUs')}</h2>
          <p className="section-subtitle">{t('contactSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  {t('name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-gold"
                  placeholder="Jean Dupont"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  {t('email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-gold"
                  placeholder="exemple@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  {t('message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-gold"
                  placeholder="Votre message ici..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-70"
              >
                {isSubmitting ? '...' : t('send')}
              </button>
            </form>
          </div>
          
          <div className="bg-cornerstone-black p-8 rounded-lg shadow-md text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8 font-playfair text-cornerstone-gold">Cornerstone Briques</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-cornerstone-gold mt-1" />
                <div>
                  <p className="font-bold mb-1">Adresse</p>
                  <p>123 Boulevard Commercial, Lomé, Togo</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-cornerstone-gold mt-1" />
                <div>
                  <p className="font-bold mb-1">Téléphone</p>
                  <p>+228 90 12 34 56</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-cornerstone-gold mt-1" />
                <div>
                  <p className="font-bold mb-1">Email</p>
                  <p>contact@cornerstonebriques.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/20">
              <p className="mb-2 font-medium">Heures d'ouverture</p>
              <p>Lundi - Vendredi: 8h - 18h</p>
              <p>Samedi: 9h - 15h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
