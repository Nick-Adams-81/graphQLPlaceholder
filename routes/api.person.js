const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/person", async (req, res, next) => {
  try {
    const person = await prisma.person.findMany({
      include: {
        address: true,
        posts: true,
        friends: {
          include: {
            friends: { include: { people: true } },
          },
        },
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
        friends: { include: { friends: { include: { people: true } } } },
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

router.get("/onePerson/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const person = await prisma.person.findMany({
      where: {
        name: String(name),
      },
      include: {
        address: true,
        posts: true,
        friends: { include: { friends: { include: { people: true } } } },
      },
    });
    res.json(person);
  } catch (err) {
    next(err);
  }
});

router.get("/limitPeople/:limit", async (req, res, next) => {
  try {
    const { limit } = req.params;
    const person = await prisma.person.findMany({
      skip: 0,
      take: Number(limit),
      include: {
        address: true,
        posts: true,
        friends: { include: { friends: { include: { people: true } } } },
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
    res.status(200).send({ message: "Person created!" });
  } catch (err) {
    next(err);
    res.status(400).send({ message: "Something went wrong!" });
  }
});

router.patch("/updatePerson/:id", async (req, res, next) => {
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

router.delete("/deletePerson/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedePrson = await prisma.person.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deletedePrson);
    res.status(200).send({ message: "person deleted" });
  } catch (err) {
    next(err);
    res.status(400).send({ message: "Something went wrong..." });
  }
});

module.exports = router;
