<template>
  <v-app>
    <v-card>
      <v-card-title>
        Comments of &nbsp;
        <a :href="'https://bico.media/' + res">{{res}}</a>
      </v-card-title>
      <v-card-actions>
        <router-link :to="'/postComment/' + id">
          <v-btn flat>New Comment</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
    <v-container>
      <ul class="list-unstyled">
        <comment v-for="comment in comments" :comment="comment" :key="comment.txid" />
      </ul>
    </v-container>
  </v-app>
</template>

<script>
import { getChildrenOfTxid } from "@/util.js";
import Comment from "@/components/Comment.vue";

async function getComments(txid) {
  let comments = await getChildrenOfTxid(txid);
  return comments;
}

export default {
  props: ["id", "res"],
  data: () => {
    return {
      comments: []
    };
  },
  mounted() {
    getComments(this.id).then(comments => {
      this.comments = comments;
    });
  },
  methods: {},
  components: {
    Comment
  }
};
</script>

<style lang="scss" scoped>
.list-unstyled {
  list-style: none;
  padding-left: 0;
}
</style>