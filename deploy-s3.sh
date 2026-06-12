#!/usr/bin/env bash
# =====================================================================
# Deploy website bienac lên AWS S3 (static website hosting)
#
# Cách dùng:
#   ./deploy-s3.sh <ten-bucket> [region]
# Ví dụ:
#   ./deploy-s3.sh bienac-website ap-southeast-1
#
# Yêu cầu: đã cài AWS CLI và chạy `aws configure`
# =====================================================================
set -euo pipefail

BUCKET="${1:?Thiếu tên bucket. Cách dùng: ./deploy-s3.sh <ten-bucket> [region]}"
REGION="${2:-${AWS_REGION:-ap-southeast-1}}"
SITE_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Deploy bienac lên s3://${BUCKET} (region: ${REGION})"

# 1. Tạo bucket nếu chưa có
if ! aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null; then
  echo "==> Tạo bucket ${BUCKET}..."
  if [ "$REGION" = "us-east-1" ]; then
    aws s3api create-bucket --bucket "$BUCKET" --region "$REGION"
  else
    aws s3api create-bucket --bucket "$BUCKET" --region "$REGION" \
      --create-bucket-configuration LocationConstraint="$REGION"
  fi
fi

# 2. Bật static website hosting
echo "==> Bật static website hosting..."
aws s3 website "s3://${BUCKET}" --index-document index.html --error-document index.html

# 3. Cho phép truy cập công khai (bắt buộc với website hosting không dùng CloudFront)
echo "==> Cấu hình quyền truy cập công khai..."
aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration \
  BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

aws s3api put-bucket-policy --bucket "$BUCKET" --policy "{
  \"Version\": \"2012-10-17\",
  \"Statement\": [{
    \"Sid\": \"PublicReadGetObject\",
    \"Effect\": \"Allow\",
    \"Principal\": \"*\",
    \"Action\": \"s3:GetObject\",
    \"Resource\": \"arn:aws:s3:::${BUCKET}/*\"
  }]
}"

# 4. Đồng bộ file
#    - Asset (css/js/svg): cache 1 tuần
#    - index.html + data/*.json: không cache để cập nhật có hiệu lực ngay
echo "==> Upload files..."
aws s3 sync "$SITE_DIR" "s3://${BUCKET}" \
  --delete \
  --exclude "*.sh" --exclude "*.md" --exclude ".*" \
  --exclude ".git/*" --exclude ".github/*" --exclude "scripts/*" \
  --exclude "index.html" --exclude "data/*" \
  --cache-control "public, max-age=604800"

aws s3 cp "$SITE_DIR/index.html" "s3://${BUCKET}/index.html" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8"

aws s3 sync "$SITE_DIR/data" "s3://${BUCKET}/data" \
  --delete \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "application/json; charset=utf-8"

echo ""
echo "✅ Hoàn tất! Website của bạn tại:"
echo "   http://${BUCKET}.s3-website-${REGION}.amazonaws.com"
echo ""
echo "💡 Gợi ý: dùng CloudFront để có HTTPS + tên miền riêng (xem README.md)."
