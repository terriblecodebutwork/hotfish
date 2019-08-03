const Base64 = x => Buffer.from(x).toString("base64")

const Satoshi = x => Number(x) / 100000000

const Fee = 999

const FeeToDev = {
    amount: Satoshi(Fee),
    currency: "BSV",
    type: "ADDRESS",
    to: "1HWbpbCZHTBJmZxjFAmfHqgNjbEePkMqTW"
}

const formatJsonString = str => {
    let j = JSON.parse(str)
    return JSON.stringify(j, null, 2)
}

export {
    formatJsonString,
    Fee,
    Base64,
    Satoshi,
    FeeToDev
}