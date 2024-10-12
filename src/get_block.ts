/*  Polygon chain indexing
    Copyright (C) 2024  Alexander Diemand

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Contract, ContractAbi, DecodedParams, Web3 } from 'web3'
import { contractABI, contractAddress } from './contract'
import rpc_conn from './rpc_conn-getblock.json'
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';
import { GetBlock, isBlock } from './data_Block';

const rpc_head: string = "https://go.getblock.io/"

/**
 * type alias shortened
 */
export type Web3Rpc = Web3<RegisteredSubscription>

/**
 * Instantiate a connection to a remote RPC endpoint
 * @returns the Web3 rpc connection
 */
export function connect(): Web3Rpc {
  const web3Rpc = new Web3(new Web3.providers.HttpProvider(
          rpc_head + rpc_conn.shared.matic.amoy.jsonRpc[0] + "/"
  ));
  return web3Rpc
}

/**
 * type alias shortened
 */
export type MyContract = Contract<ContractAbi>

/**
 * Instantiates a contract from its ABI and its address
 * @param rpc the Web3 rpc connectio
 * @returns the contract instance
 */
export function contract(rpc: Web3Rpc): MyContract {
  const contract = new rpc.eth.Contract(contractABI, contractAddress)
  return contract
}

/**
 * Get the latest block's number from the chain 
 * @param rpc the Web3 rpc connection
 * @returns {bigint} the block number
 */
export async function last_block_height(rpc: Web3Rpc): Promise<bigint> {
  const lastblock = await rpc.eth.getBlockNumber();
  return lastblock
}

/**
 * Fetches block data from the chain
 * @param rpc the Web3 rpc connection
 * @param block_num the block's number
 * @returns a JSON structure of the block data
 */
export async function get_block(rpc: Web3Rpc, block_num: bigint): Promise<GetBlock | undefined> {
  const block = await rpc.eth.getBlock(block_num, true)
  if (isBlock(block)) {
    return block
  } else {
    return undefined
  }
}

/**
 * Decodes the method and the arguments to a contract method call
 * @param contract the contract instance
 * @param {string} input the input data to the contract call, from field "input"
 * @returns the decoded structure
 */
export function decode_method(contract: MyContract, input: string): DecodedParams {
  const decoded = contract.decodeMethodData(input)
  return decoded
}

/*
      "input": "0xa9059cbb0000000000000000000000001a8725f9a4295bb3b4e5321ecb2c9185004fc76f00000000000000000000000000000000000000000000000107ad8f556c6c0000",

decoded: {
  "0": "0x1A8725f9A4295bb3b4E5321Ecb2c9185004fC76F",
  "1": "19000000000000000000",
  "__length__": 2,
  "recipient": "0x1A8725f9A4295bb3b4E5321Ecb2c9185004fC76F",
  "amount": "19000000000000000000",
  "__method__": "transfer(address,uint256)"
}
*/

/*
{
  "baseFeePerGas": "15",
  "difficulty": "6",
  "extraData": "0xd78301040183626f7288676f312e32322e37856c696e75780000000000000000c480c2c0c02fd70e8172cfbdd803493f6e50d5c95b7f4409f1faf6c6f634eb6ddc9190f31838c6c7443bf65aa2c5bc341c377d375bead5facad5549f078687da9f827dde5601",
  "gasLimit": "30000000",
  "gasUsed": "88908",
  "hash": "0xda210d74fe567e2cf8cfbd8bb48eebca496ce9315fb5f966c5906d0d67e5ec52",
  "logsBloom": "0x000000000400000000000000000000000000000000000000000000008000000000000000000000000000800000000000000080000000000000000100000000000000000040000000000000080000008000004000000000000001000000100000000000000000000000000000000000000400000000000000a0000010000000000000000000000000000000000000000020004000000000008000000100000000200002000000000000040000000000000000000800000000000000000000004000000002000000000001000000000000200000000000000000100000000004000000000000000000000000010000000000000000000000000000000000100018",
  "miner": "0x0000000000000000000000000000000000000000",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0",
  "number": "12496368",
  "parentHash": "0x8896b518c9d28eb4e8f24d2e7b43f98a60264bf5ed4e10944e860d3c0bf6f44e",
  "receiptsRoot": "0x3ec99d2bfeaba47fb94dc86303d97fbf8a14652385fac0d386866238bac9ffac",
  "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  "size": "994",
  "stateRoot": "0xd4a94f018214887ec28210993c5515e7c24583ba9683bb9b56a48cb838783a21",
  "timestamp": "1727467748",
  "totalDifficulty": "81120312",
  "transactions": [
    {
      "blockHash": "0xda210d74fe567e2cf8cfbd8bb48eebca496ce9315fb5f966c5906d0d67e5ec52",
      "blockNumber": "12496368",
      "from": "0xb443a7c44543f56b5b68cb0ddef4a50563ac468a",
      "gas": "35464",
      "gasPrice": "31625000000",
      "maxFeePerGas": "31625000015",
      "maxPriorityFeePerGas": "31624999985",
      "hash": "0x17aded8b1eb024857a51113f1da551dd19ee7e1d54f91aa94ee6790e224c81cf",
      "input": "0xa9059cbb00000000000000000000000069f4cc8158d4764bb5e535ecaeca3d7246f503af0000000000000000000000000000000000000000000000000de0b6b3a7640000",
      "nonce": "1",
      "to": "0x7da7e6c28a71a77e3cd813869bfdea10a52f41ac",
      "transactionIndex": "0",
      "value": "0",
      "type": "2",
      "accessList": [],
      "chainId": "80002",
      "v": "0",
      "r": "0xdcdcfa3d8b33e32026bb2cee0b96064c58bc0db88902e45218e1ca3d8ec94f8f",
      "s": "0x3b6847e88d2d27b36fa2ad92aa7e88e2cfdd1957043167bbc1ffddfa881aab31"
    },
    {
      "blockHash": "0xda210d74fe567e2cf8cfbd8bb48eebca496ce9315fb5f966c5906d0d67e5ec52",
      "blockNumber": "12496368",
      "from": "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
      "gas": "81900",
      "gasPrice": "29100000015",
      "maxFeePerGas": "29100000021",
      "maxPriorityFeePerGas": "29100000000",
      "hash": "0xb4b02840c648e32eb4d27467639f47b4503cafe2b7f48f366f85f7202ec908f8",
      "input": "0xa9059cbb0000000000000000000000001a8725f9a4295bb3b4e5321ecb2c9185004fc76f00000000000000000000000000000000000000000000000107ad8f556c6c0000",
      "nonce": "263",
      "to": "0xdae0a2bd88d31351490de53a93a42121cb821494",
      "transactionIndex": "1",
      "value": "0",
      "type": "2",
      "accessList": [],
      "chainId": "80002",
      "v": "0",
      "r": "0xbc2011849ec72b1def7673fc70f06a9fe4d10e0d0fd8e71580a96bf835452fb0",
      "s": "0x440c58a1b0794abc10ce81434203c5c113f6cfb405505b67b765cafa8adf1c51"
    }
  ],
  "transactionsRoot": "0xdba45ebd3cab440eba81895a54edca391ba44f4d5c2ee8d620253ddb50cf8d73",
  "uncles": []
}
*/