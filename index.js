const path = require("path");

const express = require("express");
const exp = require("constants");

const multer = require("multer");

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true })); //this is used whenever you receive data not in json form or form data // one type of middleware

app.use(express.json());

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {});

app.listen(PORT, () => console.log(`server started on port${PORT}`));
