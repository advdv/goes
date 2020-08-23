# goes
Go to Javascript es(5) compiling

- [ ] Enable minification on program js, esbuild will cause stack error on ie11
- [ ] Enable minification wasm_exec
- [ ] Figure out TextEncoder polyfill limitations
- [ ] Run an extra large program: maybe compile the whole stdlib tests

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