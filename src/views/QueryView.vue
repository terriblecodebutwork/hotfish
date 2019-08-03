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
                <a target="_blank"
                  :href="'https://genesis.bitdb.network/query/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/' + b64query"
                >Genesis</a>
              </li>
            </ul>
          </div>
        </v-layout>
      </v-container>
      <div class="tip">
        <MoneyButton v-bind:label="label" successMessage="success" :outputs="outputs" />
        <br/>
        <small>20,000 satoshis to the poster, and {{ Fee }} satoshis to bitquery.space dev</small>
      </div>
    </v-card>
  </v-app>
</template>

<script>
import MoneyButton from "vue-money-button";
import { Fee, Satoshi, FeeToDev } from "@/util.js";

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
    this.json_query = JSON.parse(atob(this.query));
    this.b64query = btoa(JSON.stringify(this.json_query, null, 2));
  },
  props: ["title", "query", "from"],
  components: {
    MoneyButton
  }
};
</script>

<style scoped>
.tip {
  align-content: center;
  text-align: center;
}
</style>
