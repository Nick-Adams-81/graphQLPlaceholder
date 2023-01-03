import { PersonSeeds } from "./PersonSeeds.mjs";
import { AddressSeeds } from "./AddressSeeds.mjs";
import { PostSeeds } from "./PostSeeds.mjs";
import { FriendsSeeds } from "./FriendsSeeds.mjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.person.createMany({
    data: PersonSeeds,
  });
  await prisma.address.createMany({
    data: AddressSeeds,
  });
  await prisma.post.createMany({
    data: PostSeeds,
  });
  await prisma.friends.createMany({
    data: FriendsSeeds,
  });
  // await prisma.personFriend.createMany({
  //   data: PersonFriendSeeds,
  // });
};

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
