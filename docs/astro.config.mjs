// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";
import { visualizer } from "rollup-plugin-visualizer";

// https://astro.build/config
export default defineConfig({
    vite: {
      build:{
        rollupOptions:{
          output: {
            manualChunks: (id, meta)=>{
              if(
                id.includes('/node_modules/astro/')
              ) {
                return '@astro';
              }
              if(
                id.includes('node_modules/algosdk/') ||
                id.includes('node_modules/algorand')
              ) {
                return '@algorand';
              }
              if(
                id.includes('node_modules/@txnlab/')
              ) {
                return '@txnlab';
              }
              // creating a chunk to react routes deps. Reducing the vendor chunk size
              if (
                id.includes('node_modules/react-dom/') ||
                id.includes('/react/')
              ) {
                return '@react';
              }
              if(id.includes('/node_modules/react-')){
                return '@react-components';
              }

              if(id.includes('/node_modules/@walletconnect/')){
                return '@walletconnect';
              }
              if(id.includes('/node_modules/lottie') || id.includes('/node_modules/@evanhahn/lottie')){
                return '@lottie';
              }

              if(id.includes('/node_modules/@pera')){
                return '@pera';
              }

              if(id.includes('/node_modules/@blockshake')){
                return '@defly';
              }
              if(id.includes('/node_modules/d3')){
                return '@d3';
              }

              if(id.includes('/node_modules/elliptic')){
                return '@elliptic';
              }

              if(id.includes('/node_modules/@ethersproject/')){
                return '@ethers';
              }

              if(id.includes('/node_modules/@algorandfoundation/')){
                return '@algorandfoundation';
              }
            },
          }
        }
      },
      plugins: [visualizer({
        emitFile: true,
        filename: "stats.html",
      })],
      optimizeDeps:{
        esbuildOptions: {
          define: {
            global: "globalThis"
          },
          plugins: [
            NodeGlobalsPolyfillPlugin({
              buffer: true
            })
          ]
        }
      }
    },
    integrations: [starlight({
        title: 'StoreKit',
        favicon: '/favicon.png',
        logo: {
          replacesTitle: true,
          light: './src/assets/StoreKit-light.png',
          dark: './src/assets/StoreKit-dark.png',
        },
        social: {
            github: 'https://github.com/awesome-algorand/store-kit',
        },
        components: {
          PageFrame: './src/layouts/PageFrame.astro',
          SocialIcons: './src/layouts/SocialIcons.astro',
        },
        plugins:[
          starlightTypeDoc({
            sidebar: {
              label:"Reference",
              collapsed: true,
            },
            entryPoints: ['../packages/store-kit/src/index.ts', '../packages/store-kit/src/objects/index.ts', '../packages/store-kit/src/lodash/index.ts'],
            tsconfig: '../packages/store-kit/tsconfig.json',
          }),
        ],
        sidebar: [
          { label: 'Justification', slug: 'justification' },
            {
                label: 'Guides',
                items: [
                    // Each item here is one entry in the navigation menu.
                    { label: 'Example Guide', slug: 'guides/example' },
                ],
            },
            typeDocSidebarGroup,
        ],
        customCss: ['./src/tailwind.css'],
		}), tailwind({applyBaseStyles: false}), react()],
});
