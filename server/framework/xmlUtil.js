/**
 * Created by eatong on 18-1-2.
 */

const {Parser, Builder} = require('xml2js');

/**
 * add async support for parser.parseString
 * @param str
 * @returns {Promise<any>}
 */
module.exports.parseString = async function parseString(str) {
  return new Promise((resolve, reject) => {
    const parser = new Parser({async: true});
    parser.parseString(str, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  });
};

