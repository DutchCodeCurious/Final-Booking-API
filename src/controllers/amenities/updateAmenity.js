import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateAmenity = async (id, name) => {
  const prisma = new PrismaClient();
  const amenity = prisma.amenity.findUnique({
    where: {
      id,
    },
  });
  if (!amenity) {
    throw new NotFoundError("amenity", id);
  }
  return prisma.amenity.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
};

export default updateAmenity;
