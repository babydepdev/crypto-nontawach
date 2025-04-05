import prisma from "../prisma/prisma";

export const createCurrencyService = async (data: {
  name: string;
  abbreviation: string;
}) => {
  const result = await prisma.currency.create({
    data: data,
  });

  return result;
};
