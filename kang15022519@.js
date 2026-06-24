// 1. ตั้งค่าโดเมนส่วนกลางที่จุดเดียวเหมือนเดิม
var videoDomain = "https://kang1502.github.io/Series/";

(function() {
    // ค้นหาแท็ก source ที่มี id="mp" บนหน้าเว็บ
    var mpSource = document.getElementById('m3');
    
    if (mpSource) {
        // ดึงค่าไฟล์เดิมที่ใส่ไว้ (เช่น ดึงคำส่วหลัง ออกมา)
        var currentFile = mpSource.getAttribute('src');
        
        // เอาโดเมนใหม่ไปต่อข้างหน้าไฟล์เดิม
        mpSource.src = videoDomain + currentFile;
        
    }
})();
