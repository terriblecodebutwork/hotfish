const Base64 = x => Buffer.from(x).toString("base64")

const Satoshi = x => Number(x) / 100000000

const Fee = 999

const FeeToDev = {
    amount: Satoshi(Fee),
    currency: "BSV",
    to: "1HWbpbCZHTBJmZxjFAmfHqgNjbEePkMqTW"
}

export {
    Fee,
    Base64,
    Satoshi,
    FeeToDev
}