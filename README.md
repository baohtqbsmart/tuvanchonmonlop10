# Yersin School Đà Lạt - Tư vấn chọn môn học lớp 10

Ứng dụng web tĩnh (HTML/CSS/JavaScript thuần, không cần cài đặt gì thêm) giúp học sinh lớp 10
trả lời bảng câu hỏi khảo sát theo thang đo Likert (5 mức độ) để nhận gợi ý:

1. **5 ngành học đại học** phù hợp nhất với năng lực, sở thích và nhu cầu xã hội của học sinh.
2. **5 trường đại học tại Việt Nam** gợi ý tương ứng với từng ngành học.
3. **Môn học nên đăng ký tại trường** — chỉ giữa hai lựa chọn **Hóa học** hoặc **Địa lý**.

## Cách sử dụng

Mở trực tiếp file `index.html` bằng trình duyệt, hoặc host bằng bất kỳ static server nào
(ví dụ GitHub Pages):

```bash
# Chạy thử nhanh trên máy (Python 3 có sẵn server tĩnh)
python3 -m http.server 8000
# rồi mở http://localhost:8000 trên trình duyệt
```

## Cấu trúc dự án

```
index.html          Giao diện: giới thiệu -> khảo sát -> kết quả
css/style.css        Toàn bộ style, responsive, hỗ trợ in kết quả
js/data.js            Ngân hàng câu hỏi, danh sách 9 nhóm ngành và trường đại học gợi ý
js/app.js             Logic hiển thị khảo sát, tính điểm và render kết quả
```

## Nguyên lý tính điểm

- Bảng hỏi gồm 40 phát biểu: 9 nhóm ngành (mỗi nhóm 4 câu đo năng lực, sở thích, nhu cầu xã hội,
  hoạt động thực tế) + 4 câu đánh giá trực tiếp cảm nhận với môn Hóa học/Địa lý.
- Mỗi nhóm ngành được tính điểm theo tổng 4 câu trả lời (thang 1-5), quy đổi ra phần trăm mức độ phù hợp.
- 5 nhóm ngành có điểm cao nhất được chọn làm **5 ngành học gợi ý**, mỗi ngành kèm theo **trường đại học**
  tiêu biểu tại Việt Nam đang đào tạo ngành đó.
- Môn học lựa chọn (Hóa học/Địa lý) được xác định bằng cách kết hợp: (a) cảm nhận trực tiếp của học sinh
  với từng môn, và (b) môn học gắn liền với các ngành có điểm phù hợp cao nhất (trọng số giảm dần theo thứ hạng).

## Lưu ý

Đây là công cụ tham khảo, hỗ trợ định hướng ban đầu. Học sinh nên trao đổi thêm với giáo viên chủ nhiệm,
bộ phận tư vấn hướng nghiệp và cập nhật tổ hợp xét tuyển, điểm chuẩn hằng năm của từng trường trước khi
quyết định chính thức.
