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
/*ปิด
// ==========================================================================
// ==========================================================================
// 💬 (<track>) แบบใส่ไม่ต้องใส่โดเมนข้างหน้า
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
/**/

// ==========================================================================
// ==========================================================================
//  💬 (<track>) แบบใส่โดเมนเต็มได้ และไม่ต้องใส่โดเมนข้างหน้า
(function() {
    var config = {
        old: "https://raw.githubusercontent.com/kang1502/subtitle/refs/heads/main/",
        new: "https://cdn.jsdelivr.net/gh/kang1502/subtitle@main/"
    //    new: "https://kang1502.github.io/subtitle/"        
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
