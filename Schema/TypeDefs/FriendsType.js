const graphql = require("graphql");
const PersonFriendsType = require("./PersonFriendType")
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const FriendsType = new GraphQLObjectType({
  name: "Friends",
  fields: () => ({
    id: { type: GraphQLInt },
    group_name: { type: GraphQLString },
    people: { type: new GraphQLList(PersonFriendsType) },
  }),
});

module.exports = FriendsType;
