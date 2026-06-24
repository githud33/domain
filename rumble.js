// 1. ตั้งค่าโดเมนส่วนกลางที่จุดเดียวเหมือนเดิม
var videoDomain = "https://hugh.cdn.rumble.cloud/";

(function() {
    // ค้นหาแท็ก source ที่มี id="mp" บนหน้าเว็บ
    var mpSource = document.getElementById('mp');
    
    if (mpSource) {
        // ดึงค่าไฟล์เดิมที่ใส่ไว้ (เช่น ดึงคำว่า video/fwe2/.../0t8zA.aaa.mp4 ออกมา)
        var currentFile = mpSource.getAttribute('src');
        
        // เอาโดเมนใหม่ไปต่อข้างหน้าไฟล์เดิม
        mpSource.src = videoDomain + currentFile;
        
    }
})();
