// +build !wasm

package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
)

var bufn = 1024 * 1024
var jsbufn = 18022400 // @TODO how to determine this from the wasm2js output

func prep() {
	log.Println("modifying js file")

	out, err := os.Create("hello_go_after.js")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Fprintf(out, "var go = new Go();\n")

	in, err := os.Open("hello_go.js")
	if err != nil {
		log.Fatal(err)
	}

	defer in.Close()
	defer out.Close()

	scan := bufio.NewScanner(in)
	scan.Buffer(make([]byte, bufn), bufn)

	for scan.Scan() {
		fmt.Fprintln(out, scan.Text())
	}

	if err := scan.Err(); err != nil {
		log.Fatal(err)
	}

	// @TODO would be nice if we got this from the wasm_exec.js automatically
	fmt.Fprintf(out, `
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
	buffer: new ArrayBuffer(%d)
});

go.run({
	exports:{
		run: asm.run,
		mem: asm.mem,
		resume: asm.resume,
		getsp: asm.getsp
	}
});`, jsbufn)

	args := []string{
		"npx", "esbuild", "hello_go_after.js", "--target=es5", "--outfile=hello_go_after.min.js",
	}

	cmd := exec.Command(args[0], args[1:]...)
	cmd.Stderr = os.Stderr

	log.Println("minify js")
	err = cmd.Run()
	if err != nil {
		log.Fatal(err)
	}

	return
}

func main() {
	prep()

	log.Println("ready")
	http.ListenAndServe(":9090", http.FileServer(http.Dir(".")))
}
