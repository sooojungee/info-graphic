<template>
  <v-app>
    <!-- <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat
             href="https://github.com/vuetifyjs/vuetify/releases/latest"
             target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar> -->

    <div class="content-view">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script src="./app.ts"/>
<style lang="scss">
.content-view {
  width: 100%;
  min-height: 100vh;
  background: #ccc;
  // overflow-y: ;
}
</style>