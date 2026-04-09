/* =============================================
   BẢN TIN TỔNG HỢP - script.js
   v2.1 – Fix: 3 tin, auto-refresh 1h, dedup,
          Bác Hồ fallback nội bộ, pháp luật đúng ngày/tuần
   ============================================= */

// ── DỮ LIỆU PHÁP LUẬT ──────────────────────────────────────────
const PHAPLUAT_DATA = {"daily": {"01/01/2026": {"question": "Đồng chí cho biết Nghị định 15/2020/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực bưu chính, viễn thông, tần số vô tuyến điện, công nghệ thông tin và giao dịch điện tử gồm mấy chương, mấy điều?", "answer": "Gồm 9 chương, 124 điều."}, "02/01/2026": {"question": "Đồng chí cho biết, theo Điều 5 của Nghị định 15/2020/NĐ-CP, đối với hành vi thông báo không đúng với cơ quan nhà nước có thẩm quyền về bưu chính khi có thay đổi liên quan đến Giấy phép bưu chính theo quy định của pháp luật thì bị phạt như thế nào?", "answer": "Theo khoản 1, Điều 5 của Nghị định 15/2020/NĐ-CP, bị phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng."}, "03/01/2026": {"question": "Đồng chí cho biết, theo Điều 5 của Nghị định 15/2020/NĐ-CP, đối với hành vi không thông báo với cơ quan nhà nước có thẩm quyền về bưu chính khi có thay đổi liên quan đến Giấy phép bưu chính theo quy định của pháp luật thì bị phạt như thế nào?", "answer": "Theo khoản 2, Điều 5 của Nghị định 15/2020/NĐ-CP, bị phạt tiền từ 5.000.000 đồng đến 7.000.000 đồng."}, "04/01/2026": {"question": "Đồng chí cho biết, theo Điều 6 của Nghị định 15/2020/NĐ-CP, đối với hành vi thông báo không đúng với cơ quan nhà nước có thẩm quyền về bưu chính khi có thay đổi liên quan đến văn bản xác nhận thông báo hoạt động bưu chính thì bị phạt như thế nào?", "answer": "Theo khoản 1, Điều 6 của Nghị định 15/2020/NĐ-CP, bị phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng."}, "05/01/2026": {"question": "Đồng chí cho biết, theo Điều 7 của Nghị định 15/2020/NĐ-CP, đối với hành vi sử dụng không đúng dấu ngày hoặc thể hiện không chính xác thông tin về thời gian, địa điểm chấp nhận bưu gửi trên hợp đồng hoặc chứng từ xác nhận việc chấp nhận bưu gửi  thì bị phạt như thế nào?", "answer": "Theo khoản 1, Điều 7 của Nghị định 15/2020/NĐ-CP, bị phạt tiền từ 1.000.000 đồng đến 3.000.000 đồng."}, "06/01/2026": {"question": "Đồng chí cho biết theo Luật tố cáo thì những trường hợp nào không thụ lý giải quyết?", "answer": "Theo khoản 2, điểu 20 Người có thẩm quyền không thụ lý giải quyết tố cáo trong các trường hợp sau đây:\n- Tố cáo về vụ việc đã được người đó giải quyết mà người tố cáo không cung cấp thông tin, tình tiết mới;\n- Tố cáo về vụ việc mà nội dung và những thông tin người tố cáo cung cấp không có cơ sở để xác định người vi phạm, hành vi vi phạm pháp luật;\n- Tố cáo về vụ việc mà người có thẩm quyền giải quyết tố cáo không đủ điều kiện để kiểm tra, xác minh hành vi vi phạm pháp luật, người vi phạm."}, "07/01/2026": {"question": "Đồng chí cho biết theo Luật tố cáo Chánh thanh tra Bộ, cơ quan ngang Bộ, Chánh thanh tra tỉnh, thành phố trực thuộc trung ương, Chánh thanh tra sở, Chánh thanh tra huyện, quận, thị xã, thành phố thuộc tỉnh có trách nhiệm như thế nào?", "answer": "Theo khoản 1, điều 23 Luật tố cáo quy định: Chánh thanh tra Bộ, cơ quan ngang Bộ, Chánh thanh tra tỉnh, thành phố trực thuộc trung ương, Chánh thanh tra sở, Chánh thanh tra huyện, quận, thị xã, thành phố thuộc tỉnh có trách nhiệm sau đây:\n- Xác minh nội dung tố cáo, kết luận nội dung xác minh, kiến nghị biện pháp xử lý tố cáo thuộc thẩm quyền giải quyết của người đứng đầu cơ quan hành chính nhà nước cùng cấp khi được giao;\n- Xem xét, kết luận việc giải quyết tố cáo mà người đứng đầu cơ quan cấp dưới trực tiếp của người đứng đầu cơ quan hành chính nhà nước cùng cấp đã giải quyết nhưng có dấu hiệu vi phạm pháp luật; trường hợp có căn cứ cho rằng việc giải quyết tố cáo có vi phạm pháp luật thì kiến nghị người đứng đầu cơ quan hành chính nhà nước cùng cấp xem xét, giải quyết lại."}, "08/01/2026": {"question": "Đồng chí cho biết theo Luật tố cáo Tổng Thanh tra Chính phủ có trách nhiệm như thế nào?", "answer": "Theo khoản 1, điều 23 Luật tố cáo quy định: Tổng Thanh tra Chính phủ có trách nhiệm sau đây:\n- Xác minh nội dung tố cáo, kết luận nội dung xác minh, kiến nghị biện pháp xử lý tố cáo thuộc thẩm quyền giải quyết của Thủ tướng Chính phủ khi được giao;\n- Xem xét, kết luận việc giải quyết tố cáo mà Bộ trưởng, Thủ trưởng cơ quan ngang Bộ, Thủ trưởng cơ quan thuộc Chính phủ, Chủ tịch Ủy ban nhân dân cấp tỉnh đã giải quyết nhưng có dấu hiệu vi phạm pháp luật; trường hợp kết luận việc giải quyết có vi phạm pháp luật thì kiến nghị Thủ tướng Chính phủ xem xét, giải quyết lại."}, "09/01/2026": {"question": "Đồng chí cho biết theo Luật tố cáo quy định kết luận tố cáo cần đạt được những nội dung nào?", "answer": "Theo điều 24, Luật tố cáo quy định về Kết luận nội dung tố cáo như sau :\n- Căn cứ vào nội dung tố cáo, văn bản giải trình của người bị tố cáo, kết quả xác minh nội dung tố cáo, tài liệu, chứng cứ có liên quan, người giải quyết tố cáo phải kết luận bằng văn bản về nội dung tố cáo.\n- Kết luận nội dung tố cáo phải có các nội dung sau đây:\n+ Kết quả xác minh nội dung tố cáo;\n+ Kết luận việc tố cáo đúng, đúng một phần hoặc sai; xác định trách nhiệm của từng cá nhân về những nội dung tố cáo đúng hoặc đúng một phần;\n+ Các biện pháp xử lý theo thẩm quyền; kiến nghị biện pháp xử lý với cơ quan, tổ chức, cá nhân có thẩm quyền (nếu có)."}, "10/01/2026": {"question": "Đồng chí cho biết theo Luật tố cáo quy định về việc tố cáo tiếp như thế nào?", "answer": "Theo điều 27, Luật tố cáo quy định việc tố cáo tiếp cụ thể như sau:\nTrường hợp quá thời hạn quy định mà tố cáo không được giải quyết hoặc có căn cứ cho rằng việc giải quyết tố cáo là không đúng pháp luật thì người tố cáo có quyền tố cáo tiếp với người đứng đầu cơ quan cấp trên trực tiếp của người có trách nhiệm giải quyết tố cáo."}, "11/01/2026": {"question": "Đồng chí cho biết, Luật tố cáo quy định về Trách nhiệm của cơ quan điều tra, Viện kiểm sát khi nhận được tố cáo hoặc hồ sơ vụ việc tố cáo có dấu hiệu tội phạm cụ thể như thế nào?", "answer": "Theo điều 28, Luật tố cáo quy định trách nhiệm của cơ quan điều tra, Viện kiểm sát khi nhận được tố cáo hoặc hồ sơ vụ việc tố cáo có dấu hiệu tội phạm như sau:\nTrong thời hạn 20 ngày, kể từ ngày nhận được tố cáo hoặc hồ sơ vụ việc tố cáo theo quy định tại khoản 3 Điều 20, khoản 3 Điều 25 của Luật này, cơ quan điều tra, Viện kiểm sát phải thông báo bằng văn bản về việc thụ lý, xử lý cho cơ quan, tổ chức chuyển tố cáo hoặc hồ sơ vụ việc tố cáo biết; trường hợp tố cáo có nội dung phức tạp thì thời hạn thông báo có thể kéo dài hơn, nhưng không quá 60 ngày."}, "12/01/2026": {"question": "Đồng chí cho biết, Luật tố cáo quy định về việc công khai kết luận nội dung tố cáo, và quyết định xử lý hành vi vi phạm bị tố cáo bằng hình thức nào?", "answer": "Người giải quyết tố cáo có trách nhiệm công khai kết luận nội dung tố cáo, quyết định xử lý hành vi vi phạm bị tố cáo bằng một trong các hình thức sau đây:\n- Công bố tại cuộc họp cơ quan, tổ chức nơi người bị tố cáo công tác;\n- Niêm yết tại trụ sở làm việc hoặc nơi tiếp công dân của cơ quan, tổ chức đã giải quyết tố cáo, quyết định xử lý hành vi vi phạm bị tố cáo;\n- Thông báo trên phương tiện thông tin đại chúng."}, "13/01/2026": {"question": "Đồng chí cho biết, Luật tố cáo quy định về phạm vi, đối tượng và thời hạn bảo vệ người tố cáo như thế nào?", "answer": "Theo điều 34. Luật tố cáo quy định phạm vi, đối tượng và thời hạn bảo vệ của người tố cáo cụ thể như sau:\n- Việc bảo vệ người tố cáo được thực hiện tại nơi cư trú, công tác, làm việc, học tập, nơi có tài sản của người cần được bảo vệ hoặc những nơi khác do cơ quan có thẩm quyền quyết định.\n- Đối tượng bảo vệ gồm có:\n+ Người tố cáo;\n+ Người thân thích của người tố cáo.\n- Thời hạn bảo vệ do cơ quan có thẩm quyền quyết định tùy thuộc vào tình hình thực tế của từng vụ việc, mức độ, tính chất của hành vi xâm phạm đến quyền và lợi ích hợp pháp của đối tượng cần được bảo vệ."}, "14/01/2026": {"question": "Đồng chí cho biết theo Luật tố cáo quy định các biện pháp bảo việ người tố cáo và người thân thích của họ như thế nào?", "answer": "Theo khoản 3, điểu 39 Luật tố cáo quy định các biện pháp sau đây: \n- Bố trí nơi tạm lánh khi người tố cáo, người thân thích của họ có nguy cơ bị xâm phạm đến tính mạng, sức khỏe;\n- Bố trí lực lượng, phương tiện, công cụ để trực tiếp bảo vệ an toàn tính mạng, sức khỏe, tài sản, danh dự, nhân phẩm, uy tín cho người tố cáo và người thân thích của họ tại nơi cần thiết;\n- Áp dụng biện pháp ngăn chặn, xử lý hành vi xâm hại hoặc đe dọa xâm hại đến tính mạng, sức khỏe, tài sản, danh dự, nhân phẩm, uy tín của người tố cáo và người thân thích của người tố cáo theo quy định của pháp luật;\n- Các biện pháp bảo vệ khác theo quy định của pháp luật."}, "15/01/2026": {"question": "Đồng chí cho biết theo Luật tố cáo quy định về trách nhiệm của cơ quan quản lý nhà nước về công tác giải quyết tố cáo?", "answer": "Theo điều 41, Luật tố cáo quy định Trách nhiệm của cơ quan quản lý nhà nước về công tác giải quyết tố cáo:\n- Chính phủ thống nhất quản lý nhà nước về công tác giải quyết tố cáo trong các cơ quan hành chính nhà nước trong phạm vi cả nước.\n- Thanh tra Chính phủ chịu trách nhiệm trước Chính phủ thực hiện quản lý nhà nước về công tác giải quyết tố cáo trong phạm vi thẩm quyền của Chính phủ.\n- Thanh tra Bộ, cơ quan ngang Bộ, Thanh tra tỉnh, thành phố trực thuộc trung ương, Thanh tra sở, Thanh tra huyện, quận, thị xã, thành phố thuộc tỉnh giúp người đứng đầu cơ quan quản lý nhà nước cùng cấp quản lý công tác giải quyết tố cáo."}, "16/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô dưới 16 tuổi sẽ bị xử phạt như thế nào?", "answer": "Theo khoản 1, Điều 21 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô dưới 16 tuổi sẽ bị xử phạt Cảnh cáo."}, "17/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô từ 16 tuổi đến dưới 18 tuổi điều khiển xe mô tô từ 50cm3 trở lên sẽ bị xử phạt như thế nào?", "answer": "Theo điểm a, khoản 4, Điều 21 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô từ 16 tuổi đến dưới 18 tuổi điều khiển xe mô tô từ 50cm3 trở lên sẽ bị xử phạt từ 400.000 - 600.000đ"}, "18/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô dưới 175cm3 không có GPLX, sử dụng GPLX không do cơ quan có thẩm quyền cấp, GPLX hoặc bị tẩy xóa sẽ bị xử phạt như thế nào?", "answer": "Theo khoản 5, Điều 21 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô dưới 175cm3 không có GPLX, sử dụng GPLX không do cơ quan có thẩm quyền cấp, GPLX hoặc bị tẩy xóa sẽ bị xử phạt từ 800.000 - 1,2 triệu đồng; tịch thu GPLX không hợp lệ"}, "19/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô từ 175cm3 trở lên không có GPLX, sử dụng GPLX không do cơ quan có thẩm quyền cấp hoặc bị tẩy xóa sẽ bị xử phạt như thế nào?", "answer": "Theo điểm b, khoản 7, Điều 21 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô từ 175cm3 trở lên không có GPLX, sử dụng GPLX không do cơ quan có thẩm quyền cấp, GPLX hoặc bị tẩy xóa sẽ bị xử phạt từ 4 - 6 triệu đồng; tịch thu GPLX không hợp lệ."}, "20/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô từ 175cm3 trở lên có GPLX nhưng không phù hợp với loại xe đang điều khiển hoặc hết hạn sử dụng 6 tháng trở lên sẽ bị xử phạt như thế nào?", "answer": "Theo điểm a, khoản 7, Điều 21 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô từ175cm3 trở lên có GPLX nhưng không phù hợp với loại xe đang điều khiển hoặc hết hạn sử dụng 6 tháng trở lên sẽ bị xử phạt từ 4 - 6 triệu đồng;"}, "21/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô không mang theo Giấy phép lái xe sẽ bị xử phạt như thế nào?", "answer": "Theo điểm c, khoản 2, Điều 21 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô không mang theo Giấy phép lái xe sẽ bị xử phạt từ 80.000đ - 120.000đ."}, "22/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô không mang theo Giấy đăng ký xe sẽ bị xử phạt như thế nào?", "answer": "Theo điểm a, khoản 3, Điều 21 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô không mang theo Giấy đăng ký xe sẽ bị xử phạt từ 80.000đ - 120.000đ."}, "23/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô không có Giấy đăng ký xe sẽ bị xử phạt như thế nào?", "answer": "Theo điểm a, khoản 3, Điều 17 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô không có Giấy đăng ký xe sẽ bị xử phạt từ 300.000đ - 400.000đ"}, "24/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô sử dụng Giấy đăng ký xe bị tẩy xóa; không đúng số khung, số máy hoặc không do cơ quan có thẩm quyền cấp sẽ bị xử phạt như thế nào?", "answer": "Theo điểm b, khoản 3, Điều 17 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô sử dụng Giấy đăng ký xe bị tẩy xóa; không đúng số khung, số máy hoặc không do cơ quan có thẩm quyền cấp sẽ bị xử phạt từ 300.000đ - 400.000đ, tịch thu Giấy đăng ký không hợp lệ"}, "25/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô không có hoặc không mang theo Giấy chứng nhận bảo hiểm TNDS của chủ xe cơ giới sẽ bị xử phạt như thế nào?", "answer": "Theo điểm a, khoản 2, Điều 21 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô không có hoặc không mang theo Giấy chứng nhận bảo hiểm TNDS của chủ xe cơ giới sẽ bị xử phạt từ 80.000đ - 120.000đ."}, "26/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô chuyển làn đường không đúng nơi được phép hoặc không có tín hiệu báo trước sẽ bị xử phạt như thế nào?", "answer": "Theo điểm a, khoản 2, Điều 6 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô chuyển làn đường không đúng nơi được phép hoặc không có tín hiệu báo trước sẽ bị xử phạt từ 80.000đ - 100.000đ"}, "27/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô dừng xe, đỗ xe trên phần đường xe chạy ở đoạn đường ngoài đô thị nơi có lề đường sẽ bị kỷ luật như thế nào?", "answer": "Theo điểm a, khoản 3, Điều 6 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô dừng xe, đỗ xe trên phần đường xe chạy ở đoạn đường ngoài đô thị nơi có lề đường sẽ bị xử phạt từ 100.000 - 200.000đ (giữ GPLX 2 tháng nếu gây TNGT)"}, "28/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô dừng xe, đỗ xe ở lòng đường đô thị gây cản trở giao thông; đỗ, để xe ở lòng đường đô thị, hè phố trái quy định sẽ bị xử phạt như thế nào?", "answer": "Theo điểm đ, khoản 3, Điều 6 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô dừng xe, đỗ xe ở lòng đường đô thị gây cản trở giao thông; đỗ, để xe ở lòng đường đô thị, hè phố trái quy định sẽ bị xử phạt từ 100.000 - 200.000đ (giữ GPLX 2 tháng nếu gây TNGT)"}, "29/01/2026": {"question": "Đ/c cho biết theo Nghị định 171/2013/NĐ-CP của Chính phủ quy định về việc người điều khiển xe mô tô Chuyển hướng không giảm tốc độ hoặc không có tín hiệu báo hướng rẽ sẽ bị xử phạt như thế nào?", "answer": "Theo điểm a, khoản 4, Điều 6 Nghị định 171/2013/NĐ-CP của Chính phủ quy định người điều khiển xe mô tô Chuyển hướng không giảm tốc độ hoặc không có tín hiệu báo hướng rẽ sẽ bị xử phạt từ 200.000 - 400.000đ."}, "30/01/2026": {"question": "Đ/c cho biết theo Điều 2 Luật Tổ chức Chính phủ quy định cơ cấu tổ chức và thành viên của Chính phủ như thế nào?", "answer": "Theo 2 Luật Tổ chức Chính phủ quy định cơ cấu tổ chức và thành viên của Chính phủ:\n1. Chính phủ gồm Thủ tướng Chính phủ, các Phó Thủ tướng Chính phủ, các Bộ trưởng và Thủ trưởng cơ quan ngang bộ. Cơ cấu số lượng thành viên Chính phủ do Thủ tướng Chính phủ trình Quốc hội quyết định.\n2. Cơ cấu tổ chức của Chính phủ gồm các bộ, cơ quan ngang bộ."}, "31/01/2026": {"question": "Đ/c cho biết theo Điều 3 Luật Tổ chức Chính phủ quy định nhiệm kỳ của Chính phủ như thế nào?", "answer": "Theo Điều 3 Luật Tổ chức Chính phủ quy định Nhiệm kỳ của Chính phủ theo nhiệm kỳ của Quốc hội. Khi Quốc hội hết nhiệm kỳ, Chính phủ tiếp tục làm nhiệm vụ cho đến khi Quốc hội khóa mới thành lập Chính phủ."}, "01/02/2026": {"question": "Đ/c cho biết theo Điều 5 Luật Tổ chức Chính phủ quy định tổ chức và hoạt động của Chính phủ có bao nhiêu nguyên tắc?", "answer": "Theo Điều 5 Luật Tổ chức Chính phủ quy định tổ chức và hoạt động của Chính phủ có 5 nguyên tắc:\n1. Tuân thủ Hiến pháp và pháp luật, quản lý xã hội bằng Hiến pháp và pháp luật, thực hiện nguyên tắc tập trung dân chủ; bảo đảm bình đẳng giới.\n2. Phân định rõ nhiệm vụ, quyền hạn, trách nhiệm giữa Chính phủ, Thủ tướng Chính phủ với Bộ trưởng, Thủ trưởng cơ quan ngang bộ và chức năng, phạm vi quản lý giữa các bộ, cơ quan ngang bộ; đề cao trách nhiệm cá nhân của người đứng đầu.\n3. Tổ chức bộ máy hành chính tinh gọn, năng động, hiệu lực, hiệu quả; bảo đảm nguyên tắc cơ quan cấp dưới phục tùng sự lãnh đạo, chỉ đạo và chấp hành nghiêm chỉnh các quyết định của cơ quan cấp trên.\n4. Phân cấp, phân quyền hợp lý giữa Chính phủ với chính quyền địa phương, bảo đảm quyền quản lý thống nhất của Chính phủ và phát huy tính chủ động, sáng tạo, tự chịu trách nhiệm của chính quyền địa phương.\n5. Minh bạch, hiện đại hóa hoạt động của Chính phủ, các bộ, cơ quan ngang bộ, cơ quan hành chính nhà nước các cấp; bảo đảm thực hiện một nền hành chính thống nhất, thông suốt, liên tục, dân chủ, hiện đại, phục vụ Nhân dân, chịu sự kiểm tra, giám sát của Nhân dân."}, "02/02/2026": {"question": "Đ/c cho biết theo Điều 6 Luật Tổ chức Chính phủ quy định Chính phủ trong tổ chức thi hành Hiến pháp và pháp luật có bao nhiêu nhiệm vụ và quyền hạn?", "answer": "Theo Điều 6 Luật Tổ chức Chính phủ quy định Chính phủ trong tổ chức thi hành Hiến pháp và pháp luật có 4 nhiệm vụ và quyền hạn."}, "03/02/2026": {"question": "Đ/c cho biết theo Điều 7 Luật Tổ chức Chính phủ quy định Chính phủ trong hoạch định chính sách và trình dự án luật, pháp lệnh có bao nhiêu nhiệm vụ và quyền hạn?", "answer": "Theo Điều 7 Luật Tổ chức Chính phủ quy định Chính phủ trong hoạch định chính sách và trình dự án luật, pháp lệnh có 4 nhiệm vụ và quyền hạn."}, "04/02/2026": {"question": "Đ/c cho biết theo Điều 8 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý và phát triển kinh tế có bao nhiêu nhiệm vụ và quyền hạn?", "answer": "Theo Điều 8 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý và phát triển kinh tế có 8 nhiệm vụ và quyền hạn."}, "05/02/2026": {"question": "Đ/c cho biết theo Điều 9 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý tài nguyên, môi trường và ứng phó với biến đổi khí hậu có bao nhiêu nhiệm vụ và quyền hạn?", "answer": "Theo Điều 9 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý tài nguyên, môi trường và ứng phó với biến đổi khí hậu có 5 nhiệm vụ và quyền hạn."}, "06/02/2026": {"question": "Đ/c cho biết theo Điều 10 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý khoa học và công nghệ có bao nhiêu nhiệm vụ và quyền hạn?", "answer": "Theo Điều 10 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý khoa học và công nghệ có 5 nhiệm vụ và quyền hạn."}, "07/02/2026": {"question": "Đ/c cho biết theo Điều 11 Luật Tổ chức Chính phủ quy định Chính phủ trong giáo dục và đào tạo có bao nhiêu nhiệm vụ và quyền hạn?", "answer": "Theo Điều 11 Luật Tổ chức Chính phủ quy định Chính phủ trong giáo dục và đào tạo có 4 nhiệm vụ và quyền hạn."}, "08/02/2026": {"question": "Đ/c cho biết theo Điều 12 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý văn hóa, thể thao và du lịch có bao nhiêu nhiệm vụ và quyền hạn?", "answer": "Theo Điều 12 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý văn hóa, thể thao và du lịch có 4 nhiệm vụ và quyền hạn."}, "09/02/2026": {"question": "Đ/c cho biết theo Điều 13 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý thông tin và truyền thông có bao nhiêu nhiệm vụ và quyền hạn?", "answer": "Theo Điều 13 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý thông tin và truyền thông có 4 nhiệm vụ và quyền hạn."}, "10/02/2026": {"question": "Đ/c cho biết theo Điều 14 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý y tế, chăm sóc sức khỏe của Nhân dân và dân số có bao nhiêu nhiệm vụ và quyền hạn?", "answer": "Theo Điều 14 Luật Tổ chức Chính phủ quy định Chính phủ trong quản lý y tế, chăm sóc sức khỏe của Nhân dân và dân số có 5 nhiệm vụ và quyền hạn."}, "08/04/2026": {"question": "Đ/c cho biết theo quy định thời gian bảo quản VKTBKT khí tài hàng tuần là bao nhiêu phút?", "answer": "Theo quy định thời gian bảo quản VKTBKT khí tài hàng tuần là: VKTB bảo quản 30 phút, VKTBKT khác, khí tài phức tạp bảo quản từ 3 đến 4 giờ, thời gian bảo quản vào ngày làm việc cuối tuần."}}, "weekly": {"Tuần 1 tháng 1": "Điều 35, Điều lệnh quản lý bộ đội, quy định về \"Chức trách, nhiệm vụ của chiến sĩ\"\n1. Hiểu biết và thực hiện đúng nghĩa vụ, trách nhiệm, vinh dự của người chiến sĩ trong quân đội.\n2. Rèn luyện bản lĩnh chiến đấu, rèn luyện thể lực, tích cực học tập để nâng cao trình độ về mọi mặt. Dũng cảm không sợ gian khổ, hy sinh, kiên quyết hoàn thành mọi nhiệm vụ.\n3. Giữ tốt và sử dụng thành thạo các loại vũ khí, trang bị, quân trang và dụng cụ được giao. Có nhiệm vụ bảo vệ tài sản chung.\n4. Tự giác chấp hành nghiêm kỷ luật quân đội và mệnh lệnh, chỉ thị của cấp trên, pháp luật của Nhà nước.\n5. Tích cực xây dựng đơn vị, đoàn kết thương yêu đồng chí, đồng đội, tôn trọng cấp trên, tôn trọng và giúp đỡ nhân dân.", "Tuần 2 tháng 4": "Điều 332 Bộ Luật Hình sự năm 2015 \"Tội vi phạm các quy định về bảo đảm an toàn trong chiến đấu hoặc trong huấn luyện\"\n1. Người nào không chấp hành nghiêm chỉnh những quy định bảo đảm an toàn trong chiến đấu hoặc trong huấn luyện gây hậu quả nghiêm trọng, thì bị phạt cải tạo không giam giữ đến ba năm hoặc phạt tù từ một năm đến năm năm.\n2. Phạm tội gây hậu quả rất nghiêm trọng hoặc đặc biệt nghiêm trọng, thì bị phạt tù từ ba năm đến mười năm.", "Tuần 3 tháng 4": "Điều 333 Bộ Luật Hình sự năm 2015 \"Tội vi phạm các quy định về sử dụng vũ khí quân dụng\" \n1. Người nào vi phạm các quy định về sử dụng vũ khí quân dụng gây hậu quả nghiêm trọng, thì bị phạt cải tạo không giam giữ đến ba năm hoặc phạt tù từ sáu tháng đến năm năm.\n2. Phạm tội trong khu vực có chiến sự hoặc gây hậu quả rất nghiêm trọng hoặc đặc biệt nghiêm trọng, thì bị phạt tù từ ba năm đến mười năm.", "Tuần 4 tháng 4": "Điều 334 Bộ Luật Hình sự năm 2015 \"Tội huỷ hoại vũ khí quân dụng, phương tiện kỹ thuật quân sự\" \n1. Người nào hủy hoại vũ khí quân dụng, phương tiện kỹ thuật quân sự, nếu không thuộc trường hợp quy định tại Điều 85 và Điều 231 của Bộ luật này, thì bị phạt tù từ hai năm đến bảy năm.\n2. Phạm tội trong chiến đấu, trong khu vực có chiến sự hoặc gây hậu quả nghiêm trọng, thì bị phạt tù từ năm năm đến mười hai năm.\n3. Phạm tội gây hậu quả rất nghiêm trọng thì bị phạt tù từ mười năm đến hai mươi năm.\n4. Phạm tội gây hậu quả đặc biệt nghiêm trọng thì bị phạt tù hai mươi năm, tù chung thân hoặc tử hình."}};

