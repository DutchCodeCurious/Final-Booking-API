import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getHosts = async (username, name, email, phoneNumber) => {
  const prisma = new PrismaClient();
  const filters = {};

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

  const hosts = prisma.host.findMany({
    where: filters,
  });
  if (hosts === null) {
    throw new NotFoundError("Hosts not found");
  }

  return hosts;
};

export default getHosts;
