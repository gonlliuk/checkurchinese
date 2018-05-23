import Vue from 'vue';
import Vuex from 'vuex';

import HttpService from './services/http.service';

const http = new HttpService();

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pages: [],
    },
    mutations: {
        setPages(state, pages) {
            state.pages = pages;
        },
    },
    actions: {
        setPages({ commit }, pages) {
            commit('setPages', pages);
        },
        getPages({ dispatch }) {
            return http.get('/page')
                .then((pages) => {
                    dispatch('setPages', pages);
                });
        },
        getInfo({ state }, { pageId, blockId, taskId }) {
            const page = state.pages.find(item => item.id === pageId);
            if (!page) return {};

            const block = page.blocks.find(item => item.id === blockId);
            if (!block) return {};

            const task = block.tasks.find(item => item.id === taskId);
            if (!task) return {};

            return {
                page,
                block,
                task,
            };
        },
    },
});
