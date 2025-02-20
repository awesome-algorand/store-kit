import {nfdGetNfd} from "@awesome-algorand/nfd-fetch";
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";
import * as fs from "node:fs";

import {mutex, sleep} from "../lib/async";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Directory to save the fixtures
export const FIXTURE_DIR = resolve(__dirname, '../test/fixtures')
// Types of NfdRecords to fetch
const FIXTURE_TYPES: ("tiny" | "brief" | "full" | undefined)[]= ["tiny", "brief", "full"]
// Addresses to fetch
const TEST_ADDRESSES = [
  "phear.algo", "gabe.algo", "adri.algo", "urtho.algo", "evertdiaz.directory.algo", "evertdiaz.algo"
]
// Base URL for the NFD API
const baseUrl = "https://api.nf.domains"

// Fetch the NfdRecords and save them to the fixtures directory
await Promise.all(FIXTURE_TYPES.map(async (type)=>{
  const data = await Promise.all(TEST_ADDRESSES.map(async (address)=>{
    // Lock the mutex to prevent rate limiting
    return mutex.runExclusive(async ()=>{
      const requestOptions ={ path:{ nameOrID: address}, query:{view: type}, baseUrl }
      console.log(`Fetching ${type} for ${address}`)
      const {
        response: r,
        data,
        error,
      }  = await nfdGetNfd(requestOptions)
      // Check for response data
      if (typeof data !== "undefined" && typeof error === "undefined") {
        return data;
      }
      // Handle Rate Limits and all other errors
      if (r.status === 429 || typeof error !== "undefined") {
        const errRes = error as { secsRemaining?: number };
        console.log(
          `Rate limited, sleeping for ${errRes?.secsRemaining} seconds`,
        );
        await sleep((errRes?.secsRemaining || 1) * 1000 + 1000);
        console.log(`Fetching ${type} for ${address}`)
        const { response: r, data } = await nfdGetNfd(requestOptions);
        if (typeof data !== "undefined") {
          return data
        }
        if (r.status !== 200) {
          throw new Error("rekd, we are only going to retry once");
        }
      }
    })

  }))
  fs.writeFileSync(`${FIXTURE_DIR}/${type}.fixtures.json`, JSON.stringify(data, null, 2))
}))
