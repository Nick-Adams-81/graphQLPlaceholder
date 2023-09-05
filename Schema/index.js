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
      description: "Query to get all people in the database",
      resolve: async (__parent, __args) => {
        try {
          const people = await axios.get(`http://localhost:5000/person`);
          const data = await people.data;
          return data;
        } catch (err) {
          return err;
        }
      },
    },
    getPersonById: {
      type: PersonType,
      args: { id: { type: GraphQLInt } },
      description: "Query to get single person in the database by their id",
      resolve: async (__parent, args) => {
        try {
          const person = await axios.get(
            `http://localhost:5000/person/${args.id}`
          );
          const data = await person.data;
          return data;
        } catch (err) {
          return err;
        }
      },
    },
    getPersonByName: {
      type: new GraphQLList(PersonType),
      args: { name: { type: GraphQLString } },
      description: "Query to get single person in the database by their name",
      resolve: async (__parent, args) => {
        try {
          const person = await axios.get(
            `http://localhost:5000/onePerson/${args.name}`
          );
          const data = await person.data;
          return data;
        } catch (err) {
          return err;
        }
      },
    },
    getLimitedPeople: {
      type: new GraphQLList(PersonType),
      args: { limit: { type: GraphQLInt } },
      description: "Get limited number of people based on inputted value",
      resolve: async (__parent, args) => {
        try {
          const people = await axios.get(
            `http://localhost:5000/limitPeople/${args.limit}`
          );
          const data = await people.data;
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
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: async (__parent, args) => {
        try {
          const newPerson = await axios.post(
            `http://localhost:5000/newPerson`,
            {
              name: args.name,
              email: args.email,
            }
          );
          const data = await newPerson.data;
          return data;
        } catch (err) {
          return err;
        }
      },
    },
    updatePerson: {
      name: "UpdatePerson",
      type: PersonType,
      description: "Update existing person in the database",
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve: async (__parent, args) => {
        try {
          const updatedPerson = await axios.patch(
            `http://localhost:5000/updatePerson/${args.id}`,
            {
              name: args.name,
              email: args.email,
            }
          );
          const data = await updatedPerson.data;
          return data;
        } catch (err) {
          return err;
        }
      },
    },
    deletePersonById: {
      name: "DeletePerson",
      type: PersonType,
      description: "Delete a person by id",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (__parent, args) => {
        try {
          const deletedPerson = await axios.delete(
            `http://localhost:5000/deletePerson/${args.id}`,
            {
              id: args.id,
            }
          );
          const data = await deletedPerson.data;
          return data;
        } catch (err) {
          return err;
        }
      },
    },
    deletePersonByName: {
      name: "DeletePersnByName",
      type: PersonType,
      description: "Delete a person by name",
      args: {
        name: { type: GraphQLString },
      },
      resolve: async (__parent, args) => {
        try {
          const deletedPerson = await axios.delete(
            `http://localhost:5000/deletePersonByName/${args.name}`,
            {
              name: args.name,
            }
          );
          const data = await deletedPerson.data;
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
          const address = await axios.post(`http://localhost:5000/newAddress`, {
            street_number: args.street_number,
            street_name: args.street_name,
            city: args.city,
            state: args.state,
            zip_code: args.zip_code,
            personId: args.personId,
          });
          const data = await address.data;
          return data;
        } catch (err) {
          return err;
        }
      },
    },
    createPost: {
      type: PostType,
      description:
        "Mutation to create a new post, you need to have a personId(authorId) to create a new post",
      args: {
        published: { type: GraphQLBoolean },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        authorId: { type: GraphQLInt },
      },
      resolve: async (__parent, args) => {
        try {
          const post = await axios.post(`http://localhost:5000/newPost`, {
            published: args.published,
            title: args.title,
            body: args.body,
            authorId: args.authorId,
          });
          const data = await post.data;
          return data;
        } catch (err) {
          return err;
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
