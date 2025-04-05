import prisma from "../prisma/prisma";

export const getUserByEmailService = async (email: string) => {
  const result = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  return result;
};

export const createUserService = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const result = await prisma.users.create({
    data: data,
  });

  return result;
};

export const readAssetUserService = async (data: {
  user_id: string;
  type: "spot" | "margin" | "futures" | "p2p" | "earn";
  currency_id: number;
}) => {
  const result = await prisma.users.findFirst({
    where: {
      id: data.user_id,
    },
    include: {
      WalletsAccount: {
        where: {
          type: data.type,
        },
        include: {
          WalletsAsset: {
            where: {
              currency_id: data.currency_id,
            },
            include: {
              Currency: true,
            },
          },
        },
      },
    },
  });

  return result;
};