// ── DỮ LIỆU BÁC HỒ DẠY (fallback nội bộ) ──────────────────────
// Dùng khi không fetch được từ mạng. Key: "DD/MM" (không năm)
const BACH_HO_FALLBACK = {
  "09/04": "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công. Muốn xây dựng thắng lợi chủ nghĩa xã hội, trước hết cần có những con người xã hội chủ nghĩa.",
  "10/04": "Học hỏi là một việc phải tiếp tục suốt đời. Suốt đời phải gắn liền lý luận với công tác thực tế. Không ai có thể tự cho mình đã biết đủ rồi, biết hết rồi.",
  "11/04": "Dân ta phải biết sử ta. Cho tường gốc tích nước nhà Việt Nam. Tiên học lễ, hậu học văn.",
  "12/04": "Nhiệm vụ của thanh niên không phải là hỏi nước nhà đã cho mình những gì. Mà phải tự hỏi mình đã làm gì cho nước nhà.",
  "13/04": "Không có việc gì khó, chỉ sợ lòng không bền. Đào núi và lấp biển, quyết chí ắt làm nên.",
  "14/04": "Muốn xây dựng chủ nghĩa xã hội, trước hết cần có những con người xã hội chủ nghĩa. Con người xã hội chủ nghĩa là con người có đạo đức cách mạng.",
  "15/04": "Đảng viên đi trước, làng nước theo sau. Cán bộ là cái gốc của mọi công việc. Vì vậy, huấn luyện cán bộ là công việc gốc của Đảng.",
  "16/04": "Quân đội ta trung với Đảng, hiếu với dân, sẵn sàng chiến đấu hy sinh vì độc lập, tự do của Tổ quốc, vì chủ nghĩa xã hội. Nhiệm vụ nào cũng hoàn thành, khó khăn nào cũng vượt qua, kẻ thù nào cũng đánh thắng.",
  "17/04": "Thi đua là yêu nước, yêu nước thì phải thi đua. Và những người thi đua là những người yêu nước nhất.",
  "18/04": "Mỗi người dân Việt Nam, bất kỳ già, trẻ, trai, gái; bất kỳ giàu, nghèo, lớn, nhỏ đều cần phải trở nên một chiến sĩ tranh đấu trên mặt trận quân sự, kinh tế, chính trị, văn hóa.",
  "19/04": "Cán bộ là cái dây chuyền của bộ máy. Nếu dây chuyền không tốt, không chạy thì động cơ dù tốt, dù chạy toàn bộ máy cũng tê liệt.",
  "20/04": "Có tài mà không có đức là người vô dụng. Có đức mà không có tài thì làm việc gì cũng khó.",
  "21/04": "Bộ đội phải thương yêu dân như cha mẹ, anh em ruột thịt của mình. Dân tin, dân phục, dân yêu bộ đội. Bộ đội tin, bộ đội phục, bộ đội yêu dân.",
  "22/04": "Lười biếng là kẻ địch của chữ kiên nhẫn. Kẻ thù lớn nhất của con người là sự lười biếng và hèn nhát.",
  "23/04": "Thanh niên bây giờ là một thế hệ vẻ vang vì các cháu được sinh ra và lớn lên trong thời đại anh hùng của đất nước ta.",
  "24/04": "Phải đặt quyền lợi của Đảng và của nhân dân lao động lên trên, lên trước quyền lợi riêng của cá nhân mình.",
  "25/04": "Đoàn kết là một truyền thống cực kỳ quý báu của Đảng và của dân ta. Các đồng chí từ Trung ương đến các chi bộ cần phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình.",
  "26/04": "Nhân dân có quyền đôn đốc và phê bình Chính phủ. Nếu Chính phủ làm hại dân thì dân có quyền đuổi Chính phủ.",
  "27/04": "Kháng chiến phải đi đôi với kiến quốc. Kháng chiến có thắng lợi thì kiến quốc mới thành công. Kiến quốc có chắc chắn thì kháng chiến mới mau thắng lợi.",
  "28/04": "Trung với nước, hiếu với dân. Nhiệm vụ nào cũng hoàn thành, khó khăn nào cũng vượt qua, kẻ thù nào cũng đánh thắng.",
  "29/04": "Chúng ta không sợ sai lầm, nhưng đã nhận biết sai lầm thì phải ra sức sửa chữa. Vậy ai không phạm những sai lầm đó chứng tỏ mình không làm gì cả.",
  "30/04": "Nam Bắc sẽ sum họp một nhà. Bắc Nam thống nhất, non sông liền một dải. Đó là điều chắc chắn."
};

