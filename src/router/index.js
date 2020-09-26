import Vue from 'vue';
import VueRouter from 'vue-router';
import MusicPlayer from '../views/musicPlayer.vue';
import WebtoonDownloader from '../views/WebtoonDownloader.vue';
import WebtoonFolders from '../views/WebtoonFolders.vue';
import WebtoonImages from '../views/WebtoonImages.vue';
import WebtoonViewer from '../views/WebtoonViewer.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/player',
    name: 'musicPlayer',
    component: MusicPlayer
  },
  {
    path: '/wtDownload',
    name: 'WebtoonDownloader',
    component: WebtoonDownloader
  },
  {
    path: '/wtFolders',
    name: 'WebtoonFolders',
    component: WebtoonFolders
  },
  {
    path: '/wtFolders/wtFiles',
    name: 'WebtoonImages',
    component: WebtoonImages
  },
  {
    path: '/wtFolders/wtFiles/:id',
    name: 'WebtoonViewer',
    component: WebtoonViewer,
    beforeRouteUpdate (to, from, next) {
      console.log(to);
      console.log(from);

      next();
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
