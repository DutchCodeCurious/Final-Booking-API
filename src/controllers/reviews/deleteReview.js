import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";
const deleteReview = async (id) => {
  const prisma = new PrismaClient();
  if (!id) {
    throw new BadRequestError("id is required");
  }

  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });
  if (!review) {
    throw new NotFoundError("review", id);
  }
  const deletedReview = await prisma.review.deleteMany({
    where: {
      id,
    },
  });
  return id;
};

export default deleteReview;
