<template>
  <v-app>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 align-center="true">
            <v-card color="teal lighten-3" class="white--text">
              <h2>{{title}}</h2>
            </v-card>
            <prism-editor readonly :code="json_query" language="js"></prism-editor>
          </v-flex>
          <div>
            <strong>run query at planaria nodes:</strong>
            <ul>
              <li>
                <a
                  target="_blank"
                  :href="'https://genesis.bitdb.network/query/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/' + b64query"
                ><v-btn>Genesis</v-btn></a>
              </li>
              <li>
                <a
                  target="_blank"
                  :href="'https://bob.planaria.network/query/1GgmC7Cg782YtQ6R9QkM58voyWeQJmJJzG/' + b64query"
                ><v-btn>Bob</v-btn></a>
              </li>
            </ul>
          </div>
        </v-layout>
      </v-container>
      <div class="tip">
        <MoneyButton v-bind:label="label" successMessage="success" :outputs="outputs" />
        <br />
        <small>20,000 satoshis to the poster, and {{ Fee }} satoshis to bitquery.space dev</small>
      </div>
    </v-card>
  </v-app>
</template>

<script>
import MoneyButton from "vue-money-button";
import { Fee, Satoshi, FeeToDev } from "@/util.js";
import PrismEditor from "vue-prism-editor";

export default {
  data: () => {
    return {
      Fee: Fee,
      label: "tip",
      outputs: [FeeToDev],
      json_query: "",
      b64query: ""
    };
  },
  mounted() {
    console.log(FeeToDev);
    this.outputs = [
      {
        amount: Satoshi(20000),
        currency: "BSV",
        to: this.from
      },
      FeeToDev
    ];
    console.log(this.outputs);
    this.json_query = JSON.stringify(JSON.parse(atob(this.query)), null, 2);
    this.b64query = btoa(this.json_query);
  },
  props: ["title", "query", "from"],
  components: {
    MoneyButton,
    PrismEditor
  }
};
</script>

<style scoped>
.tip {
  align-content: center;
  text-align: center;
}
</style>
