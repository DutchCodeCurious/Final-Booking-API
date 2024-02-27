import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getPropertyById = async (id) => {
  const prisma = new PrismaClient();

  const property = prisma.property.findUnique({
    where: {
      id: id,
    },
  });
  if (!property) {
    throw new NotFoundError("property", id);
  }
  return property;
};

export default getPropertyById;
