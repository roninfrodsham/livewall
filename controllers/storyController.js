const story = require('./../json/story.js');

exports.getStoryApi = (req, res) => {
   res.json(story.data);
};