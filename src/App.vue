<template>
  <v-app>
    <v-toolbar color="teal lighten-3" dark>
      <v-toolbar-title>
        <router-link class="white" to="/">
          <h1>bitquery.space</h1>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <router-link to="/news">
        <v-btn color="blue lighten-1">BSV NEWS</v-btn>
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

<style>
.white {
  color: white;
}
a {
  text-decoration: none;
}

pre {
  font-size: larger;
  font-weight: bolder;
}
</style>