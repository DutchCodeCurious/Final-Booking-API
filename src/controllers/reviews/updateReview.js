import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateReview = async (id, propertyId, userId, rating, comment) => {
  const prisma = new PrismaClient();

  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });
  if (!review) {
    throw new NotFoundError("review", id);
  }
  const updateReview = await prisma.review.update({
    where: {
      id,
    },
    data: {
      rating,
      comment,
    },
  });
  return updateReview;
};

export default updateReview;
