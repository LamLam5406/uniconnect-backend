const jobService = require('../services/job.service');

const jobController = {
  createJob: async (req, res) => {
    try {
      // Thêm check role:
      if (req.user.role !== 'company') {
        return res.status(403).json({ message: "Chỉ công ty mới được đăng tin tuyển dụng!" });
      }
      // Lấy company_id từ user đang đăng nhập (req.user.id) thay vì req.body
      const jobData = { ...req.body, company_id: req.user.id }; 
      
      const job = await jobService.createJob(jobData);
      res.status(201).json(job);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  getAllJobs: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 15; // Khớp với PAGE_SIZE ở React

      // Lấy toàn bộ tham số bộ lọc từ Query String
      const filters = {
        search: req.query.search,
        location: req.query.location,
        job_type: req.query.job_type,
        salary_range: req.query.salary_range,
        status: req.query.status,
        industry: req.query.industry,
        level: req.query.level,
        sortBy: req.query.sortBy,
        company_id: req.query.company_id
      };

      // Truyền filters xuống service
      const result = await jobService.getAllJobs(page, limit, filters);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  getJobById: async (req, res) => {
    try {
      const job = await jobService.getJobById(req.params.id);
      if (!job) return res.status(404).json({ message: "Not found" });
      res.json(job);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  applyJob: async (req, res) => {
    try {
      const { job_id } = req.body; 

      // Kiểm tra đầu vào
      if (!job_id) {
        return res.status(400).json({ message: "Vui lòng cung cấp job_id để ứng tuyển!" });
      }

      const student_id = req.user.id; 

      if (req.user.role !== 'student') {
        return res.status(403).json({ message: "Chỉ sinh viên mới được ứng tuyển!" });
      }

      await jobService.applyJob(job_id, student_id);
      res.json({ message: "Nộp đơn thành công!" });
    } catch (e) {
      res.status(400).json({ error: e.message }); 
    }
  },

  getJobApplicants: async (req, res) => {
    try {
      // 1. Kiểm tra role
      if (req.user.role !== 'company') {
        return res.status(403).json({ message: "Chỉ công ty mới được xem danh sách ứng viên!" });
      }

      const jobId = req.params.id;
      const companyId = req.user.id;

      // 2. Kiểm tra quyền sở hữu công việc
      const job = await jobService.getJobById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Không tìm thấy công việc này." });
      }
      
      if (job.company_id !== companyId) {
        return res.status(403).json({ message: "Bạn không có quyền xem hồ sơ của công việc không do bạn đăng!" });
      }

      // 3. Lấy danh sách nếu qua được các vòng kiểm tra
      const list = await jobService.getApplicants(jobId);
      res.json(list);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  updateApplicationStatus: async (req, res) => {
    try {
      if (req.user.role !== 'company') {
        return res.status(403).json({ message: "Chỉ công ty đăng tuyển mới được duyệt hồ sơ!" });
      }

      const { job_id, student_id, status } = req.body;
      const company_id = req.user.id; 
      
      // Truyền thêm company_id xuống service để kiểm tra chéo
      await jobService.updateStatus(job_id, student_id, status, company_id);
      res.json({ message: "Cập nhật thành công" });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

module.exports = jobController;