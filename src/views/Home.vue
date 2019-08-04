<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" teal></v-progress-circular>
    </div>
  </v-container>
  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <ul v-for="(item, index) in wholeResponse" :key="index" mb-4>
        <li>
          <v-btn
            style="text-transform: none;"
            @click="viewContent(item.title, item.query, item.from)"
            text
          >{{item.title}}</v-btn>
        </li>
      </ul>
    </v-layout>
  </v-container>
</template>

<script>
const QUERY = {
  v: 3,
  q: {
    find: {
      $or: [
        { "out.s1": "1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt" },
        { "out.s2": "1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt" }
      ],
      "out.e.a": "1HWbpbCZHTBJmZxjFAmfHqgNjbEePkMqTW"
    },
    limit: 100,
    project: {
      "tx.h": 1,
      out: 1,
      in: 1
    }
  },
  r: {
    f:
      '[.[] | if .out[0].s1=="1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt" then {title: .out[0].s2, query: (.out[0].s3 + .out[0].ls3), from: .in[0].e.a} else {title: .out[0].s3, query: (.out[0].s4 + .out[0].ls4), from: .in[0].e.a} end]'
  }
};

const api =
  "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/";

async function getMetanetData(query) {
  let str = JSON.stringify(query);
  let b64 = Buffer.from(str).toString("base64");
  let resp = await fetch(api + b64, {
    headers: { key: "1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt" }
  });
  let data = await resp.json();
  return data.u.concat(data.c);
}

export default {
  methods: {
    b64ToJSONString(b) {
      return JSON.parse(atob(b));
    },
    viewContent(title, query, from) {
      console.log(title);
      console.log(query);
      this.$router.push(
        "/q/" + encodeURIComponent(title) + "/" + query + "/" + from
      );
    }
  },
  data() {
    return {
      wholeResponse: [],
      loading: true
    };
  },
  mounted() {
    getMetanetData(QUERY)
      .then(data => {
        console.log(data);
        this.wholeResponse = data;
        this.loading = false;
      })
      .catch(err => console.log(err));
  }
};
</script>
<style lang="scss" scoped>
.v-progress-circular {
  margin: 1rem;
  color: #7fcbc4;
}

pre {
  z-index: -1;
}

.card {
  padding: 1em;
}
</style>
