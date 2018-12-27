//url相关
var BASE_URL = "http://gank.io/api";
var GET_MEIZHI_URL = BASE_URL.concat("/data/%E7%A6%8F%E5%88%A9/10/");
var ANDROID_DESK_BASE_URL = "http://service.picasso.adesk.com";
var HOME_PAGE_URL = ANDROID_DESK_BASE_URL.concat("/v3/homepage?limit=30&skip=");
// 将方法、变量暴露出去
var SPECIAL_URL = ANDROID_DESK_BASE_URL.concat("/v1/wallpaper/album?limit=30&skip=");
//专辑详情
var SPECIAL_DETAIL_URL = ANDROID_DESK_BASE_URL.concat("/v1/wallpaper/album/{id}/wallpaper?limit=30&skip=0");
module.exports = {
    BASE_URL: BASE_URL,
    GET_MEIZHI_URL: GET_MEIZHI_URL,
    HOME_PAGE_URL: HOME_PAGE_URL,
    SPECIAL_URL: SPECIAL_URL
}
