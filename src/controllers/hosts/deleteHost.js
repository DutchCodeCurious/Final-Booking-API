import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

const deleteHost = async (id) => {
  const prisma = new PrismaClient();
  if (!id) {
    throw new BadRequestError("id is required");
  }

  const deleteHost = await prisma.host.deleteMany({
    where: {
      id,
    },
  });
  if (!deleteHost || deleteHost.count === 0) {
    throw new NotFoundError("host", id);
  }
  return id;
};

export default deleteHost;
