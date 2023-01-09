const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/friends", async (req, res, next) => {
  try {
    const data = await prisma.friends.findMany({});
    res.json(data);
  } catch (err) {
    return err;
  }
});

router.post("/newFriends", async (req, res, next) => {
  try {
    const data = req.params;
    const friend = await prisma.friends.create({
      data: data,
    });
    res.json(friend);
  } catch (err) {
    return err;
  }
});

module.exports = router;
