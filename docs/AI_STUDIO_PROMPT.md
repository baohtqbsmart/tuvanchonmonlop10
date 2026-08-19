# Prompt để dán vào Google AI Studio / Gemini

Dán toàn bộ nội dung bên dưới vào ô prompt của Google AI Studio (chọn app kiểu
"Build" / "Web app") để AI tạo lại trang web một cách đẹp và hoàn chỉnh nhất.

---

## PROMPT

Hãy tạo cho tôi một trang web tư vấn hướng nghiệp dành cho học sinh lớp 10,
mang thương hiệu trường **Yersin School Đà Lạt**. Đây là một ứng dụng web
tĩnh một trang (single-page), giao diện tiếng Việt, thiết kế hiện đại, chuyên
nghiệp, thân thiện với học sinh, tối ưu cho cả máy tính và điện thoại.

### 1. Mục tiêu sản phẩm

Trang web dùng một **bảng khảo sát Likert 5 mức độ** (Hoàn toàn không đồng ý
→ Hoàn toàn đồng ý) để đánh giá năng lực học tập, sở thích cá nhân và nhận
thức về nhu cầu xã hội của học sinh, từ đó đưa ra 3 kết quả tư vấn:

1. **5 ngành học đại học** phù hợp nhất với học sinh (kèm mô tả ngắn và % mức
   độ phù hợp).
2. **5 trường đại học tại Việt Nam** tương ứng, gợi ý theo từng ngành (mỗi
   ngành 1 trường chính + 2 lựa chọn dự phòng).
3. **Môn học tự chọn nên đăng ký tại trường** — chỉ được chọn **một trong
   hai môn: Hóa học hoặc Địa lý** (không có lựa chọn nào khác), kèm biểu đồ
   so sánh % thiên hướng Hóa/Địa và đoạn giải thích lý do.

### 2. Cấu trúc 3 màn hình (single page, chuyển màn hình bằng JS, không reload)

**Màn hình 1 - Giới thiệu:**
- Header thương hiệu: dòng nhỏ "TRƯỜNG YERSIN SCHOOL ĐÀ LẠT" phía trên, tiêu đề
  lớn "Tư vấn chọn môn học lớp 10".
- Giải thích ngắn gọn cách làm khảo sát và thang đo Likert 5 mức.
- Form nhập Họ tên và Lớp (không bắt buộc).
- Nút "Bắt đầu khảo sát".

**Màn hình 2 - Khảo sát:**
- Thanh tiến trình (progress bar) dính trên đầu, hiển thị số câu đã trả lời
  / tổng số câu.
- 40 phát biểu, chia thành 10 khối chủ đề có tiêu đề rõ ràng (9 khối ngành +
  1 khối cảm nhận về môn Hóa/Địa), mỗi phát biểu có 5 lựa chọn dạng nút bấm
  (không dùng radio mặc định xấu của trình duyệt) đánh số 1-5 kèm nhãn chữ.
- Khi chọn, nút được tô sáng (màu chủ đạo xanh dương của trường).
- Nút "Xem kết quả" ở cuối, chặn submit nếu còn câu chưa trả lời.

**Màn hình 3 - Kết quả:**
- Danh sách 5 ngành học, mỗi ngành có thanh % mức độ phù hợp dạng progress bar.
- Bảng 2 cột: Ngành học — Trường đại học gợi ý.
- Khối "Môn học nên đăng ký" nổi bật: badge tròn lớn ghi rõ tên môn được đề
  xuất (màu tím cho Hóa học, màu xanh ngọc cho Địa lý), kèm 2 thanh so sánh %
  Hóa vs Địa và đoạn văn giải thích lý do dựa trên ngành phù hợp nhất.
- 2 nút: "Làm lại khảo sát" và "In / Lưu kết quả" (dùng window.print(), có
  CSS @media print ẩn phần không cần thiết).

### 3. Yêu cầu thiết kế (design system)

