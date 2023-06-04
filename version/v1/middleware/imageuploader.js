const multer = require("multer");
const path = require("path");

const Filetype = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isvalid = Filetype[file.mimetype];
    let uplorError = new Error("invalid image error");
    if (isvalid) {
      uplorError = null;
    }
    cb(uplorError, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.split(" ").join("-");
    const extension = Filetype[file.mimetype];
    cb(null, `${filename}-${Date.now()}.${extension}`);
  },
});

const uploads = multer({ storage: storage });

module.exports = uploads;
