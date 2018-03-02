const { GraphQLServer } = require('graphql-yoga')

const { typeDefs, resolvers } = require('./graphql')

const opts = {
  port: 4000 //configurable port no
};



const server = new GraphQLServer({ typeDefs, resolvers, opts })
server.start(() => console.log(`Server is running at http://localhost:${opts.port}`))