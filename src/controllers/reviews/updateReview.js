import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const updateReview = async (id, rating, comment) => {
  const prisma = new PrismaClient();

  if (!id) {
    throw new BadRequestError("Review ID is required");
  }

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
