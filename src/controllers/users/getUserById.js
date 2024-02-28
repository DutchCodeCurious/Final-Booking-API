import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getUserById = async (id) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user || user === null || user === undefined) {
    throw new NotFoundError("User", id);
  }

  return user;
};

export default getUserById;
