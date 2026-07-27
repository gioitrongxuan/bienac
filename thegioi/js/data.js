// Các sự kiện/phát minh tiêu biểu trong lịch sử loài người.
// Toạ độ là gần đúng; một vài điểm được dịch nhẹ để các marker gần nhau
// không chồng lên nhau trên địa cầu.
export const EVENTS = [
  {
    id: 'stonetool', country: 'Kenya', year: -3300000, anim: 'stonetool',
    title: 'Công cụ đá đầu tiên', location: 'Lomekwi, Kenya',
    lat: 4.1, lon: 35.9,
    desc: 'Những mảnh đá được ghè đẽo có chủ đích tại Lomekwi 3 (Kenya) là công cụ cổ nhất từng được tìm thấy — xuất hiện trước cả chi Homo. Kỷ nguyên công nghệ của nhân loại bắt đầu từ đây.'
  },
  {
    id: 'fire', country: 'Nam Phi', year: -1000000, anim: 'fire',
    title: 'Chinh phục lửa', location: 'Hang Wonderwerk, Nam Phi',
    lat: -27.8, lon: 23.6,
    desc: 'Tro và xương cháy trong hang Wonderwerk cho thấy tổ tiên loài người đã biết dùng lửa từ khoảng một triệu năm trước. Lửa mang lại thức ăn chín, hơi ấm, ánh sáng — và bộ não lớn hơn.'
  },
  {
    id: 'sapiens', country: 'Maroc', year: -300000, anim: 'human',
    title: 'Homo sapiens xuất hiện', location: 'Jebel Irhoud, Maroc',
    lat: 31.85, lon: -8.87,
    desc: 'Các hoá thạch ở Jebel Irhoud là dấu vết sớm nhất của người hiện đại về mặt giải phẫu. Câu chuyện của loài chúng ta chính thức bắt đầu.'
  },
  {
    id: 'caveart', country: 'Indonesia', year: -43000, anim: 'cave',
    title: 'Nghệ thuật hang động', location: 'Sulawesi, Indonesia',
    lat: -4.98, lon: 119.67,
    desc: 'Hình lợn rừng và những bàn tay in trên vách hang Sulawesi là các tác phẩm nghệ thuật tượng hình cổ nhất được biết đến — bằng chứng loài người đã biết tưởng tượng và kể chuyện.'
  },
  {
    id: 'farming', country: 'Palestine', year: -9500, anim: 'farm',
    title: 'Cách mạng nông nghiệp', location: 'Lưỡi liềm Màu mỡ, Tây Á',
    lat: 31.87, lon: 35.44,
    desc: 'Con người thuần hoá lúa mì, đậu và gia súc ở vùng Lưỡi liềm Màu mỡ, chuyển từ săn bắt hái lượm sang định cư — nền móng của làng mạc, thành phố và văn minh.'
  },
  {
    id: 'wheel', country: 'Iraq', year: -3500, anim: 'wheel',
    title: 'Bánh xe', location: 'Lưỡng Hà (Iraq ngày nay)',
    lat: 34.6, lon: 42.8,
    desc: 'Xuất hiện đầu tiên như bàn xoay gốm rồi trở thành bánh xe vận chuyển, phát minh "quay tròn" này thay đổi vĩnh viễn giao thông, nông nghiệp và máy móc.'
  },
  {
    id: 'writing', country: 'Iraq', year: -3200, anim: 'writing',
    title: 'Chữ viết', location: 'Uruk, Sumer (Iraq ngày nay)',
    lat: 30.5, lon: 46.8,
    desc: 'Người Sumer khắc chữ hình nêm lên đất sét để ghi chép thóc lúa và thuế. Từ đó, tri thức có thể vượt qua cái chết của người sở hữu nó — lịch sử thành văn bắt đầu.'
  },
  {
    id: 'pyramid', country: 'Ai Cập', year: -2560, anim: 'pyramid',
    title: 'Đại kim tự tháp Giza', location: 'Giza, Ai Cập',
    lat: 29.98, lon: 31.13,
    desc: '2,3 triệu khối đá, mỗi khối trung bình 2,5 tấn, được xếp chính xác đến từng centimet. Đây là công trình cao nhất thế giới trong suốt gần 4.000 năm.'
  },
  {
    id: 'iron', country: 'Thổ Nhĩ Kỳ', year: -1200, anim: 'iron',
    title: 'Luyện sắt', location: 'Anatolia (Thổ Nhĩ Kỳ ngày nay)',
    lat: 40.02, lon: 34.62,
    desc: 'Người Hittite làm chủ kỹ thuật luyện sắt, mở ra Thời đại Đồ sắt: công cụ rẻ hơn, cứng hơn — nông nghiệp lẫn chiến tranh đều thay đổi.'
  },
  {
    id: 'democracy', country: 'Hy Lạp', year: -508, anim: 'democracy',
    title: 'Dân chủ Athens', location: 'Athens, Hy Lạp',
    lat: 37.98, lon: 23.73,
    desc: 'Cleisthenes cải cách để mọi công dân Athens đều được bỏ phiếu tại đại hội. "Demokratia" — quyền lực thuộc về nhân dân — ra đời.'
  },
  {
    id: 'paper', country: 'Trung Quốc', year: 105, anim: 'paper',
    title: 'Giấy', location: 'Lạc Dương, Trung Quốc',
    lat: 34.62, lon: 112.45,
    desc: 'Thái Luân dâng lên triều đình nhà Hán quy trình làm giấy từ vỏ cây và giẻ rách. Tri thức từ nay trở nên nhẹ, rẻ và lan xa chưa từng thấy.'
  },
  {
    id: 'gunpowder', country: 'Trung Quốc', year: 850, anim: 'fireworks',
    title: 'Thuốc súng', location: 'Trung Quốc',
    lat: 34.26, lon: 108.94,
    desc: 'Các đạo sĩ luyện đan tình cờ tạo ra hỗn hợp cháy nổ từ diêm tiêu, lưu huỳnh và than. Từ pháo hoa lễ hội đến vũ khí, thế giới không còn như cũ.'
  },
  {
    id: 'compass', country: 'Trung Quốc', year: 1040, anim: 'compass',
    title: 'La bàn hàng hải', location: 'Khai Phong, Trung Quốc',
    lat: 34.79, lon: 114.35,
    desc: 'Kim nam châm chỉ hướng của người Tống giúp thuyền bè định hướng giữa biển khơi mù sương — chìa khoá của những chuyến hải hành vĩ đại sau này.'
  },
  {
    id: 'press', country: 'Đức', year: 1440, anim: 'press',
    title: 'Máy in Gutenberg', location: 'Mainz, Đức',
    lat: 50.0, lon: 8.27,
    desc: 'Chữ rời kim loại kết hợp máy ép rượu nho tạo ra sách in hàng loạt. Giá sách giảm hàng trăm lần; tri thức thoát khỏi tu viện và bùng nổ khắp châu Âu.'
  },
  {
    id: 'columbus', country: 'Bahamas', year: 1492, anim: 'sail',
    title: 'Columbus đến châu Mỹ', location: 'San Salvador, Bahamas',
    lat: 24.05, lon: -74.5,
    desc: 'Hai nửa thế giới tách biệt hàng vạn năm bất ngờ được nối lại. Cuộc "Trao đổi Columbus" làm thay đổi thực phẩm, dân cư và số phận của mọi lục địa.'
  },
  {
    id: 'telescope', country: 'Ý', year: 1609, anim: 'telescope',
    title: 'Kính viễn vọng của Galileo', location: 'Venice, Ý',
    lat: 45.44, lon: 12.33,
    desc: 'Galileo hướng ống kính lên bầu trời: núi trên Mặt Trăng, các vệ tinh của Sao Mộc… Trái Đất không còn là trung tâm vũ trụ.'
  },
  {
    id: 'newton', country: 'Anh', year: 1687, anim: 'gravity',
    title: 'Principia của Newton', location: 'Cambridge, Anh',
    lat: 52.2, lon: 0.12,
    desc: 'Ba định luật chuyển động và định luật vạn vật hấp dẫn: quả táo rơi và Mặt Trăng quay hoá ra tuân theo cùng một quy luật. Vũ trụ có thể tính toán được.'
  },
  {
    id: 'steam', country: 'Anh', year: 1776, anim: 'steam',
    title: 'Máy hơi nước Watt', location: 'Birmingham, Anh',
    lat: 52.48, lon: -1.9,
    desc: 'James Watt hoàn thiện máy hơi nước hiệu suất cao — "cơ bắp nhân tạo" đầu tiên của loài người. Cách mạng Công nghiệp tăng tốc từ đây.'
  },
  {
    id: 'vaccine', country: 'Anh', year: 1796, anim: 'vaccine',
    title: 'Vắc-xin đầu tiên', location: 'Berkeley, Anh',
    lat: 51.69, lon: -2.46,
    desc: 'Edward Jenner cấy đậu bò để phòng bệnh đậu mùa — vắc-xin đầu tiên trong lịch sử. Hai thế kỷ sau, đậu mùa trở thành căn bệnh đầu tiên bị loài người xoá sổ.'
  },
  {
    id: 'train', country: 'Anh', year: 1825, anim: 'train',
    title: 'Đường sắt công cộng', location: 'Stockton–Darlington, Anh',
    lat: 54.52, lon: -1.55,
    desc: 'Đầu máy Locomotion No.1 kéo hành khách trên tuyến Stockton–Darlington. Khoảng cách co lại, thế giới bắt đầu chạy theo giờ tàu.'
  },
  {
    id: 'evolution', country: 'Anh', year: 1859, anim: 'evolution',
    title: 'Thuyết tiến hoá', location: 'London, Anh',
    lat: 51.5, lon: -0.12,
    desc: 'Darwin xuất bản "Nguồn gốc các loài": mọi sinh vật đều tiến hoá qua chọn lọc tự nhiên. Loài người tìm thấy vị trí của mình trong cây sự sống.'
  },
  {
    id: 'telephone', country: 'Mỹ', year: 1876, anim: 'phone',
    title: 'Điện thoại', location: 'Boston, Mỹ',
    lat: 42.36, lon: -71.06,
    desc: '"Watson, đến đây, tôi cần anh!" — câu nói đầu tiên truyền qua dây dẫn. Khoảng cách giữa con người chưa bao giờ gần đến thế.'
  },
  {
    id: 'lightbulb', country: 'Mỹ', year: 1879, anim: 'bulb',
    title: 'Bóng đèn điện', location: 'Menlo Park, Mỹ',
    lat: 40.55, lon: -74.35,
    desc: 'Sau hàng nghìn thí nghiệm, sợi đốt của Edison cháy sáng liên tục 13 giờ rưỡi. Màn đêm bị đẩy lùi, thành phố không bao giờ ngủ.'
  },
  {
    id: 'car', country: 'Đức', year: 1886, anim: 'car',
    title: 'Ô tô', location: 'Mannheim, Đức',
    lat: 48.3, lon: 9.9,
    desc: 'Benz Patent-Motorwagen — cỗ xe ba bánh chạy xăng đầu tiên. Bertha Benz tự lái nó 106 km để chứng minh với thế giới: kỷ nguyên ô tô đã đến.'
  },
  {
    id: 'xray', country: 'Đức', year: 1895, anim: 'xray',
    title: 'Tia X', location: 'Würzburg, Đức',
    lat: 50.8, lon: 11.5,
    desc: 'Röntgen phát hiện một loại tia lạ xuyên qua da thịt và chụp được xương bàn tay của vợ mình. Y học lần đầu tiên nhìn thấu cơ thể sống.'
  },
  {
    id: 'flight', country: 'Mỹ', year: 1903, anim: 'plane',
    title: 'Chuyến bay có động cơ', location: 'Kitty Hawk, Mỹ',
    lat: 36.02, lon: -75.67,
    desc: '12 giây, 36 mét — chuyến bay đầu tiên của anh em Wright ngắn hơn sải cánh một chiếc Boeing 747, nhưng đủ để loài người cất cánh.'
  },
  {
    id: 'relativity', country: 'Thuỵ Sĩ', year: 1905, anim: 'relativity',
    title: 'Thuyết tương đối', location: 'Bern, Thuỵ Sĩ',
    lat: 46.95, lon: 7.45,
    desc: 'Nhân viên sở sáng chế Albert Einstein công bố E=mc²: không gian và thời gian là một, khối lượng chính là năng lượng. Vật lý bước sang trang mới.'
  },
  {
    id: 'penicillin', country: 'Anh', year: 1928, anim: 'penicillin',
    title: 'Penicillin', location: 'London, Anh',
    lat: 53.3, lon: -0.6,
    desc: 'Đĩa cấy khuẩn của Fleming bị mốc — và quanh đám mốc, vi khuẩn chết sạch. Kháng sinh đầu tiên ra đời, cứu hàng trăm triệu sinh mạng.'
  },
  {
    id: 'computer', country: 'Mỹ', year: 1945, anim: 'computer',
    title: 'Máy tính điện tử', location: 'Philadelphia, Mỹ',
    lat: 39.95, lon: -75.19,
    desc: 'ENIAC nặng 27 tấn với 17.468 bóng chân không, tính nhanh gấp hàng nghìn lần con người. Kỷ nguyên số chính thức khởi động.'
  },
  {
    id: 'dna', country: 'Anh', year: 1953, anim: 'dna',
    title: 'Cấu trúc DNA', location: 'Cambridge, Anh',
    lat: 53.5, lon: 1.8,
    desc: 'Watson và Crick — với dữ liệu then chốt của Rosalind Franklin — giải mã chuỗi xoắn kép: cuốn sách hướng dẫn của sự sống được mở ra.'
  },
  {
    id: 'sputnik', country: 'Kazakhstan', year: 1957, anim: 'sputnik',
    title: 'Sputnik — vệ tinh đầu tiên', location: 'Baikonur, Kazakhstan',
    lat: 45.96, lon: 63.3,
    desc: 'Quả cầu kim loại 84 kg phát tiếng "bíp-bíp" từ quỹ đạo. Loài người chính thức trở thành loài biết du hành vũ trụ.'
  },
  {
    id: 'moon', country: 'Mỹ', year: 1969, anim: 'moon',
    title: 'Đặt chân lên Mặt Trăng', location: 'Cape Canaveral, Mỹ',
    lat: 28.57, lon: -80.65,
    desc: '"Một bước chân nhỏ của một con người…" — Armstrong và Aldrin in dấu giày lên Biển Tĩnh Lặng, cách nhà 380.000 km.'
  },
  {
    id: 'internet', country: 'Mỹ', year: 1969, anim: 'internet',
    title: 'Internet (ARPANET)', location: 'UCLA, Mỹ',
    lat: 34.07, lon: -118.44,
    desc: 'Tin nhắn đầu tiên trên ARPANET định gửi chữ "LOGIN" nhưng hệ thống sập sau hai ký tự "LO". Từ khởi đầu khiêm tốn ấy, cả thế giới được kết nối.'
  },
  {
    id: 'www', country: 'Thuỵ Sĩ', year: 1989, anim: 'www',
    title: 'World Wide Web', location: 'CERN, Thuỵ Sĩ',
    lat: 46.23, lon: 6.05,
    desc: 'Tim Berners-Lee đề xuất hệ thống siêu văn bản cho CERN — rồi tặng nó miễn phí cho nhân loại. Web biến Internet thành không gian của tất cả mọi người.'
  },
  {
    id: 'smartphone', country: 'Mỹ', year: 2007, anim: 'smartphone',
    title: 'Điện thoại thông minh', location: 'Cupertino, Mỹ',
    lat: 36.0, lon: -120.5,
    desc: 'iPhone gom máy tính, máy ảnh, bản đồ và thư viện nhạc vào túi quần. Hơn nửa nhân loại giờ đây mang cả thế giới trong lòng bàn tay.'
  },
  {
    id: 'ai', country: 'Mỹ', year: 2022, anim: 'ai',
    title: 'Trí tuệ nhân tạo tạo sinh', location: 'San Francisco, Mỹ',
    lat: 37.77, lon: -122.42,
    desc: 'Các mô hình ngôn ngữ lớn viết văn, lập trình, trò chuyện như người. Chương mới nhất của lịch sử công cụ — công cụ biết suy nghĩ cùng chúng ta.'
  },

  // ---------- Đợt bổ sung: 36 sự kiện ----------
  {
    id: 'australia', country: 'Úc', year: -65000, anim: 'human',
    title: 'Con người đến châu Úc', location: 'Bắc Úc',
    lat: -12.4, lon: 130.9,
    desc: 'Vượt hàng chục cây số biển mở trên những chiếc bè đơn sơ, người hiện đại đặt chân đến Úc — chuyến vượt biển có chủ đích đầu tiên trong lịch sử loài người.'
  },
  {
    id: 'pottery', country: 'Trung Quốc', year: -18000, anim: 'pottery',
    title: 'Đồ gốm', location: 'Hang Tiên Nhân, Giang Tây, Trung Quốc',
    lat: 28.7, lon: 117.0,
    desc: 'Những mảnh nồi đất nung ở hang Tiên Nhân có tuổi gần 20.000 năm — đồ gốm cổ nhất được biết đến. Lần đầu tiên con người dùng lửa biến bùn đất thành vật dụng bền vững.'
  },
  {
    id: 'americas', country: 'Mỹ', year: -15000, anim: 'human',
    title: 'Con người đến châu Mỹ', location: 'Beringia (Alaska ngày nay)',
    lat: 64.8, lon: -165.4,
    desc: 'Băng qua cầu đất Bering từ Siberia, những nhóm săn bắt hái lượm tràn xuống và phủ kín hai lục địa châu Mỹ chỉ trong vài nghìn năm.'
  },
  {
    id: 'bronze', country: 'Thổ Nhĩ Kỳ', year: -3300, anim: 'iron',
    title: 'Đồ đồng', location: 'Anatolia & Lưỡng Hà',
    lat: 39.96, lon: 26.24,
    desc: 'Trộn thiếc vào đồng, con người tạo ra hợp kim cứng hơn hẳn đá và đồng nguyên chất. Thời đại Đồ đồng mở màn cho thành thị, thương mại và đế chế.'
  },
  {
    id: 'hammurabi', country: 'Iraq', year: -1754, anim: 'writing',
    title: 'Bộ luật Hammurabi', location: 'Babylon',
    lat: 32.0, lon: 44.8,
    desc: '282 điều luật khắc trên bia đá bazan cao 2,25 mét — một trong những bộ luật thành văn cổ nhất. Công lý lần đầu được viết ra cho mọi người cùng đọc.'
  },
  {
    id: 'alphabet', country: 'Liban', year: -1050, anim: 'writing',
    title: 'Bảng chữ cái', location: 'Byblos, Phoenicia',
    lat: 34.12, lon: 35.65,
    desc: 'Người Phoenicia rút gọn hàng trăm ký hiệu xuống ~22 chữ cái ghi âm. Đọc viết không còn là đặc quyền của thư lại — hầu hết bảng chữ cái ngày nay đều là hậu duệ của nó.'
  },
  {
    id: 'drum', country: 'Việt Nam', year: -600, anim: 'drum',
    title: 'Trống đồng Đông Sơn', location: 'Thanh Hoá, Việt Nam',
    lat: 19.8, lon: 105.78,
    desc: 'Mặt trời 14 cánh, chim lạc, thuyền và vũ công khắc trên mặt trống — đỉnh cao nghệ thuật đúc đồng Đông Nam Á, biểu tượng của nền văn minh lúa nước sông Hồng.'
  },
  {
    id: 'geometry', country: 'Ai Cập', year: -300, anim: 'geometry',
    title: 'Hình học Euclid', location: 'Alexandria, Ai Cập',
    lat: 31.2, lon: 29.92,
    desc: 'Từ vài tiên đề đơn giản, bộ "Cơ sở" 13 quyển của Euclid suy ra toàn bộ hình học bằng chứng minh chặt chẽ — khuôn mẫu của tư duy toán học suốt 2.000 năm.'
  },
  {
    id: 'lever', country: 'Ý', year: -250, anim: 'lever',
    title: 'Cơ học Archimedes', location: 'Syracuse, Sicilia',
    lat: 37.06, lon: 15.29,
    desc: '"Hãy cho tôi một điểm tựa, tôi sẽ nâng cả Trái Đất." Đòn bẩy, ròng rọc, lực đẩy của nước — Archimedes biến toán học thành sức mạnh vật lý.'
  },
  {
    id: 'wall', country: 'Trung Quốc', year: -220, anim: 'wall',
    title: 'Vạn Lý Trường Thành', location: 'Trung Quốc',
    lat: 40.36, lon: 116.0,
    desc: 'Tần Thuỷ Hoàng nối các đoạn tường thành cũ thành bức trường thành vạn dặm. Công trình phòng thủ dài nhất lịch sử, xây suốt gần 2.000 năm qua nhiều triều đại.'
  },
  {
    id: 'maya', country: 'Guatemala', year: 250, anim: 'zero',
    title: 'Thiên văn & số 0 Maya', location: 'Tikal, Guatemala',
    lat: 17.22, lon: -89.62,
    desc: 'Giữa rừng rậm Trung Mỹ, người Maya độc lập phát minh số 0, tính chu kỳ Sao Kim chính xác tới từng ngày và dựng lịch đếm dài hàng nghìn năm.'
  },
  {
    id: 'zero', country: 'Ấn Độ', year: 628, anim: 'zero',
    title: 'Số 0 của Ấn Độ', location: 'Bhinmal, Ấn Độ',
    lat: 25.0, lon: 72.3,
    desc: 'Brahmagupta là người đầu tiên coi số 0 là một con số thực thụ với quy tắc tính toán riêng. Cùng hệ ghi số thập phân Ấn Độ, nó trở thành nền móng của toàn bộ toán học.'
  },
  {
    id: 'algebra', country: 'Iraq', year: 830, anim: 'zero',
    title: 'Đại số & thuật toán', location: 'Nhà Trí tuệ, Baghdad',
    lat: 33.3, lon: 44.4,
    desc: 'Al-Khwarizmi viết sách về "al-jabr" — đại số, và tên ông trở thành từ "algorithm". Baghdad thời hoàng kim là nơi tri thức Hy Lạp, Ấn Độ, Ba Tư hội tụ.'
  },
  {
    id: 'woodblock', country: 'Trung Quốc', year: 868, anim: 'press',
    title: 'In khắc gỗ', location: 'Đôn Hoàng, Trung Quốc',
    lat: 40.14, lon: 94.66,
    desc: 'Cuốn Kinh Kim Cương in năm 868 là quyển sách in có ghi niên đại sớm nhất còn tồn tại. Trước Gutenberg gần 6 thế kỷ, chữ đã được nhân bản hàng loạt ở phương Đông.'
  },
  {
    id: 'polynesia', country: 'Polynesia', year: 900, anim: 'sail',
    title: 'Chinh phục Thái Bình Dương', location: 'Quần đảo Polynesia',
    lat: 19.9, lon: -155.6,
    desc: 'Chỉ bằng thuyền đôi, đọc sao, sóng và đường chim bay, người Polynesia tìm ra những hòn đảo nhỏ xíu giữa đại dương lớn nhất hành tinh — kỳ tích hàng hải trước mọi la bàn.'
  },
  {
    id: 'zhenghe', country: 'Trung Quốc', year: 1405, anim: 'sail',
    title: 'Hạm đội Trịnh Hoà', location: 'Nam Kinh, Trung Quốc',
    lat: 32.06, lon: 118.8,
    desc: 'Bảy chuyến hải hành với những "bảo thuyền" khổng lồ đưa hạm đội nhà Minh tới tận Đông Phi — đội tàu viễn dương lớn nhất thế giới thời bấy giờ.'
  },
  {
    id: 'clock', country: 'Séc', year: 1410, anim: 'clock',
    title: 'Đồng hồ thiên văn', location: 'Praha, Séc',
    lat: 50.09, lon: 14.42,
    desc: 'Chiếc Orloj ở quảng trường Praha vẫn chạy sau hơn 600 năm. Đồng hồ cơ chia ngày thành những giờ đều tăm tắp — nhịp sống con người bắt đầu theo máy móc.'
  },
  {
    id: 'magellan', country: 'Tây Ban Nha', year: 1519, anim: 'sail',
    title: 'Vòng quanh thế giới', location: 'Sevilla, Tây Ban Nha',
    lat: 37.39, lon: -5.99,
    desc: 'Năm tàu rời Sevilla, ba năm sau chỉ một chiếc trở về với 18 thuỷ thủ. Nhưng lần đầu tiên, Trái Đất tròn được chứng minh bằng chính một vòng hải trình.'
  },
  {
    id: 'heliocentric', country: 'Ba Lan', year: 1543, anim: 'heliocentric',
    title: 'Thuyết nhật tâm', location: 'Frombork, Ba Lan',
    lat: 54.36, lon: 19.68,
    desc: 'Trên giường bệnh, Copernicus nhận bản in cuốn sách đặt Mặt Trời vào trung tâm. Trái Đất chỉ là một hành tinh — cuộc cách mạng khoa học bắt đầu.'
  },
  {
    id: 'microscope', country: 'Hà Lan', year: 1676, anim: 'microscope',
    title: 'Kính hiển vi & vi sinh vật', location: 'Delft, Hà Lan',
    lat: 52.01, lon: 4.36,
    desc: 'Người buôn vải Leeuwenhoek mài thấu kính và thấy cả một thế giới "sinh vật tí hon" bơi trong giọt nước. Nhân loại phát hiện sự sống vô hình quanh mình.'
  },
  {
    id: 'balloon', country: 'Pháp', year: 1783, anim: 'balloon',
    title: 'Khí cầu — con người bay lên', location: 'Annonay, Pháp',
    lat: 45.1, lon: 3.5,
    desc: 'Quả khí cầu giấy của anh em Montgolfier nâng con người rời mặt đất lần đầu tiên. Giấc mơ bay hàng vạn năm thành hiện thực — bằng khói và lửa.'
  },
  {
    id: 'revolution', country: 'Pháp', year: 1789, anim: 'democracy',
    title: 'Cách mạng Pháp', location: 'Paris, Pháp',
    lat: 48.85, lon: 2.35,
    desc: 'Ngục Bastille thất thủ, Tuyên ngôn Nhân quyền và Dân quyền ra đời: "Người ta sinh ra tự do và bình đẳng về quyền lợi." Ý tưởng ấy lan khắp thế giới.'
  },
  {
    id: 'battery', country: 'Ý', year: 1800, anim: 'battery',
    title: 'Pin điện Volta', location: 'Como, Ý',
    lat: 45.81, lon: 9.09,
    desc: 'Chồng đĩa kẽm - đồng ngâm nước muối của Volta tạo ra dòng điện liên tục đầu tiên. Từ đây điện thôi là tia chớp trên trời — nó nằm trong tay con người.'
  },
  {
    id: 'induction', country: 'Anh', year: 1831, anim: 'induction',
    title: 'Cảm ứng điện từ', location: 'London, Anh',
    lat: 50.3, lon: -1.5,
    desc: 'Faraday đẩy nam châm qua cuộn dây và kim điện kế nhảy: từ trường sinh ra điện. Mọi máy phát điện trên Trái Đất hôm nay đều chạy trên nguyên lý ấy.'
  },
  {
    id: 'photo', country: 'Pháp', year: 1839, anim: 'photo',
    title: 'Nhiếp ảnh', location: 'Chalon-sur-Saône, Pháp',
    lat: 46.9, lon: 4.5,
    desc: 'Từ tấm phơi sáng 8 giờ của Niépce đến kỹ thuật daguerreotype vài phút — lần đầu tiên khoảnh khắc được giữ lại đúng như mắt thấy, mãi mãi.'
  },
  {
    id: 'telegraph', country: 'Mỹ', year: 1844, anim: 'telegraph',
    title: 'Điện tín', location: 'Washington – Baltimore, Mỹ',
    lat: 38.9, lon: -77.04,
    desc: 'Bức điện Morse đầu tiên chạy 60 km trong nháy mắt. Tin tức từng đi theo tốc độ ngựa chạy — giờ đây nó đi với tốc độ ánh sáng.'
  },
  {
    id: 'pasteur', country: 'Pháp', year: 1864, anim: 'microscope',
    title: 'Thuyết mầm bệnh', location: 'Lille, Pháp',
    lat: 50.6, lon: 3.05,
    desc: 'Pasteur chứng minh vi sinh vật gây thối rữa và bệnh tật. Tiệt trùng, rửa tay, phẫu thuật vô khuẩn — y học hiện đại bắt đầu từ những kẻ thù không nhìn thấy.'
  },
  {
    id: 'periodic', country: 'Nga', year: 1869, anim: 'periodic',
    title: 'Bảng tuần hoàn', location: 'Sankt-Peterburg, Nga',
    lat: 59.94, lon: 30.31,
    desc: 'Mendeleev xếp các nguyên tố theo khối lượng và thấy tính chất lặp lại tuần hoàn — thậm chí để trống ô cho nguyên tố chưa ai tìm ra. Vài chục năm sau, chúng xuất hiện đúng như dự đoán.'
  },
  {
    id: 'suffrage', country: 'New Zealand', year: 1893, anim: 'democracy',
    title: 'Phụ nữ được bầu cử', location: 'Wellington, New Zealand',
    lat: -41.29, lon: 174.78,
    desc: 'New Zealand trở thành quốc gia đầu tiên cho phụ nữ đi bầu. Nửa còn lại của nhân loại bắt đầu giành được tiếng nói chính trị của mình.'
  },
  {
    id: 'cinema', country: 'Pháp', year: 1895, anim: 'cinema',
    title: 'Điện ảnh', location: 'Lyon, Pháp',
    lat: 45.7, lon: 4.7,
    desc: 'Khi đoàn tàu của anh em Lumière lao về phía màn ảnh, khán giả giật mình né tránh. Nghệ thuật thứ bảy ra đời — những bức ảnh đã biết chuyển động.'
  },
  {
    id: 'radio', country: 'Ý', year: 1895, anim: 'radio',
    title: 'Radio', location: 'Bologna, Ý',
    lat: 44.5, lon: 11.35,
    desc: 'Marconi truyền tín hiệu không cần dây; sáu năm sau, ba tiếng "tạch" của chữ S vượt cả Đại Tây Dương. Không trung trở thành đường truyền của nhân loại.'
  },
  {
    id: 'atom', country: 'Mỹ', year: 1942, anim: 'atom',
    title: 'Năng lượng hạt nhân', location: 'Chicago, Mỹ',
    lat: 41.79, lon: -87.6,
    desc: 'Dưới khán đài sân bóng Đại học Chicago, lò Chicago Pile-1 đạt phản ứng dây chuyền tự duy trì đầu tiên. Con người chạm tay vào năng lượng của hạt nhân nguyên tử.'
  },
  {
    id: 'transistor', country: 'Mỹ', year: 1947, anim: 'transistor',
    title: 'Transistor', location: 'Bell Labs, New Jersey, Mỹ',
    lat: 41.9, lon: -73.0,
    desc: 'Công tắc bé xíu không có bộ phận chuyển động — viên gạch của mọi thiết bị điện tử. Chiếc điện thoại trong túi bạn chứa hàng chục tỷ chiếc.'
  },
  {
    id: 'shinkansen', country: 'Nhật Bản', year: 1964, anim: 'shinkansen',
    title: 'Tàu cao tốc Shinkansen', location: 'Tokyo, Nhật Bản',
    lat: 35.68, lon: 139.65,
    desc: 'Đúng dịp Olympic Tokyo, tàu viên đạn lao 210 km/h giữa Tokyo và Osaka, sai giờ tính bằng giây. Đường sắt — phát minh thế kỷ 19 — được tái sinh.'
  },
  {
    id: 'heart', country: 'Nam Phi', year: 1967, anim: 'heart',
    title: 'Ca ghép tim đầu tiên', location: 'Cape Town, Nam Phi',
    lat: -33.93, lon: 18.42,
    desc: 'Christiaan Barnard đặt trái tim của một người hiến vào lồng ngực bệnh nhân — và nó đập. Ranh giới giữa sự sống và cái chết được vẽ lại.'
  },
  {
    id: 'genome', country: 'Mỹ', year: 2003, anim: 'dna',
    title: 'Giải mã bộ gen người', location: 'Dự án quốc tế (Mỹ dẫn đầu)',
    lat: 37.9, lon: -79.5,
    desc: 'Sau 13 năm và nỗ lực của hàng nghìn nhà khoa học ở sáu quốc gia, toàn bộ 3 tỷ "ký tự" DNA của con người được đọc trọn — cuốn tự truyện của loài người viết bằng bốn chữ cái.'
  },

  // ---------- Đợt bổ sung 2: 42 sự kiện (cân bằng toàn cầu) ----------
  {
    id: 'nok', country: 'Nigeria', year: -500, anim: 'iron',
    title: 'Luyện sắt ở châu Phi', location: 'Nok, Nigeria',
    lat: 9.5, lon: 8.0,
    desc: 'Giữa thảo nguyên Nigeria, cư dân văn hoá Nok nung quặng trong lò đất để lấy sắt và nặn những bức tượng đất nung đầy biểu cảm. Châu Phi hạ Sahara bước vào Thời đại Đồ sắt bằng con đường của riêng mình.'
  },
  {
    id: 'timbuktu', country: 'Mali', year: 1327, anim: 'paper',
    title: 'Thành phố học thuật Timbuktu', location: 'Timbuktu, Mali',
    lat: 16.77, lon: -3.0,
    desc: 'Bên rìa Sahara, Timbuktu vươn lên thành kinh đô học thuật với đại học Sankoré và hàng trăm nghìn bản thảo về thiên văn, y học, luật pháp. Giữa cát bụi sa mạc, sách được quý hơn vàng.'
  },
  {
    id: 'zimbabwe', country: 'Zimbabwe', year: 1200, anim: 'wall',
    title: 'Đại Zimbabwe', location: 'Đại Zimbabwe, Zimbabwe',
    lat: -20.27, lon: 30.93,
    desc: 'Những bức tường granit cao tới 11 mét được xếp khít mà không cần một giọt vữa — Đại Zimbabwe là quần thể đá lớn nhất châu Phi hạ Sahara, trung tâm của mạng lưới buôn vàng vươn tới tận Ấn Độ Dương.'
  },
  {
    id: 'qarawiyyin', country: 'Maroc', year: 859, anim: 'university',
    title: 'Đại học Al-Qarawiyyin', location: 'Fez, Maroc',
    lat: 34.06, lon: -4.97,
    desc: 'Fatima al-Fihri dùng toàn bộ gia tài thừa kế xây thánh đường kiêm trường học Al-Qarawiyyin ở Fez. Hơn 11 thế kỷ sau nơi đây vẫn giảng dạy — cơ sở giáo dục đại học hoạt động liên tục cổ nhất thế giới.'
  },
  {
    id: 'smallpoxend', country: 'Somalia', year: 1977, anim: 'vaccine',
    title: 'Xoá sổ bệnh đậu mùa', location: 'Merca, Somalia',
    lat: 1.72, lon: 44.77,
    desc: 'Năm 1977, anh đầu bếp bệnh viện Ali Maow Maalin ở Merca trở thành ca đậu mùa tự nhiên cuối cùng của nhân loại. Ba năm sau WHO tuyên bố xoá sổ — lần đầu tiên con người chủ động tiêu diệt một căn bệnh.'
  },
  {
    id: 'suez', country: 'Ai Cập', year: 1869, anim: 'canal',
    title: 'Kênh đào Suez', location: 'Kênh Suez, Ai Cập',
    lat: 30.5, lon: 32.35,
    desc: 'Sau mười năm đào đắp, dải nước 164 km xuyên eo đất Ai Cập nối liền Địa Trung Hải với Biển Đỏ. Tàu bè từ châu Âu sang châu Á không còn phải vòng qua mũi Hảo Vọng — thương mại thế giới đổi dòng chảy.'
  },
  {
    id: 'optics', country: 'Ai Cập', year: 1021, anim: 'optics',
    title: 'Quang học của Ibn al-Haytham', location: 'Cairo, Ai Cập',
    lat: 31.0, lon: 31.0,
    desc: 'Ở Cairo, Ibn al-Haytham dùng buồng tối chứng minh ánh sáng đi theo đường thẳng vào mắt, và đòi hỏi mọi giả thuyết phải được kiểm chứng bằng thí nghiệm. "Sách Quang học" của ông là tổ tiên của phương pháp khoa học.'
  },
  {
    id: 'rice', country: 'Trung Quốc', year: -7000, anim: 'farm',
    title: 'Thuần hoá lúa nước', location: 'Lưu vực Trường Giang, Trung Quốc',
    lat: 29.0, lon: 119.6,
    desc: 'Khoảng 9.000 năm trước, cư dân lưu vực Trường Giang bắt đầu gieo trồng và chọn giống lúa dại thành lúa nước. Loài cỏ ven đầm lầy ấy nay là cây lương thực nuôi sống một nửa nhân loại.'
  },
  {
    id: 'silkroad', country: 'Uzbekistan', year: -114, anim: 'caravan',
    title: 'Con đường Tơ lụa', location: 'Samarkand, Uzbekistan',
    lat: 39.65, lon: 66.97,
    desc: 'Từ khi nhà Hán mở đường sang Tây Vực, các đoàn lạc đà nối Trường An với Địa Trung Hải qua những ốc đảo như Samarkand. Tơ lụa, giấy, tôn giáo và toán học theo vó lạc đà luân chuyển giữa các nền văn minh.'
  },
  {
    id: 'ibnsina', country: 'Uzbekistan', year: 1025, anim: 'writing',
    title: '"Y điển" của Ibn Sina', location: 'Bukhara, Uzbekistan',
    lat: 39.77, lon: 64.42,
    desc: 'Ibn Sina, học giả sinh gần Bukhara, tổng hợp y học Hy Lạp, Ba Tư và Ấn Độ vào bộ "Y điển" đồ sộ. Suốt khoảng sáu trăm năm, đây là sách giáo khoa chuẩn tại các trường y từ Samarkand đến Paris.'
  },
  {
    id: 'angkor', country: 'Campuchia', year: 1150, anim: 'temple',
    title: 'Angkor Wat', location: 'Angkor, Campuchia',
    lat: 13.41, lon: 103.87,
    desc: 'Vua Suryavarman II huy động hàng vạn người dựng Angkor Wat giữa mạng lưới hào nước và kênh đào tinh vi của đế chế Khmer. Cho đến nay đây vẫn là quần thể tôn giáo lớn nhất thế giới từng được xây dựng.'
  },
  {
    id: 'hangul', country: 'Hàn Quốc', year: 1443, anim: 'writing',
    title: 'Bảng chữ cái Hangul', location: 'Hanseong (Seoul), Hàn Quốc',
    lat: 37.57, lon: 126.98,
    desc: 'Vua Sejong tạo ra Hangul: mỗi chữ cái mô phỏng khẩu hình khi phát âm, đơn giản đến mức "người khôn học xong trong một buổi sáng". Lần đầu tiên một dân tộc có chữ viết được thiết kế để toàn dân biết đọc.'
  },
  {
    id: 'chess', country: 'Ấn Độ', year: 600, anim: 'chess',
    title: 'Khai sinh cờ vua', location: 'Bắc Ấn Độ',
    lat: 27.0, lon: 79.9,
    desc: 'Trò chaturanga của Bắc Ấn với bốn binh chủng voi, ngựa, xe và bộ binh theo chân thương nhân sang Ba Tư, rồi dần biến hoá thành cờ vua. Trò chơi trí tuệ ấy nay hiện diện ở mọi quốc gia trên hành tinh.'
  },
  {
    id: 'astrolabe', country: 'Iran', year: 964, anim: 'telescope',
    title: '"Sách các định tinh" của Al-Sufi', location: 'Shiraz, Iran',
    lat: 29.61, lon: 52.54,
    desc: 'Ở Shiraz, Al-Sufi vẽ lại toàn bộ bầu trời trong "Sách các định tinh" và ghi chú một "đám mây nhỏ" — ghi nhận sớm nhất về thiên hà Andromeda. Thiên văn Ba Tư giữ ngọn lửa khoa học cháy suốt thời trung đại.'
  },
  {
    id: 'oil', country: 'Azerbaijan', year: 1846, anim: 'oil',
    title: 'Giếng dầu công nghiệp đầu tiên', location: 'Baku, Azerbaijan',
    lat: 40.37, lon: 49.84,
    desc: 'Tại Baku bên bờ Caspi, mũi khoan cơ học đầu tiên chạm túi dầu ở Bibi-Heybat giữa thập niên 1840 — trước giếng dầu nổi tiếng ở Pennsylvania hơn một thập kỷ. Kỷ nguyên năng lượng hoá thạch bắt đầu.'
  },
  {
    id: 'iss', country: 'Quốc tế', year: 1998, anim: 'sputnik',
    title: 'Trạm Vũ trụ Quốc tế', location: 'Quỹ đạo thấp (phóng từ Baikonur)',
    lat: 44.5, lon: 65.5,
    desc: 'Module Zarya rời bệ phóng Baikonur năm 1998, mở đầu công trình 15 quốc gia cùng lắp ghép ngoài không gian. Từ năm 2000, lúc nào cũng có con người sống trên quỹ đạo — ngôi nhà chung đầu tiên ngoài Trái Đất.'
  },
  {
    id: 'antikythera', country: 'Hy Lạp', year: -100, anim: 'clock',
    title: 'Máy Antikythera', location: 'Đảo Antikythera, Hy Lạp',
    lat: 35.87, lon: 23.3,
    desc: 'Vớt lên từ xác tàu đắm gần đảo Antikythera, cỗ máy với ít nhất 30 bánh răng đồng này tính được vị trí Mặt Trời, Mặt Trăng và cả nhật thực. Phải khoảng 1.500 năm sau mới có cỗ máy tinh xảo sánh ngang.'
  },
  {
    id: 'olympic', country: 'Hy Lạp', year: -776, anim: 'olympic',
    title: 'Olympic cổ đại', location: 'Olympia, Hy Lạp',
    lat: 37.64, lon: 21.63,
    desc: 'Cứ bốn năm một lần, các thành bang Hy Lạp tạm gác gươm giáo theo lệnh hưu chiến thiêng liêng để tranh tài ở Olympia. Truyền thống ấy hồi sinh năm 1896 — thể thao trở thành ngôn ngữ chung của nhân loại.'
  },
  {
    id: 'maize', country: 'Mexico', year: -7000, anim: 'farm',
    title: 'Thuần hoá ngô', location: 'Thung lũng Tehuacán, Mexico',
    lat: 18.46, lon: -97.39,
    desc: 'Từ cỏ teosinte hạt bé và cứng, cư dân vùng Tehuacán chọn lọc qua hàng nghìn thế hệ thành bắp ngô căng mẩy. Loài cây do bàn tay người tạo nên ấy trở thành nguồn sống của các nền văn minh châu Mỹ.'
  },
  {
    id: 'potato', country: 'Peru', year: -6000, anim: 'farm',
    title: 'Thuần hoá khoai tây', location: 'Cao nguyên hồ Titicaca, Peru',
    lat: -15.8, lon: -69.4,
    desc: 'Trên cao nguyên lạnh giá quanh hồ Titicaca, người Andes biến củ dại đắng chát thành khoai tây. Hàng nghìn năm sau, thứ củ khiêm nhường ấy vượt đại dương và cứu châu Âu khỏi những nạn đói triền miên.'
  },
  {
    id: 'inca', country: 'Peru', year: 1450, anim: 'inca',
    title: 'Machu Picchu và đế chế Inca', location: 'Machu Picchu, Peru',
    lat: -13.16, lon: -72.55,
    desc: 'Không cần bánh xe hay chữ viết, người Inca vẫn dựng Machu Picchu từ những khối đá khớp khít không vữa, nối đế chế bằng 40.000 km đường núi và ghi sổ sách bằng nút dây quipu — một đỉnh cao kỹ thuật của châu Mỹ.'
  },
  {
    id: 'greenrev', country: 'Mexico', year: 1966, anim: 'farm',
    title: 'Cách mạng Xanh', location: 'CIMMYT, Texcoco, Mexico',
    lat: 19.5, lon: -98.85,
    desc: 'Từ những cánh đồng thí nghiệm ở Mexico, Norman Borlaug lai tạo giống lúa mì thân lùn năng suất gấp bội, rồi làn sóng giống mới lan sang châu Á. Cách mạng Xanh được cho là đã cứu hàng trăm triệu người khỏi nạn đói.'
  },
  {
    id: 'anesthesia', country: 'Mỹ', year: 1846, anim: 'anesthesia',
    title: 'Gây mê bằng ether', location: 'Bệnh viện Đa khoa Massachusetts, Boston, Mỹ',
    lat: 43.3, lon: -70.0,
    desc: 'Tháng 10 năm 1846 tại Boston, bệnh nhân hít hơi ether rồi ngủ yên suốt ca mổ trước cả giảng đường chật kín người xem. Phẫu thuật thôi là cực hình — y học bước vào kỷ nguyên không đau.'
  },
  {
    id: 'hubble', country: 'Mỹ', year: 1929, anim: 'telescope',
    title: 'Vũ trụ đang giãn nở', location: 'Đài thiên văn Mount Wilson, California, Mỹ',
    lat: 35.2, lon: -116.8,
    desc: 'Bên kính viễn vọng Mount Wilson, Edwin Hubble nhận ra ánh sáng từ các thiên hà đều dịch về phía đỏ: chúng đang rời xa nhau. Vũ trụ không đứng yên mà đang giãn nở — cánh cửa dẫn tới thuyết Big Bang.'
  },
  {
    id: 'container', country: 'Mỹ', year: 1956, anim: 'container',
    title: 'Container hoá vận tải biển', location: 'Cảng Newark, Mỹ',
    lat: 40.2, lon: -72.6,
    desc: 'Con tàu Ideal X của Malcom McLean rời cảng Newark chở 58 chiếc hộp thép chuẩn hoá. Chi phí bốc xếp sụp đổ hàng chục lần — chiếc container khiêm tốn mở toang cánh cửa thương mại toàn cầu.'
  },
  {
    id: 'tv', country: 'Mỹ', year: 1927, anim: 'tv',
    title: 'Truyền hình điện tử', location: 'Rigby, Idaho, Mỹ',
    lat: 43.67, lon: -111.91,
    desc: 'Ý tưởng nảy ra khi cậu bé nông trại Philo Farnsworth cày những luống đất thẳng tắp ở Idaho: quét hình ảnh thành từng dòng điện tử. Năm 1927 anh truyền thành công hình ảnh truyền hình điện tử đầu tiên — màn hình bắt đầu bước vào phòng khách nhân loại.'
  },
  {
    id: 'haiti', country: 'Haiti', year: 1804, anim: 'democracy',
    title: 'Haiti độc lập', location: 'Port-au-Prince, Haiti',
    lat: 18.54, lon: -72.34,
    desc: 'Những người từng bị bắt làm nô lệ vùng lên đánh bại đội quân viễn chinh của Napoléon và lập nên Haiti — nước cộng hoà đầu tiên do người nô lệ tự giải phóng dựng nên. Đòn chí mạng đầu tiên giáng vào chế độ nô lệ toàn cầu.'
  },
  {
    id: 'insulin', country: 'Canada', year: 1921, anim: 'vaccine',
    title: 'Insulin', location: 'Đại học Toronto, Canada',
    lat: 43.66, lon: -79.38,
    desc: 'Trong phòng thí nghiệm mùa hè ở Toronto, Banting và Best chiết xuất được insulin từ tuyến tuỵ. Tiểu đường từ án tử thành bệnh sống chung được; bằng sáng chế được nhượng lại với giá tượng trưng 1 đô-la — món quà cho nhân loại.'
  },
  {
    id: 'montreal', country: 'Canada', year: 1987, anim: 'ozone',
    title: 'Nghị định thư Montreal', location: 'Montreal, Canada',
    lat: 45.5, lon: -73.57,
    desc: 'Trước lỗ thủng ozone ở Nam Cực, các quốc gia cùng ký cam kết loại bỏ CFC — hiệp ước đầu tiên được mọi nước trên thế giới phê chuẩn. Tầng ozone đang dần lành lại: minh chứng nhân loại có thể chung tay sửa lỗi của mình.'
  },
  {
    id: 'panama', country: 'Panama', year: 1914, anim: 'canal',
    title: 'Kênh đào Panama', location: 'Kênh Panama, Panama',
    lat: 9.08, lon: -79.68,
    desc: 'Sau hàng chục năm xẻ núi giữa rừng rậm và dịch bệnh, con kênh hơn 80 km xuyên eo đất nối Đại Tây Dương với Thái Bình Dương. Tàu bè thôi phải vòng qua mũi Horn — bản đồ hàng hải thế giới được vẽ lại.'
  },
  {
    id: 'arch', country: 'Ý', year: 126, anim: 'arch',
    title: 'Vòm và bê tông La Mã', location: 'Đền Pantheon, Roma, Ý',
    lat: 41.9, lon: 12.48,
    desc: 'Người La Mã hoàn thiện vòm cuốn và bê tông, đỉnh cao là mái vòm Pantheon — khối vòm bê tông không cốt thép lớn nhất thế giới, vẫn đứng vững sau gần 1.900 năm. Kỹ thuật của họ nâng đỡ kiến trúc phương Tây suốt nhiều thế kỷ.'
  },
  {
    id: 'haber', country: 'Đức', year: 1909, anim: 'haber',
    title: 'Tổng hợp amoniac Haber–Bosch', location: 'Karlsruhe, Đức',
    lat: 49.0, lon: 8.4,
    desc: 'Fritz Haber ép nitơ trong không khí kết hợp với hydro thành amoniac; Carl Bosch đưa phản ứng lên quy mô công nghiệp. Phân đạm nhân tạo từ đó nuôi sống khoảng một nửa dân số Trái Đất ngày nay.'
  },
  {
    id: 'metric', country: 'Pháp', year: 1795, anim: 'geometry',
    title: 'Hệ mét ra đời', location: 'Paris, Pháp (kinh tuyến Paris)',
    lat: 49.7, lon: 1.9,
    desc: 'Cách mạng Pháp muốn phép đo không thuộc về vua chúa mà thuộc về Trái Đất: một mét bằng một phần mười triệu quãng đường từ cực Bắc tới xích đạo. "Cho mọi thời đại, cho mọi dân tộc" — ngôn ngữ đo lường chung của nhân loại ra đời.'
  },
  {
    id: 'braille', country: 'Pháp', year: 1824, anim: 'braille',
    title: 'Chữ nổi Braille', location: 'Paris, Pháp',
    lat: 48.95, lon: 3.6,
    desc: 'Mất thị lực từ thuở nhỏ, cậu học trò 15 tuổi Louis Braille nén cả bảng chữ cái vào ô sáu chấm nổi vừa một đầu ngón tay. Từ đó người khiếm thị khắp thế giới có thể tự mình đọc và viết — cánh cửa sách vở rộng mở.'
  },
  {
    id: 'quantum', country: 'Đan Mạch', year: 1925, anim: 'quantum',
    title: 'Cơ học lượng tử', location: 'Viện Niels Bohr, Copenhagen, Đan Mạch',
    lat: 55.68, lon: 12.57,
    desc: 'Quanh Niels Bohr ở Copenhagen, Heisenberg, Schrödinger và các đồng nghiệp dựng nên cơ học lượng tử — thứ vật lý kỳ lạ nơi hạt cũng là sóng. Chính nó là nền móng của transistor, laser và cả thế giới điện tử hôm nay.'
  },
  {
    id: 'crispr', country: 'Thuỵ Điển', year: 2012, anim: 'dna',
    title: 'Chiếc kéo gen CRISPR-Cas9', location: 'Umeå, Thuỵ Điển',
    lat: 63.83, lon: 20.26,
    desc: 'Emmanuelle Charpentier và Jennifer Doudna biến hệ phòng vệ của vi khuẩn thành chiếc kéo phân tử cắt-dán ADN chính xác đến từng chữ cái di truyền. Kỷ nguyên chỉnh sửa sự sống — cùng những câu hỏi lớn về ranh giới của nó — bắt đầu.'
  },
  {
    id: 'higgs', country: 'Thuỵ Sĩ', year: 2012, anim: 'collider',
    title: 'Tìm thấy hạt Higgs', location: 'CERN, Genève, Thuỵ Sĩ',
    lat: 45.9, lon: 7.1,
    desc: 'Trong đường hầm 27 km dưới biên giới Pháp – Thuỵ Sĩ, những va chạm proton tại CERN làm lộ diện hạt Higgs sau nửa thế kỷ săn lùng. Mảnh ghép cuối của Mô hình Chuẩn — thứ trao khối lượng cho vật chất — đã được tìm thấy.'
  },
  {
    id: 'ivf', country: 'Anh', year: 1978, anim: 'microscope',
    title: 'Em bé ống nghiệm đầu tiên', location: 'Oldham, Anh',
    lat: 53.54, lon: -2.11,
    desc: 'Ngày 25 tháng 7 năm 1978, Louise Brown chào đời ở Oldham — em bé đầu tiên được thụ tinh trong ống nghiệm. Từ tiếng khóc ấy, hơn mười triệu em bé IVF đã ra đời, mang hy vọng đến các gia đình hiếm muộn khắp thế giới.'
  },
  {
    id: 'indus', country: 'Pakistan', year: -2600, anim: 'wall',
    title: 'Mohenjo-daro — đô thị quy hoạch', location: 'Mohenjo-daro, Sindh, Pakistan',
    lat: 27.33, lon: 68.14,
    desc: 'Bên dòng Indus, phố xá cắt nhau vuông vắn, gạch nung cùng một khuôn, nhà nào cũng có giếng và cống ngầm — 4.600 năm trước, con người đã quy hoạch thành phố vì sức khoẻ cộng đồng.'
  },
  {
    id: 'genji', country: 'Nhật Bản', year: 1010, anim: 'writing',
    title: 'Truyện Genji — tiểu thuyết đầu tiên', location: 'Kyoto (Heian-kyō), Nhật Bản',
    lat: 35.01, lon: 135.77,
    desc: 'Giữa cung đình Heian, nữ quan Murasaki Shikibu viết 54 chương về tình yêu, quyền lực và cái đẹp chóng tàn — cuốn tiểu thuyết tâm lý đầu tiên của nhân loại, sớm hơn Cervantes sáu thế kỷ.'
  },
  {
    id: 'curie', country: 'Pháp', year: 1898, anim: 'atom',
    title: 'Marie Curie & hiện tượng phóng xạ', location: 'Paris, Pháp',
    lat: 47.9, lon: 2.8,
    desc: 'Trong nhà kho mái tôn dột ở Paris, Marie và Pierre Curie nghiền hàng tấn quặng để tìm thứ ánh sáng xanh tự phát — radium. Phóng xạ mở đường cho vật lý hạt nhân và xạ trị ung thư.'
  },
  {
    id: 'ors', country: 'Bangladesh', year: 1968, anim: 'vaccine',
    title: 'Oresol — thìa muối đường cứu triệu người', location: 'Dhaka, Bangladesh',
    lat: 23.78, lon: 90.4,
    desc: 'Các bác sĩ ở Dhaka chứng minh một ly nước pha muối và đường cứu được người mất nước vì tiêu chảy — không cần kim truyền. Phương thuốc rẻ nhất lịch sử đã cứu hàng chục triệu sinh mạng.'
  },
];

// Nút nhảy nhanh theo thời đại (year = mốc đến của thanh thời gian).
export const ERAS = [
  { label: 'Tiền sử', year: -300000 },
  { label: 'Cổ đại', year: -2500 },
  { label: 'Trung đại', year: 1100 },
  { label: 'Cận đại', year: 1800 },
  { label: 'Hiện đại', year: 1950 },
  { label: 'Hôm nay', year: 2026 }
];
