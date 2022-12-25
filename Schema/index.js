const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const PersonType = require("./TypeDefs/PersonType");
const personData = prisma.person.findMany({
  include: {
    address: true,
    posts: true,
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllPeople: {
      type: new GraphQLList(PersonType),
      args: { id: { type: GraphQLInt } },
      resolve: () => personData,
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
