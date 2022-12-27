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
  description: "Create new person mutation",
  fields: {
    createPerson: {
      type: PersonType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        // address: { type: AddressType },
        // posts: { type: PostType },
      },
      resolve: (__parent, args) => {
        return axios.post("http://localhost:5000/api/newPerson", {
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          // address: args.address,
          // posts: args.posts,
        }).then(res => res.data);
        // prisma.person.create({
        //   first_name: args.first_name,
        //   last_name: args.last_name,
        //   email: args.email,
          // address: args.address,
          // posts: args.posts
        // })
        // return args

      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
