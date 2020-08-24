# goes
Go to Javascript es(5) compiling

- [ ] Enable minification on program js, esbuild will cause stack error on ie11
- [ ] Enable minification wasm_exec
- [ ] Figure out TextEncoder polyfill limitations, i.e print some utf8.
        - some weid things happen with the colon in "日本語:"
- [ ] Run an extra large program: maybe compile the whole stdlib tests
- [ ] Security implications of using ie11's msCrypto version
- [ ] Fix textEncoder warning, probably just remove the 'utf-8' argument, it
      is implied by the standard?
- [ ] Fix the google closure compiler warning with the plus sign
- [ ] Fib(40) test takes 3m28 seconds in ie11 in vm
      Fib(40) takes 13s as emscripten js on safari
      Fib(40) takes 10s as emscripten js on chrome
      Fib(40) takes ~2s as wasm on safari
      Fib(40) takes ~4.6s as wasm on Chrome
      Fib(40) takes ~2s as wasm in Node (14) using go_js_wasm_exec
      Fib(40) Takes about 636ms natively
- [ ] Find out how to calculate the memn for wasm file
- [ ] Can force emscripten on Chrome / Safari by adding the #emscripten hash and
      reloading the demo

## Known Issues
- The emscripten files become very large
- The text encoding/decoding doesn't seem to be 100% on ie11