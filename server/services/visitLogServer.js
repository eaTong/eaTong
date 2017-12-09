import VisitLog from "../schema/VisitLogSchema";

/**
 * Created by eatong on 17-12-8.
 */
export async function addVisitLog(data) {
  const log = new VisitLog({
    blog: data.blogId,
    time: new Date(),
    userAgent: data.userAgent,
    ip: data.ip
  });
  return await log.save();
}

export async function getVisitLogs(data) {
  return await VisitLog.find().populate('blog', 'title');
}


export default {getVisitLogs, addVisitLog}
