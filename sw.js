if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>i(e,o),c={module:{uri:o},exports:t,require:l};s[o]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-1b432a06.js",revision:null},{url:"assets/index-7bc7676e.css",revision:null},{url:"index.html",revision:"97951870619865f4e0a19c3393820b9e"},{url:"registerSW.js",revision:"6eec53076905c73d37eac52fd4aa73e0"},{url:"logo-192x192.svg",revision:"67b8c382f1a7877ef78479db36915434"},{url:"logo-512x512.svg",revision:"eb44c0d01fc567441f67b824d8562627"},{url:"manifest.webmanifest",revision:"76506a77891b454119f1bec2bd034490"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));