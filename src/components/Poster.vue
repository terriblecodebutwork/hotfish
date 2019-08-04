<template>
  <div>
    <!-- <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <br />
    <textarea v-model="message" placeholder="add multiple lines" @input="onTextChange"></textarea>-->
    <MoneyButton v-bind:label="label" successMessage="success" :outputs="outputs" />
    <small>{{Fee}} satoshis to bitquery.space dev</small>
  </div>
</template>

<script>
import MoneyButton from "vue-money-button";
import { Fee, Satoshi, FeeToDev } from "@/util.js";

const buildOutputs = msgs => {
  let msgs2 = msgs.map(x => Buffer.from(x).toString("hex"));
  msgs2.unshift(
    Buffer.from("1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt").toString("hex")
  );
  msgs2.unshift("0 OP_RETURN");
  // msgs2.unshift("OP_RETURN");
  console.log(msgs2);
  return [
    {
      amount: 0,
      currency: "BSV",
      type: "SCRIPT",
      script: msgs2.join(" ")
    },
    FeeToDev
  ];
};

export default {
  props: ["listen", "label"],
  data: function() {
    return {
      Fee: Fee,
      outputs: [
        {
          amount: Satoshi(1000),
          currency: "BSV",
          to: "1HWbpbCZHTBJmZxjFAmfHqgNjbEePkMqTW"
        }
      ]
    };
  },
  created() {
    this.$root.$on(this.listen, msgs => {
      console.log(msgs);
      this.outputs = buildOutputs(msgs);
    });
  },
  methods: {
    // onTextChange: function() {
    //   this.outputs = Outputs(this.message);
    // }
  },
  components: {
    MoneyButton
  }
};
</script>
