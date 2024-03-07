import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const getBookingById = async (id) => {
  const prisma = new PrismaClient();
  if (!id) {
    throw new BadRequestError("id is required");
  }
  const booking = await prisma.booking.findUnique({
    where: {
      id: id,
    },
  });
  if (!booking) {
    throw new NotFoundError("Booking", id);
  }
  return booking;
};

export default getBookingById;
