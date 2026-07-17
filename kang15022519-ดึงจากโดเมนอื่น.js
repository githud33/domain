//  พิมพ์ purge แทนตัว cdn เพื่อล้างแค้น https://purge.jsdelivr.net/
// 1. ตั้งค่าโดเมนส่วนกลางสำหรับ video ที่จุดเดียวเหมือนเดิม
//   ใช้โดเมนตัวใดตัวหนึ่งแทนกันได้
//  https://cdn.jsdelivr.net/gh/kang1502/Series@main/
//  https://kang1502.github.io/Series/
var myDomain = "https://cdn.jsdelivr.net/gh/kang1502/Series@main/"; 

(function() {
    var sourceTag = document.getElementById('m3'); 
    if (sourceTag) {
        var currentFile = sourceTag.getAttribute('src');
        sourceTag.src = myDomain + currentFile;
    }
})();

/*
// =====================================================
//  พิมพ์ purge แทนตัว cdn เพื่อล้างแค้น https://purge.jsdelivr.net/
// ตั้งค่าโดเมนส่วนกลางสำหรับเก็บซับไตเติล (เวลาโดเมนเปลี่ยน มาแก้ตรงนี้ที่เดียวจบ!)
//   ใช้โดเมนตัวใดตัวหนึ่งแทนกันได้
//  https://cdn.jsdelivr.net/gh/kang1502/subtitle@main/
//  https://kang1502.github.io/subtitle/
var subDomain = "https://cdn.jsdelivr.net/gh/kang1502/subtitle@main/";

(function() {
    var trackTags = document.querySelectorAll('track');
    trackTags.forEach(function(track) {
        var currentFile = track.getAttribute('src');        
        if (currentFile) {
            track.src = subDomain + currentFile;
        }
    });
})();
*/

// =================================================
//  ปิดตัวเล่น ID source บางตัว
// =================================================
var video = document.getElementById("main-video");

// วิ่งไปหาแท็กที่มี id="m3" หรือ id="mk" หรือ id="tx" ทั้งหมดมาลูปเพื่อลบออก
document.querySelectorAll("#mp, #mk, #ru, #tx").forEach(function(mediaSource) {
    mediaSource.remove();
});

// สั่งโหลดวิดีโอใหม่และเล่นทันที (ยุบรวมเหลือชุดเดียวพอครับ)
if (video) {
    video.load();
   // video.play(); // สั่งให้เล่นวิดีโอตัวที่เหลืออยู่ (id="mp") ทันที ***ถ้าเปิดแท็กตัวนี้ เริ่มเล่นทันทีโดยที่คนดูไม่ต้องกดปุ่ม Play สามารถเพิ่มคำสั่ง .play()
}

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

/*
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
*/
