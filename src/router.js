import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CreatePlaylist from './views/CreatePlaylist.vue';

Vue.use(Router);

export default new Router({
  history: true,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/create-playlist',
      name: 'Create Playlist',
      component: CreatePlaylist,
    },
  ],
});
