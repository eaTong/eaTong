/**
 * Created by eatong on 17-11-7.
 */

Date.prototype.format = function (format) {
  format = format || 'yyyy-MM-dd';
  const date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};
Date.prototype.getTimeStr = function () {
  const days = Math.round((new Date().getTime() - this.getTime()) / (1000 * 60 * 60 * 24));
  if (days < 1) {
    return this.format('hh:mm');
  } else if (days === 1) {
    return `昨天 ${this.format('hh:mm')}`
  } else if (days === 2) {
    return `前天 ${this.format('hh:mm')}`
  } else {
    if (days.year() === now.year()) {
      return this.format('MM-DD hh:mm')
    } else {
      return this.format('YYYY-MM-DD hh:mm')
    }
  }
}
