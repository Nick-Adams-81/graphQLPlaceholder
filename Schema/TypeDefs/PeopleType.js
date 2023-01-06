const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const PeopleType = new GraphQLObjectType({
  name: "PeopleType",
  fields: () => ({
    personId: { type: GraphQLInt },
    friendsID: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

module.exports = PeopleType;
