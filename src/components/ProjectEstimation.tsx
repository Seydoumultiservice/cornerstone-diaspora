
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import MaterialCalculator from './MaterialCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ProjectFormValues = {
  name: string;
  email: string;
  phone: string;
  country: string;
  description: string;
  files: FileList | null;
};

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const ProjectEstimation = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('calculator');
  
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      description: '',
      files: null,
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      console.log('Form submitted:', data);
      // In a real app, you would send this data to your backend
      setTimeout(() => {
        alert(language === 'fr' 
          ? 'Votre demande d\'estimation a été soumise avec succès. Nous vous contacterons sous peu.'
          : 'Your estimation request has been submitted successfully. We will contact you soon.');
        form.reset();
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const files = e.target.files;
    
    if (files) {
      let totalSize = 0;
      for (let i = 0; i < files.length; i++) {
        totalSize += files[i].size;
      }
      
      if (totalSize > MAX_FILE_SIZE) {
        setFileError(language === 'fr' 
          ? 'La taille totale des fichiers ne doit pas dépasser 100 Mo.'
          : 'Total file size should not exceed 100 MB.');
        e.target.value = '';
        return;
      }
      
      form.setValue('files', files);
    }
  };

  return (
    <section id="estimate-project" className="py-16 bg-cornerstone-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="section-title">
            {language === 'fr' ? 'Estimer Mon Projet' : 'Estimate My Project'}
          </h2>
          <p className="section-subtitle">
            {language === 'fr' 
              ? 'Calculez les matériaux nécessaires ou demandez une estimation personnalisée'
              : 'Calculate required materials or request a custom estimation'}
          </p>
        </div>
        
        <Tabs 
          defaultValue="calculator" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-4xl mx-auto mb-8"
        >
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="calculator">
              {language === 'fr' ? 'Calculateur de Matériaux' : 'Materials Calculator'}
            </TabsTrigger>
            <TabsTrigger value="custom-request">
              {language === 'fr' ? 'Demande Personnalisée' : 'Custom Request'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="mt-6 focus-visible:outline-none">
            <MaterialCalculator />
          </TabsContent>
          
          <TabsContent value="custom-request" className="mt-6 focus-visible:outline-none">
            <Card className="max-w-2xl mx-auto shadow-lg">
              <CardHeader className="bg-cornerstone-red text-cornerstone-white rounded-t-lg">
                <CardTitle>
                  {language === 'fr' ? 'Demande d\'estimation personnalisée' : 'Custom Estimation Request'}
                </CardTitle>
                <CardDescription className="text-cornerstone-white/80">
                  {language === 'fr' 
                    ? 'Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les plus brefs délais.'
                    : 'Fill in the form below and our team will contact you as soon as possible.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: language === 'fr' ? 'Le nom est requis' : 'Name is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'fr' ? 'Nom complet' : 'Full Name'}</FormLabel>
                            <FormControl>
                              <Input placeholder={language === 'fr' ? 'Votre nom' : 'Your name'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        rules={{ 
                          required: language === 'fr' ? 'L\'email est requis' : 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: language === 'fr' ? 'Email invalide' : 'Invalid email address'
                          }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'fr' ? 'Email' : 'Email'}</FormLabel>
                            <FormControl>
                              <Input placeholder={language === 'fr' ? 'Votre email' : 'Your email'} type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'fr' ? 'Téléphone' : 'Phone'}</FormLabel>
                            <FormControl>
                              <Input placeholder={language === 'fr' ? 'Votre numéro' : 'Your number'} type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        rules={{ required: language === 'fr' ? 'Le pays est requis' : 'Country is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'fr' ? 'Pays' : 'Country'}</FormLabel>
                            <FormControl>
                              <Input placeholder={language === 'fr' ? 'Votre pays' : 'Your country'} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      rules={{ required: language === 'fr' ? 'La description est requise' : 'Description is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Description du projet' : 'Project Description'}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={language === 'fr' 
                                ? 'Décrivez votre projet en détail...' 
                                : 'Describe your project in detail...'
                              }
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-2">
                      <FormLabel>{language === 'fr' ? 'Pièces jointes' : 'Attachments'}</FormLabel>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                          <FileUp className="w-10 h-10 text-cornerstone-red mb-2" />
                          <span className="text-base font-medium">
                            {language === 'fr' 
                              ? 'Cliquez pour télécharger des fichiers' 
                              : 'Click to upload files'}
                          </span>
                          <span className="text-sm text-gray-500 mt-1">
                            {language === 'fr' 
                              ? 'PDF, Word, Images, Vidéos (max 100 Mo)' 
                              : 'PDF, Word, Images, Videos (max 100 MB)'}
                          </span>
                          <input
                            id="file-upload"
                            name="files"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.mp4,.mov"
                          />
                        </label>
                      </div>
                      {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
                      <FormDescription>
                        {language === 'fr' 
                          ? 'Vous pouvez télécharger plusieurs fichiers (PDF, Word, Excel, Images, Vidéos)'
                          : 'You can upload multiple files (PDF, Word, Excel, Images, Videos)'}
                      </FormDescription>
                    </div>
                  
                    <CardFooter className="px-0 pb-0 pt-4">
                      <Button 
                        type="submit" 
                        className={cn(
                          "w-full bg-cornerstone-red hover:bg-cornerstone-red/80 text-cornerstone-white",
                          isSubmitting && "opacity-70 cursor-not-allowed"
                        )}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                            {language === 'fr' ? 'Envoi en cours...' : 'Submitting...'}
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" />
                            {language === 'fr' ? 'Envoyer la demande' : 'Submit Request'}
                          </span>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProjectEstimation;
