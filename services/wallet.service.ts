import prisma from "../prisma/prisma";

export const createWalletService = async (data: {
  user_id: string;
  currency_id: number;
  balance: number;
}) => {
  const wallets = ["spot", "margin", "futures", "p2p", "earn"];
  const result = await prisma.wallets.findMany({
    where: {
      user_id: data.user_id,
      currency_id: data.currency_id,
    },
  });

  if (result.length > 0) {
    return result[0];
  }

  return await prisma.wallets.create({
    data: data,
  });
};
