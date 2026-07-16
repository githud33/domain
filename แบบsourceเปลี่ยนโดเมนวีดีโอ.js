// 1. ตั้งค่าโดเมนส่วนกลางสำหรับ video ที่จุดเดียวเหมือนเดิม
//   https://cdn.jsdelivr.net/gh/kang1502/Series@main/
//   https://kang1502.github.io/Series/
var myDomain = "https://cdn.jsdelivr.net/gh/kang1502/Series@main/"; 

(function() {
    var sourceTags = document.querySelectorAll('source');
    sourceTags.forEach(function(source) {
        var currentFile = source.getAttribute('src');        
        if (currentFile) {
            source.src = myDomain + currentFile;
        }
    });
})();

