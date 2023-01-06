const graphql = require("graphql");
const FriendType = require("./FriendType")
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const FriendsType = new GraphQLObjectType({
  name: "FriendsList",
  fields: () => ({
    personId: { type: GraphQLInt },
    friendsId: { type: GraphQLInt },
    name: { type: GraphQLString },
    friends: { type: FriendType }
  }),
});

module.exports = FriendsType;
