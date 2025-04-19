
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const CurrencyConverter: React.FC = () => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('XOF');
  const [result, setResult] = useState<string | null>(null);

  // Simplified conversion rates (as of April 2023)
  const rates = {
    EUR: { XOF: 655.957, USD: 1.08, EUR: 1 },
    USD: { XOF: 607.37, EUR: 0.93, USD: 1 },
    XOF: { EUR: 0.00152, USD: 0.00165, XOF: 1 }
  };

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) {
      return;
    }

    const conversion = rates[fromCurrency as keyof typeof rates][toCurrency as keyof typeof rates[typeof fromCurrency]];
    const convertedAmount = (Number(amount) * conversion).toFixed(2);
    setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center font-playfair">{t('currencyConverter')}</h2>
          
          <div className="space-y-6">
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
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-gold"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="XOF">XOF (FCFA)</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">{t('to')}</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cornerstone-gold"
                >
                  <option value="XOF">XOF (FCFA)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleConvert}
              className="btn-primary w-full"
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
