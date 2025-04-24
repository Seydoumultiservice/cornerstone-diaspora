
import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import CurrencyConverter from '../components/CurrencyConverter';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import ProjectEstimation from '../components/ProjectEstimation';
import Newsletter from '../components/Newsletter';
import { Element } from 'react-scroll';

const Index: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Element name="home">
            <Hero />
          </Element>
          <Element name="services">
            <Services />
          </Element>
          <Element name="estimate-project">
            <ProjectEstimation />
          </Element>
          <CurrencyConverter />
          <Element name="testimonials">
            <Testimonials />
          </Element>
          <Newsletter />
          <Element name="faq">
            <FAQ />
          </Element>
          <Element name="contact">
            <ContactForm />
          </Element>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
