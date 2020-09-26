<template>
    <v-toolbar>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-card color="transparent" flat width="200" class="mr-4">
              <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
                clearable
              />
            </v-card>
            <v-card color="transparent" flat width="200">
              <v-combobox
                flat
                multiple
                chips
                solo-inverted
                hide-details
                clearable
                cache-items
              >
              </v-combobox>
            </v-card> -->
            <v-btn icon @click="load"><v-icon>mdi-folder-plus</v-icon></v-btn>
            <slot name="back"></slot>
            <!-- <v-btn icon @click="readFile()"><v-icon>mdi-file-plus</v-icon></v-btn>
            <v-btn icon @click="fetch()"><v-icon>mdi-refresh</v-icon></v-btn> -->
          </v-toolbar>
</template>

<script>
export default {
  props: {
    title: String,
    load: Function
  }
};
</script>

<style>

</style>
