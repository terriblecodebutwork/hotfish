<template>
  <v-app>
    <v-toolbar color="teal lighten-3" dark>
      <v-toolbar-title>
        <router-link class="white" to="/">
          <h1>bitquery.space</h1>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <router-link to="/post">
        <v-btn color="grey darken-3">POST</v-btn>
      </router-link>
    </v-toolbar>

    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style scoped>
.white {
  color: white;
}
a {
  text-decoration: none;
}
</style>