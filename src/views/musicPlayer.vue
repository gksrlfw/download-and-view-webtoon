<template>
    <div>
        <div class="container">
            <div class="wrapper">
            <h1 id="music-title">{{ currentSong.title }}</h1>
            <img id="image-title" :src="songImage">
            <!-- <input id="range" class="level" type="range" :value="currentPlayer.currentTime" min="0" max="0"> -->
            <!-- <div class="time">{{currentMin}} : {{currentSec}}</div> -->
            <div id="btn_group" class="buttons">
                <!-- <button @click="pre" type="button"><img src=""></button>
                <button @click="play" type="button"><img id="play_img" src=""></button>
                <button @click="next" type="button"><img src=""></button> -->
                <button class="prev" @click="prev"><img src="../assets/playerImage/Pre.png"></button>
                <button class="play" v-if="!isPlaying" @click="play"><img src="../assets/playerImage/Play.png"></button>
                <button class="pause" v-else @click="pause"><img src="../assets/playerImage/Pause.png"></button>
                <button class="next" @click="next"><img src="../assets/playerImage/Next.png"></button>
            </div>
            <v-btn @click="readDir"><v-icon>mdi-folder</v-icon></v-btn>
            <v-btn @click="openLyrics"><v-icon>mdi-eye</v-icon></v-btn>
        </div>
        </div>
        <div class="list">
            <li v-for="song in songs" :key="song.src" @click="play(song)">
            {{ song.title }}
            </li>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { checkMeta } from '../api/controlMeta.js';

