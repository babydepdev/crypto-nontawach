interface Currency {
  name: string;
  abbreviation: string;
}

export const currencies: Currency[] = [
  { name: "Bitcoin", abbreviation: "BTC" },
  { name: "Ethereum", abbreviation: "ETH" },
  { name: "Litecoin", abbreviation: "LTC" },
  { name: "Ripple", abbreviation: "XRP" },
  { name: "Binance Coin", abbreviation: "BNB" },
  { name: "Cardano", abbreviation: "ADA" },
  { name: "Dogecoin", abbreviation: "DOGE" },
];
