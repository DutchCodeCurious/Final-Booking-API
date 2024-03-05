import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../errors/BadRequestError.js";
import NotFoundError from "../../errors/NotFoundError.js";

// For now no use for Bookings & reviews by creating a property

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
  bookings,
  reviews,
  amenities,
  hostId
) => {
  const prisma = new PrismaClient();

  const fields = {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    rating,
    hostId,
  };

  const missingFields = Object.keys(fields).filter((key) => !fields[key]);

  if (missingFields.length > 0) {
    throw new BadRequestError(
      `The following fields are required: ${missingFields.join(", ")}`
    );
  }
  const host = await prisma.host.findUnique({
    where: {
      id: hostId,
    },
  });
  if (!host) {
    throw new NotFoundError("Host", hostId);
  }
  return prisma.property.create({
    data: {
      id: uuid(),
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      bookings,
      reviews,
      amenities:
        amenities && amenities.length > 0
          ? { connect: amenities.map((id) => ({ id })) }
          : undefined,
      hostId,
    },
  });
};

export default createProperty;
