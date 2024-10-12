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

import { contractAddress } from './contract'
import rpc_conn from './rpc_conn-oklink.json'

const rpc_head: string = "https://www.oklink.com/api/v5/explorer/"

// supported API calls for AMOY_TESTNET
/*
GET https://www.oklink.com/api/v5/explorer/chain-supported-apis?chainShortName=AMOY_TESTNET
{
  "code": "0",
  "msg": "",
  "data": [
    {
      "chainFullName": "Amoy Testnet",
      "chainShortName": "AMOY_TESTNET",
      "chainSupportedApis": [
        "/api/v5/explorer/transaction/internal-transaction-multi",
        "/api/v5/explorer/transaction/token-transfer-multi",
        "/api/v5/explorer/address/address-summary",
        "/api/v5/explorer/address/rich-list",
        "/api/v5/explorer/address/transaction-list",
        "/api/v5/explorer/block/transaction-list-multi",
        "/api/v5/explorer/block/block-height-by-time",
        "/api/v5/explorer/transaction/large-transaction-list",
        "/api/v5/explorer/address/native-token-position-list",
        "/api/v5/explorer/transaction/transaction-fills",
        "/api/v5/explorer/log/by-block-and-address",
        "/api/v5/explorer/log/by-address-and-topic",
        "/api/v5/explorer/transaction/transaction-list",
        "/api/v5/explorer/log/by-address",
        "/api/v5/explorer/transaction/unconfirmed-transaction-list",
        "/api/v5/explorer/log/by-transaction",
        "/api/v5/explorer/transaction/internal-transaction-detail",
        "/api/v5/explorer/transaction/token-transaction-detail",
        "/api/v5/explorer/token/token-list",
        "/api/v5/explorer/token/position-list",
        "/api/v5/explorer/token/transaction-list",                       <<<<-----
        "/api/v5/explorer/token/token-transaction-list-multi",
        "/api/v5/explorer/contract/verify-source-code",
        "/api/v5/explorer/blockchain/block",
        "/api/v5/explorer/block/block-fills",
        "/api/v5/explorer/block/block-list",
        "/api/v5/explorer/block/transaction-list",
        "/api/v5/explorer/address/information-evm",
        "/api/v5/explorer/address/token-balance",
        "/api/v5/explorer/address/normal-transaction-list",
        "/api/v5/explorer/address/internal-transaction-list",
        "/api/v5/explorer/address/token-transaction-list",
        "/api/v5/explorer/address/balance-multi",
        "/api/v5/explorer/address/token-balance-multi",
        "/api/v5/explorer/address/normal-transaction-list-multi",
        "/api/v5/explorer/address/internal-transaction-list-multi",
        "/api/v5/explorer/blockchain/info",
        "/api/v5/explorer/address/token-transaction-list-multi",
        "/api/v5/explorer/transaction/transaction-multi",
        "/api/v5/explorer/address/address-balance-fills"
      ]
    }
  ]
}
*/

// short names:
export enum chain {
  POLYGON = 137,
  POLYGON_AMOY = 80002,
}

export let oklink_chain_short_names: {
  [key in chain]: string;
}
oklink_chain_short_names = {
  [chain.POLYGON]: 'POLYGON',
  [chain.POLYGON_AMOY]: 'AMOY_TESTNET',
} as const;


/*
https://www.oklink.com/api/v5/explorer/AMOY_TESTNET/api
   ?module=account
   &action=tokentx
   &contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2
   &address=0x4e83362442b8d1bec281594cea3050c8eb01311c
   &page=1
   &offset=1
   &startblock=19153000
   &endblock=19153162
   &sort=asc
*/

function mk_url(chain: chain, params: Record<string,string>): URL {
  const url = new URL(rpc_head + "token/transaction-list")
  let ps = params
  ps['chainShortName'] = oklink_chain_short_names[chain]
  url.search = new URLSearchParams(ps).toString();
  return url
}

// const example_url = mk_url(chain.POLYGON_AMOY, {module: "account", action: "tokentx", contractaddress: "0xde.."})

// print(example_url.toString())


export type Tx = Record<string,string>
type GetTxResult = {
  code: string,
  msg: string,
  data: {
    page: string,
    limit: string,
    totalPage: string,
    chainFullName: string,
    chainShortName: string,
    totalTransfer: string,
    transactionList: Tx[],
  }[]
}

/**
 * Search the blockchain for token transactions
 * @param chain selected chain
 * @param from_block block number to start with
 * @param count number of blocks to search
 * @returns list of transactions
 */
export async function list_contract_transactions(chain: chain, from_block: bigint, count: bigint): Promise<Tx[]> {
  const url = mk_url(chain, {
    tokenContractAddress: contractAddress,
    startBlockHeight: String(from_block),
    endBlockHeight: String(from_block + count),
    limit: "100",
   })

  console.log("URL: " + url.toString())

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      "Ok-Access-Key": rpc_conn.oklink.api.key,
    }
  })

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  } else {
    console.log(`    response: ${response.status} ${response.statusText}`)
  }

  const result = await response.json() as GetTxResult;
  // console.log(JSON.stringify(result,null,2))

  const data = result.data
  if (data.length > 0) {
    return data[0].transactionList
  } else {
    return []
  }
}

/*

{
    "status": "1",
    "message": "OK",
    "result":
    "result":[
          {
             "blockNumber":"4730207",
             "timeStamp":"1513240363",
             "hash":"0xe8c208398bd5ae8e4c237658580db56a2a94dfa0ca382c99b776fa6e7d31d5b4",
             "nonce":"406",
             "blockHash":"0x022c5e6a3d2487a8ccf8946a2ffb74938bf8e5c8a3f6d91b41c56378a96b5c37",
             "from":"0x642ae78fafbb8032da552d619ad43f1d81e4dd7c",
             "contractAddress":"0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
             "to":"0x4e83362442b8d1bec281594cea3050c8eb01311c",
             "value":"5901522149285533025181",
             "tokenName":"Maker",
             "tokenSymbol":"MKR",
             "tokenDecimal":"18",
             "transactionIndex":"81",
             "gas":"940000",
             "gasPrice":"32010000000",
             "gasUsed":"77759",
             "cumulativeGasUsed":"2523379",
             "input":"deprecated",
             "confirmations":"7968350"
          }
    ]
}
*/