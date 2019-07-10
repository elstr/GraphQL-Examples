"use strict";

const express = require("express");
const graphqlHTTP = require("express-graphql");
const {
  GraphQLID,
  GraphQLInt,
  GraphQLList, // This allows us to return a list of a given type e.g. GraphQLList(videoType) 
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLObjectType
} = require("graphql");
const { getVideoById, getVideos, createVideo } = require("../src/data");

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: "Video",
  description: "A video type",
  fields: {
    id: { type: GraphQLID, description: "The ID of the video" },
    title: { type: GraphQLString, description: "The title of the video" },
    duration: { type: GraphQLInt, description: "The duration of the video" },
    watched: {
      type: GraphQLBoolean,
      description: "Whether the viewer has watched the video or not"
    }
  }
});
const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type.",
  fields: {
    // We add a new field videos so we can query for those in the graphical tool
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The ID of the video"
        }
      },
      resolve: (_, args) => getVideoById(args.id)
    }
  }
});
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: "The root Mutation type",
    fields: {
        createVideo:{
            type: videoType,  
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString), 
                    description: "The title of the video"
                },
                duration: {
                    type: new GraphQLNonNull(GraphQLInt), 
                    description: "The duration of the video"
                },
                watched: {
                    type: new GraphQLNonNull(GraphQLBoolean), 
                    description: "Whether we've seen the video or not"
                },
            },
            resolve: (_, args) => createVideo(args)
        }
    }
})
const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// hit http://localhost:3000/graphql to see the graphical tool
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
