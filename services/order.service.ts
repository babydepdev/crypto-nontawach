import prisma from "../prisma/prisma";

export const createOrderService = async (data: {
  user_id: string;
  currency_id: number;
  fiat_id: number;
  type: "buy" | "sell";
  amount: number;
  price: number;
  status: "pending" | "processing" | "completed" | "cancelled";
}) => {
  const result = await prisma.orders.create({
    data: data,
  });
  return result;
};

export const listAllOrderTypeService = async (
  user_id: string,
  type: "buy" | "sell"
) => {
  const result = await prisma.orders.findMany({
    where: {
      user_id,
      type,
      status: "pending",
    },
    include: {
      User: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      Currency: {
        select: {
          id: true,
          name: true,
          abbreviation: true,
        },
      },
      FiatCurrency: {
        select: {
          id: true,
          name: true,
          abbreviation: true,
        },
      },
    },
  });

  return result;
};