// ── CONSTANTS ─────────────────────────────────────────────────────
const RSS_API       = 'https://api.rss2json.com/v1/api.json?rss_url=';
const RSS_THEGIOI   = 'https://vnexpress.net/rss/the-gioi.rss';
const RSS_TRONGNUOC = 'https://vnexpress.net/rss/thoi-su.rss';
const PROXY_BAC_HO  = 'https://corsproxy.io/?url=';
const PROXY_BAC_HO2 = 'https://api.codetabs.com/v1/proxy?quest=';

// Cache để tránh lặp tin
const _newsCache = { world: new Set(), vietnam: new Set() };

// ── TIỆN ÍCH NGÀY THÁNG ────────────────────────────────────────
function getToday() {
  const d = new Date();
  const dd   = String(d.getDate()).padStart(2, '0');
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return { dd, mm, yyyy, full: `${dd}/${mm}/${yyyy}` };
}

function formatDateVN(date) {
  const days = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
  const d = new Date(date);
  return `${days[d.getDay()]}, ngày ${String(d.getDate()).padStart(2,'0')} tháng ${String(d.getMonth()+1).padStart(2,'0')} năm ${d.getFullYear()}`;
}

function getWeekOfMonth(day) {
  return Math.ceil(day / 7);
}

// ── KHỞI TẠO ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  document.getElementById('header-date').textContent = formatDateVN(now);
  document.getElementById('update-time').textContent =
    String(now.getHours()).padStart(2,'0') + ':' +
    String(now.getMinutes()).padStart(2,'0');

  loadWorldNews();
  loadVietnamNews();
  loadBacHo();
  loadPhapLuat();

  // ── FIX: Tự động cập nhật mỗi 1 giờ ──
  setInterval(() => {
    loadWorldNews();
    loadVietnamNews();
    // Cập nhật thời gian hiển thị
    const t = new Date();
    document.getElementById('update-time').textContent =
      String(t.getHours()).padStart(2,'0') + ':' +
      String(t.getMinutes()).padStart(2,'0');
  }, 60 * 60 * 1000); // 1 giờ
});

