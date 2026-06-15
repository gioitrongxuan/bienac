# bienac — Website kênh YouTube khoa học

Website tĩnh (HTML/CSS/JS thuần, không cần build) với nền hiệu ứng WebGL huyền ảo,
thiết kế để deploy lên **AWS S3**.

## ✨ Hiệu ứng nền

4 hiệu ứng vẽ bằng WebGL shader, chuyển đổi qua bảng chọn góc dưới-phải
(hoặc phím tắt **1–4**), lựa chọn được lưu vào `localStorage`:

| Phím | Hiệu ứng | Mô tả |
|------|----------|-------|
| 1 | 🌌 Cực quang | Dải cực quang xanh–tím uốn lượn trên trời sao |
| 2 | 🌊 Sóng biển | Các lớp sóng phát sáng dưới ánh trăng |
| 3 | ✨ Tinh vân | Mây tinh vân domain-warping với trường sao |
| 4 | 🔆 Đom đóm | Đàn đom đóm ánh sáng trôi trong sương đêm |

Hiệu ứng có parallax nhẹ theo chuột, tự giảm độ phân giải render (DPR ≤ 1.5)
để tiết kiệm pin, và tôn trọng `prefers-reduced-motion`.

### ⚛ Bong bóng hiện tượng vật lý

Một FAB hình bong bóng tự bay lơ lửng quanh màn hình (kéo-thả được,
thả tay sẽ bay tiếp theo quán tính). Nhấn vào bong bóng để mở danh sách
4 hiện tượng vật lý làm hiệu ứng nền (cũng vẽ bằng WebGL shader):

| Hiện tượng | Mô tả |
|------------|-------|
| ⚡ Hồ quang điện | Sợi plasma nhiễu loạn giữa hai điện cực nóng đỏ |
| 🌩 Sấm sét | Trời giông, sét đánh ngẫu nhiên kèm chớp lóe mây và mưa |
| 🌈 Tia phân cực | Chùm tia quay theo định luật Malus + màu lưỡng chiết |
| 🌊 Giao thoa sóng | Hai nguồn sóng tạo vân giao thoa cùng pha/ngược pha |

Lựa chọn được lưu vào `localStorage` như các hiệu ứng khác.

## 🧪 Bảng tuần hoàn (`elements.html`)

Trang bảng tuần hoàn đầy đủ 118 nguyên tố. Nhấn vào một nguyên tố để xem
hiệu ứng đặc trưng của nó (vẽ bằng particle engine 2D canvas):

- **Kim loại kiềm** (Li, Na, K, Rb, Cs): vụ nổ + ngọn lửa đúng màu thử lửa
  (Li đỏ thẫm, Na vàng, K tím nhạt...).
- **Kiềm thổ & Cu, B, S...**: ngọn lửa màu đặc trưng (Ba lục nhạt, Sr đỏ
  thắm, Cu xanh lục-lam, S xanh lam...).
- **Khí hiếm**: quả cầu phát sáng đúng màu ống phóng điện (Ne đỏ cam,
  Ar tím, Xe xanh lam...).
- **Halogen**: làn hơi khí màu (Cl vàng lục, I tím thăng hoa...).
- **Kim loại chuyển tiếp**: tia lửa kim loại (Fe cam như que hàn, Ti trắng).
- **Nguyên tố phóng xạ**: lõi sáng xanh phát tia bức xạ.
- **Đặc biệt**: H nổ, N sương giá −196°C, C kim cương lấp lánh,
  Hg giọt thủy ngân lỏng nảy, Au/Ag/Bi ánh kim lấp lánh, á kim tia điện.

## 📁 Cấu trúc

```
bienac-website/
├── index.html                  # Trang chính
├── elements.html               # 🧪 Bảng tuần hoàn với hiệu ứng nguyên tố
├── css/style.css               # Giao diện (dark + glassmorphism)
├── css/elements.css            # Giao diện trang bảng tuần hoàn
├── js/effects.js               # Engine WebGL + 4 shader hiệu ứng
├── js/elements.js              # Dữ liệu 118 nguyên tố + engine hạt 2D
├── js/main.js                  # Render trang (đọc cấu hình từ data/)
├── data/config.json            # ⚙️ Link kênh + danh sách video (sửa tay ở đây)
├── data/videos.json            # 🤖 Video mới nhất, CI tự lấy từ kênh
├── scripts/fetch-videos.mjs    # Script lấy video qua RSS feed YouTube
├── assets/logo.svg             # Logo bienac (vector)
├── .github/workflows/deploy.yml# CI/CD: deploy S3 + tự cập nhật video
└── deploy-s3.sh                # Script deploy thủ công lên S3
```

