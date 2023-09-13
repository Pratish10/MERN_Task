const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const Video = require("../Models/videoSchema");
const cloudinary = require("../utils/cloudinary");

const uploadDir = "../uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

exports.uploadVideo = async (req, res) => {
  try {
    const fileNames = req.files.map((file) => {
      //   console.log(file.filename);
      //   console.log(path.join(__dirname, uploadDir, file.filename));
      return path.join(__dirname, uploadDir, file.filename);
    });

    const outputFilePath = path.join(
      __dirname,
      uploadDir,
      `${Date.now()}_output.mp4`
    );

    const ffmpegCommand = ffmpeg();

    fileNames.forEach((fileName) => {
      ffmpegCommand.input(fileName);
    });

    ffmpegCommand.on("error", function (err) {
      console.log("Error:", err);
      res.status(500).json({ message: "An error occurred", success: false });
    });

    ffmpegCommand.on("start", function (commandLine) {
      console.log("Spawned FFmpeg with command: " + commandLine);
    });

    ffmpegCommand.on("end", async function () {
      console.log("Videos merged successfully");

      try {
        const videoResult = await cloudinary.uploadVideo(outputFilePath);

        if (!videoResult) {
          console.log("Error uploading to Cloudinary");
        } else {
          console.log("Video uploaded to Cloudinary:", videoResult.url);

          fs.unlinkSync(outputFilePath);

          fileNames.forEach((fileName) => {
            fs.unlinkSync(fileName);
          });

          console.log("Files removed from uploads folder");

          const newVideo = await Video.create({
            cloudinaryUrl: videoResult.url,
          });
          if (newVideo) {
            res.status(200).json({
              cloudinaryUrl: videoResult.url,
              success: true,
            });
          }
        }
      } catch (error) {
        console.log("Error uploading to Cloudinary:", error.message);
        res.status(500).json({ message: "An error occurred", success: false });
      }
    });

    ffmpegCommand.mergeToFile(outputFilePath, uploadDir);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "An error occurred",
      success: false,
    });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const cloudinaryUrl = await Video.find({}).lean();

    res.status(200).json({
      Videos: cloudinaryUrl,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching videos",
      success: false,
    });
    console.log("Error fetching videos:", error.message);
  }
};
