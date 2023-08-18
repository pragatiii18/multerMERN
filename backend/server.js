const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoutes");
const multer = require("multer");
const { default: mongoose } = require("mongoose");

require("./Models/UserModel");
const User = mongoose.model("User");

const connectDb = require("./connection/dbConnect");

require("dotenv").config();
connectDb();

const PORT = process.env.PORT||7001;
console.log(PORT);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  app.use("/images", express.static("./public/images/"));


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../backend/public/images");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;

  try {
    // await User.create({ image: imageName });
    res.json({ status: "ok", imagePath: imageName });
  } catch (error) {
    res.json({ status: error });
  }
});


  app.use(
    cors({
      origin: ["http://localhost:7000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use(cookieParser());

app.use(express.json());
app.use("/", authRoute);
