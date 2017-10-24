import Router from 'koa-router';

import {getTask} from './apis/taskApi';

const router = new Router();

router.get('/api/task/get', getTask);


export default router;
