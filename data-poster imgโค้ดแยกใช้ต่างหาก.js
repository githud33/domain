// 🖼️ ส่วนที่ 1: สำหรับรูปภาพทั่วไป (<img>) และภาพหน้าปกวิดีโอ (poster)

(function() {
    var config = {
        old: "https://raw.githubusercontent.com/mey2015/image/main/uploads/",
        new: "https://cdn.jsdelivr.net/gh/mey2015/image@main/uploads/"
    };

    function convertImage(url) {
        if (!url) return url;
        var trimmed = url.trim();
        // กรณีลิงก์สั้น -> เติมโดเมน jsDelivr
        if (!trimmed.startsWith('http')) return config.new + trimmed;
        // กรณีลิงก์ยาว GitHub Raw -> สับร่างเปลี่ยนเป็น jsDelivr
        if (trimmed.includes(config.old)) return trimmed.replace(config.old, config.new);
        return trimmed;
    }

    document.addEventListener("DOMContentLoaded", function() {
        // 📷 จัดการแท็กรูปภาพทั่วไป <img>
        document.querySelectorAll('img').forEach(function(img) {
            var s = img.getAttribute('src');
            if (s) img.setAttribute('src', convertImage(s));
        });

        // 🖼️ จัดการหน้าปกในแท็ก <video> (ทั้ง poster และ data-poster)
        document.querySelectorAll('video').forEach(function(video) {
            var p = video.getAttribute('poster');
            var dp = video.getAttribute('data-poster');
            if (p) video.poster = convertImage(p);
            if (dp) video.poster = convertImage(dp);
        });
    });
})();


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


//   🎬 ส่วนที่ 3: สำหรับไฟล์วิดีโอ (<source>) เท่านั้น (เน้นปลอดภัย วิดีโอไม่ค้าง) ชิ้นส่วนนี้คุมเฉพาะตัวไฟล์หนัง .m3u8 หรือ .mp4

(function() {
    var config = {
        old: "https://raw.githubusercontent.com/de077/Series/refs/heads/main/",
        new: "https://cdn.jsdelivr.net/gh/de077/Series@main/"
    };

    function convertVideo(url) {
        if (!url) return url;
        var trimmed = url.trim();
        // รองรับเฉพาะลิงก์ยาว GitHub Raw -> สับร่างเปลี่ยนเป็น jsDelivr (ลิงก์สั้นจะถูกข้ามไป)
        if (trimmed.includes(config.old)) return trimmed.replace(config.old, config.new);
        return trimmed;
    }

    document.addEventListener("DOMContentLoaded", function() {
        // 🎬 จัดการสับเปลี่ยนลิงก์ยาวในแท็ก <source>
        document.querySelectorAll('source').forEach(function(source) {
            var s = source.getAttribute('src');
            if (s) {
                var newSrc = convertVideo(s);
                if (s !== newSrc) {
                    source.setAttribute('src', newSrc);
                }
            }
        });
    });
})();


//  🧩 ส่วนที่ 4: ฟังก์ชันส่วนกลาง (ตัวแปลง URL เปล่า ๆ ไม่มีตัวดักโหลดหน้าเว็บ)
// เผื่อพี่เอาไว้ใช้ครอบฟังก์ชันอื่น หรือใช้สั่งแปลงลิงก์แบบ Custom ด้วยตัวเองในสคริปต์ตัวอื่นครับ
// ฟังก์ชันอเนกประสงค์ ส่งลิงก์กับประเภทงานเข้ามา จะได้ลิงก์ jsDelivr กลับไปทันที

function smartConvert(currentUrl, type) {
    var config = {
        image: { old: "https://raw.githubusercontent.com/mey2015/image/main/uploads/", new: "https://cdn.jsdelivr.net/gh/mey2015/image@main/uploads/" },
        video: { old: "https://raw.githubusercontent.com/de077/Series/refs/heads/main/", new: "https://cdn.jsdelivr.net/gh/de077/Series@main/" },
        subtitle: { old: "https://raw.githubusercontent.com/de077/subtitle/refs/heads/main/", new: "https://cdn.jsdelivr.net/gh/de077/subtitle@main/" }
    };

    if (!currentUrl) return currentUrl;
    var trimmedUrl = currentUrl.trim();

    // 1. เช็คกรณีลิงก์สั้น (ไม่มี http)
    if (!trimmedUrl.startsWith('http')) {
        if (type === 'image') return config.image.new + trimmedUrl;
        if (type === 'subtitle') return config.subtitle.new + trimmedUrl;
        return trimmedUrl; 
    }

    // 2. เช็คกรณีลิงก์ยาว GitHub Raw เพื่อสับร่าง
    if (trimmedUrl.includes(config.image.old)) return trimmedUrl.replace(config.image.old, config.image.new);
    if (trimmedUrl.includes(config.video.old)) return trimmedUrl.replace(config.video.old, config.video.new);
    if (trimmedUrl.includes(config.subtitle.old)) return trimmedUrl.replace(config.subtitle.old, config.subtitle.new);

    return trimmedUrl;
}


// =============================================================================

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


//  🖼️ โค้ดชุดที่ 2: จัดการเฉพาะหน้าปกวิดีโอ (poster / data-poster) เท่านั้น
(function() {
    // ⚙️ ตั้งค่าคลังโดเมน (เก่า 2 ชุด -> ใหม่ 1 ชุด)
    var config = {
        githubRaw: "https://raw.githubusercontent.com/mey2015/image/main/uploads/",
        githubIo: "https://mey2015.github.io/image/uploads/",
        jsdelivr: "https://cdn.jsdelivr.net/gh/mey2015/image@main/uploads/"
    };

    function convertPoster(url) {
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

    // 🛠️ สั่งลุยค้นหาและเปลี่ยนเฉพาะโปสเตอร์ในแท็ก <video>
    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('video').forEach(function(video) {
            var p = video.getAttribute('poster');
            var dp = video.getAttribute('data-poster');
            if (p) video.poster = convertPoster(p);
            if (dp) video.poster = convertPoster(dp);
        });
    });
})();

