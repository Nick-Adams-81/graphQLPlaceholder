const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const axios = require("axios");

const PersonType = require("../TypeDefs/PersonType");

const GetAllPeopleQuery = new GraphQLObjectType({
  name: "GetAllPeopleQuery",
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
  },
});

module.exports = GetAllPeopleQuery;
