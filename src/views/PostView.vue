<template>
  <div>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="url"
              @change="onApiEndpointChange"
              :rules="[rules.required, rules.isApiEndpoint]"
              label="API endpoint of your bitquery"
              placeholder="https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/ewogICJ2IjogMywKICAicSI6IHsKICAgICJmaW5kIjoge30sCiAgICAibGltaXQiOiAxMAogIH0KfQ=="
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md3>
            <v-text-field
              v-model="name"
              :rules="[rules.required, rules.counter]"
              counter
              @input="onNameChange"
              maxlength="40"
              label="name of your bitquery"
              placeholder="WeatherSV"
            ></v-text-field>
          </v-flex>

          <!-- <v-flex xs12 sm6 md3>
            <v-text-field
              v-model="author"
              :rules="[rules.required]"
              counter
              maxlength="20"
              label="who are you"
              placeholder="Simona"
            ></v-text-field>
          </v-flex>-->

          <v-flex xs12>
            <v-card color="teal lighten-3" class="white--text">
              <v-card-title primary-title>
                <div>
                  <pre>{{apiData.queryJson}}</pre>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <Poster
            v-if="!!name"
            label="POST"
            listen="postParams"
            paySatoshi="5000"
          />
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Poster from "@/components/Poster.vue";

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

export default {
  data: () => {
    return {
      name: "",
      url: "",
      apiData: { queryJson: "Think, share, and earn." },
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length <= 40 || "Max 40 characters",
        isApiEndpoint: value =>
          !!decodeApiEndpoint(value) || "Not a valid bitquery API endoint url."
      }
    };
  },
  methods: {
    onApiEndpointChange: function() {
      let data = decodeApiEndpoint(this.url);
      this.apiData = data;
      this.$root.$emit("postParams", {
        apiData: this.apiData,
        name: this.name
      });
    },
    onNameChange: function() {
      this.$root.$emit("postParams", {
        apiData: this.apiData,
        name: this.name
      });
    }
  },
  components: {
    Poster
  }
};
</script>
