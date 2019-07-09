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

const getNewId = title => new Buffer.from(title).toString("base64");

exports.getVideoById = id =>
  new Promise(resolve => resolve(videos.find(v => v.id === id)));

exports.getVideos = () => new Promise(resolve => resolve(videos));

exports.createVideo = args => {
  const video = {id: getNewId(args.title), ...args}
  videos.push(video) // we mutate the array just to be able to see all videos in query videos
  return video // this video will be returned by the resolve fn in the mutation
}
