import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const getPropertyById = async (id) => {
  const prisma = new PrismaClient();

  if (!id) {
    throw new BadRequestError("id is required");
  }

  const property = await prisma.property.findUnique({
    where: {
      id: id,
    },
  });
  if (!property || property.count === 0) {
    throw new NotFoundError("property", id);
  }
  return property;
};

export default getPropertyById;
