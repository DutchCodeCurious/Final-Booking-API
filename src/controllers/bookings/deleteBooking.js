import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const deleteBooking = async (id) => {
  const prisma = new PrismaClient();

  if (!id) {
    throw new BadRequestError("id is required");
  }

  const booking = await prisma.booking.deleteMany({
    where: {
      id: id,
    },
  });
  if (!booking || booking.count === 0) {
    throw new NotFoundError("Booking", id);
  }
  return id;
};

export default deleteBooking;
