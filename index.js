const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const morgan = require("morgan");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { exec } = require("child_process");
const Video = require("./Models/videoSchema");
const connectDB = require("./Config/db");
const ffmpeg = require("fluent-ffmpeg");
const apiRoutes = require("./Routes/videoRoutes");

const PORT = process.env.PORT || 8000;

const app = express();

// const uploadDir = "uploads";
// const listFilePath = path.join(__dirname, "uploads", `${Date.now()}-list.txt`);
// // console.log("listFilePath:", listFilePath);

// const outputFilePath = path.join(
//   __dirname,
//   "uploads",
//   `${Date.now()}_output.mp4`
// );

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, uploadDir));
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const videoFilter = function (req, file, cb) {
//   if (!file.originalname.match(/\.(mp4)$/)) {
//     req.fileError = "Only mp4 files are allowed";
//     return cb(new Error("Only mp4 files are allowed"), false);
//   }
//   cb(null, true);
// };

// const upload = multer({ storage: storage, fileFilter: videoFilter });

connectDB();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello From Pratish",
    success: true,
  });
});

//controllers
// app.post("/api/upload", upload.array("files", 50), async (req, res) => {
//   try {
//     const fileNames = req.files.map((file) => {
//       return path.join(__dirname, uploadDir, file.filename);
//     });

//     const outputFilePath = path.join(
//       __dirname,
//       uploadDir,
//       `${Date.now()}_output.mp4`
//     );

//     const ffmpegCommand = ffmpeg();

//     fileNames.forEach((fileName) => {
//       ffmpegCommand.input(fileName);
//     });

//     ffmpegCommand.on("error", function (err) {
//       console.error("Error:", err);
//       res.status(500).json({ message: "An error occurred", success: false });
//     });

//     ffmpegCommand.on("end", async function () {
//       console.log("Videos merged successfully");

//       try {
//         const videoResult = await cloudinary.uploader.upload(outputFilePath, {
//           resource_type: "video",
//           folder: "videos",
//         });

//         if (!videoResult) {
//           console.log("Error uploading to Cloudinary");
//         } else {
//           console.log("Video uploaded to Cloudinary:", videoResult.url);

//           fs.unlinkSync(outputFilePath);

//           fileNames.forEach((fileName) => {
//             fs.unlinkSync(fileName);
//           });

//           console.log("Files removed from uploads folder");

//           const newVideo = await Video.create({
//             cloudinaryUrl: videoResult.url,
//           });
//           if (newVideo) {
//             res.status(200).json({
//               cloudinaryUrl: videoResult.url,
//               success: true,
//             });
//           }
//         }
//       } catch (error) {
//         console.log("Error uploading to Cloudinary:", error.message);
//         res.status(500).json({ message: "An error occurred", success: false });
//       }
//     });

//     ffmpegCommand.mergeToFile(outputFilePath, uploadDir);
//   } catch (error) {
//     console.log("error", error);
//     return res.status(500).json({
//       message: "An error occurred",
//       success: false,
//     });
//   }
// });

// app.get("/api/getVideos", async (req, res) => {
//   try {
//     const cloudinaryUrl = await Video.find({}).lean();

//     res.status(200).json({
//       Videos: cloudinaryUrl,
//       success: true,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "Error fetching videos",
//       success: false,
//     });
//     console.log("Error fetching videos:", error.message);
//   }
// });

app.use("/api", apiRoutes);

app.listen(PORT, console.log(`Server is listening on PORT:${PORT}`));
