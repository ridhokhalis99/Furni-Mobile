require("dotenv").config();
const { ApolloServer } = require("apollo-server");

const {
  typeDefs: productTypeDefs,
  resolvers: productResolvers,
} = require("./schema/productSchema");
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schema/userSchema");

const server = new ApolloServer({
  typeDefs: [productTypeDefs, userTypeDefs],
  resolvers: [productResolvers, userResolvers],
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
