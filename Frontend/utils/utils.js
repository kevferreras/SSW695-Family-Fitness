/**
 * radius calculation
 * @param d
 * @returns {number}
 */
function getRad(d) {
  var PI = Math.PI;
  return (d * PI) / 180.0;
}

/**
 * calculate distance
 * @param lng1
 * @param lat1
 * @param lng2
 * @param lat2
 * @returns {number|*}
 * @constructor
 */
export const CoolWPDistance = (la1, lo1, la2, lo2) => {
  var La1 = (la1 * Math.PI) / 180.0;
  var La2 = (la2 * Math.PI) / 180.0;
  var La3 = La1 - La2;
  var Lb3 = (lo1 * Math.PI) / 180.0 - (lo2 * Math.PI) / 180.0;
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(La3 / 2), 2) +
          Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2),
      ),
    );
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s;
};

export const formatDate = (date, format) => {
  //name="date" type="Date"
  //name="format" type="String"  yyyy-MM-dd hh:mm:ss
  var o = {
    'M+': date.getMonth() + 1,

    'd+': date.getDate(),

    'h+': date.getHours(),

    'm+': date.getMinutes(),

    's+': date.getSeconds(),
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return format;
};
