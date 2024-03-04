import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const deleteProperty = async (id) => {
  const prisma = new PrismaClient();

  if (!id) {
    throw new BadRequestError("id is required");
  }

  const deleteProperty = await prisma.property.deleteMany({
    where: {
      id: id,
    },
  });
  if (!deleteProperty || deleteProperty.count === 0) {
    throw new NotFoundError("property", id);
  }
  return id;
};

export default deleteProperty;
