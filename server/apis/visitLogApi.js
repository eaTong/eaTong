/**
 * Created by eatong on 17-12-9.
 */
const visitLogServer = require('../services/visitLogServer');


async function getVisitLogs(ctx) {
  return await visitLogServer.getVisitLogs();
}

module.exports = {getVisitLogs};



