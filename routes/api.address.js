const router = require("express").Router();
const prisma = require("../client");

router.get("/getAddress", async (_req, res, next) => {
  try {
    const address = await prisma.address.findMany({});
    res.json(address);
  } catch (err) {
    next(err);
  }
});

router.post("/newAddress", async (req, res, next) => {
  try {
    const data = req.body;
    const newAddress = await prisma.address.create({
      data: data,
    });
    res.json(newAddress);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
