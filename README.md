
# Indexing the Polygon (MATIC | POL) chain

# BCA Service Token

### Version: 2024-10-13
### Copyright: 2024 Alexander Diemand
### [License](./LICENSE): GPLv3 - GNU GENERAL PUBLIC LICENSE Version 3

## query contract transactions from oklink

see [index_tx.ts](./src/index_tx.ts)

continue from last block in db:
```sh
time ./node_modules/.bin/ts-node src/index_block.ts
```
(accepts arguments: '--startblock' and '--numblocks')


## query block information from getblock.io

see [index_block.ts](./src/index_block.ts)

1. open account
   - gives 40000 requests per day for free
   - the access token is per chain; in the below example the Polygon Amoy testnet

2. get block height:
```
   curl --location --request POST 'https://go.getblock.io/<ACCESS-TOKEN>/'  \
        --header 'Content-Type: application/json'  \
        --data-raw '{"jsonrpc": "2.0",
        "method": "eth_blockNumber",
        "params": [],
        "id": "getblock.io"}'
```
3. get blocks
```
    curl --location --request POST 'https://go.getblock.io/<ACCESS-TOKEN>/' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "jsonrpc": "2.0",
            "method": "eth_getBlockByNumber",
            "params": [
                "0xc62171",
                true 
            ],
            "id": "getblock.io"}'
```


#### transactions

```json
{
  "jsonrpc": "2.0",
  "id": "getblock.io",
  "result": {
    "baseFeePerGas": "0xf",
    "difficulty": "0xa",
    "extraData": "0xd78301050083626f7288676f312e32322e33856c696e75780000000000000000c480c2c0c05391c77413f8df041242c75260a365751d83ad6c75013eb6d6ca4f3c05d8b69e4692bd273f94d0373c4db8b3bc730c42d13b403a9d99129495f639bf21d8bcf900",
    "gasLimit": "0x1c9c380",
    "gasUsed": "0x58ece",
    "hash": "0xcf7e94fb3461a6fe8c1a82f38f01dda3e075edfadfdcbb8a866b1c22725f32bf",
    "logsBloom": "0x00800000000000000000000000004000000001000000000000000000000000000000000008000000000000000000000000008000000000000000000000300000000000000000000080000008000200800000000000000000200100008000010000000000020000000000000000000800200080000200000080000010000001000000000000000000080000000000000000004000000000000000080000000000220000000000000000000001100040000000000000000000000000000000004000000002400000000001000000000210800000000000000000100000010820000010000000000000000000000000000000000000000000080000000000100000",
    "miner": "0x0000000000000000000000000000000000000000",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "number": "0xc62171",
    "parentHash": "0x010e2b0f3a987dc701adf0d41e5557b4ee6dc35ea3b359efc1d6d8ddc1289cea",
    "receiptsRoot": "0x7dcbac187b26dd47057fc72d3990cca80ef33f64950cec3bc5f818bed3506c68",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x5fb",
    "stateRoot": "0x2eb7d5608c31bbb6b57231cc4609d419a4a50fcd02cea3f05a6be002fe756e49",
    "timestamp": "0x6706fb91",
    "totalDifficulty": "0x508d66e",
    "transactions": [
      {
        "blockHash": "0xcf7e94fb3461a6fe8c1a82f38f01dda3e075edfadfdcbb8a866b1c22725f32bf",
        "blockNumber": "0xc62171",
        "from": "0x0a0cdc90cc16a0f3e67c296c8c0f7207cbdc0f4e",
        "gas": "0x6bfe",
        "gasPrice": "0x746a52880f",
        "hash": "0x67fe4ffc4346bf7c7b77b4806280044450926ee030797ecbb4721513cf0268a4",
        "input": "0x095ea7b30000000000000000000000001d0888a1552996822b71e89ca735b06aed4b20a4ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "nonce": "0x8e",
        "to": "0x6b94a36d6ff05886d44b3dafabdefe85f09563ba",
        "transactionIndex": "0x0",
        "value": "0x0",
        "type": "0x0",
        "chainId": "0x13882",
        "v": "0x27128",
        "r": "0x4a7e9df0873ed96d55e2ab6167e63ee8c69a33308cb712857ef4254c27370a00",
        "s": "0x3219636f9cfea217f3e0c5f49e47b76942132d65e5da312e6e58e044805df5d8"
      },
      {
        "blockHash": "0xcf7e94fb3461a6fe8c1a82f38f01dda3e075edfadfdcbb8a866b1c22725f32bf",
        "blockNumber": "0xc62171",
        "from": "0xc2455f2417fad8094dcd841a87f8561f4edc7661",
        "gas": "0x5422d",
        "gasPrice": "0x9502f9000",
        "maxFeePerGas": "0x9502f9000",
        "maxPriorityFeePerGas": "0x9502f9000",
        "hash": "0xacadd573146109c7904a55935cc940a49a60282a9907d7c1bbd1e17bcfd7c66e",
        "input": "0xf03792f500000000000000000000000026f91b714fed8cf26b7cfb33fd2626242627fbb400000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000001650000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000021000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003a697066733a2f2f697066732f516d61557461703845624265673736624b5045736654356234646b504a34514834777770396d6d794b3369346668000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000b2f07",
        "nonce": "0x14ac",
        "to": "0x0afe42e0190a33c2593674042212970ba15cdc1f",
        "transactionIndex": "0x1",
        "value": "0x0",
        "type": "0x2",
        "accessList": [],
        "chainId": "0x13882",
        "v": "0x0",
        "r": "0x667feb4e2fcb475dd3a5bee25b6da16d8418573141512ac6c01ea17d8df53db4",
        "s": "0x613f4a06f7790ecc3f49a9d7e5024e6419cfe719fdd10bb3ba4fa70392c4e503",
        "yParity": "0x0"
      }
    ],
    "transactionsRoot": "0xcdb3ad1ff0f39b1b1e09b920ada697197eb85d68f616385a8d8af48596ce72d0",
    "uncles": []
  }
}
```

