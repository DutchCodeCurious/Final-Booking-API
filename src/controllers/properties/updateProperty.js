import { PrismaClient } from "@prisma/client";

const updateProperty = async (
  id,
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
  return prisma.property.update({
    where: {
      id: id,
    },
    data: {
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
      hostId,
    },
  });
};

export default updateProperty;
