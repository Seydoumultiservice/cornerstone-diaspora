
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, ShoppingCart, Map, Settings, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PaymentForm from './PaymentForm';

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  
  const services = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-cornerstone-orange" />,
      title: t('onlineOrdering'),
      description: t('onlineOrderingDesc')
    },
    {
      icon: <Calendar className="w-12 h-12 text-cornerstone-orange" />,
      title: t('flexiblePayment'),
      description: t('flexiblePaymentDesc')
    },
    {
      icon: <Map className="w-12 h-12 text-cornerstone-orange" />,
      title: t('delayedDelivery'),
      description: t('delayedDeliveryDesc')
    },
    {
      icon: <Settings className="w-12 h-12 text-cornerstone-orange" />,
      title: t('realTimeTracking'),
      description: t('realTimeTrackingDesc')
    }
  ];

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  const openPaymentForm = () => {
    // Open payment form in a new tab/window
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${language === 'fr' ? 'Formulaire de Paiement Échelonné' : 'Installment Payment Form'}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: 'Lato', sans-serif;
                background-color: #F1F1F1;
                margin: 0;
                padding: 20px;
                color: #333;
              }
              .form-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              h1 {
                font-family: 'Playfair Display', serif;
                color: #F97316;
                text-align: center;
                margin-bottom: 30px;
              }
              .form-group {
                margin-bottom: 20px;
              }
              label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
              }
              input, select, textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-family: inherit;
                font-size: 16px;
              }
              textarea {
                height: 150px;
                resize: vertical;
              }
              button {
                background-color: #F97316;
                color: white;
                border: none;
                padding: 12px 20px;
                font-size: 16px;
                font-weight: bold;
                border-radius: 4px;
                cursor: pointer;
                display: block;
                width: 100%;
                transition: background-color 0.3s;
              }
              button:hover {
                background-color: #ea6000;
              }
              .success-message {
                display: none;
                background-color: #e6f7e6;
                color: #2e7d32;
                padding: 15px;
                border-radius: 4px;
                margin-top: 20px;
                text-align: center;
              }
              @media (max-width: 768px) {
                .form-container {
                  padding: 20px;
                }
              }
            </style>
          </head>
          <body>
            <div class="form-container">
              <h1>${language === 'fr' ? 'Formulaire de Paiement Échelonné' : 'Installment Payment Form'}</h1>
              <form id="payment-form">
                <div class="form-group">
                  <label for="lastname">${language === 'fr' ? 'Nom' : 'Last Name'}</label>
                  <input type="text" id="lastname" name="lastname" required>
                </div>
                <div class="form-group">
                  <label for="firstname">${language === 'fr' ? 'Prénom' : 'First Name'}</label>
                  <input type="text" id="firstname" name="firstname" required>
                </div>
                <div class="form-group">
                  <label for="phone">${language === 'fr' ? 'Numéro de téléphone' : 'Phone Number'}</label>
                  <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                  <label for="country">${language === 'fr' ? 'Pays de résidence' : 'Country of Residence'}</label>
                  <input type="text" id="country" name="country" required>
                </div>
                <div class="form-group">
                  <label for="description">${language === 'fr' ? 'Description du produit et mode de paiement souhaité' : 'Product description and preferred payment method'}</label>
                  <textarea id="description" name="description" required></textarea>
                </div>
                <button type="submit">OK</button>
                <div id="success-message" class="success-message">
                  ${language === 'fr' ? 'Votre demande a été envoyée avec succès! Nous vous contacterons bientôt.' : 'Your request has been successfully sent! We will contact you soon.'}
                </div>
              </form>
            </div>
            <script>
              document.getElementById('payment-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Here you would typically implement form submission to a backend
                // For now, we'll just show a success message
                document.getElementById('success-message').style.display = 'block';
                document.getElementById('payment-form').reset();
                
                // Simulate form submission (in a real implementation, this would send data to backend)
                console.log({
                  lastname: document.getElementById('lastname').value,
                  firstname: document.getElementById('firstname').value,
                  phone: document.getElementById('phone').value,
                  country: document.getElementById('country').value,
                  description: document.getElementById('description').value
                });
              });
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <section id="services" className="py-20 bg-cornerstone-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair text-cornerstone-orange">{t('ourServices')}</h2>
          <p className="text-xl font-medium mb-12 text-cornerstone-gray max-w-3xl mx-auto">{t('servicesSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-cornerstone-white p-8 rounded-lg border border-cornerstone-orange/20 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4 font-playfair text-cornerstone-orange">{service.title}</h3>
              <p className="text-cornerstone-gray">{service.description}</p>
              
              {/* Add action buttons for the specific services */}
              {index === 0 && (
                <Button
                  onClick={() => handleExternalLink('https://cornerstonebrique.com/services')}
                  className="mt-4 bg-cornerstone-orange hover:bg-cornerstone-orange/90 text-cornerstone-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-transform hover:scale-105"
                >
                  {language === 'fr' ? 'Commande en ligne' : 'Order Online'}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
              
              {index === 1 && (
                <Button
                  onClick={openPaymentForm}
                  className="mt-4 bg-cornerstone-orange hover:bg-cornerstone-orange/90 text-cornerstone-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-transform hover:scale-105"
                >
                  {language === 'fr' ? 'Paiement Échelonné' : 'Installment Payment'}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button
            onClick={() => handleExternalLink('https://www.cornerstonebrique.com/services')}
            className="bg-cornerstone-orange hover:bg-cornerstone-orange/90 text-cornerstone-white px-8 py-6 rounded-lg text-lg font-bold flex items-center gap-2 mx-auto transition-transform hover:scale-105"
          >
            {language === 'fr' ? 'Commander maintenant' : 'Order Now'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
