import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

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

  if (!id) {
    throw new BadRequestError("Booking ID is required");
  }

  // propertyId,
  // userId,

  // const fields = [
  //   checkinDate,
  //   checkoutDate,
  //   numberOfGuests,
  //   totalPrice,
  //   bookingStatus,
  // ];
  // console.log(fields);
  // if (fields.some(Boolean)) {
  //   throw new BadRequestError("At least one field is required");
  // }

  const booking = await prisma.booking.findUnique({
    where: {
      id: id,
    },
  });
  if (!booking || booking.count === 0) {
    throw new NotFoundError("Booking", id);
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
