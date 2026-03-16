const authService = require('../services/auth.service');
const db = require('../models');
const fs = require('fs');
const path = require('path');

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password); // Thêm await
      res.json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const result = await authService.getProfile(req.user.id); // Gọi service
      res.json(result);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id; 
      const role = req.user.role;
      let data = {}; 

      if (role === 'student') {
        const { full_name, phone, gender, university, major, gpa, skills, bio } = req.body;
        data = { full_name, phone, gender, university, major, gpa, skills, bio };
      } else if (role === 'company') {
        const { company_name, website, address, size, industry, description } = req.body;
        data = { company_name, website, address, size, industry, description };
      }

      // Xử lý file upload VÀ xóa file cũ
      if (req.file) {
        const newFileUrl = req.file.path.replace(/\\/g, "/"); 
        
        // Tìm profile cũ để lấy đường dẫn file cũ
        if (role === 'student') {
          const oldProfile = await db.StudentProfile.findOne({ where: { user_id: userId } });
          if (oldProfile && oldProfile.cv_url) {
            // Xóa file cũ khỏi hệ thống
            const oldFilePath = path.join(__dirname, '../../', oldProfile.cv_url);
            if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
          }
          data.cv_url = newFileUrl;
        } 
        
        if (role === 'company') {
          const oldProfile = await db.CompanyProfile.findOne({ where: { user_id: userId } });
          if (oldProfile && oldProfile.logo_url) {
            // Xóa logo cũ khỏi hệ thống
            const oldFilePath = path.join(__dirname, '../../', oldProfile.logo_url);
            if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
          }
          data.logo_url = newFileUrl;
        }
      }

      Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

      const result = await authService.updateProfile(userId, role, data);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};

module.exports = authController;