import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const updateProperty = async (id, propertyData) => {
  const prisma = new PrismaClient();

  const {
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
  } = propertyData;

  const fields = [
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
  ];
  if (fields.some(Boolean)) {
    throw new BadRequestError("At least one field is required");
  }

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

  // Check
  if (!updatedProperty) {
    throw new NotFoundError(`property`, id);
  }

  return updatedProperty;
};

export default updateProperty;
