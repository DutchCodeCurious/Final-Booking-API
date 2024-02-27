import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";

// For now no use for Bookings & reviews by creating a property

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathroomCount,
  maxGuestCount,
  rating,
  bookings,
  reviews,
  amenities,
  hostId
) => {
  const prisma = new PrismaClient();
  return prisma.property.create({
    data: {
      id: uuid(),
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathroomCount,
      maxGuestCount,
      rating,
      bookings,
      reviews,
      amenities: { connect: amenities.map((id) => ({ id })) },
      hostId,
    },
  });
};

export default createProperty;
