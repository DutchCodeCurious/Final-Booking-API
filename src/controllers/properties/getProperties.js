import { PrismaClient } from "@prisma/client";
import getAmenity from "../amenities/getAmenities.js";
import NotFoundError from "../../errors/NotFoundError.js";

const getProperties = async (
  title,
  pricePerNight,
  bedroomCount,
  maxGuestCount,
  rating,
  amenities
) => {
  const prisma = new PrismaClient();

  const filters = {};

  if (title) {
    filters.title = {
      contains: title,
    };
  }

  if (bedroomCount) {
    filters.bedroomCount = {
      gte: parseFloat(bedroomCount),
    };
  }

  if (maxGuestCount) {
    filters.maxGuestCount = {
      equals: parseFloat(maxGuestCount),
    };
  }

  if (rating) {
    filters.rating = {
      gte: parseFloat(rating),
    };
  }

  if (pricePerNight) {
    filters.pricePerNight = {
      equals: parseFloat(pricePerNight),
    };
  }

  if (amenities) {
    const amenity = await getAmenity(amenities);
    console.log(amenity + "Log test");
    filters.amenities = {
      some: {
        id: amenity.id,
      },
    };
  }

  const properties = await prisma.property.findMany({
    where: filters,
  });

  if (properties === null) {
    throw new NotFoundError("Properties not found");
  }

  return properties;
};

export default getProperties;
