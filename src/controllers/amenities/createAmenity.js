import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();
  return prisma.amenity.create({
    data: {
      id: uuid(),
      name,
    },
  });
};

export default createAmenity;
