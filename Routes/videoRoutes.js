const express = require("express");
const videoController = require("../controllers/videoController");

const router = express.Router();

const upload = require("../Config/multer");

router.post("/upload", upload.array("files", 50), videoController.uploadVideo);

router.get("/get-videos", videoController.getVideos);

module.exports = router;
