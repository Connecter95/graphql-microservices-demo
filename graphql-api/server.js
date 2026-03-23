const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express4");

const PORT = 4000;

const typeDefs = `#graphql
  type CombinedData {
    serviceA: String!
    serviceB: String!
  }

  type Query {
    combinedData: CombinedData!
  }
`;

const resolvers = {
  Query: {
    combinedData: async () => {
      try {
        const [serviceAResponse, serviceBResponse] = await Promise.all([
          fetch("http://localhost:3001/data"),
          fetch("http://localhost:3002/data"),
        ]);

        if (!serviceAResponse.ok) {
          throw new Error(`Microservice A failed with status ${serviceAResponse.status}`);
        }

        if (!serviceBResponse.ok) {
          throw new Error(`Microservice B failed with status ${serviceBResponse.status}`);
        }

        const [serviceAData, serviceBData] = await Promise.all([
          serviceAResponse.json(),
          serviceBResponse.json(),
        ]);

        return {
          serviceA: serviceAData.message,
          serviceB: serviceBData.message,
        };
      } catch (error) {
        throw new Error(`Failed to aggregate microservice data: ${error.message}`);
      }
    },
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", express.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`GraphQL API running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start GraphQL API:", error);
  process.exit(1);
});
