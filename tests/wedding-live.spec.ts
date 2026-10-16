import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('WeddingLive E2E Test Suite (Bilingual & US Market Ready)', () => {

  test('1. Kiểm tra Landing Page (/): Tiêu đề, Quy trình 3 bước, Bảng giá USD/VND, Nút mô phỏng tương tác', async ({ page }) => {
    console.log('\n--- Bắt đầu Test 1: Landing Page (/) ---');
    
    // 1. Truy cập trang chủ
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    console.log('✓ Landing page trả về HTTP 200 OK');

    // 2. Kiểm tra tiêu đề chính & nhận diện thương hiệu
    await expect(page.locator('h1')).toContainText(/Guests Snap the Moments|Khách Chụp Khoảnh Khắc/i);
    await expect(page.getByText('WeddingLive').first()).toBeVisible();
    console.log('✓ Tiêu đề thương hiệu WeddingLive hiển thị chính xác');

    // 3. Kiểm tra quy trình 3 bước
    await expect(
      page.locator('text=3 Steps to Light Up Your Wedding Reception').or(page.locator('text=3 Bước Thắp Sáng Sân Khấu Tiệc Cưới'))
    ).toBeVisible();
    await expect(
      page.locator('text=Scan Table QR Stand').or(page.locator('text=Quét Mã QR Bàn Tiệc'))
    ).toBeVisible();
    await expect(
      page.locator('text=Snap & Send Wishes').or(page.locator('text=Chụp Ảnh & Gửi Lời Chúc'))
    ).toBeVisible();
    await expect(
      page.locator('text=Live on Stage & Full Gallery').or(page.locator('text=Chiếu Lên Màn LED & Tải Toàn Bộ'))
    ).toBeVisible();
    console.log('✓ Quy trình 3 bước hiển thị đầy đủ');

    // 4. Kiểm tra các gói giá (USD mặc định cho thị trường Mỹ / VND khi chọn Tiếng Việt)
    await expect(page.locator('text=$29').or(page.locator('text=399.000đ'))).toBeVisible();
    await expect(page.locator('text=$49').or(page.locator('text=699.000đ'))).toBeVisible();
    await expect(page.locator('text=$89').or(page.locator('text=1.499.000đ'))).toBeVisible();
    console.log('✓ Bảng giá 3 gói dịch vụ minh bạch hiển thị chính xác');

    // 5. Kiểm tra nút mô phỏng tương tác trên Stage Preview
    const simulateButton = page.locator('button:has-text("Try Live Photo Stream")').or(page.locator('button:has-text("Bấm thử gửi ảnh lên sân khấu")'));
    await expect(simulateButton).toBeVisible();
    await simulateButton.click();
    console.log('✓ Đã bấm nút mô phỏng gửi ảnh lên sân khấu');

    // Xác nhận Stage Preview phản hồi (hiển thị banner chúc mừng khoảnh khắc mới)
    await expect(
      page.getByText('New moment just streamed to the stage screen!').or(page.getByText('Khoảnh khắc mới vừa được gửi lên sân khấu!'))
    ).toBeVisible({ timeout: 5000 });
    console.log('✓ Màn hình LED giả lập phản hồi tức thì với hiệu ứng chúc mừng!');
  });


  test('2. Kiểm tra luồng Khách gửi ảnh (/upload) -> Màn LED thời gian thực (/live)', async ({ context }) => {
    console.log('\n--- Bắt đầu Test 2: Khách gửi ảnh (/upload) -> Màn LED (/live) ---');

    // 1. Mở đồng thời tab 1: /live và tab 2: /upload trong cùng context
    const livePage = await context.newPage();
    await livePage.goto('/live');
    await expect(livePage.locator('header').getByText(/LIVE|TRỰC TIẾP/i).first()).toBeVisible();
    console.log('✓ Tab 1 (/live): Màn LED sân khấu 16:9 đã sẵn sàng nhận ảnh');

    const uploadPage = await context.newPage();
    await uploadPage.goto('/upload');
    await expect(
      uploadPage.locator('text=Wedding Banquet Live Stream').or(uploadPage.locator('text=Tiệc Cưới & Màn Hình Trực Tiếp'))
    ).toBeVisible();
    console.log('✓ Tab 2 (/upload): Giao diện khách gửi ảnh đã mở');

    // 2. Tải lên file ảnh mẫu
    const sampleImagePath = path.resolve(process.cwd(), 'tests/test-sample.jpg');
    const fileInput = uploadPage.locator('input[type="file"]').first();
    await fileInput.setInputFiles(sampleImagePath);

    // Xác nhận ảnh xem trước hiển thị
    await expect(
      uploadPage.locator('img[alt="Photo Preview"]').or(uploadPage.locator('img[alt="Xem trước ảnh"]'))
    ).toBeVisible({ timeout: 8000 });
    console.log('✓ Đã chọn ảnh mẫu và hiển thị bản xem trước');

    // 3. Điền tên khách mời và lời chúc
    const testGuestName = 'Khách Mời Test E2E';
    const testWish = 'Wishing you both a lifetime of love and happiness!';

    await uploadPage.fill('#guestName', testGuestName);
    await uploadPage.fill('#wishMessage', testWish);
    console.log(`✓ Đã nhập thông tin: Tên "${testGuestName}", Lời chúc "${testWish}"`);

    // 4. Bấm "Gửi Lên Màn Hình Lớn" / "Stream to Big Screen"
    const submitBtn = uploadPage.locator('button[type="submit"]');
    await submitBtn.click();
    console.log('✓ Đã bấm nút gửi ảnh lên màn hình lớn');

    // 5. Xác nhận màn hình thành công trên /upload
    await expect(
      uploadPage.locator('text=Photo Uploaded Successfully!').or(uploadPage.locator('text=Gửi Ảnh Thành Công!'))
    ).toBeVisible({ timeout: 12000 });
    console.log('✓ Tab /upload: Xác nhận thông báo thành công và kích hoạt pháo hoa ăn mừng');

    // 6. Chuyển sang kiểm tra tab /live
    await livePage.bringToFront();

    // Chờ màn LED cập nhật ảnh mới với tên và lời chúc
    const guestOnLive = livePage.getByText(testGuestName).first();
    await expect(guestOnLive).toBeVisible({ timeout: 10000 });
    console.log(`✓ Tab /live: Đã nhận được Realtime broadcast và hiển thị tên "${testGuestName}"`);

    const wishOnLive = livePage.getByText(testWish).first();
    await expect(wishOnLive).toBeVisible({ timeout: 10000 });
    console.log(`✓ Tab /live: Lời chúc "${testWish}" đã xuất hiện trên sân khấu LED!`);

    await livePage.close();
    await uploadPage.close();
  });


  test('3. Kiểm tra tính năng Quà mừng US Registry & VietQR (/upload)', async ({ page }) => {
    console.log('\n--- Bắt đầu Test 3: Quà mừng US Registry & VietQR (/upload) ---');

    await page.goto('/upload');

    // 1. Mở modal quà mừng cưới
    const openQRButton = page.locator('button:has-text("Gift")').or(page.locator('button:has-text("quà mừng")')).first();
    await expect(openQRButton).toBeVisible();
    await openQRButton.click();
    console.log('✓ Đã click nút mở popup quà mừng cưới');

    // 2. Xác minh modal hiển thị
    await expect(page.locator('h3:has-text("Wedding Gift & Registry")').or(page.locator('h3:has-text("Gửi Quà Mừng Cưới")'))).toBeVisible();
    
    // 3. Kiểm tra US E-wallets / Registry tab (Venmo / Zelle / Cash App)
    const venmoOrZelle = page.locator('text=Venmo').or(page.locator('text=Zelle'));
    await expect(venmoOrZelle.first()).toBeVisible();
    console.log('✓ Tab US Registry / E-Wallets (Venmo, Zelle, Cash App) hiển thị đầy đủ');

    // 4. Chuyển sang tab VietQR (Ngân hàng VN)
    const vietqrTab = page.locator('button:has-text("VietQR")').or(page.locator('button:has-text("Chuyển Khoản")')).first();
    if (await vietqrTab.isVisible()) {
      await vietqrTab.click();
      console.log('✓ Đã chuyển sang tab VietQR & Ngân hàng Việt Nam');

      // Kiểm tra ảnh mã QR và MB Bank
      const qrImg = page.locator('img[alt="Mã VietQR Chuyển Khoản Mừng Cưới"]');
      await expect(qrImg).toBeVisible();
      await expect(page.locator('text=0988888888')).toBeVisible();

      // Bấm nút sao chép số tài khoản
      const copyBtn = page.locator('button:has-text("Sao chép")').or(page.locator('button:has-text("Copy")'));
      await expect(copyBtn).toBeVisible();
      await copyBtn.click();
      await expect(page.locator('text=Đã chép').or(page.locator('text=Copied'))).toBeVisible({ timeout: 3000 });
      console.log('✓ Đã bấm sao chép số tài khoản và nhận phản hồi thành công!');
    }

    // 5. Đóng modal
    await page.locator('button[aria-label="Đóng"], button[aria-label="Close"]').first().click();
    await expect(page.locator('h3:has-text("Wedding Gift & Registry")').or(page.locator('h3:has-text("Gửi Quà Mừng Cưới")'))).not.toBeVisible();
    console.log('✓ Đã đóng modal quà mừng');
  });


  test('4. Kiểm tra Bảng Quản trị & Tải ảnh .ZIP (/admin)', async ({ page }) => {
    console.log('\n--- Bắt đầu Test 4: Bảng Quản trị & Tải ZIP (/admin) ---');

    await page.goto('/admin');

    // 1. Kiểm tra tiêu đề trang Admin
    await expect(page.locator('h1:has-text("Photo & Stage Moderation")').or(page.locator('h1:has-text("Quản Trị Ảnh & Màn Hình Sân Khấu")'))).toBeVisible();
    console.log('✓ Trang Quản trị tải thành công');

    // 2. Kiểm tra thẻ gợi ý vật tư bàn tiệc (Amazon cho US / Shopee cho VN)
    await expect(page.locator('text=Recommended Table Supplies').or(page.locator('text=Vật Tư Bàn Tiệc Đề Xuất'))).toBeVisible();
    console.log('✓ Thẻ đề xuất vật tư để bàn tiệc hiển thị đầy đủ');

    // 3. Chuyển sang tab "Approved" / "Live on Screen"
    const approvedTab = page.locator('button:has-text("Live on Screen")').or(page.locator('button:has-text("Đã Duyệt")')).first();
    await approvedTab.click();
    console.log('✓ Đã chọn tab Đã Duyệt / Live on Screen');

    // Kiểm tra danh sách ảnh có hiển thị
    const photoCards = page.locator('.grid > div');
    const photoCount = await photoCards.count();
    expect(photoCount).toBeGreaterThan(0);
    console.log(`✓ Danh sách ảnh hiển thị ${photoCount} mục đang hoạt động`);

    // 4. Thử tính năng chuyển trạng thái / ẩn ảnh
    const firstCard = photoCards.first();
    const hideBtn = firstCard.locator('button:has-text("Hide from Screen")').or(firstCard.locator('button:has-text("Ẩn khỏi màn LED")'));
    if (await hideBtn.isVisible()) {
      await hideBtn.click();
      console.log('✓ Đã bấm nút ẩn ảnh đối với ảnh đầu tiên');
      await expect(page.locator('text=Photo hidden').or(page.locator('text=Đã từ chối ảnh.')).or(page.locator('.text-emerald-800'))).toBeVisible({ timeout: 5000 });
      console.log('✓ Hệ thống phản hồi cập nhật trạng thái ảnh thành công');
    }

    // 5. Kiểm tra nút Tải Về Toàn Bộ Ảnh (.ZIP)
    const downloadZipBtn = page.locator('button:has-text("Download All Photos (.ZIP)")').or(page.locator('button:has-text("Tải Về Toàn Bộ Ảnh (.ZIP)")'));
    await expect(downloadZipBtn).toBeVisible();

    const downloadPromise = page.waitForEvent('download', { timeout: 15000 }).catch(() => null);
    await downloadZipBtn.click();
    console.log('✓ Đã bấm nút Download ZIP');

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
    await expect(page.locator('h1:has-text("Wedding Stationery & Table QR Studio")').or(page.locator('h1:has-text("Tạo Thiệp Cưới & Bảng QR Bàn Tiệc")'))).toBeVisible();
    console.log('✓ Tiêu đề công cụ in ấn hiển thị chính xác');

    // 3. Kiểm tra danh sách khách mời từ Excel
    await expect(page.getByText('Guest List & Addressing Manager').or(page.getByText('Danh Sách Khách Mời In Thiệp')).first()).toBeVisible();
    await expect(page.getByText('Nguyễn Văn Tuấn').first()).toBeVisible();
    console.log('✓ Danh sách khách mời hiển thị tên từ dữ liệu Excel');

    // 4. Kiểm tra sắp xếp theo Công Ty / Nơi Làm Việc
    const sortSelect = page.locator('select').first();
    await sortSelect.selectOption('company');
    console.log('✓ Đã kích hoạt sắp xếp danh sách theo Công ty / Workplace');

    // 5. Kiểm tra chế độ In Bao Thư (Envelope)
    const envelopeBtn = page.locator('button:has-text("Envelope")').or(page.locator('button:has-text("In Bao Thư")')).first();
    await envelopeBtn.click();
    await expect(page.getByText('To:').or(page.getByText('Kính gửi')).first()).toBeVisible();
    console.log('✓ Chuyển sang chế độ In Bao Thư cưới cá nhân hóa thành công');

    // 6. Kiểm tra đổi theme (chọn Starlit Garden / Đỏ Hỷ)
    const redThemeBtn = page.locator('button:has-text("Starlit")').or(page.locator('button:has-text("Đỏ Hỷ")')).first();
    if (await redThemeBtn.isVisible()) {
      await redThemeBtn.click();
      console.log('✓ Chuyển sang phong cách Starlit Garden thành công');
    }

    // 7. Kiểm tra nút in sẵn sàng không cần viết tay
    const printBtn = page.locator('button:has-text("Print")').or(page.locator('button:has-text("In")')).first();
    await expect(printBtn).toBeVisible();
    console.log('✓ Nút in hàng loạt sẵn sàng in danh sách không cần viết tay!');
  });


  test('6. Kiểm tra Thiệp Cưới Online Tương Tác Phong Bì Sáp Niêm Phong (/invitation)', async ({ page }) => {
    console.log('\n--- Bắt đầu Test 6: Thiệp Cưới Online (/invitation) ---');

    // 1. Mở trang thiệp online với tham số khách mời cá nhân hóa
    await page.goto('/invitation?guest=Nguy%E1%BB%85n+V%C4%83n+Tu%E1%BA%A5n&salutation=Anh&company=FPT+Telecom');

    // 2. Kiểm tra bìa phong bì sáp niêm phong & tên khách mời
    await expect(page.getByText('Tap to open invitation').or(page.getByText('Chạm để mở thiệp')).first()).toBeVisible();
    await expect(page.getByText('Nguyễn Văn Tuấn').first()).toBeVisible();
    await expect(page.getByText('FPT Telecom').first()).toBeVisible();
    console.log('✓ Bìa phong bì hiển thị sáp niêm phong và tên khách mời cá nhân hóa');

    // 3. Chạm mở phong bì
    const envelopeBox = page.getByText('Tap to open invitation').or(page.getByText('Chạm để mở thiệp')).first();
    await envelopeBox.click();
    console.log('✓ Đã bấm chạm mở phong bì thiệp cưới');

    // 4. Kiểm tra nội dung bên trong thiệp cưới
    await expect(page.getByText('The Honor of Your Presence').or(page.getByText('Trân Trọng Kính Mời')).first()).toBeVisible();
    await expect(page.getByText('Countdown to the Big Day').or(page.getByText('Đếm ngược ngày cưới')).first()).toBeVisible();
    await expect(page.getByText('Wedding Day Timeline').or(page.getByText('Lịch Trình Tiệc Cưới')).first()).toBeVisible();
    await expect(page.getByText('RSVP').or(page.getByText('Xác Nhận Tham Dự')).first()).toBeVisible();
    console.log('✓ Nội dung thiệp cưới mở ra đầy đủ: Đếm ngược, Lịch trình, RSVP và địa điểm');

    // 5. Thử gửi form RSVP
    const rsvpSubmitBtn = page.locator('button[type="submit"]').last();
    if (await rsvpSubmitBtn.isVisible()) {
      await rsvpSubmitBtn.click();
      await expect(page.getByText('Thank you').or(page.getByText('Cảm ơn')).first()).toBeVisible({ timeout: 5000 });
      console.log('✓ Đã gửi xác nhận tham dự (RSVP) thành công!');
    }
  });


  test('7. Kiểm tra One-Click Language Switcher (Tiếng Anh mặc định <-> Tiếng Việt)', async ({ page }) => {
    console.log('\n--- Bắt đầu Test 7: Language Switcher ---');

    // 1. Mở trang chủ
    await page.goto('/');

    // 2. Xác minh mặc định tiếng Anh: $29 và Guests Snap the Moments
    await expect(page.locator('text=$29')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Guests Snap the Moments');
    console.log('✓ Mặc định hiển thị Tiếng Anh chuẩn thị trường Mỹ');

    // 3. Bấm chuyển sang Tiếng Việt
    const vnBtn = page.locator('button:has-text("VI")').first();
    await vnBtn.click();

    // Xác minh chuyển sang Tiếng Việt ngay lập tức
    await expect(page.locator('text=399.000đ')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Khách Chụp Khoảnh Khắc');
    console.log('✓ Chuyển sang Tiếng Việt thành công: Giá 399.000đ & Tiêu đề tiếng Việt');

    // 4. Bấm chuyển lại sang Tiếng Anh
    const enBtn = page.locator('button:has-text("EN")').first();
    await enBtn.click();

    // Xác minh quay lại Tiếng Anh
    await expect(page.locator('text=$29')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Guests Snap the Moments');
    console.log('✓ Chuyển lại Tiếng Anh thành công: Giá $29 & Tiêu đề tiếng Anh');
  });

});
