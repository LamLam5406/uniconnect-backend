const adminService = require('../services/admin.service');

const adminController = {
  createUser: async (req, res) => {
    try {
      // Bảo mật: Phải đảm bảo người đang gọi API này có role là 'admin'
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Từ chối truy cập. Chỉ Admin mới có quyền tạo tài khoản!" });
      }

      const newUser = await adminService.createUser(req.body);
      res.status(201).json({ 
        message: "Tạo tài khoản và khởi tạo hồ sơ thành công!", 
        user: newUser 
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

module.exports = adminController;