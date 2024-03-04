import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const updateReview = async (id, propertyId, userId, rating, comment) => {
  const prisma = new PrismaClient();

  // const fields = [rating, comment];

  // console.log(fields);

  // if (fields.some(Boolean)) {
  //   throw new BadRequestError(
  //     "At least one of the following fields is required: rating, comment"
  //   );
  // }

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
