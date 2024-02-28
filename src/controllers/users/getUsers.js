import { PrismaClient } from "@prisma/client";

const getUsers = async (username, name, email, phoneNumber, id) => {
  const prisma = new PrismaClient();
  const filters = {};

  if (id) {
    filters.id = {
      equals: id,
    };
  }

  if (username) {
    filters.username = {
      contains: username,
    };
  }

  if (name) {
    filters.name = {
      contains: name,
    };
  }

  if (email) {
    filters.email = {
      contains: email,
    };
  }

  if (phoneNumber) {
    filters.phoneNumber = {
      contains: phoneNumber,
    };
  }

  const users = prisma.user.findMany({
    where: filters,
  });

  return users;
};

export default getUsers;
