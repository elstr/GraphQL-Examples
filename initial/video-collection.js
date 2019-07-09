"use strict";

const { graphql, buildSchema } = require("graphql");

// Describes what is possibly, and perhaps more importantly what's not possible
// We query our schema for foo and it's a string
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

const query = `{
    videos {
      id,
      title,
      duration,
      watched
    }
  }`;

graphql(schema, query, resolvers)
  .then(result => console.log(result))
  .catch(err => console.log(err));
