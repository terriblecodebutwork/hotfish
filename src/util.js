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

const MetaNetApi = "https://mom.planaria.network/q/"


async function getReturnData(txid) {
    let query = {
        v: 3,
        q: {
            find: {
                "tx.h": txid
            },
            project: {
                "out.s4": 1
            },
            limit: 10
        },
        r: {
            f: "[.[] | .out[1].s4]"
        }
    };
    let api =
        "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/";
    let str = JSON.stringify(query);
    let b64 = Buffer.from(str).toString("base64");
    let resp = await fetch(api + b64, {
        headers: { key: "1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt" }
    });
    let data = await resp.json();
    console.log(JSON.stringify(data));
    let x = data.u.concat(data.c)[0]
    return {
        metadata: x,
        nodeTxid: txid
    };
}


async function getChildrenOfTxid(txid) {
    let query = {
        v: 3,
        q: {
            find: {
                "tx.h": txid
            },
            limit: 20,
            project: {
                "child.tx": 1
            }
        },
        r: {
            f: ".[] | .child"
        }
    }
    let str = JSON.stringify(query);
    let b64 = Buffer.from(str).toString("base64")
    let resp = await fetch(MetaNetApi + b64, {
        headers: { key: "1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt" }
    });
    let data = await resp.json();
    return data.metanet.map((x) => x.tx)
}


async function getUserData(txid) {
    let query = {
        v: 3,
        q: {
            find: {
                "tx.h": txid
            },
            project: {
                out: 1
            },
            limit: 10
        },
        r: {
            f: "[.[] | .out[0] | {type: .s2, p1: .s3, p2: .s4 }]"
        }
    };
    let api =
        "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/";
    let str = JSON.stringify(query);
    let b64 = Buffer.from(str).toString("base64");
    let resp = await fetch(api + b64, {
        headers: { key: "1JowLDneqk8nMcHhQ6xaJMmo11izSYpxjt" }
    });
    let data = await resp.json();
    let json = data.u.concat(data.c)[0];
    console.log(JSON.stringify(json));
    return json;
}

export {
    getChildrenOfTxid,
    getUserData,
    getReturnData,
    MetaNetApi,
    formatJsonString,
    Fee,
    Base64,
    Satoshi,
    FeeToDev
}