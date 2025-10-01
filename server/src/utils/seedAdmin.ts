import bcryptjs from "bcryptjs";
import { prisma } from "../config/db";

export const seedSuperAdmin = async () => {
  try {
    const isAdminExist = await prisma.user.findUnique({
      where: { email: "admin@gmail.com" },
    });

    if (isAdminExist) {
      console.log("Super Admin Already Exists!");
      return;
    }

    console.log("Trying to create Super Admin...");

    const hashedPassword = await bcryptjs.hash(
      "admin@password",
      Number(process.env.BCRYPT_SALT)
    );

    const payload = {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
    };

    await prisma.user.create({
      data: payload,
    });

    console.log("Super Admin Created Successfuly! \n");
  } catch (error) {
    console.log(error);
  }
};
