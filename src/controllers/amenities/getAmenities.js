import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getAmenity = async (name) => {
  const prisma = new PrismaClient();

  if (name) {
    const amenity = await prisma.amenity.findFirst({
      where: {
        name: name,
      },
    });
    if (amenity === null) {
      throw new NotFoundError(`Amenity with ${name} not found`);
    }
    return amenity;
  } else {
    const amenities = await prisma.amenity.findMany();
    if (amenities === null) {
      throw new NotFoundError("Amenities not found");
    }
    return amenities;
  }
};

export default getAmenity;
