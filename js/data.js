/* Dữ liệu bảng câu hỏi Likert tư vấn chọn môn học lớp 10
 * Mỗi "cluster" (nhóm ngành) có 4 phát biểu: năng lực, sở thích, nhu cầu xã hội, hoạt động thực tế.
 * scienceElective: "hoa" | "dia" -> môn học lựa chọn (Hóa học / Địa lý) gắn với nhóm ngành này.
 */

const CLUSTERS = [
  {
    id: "cntt",
    major: "Công nghệ thông tin / Khoa học máy tính",
    summary: "Lập trình, phát triển phần mềm, trí tuệ nhân tạo, an ninh mạng.",
    scienceElective: "hoa",
    universities: [
      { name: "Đại học Bách khoa Hà Nội" },
      { name: "Trường Đại học Công nghệ - ĐHQG Hà Nội" },
      { name: "Trường Đại học Bách khoa - ĐHQG TP.HCM" },
      { name: "Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM" },
      { name: "Học viện Công nghệ Bưu chính Viễn thông" }
    ]
  },
  {
    id: "kythuat",
    major: "Kỹ thuật Cơ khí / Điện - Điện tử / Tự động hóa",
    summary: "Thiết kế, chế tạo máy móc, robot, hệ thống điện và tự động hóa sản xuất.",
    scienceElective: "hoa",
    universities: [
      { name: "Đại học Bách khoa Hà Nội" },
      { name: "Trường Đại học Bách khoa - ĐHQG TP.HCM" },
      { name: "Trường Đại học Giao thông Vận tải" },
      { name: "Trường Đại học Sư phạm Kỹ thuật TP.HCM" },
      { name: "Trường Đại học Công nghiệp Hà Nội" }
    ]
  },
  {
    id: "yduoc",
    major: "Y khoa / Dược học / Điều dưỡng",
    summary: "Khám chữa bệnh, bào chế thuốc, chăm sóc sức khỏe cộng đồng.",
    scienceElective: "hoa",
    universities: [
      { name: "Trường Đại học Y Hà Nội" },
      { name: "Trường Đại học Y Dược TP.HCM" },
      { name: "Trường Đại học Dược Hà Nội" },
      { name: "Trường Đại học Y Dược - Đại học Huế" },
      { name: "Khoa Y - ĐHQG TP.HCM" }
    ]
  },
  {
    id: "sinhhoc",
    major: "Công nghệ Sinh học / Nông nghiệp - Môi trường",
    summary: "Nghiên cứu sinh vật, nông nghiệp công nghệ cao, bảo vệ môi trường.",
    scienceElective: "hoa",
    universities: [
      { name: "Học viện Nông nghiệp Việt Nam" },
      { name: "Trường Đại học Nông Lâm TP.HCM" },
      { name: "Trường Đại học Khoa học Tự nhiên - ĐHQG Hà Nội" },
      { name: "Trường Đại học Tài nguyên và Môi trường Hà Nội" },
      { name: "Trường Đại học Lâm nghiệp" }
    ]
  },
  {
    id: "kinhdoanh",
    major: "Quản trị Kinh doanh / Marketing / Logistics",
    summary: "Kinh doanh, quản lý thương hiệu, chuỗi cung ứng, thương mại quốc tế.",
    scienceElective: "dia",
    universities: [
      { name: "Trường Đại học Kinh tế Quốc dân" },
      { name: "Trường Đại học Ngoại thương" },
      { name: "Trường Đại học Kinh tế - ĐHQG Hà Nội" },
      { name: "Trường Đại học Kinh tế TP.HCM (UEH)" },
      { name: "Học viện Tài chính" }
    ]
  },
  {
    id: "luat",
    major: "Luật / Hành chính - Chính trị",
    summary: "Tư vấn pháp lý, quản lý nhà nước, bảo vệ quyền lợi công dân và doanh nghiệp.",
    scienceElective: "dia",
    universities: [
      { name: "Trường Đại học Luật Hà Nội" },
      { name: "Trường Đại học Luật TP.HCM" },
      { name: "Khoa Luật - ĐHQG Hà Nội" },
      { name: "Học viện Hành chính Quốc gia" },
      { name: "Trường Đại học Kinh tế - Luật - ĐHQG TP.HCM" }
    ]
  },
  {
    id: "ngonngu",
    major: "Ngôn ngữ / Sư phạm / Báo chí - Truyền thông",
    summary: "Giảng dạy, biên phiên dịch, sáng tạo nội dung, truyền thông báo chí.",
    scienceElective: "dia",
    universities: [
      { name: "Trường Đại học Ngoại ngữ - ĐHQG Hà Nội" },
      { name: "Trường Đại học Hà Nội (HANU)" },
      { name: "Trường Đại học Sư phạm Hà Nội" },
      { name: "Học viện Báo chí và Tuyên truyền" },
      { name: "Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQG TP.HCM" }
    ]
  },
  {
    id: "dulich",
    major: "Du lịch / Quản trị Khách sạn - Dịch vụ",
    summary: "Tổ chức du lịch, quản lý khách sạn - nhà hàng, chăm sóc trải nghiệm khách hàng.",
    scienceElective: "dia",
    universities: [
      { name: "Trường Đại học Kinh tế Quốc dân (Khoa Du lịch và Khách sạn)" },
      { name: "Trường Đại học Hà Nội" },
      { name: "Trường Đại học Khoa học Xã hội và Nhân văn TP.HCM" },
      { name: "Trường Đại học Văn Lang" },
      { name: "Trường Đại học Duy Tân" }
    ]
  },
  {
    id: "kientruc",
    major: "Kiến trúc / Xây dựng / Quy hoạch Đô thị",
    summary: "Thiết kế công trình, quy hoạch không gian sống và phát triển đô thị.",
    scienceElective: "hoa",
    universities: [
      { name: "Trường Đại học Kiến trúc Hà Nội" },
      { name: "Trường Đại học Xây dựng Hà Nội" },
      { name: "Trường Đại học Kiến trúc TP.HCM" },
      { name: "Trường Đại học Bách khoa - ĐHQG TP.HCM" },
      { name: "Trường Đại học Giao thông Vận tải" }
    ]
  }
];

