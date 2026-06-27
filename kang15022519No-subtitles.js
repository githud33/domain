// 1. ตั้งค่าโดเมนส่วนกลางสำหรับ video ที่จุดเดียวเหมือนเดิม
var myDomain = "https://kang1502.github.io/Series/"; 

(function() {
    var sourceTag = document.getElementById('m3'); 
    if (sourceTag) {
        var currentFile = sourceTag.getAttribute('src');
        sourceTag.src = myDomain + currentFile;
    }
})();
