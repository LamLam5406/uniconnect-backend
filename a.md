## DANH SÁCH API (API SPECIFICATION)

### 1. Authentication (Xác thực)

| Method | Endpoint | Mô tả | Yêu cầu (Body/Auth) |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Đăng nhập hệ thống | Body: `{ email, password }` |
| `GET` | `/api/auth/profile/:id` | Xem thông tin cá nhân | **Auth**: Bearer Token |

### 2. Jobs (Quản lý việc làm)

| Method | Endpoint | Mô tả | Yêu cầu (Body/Auth) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/jobs` | Lấy danh sách tất cả việc làm | Không yêu cầu |
| `GET` | `/api/jobs/:id` | Xem chi tiết 1 việc làm | Không yêu cầu |
| `POST` | `/api/jobs` | Tạo công việc mới (Company) | **Auth**: Token <br> Body: `{ title, salary... }` |

### 3. Application (Quản lý ứng tuyển)

| Method | Endpoint | Mô tả | Yêu cầu (Body/Auth) |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/jobs/apply` | Sinh viên nộp đơn | **Auth**: Token <br> Body: `{ job_id, student_id }` |
| `GET` | `/api/jobs/:id/applicants` | Xem danh sách người ứng tuyển | **Auth**: Token (Company only) |
| `PUT` | `/api/jobs/apply/status` | Cập nhật trạng thái đơn (Duyệt) | **Auth**: Token <br> Body: `{ job_id, student_id, status }` |

---