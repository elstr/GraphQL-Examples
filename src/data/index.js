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

exports.getVideoById = id =>
  new Promise(resolve => resolve(videos.find(v => v.id === id)));
