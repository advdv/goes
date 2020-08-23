# goes
Go to Javascript es(5) compiling

- [ ] Enable minification again after ie tests
- [ ] Figure out TextEncoder polyfill limitations

- 'require' is not defined Wasm_exec_es5.js (880,4)
- 'Promise' is undefined

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
- js.writeSync => global.js.writeSync
- remove check for fs, always emulate

