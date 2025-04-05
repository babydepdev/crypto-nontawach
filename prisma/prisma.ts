import { PrismaClient } from "@prisma/client";
import { currencies } from "../seed/seedCreateCurrency";
import { fiatCurrencies } from "../seed/seedFiatCurrency";

const prisma = new PrismaClient();

export default prisma;

const createCurrencyIfNeeded = async () => {
  for (const currency of currencies) {
    const existingCurrency = await prisma.currency.findFirst({
      where: { abbreviation: currency.abbreviation },
    });

    if (!existingCurrency) {
      await prisma.currency.create({
        data: currency,
      });
    }
  }
};

const createFiatCurrencyIfNeeded = async () => {
  for (const fiatCurrency of fiatCurrencies) {
    const existingFiatCurrency = await prisma.fiatCurrency.findFirst({
      where: { abbreviation: fiatCurrency.abbreviation },
    });

    if (!existingFiatCurrency) {
      await prisma.fiatCurrency.create({
        data: fiatCurrency,
      });
    }
  }
};

const initializeApp = async () => {
  await createCurrencyIfNeeded();
  await createFiatCurrencyIfNeeded();
};

initializeApp();
