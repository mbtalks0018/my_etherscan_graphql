const { ApolloServer } = require("apollo-server");// Import Apollo server
const { importSchema } = require("graphql-import");// Import schema
const EtherDataSource = require("./datasource/ethDatasource");// Import Ether datasource
const typeDefs = importSchema("./schema.graphql");// load Schema

// Load environment variables from .env file
require("dotenv").config(); 

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver to get ether balance 
      dataSources.ethDataSource.etherBalanceByAddress(),

      totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver to get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

      latestEthereumPrice: (root, _args, { dataSources }) => // Resolver to get latest Ethereum price
      dataSources.ethDataSource.getLatestEthereumPrice(),

      blockConfirmationTime: (root, _args, { dataSources }) => // Resolver to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({// Create Apollo server
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Installation Data source
  }), 
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {// Start server on port 9000
  console.log(`🚀 Server ready at ${url}`); 
});
