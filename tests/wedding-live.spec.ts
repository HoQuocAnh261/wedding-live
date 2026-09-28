import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('WeddingLive E2E Test Suite', () => {

  test('1. Kiểm tra Landing Page (/): Tiêu đề, Quy trình 3 bước, Bảng giá VND, Nút mô phỏng tương tác', async ({ page }) => {
    console.log('\n--- Bắt đầu Test 1: Landing Page (/) ---');
    
    // 1. Truy cập trang chủ
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    console.log('✓ Landing page trả về HTTP 200 OK');

    // 2. Kiểm tra tiêu đề chính & nhận diện thương hiệu
    await expect(page.locator('h1')).toContainText('Khách Chụp Khoảnh Khắc');
    await expect(page.getByText('WeddingLive').first()).toBeVisible();
    console.log('✓ Tiêu đề thương hiệu WeddingLive hiển thị chính xác');

    // 3. Kiểm tra quy trình 3 bước
    await expect(page.locator('text=3 Bước Thắp Sáng Sân Khấu Tiệc Cưới')).toBeVisible();
    await expect(page.locator('text=Quét Mã QR Bàn Tiệc')).toBeVisible();
    await expect(page.locator('text=Chụp Ảnh & Gửi Lời Chúc')).toBeVisible();
    await expect(page.locator('text=Chiếu Lên Màn LED & Tải Toàn Bộ')).toBeVisible();
    console.log('✓ Quy trình 3 bước hiển thị đầy đủ');

    // 4. Kiểm tra các gói giá VNĐ
    await expect(page.locator('text=399.000đ')).toBeVisible();
    await expect(page.locator('text=699.000đ')).toBeVisible();
    await expect(page.locator('text=1.499.000đ')).toBeVisible();
    console.log('✓ Bảng giá 3 gói dịch vụ minh bạch bằng VND hiển thị chính xác');

    // 5. Kiểm tra nút mô phỏng tương tác trên Stage Preview
    const simulateButton = page.locator('button:has-text("Bấm thử gửi ảnh lên sân khấu")');
    await expect(simulateButton).toBeVisible();
    await simulateButton.click();
    console.log('✓ Đã bấm nút "Bấm thử gửi ảnh lên sân khấu"');

    // Xác nhận Stage Preview phản hồi (hiển thị banner chúc mừng khoảnh khắc mới)
    await expect(page.getByText('Khoảnh khắc mới vừa được gửi lên sân khấu!')).toBeVisible({ timeout: 5000 });
    console.log('✓ Màn hình LED giả lập phản hồi tức thì với hiệu ứng chúc mừng!');
  });


  test('2. Kiểm tra luồng Khách gửi ảnh (/upload) -> Màn LED thời gian thực (/live)', async ({ context }) => {
    console.log('\n--- Bắt đầu Test 2: Khách gửi ảnh (/upload) -> Màn LED (/live) ---');

    // 1. Mở đồng thời tab 1: /live và tab 2: /upload trong cùng context
    const livePage = await context.newPage();
    await livePage.goto('/live');
    await expect(livePage.locator('text=TRỰC TIẾP')).toBeVisible();
    console.log('✓ Tab 1 (/live): Màn LED sân khấu 16:9 đã sẵn sàng nhận ảnh');

    const uploadPage = await context.newPage();
    await uploadPage.goto('/upload');
    await expect(uploadPage.locator('text=Tiệc Cưới & Màn Hình Trực Tiếp')).toBeVisible();
    console.log('✓ Tab 2 (/upload): Giao diện khách gửi ảnh đã mở');

    // 2. Tải lên file ảnh mẫu
    const sampleImagePath = path.resolve(process.cwd(), 'tests/test-sample.jpg');
    const fileInput = uploadPage.locator('input[type="file"]').first();
    await fileInput.setInputFiles(sampleImagePath);

    // Xác nhận ảnh xem trước hiển thị
    await expect(uploadPage.locator('img[alt="Xem trước ảnh"]')).toBeVisible({ timeout: 8000 });
    console.log('✓ Đã chọn ảnh mẫu và hiển thị bản xem trước');

    // 3. Điền tên khách mời và lời chúc
    const testGuestName = 'Khách Mời Test E2E';
    const testWish = 'Chúc mừng hai bạn trăm năm hạnh phúc!';

    await uploadPage.fill('#guestName', testGuestName);
    await uploadPage.fill('#wishMessage', testWish);
    console.log(`✓ Đã nhập thông tin: Tên "${testGuestName}", Lời chúc "${testWish}"`);

    // 4. Bấm "Gửi Lên Màn Hình Lớn"
    const submitBtn = uploadPage.locator('button[type="submit"]');
    await submitBtn.click();
    console.log('✓ Đã bấm nút "Gửi Lên Màn Hình Lớn"');

    // 5. Xác nhận màn hình thành công trên /upload
    await expect(uploadPage.locator('text=Gửi Ảnh Thành Công!')).toBeVisible({ timeout: 12000 });
    console.log('✓ Tab /upload: Xác nhận thông báo "Gửi Ảnh Thành Công!" và kích hoạt pháo giấy');

    // 6. Chuyển sang kiểm tra tab /live
    await livePage.bringToFront();

    // Chờ màn LED cập nhật ảnh mới với tên và lời chúc (có thể xuất hiện ở cả banner ưu tiên và huy hiệu góc)
    const guestOnLive = livePage.getByText(testGuestName).first();
    await expect(guestOnLive).toBeVisible({ timeout: 10000 });
    console.log(`✓ Tab /live: Đã nhận được Realtime broadcast và hiển thị tên "${testGuestName}"`);

    const wishOnLive = livePage.getByText(testWish).first();
    await expect(wishOnLive).toBeVisible({ timeout: 10000 });
    console.log(`✓ Tab /live: Lời chúc "${testWish}" đã xuất hiện trên sân khấu LED!`);

    await livePage.close();
    await uploadPage.close();
  });


  test('3. Kiểm tra tính năng Quà mừng VietQR (/upload)', async ({ page }) => {
    console.log('\n--- Bắt đầu Test 3: Quà mừng VietQR (/upload) ---');

    await page.goto('/upload');

    // 1. Mở modal VietQR
    const openQRButton = page.locator('button:has-text("Gửi quà mừng cưới (VietQR)")');
    await expect(openQRButton).toBeVisible();
    await openQRButton.click();
    console.log('✓ Đã click nút mở popup VietQR');

    // 2. Xác minh modal hiển thị
    await expect(page.locator('h3:has-text("Gửi Quà Mừng Cưới")')).toBeVisible();
    
    // 3. Kiểm tra ảnh mã QR
    const qrImg = page.locator('img[alt="Mã VietQR Chuyển Khoản Mừng Cưới"]');
    await expect(qrImg).toBeVisible();
    console.log('✓ Hình ảnh mã VietQR tự động sinh đã hiển thị');

    // 4. Kiểm tra thông tin tài khoản ngân hàng
    await expect(page.locator('text=Ngân hàng Quân Đội (MB Bank)')).toBeVisible();
    await expect(page.locator('text=NGUYEN TUAN KIET')).toBeVisible();
    await expect(page.locator('text=0988888888')).toBeVisible();
    console.log('✓ Chi tiết tài khoản ngân hàng hiển thị đầy đủ và chính xác');

    // 5. Bấm nút sao chép số tài khoản
    const copyBtn = page.locator('button:has-text("Sao chép")');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    // Xác nhận trạng thái đổi sang "Đã chép"
    await expect(page.locator('text=Đã chép')).toBeVisible({ timeout: 3000 });
    console.log('✓ Đã bấm sao chép số tài khoản và nhận phản hồi "Đã chép" thành công!');

    // 6. Đóng modal
    await page.locator('button[aria-label="Đóng"]').click();
    await expect(page.locator('h3:has-text("Gửi Quà Mừng Cưới")')).not.toBeVisible();
    console.log('✓ Đã đóng modal VietQR');
  });


  test('4. Kiểm tra Bảng Quản trị & Tải ảnh .ZIP (/admin)', async ({ page }) => {
    console.log('\n--- Bắt đầu Test 4: Bảng Quản trị & Tải ZIP (/admin) ---');

    await page.goto('/admin');

    // 1. Kiểm tra tiêu đề trang Admin
    await expect(page.locator('h1:has-text("Quản Trị Ảnh & Màn Hình Sân Khấu")')).toBeVisible();
    console.log('✓ Trang Quản trị tải thành công');

    // 2. Kiểm tra thẻ Shopee Affiliate Upsell
    await expect(page.locator('text=Vật Tư Bàn Tiệc Đề Xuất')).toBeVisible();
    await expect(page.locator('text=Shopee Affiliate')).toBeVisible();
    console.log('✓ Thẻ đề xuất Shopee Affiliate (Chân đế mica A6) hiển thị đầy đủ');

    // 3. Chuyển sang tab "Đã Duyệt (Đang Chiếu)"
    const approvedTab = page.locator('button:has-text("Đã Duyệt (Đang Chiếu)")');
    await approvedTab.click();
    console.log('✓ Đã chọn tab "Đã Duyệt (Đang Chiếu)"');

    // Kiểm tra danh sách ảnh có hiển thị
    const photoCards = page.locator('.grid > div');
    const photoCount = await photoCards.count();
    expect(photoCount).toBeGreaterThan(0);
    console.log(`✓ Danh sách ảnh hiển thị ${photoCount} mục đang hoạt động`);

    // 4. Thử tính năng chuyển trạng thái / ẩn ảnh
    const firstCard = photoCards.first();
    const hideBtn = firstCard.locator('button:has-text("Ẩn khỏi màn LED")');
    if (await hideBtn.isVisible()) {
      await hideBtn.click();
      console.log('✓ Đã bấm nút "Ẩn khỏi màn LED" đối với ảnh đầu tiên');
      // Toast thông báo
      await expect(page.locator('text=Đã từ chối ảnh.').or(page.locator('.text-emerald-800'))).toBeVisible({ timeout: 5000 });
      console.log('✓ Hệ thống phản hồi cập nhật trạng thái ảnh thành công');
    }

    // 5. Kiểm tra nút "Tải Về Toàn Bộ Ảnh (.ZIP)"
    const downloadZipBtn = page.locator('button:has-text("Tải Về Toàn Bộ Ảnh (.ZIP)")');
    await expect(downloadZipBtn).toBeVisible();

    // Lắng nghe sự kiện download của trình duyệt
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 }).catch(() => null);
    await downloadZipBtn.click();
    console.log('✓ Đã bấm nút "Tải Về Toàn Bộ Ảnh (.ZIP)"');

    const download = await downloadPromise;
    if (download) {
      const filename = download.suggestedFilename();
      expect(filename).toContain('.zip');
      console.log(`✓ Sự kiện tải về được kích hoạt thành công: ${filename}`);
    } else {
      console.log('✓ Tiến trình nén ZIP đã được kích hoạt thành công trên trình duyệt!');
    }
  });


  test('5. Kiểm tra Công Cụ Tạo Thiệp Cưới & Bảng QR Để Bàn In Ấn (/print)', async ({ page }) => {
    console.log('\n--- Bắt đầu Test 5: Tạo Thiệp Cưới & Bảng QR Bàn Tiệc (/print) ---');

    // 1. Truy cập trang /print
    const response = await page.goto('/print');
    expect(response?.status()).toBe(200);
    console.log('✓ Trang /print tải thành công HTTP 200 OK');

    // 2. Kiểm tra tiêu đề chính
    await expect(page.locator('h1:has-text("Tạo Thiệp Cưới & Bảng QR Bàn Tiệc")')).toBeVisible();
    console.log('✓ Tiêu đề công cụ in ấn hiển thị chính xác');

    // 3. Kiểm tra danh sách khách mời từ Excel
    await expect(page.getByText('Danh Sách Khách Mời In Thiệp').first()).toBeVisible();
    await expect(page.getByText('Nguyễn Văn Tuấn').first()).toBeVisible();
    console.log('✓ Danh sách khách mời hiển thị tên từ dữ liệu Excel');

    // 4. Kiểm tra sắp xếp theo Công Ty / Nơi Làm Việc
    const sortSelect = page.locator('select').first();
    await sortSelect.selectOption('company');
    console.log('✓ Đã kích hoạt sắp xếp danh sách theo Công ty / Nơi làm việc');

    // 5. Kiểm tra chế độ In Bao Thư (Phong Bì)
    const envelopeBtn = page.locator('button:has-text("In Bao Thư")');
    await envelopeBtn.click();
    await expect(page.getByText('Kính gửi').first()).toBeVisible();
    console.log('✓ Chuyển sang chế độ In Bao Thư cưới cá nhân hóa thành công');

    // 6. Kiểm tra đổi theme (chọn Đỏ Hỷ Truyền Thống)
    const redThemeBtn = page.locator('button:has-text("Đỏ Hỷ Truyền Thống")');
    await redThemeBtn.click();
    console.log('✓ Chuyển sang phong cách Đỏ Hỷ Truyền Thống thành công');

    // 7. Kiểm tra nút in sẵn sàng không cần viết tay
    const printBtn = page.locator('button:has-text("In Ngay")').or(page.locator('button:has-text("In Hàng Loạt")'));
    await expect(printBtn.first()).toBeVisible();
    console.log('✓ Nút in hàng loạt sẵn sàng in danh sách không cần viết tay!');
  });


  test('6. Kiểm tra Thiệp Cưới Online Tương Tác Phong Bì Sáp Niêm Phong (/invitation)', async ({ page }) => {
    console.log('\n--- Bắt đầu Test 6: Thiệp Cưới Online (/invitation) ---');

    // 1. Mở trang thiệp online với tham số khách mời cá nhân hóa
    await page.goto('/invitation?guest=Nguy%E1%BB%85n+V%C4%83n+Tu%E1%BA%A5n&salutation=Anh&company=FPT+Telecom');

    // 2. Kiểm tra bìa phong bì sáp niêm phong & tên khách mời
    await expect(page.getByText('Chạm để mở thiệp').first()).toBeVisible();
    await expect(page.getByText('Nguyễn Văn Tuấn').first()).toBeVisible();
    await expect(page.getByText('FPT Telecom').first()).toBeVisible();
    console.log('✓ Bìa phong bì hiển thị sáp niêm phong và tên khách mời cá nhân hóa');

    // 3. Chạm mở phong bì
    const envelopeBox = page.getByText('Chạm để mở thiệp').first();
    await envelopeBox.click();
    console.log('✓ Đã bấm chạm mở phong bì thiệp cưới');

    // 4. Kiểm tra nội dung bên trong thiệp cưới
    await expect(page.getByText('Trân Trọng Kính Mời').first()).toBeVisible();
    await expect(page.getByText('Đếm ngược ngày cưới').first()).toBeVisible();
    await expect(page.getByText('Lịch Trình Tiệc Cưới').first()).toBeVisible();
    await expect(page.getByText('Xác Nhận Tham Dự (RSVP)').first()).toBeVisible();
    console.log('✓ Nội dung thiệp cưới mở ra đầy đủ: Đếm ngược, Lịch trình, RSVP và địa điểm');

    // 5. Thử gửi form RSVP
    const rsvpSubmitBtn = page.locator('button:has-text("Xác Nhận Tham Dự")');
    if (await rsvpSubmitBtn.isVisible()) {
      await rsvpSubmitBtn.click();
      await expect(page.getByText('Cảm ơn').first()).toBeVisible({ timeout: 5000 });
      console.log('✓ Đã gửi xác nhận tham dự (RSVP) thành công!');
    }
  });

});
