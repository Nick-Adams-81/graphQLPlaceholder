const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const FriendType = new GraphQLObjectType({
  name: "Friend",
  fields: () => ({
    id: { type: GraphQLInt },
    group_name: { type:  GraphQLString  },
  }),
});

module.exports = FriendType;
