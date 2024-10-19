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

import { connect, ankr_amoy_url, last_block_height } from './get_block'
import { chain, list_contract_transactions } from './get_contract_tx'
//import { serviceAddress } from './contract'

const selected_chain = chain.POLYGON_AMOY

let startblock: bigint = 0n
let numblocks: bigint = 100n
let contractAddress: string = ""

const args = process.argv
// skip first two arguments; usually the interpreter and the code file
for (let index = 2; index < args.length - 1; index++) {
  if (args[index] == '--startblock') {
    startblock = BigInt(args[++index])
  } else if (args[index] == '--numblocks') {
    numblocks = BigInt(args[++index])
  } else if (args[index] == '--address') {
    contractAddress = args[++index]
  }
}

const rpc = connect(ankr_amoy_url)

console.log("now: " + new Date().toLocaleString())

async function main(): Promise<void> {
  const lastblock = await last_block_height(rpc)
  console.log("current block height: " + String(lastblock))

  // if no startblock argument, then use last block
  if (startblock == 0n) {
    startblock = lastblock - numblocks
  }

  try {
    // const the_block: bigint = 12496368n
    const transactions = await list_contract_transactions(selected_chain, contractAddress, startblock, numblocks)
    console.log(`got ${transactions.length} transactions`)
    console.log(JSON.stringify(transactions,null,2))
    for (const tx of transactions) {
      console.log(`on ${tx['transactionTime']} in block: ${tx['height']} from: ${tx['from']} to: ${tx['to']} amount: ${tx['transactionSymbol']} ${tx['amount']} state: ${tx['state']}`)
    }
  } catch (e: unknown) {
    console.log("error occured: " + String(e))
  }

}

main().then(() => {
  console.log("done.")
}).catch((e: unknown) => {
  let m: string = 'unknown error'
  if (typeof e == 'string') {
    m = e
  } else if (e instanceof Error) {
    m = e.message
  }
  console.log("Error at toplevel: " + m)
})
