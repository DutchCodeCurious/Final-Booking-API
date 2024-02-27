import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteUser = async (id) => {
  const prisma = new PrismaClient();

  const deleteUser = await prisma.user.deleteMany({
    where: {
      id: id,
    },
  });
  if (!deleteUser || deleteUser.count === 0) {
    throw new NotFoundError("user", id);
  }
  return id;
};

export default deleteUser;
