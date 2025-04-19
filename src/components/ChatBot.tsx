
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactInfo = [
    { type: 'phone', value: '(+228) 90 96 49 93' },
    { type: 'phone', value: '(+228) 99 87 01 95' },
    { type: 'email', value: 'contact@cornerstonebriques.com' }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="bg-cornerstone-gold p-4 rounded-full hover:bg-opacity-90 transition-colors shadow-lg">
            <MessageCircle className="w-6 h-6 text-cornerstone-black" />
          </button>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:w-[440px] h-[600px] bg-white">
          <div className="flex flex-col h-full">
            <div className="bg-cornerstone-black p-4">
              <h3 className="text-white font-playfair text-lg">Cornerstone Briques Assistant</h3>
            </div>
            <div className="flex-grow p-4 bg-gray-50">
              {/* Chat messages would go here */}
              <div className="text-center text-gray-500">
                Comment puis-je vous aider aujourd'hui ?
              </div>
            </div>
            <div className="border-t p-4">
              <h4 className="font-medium mb-2">Contactez-nous directement:</h4>
              {contactInfo.map((contact, index) => (
                <div key={index} className="mb-1">
                  <a 
                    href={contact.type === 'email' ? `mailto:${contact.value}` : `tel:${contact.value}`}
                    className="text-cornerstone-navy hover:text-cornerstone-gold transition-colors"
                  >
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatBot;
