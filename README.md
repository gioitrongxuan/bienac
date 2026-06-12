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

## 📁 Cấu trúc

```
bienac-website/
├── index.html        # Trang chính
├── css/style.css     # Giao diện (dark + glassmorphism)
├── js/effects.js     # Engine WebGL + 4 shader hiệu ứng
├── js/main.js        # Cấu hình kênh, lưới video, bảng chọn hiệu ứng
├── assets/logo.svg   # Logo bienac (vector)
└── deploy-s3.sh      # Script deploy lên S3
```

## ⚙️ Tùy chỉnh nội dung

Mở `js/main.js`, sửa phần `CONFIG` ở đầu file:

```js
const CONFIG = {
  channelUrl: 'https://www.youtube.com/@bienac',  // link kênh của bạn
  videos: [
    // Điền id video YouTube (phần sau ?v= trong link) để hiện thumbnail thật
    { id: 'dQw4w9WgXcQ', title: 'Tên video', tag: 'Vũ trụ' },
    ...
  ],
};
```

Khi `id` để trống, thẻ video hiển thị thumbnail gradient và dẫn về trang kênh.

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
