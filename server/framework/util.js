/**
 * Created by eatong on 17-11-22.
 */
export function grabContent(str) {
  const reg = new RegExp('\<[^>]*\>\s*', 'g');
  return str.replace(reg, '').replace(/\n/g, '');
}

export function getBrowserInfo(agent) {
  let nameOffset, verOffset, ix, browserName = 'unknow', fullVersion = 0;

// In Opera 15+, the true version is after "OPR/"
  if ((verOffset = agent.indexOf("OPR/")) !== -1) {
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
  }else if(/Baiduspider/.test(agent)){
    browserName = 'Baiduspider';
    fullVersion = 0;
  }else if(/Googlebot/.test(agent)){
    browserName = 'Googlebot';
    fullVersion = 0;
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
}


