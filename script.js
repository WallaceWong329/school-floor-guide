// script.js

// 學校基本資訊 (用於 Header)
const schoolInfo = {
    "name": {
        "zh": "基督教香港信義會信愛學校", 
        "en": "ELCHK Faith Love Lutheran School"
    }
};

// 樓層資料 (使用靜態圖片 test.jpg)
const floorData = {
    "G": {
        "title": {"zh": "地下", "en": "Ground Floor"},
        "classrooms": {"zh": "校務處、禮堂、音樂室、教師休息室", "en": "General Office, School Hall, Music Room, Staff Room"},
        "description": {"zh": "學校門面及主要行政區域。請家長和訪客在此處登記。", "en": "The main administrative area. Visitors must register at the General Office here."},
        "image": "assets/test.jpg" 
    },
    "1": {
        "title": {"zh": "一樓", "en": "1st Floor"},
        "classrooms": {"zh": "1A, 1B, 1C, 1D 教室；電腦室；洗手間", "en": "Classrooms 1A, 1B, 1C, 1D; Computer Room; Restrooms"},
        "description": {"zh": "小一教學區。電腦室配備最新設備供資訊科技學習。", "en": "Primary One teaching zone. The Computer Room is equipped for IT lessons."},
        "image": "assets/test.jpg"
    },
    "2": { "title": {"zh": "二樓", "en": "2nd Floor"}, "classrooms": {"zh": "2A - 2D 教室；圖書館", "en": "Classrooms 2A - 2D; Library"}, "description": {"zh": "圖書館是學生閱讀和研究的理想場所。", "en": "The library is an ideal place for student reading and research."}, "image": "assets/test.jpg" },
    "3": { "title": {"zh": "三樓", "en": "3rd Floor"}, "classrooms": {"zh": "3A - 3D 教室；科學實驗室", "en": "Classrooms 3A - 3D; Science Lab"}, "description": {"zh": "高年級教學區。科學實驗室供學生進行實踐操作。", "en": "Upper primary teaching zone. The laboratory is for hands-on science experiments."}, "image": "assets/test.jpg" },
    "4": { "title": {"zh": "四樓", "en": "4th Floor"}, "classrooms": {"zh": "4A - 4D 教室；美術室；多媒體學習室", "en": "Classrooms 4A - 4D; Art Room; Multi-Media Learning Room"}, "description": {"zh": "美術室為學生提供創作空間。", "en": "The Art Room fosters creativity."}, "image": "assets/test.jpg" },
    "5": { "title": {"zh": "五樓", "en": "5th Floor"}, "classrooms": {"zh": "5A - 5D 教室；常識科專題研習室", "en": "Classrooms 5A - 5D; Liberal Studies Project Room"}, "description": {"zh": "供進行跨學科專題研究。", "en": "Equipped for cross-curricular project studies."}, "image": "assets/test.jpg" },
    "6": { "title": {"zh": "六樓", "en": "6th Floor"}, "classrooms": {"zh": "6A - 6D 教室；天台花園入口", "en": "Classrooms 6A - 6D; Rooftop Garden Entrance"}, "description": {"zh": "最高樓層及戶外學習區。", "en": "The highest floor and outdoor learning area."}, "image": "assets/test.jpg" }
};

// DOM 元素
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

// 狀態變數
let currentFloorKey = 'G';
let currentLang = 'zh'; // 預設中文
let hasEntered = false; // 防止多次進入

// ==================================
// 載入頁面功能
// ==================================

/**
 * 創建波紋效果 - 全屏版本
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
 * 進入主應用 - 帶動畫效果
 */
window.enterApp = function(event) {
    // 防止多次點擊
    if (hasEntered) return;
    hasEntered = true;
    
    // 創建全屏波紋效果
    createFullScreenRipple(event);
    
    // 開始過場動畫序列
    setTimeout(() => {
        // 載入頁面退出動畫
        loadingView.classList.add('exiting');
        
        // 顯示主界面
        setTimeout(() => {
            // 隱藏載入頁面，顯示主內容
            loadingView.classList.remove('active-view');
            loadingView.classList.add('inactive-view');
            loadingView.style.display = 'none';
            
            // 顯示主頁
            showHome();
            
        }, 500); // 等待載入頁面退出動畫完成
    }, 200); // 等待波紋動畫完成
};

