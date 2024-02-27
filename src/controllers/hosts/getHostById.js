import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getHostById = async (id) => {
  const prisma = new PrismaClient();
  const host = prisma.host.findUnique({
    where: {
      id,
    },
  });
  if (!host) {
    throw new NotFoundError("host", id);
  }
  return host;
};

export default getHostById;
