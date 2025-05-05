
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface MaterialPrices {
  [key: string]: {
    [key: string]: number;
  };
}

// Material prices in FCFA
const MATERIAL_PRICES: MaterialPrices = {
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

// Constants for calculations
const BRICKS_PER_SQM = {
  'hollow': 50, // Standard hollow bricks per square meter
  'solid': 45,  // Standard solid bricks per square meter
  'hourdis': 6  // Hourdis per square meter (typically fewer since they're larger)
};

const MaterialCalculator: React.FC = () => {
  const { language } = useLanguage();
  const [surfaceArea, setSurfaceArea] = useState<number>(0);
  const [wallHeight, setWallHeight] = useState<number>(3); // Default height: 3 meters
  const [wallThickness, setWallThickness] = useState<number>(0.2); // Default thickness: 20cm or 0.2m
  const [activeMaterial, setActiveMaterial] = useState<'hollow' | 'solid' | 'hourdis'>('hollow');
  const [activeFormat, setActiveFormat] = useState<string>('12');
  const [calculations, setCalculations] = useState<any>(null);
  const [allCalculations, setAllCalculations] = useState<any>(null);

  const calculateMaterials = () => {
    if (surfaceArea <= 0) return;

    const results: any = {};
    const allResults: any = {};

    // Calculate for all materials and formats
    Object.keys(MATERIAL_PRICES).forEach((materialType) => {
      allResults[materialType] = {};
      
      Object.keys(MATERIAL_PRICES[materialType]).forEach((format) => {
        const adjustmentFactor = 1 + (Number(format) / 100); // Adjust quantity based on format size
        const quantity = Math.ceil(surfaceArea * BRICKS_PER_SQM[materialType as keyof typeof BRICKS_PER_SQM] * adjustmentFactor);
        const cost = quantity * MATERIAL_PRICES[materialType][format];
        
        allResults[materialType][format] = {
          quantity,
          cost,
          pricePerUnit: MATERIAL_PRICES[materialType][format],
        };
      });
    });

    // Calculate for selected material and format
    const adjustmentFactor = 1 + (Number(activeFormat) / 100);
    const quantity = Math.ceil(surfaceArea * BRICKS_PER_SQM[activeMaterial] * adjustmentFactor);
    const cost = quantity * MATERIAL_PRICES[activeMaterial][activeFormat];
    
    results.quantity = quantity;
    results.cost = cost;
    results.pricePerUnit = MATERIAL_PRICES[activeMaterial][activeFormat];
    results.type = activeMaterial;
    results.format = activeFormat;

    setCalculations(results);
    setAllCalculations(allResults);
  };

  useEffect(() => {
    if (surfaceArea > 0) {
      calculateMaterials();
    }
  }, [activeMaterial, activeFormat, surfaceArea, wallHeight, wallThickness]);

  const getMaterialName = (type: string) => {
    if (type === 'hollow') {
      return language === 'fr' ? 'Briques Creuses' : 'Hollow Bricks';
    } else if (type === 'solid') {
      return language === 'fr' ? 'Briques Pleines' : 'Solid Bricks';
    } else if (type === 'hourdis') {
      return language === 'fr' ? 'Hourdis' : 'Hourdis';
    }
    return type;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg border-cornerstone-orange/30">
        <CardHeader className="bg-gradient-to-r from-cornerstone-orange to-cornerstone-orange/80 text-white">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            <CardTitle className="text-xl md:text-2xl">
              {language === 'fr' ? 'Calculateur de Matériaux' : 'Materials Calculator'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="surface-area">
                  {language === 'fr' ? 'Surface (m²)' : 'Surface Area (sqm)'}
                </Label>
                <Input
                  id="surface-area"
                  type="number"
                  min="1"
                  placeholder={language === 'fr' ? 'Ex: 300' : 'Ex: 300'}
                  value={surfaceArea || ''}
                  onChange={(e) => setSurfaceArea(Number(e.target.value))}
                  className="border-cornerstone-orange/30 focus-visible:ring-cornerstone-orange/30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wall-height">
                  {language === 'fr' ? 'Hauteur du mur (m)' : 'Wall Height (m)'}
                </Label>
                <Input
                  id="wall-height"
                  type="number"
                  min="1"
                  step="0.1"
                  value={wallHeight}
                  onChange={(e) => setWallHeight(Number(e.target.value))}
                  className="border-cornerstone-orange/30 focus-visible:ring-cornerstone-orange/30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wall-thickness">
                  {language === 'fr' ? 'Épaisseur du mur (m)' : 'Wall Thickness (m)'}
                </Label>
                <Input
                  id="wall-thickness"
                  type="number"
                  min="0.1"
                  step="0.05"
                  value={wallThickness}
                  onChange={(e) => setWallThickness(Number(e.target.value))}
                  className="border-cornerstone-orange/30 focus-visible:ring-cornerstone-orange/30"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Tabs 
                defaultValue="hollow" 
                value={activeMaterial}
                onValueChange={(value) => setActiveMaterial(value as 'hollow' | 'solid' | 'hourdis')}
                className="w-full"
              >
                <Label>
                  {language === 'fr' ? 'Type de Matériau' : 'Material Type'}
                </Label>
                <TabsList className="grid grid-cols-3 w-full mt-2">
                  <TabsTrigger value="hollow">
                    {language === 'fr' ? 'Briques Creuses' : 'Hollow Bricks'}
                  </TabsTrigger>
                  <TabsTrigger value="solid">
                    {language === 'fr' ? 'Briques Pleines' : 'Solid Bricks'}
                  </TabsTrigger>
                  <TabsTrigger value="hourdis">Hourdis</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="format">
                  {language === 'fr' ? 'Format' : 'Format'}
                </Label>
                <Select
                  value={activeFormat}
                  onValueChange={setActiveFormat}
                >
                  <SelectTrigger className="border-cornerstone-orange/30">
                    <SelectValue placeholder={language === 'fr' ? 'Sélectionnez un format' : 'Select a format'} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(MATERIAL_PRICES[activeMaterial]).map((format) => (
                      <SelectItem key={format} value={format}>
                        {language === 'fr' ? `Format ${format}` : `Format ${format}`} - {formatPrice(MATERIAL_PRICES[activeMaterial][format])} FCFA
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateMaterials} 
                className="w-full mt-4 bg-cornerstone-orange hover:bg-cornerstone-orange/90"
              >
                {language === 'fr' ? 'Calculer' : 'Calculate'}
              </Button>
            </div>
          </div>

          {calculations && (
            <div className="mt-8 space-y-6">
              <div className="bg-cornerstone-orange/10 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-cornerstone-orange">
                  {language === 'fr' ? 'Résultat de l\'estimation' : 'Estimation Result'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow">
                    <h4 className="text-cornerstone-orange font-medium">
                      {language === 'fr' ? 'Type de matériau' : 'Material Type'}
                    </h4>
                    <p className="font-bold text-xl">{getMaterialName(calculations.type)} - Format {calculations.format}</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow">
                    <h4 className="text-cornerstone-orange font-medium">
                      {language === 'fr' ? 'Quantité nécessaire' : 'Required Quantity'}
                    </h4>
                    <p className="font-bold text-xl">{calculations.quantity.toLocaleString('fr-FR')} {language === 'fr' ? 'unités' : 'units'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow">
                    <h4 className="text-cornerstone-orange font-medium">
                      {language === 'fr' ? 'Prix unitaire' : 'Unit Price'}
                    </h4>
                    <p className="font-bold text-xl">{formatPrice(calculations.pricePerUnit)} FCFA</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow">
                    <h4 className="text-cornerstone-orange font-medium">
                      {language === 'fr' ? 'Coût total estimé' : 'Total Estimated Cost'}
                    </h4>
                    <p className="font-bold text-xl text-cornerstone-orange">{formatPrice(calculations.cost)} FCFA</p>
                  </div>
                </div>
              </div>

              {allCalculations && (
                <div className="overflow-x-auto">
                  <h3 className="font-bold text-lg mb-4">
                    {language === 'fr' ? 'Comparaison des options' : 'Options Comparison'}
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{language === 'fr' ? 'Matériau' : 'Material'}</TableHead>
                        <TableHead>{language === 'fr' ? 'Format' : 'Format'}</TableHead>
                        <TableHead className="text-right">{language === 'fr' ? 'Quantité' : 'Quantity'}</TableHead>
                        <TableHead className="text-right">{language === 'fr' ? 'Prix unitaire (FCFA)' : 'Unit Price (FCFA)'}</TableHead>
                        <TableHead className="text-right">{language === 'fr' ? 'Coût total (FCFA)' : 'Total Cost (FCFA)'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys(allCalculations).map((materialType) => (
                        Object.keys(allCalculations[materialType]).map((format) => (
                          <TableRow key={`${materialType}-${format}`} className={activeMaterial === materialType && activeFormat === format ? "bg-cornerstone-orange/10" : ""}>
                            <TableCell className="font-medium">{getMaterialName(materialType)}</TableCell>
                            <TableCell>Format {format}</TableCell>
                            <TableCell className="text-right">{formatPrice(allCalculations[materialType][format].quantity)}</TableCell>
                            <TableCell className="text-right">{formatPrice(allCalculations[materialType][format].pricePerUnit)}</TableCell>
                            <TableCell className="text-right font-bold">{formatPrice(allCalculations[materialType][format].cost)}</TableCell>
                          </TableRow>
                        ))
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialCalculator;
