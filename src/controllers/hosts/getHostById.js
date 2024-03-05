import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const getHostById = async (id) => {
  const prisma = new PrismaClient();

  if (!id) {
    throw new BadRequestError("id is required");
  }

  const host = await prisma.host.findUnique({
    where: {
      id,
    },
  });
  if (!host || host.count === 0) {
    throw new NotFoundError("host", id);
  }
  return host;
};

export default getHostById;
