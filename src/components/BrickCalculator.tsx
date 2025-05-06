
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calculator, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';

// Price catalog (for internal calculation only - not displayed to users)
const BRICK_PRICES = {
  'hollow': {
    '10': 250,
    '12': 300,
    '15': 380,
    '20': 500
  },
  'solid': {
    '10': 300,
    '12': 460,
    '15': 500
  },
  'hourdis': {
    '12': 500,
    '15': 600
  }
};

// Constants for brick dimensions
const BRICK_LENGTH = 40; // cm
const BRICK_HEIGHT = 20; // cm
const JOINT_THICKNESS = 1; // cm
const SAFETY_MARGIN = 0.05; // 5% safety margin

// Currency conversion rates (as of May 2024 - for demonstration)
const CURRENCY_RATES = {
  'XOF': 1,
  'EUR': 0.00152,
  'GBP': 0.00131,
  'CAD': 0.00223,
  'JPY': 0.25,
  'DKK': 0.0113
};

interface ProjectDetails {
  type: string;
  length: number;
  height: number;
  width?: number;
  floors?: number;
  customFormat?: boolean;
  hollowFormat: string;
  solidFormat: string;
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
}

type ProjectType = 'wall' | 'house' | 'fence' | 'custom';

const BrickCalculator: React.FC = () => {
  const { language } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [projectType, setProjectType] = useState<ProjectType>('wall');
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    type: 'wall',
    length: 0,
    height: 0,
    hollowFormat: '12',
    solidFormat: '12',
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
  });
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('XOF');
  
  const form = useForm({
    defaultValues: {
      projectDescription: '',
      projectType: 'wall',
    }
  });

  const detailsForm = useForm({
    defaultValues: {
      length: '',
      height: '',
      width: '',
      floors: '',
      hollowFormat: '12',
      solidFormat: '12',
      useStandardFormula: 'yes',
    }
  });
  
  const contactForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
    }
  });

  // Parse project description to guess project type
  const analyzeProjectDescription = (description: string) => {
    const lowerDesc = description.toLowerCase();
    
    if (lowerDesc.includes('maison') || lowerDesc.includes('house')) {
      return 'house';
    } else if (lowerDesc.includes('clôture') || lowerDesc.includes('fence')) {
      return 'fence';
    } else if (lowerDesc.includes('mur') || lowerDesc.includes('wall')) {
      return 'wall';
    } else {
      return 'custom';
    }
  };

  const handleProjectTypeSubmit = (data: any) => {
    const guessedType = analyzeProjectDescription(data.projectDescription);
    setProjectType(guessedType);
    setProjectDetails(prev => ({ ...prev, type: guessedType }));
    setStep(2);
  };

  const handleProjectDetailsSubmit = (data: any) => {
    setProjectDetails({
      ...projectDetails,
      length: parseFloat(data.length),
      height: parseFloat(data.height),
      width: data.width ? parseFloat(data.width) : undefined,
      floors: data.floors ? parseInt(data.floors) : 1,
      customFormat: data.useStandardFormula === 'no',
      hollowFormat: data.hollowFormat,
      solidFormat: data.solidFormat,
    });
    setStep(3);
  };

  const handleContactInfoSubmit = (data: any) => {
    setContactInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      country: data.country,
    });
    
    calculateBricks();
  };

  // Calculate number of bricks needed based on project details
  const calculateBricks = () => {
    const { length, height, width, floors, hollowFormat, solidFormat, type } = projectDetails;
    
    let totalWallLength = length;
    
    // For houses, calculate total wall length
    if (type === 'house' && width) {
      // Simple formula: perimeter = 2 * (length + width)
      totalWallLength = 2 * (length + width);
    }
    
    // Convert to centimeters
    const wallLengthCm = totalWallLength * 100;
    const wallHeightCm = height * 100;
    
    // Calculate bricks per row (given length)
    const bricksPerRow = Math.ceil((wallLengthCm + JOINT_THICKNESS) / (BRICK_LENGTH + JOINT_THICKNESS));
    
    // Calculate number of rows (given height)
    const rows = Math.ceil((wallHeightCm + JOINT_THICKNESS) / (BRICK_HEIGHT + JOINT_THICKNESS));
    
    // First row is solid bricks, remaining rows are hollow
    const solidBricks = bricksPerRow;
    const hollowBricks = bricksPerRow * (rows - 1);
    
    // Multiply by number of floors if applicable
    const totalSolidBricks = floors ? solidBricks * floors : solidBricks;
    const totalHollowBricks = floors ? hollowBricks * floors : hollowBricks;
    
    // Calculate cost
    const solidCost = totalSolidBricks * BRICK_PRICES.solid[solidFormat];
    const hollowCost = totalHollowBricks * BRICK_PRICES.hollow[hollowFormat];
    
    const rawTotal = solidCost + hollowCost;
    const totalWithMargin = rawTotal * (1 + SAFETY_MARGIN);
    
    const results = {
      solidBricks: totalSolidBricks,
      hollowBricks: totalHollowBricks,
      totalBricks: totalSolidBricks + totalHollowBricks,
      totalCost: Math.round(totalWithMargin),
      currencyConversions: Object.fromEntries(
        Object.entries(CURRENCY_RATES).map(([currency, rate]) => [
          currency, 
          (totalWithMargin * rate).toFixed(2)
        ])
      )
    };
    
    setCalculationResults(results);
    
    // Show success message
    toast.success(language === 'fr' 
      ? 'Estimation calculée avec succès !' 
      : 'Estimation calculated successfully!');
  };

  const convertCurrency = (amount: number, toCurrency: string) => {
    const rate = CURRENCY_RATES[toCurrency] || 1;
    return (amount * rate).toFixed(2);
  };

  const reset = () => {
    setStep(1);
    setCalculationResults(null);
    form.reset();
    detailsForm.reset();
    contactForm.reset();
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return language === 'fr' ? 'Décrivez votre projet' : 'Describe your project';
      case 2:
        return language === 'fr' ? 'Dimensions du projet' : 'Project dimensions';
      case 3:
        return language === 'fr' ? 'Vos coordonnées' : 'Your contact information';
      default:
        return '';
    }
  };

  const getProjectTypeLabel = () => {
    switch (projectType) {
      case 'wall':
        return language === 'fr' ? 'Mur' : 'Wall';
      case 'house':
        return language === 'fr' ? 'Maison' : 'House';
      case 'fence':
        return language === 'fr' ? 'Clôture' : 'Fence';
      case 'custom':
        return language === 'fr' ? 'Projet personnalisé' : 'Custom project';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg border-cornerstone-orange/30">
        <CardHeader className="bg-gradient-to-r from-cornerstone-orange to-cornerstone-orange/80 text-white">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            <CardTitle className="text-xl md:text-2xl">
              {language === 'fr' ? 'Calculateur de Brique' : 'Brick Calculator'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {!calculationResults ? (
            <>
              <div className="mb-6 text-center">
                <h3 className="font-bold text-lg mb-2">
                  {getStepTitle()}
                </h3>
                <div className="flex justify-center items-center gap-1 mb-8">
                  <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-cornerstone-orange' : 'bg-gray-300'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-cornerstone-orange' : 'bg-gray-300'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${step === 3 ? 'bg-cornerstone-orange' : 'bg-gray-300'}`}></div>
                </div>
              </div>

              {step === 1 && (
                <form onSubmit={form.handleSubmit(handleProjectTypeSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label>
                      {language === 'fr' ? 'Description du projet' : 'Project description'}
                    </Label>
                    <Textarea 
                      className="min-h-32 border-cornerstone-orange/30"
                      placeholder={language === 'fr' 
                        ? 'Décrivez votre projet (ex: Je souhaite construire un mur de 10m de long et 2m de haut)' 
                        : 'Describe your project (e.g., I want to build a wall that is 10m long and 2m high)'}
                      {...form.register('projectDescription')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>
                      {language === 'fr' ? 'Type de projet' : 'Project type'}
                    </Label>
                    <Controller
                      name="projectType"
                      control={form.control}
                      render={({ field }) => (
                        <RadioGroup 
                          onValueChange={(value) => {
                            field.onChange(value);
                            setProjectType(value as ProjectType);
                            setProjectDetails(prev => ({ ...prev, type: value }));
                          }}
                          defaultValue={field.value}
                          className="grid grid-cols-2 md:grid-cols-4 gap-2"
                        >
                          <div className="flex items-center space-x-2 bg-white p-2 rounded-md border border-gray-200">
                            <RadioGroupItem value="wall" id="wall" />
                            <Label htmlFor="wall">{language === 'fr' ? 'Mur' : 'Wall'}</Label>
                          </div>
                          <div className="flex items-center space-x-2 bg-white p-2 rounded-md border border-gray-200">
                            <RadioGroupItem value="house" id="house" />
                            <Label htmlFor="house">{language === 'fr' ? 'Maison' : 'House'}</Label>
                          </div>
                          <div className="flex items-center space-x-2 bg-white p-2 rounded-md border border-gray-200">
                            <RadioGroupItem value="fence" id="fence" />
                            <Label htmlFor="fence">{language === 'fr' ? 'Clôture' : 'Fence'}</Label>
                          </div>
                          <div className="flex items-center space-x-2 bg-white p-2 rounded-md border border-gray-200">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label htmlFor="custom">{language === 'fr' ? 'Autre' : 'Other'}</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full mt-4 bg-cornerstone-orange hover:bg-cornerstone-orange/90"
                  >
                    {language === 'fr' ? 'Continuer' : 'Continue'} <ArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={detailsForm.handleSubmit(handleProjectDetailsSubmit)} className="space-y-4">
                  <div className="bg-cornerstone-orange/10 p-4 rounded-md mb-4">
                    <h4 className="font-medium text-cornerstone-orange">
                      {language === 'fr' ? 'Type de projet :' : 'Project type:'} {getProjectTypeLabel()}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="length">
                        {projectType === 'house' 
                          ? (language === 'fr' ? 'Longueur de la façade (m)' : 'Facade length (m)') 
                          : (language === 'fr' ? 'Longueur (m)' : 'Length (m)')}
                      </Label>
                      <Input
                        id="length"
                        type="number"
                        step="0.01"
                        min="0.1"
                        className="border-cornerstone-orange/30"
                        {...detailsForm.register('length', { required: true })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height">
                        {language === 'fr' ? 'Hauteur (m)' : 'Height (m)'}
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        step="0.01"
                        min="0.1"
                        className="border-cornerstone-orange/30"
                        {...detailsForm.register('height', { required: true })}
                      />
                    </div>
                  </div>
                  
                  {projectType === 'house' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">
                          {language === 'fr' ? 'Largeur/Profondeur (m)' : 'Width/Depth (m)'}
                        </Label>
                        <Input
                          id="width"
                          type="number"
                          step="0.01"
                          min="0.1"
                          className="border-cornerstone-orange/30"
                          {...detailsForm.register('width', { required: true })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="floors">
                          {language === 'fr' ? 'Nombre d\'étages' : 'Number of floors'}
                        </Label>
                        <Input
                          id="floors"
                          type="number"
                          min="1"
                          className="border-cornerstone-orange/30"
                          {...detailsForm.register('floors')}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label>
                      {language === 'fr' 
                        ? 'Confirmez-vous que la première rangée sera en briques pleines et les suivantes en briques creuses ?' 
                        : 'Do you confirm that the first row will be solid bricks and the following rows will be hollow bricks?'}
                    </Label>
                    <Controller
                      name="useStandardFormula"
                      control={detailsForm.control}
                      render={({ field }) => (
                        <RadioGroup 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="standard-yes" />
                            <Label htmlFor="standard-yes">{language === 'fr' ? 'Oui' : 'Yes'}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="standard-no" />
                            <Label htmlFor="standard-no">{language === 'fr' ? 'Non' : 'No'}</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="solidFormat">
                        {language === 'fr' ? 'Format briques pleines' : 'Solid brick format'}
                      </Label>
                      <Controller
                        name="solidFormat"
                        control={detailsForm.control}
                        render={({ field }) => (
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="border-cornerstone-orange/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">Format 10</SelectItem>
                              <SelectItem value="12">Format 12</SelectItem>
                              <SelectItem value="15">Format 15</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hollowFormat">
                        {language === 'fr' ? 'Format briques creuses' : 'Hollow brick format'}
                      </Label>
                      <Controller
                        name="hollowFormat"
                        control={detailsForm.control}
                        render={({ field }) => (
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="border-cornerstone-orange/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">Format 10</SelectItem>
                              <SelectItem value="12">Format 12</SelectItem>
                              <SelectItem value="15">Format 15</SelectItem>
                              <SelectItem value="20">Format 20</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      {language === 'fr' ? 'Retour' : 'Back'}
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 bg-cornerstone-orange hover:bg-cornerstone-orange/90"
                    >
                      {language === 'fr' ? 'Continuer' : 'Continue'} <ArrowDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={contactForm.handleSubmit(handleContactInfoSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {language === 'fr' ? 'Prénom' : 'First name'}
                      </Label>
                      <Input
                        id="firstName"
                        className="border-cornerstone-orange/30"
                        {...contactForm.register('firstName', { required: true })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {language === 'fr' ? 'Nom' : 'Last name'}
                      </Label>
                      <Input
                        id="lastName"
                        className="border-cornerstone-orange/30"
                        {...contactForm.register('lastName', { required: true })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {language === 'fr' ? 'Téléphone' : 'Phone'}
                      </Label>
                      <Input
                        id="phone"
                        className="border-cornerstone-orange/30"
                        {...contactForm.register('phone', { required: true })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">
                        {language === 'fr' ? 'Pays' : 'Country'}
                      </Label>
                      <Input
                        id="country"
                        className="border-cornerstone-orange/30"
                        {...contactForm.register('country', { required: true })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      {language === 'fr' ? 'Retour' : 'Back'}
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 bg-cornerstone-orange hover:bg-cornerstone-orange/90"
                    >
                      {language === 'fr' ? 'Calculer' : 'Calculate'}
                    </Button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <div className="bg-cornerstone-orange/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-cornerstone-orange mb-4">
                  {language === 'fr' ? 'Résultat de l\'estimation' : 'Estimation Result'}
                </h3>
                <div className="text-lg">
                  <p className="mb-4">
                    {language === 'fr' 
                      ? `Bonjour ${contactInfo.firstName} ${contactInfo.lastName} (${contactInfo.country}) !`
                      : `Hello ${contactInfo.firstName} ${contactInfo.lastName} (${contactInfo.country})!`
                    }
                  </p>
                  <p className="mb-4">
                    {language === 'fr' 
                      ? `Pour votre projet de ${getProjectTypeLabel().toLowerCase()}, nous estimons :`
                      : `For your ${getProjectTypeLabel().toLowerCase()} project, we estimate:`
                    }
                  </p>
                  <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>
                      {language === 'fr' 
                        ? `${calculationResults.solidBricks} briques pleines pour la première rangée`
                        : `${calculationResults.solidBricks} solid bricks for the first row`
                      }
                    </li>
                    <li>
                      {language === 'fr' 
                        ? `${calculationResults.hollowBricks} briques creuses pour les rangées suivantes`
                        : `${calculationResults.hollowBricks} hollow bricks for the following rows`
                      }
                    </li>
                    <li className="font-bold text-cornerstone-orange">
                      {language === 'fr' 
                        ? `Coût total estimé : ${calculationResults.totalCost.toLocaleString('fr-FR')} FCFA (incluant une marge de sécurité de 5%)`
                        : `Total estimated cost: ${calculationResults.totalCost.toLocaleString('en-US')} FCFA (including a 5% safety margin)`
                      }
                    </li>
                  </ul>
                  <p>
                    {language === 'fr' 
                      ? `Nous vous contacterons bientôt au ${contactInfo.phone} pour plus de détails.`
                      : `We will contact you soon at ${contactInfo.phone} for more details.`
                    }
                  </p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">
                  {language === 'fr' ? 'Convertisseur de devises' : 'Currency Converter'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">
                      {language === 'fr' ? 'Devise' : 'Currency'}
                    </Label>
                    <Select
                      value={selectedCurrency}
                      onValueChange={setSelectedCurrency}
                    >
                      <SelectTrigger className="border-cornerstone-orange/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="XOF">XOF (FCFA)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD ($)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                        <SelectItem value="DKK">DKK (kr)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-cornerstone-orange/10 p-4 rounded-md flex items-center justify-between">
                    <div>
                      <span className="block text-sm text-gray-600">
                        {language === 'fr' ? 'Montant équivalent' : 'Equivalent amount'}
                      </span>
                      <span className="block text-xl font-bold">
                        {selectedCurrency === 'XOF' 
                          ? `${calculationResults.totalCost.toLocaleString('fr-FR')} FCFA` 
                          : `${calculationResults.currencyConversions[selectedCurrency]} ${selectedCurrency}`
                        }
                      </span>
                    </div>
                    {selectedCurrency !== 'XOF' && (
                      <div className="text-sm text-gray-500">
                        1 FCFA = {CURRENCY_RATES[selectedCurrency]} {selectedCurrency}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={reset}
                className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90"
              >
                {language === 'fr' ? 'Nouvelle estimation' : 'New estimation'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BrickCalculator;
