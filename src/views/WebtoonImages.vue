<template>
    <v-container>
        <v-card>
            <card-header :load="loadFiles" :title="folder.name">
                <!-- <template slot="back"><router-link to="/wtFolders">GO-BACK</router-link></template> -->
                <template slot="back"><router-link to="/wtFolders"><v-icon>mdi-backspace-reverse-outline</v-icon></router-link></template>
            </card-header>
            <!-- 데이터 테이블 -->
            <v-data-table :headers="headers" :items="files" must-sort item-key="_id">
                <template v-slot:[`item.name`]="{ item }">
                <router-link :to="'/wtFolders/wtFiles/'+item.name">{{ item.name }} </router-link>
                </template>
                <!-- 생성일자 -->
                <template v-slot:[`item.time`]="{ item }">
                    {{ new Date(item.time).toLocaleDateString() }}
                </template>
                 <!-- modify -->
                <template v-slot:[`item._id`]="{ item }">
                  <v-btn icon @click="openModifyDialog(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                </template>
                <template v-slot:[`item.tags`]="{ item }">
                    <v-chip
                      small
                      class="ma-1"
                      color="info"
                      close
                      v-for="(tag, i) in item.tags" :key="i" @click:close="deleteTags(item, tag)"
                      >{{tag}}</v-chip>
                </template>
            </v-data-table>

             <!-- 수정 다이얼로그 : 따로 빼니까 조금 이상하게 동작함.. 왠지는 모르것네.. -->
            <!-- <v-dialog v-model="modifyDialog" width="340">
              <modify-file :curTags="curTags" :selectedItem="selectedItem" :modifyDialog="modifyDialog" :saveFile="saveFile" :deleteFile="deleteFile"
                          @closeModifyDialog="closeModifyDialog" @changedCurTag="changedCurTag"></modify-file>
            </v-dialog> -->
        </v-card>
      <v-dialog v-model="modifyDialog" width="340">
        <v-card v-if="selectedItem">
              <v-card-title>
                Modify
                <v-spacer></v-spacer>
                <v-btn icon @click="deleteFile"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="selectedItem.name" label="File name"></v-text-field>
                <!-- <v-combobox v-model="selectedItem.tags" multiple chips chache-items></v-combobox> -->
                <v-combobox v-model="curTags2" multiple chips chache-items></v-combobox>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="saveFile">SAVE</v-btn>
                <v-btn text color="error" @click="deleteFile">BACK</v-btn>
              </v-card-actions>
            </v-card>
      </v-dialog>
    </v-container>
</template>

<script>
import CardHeader from '../components/CardHeader.vue';
// import ModifyFile from '@/components/dialog/ModifyFile.vue';

import { mapGetters } from 'vuex';
const fsPromises = window.require('fs').promises;
export default {
  mounted () {
    console.log('mounted');
    this.loadFiles();
  },
  components: {
    CardHeader
    // ModifyFile
  },
  computed: {
    ...mapGetters(['folder'])
  },
  data () {
    return {
      files: [],
      headers: [
        { value: 'name', text: 'NAME' },
        { value: 'time', text: 'CREATED AT' },
        { value: 'tags', text: 'TAGS' },
        { value: '_id', text: 'MODIFY' }
      ],
      modifyDialog: false,
      selectedItem: '',
      curTags: '',
      curTags2: ''
    };
  },
  watch: {
    curTags2 (o, n) {
      if (o !== n) {
        this.curTags = this.curTags2;
      }
    },
    curTags (o, n) {
      if (o !== n) {
        console.log(this.curTags);
        localStorage.setItem(`${this.folder.name}${this.selectedItem.name}`, this.curTags);
        for (const file of this.files) {
          if (file.name === this.selectedItem.name) {
            file.tags = this.curTags;
            break;
          }
        }
        this.loadFiles();
      }
    }
  },
  methods: {
    deleteTags (item, delTag) {
      const tags = localStorage.getItem(`${this.folder.name}${item.name}`).split(',');
      tags.forEach((tag, i) => {
        if (tag === delTag) { tags.splice(i, 1); }
      });
      localStorage.setItem(`${this.folder.name}${item.name}`, tags);
      this.loadFiles();
    },
    changedCurTag (curTags) {
      this.curTags = curTags;
    },
    saveFile () {
      this.curTags = this.curTags2;
      this.modifyDialog = false;
      console.log('done saveFile');
    },
    deleteFile () {
      this.modifyDialog = false;
    },
    closeModifyDialog (check) {
      this.modifyDialog = check;
    },
    openModifyDialog (item) {
      this.curTags2 = item.tags;
      this.selectedItem = item;
      this.modifyDialog = true;
    },
    async loadFiles () {
      this.files = []; // 이게 없으면 this.files에 계속 푸쉬되어서 크기가 늘어나게된다
      const files = await fsPromises.readdir(this.folder.path);
      for (const file of files) {
        let tags = localStorage.getItem(`${this.folder.name}${file}`);
        if (tags !== null && tags.length) {
          tags = tags.split(',');
        }
        const fileState = await fsPromises.stat(`${this.folder.path}/${file}`);
        const item = {
          name: file,
          path: `${this.folder.path}/file`,
          time: fileState.mtimeMs,
          tags: tags
        };
        this.files.push(item);
      }
      console.log('loadFile');
    }
  }
};
</script>

<style>
a {  text-decoration: none;}
</style>
