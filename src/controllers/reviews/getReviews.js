import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getReviews = async () => {
  const prisma = new PrismaClient();
  const reviews = prisma.review.findMany();
  if (reviews === null) {
    throw new NotFoundError("Reviews not found");
  }
  return reviews;
};

export default getReviews;
