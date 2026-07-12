/*
(function() {
    // ⚙️ ตั้งค่าโดเมนปลายทางของ jsDelivr และโดเมนเก่าของ GitHub Raw เพื่อดักสแกน
    var jsdelivrDomain = "https://cdn.jsdelivr.net/gh/mey2015/image@main/uploads/";
    var githubRawDomain = "https://raw.githubusercontent.com/mey2015/image/main/uploads/";

    document.addEventListener("DOMContentLoaded", function() {
        // 🖼️ สแกนหาแท็ก <img> ทุกตัวในหน้าเว็บ
        document.querySelectorAll('img').forEach(function(img) {
            var currentSrc = img.getAttribute('src');
            
            if (currentSrc) {
                // กรณีที่ 1: ถ้าเป็นลิงก์สั้นธรรมดา (ไม่มี http) เช่น "Tempest(2025).webp"
                if (!currentSrc.startsWith('http')) {
                    img.setAttribute('src', jsdelivrDomain + currentSrc.trim());
                } 
                // กรณีที่ 2: ถ้าเผลอใส่ลิงก์ GitHub Raw เต็มยศไว้ ให้สับร่างเป็น jsDelivr
                else if (currentSrc.includes(githubRawDomain)) {
                    var updatedSrc = currentSrc.replace(githubRawDomain, jsdelivrDomain);
                    img.setAttribute('src', updatedSrc);
                }
            }
        }); 
    });
})();
*/

// ==============================================================================
//  📷 โค้ดชุดที่ 1: จัดการเฉพาะแท็กรูปภาพทั่วไป (<img>) เท่านั้น
(function() {
    // ⚙️ ตั้งค่าคลังโดเมน (เก่า 2 ชุด -> ใหม่ 1 ชุด)
    var config = {
        githubRaw: "https://raw.githubusercontent.com/mey2015/image/main/uploads/",
        githubIo: "https://mey2015.github.io/image/uploads/",
        jsdelivr: "https://cdn.jsdelivr.net/gh/mey2015/image@main/uploads/"
    };

    function convertImgTag(url) {
        if (!url) return url;
        var trimmed = url.trim();
        
        // 🟢 กรณีที่ 1: ลิงก์สั้นธรรมดา -> เติม jsDelivr อัตโนมัติ
        if (!trimmed.startsWith('http')) {
            return config.jsdelivr + trimmed;
        }
        
        // 🟢 กรณีที่ 2: ลิงก์ยาว GitHub Raw -> เปลี่ยนเป็น jsDelivr
        if (trimmed.includes(config.githubRaw)) {
            return trimmed.replace(config.githubRaw, config.jsdelivr);
        }
        
        // 🟢 กรณีที่ 3: ลิงก์ยาว GitHub.io -> เปลี่ยนเป็น jsDelivr
        if (trimmed.includes(config.githubIo)) {
            return trimmed.replace(config.githubIo, config.jsdelivr);
        }
        
        return trimmed;
    }

    // 🛠️ สั่งลุยค้นหาและเปลี่ยนเฉพาะแท็ก <img>
    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('img').forEach(function(img) {
            var s = img.getAttribute('src');
            if (s) img.setAttribute('src', convertImgTag(s));
        });
    });
})();
