import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getReviewById = async (id) => {
  const prisma = new PrismaClient();
  const review = prisma.review.findUnique({
    where: {
      id: id,
    },
  });
  if (!review || review.count === 0) {
    throw new NotFoundError("review", id);
  }
  return review;
};

export default getReviewById;
