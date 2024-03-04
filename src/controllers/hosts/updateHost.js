import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const updateHost = async (id, hostData) => {
  const prisma = new PrismaClient();
  const {
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  } = hostData;
  const fields = [
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  ];
  if (fields.some(Boolean)) {
    throw new BadRequestError("At least one field is required");
  }
  const host = prisma.host.findUnique({
    where: {
      id,
    },
  });
  if (!host) {
    throw new NotFoundError("host", id);
  }
  return prisma.host.update({
    where: {
      id,
    },
    data: {
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

export default updateHost;
