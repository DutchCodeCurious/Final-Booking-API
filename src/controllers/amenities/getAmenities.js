import { PrismaClient } from "@prisma/client";

const getAmenity = async (name) => {
  const prisma = new PrismaClient();

  if (name) {
    const amenity = await prisma.amenity.findFirst({
      where: {
        name: name,
      },
    });

    return amenity;
  } else {
    const amenities = await prisma.amenity.findMany();
    return amenities;
  }
};

export default getAmenity;
