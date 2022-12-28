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
const AddressType = require("./TypeDefs/AddressType");
const PostType = require("./TypeDefs/PostType");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllPeople: {
      type: new GraphQLList(PersonType),
      args: { id: { type: GraphQLInt } },
      description: "Query to get all people in the database",
      resolve: (__parent, __args) => {
        return axios
          .get(`http://localhost:5000/api/person`)
          .then((res) => res.data);
      },
    },
    getOnePerson: {
      type: PersonType,
      args: { id: { type: GraphQLInt } },
      description: "Query to get single person in the database by id",
      resolve: (__parent, args) => {
        return axios
          .get(`http://localhost:5000/api/person/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Create new person mutation, this mutation does not create a new address or post",
  fields: {
    createPerson: {
      type: PersonType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: (__parent, args) => {
        return axios
          .post("http://localhost:5000/newPerson", {
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
          })
          .then((res) => res.data);
      },
    },
    createAddress: {
      type: AddressType,
      args: {
        street_number: { type: GraphQLString },
        street_name: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip_code: { type: GraphQLString },
        personId: { type: GraphQLInt }
      },
      resolve: (__parent, args) => {
        prisma.address.create({
          street_number: args.street_number,
          street_name: args.street_name,
          city: args.city,
          state: args.state,
          zip_code: args.zip_code,
          personId: args.personId
        })
        return args
      }
    }
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
