import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getUserByUsername = async (username) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    return null;
  }
  return user;
};

export default getUserByUsername;
