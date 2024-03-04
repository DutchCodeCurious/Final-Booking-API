import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const getReviewById = async (id) => {
  const prisma = new PrismaClient();

  if (!id) {
    throw new BadRequestError("id is required");
  }
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
