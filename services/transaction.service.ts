import prisma from "../prisma/prisma";

export const createTransactionService = async (data: {
  form_user_id: string;
  to_user_id: string;
  currency_id: number;
  amount: number;
  price: number;
  type: "deposit" | "withdrawal";
  order_id: string;
}) => {
  const result = await prisma.transactions.create({
    data,
  });

  return result;
};