// ═══════════════════════════════════════════════════════════════
// PHẦN 2: TIN THẾ GIỚI
// ═══════════════════════════════════════════════════════════════
async function loadWorldNews() {
  await loadRSSNews('world-news', RSS_THEGIOI, 'tin thế giới', 'https://vnexpress.net/the-gioi', 'world');
}

// ═══════════════════════════════════════════════════════════════
// PHẦN 3: TIN TRONG NƯỚC
// ═══════════════════════════════════════════════════════════════
async function loadVietnamNews() {
  await loadRSSNews('vietnam-news', RSS_TRONGNUOC, 'tin trong nước', 'https://vnexpress.net/thoi-su', 'vietnam');
}

// ── HÀM CHÍNH: LẤY TIN QUA RSS API ───────────────────────────
// FIX 1: slice(0,3) thay vì slice(0,6) → chỉ 3 tin mới nhất
// FIX 2: dedup theo title để tránh lặp tin khi refresh
async function loadRSSNews(containerId, rssUrl, label, fallbackUrl, cacheKey) {
  const container = document.getElementById(containerId);
  try {
    const apiUrl = RSS_API + encodeURIComponent(rssUrl);
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (!data || data.status !== 'ok' || !Array.isArray(data.items) || data.items.length === 0) {
      throw new Error('Không có dữ liệu RSS');
    }

    // ── FIX: Chỉ lấy 3 tin, dedup theo title ──
    const seen = _newsCache[cacheKey];
    const articles = data.items
      .filter(item => item.title && item.title.length > 5)
      .filter(item => {
        // Cho phép tất cả khi cache trống (lần đầu load)
        if (seen.size === 0) return true;
        return !seen.has(item.title);
      })
      .slice(0, 3)
      .map(item => {
        const pubDate = item.pubDate ? new Date(item.pubDate) : null;
        seen.add(item.title); // Thêm vào cache
        return {
          title:       item.title || '',
          link:        item.link  || fallbackUrl,
          description: stripHtml(item.description || item.content || '').slice(0, 600),
          dateStr:     pubDate ? formatNewsDate(pubDate) : 'Hôm nay',
          timeAgo:     pubDate ? (Date.now() - pubDate.getTime()) : 0,
        };
      });

    // Nếu refresh không có tin mới → giữ nội dung cũ, không xóa
    if (!articles.length) return;

    renderNews(container, articles);

  } catch (err) {
    console.warn(`Lỗi tải ${label}:`, err);
    // Chỉ hiển thị lỗi nếu container chưa có tin (tránh xóa tin cũ)
    if (!container.querySelector('.news-list')) {
      container.innerHTML = `
        <div class="error-msg">
          <i class="fas fa-exclamation-circle"></i>
          <div>
            <strong>Không thể tải ${label}</strong><br/>
            <small>Vui lòng truy cập trực tiếp:
            <a href="${fallbackUrl}" target="_blank" style="color:inherit">${fallbackUrl}</a></small>
          </div>
        </div>`;
    }
  }
}

