
import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Mic, MicOff, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ContactForm: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Voice message functionality
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        // Stop all tracks in the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' 
          ? "Impossible d'accéder au microphone. Veuillez vérifier les permissions." 
          : "Unable to access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: language === 'fr' ? "Message envoyé !" : "Message sent!",
        description: language === 'fr' 
          ? "Nous vous répondrons dans les plus brefs délais." 
          : "We will respond to you shortly.",
      });
      setFormData({ name: '', email: '', message: '' });
      setAudioURL(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-cornerstone-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title text-cornerstone-red">{t('contactUs')}</h2>
          <p className="section-subtitle">{t('contactSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 animate-slide-in-left">
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-orange"
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-orange"
                  placeholder="exemple@email.com"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="message" className="font-medium">
                    {t('message')} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{language === 'fr' ? 'ou' : 'or'}</span>
                    <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`flex items-center gap-1 p-2 rounded-full ${
                        isRecording 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                      <span className="text-xs ml-1">
                        {isRecording 
                          ? (language === 'fr' ? 'Arrêter' : 'Stop') 
                          : (language === 'fr' ? 'Vocal' : 'Voice')}
                      </span>
                    </button>
                  </div>
                </div>
                
                {audioURL ? (
                  <div className="mb-4 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm text-gray-700 mb-2">{language === 'fr' ? 'Message vocal enregistré:' : 'Voice message recorded:'}</p>
                    <audio controls src={audioURL} className="w-full" />
                    <button 
                      type="button" 
                      onClick={() => setAudioURL(null)}
                      className="text-xs text-red-500 hover:text-red-700 mt-2"
                    >
                      {language === 'fr' ? 'Supprimer' : 'Delete'}
                    </button>
                  </div>
                ) : (
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required={!audioURL}
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-orange"
                    placeholder={language === 'fr' ? 'Votre message ici...' : 'Your message here...'}
                  ></textarea>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-cornerstone-red text-white p-3 rounded-md w-full hover:bg-cornerstone-red/90 transition-all transform hover:scale-105 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    {language === 'fr' ? 'Envoi...' : 'Sending...'}
                  </span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>{t('send')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-cornerstone-brown p-8 rounded-lg shadow-md text-white flex flex-col justify-center animate-slide-in-right">
            <h3 className="text-2xl font-bold mb-8 font-playfair text-cornerstone-orange">Cornerstone Briques</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-cornerstone-orange mt-1" />
                <div>
                  <p className="font-bold mb-1">Adresse</p>
                  <p>Akodessewa, Après les rails, non loin de la station d'essence CM, Lomé.</p>
                  <a 
                    href="https://maps.app.goo.gl/1kJuF8Kmp3CMycmQ6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cornerstone-orange hover:underline text-sm inline-flex items-center gap-1 mt-1"
                  >
                    {language === 'fr' ? 'Voir sur Google Maps' : 'View on Google Maps'} →
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-cornerstone-orange mt-1" />
                <div>
                  <p className="font-bold mb-1">Téléphone</p>
                  <p>(+228) 90 96 49 93 / 99 87 01 95</p>
                  <div className="flex items-center gap-3 mt-1">
                    <a 
                      href="tel:+22890964993" 
                      className="text-cornerstone-orange hover:underline text-sm inline-flex items-center gap-1"
                    >
                      {language === 'fr' ? 'Appeler' : 'Call'} →
                    </a>
                    <a 
                      href="https://wa.me/22890964993" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cornerstone-orange hover:underline text-sm inline-flex items-center gap-1"
                    >
                      WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-cornerstone-orange mt-1" />
                <div>
                  <p className="font-bold mb-1">Email</p>
                  <a 
                    href="mailto:contact@cornerstonebriques.com"
                    className="hover:text-cornerstone-orange transition-colors"
                  >
                    contact@cornerstonebriques.com
                  </a>
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
