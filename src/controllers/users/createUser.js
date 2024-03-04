import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import getUserByUsername from "./getUserByUsername.js";
import BadRequestError from "../../errors/BadRequestError.js";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  const fields = [username, password, name, email, phoneNumber, profilePicture];
  if (!fields.every(Boolean)) {
    throw new BadRequestError("All fields are required!");
  }

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
      profilePicture,
    },
  });
};

export default createUser;
