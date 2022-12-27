const graphql = require("graphql");
const AddressType = require("./AddressType");
const PostType = require("./PostType");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    address: { type: AddressType },
    posts: { type: new GraphQLList(PostType) },
  }),
});

module.exports = PersonType;
