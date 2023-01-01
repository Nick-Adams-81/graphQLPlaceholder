const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schema/index");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/", require("./routes/api.person"));
app.use("/", require("./routes/api.address"));
app.use("/", require("./routes/api.posts"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
