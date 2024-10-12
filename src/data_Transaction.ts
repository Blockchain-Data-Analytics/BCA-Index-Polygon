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

export interface GetTransaction {
  blockNumber: bigint;
  blockHash: string;
  transactionIndex: bigint;
  from: string;
  to: string;
  gas: bigint;
  gasPrice: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  hash: string;
  input: string;
  nonce: bigint;
  value: bigint;
  type: bigint;
  chainId: bigint;
  accessList: string[];
  v: string;
  r: string;
  s: string;
};

export function isTransaction(tx: any): tx is GetTransaction {
  return (tx.blockNumber !== undefined
      && (tx.blockHash !== undefined)
      && (tx.transactionIndex !== undefined)
      && (tx.from !== undefined)
      && (tx.to !== undefined)
      && (tx.gas !== undefined)
      && (tx.gasPrice !== undefined)
      && (tx.maxFeePerGas !== undefined)
      && (tx.maxPriorityFeePerGas !== undefined)
      && (tx.hash !== undefined)
      && (tx.input !== undefined)
      && (tx.nonce !== undefined)
      && (tx.value !== undefined)
      && (tx.type !== undefined)
      && (tx.chainId !== undefined)
      && (tx.accessList !== undefined)
      && (tx.v !== undefined)
      && (tx.r !== undefined)
      && (tx.s !== undefined))
}
