// 1. ตั้งค่าโดเมนส่วนกลางสำหรับ video ที่จุดเดียวเหมือนเดิม
var myDomain = "https://de077.github.io/Series/"; 

(function() {
    var sourceTag = document.getElementById('m3'); 
    if (sourceTag) {
        var currentFile = sourceTag.getAttribute('src');
        sourceTag.src = myDomain + currentFile;
    }
})();

// ตั้งค่าโดเมนส่วนกลางสำหรับเก็บซับไตเติล (เวลาโดเมนเปลี่ยน มาแก้ตรงนี้ที่เดียวจบ!)
var subDomain = "https://raw.githubusercontent.com/de077/subtitle/refs/heads/main/";

(function() {
    var trackTags = document.querySelectorAll('track');
    trackTags.forEach(function(track) {
        var currentFile = track.getAttribute('src');        
        if (currentFile) {
            track.src = subDomain + currentFile;
        }
    });
})();
