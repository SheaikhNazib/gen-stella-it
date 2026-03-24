import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = "admin";
  const password = "1234FaisalEktaChor";
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`Seeding user: ${username}...`);

  const user = await prisma.user.upsert({
    where: { username: username },
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      username: username,
      email: "admin@genstellait.site",
      name: "Gen Stella Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log({ user });
  console.log("Admin account seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
