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

import { isBlock } from './data_Block'
import { isTransaction } from './data_Transaction'
import { connect, get_block, ankr_amoy_url, last_block_height } from './get_block'
import { chain } from './get_contract_tx'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ['warn'] })


// const selected_chain = chain.POLYGON_AMOY

// var startblock: bigint = 12496368n
let startblock: bigint = 0n
let numblocks: bigint = 100n
const args = process.argv
// skip first two arguments; usually the interpreter and the code file
for (let index = 2; index < args.length - 1; index++) {
  if (args[index] == '--startblock') {
    startblock = BigInt(args[++index])
  } else if (args[index] == '--numblocks') {
    numblocks = BigInt(args[++index])
  }
}

const rpc = connect(ankr_amoy_url)

console.log("now: " + new Date().toLocaleString())

async function main(): Promise<void> {
  const lastblock = await last_block_height(rpc)
  console.log("current block height: " + String(lastblock))

  // if no startblock argument, then use last block in db
  if (startblock == 0n) {
    const dbblock = await prisma.block.findFirst({
      select: {
        number: true
      },
      orderBy: {
        number: 'desc'
      }
    })
    if (dbblock) {
      console.log(`restarting after latest database block ${dbblock.number}`)
      startblock = dbblock.number + 1n
      const toend = lastblock - startblock
      if (toend < numblocks) {
        numblocks = toend
      }
    } else {
      startblock = lastblock - numblocks
    }
  }

  console.log(`reading ${numblocks} blocks starting at ${startblock}`);

  // inject BigInt serialisation to JSON
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  try {
    let blocks = []
    for (let num:bigint = 0n; num < numblocks; num++) {
      const block = await get_block(rpc, startblock + num)
      if (isBlock((block))) {
        blocks.push(block)
        // split JSON structure
        const {transactions, ...blockheader} = block
        await prisma.block.create({
          data: {
            ...blockheader
          },
        })
        for (let tx of transactions) {
          tx.v = tx.v.toString()
          if (tx.to) {} else {tx.to = ""} 
          if (isTransaction(tx)) {
            await prisma.transaction.create({
              data: tx
            })
          }
        }
      } else {
        console.log(`failed to match block of JSON: ${JSON.stringify(block,null,2)}`)
      }
    }
    console.log(`got ${blocks.length} blocks`)
    // console.log(JSON.stringify(blocks,null,2))
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
