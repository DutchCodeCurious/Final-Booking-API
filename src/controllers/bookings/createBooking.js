import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import notFoundError from "../../errors/notFoundError.js";

const createBooking = async (
  propertyId,
  userId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });
  if (!property) {
    throw new notFoundError("Property", propertyId);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new notFoundError("User", userId);
  }

  return await prisma.booking.create({
    data: {
      id: uuid(),
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

export default createBooking;
