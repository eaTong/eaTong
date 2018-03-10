/**
 * Created by eatong on 17-11-22.
 */

const axios = require('axios');
const nodejieba = require("nodejieba");

module.exports.grabContent = function grabContent(str) {
  const htmlReg = new RegExp('\<[^>]*\>\s*', 'g');
  const markdownReg = new RegExp(/(#{1,})|(\*{1,})|(`)/, 'g');

  return str.replace(htmlReg, '').replace(markdownReg, '').replace(/\n/g, '');
};

/**
 * 获取浏览器信息
 * @param agent
 * @returns {{browser: string, version: number}}
 */
module.exports.getBrowserInfo = function getBrowserInfo(agent) {
  let nameOffset, verOffset, ix, browserName = 'unknow', fullVersion = 0;

// In Opera 15+, the true version is after "OPR/"
  if (/Baiduspider/.test(agent)) {
    browserName = 'Baiduspider';
    fullVersion = '0';
  } else if (/Googlebot/.test(agent)) {
    browserName = 'Googlebot';
    fullVersion = '0';
  } else if (/360JK/.test(agent)) {
    browserName = '360JK';
    fullVersion = '0';
  } else if (/360JK/.test(agent)) {
    browserName = '360JK';
    fullVersion = '0';
  } else if (/360Spider/.test(agent)) {
    browserName = '360Spider';
    fullVersion = '0';
  } else if (/Alibaba/.test(agent)) {
    browserName = 'Alibaba.Security';
    fullVersion = '0';
  } else if ((verOffset = agent.indexOf("OPR/")) !== -1) {
    browserName = "Opera";
    fullVersion = agent.substring(verOffset + 4);
  }
// In older Opera, the true version is after "Opera" or after "Version"
  else if ((verOffset = agent.indexOf("Opera")) !== -1) {
    browserName = "Opera";
    fullVersion = agent.substring(verOffset + 6);
    if ((verOffset = agent.indexOf("Version")) !== -1)
      fullVersion = agent.substring(verOffset + 8);
  }
// In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = agent.indexOf("MSIE")) !== -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = agent.substring(verOffset + 5);
  }
// In Chrome, the true version is after "Chrome"
  else if ((verOffset = agent.indexOf("Chrome")) !== -1) {
    browserName = "Chrome";
    fullVersion = agent.substring(verOffset + 7);
  }
// In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = agent.indexOf("Safari")) !== -1) {
    browserName = "Safari";
    fullVersion = agent.substring(verOffset + 7);
    if ((verOffset = agent.indexOf("Version")) !== -1)
      fullVersion = agent.substring(verOffset + 8);
  }
// In Firefox, the true version is after "Firefox"
  else if ((verOffset = agent.indexOf("Firefox")) !== -1) {
    browserName = "Firefox";
    fullVersion = agent.substring(verOffset + 8);
  }
// In most other browsers, "name/version" is at the end of userAgent
  else if ((nameOffset = agent.lastIndexOf(' ') + 1) < (verOffset = agent.lastIndexOf('/'))) {
    browserName = agent.substring(nameOffset, verOffset);
    fullVersion = agent.substring(verOffset + 1);
  }
// trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(";")) !== -1)
    fullVersion = fullVersion.substring(0, ix);
  if ((ix = fullVersion.indexOf(" ")) !== -1)
    fullVersion = fullVersion.substring(0, ix);

  const majorVersion = parseInt('' + fullVersion, 10) || 0;
  return {browser: browserName, version: majorVersion};
};

/**
 * 获取IP地址信息
 * @param ip
 * @returns {Promise<*>}
 */
module.exports.getIpInfo = async function getIpInfo(ip) {
  return await  axios.get(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`);
};
/**
 * 获取文本中的关键字
 * @param str
 * @param count
 * @returns {any[]}
 */
module.exports.getKeywords = function getKeywords(str, count) {
  const arr = nodejieba.tag(str);
  const keyWordsType = ['eng', 'n', 'l', 'a', 'i', 'nr'];
  const dic = {};
  for (let item of arr) {
    if (keyWordsType.indexOf(item.tag) !== -1) {

      if (dic[item.word]) {
        dic[item.word].count = dic[item.word].count + 1;
      } else {
        dic[item.word] = {count: 1, tag: item.tag};
      }
    }
  }
  const keyWords = [];
  for (let key in dic) {
    keyWords.push({name: key, count: dic[key].count})
  }
  return keyWords.sort((a, b) => b.count - a.count).slice(0, count || 5).map(item => item.name);
};
