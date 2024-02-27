import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteBooking = async (id) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.deleteMany({
    where: {
      id: id,
    },
  });
  if (!booking || booking.count === 0) {
    throw new notFoundError("Booking", id);
  }
  return id;
};

export default deleteBooking;
