/**
 * Created by <a href="mailto:bhupendra.bhudia@quedex.co">Bhupendra Bhudia</a> on 08/03/2016.
 */
function generateGUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
}

function generateGUID2() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toLowerCase();
}

var lut = [];
for (var i = 0; i < 256; i++) {
  lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
}
function generateFastGUID() {
  var d0 = Math.random() * 0xffffffff | 0;
  var d1 = Math.random() * 0xffffffff | 0;
  var d2 = Math.random() * 0xffffffff | 0;
  var d3 = Math.random() * 0xffffffff | 0;
  return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
    lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
    lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
    lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}

function generateUUID() {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ----------------------------------- TEST HARNESS

console.time('t');
for (var i = 0; i < 10; i++) {
  console.log('#' + i + ' GUID:', generateGUID());
}
console.timeEnd('t');
console.log('')

console.time('t');
for (var i = 0; i < 10; i++) {
  console.log('#' + i + ' GUID:', generateGUID2());
}
console.timeEnd('t');
console.log('')

console.time('t');
for (var i = 0; i < 10; i++) {
  console.log('#' + i + ' GUID:', generateFastGUID());
}
console.timeEnd('t');
console.log('')

console.time('t');
for (var i = 0; i < 10; i++) {
  console.log('#' + i + ' UUID:', generateUUID());
}
console.timeEnd('t');
console.log('')

for (var i = 0; i < 10; i++) {
  console.log('#' + i + ' RandomInt:', getRandomInt(0, 10));
}
console.log('')

for (var i = 0; i < 10; i++) {
  console.log('#' + i + ' RandomInt:', getRandomInt(20, 50));
}
console.log('')
