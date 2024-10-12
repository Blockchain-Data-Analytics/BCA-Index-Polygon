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

// // local hardhat node - testnet
// // import deployed_address from "$lib/../../../bca-token-solidity/ignition/deployments/chain-31337/deployed_addresses.json"

// // Amoy - Polygon testnet
// import deployed_address from "../../bca-token-solidity/ignition/deployments/chain-80002/deployed_addresses.json"
const deployed_address = {
    "BCA_Token#BCAServiceToken": "0xdAe0A2bd88D31351490dE53A93A42121CB821494"
  }

export const contractAddress: string = deployed_address["BCA_Token#BCAServiceToken"].toLowerCase()

// // local hardhat node - testnet
// // import abi_json from "$lib/bca_token-abi.json"

// // Amoy - Polygon testnet
import abi_json from "./bca_token-abi.json"

export const contractABI = abi_json["abi"];