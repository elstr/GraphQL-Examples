"use strict";

const { graphql, buildSchema } = require("graphql");

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
    }
    type Schema {
        query: Query
    }
`);

const video = {
    id: "abc",
    title: 'Create a GraphQL Schema',
    duration: 120,
    watched: false
}

// This is how we resolve the query for video, we return a video object
const resolvers = {
  video: () => video
};

const query = `{
    video {
      id,
      title,
      duration,
      watched
    }
  }`;

graphql(schema, query, resolvers)
  .then(result => console.log(result))
  .catch(err => console.log(err));
