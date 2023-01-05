const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const PersonType = require("./PersonType");

const FriendType = new GraphQLObjectType({
  name: "Friend",
  fields: () => ({
    id: { type: GraphQLInt },
    group_name: { type: GraphQLString },
    // people: { type: PersonType },
  }),
});

module.exports = FriendType;
