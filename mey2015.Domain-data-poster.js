var videoDomain = "https://cdn.jsdelivr.net/gh/mey2015/image@main/uploads/";

(function() {
    var videoTags = document.querySelectorAll('video');
    videoTags.forEach(function(video) {
        // 🚨 แก้ตรงนี้: ใส่ 'data-poster' ให้ตรงกับในแท็ก HTML ของพี่
        var currentFile = video.getAttribute('data-poster');        
        if (currentFile) {
            video.poster = videoDomain + currentFile;
        }
    });
})();