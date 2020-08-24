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

# ie11 supports
- Require is not defined: probably the global.TextEncoder

# Babel translations
what a mess:

https://stackoverflow.com/questions/49236325/babel-preset-does-not-provide-support-on-ie11-for-object-assign-object-doesn

npx babel wasm_exec_poly.js --out-file wasm_exec_es5.js && npx esbuild --target=es5 --error-limit=0 --bundle wasm_exec_es5.js --outfile=wasm_exec_es5_bundle.js

Or with browserify:

npx babel wasm_exec_poly.js --out-file wasm_exec_es5.js && npx browserify wasm_exec_es5.js --outfile=wasm_exec_es5_bundle.js

on the actual wasm_exec:
npx babel wasm_exec.js --out-file wasm_exec_es5.js && npx browserify wasm_exec_es5.js --outfile=wasm_exec_es5_bundle.js

## Transpilation
npx babel wasm_exec.js --out-file wasm_exec_es5.js

## Changes to wasm_exec.js
<!-- - js.writeSync => global.js.writeSync maybe a bug-->
- remove check for fs, always emulate

## Minification using google closur compiler
npx google-closure-compiler --js=hello_go_after.js --js_output_file=hello_go_after.min.js

minify the wasm_exec_es5: 
npx google-closure-compiler --js=wasm_exec_es5.js --js_output_file=wasm_exec_es5.min.js