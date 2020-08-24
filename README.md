# goes
A proof-of-concept that shows that Go(lang) WASM can be turned into regular
javascript that runs in IE11. 

Check out the demo over here [here](https://goes-demo.netlify.app). If you open
the developer console in ie11, youll see the Go code do its work. In any other
browser you can add an "#emscripten" hash and reload the page to force the use
of the javascript version (instead of using wasm).

## How it works

- We compile the Go code to wasm: `GOOS=js GOARCH=wasm go build -o main.wasm`
- We use the [binaryen](https://github.com/WebAssembly/binaryen) wasm2js tool to
  turn it into emscripten js: `wasm2js --emscripten -O main.wasm -o hello_go.js`
- We add the following js: `var go = new Go();` to the beginning of the output file
- And at the end of that same file, add the following js:

  ```javascript
      var asm = instantiate({
            runtime_resetMemoryDataView: go.importObject.go["runtime.resetMemoryDataView"],
            runtime_wasmExit: go.importObject.go["runtime.wasmExit"],
            runtime_wasmWrite: go.importObject.go["runtime.wasmWrite"],
            runtime_nanotime1: go.importObject.go["runtime.nanotime1"],
            runtime_walltime1: go.importObject.go["runtime.walltime1"],
            runtime_scheduleTimeoutEvent: go.importObject.go["runtime.scheduleTimeoutEvent"],
            runtime_clearTimeoutEvent: go.importObject.go["runtime.clearTimeoutEvent"],
            runtime_getRandomData: go.importObject.go["runtime.getRandomData"],
            syscall_js_finalizeRef: go.importObject.go["syscall/js.finalizeRef"],
            syscall_js_stringVal: go.importObject.go["syscall/js.stringVal"],
            syscall_js_valueGet: go.importObject.go["syscall/js.valueGet"],
            syscall_js_valueSet: go.importObject.go["syscall/js.valueSet"],
            syscall_js_valueIndex: go.importObject.go["syscall/js.valueIndex"],
            syscall_js_valueSetIndex: go.importObject.go["syscall/js.valueSetIndex"],
            syscall_js_valueCall: go.importObject.go["syscall/js.valueCall"],
            syscall_js_valueNew: go.importObject.go["syscall/js.valueNew"],
            syscall_js_valueLength: go.importObject.go["syscall/js.valueLength"],
            syscall_js_valuePrepareString: go.importObject.go["syscall/js.valuePrepareString"],
            syscall_js_valueLoadString: go.importObject.go["syscall/js.valueLoadString"],
            syscall_js_copyBytesToJS: go.importObject.go["syscall/js.copyBytesToJS"]
      }, {
            buffer: new ArrayBuffer(209715200)
      });

      go.run({
            exports:{
                  run: asm.run,
                  mem: asm.mem,
                  resume: asm.resume,
                  getsp: asm.getsp
            }
      });
  ```

- we use babel to turn the wasm_exec.js into a es5 compatible version: `npx babel wasm_exec.js --out-file wasm_exec_es5.js`
- we conditionally load all required polyfills for ie11, and finally run the program:

      ```html
      <!doctype html>
      <html lang="en">
      <head>
      <meta charset="utf-8">

      <script type="text/javascript">
            
            // should target ie11 or below: https://stackoverflow.com/questions/29987969/how-to-load-a-script-only-in-ie
            if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent) || window.location.hash === "#emscripten") {
                  if(window.msCrypto) {window.crypto = window.msCrypto;}
                  document.write('<script src="https://cdn.jsdelivr.net/npm/text-encoding@0.7.0/lib/encoding-indexes.js"><\/script>');
                  document.write('<script src="https://cdn.jsdelivr.net/npm/text-encoding@0.7.0/lib/encoding.min.js"><\/script>');
                  document.write('<script src="https://unpkg.com/core-js-bundle@3.6.5/minified.js"><\/script>');
                  document.write('<script src="https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.7/runtime.min.js"><\/script>');
                  document.write('<script src="wasm_exec_es5.min.js"><\/script>');
                  document.write('<script src="hello_go_after.min.js"><\/script>');
            } else {
                  window.wasmExecLoaded = function() {
                        const go = new Go();          
                        if (WebAssembly.instantiateStreaming) {
                              
                              // chrome 
                              WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject).then(function(result) {
                                    go.run(result.instance);
                              });          
                        
                        } else {
                              
                              // safari
                              fetch('main.wasm').then(function(response) {
                                    return response.arrayBuffer()
                              }).then(function(bytes) {
                                    return WebAssembly.instantiate(bytes, go.importObject)
                              }).then(function(result) {
                                    return go.run(result.instance)
                              });
                        }
                  }
                  
                  document.write('<script onload="window.wasmExecLoaded()" src="wasm_exec.js" defer><\/script>');
            }
      </script>

      <title>Goes Demo</title>
      </head>
      <body>

      </body>
      </html>
      ```

## Known Issues
- This might break with further go version as the wasm_exec.js sometimes changes 
- The emscripten js files become very large: 17MB unminified and ungzipped
- The text encoding/decoding doesn't seem to be 100%, unexpected symbols and
  whitespaces while printing exotic characters
- On IE11 window.msCrypto is used, this may have security implications.
- Expect a considerable slow down, i've only tested ie11 in a vm but it took
  3-4 minutes to run a `[Fib(40)](https://dave.cheney.net/2013/06/30/how-to-write-benchmarks-in-go)`
  call while normally about 2s to run the same as regular wasm in a browser
- The required memory allocated for the wasm byte array is currently hardcoded 
  and very large (200MiB)

## TODO
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

