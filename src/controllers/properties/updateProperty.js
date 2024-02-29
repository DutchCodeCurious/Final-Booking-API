import { PrismaClient } from "@prisma/client";

const updateProperty = async (
  id,
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

  const property = await prisma.property.findUnique({
    where: {
      id: id,
    },
  });

  if (!property) {
    throw new NotFoundError(`property`, id);
  }

  const updatedProperty = prisma.property.update({
    where: {
      id: id,
    },
    data: {
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
      hostId,
    },
  });
  return updatedProperty;
};

export default updateProperty;
