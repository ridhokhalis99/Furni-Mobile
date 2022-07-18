import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://p3-challenge-2-orchestrator-as.herokuapp.com",
  cache: new InMemoryCache(),
});

export default client;
