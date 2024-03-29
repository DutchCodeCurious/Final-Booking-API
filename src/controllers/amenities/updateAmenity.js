import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const updateAmenity = async (id, name) => {
  const prisma = new PrismaClient();

  if (!id || !name) {
    throw new BadRequestError("id and name are required");
  }

  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });

  if (!amenity || amenity.count === 0) {
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
