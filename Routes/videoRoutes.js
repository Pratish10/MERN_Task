const express = require("express");
const multer = require("multer");
const { upload, getVideos } = require("../Controllers/videoControllers");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.array("files", 50), upload);

router.get("/get-videos", getVideos);

module.exports = router;
