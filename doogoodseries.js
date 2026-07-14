// 1. ตั้งค่าโดเมนส่วนกลางสำหรับ video ที่จุดเดียวเหมือนเดิม
//   https://cdn.jsdelivr.net/gh/de077/Series@main/
//   https://de077.github.io/Series/
var myDomain = "https://cdn.jsdelivr.net/gh/de077/Series@main/"; 

(function() {
    var sourceTag = document.getElementById('m3'); 
    if (sourceTag) {
        var currentFile = sourceTag.getAttribute('src');
        sourceTag.src = myDomain + currentFile;
    }
})();

// ตั้งค่าโดเมนส่วนกลางสำหรับเก็บซับไตเติล (เวลาโดเมนเปลี่ยน มาแก้ตรงนี้ที่เดียวจบ!)
//  https://cdn.jsdelivr.net/gh/de077/subtitle@main/
//  https://raw.githubusercontent.com/de077/subtitle/refs/heads/main/
var subDomain = "https://cdn.jsdelivr.net/gh/de077/subtitle@main/";

(function() {
    var trackTags = document.querySelectorAll('track');
    trackTags.forEach(function(track) {
        var currentFile = track.getAttribute('src');        
        if (currentFile) {
            track.src = subDomain + currentFile;
        }
    });
})();
