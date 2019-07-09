"use strict";

const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const PORT = process.env.PORT || 3000;
const server = express();

// Describes what is possibly, and perhaps more importantly what's not possible
// We query our schema for a video and it's a video object
const schema = buildSchema(`
    type Video {
        id: ID,
        title: String,
        duration: Int,
        watched: Boolean
    }
    type Query {
        video: Video
        videos: [Video]
    }
    type Schema {
        query: Query
    }
`);

const videos = [
  {
    id: "rcg",
    title: "Return a collection in GraphQL",
    duration: 120,
    watched: true
  },
  {
    id: "emc",
    title: "Ember.js CLI",
    duration: 240,
    watched: false
  },
  {
    id: "jas",
    title: "JS Advanced Series",
    duration: 240,
    watched: true
  },
  {
    id: "nlp",
    title: "NLP with javascript",
    duration: 240,
    watched: true
  }
];

// This is how we resolve the query for videos, we return a video collection
const resolvers = {
  videos: () => videos
};

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // this allows us to use the graphical tool of graphql
    rootValue: resolvers // to be able to resolve our queries in the graphical tool :D
  })
);

// hit http://localhost:3000/graphql to see the graphical tool
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

