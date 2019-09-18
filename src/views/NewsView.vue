<template>
  <v-app>
    <router-link to="/postNews">
      <v-btn color="grey">submit news</v-btn>
    </router-link>
    <v-container v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular indeterminate :size="150" :width="8" teal></v-progress-circular>
      </div>
    </v-container>
    <v-container v-else grid-list-xl>
      <v-layout wrap>
        <ul v-for="(item, index) in wholeResponse" :key="index" mb-4>
          <li>
            <a :href="'https://bico.media/' + item.txid">
              <v-btn style="text-transform: none;" text>{{item}}</v-btn>
            </a>
          </li>
        </ul>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
const QUERY = {
  v: 3,
  q: {
    find: {
      "tx.h": "820697f4a1879ce0cde8b054a674d95ebd8288c785e6476b957457d9fc173837"
    },
    limit: 10,
    project: {
      "child.tx": 1
    }
  },
  r: {
    f: ".[] | .child"
  }
};

const api = "https://mom.planaria.network/q/";

async function getReturnData(txid) {
  let query = {
    v: 3,
    q: {
      find: {
        "tx.h": txid
      },
      project: {
        "out.s4": 1
      },
      limit: 10
    },
    r: {
      f: "[.[] | .out[1].s4]"
    }
  };
  let api =
    "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/";
  let str = JSON.stringify(query);
  let b64 = Buffer.from(str).toString("base64");
  let resp = await fetch(api + b64, {
    headers: { key: "1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt" }
  });
  let data = await resp.json();
  console.log(JSON.stringify(data));
  return data.u.concat(data.c)[0];
}

async function getUserData(txid) {
  let query = {
    v: 3,
    q: {
      find: {
        "tx.h": txid
      },
      project: {
        out: 1
      },
      limit: 10
    },
    r: {
      f: "[.[] | .out[0] | {type: .s2, p1: .s3, p2: .s4 }]"
    }
  };
  let api =
    "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/";
  let str = JSON.stringify(query);
  let b64 = Buffer.from(str).toString("base64");
  let resp = await fetch(api + b64, {
    headers: { key: "1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt" }
  });
  let data = await resp.json();
  let json = data.u.concat(data.c)[0];
  console.log(JSON.stringify(json));
  return json;
}

async function getMetanetData(query) {
  let str = JSON.stringify(query);
  let b64 = Buffer.from(str).toString("base64");
  let resp = await fetch(api + b64, {
    headers: { key: "1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt" }
  });
  let data = await resp.json();
  console.log(JSON.stringify(data));
  let rawStories = await Promise.all(
    data.metanet.map(x => {
      let txid = x.tx;
      return getReturnData(txid);
    })
  );
  let stories = await Promise.all(
    rawStories.map(async function(x) {
      let json = JSON.parse(x);
      let content = await getUserData(json.txid);
      return {
        uid: json.mb_uid,
        name: json.mb_username,
        title: content.p1,
        txid: content.p2
      };
    })
  );
  return stories;
}

export default {
  name: "NewsView",
  methods: {},
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
