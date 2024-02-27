import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl,
  aboutMe
) => {
  const prisma = new PrismaClient();

  return prisma.host.create({
    data: {
      id: uuid(),
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

export default createHost;
