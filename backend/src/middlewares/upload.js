const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/", // Carpeta local
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
