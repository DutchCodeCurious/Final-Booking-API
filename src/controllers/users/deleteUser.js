import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const deleteUser = async (id) => {
  const prisma = new PrismaClient();

  if (!id) {
    throw new BadRequestError("id is required");
  }

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
