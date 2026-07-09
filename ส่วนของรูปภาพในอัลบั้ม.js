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