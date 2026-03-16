const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Trích xuất đuôi file (pdf, docx, jpg...)
    const ext = file.originalname.split('.').pop().toLowerCase();
    
    // Nếu là file tài liệu (CV của sinh viên)
    if (['pdf', 'doc', 'docx'].includes(ext)) {
      return {
        folder: 'uniconnect_uploads',
        resource_type: 'raw', // BẮT BUỘC phải dùng 'raw' cho file tài liệu
        format: ext
      };
    }
    
    // Nếu là hình ảnh (Logo, Ảnh bìa tin tức)
    return {
      folder: 'uniconnect_uploads',
      resource_type: 'auto',
      allowed_formats: ['jpg', 'png', 'jpeg']
    };
  },
});

const upload = multer({ storage: storage });
module.exports = upload;