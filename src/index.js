require('dotenv').config();

const express = require('express');
const cors = require('cors'); // 1. Import cors
const authRoute = require('./routes/auth.route');
const jobRoute = require('./routes/job.route');
const adminRoute = require('./routes/admin.route');
const newsRoute = require('./routes/news.route');
const db = require('./models');

const app = express();

// 2. Kích hoạt CORS (Nên đặt trước các middleware khác)
app.use(cors()); 
app.use(express.json());

// 3. Cho phép client truy cập các file trong thư mục 'uploads'
app.use('/uploads', express.static('uploads')); 

db.sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Đã kết nối MySQL thành công!");
}).catch((err) => {
  console.error("❌ Lỗi kết nối DB:", err.message);
});

app.use('/api/auth', authRoute);
app.use('/api/jobs', jobRoute);
app.use('/api/admin', adminRoute);
app.use('/api/news', newsRoute);
// --- API BÍ MẬT ĐỂ DỌN DATA LỖI TRƯỚC KHI DEMO ---
app.get('/api/fix-demo', async (req, res) => {
  try {
    const db = require('./models');
    const { Op } = require('sequelize');
    
    // Tìm và XÓA tất cả các đơn ứng tuyển có link CV bị lỗi (không bắt đầu bằng http)
    const deletedCount = await db.ApplyJob.destroy({
      where: {
        cv_snapshot: {
          [Op.notLike]: 'http%' // Không giống link web
        }
      }
    });

    res.json({ 
      message: "Đã dọn dẹp thành công!", 
      deleted_records: deletedCount,
      instruction: "Bây giờ Tùng Châu có thể nộp đơn lại vào Job #21 để bắt link CV mới nhé!" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});