import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import BadRequestError from "../../errors/BadRequestError.js";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  const fields = {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  };

  const missingFields = Object.keys(fields).filter((key) => !fields[key]);

  if (missingFields.length > 0) {
    throw new BadRequestError(
      `The following fields are required: ${missingFields.join(", ")}`
    );
  }

  return prisma.host.create({
    data: {
      id: uuid(),
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
};

export default createHost;
