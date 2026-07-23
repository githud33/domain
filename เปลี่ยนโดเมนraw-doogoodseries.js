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

// =============================================================================
// =============================================================================
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

/*
// 📛🚫โค้ดเก่าหยุดใช้ชั่วคราว
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
📛*/
