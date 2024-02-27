import { PrismaClient } from "@prisma/client";

const getBookings = async (
  propertyId,
  userId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  const filters = {};

  if (propertyId) {
    filters.propertyId = {
      equals: propertyId,
    };
  }

  if (userId) {
    filters.userId = {
      equals: userId,
    };
  }

  if (checkinDate) {
    filters.checkinDate = {
      equals: new Date(checkinDate),
    };
  }

  if (checkoutDate) {
    filters.checkoutDate = {
      equals: new Date(checkoutDate),
    };
  }

  if (numberOfGuests) {
    filters.numberOfGuests = {
      equals: parseInt(numberOfGuests),
    };
  }

  if (totalPrice) {
    filters.totalPrice = {
      equals: parseInt(totalPrice),
    };
  }

  if (bookingStatus) {
    filters.bookingStatus = {
      equals: bookingStatus,
    };
  }

  const bookings = await prisma.booking.findMany({
    where: filters,
  });

  return bookings;
};

export default getBookings;
