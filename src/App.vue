<template>
  <v-app>
    <v-toolbar color="teal lighten-3" dark>
      <v-toolbar-title>
        <router-link class="white" to="/">
          <h1>bitquery.space</h1>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <router-link to="/meta/66094e053724980819aa2e1010549a7161c33394c8f86b5e03b979c5b3856297">
        <v-btn color="grey darken-3">META</v-btn>
      </router-link>
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