const multer = require("multer");
const path = require("path");

const uploadDir = "uploads";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", uploadDir)); // Adjust the path as needed
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const videoFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(mp4)$/)) {
    req.fileError = "Only mp4 files are allowed";
    return cb(new Error("Only mp4 files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: videoFilter });

module.exports = upload;
