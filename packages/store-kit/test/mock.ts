import {vi} from 'vitest'


export function createMockFetch() {
  const mockFetch = vi.fn()
  mockFetch.mockImplementation(async (url: string) => {
    // if(url.startsWith(DEFAULT_IMAGE_URL)){
    //   return {
    //     ok: true,
    //     status: 200,
    //     headers: new Headers({
    //       "Content-Type": "image/png",
    //     }),
    //   }
    // }
    // // Handle IPFS Gateway and Image URL
    // if(url.startsWith(DEFAULT_GATEWAY) && Object.keys(ipfsMetadata).some(cid => url.includes(cid))){
    //   const key = Object.keys(ipfsMetadata).find(cid => url.includes(cid))
    //   if(!key) throw new Error("Invalid CID")
    //   return {
    //     ok: true,
    //     status: 200,
    //     headers: new Headers({
    //       "Content-Type": "application/json",
    //     }),
    //     json: async () => ipfsMetadata[key],
    //   }
    // }else if(url.startsWith(DEFAULT_GATEWAY)){
    //   return {
    //     ok: true,
    //     status: 200,
    //     headers: new Headers({
    //       "Content-Type": "image/png",
    //     }),
    //   }
    // }
    //
    // // Handle OpenStreetMap API
    // if (url.startsWith(OSM_URL)) {
    //   const address = url.split("q=")[1].replace(/"/g, "")
    //   const {lat, lon} = addresses[address]
    //   return {
    //     ok: true,
    //     status: 200,
    //     headers: new Headers({
    //       "Content-Type": "application/json",
    //     }),
    //     json: async () => ([{
    //       "lat": lat,
    //       "lon": lon,
    //       "importance": 0.6
    //     }]),
    //   }
    // }
  })
  return mockFetch
}
