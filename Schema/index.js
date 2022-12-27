const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const axios = require("axios");
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
      resolve:(__parent, __args) => {
        return axios
          .get(`http://localhost:5000/api/person`)
          .then((res) => res.data);
      },
    },
    getOnePerson: {
      type: PersonType,
      args: { id: { type: GraphQLInt } },
      resolve:(__parent, args) => {
        return axios
          .get(`http://localhost:5000/api/person/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