function formatNewsDate(date) {
  const diffMs  = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH   = Math.floor(diffMs / 3600000);
  if (diffMin < 60)  return `${diffMin} phút trước`;
  if (diffH   < 24)  return `${diffH} giờ trước`;
  if (diffH   < 48)  return 'Hôm qua';
  return `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}`;
}

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function getTimeBadge(timeAgo) {
  if (timeAgo < 6  * 3600000) return { cls: 'badge-today',  label: 'Hôm nay' };
  if (timeAgo < 36 * 3600000) return { cls: 'badge-recent', label: 'Gần đây' };
  return { cls: 'badge-old', label: 'Cũ hơn' };
}

function renderNews(container, articles) {
  if (!articles.length) {
    container.innerHTML = `<div class="fallback-msg"><i class="fas fa-info-circle"></i> Chưa có tin mới hôm nay.</div>`;
    return;
  }
  const html = articles.map(art => {
    const badge = getTimeBadge(art.timeAgo);
    const desc  = art.description
      ? `<p class="news-summary">${escapeHtml(art.description)}${art.description.length >= 600 ? '…' : ''}</p>`
      : '';
    return `
    <a class="news-item" href="${escapeHtml(art.link)}" target="_blank" rel="noopener">
      <div class="news-meta">
        <span class="news-date"><i class="fas fa-clock"></i> ${escapeHtml(art.dateStr)}</span>
        <span class="news-badge ${badge.cls}">${badge.label}</span>
      </div>
      <div class="news-title">${escapeHtml(art.title)}</div>
      ${desc}
      <div class="news-source"><i class="fas fa-external-link-alt"></i> vnexpress.net &rarr; Đọc bài đầy đủ</div>
    </a>`;
  }).join('');
  container.innerHTML = `<div class="news-list">${html}</div>`;
}

