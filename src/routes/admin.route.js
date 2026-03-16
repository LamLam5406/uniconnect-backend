const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Tuyến đường Admin tạo tài khoản mới: POST /api/admin/users
// Bắt buộc phải đi qua middleware xác thực token
router.post('/users', verifyToken, adminController.createUser);

module.exports = router;