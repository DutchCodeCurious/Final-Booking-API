import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

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

  const fields = {
    propertyId,
    userId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
  };

  const missingFields = Object.keys(fields).filter((key) => !fields[key]);

  if (missingFields.length > 0) {
    throw new BadRequestError(
      `The following fields are required: ${missingFields.join(", ")}`
    );
  }
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });
  if (!property) {
    throw new NotFoundError("Property", propertyId);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new NotFoundError("User", userId);
  }

  return prisma.booking.create({
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
