
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Define the currency type for better type safety
type CurrencyCode = 'EUR' | 'USD' | 'XOF' | 'GBP' | 'CAD' | 'JPY' | 'DKK';

// Define the rates structure type
type RatesType = {
  [key in CurrencyCode]: {
    [key in CurrencyCode]: number;
  };
};

const CurrencyConverter: React.FC = () => {
  const { t, language } = useLanguage();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('EUR');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('XOF');
  const [result, setResult] = useState<string | null>(null);

  // Updated conversion rates (as of May 2024)
  const rates: RatesType = {
    EUR: { 
      XOF: 655.957, 
      USD: 1.08, 
      EUR: 1,
      GBP: 0.85,
      CAD: 1.46,
      JPY: 167.39,
      DKK: 7.46
    },
    USD: { 
      XOF: 607.37, 
      EUR: 0.93, 
      USD: 1,
      GBP: 0.79,
      CAD: 1.36,
      JPY: 155.18,
      DKK: 6.91
    },
    XOF: { 
      EUR: 0.00152, 
      USD: 0.00165, 
      XOF: 1,
      GBP: 0.00131,
      CAD: 0.00223,
      JPY: 0.25,
      DKK: 0.0113
    },
    GBP: {
      XOF: 766.12,
      EUR: 1.17,
      USD: 1.27,
      GBP: 1,
      CAD: 1.71,
      JPY: 195.64,
      DKK: 8.72
    },
    CAD: {
      XOF: 448.44,
      EUR: 0.68,
      USD: 0.74,
      GBP: 0.58,
      CAD: 1,
      JPY: 114.51,
      DKK: 5.11
    },
    JPY: {
      XOF: 3.92,
      EUR: 0.006,
      USD: 0.0064,
      GBP: 0.0051,
      CAD: 0.0087,
      JPY: 1,
      DKK: 0.045
    },
    DKK: {
      XOF: 87.93,
      EUR: 0.134,
      USD: 0.145,
      GBP: 0.115,
      CAD: 0.196,
      JPY: 22.44,
      DKK: 1
    }
  };

  // Currency display names based on language
  const getCurrencyName = (code: CurrencyCode) => {
    const names: {[key: string]: {[key in CurrencyCode]: string}} = {
      fr: {
        XOF: 'XOF (FCFA)',
        EUR: 'EUR (€)',
        USD: 'USD ($)',
        GBP: 'GBP (£)',
        CAD: 'CAD ($)',
        JPY: 'JPY (¥)',
        DKK: 'DKK (kr)'
      },
      en: {
        XOF: 'XOF (FCFA)',
        EUR: 'EUR (€)',
        USD: 'USD ($)',
        GBP: 'GBP (£)',
        CAD: 'CAD ($)',
        JPY: 'JPY (¥)',
        DKK: 'DKK (kr)'
      },
      ee: {
        XOF: 'XOF (FCFA)',
        EUR: 'EUR (€)',
        USD: 'USD ($)',
        GBP: 'GBP (£)',
        CAD: 'CAD ($)',
        JPY: 'JPY (¥)',
        DKK: 'DKK (kr)'
      }
    };
    
    return names[language] ? names[language][code] : code;
  };

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) {
      return;
    }

    const conversion = rates[fromCurrency][toCurrency];
    const convertedAmount = (Number(amount) * conversion).toFixed(2);
    
    if (language === 'fr') {
      setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    } else if (language === 'en') {
      setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    } else if (language === 'ee') {
      setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center font-playfair">{t('currencyConverter')}</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">{t('amount')}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-gold"
                placeholder="0.00"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">{t('from')}</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value as CurrencyCode)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-gold"
                >
                  <option value="XOF">{getCurrencyName('XOF')}</option>
                  <option value="EUR">{getCurrencyName('EUR')}</option>
                  <option value="USD">{getCurrencyName('USD')}</option>
                  <option value="GBP">{getCurrencyName('GBP')}</option>
                  <option value="CAD">{getCurrencyName('CAD')}</option>
                  <option value="JPY">{getCurrencyName('JPY')}</option>
                  <option value="DKK">{getCurrencyName('DKK')}</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">{t('to')}</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value as CurrencyCode)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-gold"
                >
                  <option value="XOF">{getCurrencyName('XOF')}</option>
                  <option value="EUR">{getCurrencyName('EUR')}</option>
                  <option value="USD">{getCurrencyName('USD')}</option>
                  <option value="GBP">{getCurrencyName('GBP')}</option>
                  <option value="CAD">{getCurrencyName('CAD')}</option>
                  <option value="JPY">{getCurrencyName('JPY')}</option>
                  <option value="DKK">{getCurrencyName('DKK')}</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleConvert}
              className="btn-primary w-full"
              aria-label={t('convert')}
            >
              {t('convert')}
            </button>
            
            {result && (
              <div className="mt-6 p-4 border border-cornerstone-gold rounded-md bg-cornerstone-gold/10 text-center">
                <p className="text-lg font-medium">{t('result')}: <span className="font-bold">{result}</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrencyConverter;
