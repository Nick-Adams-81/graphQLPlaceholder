const graphql = require("graphql");
const PeopleType = require("./PeopleType")
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const FriendType = new GraphQLObjectType({
  name: "Friend",
  fields: () => ({
    id: { type: GraphQLInt },
    group_name: { type: GraphQLString },
    people: { type: new GraphQLList(PeopleType)}

  }),
});

module.exports = FriendType;
