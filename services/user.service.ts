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
