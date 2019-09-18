<template>
  <div>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="title"
              @input="onContentChange"
              :rules="[rules.required,  rules.titleCounter]"
              label="title"
              placeholder
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="txid"
              @input="onContentChange"
              :rules="[rules.required,  rules.txidCounter]"
              label="txid"
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
  let hexData = data.map(x => Buffer.from(x).toString("hex"));
  hexData.unshift(Buffer.from("MetaNetBsvNewsV1").toString("hex"));
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
  props: ["address"],
  data: () => {
    return {
      label: "submit",
      MaxContent: MaxContent,
      title: "",
      txid: "",
      rules: {
        required: value => !!value || "Required.",
        txidCounter: value => value.length == 64 || `please enter a valid txid`,
        titleCounter: value =>
          value.length <= 80 || `${value.length - 80} too long`
      },
      outputs: [FEE]
    };
  },
  methods: {
    onContentChange: function() {
      let data = [this.title, this.txid];
      this.outputs = buildOutputs(data);
    }
  },
  components: {
    MoneyButton
  }
};
</script>
