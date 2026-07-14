// 1. ตั้งค่าโดเมนส่วนกลางสำหรับ video ที่จุดเดียวเหมือนเดิม
//  https://cdn.jsdelivr.net/gh/kang1502/Series@main/
//  https://kang1502.github.io/Series/
var myDomain = "https://cdn.jsdelivr.net/gh/kang1502/Series@main/"; 

(function() {
    var sourceTag = document.getElementById('m3'); 
    if (sourceTag) {
        var currentFile = sourceTag.getAttribute('src');
        sourceTag.src = myDomain + currentFile;
    }
})();
