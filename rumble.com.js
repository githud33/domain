// 1. ตั้งค่าโดเมนส่วนกลางที่จุดเดียวเหมือนเดิม
var myDomain = "https://rumble.com/hls-vod/"; // ใช้ชื่อ myDomain

(function() {
    var sourceTag = document.getElementById('ru'); // ใช้ชื่อ sourceTag
    if (sourceTag) {
        var currentFile = sourceTag.getAttribute('src');
        sourceTag.src = myDomain + currentFile;
    }
})();

// =============================================================================
// =============================================================================
// 2. ตัวเปิดเล่นชั่วคราว
var myDomain = "https://rumble.com/hls-vod/"; // ใช้ชื่อ myDomain

(function() {
    var sourceTag = document.getElementById('ru3'); // ใช้ชื่อ sourceTag
    if (sourceTag) {
        var currentFile = sourceTag.getAttribute('src');
        sourceTag.src = myDomain + currentFile;
    }
})();
