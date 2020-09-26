<template>
  <div>

    <v-list>
    <v-list-item class="px-2">
        <v-list-item-avatar>
        <!-- <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img> -->
        <!-- <v-img :src="/assets/Like IM GONNA LOSE YOU.jpg"></v-img> -->
        <v-img :src="src"></v-img>
        </v-list-item-avatar>
    </v-list-item>

    <v-list-item link>
        <v-list-item-content>
        <v-list-item-title class="title">사용법 읽고 오세영~</v-list-item-title>
        <v-list-item-subtitle>잼나게 보세영~</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
    <v-list-item link v-for="item in items" :key="item.name">
        <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title><router-link :to="item.to">{{ item.name }}</router-link></v-list-item-title>
    </v-list-item>
    </v-list>

  </div>
</template>

<script>
export default {
  data () {
    return {
      src: 'C:/Users/gksrl/Desktop/뷰/vue-player/src/assets/hang.jpg',
      items: [
        {
          name: 'MUSIC PLAYER',
          to: '/player',
          icon: 'mdi-music'
        },
        {
          name: 'WEBTOON DOWNLOADER',
          to: '/wtdownload',
          icon: 'mdi-download'
        },
        {
          name: 'WEBTOON VIEWER',
          to: '/wtFolders',
          icon: 'mdi-eye'
        }
      ]
    };
  }
};
</script>

<style>

</style>
