export type Language = 'en' | 'vi';

export interface TranslationDictionary {
  brand: {
    name: string;
    tagline: string;
    subtag: string;
  };
  nav: {
    home: string;
    upload: string;
    uploadBadge: string;
    invitation: string;
    invitationBadge: string;
    print: string;
    printBadge: string;
    live: string;
    liveBadge: string;
    admin: string;
    statusRealtime: string;
    statusDemo: string;
  };
  hero: {
    badgeTech: string;
    badgeLive: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaUpload: string;
    ctaLive: string;
    perkNoApp: string;
    perkCompress: string;
    perkGift: string;
    demoTitle: string;
    demoSubtitle: string;
  };
  steps: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  pricing: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    tier1Name: string;
    tier1Price: string;
    tier1Period: string;
    tier1Desc: string;
    tier1Features: string[];
    tier2Name: string;
    tier2Price: string;
    tier2Period: string;
    tier2Desc: string;
    tier2Features: string[];
    tier2Badge: string;
    tier3Name: string;
    tier3Price: string;
    tier3Period: string;
    tier3Desc: string;
    tier3Features: string[];
    btnChoose: string;
  };
  upload: {
    pageTitle: string;
    pageSubtitle: string;
    cameraBtn: string;
    changePhoto: string;
    previewAlt: string;
    nameLabel: string;
    namePlaceholder: string;
    wishLabel: string;
    wishPlaceholder: string;
    submitBtn: string;
    submitting: string;
    giftBtn: string;
    successTitle: string;
    successDesc: string;
    uploadAnother: string;
    viewLiveBtn: string;
    errorSlowNetwork: string;
    errorSelectPhoto: string;
  };
  live: {
    liveBadge: string;
    waitingTitle: string;
    waitingSubtitle: string;
    sharedBy: string;
    persistentQRTitle: string;
    persistentQRSubtitle: string;
    fullscreen: string;
    exitFullscreen: string;
    photoCount: string;
    speedTitle: string;
  };
  admin: {
    pageTitle: string;
    pageSubtitle: string;
    tabApproved: string;
    tabPending: string;
    btnDownloadZip: string;
    btnDownloading: string;
    btnApprove: string;
    btnReject: string;
    btnDelete: string;
    emptyList: string;
    upsellTitle: string;
    upsellSubtitle: string;
    upsellBadge: string;
    upsellProduct: string;
    upsellDesc: string;
    upsellBtn: string;
  };
  invitation: {
    onlineInviteBadge: string;
    tapToOpen: string;
    tapToOpenSub: string;
    tapHint: string;
    closeEnvelope: string;
    saveTheDate: string;
    formalInviteTitle: string;
    requestHonor: string;
    guestTo: string;
    andGuest: string;
    countdownTitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    timelineTitle: string;
    time1Time: string;
    time1Title: string;
    time1Desc: string;
    time2Time: string;
    time2Title: string;
    time2Desc: string;
    time3Time: string;
    time3Title: string;
    time3Desc: string;
    time4Time: string;
    time4Title: string;
    time4Desc: string;
    venueTitle: string;
    venueName: string;
    venueHall: string;
    venueAddress: string;
    btnGoogleMaps: string;
    rsvpTitle: string;
    rsvpSubtitle: string;
    rsvpNameLabel: string;
    rsvpAttendingLabel: string;
    rsvpOption1: string;
    rsvpOption2: string;
    rsvpOptionNo: string;
    rsvpDietLabel: string;
    rsvpDietRegular: string;
    rsvpDietVeg: string;
    rsvpWishLabel: string;
    rsvpSubmitBtn: string;
    rsvpSuccessTitle: string;
    rsvpSuccessDesc: string;
    stageFeatureTitle: string;
    stageFeatureSubtitle: string;
    stageFeatureDesc: string;
    btnTryLiveStage: string;
    giftTitle: string;
    giftDesc: string;
    btnOpenGiftModal: string;
    btnCopyInviteLink: string;
    linkCopied: string;
    footerThanks: string;
  };
  print: {
    pageTitle: string;
    pageSubtitle: string;
    btnViewOnline: string;
    btnPrintAll: string;
    btnPrintSingle: string;
    step1SelectType: string;
    typeEnvelope: string;
    typeEnvelopeSub: string;
    typeInvitation: string;
    typeInvitationSub: string;
    typeTableStand: string;
    typeTableStandSub: string;
    step2SelectTheme: string;
    guestListTitle: string;
    guestListSubtitle: string;
    btnUploadExcel: string;
    btnUploading: string;
    btnDownloadTemplate: string;
    sortBy: string;
    sortCompany: string;
    sortAddress: string;
    sortGroup: string;
    sortTable: string;
    sortName: string;
    filterCompany: string;
    filterAddress: string;
    filterAll: string;
    searchPlaceholder: string;
    selectAll: string;
    unselectAll: string;
    colName: string;
    colCompany: string;
    colAddress: string;
    colTable: string;
    colGroup: string;
    colActions: string;
    toastExcelSuccess: string;
    toastExcelEmpty: string;
    envelopePreviewTo: string;
    envelopeSealHysu: string;
    tableStandHeading: string;
    tableStandSub: string;
    tableStandScanHint: string;
    tableStandInstruction: string;
  };
  giftModal: {
    modalTitle: string;
    modalSubtitle: string;
    tabRegistryUs: string;
    tabBankVn: string;
    usRegistryNotice: string;
    venmoLabel: string;
    zelleLabel: string;
    cashAppLabel: string;
    payPalLabel: string;
    registryLinksLabel: string;
    registryAmazon: string;
    registryZola: string;
    registryHoneyfund: string;
    quickSelectAmount: string;
    bankTransferHint: string;
    copyAccountBtn: string;
    copied: string;
    closeBtn: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  // =========================================================================
  // ENGLISH (DEFAULT - US MARKET TAILORED)
  // =========================================================================
  en: {
    brand: {
      name: 'WeddingLive',
      tagline: 'Live Banquet Slideshow & Guest Photo Sharing',
      subtag: 'US & Global Edition',
    },
    nav: {
      home: 'Overview',
      upload: 'Guest Camera',
      uploadBadge: 'Live',
      invitation: 'Digital Invites',
      invitationBadge: 'Wax Seal',
      print: 'Stationery Studio',
      printBadge: 'Batch',
      live: 'Big Screen',
      liveBadge: '16:9',
      admin: 'Moderation',
      statusRealtime: 'Supabase Realtime',
      statusDemo: 'Demo Live Mode',
    },
    hero: {
      badgeTech: 'Wedding Tech 2026',
      badgeLive: 'Live Banquet Photo Stream on Stage',
      titleLine1: 'Guests Snap the Moments.',
      titleLine2: 'Streamed Live on Big Screen.',
      subtitle:
        'Transform your guests’ smartphones into a live digital disposable camera. Guests scan their table QR code, snap selfies or heartfelt wishes, and watch them stream onto the banquet LED wall in real time!',
      ctaUpload: 'Try Guest Upload Camera',
      ctaLive: 'View 16:9 Big Screen',
      perkNoApp: 'Zero app download required',
      perkCompress: 'Fast 4G compression under 800KB',
      perkGift: 'Built-in Cash Gift & Venmo/Zelle',
      demoTitle: 'Live Stage Simulation',
      demoSubtitle: 'Test the Interactive Stage LED Screen in Real Time',
    },
    steps: {
      sectionBadge: 'How It Works',
      sectionTitle: '3 Steps to Light Up Your Wedding Reception',
      sectionSubtitle:
        'Frictionless photo sharing with zero logins and zero app downloads for your guests.',
      step1Title: 'Scan Table QR Stand',
      step1Desc:
        'Every banquet table has a luxury A6 QR stand. Guests simply aim their phone camera to open the instant web camera.',
      step2Title: 'Snap & Send Wishes',
      step2Desc:
        'Guests snap candid selfies, couple moments, or table toasts, add their name and heartfelt wishes, and hit send.',
      step3Title: 'Live on Stage & Full Gallery',
      step3Desc:
        'Photos flash onto the main stage screen with smooth transitions, and the couple can download the full-res gallery as a .ZIP file!',
    },
    pricing: {
      sectionBadge: 'Transparent Pricing',
      sectionTitle: 'Affordable Packages for Your Special Day',
      sectionSubtitle: 'Zero hidden fees. Complete access for your rehearsal dinner and wedding day.',
      tier1Name: 'Starter Reception',
      tier1Price: '$29',
      tier1Period: 'per wedding',
      tier1Desc: 'Ideal for intimate weddings and micro-gatherings (up to 75 guests).',
      tier1Features: [
        'Live 16:9 projector screen',
        'Up to 150 photo uploads',
        '24-hour live storage access',
        'Standard printable Table QR codes',
        'Client-side fast compression',
      ],
      tier2Name: 'Live Stage Pro',
      tier2Price: '$49',
      tier2Period: 'per wedding',
      tier2Desc: 'Our most popular suite for banquet halls and ballroom celebrations.',
      tier2Features: [
        'Unlimited guest photo uploads',
        'Sub-second real-time live screen',
        'Host Admin moderation dashboard',
        'One-click bulk .ZIP photo download',
        'Digital gift registry (Venmo / Zelle / Card)',
        'Personalized couple branding',
      ],
      tier2Badge: 'Most Popular',
      tier3Name: 'Premier Wedding Suite',
      tier3Price: '$89',
      tier3Period: 'per wedding',
      tier3Desc: 'Complete wedding tech experience including luxury stationery batch printing.',
      tier3Features: [
        'Everything in Live Stage Pro',
        'Interactive Mobile Invitation with 3D Wax Seal',
        'Excel Guest Import & Auto Addressing (No handwriting)',
        '10 Luxury Stationery & Table Stand Themes',
        'RSVP Tracking & Guest Dietary Manager',
        'Priority 24/7 Concierge Support',
      ],
      btnChoose: 'Get Started Now',
    },
    upload: {
      pageTitle: 'Wedding Banquet Live Stream',
      pageSubtitle: 'Share your candid snaps & sweet wishes with the newlyweds on the big screen!',
      cameraBtn: 'Take a Photo or Choose from Library',
      changePhoto: 'Change Photo',
      previewAlt: 'Photo Preview',
      nameLabel: 'Your Name or Nickname',
      namePlaceholder: 'e.g., Alex & Sarah (College Friends)',
      wishLabel: 'Your Warm Wish for the Newlyweds',
      wishPlaceholder: 'Wishing you both a lifetime of unconditional love and happiness! 🥂✨',
      submitBtn: '🚀 Stream to Big Screen',
      submitting: 'Compressing & Streaming...',
      giftBtn: 'Send a Wedding Gift (Venmo / Cash Gift)',
      successTitle: 'Photo Uploaded Successfully!',
      successDesc: 'Your memory has been streamed to the big screen! Look up at the stage ✨',
      uploadAnother: 'Upload Another Memory',
      viewLiveBtn: 'View 16:9 Live Stage Screen',
      errorSlowNetwork: 'Upload timed out. Please check your network and try again!',
      errorSelectPhoto: 'Please capture or select a photo first!',
    },
    live: {
      liveBadge: 'LIVE ON STAGE',
      waitingTitle: 'Scan the QR Code to Share Your Moments Live!',
      waitingSubtitle: 'Photos uploaded by guests will instantly appear on this screen.',
      sharedBy: 'Shared with love by',
      persistentQRTitle: 'Scan to Share Memories',
      persistentQRSubtitle: 'Aim your camera to join the live feed',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit Fullscreen',
      photoCount: 'Live Photos',
      speedTitle: 'Auto Slide: 5s',
    },
    admin: {
      pageTitle: 'Photo & Stage Moderation',
      pageSubtitle: 'Review incoming guest uploads, approve or hide photos, and download the full gallery.',
      tabApproved: 'Live on Screen',
      tabPending: 'Pending Approval',
      btnDownloadZip: 'Download All Photos (.ZIP)',
      btnDownloading: 'Archiving Photos...',
      btnApprove: 'Approve to Screen',
      btnReject: 'Hide / Reject',
      btnDelete: 'Delete',
      emptyList: 'No photos in this view yet.',
      upsellTitle: 'Recommended Table Supplies',
      upsellSubtitle: 'Amazon / Store Picks',
      upsellBadge: 'Top Pick for Weddings',
      upsellProduct: 'A6 Clear Acrylic Table Sign Holders (Pack of 12)',
      upsellDesc:
        'High-transparency acrylic stands with gold borders to showcase your table QR codes and menus beautifully.',
      upsellBtn: 'View Details & Order on Amazon',
    },
    invitation: {
      onlineInviteBadge: 'Interactive Wedding Invitation',
      tapToOpen: 'Tap to open invitation',
      tapToOpenSub: 'Tap to Open Invitation',
      tapHint: 'Tap the wax seal to unveil the full celebration details ✨',
      closeEnvelope: 'Close envelope',
      saveTheDate: 'SAVE THE DATE',
      formalInviteTitle: 'Celebration of Marriage',
      requestHonor: 'The Honor of Your Presence is Requested',
      guestTo: 'Cordially Inviting',
      andGuest: 'and Guest',
      countdownTitle: 'Countdown to the Big Day',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Mins',
      seconds: 'Secs',
      timelineTitle: 'Wedding Day Timeline',
      time1Time: '5:30 PM',
      time1Title: 'Guest Arrival & Welcome Drinks',
      time1Desc: 'Cocktail hour and photo opportunities at the floral archway',
      time2Time: '6:00 PM',
      time2Title: 'Marriage Ceremony',
      time2Desc: 'Exchange of vows, rings, and champagne celebration',
      time3Time: '6:30 PM',
      time3Title: 'Dinner Banquet & Speeches',
      time3Desc: 'Multi-course dinner reception, heartfelt toasts, and first dances',
      time4Time: '7:30 PM',
      time4Title: 'Live Stage Photo Sharing',
      time4Desc: 'Scan your table QR code to stream your table selfies onto the stage LED screen!',
      venueTitle: 'Ceremony & Reception Venue',
      venueName: 'The Grand Ballroom & Gardens',
      venueHall: 'Terrace & Grand Pavilion',
      venueAddress: '108 Beverly Boulevard, Los Angeles, CA 90210',
      btnGoogleMaps: 'Open Directions in Google Maps',
      rsvpTitle: 'Kindly Respond',
      rsvpSubtitle: 'RSVP by October 10th to help us curate your seat and dinner',
      rsvpNameLabel: 'Your Full Name:',
      rsvpAttendingLabel: 'Will you be attending?',
      rsvpOption1: 'Joyfully Accepts (1 Guest)',
      rsvpOption2: 'Joyfully Accepts (2 Guests)',
      rsvpOptionNo: 'Regretfully Declines',
      rsvpDietLabel: 'Dietary Preference:',
      rsvpDietRegular: 'Standard Chef Menu',
      rsvpDietVeg: 'Vegetarian / Vegan',
      rsvpWishLabel: 'Message for the Bride & Groom (Optional):',
      rsvpSubmitBtn: 'Confirm RSVP',
      rsvpSuccessTitle: 'Thank You for Responding!',
      rsvpSuccessDesc: 'We have received your RSVP and cannot wait to celebrate together!',
      stageFeatureTitle: 'Interactive Banquet Experience',
      stageFeatureSubtitle: 'Stream Your Moments Live',
      stageFeatureDesc:
        'During the reception, capture selfies and table toasts to display them live on the ballroom big screen!',
      btnTryLiveStage: 'Try Guest Camera Now',
      giftTitle: 'Wedding Registry & Cash Gift',
      giftDesc: 'For dear friends and family wishing to shower the couple with love from near or far',
      btnOpenGiftModal: 'Open Gift & Registry Options',
      btnCopyInviteLink: 'Copy Personalized Invite Link',
      linkCopied: 'Link Copied to Clipboard!',
      footerThanks: 'Minh Anh & Tuấn Kiệt look forward to celebrating with you! ❤️',
    },
    print: {
      pageTitle: 'Wedding Stationery & Table QR Studio',
      pageSubtitle: 'Import guests from Excel, sort by workplace/city, and batch print without handwriting',
      btnViewOnline: 'Preview Online Mobile Invite',
      btnPrintAll: 'Batch Print All Selected',
      btnPrintSingle: 'Print Current Preview',
      step1SelectType: '1. Select Stationery Format',
      typeEnvelope: '✉️ Outer Envelope',
      typeEnvelopeSub: 'Addressed with name & table',
      typeInvitation: '📜 Formal Invitation',
      typeInvitationSub: 'A5 / A6 Card stock',
      typeTableStand: '🍽️ Table QR Sign',
      typeTableStandSub: 'A6 Acrylic stand',
      step2SelectTheme: '2. Select Luxury Design Theme',
      guestListTitle: 'Guest List & Addressing Manager',
      guestListSubtitle: 'Upload your guest spreadsheet to auto-fill every envelope and invitation card',
      btnUploadExcel: 'Upload Excel (.xlsx)',
      btnUploading: 'Reading File...',
      btnDownloadTemplate: 'Download Sample (.xlsx)',
      sortBy: 'Sort List By:',
      sortCompany: 'Company / Workplace',
      sortAddress: 'City / Address',
      sortGroup: 'Guest Group',
      sortTable: 'Table Number',
      sortName: 'Name A-Z',
      filterCompany: 'Filter Company:',
      filterAddress: 'Filter City:',
      filterAll: 'All',
      searchPlaceholder: 'Search by guest name, company, or table...',
      selectAll: 'Select All',
      unselectAll: 'Deselect All',
      colName: 'Guest Name & Title',
      colCompany: 'Company / Workplace',
      colAddress: 'City / Region',
      colTable: 'Table',
      colGroup: 'Group',
      colActions: 'Online Link',
      toastExcelSuccess: 'Successfully imported guests from Excel spreadsheet!',
      toastExcelEmpty: 'No valid guest rows detected. Please check column headers.',
      envelopePreviewTo: 'Cordially Inviting',
      envelopeSealHysu: 'Celebration',
      tableStandHeading: 'Banquet Photo Sharing',
      tableStandSub: 'Scan to stream selfies live to the stage screen',
      tableStandScanHint: 'Aim camera to upload photo',
      tableStandInstruction:
        'Take selfies with your table companions and leave your heartfelt wishes for the newlyweds!',
    },
    giftModal: {
      modalTitle: 'Wedding Gift & Registry',
      modalSubtitle: 'Send warm blessings and wedding gifts to the newlyweds',
      tabRegistryUs: 'Venmo / Zelle / US Gifts',
      tabBankVn: 'VietQR / Bank Transfer',
      usRegistryNotice:
        'Choose your preferred payment method below to send a gift directly to the newlyweds:',
      venmoLabel: 'Venmo: @TuanKiet-Wedding',
      zelleLabel: 'Zelle: wedding.kiet@gmail.com',
      cashAppLabel: 'Cash App: $WeddingKiet',
      payPalLabel: 'PayPal: paypal.me/weddinglive',
      registryLinksLabel: 'Wedding Gift Registries:',
      registryAmazon: 'Amazon Wedding Registry',
      registryZola: 'Zola Wedding Registry',
      registryHoneyfund: 'Honeyfund Honeymoon Fund',
      quickSelectAmount: 'Select Amount:',
      bankTransferHint: 'Scan using any banking app with VietQR auto-fill',
      copyAccountBtn: 'Copy Account Number',
      copied: 'Copied!',
      closeBtn: 'Close',
    },
  },

  // =========================================================================
  // VIETNAMESE (VIETNAM MARKET)
  // =========================================================================
  vi: {
    brand: {
      name: 'WeddingLive',
      tagline: 'Chiếu Ảnh Khách Lên Màn LED Sân Khấu Tiệc Cưới',
      subtag: 'Phong cách Eventoly • Bản Việt Nam',
    },
    nav: {
      home: 'Giới Thiệu',
      upload: 'Khách Gửi Ảnh',
      uploadBadge: 'Live',
      invitation: 'Thiệp Online',
      invitationBadge: 'Wax Seal',
      print: 'In Thiệp & Excel',
      printBadge: 'Batch',
      live: 'Màn LED',
      liveBadge: '16:9',
      admin: 'Quản Trị',
      statusRealtime: 'Supabase Realtime',
      statusDemo: 'Chế độ Demo',
    },
    hero: {
      badgeTech: 'Wedding Tech 2026',
      badgeLive: 'Trực Tiếp Chiếu Ảnh Tiệc Cưới Real-time',
      titleLine1: 'Khách Chụp Khoảnh Khắc.',
      titleLine2: 'Chiếu Ngay Lên Màn LED',
      subtitle:
        'Trải nghiệm tiệc cưới chuẩn phong cách quốc tế (Eventoly). Khách chỉ cần quét mã QR tại bàn, chụp ảnh trên điện thoại và ảnh sẽ lập tức xuất hiện hoành tráng trên màn hình LED sân khấu!',
      ctaUpload: 'Trải Nghiệm Khách Gửi Ảnh',
      ctaLive: 'Xem Màn LED Sân Khấu 16:9',
      perkNoApp: 'Không cần cài đặt ứng dụng',
      perkCompress: 'Nén ảnh tự động nhanh <800KB',
      perkGift: 'Tích hợp VietQR mừng cưới tiện lợi',
      demoTitle: 'Mô Phỏng Trực Tiếp',
      demoSubtitle: 'Thử Nghiệm Màn Hình LED Sân Khấu Ngay Bây Giờ',
    },
    steps: {
      sectionBadge: 'Cách Thức Hoạt Động',
      sectionTitle: '3 Bước Thắp Sáng Sân Khấu Tiệc Cưới',
      sectionSubtitle: 'Đơn giản, tức thì, không rào cản kỹ thuật cho mọi khách mời từ trẻ đến lớn tuổi.',
      step1Title: 'Quét Mã QR Bàn Tiệc',
      step1Desc: 'Mỗi bàn tiệc đặt 1 bảng mica A6 sang trọng. Khách chỉ cần mở camera điện thoại quét mã.',
      step2Title: 'Chụp Ảnh & Gửi Lời Chúc',
      step2Desc: 'Chụp ảnh selfie hoặc cùng cả bàn tiệc, điền tên và lời chúc ngọt ngào rồi bấm gửi.',
      step3Title: 'Chiếu Lên Màn LED & Tải Toàn Bộ',
      step3Desc: 'Ảnh tự động xuất hiện trên màn hình LED sân khấu. Hết tiệc dâu rể tải trọn bộ album .ZIP!',
    },
    pricing: {
      sectionBadge: 'Bảng Giá Minh Bạch',
      sectionTitle: 'Gói Dịch Vụ Phù Hợp Mọi Quy Mô Tiệc Cưới',
      sectionSubtitle: 'Thanh toán một lần duy nhất, hỗ trợ kỹ thuật tận tâm suốt buổi tiệc.',
      tier1Name: 'Gói Cơ Bản (Tiệc Thân Mật)',
      tier1Price: '399.000đ',
      tier1Period: 'trọn gói tiệc',
      tier1Desc: 'Dành cho tiệc nhỏ dưới 100 khách, đám hỏi hoặc tiệc báo hỷ ấm cúng.',
      tier1Features: [
        'Màn chiếu LED hiển thị thời gian thực',
        'Tối đa 150 lượt ảnh khách gửi',
        'Lưu trữ trực tuyến 24h sau tiệc',
        'Mẫu thiết kế mã QR để bàn chuẩn in ấn',
        'Nén ảnh tốc độ cao <800KB',
      ],
      tier2Name: 'Gói Live Stage (Bán Chạy Nhất)',
      tier2Price: '699.000đ',
      tier2Period: 'trọn gói tiệc',
      tier2Desc: 'Phù hợp nhất cho tiệc cưới tại trung tâm hội nghị 200 - 500 khách.',
      tier2Features: [
        'Không giới hạn số lượng ảnh gửi',
        'Hiển thị Realtime ưu tiên ảnh mới',
        'Bảng quản trị duyệt ảnh / lọc ảnh rác',
        'Tải trọn bộ album ảnh gốc (.ZIP)',
        'Tích hợp hộp mừng cưới VietQR',
        'Tùy chỉnh tên dâu rể & ngày cưới',
      ],
      tier2Badge: 'Khuyên Dùng',
      tier3Name: 'Gói VIP Toàn Diện',
      tier3Price: '1.499.000đ',
      tier3Period: 'trọn gói tiệc',
      tier3Desc: 'Giải pháp Wedding Tech toàn diện bao gồm cả in ấn thiệp cưới và thiệp online.',
      tier3Features: [
        'Toàn bộ tính năng gói Live Stage',
        'Thiệp Cưới Online sáp niêm phong 3D tương tác',
        'Công cụ In ấn bao thư từ Excel không viết tay',
        '10 Bộ sưu tập thiệp cưới sang trọng bậc nhất',
        'Quản lý danh sách khách và phản hồi RSVP',
        'Hỗ trợ kỹ thuật riêng suốt sự kiện',
      ],
      btnChoose: 'Đăng Ký Gói Ngay',
    },
    upload: {
      pageTitle: 'Tiệc Cưới & Màn Hình Trực Tiếp',
      pageSubtitle: 'Chụp ảnh selfie hoặc khoảnh khắc cùng bạn bè để chiếu lên màn hình LED sân khấu!',
      cameraBtn: 'Chụp ảnh hoặc Chọn từ thư viện',
      changePhoto: 'Đổi Ảnh Khác',
      previewAlt: 'Xem trước ảnh',
      nameLabel: 'Tên hoặc biệt danh của bạn (Bắt buộc)',
      namePlaceholder: 'VD: Tuấn FPT, Nhóm Phù Dâu, Bác Ba...',
      wishLabel: 'Lời chúc gửi dâu rể (Tùy chọn)',
      wishPlaceholder: 'Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử nhé! 🥂✨',
      submitBtn: '🚀 Gửi Lên Màn Hình Lớn',
      submitting: 'Đang nén ảnh & Gửi lên sân khấu...',
      giftBtn: 'Gửi quà mừng cưới (VietQR)',
      successTitle: 'Gửi Ảnh Thành Công!',
      successDesc: 'Khoảnh khắc của bạn đã được chuyển lên màn hình LED sân khấu. Hãy cùng nhìn lên nhé ✨',
      uploadAnother: 'Chụp Thêm Bức Nữa',
      viewLiveBtn: 'Xem Màn Hình LED Sân Khấu 16:9',
      errorSlowNetwork: 'Mạng 4G chập chờn, vui lòng thử lại sau vài giây!',
      errorSelectPhoto: 'Vui lòng chọn hoặc chụp một bức ảnh trước!',
    },
    live: {
      liveBadge: 'TRỰC TIẾP',
      waitingTitle: 'Quét Mã Để Chia Sẻ Khoảnh Khắc!',
      waitingSubtitle: 'Hình ảnh khách chụp sẽ xuất hiện trên màn hình LED sân khấu.',
      sharedBy: 'Khoảnh khắc gửi từ',
      persistentQRTitle: 'Quét mã để chia sẻ khoảnh khắc!',
      persistentQRSubtitle: 'Mở camera điện thoại quét mã QR để gửi ảnh',
      fullscreen: 'Toàn Màn Hình',
      exitFullscreen: 'Thoát Toàn Màn Hình',
      photoCount: 'Ảnh Trực Tiếp',
      speedTitle: 'Tự chuyển: 5s',
    },
    admin: {
      pageTitle: 'Quản Trị Ảnh & Màn Hình Sân Khấu',
      pageSubtitle: 'Kiểm duyệt ảnh khách gửi lên, duyệt hoặc ẩn ảnh và tải về toàn bộ ảnh cưới gốc.',
      tabApproved: 'Đã Duyệt (Đang Chiếu)',
      tabPending: 'Chờ Duyệt (Pending)',
      btnDownloadZip: 'Tải Về Toàn Bộ Ảnh (.ZIP)',
      btnDownloading: 'Đang nén file .ZIP...',
      btnApprove: 'Duyệt Chiếu',
      btnReject: 'Ẩn / Xóa',
      btnDelete: 'Xóa vĩnh viễn',
      emptyList: 'Chưa có bức ảnh nào trong danh mục này.',
      upsellTitle: 'Vật Tư Bàn Tiệc Đề Xuất',
      upsellSubtitle: 'Shopee Affiliate',
      upsellBadge: 'Bán chạy nhất cho tiệc cưới',
      upsellProduct: 'Chân Đế Mica A6 Trong Suốt Đứng Để Bàn (Set 10 cái)',
      upsellDesc:
        'Chân đế mica cao cấp khổ A6 dùng để kẹp mã QR chia sẻ ảnh và thực đơn bàn tiệc, tăng tính sang trọng.',
      upsellBtn: 'Xem Chi Tiết & Mua Trên Shopee',
    },
    invitation: {
      onlineInviteBadge: 'Thiệp Mời Cưới Trực Tuyến',
      tapToOpen: 'Chạm để mở thiệp',
      tapToOpenSub: 'Tap to Open Invitation',
      tapHint: 'Chạm vào con dấu sáp niêm phong để mở trọn vẹn thiệp cưới ✨',
      closeEnvelope: 'Đóng lại phong bì',
      saveTheDate: 'SAVE THE DATE',
      formalInviteTitle: 'Thư Mời Trọng Thể',
      requestHonor: 'Trân Trọng Kính Mời',
      guestTo: 'Kính gửi',
      andGuest: 'và Người thương',
      countdownTitle: 'Đếm ngược ngày cưới',
      days: 'Ngày',
      hours: 'Giờ',
      minutes: 'Phút',
      seconds: 'Giây',
      timelineTitle: 'Lịch Trình Tiệc Cưới',
      time1Time: '17:30',
      time1Title: 'Đón Khách & Chụp Ảnh',
      time1Desc: 'Chụp hình lưu niệm tại sảnh hoa cùng cô dâu & chú rể',
      time2Time: '18:00',
      time2Title: 'Nghi Thức Lễ Thành Hôn',
      time2Desc: 'Trao nhẫn cưới & rót rượu champagne mừng hạnh phúc',
      time3Time: '18:30',
      time3Title: 'Khai Tiệc Mừng Cưới',
      time3Desc: 'Thưởng thức ẩm thực tiệc cưới và nâng ly cùng bạn bè',
      time4Time: '19:30',
      time4Title: 'Chiếu Ảnh Khách Lên Màn LED',
      time4Desc: 'Quét mã QR chụp ảnh & gửi lời chúc trực tiếp lên sân khấu!',
      venueTitle: 'Địa Điểm Tổ Chức',
      venueName: 'Trung Tâm Hội Nghị GEM Center',
      venueHall: 'Sảnh Grand Ballroom • Lầu 3',
      venueAddress: '08 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh',
      btnGoogleMaps: 'Mở Bản Đồ Chỉ Đường (Google Maps)',
      rsvpTitle: 'Phản Hồi Tham Dự',
      rsvpSubtitle: 'Xác Nhận Tham Dự (RSVP) để dâu rể chuẩn bị bàn tiệc chu đáo nhất',
      rsvpNameLabel: 'Tên của bạn:',
      rsvpAttendingLabel: 'Bạn sẽ tham dự chứ?',
      rsvpOption1: 'Đi 1 người',
      rsvpOption2: 'Đi 2 người',
      rsvpOptionNo: 'Rất tiếc vắng mặt',
      rsvpDietLabel: 'Khẩu vị ăn uống:',
      rsvpDietRegular: 'Ăn mặn (Thực đơn tiệc)',
      rsvpDietVeg: 'Ăn chay',
      rsvpWishLabel: 'Lời nhắn gửi dâu rể (tùy chọn):',
      rsvpSubmitBtn: 'Xác Nhận Tham Dự',
      rsvpSuccessTitle: 'Cảm ơn bạn!',
      rsvpSuccessDesc: 'Dâu rể đã nhận được xác nhận của bạn và rất háo hức chờ đón bạn trong ngày vui!',
      stageFeatureTitle: 'Trải Nghiệm Tại Bàn Tiệc',
      stageFeatureSubtitle: 'Chiếu Ảnh Của Bạn Lên Màn LED',
      stageFeatureDesc:
        'Tại tiệc cưới, bạn có thể chụp ảnh và gửi trực tiếp để ảnh xuất hiện trên màn hình LED lớn sân khấu!',
      btnTryLiveStage: 'Thử Chụp & Gửi Ảnh Ngay',
      giftTitle: 'Gửi Quà Mừng Cưới (VietQR)',
      giftDesc: 'Dành cho bạn bè, người thân ở xa hoặc không tiện mang phong bì tiền mặt',
      btnOpenGiftModal: 'Mở Mã VietQR Chuyển Khoản',
      btnCopyInviteLink: 'Sao chép link thiệp này',
      linkCopied: 'Đã sao chép link thiệp!',
      footerThanks: 'Minh Anh & Tuấn Kiệt trân trọng cảm ơn tình cảm của bạn! ❤️',
    },
    print: {
      pageTitle: 'Tạo Thiệp Cưới & Bảng QR Bàn Tiệc',
      pageSubtitle: 'In ấn không cần viết tay • Nhập Excel chuẩn • Sắp xếp theo công ty và khu vực',
      btnViewOnline: 'Xem Thiệp Online (Mobile)',
      btnPrintAll: 'In Hàng Loạt Đã Chọn',
      btnPrintSingle: 'In Bản Này Ngay (Print)',
      step1SelectType: '1. Chọn loại ấn phẩm in',
      typeEnvelope: '✉️ In Bao Thư (Phong Bì)',
      typeEnvelopeSub: 'Có tên khách & cơ quan',
      typeInvitation: '📜 In Ruột Thiệp Mời',
      typeInvitationSub: 'Khổ A5 / A6 chuẩn',
      typeTableStand: '🍽️ Bảng QR Bàn Tiệc',
      typeTableStandSub: 'Mica A6 đứng',
      step2SelectTheme: '2. Chọn phong cách màu sắc',
      guestListTitle: 'Danh Sách Khách Mời In Thiệp',
      guestListSubtitle: 'Tải file Excel lên để hệ thống tự điền tên từng người, không cần viết tay mỏi mệt',
      btnUploadExcel: 'Tải File Excel (.xlsx)',
      btnUploading: 'Đang đọc...',
      btnDownloadTemplate: 'Tải File Mẫu (.xlsx)',
      sortBy: 'Sắp xếp danh sách theo:',
      sortCompany: 'Công ty / Nơi làm việc',
      sortAddress: 'Địa chỉ / Khu vực',
      sortGroup: 'Nhóm khách',
      sortTable: 'Số bàn tiệc',
      sortName: 'Tên A-Z',
      filterCompany: 'Lọc theo công ty:',
      filterAddress: 'Lọc theo khu vực:',
      filterAll: 'Tất cả',
      searchPlaceholder: 'Tìm theo tên khách, công ty hoặc số bàn...',
      selectAll: 'Chọn tất cả',
      unselectAll: 'Bỏ chọn tất cả',
      colName: 'Khách Mời & Xưng Hô',
      colCompany: 'Công Ty / Đơn Vị',
      colAddress: 'Địa Chỉ / Khu Vực',
      colTable: 'Bàn',
      colGroup: 'Nhóm',
      colActions: 'Link Thiệp',
      toastExcelSuccess: 'Đã nhập thành công danh sách khách mời từ file Excel!',
      toastExcelEmpty: 'Không tìm thấy danh sách khách mời trong file Excel. Vui lòng kiểm tra lại.',
      envelopePreviewTo: 'Kính gửi',
      envelopeSealHysu: 'Hỷ Sự',
      tableStandHeading: 'BẢNG CHIA SẺ KHOẢNH KHẮC',
      tableStandSub: 'Quét mã để chiếu ảnh lên màn hình lớn',
      tableStandScanHint: 'Mở Camera quét mã gửi ảnh',
      tableStandInstruction:
        'Chụp ảnh selfie hoặc cùng bàn tiệc để gửi gắm lời chúc hạnh phúc đến cô dâu & chú rể!',
    },
    giftModal: {
      modalTitle: 'Gửi Quà Mừng Cưới',
      modalSubtitle: 'Gửi gắm lời chúc & món quà mừng tới đôi bạn trẻ',
      tabRegistryUs: 'Ví Điện Tử Quốc Tế (Venmo/Zelle)',
      tabBankVn: 'Chuyển Khoản VietQR (Nội Địa)',
      usRegistryNotice: 'Chọn phương thức thanh toán bên dưới để gửi quà chúc phúc trực tiếp:',
      venmoLabel: 'Venmo: @TuanKiet-Wedding',
      zelleLabel: 'Zelle: wedding.kiet@gmail.com',
      cashAppLabel: 'Cash App: $WeddingKiet',
      payPalLabel: 'PayPal: paypal.me/weddinglive',
      registryLinksLabel: 'Danh Sách Quà Cưới (Registry):',
      registryAmazon: 'Amazon Wedding Registry',
      registryZola: 'Zola Wedding Registry',
      registryHoneyfund: 'Honeyfund Hộp Mừng Cưới',
      quickSelectAmount: 'Chọn nhanh số tiền mừng:',
      bankTransferHint: 'Mở app ngân hàng bất kỳ để quét mã VietQR tự động',
      copyAccountBtn: 'Sao chép số tài khoản',
      copied: 'Đã chép!',
      closeBtn: 'Đóng',
    },
  },
};
