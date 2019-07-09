"use strict";

const express = require("express");
const graphqlHTTP = require("express-graphql");
const {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLObjectType
} = require("graphql");

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: "Video",
  description: "A video type",
  fields: {
    id: { type: GraphQLID, description: "The ID of the video" },
    title: { type: GraphQLString, description: "The title of the video" },
    duration: { type: GraphQLInt, description: "The duration of the video" },
    watched: { type: GraphQLBoolean, description: "Whether the viewer has watched the video or not" }
  }
});
const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type.",
  fields: {
    video: {
      type: videoType,
      resolve: () =>
        new Promise(resolve => {
          resolve({
            id: "a",
            title: "GraphQL",
            duration: 180,
            watched: true
          });
        })
    }
  }
});
const schema = new GraphQLSchema({
  query: queryType,
});

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // this allows us to use the graphical tool of graphql
  })
);

// hit http://localhost:3000/graphql to see the graphical tool
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
