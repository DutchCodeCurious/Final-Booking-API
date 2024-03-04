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

  const fields = [
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  ];

  if (!fields.every(Boolean)) {
    throw new BadRequestError("All fields are required");
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
