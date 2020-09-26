<template>
  <v-app>
    <v-navigation-drawer app
          expand-on-hover clipped
        >
      <app-header></app-header>
    </v-navigation-drawer>
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>

  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
export default {
  name: 'App',

  components: {
    AppHeader
  },
  data () {
    return {
      drawer: false
    };
  }
};
</script>
