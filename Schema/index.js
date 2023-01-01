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

// const GetAllPeopleQuery = require("./Queries/getAllPeople")
const PersonType = require("./TypeDefs/PersonType");
const AddressType = require("./TypeDefs/AddressType");
const PostType = require("./TypeDefs/PostType");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description:
    "Query all person data including the address and posts created by the people in the database",
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
    getPersonById: {
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
    getPersonByFirstName: {
      type: new GraphQLList(PersonType),
      args: { first_name: { type: GraphQLString } },
      description:
        "Query to get single person in the database by their first name",
      resolve: async (__parent, args) => {
        try {
          const data = await axios
            .get(`http://localhost:5000/onePerson/${args.first_name}`)
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
  name: "PersonMutations",
  description: "Create new person, address, and posts mutations",
  fields: {
    createPerson: {
      type: PersonType,
      description:
        "Create new Person mutation, this does not create a new address or posts for the person you need to create those through the create address and create post mutations",
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
        "Create new address mutation, you need to have a unique personId in the new data",
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
      description:
        "Mutation to create a new post, you need to have a unique personId(authorId) to create a new post",
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
