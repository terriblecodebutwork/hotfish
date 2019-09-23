<template>
  <div>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>

          <v-flex xs12 sm6 md3>
            <v-text-field
              v-model="name"
              :rules="[rules.required, rules.counter]"
              counter
              @input="onNameChange"
              :maxlength="MaxTitle"
              label="name of your bitquery"
              placeholder="e.g. 10 latest transactions"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="url"
              @change="onApiEndpointChange"
              :rules="[rules.required, rules.isApiEndpoint]"
              label="API endpoint of your bitquery"
              placeholder="e.g. https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/ewogICJ2IjogMywKICAicSI6IHsKICAgICJmaW5kIjoge30sCiAgICAibGltaXQiOiAxMAogIH0KfQ=="
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-card color="teal lighten-3" class="white--text">
              <v-card-title primary-title>
                <div>
                  <pre>{{apiData.queryJson}}</pre>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <Poster v-if="!!name" label="POST" listen="postParams" />
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Poster from "@/components/Poster.vue";
import { Base64 } from "@/util.js";

const decodeApiEndpoint = str => {
  try {
    let words = str.split("/");
    let b64 = atob(words.pop());
    let queryJson = JSON.parse(b64);
    let node = words.pop();
    console.log(node);
    return {
      queryJson,
      node
    };
  } catch (error) {
    return false;
  }
};

const MaxTitle = 100;

const Slogan = "Think, share, and earn.";

export default {
  data: () => {
    return {
      MaxTitle: MaxTitle,
      name: "",
      url: "",
      apiData: { queryJson: Slogan },
      rules: {
        required: value => !!value || "Required.",
        counter: value =>
          value.length <= MaxTitle || `Max ${MaxTitle} characters`,
        isApiEndpoint: value =>
          !!decodeApiEndpoint(value) || "Not a valid bitquery API endoint url."
      }
    };
  },
  methods: {
    onApiEndpointChange: function() {
      let data = decodeApiEndpoint(this.url);
      this.apiData = data;
      let msgs = [this.name, Base64(JSON.stringify(this.apiData.queryJson))];
      this.$root.$emit("postParams", msgs);
    },
    onNameChange: function() {
      if (this.apiData.queryJson !== Slogan) {
        let msgs = [this.name, Base64(JSON.stringify(this.apiData.queryJson))];
        this.$root.$emit("postParams", msgs);
      }
    }
  },
  components: {
    Poster
  }
};
</script>
