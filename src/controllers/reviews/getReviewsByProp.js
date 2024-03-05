import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const getReviewsByProperty = async (propId) => {
  const prisma = new PrismaClient();

  if (!propId) {
    throw new BadRequestError("property id is required");
  }
  const reviews = await prisma.review.findMany({
    where: {
      propertyId: propId,
    },
  });
  if (!reviews || reviews.length === 0) {
    throw new NotFoundError("review", propId);
  }
  return reviews;
};

export default getReviewsByProperty;
