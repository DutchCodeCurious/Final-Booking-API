import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import getUserByUsername from "./getUserByUsername.js";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl
) => {
  const prisma = new PrismaClient();

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return {
      message: `User with username ${username} already exists!`,
    };
  }

  return prisma.user.create({
    data: {
      id: uuid(),
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    },
  });
};

export default createUser;
