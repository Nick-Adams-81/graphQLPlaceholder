const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/personToFriends", async (req, res, next) => {
  try {
    const data = await prisma.personToFriends.findMany({});
    res.json(data);
  } catch (err) {
    return err;
  }
});

module.exports = router;
