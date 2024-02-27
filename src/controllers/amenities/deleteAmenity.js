import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const delteAmenity = async (id) => {
  const prisma = new PrismaClient();

  const deleteAmenity = await prisma.amenity.deleteMany({
    where: {
      id,
    },
  });
  if (!deleteAmenity || deleteAmenity.count === 0) {
    throw new NotFoundError("amenity", id);
  }
  return id;
};

export default delteAmenity;
