import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";
const prisma = new PrismaClient();

const upadateUser = async (id, userData) => {
  if (!id) {
    throw new BadRequestError("id is required");
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new NotFoundError(`user`, id);
  }
  const { username, password, name, email, phoneNumber, profilePicture } =
    userData;
  const fields = [username, password, name, email, phoneNumber, profilePicture];
  if (fields.some(Boolean)) {
    throw new BadRequestError("At least one field is required to update user!");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
  if (!updatedUser || updatedUser.count === 0) {
    throw new NotFoundError(`user`, id);
  }
  return {
    message: `User with id ${id} has been updated successfully!`,
  };
};

export default upadateUser;
