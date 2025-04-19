
import React from 'react';

const Flags = () => {
  const countries = [
    { code: 'us', name: 'USA' },
    { code: 'fr', name: 'France' },
    { code: 'tg', name: 'Togo' },
    { code: 'be', name: 'Belgium' },
    { code: 'gb', name: 'United Kingdom' }
  ];

  return (
    <div className="flex items-center gap-2 px-4">
      {countries.map((country) => (
        <img
          key={country.code}
          src={`https://flagcdn.com/${country.code}.svg`}
          alt={`${country.name} flag`}
          className="w-6 h-4 rounded-sm"
        />
      ))}
    </div>
  );
};

export default Flags;
