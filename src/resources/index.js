import { userResource } from './users';
import { postResource, commentsResource } from './posts';

export * from './users';
export * from './posts';
export * from './dashboard';

export default [postResource, commentsResource, userResource];

