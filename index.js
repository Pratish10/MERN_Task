const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./Config/db");
const apiRoutes = require("./Routes/videoRoutes");

const PORT = process.env.PORT || 8000;

const app = express();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uploadDir = "../uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

connectDB();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello From Pratish",
    success: true,
  });
});

app.use("/api", apiRoutes);

app.listen(PORT, console.log(`Server is listening on PORT:${PORT}`));
