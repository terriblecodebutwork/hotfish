<template>
  <div>
    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <br />
    <textarea v-model="message" placeholder="add multiple lines" @input="onTextChange"></textarea>
    <MoneyButton label="" v-bind:outputs="outputs" />
  </div>
</template>

<script>
import MoneyButton from "vue-money-button";

const Satoshi = x => {
  return x / 100000000;
};

const Base64 = x => {
  return Buffer.from(x).toString("hex");
};

const Outputs = msg => {
  return [
    {
      amount: 0,
      currency: "BSV",
      type: "Script",
      script: "OP_RETURN " + Base64(msg)
    },
    {
      amount: Satoshi(600),
      currency: "BSV",
      to: "1HWbpbCZHTBJmZxjFAmfHqgNjbEePkMqTW"
    }
  ];
};

export default {
  data: () => {
    return {
      message: "",
      outputs: [
        {
          amount: Satoshi(600),
          currency: "BSV",
          to: "1HWbpbCZHTBJmZxjFAmfHqgNjbEePkMqTW"
        }
      ]
    };
  },
  methods: {
    onTextChange: function() {
      this.outputs = Outputs(this.message);
    }
  },
  components: {
    MoneyButton
  }
};
</script>
