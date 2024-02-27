import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getAmenity = async (id) => {
  const prisma = new PrismaClient();

  const amenity = prisma.amenity.findUnique({
    where: {
      id: id,
    },
  });
  if (!amenity) {
    throw new NotFoundError("amenity", id);
  }
  return amenity;
};

export default getAmenity;
