const router = require("express").Router();
const prisma = require("./client");

router.get("/post", async (req, res, next) => {
  try {
    const data = await prisma.post.findMany({});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/newPost", async (req, res, next) => {
  try {
    const data = req.body;
    const post = await prisma.post.create({
      data: data,
    });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
