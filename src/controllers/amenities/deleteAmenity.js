import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const deleteAmenity = async (id) => {
  const prisma = new PrismaClient();

  if (!id) {
    throw new BadRequestError("id is required");
  }

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

export default deleteAmenity;
