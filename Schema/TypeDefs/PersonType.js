const graphql = require("graphql");
const AddressType = require("./AddressType");
const FriendsType = require("./FriendsType");
const PostType = require("./PostType");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    address: { type: AddressType },
    posts: { type: new GraphQLList(PostType) },
    friends: { type: new GraphQLList(FriendsType) }
  }),
});

module.exports = PersonType;
