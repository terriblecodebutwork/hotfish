<template>
  <li v-if="comment">
    <p v-if="metadata" class="txt-grey">
      <b>{{metadata.mb_username}}</b>
      {{metadata.mb_uid}}
      <a @click="toggle" class="toggle">{{open ? '[-]' : `[+${children}]`}}</a>
    </p>

    <div v-show="open">
      <div v-html="content" class="content"></div>
      <router-link :to="'/postComment/' + metadata.txid">
        <p>reply</p>
      </router-link>
      <ul class="list-unstyled child-padding">
        <comment v-for="c in comments" :comment="c" :key="c" />
      </ul>
    </div>
  </li>
</template>

<script>
import { getChildrenOfTxid, getUserData, getReturnData } from "@/util.js";

export default {
  name: "comment",
  props: {
    comment: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      open: true,
      comments: [],
      content: "loading..",
      metadata: "loading.."
    };
  },
  computed: {
    children() {
      return this.comments.length ? this.comments.length : "";
    }
  },
  mounted() {
    getChildrenOfTxid(this.comment)
      .then(comments => {
        this.comments = comments;
      })
      .then(() => {
        getReturnData(this.comment)
          .then(metadata => {
            this.metadata = JSON.parse(metadata.metadata);
          })
          .then(() => {
            getUserData(this.metadata.txid).then(content => {
              this.content = content.p2;
            });
          });
      });
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  }
};
</script>

<style>
.content {
  border-bottom: 1px solid #eee;
  overflow-wrap: break-word;
}
.content pre {
  white-space: pre-wrap;
}
.child-padding {
  padding-left: 15px;
}
.toggle {
  color: inherit;
  padding-left: 5px;
}
</style>