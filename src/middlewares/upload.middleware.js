const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cấu hình kho lưu trữ
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uniconnect_uploads', // Tên thư mục trên Cloudinary
    resource_type: 'auto', // TỰ ĐỘNG nhận diện file (rất quan trọng để upload được PDF/DOCX cho CV)
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx']
  },
});

const upload = multer({ storage: storage });
module.exports = upload;