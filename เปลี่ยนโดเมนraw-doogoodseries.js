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

    // 🔄 2. ฟังก์ชันส่วนกลางสำหรับสแกนและเปลี่ยนลิงก์ตามสเปกเว็บพี่
    function smartConvert(currentUrl, type) {
        if (!currentUrl) return currentUrl;
        var trimmedUrl = currentUrl.trim();

        // 🟢 กรณีที่ 1: เป็นลิงก์สั้นธรรมดา (ไม่มี http) -> รองรับภาพ, หน้าปก, ซับ
        if (!trimmedUrl.startsWith('http')) {
            if (type === 'image') return config.image.new + trimmedUrl;
            if (type === 'subtitle') return config.subtitle.new + trimmedUrl;
            return trimmedUrl; // วิดีโอไม่ยอมรับลิงก์สั้น ให้ส่งค่ากลับไปปกติ
        }

        // 🟢 กรณีที่ 2: เป็นลิงก์ยาว GitHub Raw -> สับร่างเปลี่ยนไส้ในเป็น jsDelivr (รองรับทุกตัวรวมถึงวิดีโอ)
        if (trimmedUrl.includes(config.image.old)) return trimmedUrl.replace(config.image.old, config.image.new);
        if (trimmedUrl.includes(config.video.old)) return trimmedUrl.replace(config.video.old, config.video.new);
        if (trimmedUrl.includes(config.subtitle.old)) return trimmedUrl.replace(config.subtitle.old, config.subtitle.new);

        return trimmedUrl;
    }

    // 🛠️ 3. สั่งลุยเปลี่ยนยกแผงเมื่อโครงสร้างเว็บพร้อม
    document.addEventListener("DOMContentLoaded", function() {
        
        // 🖼️ จัดการแท็กรูปภาพทั่วไป <img>
        document.querySelectorAll('img').forEach(function(img) {
            var s = img.getAttribute('src');
            if (s) img.setAttribute('src', smartConvert(s, 'image'));
        });

        // 💬 จัดการแท็กซับไตเติล <track> (รองรับทั้งลิงก์สั้น และ ลิงก์ยาว GitHub)
        document.querySelectorAll('track').forEach(function(track) {
            var s = track.getAttribute('src');
            if (s) track.setAttribute('src', smartConvert(s, 'subtitle'));
        });

        // 🖼️ จัดการแท็ก <video> (ตรงโปสเตอร์หน้าปกวิดีโอ)
        document.querySelectorAll('video').forEach(function(video) {
            var p = video.getAttribute('poster');
            var dp = video.getAttribute('data-poster');
            
            if (p) video.poster = smartConvert(p, 'image');
            if (dp) video.poster = smartConvert(dp, 'image');
        });

        // 🎬 จัดการสับเปลี่ยนลิงก์ยาวในแท็ก <source> ให้เป็น jsDelivr แบบปลอดภัย (ไม่กวนระบบโหลดวิดีโอ)
        document.querySelectorAll('source').forEach(function(source) {
            var s = source.getAttribute('src');
            if (s) {
                var newSrc = smartConvert(s, 'video');
                if (s !== newSrc) {
                    source.setAttribute('src', newSrc);
                }
            }
        });

        console.log("🤖 [นายช่าง] ล็อกสเปกตามผลเทสเรียบร้อย! วิดีโอเล่นลื่น หน้าปกและซับขึ้นครบถ้วนครับพี่!");
    });
})();
