const graphql = require("graphql");
const FriendType = require("./FriendType")
const { GraphQLObjectType, GraphQLInt } = graphql;

const FriendsType = new GraphQLObjectType({
  name: "Friends",
  fields: () => ({
    personId: { type: GraphQLInt },
    friendsId: { type: GraphQLInt },
    friends: { type: FriendType }
  }),
});

module.exports = FriendsType;
