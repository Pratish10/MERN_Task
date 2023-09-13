const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    cloudinaryUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;

module.exports = mongoose.model("Video", videoSchema);
