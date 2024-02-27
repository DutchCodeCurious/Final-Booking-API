import { PrismaClient } from "@prisma/client";

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

  return hosts;
};

export default getHosts;

{
  /**
   * "username": "host1",
    "name": "Host Two",
    "email": "host2@example.com",
    "phoneNumber": "1234567891",
*/
}
