import prisma from "../prisma/prisma";

type WalletType = "spot" | "margin" | "futures" | "p2p" | "earn";

export const createWalletService = async (data: { user_id: string }) => {
  const wallets: WalletType[] = ["spot", "margin", "futures", "p2p", "earn"];

  const walletPromises = wallets.map((wallet) => {
    return prisma.walletsAccount.create({
      data: {
        user_id: data.user_id,
        type: wallet,
      },
    });
  });

  const results = await Promise.all(walletPromises);

  return results;
};

export const createWalletAssetService = async (data: {
  walletAccount_id: string;
  currency_id: number;
  balance: number;
  locked: number;
}) => {
  const result = await prisma.walletsAsset.create({
    data,
  });

  return result;
};
