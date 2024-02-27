import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getUserById = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  console.log(user);
  if (!user || user === null) {
    throw new NotFoundError("user", id);
  }
  return user;
};

export default getUserById;
