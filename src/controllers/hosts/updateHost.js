import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateHost = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
  aboutMe
) => {
  const prisma = new PrismaClient();
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
      pictureUrl,
      aboutMe,
    },
  });
};

export default updateHost;
