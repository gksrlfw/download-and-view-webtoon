<template>
  <v-container>
    <v-card>
        <!-- <v-card-title>
          <v-toolbar fixed>
          <h1>{{ `${folder.name} : ${this.$route.params.id}화`}}</h1>
          <v-spacer></v-spacer>
          <v-btn @click="changeMode = !changeMode"><v-icon>mdi-eye</v-icon></v-btn>
          </v-toolbar>
        </v-card-title> -->
        <v-card-text>
          <h3>{{ `${folder.name} : ${this.$route.params.id}화`}}</h3>
          <v-row align="center" justify="center">
          <div v-for="onImage in onImages" :key="onImage">
              <v-img :src="onImage" :width="percent+'%'" v-if="changeMode"></v-img>
          </div>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-alert type="error" v-if="lastAlert" @click="lastAlert = !lastAlert">
                마지막 화입니다 ! (클릭)
              </v-alert>
            <v-alert type="error" v-if="existAlert" @click="existAlert = !existAlert">
                존재하지 않는 화입니다 ! (클릭)
              </v-alert>
            </v-col>
            <!-- <v-col cols="1"><v-btn color="error" @click="lastAlert = !lastAlert" v-if="lastAlert"><v-icon>mdi-close</v-icon></v-btn></v-col> -->
            <!-- <v-col cols="1"><v-btn color="error" @click="existAlert = !existAlert" v-if="existAlert"><v-icon>mdi-close</v-icon></v-btn></v-col> -->
          </v-row>

          <v-row v-if="!changeMode" justify="center">

              <v-col ref="left" cols="1" @click="prevImage" v-on:keyup.enter="prevImage">
                  <v-btn height="100%">prev</v-btn>
              </v-col>
              <v-col cols="5">
                  <v-img :src="onImages[index]" :width="percent+'%'" ></v-img>
              </v-col>
              <v-col cols="5">
                  <v-img :src="onImages[index2]" :width="percent+'%'" ></v-img>
              </v-col>
              <v-col cols="1" @click="nextImage" v-on:keyup.enter="nextImage">
                  <v-btn height="100%">next</v-btn>
              </v-col>
          </v-row>
        </v-card-text>
    </v-card>
    <v-footer fixed>
      <!-- <h3>{{ `${folder.name} : ${this.$route.params.id}화`}}</h3> -->
      <v-spacer></v-spacer>
        <input type="text" placeholder="비율" v-model="percent">
        <v-btn @click="changes"><v-icon>mdi-eye</v-icon></v-btn>
        <v-btn @click="prevs">PREV</v-btn>
        <v-btn @click="nexts">NEXT</v-btn>
        <v-btn @click="backs">BACK</v-btn>
        <!-- 왜 안넘어가지?? -->
        <!-- -> fullPath -->
        <!-- <router-link :to="prev">PREV  </router-link>
        <router-link :to="next">NEXT  </router-link> -->
        <!-- <router-link :to="back">GO BACK</router-link> -->
    </v-footer>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
const fsPromises = window.require('fs').promises;
export default {
  created () {
    console.log(this.folder);
    this.loadImages();
  },
  mounted () {
    console.log('mounted', Date.now());
    // key event : https://www.raymondcamden.com/2019/08/12/working-with-the-keyboard-in-your-vue-app
    // remove하지 않으면 계속 중복해서 나온다...
    document.addEventListener('keypress', this.eventForA);
    document.addEventListener('keypress', this.eventForD);
    document.body.scrollTop = 0;
  },
  destroyed () {
    console.log('distroyed');
    document.removeEventListener('keypress', this.eventForA);
    document.removeEventListener('keypress', this.eventForD);
    this.index = 0;
    this.index2 = 0;
  },
  computed: {
    ...mapGetters(['folder', 'changeMode'])
  },
  data () {
    return {
      onImages: [],
      prev: '',
      next: '',
      back: '/wtFolders/wtFiles',
      percent: '77',
      index: 0,
      index2: 1,
      // changeMode: false,
      lastAlert: false,
      existAlert: false
    };
  },
  methods: {
    changes () {
      this.$store.commit('SET_MODE', !this.changeMode);
    },
    eventForA (e) {
      if (e.keyCode === 97) {
        this.prevImage();
      }
    },
    eventForD (e) {
      if (e.keyCode === 100) { this.nextImage(); }
    },
    prevImage () {
      this.index -= 2;
      this.index2 -= 2;
      if (this.index < 0) {
        // alert('첫화입니다. 이전화로 넘어갈래요??');
        // this.prevs();
        this.index += 2;
        this.index2 += 2;
        // alert('첫 화입니다!');
        this.lastAlert = true;
      }
      document.body.scrollTop = 0;
    },
    nextImage () {
      this.index += 2;
      this.index2 += 2;
      if (this.index2 > this.onImages.length) {
        this.nexts();
      }
      document.body.scrollTop = 0;
    },
    async loadImages () {
      try {
        let basePath = this.folder.path.split('/');
        const id = this.$route.params.id;
        const prev = Number(id) - 1;
        const next = Number(id) + 1;
        const length = String(prev).length;
        if (length === 1) {
          this.prev = '000' + prev;
          this.next = '000' + next;
        }
        if (length === 2) {
          this.prev = '00' + prev;
          this.next = '00' + next;
        }
        if (length === 3) {
          this.prev = '0' + prev;
          this.next = '0' + next;
        }
        //   this.prev = `/wtFolders/wtFiles/${prev}`;
        //   this.next = `/wtFolders/wtFiles/${next}`;

        basePath = basePath.splice(1);
        const images = await fsPromises.readdir(`${this.folder.path}/${this.$route.params.id}`);
        for (const image of images) {
          const src = `C:/Users/gksrl/Desktop/뷰/vue-player/${basePath.join('/')}/${this.$route.params.id}/${image}`;
          this.onImages.push(src);
        }

        //   const images = await fsPromises.readdir(`${this.folder.path}/${this.$route.params.id}`);
        //   console.log(images);
        //   for (const image of images) {
        //     const src = `${this.folder.path}/${this.$route.params.id}/${image}`;
        //     this.onImages.push(src);
        //     console.log(src);
        //   }
      } catch (err) {
        if (err) {
          console.log(err);
          // alert('해당 화는 존재하지 않습니다!');
          this.existAlert = true;
          // return this.prevs();
        }
      }
    },
    // https://github.com/vuejs/vue-router/issues/3013
    prevs () {
      return this.$router.replace({ name: 'WebtoonViewer', params: { id: this.prev } }).catch(err => console.log(err));
    },
    nexts () {
      return this.$router.replace({ name: 'WebtoonViewer', params: { id: this.next } }).catch(err => console.log(err));
    },
    backs () {
      return this.$router.push({ name: 'WebtoonImages' });
    }
  }
};
</script>

<style>

</style>
