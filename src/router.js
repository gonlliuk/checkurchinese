import Vue from 'vue';
import Router from 'vue-router';

import Root from './views/Root.vue';
import Task from './views/Task.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'root',
        component: Root,
    }, {
        path: '/page/:pageId/block/:blockId/task/:taskId',
        name: 'task',
        component: Task,
    }, {
        path: '*',
        redirect: '/',
    }],
});
