import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import NotFoundError from "../../errors/NotFoundError.js";

const createReview = async (propertyId, userId, rating, comment) => {
  const prisma = new PrismaClient();

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new NotFoundError("property", propertyId);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new NotFoundError("user", userId);
  }

  const review = await prisma.review.create({
    data: {
      id: uuid(),
      propertyId,
      userId,
      rating,
      comment,
    },
  });

  return review;
};

export default createReview;