- Màu chủ đạo: xanh dương thương hiệu trường (#2563eb → #1d4ed8 gradient cho
  header), nền tổng thể xám nhạt (#f4f6fb), card nền trắng bo góc 10px, đổ
  bóng nhẹ.
- Font: hệ chữ sans-serif hiện đại, dễ đọc (Segoe UI / Roboto / Helvetica).
- Màu môn Hóa học: tím (#7c3aed). Màu môn Địa lý: xanh ngọc (#0891b2).
- Responsive: trên mobile các nút lựa chọn Likert co lại theo lưới, không vỡ
  layout; bảng có thể cuộn ngang nếu cần.
- Có hiệu ứng chuyển động mượt (transition) khi chọn đáp án và chuyển màn hình.
- Toàn bộ giao diện bằng tiếng Việt, giọng văn thân thiện, phù hợp học sinh
  lớp 10.

### 4. Ngân hàng câu hỏi (9 nhóm ngành x 4 câu + 4 câu cảm nhận môn học = 40 câu)

Mỗi nhóm ngành có đúng 4 câu theo thứ tự: (1) năng lực học tập, (2) sở thích,
(3) nhận thức nhu cầu xã hội, (4) hoạt động thực tế yêu thích. 9 nhóm ngành:

1. **Công nghệ thông tin & Kỹ thuật số** — CNTT, Khoa học máy tính, gắn với
   môn Hóa học.
2. **Kỹ thuật - Cơ khí - Điện - Tự động hóa** — gắn với môn Hóa học.
3. **Y - Dược - Sức khỏe** — gắn với môn Hóa học.
4. **Công nghệ Sinh học - Nông nghiệp - Môi trường** — gắn với môn Hóa học.
5. **Kinh doanh - Marketing - Logistics** — gắn với môn Địa lý.
6. **Luật - Hành chính - Chính trị** — gắn với môn Địa lý.
7. **Ngôn ngữ - Sư phạm - Truyền thông** — gắn với môn Địa lý.
8. **Du lịch - Khách sạn - Dịch vụ** — gắn với môn Địa lý.
9. **Kiến trúc - Xây dựng - Quy hoạch đô thị** — gắn với môn Hóa học.

Thêm khối cuối 4 câu đánh giá trực tiếp cảm nhận: 2 câu về mức độ yêu thích/
học tốt môn Hóa học, 2 câu về mức độ yêu thích/học tốt môn Địa lý.

*(Nội dung chi tiết từng câu hỏi, danh sách trường đại học gợi ý cho từng
ngành: lấy nguyên văn từ file `js/data.js` trong repo đính kèm — giữ nguyên
văn phong, không rút gọn.)*

### 5. Thuật toán tính điểm và ra kết quả

- Mỗi nhóm ngành có điểm số = tổng điểm 4 câu trả lời (thang 1-5, tối đa 20
  điểm), quy đổi ra phần trăm mức độ phù hợp = (tổng điểm / 20) × 100.
- Xếp hạng 9 nhóm ngành theo điểm, lấy **5 nhóm cao nhất** làm 5 ngành gợi ý.
- Mỗi ngành trong top 5 có sẵn 1 trường đại học chính + 2 trường dự phòng để
  hiển thị ở bảng gợi ý trường.
- Tính điểm môn học lựa chọn:
  - Điểm cảm nhận trực tiếp: `hoaDirect = (câu Hóa 1 + câu Hóa 2) / 10 × 100`,
    tương tự cho Địa lý.
  - Điểm đóng góp từ ngành: với mỗi ngành trong top 5 (trọng số giảm dần theo
    thứ hạng: 1.0, 0.8, 0.6, 0.4, 0.2), cộng `% phù hợp ngành × trọng số` vào
    tổng điểm Hóa hoặc Địa tùy ngành đó gắn với môn nào.
  - Điểm cuối cùng: `finalHoa = hoaDirect × 2 + tổng đóng góp từ ngành thuộc
    nhóm Hóa` (nhân đôi vì cảm nhận trực tiếp phản ánh sát nhất khả năng học
    môn tại trường), tương tự cho Địa lý.
  - So sánh `finalHoa` và `finalDia`, môn có điểm cao hơn là môn được đề xuất;
    hiển thị tỉ lệ % tương đối giữa hai môn.

### 6. Yêu cầu kỹ thuật

- HTML/CSS/JavaScript thuần (vanilla), không cần framework, không cần build
  tool, không gọi API bên ngoài — chạy được ngay khi mở file `index.html`
  hoặc host tĩnh (GitHub Pages).
- Tách rõ 3 phần: cấu trúc HTML, style CSS, và logic JS (ngân hàng câu hỏi +
  tính điểm + render kết quả) để dễ bảo trì.
- Có thể in kết quả ra PDF gọn gàng qua trình duyệt.
- Toàn bộ nội dung, câu chữ bằng tiếng Việt, không dùng emoji.

---

## Ghi chú khi dùng với Google AI Studio

- Đính kèm 5 file mã nguồn gốc (`index.html`, `css/style.css`, `js/data.js`,
  `js/app.js`, `README.md`) cùng với prompt trên để AI Studio bám sát đúng nội
  dung câu hỏi và logic tính điểm đã kiểm chứng, thay vì tự bịa dữ liệu mới.
- Có thể yêu cầu thêm: "giữ nguyên toàn bộ nội dung câu hỏi và danh sách
  trường đại học, chỉ nâng cấp giao diện/thiết kế" nếu chỉ muốn AI Studio làm
  đẹp lại giao diện mà không đổi logic.
