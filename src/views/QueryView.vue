<template>
  <v-app>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 align-center="true">
            <v-card color="teal lighten-3" class="white--text">
              <h2>{{title}}</h2>
              <v-card-title primary-title>
                <div>
                  <pre>{{json_query}}</pre>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <div>
            <strong>run query at planaria nodes:</strong>
            <ul>
              <li>
                <a
                  :href="'https://genesis.bitdb.network/query/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/' + query"
                >Genesis</a>
              </li>
            </ul>
          </div>
        </v-layout>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => {
    return {
      json_query: ""
    };
  },
  mounted() {
    this.json_query = JSON.parse(atob(this.query));
  },
  props: ["title", "query"]
};
</script>
