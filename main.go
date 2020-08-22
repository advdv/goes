// +build wasm

package main

import (
	"fmt"
	"syscall/js"
	"time"

	"github.com/lithdew/casso"
)

func main() {
	fmt.Println("started")
	s := casso.NewSolver()
	_ = s

	go func() {
		for range time.Tick(time.Millisecond * 2200) {
			js.Global().Set("foo", time.Now().String())
		}
	}()

	for range time.Tick(time.Second * 3) {
		fmt.Println("hello, world", js.Global().Get("foo"))
	}
}
