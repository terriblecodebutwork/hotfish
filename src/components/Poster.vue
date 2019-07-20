<template>
  <div>
    <!-- <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <br />
    <textarea v-model="message" placeholder="add multiple lines" @input="onTextChange"></textarea>-->
    <MoneyButton v-bind:label="label" successMessage="success" :outputs="outputs" />
  </div>
</template>

<script>
import MoneyButton from "vue-money-button";

const Satoshi = x => {
  return Number(x) / 100000000;
};

const Base64 = x => {
  return Buffer.from(x).toString("base64");
};

const buildOutputs = (msgs, paySatoshi) => {
  let msgs2 = msgs.map(x => Buffer.from(x).toString('hex'));
  msgs2.unshift("OP_RETURN");
  return [
    {
      amount: 0,
      currency: "BSV",
      type: "Script",
      script: msgs2.join(" ")
    },
    {
      amount: Satoshi(paySatoshi),
      currency: "BSV",
      to: "1HWbpbCZHTBJmZxjFAmfHqgNjbEePkMqTW"
    }
  ];
};

export default {
  props: ['listen', 'label', 'paySatoshi'],
  data: function() {
    return {
      outputs: [
        {
          amount: Satoshi(1000),
          currency: "BSV",
          to: "1HWbpbCZHTBJmZxjFAmfHqgNjbEePkMqTW"
        },
      ]
    };
  },
  created() {
      this.$root.$on(this.listen, (params) => {
        //   console.log(params)
          let msgs = [params.name, Base64(JSON.stringify(params.apiData.queryJson))]
          console.log(msgs)
          this.outputs = buildOutputs(msgs, 1000)
      })
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
