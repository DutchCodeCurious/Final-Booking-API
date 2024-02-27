import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const getBookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.findUnique({
    where: {
      id: id,
    },
  });
  if (!booking) {
    throw new notFoundError("Booking", id);
  }
  return booking;
};

export default getBookingById;
