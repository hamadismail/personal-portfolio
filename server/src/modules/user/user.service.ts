import { prisma } from "../../config/db";
import { Prisma, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const hashedPassword = await bcrypt.hash(
    payload.password as string,
    Number(process.env.BCRYPT_SALT)
  );
  const createdUser = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });
  return createdUser;
};

export const UserService = {
  createUser,
};
