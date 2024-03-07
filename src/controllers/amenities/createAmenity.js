import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import BadRequestError from "../../errors/BadRequestError.js";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();

  if (!name) {
    throw new BadRequestError("name is required");
  }

  return prisma.amenity.create({
    data: {
      id: uuid(),
      name,
    },
  });
};

export default createAmenity;
