const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const PersonFriendType = new GraphQLObjectType({
  name: "PersonFriendType",
  fields: () => ({
    personId: { type: GraphQLInt },
    friendsId: { type: GraphQLInt },
  }),
});
module.exports = PersonFriendType;
