 function showTextToast(text){
  wx.showToast({
    title: text,
    icon: 'none',
  });
}
function showSuccessToast(text) {
  wx.showToast({
    title: text,
  });
}
module.exports = {
  showTextToast,
  showSuccessToast
}