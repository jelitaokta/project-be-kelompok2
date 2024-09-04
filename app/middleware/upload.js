const multer = require("multer");
const path = require("path");
const __basedir = path.resolve(__dirname, '..');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const fs = require("fs");
const uploadDir = path.join(__basedir, "resources", "static", "assets", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // gunakan path.join untuk memastikan path yang tepat
    cb(null, path.join(__basedir + "/resources/static/assets/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;