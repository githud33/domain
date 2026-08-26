// cdn-config.js
// ถ้าวันข้างหน้าเปลี่ยน Domain ให้มาแก้ตรงนี้บรรทัดเดียวครับ
const MAIN_DOMAIN = "https://cdn.jsdelivr.net/gh/kang1502/Series/";

function cdn(path) {
    return MAIN_DOMAIN + path;
}
