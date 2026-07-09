(function() {
    // ⚙️ 1. ตั้งค่าจับคู่โดเมนเก่า (GitHub Raw) -> โดเมนใหม่ (jsDelivr) ทั้ง 3 ชุด
    var config = {
        image: {
            old: "https://raw.githubusercontent.com/mey2015/image/main/uploads/",
            new: "https://cdn.jsdelivr.net/gh/mey2015/image@main/uploads/"
        },
        video: {
            old: "https://raw.githubusercontent.com/de077/Series/refs/heads/main/",
            new: "https://cdn.jsdelivr.net/gh/de077/Series@main/"
        },
        subtitle: {
            old: "https://raw.githubusercontent.com/de077/subtitle/refs/heads/main/",
            new: "https://cdn.jsdelivr.net/gh/de077/subtitle@main/"
        }
    };

    // 🔄 2. ฟังก์ชันส่วนกลางสำหรับสแกนและเปลี่ยนลิงก์
    function convertUrl(currentUrl) {
        if (!currentUrl) return currentUrl;
        
        // เช็คคลังภาพ
        if (currentUrl.includes(config.image.old)) {
            return currentUrl.replace(config.image.old, config.image.new);
        }
        // เช็คคลังวิดีโอ
        if (currentUrl.includes(config.video.old)) {
            return currentUrl.replace(config.video.old, config.video.new);
        }
        // เช็คคลังซับ
        if (currentUrl.includes(config.subtitle.old)) {
            return currentUrl.replace(config.subtitle.old, config.subtitle.new);
        }
        return currentUrl;
    }

    // 🛠️ 3. สั่งลุยเปลี่ยนยกแผงเมื่อโครงสร้างเว็บพร้อม
    document.addEventListener("DOMContentLoaded", function() {
        
        // 🖼️ เปลี่ยนลิงก์โปสเตอร์/หน้าปกวิดีโอ
        document.querySelectorAll('video').forEach(function(video) {
            var p = video.getAttribute('poster');
            var dp = video.getAttribute('data-poster');
            var s = video.getAttribute('src');
            
            if (p) video.setAttribute('poster', convertUrl(p));
            if (dp) video.setAttribute('data-poster', convertUrl(dp));
            if (s) {
                video.setAttribute('src', convertUrl(s));
                // 🚨 เอา video.load() ออกเพื่อความปลอดภัย
            }
        });

        // 🎬 เปลี่ยนลิงก์ไฟล์วิดีโอ (แท็ก source)
        document.querySelectorAll('source').forEach(function(source) {
            var s = source.getAttribute('src');
            if (s) {
                source.setAttribute('src', convertUrl(s));
                // 🚨 เอา parent.load() ออก เพื่อแก้ปัญหาวิดีโอค้าง วนลูปไม่สิ้นสุด
            }
        });

        // 💬 เปลี่ยนลิงก์ไฟล์ซับไตเติล (แท็ก track)
        document.querySelectorAll('track').forEach(function(track) {
            var s = track.getAttribute('src');
            if (s) track.setAttribute('src', convertUrl(s));
        });

        // 📷 เผื่อมีแท็กรูปภาพอื่นๆ ในหน้าเว็บ
        document.querySelectorAll('img').forEach(function(img) {
            var s = img.getAttribute('src');
            if (s) img.setAttribute('src', convertUrl(s));
        });
    });
})();
