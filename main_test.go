// +build wasm

package main

import (
	"fmt"
	"testing"
	"time"
)

func Fib(n int) int {
	if n < 2 {
		return n
	}
	return Fib(n-1) + Fib(n-2)
}

var _g int

func TestFib(t *testing.T) {
	t0 := time.Now()
	_g = Fib(40)
	if _g != 102334155 {
		t.Fatal("invalid")
	}

	fmt.Println(time.Now().Sub(t0))
}
