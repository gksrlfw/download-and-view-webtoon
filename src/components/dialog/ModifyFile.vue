<template>
  <v-container fluid>
    <v-card v-if="selectedItem">
          <v-card-title>
            Modify
            <v-spacer></v-spacer>
            <!-- <v-btn icon @click="closeModifyDialog"><v-icon>mdi-close</v-icon></v-btn> -->
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="selectedItem.name" label="File name"></v-text-field>
            <v-combobox v-model="curTags" multiple chips chache-items></v-combobox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="black" @click="saveFile">SAVE</v-btn>
            <v-btn text color="error" @click="deleteFile">BACK</v-btn>
          </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>
// const moment = require('moment');
// const path = require('path');
// const fs = require('fs');
export default {

  props: {
    selectedItem: Object,
    modifyDialog: Boolean,
    saveFile: Function,
    deleteFile: Function
  },
  watch: {
    curTag (o, n) {
      if (o !== n) {
        this.$emit('changedCurTags', this.curTags);
      }
    }
  },
  mounted () {
    console.log(this.selectedItem, this.selectedItem.tags);
  },
  data () {
    return {
      check: this.modifyDialog,
      curTags: []
    };
  },
  methods: {
    closeModifyDialog () {
      this.check = false;
      this.$emit('closeModifyDialog', this.check);
    }
  }
};
</script>
