const router = require("express").Router();
const prisma = require("./client");

router.get("/personToFriends", async (req, res, next) => {
  try {
    const data = await prisma.personToFriends.findMany({});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/newPersonToFriend", async (req, res, next) => {
  try {
    const data = req.body;
    const personConnection = await prisma.personToFriends.create({
      data: data,
    });
    res.json(personConnection);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
