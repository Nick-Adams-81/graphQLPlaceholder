const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } =
  graphql;

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLInt },
    published: { type: GraphQLBoolean },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    authorId: { type: GraphQLInt },
  }),
});

module.exports = PostType;
