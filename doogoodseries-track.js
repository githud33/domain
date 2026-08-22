//  👁‍🗨ลองใช้โค้ดชุดใหม่
//  💬 ส่วนที่ 2: สำหรับซับไตเติล (<track>) เท่านั้น ชิ้นส่วนนี้คุมคลังซับไตเติล ดึงไฟล์ .vtt

(function() {
    var config = {
        old: "https://raw.githubusercontent.com/de077/subtitle/refs/heads/main/",
        new: "https://cdn.jsdelivr.net/gh/de077/subtitle@main/"
    };

    function convertSubtitle(url) {
        if (!url) return url;
        var trimmed = url.trim();
        // กรณีลิงก์สั้น -> เติมโดเมน jsDelivr
        if (!trimmed.startsWith('http')) return config.new + trimmed;
        // กรณีลิงก์ยาว GitHub Raw -> สับร่างเปลี่ยนเป็น jsDelivr
        if (trimmed.includes(config.old)) return trimmed.replace(config.old, config.new);
        return trimmed;
    }

    document.addEventListener("DOMContentLoaded", function() {
        // 💬 จัดการแท็กซับไตเติล <track>
        document.querySelectorAll('track').forEach(function(track) {
            var s = track.getAttribute('src');
            if (s) track.setAttribute('src', convertSubtitle(s));
        });
    });
})();