// category: "ability" (năng lực) | "interest" (sở thích) | "social" (nhu cầu xã hội) | "activity" (hoạt động thực tế)
const QUESTIONS = [
  // CNTT
  { id: "cntt_1", cluster: "cntt", category: "ability", text: "Em học tốt và cảm thấy dễ dàng với môn Toán, đặc biệt là tư duy logic, giải thuật." },
  { id: "cntt_2", cluster: "cntt", category: "interest", text: "Em thích tìm hiểu về lập trình, ứng dụng công nghệ, trí tuệ nhân tạo hoặc thiết kế phần mềm." },
  { id: "cntt_3", cluster: "cntt", category: "social", text: "Em nhận thấy ngành công nghệ thông tin đang có nhu cầu nhân lực rất lớn, cơ hội việc làm rộng mở." },
  { id: "cntt_4", cluster: "cntt", category: "activity", text: "Em thích tự mày mò, sửa chữa máy tính, làm ra sản phẩm số (web, app, game) khi rảnh rỗi." },

  // Kỹ thuật
  { id: "kythuat_1", cluster: "kythuat", category: "ability", text: "Em học tốt các môn Toán và Vật lý, thích tính toán các bài toán kỹ thuật, cơ học." },
  { id: "kythuat_2", cluster: "kythuat", category: "interest", text: "Em thích tìm hiểu về máy móc, robot, ô tô, hệ thống điện - tự động hóa." },
  { id: "kythuat_3", cluster: "kythuat", category: "social", text: "Em biết rằng ngành công nghiệp, sản xuất, kỹ thuật đang cần nhiều kỹ sư giỏi tại Việt Nam." },
  { id: "kythuat_4", cluster: "kythuat", category: "activity", text: "Em thích tháo lắp, chế tạo, thực hành với các thiết bị máy móc, điện tử." },

  // Y dược
  { id: "yduoc_1", cluster: "yduoc", category: "ability", text: "Em học tốt và yêu thích môn Sinh học, Hóa học, có khả năng ghi nhớ kiến thức tốt." },
  { id: "yduoc_2", cluster: "yduoc", category: "interest", text: "Em mong muốn được chăm sóc, chữa bệnh, giúp đỡ sức khỏe cho người khác." },
  { id: "yduoc_3", cluster: "yduoc", category: "social", text: "Em hiểu rằng ngành Y - Dược luôn cần nhân lực và đóng vai trò quan trọng với sức khỏe cộng đồng." },
  { id: "yduoc_4", cluster: "yduoc", category: "activity", text: "Em kiên nhẫn, tỉ mỉ, không ngại các công việc liên quan đến cơ thể người, thuốc, xét nghiệm." },

  // Sinh học - Nông nghiệp - Môi trường
  { id: "sinhhoc_1", cluster: "sinhhoc", category: "ability", text: "Em học tốt môn Sinh học, Hóa học và thích tìm hiểu về thế giới tự nhiên, sinh vật." },
  { id: "sinhhoc_2", cluster: "sinhhoc", category: "interest", text: "Em quan tâm đến vấn đề môi trường, nông nghiệp công nghệ cao, phát triển bền vững." },
  { id: "sinhhoc_3", cluster: "sinhhoc", category: "social", text: "Em nhận thấy nhu cầu về nhân lực nông nghiệp công nghệ cao, bảo vệ môi trường đang tăng." },
  { id: "sinhhoc_4", cluster: "sinhhoc", category: "activity", text: "Em thích làm thí nghiệm, quan sát, nghiên cứu về cây trồng, vật nuôi, hệ sinh thái." },

  // Kinh doanh
  { id: "kinhdoanh_1", cluster: "kinhdoanh", category: "ability", text: "Em học tốt môn Toán, có khả năng tính toán, phân tích số liệu và lập kế hoạch." },
  { id: "kinhdoanh_2", cluster: "kinhdoanh", category: "interest", text: "Em thích kinh doanh, buôn bán, xây dựng thương hiệu, tổ chức sự kiện, quảng cáo sản phẩm." },
  { id: "kinhdoanh_3", cluster: "kinhdoanh", category: "social", text: "Em nhận thấy nền kinh tế Việt Nam đang phát triển, cần nhiều nhân lực kinh doanh, thương mại, logistics." },
  { id: "kinhdoanh_4", cluster: "kinhdoanh", category: "activity", text: "Em thích lập kế hoạch, đàm phán, thuyết trình và làm việc với con số, thị trường." },

  // Luật
  { id: "luat_1", cluster: "luat", category: "ability", text: "Em học tốt môn Ngữ văn, Giáo dục Kinh tế và Pháp luật, có khả năng lập luận chặt chẽ." },
  { id: "luat_2", cluster: "luat", category: "interest", text: "Em quan tâm đến pháp luật, công lý, các vấn đề xã hội và quản lý nhà nước." },
  { id: "luat_3", cluster: "luat", category: "social", text: "Em nhận thấy xã hội luôn cần người am hiểu pháp luật để bảo vệ quyền lợi công dân, doanh nghiệp." },
  { id: "luat_4", cluster: "luat", category: "activity", text: "Em thích tranh luận, phân tích tình huống, bảo vệ quan điểm bằng lý lẽ." },

  // Ngôn ngữ - Sư phạm - Truyền thông
  { id: "ngonngu_1", cluster: "ngonngu", category: "ability", text: "Em học tốt môn Ngữ văn, Ngoại ngữ và có khả năng diễn đạt, viết lách tốt." },
  { id: "ngonngu_2", cluster: "ngonngu", category: "interest", text: "Em thích viết bài, dịch thuật, giảng dạy, làm truyền thông hoặc học ngôn ngữ mới." },
  { id: "ngonngu_3", cluster: "ngonngu", category: "social", text: "Em nhận thấy xã hội cần nhiều giáo viên, biên phiên dịch, người làm truyền thông giỏi." },
  { id: "ngonngu_4", cluster: "ngonngu", category: "activity", text: "Em thích đọc sách, viết, thuyết trình trước đám đông hoặc tạo nội dung trên mạng xã hội." },

  // Du lịch
  { id: "dulich_1", cluster: "dulich", category: "ability", text: "Em học tốt môn Địa lý, hiểu biết về các vùng miền, văn hóa, danh lam thắng cảnh." },
  { id: "dulich_2", cluster: "dulich", category: "interest", text: "Em thích khám phá những vùng đất mới, tìm hiểu văn hóa, tổ chức các chuyến đi, sự kiện." },
  { id: "dulich_3", cluster: "dulich", category: "social", text: "Em nhận thấy ngành du lịch - dịch vụ Việt Nam đang phát triển mạnh và cần nhiều nhân lực." },
  { id: "dulich_4", cluster: "dulich", category: "activity", text: "Em thích giao tiếp, hướng dẫn, chăm sóc và tạo trải nghiệm tốt cho người khác." },

  // Kiến trúc - Xây dựng
  { id: "kientruc_1", cluster: "kientruc", category: "ability", text: "Em học tốt môn Toán, Vật lý và có năng khiếu vẽ, tưởng tượng không gian tốt." },
  { id: "kientruc_2", cluster: "kientruc", category: "interest", text: "Em thích thiết kế nhà cửa, công trình, quy hoạch không gian sống, đô thị." },
  { id: "kientruc_3", cluster: "kientruc", category: "social", text: "Em nhận thấy tốc độ đô thị hóa ở Việt Nam nhanh, cần nhiều kiến trúc sư, kỹ sư xây dựng." },
  { id: "kientruc_4", cluster: "kientruc", category: "activity", text: "Em thích vẽ, phác thảo ý tưởng, sử dụng phần mềm thiết kế hoặc lắp ráp mô hình." }
];