const { dialog } = window.require('electron').remote;
const fs = window.require('fs');
const path = window.require('path');
export default {
  data () {
    return {
      range: {},
      time: {},
      currentMin: '',
      currentSec: ''
    };
  },
  watch: {

  },
  computed: {
    ...mapGetters(['currentSong', 'currentIndex', 'currentPlayer', 'isPlaying', 'songs', 'songImage', 'dirPath'])
  },
  methods: {
    openLyrics () {
      // 가사 띄우기
    },
    // readSongs () {
    //   console.log(this.currentSong);
    //   if (!this.dirPath.length) return;
    //   const files = fs.readdirSync(this.dirPath);
    //   if (!files.length) return;
    //   const arraySong = [];
    //   for (const file of files) {
    //     // 음악 파일만 들어오게 하기
    //     const arr = file.split('.');
    //     if (arr[arr.length - 1] === 'mp3') {
    //       const filePath = path.join(this.dirPath, file);
    //       //   const fileState = fs.statSync(filePath);
    //       const song = {
    //         title: file,
    //         src: `${filePath}`
    //       };
    //       arraySong.push(song);
    //     }
    //     this.$store.commit('setSongs', arraySong);
    //   }
    // },
    readDir () {
      const readDirectory = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
      if (!readDirectory) return;
      this.$store.commit('setDirPath', readDirectory[0]);
      const files = fs.readdirSync(this.dirPath);
      if (!files.length) return;
      const arraySong = [];
      for (const file of files) {
        // 음악 파일만 들어오게 하기
        const arr = file.split('.');
        if (arr[arr.length - 1] === 'mp3') {
          const filePath = path.join(this.dirPath, file);
          //   const fileState = fs.statSync(filePath);
          const song = {
            title: file,
            src: `${filePath}`
          };
          arraySong.push(song);
        }
        this.$store.commit('setSongs', arraySong);
      }
    },
    play (song) {
      this.$store.commit('play', song);
      this.getImage(song);
      this.range = document.querySelector('#range');
      this.time = document.querySelector('.time');
      const title = this.currentSong.title.split('.')[0];
      this.$store.commit('setSongImage', `C:\\Users\\gksrl\\Desktop\\뷰\\vue-player\\src\\assets\\images\\${title}.jpg`);
      this.highlight(this.currentSong);

      // 노래 끝낫을 때 (그냥 this.play()를 부르면 뭔가 이상하게됨...)
      // this.currentPlayer.addEventListener('ended', () => {
      //   this.pause();
      //   this.$store.commit('setCurrentIndex', this.currentIndex + 1);
      //   if (this.currentIndex > this.songs.length - 1) {
      //     this.currentIndex = 0;
      //   }
      //   this.$store.commit('setCurrentSong', this.songs[this.currentIndex]);
      //   this.play(this.currentSong);
      //   // const title = this.currentSong.title.split('.')[0];
      //   // this.$store.commit('setSongImage', `C:\\Users\\gksrl\\Desktop\\뷰\\vue-player\\src\\assets\\images\\${title}.jpg`);
      //   // // this.$store.commit('setCurrentPlayer', this.currentSong);
      //   // this.highlight(this.currentSong);
      //   // this.currentPlayer.play();
      //   // this.$store.commit('setIsPlaying', true);
      //   // setTimeout(() => {
      //   //   this.range.max = this.currentSong.duration;
      //   // }, 1000);
      // });

      // this.currentPlayer.addEventListener('timeupdate', () => {
      //   // range 설정 > range.value가 바껴도 화면에 적용이 안됨.. >> {{}}이걸로 하니까 되네..
      //   // console.log(this.range.value);
      //   // this.range.value = this.currentPlayer.currentTime;
      //   if (this.currentPlayer.duration !== 'undefined' || this.currentPlayer.duration !== 'NaN' || this.currentPlayer.duration !== '0' ||
      //   this.range.max === 'undefined' || this.range.max === 'NaN' || this.range.max === '0' || Number(this.range.max) > 0) this.range.max = this.currentPlayer.duration;
      //   // this.range.max = this.currentPlayer.duration;
      //   // console.log(this.range.max, this.currentPlayer.duration, this.currentPlayer.currentTime);
      //   this.currentTime = Math.floor(this.currentPlayer.currentTime);
      //   this.currentMin = Math.floor(this.currentTime / 60);
      //   this.currentSec = this.currentTime % 60;
      //   // this.time.innerText = `${currentMin} : ${currentSec}`;       왜 textContent, inner 이걸로하면 화면에 안보이지??
      //   // console.log(this.time.textContent, this.time.innerText);
      // });
      // this.range.addEventListener('change', () => {
      //   console.log(this.range.value);
      //   this.currentPlayer.currentTime = this.range.value;
      // });
    },
    pause () {
      this.$store.commit('pause');
    },
    next () {
      this.$store.commit('next');
      this.play(this.currentSong);
    },
    prev () {
      this.$store.commit('prev');
      this.play(this.currentSong);
    },
    async getImage (song) {
      // 이거 비동기 처리 어떻게 해야되니??...
      return await checkMeta(song.src); // return artist
    },
    // 실행중인 노래에 색칠해준다
    highlight (song) {
      console.log(222, song);
      if (typeof song === 'undefined') song = this.currentSong;
      console.log(song.title);
      const title = `${song.title}`;
      const allLists = document.querySelectorAll('.list li'); // TODO : 얘는 왜 페이지가 바뀌고나면 선택이 안되니??
      // console.log(allLists);
      allLists.forEach((el, i) => {
        if (el.innerText === title) {
          el.style.backgroundColor = 'yellow';
          return;
        }
        if (el.style.backgroundColor) el.removeAttribute('style');
      });
    }
  },
  created () {
    this.$store.commit('createdPlayer');
    // this.readSongs();
    this.highlight(this.currentSong);
  },
  destroyed () {
    this.song = this.currentSong;
    console.log('distroyed');
  }
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Nunito+Sans&display=swap');
*{
    margin: 0;
    padding: 0;
    outline: 0;
}
body{
    background-color: #E1E6EC;
}
.container{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 6px;
    width: 300px;
    border-radius: 8px;
    background-color: #E1E6EC;
    box-shadow: 5px 5px 11px #A2B1C6 , -5px -5px 11px  #fff  ;
    text-align: center;
    font-family: 'Nunito', sans-serif;

}
.wrapper{
    position: relative;
}
.container img{
    width: 80%;

}
.container h1{
    font-size: 1.5rem;
    margin: 12px 0 12px 0;
}
.buttons{
    display: inline-block;
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
}
.buttons button{
    position: relative;
    width: 50px;
    height: 50px;
    padding: 16px;
    border-radius: 90px;
    background-color: #E1E6EC;
    text-align: left;
    margin: 10px 9px;
    border: none;
    box-shadow: 2px 2px 5px #A2B1C6 , -2px -2px 11px  #fff  ;
    /*background:linear-gradient(-45deg,#a2b1c6,#fff);*/
}
.buttons button:active{
    background: #E1E6EC;
    box-shadow: inset 2px 2px 5px #A2B1C6 , -2px -2px 11px  #fff  ;
}
.buttons button img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 42%;
    height: 42%;
}

.level{
    width: 80%;
    -webkit-appearance: none;
    appearance: none;
    background: #E1E6EC;
    box-shadow: 2px 2px 5px #A2B1C6 , -2px -2px 11px  #fff  ;
    border-radius: 50px;
    margin: 12px 0;
    padding: 3px;
}
.level::-webkit-slider-thumb{
    -webkit-appearance: none;
    background-color: #A2B1C6;
    box-shadow: 2px 2px 5px #A2B1C6 , -2px -2px 5px  #fff  ;
    width: 15px; /* Set a specific slider handle width */
    height: 15px; /* Slider handle height */
    border-radius: 90px;
}
.level::-moz-range-thumb{
    width: 50px;
    height: 50px;
}

#image-title {
    width: 230.79px;
    height: 230.79px;
}

.list {
    padding: 10px;
    margin-top: auto;
}
</style>
