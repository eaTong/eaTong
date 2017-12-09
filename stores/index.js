import Todo from './Todo';
import App from './App';
import User from './User';
import BlogAdmin from './BlogAdmin';
import Blog from './Blog';
import VisitLog from './VisitLog';

export default {
  todo: new Todo(),
  app: new App(),
  user: new User(),
  blogAdmin: new BlogAdmin(),
  blog: new Blog(),
  visitLog: new VisitLog(),
}
