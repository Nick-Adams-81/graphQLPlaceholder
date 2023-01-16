const router = require("express").Router();
const prisma = require("./client");

router.get("/friends", async (req, res, next) => {
  try {
    const data = await prisma.friends.findMany({});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/newFriends", async (req, res, next) => {
  try {
    const data = req.body;
    const friend = await prisma.friends.create({
      data: data,
    });
    res.json(friend);
  } catch (err) {
    next(err);
  }
});

router.patch("/updateFriends/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const friend = await prisma.friends.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(friend);
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteFriend/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteFriend = await prisma.friends.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteFriend);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
