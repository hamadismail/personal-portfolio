import { prisma } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

const loginWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!isPasswordCorrect) {
    throw new Error("Password is incorrect!");
  }

  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRE) {
    throw new Error("JWT_SECRET or JWT_EXPIRE is not defined");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    } as SignOptions
  );

  const { password: _password, ...rest } = user;
  return { user: rest, token };
};

export const AuthService = {
  loginWithEmailAndPassword,
};
