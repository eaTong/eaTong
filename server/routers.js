import Router from 'koa-router';

import {getTodo, addTodo, toggleTodo} from './apis/todoApi';

const router = new Router();

router.post('/api/todo/get', getTodo);
router.post('/api/todo/add', addTodo);
router.post('/api/todo/toggle', toggleTodo);


export default router;
