<template>
  <div>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="comment"
              @input="onContentChange"
              :rules="[rules.required,  rules.commentCounter]"
              label="comment"
              placeholder
            ></v-text-field>
          </v-flex>

          <MoneyButton
            v-bind:label="label"
            successMessage="success"
            :outputs="outputs"
            clientIdentifier="13519b817dfc620b9c630e901dd1d931"
          />
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import MoneyButton from "vue-money-button";
import { Satoshi } from "@/util.js";

const MaxContent = 1000;

const FEE = {
  amount: Satoshi(10000),
  currency: "BSV",
  to: "1Z2c8YiWRXGFj3zUWapfsEEJj1Qi482jZ"
};

const buildOutputs = data => {
  console.log(data)
  let hexData = data.map(x => Buffer.from(x).toString("hex"));
  hexData.unshift(Buffer.from("MetaNetBsvNewsCo").toString("hex"));
  hexData.unshift("0 OP_RETURN");

  console.log(hexData);
  return [
    {
      amount: 0,
      currency: "BSV",
      type: "SCRIPT",
      script: hexData.join(" ")
    },
    FEE
  ];
};

export default {
  props: ["id"],
  data: () => {
    return {
      label: "comment",
      MaxContent: MaxContent,
      comment: "",
      rules: {
        required: value => !!value || "Required.",
        commentCounter: value =>
          value.length <= 256 || `${value.length - 256} too long`
      },
      outputs: [FEE]
    };
  },
  methods: {
    onContentChange: function() {
      let data = [this.id, this.comment];
      this.outputs = buildOutputs(data);
    }
  },
  components: {
    MoneyButton
  }
};
</script>
