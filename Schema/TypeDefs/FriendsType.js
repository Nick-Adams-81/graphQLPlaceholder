const graphql = require("graphql");
const PersonType = require("./PersonType")
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const FriendsType = new GraphQLObjectType({
  name: "Friends",
  fields: () => ({
    id: { type: GraphQLInt },
    group_name: { type: GraphQLString },
    people: { type: new GraphQLList(PersonType) },
  }),
});

module.exports = FriendsType;
