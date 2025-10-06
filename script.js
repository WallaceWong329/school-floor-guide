// script.js

// School Information (for Header)
const schoolInfo = {
    "name": {
        "zh": "", 
        "en": ""
    }
};

// Floor Data (support single image or image array for slideshow)
const floorData = {
    "G": {
        "title": {"zh": "地下", "en": "Ground Floor"},
        "classrooms": {"zh": "家教會室、言語治療室、輔導室、工友休息室、地堂、體育室、籃球場", "en": "Parent-Teacher Association Room, Speech Therapy Room, Counseling Room, Janitor Rest Room, Hall, Physical Education Room, Basketball Court"},
        "description": {"zh": "主要活動和支援服務區域。包含體育設施和專業支援服務。", "en": "Main activity and support service area. Includes sports facilities and professional support services."},
        "image": ["assets/test.jpg", "assets/g2.jpg", "assets/g3.jpg"] // Multiple images for slideshow
    },
    "1": {
        "title": {"zh": "一樓", "en": "1st Floor"},
        "classrooms": {"zh": "電腦室、教員休息室、音樂室、校長室、校務處、醫療室、校園電視台、視覺藝術室", "en": "Computer Room, Staff Room, Music Room, Principal's Office, General Office, Medical Room, Campus TV Station, Visual Arts Room"},
        "description": {"zh": "行政管理和多媒體教學區域。學校核心行政辦公室和創意學習空間。", "en": "Administrative and multimedia teaching area. Core administrative offices and creative learning spaces."},
        "image": "assets/1f.jpg" // Single image
    },
    "2": { 
        "title": {"zh": "二樓", "en": "2nd Floor"}, 
        "classrooms": {"zh": "中華文化室、課室", "en": "Chinese Culture Room, Classrooms"}, 
        "description": {"zh": "傳統文化學習和常規教學區域。", "en": "Traditional culture learning and regular teaching area."}, 
        "image": ["assets/2f-1.jpg", "assets/2f-2.jpg"] // Multiple images
    },
    "3": { 
        "title": {"zh": "三樓", "en": "3rd Floor"}, 
        "classrooms": {"zh": "科學室、活動室、圖書館、互動學習室", "en": "Science Laboratory, Activity Room, Library, Interactive Learning Room"}, 
        "description": {"zh": "科學探索和知識學習中心。提供豐富的學習資源和實踐機會。", "en": "Science exploration and knowledge learning center. Provides abundant learning resources and practical opportunities."}, 
        "image": "assets/3f.jpg" // Single image
    },
    "4": { 
        "title": {"zh": "四樓", "en": "4th Floor"}, 
        "classrooms": {"zh": "英語室、課室", "en": "English Room, Classrooms"}, 
        "description": {"zh": "語言學習和專業教學區域。", "en": "Language learning and specialized teaching area."}, 
        "image": ["assets/4f-1.jpg", "assets/4f-2.jpg", "assets/4f-3.jpg"] // Multiple images
    },
    "5": { 
        "title": {"zh": "五樓", "en": "5th Floor"}, 
        "classrooms": {"zh": "教職員休息室、課室", "en": "Teaching Staff Rest Room, Classrooms"}, 
        "description": {"zh": "教師休息和教學區域。", "en": "Teacher rest and teaching area."}, 
        "image": "assets/5f.jpg" // Single image
    },
    "6": { 
        "title": {"zh": "六樓", "en": "6th Floor"}, 
        "classrooms": {"zh": "360虛擬實景室、禮堂", "en": "360 Virtual Reality Room, Auditorium"}, 
        "description": {"zh": "創新科技和大型活動空間。配備先進的虛擬實境設備。", "en": "Innovative technology and large event space. Equipped with advanced virtual reality facilities."}, 
        "image": ["assets/6f-1.jpg", "assets/6f-2.jpg"] // Multiple images
    }
};

// DOM Elements
const homeView = document.getElementById('home-view');
const detailView = document.getElementById('detail-view');
const floorBtns = document.querySelectorAll('.floor-btn');
const floorTitleEl = document.getElementById('floor-title');
const contentTextEls = document.querySelectorAll('.content-text');
const labelEls = document.querySelectorAll('.label');
const langZhEl = document.getElementById('lang-zh');
const langEnEl = document.getElementById('lang-en');
const floorImageEl = document.getElementById('floor-image');
const loadingView = document.getElementById('loading-view');
const enterBtn = document.getElementById('enter-btn');

// State Variables
let currentFloorKey = 'G';
let currentLang = 'zh'; // Default Chinese
let hasEntered = false; // Prevent multiple entries
let slideshowInterval = null; // Slideshow interval reference
let currentImageIndex = 0; // Current image index for slideshow

// ==================================
// Slideshow Functions
// ==================================

/**
 * Start slideshow for multiple images
 * @param {Array} images - Array of image paths
 */
function startSlideshow(images) {
    // Clear existing slideshow
    stopSlideshow();
    
    currentImageIndex = 0;
    
    // If only one image, just display it
    if (images.length === 1) {
        floorImageEl.src = images[0];
        return;
    }
    
    // Display first image
    floorImageEl.src = images[currentImageIndex];
    
    // Start slideshow interval
    slideshowInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        floorImageEl.src = images[currentImageIndex];
    }, 5000); // Change image every 5 seconds
}

/**
 * Stop slideshow
 */
function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

// ==================================
// Loading Page Functions
// ==================================

/**
 * Create Ripple Effect - Full Screen Version
 */
