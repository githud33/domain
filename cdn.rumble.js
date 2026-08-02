// 1. ตั้งค่าโดเมนส่วนกลางที่จุดเดียวเหมือนเดิม
//  https://hugh.cdn.rumble.cloud/video/
var myDomain = "https://1a-1791.com/video/"; // ใช้ชื่อ myDomain

(function() {
    var sourceTag = document.getElementById('mp'); // ใช้ชื่อ sourceTag
    if (sourceTag) {
        var currentFile = sourceTag.getAttribute('src');
        sourceTag.src = myDomain + currentFile;
    }
})();

// =============================================================================
// =============================================================================
// 2. ตัวเปิดเล่นชั่วคราว
//  https://hugh.cdn.rumble.cloud/video/
var myDomain = "https://1a-1791.com/video/"; // ใช้ชื่อ myDomain

(function() {
    var sourceTag = document.getElementById('mp4'); // ใช้ชื่อ sourceTag
    if (sourceTag) {
        var currentFile = sourceTag.getAttribute('src');
        sourceTag.src = myDomain + currentFile;
    }
})();