// ==================================
// 1. 視圖和語言切換函數
// ==================================

/**
 * 顯示主頁 (樓層選擇網格)
 */
window.showHome = function() {
    homeView.classList.add('active-view');
    homeView.classList.remove('inactive-view');
    detailView.classList.add('inactive-view');
    detailView.classList.remove('active-view');
    
    // 確保回到主頁時按鈕不再高亮
    floorBtns.forEach(btn => btn.classList.remove('active'));
};

/**
 * 顯示詳情頁
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
 * 切換語言 (中文 <-> 英文)
 */
window.toggleLanguage = function() {
    currentLang = (currentLang === 'zh') ? 'en' : 'zh';
    
    // 1. 更新語言切換按鈕視覺狀態
    if (currentLang === 'zh') {
        langZhEl.classList.add('active');
        langEnEl.classList.remove('active');
    } else {
        langZhEl.classList.remove('active');
        langEnEl.classList.add('active');
    }
    
    // 2. 重新繪製所有文本 (標頭/歡迎詞)
    updateAllTexts();
    
    // 3. 如果在詳情頁，重新載入樓層資訊
    if (detailView.classList.contains('active-view')) {
        updateDisplay(currentFloorKey);
    }
};

/**
 * 根據當前語言設置更新所有文本 (標頭/標籤)
 */
function updateAllTexts() {
    // 1. 更新標頭/歡迎詞
    document.getElementById('main-title').textContent = schoolInfo.name[currentLang];
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
        welcomeTitle.textContent = welcomeTitle.getAttribute(`data-lang-${currentLang}`);
    }

    // 2. 更新內容標籤
    labelEls.forEach(el => {
        el.textContent = el.getAttribute(`data-lang-${currentLang}`);
    });
}

// ==================================
// 2. 內容更新 (靜態圖片)
// ==================================

/**
 * 根據樓層鍵值和當前語言更新顯示內容
 * @param {string} floorKey 
 */
function updateDisplay(floorKey) {
    const data = floorData[floorKey];
    if (!data) return;

    // 1. 更新標題 (始終顯示雙語)
    floorTitleEl.textContent = `${data.title.zh} / ${data.title.en}`;

    // 2. 更新文本內容
    contentTextEls.forEach(el => {
        const contentKey = el.getAttribute('data-content'); 
        el.textContent = data[contentKey][currentLang];
        // 根據當前語言添加 class 以應用 CSS 顏色
        el.className = `content-text lang-${currentLang}`;
    });

    // 3. 處理靜態圖片
    floorImageEl.src = data.image; 

    // 4. 高亮按鈕
    floorBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.floor-btn[data-floor="${floorKey}"]`);
    if(activeBtn) {
        activeBtn.classList.add('active');
    }
}

// ==================================
// 3. 初始化
// ==================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 載入完成');
    
    // 1. 載入頁面已經通過 onclick 屬性綁定事件
    // 不再需要單獨為按鈕綁定事件
    
    // 2. 強制設置為中文
    currentLang = 'zh';
    
    // 3. 為 Home View 的每個樓層按鈕添加事件監聽器 
    floorBtns.forEach(button => {
        button.addEventListener('click', () => {
            const floorKey = button.getAttribute('data-floor');
            console.log('點擊樓層:', floorKey);
            showDetail(floorKey); 
        });
    });

    // 4. 初始載入：設定所有語言文本
    updateAllTexts();

    // 5. 初始載入時，手動設置語言按鈕狀態 (預設 'zh' 激活)
    langZhEl.classList.add('active');
    langEnEl.classList.remove('active');
    
    // 6. 確保初始狀態正確
    loadingView.classList.add('active-view');
    loadingView.classList.remove('inactive-view');
    homeView.classList.add('inactive-view');
    homeView.classList.remove('active-view');
    detailView.classList.add('inactive-view');
    detailView.classList.remove('active-view');
    
    console.log('初始化完成，等待用戶點擊屏幕進入');
});