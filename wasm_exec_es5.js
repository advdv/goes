"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Copyright 2018 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
(function () {
  // Map multiple JavaScript environments to a single common API,
  // preferring web standards over Node.js API.
  //
  // Environments considered:
  // - Browsers
  // - Node.js
  // - Electron
  // - Parcel
  if (typeof global !== 'undefined') {// global already exists
  } else if (typeof window !== 'undefined') {
    window.global = window;
  } else if (typeof self !== 'undefined') {
    self.global = self;
  } else {
    throw new Error('cannot export Go (neither global, window nor self is defined)');
  }

  if (!global.require && typeof require !== 'undefined') {
    global.require = require;
  } //   if (!global.fs && global.require) {
  //     const fs = require('fs')
  //     if (Object.keys(fs) !== 0) {
  //       global.fs = fs
  //     }
  //   }


  var enosys = function enosys() {
    var err = new Error('not implemented');
    err.code = 'ENOSYS';
    return err;
  };

  if (!global.fs) {
    var outputBuf = '';
    global.fs = {
      constants: {
        O_WRONLY: -1,
        O_RDWR: -1,
        O_CREAT: -1,
        O_TRUNC: -1,
        O_APPEND: -1,
        O_EXCL: -1
      },
      // unused
      writeSync: function writeSync(fd, buf) {
        outputBuf += decoder.decode(buf);
        var nl = outputBuf.lastIndexOf('\n');

        if (nl != -1) {
          console.log(outputBuf.substr(0, nl));
          outputBuf = outputBuf.substr(nl + 1);
        }

        return buf.length;
      },
      write: function write(fd, buf, offset, length, position, callback) {
        if (offset !== 0 || length !== buf.length || position !== null) {
          callback(enosys());
          return;
        }

        var n = this.writeSync(fd, buf);
        callback(null, n);
      },
      chmod: function chmod(path, mode, callback) {
        callback(enosys());
      },
      chown: function chown(path, uid, gid, callback) {
        callback(enosys());
      },
      close: function close(fd, callback) {
        callback(enosys());
      },
      fchmod: function fchmod(fd, mode, callback) {
        callback(enosys());
      },
      fchown: function fchown(fd, uid, gid, callback) {
        callback(enosys());
      },
      fstat: function fstat(fd, callback) {
        callback(enosys());
      },
      fsync: function fsync(fd, callback) {
        callback(null);
      },
      ftruncate: function ftruncate(fd, length, callback) {
        callback(enosys());
      },
      lchown: function lchown(path, uid, gid, callback) {
        callback(enosys());
      },
      link: function link(path, _link, callback) {
        callback(enosys());
      },
      lstat: function lstat(path, callback) {
        callback(enosys());
      },
      mkdir: function mkdir(path, perm, callback) {
        callback(enosys());
      },
      open: function open(path, flags, mode, callback) {
        callback(enosys());
      },
      read: function read(fd, buffer, offset, length, position, callback) {
        callback(enosys());
      },
      readdir: function readdir(path, callback) {
        callback(enosys());
      },
      readlink: function readlink(path, callback) {
        callback(enosys());
      },
      rename: function rename(from, to, callback) {
        callback(enosys());
      },
      rmdir: function rmdir(path, callback) {
        callback(enosys());
      },
      stat: function stat(path, callback) {
        callback(enosys());
      },
      symlink: function symlink(path, link, callback) {
        callback(enosys());
      },
      truncate: function truncate(path, length, callback) {
        callback(enosys());
      },
      unlink: function unlink(path, callback) {
        callback(enosys());
      },
      utimes: function utimes(path, atime, mtime, callback) {
        callback(enosys());
      }
    };
  }

  if (!global.process) {
    global.process = {
      getuid: function getuid() {
        return -1;
      },
      getgid: function getgid() {
        return -1;
      },
      geteuid: function geteuid() {
        return -1;
      },
      getegid: function getegid() {
        return -1;
      },
      getgroups: function getgroups() {
        throw enosys();
      },
      pid: -1,
      ppid: -1,
      umask: function umask() {
        throw enosys();
      },
      cwd: function cwd() {
        throw enosys();
      },
      chdir: function chdir() {
        throw enosys();
      }
    };
  }

  if (!global.crypto) {
    var nodeCrypto = require('crypto');

    global.crypto = {
      getRandomValues: function getRandomValues(b) {
        nodeCrypto.randomFillSync(b);
      }
    };
  }

  if (!global.performance) {
    global.performance = {
      now: function now() {
        var _process$hrtime = process.hrtime(),
            _process$hrtime2 = _slicedToArray(_process$hrtime, 2),
            sec = _process$hrtime2[0],
            nsec = _process$hrtime2[1];

        return sec * 1000 + nsec / 1000000;
      }
    };
  }

  if (!global.TextEncoder) {
    global.TextEncoder = require('util').TextEncoder;
  }

  if (!global.TextDecoder) {
    global.TextDecoder = require('util').TextDecoder;
  } // End of polyfills for common API.


  var encoder = new TextEncoder('utf-8');
  var decoder = new TextDecoder('utf-8');

  global.Go = /*#__PURE__*/function () {
    function _class() {
      var _this = this;

      _classCallCheck(this, _class);

      this.argv = ['js'];
      this.env = {};

      this.exit = function (code) {
        if (code !== 0) {
          console.warn('exit code:', code);
        }
      };

      this._exitPromise = new Promise(function (resolve) {
        _this._resolveExitPromise = resolve;
      });
      this._pendingEvent = null;
      this._scheduledTimeouts = new Map();
      this._nextCallbackTimeoutID = 1;

      var setInt64 = function setInt64(addr, v) {
        _this.mem.setUint32(addr + 0, v, true);

        _this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
      };

      var getInt64 = function getInt64(addr) {
        var low = _this.mem.getUint32(addr + 0, true);

        var high = _this.mem.getInt32(addr + 4, true);

        return low + high * 4294967296;
      };

      var loadValue = function loadValue(addr) {
        var f = _this.mem.getFloat64(addr, true);

        if (f === 0) {
          return undefined;
        }

        if (!isNaN(f)) {
          return f;
        }

        var id = _this.mem.getUint32(addr, true);

        return _this._values[id];
      };

      var storeValue = function storeValue(addr, v) {
        var nanHead = 0x7FF80000;

        if (typeof v === 'number' && v !== 0) {
          if (isNaN(v)) {
            _this.mem.setUint32(addr + 4, nanHead, true);

            _this.mem.setUint32(addr, 0, true);

            return;
          }

          _this.mem.setFloat64(addr, v, true);

          return;
        }

        if (v === undefined) {
          _this.mem.setFloat64(addr, 0, true);

          return;
        }

        var id = _this._ids.get(v);

        if (id === undefined) {
          id = _this._idPool.pop();

          if (id === undefined) {
            id = _this._values.length;
          }

          _this._values[id] = v;
          _this._goRefCounts[id] = 0;

          _this._ids.set(v, id);
        }

        _this._goRefCounts[id]++;
        var typeFlag = 0;

        switch (_typeof(v)) {
          case 'object':
            if (v !== null) {
              typeFlag = 1;
            }

            break;

          case 'string':
            typeFlag = 2;
            break;

          case 'symbol':
            typeFlag = 3;
            break;

          case 'function':
            typeFlag = 4;
            break;
        }

        _this.mem.setUint32(addr + 4, nanHead | typeFlag, true);

        _this.mem.setUint32(addr, id, true);
      };

      var loadSlice = function loadSlice(addr) {
        var array = getInt64(addr + 0);
        var len = getInt64(addr + 8);
        return new Uint8Array(_this._inst.exports.mem.buffer, array, len);
      };

      var loadSliceOfValues = function loadSliceOfValues(addr) {
        var array = getInt64(addr + 0);
        var len = getInt64(addr + 8);
        var a = new Array(len);

        for (var i = 0; i < len; i++) {
          a[i] = loadValue(array + i * 8);
        }

        return a;
      };

      var loadString = function loadString(addr) {
        var saddr = getInt64(addr + 0);
        var len = getInt64(addr + 8);
        return decoder.decode(new DataView(_this._inst.exports.mem.buffer, saddr, len));
      };

      var timeOrigin = Date.now() - performance.now();
      this.importObject = {
        go: {
          // Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
          // may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
          // function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
          // This changes the SP, thus we have to update the SP used by the imported function.
          // func wasmExit(code int32)
          'runtime.wasmExit': function runtimeWasmExit(sp) {
            var code = _this.mem.getInt32(sp + 8, true);

            _this.exited = true;
            delete _this._inst;
            delete _this._values;
            delete _this._goRefCounts;
            delete _this._ids;
            delete _this._idPool;

            _this.exit(code);
          },
          // func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
          'runtime.wasmWrite': function runtimeWasmWrite(sp) {
            var fd = getInt64(sp + 8);
            var p = getInt64(sp + 16);

            var n = _this.mem.getInt32(sp + 24, true);

            global.fs.writeSync(fd, new Uint8Array(_this._inst.exports.mem.buffer, p, n));
          },
          // func resetMemoryDataView()
          'runtime.resetMemoryDataView': function runtimeResetMemoryDataView(sp) {
            _this.mem = new DataView(_this._inst.exports.mem.buffer);
          },
          // func nanotime1() int64
          'runtime.nanotime1': function runtimeNanotime1(sp) {
            setInt64(sp + 8, (timeOrigin + performance.now()) * 1000000);
          },
          // func walltime1() (sec int64, nsec int32)
          'runtime.walltime1': function runtimeWalltime1(sp) {
            var msec = new Date().getTime();
            setInt64(sp + 8, msec / 1000);

            _this.mem.setInt32(sp + 16, msec % 1000 * 1000000, true);
          },
          // func scheduleTimeoutEvent(delay int64) int32
          'runtime.scheduleTimeoutEvent': function runtimeScheduleTimeoutEvent(sp) {
            var id = _this._nextCallbackTimeoutID;
            _this._nextCallbackTimeoutID++;

            _this._scheduledTimeouts.set(id, setTimeout(function () {
              _this._resume();

              while (_this._scheduledTimeouts.has(id)) {
                // for some reason Go failed to register the timeout event, log and try again
                // (temporary workaround for https://github.com/golang/go/issues/28975)
                console.warn('scheduleTimeoutEvent: missed timeout event');

                _this._resume();
              }
            }, getInt64(sp + 8) + 1 // setTimeout has been seen to fire up to 1 millisecond early
            ));

            _this.mem.setInt32(sp + 16, id, true);
          },
          // func clearTimeoutEvent(id int32)
          'runtime.clearTimeoutEvent': function runtimeClearTimeoutEvent(sp) {
            var id = _this.mem.getInt32(sp + 8, true);

            clearTimeout(_this._scheduledTimeouts.get(id));

            _this._scheduledTimeouts.delete(id);
          },
          // func getRandomData(r []byte)
          'runtime.getRandomData': function runtimeGetRandomData(sp) {
            crypto.getRandomValues(loadSlice(sp + 8));
          },
          // func finalizeRef(v ref)
          'syscall/js.finalizeRef': function syscallJsFinalizeRef(sp) {
            var id = _this.mem.getUint32(sp + 8, true);

            _this._goRefCounts[id]--;

            if (_this._goRefCounts[id] === 0) {
              var v = _this._values[id];
              _this._values[id] = null;

              _this._ids.delete(v);

              _this._idPool.push(id);
            }
          },
          // func stringVal(value string) ref
          'syscall/js.stringVal': function syscallJsStringVal(sp) {
            storeValue(sp + 24, loadString(sp + 8));
          },
          // func valueGet(v ref, p string) ref
          'syscall/js.valueGet': function syscallJsValueGet(sp) {
            var result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
            sp = _this._inst.exports.getsp(); // see comment above

            storeValue(sp + 32, result);
          },
          // func valueSet(v ref, p string, x ref)
          'syscall/js.valueSet': function syscallJsValueSet(sp) {
            Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
          },
          // func valueDelete(v ref, p string)
          'syscall/js.valueDelete': function syscallJsValueDelete(sp) {
            Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
          },
          // func valueIndex(v ref, i int) ref
          'syscall/js.valueIndex': function syscallJsValueIndex(sp) {
            storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
          },
          // valueSetIndex(v ref, i int, x ref)
          'syscall/js.valueSetIndex': function syscallJsValueSetIndex(sp) {
            Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
          },
          // func valueCall(v ref, m string, args []ref) (ref, bool)
          'syscall/js.valueCall': function syscallJsValueCall(sp) {
            try {
              var v = loadValue(sp + 8);
              var m = Reflect.get(v, loadString(sp + 16));
              var args = loadSliceOfValues(sp + 32);
              var result = Reflect.apply(m, v, args);
              sp = _this._inst.exports.getsp(); // see comment above

              storeValue(sp + 56, result);

              _this.mem.setUint8(sp + 64, 1);
            } catch (err) {
              storeValue(sp + 56, err);

              _this.mem.setUint8(sp + 64, 0);
            }
          },
          // func valueInvoke(v ref, args []ref) (ref, bool)
          'syscall/js.valueInvoke': function syscallJsValueInvoke(sp) {
            try {
              var v = loadValue(sp + 8);
              var args = loadSliceOfValues(sp + 16);
              var result = Reflect.apply(v, undefined, args);
              sp = _this._inst.exports.getsp(); // see comment above

              storeValue(sp + 40, result);

              _this.mem.setUint8(sp + 48, 1);
            } catch (err) {
              storeValue(sp + 40, err);

              _this.mem.setUint8(sp + 48, 0);
            }
          },
          // func valueNew(v ref, args []ref) (ref, bool)
          'syscall/js.valueNew': function syscallJsValueNew(sp) {
            try {
              var v = loadValue(sp + 8);
              var args = loadSliceOfValues(sp + 16);
              var result = Reflect.construct(v, args);
              sp = _this._inst.exports.getsp(); // see comment above

              storeValue(sp + 40, result);

              _this.mem.setUint8(sp + 48, 1);
            } catch (err) {
              storeValue(sp + 40, err);

              _this.mem.setUint8(sp + 48, 0);
            }
          },
          // func valueLength(v ref) int
          'syscall/js.valueLength': function syscallJsValueLength(sp) {
            setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
          },
          // valuePrepareString(v ref) (ref, int)
          'syscall/js.valuePrepareString': function syscallJsValuePrepareString(sp) {
            var str = encoder.encode(String(loadValue(sp + 8)));
            storeValue(sp + 16, str);
            setInt64(sp + 24, str.length);
          },
          // valueLoadString(v ref, b []byte)
          'syscall/js.valueLoadString': function syscallJsValueLoadString(sp) {
            var str = loadValue(sp + 8);
            loadSlice(sp + 16).set(str);
          },
          // func valueInstanceOf(v ref, t ref) bool
          'syscall/js.valueInstanceOf': function syscallJsValueInstanceOf(sp) {
            _this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
          },
          // func copyBytesToGo(dst []byte, src ref) (int, bool)
          'syscall/js.copyBytesToGo': function syscallJsCopyBytesToGo(sp) {
            var dst = loadSlice(sp + 8);
            var src = loadValue(sp + 32);

            if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
              _this.mem.setUint8(sp + 48, 0);

              return;
            }

            var toCopy = src.subarray(0, dst.length);
            dst.set(toCopy);
            setInt64(sp + 40, toCopy.length);

            _this.mem.setUint8(sp + 48, 1);
          },
          // func copyBytesToJS(dst ref, src []byte) (int, bool)
          'syscall/js.copyBytesToJS': function syscallJsCopyBytesToJS(sp) {
            var dst = loadValue(sp + 8);
            var src = loadSlice(sp + 16);

            if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
              _this.mem.setUint8(sp + 48, 0);

              return;
            }

            var toCopy = src.subarray(0, dst.length);
            dst.set(toCopy);
            setInt64(sp + 40, toCopy.length);

            _this.mem.setUint8(sp + 48, 1);
          },
          debug: function debug(value) {
            console.log(value);
          }
        }
      };
    }

    _createClass(_class, [{
      key: "run",
      value: function () {
        var _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(instance) {
          var _this2 = this;

          var offset, strPtr, argc, argvPtrs, keys, argv;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this._inst = instance;
                  this.mem = new DataView(this._inst.exports.mem.buffer);
                  this._values = [// JS values that Go currently has references to, indexed by reference id
                  NaN, 0, null, true, false, global, this];
                  this._goRefCounts = new Array(this._values.length).fill(Infinity); // number of references that Go has to a JS value, indexed by reference id

                  this._ids = new Map([// mapping from JS values to reference ids
                  [0, 1], [null, 2], [true, 3], [false, 4], [global, 5], [this, 6]]);
                  this._idPool = []; // unused ids that have been garbage collected

                  this.exited = false; // whether the Go program has exited
                  // Pass command line arguments and environment variables to WebAssembly by writing them to the linear memory.

                  offset = 4096;

                  strPtr = function strPtr(str) {
                    var ptr = offset;
                    var bytes = encoder.encode(str + '\0');
                    new Uint8Array(_this2.mem.buffer, offset, bytes.length).set(bytes);
                    offset += bytes.length;

                    if (offset % 8 !== 0) {
                      offset += 8 - offset % 8;
                    }

                    return ptr;
                  };

                  argc = this.argv.length;
                  argvPtrs = [];
                  this.argv.forEach(function (arg) {
                    argvPtrs.push(strPtr(arg));
                  });
                  argvPtrs.push(0);
                  keys = Object.keys(this.env).sort();
                  keys.forEach(function (key) {
                    argvPtrs.push(strPtr("".concat(key, "=").concat(_this2.env[key])));
                  });
                  argvPtrs.push(0);
                  argv = offset;
                  argvPtrs.forEach(function (ptr) {
                    _this2.mem.setUint32(offset, ptr, true);

                    _this2.mem.setUint32(offset + 4, 0, true);

                    offset += 8;
                  });

                  this._inst.exports.run(argc, argv);

                  if (this.exited) {
                    this._resolveExitPromise();
                  }

                  _context.next = 22;
                  return this._exitPromise;

                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function run(_x) {
          return _run.apply(this, arguments);
        }

        return run;
      }()
    }, {
      key: "_resume",
      value: function _resume() {
        if (this.exited) {
          throw new Error('Go program has already exited');
        }

        this._inst.exports.resume();

        if (this.exited) {
          this._resolveExitPromise();
        }
      }
    }, {
      key: "_makeFuncWrapper",
      value: function _makeFuncWrapper(id) {
        var go = this;
        return function () {
          var event = {
            id: id,
            this: this,
            args: arguments
          };
          go._pendingEvent = event;

          go._resume();

          return event.result;
        };
      }
    }]);

    return _class;
  }();

  if (global.require && global.require.main === module && global.process && global.process.versions && !global.process.versions.electron) {
    if (process.argv.length < 3) {
      console.error('usage: go_js_wasm_exec [wasm binary] [arguments]');
      process.exit(1);
    }

    var go = new Go();
    go.argv = process.argv.slice(2);
    go.env = Object.assign({
      TMPDIR: require('os').tmpdir()
    }, process.env);
    go.exit = process.exit;
    WebAssembly.instantiate(fs.readFileSync(process.argv[2]), go.importObject).then(function (result) {
      process.on('exit', function (code) {
        // Node.js exits if no event handler is pending
        if (code === 0 && !go.exited) {
          // deadlock, make Go print error and stack traces
          go._pendingEvent = {
            id: 0
          };

          go._resume();
        }
      });
      return go.run(result.instance);
    }).catch(function (err) {
      console.error(err);
      process.exit(1);
    });
  }
})();
