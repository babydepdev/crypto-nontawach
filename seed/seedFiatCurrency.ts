interface FiatCurrency {
  name: string;
  abbreviation: string;
}

export const fiatCurrencies: FiatCurrency[] = [
  { name: "US Dollar", abbreviation: "USD" },
  { name: "Euro", abbreviation: "EUR" },
  { name: "British Pound", abbreviation: "GBP" },
  { name: "Japanese Yen", abbreviation: "JPY" },
  { name: "Canadian Dollar", abbreviation: "CAD" },
  { name: "Australian Dollar", abbreviation: "AUD" },
  { name: "Swiss Franc", abbreviation: "CHF" },
  { name: "Singapore Dollar", abbreviation: "SGD" },
  { name: "New Zealand Dollar", abbreviation: "NZD" },
  { name: "Thai Baht", abbreviation: "THB" },
];