// ═══════════════════════════════════════════════════════════════
// PHẦN 4: LỜI BÁC HỒ DẠY
// FIX: Thêm fallback nội bộ, không để trống khi mạng lỗi
// ═══════════════════════════════════════════════════════════════
async function loadBacHo() {
  const container = document.getElementById('bac-ho-content');
  const { dd, mm } = getToday();
  const day = parseInt(dd, 10);
  const mon = parseInt(mm, 10);

  // Thử fetch từ mạng trước
  const urlFormats = [
    `https://loibacday.com/ngay-${day}-thang-${mon}`,
    `https://loibacday.com/${dd}-${mm}`,
    `https://loibacday.com/ngay${day}thang${mon}`,
  ];
  const proxies = [PROXY_BAC_HO, PROXY_BAC_HO2];

  let html = null;
  let usedUrl = urlFormats[0];

  outer:
  for (const targetUrl of urlFormats) {
    for (const proxy of proxies) {
      try {
        const res = await fetch(proxy + encodeURIComponent(targetUrl), {
          signal: AbortSignal.timeout(8000)
        });
        if (res.ok) {
          html = await res.text();
          usedUrl = targetUrl;
          break outer;
        }
      } catch { /* thử tiếp */ }
    }
  }

  // Nếu fetch được → parse nội dung
  if (html) {
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const selectors = ['.entry-content p', '.post-content p', 'article p', '.content p', 'main p'];
      let text = '';
      for (const sel of selectors) {
        const els = [...doc.querySelectorAll(sel)].filter(p => p.textContent.trim().length > 30);
        if (els.length) {
          text = els.slice(0, 3).map(p => p.textContent.trim()).join('\n\n');
          break;
        }
      }
      if (text) {
        container.innerHTML = `
          <div class="bachday-box">
            <div class="bachday-quote">${escapeHtml(text)}</div>
            <div class="bachday-date">
              <i class="fas fa-calendar-alt"></i>
              Ngày ${dd} tháng ${mm} năm xưa
              &nbsp;|&nbsp;
              <a href="${usedUrl}" target="_blank" rel="noopener" style="color:#92400e">Nguồn: loibacday.com</a>
            </div>
          </div>`;
        return;
      }
    } catch { /* fallback */ }
  }

  // ── FIX: Fallback nội bộ theo ngày ──
  const fallbackKey = `${dd}/${mm}`;
  // Tìm đúng ngày, nếu không có → tìm ngày gần nhất trong cùng tháng
  let fallbackText = BACH_HO_FALLBACK[fallbackKey];
  if (!fallbackText) {
    // Tìm key gần nhất
    const keys = Object.keys(BACH_HO_FALLBACK)
      .filter(k => k.endsWith(`/${mm}`))
      .sort();
    if (keys.length) {
      // Lấy key có ngày nhỏ hơn hoặc bằng ngày hiện tại, gần nhất
      const best = keys.filter(k => parseInt(k) <= parseInt(dd)).pop()
        || keys[0];
      fallbackText = BACH_HO_FALLBACK[best];
    }
  }
  // Nếu vẫn không có → lấy bất kỳ
  if (!fallbackText) {
    const anyKey = Object.keys(BACH_HO_FALLBACK)[0];
    fallbackText = BACH_HO_FALLBACK[anyKey];
  }

  container.innerHTML = `
    <div class="bachday-box">
      <div class="bachday-quote">${escapeHtml(fallbackText)}</div>
      <div class="bachday-date">
        <i class="fas fa-calendar-alt"></i>
        Ngày ${dd} tháng ${mm} năm xưa
        &nbsp;|&nbsp;
        <a href="${urlFormats[0]}" target="_blank" rel="noopener" style="color:#92400e">Xem đầy đủ tại loibacday.com</a>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════
// PHẦN 5: NGÀY PHÁP LUẬT & TUẦN PHÁP LUẬT
// FIX: Tìm ngày gần nhất nếu không có key khớp chính xác
//      Fallback tuần: tìm tuần gần nhất trong tháng
// ═══════════════════════════════════════════════════════════════
function loadPhapLuat() {
  const container = document.getElementById('law-content');
  const { dd, mm, yyyy } = getToday();
  const todayKey = `${dd}/${mm}/${yyyy}`;

  // ── FIX: Tìm đúng ngày, nếu không có → tìm ngày gần nhất ──
  let dayData = PHAPLUAT_DATA.daily[todayKey] || null;
  let usedDayKey = todayKey;
  if (!dayData) {
    const todayTs = new Date(yyyy, parseInt(mm)-1, parseInt(dd)).getTime();
    const allKeys = Object.keys(PHAPLUAT_DATA.daily);
    let bestDiff = Infinity, bestKey = null;
    for (const k of allKeys) {
      const [d2, m2, y2] = k.split('/');
      const ts = new Date(y2, parseInt(m2)-1, parseInt(d2)).getTime();
      const diff = Math.abs(todayTs - ts);
      if (diff < bestDiff) { bestDiff = diff; bestKey = k; }
    }
    if (bestKey) { dayData = PHAPLUAT_DATA.daily[bestKey]; usedDayKey = bestKey; }
  }

  const weekData = getWeekData();

  container.innerHTML = `
    <div class="law-tabs">
      <button class="law-tab active" onclick="switchTab(event,'day')">
        <i class="fas fa-calendar-day"></i> Ngày ${dd}/${mm}
      </button>
      <button class="law-tab" onclick="switchTab(event,'week')">
        <i class="fas fa-calendar-week"></i> ${weekData.label}
      </button>
    </div>

    <div class="law-panel active" id="law-panel-day">
      ${dayData ? `
        <div class="law-day-box">
          <div class="law-day-label"><i class="fas fa-question-circle"></i> Câu hỏi ngày ${usedDayKey}</div>
          <div class="law-question">${escapeHtml(dayData.question)}</div>
          <div class="law-answer-label"><i class="fas fa-check-circle"></i> Đáp án:</div>
          <div class="law-answer">${escapeHtml(dayData.answer)}</div>
        </div>
      ` : `
        <div class="fallback-msg">
          <i class="fas fa-calendar-times"></i>
          Không có câu hỏi pháp luật cho ngày <strong>${todayKey}</strong>.
        </div>
      `}
    </div>

    <div class="law-panel" id="law-panel-week">
      ${weekData.content ? `
        <div class="law-week-box">
          <div class="law-week-label"><i class="fas fa-book-open"></i> ${escapeHtml(weekData.label)}</div>
          <div class="law-week-title">${escapeHtml(weekData.title)}</div>
          <div class="law-week-content">${escapeHtml(weekData.body)}</div>
        </div>
      ` : `
        <div class="fallback-msg">
          <i class="fas fa-calendar-times"></i>
          Không có điều luật cho ${weekData.label}.
        </div>
      `}
    </div>
  `;
}

// ── FIX: getWeekData – tìm fallback tuần gần nhất nếu không có key ──
function getWeekData() {
  const now   = new Date();
  const day   = now.getDate();
  const month = now.getMonth() + 1;
  const week  = getWeekOfMonth(day);
  const key   = `Tuần ${week} tháng ${month}`;
  let raw = PHAPLUAT_DATA.weekly[key] || '';

  // Nếu không tìm thấy tuần chính xác → thử các tuần khác trong tháng
  if (!raw) {
    for (let w = 4; w >= 1; w--) {
      const fallKey = `Tuần ${w} tháng ${month}`;
      if (PHAPLUAT_DATA.weekly[fallKey]) { raw = PHAPLUAT_DATA.weekly[fallKey]; break; }
    }
  }
  // Nếu vẫn không có → lấy entry đầu tiên
  if (!raw) {
    const firstKey = Object.keys(PHAPLUAT_DATA.weekly)[0];
    raw = PHAPLUAT_DATA.weekly[firstKey] || '';
  }

  if (!raw) return { label: key, title: '', body: '', content: '' };
  const lines = raw.split('\n');
  return { label: key, title: lines[0].trim(), body: lines.slice(1).join('\n').trim(), content: raw };
}

function switchTab(event, tab) {
  document.querySelectorAll('.law-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.law-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`law-panel-${tab}`).classList.add('active');
  event.currentTarget.classList.add('active');
}

// ── TIỆN ÍCH ──────────────────────────────────────────────────
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}
