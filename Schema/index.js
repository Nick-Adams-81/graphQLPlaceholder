const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = graphql;
const axios = require("axios");

//const GetAllPeopleQuery = require('./Queries/getAllPeople')
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
      resolve: async (__parent, __args) => {
        try {
          const data = await axios
            .get(`http://localhost:5000/person`)
            .then((res) => res.data);
          return data;
        } catch (err) {
          return err;
        }
      },
    },
    getOnePerson: {
      type: PersonType,
      args: { id: { type: GraphQLInt } },
      description: "Query to get single person in the database by id",
      resolve: async (__parent, args) => {
        try {
          const data = await axios
            .get(`http://localhost:5000/person/${args.id}`)
            .then((res) => res.data);
          return data;
        } catch (err) {
          return err;
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description:
    "Create new person mutation, this mutation does not create a new address or post",
  fields: {
    createPerson: {
      type: PersonType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: async (__parent, args) => {
        try {
          const data = await axios
            .post("http://localhost:5000/newPerson", {
              first_name: args.first_name,
              last_name: args.last_name,
              email: args.email,
            })
            .then((res) => res.data);
          return data;
        } catch (err) {
          return err;
        }
      },
    },
    createAddress: {
      type: AddressType,
      description:
        "Create new address mutation, you need to have a unique user id in the new data",
      args: {
        street_number: { type: GraphQLString },
        street_name: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip_code: { type: GraphQLString },
        personId: { type: GraphQLInt },
      },
      resolve: async (__parent, args) => {
        try {
          const data = await axios
            .post(`http://localhost:5000/newAddress`, {
              street_number: args.street_number,
              street_name: args.street_name,
              city: args.city,
              state: args.state,
              zip_code: args.zip_code,
              personId: args.personId,
            })
            .then((res) => res.data);
          return data;
        } catch (err) {
          return err;
        }
      },
    },
    createPost: {
      type: PostType,
      description: "Mutation to create a new post",
      args: {
        published: { type: GraphQLBoolean },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        authorId: { type: GraphQLInt },
      },
      resolve: async (__parent, args) => {
        try {
          const data = await axios
            .post("http://localhost:5000/newPost", {
              published: args.published,
              title: args.title,
              body: args.body,
              authorId: args.authorId,
            })
            .then((res) => res.data);
          return data;
        } catch (err) {
          return err;
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
