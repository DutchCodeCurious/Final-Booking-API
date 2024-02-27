import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const updateBooking = async (
  id,
  propertyId,
  userId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.findUnique({
    where: {
      id: id,
    },
  });
  if (!booking || booking.count === 0) {
    throw new notFoundError("Booking", id);
  }
  return await prisma.booking.update({
    where: {
      id: id,
    },
    data: {
      propertyId,
      userId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
};

export default updateBooking;
