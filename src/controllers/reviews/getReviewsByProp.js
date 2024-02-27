import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getReviewsByProperty = async (propId) => {
  const prisma = new PrismaClient();
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
