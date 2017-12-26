const VisitLog = require ('../schema/VisitLogSchema');

/**
 * Created by eatong on 17-12-8.
 */
 async function addVisitLog(data) {
  const log = new VisitLog({
    ...data,
    blog: data.blogId,
    visitTime: new Date(),
  });
  return await log.save();
}

async function getVisitLogs(data) {
  return await VisitLog.find().populate('blog', 'title').sort({visitTime: -1});
}


module.exports ={getVisitLogs, addVisitLog};
