import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const getAmenity = async (id) => {
  const prisma = new PrismaClient();

  if (!id) {
    throw new BadRequestError("id is required");
  }

  const amenity = await prisma.amenity.findUnique({
    where: {
      id: id,
    },
  });
  if (!amenity || amenity.count === 0) {
    throw new NotFoundError("amenity", id);
  }
  return amenity;
};

export default getAmenity;
