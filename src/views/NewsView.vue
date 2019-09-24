<template>
  <v-app>
    <v-card>
      <router-link to="/postNews">
        <v-btn fixed dark fab right bottom color="pink" class="white--text">
          <v-icon>add</v-icon>
        </v-btn>
      </router-link>
      <v-container v-if="loading">
        <div class="text-xs-center">
          <v-progress-circular indeterminate :size="150" :width="8" blue lighten-1></v-progress-circular>
        </div>
      </v-container>
      <v-container v-else fluid grid-list-lg class="newsBoard">
        <v-layout row v-for="(item, index) in wholeResponse" :key="index">
          <v-flex xs12>
            <div>
              <div>
                <a :href="'https://bico.media/' + item.txid" class="headline">{{item.title}}</a>
              </div>
              <span>from: {{item.name}}(MB: {{item.uid}})</span>
              <router-link
                :to="'/comments/' + item.nodeName + '/' + item.txid + '/' + item.nodeTxid"
              >
                <p>comments</p>
              </router-link>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import { getChildrenOfTxid, getReturnData, getUserData } from "@/util.js";

const rootTxid =
  "820697f4a1879ce0cde8b054a674d95ebd8288c785e6476b957457d9fc173837";

async function getMetanetData() {
  let children = await getChildrenOfTxid(rootTxid);
  console.log(JSON.stringify(children));
  let rawStories = await Promise.all(
    children.map(txid => {
      return getReturnData(txid);
    })
  );
  let stories = await Promise.all(
    rawStories.map(async function(x) {
      if (x.metadata) {
        let metadata = JSON.parse(x.metadata);
        let content = await getUserData(metadata.txid);
        return {
          uid: metadata.mb_uid,
          name: metadata.mb_username,
          title: content.p1,
          txid: content.p2,
          nodeName: metadata.txid,
          nodeTxid: x.nodeTxid
        };
      } else {
        return false;
      }
    })
  );
  return stories.filter((x) => x);
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
    getMetanetData().then(data => {
      console.log(data);
      this.wholeResponse = data.reverse();
      this.loading = false;
    });
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

.headline {
  color: black;
}

.newsBoard {
  background-color: #fafafa;
}
</style>
