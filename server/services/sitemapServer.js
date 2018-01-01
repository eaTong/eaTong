/**
 * Created by eatong on 18-1-1.
 */

async function parseString(str) {
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
}
