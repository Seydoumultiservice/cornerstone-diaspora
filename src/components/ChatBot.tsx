
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    { type: 'phone', value: '(+228) 90 96 49 93' },
    { type: 'phone', value: '(+228) 99 87 01 95' },
    { type: 'email', value: 'contact@cornerstonebrique.com' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      
      // Add bot message
      const botMessage: Message = {
        id: messages.length + 2,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Simple response generator based on keywords
  const generateBotResponse = (message: string) => {
    const lowerCaseMsg = message.toLowerCase();
    
    if (lowerCaseMsg.includes('bonjour') || lowerCaseMsg.includes('salut') || lowerCaseMsg.includes('hello')) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    } else if (lowerCaseMsg.includes('prix') || lowerCaseMsg.includes('coût') || lowerCaseMsg.includes('tarif')) {
      return "Nos prix varient selon vos besoins spécifiques. Pourriez-vous me donner plus de détails sur votre projet pour que je puisse vous fournir une estimation ?";
    } else if (lowerCaseMsg.includes('livraison') || lowerCaseMsg.includes('délai')) {
      return "Les délais de livraison dépendent de votre localisation et de la taille de la commande. Généralement, nous livrons dans un délai de 2 à 7 jours ouvrables. Pour un suivi en temps réel, visitez notre page de suivi.";
    } else if (lowerCaseMsg.includes('contact') || lowerCaseMsg.includes('téléphone') || lowerCaseMsg.includes('email')) {
      return "Vous pouvez nous contacter par téléphone au (+228) 90 96 49 93 / (+228) 99 87 01 95 ou par email à contact@cornerstonebrique.com";
    } else if (lowerCaseMsg.includes('boutique') || lowerCaseMsg.includes('acheter') || lowerCaseMsg.includes('commander')) {
      return "Vous pouvez passer commande directement sur notre boutique en ligne: https://www.cornerstonebrique.com/services";
    } else if (lowerCaseMsg.includes('suivi') || lowerCaseMsg.includes('commande')) {
      return "Pour suivre votre commande en temps réel, visitez notre page de suivi de commandes accessible depuis le menu principal de notre site.";
    } else if (lowerCaseMsg.includes('merci') || lowerCaseMsg.includes('thank')) {
      return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
    } else {
      return "Je comprends votre question. Pour une assistance plus personnalisée, n'hésitez pas à nous contacter directement par téléphone ou email. Souhaitez-vous que je vous fournisse nos coordonnées ?";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="bg-cornerstone-marine p-4 rounded-full hover:bg-cornerstone-marine/90 transition-colors shadow-lg">
            <MessageCircle className="w-6 h-6 text-cornerstone-white" />
          </button>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:w-[440px] h-[600px] bg-cornerstone-white p-0 flex flex-col">
          <div className="flex flex-col h-full">
            <div className="bg-cornerstone-marine p-4">
              <h3 className="text-cornerstone-white font-playfair text-lg">Cornerstone Briques Assistant</h3>
            </div>
            <div className="flex-grow p-4 bg-cornerstone-lightgray overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-cornerstone-gold text-cornerstone-marine'
                          : 'bg-cornerstone-white border border-cornerstone-marine/20 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-4 py-2 bg-cornerstone-white border border-cornerstone-marine/20 text-gray-800">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef}></div>
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Écrivez votre message ici..."
                  className="flex-1 border-cornerstone-marine/30 focus:border-cornerstone-gold"
                />
                <Button onClick={handleSendMessage} className="bg-cornerstone-marine hover:bg-cornerstone-marine/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2 text-sm">Contactez-nous directement:</h4>
                {contactInfo.map((contact, index) => (
                  <div key={index} className="mb-1 flex items-center">
                    {contact.type === 'email' ? (
                      <Mail className="w-4 h-4 mr-2 text-cornerstone-marine" />
                    ) : (
                      <span className="mr-2">📞</span>
                    )}
                    <a 
                      href={contact.type === 'email' ? `mailto:${contact.value}` : `tel:${contact.value}`}
                      className="text-cornerstone-marine hover:text-cornerstone-gold transition-colors text-sm"
                    >
                      {contact.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatBot;
