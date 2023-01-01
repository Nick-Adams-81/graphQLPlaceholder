const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/person", async (req, res, next) => {
  try {
    const person = await prisma.person.findMany({
      include: {
        address: true,
        posts: true,
      },
    });
    res.json(person);
  } catch (err) {
    next(err);
  }
});

router.get("/person/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const person = await prisma.person.findUnique({
      include: {
        address: true,
        posts: true,
      },
      where: {
        id: Number(id),
      },
    });
    res.json(person);
  } catch (err) {
    next(err);
  }
});

router.get("/onePerson/:first_name", async (req, res, next) => {
  try {
    const { first_name } = req.params;
    const person = await prisma.person.findMany({
      where: {
        first_name: String(first_name),
      },
      include: {
        address: true,
        posts: true,
      },
    });
    res.json(person);
  } catch (err) {
    next(err);
  }
});

router.post("/newPerson", async (req, res, next) => {
  try {
    const data = req.body;
    const person = await prisma.person.create({
      data: data,
    });
    res.json(person);
  } catch (err) {
    next(err);
  }
});

router.patch("updatePerson/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const person = await prisma.person.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(person);
  } catch (err) {
    next(err);
  }
});

router.delete("deletePerson/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedePrson = await prisma.person.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedePrson);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