### the second transaction involves our contract and transferred 19 tokens from 0x15.. to 0x1a.. 

```json
{
  "jsonrpc": "2.0",
  "id": "getblock.io",
  "result": {
    "baseFeePerGas": "0xf",
    "difficulty": "0x6",
    "extraData": "0xd78301040183626f7288676f312e32322e37856c696e75780000000000000000c480c2c0c02fd70e8172cfbdd803493f6e50d5c95b7f4409f1faf6c6f634eb6ddc9190f31838c6c7443bf65aa2c5bc341c377d375bead5facad5549f078687da9f827dde5601",
    "gasLimit": "0x1c9c380",
    "gasUsed": "0x15b4c",
    "hash": "0xda210d74fe567e2cf8cfbd8bb48eebca496ce9315fb5f966c5906d0d67e5ec52",
    "logsBloom": "0x000000000400000000000000000000000000000000000000000000008000000000000000000000000000800000000000000080000000000000000100000000000000000040000000000000080000008000004000000000000001000000100000000000000000000000000000000000000400000000000000a0000010000000000000000000000000000000000000000020004000000000008000000100000000200002000000000000040000000000000000000800000000000000000000004000000002000000000001000000000000200000000000000000100000000004000000000000000000000000010000000000000000000000000000000000100018",
    "miner": "0x0000000000000000000000000000000000000000",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "number": "0xbeadf0",
    "parentHash": "0x8896b518c9d28eb4e8f24d2e7b43f98a60264bf5ed4e10944e860d3c0bf6f44e",
    "receiptsRoot": "0x3ec99d2bfeaba47fb94dc86303d97fbf8a14652385fac0d386866238bac9ffac",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x3e2",
    "stateRoot": "0xd4a94f018214887ec28210993c5515e7c24583ba9683bb9b56a48cb838783a21",
    "timestamp": "0x66f710e4",
    "totalDifficulty": "0x4d5cc38",
    "transactions": [
      {
        "blockHash": "0xda210d74fe567e2cf8cfbd8bb48eebca496ce9315fb5f966c5906d0d67e5ec52",
        "blockNumber": "0xbeadf0",
        "from": "0xb443a7c44543f56b5b68cb0ddef4a50563ac468a",
        "gas": "0x8a88",
        "gasPrice": "0x75cff3440",
        "maxFeePerGas": "0x75cff344f",
        "maxPriorityFeePerGas": "0x75cff3431",
        "hash": "0x17aded8b1eb024857a51113f1da551dd19ee7e1d54f91aa94ee6790e224c81cf",
        "input": "0xa9059cbb00000000000000000000000069f4cc8158d4764bb5e535ecaeca3d7246f503af0000000000000000000000000000000000000000000000000de0b6b3a7640000",
        "nonce": "0x1",
        "to": "0x7da7e6c28a71a77e3cd813869bfdea10a52f41ac",
        "transactionIndex": "0x0",
        "value": "0x0",
        "type": "0x2",
        "accessList": [],
        "chainId": "0x13882",
        "v": "0x0",
        "r": "0xdcdcfa3d8b33e32026bb2cee0b96064c58bc0db88902e45218e1ca3d8ec94f8f",
        "s": "0x3b6847e88d2d27b36fa2ad92aa7e88e2cfdd1957043167bbc1ffddfa881aab31",
        "yParity": "0x0"
      },
      {
        "blockHash": "0xda210d74fe567e2cf8cfbd8bb48eebca496ce9315fb5f966c5906d0d67e5ec52",
        "blockNumber": "0xbeadf0",
        "from": "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
        "gas": "0x13fec",
        "gasPrice": "0x6c67ec30f",
        "maxFeePerGas": "0x6c67ec315",
        "maxPriorityFeePerGas": "0x6c67ec300",
        "hash": "0xb4b02840c648e32eb4d27467639f47b4503cafe2b7f48f366f85f7202ec908f8",
        "input": "0xa9059cbb0000000000000000000000001a8725f9a4295bb3b4e5321ecb2c9185004fc76f00000000000000000000000000000000000000000000000107ad8f556c6c0000",
        "nonce": "0x107",
        "to": "0xdae0a2bd88d31351490de53a93a42121cb821494",
        "transactionIndex": "0x1",
        "value": "0x0",
        "type": "0x2",
        "accessList": [],
        "chainId": "0x13882",
        "v": "0x0",
        "r": "0xbc2011849ec72b1def7673fc70f06a9fe4d10e0d0fd8e71580a96bf835452fb0",
        "s": "0x440c58a1b0794abc10ce81434203c5c113f6cfb405505b67b765cafa8adf1c51",
        "yParity": "0x0"
      }
    ],
    "transactionsRoot": "0xdba45ebd3cab440eba81895a54edca391ba44f4d5c2ee8d620253ddb50cf8d73",
    "uncles": []
  }
}
```

the decoding, using web3.js and the loaded contract, gives:

```json
"decoded": {
  "0": "0x1A8725f9A4295bb3b4E5321Ecb2c9185004fC76F",
  "1": "19000000000000000000",
  "__length__": 2,
  "recipient": "0x1A8725f9A4295bb3b4E5321Ecb2c9185004fC76F",
  "amount": "19000000000000000000",
  "__method__": "transfer(address,uint256)"
}
```
(the amount is * 10^18, the number of digits)

