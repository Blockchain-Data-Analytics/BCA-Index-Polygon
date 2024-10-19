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

const deployed_addresses = {
    "BCA_Token#BCAServiceToken": "0xdAe0A2bd88D31351490dE53A93A42121CB821494",
    "BCA_Service#BCAServiceContract": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  }
  
export const tokenAddress: string = deployed_addresses["BCA_Token#BCAServiceToken"].toLowerCase()
export const serviceAddress: string = deployed_addresses["BCA_Service#BCAServiceContract"].toLowerCase()


// the token contract (ERC20) ABI
import token_abi_json from "./bca_token-abi.json"

export const tokenABI = token_abi_json["abi"];

// the service contract ABI
import service_abi_json from "./bca_service-abi.json"

export const serviceABI = service_abi_json["abi"];
