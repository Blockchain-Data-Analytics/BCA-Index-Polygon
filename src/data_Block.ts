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

import { GetTransaction } from './data_Transaction';


export interface GetBlock {
  number: bigint;
  hash: string;
  parentHash: string;
  baseFeePerGas: bigint;
  difficulty: bigint;
  extraData: string;
  gasLimit: bigint;
  gasUsed: bigint;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: bigint;
  receiptsRoot: string;
  sha3Uncles: string;
  size: bigint;
  stateRoot: string;
  timestamp: bigint;
  totalDifficulty: bigint;
  transactions: GetTransaction[];
  transactionsRoot: string;
  uncles: string[];
};

export function isBlock(b: any): b is GetBlock {
  return (b.number !== undefined
       && b.hash != undefined
       && b.parentHash != undefined
       && b.baseFeePerGas != undefined
       && b.difficulty != undefined
       && b.extraData != undefined
       && b.gasLimit != undefined
       && b.gasUsed != undefined
       && b.logsBloom != undefined
       && b.miner != undefined
       && b.mixHash != undefined
       && b.nonce != undefined
       && b.receiptsRoot != undefined
       && b.sha3Uncles != undefined
       && b.stateRoot != undefined
       && b.timestamp != undefined
       && b.totalDifficulty != undefined
       && b.transactions != undefined
       && b.transactionsRoot != undefined
       && b.uncles != undefined)
}