function createFullScreenRipple(event) {
    const loadingView = document.getElementById('loading-view');
    const circle = document.createElement("span");
    const diameter = Math.max(loadingView.clientWidth, loadingView.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - loadingView.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - loadingView.offsetTop - radius}px`;
    circle.classList.add("ripple-effect");

    const ripple = loadingView.getElementsByClassName("ripple-effect")[0];
    if (ripple) {
        ripple.remove();
    }

    loadingView.appendChild(circle);
}

/**
 * Enter Main Application - With Animation Effects
 */
window.enterApp = function(event) {
    // Prevent multiple clicks
    if (hasEntered) return;
    hasEntered = true;
    
    // Create full screen ripple effect
    createFullScreenRipple(event);
    
    // Start transition animation sequence
    setTimeout(() => {
        // Loading page exit animation
        loadingView.classList.add('exiting');
        
        // Show main interface
        setTimeout(() => {
            // Hide loading page, show main content
            loadingView.classList.remove('active-view');
            loadingView.classList.add('inactive-view');
            loadingView.style.display = 'none';
            
            // Show home page
            showHome();
            
        }, 500); // Wait for loading page exit animation to complete
    }, 200); // Wait for ripple animation to complete
};

// ==================================
// 1. View and Language Switching Functions
// ==================================

/**
 * Show Home Page (Floor Selection Grid)
 */
window.showHome = function() {
    // Stop any running slideshow
    stopSlideshow();
    
    homeView.classList.add('active-view');
    homeView.classList.remove('inactive-view');
    detailView.classList.add('inactive-view');
    detailView.classList.remove('active-view');
    
    // Ensure buttons are not highlighted when returning to home
    floorBtns.forEach(btn => btn.classList.remove('active'));
};

/**
 * Show Detail Page
 * @param {string} floorKey 
 */
window.showDetail = function(floorKey) {
    currentFloorKey = floorKey;
    homeView.classList.add('inactive-view');
    homeView.classList.remove('active-view');
    detailView.classList.add('active-view');
    detailView.classList.remove('inactive-view');

    updateDisplay(floorKey);
};

/**
 * Switch Language (Chinese <-> English)
 */
window.toggleLanguage = function() {
    currentLang = (currentLang === 'zh') ? 'en' : 'zh';
    
    // 1. Update language switch button visual state
    if (currentLang === 'zh') {
        langZhEl.classList.add('active');
        langEnEl.classList.remove('active');
    } else {
        langZhEl.classList.remove('active');
        langEnEl.classList.add('active');
    }
    
    // 2. Redraw all texts (header/welcome message)
    updateAllTexts();
    
    // 3. If in detail page, reload floor information
    if (detailView.classList.contains('active-view')) {
        updateDisplay(currentFloorKey);
    }
};

/**
 * Update All Texts Based on Current Language Setting (header/labels/back button)
 */
function updateAllTexts() {
    // 1. Update header/welcome message
    document.getElementById('main-title').textContent = schoolInfo.name[currentLang];
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
        welcomeTitle.textContent = welcomeTitle.getAttribute(`data-lang-${currentLang}`);
    }

    // 2. Update content labels
    labelEls.forEach(el => {
        el.textContent = el.getAttribute(`data-lang-${currentLang}`);
    });

    // 3. Update back button text
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        if (currentLang === 'zh') {
            backBtn.textContent = '⬅️ 返回';
        } else {
            backBtn.textContent = '⬅️ Back';
        }
    }
}

// ==================================
// 2. Content Update (Static Images & Slideshow)
// ==================================

/**
 * Update Display Content Based on Floor Key and Current Language
 * @param {string} floorKey 
 */
function updateDisplay(floorKey) {
    const data = floorData[floorKey];
    if (!data) return;

    // 1. Update title (show floor name and floor code)
    if (currentLang === 'zh') {
        floorTitleEl.textContent = `${data.title.zh} (${floorKey}/F)`;
    } else {
        floorTitleEl.textContent = `${data.title.en} (${floorKey}/F)`;
    }

    // 2. Update text content
    contentTextEls.forEach(el => {
        const contentKey = el.getAttribute('data-content'); 
        el.textContent = data[contentKey][currentLang];
        // Add class based on current language to apply CSS colors
        el.className = `content-text lang-${currentLang}`;
    });

    // 3. Handle images (single image or slideshow)
    if (Array.isArray(data.image)) {
        // Multiple images - start slideshow
        startSlideshow(data.image);
    } else {
        // Single image - just display it
        stopSlideshow();
        floorImageEl.src = data.image;
    }

    // 4. Highlight button
    floorBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.floor-btn[data-floor="${floorKey}"]`);
    if(activeBtn) {
        activeBtn.classList.add('active');
    }
}

// ==================================
// 3. Initialization
// ==================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    // 1. Loading page already bound via onclick attribute
    // No need to bind button separately
    
    // 2. Force set to Chinese
    currentLang = 'zh';
    
    // 3. Add event listeners for each floor button in Home View
    floorBtns.forEach(button => {
        button.addEventListener('click', () => {
            const floorKey = button.getAttribute('data-floor');
            console.log('Clicked floor:', floorKey);
            showDetail(floorKey); 
        });
    });

    // 4. Initial load: Set all language texts
    updateAllTexts();

    // 5. On initial load, manually set language button state (default 'zh' active)
    langZhEl.classList.add('active');
    langEnEl.classList.remove('active');
    
    // 6. Ensure correct initial state
    loadingView.classList.add('active-view');
    loadingView.classList.remove('inactive-view');
    homeView.classList.add('inactive-view');
    homeView.classList.remove('active-view');
    detailView.classList.add('inactive-view');
    detailView.classList.remove('active-view');
    
    console.log('Initialization complete, waiting for user to click screen to enter');
});