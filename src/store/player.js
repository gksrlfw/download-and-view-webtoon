import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  getters: {
    currentSong (state) {
      return state.currentSong;
    },
    currentIndex (state) {
      return state.currentIndex;
    },
    currentPlayer (state) {
      return state.currentPlayer;
    },
    isPlaying (state) {
      return state.isPlaying;
    },
    songs (state) {
      return state.songs;
    },
    songImage (state) {
      return state.songImage;
    },
    range (state) {
      return state.range;
    },
    time (state) {
      return state.time;
    },
    dirPath (state) {
      return state.dirPath;
    }
  },
  state: {
    songImage: 'https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg',
    currentSong: {},
    currentIndex: 0,
    currentPlayer: new Audio(),
    currentTime: 0,
    isPlaying: false,
    songs: [],
    time: {},
    range: {},
    dirPath: ''
  },
  mutations: {
    createdPlayer (state, info) {
      if (state.currentSong) return; // currentSong이 있으면 현재 실행되고 있는 노래가 있다는 말임. 다시 설정하지 않는다
      state.currentSong = state.songs[state.currentIndex];
      state.currentPlayer.src = state.currentSong.src;
      state.range = info[0];
      state.time = info[1];
      // if (state.songs) state.currentPlayer.play();
    },
    setCurrentIndex (state, index) {
      state.currentIndex = index;
    },
    setIsPlaying (state, is) {
      state.isPlaying = is;
    },
    setSongImage (state, image) {
      state.songImage = image;
    },
    setSongs (state, songs) {
      state.songs = songs;
      console.log(state.songs[0].src);
      state.currentIndex = 0;
      state.currentSong = state.songs[state.currentIndex];
      state.currentPlayer.src = state.currentSong.src;
      state.songs.forEach((song) => {
        song.currnetTime = 0;
      });
    },
    setCurrentSong (state, song) {
      state.currentSong = song;
      state.currentPlayer.src = state.currentSong.src;
    },
    setCurrentPlayerSrc (state, src) {
      state.currentPlayer.src = src;
    },
    setDirPath (state, dirPath) {
      state.dirPath = dirPath;
    },
    play (state, song) {
      if (typeof song.src !== 'undefined') {
        state.currentSong = song;
        state.currentPlayer.src = state.currentSong.src;
      }
      // index 재설정
      state.songs.forEach((song, i) => {
        if (song.title === state.currentSong.title) state.currentIndex = i;
      });
      console.log(state.currentIndex, state.currentPlayer, state.currentSong);
      state.currentTime = 0;
      state.currentPlayer.play();
      state.isPlaying = true;
      // 노래 끝낫을 때
      state.currentPlayer.addEventListener('ended', function () {
        state.isPlaying = false;
        state.currentIndex++;
        if (state.currentIndex > state.songs.length - 1) {
          state.currentIndex = 0;
        }
        state.currentSong = state.songs[state.currentIndex];
        state.currentPlayer.src = state.currentSong.src;
        state.currentTime = 0;
        state.currentPlayer.play();
        state.isPlaying = true;
        // this.play(state, state.currentSong);
      });
      state.isPlaying = true;

      // // range 설정
      // state.currentPlayer.addEventListener('timeupdate', () => {
      //   state.range.value = state.currentPlayer.currentTime;
      //   state.currentTime = Math.floor(state.currentPlayer.currentTime);
      //   const currentMin = Math.floor(state.currentTime / 60);
      //   const currentSec = state.currentTime % 60;
      //   state.time.textContent = `${currentMin} : ${currentSec}`;
      // });
      // // console.log(state.range);
      // // state.range.addEventListener('change', () => {
      // //   state.currentPlayer.currentTime = state.range.value;
      // // });
    },
    pause (state) {
      state.currentPlayer.pause();
      state.isPlaying = false;
    },
    next (state) {
      state.currentIndex++;
      if (state.currentIndex > state.songs.length - 1) {
        state.currentIndex = 0;
      }
      state.currentSong = state.songs[state.currentIndex];
      // this.play(state.currentSong);    같은 mutations안에 있는 함수 어떻게 실행시킬까??
    },
    prev (state) {
      state.currentIndex--;
      if (state.currentIndex < 0) {
        state.currentIndex = state.songs.length - 1;
      }
      state.currentSong = state.songs[state.currentIndex];
      // this.play(state.currentSong);
    }
  },
  actions: {

  },
  modules: {
  }
};
