const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Lưu file vào thư mục uploads ở root project
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    // Đổi tên file để tránh trùng lặp: fieldname-timestamp.đuôifile
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;