// Các phát biểu đánh giá trực tiếp cảm nhận với môn Hóa học / Địa lý
const ELECTIVE_QUESTIONS = [
  { id: "hoa_1", subject: "hoa", text: "Em cảm thấy môn Hóa học thú vị, dễ hiểu và học tốt các phản ứng, công thức hóa học." },
  { id: "hoa_2", subject: "hoa", text: "Em thích làm thí nghiệm, tính toán định lượng trong môn Hóa học." },
  { id: "dia_1", subject: "dia", text: "Em cảm thấy môn Địa lý thú vị, dễ hiểu và học tốt về bản đồ, khí hậu, kinh tế - xã hội các vùng miền." },
  { id: "dia_2", subject: "dia", text: "Em thích tìm hiểu về dân số, kinh tế, môi trường và các vùng miền qua môn Địa lý." }
];

const LIKERT_LABELS = [
  "Hoàn toàn không đồng ý",
  "Không đồng ý",
  "Bình thường",
  "Đồng ý",
  "Hoàn toàn đồng ý"
];

const SECTION_GROUPS = [
  { title: "1. Công nghệ thông tin & Kỹ thuật số", clusters: ["cntt"] },
  { title: "2. Kỹ thuật - Cơ khí - Điện - Tự động hóa", clusters: ["kythuat"] },
  { title: "3. Y - Dược - Sức khỏe", clusters: ["yduoc"] },
  { title: "4. Công nghệ Sinh học - Nông nghiệp - Môi trường", clusters: ["sinhhoc"] },
  { title: "5. Kinh doanh - Marketing - Logistics", clusters: ["kinhdoanh"] },
  { title: "6. Luật - Hành chính - Chính trị", clusters: ["luat"] },
  { title: "7. Ngôn ngữ - Sư phạm - Truyền thông", clusters: ["ngonngu"] },
  { title: "8. Du lịch - Khách sạn - Dịch vụ", clusters: ["dulich"] },
  { title: "9. Kiến trúc - Xây dựng - Quy hoạch đô thị", clusters: ["kientruc"] }
];
