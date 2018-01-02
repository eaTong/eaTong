/**
 * Created by eatong on 18-1-1.
 */

const fs = require('fs-extra');
const path = require('path');
const {Builder} = require('xml2js');
const {parseString} = require('../framework/xmlUtil');


async function insertUrlToSitemap(url, priority) {
  const xmlPath = path.resolve(__dirname, '../../static/sitemap.xml');
  const builder = new Builder();
  const file = await  fs.readFile(xmlPath, 'utf-8');
  const sitemap = await parseString(file);
  sitemap.urlset.url.push(
    {
      loc: ['http://www.eatong.cn' + url],
      lastmod: [new Date().toISOString()],
      priority: [priority || 0.8]
    }
  );

  const str = builder.buildObject(sitemap);
  await fs.writeFile(xmlPath, str);
}

module.exports = {insertUrlToSitemap};
