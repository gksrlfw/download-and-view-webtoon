<template>
    <v-container>
        <v-card>
          <card-header :load="loadFolders" title="SELECT WEBTOON"></card-header>
          <!-- 데이터 테이블 -->
          <v-data-table :headers="headers" :items="dirs" must-sort item-key="_id">
            <!-- 클릭이 안되네.. -->
            <template v-slot:[`item.name`]="{ item }" @click="setItem(item)">
              <router-link to="./wtFolders/wtFiles" :item="item" >{{ item.name }} </router-link>
            </template>
               <!-- 생성일자 -->
              <template v-slot:[`item.time`]="{ item }">
                {{ new Date(item.time).toLocaleDateString() }}
              </template>
              <!-- 수정일자 -->
              <template v-slot:[`item.create`]="{ item }">
                <v-btn @click="setItem(item)">웹툰을 보려면 요걸 누르세염!</v-btn>
              </template>
          </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import CardHeader from '../components/CardHeader.vue';
const fsPromises = window.require('fs').promises;
export default {
  components: {
    CardHeader
  },
  created () {
    this.loadFolders();
  },
  data () {
    return {
      dirs: [],
      files: [],
      headers: [
        { value: 'name', text: 'NAME' },
        { value: 'time', text: 'CREATED AT' },
        { value: 'create', text: 'CREATE FOLDER' }
        // { value: 'category', text: 'CATEGORY' }
        // { value: '_id', text: 'modify' }
      ]
    };
  },
  methods: {
    async loadFolders () {
      const basePath = './src/assets/wtImages';
      const folders = await fsPromises.readdir(basePath);
      for (const folder of folders) {
        const filePath = `${basePath}/${folder}`;
        const fileState = await fsPromises.stat(filePath);
        // const dir = await fsPromises.readdir(filePath);

        const item = {
          name: folder,
          path: filePath,
          time: fileState.mtimeMs
          // size: fileState.size,
          // tags: []
        };
        this.dirs.push(item);
      }
    },

    setItem (item) {
      this.$store.commit('SET_ITEM', item);
    }
  }
};
</script>

<style>

</style>
