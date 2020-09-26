<template>
  <div id="USER_INPUT" class="login-form">

          <h1 id="project">WEBTOON DOWNLOADER</h1>
          <input id="titleId" ref="titleId" type="text" placeholder="TITLE ID" v-model="titleId">
          <input id="title" type="text" placeholder="TITLE" v-model="title">
          <input id="start" type="text" placeholder="PAGE FROM" v-model="from">
          <input id="to" type="text" placeholder="TO" v-model="to">
          <div id="btn_group">
              <button id="download" class="btn" @click="download">DOWNLOAD</button>
          </div>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="gray"
                dark
                v-bind="attrs"
                v-on="on"
              >
                SITES | {{ selectedSite }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="selectedSite = item.title"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- <div class="print_log">LOADING</div>
          <fieldset id="print_log"></fieldset> -->
  </div>
</template>

<script>
// Refused to set unsafe header "referer"
// import { crawler } from '../api/crawler.js';
// const { crawler } = require('../api/crawler.js');
// const { dialog } = window.require('electron').remote;

// renderer 프로세스(웹 페이지)안에서
// const DaumCrawler = require('../api/DaumCrawler.js');
// import { DaumCrawler } from '../api/DaumCrawler.js';
const { ipcRenderer } = window.require('electron');
export default {
  data () {
    return {
      titleId: '',
      from: '',
      to: '',
      title: '',
      items: [
        { title: 'NAVER' },
        { title: 'DAUM' }
      ],
      selectedSite: ''
    };
  },
  methods: {
    download () {
      console.log(this.selectedSite);
      this.from = Number(this.from);
      this.to = Number(this.to);
      if (this.selectedSite === 'NAVER') { console.log(ipcRenderer.sendSync('NaverCrawler', [this.titleId, this.title, this.from, this.to])); } // "pong"이 출력됩니다.
      if (this.selectedSite === 'DAUM') { console.log(ipcRenderer.sendSync('DaumCrawler', [this.titleId, this.title, this.from, this.to])); } // "pong"이 출력됩니다.
      //   console.log(111);
      //   DaumCrawler(this.titleId, this.title, this.from, this.to);
      // }
      this.titleId = '';
      this.from = '';
      this.to = '';
      this.title = '';
      this.$refs.titleId.focus();
    }
  }
};
</script>

<style scoped>
* {
  font-family: 'Jua', sans-serif;
  font-size:14px;
  box-sizing: border-box;
}

#project {
  font-size: 30px;
  margin: 0 auto;
  width: 500px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 15px;
  /* margin-left: 300px; */
}
fieldset {
  width: 500px;
  height: 200px;
  overflow: auto;
  padding: 10px;
  text-align: center;
}
legend {
  text-align: center;
  padding: 10px;
}
.login-form {
  margin:0 auto;
  width:500px;
}
input {
  margin-bottom:5px;
  padding:10px;
  width: 100%;
  border:1px solid #CCC
}
button {
  padding:10px
}
label {
  cursor:pointer
}
#form-switch {
  display:none
}
#player-form {
  display:none
}
#form-switch:checked~#player-form {
  display:block
}
#form-switch:checked~#login-form {
  display:none
}
.lyrics{
  width: 500px;
  height: 200px;
  text-align: center;
  padding: 10px;
}

.label {
  display: inline;
  font-size: 13.333px;
  border: 3px solid grey;
  background-color: rgba(0,0,0,0);
  color: grey;
  padding: 10px;
  border-radius: 5px;
  float: right;
}
.print_log{
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
  background: grey;
  padding: 10px;
  width: 500px;
}

.btn{
  border-radius: 5px;
  /* border-bottom-left-radius: 5px;  */
  margin-right:-4px;
  padding: 10px;
  float: right;
}
#btn_group button{
  border: 1px solid grey;
  background-color: rgba(0,0,0,0);
  color: grey; padding: 10px;
}

#btn_group button:hover{ color:white; background-color: grey; }

</style>