## ⚙️ Tùy chỉnh nội dung — `data/config.json`

Mọi link đều nằm trong `data/config.json`, **không cần sửa code**:

```json
{
  "channelUrl": "https://www.youtube.com/@bienac",
  "channelId": "",
  "autoFetchVideos": true,
  "maxVideos": 6,
  "videos": [
    { "id": "dQw4w9WgXcQ", "title": "Tên video", "tag": "Vũ trụ" }
  ]
}
```

Thứ tự ưu tiên danh sách video hiển thị:

1. **Sửa tay**: video trong `config.json` có điền `id` (phần sau `?v=` trong link)
   → luôn được ưu tiên.
2. **Tự động**: nếu không có video sửa tay và `autoFetchVideos: true`,
   trang đọc `data/videos.json` — file này được CI tự cập nhật từ RSS feed
   của kênh (xem mục CI/CD bên dưới).
3. **Dự phòng**: khi cả hai đều trống, hiển thị thumbnail gradient placeholder
   dẫn về trang kênh.

`channelId` (dạng `UC...`) có thể để trống — script sẽ tự tìm từ `channelUrl`,
nhưng điền sẵn sẽ ổn định hơn. Lấy id tại trang kênh → About → Share channel
→ Copy channel ID.

Chạy thử việc lấy video tự động ở local:

```bash
node scripts/fetch-videos.mjs   # ghi kết quả vào data/videos.json
```

## 🔄 CI/CD — GitHub Actions

Workflow `.github/workflows/deploy.yml` tự động:

- **Push lên `master`** → lấy video mới nhất của kênh rồi deploy lên S3.
- **Theo lịch 6 tiếng/lần** → tự làm mới `data/videos.json` và deploy
  (website luôn hiện video mới mà không cần đụng vào repo).
- **Bấm tay** trong tab Actions (workflow_dispatch).

Khai báo secrets trong **Settings → Secrets and variables → Actions**:

| Secret | Bắt buộc | Mô tả |
|--------|----------|-------|
| `AWS_ACCESS_KEY_ID` | ✅ | Khóa IAM có quyền ghi S3 |
| `AWS_SECRET_ACCESS_KEY` | ✅ | Secret key tương ứng |
| `S3_BUCKET` | ✅ | Tên bucket, vd `bienac-website` |
| `AWS_REGION` | — | Mặc định `ap-southeast-1` |
| `CLOUDFRONT_DISTRIBUTION_ID` | — | Điền nếu dùng CloudFront, để tự xóa cache |

## 🚀 Deploy lên AWS S3

### Cách 1: dùng script (khuyến nghị)

```bash
# Cài AWS CLI và đăng nhập trước: aws configure
cd bienac-website
chmod +x deploy-s3.sh
./deploy-s3.sh bienac-website ap-southeast-1
```

Script sẽ tự: tạo bucket → bật static website hosting → mở public read →
sync file (HTML không cache, asset cache 1 tuần). Xong sẽ in ra URL website.

### Cách 2: thủ công

```bash
aws s3 mb s3://bienac-website --region ap-southeast-1
aws s3 website s3://bienac-website --index-document index.html
aws s3 sync . s3://bienac-website --exclude "*.sh" --exclude "*.md"
```

### Thêm HTTPS + tên miền riêng (tùy chọn)

Dùng **CloudFront** trước S3:

1. Tạo CloudFront distribution, origin trỏ tới bucket (dạng website endpoint).
2. Yêu cầu certificate miễn phí trong **ACM** (region `us-east-1`).
3. Trỏ domain về CloudFront bằng Route 53 hoặc DNS của bạn.
4. Khi đó có thể đóng public access của bucket và dùng Origin Access Control.

## 🖥 Chạy thử local

```bash
cd bienac-website
python3 -m http.server 8000
# Mở http://localhost:8000
```
