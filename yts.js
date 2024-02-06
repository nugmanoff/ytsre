var YTService = (function (e) {
  var t = {};
  function r(o) {
    if (t[o]) return t[o].exports;
    var i = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
  }
  return (
    (r.m = e),
    (r.c = t),
    (r.d = function (e, t, o) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (r.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (r.r(o),
        Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var i in e)
          r.d(
            o,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return o;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, 'a', t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ''),
    r((r.s = 7))
  );
})([
  function (e, t, r) {
    var o;
    e.exports =
      ((o =
        o ||
        (function (e, t) {
          var r =
              Object.create ||
              (function () {
                function e() {}
                return function (t) {
                  var r;
                  return (
                    (e.prototype = t), (r = new e()), (e.prototype = null), r
                  );
                };
              })(),
            o = {},
            i = (o.lib = {}),
            n = (i.Base = {
              extend: function (e) {
                var t = r(this);
                return (
                  e && t.mixIn(e),
                  (t.hasOwnProperty('init') && this.init !== t.init) ||
                    (t.init = function () {
                      t.$super.init.apply(this, arguments);
                    }),
                  (t.init.prototype = t),
                  (t.$super = this),
                  t
                );
              },
              create: function () {
                var e = this.extend();
                return e.init.apply(e, arguments), e;
              },
              init: function () {},
              mixIn: function (e) {
                for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                e.hasOwnProperty('toString') && (this.toString = e.toString);
              },
              clone: function () {
                return this.init.prototype.extend(this);
              },
            }),
            s = (i.WordArray = n.extend({
              init: function (e, t) {
                (e = this.words = e || []),
                  (this.sigBytes = null != t ? t : 4 * e.length);
              },
              toString: function (e) {
                return (e || l).stringify(this);
              },
              concat: function (e) {
                var t = this.words,
                  r = e.words,
                  o = this.sigBytes,
                  i = e.sigBytes;
                if ((this.clamp(), o % 4))
                  for (var n = 0; n < i; n++) {
                    var s = (r[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                    t[(o + n) >>> 2] |= s << (24 - ((o + n) % 4) * 8);
                  }
                else for (n = 0; n < i; n += 4) t[(o + n) >>> 2] = r[n >>> 2];
                return (this.sigBytes += i), this;
              },
              clamp: function () {
                var t = this.words,
                  r = this.sigBytes;
                (t[r >>> 2] &= 4294967295 << (32 - (r % 4) * 8)),
                  (t.length = e.ceil(r / 4));
              },
              clone: function () {
                var e = n.clone.call(this);
                return (e.words = this.words.slice(0)), e;
              },
              random: function (t) {
                for (
                  var r,
                    o = [],
                    i = function (t) {
                      t = t;
                      var r = 987654321,
                        o = 4294967295;
                      return function () {
                        var i =
                          (((r = (36969 * (65535 & r) + (r >> 16)) & o) << 16) +
                            (t = (18e3 * (65535 & t) + (t >> 16)) & o)) &
                          o;
                        return (
                          (i /= 4294967296),
                          (i += 0.5) * (e.random() > 0.5 ? 1 : -1)
                        );
                      };
                    },
                    n = 0;
                  n < t;
                  n += 4
                ) {
                  var a = i(4294967296 * (r || e.random()));
                  (r = 987654071 * a()), o.push((4294967296 * a()) | 0);
                }
                return new s.init(o, t);
              },
            })),
            a = (o.enc = {}),
            l = (a.Hex = {
              stringify: function (e) {
                for (
                  var t = e.words, r = e.sigBytes, o = [], i = 0;
                  i < r;
                  i++
                ) {
                  var n = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                  o.push((n >>> 4).toString(16)), o.push((15 & n).toString(16));
                }
                return o.join('');
              },
              parse: function (e) {
                for (var t = e.length, r = [], o = 0; o < t; o += 2)
                  r[o >>> 3] |=
                    parseInt(e.substr(o, 2), 16) << (24 - (o % 8) * 4);
                return new s.init(r, t / 2);
              },
            }),
            g = (a.Latin1 = {
              stringify: function (e) {
                for (
                  var t = e.words, r = e.sigBytes, o = [], i = 0;
                  i < r;
                  i++
                ) {
                  var n = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                  o.push(String.fromCharCode(n));
                }
                return o.join('');
              },
              parse: function (e) {
                for (var t = e.length, r = [], o = 0; o < t; o++)
                  r[o >>> 2] |= (255 & e.charCodeAt(o)) << (24 - (o % 4) * 8);
                return new s.init(r, t);
              },
            }),
            p = (a.Utf8 = {
              stringify: function (e) {
                try {
                  return decodeURIComponent(escape(g.stringify(e)));
                } catch (e) {
                  throw new Error('Malformed UTF-8 data');
                }
              },
              parse: function (e) {
                return g.parse(unescape(encodeURIComponent(e)));
              },
            }),
            u = (i.BufferedBlockAlgorithm = n.extend({
              reset: function () {
                (this._data = new s.init()), (this._nDataBytes = 0);
              },
              _append: function (e) {
                'string' == typeof e && (e = p.parse(e)),
                  this._data.concat(e),
                  (this._nDataBytes += e.sigBytes);
              },
              _process: function (t) {
                var r = this._data,
                  o = r.words,
                  i = r.sigBytes,
                  n = this.blockSize,
                  a = i / (4 * n),
                  l =
                    (a = t
                      ? e.ceil(a)
                      : e.max((0 | a) - this._minBufferSize, 0)) * n,
                  g = e.min(4 * l, i);
                if (l) {
                  for (var p = 0; p < l; p += n) this._doProcessBlock(o, p);
                  var u = o.splice(0, l);
                  r.sigBytes -= g;
                }
                return new s.init(u, g);
              },
              clone: function () {
                var e = n.clone.call(this);
                return (e._data = this._data.clone()), e;
              },
              _minBufferSize: 0,
            })),
            y =
              ((i.Hasher = u.extend({
                cfg: n.extend(),
                init: function (e) {
                  (this.cfg = this.cfg.extend(e)), this.reset();
                },
                reset: function () {
                  u.reset.call(this), this._doReset();
                },
                update: function (e) {
                  return this._append(e), this._process(), this;
                },
                finalize: function (e) {
                  return e && this._append(e), this._doFinalize();
                },
                blockSize: 16,
                _createHelper: function (e) {
                  return function (t, r) {
                    return new e.init(r).finalize(t);
                  };
                },
                _createHmacHelper: function (e) {
                  return function (t, r) {
                    return new y.HMAC.init(e, r).finalize(t);
                  };
                },
              })),
              (o.algo = {}));
          return o;
        })(Math)),
      o);
  },
  function (e, t, r) {
    var o, i, n, s, a, l, g, p;
    e.exports =
      ((p = r(0)),
      (i = (o = p).lib),
      (n = i.WordArray),
      (s = i.Hasher),
      (a = o.algo),
      (l = []),
      (g = a.SHA1 =
        s.extend({
          _doReset: function () {
            this._hash = new n.init([
              1732584193, 4023233417, 2562383102, 271733878, 3285377520,
            ]);
          },
          _doProcessBlock: function (e, t) {
            for (
              var r = this._hash.words,
                o = r[0],
                i = r[1],
                n = r[2],
                s = r[3],
                a = r[4],
                g = 0;
              g < 80;
              g++
            ) {
              if (g < 16) l[g] = 0 | e[t + g];
              else {
                var p = l[g - 3] ^ l[g - 8] ^ l[g - 14] ^ l[g - 16];
                l[g] = (p << 1) | (p >>> 31);
              }
              var u = ((o << 5) | (o >>> 27)) + a + l[g];
              (u +=
                g < 20
                  ? 1518500249 + ((i & n) | (~i & s))
                  : g < 40
                  ? 1859775393 + (i ^ n ^ s)
                  : g < 60
                  ? ((i & n) | (i & s) | (n & s)) - 1894007588
                  : (i ^ n ^ s) - 899497514),
                (a = s),
                (s = n),
                (n = (i << 30) | (i >>> 2)),
                (i = o),
                (o = u);
            }
            (r[0] = (r[0] + o) | 0),
              (r[1] = (r[1] + i) | 0),
              (r[2] = (r[2] + n) | 0),
              (r[3] = (r[3] + s) | 0),
              (r[4] = (r[4] + a) | 0);
          },
          _doFinalize: function () {
            var e = this._data,
              t = e.words,
              r = 8 * this._nDataBytes,
              o = 8 * e.sigBytes;
            return (
              (t[o >>> 5] |= 128 << (24 - (o % 32))),
              (t[14 + (((o + 64) >>> 9) << 4)] = Math.floor(r / 4294967296)),
              (t[15 + (((o + 64) >>> 9) << 4)] = r),
              (e.sigBytes = 4 * t.length),
              this._process(),
              this._hash
            );
          },
          clone: function () {
            var e = s.clone.call(this);
            return (e._hash = this._hash.clone()), e;
          },
        })),
      (o.SHA1 = s._createHelper(g)),
      (o.HmacSHA1 = s._createHmacHelper(g)),
      p.SHA1);
  },
  function (e, t, r) {
    var o;
    e.exports =
      ((o = r(0)),
      r(4),
      void (
        o.lib.Cipher ||
        (function (e) {
          var t = o,
            r = t.lib,
            i = r.Base,
            n = r.WordArray,
            s = r.BufferedBlockAlgorithm,
            a = t.enc,
            l = (a.Utf8, a.Base64),
            g = t.algo.EvpKDF,
            p = (r.Cipher = s.extend({
              cfg: i.extend(),
              createEncryptor: function (e, t) {
                return this.create(this._ENC_XFORM_MODE, e, t);
              },
              createDecryptor: function (e, t) {
                return this.create(this._DEC_XFORM_MODE, e, t);
              },
              init: function (e, t, r) {
                (this.cfg = this.cfg.extend(r)),
                  (this._xformMode = e),
                  (this._key = t),
                  this.reset();
              },
              reset: function () {
                s.reset.call(this), this._doReset();
              },
              process: function (e) {
                return this._append(e), this._process();
              },
              finalize: function (e) {
                return e && this._append(e), this._doFinalize();
              },
              keySize: 4,
              ivSize: 4,
              _ENC_XFORM_MODE: 1,
              _DEC_XFORM_MODE: 2,
              _createHelper: (function () {
                function e(e) {
                  return 'string' == typeof e ? T : b;
                }
                return function (t) {
                  return {
                    encrypt: function (r, o, i) {
                      return e(o).encrypt(t, r, o, i);
                    },
                    decrypt: function (r, o, i) {
                      return e(o).decrypt(t, r, o, i);
                    },
                  };
                };
              })(),
            })),
            u =
              ((r.StreamCipher = p.extend({
                _doFinalize: function () {
                  return this._process(!0);
                },
                blockSize: 1,
              })),
              (t.mode = {})),
            y = (r.BlockCipherMode = i.extend({
              createEncryptor: function (e, t) {
                return this.Encryptor.create(e, t);
              },
              createDecryptor: function (e, t) {
                return this.Decryptor.create(e, t);
              },
              init: function (e, t) {
                (this._cipher = e), (this._iv = t);
              },
            })),
            c = (u.CBC = (function () {
              var t = y.extend();
              function r(t, r, o) {
                var i = this._iv;
                if (i) {
                  var n = i;
                  this._iv = e;
                } else n = this._prevBlock;
                for (var s = 0; s < o; s++) t[r + s] ^= n[s];
              }
              return (
                (t.Encryptor = t.extend({
                  processBlock: function (e, t) {
                    var o = this._cipher,
                      i = o.blockSize;
                    r.call(this, e, t, i),
                      o.encryptBlock(e, t),
                      (this._prevBlock = e.slice(t, t + i));
                  },
                })),
                (t.Decryptor = t.extend({
                  processBlock: function (e, t) {
                    var o = this._cipher,
                      i = o.blockSize,
                      n = e.slice(t, t + i);
                    o.decryptBlock(e, t),
                      r.call(this, e, t, i),
                      (this._prevBlock = n);
                  },
                })),
                t
              );
            })()),
            d = ((t.pad = {}).Pkcs7 = {
              pad: function (e, t) {
                for (
                  var r = 4 * t,
                    o = r - (e.sigBytes % r),
                    i = (o << 24) | (o << 16) | (o << 8) | o,
                    s = [],
                    a = 0;
                  a < o;
                  a += 4
                )
                  s.push(i);
                var l = n.create(s, o);
                e.concat(l);
              },
              unpad: function (e) {
                var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
                e.sigBytes -= t;
              },
            }),
            f =
              ((r.BlockCipher = p.extend({
                cfg: p.cfg.extend({ mode: c, padding: d }),
                reset: function () {
                  p.reset.call(this);
                  var e = this.cfg,
                    t = e.iv,
                    r = e.mode;
                  if (this._xformMode == this._ENC_XFORM_MODE)
                    var o = r.createEncryptor;
                  else (o = r.createDecryptor), (this._minBufferSize = 1);
                  this._mode && this._mode.__creator == o
                    ? this._mode.init(this, t && t.words)
                    : ((this._mode = o.call(r, this, t && t.words)),
                      (this._mode.__creator = o));
                },
                _doProcessBlock: function (e, t) {
                  this._mode.processBlock(e, t);
                },
                _doFinalize: function () {
                  var e = this.cfg.padding;
                  if (this._xformMode == this._ENC_XFORM_MODE) {
                    e.pad(this._data, this.blockSize);
                    var t = this._process(!0);
                  } else (t = this._process(!0)), e.unpad(t);
                  return t;
                },
                blockSize: 4,
              })),
              (r.CipherParams = i.extend({
                init: function (e) {
                  this.mixIn(e);
                },
                toString: function (e) {
                  return (e || this.formatter).stringify(this);
                },
              }))),
            h = ((t.format = {}).OpenSSL = {
              stringify: function (e) {
                var t = e.ciphertext,
                  r = e.salt;
                if (r)
                  var o = n
                    .create([1398893684, 1701076831])
                    .concat(r)
                    .concat(t);
                else o = t;
                return o.toString(l);
              },
              parse: function (e) {
                var t = l.parse(e),
                  r = t.words;
                if (1398893684 == r[0] && 1701076831 == r[1]) {
                  var o = n.create(r.slice(2, 4));
                  r.splice(0, 4), (t.sigBytes -= 16);
                }
                return f.create({ ciphertext: t, salt: o });
              },
            }),
            b = (r.SerializableCipher = i.extend({
              cfg: i.extend({ format: h }),
              encrypt: function (e, t, r, o) {
                o = this.cfg.extend(o);
                var i = e.createEncryptor(r, o),
                  n = i.finalize(t),
                  s = i.cfg;
                return f.create({
                  ciphertext: n,
                  key: r,
                  iv: s.iv,
                  algorithm: e,
                  mode: s.mode,
                  padding: s.padding,
                  blockSize: e.blockSize,
                  formatter: o.format,
                });
              },
              decrypt: function (e, t, r, o) {
                return (
                  (o = this.cfg.extend(o)),
                  (t = this._parse(t, o.format)),
                  e.createDecryptor(r, o).finalize(t.ciphertext)
                );
              },
              _parse: function (e, t) {
                return 'string' == typeof e ? t.parse(e, this) : e;
              },
            })),
            m = ((t.kdf = {}).OpenSSL = {
              execute: function (e, t, r, o) {
                o || (o = n.random(8));
                var i = g.create({ keySize: t + r }).compute(e, o),
                  s = n.create(i.words.slice(t), 4 * r);
                return (
                  (i.sigBytes = 4 * t), f.create({ key: i, iv: s, salt: o })
                );
              },
            }),
            T = (r.PasswordBasedCipher = b.extend({
              cfg: b.cfg.extend({ kdf: m }),
              encrypt: function (e, t, r, o) {
                var i = (o = this.cfg.extend(o)).kdf.execute(
                  r,
                  e.keySize,
                  e.ivSize
                );
                o.iv = i.iv;
                var n = b.encrypt.call(this, e, t, i.key, o);
                return n.mixIn(i), n;
              },
              decrypt: function (e, t, r, o) {
                (o = this.cfg.extend(o)), (t = this._parse(t, o.format));
                var i = o.kdf.execute(r, e.keySize, e.ivSize, t.salt);
                return (o.iv = i.iv), b.decrypt.call(this, e, t, i.key, o);
              },
            }));
        })()
      ));
  },
  function (e, t, r) {
    var o, i, n;
    e.exports =
      ((n = r(0)),
      (i = (o = n).lib.WordArray),
      (o.enc.Base64 = {
        stringify: function (e) {
          var t = e.words,
            r = e.sigBytes,
            o = this._map;
          e.clamp();
          for (var i = [], n = 0; n < r; n += 3)
            for (
              var s =
                  (((t[n >>> 2] >>> (24 - (n % 4) * 8)) & 255) << 16) |
                  (((t[(n + 1) >>> 2] >>> (24 - ((n + 1) % 4) * 8)) & 255) <<
                    8) |
                  ((t[(n + 2) >>> 2] >>> (24 - ((n + 2) % 4) * 8)) & 255),
                a = 0;
              a < 4 && n + 0.75 * a < r;
              a++
            )
              i.push(o.charAt((s >>> (6 * (3 - a))) & 63));
          var l = o.charAt(64);
          if (l) for (; i.length % 4; ) i.push(l);
          return i.join('');
        },
        parse: function (e) {
          var t = e.length,
            r = this._map,
            o = this._reverseMap;
          if (!o) {
            o = this._reverseMap = [];
            for (var n = 0; n < r.length; n++) o[r.charCodeAt(n)] = n;
          }
          var s = r.charAt(64);
          if (s) {
            var a = e.indexOf(s);
            -1 !== a && (t = a);
          }
          return (function (e, t, r) {
            for (var o = [], n = 0, s = 0; s < t; s++)
              if (s % 4) {
                var a = r[e.charCodeAt(s - 1)] << ((s % 4) * 2),
                  l = r[e.charCodeAt(s)] >>> (6 - (s % 4) * 2);
                (o[n >>> 2] |= (a | l) << (24 - (n % 4) * 8)), n++;
              }
            return i.create(o, n);
          })(e, t, o);
        },
        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      }),
      n.enc.Base64);
  },
  function (e, t, r) {
    var o, i, n, s, a, l, g, p;
    e.exports =
      ((p = r(0)),
      r(1),
      r(5),
      (i = (o = p).lib),
      (n = i.Base),
      (s = i.WordArray),
      (a = o.algo),
      (l = a.MD5),
      (g = a.EvpKDF =
        n.extend({
          cfg: n.extend({ keySize: 4, hasher: l, iterations: 1 }),
          init: function (e) {
            this.cfg = this.cfg.extend(e);
          },
          compute: function (e, t) {
            for (
              var r = this.cfg,
                o = r.hasher.create(),
                i = s.create(),
                n = i.words,
                a = r.keySize,
                l = r.iterations;
              n.length < a;

            ) {
              g && o.update(g);
              var g = o.update(e).finalize(t);
              o.reset();
              for (var p = 1; p < l; p++) (g = o.finalize(g)), o.reset();
              i.concat(g);
            }
            return (i.sigBytes = 4 * a), i;
          },
        })),
      (o.EvpKDF = function (e, t, r) {
        return g.create(r).compute(e, t);
      }),
      p.EvpKDF);
  },
  function (e, t, r) {
    var o, i, n, s;
    e.exports =
      ((o = r(0)),
      (n = (i = o).lib.Base),
      (s = i.enc.Utf8),
      void (i.algo.HMAC = n.extend({
        init: function (e, t) {
          (e = this._hasher = new e.init()),
            'string' == typeof t && (t = s.parse(t));
          var r = e.blockSize,
            o = 4 * r;
          t.sigBytes > o && (t = e.finalize(t)), t.clamp();
          for (
            var i = (this._oKey = t.clone()),
              n = (this._iKey = t.clone()),
              a = i.words,
              l = n.words,
              g = 0;
            g < r;
            g++
          )
            (a[g] ^= 1549556828), (l[g] ^= 909522486);
          (i.sigBytes = n.sigBytes = o), this.reset();
        },
        reset: function () {
          var e = this._hasher;
          e.reset(), e.update(this._iKey);
        },
        update: function (e) {
          return this._hasher.update(e), this;
        },
        finalize: function (e) {
          var t = this._hasher,
            r = t.finalize(e);
          return t.reset(), t.finalize(this._oKey.clone().concat(r));
        },
      })));
  },
  function (e, t) {
    var r;
    r = (function () {
      return this;
    })();
    try {
      r = r || new Function('return this')();
    } catch (e) {
      'object' == typeof window && (r = window);
    }
    e.exports = r;
  },
  function (e, t, o) {
    var i,
      n,
      s,
      a,
      l,
      g,
      p,
      u,
      y = o(3),
      c = o(8),
      d = o(1),
      f = o(10),
      h = o(11),
      b = o(12),
      m = o(13),
      T = o(14),
      S = 'AIzaSyCjc_pVEDi4qsv5MtC2dMXzpIaDoRFLsxw',
      M = 'ynxQdNo4qc38Ms4WoHDSaHK3Pvaw7CYqJZZilRHT65g=',
      F = 'https://youtubei.googleapis.com',
      R = 1,
      _ = -4,
      E = -3,
      B = 3,
      v = {
        can_play: !0,
        should_embed: !0,
        should_reload_script: !0,
        url: null,
      };
    function w() {
      return (
        !p.device ||
        new Set([31214, 57388, 78339, 84541]).has(p.kidService.getKid().id)
      );
    }
    function O() {
      return i && n
        ? Promise.resolve()
        : p.nativeStorage && p.nativeStorage.constructor.installed()
        ? Promise.all([
            p.nativeStorage.getItem('device_id'),
            p.nativeStorage.getItem('device_key'),
          ])
            .then(function (e) {
              (i = e[0]), (n = e[1]);
            })
            .catch(function (e) {
              return (
                2 != e.code &&
                  (console.error(
                    'Failed to retrieve device ID from storage',
                    e
                  ),
                  console.error(JSON.stringify(e))),
                new Promise(function (e, t) {
                  p.http.sendRequest(
                    F +
                      '/deviceregistration/v1/devices?key=' +
                      S +
                      '&rawDeviceId=' +
                      p.device.uuid,
                    {
                      method: 'post',
                      data: new Uint8Array(),
                      serializer: 'raw',
                      headers: { 'User-Agent': z() },
                    },
                    e,
                    t
                  );
                })
                  .then(function (e) {
                    var t = JSON.parse(e.data);
                    (i = t.id),
                      (n = A(t.key, M)),
                      p.nativeStorage.setItem('device_id', i),
                      p.nativeStorage.setItem('device_key', n);
                  })
                  .catch(function (e) {
                    throw (
                      (console.error('Failed to register device', e),
                      console.error(JSON.stringify(e)),
                      e)
                    );
                  })
              );
            })
        : Promise.reject(new Error('Native storage plugin is not installed.'));
    }
    function C(e, t) {
      return new Promise((r, o) =>
        p.http.sendRequest(
          e,
          {
            method: 'post',
            serializer: 'raw',
            responseType: 'arraybuffer',
            data: t,
            headers: N(i, e, t, n),
          },
          r,
          o
        )
      );
    }
    function A(e, t) {
      var r = h.create(y.parse(t).words, 16),
        o = y.parse(e),
        i = o.sigBytes - 13 - 4,
        n = I(o, 13, i);
      15 & i && (n.sigBytes += 16 - (15 & i));
      var s = c.decrypt({ ciphertext: n }, r, {
        iv: I(o, 5, 8).concat(h.create([0, 0])),
        mode: b,
        padding: m,
      });
      return (
        s.sigBytes > 0 && s.sigBytes > i && (s.sigBytes = i), y.stringify(s)
      );
    }
    function I(e, t, r) {
      for (var o = new Uint8Array(r), i = 0; i < r; i++)
        o[i] =
          (e.words[Math.floor((t + i) / 4)] >> (8 * (3 - ((t + i) % 4)))) & 255;
      return h.create(o);
    }
    function j(e, t) {
      return {
        url:
          F +
          '/youtubei/v1/player?key=' +
          t +
          '&t=' +
          D(h.random(9)) +
          '&id=' +
          e,
        body: P(e),
      };
    }
    function D(e) {
      return k(y.stringify(e)).replace(/\+/g, '-').replace(/\//g, '_');
    }
    function P(e) {
      var t = new T.PlayerRequest(),
        r = W();
      t.setB1(r), t.setVideoid(e);
      var o = new T.PlayerRequest.App();
      'iOS' === p.device.platform
        ? (o.setF4(0),
          o.setF5(375),
          o.setSdk('video_format=22&sdkv=i.14.38&output=xml_vast2'))
        : (o.setName('android-google'),
          o.setF4(59551),
          o.setF5(202),
          o.setSdk('sdkv=a.14.38.3&output=xml_vast2'));
      var i = new T.PlayerRequest.G4();
      return i.setApp(o), t.setG4(i), t.serializeBinary();
    }
    function W(e) {
      var t = new T.B1(),
        r = new T.Client();
      r.setManufacturer(p.device.manufacturer)
        .setDevice(p.device.model)
        .setF16(5)
        .setVersion('17.40.5')
        .setPlatform(p.device.platform)
        .setAnotherversion('14.3.0.18C66')
        .setLanguage('en-US')
        .setLocale('US')
        .setF37(414)
        .setF38(736)
        .setF41(3)
        .setF46(1)
        .setF55(414)
        .setF56(736)
        .setF61(3)
        .setF65(1077936128)
        .setF67(660)
        .setF78(2)
        .setS80('')
        .setF95(2085896);
      var o = new T.E62();
      o.setS1(
        'CL_V9KAGEMaFrQUQ7YqtBRDXka0FEOuZrQUQ6p2tBRDtuq0FENm7rQUQmNStBRDS3K0FEM3grQUQ6-StBRCI6a0FEKXvrQUQjPKtBRDX9a0FEJ79rQUQ94iuBRC4i64FEI6WrgUQ9ZauBRDkl64FEMWargUQp52uBRCGoa4FEImrrgUQibGuBRCCta4FEIa1rgUQvrauBRCgua4FEL68rgUQrcKuBRDSx64FEObNrgUQsc-uBRDI0a4FEOTWrgUQjteuBRCQ164FEO7ZrgUQzN-uBRDm4K4FEOfhrgUQhueuBRDQ7K4FELzyrgUQifWuBRDY9q4FEI73rgUQ5_euBRDc-K4FEO_6rgUQ8_quBRD1-q4FEJz7rgUQzvuuBRCggK8FEM2CrwUQ7YavBRDAiK8FEMyMrwUQhY2vBRCUja8FEMeNrwUQgI-vBRDqj68FEL-QrwUQhZGvBRCLka8FEMeTrwUQ35SvBRCilq8FEIWXrwUQqM-oFxoyQUFGbVBLYjdqMlljTXdjX21HY1pyS0Vmam9ScDRSTnF0SWs1MXBidzJvbTJuRkd6cVEiMkFBRm1QS2I3ajJZY013Y19tR2NacktFZmpvUnA0Uk5xdElrNTFwYncyb20ybkZHenFRKjBDQU1TSGcwTGlkQ3BBdGdGNWhXekk5NEVGUW0yck5ZTWxCcnA0d2JuMEFUUElnPT0%3D'
      ),
        o.setS3(
          'CPyA-aAGEhQxNzkyMzEwMDE0MDczNjI0MDQ0ORi_1fSgBjIyQUFGbVBLYjdqMlljTXdjX21HY1pyS0Vmam9ScDRSTnF0SWs1MXBidzJvbTJuRkd6cVE6MkFBRm1QS2I3ajJZY013Y19tR2NacktFZmpvUnA0Uk5xdElrNTFwYncyb20ybkZHenFRQjBDQU1TSGcwTGlkQ3BBdGdGNWhXekk5NEVGUW0yck5ZTWxCcnA0d2JuMEFUUElnPT0%3D'
        ),
        o.setS5(
          'CPyA-aAGEhQxNjg4Mjg3MTA3NDkzNjU5MTY3Mxj8gPmgBiiU5PwSKP7w_BIoufX8Eiie__wSKIGC_RIo3JP9EijRn_0SKKmq_RIo4az9EijLrf0SKMay_RIoqrT9EijOwP0SKJnG_RIo0sv9EiibzP0SKNfM_RIopdD9EijK2P0SKPne_RIo89_9EiiK4P0SKMng_RIo3OD9EiiT5f0SKIDz_RIoyfn9EijbgP4SKMyB_hIo44H-EijEgv4SKOiC_hIoyYT-EijKh_4SKN-I_hIo74n-Eijxif4SKPiL_hIo5o7-Eijojv4SKPmO_hIorZD-EijvkP4SKICR_hIonpH-Eij2kf4SKPiS_hIog5X-Eij-mv4SKOef_hIo1aD-EijioP4SKOWg_hIogqL-EijZpv4SKPCn_hIo-af-EiifqP4SKJKq_hIop6z-EiisrP4SKNOs_hIomq3-Eii1rf4SKM-t_hIoga7-EiiKrv4SKLWu_hIozK7-EiiJsf4SKKmy_hIoz7L-EiiAs_4SKMKz_hIo47P-EijttP4SKL-1_hIoxbX-Eijatf4SKOG2_hIyMkFBRm1QS2I3ajJZY013Y19tR2NacktFZmpvUnA0Uk5xdElrNTFwYncyb20ybkZHenFROjJBQUZtUEtiN2oyWWNNd2NfbUdjWnJLRWZqb1JwNFJOcXRJazUxcGJ3Mm9tMm5GR3pxUUIsQ0FNU0hBME5vdGY2RmI0X2p3SERCaFVKM2NfQ0RLaWJBb3Z1QWN1LWlRQT0%3D'
        ),
        r.setE62(o);
      var i = Uint8Array.from(
        atob(
          'IMv+uPvkzLealAEgierjmpqe4s/cASD/9Zi0i/Lf4hsgkJ+P0uqvouWNASCv85DDrb7byVUg77CUzfCYgO2FASD9s6XTzMug6D4g0M6B76jIov/jASDL6L727MOU56YBIMSeh6uuyo63sAEgpdeVo+jqv7fiASCTyaHJx/vD6UAgu9qC886etpjDASDoz7bujrmgqxMg4qHAsObfl/IvINjX3s7g9fSSaSCIgvuItdKWpsUBIMPE47rzi7Wb1QEgpPySh5LZ7v5FIK/p4sD/rNHdCCCIxc35qqS6k74BIJvfpZvAp82IsAEgw+DZqu6Ii7aSASCOgq7Q25bPjXkgkM3z743XvJ34ASCcjeyYyYnWxK4BIJPFvLmH7sTT3gEg79HQpaezv4SjASCnvOXX/rXwsmog3Yaet8PkqZhLIMaQw8D977vRYCDQh8bF1arth2wgnrvi8Prugq7uASDjk+bKhLviktMBIITp+Zz/h9/wLCCl99LT+LKT9/wBILv+rM+SsPXi+gEgo5+VlqaT2aQRII7M7dmWv5G6JiDK7qyuwqC5pncgwZX6+/HSm9xzII/JrOTt25rSHCCK4+mC6rrp+ewBIO+mufiL2I67eyCYpZDN/trF9osBIKSK//mCmvah/gEgg7fgtc/tn/2oASDZ3facubiI8+cBILrqir2wmKz0uQEgtevmveKLhtdWIPSU9bfJhYjI+AEg1orJg6XE8PaKASDcxPaU1MmnhjUg7tCI6b/6kK1mIIbClbiGooWLUCCbor3j45HAztIBIIL0tLK8ra76ZCCrm6Dihseqh0gg99jw3Jf64MLhASCCga2piOuQyq8BINjLnrKy+ZLSmwEg7tiw4ePNj8VrIPqx953Wyb3dmQEg+97sycmakaNg'
        ),
        (e) => e.charCodeAt(0)
      );
      r.setBb84(i);
      var n = new T.E97();
      n.setF1(2), n.setF2(32162272), r.setE97(n);
      var s = new T.E100(),
        a = new T.Ep1();
      a.setF1(959), a.setF3(1), s.setEp1(a), r.setE100(s), t.setClient(r);
      var l = new T.T3();
      l.setRestrictedMode(e && e.restrictedMode), l.setF15(0), t.setT3(l);
      var g = new T.T5();
      g.setS33(''), t.setT5(g);
      var u = new T.T6();
      u.setS2(''), t.setT6(u);
      var y = new T.T9(),
        c = new T.Pp1();
      return (
        c.setS1('ms'),
        c.setS2(
          'BXR_-k1-JOJndLIHBRq48RDrG2xXmQ52sVnn8wSyQX6UzjlPGJGyB7tnzK2u0VvJeBfvIEWVKIOxSAPNlPZDI0ZiQrfWTYYz7VU4oGpyLKbwEk0OIYS6WjwleHTTTCZABiVYRj0WKt_SkTnjYgO0mpvqdZ7KUsxpsfrRniGA0cm3ZQsF8ZkX50LeSwdHZgXmpiKF0Bbl1QsBye1pzGRwRi9Wyp8744gs7G9WvdjBv_ysQdBYPndwMzd_jtdxorDcytOcx81ygae4N5wT8C7I9k97E3Ji79YIv73ueTXQ-rwgwQdoaXQcmWTqsoy-S5RRhJqbmigATZRhu_hJGozS3g'
        ),
        y.setPp1(c),
        y.setF6(4),
        t.setT9(y),
        t
      );
    }
    function N(e, t, r, o) {
      return {
        'User-Agent': z(),
        'Content-Type': 'application/x-protobuf',
        'X-GOOG-API-FORMAT-VERSION': '2',
        'X-Goog-Device-Auth': L(e, t, r, o),
      };
    }
    function z() {
      if ('undefined' == typeof window) return '';
      var e = window.navigator.userAgent.match(/\([^\)]+\)/),
        t = e ? e[0] : '';
      return (
        'com.google.' +
        (p.device.platform ? p.device.platform.toLowerCase() : 'android') +
        '.youtube/14.44.3 ' +
        t
      );
    }
    function L(e, t, r, o) {
      for (var i = [], n = 0; n < t.length; n++) i.push(255 & t.charCodeAt(n));
      return (
        i.push(0),
        'device_id=' +
          e +
          ',data=' +
          U(new Uint8Array(i), o, 4) +
          ',content=' +
          U(r, o, 20)
      );
    }
    function U(e, t, r) {
      var o = y.parse(t),
        i = h.create(d(o).words, 4),
        n = f(h.create(e), o);
      20 != r && (n = h.create(n.words, r));
      var s = h.create([0], 1).concat(i).concat(n);
      return k(y.stringify(s));
    }
    function k(e) {
      return e
        ? e.length > 2 && '=' == e[e.length - 2]
          ? e.substring(0, e.length - 2)
          : e.length > 1 && '=' == e[e.length - 1]
          ? e.substring(0, e.length - 1)
          : e
        : e;
    }
    function x(e) {
      if (e.status == R || e.status == _)
        throw (
          (console.error('Getting video details failed with timeout.', e),
          console.error(JSON.stringify(e)),
          new l(e.error))
        );
      if (e.status == E || e.status == B)
        throw (
          (console.error('Getting video details failed - no Internet.', e),
          console.error(JSON.stringify(e)),
          g ? new g(e.error) : new Error(e.error))
        );
      if (e.status >= 500)
        throw (
          (console.error('Getting video details failed with server error.'),
          console.error(JSON.stringify(e)),
          new a(e))
        );
      if (e.status >= 400)
        return (
          console.error('Getting video details failed with ' + e.status),
          console.error(JSON.stringify(e)),
          p.errorReporting.captureMessage('Will embed 4 - ' + e.status, e),
          v
        );
      var t = e.error || e.message || '';
      return (
        e.status && (t += ' (' + e.status + ')'),
        console.error(t),
        console.error(e),
        console.error(JSON.stringify(e)),
        v
      );
    }
    function H(e) {
      var t = T.PlayerResponse.deserializeBinary(e);
      if (!t) return v;
      var r = t.getPlayabilityStatus();
      if (!r) return v;
      var o = G(r);
      if (!o.can_play) return o;
      var i = t.getStreammap();
      if (!i) return console.error('Stream map is not set'), v;
      var n = i.getHlsUrl(),
        s = [],
        a = t.getSubtitlesObject();
      if (a && a.getSub516())
        for (
          var l = a.getSub516().getSubtitleList(), g = 0;
          g < l.length;
          g++
        ) {
          var p = l[g];
          s.push({
            url: p.getUrl() + '&fmt=vtt',
            label: Q(p.getLabel()),
            srclang: p.getSrclang(),
          });
        }
      return { can_play: !0, should_embed: !n, url: n, subtitles: s };
    }
    function G(e) {
      var t = T.PlayerResponse.PlayabilityStatus.Code;
      if (e.getStatus() == t.OK) return { can_play: !0 };
      if (e.getStatus() == t.LOGIN_REQUIRED)
        return {
          can_play: !1,
          playability_message:
            'This video is not available. Try watching something else.',
        };
      if (e.getStatus() == t.CONTENT_CHECK_REQUIRED)
        return {
          can_play: !1,
          playability_message:
            "This video is not available. Let's watch something else!",
        };
      var r = e.getReason();
      return r.startsWith('This video is restricted')
        ? {
            can_play: !1,
            playability_message:
              'This video is restricted. Check your firewall settings.',
          }
        : ((function (e) {
            return (
              'This live stream recording is not available.' != e &&
              'The uploader has not made this video available in your country' !=
                e &&
              'This video is not available' != e &&
              'This video is unavailable' != e &&
              !e.startsWith('Premieres in ') &&
              !e.startsWith('This live event will begin in ') &&
              !e.startsWith('This video has been removed') &&
              -1 == e.indexOf('copyright')
            );
          })(r) && p.errorReporting.captureMessage(r),
          { can_play: !1, playability_message: r });
    }
    function V(e) {
      return e.startsWith('https') ? e : 'https:' + e;
    }
    function q(e, t) {
      var r = [];
      return (
        Y(r, e, { kind: 'channel' }),
        Y(r, t, { kind: 'channel' }),
        Y(r, t, { kind: 'video', locked: !1 }),
        Y(r, e, { kind: 'video', locked: !1 }),
        r.length < 15 &&
          (Y(r, e, { kind: 'video', locked: !0 }),
          Y(r, t, { kind: 'video', locked: !0 })),
        r
      );
    }
    function Y(e, t, r) {
      for (var o = 0; o < t.length; o++) {
        var i = t[o];
        i.kind != r.kind ||
          ('locked' in r && i.locked != r.locked) ||
          ('channel' == r.kind && 'UC-9-kyTW8ZkZNDHQJ6FgpwQ' == i.id) ||
          e.push(i);
      }
    }
    function K(e) {
      var t = F + '/youtubei/v1/browse?key=' + S,
        r = new T.BrowseRequest();
      return (
        r.setChannelId(e),
        r.setB1(W({ restrictedMode: !1 })),
        { url: t, body: r.serializeBinary() }
      );
    }
    function J(e) {
      var t = T.ChannelResponse.deserializeBinary(e);
      if (!t) return null;
      var r = t.getB13();
      if (!r) {
        var o = (b = t.getB9().getC58173().getG1List())[0]
          .getC58174()
          .getC4()
          .getS49()
          .getS1List()[0]
          .getS501()
          .getResultList()[0]
          .getCat153()
          .getFox172()
          .getOwl1()
          .getFish168()
          .getDeer5()
          .getAra362()
          .getMsg4();
        throw new Error(o);
      }
      var i = r.getC361(),
        n = null,
        s = '',
        a = '',
        l = '';
      if (i) {
        a = i.getTitle();
        var g = i.getResult();
        if (g) {
          var p = g
            .getCat153()
            .getFox172()
            .getOwl1()
            .getFish168()
            .getDeer5()
            .getRhino353()
            .getPig2();
          if (p) {
            var u = p.getPossum1();
            if (u) {
              var y = u.getImg1();
              y || (y = u.getTurkey8() && u.getTurkey8().getImg1()),
                y && (n = y.getTh1().getThumb1().getUrl());
            }
            var c = p.getFinch15();
            c && (l = c.getDescription());
            var d = p.getStats18();
            d &&
              (s = d.getSubscriberCount()) &&
              (s = s.replace(/ subscribers?/, ''));
          }
        }
      }
      for (
        var f = null, h = null, b = t.getB9().getC58173().getG1List(), m = 0;
        m < b.length;
        m++
      ) {
        var S = b[m].getC58174();
        S &&
          ('Videos' != S.getTab()
            ? 'Playlists' != S.getTab() ||
              (h = S.getC4()
                .getS49()
                .getAnt2()
                .getBoa604()
                .getContinuationToken())
            : (f = S.getC4()
                .getS49()
                .getAnt2()
                .getBoa604()
                .getContinuationToken()));
      }
      return {
        subscriber_count: s,
        title: a,
        image: n,
        description: l,
        videos_tab_token: f,
        playlists_tab_token: h,
      };
    }
    function $(e) {
      var t = e.getP1List().reduce(function (e, t) {
          var r = t.getVideo();
          if (r) {
            var o = r.getChannel() && r.getChannel().getC1();
            e.push({
              id: r.getId(),
              title: r.getTitle().getT1().getText(),
              channel_id: o ? o.getMule5().getH().getId() : '',
              channel_title: o ? o.getTitle() : '',
            });
          }
          return e;
        }, []),
        r = null,
        o = e.getP4() && e.getP4().getM520();
      return (
        o && (r = o.getContinuationToken()),
        { videos: t, continuation_token: r }
      );
    }
    function X(e, t, r) {
      for (var o = 0; o < e.length; o++) {
        var i = e[o].getCat153();
        if (i) {
          var n = i.getFox172().getOwl1().getFish168().getDeer5();
          if (n)
            if ('video' == t) {
              var s = n.getSnake232();
              if (!s) continue;
              var a = s.getBird25();
              if (!a) continue;
              var l = a.getTurtle1().getTt2();
              l &&
                r.push({
                  kind: 'video',
                  id: a.getFrog3().getHare169().getDuck486().getId(),
                  title: l.getT1(),
                });
            } else {
              var g = null,
                p = null,
                u = n && n.getPl202();
              if (u) {
                var y = u.getDog16(),
                  c = y.getImg1();
                (p = y.getFrog3().getHare169()),
                  (g = {
                    title: y.getTt2().getT1(),
                    image: c.getTh1().getThumb1().getUrl(),
                    video_count: c.getLabel6(),
                  });
              }
              (g.id = p.getH().getId().substring(2)), r.push(g);
            }
        }
      }
    }
    function Z(e) {
      var t = F + '/youtubei/v1/browse?key=' + S,
        r = new T.BrowseRequest();
      r.setContinuationToken(e);
      var o = new T.Wasp26();
      return (
        o.setF2(0).setF5(32001561),
        r.setWasp26(o),
        r.setF29(5),
        r.setB1(W({ restrictedMode: !1 })),
        { url: t, body: r.serializeBinary() }
      );
    }
    function Q(e) {
      return e && e.getTextHolder() ? e.getTextHolder().getText() : '';
    }
    function ee(e, t) {
      return O()
        .then(function () {
          var t = Z(e);
          return C(t.url, t.body);
        })
        .then(function (e) {
          return (function (e, t) {
            r = T.ChannelTabResponse.deserializeBinary(e);
            var o = r.getB10() && r.getB10().getS49();
            if (!o)
              return 'video' == t
                ? { videos: [], continuation_token: null }
                : { playlists: [], continuation_token: null };
            for (
              var i = [], n = o.getS1List(), s = null, a = 0;
              a < n.length;
              a++
            ) {
              var l = n[a],
                g = l.getS501();
              if (g) {
                X(g.getResultList(), t, i);
                var p = g.getM2() && g.getM2().getM520();
                p && (s = p.getContinuationToken());
              }
              var u = l.getC518();
              if (u) {
                var y = u.getCollie5(),
                  c = y.getC579();
                c && X(c.getResultList(), t, i);
                var d = y.getHawk514();
                d && X(d.getResultList(), t, i);
              }
            }
            return 'video' == t
              ? { videos: i, continuation_token: s }
              : { playlists: i, continuation_token: s };
          })(e.data, t);
        });
    }
    function te(e, t) {
      return O()
        .then(function () {
          var t = Z(e);
          return C(t.url, t.body);
        })
        .then(function (e) {
          return (function (e, t) {
            var o = [],
              i = null;
            r = T.ChannelTabResponse.deserializeBinary(e);
            var n = r.getB10() && r.getB10().getS501();
            if (n) {
              X(n.getResultList(), t, o);
              var s = n.getM2() && n.getM2().getM520();
              s && (i = s.getContinuationToken());
            }
            return 'video' == t
              ? { videos: o, continuation_token: i }
              : { playlists: o, continuation_token: i };
          })(e.data, t);
        });
    }
    function re(e) {
      var t = e.match(/([^;]+); codecs=\"([^\"]+)\"/);
      return t ? { mimeType: t[1], codecs: t[2] } : { mimeType: e, codecs: '' };
    }
    e.exports = {
      buildDeviceAuthHeader: L,
      buildPlayerRequest: j,
      copyBytes: I,
      decryptDeviceKey: A,
      generateMac: U,
      getRelatedVideos: function (e) {
        return p.device
          ? O()
              .then(function () {
                var t = (function (e) {
                  var t = F + '/youtubei/v1/next?key=' + S,
                    r = new T.RelatedRequest();
                  r.setVideoId(e),
                    r.setB1(W()),
                    r.setS6(''),
                    r.setF9(0),
                    r.setF10(0),
                    r.setF26(0),
                    r.setF30(0);
                  var o = r.serializeBinary();
                  return { url: t, body: o };
                })(e);
                return C(t.url, t.body);
              })
              .then(function (e) {
                return (function (e) {
                  var t = T.RelatedResponse.deserializeBinary(e);
                  if (!t) return [];
                  for (
                    var r = [],
                      o = t.getI7().getE51().getI1().getS49().getS1List(),
                      i = 0;
                    i < o.length;
                    i++
                  ) {
                    var n = o[i].getS501();
                    if (n)
                      for (
                        var s = n.getResultList(), a = 0;
                        a < s.length;
                        a++
                      ) {
                        var l = s[a].getCat153();
                        if (l) {
                          var g = l.getFox172().getOwl1().getFish168();
                          if (g) {
                            var p = g.getDeer5();
                            if (p) {
                              var u = p.getNit232();
                              if (u) {
                                var y = u.getLac18();
                                y &&
                                  r.push({
                                    id: y
                                      .getCroc4()
                                      .getHare169()
                                      .getDuck486()
                                      .getId(),
                                  });
                              }
                            }
                          }
                        }
                      }
                  }
                  return r;
                })(e.data);
              })
              .catch(function (t) {
                return (
                  console.error('Failed to get related videos.', e, t),
                  console.error(JSON.stringify(t)),
                  t.message && console.error(t.message),
                  []
                );
              })
          : Promise.resolve([]);
      },
      getStream: function (e, t) {
        var r = e.filter(function (e) {
          return (
            -1 === e.getCodec().indexOf('video/3gpp') &&
            ('iOS' != p.device.platform ||
              -1 === e.getCodec().indexOf('video/webm'))
          );
        });
        if ('undefined' != typeof localStorage) {
          var o = localStorage.resolution;
          if (o)
            if (
              (s = r.find(function (e) {
                return e.getResolution() == o;
              }))
            )
              return s;
        }
        for (var i = null, n = 0; n < r.length; n++) {
          var s = r[n];
          if (t >= 720 && 'hd720' === s.getQuality()) return s;
          if ('medium' === s.getQuality() && ((i = s), t < 720)) return i;
        }
        return i || e[0];
      },
      getChannelDetails: function (e) {
        return O()
          .then(function () {
            var t = K(e);
            return C(t.url, t.body);
          })
          .then(function (e) {
            return J(e.data);
          })
          .catch(function (t) {
            console.error('Failed to get channel details.', t),
              console.error(JSON.stringify(t)),
              t.message && console.error(t.message),
              'This channel is not available.' != t.message &&
                p.errorReporting.captureMessage(
                  'Failed to get channel details.',
                  { channelId: e, response: t }
                );
            var r =
              t.error ||
              t.message ||
              'Failed to get channel details. Please try again later.';
            throw (
              ((t.status != R &&
                t.status != _ &&
                t.status != E &&
                t.status != B) ||
                (r = 'No Internet. Check your Internet connection.'),
              r)
            );
          });
      },
      getChannelPlaylists: function (e, t) {
        return O()
          .then(function () {
            if (t) return te(t, 'playlist');
            var r = K(e);
            return C(r.url, r.body).then(function (e) {
              return (
                (channelDetails = J(e.data)),
                channelDetails.playlists_tab_token
                  ? ee(channelDetails.playlists_tab_token, 'playlist')
                  : { playlists: [] }
              );
            });
          })
          .catch(function (e) {
            throw (
              (console.error('Failed to get channel playlists.'),
              console.error(e),
              e.message && console.error(e.message),
              e.error || e.message || 'Failed to get channel playlists.')
            );
          });
      },
      getChannelVideos: function (e, t) {
        return O()
          .then(function () {
            return t
              ? te(t, 'video')
              : ee(
                  (function (e) {
                    var t = new T.Tk802();
                    t.setChannelId(e), t.setS3('EgZ2aWRlb3M%3D');
                    var r = new T.Token();
                    r.setTk802(t);
                    var o = r.serializeBinary();
                    return y
                      .stringify(h.create(o))
                      .replace(/\//g, '_')
                      .replace(/\+/g, '-')
                      .replace(/=/g, '%3D');
                  })(e),
                  'video'
                );
          })
          .catch(function (e) {
            throw (
              (console.error('Failed to get channel videos.'),
              console.error(e),
              e.message && console.error(e.message),
              e.error || e.message || 'Failed to get channel videos.')
            );
          });
      },
      getPlaylistVideos: function (e, t) {
        return O()
          .then(function () {
            var r = t ? Z(t) : K('VL' + e);
            return C(r.url, r.body);
          })
          .then(function (e) {
            if (t) {
              if (!(o = T.ChannelTabResponse.deserializeBinary(e.data)))
                return null;
              var r = o.getB10() && o.getB10().getS54681060();
              return r ? $(r) : { videos: [], continuation_token: null };
            }
            var o;
            return (o = T.ChannelResponse.deserializeBinary(e.data))
              ? (function (e) {
                  for (
                    var t = e.getB9().getC58173().getG1List(), r = 0;
                    r < t.length;
                    r++
                  )
                    for (
                      var o = t[r].getC58174().getC4().getS49().getS1List(),
                        i = 0;
                      i < o.length;
                      i++
                    ) {
                      var n = o[i].getS501();
                      if (n) {
                        var s = n.getResultList();
                        for (i = 0; i < s.length; i++) {
                          var a = s[i].getS54681060();
                          if (a) return $(a);
                        }
                      }
                    }
                  return { videos: [], continuation_token: null };
                })(o)
              : null;
          })
          .catch(function (e) {
            throw (
              (console.error('Failed to get playlist videos.'),
              console.error(e),
              e.message && console.error(e.message),
              e.error || e.message || 'Failed to get playlist videos.')
            );
          });
      },
      getVideoDetails: function (e) {
        return w() || 'iOS' !== p.device.platform
          ? Promise.resolve({
              can_play: !0,
              should_embed: !0,
              should_reload_script: !1,
              url: null,
            })
          : O()
              .then(function () {
                var t = j(e, S);
                return C(t.url, t.body);
              })
              .then(function (e) {
                return H(e.data);
              }, x);
      },
      getVideoDetails2: function (e) {
        return w()
          ? Promise.resolve({
              can_play: !0,
              should_embed: !0,
              should_reload_script: !1,
              url: null,
            })
          : O()
              .then(function () {
                return C(
                  F +
                    '/youtubei/v1/player?key=' +
                    S +
                    '&t=' +
                    D(h.random(9)) +
                    '&id=' +
                    e,
                  P(e)
                );
              })
              .then(function (e) {
                return 'iOS' == p.device.platform
                  ? H(e.data)
                  : (function (e) {
                      var t = T.PlayerResponse.deserializeBinary(e);
                      if (!t) return v;
                      var r = t.getPlayabilityStatus();
                      if (!r) return v;
                      var o = G(r);
                      if (!o.can_play) return o;
                      if (r.getLiveInfo())
                        return { can_play: !0, should_embed: !0 };
                      var i = (function (e) {
                        var t = e.getStreammap();
                        if (!t)
                          return console.error('Stream map is not set'), null;
                        const r = s.createDocument(null, 'MPD', null);
                        r.documentElement.setAttribute(
                          'mediaPresentationDuration',
                          'PT' + e.getDetails().getDurationInSeconds() + 'S'
                        );
                        var o = r.createElement('Period');
                        o.setAttribute('id', '0');
                        for (
                          var i = r.createElement('AdaptationSet'),
                            n = r.createElement('AdaptationSet'),
                            a = t.getStream3List(),
                            l = 0;
                          l < a.length;
                          l++
                        ) {
                          var g = a[l],
                            p = g.getLanguage();
                          if (
                            !p ||
                            !p.getCode() ||
                            '3' != p.getCode()[p.getCode().length - 1]
                          ) {
                            var y = r.createElement('Representation');
                            y.setAttribute('id', g.getItag());
                            var c = re(g.getMimeAndCodecs());
                            y.setAttribute('mimeType', c.mimeType),
                              y.setAttribute('codecs', c.codecs),
                              y.setAttribute('bandwidth', g.getBandwidth());
                            var d = r.createElement('BaseURL');
                            (d.textContent = g.getUrl()), y.appendChild(d);
                            var f = r.createElement('SegmentBase'),
                              h = g.getIndexRange();
                            f.setAttribute(
                              'indexRange',
                              h.getFrom() + '-' + h.getTo()
                            ),
                              f.setAttribute('timescale', '12288');
                            var b = r.createElement('Initialization'),
                              m = g.getInitializationRange();
                            b.setAttribute(
                              'range',
                              m.getFrom() + '-' + m.getTo()
                            ),
                              f.appendChild(b),
                              y.appendChild(f),
                              g.getWidth()
                                ? (y.setAttribute('width', g.getWidth()),
                                  y.setAttribute('height', g.getHeight()),
                                  i.appendChild(y))
                                : n.appendChild(y);
                          }
                        }
                        return (
                          o.appendChild(i),
                          o.appendChild(n),
                          r.documentElement.appendChild(o),
                          u.serializeToString(r)
                        );
                      })(t);
                      return i
                        ? { can_play: !0, should_embed: !1, dash_manifest: i }
                        : v;
                    })(e.data);
              }, x);
      },
      init: function (e, t, r) {
        (p = e.services),
          (a = e.ServerSideError),
          (l = e.TimeoutError),
          (g = e.ConnectionError),
          !0,
          p.nativeStorage &&
            p.nativeStorage.constructor.installed() &&
            p.device &&
            O().catch(function (e) {
              console.error('Failed to register device.'), console.error(e);
            }),
          (s = t || document.implementation),
          (u = r || new XMLSerializer()),
          String.prototype.startsWith ||
            Object.defineProperty(String.prototype, 'startsWith', {
              value: function (e, t) {
                var r = t > 0 ? 0 | t : 0;
                return this.substring(r, r + e.length) === e;
              },
            });
      },
      parseBrowseChannelResponse: J,
      search: function (e, t) {
        return p.device
          ? O()
              .then(function () {
                var r = (function (e, t) {
                  var r = F + '/youtubei/v1/search?key=' + S,
                    o = new T.SearchRequest();
                  o.setB1(W({ restrictedMode: !0 })),
                    o.setQ(e),
                    o.setS3(''),
                    o.setF36(2);
                  var i = new T.D16();
                  i.setF1(4),
                    i.setS2('youtube-ios-pb'),
                    i.setS4('sFew8Squ4pE'),
                    i.setF9(62499),
                    i.setF10(4398),
                    i.setF11(44444),
                    i.setF19(529),
                    i.setF20(3131),
                    i.setS21('0j1j6j3j0j1'),
                    i.setF23(12),
                    i.setF29(1),
                    i.setF37(2),
                    i.setF38(1);
                  var n = new T.Dp6();
                  n.setF2(0),
                    n.addF3(546),
                    n.addF3(650),
                    n.setF5(1),
                    i.addDp6(n),
                    i.addDp6(n),
                    i.addDp6(n),
                    i.addDp6(n),
                    o.setD16(i);
                  var s = new T.D38();
                  if (
                    (s.setF1(0),
                    s.setF2(0),
                    s.setF4(1),
                    o.setD38(s),
                    t && t.channelsOnly)
                  ) {
                    var a = new T.SearchOptions();
                    a.addOption('sort_by=sort_by_relevance'),
                      a.addOption('search_filter=channel'),
                      o.setOptions(a);
                  }
                  var l = o.serializeBinary();
                  return { url: r, body: l };
                })(e, t);
                return C(r.url, r.body);
              })
              .then(function (r) {
                var o = (function (e) {
                  var t = T.SearchResponse.deserializeBinary(e);
                  if (!t) return [];
                  for (
                    var r = [], o = t.getS4().getS49().getS1List(), i = 0;
                    i < o.length;
                    i++
                  ) {
                    var n = o[i].getS501();
                    if (n)
                      for (
                        var s = n.getResultList(), a = 0;
                        a < s.length;
                        a++
                      ) {
                        var l = s[a].getCat153();
                        if (l) {
                          var g = l.getFox172().getOwl1().getFish168();
                          if (g) {
                            var p = g.getDeer5();
                            if (p) {
                              var u = p.getHorse463();
                              if (u) {
                                var y = u.getCow1(),
                                  c = y.getTitle();
                                /Topic$/.test(c) ||
                                  r.push({
                                    id: y
                                      .getToad5()
                                      .getHare169()
                                      .getH()
                                      .getId(),
                                    kind: 'channel',
                                    title: c,
                                    image: V(
                                      y.getImg1().getTh1().getThumb1().getUrl()
                                    ),
                                  });
                                continue;
                              }
                              var d = p.getGoat264();
                              if (d) {
                                var f = d.getRat1(),
                                  h = f.getGnu1(),
                                  b = f.getCroc4().getHare169(),
                                  m = b.getDuck486(),
                                  S = null;
                                if (m) S = m.getId();
                                else {
                                  var M = b.getPuma200();
                                  M && (S = M.getLion1().getDuck486().getId());
                                }
                                var F = h.getChannelId();
                                !F &&
                                  h.getDodo3() &&
                                  (F = h
                                    .getDodo3()
                                    .getToad5()
                                    .getHare169()
                                    .getH()
                                    .getId()),
                                  S &&
                                    F &&
                                    r.push({
                                      id: S,
                                      kind: 'video',
                                      title: h.getTextHolder2().getTitle(),
                                      channel_title: h
                                        .getTextHolder2()
                                        .getSubtitle()
                                        .replace(/ \u00b7 .*/, ''),
                                      channel_id: F,
                                    });
                              }
                            }
                          }
                        }
                      }
                  }
                  return r;
                })(r.data);
                return t && t.channelsOnly
                  ? o
                  : (function (e, t, r) {
                      for (var o = [], i = {}, n = 0; n < t.length; n++) {
                        var s = t[n];
                        if ('channel' == s.kind) o.push(s.id);
                        else {
                          var a = i[s.channel_id];
                          void 0 === a && ((a = []), (i[s.channel_id] = a)),
                            a.push(s.id);
                        }
                      }
                      var l = Object.keys(i)
                        .map(function (e) {
                          return e + ':' + i[e].join(',');
                        })
                        .join(';');
                      return p.kidService
                        .search_and_check(e, o.join(','), l, r)
                        .toPromise()
                        .then(function (e) {
                          if (e.blocked) return { search_results: [] };
                          for (var r = 0; r < t.length; r++) {
                            var o = t[r],
                              i = e.check_results[o.id];
                            o.locked = void 0 === i || i;
                          }
                          return { search_results: q(e.search_results, t) };
                        });
                    })(e, o, t.mode);
              })
              .catch(function (t) {
                console.error('Failed to perform search.', e, t),
                  console.error(JSON.stringify(t)),
                  t.message && console.error(t.message);
                var r =
                  t.error ||
                  t.message ||
                  'Unable to search. Please try again later.';
                throw (
                  ((t.status != R &&
                    t.status != _ &&
                    t.status != E &&
                    t.status != B) ||
                    (r = 'No Internet. Check your Internet connection.'),
                  r)
                );
              })
          : t && t.channelsOnly
          ? Promise.resolve([])
          : p.kidService.search(e).toPromise();
      },
      setDevice: function (e) {
        p.device = e;
      },
      syncChannel: function (e) {
        return Promise.resolve();
      },
    };
  },
  function (e, t, r) {
    var o;
    e.exports =
      ((o = r(0)),
      r(3),
      r(9),
      r(4),
      r(2),
      (function () {
        var e = o,
          t = e.lib.BlockCipher,
          r = e.algo,
          i = [],
          n = [],
          s = [],
          a = [],
          l = [],
          g = [],
          p = [],
          u = [],
          y = [],
          c = [];
        !(function () {
          for (var e = [], t = 0; t < 256; t++)
            e[t] = t < 128 ? t << 1 : (t << 1) ^ 283;
          var r = 0,
            o = 0;
          for (t = 0; t < 256; t++) {
            var d = o ^ (o << 1) ^ (o << 2) ^ (o << 3) ^ (o << 4);
            (d = (d >>> 8) ^ (255 & d) ^ 99), (i[r] = d), (n[d] = r);
            var f = e[r],
              h = e[f],
              b = e[h],
              m = (257 * e[d]) ^ (16843008 * d);
            (s[r] = (m << 24) | (m >>> 8)),
              (a[r] = (m << 16) | (m >>> 16)),
              (l[r] = (m << 8) | (m >>> 24)),
              (g[r] = m),
              (m = (16843009 * b) ^ (65537 * h) ^ (257 * f) ^ (16843008 * r)),
              (p[d] = (m << 24) | (m >>> 8)),
              (u[d] = (m << 16) | (m >>> 16)),
              (y[d] = (m << 8) | (m >>> 24)),
              (c[d] = m),
              r ? ((r = f ^ e[e[e[b ^ f]]]), (o ^= e[e[o]])) : (r = o = 1);
          }
        })();
        var d = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
          f = (r.AES = t.extend({
            _doReset: function () {
              if (!this._nRounds || this._keyPriorReset !== this._key) {
                for (
                  var e = (this._keyPriorReset = this._key),
                    t = e.words,
                    r = e.sigBytes / 4,
                    o = 4 * ((this._nRounds = r + 6) + 1),
                    n = (this._keySchedule = []),
                    s = 0;
                  s < o;
                  s++
                )
                  if (s < r) n[s] = t[s];
                  else {
                    var a = n[s - 1];
                    s % r
                      ? r > 6 &&
                        s % r == 4 &&
                        (a =
                          (i[a >>> 24] << 24) |
                          (i[(a >>> 16) & 255] << 16) |
                          (i[(a >>> 8) & 255] << 8) |
                          i[255 & a])
                      : ((a =
                          (i[(a = (a << 8) | (a >>> 24)) >>> 24] << 24) |
                          (i[(a >>> 16) & 255] << 16) |
                          (i[(a >>> 8) & 255] << 8) |
                          i[255 & a]),
                        (a ^= d[(s / r) | 0] << 24)),
                      (n[s] = n[s - r] ^ a);
                  }
                for (var l = (this._invKeySchedule = []), g = 0; g < o; g++)
                  (s = o - g),
                    (a = g % 4 ? n[s] : n[s - 4]),
                    (l[g] =
                      g < 4 || s <= 4
                        ? a
                        : p[i[a >>> 24]] ^
                          u[i[(a >>> 16) & 255]] ^
                          y[i[(a >>> 8) & 255]] ^
                          c[i[255 & a]]);
              }
            },
            encryptBlock: function (e, t) {
              this._doCryptBlock(e, t, this._keySchedule, s, a, l, g, i);
            },
            decryptBlock: function (e, t) {
              var r = e[t + 1];
              (e[t + 1] = e[t + 3]),
                (e[t + 3] = r),
                this._doCryptBlock(e, t, this._invKeySchedule, p, u, y, c, n),
                (r = e[t + 1]),
                (e[t + 1] = e[t + 3]),
                (e[t + 3] = r);
            },
            _doCryptBlock: function (e, t, r, o, i, n, s, a) {
              for (
                var l = this._nRounds,
                  g = e[t] ^ r[0],
                  p = e[t + 1] ^ r[1],
                  u = e[t + 2] ^ r[2],
                  y = e[t + 3] ^ r[3],
                  c = 4,
                  d = 1;
                d < l;
                d++
              ) {
                var f =
                    o[g >>> 24] ^
                    i[(p >>> 16) & 255] ^
                    n[(u >>> 8) & 255] ^
                    s[255 & y] ^
                    r[c++],
                  h =
                    o[p >>> 24] ^
                    i[(u >>> 16) & 255] ^
                    n[(y >>> 8) & 255] ^
                    s[255 & g] ^
                    r[c++],
                  b =
                    o[u >>> 24] ^
                    i[(y >>> 16) & 255] ^
                    n[(g >>> 8) & 255] ^
                    s[255 & p] ^
                    r[c++],
                  m =
                    o[y >>> 24] ^
                    i[(g >>> 16) & 255] ^
                    n[(p >>> 8) & 255] ^
                    s[255 & u] ^
                    r[c++];
                (g = f), (p = h), (u = b), (y = m);
              }
              (f =
                ((a[g >>> 24] << 24) |
                  (a[(p >>> 16) & 255] << 16) |
                  (a[(u >>> 8) & 255] << 8) |
                  a[255 & y]) ^
                r[c++]),
                (h =
                  ((a[p >>> 24] << 24) |
                    (a[(u >>> 16) & 255] << 16) |
                    (a[(y >>> 8) & 255] << 8) |
                    a[255 & g]) ^
                  r[c++]),
                (b =
                  ((a[u >>> 24] << 24) |
                    (a[(y >>> 16) & 255] << 16) |
                    (a[(g >>> 8) & 255] << 8) |
                    a[255 & p]) ^
                  r[c++]),
                (m =
                  ((a[y >>> 24] << 24) |
                    (a[(g >>> 16) & 255] << 16) |
                    (a[(p >>> 8) & 255] << 8) |
                    a[255 & u]) ^
                  r[c++]),
                (e[t] = f),
                (e[t + 1] = h),
                (e[t + 2] = b),
                (e[t + 3] = m);
            },
            keySize: 8,
          }));
        e.AES = t._createHelper(f);
      })(),
      o.AES);
  },
  function (e, t, r) {
    var o;
    e.exports =
      ((o = r(0)),
      (function (e) {
        var t = o,
          r = t.lib,
          i = r.WordArray,
          n = r.Hasher,
          s = t.algo,
          a = [];
        !(function () {
          for (var t = 0; t < 64; t++)
            a[t] = (4294967296 * e.abs(e.sin(t + 1))) | 0;
        })();
        var l = (s.MD5 = n.extend({
          _doReset: function () {
            this._hash = new i.init([
              1732584193, 4023233417, 2562383102, 271733878,
            ]);
          },
          _doProcessBlock: function (e, t) {
            for (var r = 0; r < 16; r++) {
              var o = t + r,
                i = e[o];
              e[o] =
                (16711935 & ((i << 8) | (i >>> 24))) |
                (4278255360 & ((i << 24) | (i >>> 8)));
            }
            var n = this._hash.words,
              s = e[t + 0],
              l = e[t + 1],
              c = e[t + 2],
              d = e[t + 3],
              f = e[t + 4],
              h = e[t + 5],
              b = e[t + 6],
              m = e[t + 7],
              T = e[t + 8],
              S = e[t + 9],
              M = e[t + 10],
              F = e[t + 11],
              R = e[t + 12],
              _ = e[t + 13],
              E = e[t + 14],
              B = e[t + 15],
              v = n[0],
              w = n[1],
              O = n[2],
              C = n[3];
            (v = g(v, w, O, C, s, 7, a[0])),
              (C = g(C, v, w, O, l, 12, a[1])),
              (O = g(O, C, v, w, c, 17, a[2])),
              (w = g(w, O, C, v, d, 22, a[3])),
              (v = g(v, w, O, C, f, 7, a[4])),
              (C = g(C, v, w, O, h, 12, a[5])),
              (O = g(O, C, v, w, b, 17, a[6])),
              (w = g(w, O, C, v, m, 22, a[7])),
              (v = g(v, w, O, C, T, 7, a[8])),
              (C = g(C, v, w, O, S, 12, a[9])),
              (O = g(O, C, v, w, M, 17, a[10])),
              (w = g(w, O, C, v, F, 22, a[11])),
              (v = g(v, w, O, C, R, 7, a[12])),
              (C = g(C, v, w, O, _, 12, a[13])),
              (O = g(O, C, v, w, E, 17, a[14])),
              (v = p(v, (w = g(w, O, C, v, B, 22, a[15])), O, C, l, 5, a[16])),
              (C = p(C, v, w, O, b, 9, a[17])),
              (O = p(O, C, v, w, F, 14, a[18])),
              (w = p(w, O, C, v, s, 20, a[19])),
              (v = p(v, w, O, C, h, 5, a[20])),
              (C = p(C, v, w, O, M, 9, a[21])),
              (O = p(O, C, v, w, B, 14, a[22])),
              (w = p(w, O, C, v, f, 20, a[23])),
              (v = p(v, w, O, C, S, 5, a[24])),
              (C = p(C, v, w, O, E, 9, a[25])),
              (O = p(O, C, v, w, d, 14, a[26])),
              (w = p(w, O, C, v, T, 20, a[27])),
              (v = p(v, w, O, C, _, 5, a[28])),
              (C = p(C, v, w, O, c, 9, a[29])),
              (O = p(O, C, v, w, m, 14, a[30])),
              (v = u(v, (w = p(w, O, C, v, R, 20, a[31])), O, C, h, 4, a[32])),
              (C = u(C, v, w, O, T, 11, a[33])),
              (O = u(O, C, v, w, F, 16, a[34])),
              (w = u(w, O, C, v, E, 23, a[35])),
              (v = u(v, w, O, C, l, 4, a[36])),
              (C = u(C, v, w, O, f, 11, a[37])),
              (O = u(O, C, v, w, m, 16, a[38])),
              (w = u(w, O, C, v, M, 23, a[39])),
              (v = u(v, w, O, C, _, 4, a[40])),
              (C = u(C, v, w, O, s, 11, a[41])),
              (O = u(O, C, v, w, d, 16, a[42])),
              (w = u(w, O, C, v, b, 23, a[43])),
              (v = u(v, w, O, C, S, 4, a[44])),
              (C = u(C, v, w, O, R, 11, a[45])),
              (O = u(O, C, v, w, B, 16, a[46])),
              (v = y(v, (w = u(w, O, C, v, c, 23, a[47])), O, C, s, 6, a[48])),
              (C = y(C, v, w, O, m, 10, a[49])),
              (O = y(O, C, v, w, E, 15, a[50])),
              (w = y(w, O, C, v, h, 21, a[51])),
              (v = y(v, w, O, C, R, 6, a[52])),
              (C = y(C, v, w, O, d, 10, a[53])),
              (O = y(O, C, v, w, M, 15, a[54])),
              (w = y(w, O, C, v, l, 21, a[55])),
              (v = y(v, w, O, C, T, 6, a[56])),
              (C = y(C, v, w, O, B, 10, a[57])),
              (O = y(O, C, v, w, b, 15, a[58])),
              (w = y(w, O, C, v, _, 21, a[59])),
              (v = y(v, w, O, C, f, 6, a[60])),
              (C = y(C, v, w, O, F, 10, a[61])),
              (O = y(O, C, v, w, c, 15, a[62])),
              (w = y(w, O, C, v, S, 21, a[63])),
              (n[0] = (n[0] + v) | 0),
              (n[1] = (n[1] + w) | 0),
              (n[2] = (n[2] + O) | 0),
              (n[3] = (n[3] + C) | 0);
          },
          _doFinalize: function () {
            var t = this._data,
              r = t.words,
              o = 8 * this._nDataBytes,
              i = 8 * t.sigBytes;
            r[i >>> 5] |= 128 << (24 - (i % 32));
            var n = e.floor(o / 4294967296),
              s = o;
            (r[15 + (((i + 64) >>> 9) << 4)] =
              (16711935 & ((n << 8) | (n >>> 24))) |
              (4278255360 & ((n << 24) | (n >>> 8)))),
              (r[14 + (((i + 64) >>> 9) << 4)] =
                (16711935 & ((s << 8) | (s >>> 24))) |
                (4278255360 & ((s << 24) | (s >>> 8)))),
              (t.sigBytes = 4 * (r.length + 1)),
              this._process();
            for (var a = this._hash, l = a.words, g = 0; g < 4; g++) {
              var p = l[g];
              l[g] =
                (16711935 & ((p << 8) | (p >>> 24))) |
                (4278255360 & ((p << 24) | (p >>> 8)));
            }
            return a;
          },
          clone: function () {
            var e = n.clone.call(this);
            return (e._hash = this._hash.clone()), e;
          },
        }));
        function g(e, t, r, o, i, n, s) {
          var a = e + ((t & r) | (~t & o)) + i + s;
          return ((a << n) | (a >>> (32 - n))) + t;
        }
        function p(e, t, r, o, i, n, s) {
          var a = e + ((t & o) | (r & ~o)) + i + s;
          return ((a << n) | (a >>> (32 - n))) + t;
        }
        function u(e, t, r, o, i, n, s) {
          var a = e + (t ^ r ^ o) + i + s;
          return ((a << n) | (a >>> (32 - n))) + t;
        }
        function y(e, t, r, o, i, n, s) {
          var a = e + (r ^ (t | ~o)) + i + s;
          return ((a << n) | (a >>> (32 - n))) + t;
        }
        (t.MD5 = n._createHelper(l)), (t.HmacMD5 = n._createHmacHelper(l));
      })(Math),
      o.MD5);
  },
  function (e, t, r) {
    var o;
    e.exports = ((o = r(0)), r(1), r(5), o.HmacSHA1);
  },
  function (e, t, r) {
    var o;
    e.exports =
      ((o = r(0)),
      (function () {
        if ('function' == typeof ArrayBuffer) {
          var e = o.lib.WordArray,
            t = e.init;
          (e.init = function (e) {
            if (
              (e instanceof ArrayBuffer && (e = new Uint8Array(e)),
              (e instanceof Int8Array ||
                ('undefined' != typeof Uint8ClampedArray &&
                  e instanceof Uint8ClampedArray) ||
                e instanceof Int16Array ||
                e instanceof Uint16Array ||
                e instanceof Int32Array ||
                e instanceof Uint32Array ||
                e instanceof Float32Array ||
                e instanceof Float64Array) &&
                (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)),
              e instanceof Uint8Array)
            ) {
              for (var r = e.byteLength, o = [], i = 0; i < r; i++)
                o[i >>> 2] |= e[i] << (24 - (i % 4) * 8);
              t.call(this, o, r);
            } else t.apply(this, arguments);
          }).prototype = e;
        }
      })(),
      o.lib.WordArray);
  },
  function (e, t, r) {
    var o, i, n;
    e.exports =
      ((n = r(0)),
      r(2),
      (n.mode.CTR =
        ((o = n.lib.BlockCipherMode.extend()),
        (i = o.Encryptor =
          o.extend({
            processBlock: function (e, t) {
              var r = this._cipher,
                o = r.blockSize,
                i = this._iv,
                n = this._counter;
              i && ((n = this._counter = i.slice(0)), (this._iv = void 0));
              var s = n.slice(0);
              r.encryptBlock(s, 0), (n[o - 1] = (n[o - 1] + 1) | 0);
              for (var a = 0; a < o; a++) e[t + a] ^= s[a];
            },
          })),
        (o.Decryptor = i),
        o)),
      n.mode.CTR);
  },
  function (e, t, r) {
    var o;
    e.exports =
      ((o = r(0)),
      r(2),
      (o.pad.NoPadding = { pad: function () {}, unpad: function () {} }),
      o.pad.NoPadding);
  },
  function (e, t, r) {
    var o = r(15),
      i = o,
      n = Function('return this')();
    i.exportSymbol('proto.yt.Ant2', null, n),
      i.exportSymbol('proto.yt.Ara362', null, n),
      i.exportSymbol('proto.yt.B1', null, n),
      i.exportSymbol('proto.yt.B10', null, n),
      i.exportSymbol('proto.yt.B13', null, n),
      i.exportSymbol('proto.yt.B9', null, n),
      i.exportSymbol('proto.yt.Bat1', null, n),
      i.exportSymbol('proto.yt.Bee471', null, n),
      i.exportSymbol('proto.yt.Bird25', null, n),
      i.exportSymbol('proto.yt.Boa604', null, n),
      i.exportSymbol('proto.yt.BrowseRequest', null, n),
      i.exportSymbol('proto.yt.C1', null, n),
      i.exportSymbol('proto.yt.C26', null, n),
      i.exportSymbol('proto.yt.C361', null, n),
      i.exportSymbol('proto.yt.C4', null, n),
      i.exportSymbol('proto.yt.C518', null, n),
      i.exportSymbol('proto.yt.C579', null, n),
      i.exportSymbol('proto.yt.C58173', null, n),
      i.exportSymbol('proto.yt.C58174', null, n),
      i.exportSymbol('proto.yt.Cat153', null, n),
      i.exportSymbol('proto.yt.Ch8', null, n),
      i.exportSymbol('proto.yt.Ch8.H2', null, n),
      i.exportSymbol('proto.yt.ChannelInfo', null, n),
      i.exportSymbol('proto.yt.ChannelResponse', null, n),
      i.exportSymbol('proto.yt.ChannelTabResponse', null, n),
      i.exportSymbol('proto.yt.Client', null, n),
      i.exportSymbol('proto.yt.Collie5', null, n),
      i.exportSymbol('proto.yt.Cow1', null, n),
      i.exportSymbol('proto.yt.Crab356', null, n),
      i.exportSymbol('proto.yt.Croc4', null, n),
      i.exportSymbol('proto.yt.D16', null, n),
      i.exportSymbol('proto.yt.D38', null, n),
      i.exportSymbol('proto.yt.Deer5', null, n),
      i.exportSymbol('proto.yt.Dodo3', null, n),
      i.exportSymbol('proto.yt.Dog16', null, n),
      i.exportSymbol('proto.yt.Dp6', null, n),
      i.exportSymbol('proto.yt.Duck486', null, n),
      i.exportSymbol('proto.yt.E100', null, n),
      i.exportSymbol('proto.yt.E51', null, n),
      i.exportSymbol('proto.yt.E62', null, n),
      i.exportSymbol('proto.yt.E97', null, n),
      i.exportSymbol('proto.yt.Emu2', null, n),
      i.exportSymbol('proto.yt.Ep1', null, n),
      i.exportSymbol('proto.yt.Finch15', null, n),
      i.exportSymbol('proto.yt.Fish168', null, n),
      i.exportSymbol('proto.yt.Fly4', null, n),
      i.exportSymbol('proto.yt.Fox172', null, n),
      i.exportSymbol('proto.yt.Frog3', null, n),
      i.exportSymbol('proto.yt.G1', null, n),
      i.exportSymbol('proto.yt.Gnu1', null, n),
      i.exportSymbol('proto.yt.Goat264', null, n),
      i.exportSymbol('proto.yt.H', null, n),
      i.exportSymbol('proto.yt.Hare169', null, n),
      i.exportSymbol('proto.yt.Hawk514', null, n),
      i.exportSymbol('proto.yt.Holder', null, n),
      i.exportSymbol('proto.yt.Horse463', null, n),
      i.exportSymbol('proto.yt.I1', null, n),
      i.exportSymbol('proto.yt.I5', null, n),
      i.exportSymbol('proto.yt.I7', null, n),
      i.exportSymbol('proto.yt.Img1', null, n),
      i.exportSymbol('proto.yt.J106', null, n),
      i.exportSymbol('proto.yt.Ko11', null, n),
      i.exportSymbol('proto.yt.Lac18', null, n),
      i.exportSymbol('proto.yt.Lion1', null, n),
      i.exportSymbol('proto.yt.M109', null, n),
      i.exportSymbol('proto.yt.M2', null, n),
      i.exportSymbol('proto.yt.M520', null, n),
      i.exportSymbol('proto.yt.Mule5', null, n),
      i.exportSymbol('proto.yt.Nit232', null, n),
      i.exportSymbol('proto.yt.Ort1', null, n),
      i.exportSymbol('proto.yt.Owl1', null, n),
      i.exportSymbol('proto.yt.P1', null, n),
      i.exportSymbol('proto.yt.P4', null, n),
      i.exportSymbol('proto.yt.PVideo', null, n),
      i.exportSymbol('proto.yt.Pig2', null, n),
      i.exportSymbol('proto.yt.Pl202', null, n),
      i.exportSymbol('proto.yt.PlayerRequest', null, n),
      i.exportSymbol('proto.yt.PlayerRequest.App', null, n),
      i.exportSymbol('proto.yt.PlayerRequest.G4', null, n),
      i.exportSymbol('proto.yt.PlayerResponse', null, n),
      i.exportSymbol('proto.yt.PlayerResponse.Details', null, n),
      i.exportSymbol('proto.yt.PlayerResponse.Language', null, n),
      i.exportSymbol('proto.yt.PlayerResponse.LiveInfo', null, n),
      i.exportSymbol('proto.yt.PlayerResponse.PlayabilityStatus', null, n),
      i.exportSymbol('proto.yt.PlayerResponse.PlayabilityStatus.Code', null, n),
      i.exportSymbol('proto.yt.PlayerResponse.Range', null, n),
      i.exportSymbol('proto.yt.PlayerResponse.Stream2', null, n),
      i.exportSymbol('proto.yt.PlayerResponse.Stream3', null, n),
      i.exportSymbol('proto.yt.PlayerResponse.StreamMap', null, n),
      i.exportSymbol('proto.yt.PlayerResponse.SubtitlesObject', null, n),
      i.exportSymbol('proto.yt.Possum1', null, n),
      i.exportSymbol('proto.yt.Pp1', null, n),
      i.exportSymbol('proto.yt.Puma200', null, n),
      i.exportSymbol('proto.yt.RChannel', null, n),
      i.exportSymbol('proto.yt.RChannelDetails', null, n),
      i.exportSymbol('proto.yt.RPlaylist', null, n),
      i.exportSymbol('proto.yt.RVideo', null, n),
      i.exportSymbol('proto.yt.Rat1', null, n),
      i.exportSymbol('proto.yt.Related', null, n),
      i.exportSymbol('proto.yt.RelatedRequest', null, n),
      i.exportSymbol('proto.yt.RelatedResponse', null, n),
      i.exportSymbol('proto.yt.Result', null, n),
      i.exportSymbol('proto.yt.Rhino353', null, n),
      i.exportSymbol('proto.yt.S1', null, n),
      i.exportSymbol('proto.yt.S4', null, n),
      i.exportSymbol('proto.yt.S49', null, n),
      i.exportSymbol('proto.yt.S501', null, n),
      i.exportSymbol('proto.yt.S54681060', null, n),
      i.exportSymbol('proto.yt.SearchOptions', null, n),
      i.exportSymbol('proto.yt.SearchRequest', null, n),
      i.exportSymbol('proto.yt.SearchResponse', null, n),
      i.exportSymbol('proto.yt.Snake232', null, n),
      i.exportSymbol('proto.yt.Stats18', null, n),
      i.exportSymbol('proto.yt.Sub516', null, n),
      i.exportSymbol('proto.yt.Subtitle', null, n),
      i.exportSymbol('proto.yt.T1', null, n),
      i.exportSymbol('proto.yt.T3', null, n),
      i.exportSymbol('proto.yt.T5', null, n),
      i.exportSymbol('proto.yt.T6', null, n),
      i.exportSymbol('proto.yt.T9', null, n),
      i.exportSymbol('proto.yt.TextHolder', null, n),
      i.exportSymbol('proto.yt.TextHolder2', null, n),
      i.exportSymbol('proto.yt.Tgr106', null, n),
      i.exportSymbol('proto.yt.Th1', null, n),
      i.exportSymbol('proto.yt.Thumb1', null, n),
      i.exportSymbol('proto.yt.Thumbnail', null, n),
      i.exportSymbol('proto.yt.ThumbnailCollection', null, n),
      i.exportSymbol('proto.yt.Title', null, n),
      i.exportSymbol('proto.yt.Tk802', null, n),
      i.exportSymbol('proto.yt.Toad5', null, n),
      i.exportSymbol('proto.yt.Token', null, n),
      i.exportSymbol('proto.yt.Tt2', null, n),
      i.exportSymbol('proto.yt.Turkey8', null, n),
      i.exportSymbol('proto.yt.Turtle1', null, n),
      i.exportSymbol('proto.yt.V60', null, n),
      i.exportSymbol('proto.yt.Wasp26', null, n),
      i.exportSymbol('proto.yt.X51', null, n),
      i.exportSymbol('proto.yt.Yak2', null, n),
      i.exportSymbol('proto.yt.ZeroEnum', null, n),
      (proto.yt.E62 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.E62, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.E62.displayName = 'proto.yt.E62'),
      (proto.yt.E97 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.E97, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.E97.displayName = 'proto.yt.E97'),
      (proto.yt.Ep1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Ep1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Ep1.displayName = 'proto.yt.Ep1'),
      (proto.yt.E100 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.E100, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.E100.displayName = 'proto.yt.E100'),
      (proto.yt.Client = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Client, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Client.displayName = 'proto.yt.Client'),
      (proto.yt.T3 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.T3, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.T3.displayName = 'proto.yt.T3'),
      (proto.yt.T5 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.T5, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.T5.displayName = 'proto.yt.T5'),
      (proto.yt.T6 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.T6, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.T6.displayName = 'proto.yt.T6'),
      (proto.yt.Pp1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Pp1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Pp1.displayName = 'proto.yt.Pp1'),
      (proto.yt.T9 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.T9, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.T9.displayName = 'proto.yt.T9'),
      (proto.yt.B1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.B1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.B1.displayName = 'proto.yt.B1'),
      (proto.yt.PlayerRequest = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerRequest, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerRequest.displayName = 'proto.yt.PlayerRequest'),
      (proto.yt.PlayerRequest.App = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerRequest.App, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerRequest.App.displayName = 'proto.yt.PlayerRequest.App'),
      (proto.yt.PlayerRequest.G4 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerRequest.G4, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerRequest.G4.displayName = 'proto.yt.PlayerRequest.G4'),
      (proto.yt.Subtitle = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Subtitle, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Subtitle.displayName = 'proto.yt.Subtitle'),
      (proto.yt.Sub516 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.Sub516.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.Sub516, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Sub516.displayName = 'proto.yt.Sub516'),
      (proto.yt.PlayerResponse = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerResponse, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerResponse.displayName = 'proto.yt.PlayerResponse'),
      (proto.yt.PlayerResponse.LiveInfo = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerResponse.LiveInfo, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerResponse.LiveInfo.displayName =
          'proto.yt.PlayerResponse.LiveInfo'),
      (proto.yt.PlayerResponse.PlayabilityStatus = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerResponse.PlayabilityStatus, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerResponse.PlayabilityStatus.displayName =
          'proto.yt.PlayerResponse.PlayabilityStatus'),
      (proto.yt.PlayerResponse.Stream2 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerResponse.Stream2, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerResponse.Stream2.displayName =
          'proto.yt.PlayerResponse.Stream2'),
      (proto.yt.PlayerResponse.Range = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerResponse.Range, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerResponse.Range.displayName =
          'proto.yt.PlayerResponse.Range'),
      (proto.yt.PlayerResponse.Language = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerResponse.Language, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerResponse.Language.displayName =
          'proto.yt.PlayerResponse.Language'),
      (proto.yt.PlayerResponse.Stream3 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerResponse.Stream3, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerResponse.Stream3.displayName =
          'proto.yt.PlayerResponse.Stream3'),
      (proto.yt.PlayerResponse.StreamMap = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.PlayerResponse.StreamMap.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.PlayerResponse.StreamMap, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerResponse.StreamMap.displayName =
          'proto.yt.PlayerResponse.StreamMap'),
      (proto.yt.PlayerResponse.SubtitlesObject = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.PlayerResponse.SubtitlesObject, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerResponse.SubtitlesObject.displayName =
          'proto.yt.PlayerResponse.SubtitlesObject'),
      (proto.yt.PlayerResponse.Details = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PlayerResponse.Details, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.PlayerResponse.Details.displayName =
          'proto.yt.PlayerResponse.Details'),
      (proto.yt.RelatedRequest = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.RelatedRequest, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.RelatedRequest.displayName = 'proto.yt.RelatedRequest'),
      (proto.yt.V60 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.V60, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.V60.displayName = 'proto.yt.V60'),
      (proto.yt.Related = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Related, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Related.displayName = 'proto.yt.Related'),
      (proto.yt.Hawk514 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.Hawk514.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.Hawk514, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Hawk514.displayName = 'proto.yt.Hawk514'),
      (proto.yt.I5 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.I5, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.I5.displayName = 'proto.yt.I5'),
      (proto.yt.X51 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.X51, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.X51.displayName = 'proto.yt.X51'),
      (proto.yt.I1 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.I1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.I1.displayName = 'proto.yt.I1'),
      (proto.yt.E51 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.E51, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.E51.displayName = 'proto.yt.E51'),
      (proto.yt.I7 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.I7, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.I7.displayName = 'proto.yt.I7'),
      (proto.yt.RelatedResponse = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.RelatedResponse, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.RelatedResponse.displayName = 'proto.yt.RelatedResponse'),
      (proto.yt.Dp6 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.Dp6.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.Dp6, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Dp6.displayName = 'proto.yt.Dp6'),
      (proto.yt.D16 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.D16.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.D16, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.D16.displayName = 'proto.yt.D16'),
      (proto.yt.D38 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.D38, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.D38.displayName = 'proto.yt.D38'),
      (proto.yt.SearchOptions = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.SearchOptions.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.SearchOptions, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.SearchOptions.displayName = 'proto.yt.SearchOptions'),
      (proto.yt.SearchRequest = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.SearchRequest, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.SearchRequest.displayName = 'proto.yt.SearchRequest'),
      (proto.yt.T1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.T1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.T1.displayName = 'proto.yt.T1'),
      (proto.yt.Title = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Title, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Title.displayName = 'proto.yt.Title'),
      (proto.yt.Thumbnail = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Thumbnail, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Thumbnail.displayName = 'proto.yt.Thumbnail'),
      (proto.yt.Thumb1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Thumb1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Thumb1.displayName = 'proto.yt.Thumb1'),
      (proto.yt.ThumbnailCollection = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.ThumbnailCollection.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.ThumbnailCollection, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.ThumbnailCollection.displayName =
          'proto.yt.ThumbnailCollection'),
      (proto.yt.RChannel = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.RChannel, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.RChannel.displayName = 'proto.yt.RChannel'),
      (proto.yt.TextHolder = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.TextHolder, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.TextHolder.displayName = 'proto.yt.TextHolder'),
      (proto.yt.Holder = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Holder, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Holder.displayName = 'proto.yt.Holder'),
      (proto.yt.RChannelDetails = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.RChannelDetails, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.RChannelDetails.displayName = 'proto.yt.RChannelDetails'),
      (proto.yt.H = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.H, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.H.displayName = 'proto.yt.H'),
      (proto.yt.Mule5 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Mule5, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Mule5.displayName = 'proto.yt.Mule5'),
      (proto.yt.C1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.C1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.C1.displayName = 'proto.yt.C1'),
      (proto.yt.Ch8 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Ch8, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Ch8.displayName = 'proto.yt.Ch8'),
      (proto.yt.Ch8.H2 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Ch8.H2, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Ch8.H2.displayName = 'proto.yt.Ch8.H2'),
      (proto.yt.ChannelInfo = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.ChannelInfo, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.ChannelInfo.displayName = 'proto.yt.ChannelInfo'),
      (proto.yt.RPlaylist = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.RPlaylist, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.RPlaylist.displayName = 'proto.yt.RPlaylist'),
      (proto.yt.Tt2 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Tt2, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Tt2.displayName = 'proto.yt.Tt2'),
      (proto.yt.Turtle1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Turtle1, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Turtle1.displayName = 'proto.yt.Turtle1'),
      (proto.yt.Duck486 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Duck486, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Duck486.displayName = 'proto.yt.Duck486'),
      (proto.yt.Lion1 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Lion1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Lion1.displayName = 'proto.yt.Lion1'),
      (proto.yt.Puma200 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Puma200, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Puma200.displayName = 'proto.yt.Puma200'),
      (proto.yt.Hare169 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Hare169, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Hare169.displayName = 'proto.yt.Hare169'),
      (proto.yt.Frog3 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Frog3, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Frog3.displayName = 'proto.yt.Frog3'),
      (proto.yt.Bird25 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Bird25, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Bird25.displayName = 'proto.yt.Bird25'),
      (proto.yt.Snake232 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Snake232, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Snake232.displayName = 'proto.yt.Snake232'),
      (proto.yt.Th1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Th1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Th1.displayName = 'proto.yt.Th1'),
      (proto.yt.Img1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Img1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Img1.displayName = 'proto.yt.Img1'),
      (proto.yt.Dog16 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Dog16, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Dog16.displayName = 'proto.yt.Dog16'),
      (proto.yt.Pl202 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Pl202, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Pl202.displayName = 'proto.yt.Pl202'),
      (proto.yt.Stats18 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Stats18, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Stats18.displayName = 'proto.yt.Stats18'),
      (proto.yt.Dodo3 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Dodo3, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Dodo3.displayName = 'proto.yt.Dodo3'),
      (proto.yt.Toad5 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Toad5, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Toad5.displayName = 'proto.yt.Toad5'),
      (proto.yt.Cow1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Cow1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Cow1.displayName = 'proto.yt.Cow1'),
      (proto.yt.Possum1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Possum1, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Possum1.displayName = 'proto.yt.Possum1'),
      (proto.yt.Turkey8 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Turkey8, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Turkey8.displayName = 'proto.yt.Turkey8'),
      (proto.yt.Pig2 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Pig2, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Pig2.displayName = 'proto.yt.Pig2'),
      (proto.yt.Finch15 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Finch15, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Finch15.displayName = 'proto.yt.Finch15'),
      (proto.yt.Rhino353 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Rhino353, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Rhino353.displayName = 'proto.yt.Rhino353'),
      (proto.yt.Ara362 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Ara362, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Ara362.displayName = 'proto.yt.Ara362'),
      (proto.yt.Horse463 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Horse463, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Horse463.displayName = 'proto.yt.Horse463'),
      (proto.yt.TextHolder2 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.TextHolder2, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.TextHolder2.displayName = 'proto.yt.TextHolder2'),
      (proto.yt.Gnu1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Gnu1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Gnu1.displayName = 'proto.yt.Gnu1'),
      (proto.yt.Rat1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Rat1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Rat1.displayName = 'proto.yt.Rat1'),
      (proto.yt.Yak2 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.Yak2.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.Yak2, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Yak2.displayName = 'proto.yt.Yak2'),
      (proto.yt.Fly4 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Fly4, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Fly4.displayName = 'proto.yt.Fly4'),
      (proto.yt.Croc4 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Croc4, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Croc4.displayName = 'proto.yt.Croc4'),
      (proto.yt.Crab356 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Crab356, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Crab356.displayName = 'proto.yt.Crab356'),
      (proto.yt.Bee471 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Bee471, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Bee471.displayName = 'proto.yt.Bee471'),
      (proto.yt.Goat264 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Goat264, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Goat264.displayName = 'proto.yt.Goat264'),
      (proto.yt.Lac18 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Lac18, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Lac18.displayName = 'proto.yt.Lac18'),
      (proto.yt.Nit232 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Nit232, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Nit232.displayName = 'proto.yt.Nit232'),
      (proto.yt.Deer5 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Deer5, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Deer5.displayName = 'proto.yt.Deer5'),
      (proto.yt.Fish168 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Fish168, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Fish168.displayName = 'proto.yt.Fish168'),
      (proto.yt.Owl1 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Owl1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Owl1.displayName = 'proto.yt.Owl1'),
      (proto.yt.Fox172 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Fox172, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Fox172.displayName = 'proto.yt.Fox172'),
      (proto.yt.Cat153 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Cat153, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Cat153.displayName = 'proto.yt.Cat153'),
      (proto.yt.RVideo = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.RVideo, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.RVideo.displayName = 'proto.yt.RVideo'),
      (proto.yt.Bat1 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Bat1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Bat1.displayName = 'proto.yt.Bat1'),
      (proto.yt.J106 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.J106, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.J106.displayName = 'proto.yt.J106'),
      (proto.yt.Emu2 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Emu2, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Emu2.displayName = 'proto.yt.Emu2'),
      (proto.yt.Ort1 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.Ort1.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.Ort1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Ort1.displayName = 'proto.yt.Ort1'),
      (proto.yt.M109 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.M109, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.M109.displayName = 'proto.yt.M109'),
      (proto.yt.Ko11 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Ko11, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Ko11.displayName = 'proto.yt.Ko11'),
      (proto.yt.Tgr106 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Tgr106, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Tgr106.displayName = 'proto.yt.Tgr106'),
      (proto.yt.Result = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Result, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Result.displayName = 'proto.yt.Result'),
      (proto.yt.M520 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.M520, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.M520.displayName = 'proto.yt.M520'),
      (proto.yt.M2 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.M2, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.M2.displayName = 'proto.yt.M2'),
      (proto.yt.S501 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.S501.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.S501, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.S501.displayName = 'proto.yt.S501'),
      (proto.yt.PVideo = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.PVideo, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.PVideo.displayName = 'proto.yt.PVideo'),
      (proto.yt.P1 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.P1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.P1.displayName = 'proto.yt.P1'),
      (proto.yt.P4 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.P4, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.P4.displayName = 'proto.yt.P4'),
      (proto.yt.S54681060 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.S54681060.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.S54681060, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.S54681060.displayName = 'proto.yt.S54681060'),
      (proto.yt.S1 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.S1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.S1.displayName = 'proto.yt.S1'),
      (proto.yt.Boa604 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Boa604, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Boa604.displayName = 'proto.yt.Boa604'),
      (proto.yt.Ant2 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Ant2, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Ant2.displayName = 'proto.yt.Ant2'),
      (proto.yt.S49 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.S49.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.S49, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.S49.displayName = 'proto.yt.S49'),
      (proto.yt.S4 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.S4, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.S4.displayName = 'proto.yt.S4'),
      (proto.yt.SearchResponse = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.SearchResponse, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.SearchResponse.displayName = 'proto.yt.SearchResponse'),
      (proto.yt.Wasp26 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Wasp26, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Wasp26.displayName = 'proto.yt.Wasp26'),
      (proto.yt.BrowseRequest = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.BrowseRequest, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.BrowseRequest.displayName = 'proto.yt.BrowseRequest'),
      (proto.yt.C26 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.C26, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.C26.displayName = 'proto.yt.C26'),
      (proto.yt.Tk802 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.Tk802, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Tk802.displayName = 'proto.yt.Tk802'),
      (proto.yt.Token = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Token, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.Token.displayName = 'proto.yt.Token'),
      (proto.yt.C4 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.C4, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.C4.displayName = 'proto.yt.C4'),
      (proto.yt.C58174 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.C58174, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.C58174.displayName = 'proto.yt.C58174'),
      (proto.yt.G1 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.G1, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.G1.displayName = 'proto.yt.G1'),
      (proto.yt.C58173 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.C58173.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.C58173, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.C58173.displayName = 'proto.yt.C58173'),
      (proto.yt.B9 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.B9, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.B9.displayName = 'proto.yt.B9'),
      (proto.yt.C518 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.C518, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.C518.displayName = 'proto.yt.C518'),
      (proto.yt.Collie5 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.Collie5, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.Collie5.displayName = 'proto.yt.Collie5'),
      (proto.yt.C579 = function (e) {
        o.Message.initialize(
          this,
          e,
          0,
          -1,
          proto.yt.C579.repeatedFields_,
          null
        );
      }),
      i.inherits(proto.yt.C579, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.C579.displayName = 'proto.yt.C579'),
      (proto.yt.C361 = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.C361, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.C361.displayName = 'proto.yt.C361'),
      (proto.yt.B13 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.B13, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.B13.displayName = 'proto.yt.B13'),
      (proto.yt.ChannelResponse = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.ChannelResponse, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.ChannelResponse.displayName = 'proto.yt.ChannelResponse'),
      (proto.yt.B10 = function (e) {
        o.Message.initialize(this, e, 0, 500, null, null);
      }),
      i.inherits(proto.yt.B10, o.Message),
      i.DEBUG && !COMPILED && (proto.yt.B10.displayName = 'proto.yt.B10'),
      (proto.yt.ChannelTabResponse = function (e) {
        o.Message.initialize(this, e, 0, -1, null, null);
      }),
      i.inherits(proto.yt.ChannelTabResponse, o.Message),
      i.DEBUG &&
        !COMPILED &&
        (proto.yt.ChannelTabResponse.displayName =
          'proto.yt.ChannelTabResponse'),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.E62.prototype.toObject = function (e) {
          return proto.yt.E62.toObject(e, this);
        }),
        (proto.yt.E62.toObject = function (e, t) {
          var r,
            i = {
              s1: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              s3: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
              s5: null == (r = o.Message.getField(t, 5)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.E62.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.E62();
        return proto.yt.E62.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.E62.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setS1(r);
              break;
            case 3:
              r = t.readString();
              e.setS3(r);
              break;
            case 5:
              r = t.readString();
              e.setS5(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.E62.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.E62.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.E62.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = o.Message.getField(e, 3)) && t.writeString(3, r),
          null != (r = o.Message.getField(e, 5)) && t.writeString(5, r);
      }),
      (proto.yt.E62.prototype.getS1 = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.E62.prototype.setS1 = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.E62.prototype.clearS1 = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.E62.prototype.hasS1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.E62.prototype.getS3 = function () {
        return o.Message.getFieldWithDefault(this, 3, '');
      }),
      (proto.yt.E62.prototype.setS3 = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.E62.prototype.clearS3 = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.E62.prototype.hasS3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      (proto.yt.E62.prototype.getS5 = function () {
        return o.Message.getFieldWithDefault(this, 5, '');
      }),
      (proto.yt.E62.prototype.setS5 = function (e) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.E62.prototype.clearS5 = function () {
        return o.Message.setField(this, 5, void 0);
      }),
      (proto.yt.E62.prototype.hasS5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.E97.prototype.toObject = function (e) {
          return proto.yt.E97.toObject(e, this);
        }),
        (proto.yt.E97.toObject = function (e, t) {
          var r,
            i = {
              f1: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              f2: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.E97.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.E97();
        return proto.yt.E97.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.E97.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readInt32();
              e.setF1(r);
              break;
            case 2:
              r = t.readInt32();
              e.setF2(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.E97.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.E97.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.E97.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeInt32(1, r),
          null != (r = o.Message.getField(e, 2)) && t.writeInt32(2, r);
      }),
      (proto.yt.E97.prototype.getF1 = function () {
        return o.Message.getFieldWithDefault(this, 1, 0);
      }),
      (proto.yt.E97.prototype.setF1 = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.E97.prototype.clearF1 = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.E97.prototype.hasF1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.E97.prototype.getF2 = function () {
        return o.Message.getFieldWithDefault(this, 2, 0);
      }),
      (proto.yt.E97.prototype.setF2 = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.E97.prototype.clearF2 = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.E97.prototype.hasF2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Ep1.prototype.toObject = function (e) {
          return proto.yt.Ep1.toObject(e, this);
        }),
        (proto.yt.Ep1.toObject = function (e, t) {
          var r,
            i = {
              f1: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              f3: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Ep1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Ep1();
        return proto.yt.Ep1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Ep1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readInt32();
              e.setF1(r);
              break;
            case 3:
              r = t.readInt32();
              e.setF3(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Ep1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Ep1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Ep1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeInt32(1, r),
          null != (r = o.Message.getField(e, 3)) && t.writeInt32(3, r);
      }),
      (proto.yt.Ep1.prototype.getF1 = function () {
        return o.Message.getFieldWithDefault(this, 1, 0);
      }),
      (proto.yt.Ep1.prototype.setF1 = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Ep1.prototype.clearF1 = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Ep1.prototype.hasF1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Ep1.prototype.getF3 = function () {
        return o.Message.getFieldWithDefault(this, 3, 0);
      }),
      (proto.yt.Ep1.prototype.setF3 = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.Ep1.prototype.clearF3 = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.Ep1.prototype.hasF3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.E100.prototype.toObject = function (e) {
          return proto.yt.E100.toObject(e, this);
        }),
        (proto.yt.E100.toObject = function (e, t) {
          var r,
            o = { ep1: (r = t.getEp1()) && proto.yt.Ep1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.E100.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.E100();
        return proto.yt.E100.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.E100.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Ep1();
              t.readMessage(r, proto.yt.Ep1.deserializeBinaryFromReader),
                e.setEp1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.E100.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.E100.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.E100.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getEp1()) &&
          t.writeMessage(1, r, proto.yt.Ep1.serializeBinaryToWriter);
      }),
      (proto.yt.E100.prototype.getEp1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Ep1, 1);
      }),
      (proto.yt.E100.prototype.setEp1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.E100.prototype.clearEp1 = function () {
        return this.setEp1(void 0);
      }),
      (proto.yt.E100.prototype.hasEp1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Client.prototype.toObject = function (e) {
          return proto.yt.Client.toObject(e, this);
        }),
        (proto.yt.Client.toObject = function (e, t) {
          var r,
            i = {
              language: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              locale: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              manufacturer:
                null == (r = o.Message.getField(t, 12)) ? void 0 : r,
              device: null == (r = o.Message.getField(t, 13)) ? void 0 : r,
              f16: null == (r = o.Message.getField(t, 16)) ? void 0 : r,
              version: null == (r = o.Message.getField(t, 17)) ? void 0 : r,
              platform: null == (r = o.Message.getField(t, 18)) ? void 0 : r,
              anotherversion:
                null == (r = o.Message.getField(t, 19)) ? void 0 : r,
              f37: null == (r = o.Message.getField(t, 37)) ? void 0 : r,
              f38: null == (r = o.Message.getField(t, 38)) ? void 0 : r,
              f41: null == (r = o.Message.getField(t, 41)) ? void 0 : r,
              f46: null == (r = o.Message.getField(t, 46)) ? void 0 : r,
              f55: null == (r = o.Message.getField(t, 55)) ? void 0 : r,
              f56: null == (r = o.Message.getField(t, 56)) ? void 0 : r,
              f61: null == (r = o.Message.getField(t, 61)) ? void 0 : r,
              e62: (r = t.getE62()) && proto.yt.E62.toObject(e, r),
              f65: null == (r = o.Message.getField(t, 65)) ? void 0 : r,
              f67: null == (r = o.Message.getField(t, 67)) ? void 0 : r,
              f78: null == (r = o.Message.getField(t, 78)) ? void 0 : r,
              s80: null == (r = o.Message.getField(t, 80)) ? void 0 : r,
              bb84: t.getBb84_asB64(),
              f95: null == (r = o.Message.getField(t, 95)) ? void 0 : r,
              e97: (r = t.getE97()) && proto.yt.E97.toObject(e, r),
              e100: (r = t.getE100()) && proto.yt.E100.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Client.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Client();
        return proto.yt.Client.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Client.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setLanguage(r);
              break;
            case 2:
              r = t.readString();
              e.setLocale(r);
              break;
            case 12:
              r = t.readString();
              e.setManufacturer(r);
              break;
            case 13:
              r = t.readString();
              e.setDevice(r);
              break;
            case 16:
              r = t.readInt32();
              e.setF16(r);
              break;
            case 17:
              r = t.readString();
              e.setVersion(r);
              break;
            case 18:
              r = t.readString();
              e.setPlatform(r);
              break;
            case 19:
              r = t.readString();
              e.setAnotherversion(r);
              break;
            case 37:
              r = t.readInt32();
              e.setF37(r);
              break;
            case 38:
              r = t.readInt32();
              e.setF38(r);
              break;
            case 41:
              r = t.readInt32();
              e.setF41(r);
              break;
            case 46:
              r = t.readInt32();
              e.setF46(r);
              break;
            case 55:
              r = t.readInt32();
              e.setF55(r);
              break;
            case 56:
              r = t.readInt32();
              e.setF56(r);
              break;
            case 61:
              r = t.readInt32();
              e.setF61(r);
              break;
            case 62:
              r = new proto.yt.E62();
              t.readMessage(r, proto.yt.E62.deserializeBinaryFromReader),
                e.setE62(r);
              break;
            case 65:
              r = t.readFixed32();
              e.setF65(r);
              break;
            case 67:
              r = t.readInt32();
              e.setF67(r);
              break;
            case 78:
              r = t.readInt32();
              e.setF78(r);
              break;
            case 80:
              r = t.readString();
              e.setS80(r);
              break;
            case 84:
              r = t.readBytes();
              e.setBb84(r);
              break;
            case 95:
              r = t.readInt32();
              e.setF95(r);
              break;
            case 97:
              r = new proto.yt.E97();
              t.readMessage(r, proto.yt.E97.deserializeBinaryFromReader),
                e.setE97(r);
              break;
            case 100:
              r = new proto.yt.E100();
              t.readMessage(r, proto.yt.E100.deserializeBinaryFromReader),
                e.setE100(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Client.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Client.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Client.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 12)) && t.writeString(12, r),
          null != (r = o.Message.getField(e, 13)) && t.writeString(13, r),
          null != (r = o.Message.getField(e, 16)) && t.writeInt32(16, r),
          null != (r = o.Message.getField(e, 17)) && t.writeString(17, r),
          null != (r = o.Message.getField(e, 18)) && t.writeString(18, r),
          null != (r = o.Message.getField(e, 19)) && t.writeString(19, r),
          null != (r = o.Message.getField(e, 37)) && t.writeInt32(37, r),
          null != (r = o.Message.getField(e, 38)) && t.writeInt32(38, r),
          null != (r = o.Message.getField(e, 41)) && t.writeInt32(41, r),
          null != (r = o.Message.getField(e, 46)) && t.writeInt32(46, r),
          null != (r = o.Message.getField(e, 55)) && t.writeInt32(55, r),
          null != (r = o.Message.getField(e, 56)) && t.writeInt32(56, r),
          null != (r = o.Message.getField(e, 61)) && t.writeInt32(61, r),
          null != (r = e.getE62()) &&
            t.writeMessage(62, r, proto.yt.E62.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 65)) && t.writeFixed32(65, r),
          null != (r = o.Message.getField(e, 67)) && t.writeInt32(67, r),
          null != (r = o.Message.getField(e, 78)) && t.writeInt32(78, r),
          null != (r = o.Message.getField(e, 80)) && t.writeString(80, r),
          null != (r = o.Message.getField(e, 84)) && t.writeBytes(84, r),
          null != (r = o.Message.getField(e, 95)) && t.writeInt32(95, r),
          null != (r = e.getE97()) &&
            t.writeMessage(97, r, proto.yt.E97.serializeBinaryToWriter),
          null != (r = e.getE100()) &&
            t.writeMessage(100, r, proto.yt.E100.serializeBinaryToWriter);
      }),
      (proto.yt.Client.prototype.getLanguage = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.Client.prototype.setLanguage = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Client.prototype.clearLanguage = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Client.prototype.hasLanguage = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Client.prototype.getLocale = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.Client.prototype.setLocale = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.Client.prototype.clearLocale = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.Client.prototype.hasLocale = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Client.prototype.getManufacturer = function () {
        return o.Message.getFieldWithDefault(this, 12, '');
      }),
      (proto.yt.Client.prototype.setManufacturer = function (e) {
        return o.Message.setField(this, 12, e);
      }),
      (proto.yt.Client.prototype.clearManufacturer = function () {
        return o.Message.setField(this, 12, void 0);
      }),
      (proto.yt.Client.prototype.hasManufacturer = function () {
        return null != o.Message.getField(this, 12);
      }),
      (proto.yt.Client.prototype.getDevice = function () {
        return o.Message.getFieldWithDefault(this, 13, '');
      }),
      (proto.yt.Client.prototype.setDevice = function (e) {
        return o.Message.setField(this, 13, e);
      }),
      (proto.yt.Client.prototype.clearDevice = function () {
        return o.Message.setField(this, 13, void 0);
      }),
      (proto.yt.Client.prototype.hasDevice = function () {
        return null != o.Message.getField(this, 13);
      }),
      (proto.yt.Client.prototype.getF16 = function () {
        return o.Message.getFieldWithDefault(this, 16, 0);
      }),
      (proto.yt.Client.prototype.setF16 = function (e) {
        return o.Message.setField(this, 16, e);
      }),
      (proto.yt.Client.prototype.clearF16 = function () {
        return o.Message.setField(this, 16, void 0);
      }),
      (proto.yt.Client.prototype.hasF16 = function () {
        return null != o.Message.getField(this, 16);
      }),
      (proto.yt.Client.prototype.getVersion = function () {
        return o.Message.getFieldWithDefault(this, 17, '');
      }),
      (proto.yt.Client.prototype.setVersion = function (e) {
        return o.Message.setField(this, 17, e);
      }),
      (proto.yt.Client.prototype.clearVersion = function () {
        return o.Message.setField(this, 17, void 0);
      }),
      (proto.yt.Client.prototype.hasVersion = function () {
        return null != o.Message.getField(this, 17);
      }),
      (proto.yt.Client.prototype.getPlatform = function () {
        return o.Message.getFieldWithDefault(this, 18, '');
      }),
      (proto.yt.Client.prototype.setPlatform = function (e) {
        return o.Message.setField(this, 18, e);
      }),
      (proto.yt.Client.prototype.clearPlatform = function () {
        return o.Message.setField(this, 18, void 0);
      }),
      (proto.yt.Client.prototype.hasPlatform = function () {
        return null != o.Message.getField(this, 18);
      }),
      (proto.yt.Client.prototype.getAnotherversion = function () {
        return o.Message.getFieldWithDefault(this, 19, '');
      }),
      (proto.yt.Client.prototype.setAnotherversion = function (e) {
        return o.Message.setField(this, 19, e);
      }),
      (proto.yt.Client.prototype.clearAnotherversion = function () {
        return o.Message.setField(this, 19, void 0);
      }),
      (proto.yt.Client.prototype.hasAnotherversion = function () {
        return null != o.Message.getField(this, 19);
      }),
      (proto.yt.Client.prototype.getF37 = function () {
        return o.Message.getFieldWithDefault(this, 37, 0);
      }),
      (proto.yt.Client.prototype.setF37 = function (e) {
        return o.Message.setField(this, 37, e);
      }),
      (proto.yt.Client.prototype.clearF37 = function () {
        return o.Message.setField(this, 37, void 0);
      }),
      (proto.yt.Client.prototype.hasF37 = function () {
        return null != o.Message.getField(this, 37);
      }),
      (proto.yt.Client.prototype.getF38 = function () {
        return o.Message.getFieldWithDefault(this, 38, 0);
      }),
      (proto.yt.Client.prototype.setF38 = function (e) {
        return o.Message.setField(this, 38, e);
      }),
      (proto.yt.Client.prototype.clearF38 = function () {
        return o.Message.setField(this, 38, void 0);
      }),
      (proto.yt.Client.prototype.hasF38 = function () {
        return null != o.Message.getField(this, 38);
      }),
      (proto.yt.Client.prototype.getF41 = function () {
        return o.Message.getFieldWithDefault(this, 41, 0);
      }),
      (proto.yt.Client.prototype.setF41 = function (e) {
        return o.Message.setField(this, 41, e);
      }),
      (proto.yt.Client.prototype.clearF41 = function () {
        return o.Message.setField(this, 41, void 0);
      }),
      (proto.yt.Client.prototype.hasF41 = function () {
        return null != o.Message.getField(this, 41);
      }),
      (proto.yt.Client.prototype.getF46 = function () {
        return o.Message.getFieldWithDefault(this, 46, 0);
      }),
      (proto.yt.Client.prototype.setF46 = function (e) {
        return o.Message.setField(this, 46, e);
      }),
      (proto.yt.Client.prototype.clearF46 = function () {
        return o.Message.setField(this, 46, void 0);
      }),
      (proto.yt.Client.prototype.hasF46 = function () {
        return null != o.Message.getField(this, 46);
      }),
      (proto.yt.Client.prototype.getF55 = function () {
        return o.Message.getFieldWithDefault(this, 55, 0);
      }),
      (proto.yt.Client.prototype.setF55 = function (e) {
        return o.Message.setField(this, 55, e);
      }),
      (proto.yt.Client.prototype.clearF55 = function () {
        return o.Message.setField(this, 55, void 0);
      }),
      (proto.yt.Client.prototype.hasF55 = function () {
        return null != o.Message.getField(this, 55);
      }),
      (proto.yt.Client.prototype.getF56 = function () {
        return o.Message.getFieldWithDefault(this, 56, 0);
      }),
      (proto.yt.Client.prototype.setF56 = function (e) {
        return o.Message.setField(this, 56, e);
      }),
      (proto.yt.Client.prototype.clearF56 = function () {
        return o.Message.setField(this, 56, void 0);
      }),
      (proto.yt.Client.prototype.hasF56 = function () {
        return null != o.Message.getField(this, 56);
      }),
      (proto.yt.Client.prototype.getF61 = function () {
        return o.Message.getFieldWithDefault(this, 61, 0);
      }),
      (proto.yt.Client.prototype.setF61 = function (e) {
        return o.Message.setField(this, 61, e);
      }),
      (proto.yt.Client.prototype.clearF61 = function () {
        return o.Message.setField(this, 61, void 0);
      }),
      (proto.yt.Client.prototype.hasF61 = function () {
        return null != o.Message.getField(this, 61);
      }),
      (proto.yt.Client.prototype.getE62 = function () {
        return o.Message.getWrapperField(this, proto.yt.E62, 62);
      }),
      (proto.yt.Client.prototype.setE62 = function (e) {
        return o.Message.setWrapperField(this, 62, e);
      }),
      (proto.yt.Client.prototype.clearE62 = function () {
        return this.setE62(void 0);
      }),
      (proto.yt.Client.prototype.hasE62 = function () {
        return null != o.Message.getField(this, 62);
      }),
      (proto.yt.Client.prototype.getF65 = function () {
        return o.Message.getFieldWithDefault(this, 65, 0);
      }),
      (proto.yt.Client.prototype.setF65 = function (e) {
        return o.Message.setField(this, 65, e);
      }),
      (proto.yt.Client.prototype.clearF65 = function () {
        return o.Message.setField(this, 65, void 0);
      }),
      (proto.yt.Client.prototype.hasF65 = function () {
        return null != o.Message.getField(this, 65);
      }),
      (proto.yt.Client.prototype.getF67 = function () {
        return o.Message.getFieldWithDefault(this, 67, 0);
      }),
      (proto.yt.Client.prototype.setF67 = function (e) {
        return o.Message.setField(this, 67, e);
      }),
      (proto.yt.Client.prototype.clearF67 = function () {
        return o.Message.setField(this, 67, void 0);
      }),
      (proto.yt.Client.prototype.hasF67 = function () {
        return null != o.Message.getField(this, 67);
      }),
      (proto.yt.Client.prototype.getF78 = function () {
        return o.Message.getFieldWithDefault(this, 78, 0);
      }),
      (proto.yt.Client.prototype.setF78 = function (e) {
        return o.Message.setField(this, 78, e);
      }),
      (proto.yt.Client.prototype.clearF78 = function () {
        return o.Message.setField(this, 78, void 0);
      }),
      (proto.yt.Client.prototype.hasF78 = function () {
        return null != o.Message.getField(this, 78);
      }),
      (proto.yt.Client.prototype.getS80 = function () {
        return o.Message.getFieldWithDefault(this, 80, '');
      }),
      (proto.yt.Client.prototype.setS80 = function (e) {
        return o.Message.setField(this, 80, e);
      }),
      (proto.yt.Client.prototype.clearS80 = function () {
        return o.Message.setField(this, 80, void 0);
      }),
      (proto.yt.Client.prototype.hasS80 = function () {
        return null != o.Message.getField(this, 80);
      }),
      (proto.yt.Client.prototype.getBb84 = function () {
        return o.Message.getFieldWithDefault(this, 84, '');
      }),
      (proto.yt.Client.prototype.getBb84_asB64 = function () {
        return o.Message.bytesAsB64(this.getBb84());
      }),
      (proto.yt.Client.prototype.getBb84_asU8 = function () {
        return o.Message.bytesAsU8(this.getBb84());
      }),
      (proto.yt.Client.prototype.setBb84 = function (e) {
        return o.Message.setField(this, 84, e);
      }),
      (proto.yt.Client.prototype.clearBb84 = function () {
        return o.Message.setField(this, 84, void 0);
      }),
      (proto.yt.Client.prototype.hasBb84 = function () {
        return null != o.Message.getField(this, 84);
      }),
      (proto.yt.Client.prototype.getF95 = function () {
        return o.Message.getFieldWithDefault(this, 95, 0);
      }),
      (proto.yt.Client.prototype.setF95 = function (e) {
        return o.Message.setField(this, 95, e);
      }),
      (proto.yt.Client.prototype.clearF95 = function () {
        return o.Message.setField(this, 95, void 0);
      }),
      (proto.yt.Client.prototype.hasF95 = function () {
        return null != o.Message.getField(this, 95);
      }),
      (proto.yt.Client.prototype.getE97 = function () {
        return o.Message.getWrapperField(this, proto.yt.E97, 97);
      }),
      (proto.yt.Client.prototype.setE97 = function (e) {
        return o.Message.setWrapperField(this, 97, e);
      }),
      (proto.yt.Client.prototype.clearE97 = function () {
        return this.setE97(void 0);
      }),
      (proto.yt.Client.prototype.hasE97 = function () {
        return null != o.Message.getField(this, 97);
      }),
      (proto.yt.Client.prototype.getE100 = function () {
        return o.Message.getWrapperField(this, proto.yt.E100, 100);
      }),
      (proto.yt.Client.prototype.setE100 = function (e) {
        return o.Message.setWrapperField(this, 100, e);
      }),
      (proto.yt.Client.prototype.clearE100 = function () {
        return this.setE100(void 0);
      }),
      (proto.yt.Client.prototype.hasE100 = function () {
        return null != o.Message.getField(this, 100);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.T3.prototype.toObject = function (e) {
          return proto.yt.T3.toObject(e, this);
        }),
        (proto.yt.T3.toObject = function (e, t) {
          var r,
            i = {
              restrictedMode:
                null == (r = o.Message.getBooleanField(t, 7)) ? void 0 : r,
              f15: null == (r = o.Message.getField(t, 15)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.T3.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.T3();
        return proto.yt.T3.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.T3.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 7:
              var r = t.readBool();
              e.setRestrictedMode(r);
              break;
            case 15:
              r = t.readInt32();
              e.setF15(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.T3.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.T3.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.T3.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 7)) && t.writeBool(7, r),
          null != (r = o.Message.getField(e, 15)) && t.writeInt32(15, r);
      }),
      (proto.yt.T3.prototype.getRestrictedMode = function () {
        return o.Message.getBooleanFieldWithDefault(this, 7, !1);
      }),
      (proto.yt.T3.prototype.setRestrictedMode = function (e) {
        return o.Message.setField(this, 7, e);
      }),
      (proto.yt.T3.prototype.clearRestrictedMode = function () {
        return o.Message.setField(this, 7, void 0);
      }),
      (proto.yt.T3.prototype.hasRestrictedMode = function () {
        return null != o.Message.getField(this, 7);
      }),
      (proto.yt.T3.prototype.getF15 = function () {
        return o.Message.getFieldWithDefault(this, 15, 0);
      }),
      (proto.yt.T3.prototype.setF15 = function (e) {
        return o.Message.setField(this, 15, e);
      }),
      (proto.yt.T3.prototype.clearF15 = function () {
        return o.Message.setField(this, 15, void 0);
      }),
      (proto.yt.T3.prototype.hasF15 = function () {
        return null != o.Message.getField(this, 15);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.T5.prototype.toObject = function (e) {
          return proto.yt.T5.toObject(e, this);
        }),
        (proto.yt.T5.toObject = function (e, t) {
          var r,
            i = { s33: null == (r = o.Message.getField(t, 33)) ? void 0 : r };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.T5.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.T5();
        return proto.yt.T5.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.T5.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 33:
              var r = t.readString();
              e.setS33(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.T5.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.T5.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.T5.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 33)) && t.writeString(33, r);
      }),
      (proto.yt.T5.prototype.getS33 = function () {
        return o.Message.getFieldWithDefault(this, 33, '');
      }),
      (proto.yt.T5.prototype.setS33 = function (e) {
        return o.Message.setField(this, 33, e);
      }),
      (proto.yt.T5.prototype.clearS33 = function () {
        return o.Message.setField(this, 33, void 0);
      }),
      (proto.yt.T5.prototype.hasS33 = function () {
        return null != o.Message.getField(this, 33);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.T6.prototype.toObject = function (e) {
          return proto.yt.T6.toObject(e, this);
        }),
        (proto.yt.T6.toObject = function (e, t) {
          var r,
            i = { s2: null == (r = o.Message.getField(t, 2)) ? void 0 : r };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.T6.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.T6();
        return proto.yt.T6.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.T6.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = t.readString();
              e.setS2(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.T6.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.T6.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.T6.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 2)) && t.writeString(2, r);
      }),
      (proto.yt.T6.prototype.getS2 = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.T6.prototype.setS2 = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.T6.prototype.clearS2 = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.T6.prototype.hasS2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Pp1.prototype.toObject = function (e) {
          return proto.yt.Pp1.toObject(e, this);
        }),
        (proto.yt.Pp1.toObject = function (e, t) {
          var r,
            i = {
              s1: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              s2: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Pp1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Pp1();
        return proto.yt.Pp1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Pp1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setS1(r);
              break;
            case 2:
              r = t.readString();
              e.setS2(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Pp1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Pp1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Pp1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r);
      }),
      (proto.yt.Pp1.prototype.getS1 = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.Pp1.prototype.setS1 = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Pp1.prototype.clearS1 = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Pp1.prototype.hasS1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Pp1.prototype.getS2 = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.Pp1.prototype.setS2 = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.Pp1.prototype.clearS2 = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.Pp1.prototype.hasS2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.T9.prototype.toObject = function (e) {
          return proto.yt.T9.toObject(e, this);
        }),
        (proto.yt.T9.toObject = function (e, t) {
          var r,
            i = {
              pp1: (r = t.getPp1()) && proto.yt.Pp1.toObject(e, r),
              f6: null == (r = o.Message.getField(t, 6)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.T9.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.T9();
        return proto.yt.T9.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.T9.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Pp1();
              t.readMessage(r, proto.yt.Pp1.deserializeBinaryFromReader),
                e.setPp1(r);
              break;
            case 6:
              r = t.readInt32();
              e.setF6(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.T9.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.T9.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.T9.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getPp1()) &&
          t.writeMessage(1, r, proto.yt.Pp1.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 6)) && t.writeInt32(6, r);
      }),
      (proto.yt.T9.prototype.getPp1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Pp1, 1);
      }),
      (proto.yt.T9.prototype.setPp1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.T9.prototype.clearPp1 = function () {
        return this.setPp1(void 0);
      }),
      (proto.yt.T9.prototype.hasPp1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.T9.prototype.getF6 = function () {
        return o.Message.getFieldWithDefault(this, 6, 0);
      }),
      (proto.yt.T9.prototype.setF6 = function (e) {
        return o.Message.setField(this, 6, e);
      }),
      (proto.yt.T9.prototype.clearF6 = function () {
        return o.Message.setField(this, 6, void 0);
      }),
      (proto.yt.T9.prototype.hasF6 = function () {
        return null != o.Message.getField(this, 6);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.B1.prototype.toObject = function (e) {
          return proto.yt.B1.toObject(e, this);
        }),
        (proto.yt.B1.toObject = function (e, t) {
          var r,
            o = {
              client: (r = t.getClient()) && proto.yt.Client.toObject(e, r),
              t3: (r = t.getT3()) && proto.yt.T3.toObject(e, r),
              t5: (r = t.getT5()) && proto.yt.T5.toObject(e, r),
              t6: (r = t.getT6()) && proto.yt.T6.toObject(e, r),
              t9: (r = t.getT9()) && proto.yt.T9.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.B1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.B1();
        return proto.yt.B1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.B1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Client();
              t.readMessage(r, proto.yt.Client.deserializeBinaryFromReader),
                e.setClient(r);
              break;
            case 3:
              r = new proto.yt.T3();
              t.readMessage(r, proto.yt.T3.deserializeBinaryFromReader),
                e.setT3(r);
              break;
            case 5:
              r = new proto.yt.T5();
              t.readMessage(r, proto.yt.T5.deserializeBinaryFromReader),
                e.setT5(r);
              break;
            case 6:
              r = new proto.yt.T6();
              t.readMessage(r, proto.yt.T6.deserializeBinaryFromReader),
                e.setT6(r);
              break;
            case 9:
              r = new proto.yt.T9();
              t.readMessage(r, proto.yt.T9.deserializeBinaryFromReader),
                e.setT9(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.B1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.B1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.B1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getClient()) &&
          t.writeMessage(1, r, proto.yt.Client.serializeBinaryToWriter),
          null != (r = e.getT3()) &&
            t.writeMessage(3, r, proto.yt.T3.serializeBinaryToWriter),
          null != (r = e.getT5()) &&
            t.writeMessage(5, r, proto.yt.T5.serializeBinaryToWriter),
          null != (r = e.getT6()) &&
            t.writeMessage(6, r, proto.yt.T6.serializeBinaryToWriter),
          null != (r = e.getT9()) &&
            t.writeMessage(9, r, proto.yt.T9.serializeBinaryToWriter);
      }),
      (proto.yt.B1.prototype.getClient = function () {
        return o.Message.getWrapperField(this, proto.yt.Client, 1);
      }),
      (proto.yt.B1.prototype.setClient = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.B1.prototype.clearClient = function () {
        return this.setClient(void 0);
      }),
      (proto.yt.B1.prototype.hasClient = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.B1.prototype.getT3 = function () {
        return o.Message.getWrapperField(this, proto.yt.T3, 3);
      }),
      (proto.yt.B1.prototype.setT3 = function (e) {
        return o.Message.setWrapperField(this, 3, e);
      }),
      (proto.yt.B1.prototype.clearT3 = function () {
        return this.setT3(void 0);
      }),
      (proto.yt.B1.prototype.hasT3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      (proto.yt.B1.prototype.getT5 = function () {
        return o.Message.getWrapperField(this, proto.yt.T5, 5);
      }),
      (proto.yt.B1.prototype.setT5 = function (e) {
        return o.Message.setWrapperField(this, 5, e);
      }),
      (proto.yt.B1.prototype.clearT5 = function () {
        return this.setT5(void 0);
      }),
      (proto.yt.B1.prototype.hasT5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      (proto.yt.B1.prototype.getT6 = function () {
        return o.Message.getWrapperField(this, proto.yt.T6, 6);
      }),
      (proto.yt.B1.prototype.setT6 = function (e) {
        return o.Message.setWrapperField(this, 6, e);
      }),
      (proto.yt.B1.prototype.clearT6 = function () {
        return this.setT6(void 0);
      }),
      (proto.yt.B1.prototype.hasT6 = function () {
        return null != o.Message.getField(this, 6);
      }),
      (proto.yt.B1.prototype.getT9 = function () {
        return o.Message.getWrapperField(this, proto.yt.T9, 9);
      }),
      (proto.yt.B1.prototype.setT9 = function (e) {
        return o.Message.setWrapperField(this, 9, e);
      }),
      (proto.yt.B1.prototype.clearT9 = function () {
        return this.setT9(void 0);
      }),
      (proto.yt.B1.prototype.hasT9 = function () {
        return null != o.Message.getField(this, 9);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerRequest.prototype.toObject = function (e) {
          return proto.yt.PlayerRequest.toObject(e, this);
        }),
        (proto.yt.PlayerRequest.toObject = function (e, t) {
          var r,
            i = {
              b1: (r = t.getB1()) && proto.yt.B1.toObject(e, r),
              videoid: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              field3: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
              g4: (r = t.getG4()) && proto.yt.PlayerRequest.G4.toObject(e, r),
              field5: null == (r = o.Message.getField(t, 5)) ? void 0 : r,
              field8: null == (r = o.Message.getField(t, 8)) ? void 0 : r,
              field23: null == (r = o.Message.getField(t, 23)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.PlayerRequest.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerRequest();
        return proto.yt.PlayerRequest.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.PlayerRequest.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.B1();
              t.readMessage(r, proto.yt.B1.deserializeBinaryFromReader),
                e.setB1(r);
              break;
            case 2:
              r = t.readString();
              e.setVideoid(r);
              break;
            case 3:
              r = t.readEnum();
              e.setField3(r);
              break;
            case 4:
              r = new proto.yt.PlayerRequest.G4();
              t.readMessage(
                r,
                proto.yt.PlayerRequest.G4.deserializeBinaryFromReader
              ),
                e.setG4(r);
              break;
            case 5:
              r = t.readEnum();
              e.setField5(r);
              break;
            case 8:
              r = t.readEnum();
              e.setField8(r);
              break;
            case 23:
              r = t.readString();
              e.setField23(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.PlayerRequest.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.PlayerRequest.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.PlayerRequest.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getB1()) &&
          t.writeMessage(1, r, proto.yt.B1.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 3)) && t.writeEnum(3, r),
          null != (r = e.getG4()) &&
            t.writeMessage(
              4,
              r,
              proto.yt.PlayerRequest.G4.serializeBinaryToWriter
            ),
          null != (r = o.Message.getField(e, 5)) && t.writeEnum(5, r),
          null != (r = o.Message.getField(e, 8)) && t.writeEnum(8, r),
          null != (r = o.Message.getField(e, 23)) && t.writeString(23, r);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerRequest.App.prototype.toObject = function (e) {
          return proto.yt.PlayerRequest.App.toObject(e, this);
        }),
        (proto.yt.PlayerRequest.App.toObject = function (e, t) {
          var r,
            i = {
              name: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
              f4: null == (r = o.Message.getField(t, 4)) ? void 0 : r,
              f5: null == (r = o.Message.getField(t, 5)) ? void 0 : r,
              sdk: null == (r = o.Message.getField(t, 12)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.PlayerRequest.App.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerRequest.App();
        return proto.yt.PlayerRequest.App.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.PlayerRequest.App.deserializeBinaryFromReader = function (
        e,
        t
      ) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 3:
              var r = t.readString();
              e.setName(r);
              break;
            case 4:
              r = t.readInt32();
              e.setF4(r);
              break;
            case 5:
              r = t.readInt32();
              e.setF5(r);
              break;
            case 12:
              r = t.readString();
              e.setSdk(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.PlayerRequest.App.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.PlayerRequest.App.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.PlayerRequest.App.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 3)) && t.writeString(3, r),
          null != (r = o.Message.getField(e, 4)) && t.writeInt32(4, r),
          null != (r = o.Message.getField(e, 5)) && t.writeInt32(5, r),
          null != (r = o.Message.getField(e, 12)) && t.writeString(12, r);
      }),
      (proto.yt.PlayerRequest.App.prototype.getName = function () {
        return o.Message.getFieldWithDefault(this, 3, '');
      }),
      (proto.yt.PlayerRequest.App.prototype.setName = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.PlayerRequest.App.prototype.clearName = function () {
        return o.Message.setField(this, 3, void 0);
      });
    (proto.yt.PlayerRequest.App.prototype.hasName = function () {
      return null != o.Message.getField(this, 3);
    }),
      (proto.yt.PlayerRequest.App.prototype.getF4 = function () {
        return o.Message.getFieldWithDefault(this, 4, 0);
      }),
      (proto.yt.PlayerRequest.App.prototype.setF4 = function (e) {
        return o.Message.setField(this, 4, e);
      }),
      (proto.yt.PlayerRequest.App.prototype.clearF4 = function () {
        return o.Message.setField(this, 4, void 0);
      }),
      (proto.yt.PlayerRequest.App.prototype.hasF4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      (proto.yt.PlayerRequest.App.prototype.getF5 = function () {
        return o.Message.getFieldWithDefault(this, 5, 0);
      }),
      (proto.yt.PlayerRequest.App.prototype.setF5 = function (e) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.PlayerRequest.App.prototype.clearF5 = function () {
        return o.Message.setField(this, 5, void 0);
      }),
      (proto.yt.PlayerRequest.App.prototype.hasF5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      (proto.yt.PlayerRequest.App.prototype.getSdk = function () {
        return o.Message.getFieldWithDefault(this, 12, '');
      }),
      (proto.yt.PlayerRequest.App.prototype.setSdk = function (e) {
        return o.Message.setField(this, 12, e);
      }),
      (proto.yt.PlayerRequest.App.prototype.clearSdk = function () {
        return o.Message.setField(this, 12, void 0);
      }),
      (proto.yt.PlayerRequest.App.prototype.hasSdk = function () {
        return null != o.Message.getField(this, 12);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerRequest.G4.prototype.toObject = function (e) {
          return proto.yt.PlayerRequest.G4.toObject(e, this);
        }),
        (proto.yt.PlayerRequest.G4.toObject = function (e, t) {
          var r,
            o = {
              app:
                (r = t.getApp()) && proto.yt.PlayerRequest.App.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.PlayerRequest.G4.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerRequest.G4();
        return proto.yt.PlayerRequest.G4.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.PlayerRequest.G4.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.PlayerRequest.App();
              t.readMessage(
                r,
                proto.yt.PlayerRequest.App.deserializeBinaryFromReader
              ),
                e.setApp(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.PlayerRequest.G4.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.PlayerRequest.G4.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.PlayerRequest.G4.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getApp()) &&
          t.writeMessage(
            1,
            r,
            proto.yt.PlayerRequest.App.serializeBinaryToWriter
          );
      }),
      (proto.yt.PlayerRequest.G4.prototype.getApp = function () {
        return o.Message.getWrapperField(this, proto.yt.PlayerRequest.App, 1);
      }),
      (proto.yt.PlayerRequest.G4.prototype.setApp = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.PlayerRequest.G4.prototype.clearApp = function () {
        return this.setApp(void 0);
      }),
      (proto.yt.PlayerRequest.G4.prototype.hasApp = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.PlayerRequest.prototype.getB1 = function () {
        return o.Message.getWrapperField(this, proto.yt.B1, 1);
      }),
      (proto.yt.PlayerRequest.prototype.setB1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.PlayerRequest.prototype.clearB1 = function () {
        return this.setB1(void 0);
      }),
      (proto.yt.PlayerRequest.prototype.hasB1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.PlayerRequest.prototype.getVideoid = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.PlayerRequest.prototype.setVideoid = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.PlayerRequest.prototype.clearVideoid = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.PlayerRequest.prototype.hasVideoid = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.PlayerRequest.prototype.getField3 = function () {
        return o.Message.getFieldWithDefault(this, 3, 0);
      }),
      (proto.yt.PlayerRequest.prototype.setField3 = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.PlayerRequest.prototype.clearField3 = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.PlayerRequest.prototype.hasField3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      (proto.yt.PlayerRequest.prototype.getG4 = function () {
        return o.Message.getWrapperField(this, proto.yt.PlayerRequest.G4, 4);
      }),
      (proto.yt.PlayerRequest.prototype.setG4 = function (e) {
        return o.Message.setWrapperField(this, 4, e);
      }),
      (proto.yt.PlayerRequest.prototype.clearG4 = function () {
        return this.setG4(void 0);
      }),
      (proto.yt.PlayerRequest.prototype.hasG4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      (proto.yt.PlayerRequest.prototype.getField5 = function () {
        return o.Message.getFieldWithDefault(this, 5, 0);
      }),
      (proto.yt.PlayerRequest.prototype.setField5 = function (e) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.PlayerRequest.prototype.clearField5 = function () {
        return o.Message.setField(this, 5, void 0);
      }),
      (proto.yt.PlayerRequest.prototype.hasField5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      (proto.yt.PlayerRequest.prototype.getField8 = function () {
        return o.Message.getFieldWithDefault(this, 8, 0);
      }),
      (proto.yt.PlayerRequest.prototype.setField8 = function (e) {
        return o.Message.setField(this, 8, e);
      }),
      (proto.yt.PlayerRequest.prototype.clearField8 = function () {
        return o.Message.setField(this, 8, void 0);
      }),
      (proto.yt.PlayerRequest.prototype.hasField8 = function () {
        return null != o.Message.getField(this, 8);
      }),
      (proto.yt.PlayerRequest.prototype.getField23 = function () {
        return o.Message.getFieldWithDefault(this, 23, '');
      }),
      (proto.yt.PlayerRequest.prototype.setField23 = function (e) {
        return o.Message.setField(this, 23, e);
      }),
      (proto.yt.PlayerRequest.prototype.clearField23 = function () {
        return o.Message.setField(this, 23, void 0);
      }),
      (proto.yt.PlayerRequest.prototype.hasField23 = function () {
        return null != o.Message.getField(this, 23);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Subtitle.prototype.toObject = function (e) {
          return proto.yt.Subtitle.toObject(e, this);
        }),
        (proto.yt.Subtitle.toObject = function (e, t) {
          var r,
            i = {
              url: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              label: (r = t.getLabel()) && proto.yt.Holder.toObject(e, r),
              srclang: null == (r = o.Message.getField(t, 4)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Subtitle.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Subtitle();
        return proto.yt.Subtitle.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Subtitle.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setUrl(r);
              break;
            case 2:
              r = new proto.yt.Holder();
              t.readMessage(r, proto.yt.Holder.deserializeBinaryFromReader),
                e.setLabel(r);
              break;
            case 4:
              r = t.readString();
              e.setSrclang(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Subtitle.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Subtitle.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.Subtitle.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = e.getLabel()) &&
            t.writeMessage(2, r, proto.yt.Holder.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 4)) && t.writeString(4, r);
      }),
      (proto.yt.Subtitle.prototype.getUrl = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.Subtitle.prototype.setUrl = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Subtitle.prototype.clearUrl = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Subtitle.prototype.hasUrl = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Subtitle.prototype.getLabel = function () {
        return o.Message.getWrapperField(this, proto.yt.Holder, 2);
      }),
      (proto.yt.Subtitle.prototype.setLabel = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.Subtitle.prototype.clearLabel = function () {
        return this.setLabel(void 0);
      }),
      (proto.yt.Subtitle.prototype.hasLabel = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Subtitle.prototype.getSrclang = function () {
        return o.Message.getFieldWithDefault(this, 4, '');
      }),
      (proto.yt.Subtitle.prototype.setSrclang = function (e) {
        return o.Message.setField(this, 4, e);
      }),
      (proto.yt.Subtitle.prototype.clearSrclang = function () {
        return o.Message.setField(this, 4, void 0);
      }),
      (proto.yt.Subtitle.prototype.hasSrclang = function () {
        return null != o.Message.getField(this, 4);
      }),
      (proto.yt.Sub516.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Sub516.prototype.toObject = function (e) {
          return proto.yt.Sub516.toObject(e, this);
        }),
        (proto.yt.Sub516.toObject = function (e, t) {
          var r = {
            subtitleList: o.Message.toObjectList(
              t.getSubtitleList(),
              proto.yt.Subtitle.toObject,
              e
            ),
          };
          return e && (r.$jspbMessageInstance = t), r;
        })),
      (proto.yt.Sub516.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Sub516();
        return proto.yt.Sub516.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Sub516.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Subtitle();
              t.readMessage(r, proto.yt.Subtitle.deserializeBinaryFromReader),
                e.addSubtitle(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Sub516.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Sub516.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Sub516.serializeBinaryToWriter = function (e, t) {
        var r;
        (r = e.getSubtitleList()).length > 0 &&
          t.writeRepeatedMessage(
            1,
            r,
            proto.yt.Subtitle.serializeBinaryToWriter
          );
      }),
      (proto.yt.Sub516.prototype.getSubtitleList = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.Subtitle, 1);
      }),
      (proto.yt.Sub516.prototype.setSubtitleList = function (e) {
        return o.Message.setRepeatedWrapperField(this, 1, e);
      }),
      (proto.yt.Sub516.prototype.addSubtitle = function (e, t) {
        return o.Message.addToRepeatedWrapperField(
          this,
          1,
          e,
          proto.yt.Subtitle,
          t
        );
      }),
      (proto.yt.Sub516.prototype.clearSubtitleList = function () {
        return this.setSubtitleList([]);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerResponse.prototype.toObject = function (e) {
          return proto.yt.PlayerResponse.toObject(e, this);
        }),
        (proto.yt.PlayerResponse.toObject = function (e, t) {
          var r,
            o = {
              playabilityStatus:
                (r = t.getPlayabilityStatus()) &&
                proto.yt.PlayerResponse.PlayabilityStatus.toObject(e, r),
              streammap:
                (r = t.getStreammap()) &&
                proto.yt.PlayerResponse.StreamMap.toObject(e, r),
              subtitlesObject:
                (r = t.getSubtitlesObject()) &&
                proto.yt.PlayerResponse.SubtitlesObject.toObject(e, r),
              details:
                (r = t.getDetails()) &&
                proto.yt.PlayerResponse.Details.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.PlayerResponse.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerResponse();
        return proto.yt.PlayerResponse.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.PlayerResponse.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = new proto.yt.PlayerResponse.PlayabilityStatus();
              t.readMessage(
                r,
                proto.yt.PlayerResponse.PlayabilityStatus
                  .deserializeBinaryFromReader
              ),
                e.setPlayabilityStatus(r);
              break;
            case 4:
              r = new proto.yt.PlayerResponse.StreamMap();
              t.readMessage(
                r,
                proto.yt.PlayerResponse.StreamMap.deserializeBinaryFromReader
              ),
                e.setStreammap(r);
              break;
            case 10:
              r = new proto.yt.PlayerResponse.SubtitlesObject();
              t.readMessage(
                r,
                proto.yt.PlayerResponse.SubtitlesObject
                  .deserializeBinaryFromReader
              ),
                e.setSubtitlesObject(r);
              break;
            case 11:
              r = new proto.yt.PlayerResponse.Details();
              t.readMessage(
                r,
                proto.yt.PlayerResponse.Details.deserializeBinaryFromReader
              ),
                e.setDetails(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.PlayerResponse.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.PlayerResponse.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.PlayerResponse.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getPlayabilityStatus()) &&
          t.writeMessage(
            2,
            r,
            proto.yt.PlayerResponse.PlayabilityStatus.serializeBinaryToWriter
          ),
          null != (r = e.getStreammap()) &&
            t.writeMessage(
              4,
              r,
              proto.yt.PlayerResponse.StreamMap.serializeBinaryToWriter
            ),
          null != (r = e.getSubtitlesObject()) &&
            t.writeMessage(
              10,
              r,
              proto.yt.PlayerResponse.SubtitlesObject.serializeBinaryToWriter
            ),
          null != (r = e.getDetails()) &&
            t.writeMessage(
              11,
              r,
              proto.yt.PlayerResponse.Details.serializeBinaryToWriter
            );
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerResponse.LiveInfo.prototype.toObject = function (e) {
          return proto.yt.PlayerResponse.LiveInfo.toObject(e, this);
        }),
        (proto.yt.PlayerResponse.LiveInfo.toObject = function (e, t) {
          var r = {};
          return e && (r.$jspbMessageInstance = t), r;
        })),
      (proto.yt.PlayerResponse.LiveInfo.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerResponse.LiveInfo();
        return proto.yt.PlayerResponse.LiveInfo.deserializeBinaryFromReader(
          r,
          t
        );
      }),
      (proto.yt.PlayerResponse.LiveInfo.deserializeBinaryFromReader = function (
        e,
        t
      ) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          t.getFieldNumber();
          t.skipField();
        }
        return e;
      }),
      (proto.yt.PlayerResponse.LiveInfo.prototype.serializeBinary =
        function () {
          var e = new o.BinaryWriter();
          return (
            proto.yt.PlayerResponse.LiveInfo.serializeBinaryToWriter(this, e),
            e.getResultBuffer()
          );
        }),
      (proto.yt.PlayerResponse.LiveInfo.serializeBinaryToWriter = function (
        e,
        t
      ) {}),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerResponse.PlayabilityStatus.prototype.toObject =
          function (e) {
            return proto.yt.PlayerResponse.PlayabilityStatus.toObject(e, this);
          }),
        (proto.yt.PlayerResponse.PlayabilityStatus.toObject = function (e, t) {
          var r,
            i = {
              status: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              reason: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              liveInfo:
                (r = t.getLiveInfo()) &&
                proto.yt.PlayerResponse.LiveInfo.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.PlayerResponse.PlayabilityStatus.deserializeBinary = function (
        e
      ) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerResponse.PlayabilityStatus();
        return proto.yt.PlayerResponse.PlayabilityStatus.deserializeBinaryFromReader(
          r,
          t
        );
      }),
      (proto.yt.PlayerResponse.PlayabilityStatus.deserializeBinaryFromReader =
        function (e, t) {
          for (; t.nextField() && !t.isEndGroup(); ) {
            switch (t.getFieldNumber()) {
              case 1:
                var r = t.readEnum();
                e.setStatus(r);
                break;
              case 2:
                r = t.readString();
                e.setReason(r);
                break;
              case 18:
                r = new proto.yt.PlayerResponse.LiveInfo();
                t.readMessage(
                  r,
                  proto.yt.PlayerResponse.LiveInfo.deserializeBinaryFromReader
                ),
                  e.setLiveInfo(r);
                break;
              default:
                t.skipField();
            }
          }
          return e;
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.serializeBinary =
        function () {
          var e = new o.BinaryWriter();
          return (
            proto.yt.PlayerResponse.PlayabilityStatus.serializeBinaryToWriter(
              this,
              e
            ),
            e.getResultBuffer()
          );
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.serializeBinaryToWriter =
        function (e, t) {
          var r = void 0;
          null != (r = o.Message.getField(e, 1)) && t.writeEnum(1, r),
            null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
            null != (r = e.getLiveInfo()) &&
              t.writeMessage(
                18,
                r,
                proto.yt.PlayerResponse.LiveInfo.serializeBinaryToWriter
              );
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.Code = {
        OK: 0,
        LOGIN_REQUIRED: 3,
        CONTENT_CHECK_REQUIRED: 4,
      }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.getStatus =
        function () {
          return o.Message.getFieldWithDefault(this, 1, 0);
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.setStatus =
        function (e) {
          return o.Message.setField(this, 1, e);
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.clearStatus =
        function () {
          return o.Message.setField(this, 1, void 0);
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.hasStatus =
        function () {
          return null != o.Message.getField(this, 1);
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.getReason =
        function () {
          return o.Message.getFieldWithDefault(this, 2, '');
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.setReason =
        function (e) {
          return o.Message.setField(this, 2, e);
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.clearReason =
        function () {
          return o.Message.setField(this, 2, void 0);
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.hasReason =
        function () {
          return null != o.Message.getField(this, 2);
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.getLiveInfo =
        function () {
          return o.Message.getWrapperField(
            this,
            proto.yt.PlayerResponse.LiveInfo,
            18
          );
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.setLiveInfo =
        function (e) {
          return o.Message.setWrapperField(this, 18, e);
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.clearLiveInfo =
        function () {
          return this.setLiveInfo(void 0);
        }),
      (proto.yt.PlayerResponse.PlayabilityStatus.prototype.hasLiveInfo =
        function () {
          return null != o.Message.getField(this, 18);
        }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerResponse.Stream2.prototype.toObject = function (e) {
          return proto.yt.PlayerResponse.Stream2.toObject(e, this);
        }),
        (proto.yt.PlayerResponse.Stream2.toObject = function (e, t) {
          var r,
            i = {
              url: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              codec: null == (r = o.Message.getField(t, 5)) ? void 0 : r,
              quality: null == (r = o.Message.getField(t, 16)) ? void 0 : r,
              resolution: null == (r = o.Message.getField(t, 26)) ? void 0 : r,
              width: null == (r = o.Message.getField(t, 7)) ? void 0 : r,
              height: null == (r = o.Message.getField(t, 8)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.PlayerResponse.Stream2.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerResponse.Stream2();
        return proto.yt.PlayerResponse.Stream2.deserializeBinaryFromReader(
          r,
          t
        );
      }),
      (proto.yt.PlayerResponse.Stream2.deserializeBinaryFromReader = function (
        e,
        t
      ) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = t.readString();
              e.setUrl(r);
              break;
            case 5:
              r = t.readString();
              e.setCodec(r);
              break;
            case 16:
              r = t.readString();
              e.setQuality(r);
              break;
            case 26:
              r = t.readString();
              e.setResolution(r);
              break;
            case 7:
              r = t.readInt32();
              e.setWidth(r);
              break;
            case 8:
              r = t.readInt32();
              e.setHeight(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.PlayerResponse.Stream2.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.PlayerResponse.Stream2.serializeBinaryToWriter = function (
        e,
        t
      ) {
        var r = void 0;
        null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 5)) && t.writeString(5, r),
          null != (r = o.Message.getField(e, 16)) && t.writeString(16, r),
          null != (r = o.Message.getField(e, 26)) && t.writeString(26, r),
          null != (r = o.Message.getField(e, 7)) && t.writeInt32(7, r),
          null != (r = o.Message.getField(e, 8)) && t.writeInt32(8, r);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.getUrl = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.setUrl = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.clearUrl = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.hasUrl = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.getCodec = function () {
        return o.Message.getFieldWithDefault(this, 5, '');
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.setCodec = function (e) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.clearCodec = function () {
        return o.Message.setField(this, 5, void 0);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.hasCodec = function () {
        return null != o.Message.getField(this, 5);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.getQuality = function () {
        return o.Message.getFieldWithDefault(this, 16, '');
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.setQuality = function (e) {
        return o.Message.setField(this, 16, e);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.clearQuality = function () {
        return o.Message.setField(this, 16, void 0);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.hasQuality = function () {
        return null != o.Message.getField(this, 16);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.getResolution = function () {
        return o.Message.getFieldWithDefault(this, 26, '');
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.setResolution = function (e) {
        return o.Message.setField(this, 26, e);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.clearResolution = function () {
        return o.Message.setField(this, 26, void 0);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.hasResolution = function () {
        return null != o.Message.getField(this, 26);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.getWidth = function () {
        return o.Message.getFieldWithDefault(this, 7, 0);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.setWidth = function (e) {
        return o.Message.setField(this, 7, e);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.clearWidth = function () {
        return o.Message.setField(this, 7, void 0);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.hasWidth = function () {
        return null != o.Message.getField(this, 7);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.getHeight = function () {
        return o.Message.getFieldWithDefault(this, 8, 0);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.setHeight = function (e) {
        return o.Message.setField(this, 8, e);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.clearHeight = function () {
        return o.Message.setField(this, 8, void 0);
      }),
      (proto.yt.PlayerResponse.Stream2.prototype.hasHeight = function () {
        return null != o.Message.getField(this, 8);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerResponse.Range.prototype.toObject = function (e) {
          return proto.yt.PlayerResponse.Range.toObject(e, this);
        }),
        (proto.yt.PlayerResponse.Range.toObject = function (e, t) {
          var r,
            i = {
              from: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
              to: null == (r = o.Message.getField(t, 4)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.PlayerResponse.Range.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerResponse.Range();
        return proto.yt.PlayerResponse.Range.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.PlayerResponse.Range.deserializeBinaryFromReader = function (
        e,
        t
      ) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 3:
              var r = t.readInt32();
              e.setFrom(r);
              break;
            case 4:
              r = t.readInt32();
              e.setTo(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.PlayerResponse.Range.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.PlayerResponse.Range.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.PlayerResponse.Range.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 3)) && t.writeInt32(3, r),
          null != (r = o.Message.getField(e, 4)) && t.writeInt32(4, r);
      }),
      (proto.yt.PlayerResponse.Range.prototype.getFrom = function () {
        return o.Message.getFieldWithDefault(this, 3, 0);
      }),
      (proto.yt.PlayerResponse.Range.prototype.setFrom = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.PlayerResponse.Range.prototype.clearFrom = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.PlayerResponse.Range.prototype.hasFrom = function () {
        return null != o.Message.getField(this, 3);
      }),
      (proto.yt.PlayerResponse.Range.prototype.getTo = function () {
        return o.Message.getFieldWithDefault(this, 4, 0);
      }),
      (proto.yt.PlayerResponse.Range.prototype.setTo = function (e) {
        return o.Message.setField(this, 4, e);
      }),
      (proto.yt.PlayerResponse.Range.prototype.clearTo = function () {
        return o.Message.setField(this, 4, void 0);
      }),
      (proto.yt.PlayerResponse.Range.prototype.hasTo = function () {
        return null != o.Message.getField(this, 4);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerResponse.Language.prototype.toObject = function (e) {
          return proto.yt.PlayerResponse.Language.toObject(e, this);
        }),
        (proto.yt.PlayerResponse.Language.toObject = function (e, t) {
          var r,
            i = {
              name: null == (r = o.Message.getField(t, 4)) ? void 0 : r,
              code: null == (r = o.Message.getField(t, 5)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.PlayerResponse.Language.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerResponse.Language();
        return proto.yt.PlayerResponse.Language.deserializeBinaryFromReader(
          r,
          t
        );
      }),
      (proto.yt.PlayerResponse.Language.deserializeBinaryFromReader = function (
        e,
        t
      ) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 4:
              var r = t.readString();
              e.setName(r);
              break;
            case 5:
              r = t.readString();
              e.setCode(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.PlayerResponse.Language.prototype.serializeBinary =
        function () {
          var e = new o.BinaryWriter();
          return (
            proto.yt.PlayerResponse.Language.serializeBinaryToWriter(this, e),
            e.getResultBuffer()
          );
        }),
      (proto.yt.PlayerResponse.Language.serializeBinaryToWriter = function (
        e,
        t
      ) {
        var r = void 0;
        null != (r = o.Message.getField(e, 4)) && t.writeString(4, r),
          null != (r = o.Message.getField(e, 5)) && t.writeString(5, r);
      }),
      (proto.yt.PlayerResponse.Language.prototype.getName = function () {
        return o.Message.getFieldWithDefault(this, 4, '');
      }),
      (proto.yt.PlayerResponse.Language.prototype.setName = function (e) {
        return o.Message.setField(this, 4, e);
      }),
      (proto.yt.PlayerResponse.Language.prototype.clearName = function () {
        return o.Message.setField(this, 4, void 0);
      }),
      (proto.yt.PlayerResponse.Language.prototype.hasName = function () {
        return null != o.Message.getField(this, 4);
      }),
      (proto.yt.PlayerResponse.Language.prototype.getCode = function () {
        return o.Message.getFieldWithDefault(this, 5, '');
      }),
      (proto.yt.PlayerResponse.Language.prototype.setCode = function (e) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.PlayerResponse.Language.prototype.clearCode = function () {
        return o.Message.setField(this, 5, void 0);
      }),
      (proto.yt.PlayerResponse.Language.prototype.hasCode = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerResponse.Stream3.prototype.toObject = function (e) {
          return proto.yt.PlayerResponse.Stream3.toObject(e, this);
        }),
        (proto.yt.PlayerResponse.Stream3.toObject = function (e, t) {
          var r,
            i = {
              itag: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              url: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              mimeAndCodecs:
                null == (r = o.Message.getField(t, 5)) ? void 0 : r,
              bandwidth: null == (r = o.Message.getField(t, 6)) ? void 0 : r,
              initializationRange:
                (r = t.getInitializationRange()) &&
                proto.yt.PlayerResponse.Range.toObject(e, r),
              indexRange:
                (r = t.getIndexRange()) &&
                proto.yt.PlayerResponse.Range.toObject(e, r),
              quality: null == (r = o.Message.getField(t, 16)) ? void 0 : r,
              resolution: null == (r = o.Message.getField(t, 26)) ? void 0 : r,
              language:
                (r = t.getLanguage()) &&
                proto.yt.PlayerResponse.Language.toObject(e, r),
              width: null == (r = o.Message.getField(t, 7)) ? void 0 : r,
              height: null == (r = o.Message.getField(t, 8)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.PlayerResponse.Stream3.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerResponse.Stream3();
        return proto.yt.PlayerResponse.Stream3.deserializeBinaryFromReader(
          r,
          t
        );
      }),
      (proto.yt.PlayerResponse.Stream3.deserializeBinaryFromReader = function (
        e,
        t
      ) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readInt32();
              e.setItag(r);
              break;
            case 2:
              r = t.readString();
              e.setUrl(r);
              break;
            case 5:
              r = t.readString();
              e.setMimeAndCodecs(r);
              break;
            case 6:
              r = t.readInt32();
              e.setBandwidth(r);
              break;
            case 9:
              r = new proto.yt.PlayerResponse.Range();
              t.readMessage(
                r,
                proto.yt.PlayerResponse.Range.deserializeBinaryFromReader
              ),
                e.setInitializationRange(r);
              break;
            case 10:
              r = new proto.yt.PlayerResponse.Range();
              t.readMessage(
                r,
                proto.yt.PlayerResponse.Range.deserializeBinaryFromReader
              ),
                e.setIndexRange(r);
              break;
            case 16:
              r = t.readString();
              e.setQuality(r);
              break;
            case 26:
              r = t.readString();
              e.setResolution(r);
              break;
            case 28:
              r = new proto.yt.PlayerResponse.Language();
              t.readMessage(
                r,
                proto.yt.PlayerResponse.Language.deserializeBinaryFromReader
              ),
                e.setLanguage(r);
              break;
            case 7:
              r = t.readInt32();
              e.setWidth(r);
              break;
            case 8:
              r = t.readInt32();
              e.setHeight(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.PlayerResponse.Stream3.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.PlayerResponse.Stream3.serializeBinaryToWriter = function (
        e,
        t
      ) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeInt32(1, r),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 5)) && t.writeString(5, r),
          null != (r = o.Message.getField(e, 6)) && t.writeInt32(6, r),
          null != (r = e.getInitializationRange()) &&
            t.writeMessage(
              9,
              r,
              proto.yt.PlayerResponse.Range.serializeBinaryToWriter
            ),
          null != (r = e.getIndexRange()) &&
            t.writeMessage(
              10,
              r,
              proto.yt.PlayerResponse.Range.serializeBinaryToWriter
            ),
          null != (r = o.Message.getField(e, 16)) && t.writeString(16, r),
          null != (r = o.Message.getField(e, 26)) && t.writeString(26, r),
          null != (r = e.getLanguage()) &&
            t.writeMessage(
              28,
              r,
              proto.yt.PlayerResponse.Language.serializeBinaryToWriter
            ),
          null != (r = o.Message.getField(e, 7)) && t.writeInt32(7, r),
          null != (r = o.Message.getField(e, 8)) && t.writeInt32(8, r);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.getItag = function () {
        return o.Message.getFieldWithDefault(this, 1, 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.setItag = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearItag = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasItag = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.getUrl = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.setUrl = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearUrl = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasUrl = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.getMimeAndCodecs =
        function () {
          return o.Message.getFieldWithDefault(this, 5, '');
        }),
      (proto.yt.PlayerResponse.Stream3.prototype.setMimeAndCodecs = function (
        e
      ) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearMimeAndCodecs =
        function () {
          return o.Message.setField(this, 5, void 0);
        }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasMimeAndCodecs =
        function () {
          return null != o.Message.getField(this, 5);
        }),
      (proto.yt.PlayerResponse.Stream3.prototype.getBandwidth = function () {
        return o.Message.getFieldWithDefault(this, 6, 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.setBandwidth = function (e) {
        return o.Message.setField(this, 6, e);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearBandwidth = function () {
        return o.Message.setField(this, 6, void 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasBandwidth = function () {
        return null != o.Message.getField(this, 6);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.getInitializationRange =
        function () {
          return o.Message.getWrapperField(
            this,
            proto.yt.PlayerResponse.Range,
            9
          );
        }),
      (proto.yt.PlayerResponse.Stream3.prototype.setInitializationRange =
        function (e) {
          return o.Message.setWrapperField(this, 9, e);
        }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearInitializationRange =
        function () {
          return this.setInitializationRange(void 0);
        }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasInitializationRange =
        function () {
          return null != o.Message.getField(this, 9);
        }),
      (proto.yt.PlayerResponse.Stream3.prototype.getIndexRange = function () {
        return o.Message.getWrapperField(
          this,
          proto.yt.PlayerResponse.Range,
          10
        );
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.setIndexRange = function (e) {
        return o.Message.setWrapperField(this, 10, e);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearIndexRange = function () {
        return this.setIndexRange(void 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasIndexRange = function () {
        return null != o.Message.getField(this, 10);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.getQuality = function () {
        return o.Message.getFieldWithDefault(this, 16, '');
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.setQuality = function (e) {
        return o.Message.setField(this, 16, e);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearQuality = function () {
        return o.Message.setField(this, 16, void 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasQuality = function () {
        return null != o.Message.getField(this, 16);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.getResolution = function () {
        return o.Message.getFieldWithDefault(this, 26, '');
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.setResolution = function (e) {
        return o.Message.setField(this, 26, e);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearResolution = function () {
        return o.Message.setField(this, 26, void 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasResolution = function () {
        return null != o.Message.getField(this, 26);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.getLanguage = function () {
        return o.Message.getWrapperField(
          this,
          proto.yt.PlayerResponse.Language,
          28
        );
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.setLanguage = function (e) {
        return o.Message.setWrapperField(this, 28, e);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearLanguage = function () {
        return this.setLanguage(void 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasLanguage = function () {
        return null != o.Message.getField(this, 28);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.getWidth = function () {
        return o.Message.getFieldWithDefault(this, 7, 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.setWidth = function (e) {
        return o.Message.setField(this, 7, e);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearWidth = function () {
        return o.Message.setField(this, 7, void 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasWidth = function () {
        return null != o.Message.getField(this, 7);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.getHeight = function () {
        return o.Message.getFieldWithDefault(this, 8, 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.setHeight = function (e) {
        return o.Message.setField(this, 8, e);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.clearHeight = function () {
        return o.Message.setField(this, 8, void 0);
      }),
      (proto.yt.PlayerResponse.Stream3.prototype.hasHeight = function () {
        return null != o.Message.getField(this, 8);
      }),
      (proto.yt.PlayerResponse.StreamMap.repeatedFields_ = [2, 3]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerResponse.StreamMap.prototype.toObject = function (e) {
          return proto.yt.PlayerResponse.StreamMap.toObject(e, this);
        }),
        (proto.yt.PlayerResponse.StreamMap.toObject = function (e, t) {
          var r,
            i = {
              stream2List: o.Message.toObjectList(
                t.getStream2List(),
                proto.yt.PlayerResponse.Stream2.toObject,
                e
              ),
              stream3List: o.Message.toObjectList(
                t.getStream3List(),
                proto.yt.PlayerResponse.Stream3.toObject,
                e
              ),
              hlsUrl: null == (r = o.Message.getField(t, 5)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.PlayerResponse.StreamMap.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerResponse.StreamMap();
        return proto.yt.PlayerResponse.StreamMap.deserializeBinaryFromReader(
          r,
          t
        );
      }),
      (proto.yt.PlayerResponse.StreamMap.deserializeBinaryFromReader =
        function (e, t) {
          for (; t.nextField() && !t.isEndGroup(); ) {
            switch (t.getFieldNumber()) {
              case 2:
                var r = new proto.yt.PlayerResponse.Stream2();
                t.readMessage(
                  r,
                  proto.yt.PlayerResponse.Stream2.deserializeBinaryFromReader
                ),
                  e.addStream2(r);
                break;
              case 3:
                r = new proto.yt.PlayerResponse.Stream3();
                t.readMessage(
                  r,
                  proto.yt.PlayerResponse.Stream3.deserializeBinaryFromReader
                ),
                  e.addStream3(r);
                break;
              case 5:
                r = t.readString();
                e.setHlsUrl(r);
                break;
              default:
                t.skipField();
            }
          }
          return e;
        }),
      (proto.yt.PlayerResponse.StreamMap.prototype.serializeBinary =
        function () {
          var e = new o.BinaryWriter();
          return (
            proto.yt.PlayerResponse.StreamMap.serializeBinaryToWriter(this, e),
            e.getResultBuffer()
          );
        }),
      (proto.yt.PlayerResponse.StreamMap.serializeBinaryToWriter = function (
        e,
        t
      ) {
        var r = void 0;
        (r = e.getStream2List()).length > 0 &&
          t.writeRepeatedMessage(
            2,
            r,
            proto.yt.PlayerResponse.Stream2.serializeBinaryToWriter
          ),
          (r = e.getStream3List()).length > 0 &&
            t.writeRepeatedMessage(
              3,
              r,
              proto.yt.PlayerResponse.Stream3.serializeBinaryToWriter
            ),
          null != (r = o.Message.getField(e, 5)) && t.writeString(5, r);
      }),
      (proto.yt.PlayerResponse.StreamMap.prototype.getStream2List =
        function () {
          return o.Message.getRepeatedWrapperField(
            this,
            proto.yt.PlayerResponse.Stream2,
            2
          );
        }),
      (proto.yt.PlayerResponse.StreamMap.prototype.setStream2List = function (
        e
      ) {
        return o.Message.setRepeatedWrapperField(this, 2, e);
      }),
      (proto.yt.PlayerResponse.StreamMap.prototype.addStream2 = function (
        e,
        t
      ) {
        return o.Message.addToRepeatedWrapperField(
          this,
          2,
          e,
          proto.yt.PlayerResponse.Stream2,
          t
        );
      }),
      (proto.yt.PlayerResponse.StreamMap.prototype.clearStream2List =
        function () {
          return this.setStream2List([]);
        }),
      (proto.yt.PlayerResponse.StreamMap.prototype.getStream3List =
        function () {
          return o.Message.getRepeatedWrapperField(
            this,
            proto.yt.PlayerResponse.Stream3,
            3
          );
        }),
      (proto.yt.PlayerResponse.StreamMap.prototype.setStream3List = function (
        e
      ) {
        return o.Message.setRepeatedWrapperField(this, 3, e);
      }),
      (proto.yt.PlayerResponse.StreamMap.prototype.addStream3 = function (
        e,
        t
      ) {
        return o.Message.addToRepeatedWrapperField(
          this,
          3,
          e,
          proto.yt.PlayerResponse.Stream3,
          t
        );
      }),
      (proto.yt.PlayerResponse.StreamMap.prototype.clearStream3List =
        function () {
          return this.setStream3List([]);
        }),
      (proto.yt.PlayerResponse.StreamMap.prototype.getHlsUrl = function () {
        return o.Message.getFieldWithDefault(this, 5, '');
      }),
      (proto.yt.PlayerResponse.StreamMap.prototype.setHlsUrl = function (e) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.PlayerResponse.StreamMap.prototype.clearHlsUrl = function () {
        return o.Message.setField(this, 5, void 0);
      }),
      (proto.yt.PlayerResponse.StreamMap.prototype.hasHlsUrl = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerResponse.SubtitlesObject.prototype.toObject =
          function (e) {
            return proto.yt.PlayerResponse.SubtitlesObject.toObject(e, this);
          }),
        (proto.yt.PlayerResponse.SubtitlesObject.toObject = function (e, t) {
          var r,
            o = {
              sub516: (r = t.getSub516()) && proto.yt.Sub516.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.PlayerResponse.SubtitlesObject.deserializeBinary = function (
        e
      ) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerResponse.SubtitlesObject();
        return proto.yt.PlayerResponse.SubtitlesObject.deserializeBinaryFromReader(
          r,
          t
        );
      }),
      (proto.yt.PlayerResponse.SubtitlesObject.deserializeBinaryFromReader =
        function (e, t) {
          for (; t.nextField() && !t.isEndGroup(); ) {
            switch (t.getFieldNumber()) {
              case 51621377:
                var r = new proto.yt.Sub516();
                t.readMessage(r, proto.yt.Sub516.deserializeBinaryFromReader),
                  e.setSub516(r);
                break;
              default:
                t.skipField();
            }
          }
          return e;
        }),
      (proto.yt.PlayerResponse.SubtitlesObject.prototype.serializeBinary =
        function () {
          var e = new o.BinaryWriter();
          return (
            proto.yt.PlayerResponse.SubtitlesObject.serializeBinaryToWriter(
              this,
              e
            ),
            e.getResultBuffer()
          );
        }),
      (proto.yt.PlayerResponse.SubtitlesObject.serializeBinaryToWriter =
        function (e, t) {
          var r;
          null != (r = e.getSub516()) &&
            t.writeMessage(
              51621377,
              r,
              proto.yt.Sub516.serializeBinaryToWriter
            );
        }),
      (proto.yt.PlayerResponse.SubtitlesObject.prototype.getSub516 =
        function () {
          return o.Message.getWrapperField(this, proto.yt.Sub516, 51621377);
        }),
      (proto.yt.PlayerResponse.SubtitlesObject.prototype.setSub516 = function (
        e
      ) {
        return o.Message.setWrapperField(this, 51621377, e);
      }),
      (proto.yt.PlayerResponse.SubtitlesObject.prototype.clearSub516 =
        function () {
          return this.setSub516(void 0);
        }),
      (proto.yt.PlayerResponse.SubtitlesObject.prototype.hasSub516 =
        function () {
          return null != o.Message.getField(this, 51621377);
        }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PlayerResponse.Details.prototype.toObject = function (e) {
          return proto.yt.PlayerResponse.Details.toObject(e, this);
        }),
        (proto.yt.PlayerResponse.Details.toObject = function (e, t) {
          var r,
            i = {
              durationInSeconds:
                null == (r = o.Message.getField(t, 16)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.PlayerResponse.Details.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PlayerResponse.Details();
        return proto.yt.PlayerResponse.Details.deserializeBinaryFromReader(
          r,
          t
        );
      }),
      (proto.yt.PlayerResponse.Details.deserializeBinaryFromReader = function (
        e,
        t
      ) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 16:
              var r = t.readInt32();
              e.setDurationInSeconds(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.PlayerResponse.Details.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.PlayerResponse.Details.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.PlayerResponse.Details.serializeBinaryToWriter = function (
        e,
        t
      ) {
        var r;
        null != (r = o.Message.getField(e, 16)) && t.writeInt32(16, r);
      }),
      (proto.yt.PlayerResponse.Details.prototype.getDurationInSeconds =
        function () {
          return o.Message.getFieldWithDefault(this, 16, 0);
        }),
      (proto.yt.PlayerResponse.Details.prototype.setDurationInSeconds =
        function (e) {
          return o.Message.setField(this, 16, e);
        }),
      (proto.yt.PlayerResponse.Details.prototype.clearDurationInSeconds =
        function () {
          return o.Message.setField(this, 16, void 0);
        }),
      (proto.yt.PlayerResponse.Details.prototype.hasDurationInSeconds =
        function () {
          return null != o.Message.getField(this, 16);
        }),
      (proto.yt.PlayerResponse.prototype.getPlayabilityStatus = function () {
        return o.Message.getWrapperField(
          this,
          proto.yt.PlayerResponse.PlayabilityStatus,
          2
        );
      }),
      (proto.yt.PlayerResponse.prototype.setPlayabilityStatus = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.PlayerResponse.prototype.clearPlayabilityStatus = function () {
        return this.setPlayabilityStatus(void 0);
      }),
      (proto.yt.PlayerResponse.prototype.hasPlayabilityStatus = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.PlayerResponse.prototype.getStreammap = function () {
        return o.Message.getWrapperField(
          this,
          proto.yt.PlayerResponse.StreamMap,
          4
        );
      }),
      (proto.yt.PlayerResponse.prototype.setStreammap = function (e) {
        return o.Message.setWrapperField(this, 4, e);
      }),
      (proto.yt.PlayerResponse.prototype.clearStreammap = function () {
        return this.setStreammap(void 0);
      }),
      (proto.yt.PlayerResponse.prototype.hasStreammap = function () {
        return null != o.Message.getField(this, 4);
      }),
      (proto.yt.PlayerResponse.prototype.getSubtitlesObject = function () {
        return o.Message.getWrapperField(
          this,
          proto.yt.PlayerResponse.SubtitlesObject,
          10
        );
      }),
      (proto.yt.PlayerResponse.prototype.setSubtitlesObject = function (e) {
        return o.Message.setWrapperField(this, 10, e);
      }),
      (proto.yt.PlayerResponse.prototype.clearSubtitlesObject = function () {
        return this.setSubtitlesObject(void 0);
      }),
      (proto.yt.PlayerResponse.prototype.hasSubtitlesObject = function () {
        return null != o.Message.getField(this, 10);
      }),
      (proto.yt.PlayerResponse.prototype.getDetails = function () {
        return o.Message.getWrapperField(
          this,
          proto.yt.PlayerResponse.Details,
          11
        );
      }),
      (proto.yt.PlayerResponse.prototype.setDetails = function (e) {
        return o.Message.setWrapperField(this, 11, e);
      }),
      (proto.yt.PlayerResponse.prototype.clearDetails = function () {
        return this.setDetails(void 0);
      }),
      (proto.yt.PlayerResponse.prototype.hasDetails = function () {
        return null != o.Message.getField(this, 11);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.RelatedRequest.prototype.toObject = function (e) {
          return proto.yt.RelatedRequest.toObject(e, this);
        }),
        (proto.yt.RelatedRequest.toObject = function (e, t) {
          var r,
            i = {
              b1: (r = t.getB1()) && proto.yt.B1.toObject(e, r),
              videoId: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              s6: null == (r = o.Message.getField(t, 6)) ? void 0 : r,
              f9: null == (r = o.Message.getField(t, 9)) ? void 0 : r,
              f10: null == (r = o.Message.getField(t, 10)) ? void 0 : r,
              f26: null == (r = o.Message.getField(t, 26)) ? void 0 : r,
              f30: null == (r = o.Message.getField(t, 30)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.RelatedRequest.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.RelatedRequest();
        return proto.yt.RelatedRequest.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.RelatedRequest.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.B1();
              t.readMessage(r, proto.yt.B1.deserializeBinaryFromReader),
                e.setB1(r);
              break;
            case 2:
              r = t.readString();
              e.setVideoId(r);
              break;
            case 6:
              r = t.readString();
              e.setS6(r);
              break;
            case 9:
              r = t.readInt32();
              e.setF9(r);
              break;
            case 10:
              r = t.readInt32();
              e.setF10(r);
              break;
            case 26:
              r = t.readInt32();
              e.setF26(r);
              break;
            case 30:
              r = t.readInt32();
              e.setF30(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.RelatedRequest.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.RelatedRequest.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.RelatedRequest.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getB1()) &&
          t.writeMessage(1, r, proto.yt.B1.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 6)) && t.writeString(6, r),
          null != (r = o.Message.getField(e, 9)) && t.writeInt32(9, r),
          null != (r = o.Message.getField(e, 10)) && t.writeInt32(10, r),
          null != (r = o.Message.getField(e, 26)) && t.writeInt32(26, r),
          null != (r = o.Message.getField(e, 30)) && t.writeInt32(30, r);
      }),
      (proto.yt.RelatedRequest.prototype.getB1 = function () {
        return o.Message.getWrapperField(this, proto.yt.B1, 1);
      }),
      (proto.yt.RelatedRequest.prototype.setB1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.RelatedRequest.prototype.clearB1 = function () {
        return this.setB1(void 0);
      }),
      (proto.yt.RelatedRequest.prototype.hasB1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.RelatedRequest.prototype.getVideoId = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.RelatedRequest.prototype.setVideoId = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.RelatedRequest.prototype.clearVideoId = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.RelatedRequest.prototype.hasVideoId = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.RelatedRequest.prototype.getS6 = function () {
        return o.Message.getFieldWithDefault(this, 6, '');
      }),
      (proto.yt.RelatedRequest.prototype.setS6 = function (e) {
        return o.Message.setField(this, 6, e);
      }),
      (proto.yt.RelatedRequest.prototype.clearS6 = function () {
        return o.Message.setField(this, 6, void 0);
      }),
      (proto.yt.RelatedRequest.prototype.hasS6 = function () {
        return null != o.Message.getField(this, 6);
      }),
      (proto.yt.RelatedRequest.prototype.getF9 = function () {
        return o.Message.getFieldWithDefault(this, 9, 0);
      }),
      (proto.yt.RelatedRequest.prototype.setF9 = function (e) {
        return o.Message.setField(this, 9, e);
      }),
      (proto.yt.RelatedRequest.prototype.clearF9 = function () {
        return o.Message.setField(this, 9, void 0);
      }),
      (proto.yt.RelatedRequest.prototype.hasF9 = function () {
        return null != o.Message.getField(this, 9);
      }),
      (proto.yt.RelatedRequest.prototype.getF10 = function () {
        return o.Message.getFieldWithDefault(this, 10, 0);
      }),
      (proto.yt.RelatedRequest.prototype.setF10 = function (e) {
        return o.Message.setField(this, 10, e);
      }),
      (proto.yt.RelatedRequest.prototype.clearF10 = function () {
        return o.Message.setField(this, 10, void 0);
      }),
      (proto.yt.RelatedRequest.prototype.hasF10 = function () {
        return null != o.Message.getField(this, 10);
      }),
      (proto.yt.RelatedRequest.prototype.getF26 = function () {
        return o.Message.getFieldWithDefault(this, 26, 0);
      }),
      (proto.yt.RelatedRequest.prototype.setF26 = function (e) {
        return o.Message.setField(this, 26, e);
      }),
      (proto.yt.RelatedRequest.prototype.clearF26 = function () {
        return o.Message.setField(this, 26, void 0);
      }),
      (proto.yt.RelatedRequest.prototype.hasF26 = function () {
        return null != o.Message.getField(this, 26);
      }),
      (proto.yt.RelatedRequest.prototype.getF30 = function () {
        return o.Message.getFieldWithDefault(this, 30, 0);
      }),
      (proto.yt.RelatedRequest.prototype.setF30 = function (e) {
        return o.Message.setField(this, 30, e);
      }),
      (proto.yt.RelatedRequest.prototype.clearF30 = function () {
        return o.Message.setField(this, 30, void 0);
      }),
      (proto.yt.RelatedRequest.prototype.hasF30 = function () {
        return null != o.Message.getField(this, 30);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.V60.prototype.toObject = function (e) {
          return proto.yt.V60.toObject(e, this);
        }),
        (proto.yt.V60.toObject = function (e, t) {
          var r,
            i = { id: null == (r = o.Message.getField(t, 1)) ? void 0 : r };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.V60.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.V60();
        return proto.yt.V60.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.V60.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setId(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.V60.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.V60.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.V60.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r);
      }),
      (proto.yt.V60.prototype.getId = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.V60.prototype.setId = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.V60.prototype.clearId = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.V60.prototype.hasId = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Related.prototype.toObject = function (e) {
          return proto.yt.Related.toObject(e, this);
        }),
        (proto.yt.Related.toObject = function (e, t) {
          var r,
            o = { v60: (r = t.getV60()) && proto.yt.V60.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Related.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Related();
        return proto.yt.Related.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Related.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 60373625:
              var r = new proto.yt.V60();
              t.readMessage(r, proto.yt.V60.deserializeBinaryFromReader),
                e.setV60(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Related.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Related.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Related.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getV60()) &&
          t.writeMessage(60373625, r, proto.yt.V60.serializeBinaryToWriter);
      }),
      (proto.yt.Related.prototype.getV60 = function () {
        return o.Message.getWrapperField(this, proto.yt.V60, 60373625);
      }),
      (proto.yt.Related.prototype.setV60 = function (e) {
        return o.Message.setWrapperField(this, 60373625, e);
      }),
      (proto.yt.Related.prototype.clearV60 = function () {
        return this.setV60(void 0);
      }),
      (proto.yt.Related.prototype.hasV60 = function () {
        return null != o.Message.getField(this, 60373625);
      }),
      (proto.yt.Hawk514.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Hawk514.prototype.toObject = function (e) {
          return proto.yt.Hawk514.toObject(e, this);
        }),
        (proto.yt.Hawk514.toObject = function (e, t) {
          var r = {
            resultList: o.Message.toObjectList(
              t.getResultList(),
              proto.yt.Result.toObject,
              e
            ),
          };
          return e && (r.$jspbMessageInstance = t), r;
        })),
      (proto.yt.Hawk514.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Hawk514();
        return proto.yt.Hawk514.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Hawk514.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Result();
              t.readMessage(r, proto.yt.Result.deserializeBinaryFromReader),
                e.addResult(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Hawk514.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Hawk514.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Hawk514.serializeBinaryToWriter = function (e, t) {
        var r;
        (r = e.getResultList()).length > 0 &&
          t.writeRepeatedMessage(1, r, proto.yt.Result.serializeBinaryToWriter);
      }),
      (proto.yt.Hawk514.prototype.getResultList = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.Result, 1);
      }),
      (proto.yt.Hawk514.prototype.setResultList = function (e) {
        return o.Message.setRepeatedWrapperField(this, 1, e);
      }),
      (proto.yt.Hawk514.prototype.addResult = function (e, t) {
        return o.Message.addToRepeatedWrapperField(
          this,
          1,
          e,
          proto.yt.Result,
          t
        );
      }),
      (proto.yt.Hawk514.prototype.clearResultList = function () {
        return this.setResultList([]);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.I5.prototype.toObject = function (e) {
          return proto.yt.I5.toObject(e, this);
        }),
        (proto.yt.I5.toObject = function (e, t) {
          var r,
            o = {
              hawk514: (r = t.getHawk514()) && proto.yt.Hawk514.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.I5.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.I5();
        return proto.yt.I5.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.I5.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 51431404:
              var r = new proto.yt.Hawk514();
              t.readMessage(r, proto.yt.Hawk514.deserializeBinaryFromReader),
                e.setHawk514(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.I5.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.I5.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.I5.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getHawk514()) &&
          t.writeMessage(51431404, r, proto.yt.Hawk514.serializeBinaryToWriter);
      }),
      (proto.yt.I5.prototype.getHawk514 = function () {
        return o.Message.getWrapperField(this, proto.yt.Hawk514, 51431404);
      }),
      (proto.yt.I5.prototype.setHawk514 = function (e) {
        return o.Message.setWrapperField(this, 51431404, e);
      }),
      (proto.yt.I5.prototype.clearHawk514 = function () {
        return this.setHawk514(void 0);
      }),
      (proto.yt.I5.prototype.hasHawk514 = function () {
        return null != o.Message.getField(this, 51431404);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.X51.prototype.toObject = function (e) {
          return proto.yt.X51.toObject(e, this);
        }),
        (proto.yt.X51.toObject = function (e, t) {
          var r,
            o = { i5: (r = t.getI5()) && proto.yt.I5.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.X51.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.X51();
        return proto.yt.X51.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.X51.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 5:
              var r = new proto.yt.I5();
              t.readMessage(r, proto.yt.I5.deserializeBinaryFromReader),
                e.setI5(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.X51.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.X51.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.X51.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getI5()) &&
          t.writeMessage(5, r, proto.yt.I5.serializeBinaryToWriter);
      }),
      (proto.yt.X51.prototype.getI5 = function () {
        return o.Message.getWrapperField(this, proto.yt.I5, 5);
      }),
      (proto.yt.X51.prototype.setI5 = function (e) {
        return o.Message.setWrapperField(this, 5, e);
      }),
      (proto.yt.X51.prototype.clearI5 = function () {
        return this.setI5(void 0);
      }),
      (proto.yt.X51.prototype.hasI5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.I1.prototype.toObject = function (e) {
          return proto.yt.I1.toObject(e, this);
        }),
        (proto.yt.I1.toObject = function (e, t) {
          var r,
            o = { s49: (r = t.getS49()) && proto.yt.S49.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.I1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.I1();
        return proto.yt.I1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.I1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 49399797:
              var r = new proto.yt.S49();
              t.readMessage(r, proto.yt.S49.deserializeBinaryFromReader),
                e.setS49(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.I1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.I1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.I1.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getS49()) &&
          t.writeMessage(49399797, r, proto.yt.S49.serializeBinaryToWriter);
      }),
      (proto.yt.I1.prototype.getS49 = function () {
        return o.Message.getWrapperField(this, proto.yt.S49, 49399797);
      }),
      (proto.yt.I1.prototype.setS49 = function (e) {
        return o.Message.setWrapperField(this, 49399797, e);
      }),
      (proto.yt.I1.prototype.clearS49 = function () {
        return this.setS49(void 0);
      }),
      (proto.yt.I1.prototype.hasS49 = function () {
        return null != o.Message.getField(this, 49399797);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.E51.prototype.toObject = function (e) {
          return proto.yt.E51.toObject(e, this);
        }),
        (proto.yt.E51.toObject = function (e, t) {
          var r,
            o = { i1: (r = t.getI1()) && proto.yt.I1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.E51.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.E51();
        return proto.yt.E51.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.E51.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.I1();
              t.readMessage(r, proto.yt.I1.deserializeBinaryFromReader),
                e.setI1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.E51.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.E51.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.E51.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getI1()) &&
          t.writeMessage(1, r, proto.yt.I1.serializeBinaryToWriter);
      }),
      (proto.yt.E51.prototype.getI1 = function () {
        return o.Message.getWrapperField(this, proto.yt.I1, 1);
      }),
      (proto.yt.E51.prototype.setI1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.E51.prototype.clearI1 = function () {
        return this.setI1(void 0);
      }),
      (proto.yt.E51.prototype.hasI1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.I7.prototype.toObject = function (e) {
          return proto.yt.I7.toObject(e, this);
        }),
        (proto.yt.I7.toObject = function (e, t) {
          var r,
            o = { e51: (r = t.getE51()) && proto.yt.E51.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.I7.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.I7();
        return proto.yt.I7.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.I7.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 51779735:
              var r = new proto.yt.E51();
              t.readMessage(r, proto.yt.E51.deserializeBinaryFromReader),
                e.setE51(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.I7.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.I7.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.I7.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getE51()) &&
          t.writeMessage(51779735, r, proto.yt.E51.serializeBinaryToWriter);
      }),
      (proto.yt.I7.prototype.getE51 = function () {
        return o.Message.getWrapperField(this, proto.yt.E51, 51779735);
      }),
      (proto.yt.I7.prototype.setE51 = function (e) {
        return o.Message.setWrapperField(this, 51779735, e);
      }),
      (proto.yt.I7.prototype.clearE51 = function () {
        return this.setE51(void 0);
      }),
      (proto.yt.I7.prototype.hasE51 = function () {
        return null != o.Message.getField(this, 51779735);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.RelatedResponse.prototype.toObject = function (e) {
          return proto.yt.RelatedResponse.toObject(e, this);
        }),
        (proto.yt.RelatedResponse.toObject = function (e, t) {
          var r,
            o = { i7: (r = t.getI7()) && proto.yt.I7.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.RelatedResponse.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.RelatedResponse();
        return proto.yt.RelatedResponse.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.RelatedResponse.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 7:
              var r = new proto.yt.I7();
              t.readMessage(r, proto.yt.I7.deserializeBinaryFromReader),
                e.setI7(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.RelatedResponse.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.RelatedResponse.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.RelatedResponse.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getI7()) &&
          t.writeMessage(7, r, proto.yt.I7.serializeBinaryToWriter);
      }),
      (proto.yt.RelatedResponse.prototype.getI7 = function () {
        return o.Message.getWrapperField(this, proto.yt.I7, 7);
      }),
      (proto.yt.RelatedResponse.prototype.setI7 = function (e) {
        return o.Message.setWrapperField(this, 7, e);
      }),
      (proto.yt.RelatedResponse.prototype.clearI7 = function () {
        return this.setI7(void 0);
      }),
      (proto.yt.RelatedResponse.prototype.hasI7 = function () {
        return null != o.Message.getField(this, 7);
      }),
      (proto.yt.Dp6.repeatedFields_ = [3]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Dp6.prototype.toObject = function (e) {
          return proto.yt.Dp6.toObject(e, this);
        }),
        (proto.yt.Dp6.toObject = function (e, t) {
          var r,
            i = {
              f2: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              f3List:
                null == (r = o.Message.getRepeatedField(t, 3)) ? void 0 : r,
              f5: null == (r = o.Message.getField(t, 5)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Dp6.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Dp6();
        return proto.yt.Dp6.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Dp6.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = t.readInt32();
              e.setF2(r);
              break;
            case 3:
              r = t.readInt32();
              e.addF3(r);
              break;
            case 5:
              r = t.readInt32();
              e.setF5(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Dp6.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Dp6.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Dp6.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 2)) && t.writeInt32(2, r),
          (r = e.getF3List()).length > 0 && t.writeRepeatedInt32(3, r),
          null != (r = o.Message.getField(e, 5)) && t.writeInt32(5, r);
      }),
      (proto.yt.Dp6.prototype.getF2 = function () {
        return o.Message.getFieldWithDefault(this, 2, 0);
      }),
      (proto.yt.Dp6.prototype.setF2 = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.Dp6.prototype.clearF2 = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.Dp6.prototype.hasF2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Dp6.prototype.getF3List = function () {
        return o.Message.getRepeatedField(this, 3);
      }),
      (proto.yt.Dp6.prototype.setF3List = function (e) {
        return o.Message.setField(this, 3, e || []);
      }),
      (proto.yt.Dp6.prototype.addF3 = function (e, t) {
        return o.Message.addToRepeatedField(this, 3, e, t);
      }),
      (proto.yt.Dp6.prototype.clearF3List = function () {
        return this.setF3List([]);
      }),
      (proto.yt.Dp6.prototype.getF5 = function () {
        return o.Message.getFieldWithDefault(this, 5, 0);
      }),
      (proto.yt.Dp6.prototype.setF5 = function (e) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.Dp6.prototype.clearF5 = function () {
        return o.Message.setField(this, 5, void 0);
      }),
      (proto.yt.Dp6.prototype.hasF5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      (proto.yt.D16.repeatedFields_ = [6]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.D16.prototype.toObject = function (e) {
          return proto.yt.D16.toObject(e, this);
        }),
        (proto.yt.D16.toObject = function (e, t) {
          var r,
            i = {
              f1: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              s2: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              s4: null == (r = o.Message.getField(t, 4)) ? void 0 : r,
              dp6List: o.Message.toObjectList(
                t.getDp6List(),
                proto.yt.Dp6.toObject,
                e
              ),
              f9: null == (r = o.Message.getField(t, 9)) ? void 0 : r,
              f10: null == (r = o.Message.getField(t, 10)) ? void 0 : r,
              f11: null == (r = o.Message.getField(t, 11)) ? void 0 : r,
              f19: null == (r = o.Message.getField(t, 19)) ? void 0 : r,
              f20: null == (r = o.Message.getField(t, 20)) ? void 0 : r,
              s21: null == (r = o.Message.getField(t, 21)) ? void 0 : r,
              f23: null == (r = o.Message.getField(t, 23)) ? void 0 : r,
              f29: null == (r = o.Message.getField(t, 29)) ? void 0 : r,
              f37: null == (r = o.Message.getField(t, 37)) ? void 0 : r,
              f38: null == (r = o.Message.getField(t, 38)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.D16.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.D16();
        return proto.yt.D16.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.D16.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readInt32();
              e.setF1(r);
              break;
            case 2:
              r = t.readString();
              e.setS2(r);
              break;
            case 4:
              r = t.readString();
              e.setS4(r);
              break;
            case 6:
              r = new proto.yt.Dp6();
              t.readMessage(r, proto.yt.Dp6.deserializeBinaryFromReader),
                e.addDp6(r);
              break;
            case 9:
              r = t.readInt32();
              e.setF9(r);
              break;
            case 10:
              r = t.readInt32();
              e.setF10(r);
              break;
            case 11:
              r = t.readInt32();
              e.setF11(r);
              break;
            case 19:
              r = t.readInt32();
              e.setF19(r);
              break;
            case 20:
              r = t.readInt32();
              e.setF20(r);
              break;
            case 21:
              r = t.readString();
              e.setS21(r);
              break;
            case 23:
              r = t.readInt32();
              e.setF23(r);
              break;
            case 29:
              r = t.readInt32();
              e.setF29(r);
              break;
            case 37:
              r = t.readInt32();
              e.setF37(r);
              break;
            case 38:
              r = t.readInt32();
              e.setF38(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.D16.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.D16.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.D16.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeInt32(1, r),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 4)) && t.writeString(4, r),
          (r = e.getDp6List()).length > 0 &&
            t.writeRepeatedMessage(6, r, proto.yt.Dp6.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 9)) && t.writeInt32(9, r),
          null != (r = o.Message.getField(e, 10)) && t.writeInt32(10, r),
          null != (r = o.Message.getField(e, 11)) && t.writeInt32(11, r),
          null != (r = o.Message.getField(e, 19)) && t.writeInt32(19, r),
          null != (r = o.Message.getField(e, 20)) && t.writeInt32(20, r),
          null != (r = o.Message.getField(e, 21)) && t.writeString(21, r),
          null != (r = o.Message.getField(e, 23)) && t.writeInt32(23, r),
          null != (r = o.Message.getField(e, 29)) && t.writeInt32(29, r),
          null != (r = o.Message.getField(e, 37)) && t.writeInt32(37, r),
          null != (r = o.Message.getField(e, 38)) && t.writeInt32(38, r);
      }),
      (proto.yt.D16.prototype.getF1 = function () {
        return o.Message.getFieldWithDefault(this, 1, 0);
      }),
      (proto.yt.D16.prototype.setF1 = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.D16.prototype.clearF1 = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.D16.prototype.hasF1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.D16.prototype.getS2 = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.D16.prototype.setS2 = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.D16.prototype.clearS2 = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.D16.prototype.hasS2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.D16.prototype.getS4 = function () {
        return o.Message.getFieldWithDefault(this, 4, '');
      }),
      (proto.yt.D16.prototype.setS4 = function (e) {
        return o.Message.setField(this, 4, e);
      }),
      (proto.yt.D16.prototype.clearS4 = function () {
        return o.Message.setField(this, 4, void 0);
      }),
      (proto.yt.D16.prototype.hasS4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      (proto.yt.D16.prototype.getDp6List = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.Dp6, 6);
      }),
      (proto.yt.D16.prototype.setDp6List = function (e) {
        return o.Message.setRepeatedWrapperField(this, 6, e);
      }),
      (proto.yt.D16.prototype.addDp6 = function (e, t) {
        return o.Message.addToRepeatedWrapperField(this, 6, e, proto.yt.Dp6, t);
      }),
      (proto.yt.D16.prototype.clearDp6List = function () {
        return this.setDp6List([]);
      }),
      (proto.yt.D16.prototype.getF9 = function () {
        return o.Message.getFieldWithDefault(this, 9, 0);
      }),
      (proto.yt.D16.prototype.setF9 = function (e) {
        return o.Message.setField(this, 9, e);
      }),
      (proto.yt.D16.prototype.clearF9 = function () {
        return o.Message.setField(this, 9, void 0);
      }),
      (proto.yt.D16.prototype.hasF9 = function () {
        return null != o.Message.getField(this, 9);
      }),
      (proto.yt.D16.prototype.getF10 = function () {
        return o.Message.getFieldWithDefault(this, 10, 0);
      }),
      (proto.yt.D16.prototype.setF10 = function (e) {
        return o.Message.setField(this, 10, e);
      }),
      (proto.yt.D16.prototype.clearF10 = function () {
        return o.Message.setField(this, 10, void 0);
      }),
      (proto.yt.D16.prototype.hasF10 = function () {
        return null != o.Message.getField(this, 10);
      }),
      (proto.yt.D16.prototype.getF11 = function () {
        return o.Message.getFieldWithDefault(this, 11, 0);
      }),
      (proto.yt.D16.prototype.setF11 = function (e) {
        return o.Message.setField(this, 11, e);
      }),
      (proto.yt.D16.prototype.clearF11 = function () {
        return o.Message.setField(this, 11, void 0);
      }),
      (proto.yt.D16.prototype.hasF11 = function () {
        return null != o.Message.getField(this, 11);
      }),
      (proto.yt.D16.prototype.getF19 = function () {
        return o.Message.getFieldWithDefault(this, 19, 0);
      }),
      (proto.yt.D16.prototype.setF19 = function (e) {
        return o.Message.setField(this, 19, e);
      }),
      (proto.yt.D16.prototype.clearF19 = function () {
        return o.Message.setField(this, 19, void 0);
      }),
      (proto.yt.D16.prototype.hasF19 = function () {
        return null != o.Message.getField(this, 19);
      }),
      (proto.yt.D16.prototype.getF20 = function () {
        return o.Message.getFieldWithDefault(this, 20, 0);
      }),
      (proto.yt.D16.prototype.setF20 = function (e) {
        return o.Message.setField(this, 20, e);
      }),
      (proto.yt.D16.prototype.clearF20 = function () {
        return o.Message.setField(this, 20, void 0);
      }),
      (proto.yt.D16.prototype.hasF20 = function () {
        return null != o.Message.getField(this, 20);
      }),
      (proto.yt.D16.prototype.getS21 = function () {
        return o.Message.getFieldWithDefault(this, 21, '');
      }),
      (proto.yt.D16.prototype.setS21 = function (e) {
        return o.Message.setField(this, 21, e);
      }),
      (proto.yt.D16.prototype.clearS21 = function () {
        return o.Message.setField(this, 21, void 0);
      }),
      (proto.yt.D16.prototype.hasS21 = function () {
        return null != o.Message.getField(this, 21);
      }),
      (proto.yt.D16.prototype.getF23 = function () {
        return o.Message.getFieldWithDefault(this, 23, 0);
      }),
      (proto.yt.D16.prototype.setF23 = function (e) {
        return o.Message.setField(this, 23, e);
      }),
      (proto.yt.D16.prototype.clearF23 = function () {
        return o.Message.setField(this, 23, void 0);
      }),
      (proto.yt.D16.prototype.hasF23 = function () {
        return null != o.Message.getField(this, 23);
      }),
      (proto.yt.D16.prototype.getF29 = function () {
        return o.Message.getFieldWithDefault(this, 29, 0);
      }),
      (proto.yt.D16.prototype.setF29 = function (e) {
        return o.Message.setField(this, 29, e);
      }),
      (proto.yt.D16.prototype.clearF29 = function () {
        return o.Message.setField(this, 29, void 0);
      }),
      (proto.yt.D16.prototype.hasF29 = function () {
        return null != o.Message.getField(this, 29);
      }),
      (proto.yt.D16.prototype.getF37 = function () {
        return o.Message.getFieldWithDefault(this, 37, 0);
      }),
      (proto.yt.D16.prototype.setF37 = function (e) {
        return o.Message.setField(this, 37, e);
      }),
      (proto.yt.D16.prototype.clearF37 = function () {
        return o.Message.setField(this, 37, void 0);
      }),
      (proto.yt.D16.prototype.hasF37 = function () {
        return null != o.Message.getField(this, 37);
      }),
      (proto.yt.D16.prototype.getF38 = function () {
        return o.Message.getFieldWithDefault(this, 38, 0);
      }),
      (proto.yt.D16.prototype.setF38 = function (e) {
        return o.Message.setField(this, 38, e);
      }),
      (proto.yt.D16.prototype.clearF38 = function () {
        return o.Message.setField(this, 38, void 0);
      }),
      (proto.yt.D16.prototype.hasF38 = function () {
        return null != o.Message.getField(this, 38);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.D38.prototype.toObject = function (e) {
          return proto.yt.D38.toObject(e, this);
        }),
        (proto.yt.D38.toObject = function (e, t) {
          var r,
            i = {
              f1: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              f2: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              f4: null == (r = o.Message.getField(t, 4)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.D38.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.D38();
        return proto.yt.D38.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.D38.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readInt32();
              e.setF1(r);
              break;
            case 2:
              r = t.readInt32();
              e.setF2(r);
              break;
            case 4:
              r = t.readInt32();
              e.setF4(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.D38.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.D38.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.D38.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeInt32(1, r),
          null != (r = o.Message.getField(e, 2)) && t.writeInt32(2, r),
          null != (r = o.Message.getField(e, 4)) && t.writeInt32(4, r);
      }),
      (proto.yt.D38.prototype.getF1 = function () {
        return o.Message.getFieldWithDefault(this, 1, 0);
      }),
      (proto.yt.D38.prototype.setF1 = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.D38.prototype.clearF1 = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.D38.prototype.hasF1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.D38.prototype.getF2 = function () {
        return o.Message.getFieldWithDefault(this, 2, 0);
      }),
      (proto.yt.D38.prototype.setF2 = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.D38.prototype.clearF2 = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.D38.prototype.hasF2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.D38.prototype.getF4 = function () {
        return o.Message.getFieldWithDefault(this, 4, 0);
      }),
      (proto.yt.D38.prototype.setF4 = function (e) {
        return o.Message.setField(this, 4, e);
      }),
      (proto.yt.D38.prototype.clearF4 = function () {
        return o.Message.setField(this, 4, void 0);
      }),
      (proto.yt.D38.prototype.hasF4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      (proto.yt.SearchOptions.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.SearchOptions.prototype.toObject = function (e) {
          return proto.yt.SearchOptions.toObject(e, this);
        }),
        (proto.yt.SearchOptions.toObject = function (e, t) {
          var r,
            i = {
              optionList:
                null == (r = o.Message.getRepeatedField(t, 1)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.SearchOptions.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.SearchOptions();
        return proto.yt.SearchOptions.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.SearchOptions.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.addOption(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.SearchOptions.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.SearchOptions.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.SearchOptions.serializeBinaryToWriter = function (e, t) {
        var r;
        (r = e.getOptionList()).length > 0 && t.writeRepeatedString(1, r);
      }),
      (proto.yt.SearchOptions.prototype.getOptionList = function () {
        return o.Message.getRepeatedField(this, 1);
      }),
      (proto.yt.SearchOptions.prototype.setOptionList = function (e) {
        return o.Message.setField(this, 1, e || []);
      }),
      (proto.yt.SearchOptions.prototype.addOption = function (e, t) {
        return o.Message.addToRepeatedField(this, 1, e, t);
      }),
      (proto.yt.SearchOptions.prototype.clearOptionList = function () {
        return this.setOptionList([]);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.SearchRequest.prototype.toObject = function (e) {
          return proto.yt.SearchRequest.toObject(e, this);
        }),
        (proto.yt.SearchRequest.toObject = function (e, t) {
          var r,
            i = {
              b1: (r = t.getB1()) && proto.yt.B1.toObject(e, r),
              q: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              s3: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
              d16: (r = t.getD16()) && proto.yt.D16.toObject(e, r),
              options:
                (r = t.getOptions()) && proto.yt.SearchOptions.toObject(e, r),
              f36: null == (r = o.Message.getField(t, 36)) ? void 0 : r,
              d38: (r = t.getD38()) && proto.yt.D38.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.SearchRequest.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.SearchRequest();
        return proto.yt.SearchRequest.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.SearchRequest.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.B1();
              t.readMessage(r, proto.yt.B1.deserializeBinaryFromReader),
                e.setB1(r);
              break;
            case 2:
              r = t.readString();
              e.setQ(r);
              break;
            case 3:
              r = t.readString();
              e.setS3(r);
              break;
            case 16:
              r = new proto.yt.D16();
              t.readMessage(r, proto.yt.D16.deserializeBinaryFromReader),
                e.setD16(r);
              break;
            case 20:
              r = new proto.yt.SearchOptions();
              t.readMessage(
                r,
                proto.yt.SearchOptions.deserializeBinaryFromReader
              ),
                e.setOptions(r);
              break;
            case 36:
              r = t.readInt32();
              e.setF36(r);
              break;
            case 38:
              r = new proto.yt.D38();
              t.readMessage(r, proto.yt.D38.deserializeBinaryFromReader),
                e.setD38(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.SearchRequest.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.SearchRequest.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.SearchRequest.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getB1()) &&
          t.writeMessage(1, r, proto.yt.B1.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 3)) && t.writeString(3, r),
          null != (r = e.getD16()) &&
            t.writeMessage(16, r, proto.yt.D16.serializeBinaryToWriter),
          null != (r = e.getOptions()) &&
            t.writeMessage(
              20,
              r,
              proto.yt.SearchOptions.serializeBinaryToWriter
            ),
          null != (r = o.Message.getField(e, 36)) && t.writeInt32(36, r),
          null != (r = e.getD38()) &&
            t.writeMessage(38, r, proto.yt.D38.serializeBinaryToWriter);
      }),
      (proto.yt.SearchRequest.prototype.getB1 = function () {
        return o.Message.getWrapperField(this, proto.yt.B1, 1);
      }),
      (proto.yt.SearchRequest.prototype.setB1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.SearchRequest.prototype.clearB1 = function () {
        return this.setB1(void 0);
      }),
      (proto.yt.SearchRequest.prototype.hasB1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.SearchRequest.prototype.getQ = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.SearchRequest.prototype.setQ = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.SearchRequest.prototype.clearQ = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.SearchRequest.prototype.hasQ = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.SearchRequest.prototype.getS3 = function () {
        return o.Message.getFieldWithDefault(this, 3, '');
      }),
      (proto.yt.SearchRequest.prototype.setS3 = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.SearchRequest.prototype.clearS3 = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.SearchRequest.prototype.hasS3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      (proto.yt.SearchRequest.prototype.getD16 = function () {
        return o.Message.getWrapperField(this, proto.yt.D16, 16);
      }),
      (proto.yt.SearchRequest.prototype.setD16 = function (e) {
        return o.Message.setWrapperField(this, 16, e);
      }),
      (proto.yt.SearchRequest.prototype.clearD16 = function () {
        return this.setD16(void 0);
      }),
      (proto.yt.SearchRequest.prototype.hasD16 = function () {
        return null != o.Message.getField(this, 16);
      }),
      (proto.yt.SearchRequest.prototype.getOptions = function () {
        return o.Message.getWrapperField(this, proto.yt.SearchOptions, 20);
      }),
      (proto.yt.SearchRequest.prototype.setOptions = function (e) {
        return o.Message.setWrapperField(this, 20, e);
      }),
      (proto.yt.SearchRequest.prototype.clearOptions = function () {
        return this.setOptions(void 0);
      }),
      (proto.yt.SearchRequest.prototype.hasOptions = function () {
        return null != o.Message.getField(this, 20);
      }),
      (proto.yt.SearchRequest.prototype.getF36 = function () {
        return o.Message.getFieldWithDefault(this, 36, 0);
      }),
      (proto.yt.SearchRequest.prototype.setF36 = function (e) {
        return o.Message.setField(this, 36, e);
      }),
      (proto.yt.SearchRequest.prototype.clearF36 = function () {
        return o.Message.setField(this, 36, void 0);
      }),
      (proto.yt.SearchRequest.prototype.hasF36 = function () {
        return null != o.Message.getField(this, 36);
      }),
      (proto.yt.SearchRequest.prototype.getD38 = function () {
        return o.Message.getWrapperField(this, proto.yt.D38, 38);
      }),
      (proto.yt.SearchRequest.prototype.setD38 = function (e) {
        return o.Message.setWrapperField(this, 38, e);
      }),
      (proto.yt.SearchRequest.prototype.clearD38 = function () {
        return this.setD38(void 0);
      }),
      (proto.yt.SearchRequest.prototype.hasD38 = function () {
        return null != o.Message.getField(this, 38);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.T1.prototype.toObject = function (e) {
          return proto.yt.T1.toObject(e, this);
        }),
        (proto.yt.T1.toObject = function (e, t) {
          var r,
            i = { text: null == (r = o.Message.getField(t, 1)) ? void 0 : r };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.T1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.T1();
        return proto.yt.T1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.T1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setText(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.T1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.T1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.T1.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r);
      }),
      (proto.yt.T1.prototype.getText = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.T1.prototype.setText = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.T1.prototype.clearText = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.T1.prototype.hasText = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Title.prototype.toObject = function (e) {
          return proto.yt.Title.toObject(e, this);
        }),
        (proto.yt.Title.toObject = function (e, t) {
          var r,
            o = { t1: (r = t.getT1()) && proto.yt.T1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Title.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Title();
        return proto.yt.Title.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Title.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.T1();
              t.readMessage(r, proto.yt.T1.deserializeBinaryFromReader),
                e.setT1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Title.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Title.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Title.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getT1()) &&
          t.writeMessage(1, r, proto.yt.T1.serializeBinaryToWriter);
      }),
      (proto.yt.Title.prototype.getT1 = function () {
        return o.Message.getWrapperField(this, proto.yt.T1, 1);
      }),
      (proto.yt.Title.prototype.setT1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Title.prototype.clearT1 = function () {
        return this.setT1(void 0);
      }),
      (proto.yt.Title.prototype.hasT1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Thumbnail.prototype.toObject = function (e) {
          return proto.yt.Thumbnail.toObject(e, this);
        }),
        (proto.yt.Thumbnail.toObject = function (e, t) {
          var r,
            i = {
              url: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              width: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Thumbnail.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Thumbnail();
        return proto.yt.Thumbnail.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Thumbnail.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setUrl(r);
              break;
            case 2:
              r = t.readInt32();
              e.setWidth(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Thumbnail.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Thumbnail.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.Thumbnail.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = o.Message.getField(e, 2)) && t.writeInt32(2, r);
      }),
      (proto.yt.Thumbnail.prototype.getUrl = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.Thumbnail.prototype.setUrl = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Thumbnail.prototype.clearUrl = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Thumbnail.prototype.hasUrl = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Thumbnail.prototype.getWidth = function () {
        return o.Message.getFieldWithDefault(this, 2, 0);
      }),
      (proto.yt.Thumbnail.prototype.setWidth = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.Thumbnail.prototype.clearWidth = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.Thumbnail.prototype.hasWidth = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Thumb1.prototype.toObject = function (e) {
          return proto.yt.Thumb1.toObject(e, this);
        }),
        (proto.yt.Thumb1.toObject = function (e, t) {
          var r,
            i = {
              url: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              width: null == (r = o.Message.getField(t, 4)) ? void 0 : r,
              height: null == (r = o.Message.getField(t, 5)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Thumb1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Thumb1();
        return proto.yt.Thumb1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Thumb1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setUrl(r);
              break;
            case 4:
              r = t.readInt32();
              e.setWidth(r);
              break;
            case 5:
              r = t.readInt32();
              e.setHeight(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Thumb1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Thumb1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Thumb1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = o.Message.getField(e, 4)) && t.writeInt32(4, r),
          null != (r = o.Message.getField(e, 5)) && t.writeInt32(5, r);
      }),
      (proto.yt.Thumb1.prototype.getUrl = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.Thumb1.prototype.setUrl = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Thumb1.prototype.clearUrl = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Thumb1.prototype.hasUrl = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Thumb1.prototype.getWidth = function () {
        return o.Message.getFieldWithDefault(this, 4, 0);
      }),
      (proto.yt.Thumb1.prototype.setWidth = function (e) {
        return o.Message.setField(this, 4, e);
      }),
      (proto.yt.Thumb1.prototype.clearWidth = function () {
        return o.Message.setField(this, 4, void 0);
      }),
      (proto.yt.Thumb1.prototype.hasWidth = function () {
        return null != o.Message.getField(this, 4);
      }),
      (proto.yt.Thumb1.prototype.getHeight = function () {
        return o.Message.getFieldWithDefault(this, 5, 0);
      }),
      (proto.yt.Thumb1.prototype.setHeight = function (e) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.Thumb1.prototype.clearHeight = function () {
        return o.Message.setField(this, 5, void 0);
      }),
      (proto.yt.Thumb1.prototype.hasHeight = function () {
        return null != o.Message.getField(this, 5);
      }),
      (proto.yt.ThumbnailCollection.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.ThumbnailCollection.prototype.toObject = function (e) {
          return proto.yt.ThumbnailCollection.toObject(e, this);
        }),
        (proto.yt.ThumbnailCollection.toObject = function (e, t) {
          var r = {
            thumbnailList: o.Message.toObjectList(
              t.getThumbnailList(),
              proto.yt.Thumbnail.toObject,
              e
            ),
          };
          return e && (r.$jspbMessageInstance = t), r;
        })),
      (proto.yt.ThumbnailCollection.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.ThumbnailCollection();
        return proto.yt.ThumbnailCollection.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.ThumbnailCollection.deserializeBinaryFromReader = function (
        e,
        t
      ) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Thumbnail();
              t.readMessage(r, proto.yt.Thumbnail.deserializeBinaryFromReader),
                e.addThumbnail(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.ThumbnailCollection.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.ThumbnailCollection.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.ThumbnailCollection.serializeBinaryToWriter = function (e, t) {
        var r;
        (r = e.getThumbnailList()).length > 0 &&
          t.writeRepeatedMessage(
            1,
            r,
            proto.yt.Thumbnail.serializeBinaryToWriter
          );
      }),
      (proto.yt.ThumbnailCollection.prototype.getThumbnailList = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.Thumbnail, 1);
      }),
      (proto.yt.ThumbnailCollection.prototype.setThumbnailList = function (e) {
        return o.Message.setRepeatedWrapperField(this, 1, e);
      }),
      (proto.yt.ThumbnailCollection.prototype.addThumbnail = function (e, t) {
        return o.Message.addToRepeatedWrapperField(
          this,
          1,
          e,
          proto.yt.Thumbnail,
          t
        );
      }),
      (proto.yt.ThumbnailCollection.prototype.clearThumbnailList = function () {
        return this.setThumbnailList([]);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.RChannel.prototype.toObject = function (e) {
          return proto.yt.RChannel.toObject(e, this);
        }),
        (proto.yt.RChannel.toObject = function (e, t) {
          var r,
            i = {
              id: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              thumbnailCollection:
                (r = t.getThumbnailCollection()) &&
                proto.yt.ThumbnailCollection.toObject(e, r),
              title: (r = t.getTitle()) && proto.yt.Title.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.RChannel.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.RChannel();
        return proto.yt.RChannel.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.RChannel.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setId(r);
              break;
            case 2:
              r = new proto.yt.ThumbnailCollection();
              t.readMessage(
                r,
                proto.yt.ThumbnailCollection.deserializeBinaryFromReader
              ),
                e.setThumbnailCollection(r);
              break;
            case 3:
              r = new proto.yt.Title();
              t.readMessage(r, proto.yt.Title.deserializeBinaryFromReader),
                e.setTitle(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.RChannel.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.RChannel.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.RChannel.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = e.getThumbnailCollection()) &&
            t.writeMessage(
              2,
              r,
              proto.yt.ThumbnailCollection.serializeBinaryToWriter
            ),
          null != (r = e.getTitle()) &&
            t.writeMessage(3, r, proto.yt.Title.serializeBinaryToWriter);
      }),
      (proto.yt.RChannel.prototype.getId = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.RChannel.prototype.setId = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.RChannel.prototype.clearId = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.RChannel.prototype.hasId = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.RChannel.prototype.getThumbnailCollection = function () {
        return o.Message.getWrapperField(this, proto.yt.ThumbnailCollection, 2);
      }),
      (proto.yt.RChannel.prototype.setThumbnailCollection = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.RChannel.prototype.clearThumbnailCollection = function () {
        return this.setThumbnailCollection(void 0);
      }),
      (proto.yt.RChannel.prototype.hasThumbnailCollection = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.RChannel.prototype.getTitle = function () {
        return o.Message.getWrapperField(this, proto.yt.Title, 3);
      }),
      (proto.yt.RChannel.prototype.setTitle = function (e) {
        return o.Message.setWrapperField(this, 3, e);
      }),
      (proto.yt.RChannel.prototype.clearTitle = function () {
        return this.setTitle(void 0);
      }),
      (proto.yt.RChannel.prototype.hasTitle = function () {
        return null != o.Message.getField(this, 3);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.TextHolder.prototype.toObject = function (e) {
          return proto.yt.TextHolder.toObject(e, this);
        }),
        (proto.yt.TextHolder.toObject = function (e, t) {
          var r,
            i = { text: null == (r = o.Message.getField(t, 1)) ? void 0 : r };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.TextHolder.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.TextHolder();
        return proto.yt.TextHolder.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.TextHolder.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setText(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.TextHolder.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.TextHolder.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.TextHolder.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r);
      }),
      (proto.yt.TextHolder.prototype.getText = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.TextHolder.prototype.setText = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.TextHolder.prototype.clearText = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.TextHolder.prototype.hasText = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Holder.prototype.toObject = function (e) {
          return proto.yt.Holder.toObject(e, this);
        }),
        (proto.yt.Holder.toObject = function (e, t) {
          var r,
            o = {
              textHolder:
                (r = t.getTextHolder()) && proto.yt.TextHolder.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Holder.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Holder();
        return proto.yt.Holder.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Holder.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.TextHolder();
              t.readMessage(r, proto.yt.TextHolder.deserializeBinaryFromReader),
                e.setTextHolder(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Holder.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Holder.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Holder.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getTextHolder()) &&
          t.writeMessage(1, r, proto.yt.TextHolder.serializeBinaryToWriter);
      }),
      (proto.yt.Holder.prototype.getTextHolder = function () {
        return o.Message.getWrapperField(this, proto.yt.TextHolder, 1);
      }),
      (proto.yt.Holder.prototype.setTextHolder = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Holder.prototype.clearTextHolder = function () {
        return this.setTextHolder(void 0);
      }),
      (proto.yt.Holder.prototype.hasTextHolder = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.RChannelDetails.prototype.toObject = function (e) {
          return proto.yt.RChannelDetails.toObject(e, this);
        }),
        (proto.yt.RChannelDetails.toObject = function (e, t) {
          var r,
            o = {
              description:
                (r = t.getDescription()) && proto.yt.Holder.toObject(e, r),
              title: (r = t.getTitle()) && proto.yt.Holder.toObject(e, r),
              image: (r = t.getImage()) && proto.yt.Holder.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.RChannelDetails.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.RChannelDetails();
        return proto.yt.RChannelDetails.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.RChannelDetails.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Holder();
              t.readMessage(r, proto.yt.Holder.deserializeBinaryFromReader),
                e.setDescription(r);
              break;
            case 19:
              r = new proto.yt.Holder();
              t.readMessage(r, proto.yt.Holder.deserializeBinaryFromReader),
                e.setTitle(r);
              break;
            case 20:
              r = new proto.yt.Holder();
              t.readMessage(r, proto.yt.Holder.deserializeBinaryFromReader),
                e.setImage(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.RChannelDetails.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.RChannelDetails.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.RChannelDetails.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getDescription()) &&
          t.writeMessage(1, r, proto.yt.Holder.serializeBinaryToWriter),
          null != (r = e.getTitle()) &&
            t.writeMessage(19, r, proto.yt.Holder.serializeBinaryToWriter),
          null != (r = e.getImage()) &&
            t.writeMessage(20, r, proto.yt.Holder.serializeBinaryToWriter);
      }),
      (proto.yt.RChannelDetails.prototype.getDescription = function () {
        return o.Message.getWrapperField(this, proto.yt.Holder, 1);
      }),
      (proto.yt.RChannelDetails.prototype.setDescription = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.RChannelDetails.prototype.clearDescription = function () {
        return this.setDescription(void 0);
      }),
      (proto.yt.RChannelDetails.prototype.hasDescription = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.RChannelDetails.prototype.getTitle = function () {
        return o.Message.getWrapperField(this, proto.yt.Holder, 19);
      }),
      (proto.yt.RChannelDetails.prototype.setTitle = function (e) {
        return o.Message.setWrapperField(this, 19, e);
      }),
      (proto.yt.RChannelDetails.prototype.clearTitle = function () {
        return this.setTitle(void 0);
      }),
      (proto.yt.RChannelDetails.prototype.hasTitle = function () {
        return null != o.Message.getField(this, 19);
      }),
      (proto.yt.RChannelDetails.prototype.getImage = function () {
        return o.Message.getWrapperField(this, proto.yt.Holder, 20);
      }),
      (proto.yt.RChannelDetails.prototype.setImage = function (e) {
        return o.Message.setWrapperField(this, 20, e);
      }),
      (proto.yt.RChannelDetails.prototype.clearImage = function () {
        return this.setImage(void 0);
      }),
      (proto.yt.RChannelDetails.prototype.hasImage = function () {
        return null != o.Message.getField(this, 20);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.H.prototype.toObject = function (e) {
          return proto.yt.H.toObject(e, this);
        }),
        (proto.yt.H.toObject = function (e, t) {
          var r,
            i = { id: null == (r = o.Message.getField(t, 2)) ? void 0 : r };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.H.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.H();
        return proto.yt.H.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.H.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = t.readString();
              e.setId(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.H.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return proto.yt.H.serializeBinaryToWriter(this, e), e.getResultBuffer();
      }),
      (proto.yt.H.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 2)) && t.writeString(2, r);
      }),
      (proto.yt.H.prototype.getId = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.H.prototype.setId = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.H.prototype.clearId = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.H.prototype.hasId = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Mule5.prototype.toObject = function (e) {
          return proto.yt.Mule5.toObject(e, this);
        }),
        (proto.yt.Mule5.toObject = function (e, t) {
          var r,
            o = { h: (r = t.getH()) && proto.yt.H.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Mule5.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Mule5();
        return proto.yt.Mule5.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Mule5.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 48687626:
              var r = new proto.yt.H();
              t.readMessage(r, proto.yt.H.deserializeBinaryFromReader),
                e.setH(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Mule5.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Mule5.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Mule5.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getH()) &&
          t.writeMessage(48687626, r, proto.yt.H.serializeBinaryToWriter);
      }),
      (proto.yt.Mule5.prototype.getH = function () {
        return o.Message.getWrapperField(this, proto.yt.H, 48687626);
      }),
      (proto.yt.Mule5.prototype.setH = function (e) {
        return o.Message.setWrapperField(this, 48687626, e);
      }),
      (proto.yt.Mule5.prototype.clearH = function () {
        return this.setH(void 0);
      }),
      (proto.yt.Mule5.prototype.hasH = function () {
        return null != o.Message.getField(this, 48687626);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.C1.prototype.toObject = function (e) {
          return proto.yt.C1.toObject(e, this);
        }),
        (proto.yt.C1.toObject = function (e, t) {
          var r,
            i = {
              title: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              mule5: (r = t.getMule5()) && proto.yt.Mule5.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.C1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.C1();
        return proto.yt.C1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.C1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setTitle(r);
              break;
            case 5:
              r = new proto.yt.Mule5();
              t.readMessage(r, proto.yt.Mule5.deserializeBinaryFromReader),
                e.setMule5(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.C1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.C1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.C1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = e.getMule5()) &&
            t.writeMessage(5, r, proto.yt.Mule5.serializeBinaryToWriter);
      }),
      (proto.yt.C1.prototype.getTitle = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.C1.prototype.setTitle = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.C1.prototype.clearTitle = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.C1.prototype.hasTitle = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.C1.prototype.getMule5 = function () {
        return o.Message.getWrapperField(this, proto.yt.Mule5, 5);
      }),
      (proto.yt.C1.prototype.setMule5 = function (e) {
        return o.Message.setWrapperField(this, 5, e);
      }),
      (proto.yt.C1.prototype.clearMule5 = function () {
        return this.setMule5(void 0);
      }),
      (proto.yt.C1.prototype.hasMule5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Ch8.prototype.toObject = function (e) {
          return proto.yt.Ch8.toObject(e, this);
        }),
        (proto.yt.Ch8.toObject = function (e, t) {
          var r,
            o = { h2: (r = t.getH2()) && proto.yt.Ch8.H2.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Ch8.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Ch8();
        return proto.yt.Ch8.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Ch8.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = new proto.yt.Ch8.H2();
              t.readMessage(r, proto.yt.Ch8.H2.deserializeBinaryFromReader),
                e.setH2(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Ch8.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Ch8.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Ch8.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getH2()) &&
          t.writeMessage(2, r, proto.yt.Ch8.H2.serializeBinaryToWriter);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Ch8.H2.prototype.toObject = function (e) {
          return proto.yt.Ch8.H2.toObject(e, this);
        }),
        (proto.yt.Ch8.H2.toObject = function (e, t) {
          var r,
            i = { id: null == (r = o.Message.getField(t, 11)) ? void 0 : r };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Ch8.H2.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Ch8.H2();
        return proto.yt.Ch8.H2.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Ch8.H2.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 11:
              var r = t.readString();
              e.setId(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Ch8.H2.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Ch8.H2.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Ch8.H2.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 11)) && t.writeString(11, r);
      }),
      (proto.yt.Ch8.H2.prototype.getId = function () {
        return o.Message.getFieldWithDefault(this, 11, '');
      }),
      (proto.yt.Ch8.H2.prototype.setId = function (e) {
        return o.Message.setField(this, 11, e);
      }),
      (proto.yt.Ch8.H2.prototype.clearId = function () {
        return o.Message.setField(this, 11, void 0);
      }),
      (proto.yt.Ch8.H2.prototype.hasId = function () {
        return null != o.Message.getField(this, 11);
      }),
      (proto.yt.Ch8.prototype.getH2 = function () {
        return o.Message.getWrapperField(this, proto.yt.Ch8.H2, 2);
      }),
      (proto.yt.Ch8.prototype.setH2 = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.Ch8.prototype.clearH2 = function () {
        return this.setH2(void 0);
      }),
      (proto.yt.Ch8.prototype.hasH2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.ChannelInfo.prototype.toObject = function (e) {
          return proto.yt.ChannelInfo.toObject(e, this);
        }),
        (proto.yt.ChannelInfo.toObject = function (e, t) {
          var r,
            o = { c1: (r = t.getC1()) && proto.yt.C1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.ChannelInfo.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.ChannelInfo();
        return proto.yt.ChannelInfo.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.ChannelInfo.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.C1();
              t.readMessage(r, proto.yt.C1.deserializeBinaryFromReader),
                e.setC1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.ChannelInfo.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.ChannelInfo.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.ChannelInfo.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getC1()) &&
          t.writeMessage(1, r, proto.yt.C1.serializeBinaryToWriter);
      }),
      (proto.yt.ChannelInfo.prototype.getC1 = function () {
        return o.Message.getWrapperField(this, proto.yt.C1, 1);
      }),
      (proto.yt.ChannelInfo.prototype.setC1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.ChannelInfo.prototype.clearC1 = function () {
        return this.setC1(void 0);
      }),
      (proto.yt.ChannelInfo.prototype.hasC1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.RPlaylist.prototype.toObject = function (e) {
          return proto.yt.RPlaylist.toObject(e, this);
        }),
        (proto.yt.RPlaylist.toObject = function (e, t) {
          var r,
            i = {
              id: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              thumbnailCollection:
                (r = t.getThumbnailCollection()) &&
                proto.yt.ThumbnailCollection.toObject(e, r),
              title: (r = t.getTitle()) && proto.yt.Title.toObject(e, r),
              videoCount:
                (r = t.getVideoCount()) && proto.yt.Title.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.RPlaylist.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.RPlaylist();
        return proto.yt.RPlaylist.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.RPlaylist.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setId(r);
              break;
            case 2:
              r = new proto.yt.ThumbnailCollection();
              t.readMessage(
                r,
                proto.yt.ThumbnailCollection.deserializeBinaryFromReader
              ),
                e.setThumbnailCollection(r);
              break;
            case 3:
              r = new proto.yt.Title();
              t.readMessage(r, proto.yt.Title.deserializeBinaryFromReader),
                e.setTitle(r);
              break;
            case 5:
              r = new proto.yt.Title();
              t.readMessage(r, proto.yt.Title.deserializeBinaryFromReader),
                e.setVideoCount(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.RPlaylist.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.RPlaylist.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.RPlaylist.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = e.getThumbnailCollection()) &&
            t.writeMessage(
              2,
              r,
              proto.yt.ThumbnailCollection.serializeBinaryToWriter
            ),
          null != (r = e.getTitle()) &&
            t.writeMessage(3, r, proto.yt.Title.serializeBinaryToWriter),
          null != (r = e.getVideoCount()) &&
            t.writeMessage(5, r, proto.yt.Title.serializeBinaryToWriter);
      }),
      (proto.yt.RPlaylist.prototype.getId = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.RPlaylist.prototype.setId = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.RPlaylist.prototype.clearId = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.RPlaylist.prototype.hasId = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.RPlaylist.prototype.getThumbnailCollection = function () {
        return o.Message.getWrapperField(this, proto.yt.ThumbnailCollection, 2);
      }),
      (proto.yt.RPlaylist.prototype.setThumbnailCollection = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.RPlaylist.prototype.clearThumbnailCollection = function () {
        return this.setThumbnailCollection(void 0);
      }),
      (proto.yt.RPlaylist.prototype.hasThumbnailCollection = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.RPlaylist.prototype.getTitle = function () {
        return o.Message.getWrapperField(this, proto.yt.Title, 3);
      }),
      (proto.yt.RPlaylist.prototype.setTitle = function (e) {
        return o.Message.setWrapperField(this, 3, e);
      }),
      (proto.yt.RPlaylist.prototype.clearTitle = function () {
        return this.setTitle(void 0);
      }),
      (proto.yt.RPlaylist.prototype.hasTitle = function () {
        return null != o.Message.getField(this, 3);
      }),
      (proto.yt.RPlaylist.prototype.getVideoCount = function () {
        return o.Message.getWrapperField(this, proto.yt.Title, 5);
      }),
      (proto.yt.RPlaylist.prototype.setVideoCount = function (e) {
        return o.Message.setWrapperField(this, 5, e);
      }),
      (proto.yt.RPlaylist.prototype.clearVideoCount = function () {
        return this.setVideoCount(void 0);
      }),
      (proto.yt.RPlaylist.prototype.hasVideoCount = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Tt2.prototype.toObject = function (e) {
          return proto.yt.Tt2.toObject(e, this);
        }),
        (proto.yt.Tt2.toObject = function (e, t) {
          var r,
            i = {
              t1: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              t2: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              t3: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Tt2.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Tt2();
        return proto.yt.Tt2.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Tt2.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setT1(r);
              break;
            case 2:
              r = t.readString();
              e.setT2(r);
              break;
            case 3:
              r = t.readString();
              e.setT3(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Tt2.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Tt2.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Tt2.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 3)) && t.writeString(3, r);
      }),
      (proto.yt.Tt2.prototype.getT1 = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.Tt2.prototype.setT1 = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Tt2.prototype.clearT1 = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Tt2.prototype.hasT1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Tt2.prototype.getT2 = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.Tt2.prototype.setT2 = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.Tt2.prototype.clearT2 = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.Tt2.prototype.hasT2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Tt2.prototype.getT3 = function () {
        return o.Message.getFieldWithDefault(this, 3, '');
      }),
      (proto.yt.Tt2.prototype.setT3 = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.Tt2.prototype.clearT3 = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.Tt2.prototype.hasT3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Turtle1.prototype.toObject = function (e) {
          return proto.yt.Turtle1.toObject(e, this);
        }),
        (proto.yt.Turtle1.toObject = function (e, t) {
          var r,
            o = { tt2: (r = t.getTt2()) && proto.yt.Tt2.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Turtle1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Turtle1();
        return proto.yt.Turtle1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Turtle1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = new proto.yt.Tt2();
              t.readMessage(r, proto.yt.Tt2.deserializeBinaryFromReader),
                e.setTt2(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Turtle1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Turtle1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Turtle1.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getTt2()) &&
          t.writeMessage(2, r, proto.yt.Tt2.serializeBinaryToWriter);
      }),
      (proto.yt.Turtle1.prototype.getTt2 = function () {
        return o.Message.getWrapperField(this, proto.yt.Tt2, 2);
      }),
      (proto.yt.Turtle1.prototype.setTt2 = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.Turtle1.prototype.clearTt2 = function () {
        return this.setTt2(void 0);
      }),
      (proto.yt.Turtle1.prototype.hasTt2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Duck486.prototype.toObject = function (e) {
          return proto.yt.Duck486.toObject(e, this);
        }),
        (proto.yt.Duck486.toObject = function (e, t) {
          var r,
            i = { id: null == (r = o.Message.getField(t, 1)) ? void 0 : r };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Duck486.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Duck486();
        return proto.yt.Duck486.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Duck486.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setId(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Duck486.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Duck486.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Duck486.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r);
      }),
      (proto.yt.Duck486.prototype.getId = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.Duck486.prototype.setId = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Duck486.prototype.clearId = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Duck486.prototype.hasId = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Lion1.prototype.toObject = function (e) {
          return proto.yt.Lion1.toObject(e, this);
        }),
        (proto.yt.Lion1.toObject = function (e, t) {
          var r,
            o = {
              duck486: (r = t.getDuck486()) && proto.yt.Duck486.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Lion1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Lion1();
        return proto.yt.Lion1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Lion1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 48687757:
              var r = new proto.yt.Duck486();
              t.readMessage(r, proto.yt.Duck486.deserializeBinaryFromReader),
                e.setDuck486(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Lion1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Lion1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Lion1.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getDuck486()) &&
          t.writeMessage(48687757, r, proto.yt.Duck486.serializeBinaryToWriter);
      }),
      (proto.yt.Lion1.prototype.getDuck486 = function () {
        return o.Message.getWrapperField(this, proto.yt.Duck486, 48687757);
      }),
      (proto.yt.Lion1.prototype.setDuck486 = function (e) {
        return o.Message.setWrapperField(this, 48687757, e);
      }),
      (proto.yt.Lion1.prototype.clearDuck486 = function () {
        return this.setDuck486(void 0);
      }),
      (proto.yt.Lion1.prototype.hasDuck486 = function () {
        return null != o.Message.getField(this, 48687757);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Puma200.prototype.toObject = function (e) {
          return proto.yt.Puma200.toObject(e, this);
        }),
        (proto.yt.Puma200.toObject = function (e, t) {
          var r,
            o = { lion1: (r = t.getLion1()) && proto.yt.Lion1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Puma200.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Puma200();
        return proto.yt.Puma200.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Puma200.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Lion1();
              t.readMessage(r, proto.yt.Lion1.deserializeBinaryFromReader),
                e.setLion1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Puma200.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Puma200.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Puma200.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getLion1()) &&
          t.writeMessage(1, r, proto.yt.Lion1.serializeBinaryToWriter);
      }),
      (proto.yt.Puma200.prototype.getLion1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Lion1, 1);
      }),
      (proto.yt.Puma200.prototype.setLion1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Puma200.prototype.clearLion1 = function () {
        return this.setLion1(void 0);
      }),
      (proto.yt.Puma200.prototype.hasLion1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Hare169.prototype.toObject = function (e) {
          return proto.yt.Hare169.toObject(e, this);
        }),
        (proto.yt.Hare169.toObject = function (e, t) {
          var r,
            o = {
              puma200: (r = t.getPuma200()) && proto.yt.Puma200.toObject(e, r),
              duck486: (r = t.getDuck486()) && proto.yt.Duck486.toObject(e, r),
              h: (r = t.getH()) && proto.yt.H.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Hare169.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Hare169();
        return proto.yt.Hare169.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Hare169.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 200453700:
              var r = new proto.yt.Puma200();
              t.readMessage(r, proto.yt.Puma200.deserializeBinaryFromReader),
                e.setPuma200(r);
              break;
            case 48687757:
              r = new proto.yt.Duck486();
              t.readMessage(r, proto.yt.Duck486.deserializeBinaryFromReader),
                e.setDuck486(r);
              break;
            case 48687626:
              r = new proto.yt.H();
              t.readMessage(r, proto.yt.H.deserializeBinaryFromReader),
                e.setH(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Hare169.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Hare169.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Hare169.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getPuma200()) &&
          t.writeMessage(
            200453700,
            r,
            proto.yt.Puma200.serializeBinaryToWriter
          ),
          null != (r = e.getDuck486()) &&
            t.writeMessage(
              48687757,
              r,
              proto.yt.Duck486.serializeBinaryToWriter
            ),
          null != (r = e.getH()) &&
            t.writeMessage(48687626, r, proto.yt.H.serializeBinaryToWriter);
      }),
      (proto.yt.Hare169.prototype.getPuma200 = function () {
        return o.Message.getWrapperField(this, proto.yt.Puma200, 200453700);
      }),
      (proto.yt.Hare169.prototype.setPuma200 = function (e) {
        return o.Message.setWrapperField(this, 200453700, e);
      }),
      (proto.yt.Hare169.prototype.clearPuma200 = function () {
        return this.setPuma200(void 0);
      }),
      (proto.yt.Hare169.prototype.hasPuma200 = function () {
        return null != o.Message.getField(this, 200453700);
      }),
      (proto.yt.Hare169.prototype.getDuck486 = function () {
        return o.Message.getWrapperField(this, proto.yt.Duck486, 48687757);
      }),
      (proto.yt.Hare169.prototype.setDuck486 = function (e) {
        return o.Message.setWrapperField(this, 48687757, e);
      }),
      (proto.yt.Hare169.prototype.clearDuck486 = function () {
        return this.setDuck486(void 0);
      }),
      (proto.yt.Hare169.prototype.hasDuck486 = function () {
        return null != o.Message.getField(this, 48687757);
      }),
      (proto.yt.Hare169.prototype.getH = function () {
        return o.Message.getWrapperField(this, proto.yt.H, 48687626);
      }),
      (proto.yt.Hare169.prototype.setH = function (e) {
        return o.Message.setWrapperField(this, 48687626, e);
      }),
      (proto.yt.Hare169.prototype.clearH = function () {
        return this.setH(void 0);
      }),
      (proto.yt.Hare169.prototype.hasH = function () {
        return null != o.Message.getField(this, 48687626);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Frog3.prototype.toObject = function (e) {
          return proto.yt.Frog3.toObject(e, this);
        }),
        (proto.yt.Frog3.toObject = function (e, t) {
          var r,
            o = {
              hare169: (r = t.getHare169()) && proto.yt.Hare169.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Frog3.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Frog3();
        return proto.yt.Frog3.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Frog3.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 169495254:
              var r = new proto.yt.Hare169();
              t.readMessage(r, proto.yt.Hare169.deserializeBinaryFromReader),
                e.setHare169(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Frog3.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Frog3.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Frog3.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getHare169()) &&
          t.writeMessage(
            169495254,
            r,
            proto.yt.Hare169.serializeBinaryToWriter
          );
      }),
      (proto.yt.Frog3.prototype.getHare169 = function () {
        return o.Message.getWrapperField(this, proto.yt.Hare169, 169495254);
      }),
      (proto.yt.Frog3.prototype.setHare169 = function (e) {
        return o.Message.setWrapperField(this, 169495254, e);
      }),
      (proto.yt.Frog3.prototype.clearHare169 = function () {
        return this.setHare169(void 0);
      }),
      (proto.yt.Frog3.prototype.hasHare169 = function () {
        return null != o.Message.getField(this, 169495254);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Bird25.prototype.toObject = function (e) {
          return proto.yt.Bird25.toObject(e, this);
        }),
        (proto.yt.Bird25.toObject = function (e, t) {
          var r,
            o = {
              turtle1: (r = t.getTurtle1()) && proto.yt.Turtle1.toObject(e, r),
              frog3: (r = t.getFrog3()) && proto.yt.Frog3.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Bird25.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Bird25();
        return proto.yt.Bird25.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Bird25.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Turtle1();
              t.readMessage(r, proto.yt.Turtle1.deserializeBinaryFromReader),
                e.setTurtle1(r);
              break;
            case 3:
              r = new proto.yt.Frog3();
              t.readMessage(r, proto.yt.Frog3.deserializeBinaryFromReader),
                e.setFrog3(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Bird25.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Bird25.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Bird25.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getTurtle1()) &&
          t.writeMessage(1, r, proto.yt.Turtle1.serializeBinaryToWriter),
          null != (r = e.getFrog3()) &&
            t.writeMessage(3, r, proto.yt.Frog3.serializeBinaryToWriter);
      }),
      (proto.yt.Bird25.prototype.getTurtle1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Turtle1, 1);
      }),
      (proto.yt.Bird25.prototype.setTurtle1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Bird25.prototype.clearTurtle1 = function () {
        return this.setTurtle1(void 0);
      }),
      (proto.yt.Bird25.prototype.hasTurtle1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Bird25.prototype.getFrog3 = function () {
        return o.Message.getWrapperField(this, proto.yt.Frog3, 3);
      }),
      (proto.yt.Bird25.prototype.setFrog3 = function (e) {
        return o.Message.setWrapperField(this, 3, e);
      }),
      (proto.yt.Bird25.prototype.clearFrog3 = function () {
        return this.setFrog3(void 0);
      }),
      (proto.yt.Bird25.prototype.hasFrog3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Snake232.prototype.toObject = function (e) {
          return proto.yt.Snake232.toObject(e, this);
        }),
        (proto.yt.Snake232.toObject = function (e, t) {
          var r,
            o = {
              bird25: (r = t.getBird25()) && proto.yt.Bird25.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Snake232.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Snake232();
        return proto.yt.Snake232.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Snake232.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 25:
              var r = new proto.yt.Bird25();
              t.readMessage(r, proto.yt.Bird25.deserializeBinaryFromReader),
                e.setBird25(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      });
    (proto.yt.Snake232.prototype.serializeBinary = function () {
      var e = new o.BinaryWriter();
      return (
        proto.yt.Snake232.serializeBinaryToWriter(this, e), e.getResultBuffer()
      );
    }),
      (proto.yt.Snake232.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getBird25()) &&
          t.writeMessage(25, r, proto.yt.Bird25.serializeBinaryToWriter);
      }),
      (proto.yt.Snake232.prototype.getBird25 = function () {
        return o.Message.getWrapperField(this, proto.yt.Bird25, 25);
      }),
      (proto.yt.Snake232.prototype.setBird25 = function (e) {
        return o.Message.setWrapperField(this, 25, e);
      }),
      (proto.yt.Snake232.prototype.clearBird25 = function () {
        return this.setBird25(void 0);
      }),
      (proto.yt.Snake232.prototype.hasBird25 = function () {
        return null != o.Message.getField(this, 25);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Th1.prototype.toObject = function (e) {
          return proto.yt.Th1.toObject(e, this);
        }),
        (proto.yt.Th1.toObject = function (e, t) {
          var r,
            o = {
              thumb1: (r = t.getThumb1()) && proto.yt.Thumb1.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Th1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Th1();
        return proto.yt.Th1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Th1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Thumb1();
              t.readMessage(r, proto.yt.Thumb1.deserializeBinaryFromReader),
                e.setThumb1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Th1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Th1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Th1.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getThumb1()) &&
          t.writeMessage(1, r, proto.yt.Thumb1.serializeBinaryToWriter);
      }),
      (proto.yt.Th1.prototype.getThumb1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Thumb1, 1);
      }),
      (proto.yt.Th1.prototype.setThumb1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Th1.prototype.clearThumb1 = function () {
        return this.setThumb1(void 0);
      }),
      (proto.yt.Th1.prototype.hasThumb1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Img1.prototype.toObject = function (e) {
          return proto.yt.Img1.toObject(e, this);
        }),
        (proto.yt.Img1.toObject = function (e, t) {
          var r,
            i = {
              th1: (r = t.getTh1()) && proto.yt.Th1.toObject(e, r),
              label6: null == (r = o.Message.getField(t, 6)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Img1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Img1();
        return proto.yt.Img1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Img1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Th1();
              t.readMessage(r, proto.yt.Th1.deserializeBinaryFromReader),
                e.setTh1(r);
              break;
            case 6:
              r = t.readString();
              e.setLabel6(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Img1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Img1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Img1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getTh1()) &&
          t.writeMessage(1, r, proto.yt.Th1.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 6)) && t.writeString(6, r);
      }),
      (proto.yt.Img1.prototype.getTh1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Th1, 1);
      }),
      (proto.yt.Img1.prototype.setTh1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Img1.prototype.clearTh1 = function () {
        return this.setTh1(void 0);
      }),
      (proto.yt.Img1.prototype.hasTh1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Img1.prototype.getLabel6 = function () {
        return o.Message.getFieldWithDefault(this, 6, '');
      }),
      (proto.yt.Img1.prototype.setLabel6 = function (e) {
        return o.Message.setField(this, 6, e);
      }),
      (proto.yt.Img1.prototype.clearLabel6 = function () {
        return o.Message.setField(this, 6, void 0);
      }),
      (proto.yt.Img1.prototype.hasLabel6 = function () {
        return null != o.Message.getField(this, 6);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Dog16.prototype.toObject = function (e) {
          return proto.yt.Dog16.toObject(e, this);
        }),
        (proto.yt.Dog16.toObject = function (e, t) {
          var r,
            o = {
              img1: (r = t.getImg1()) && proto.yt.Img1.toObject(e, r),
              tt2: (r = t.getTt2()) && proto.yt.Tt2.toObject(e, r),
              frog3: (r = t.getFrog3()) && proto.yt.Frog3.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Dog16.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Dog16();
        return proto.yt.Dog16.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Dog16.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Img1();
              t.readMessage(r, proto.yt.Img1.deserializeBinaryFromReader),
                e.setImg1(r);
              break;
            case 2:
              r = new proto.yt.Tt2();
              t.readMessage(r, proto.yt.Tt2.deserializeBinaryFromReader),
                e.setTt2(r);
              break;
            case 3:
              r = new proto.yt.Frog3();
              t.readMessage(r, proto.yt.Frog3.deserializeBinaryFromReader),
                e.setFrog3(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Dog16.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Dog16.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Dog16.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getImg1()) &&
          t.writeMessage(1, r, proto.yt.Img1.serializeBinaryToWriter),
          null != (r = e.getTt2()) &&
            t.writeMessage(2, r, proto.yt.Tt2.serializeBinaryToWriter),
          null != (r = e.getFrog3()) &&
            t.writeMessage(3, r, proto.yt.Frog3.serializeBinaryToWriter);
      }),
      (proto.yt.Dog16.prototype.getImg1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Img1, 1);
      }),
      (proto.yt.Dog16.prototype.setImg1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Dog16.prototype.clearImg1 = function () {
        return this.setImg1(void 0);
      }),
      (proto.yt.Dog16.prototype.hasImg1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Dog16.prototype.getTt2 = function () {
        return o.Message.getWrapperField(this, proto.yt.Tt2, 2);
      }),
      (proto.yt.Dog16.prototype.setTt2 = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.Dog16.prototype.clearTt2 = function () {
        return this.setTt2(void 0);
      }),
      (proto.yt.Dog16.prototype.hasTt2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Dog16.prototype.getFrog3 = function () {
        return o.Message.getWrapperField(this, proto.yt.Frog3, 3);
      }),
      (proto.yt.Dog16.prototype.setFrog3 = function (e) {
        return o.Message.setWrapperField(this, 3, e);
      }),
      (proto.yt.Dog16.prototype.clearFrog3 = function () {
        return this.setFrog3(void 0);
      }),
      (proto.yt.Dog16.prototype.hasFrog3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Pl202.prototype.toObject = function (e) {
          return proto.yt.Pl202.toObject(e, this);
        }),
        (proto.yt.Pl202.toObject = function (e, t) {
          var r,
            o = { dog16: (r = t.getDog16()) && proto.yt.Dog16.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Pl202.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Pl202();
        return proto.yt.Pl202.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Pl202.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 16:
              var r = new proto.yt.Dog16();
              t.readMessage(r, proto.yt.Dog16.deserializeBinaryFromReader),
                e.setDog16(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Pl202.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Pl202.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Pl202.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getDog16()) &&
          t.writeMessage(16, r, proto.yt.Dog16.serializeBinaryToWriter);
      }),
      (proto.yt.Pl202.prototype.getDog16 = function () {
        return o.Message.getWrapperField(this, proto.yt.Dog16, 16);
      }),
      (proto.yt.Pl202.prototype.setDog16 = function (e) {
        return o.Message.setWrapperField(this, 16, e);
      }),
      (proto.yt.Pl202.prototype.clearDog16 = function () {
        return this.setDog16(void 0);
      }),
      (proto.yt.Pl202.prototype.hasDog16 = function () {
        return null != o.Message.getField(this, 16);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Stats18.prototype.toObject = function (e) {
          return proto.yt.Stats18.toObject(e, this);
        }),
        (proto.yt.Stats18.toObject = function (e, t) {
          var r,
            i = {
              subscriberCount:
                null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              videoCount: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              joined: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Stats18.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Stats18();
        return proto.yt.Stats18.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Stats18.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setSubscriberCount(r);
              break;
            case 2:
              r = t.readString();
              e.setVideoCount(r);
              break;
            case 3:
              r = t.readString();
              e.setJoined(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Stats18.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Stats18.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Stats18.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 3)) && t.writeString(3, r);
      }),
      (proto.yt.Stats18.prototype.getSubscriberCount = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.Stats18.prototype.setSubscriberCount = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Stats18.prototype.clearSubscriberCount = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Stats18.prototype.hasSubscriberCount = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Stats18.prototype.getVideoCount = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.Stats18.prototype.setVideoCount = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.Stats18.prototype.clearVideoCount = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.Stats18.prototype.hasVideoCount = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Stats18.prototype.getJoined = function () {
        return o.Message.getFieldWithDefault(this, 3, '');
      }),
      (proto.yt.Stats18.prototype.setJoined = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.Stats18.prototype.clearJoined = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.Stats18.prototype.hasJoined = function () {
        return null != o.Message.getField(this, 3);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Dodo3.prototype.toObject = function (e) {
          return proto.yt.Dodo3.toObject(e, this);
        }),
        (proto.yt.Dodo3.toObject = function (e, t) {
          var r,
            o = { toad5: (r = t.getToad5()) && proto.yt.Toad5.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Dodo3.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Dodo3();
        return proto.yt.Dodo3.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Dodo3.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 5:
              var r = new proto.yt.Toad5();
              t.readMessage(r, proto.yt.Toad5.deserializeBinaryFromReader),
                e.setToad5(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Dodo3.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Dodo3.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Dodo3.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getToad5()) &&
          t.writeMessage(5, r, proto.yt.Toad5.serializeBinaryToWriter);
      }),
      (proto.yt.Dodo3.prototype.getToad5 = function () {
        return o.Message.getWrapperField(this, proto.yt.Toad5, 5);
      }),
      (proto.yt.Dodo3.prototype.setToad5 = function (e) {
        return o.Message.setWrapperField(this, 5, e);
      }),
      (proto.yt.Dodo3.prototype.clearToad5 = function () {
        return this.setToad5(void 0);
      }),
      (proto.yt.Dodo3.prototype.hasToad5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Toad5.prototype.toObject = function (e) {
          return proto.yt.Toad5.toObject(e, this);
        }),
        (proto.yt.Toad5.toObject = function (e, t) {
          var r,
            o = {
              hare169: (r = t.getHare169()) && proto.yt.Hare169.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Toad5.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Toad5();
        return proto.yt.Toad5.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Toad5.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 169495254:
              var r = new proto.yt.Hare169();
              t.readMessage(r, proto.yt.Hare169.deserializeBinaryFromReader),
                e.setHare169(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Toad5.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Toad5.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Toad5.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getHare169()) &&
          t.writeMessage(
            169495254,
            r,
            proto.yt.Hare169.serializeBinaryToWriter
          );
      }),
      (proto.yt.Toad5.prototype.getHare169 = function () {
        return o.Message.getWrapperField(this, proto.yt.Hare169, 169495254);
      }),
      (proto.yt.Toad5.prototype.setHare169 = function (e) {
        return o.Message.setWrapperField(this, 169495254, e);
      }),
      (proto.yt.Toad5.prototype.clearHare169 = function () {
        return this.setHare169(void 0);
      }),
      (proto.yt.Toad5.prototype.hasHare169 = function () {
        return null != o.Message.getField(this, 169495254);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Cow1.prototype.toObject = function (e) {
          return proto.yt.Cow1.toObject(e, this);
        }),
        (proto.yt.Cow1.toObject = function (e, t) {
          var r,
            i = {
              img1: (r = t.getImg1()) && proto.yt.Img1.toObject(e, r),
              title: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              toad5: (r = t.getToad5()) && proto.yt.Toad5.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Cow1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Cow1();
        return proto.yt.Cow1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Cow1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Img1();
              t.readMessage(r, proto.yt.Img1.deserializeBinaryFromReader),
                e.setImg1(r);
              break;
            case 2:
              r = t.readString();
              e.setTitle(r);
              break;
            case 5:
              r = new proto.yt.Toad5();
              t.readMessage(r, proto.yt.Toad5.deserializeBinaryFromReader),
                e.setToad5(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Cow1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Cow1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Cow1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getImg1()) &&
          t.writeMessage(1, r, proto.yt.Img1.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = e.getToad5()) &&
            t.writeMessage(5, r, proto.yt.Toad5.serializeBinaryToWriter);
      }),
      (proto.yt.Cow1.prototype.getImg1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Img1, 1);
      }),
      (proto.yt.Cow1.prototype.setImg1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Cow1.prototype.clearImg1 = function () {
        return this.setImg1(void 0);
      }),
      (proto.yt.Cow1.prototype.hasImg1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Cow1.prototype.getTitle = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.Cow1.prototype.setTitle = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.Cow1.prototype.clearTitle = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.Cow1.prototype.hasTitle = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Cow1.prototype.getToad5 = function () {
        return o.Message.getWrapperField(this, proto.yt.Toad5, 5);
      }),
      (proto.yt.Cow1.prototype.setToad5 = function (e) {
        return o.Message.setWrapperField(this, 5, e);
      }),
      (proto.yt.Cow1.prototype.clearToad5 = function () {
        return this.setToad5(void 0);
      }),
      (proto.yt.Cow1.prototype.hasToad5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Possum1.prototype.toObject = function (e) {
          return proto.yt.Possum1.toObject(e, this);
        }),
        (proto.yt.Possum1.toObject = function (e, t) {
          var r,
            o = {
              img1: (r = t.getImg1()) && proto.yt.Img1.toObject(e, r),
              turkey8: (r = t.getTurkey8()) && proto.yt.Turkey8.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Possum1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Possum1();
        return proto.yt.Possum1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Possum1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Img1();
              t.readMessage(r, proto.yt.Img1.deserializeBinaryFromReader),
                e.setImg1(r);
              break;
            case 8:
              r = new proto.yt.Turkey8();
              t.readMessage(r, proto.yt.Turkey8.deserializeBinaryFromReader),
                e.setTurkey8(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Possum1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Possum1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Possum1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getImg1()) &&
          t.writeMessage(1, r, proto.yt.Img1.serializeBinaryToWriter),
          null != (r = e.getTurkey8()) &&
            t.writeMessage(8, r, proto.yt.Turkey8.serializeBinaryToWriter);
      }),
      (proto.yt.Possum1.prototype.getImg1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Img1, 1);
      }),
      (proto.yt.Possum1.prototype.setImg1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Possum1.prototype.clearImg1 = function () {
        return this.setImg1(void 0);
      }),
      (proto.yt.Possum1.prototype.hasImg1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Possum1.prototype.getTurkey8 = function () {
        return o.Message.getWrapperField(this, proto.yt.Turkey8, 8);
      }),
      (proto.yt.Possum1.prototype.setTurkey8 = function (e) {
        return o.Message.setWrapperField(this, 8, e);
      }),
      (proto.yt.Possum1.prototype.clearTurkey8 = function () {
        return this.setTurkey8(void 0);
      }),
      (proto.yt.Possum1.prototype.hasTurkey8 = function () {
        return null != o.Message.getField(this, 8);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Turkey8.prototype.toObject = function (e) {
          return proto.yt.Turkey8.toObject(e, this);
        }),
        (proto.yt.Turkey8.toObject = function (e, t) {
          var r,
            o = { img1: (r = t.getImg1()) && proto.yt.Img1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Turkey8.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Turkey8();
        return proto.yt.Turkey8.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Turkey8.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Img1();
              t.readMessage(r, proto.yt.Img1.deserializeBinaryFromReader),
                e.setImg1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Turkey8.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Turkey8.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Turkey8.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getImg1()) &&
          t.writeMessage(1, r, proto.yt.Img1.serializeBinaryToWriter);
      }),
      (proto.yt.Turkey8.prototype.getImg1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Img1, 1);
      }),
      (proto.yt.Turkey8.prototype.setImg1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Turkey8.prototype.clearImg1 = function () {
        return this.setImg1(void 0);
      }),
      (proto.yt.Turkey8.prototype.hasImg1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Pig2.prototype.toObject = function (e) {
          return proto.yt.Pig2.toObject(e, this);
        }),
        (proto.yt.Pig2.toObject = function (e, t) {
          var r,
            o = {
              possum1: (r = t.getPossum1()) && proto.yt.Possum1.toObject(e, r),
              finch15: (r = t.getFinch15()) && proto.yt.Finch15.toObject(e, r),
              stats18: (r = t.getStats18()) && proto.yt.Stats18.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Pig2.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Pig2();
        return proto.yt.Pig2.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Pig2.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Possum1();
              t.readMessage(r, proto.yt.Possum1.deserializeBinaryFromReader),
                e.setPossum1(r);
              break;
            case 15:
              r = new proto.yt.Finch15();
              t.readMessage(r, proto.yt.Finch15.deserializeBinaryFromReader),
                e.setFinch15(r);
              break;
            case 18:
              r = new proto.yt.Stats18();
              t.readMessage(r, proto.yt.Stats18.deserializeBinaryFromReader),
                e.setStats18(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Pig2.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Pig2.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Pig2.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getPossum1()) &&
          t.writeMessage(1, r, proto.yt.Possum1.serializeBinaryToWriter),
          null != (r = e.getFinch15()) &&
            t.writeMessage(15, r, proto.yt.Finch15.serializeBinaryToWriter),
          null != (r = e.getStats18()) &&
            t.writeMessage(18, r, proto.yt.Stats18.serializeBinaryToWriter);
      }),
      (proto.yt.Pig2.prototype.getPossum1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Possum1, 1);
      }),
      (proto.yt.Pig2.prototype.setPossum1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Pig2.prototype.clearPossum1 = function () {
        return this.setPossum1(void 0);
      }),
      (proto.yt.Pig2.prototype.hasPossum1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Pig2.prototype.getFinch15 = function () {
        return o.Message.getWrapperField(this, proto.yt.Finch15, 15);
      }),
      (proto.yt.Pig2.prototype.setFinch15 = function (e) {
        return o.Message.setWrapperField(this, 15, e);
      }),
      (proto.yt.Pig2.prototype.clearFinch15 = function () {
        return this.setFinch15(void 0);
      }),
      (proto.yt.Pig2.prototype.hasFinch15 = function () {
        return null != o.Message.getField(this, 15);
      }),
      (proto.yt.Pig2.prototype.getStats18 = function () {
        return o.Message.getWrapperField(this, proto.yt.Stats18, 18);
      }),
      (proto.yt.Pig2.prototype.setStats18 = function (e) {
        return o.Message.setWrapperField(this, 18, e);
      }),
      (proto.yt.Pig2.prototype.clearStats18 = function () {
        return this.setStats18(void 0);
      }),
      (proto.yt.Pig2.prototype.hasStats18 = function () {
        return null != o.Message.getField(this, 18);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Finch15.prototype.toObject = function (e) {
          return proto.yt.Finch15.toObject(e, this);
        }),
        (proto.yt.Finch15.toObject = function (e, t) {
          var r,
            i = {
              description: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Finch15.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Finch15();
        return proto.yt.Finch15.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Finch15.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setDescription(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Finch15.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Finch15.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Finch15.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r);
      }),
      (proto.yt.Finch15.prototype.getDescription = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.Finch15.prototype.setDescription = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Finch15.prototype.clearDescription = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Finch15.prototype.hasDescription = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Rhino353.prototype.toObject = function (e) {
          return proto.yt.Rhino353.toObject(e, this);
        }),
        (proto.yt.Rhino353.toObject = function (e, t) {
          var r,
            o = { pig2: (r = t.getPig2()) && proto.yt.Pig2.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Rhino353.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Rhino353();
        return proto.yt.Rhino353.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Rhino353.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = new proto.yt.Pig2();
              t.readMessage(r, proto.yt.Pig2.deserializeBinaryFromReader),
                e.setPig2(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Rhino353.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Rhino353.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.Rhino353.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getPig2()) &&
          t.writeMessage(2, r, proto.yt.Pig2.serializeBinaryToWriter);
      }),
      (proto.yt.Rhino353.prototype.getPig2 = function () {
        return o.Message.getWrapperField(this, proto.yt.Pig2, 2);
      }),
      (proto.yt.Rhino353.prototype.setPig2 = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.Rhino353.prototype.clearPig2 = function () {
        return this.setPig2(void 0);
      }),
      (proto.yt.Rhino353.prototype.hasPig2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Ara362.prototype.toObject = function (e) {
          return proto.yt.Ara362.toObject(e, this);
        }),
        (proto.yt.Ara362.toObject = function (e, t) {
          var r,
            i = { msg4: null == (r = o.Message.getField(t, 4)) ? void 0 : r };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Ara362.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Ara362();
        return proto.yt.Ara362.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Ara362.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 4:
              var r = t.readString();
              e.setMsg4(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Ara362.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Ara362.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Ara362.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 4)) && t.writeString(4, r);
      }),
      (proto.yt.Ara362.prototype.getMsg4 = function () {
        return o.Message.getFieldWithDefault(this, 4, '');
      }),
      (proto.yt.Ara362.prototype.setMsg4 = function (e) {
        return o.Message.setField(this, 4, e);
      }),
      (proto.yt.Ara362.prototype.clearMsg4 = function () {
        return o.Message.setField(this, 4, void 0);
      }),
      (proto.yt.Ara362.prototype.hasMsg4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Horse463.prototype.toObject = function (e) {
          return proto.yt.Horse463.toObject(e, this);
        }),
        (proto.yt.Horse463.toObject = function (e, t) {
          var r,
            o = { cow1: (r = t.getCow1()) && proto.yt.Cow1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Horse463.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Horse463();
        return proto.yt.Horse463.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Horse463.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Cow1();
              t.readMessage(r, proto.yt.Cow1.deserializeBinaryFromReader),
                e.setCow1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Horse463.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Horse463.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.Horse463.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getCow1()) &&
          t.writeMessage(1, r, proto.yt.Cow1.serializeBinaryToWriter);
      }),
      (proto.yt.Horse463.prototype.getCow1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Cow1, 1);
      }),
      (proto.yt.Horse463.prototype.setCow1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Horse463.prototype.clearCow1 = function () {
        return this.setCow1(void 0);
      }),
      (proto.yt.Horse463.prototype.hasCow1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.TextHolder2.prototype.toObject = function (e) {
          return proto.yt.TextHolder2.toObject(e, this);
        }),
        (proto.yt.TextHolder2.toObject = function (e, t) {
          var r,
            i = {
              title: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              subtitle: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.TextHolder2.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.TextHolder2();
        return proto.yt.TextHolder2.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.TextHolder2.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setTitle(r);
              break;
            case 3:
              r = t.readString();
              e.setSubtitle(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.TextHolder2.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.TextHolder2.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.TextHolder2.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = o.Message.getField(e, 3)) && t.writeString(3, r);
      }),
      (proto.yt.TextHolder2.prototype.getTitle = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.TextHolder2.prototype.setTitle = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.TextHolder2.prototype.clearTitle = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.TextHolder2.prototype.hasTitle = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.TextHolder2.prototype.getSubtitle = function () {
        return o.Message.getFieldWithDefault(this, 3, '');
      }),
      (proto.yt.TextHolder2.prototype.setSubtitle = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.TextHolder2.prototype.clearSubtitle = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.TextHolder2.prototype.hasSubtitle = function () {
        return null != o.Message.getField(this, 3);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Gnu1.prototype.toObject = function (e) {
          return proto.yt.Gnu1.toObject(e, this);
        }),
        (proto.yt.Gnu1.toObject = function (e, t) {
          var r,
            i = {
              textHolder2:
                (r = t.getTextHolder2()) && proto.yt.TextHolder2.toObject(e, r),
              dodo3: (r = t.getDodo3()) && proto.yt.Dodo3.toObject(e, r),
              channelId: null == (r = o.Message.getField(t, 9)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Gnu1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Gnu1();
        return proto.yt.Gnu1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Gnu1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = new proto.yt.TextHolder2();
              t.readMessage(
                r,
                proto.yt.TextHolder2.deserializeBinaryFromReader
              ),
                e.setTextHolder2(r);
              break;
            case 3:
              r = new proto.yt.Dodo3();
              t.readMessage(r, proto.yt.Dodo3.deserializeBinaryFromReader),
                e.setDodo3(r);
              break;
            case 9:
              r = t.readString();
              e.setChannelId(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Gnu1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Gnu1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Gnu1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getTextHolder2()) &&
          t.writeMessage(2, r, proto.yt.TextHolder2.serializeBinaryToWriter),
          null != (r = e.getDodo3()) &&
            t.writeMessage(3, r, proto.yt.Dodo3.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 9)) && t.writeString(9, r);
      }),
      (proto.yt.Gnu1.prototype.getTextHolder2 = function () {
        return o.Message.getWrapperField(this, proto.yt.TextHolder2, 2);
      }),
      (proto.yt.Gnu1.prototype.setTextHolder2 = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.Gnu1.prototype.clearTextHolder2 = function () {
        return this.setTextHolder2(void 0);
      }),
      (proto.yt.Gnu1.prototype.hasTextHolder2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Gnu1.prototype.getDodo3 = function () {
        return o.Message.getWrapperField(this, proto.yt.Dodo3, 3);
      }),
      (proto.yt.Gnu1.prototype.setDodo3 = function (e) {
        return o.Message.setWrapperField(this, 3, e);
      }),
      (proto.yt.Gnu1.prototype.clearDodo3 = function () {
        return this.setDodo3(void 0);
      }),
      (proto.yt.Gnu1.prototype.hasDodo3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      (proto.yt.Gnu1.prototype.getChannelId = function () {
        return o.Message.getFieldWithDefault(this, 9, '');
      }),
      (proto.yt.Gnu1.prototype.setChannelId = function (e) {
        return o.Message.setField(this, 9, e);
      }),
      (proto.yt.Gnu1.prototype.clearChannelId = function () {
        return o.Message.setField(this, 9, void 0);
      }),
      (proto.yt.Gnu1.prototype.hasChannelId = function () {
        return null != o.Message.getField(this, 9);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Rat1.prototype.toObject = function (e) {
          return proto.yt.Rat1.toObject(e, this);
        }),
        (proto.yt.Rat1.toObject = function (e, t) {
          var r,
            o = {
              gnu1: (r = t.getGnu1()) && proto.yt.Gnu1.toObject(e, r),
              croc4: (r = t.getCroc4()) && proto.yt.Croc4.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Rat1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Rat1();
        return proto.yt.Rat1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Rat1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Gnu1();
              t.readMessage(r, proto.yt.Gnu1.deserializeBinaryFromReader),
                e.setGnu1(r);
              break;
            case 4:
              r = new proto.yt.Croc4();
              t.readMessage(r, proto.yt.Croc4.deserializeBinaryFromReader),
                e.setCroc4(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Rat1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Rat1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Rat1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getGnu1()) &&
          t.writeMessage(1, r, proto.yt.Gnu1.serializeBinaryToWriter),
          null != (r = e.getCroc4()) &&
            t.writeMessage(4, r, proto.yt.Croc4.serializeBinaryToWriter);
      }),
      (proto.yt.Rat1.prototype.getGnu1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Gnu1, 1);
      }),
      (proto.yt.Rat1.prototype.setGnu1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Rat1.prototype.clearGnu1 = function () {
        return this.setGnu1(void 0);
      }),
      (proto.yt.Rat1.prototype.hasGnu1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Rat1.prototype.getCroc4 = function () {
        return o.Message.getWrapperField(this, proto.yt.Croc4, 4);
      }),
      (proto.yt.Rat1.prototype.setCroc4 = function (e) {
        return o.Message.setWrapperField(this, 4, e);
      }),
      (proto.yt.Rat1.prototype.clearCroc4 = function () {
        return this.setCroc4(void 0);
      }),
      (proto.yt.Rat1.prototype.hasCroc4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      (proto.yt.Yak2.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Yak2.prototype.toObject = function (e) {
          return proto.yt.Yak2.toObject(e, this);
        }),
        (proto.yt.Yak2.toObject = function (e, t) {
          var r = {
            rat1List: o.Message.toObjectList(
              t.getRat1List(),
              proto.yt.Rat1.toObject,
              e
            ),
          };
          return e && (r.$jspbMessageInstance = t), r;
        })),
      (proto.yt.Yak2.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Yak2();
        return proto.yt.Yak2.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Yak2.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Rat1();
              t.readMessage(r, proto.yt.Rat1.deserializeBinaryFromReader),
                e.addRat1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Yak2.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Yak2.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Yak2.serializeBinaryToWriter = function (e, t) {
        var r;
        (r = e.getRat1List()).length > 0 &&
          t.writeRepeatedMessage(1, r, proto.yt.Rat1.serializeBinaryToWriter);
      }),
      (proto.yt.Yak2.prototype.getRat1List = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.Rat1, 1);
      }),
      (proto.yt.Yak2.prototype.setRat1List = function (e) {
        return o.Message.setRepeatedWrapperField(this, 1, e);
      }),
      (proto.yt.Yak2.prototype.addRat1 = function (e, t) {
        return o.Message.addToRepeatedWrapperField(
          this,
          1,
          e,
          proto.yt.Rat1,
          t
        );
      }),
      (proto.yt.Yak2.prototype.clearRat1List = function () {
        return this.setRat1List([]);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Fly4.prototype.toObject = function (e) {
          return proto.yt.Fly4.toObject(e, this);
        }),
        (proto.yt.Fly4.toObject = function (e, t) {
          var r,
            o = { yak2: (r = t.getYak2()) && proto.yt.Yak2.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Fly4.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Fly4();
        return proto.yt.Fly4.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Fly4.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = new proto.yt.Yak2();
              t.readMessage(r, proto.yt.Yak2.deserializeBinaryFromReader),
                e.setYak2(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Fly4.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Fly4.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Fly4.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getYak2()) &&
          t.writeMessage(2, r, proto.yt.Yak2.serializeBinaryToWriter);
      }),
      (proto.yt.Fly4.prototype.getYak2 = function () {
        return o.Message.getWrapperField(this, proto.yt.Yak2, 2);
      }),
      (proto.yt.Fly4.prototype.setYak2 = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.Fly4.prototype.clearYak2 = function () {
        return this.setYak2(void 0);
      }),
      (proto.yt.Fly4.prototype.hasYak2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Croc4.prototype.toObject = function (e) {
          return proto.yt.Croc4.toObject(e, this);
        }),
        (proto.yt.Croc4.toObject = function (e, t) {
          var r,
            o = {
              hare169: (r = t.getHare169()) && proto.yt.Hare169.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Croc4.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Croc4();
        return proto.yt.Croc4.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Croc4.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 169495254:
              var r = new proto.yt.Hare169();
              t.readMessage(r, proto.yt.Hare169.deserializeBinaryFromReader),
                e.setHare169(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Croc4.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Croc4.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Croc4.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getHare169()) &&
          t.writeMessage(
            169495254,
            r,
            proto.yt.Hare169.serializeBinaryToWriter
          );
      }),
      (proto.yt.Croc4.prototype.getHare169 = function () {
        return o.Message.getWrapperField(this, proto.yt.Hare169, 169495254);
      }),
      (proto.yt.Croc4.prototype.setHare169 = function (e) {
        return o.Message.setWrapperField(this, 169495254, e);
      }),
      (proto.yt.Croc4.prototype.clearHare169 = function () {
        return this.setHare169(void 0);
      }),
      (proto.yt.Croc4.prototype.hasHare169 = function () {
        return null != o.Message.getField(this, 169495254);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Crab356.prototype.toObject = function (e) {
          return proto.yt.Crab356.toObject(e, this);
        }),
        (proto.yt.Crab356.toObject = function (e, t) {
          var r,
            i = {
              description: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Crab356.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Crab356();
        return proto.yt.Crab356.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Crab356.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 3:
              var r = t.readString();
              e.setDescription(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Crab356.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Crab356.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Crab356.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 3)) && t.writeString(3, r);
      }),
      (proto.yt.Crab356.prototype.getDescription = function () {
        return o.Message.getFieldWithDefault(this, 3, '');
      }),
      (proto.yt.Crab356.prototype.setDescription = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.Crab356.prototype.clearDescription = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.Crab356.prototype.hasDescription = function () {
        return null != o.Message.getField(this, 3);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Bee471.prototype.toObject = function (e) {
          return proto.yt.Bee471.toObject(e, this);
        }),
        (proto.yt.Bee471.toObject = function (e, t) {
          var r,
            o = { fly4: (r = t.getFly4()) && proto.yt.Fly4.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Bee471.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Bee471();
        return proto.yt.Bee471.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Bee471.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 4:
              var r = new proto.yt.Fly4();
              t.readMessage(r, proto.yt.Fly4.deserializeBinaryFromReader),
                e.setFly4(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Bee471.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Bee471.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Bee471.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getFly4()) &&
          t.writeMessage(4, r, proto.yt.Fly4.serializeBinaryToWriter);
      }),
      (proto.yt.Bee471.prototype.getFly4 = function () {
        return o.Message.getWrapperField(this, proto.yt.Fly4, 4);
      }),
      (proto.yt.Bee471.prototype.setFly4 = function (e) {
        return o.Message.setWrapperField(this, 4, e);
      }),
      (proto.yt.Bee471.prototype.clearFly4 = function () {
        return this.setFly4(void 0);
      }),
      (proto.yt.Bee471.prototype.hasFly4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Goat264.prototype.toObject = function (e) {
          return proto.yt.Goat264.toObject(e, this);
        }),
        (proto.yt.Goat264.toObject = function (e, t) {
          var r,
            o = { rat1: (r = t.getRat1()) && proto.yt.Rat1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Goat264.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Goat264();
        return proto.yt.Goat264.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Goat264.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Rat1();
              t.readMessage(r, proto.yt.Rat1.deserializeBinaryFromReader),
                e.setRat1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Goat264.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Goat264.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Goat264.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getRat1()) &&
          t.writeMessage(1, r, proto.yt.Rat1.serializeBinaryToWriter);
      }),
      (proto.yt.Goat264.prototype.getRat1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Rat1, 1);
      }),
      (proto.yt.Goat264.prototype.setRat1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Goat264.prototype.clearRat1 = function () {
        return this.setRat1(void 0);
      }),
      (proto.yt.Goat264.prototype.hasRat1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Lac18.prototype.toObject = function (e) {
          return proto.yt.Lac18.toObject(e, this);
        }),
        (proto.yt.Lac18.toObject = function (e, t) {
          var r,
            o = {
              gnu1: (r = t.getGnu1()) && proto.yt.Gnu1.toObject(e, r),
              croc4: (r = t.getCroc4()) && proto.yt.Croc4.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Lac18.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Lac18();
        return proto.yt.Lac18.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Lac18.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Gnu1();
              t.readMessage(r, proto.yt.Gnu1.deserializeBinaryFromReader),
                e.setGnu1(r);
              break;
            case 4:
              r = new proto.yt.Croc4();
              t.readMessage(r, proto.yt.Croc4.deserializeBinaryFromReader),
                e.setCroc4(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Lac18.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Lac18.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Lac18.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getGnu1()) &&
          t.writeMessage(1, r, proto.yt.Gnu1.serializeBinaryToWriter),
          null != (r = e.getCroc4()) &&
            t.writeMessage(4, r, proto.yt.Croc4.serializeBinaryToWriter);
      }),
      (proto.yt.Lac18.prototype.getGnu1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Gnu1, 1);
      }),
      (proto.yt.Lac18.prototype.setGnu1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Lac18.prototype.clearGnu1 = function () {
        return this.setGnu1(void 0);
      }),
      (proto.yt.Lac18.prototype.hasGnu1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Lac18.prototype.getCroc4 = function () {
        return o.Message.getWrapperField(this, proto.yt.Croc4, 4);
      }),
      (proto.yt.Lac18.prototype.setCroc4 = function (e) {
        return o.Message.setWrapperField(this, 4, e);
      }),
      (proto.yt.Lac18.prototype.clearCroc4 = function () {
        return this.setCroc4(void 0);
      }),
      (proto.yt.Lac18.prototype.hasCroc4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Nit232.prototype.toObject = function (e) {
          return proto.yt.Nit232.toObject(e, this);
        }),
        (proto.yt.Nit232.toObject = function (e, t) {
          var r,
            o = { lac18: (r = t.getLac18()) && proto.yt.Lac18.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Nit232.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Nit232();
        return proto.yt.Nit232.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Nit232.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 18:
              var r = new proto.yt.Lac18();
              t.readMessage(r, proto.yt.Lac18.deserializeBinaryFromReader),
                e.setLac18(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Nit232.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Nit232.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Nit232.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getLac18()) &&
          t.writeMessage(18, r, proto.yt.Lac18.serializeBinaryToWriter);
      }),
      (proto.yt.Nit232.prototype.getLac18 = function () {
        return o.Message.getWrapperField(this, proto.yt.Lac18, 18);
      }),
      (proto.yt.Nit232.prototype.setLac18 = function (e) {
        return o.Message.setWrapperField(this, 18, e);
      }),
      (proto.yt.Nit232.prototype.clearLac18 = function () {
        return this.setLac18(void 0);
      }),
      (proto.yt.Nit232.prototype.hasLac18 = function () {
        return null != o.Message.getField(this, 18);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Deer5.prototype.toObject = function (e) {
          return proto.yt.Deer5.toObject(e, this);
        }),
        (proto.yt.Deer5.toObject = function (e, t) {
          var r,
            o = {
              snake232:
                (r = t.getSnake232()) && proto.yt.Snake232.toObject(e, r),
              pl202: (r = t.getPl202()) && proto.yt.Pl202.toObject(e, r),
              nit232: (r = t.getNit232()) && proto.yt.Nit232.toObject(e, r),
              goat264: (r = t.getGoat264()) && proto.yt.Goat264.toObject(e, r),
              rhino353:
                (r = t.getRhino353()) && proto.yt.Rhino353.toObject(e, r),
              crab356: (r = t.getCrab356()) && proto.yt.Crab356.toObject(e, r),
              ara362: (r = t.getAra362()) && proto.yt.Ara362.toObject(e, r),
              horse463:
                (r = t.getHorse463()) && proto.yt.Horse463.toObject(e, r),
              bee471: (r = t.getBee471()) && proto.yt.Bee471.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Deer5.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Deer5();
        return proto.yt.Deer5.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Deer5.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 232971250:
              var r = new proto.yt.Snake232();
              t.readMessage(r, proto.yt.Snake232.deserializeBinaryFromReader),
                e.setSnake232(r);
              break;
            case 202672916:
              r = new proto.yt.Pl202();
              t.readMessage(r, proto.yt.Pl202.deserializeBinaryFromReader),
                e.setPl202(r);
              break;
            case 232954548:
              r = new proto.yt.Nit232();
              t.readMessage(r, proto.yt.Nit232.deserializeBinaryFromReader),
                e.setNit232(r);
              break;
            case 264467886:
              r = new proto.yt.Goat264();
              t.readMessage(r, proto.yt.Goat264.deserializeBinaryFromReader),
                e.setGoat264(r);
              break;
            case 353001132:
              r = new proto.yt.Rhino353();
              t.readMessage(r, proto.yt.Rhino353.deserializeBinaryFromReader),
                e.setRhino353(r);
              break;
            case 356954790:
              r = new proto.yt.Crab356();
              t.readMessage(r, proto.yt.Crab356.deserializeBinaryFromReader),
                e.setCrab356(r);
              break;
            case 362505312:
              r = new proto.yt.Ara362();
              t.readMessage(r, proto.yt.Ara362.deserializeBinaryFromReader),
                e.setAra362(r);
              break;
            case 463210517:
              r = new proto.yt.Horse463();
              t.readMessage(r, proto.yt.Horse463.deserializeBinaryFromReader),
                e.setHorse463(r);
              break;
            case 471792238:
              r = new proto.yt.Bee471();
              t.readMessage(r, proto.yt.Bee471.deserializeBinaryFromReader),
                e.setBee471(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Deer5.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Deer5.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Deer5.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getSnake232()) &&
          t.writeMessage(
            232971250,
            r,
            proto.yt.Snake232.serializeBinaryToWriter
          ),
          null != (r = e.getPl202()) &&
            t.writeMessage(
              202672916,
              r,
              proto.yt.Pl202.serializeBinaryToWriter
            ),
          null != (r = e.getNit232()) &&
            t.writeMessage(
              232954548,
              r,
              proto.yt.Nit232.serializeBinaryToWriter
            ),
          null != (r = e.getGoat264()) &&
            t.writeMessage(
              264467886,
              r,
              proto.yt.Goat264.serializeBinaryToWriter
            ),
          null != (r = e.getRhino353()) &&
            t.writeMessage(
              353001132,
              r,
              proto.yt.Rhino353.serializeBinaryToWriter
            ),
          null != (r = e.getCrab356()) &&
            t.writeMessage(
              356954790,
              r,
              proto.yt.Crab356.serializeBinaryToWriter
            ),
          null != (r = e.getAra362()) &&
            t.writeMessage(
              362505312,
              r,
              proto.yt.Ara362.serializeBinaryToWriter
            ),
          null != (r = e.getHorse463()) &&
            t.writeMessage(
              463210517,
              r,
              proto.yt.Horse463.serializeBinaryToWriter
            ),
          null != (r = e.getBee471()) &&
            t.writeMessage(
              471792238,
              r,
              proto.yt.Bee471.serializeBinaryToWriter
            );
      }),
      (proto.yt.Deer5.prototype.getSnake232 = function () {
        return o.Message.getWrapperField(this, proto.yt.Snake232, 232971250);
      }),
      (proto.yt.Deer5.prototype.setSnake232 = function (e) {
        return o.Message.setWrapperField(this, 232971250, e);
      }),
      (proto.yt.Deer5.prototype.clearSnake232 = function () {
        return this.setSnake232(void 0);
      }),
      (proto.yt.Deer5.prototype.hasSnake232 = function () {
        return null != o.Message.getField(this, 232971250);
      }),
      (proto.yt.Deer5.prototype.getPl202 = function () {
        return o.Message.getWrapperField(this, proto.yt.Pl202, 202672916);
      }),
      (proto.yt.Deer5.prototype.setPl202 = function (e) {
        return o.Message.setWrapperField(this, 202672916, e);
      }),
      (proto.yt.Deer5.prototype.clearPl202 = function () {
        return this.setPl202(void 0);
      }),
      (proto.yt.Deer5.prototype.hasPl202 = function () {
        return null != o.Message.getField(this, 202672916);
      }),
      (proto.yt.Deer5.prototype.getNit232 = function () {
        return o.Message.getWrapperField(this, proto.yt.Nit232, 232954548);
      }),
      (proto.yt.Deer5.prototype.setNit232 = function (e) {
        return o.Message.setWrapperField(this, 232954548, e);
      }),
      (proto.yt.Deer5.prototype.clearNit232 = function () {
        return this.setNit232(void 0);
      }),
      (proto.yt.Deer5.prototype.hasNit232 = function () {
        return null != o.Message.getField(this, 232954548);
      }),
      (proto.yt.Deer5.prototype.getGoat264 = function () {
        return o.Message.getWrapperField(this, proto.yt.Goat264, 264467886);
      }),
      (proto.yt.Deer5.prototype.setGoat264 = function (e) {
        return o.Message.setWrapperField(this, 264467886, e);
      }),
      (proto.yt.Deer5.prototype.clearGoat264 = function () {
        return this.setGoat264(void 0);
      }),
      (proto.yt.Deer5.prototype.hasGoat264 = function () {
        return null != o.Message.getField(this, 264467886);
      }),
      (proto.yt.Deer5.prototype.getRhino353 = function () {
        return o.Message.getWrapperField(this, proto.yt.Rhino353, 353001132);
      }),
      (proto.yt.Deer5.prototype.setRhino353 = function (e) {
        return o.Message.setWrapperField(this, 353001132, e);
      }),
      (proto.yt.Deer5.prototype.clearRhino353 = function () {
        return this.setRhino353(void 0);
      }),
      (proto.yt.Deer5.prototype.hasRhino353 = function () {
        return null != o.Message.getField(this, 353001132);
      }),
      (proto.yt.Deer5.prototype.getCrab356 = function () {
        return o.Message.getWrapperField(this, proto.yt.Crab356, 356954790);
      }),
      (proto.yt.Deer5.prototype.setCrab356 = function (e) {
        return o.Message.setWrapperField(this, 356954790, e);
      }),
      (proto.yt.Deer5.prototype.clearCrab356 = function () {
        return this.setCrab356(void 0);
      }),
      (proto.yt.Deer5.prototype.hasCrab356 = function () {
        return null != o.Message.getField(this, 356954790);
      }),
      (proto.yt.Deer5.prototype.getAra362 = function () {
        return o.Message.getWrapperField(this, proto.yt.Ara362, 362505312);
      }),
      (proto.yt.Deer5.prototype.setAra362 = function (e) {
        return o.Message.setWrapperField(this, 362505312, e);
      }),
      (proto.yt.Deer5.prototype.clearAra362 = function () {
        return this.setAra362(void 0);
      }),
      (proto.yt.Deer5.prototype.hasAra362 = function () {
        return null != o.Message.getField(this, 362505312);
      }),
      (proto.yt.Deer5.prototype.getHorse463 = function () {
        return o.Message.getWrapperField(this, proto.yt.Horse463, 463210517);
      }),
      (proto.yt.Deer5.prototype.setHorse463 = function (e) {
        return o.Message.setWrapperField(this, 463210517, e);
      }),
      (proto.yt.Deer5.prototype.clearHorse463 = function () {
        return this.setHorse463(void 0);
      }),
      (proto.yt.Deer5.prototype.hasHorse463 = function () {
        return null != o.Message.getField(this, 463210517);
      }),
      (proto.yt.Deer5.prototype.getBee471 = function () {
        return o.Message.getWrapperField(this, proto.yt.Bee471, 471792238);
      }),
      (proto.yt.Deer5.prototype.setBee471 = function (e) {
        return o.Message.setWrapperField(this, 471792238, e);
      }),
      (proto.yt.Deer5.prototype.clearBee471 = function () {
        return this.setBee471(void 0);
      }),
      (proto.yt.Deer5.prototype.hasBee471 = function () {
        return null != o.Message.getField(this, 471792238);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Fish168.prototype.toObject = function (e) {
          return proto.yt.Fish168.toObject(e, this);
        }),
        (proto.yt.Fish168.toObject = function (e, t) {
          var r,
            o = { deer5: (r = t.getDeer5()) && proto.yt.Deer5.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Fish168.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Fish168();
        return proto.yt.Fish168.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Fish168.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 5:
              var r = new proto.yt.Deer5();
              t.readMessage(r, proto.yt.Deer5.deserializeBinaryFromReader),
                e.setDeer5(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Fish168.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Fish168.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Fish168.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getDeer5()) &&
          t.writeMessage(5, r, proto.yt.Deer5.serializeBinaryToWriter);
      }),
      (proto.yt.Fish168.prototype.getDeer5 = function () {
        return o.Message.getWrapperField(this, proto.yt.Deer5, 5);
      }),
      (proto.yt.Fish168.prototype.setDeer5 = function (e) {
        return o.Message.setWrapperField(this, 5, e);
      }),
      (proto.yt.Fish168.prototype.clearDeer5 = function () {
        return this.setDeer5(void 0);
      }),
      (proto.yt.Fish168.prototype.hasDeer5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Owl1.prototype.toObject = function (e) {
          return proto.yt.Owl1.toObject(e, this);
        }),
        (proto.yt.Owl1.toObject = function (e, t) {
          var r,
            o = {
              fish168: (r = t.getFish168()) && proto.yt.Fish168.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Owl1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Owl1();
        return proto.yt.Owl1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Owl1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 168777401:
              var r = new proto.yt.Fish168();
              t.readMessage(r, proto.yt.Fish168.deserializeBinaryFromReader),
                e.setFish168(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Owl1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Owl1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Owl1.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getFish168()) &&
          t.writeMessage(
            168777401,
            r,
            proto.yt.Fish168.serializeBinaryToWriter
          );
      }),
      (proto.yt.Owl1.prototype.getFish168 = function () {
        return o.Message.getWrapperField(this, proto.yt.Fish168, 168777401);
      }),
      (proto.yt.Owl1.prototype.setFish168 = function (e) {
        return o.Message.setWrapperField(this, 168777401, e);
      }),
      (proto.yt.Owl1.prototype.clearFish168 = function () {
        return this.setFish168(void 0);
      }),
      (proto.yt.Owl1.prototype.hasFish168 = function () {
        return null != o.Message.getField(this, 168777401);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Fox172.prototype.toObject = function (e) {
          return proto.yt.Fox172.toObject(e, this);
        }),
        (proto.yt.Fox172.toObject = function (e, t) {
          var r,
            o = { owl1: (r = t.getOwl1()) && proto.yt.Owl1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Fox172.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Fox172();
        return proto.yt.Fox172.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Fox172.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Owl1();
              t.readMessage(r, proto.yt.Owl1.deserializeBinaryFromReader),
                e.setOwl1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Fox172.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Fox172.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Fox172.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getOwl1()) &&
          t.writeMessage(1, r, proto.yt.Owl1.serializeBinaryToWriter);
      }),
      (proto.yt.Fox172.prototype.getOwl1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Owl1, 1);
      }),
      (proto.yt.Fox172.prototype.setOwl1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Fox172.prototype.clearOwl1 = function () {
        return this.setOwl1(void 0);
      }),
      (proto.yt.Fox172.prototype.hasOwl1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Cat153.prototype.toObject = function (e) {
          return proto.yt.Cat153.toObject(e, this);
        }),
        (proto.yt.Cat153.toObject = function (e, t) {
          var r,
            o = {
              fox172: (r = t.getFox172()) && proto.yt.Fox172.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Cat153.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Cat153();
        return proto.yt.Cat153.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Cat153.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 172660663:
              var r = new proto.yt.Fox172();
              t.readMessage(r, proto.yt.Fox172.deserializeBinaryFromReader),
                e.setFox172(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Cat153.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Cat153.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Cat153.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getFox172()) &&
          t.writeMessage(172660663, r, proto.yt.Fox172.serializeBinaryToWriter);
      }),
      (proto.yt.Cat153.prototype.getFox172 = function () {
        return o.Message.getWrapperField(this, proto.yt.Fox172, 172660663);
      }),
      (proto.yt.Cat153.prototype.setFox172 = function (e) {
        return o.Message.setWrapperField(this, 172660663, e);
      }),
      (proto.yt.Cat153.prototype.clearFox172 = function () {
        return this.setFox172(void 0);
      }),
      (proto.yt.Cat153.prototype.hasFox172 = function () {
        return null != o.Message.getField(this, 172660663);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.RVideo.prototype.toObject = function (e) {
          return proto.yt.RVideo.toObject(e, this);
        }),
        (proto.yt.RVideo.toObject = function (e, t) {
          var r,
            i = {
              id: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              title: (r = t.getTitle()) && proto.yt.Title.toObject(e, r),
              published:
                (r = t.getPublished()) && proto.yt.Holder.toObject(e, r),
              ch8: (r = t.getCh8()) && proto.yt.Ch8.toObject(e, r),
              channel:
                (r = t.getChannel()) && proto.yt.ChannelInfo.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.RVideo.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.RVideo();
        return proto.yt.RVideo.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.RVideo.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setId(r);
              break;
            case 3:
              r = new proto.yt.Title();
              t.readMessage(r, proto.yt.Title.deserializeBinaryFromReader),
                e.setTitle(r);
              break;
            case 5:
              r = new proto.yt.Holder();
              t.readMessage(r, proto.yt.Holder.deserializeBinaryFromReader),
                e.setPublished(r);
              break;
            case 8:
              r = new proto.yt.Ch8();
              t.readMessage(r, proto.yt.Ch8.deserializeBinaryFromReader),
                e.setCh8(r);
              break;
            case 10:
              r = new proto.yt.ChannelInfo();
              t.readMessage(
                r,
                proto.yt.ChannelInfo.deserializeBinaryFromReader
              ),
                e.setChannel(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.RVideo.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.RVideo.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.RVideo.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = e.getTitle()) &&
            t.writeMessage(3, r, proto.yt.Title.serializeBinaryToWriter),
          null != (r = e.getPublished()) &&
            t.writeMessage(5, r, proto.yt.Holder.serializeBinaryToWriter),
          null != (r = e.getCh8()) &&
            t.writeMessage(8, r, proto.yt.Ch8.serializeBinaryToWriter),
          null != (r = e.getChannel()) &&
            t.writeMessage(10, r, proto.yt.ChannelInfo.serializeBinaryToWriter);
      }),
      (proto.yt.RVideo.prototype.getId = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.RVideo.prototype.setId = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.RVideo.prototype.clearId = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.RVideo.prototype.hasId = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.RVideo.prototype.getTitle = function () {
        return o.Message.getWrapperField(this, proto.yt.Title, 3);
      }),
      (proto.yt.RVideo.prototype.setTitle = function (e) {
        return o.Message.setWrapperField(this, 3, e);
      }),
      (proto.yt.RVideo.prototype.clearTitle = function () {
        return this.setTitle(void 0);
      }),
      (proto.yt.RVideo.prototype.hasTitle = function () {
        return null != o.Message.getField(this, 3);
      }),
      (proto.yt.RVideo.prototype.getPublished = function () {
        return o.Message.getWrapperField(this, proto.yt.Holder, 5);
      }),
      (proto.yt.RVideo.prototype.setPublished = function (e) {
        return o.Message.setWrapperField(this, 5, e);
      }),
      (proto.yt.RVideo.prototype.clearPublished = function () {
        return this.setPublished(void 0);
      }),
      (proto.yt.RVideo.prototype.hasPublished = function () {
        return null != o.Message.getField(this, 5);
      }),
      (proto.yt.RVideo.prototype.getCh8 = function () {
        return o.Message.getWrapperField(this, proto.yt.Ch8, 8);
      }),
      (proto.yt.RVideo.prototype.setCh8 = function (e) {
        return o.Message.setWrapperField(this, 8, e);
      }),
      (proto.yt.RVideo.prototype.clearCh8 = function () {
        return this.setCh8(void 0);
      }),
      (proto.yt.RVideo.prototype.hasCh8 = function () {
        return null != o.Message.getField(this, 8);
      }),
      (proto.yt.RVideo.prototype.getChannel = function () {
        return o.Message.getWrapperField(this, proto.yt.ChannelInfo, 10);
      }),
      (proto.yt.RVideo.prototype.setChannel = function (e) {
        return o.Message.setWrapperField(this, 10, e);
      }),
      (proto.yt.RVideo.prototype.clearChannel = function () {
        return this.setChannel(void 0);
      }),
      (proto.yt.RVideo.prototype.hasChannel = function () {
        return null != o.Message.getField(this, 10);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Bat1.prototype.toObject = function (e) {
          return proto.yt.Bat1.toObject(e, this);
        }),
        (proto.yt.Bat1.toObject = function (e, t) {
          var r,
            o = {
              thumbnail:
                (r = t.getThumbnail()) && proto.yt.Thumbnail.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Bat1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Bat1();
        return proto.yt.Bat1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Bat1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Thumbnail();
              t.readMessage(r, proto.yt.Thumbnail.deserializeBinaryFromReader),
                e.setThumbnail(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Bat1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Bat1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Bat1.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getThumbnail()) &&
          t.writeMessage(1, r, proto.yt.Thumbnail.serializeBinaryToWriter);
      }),
      (proto.yt.Bat1.prototype.getThumbnail = function () {
        return o.Message.getWrapperField(this, proto.yt.Thumbnail, 1);
      }),
      (proto.yt.Bat1.prototype.setThumbnail = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Bat1.prototype.clearThumbnail = function () {
        return this.setThumbnail(void 0);
      }),
      (proto.yt.Bat1.prototype.hasThumbnail = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.J106.prototype.toObject = function (e) {
          return proto.yt.J106.toObject(e, this);
        }),
        (proto.yt.J106.toObject = function (e, t) {
          var r,
            o = { bat1: (r = t.getBat1()) && proto.yt.Bat1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.J106.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.J106();
        return proto.yt.J106.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.J106.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Bat1();
              t.readMessage(r, proto.yt.Bat1.deserializeBinaryFromReader),
                e.setBat1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.J106.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.J106.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.J106.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getBat1()) &&
          t.writeMessage(1, r, proto.yt.Bat1.serializeBinaryToWriter);
      }),
      (proto.yt.J106.prototype.getBat1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Bat1, 1);
      }),
      (proto.yt.J106.prototype.setBat1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.J106.prototype.clearBat1 = function () {
        return this.setBat1(void 0);
      }),
      (proto.yt.J106.prototype.hasBat1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Emu2.prototype.toObject = function (e) {
          return proto.yt.Emu2.toObject(e, this);
        }),
        (proto.yt.Emu2.toObject = function (e, t) {
          var r,
            o = { j106: (r = t.getJ106()) && proto.yt.J106.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Emu2.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Emu2();
        return proto.yt.Emu2.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Emu2.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 106888735:
              var r = new proto.yt.J106();
              t.readMessage(r, proto.yt.J106.deserializeBinaryFromReader),
                e.setJ106(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Emu2.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Emu2.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Emu2.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getJ106()) &&
          t.writeMessage(106888735, r, proto.yt.J106.serializeBinaryToWriter);
      }),
      (proto.yt.Emu2.prototype.getJ106 = function () {
        return o.Message.getWrapperField(this, proto.yt.J106, 106888735);
      }),
      (proto.yt.Emu2.prototype.setJ106 = function (e) {
        return o.Message.setWrapperField(this, 106888735, e);
      }),
      (proto.yt.Emu2.prototype.clearJ106 = function () {
        return this.setJ106(void 0);
      }),
      (proto.yt.Emu2.prototype.hasJ106 = function () {
        return null != o.Message.getField(this, 106888735);
      }),
      (proto.yt.Ort1.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Ort1.prototype.toObject = function (e) {
          return proto.yt.Ort1.toObject(e, this);
        }),
        (proto.yt.Ort1.toObject = function (e, t) {
          var r = {
            t1List: o.Message.toObjectList(
              t.getT1List(),
              proto.yt.T1.toObject,
              e
            ),
          };
          return e && (r.$jspbMessageInstance = t), r;
        })),
      (proto.yt.Ort1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Ort1();
        return proto.yt.Ort1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Ort1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.T1();
              t.readMessage(r, proto.yt.T1.deserializeBinaryFromReader),
                e.addT1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Ort1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Ort1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Ort1.serializeBinaryToWriter = function (e, t) {
        var r;
        (r = e.getT1List()).length > 0 &&
          t.writeRepeatedMessage(1, r, proto.yt.T1.serializeBinaryToWriter);
      }),
      (proto.yt.Ort1.prototype.getT1List = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.T1, 1);
      }),
      (proto.yt.Ort1.prototype.setT1List = function (e) {
        return o.Message.setRepeatedWrapperField(this, 1, e);
      }),
      (proto.yt.Ort1.prototype.addT1 = function (e, t) {
        return o.Message.addToRepeatedWrapperField(this, 1, e, proto.yt.T1, t);
      }),
      (proto.yt.Ort1.prototype.clearT1List = function () {
        return this.setT1List([]);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.M109.prototype.toObject = function (e) {
          return proto.yt.M109.toObject(e, this);
        }),
        (proto.yt.M109.toObject = function (e, t) {
          var r,
            o = { ort1: (r = t.getOrt1()) && proto.yt.Ort1.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.M109.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.M109();
        return proto.yt.M109.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.M109.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Ort1();
              t.readMessage(r, proto.yt.Ort1.deserializeBinaryFromReader),
                e.setOrt1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.M109.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.M109.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.M109.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getOrt1()) &&
          t.writeMessage(1, r, proto.yt.Ort1.serializeBinaryToWriter);
      }),
      (proto.yt.M109.prototype.getOrt1 = function () {
        return o.Message.getWrapperField(this, proto.yt.Ort1, 1);
      }),
      (proto.yt.M109.prototype.setOrt1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.M109.prototype.clearOrt1 = function () {
        return this.setOrt1(void 0);
      }),
      (proto.yt.M109.prototype.hasOrt1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Ko11.prototype.toObject = function (e) {
          return proto.yt.Ko11.toObject(e, this);
        }),
        (proto.yt.Ko11.toObject = function (e, t) {
          var r,
            o = { m109: (r = t.getM109()) && proto.yt.M109.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Ko11.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Ko11();
        return proto.yt.Ko11.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Ko11.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 109635582:
              var r = new proto.yt.M109();
              t.readMessage(r, proto.yt.M109.deserializeBinaryFromReader),
                e.setM109(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Ko11.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Ko11.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Ko11.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getM109()) &&
          t.writeMessage(109635582, r, proto.yt.M109.serializeBinaryToWriter);
      }),
      (proto.yt.Ko11.prototype.getM109 = function () {
        return o.Message.getWrapperField(this, proto.yt.M109, 109635582);
      }),
      (proto.yt.Ko11.prototype.setM109 = function (e) {
        return o.Message.setWrapperField(this, 109635582, e);
      }),
      (proto.yt.Ko11.prototype.clearM109 = function () {
        return this.setM109(void 0);
      }),
      (proto.yt.Ko11.prototype.hasM109 = function () {
        return null != o.Message.getField(this, 109635582);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Tgr106.prototype.toObject = function (e) {
          return proto.yt.Tgr106.toObject(e, this);
        }),
        (proto.yt.Tgr106.toObject = function (e, t) {
          var r,
            o = {
              title: (r = t.getTitle()) && proto.yt.Title.toObject(e, r),
              emu2: (r = t.getEmu2()) && proto.yt.Emu2.toObject(e, r),
              ko11: (r = t.getKo11()) && proto.yt.Ko11.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Tgr106.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Tgr106();
        return proto.yt.Tgr106.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Tgr106.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Title();
              t.readMessage(r, proto.yt.Title.deserializeBinaryFromReader),
                e.setTitle(r);
              break;
            case 2:
              r = new proto.yt.Emu2();
              t.readMessage(r, proto.yt.Emu2.deserializeBinaryFromReader),
                e.setEmu2(r);
              break;
            case 11:
              r = new proto.yt.Ko11();
              t.readMessage(r, proto.yt.Ko11.deserializeBinaryFromReader),
                e.setKo11(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Tgr106.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Tgr106.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Tgr106.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getTitle()) &&
          t.writeMessage(1, r, proto.yt.Title.serializeBinaryToWriter),
          null != (r = e.getEmu2()) &&
            t.writeMessage(2, r, proto.yt.Emu2.serializeBinaryToWriter),
          null != (r = e.getKo11()) &&
            t.writeMessage(11, r, proto.yt.Ko11.serializeBinaryToWriter);
      }),
      (proto.yt.Tgr106.prototype.getTitle = function () {
        return o.Message.getWrapperField(this, proto.yt.Title, 1);
      }),
      (proto.yt.Tgr106.prototype.setTitle = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.Tgr106.prototype.clearTitle = function () {
        return this.setTitle(void 0);
      }),
      (proto.yt.Tgr106.prototype.hasTitle = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.Tgr106.prototype.getEmu2 = function () {
        return o.Message.getWrapperField(this, proto.yt.Emu2, 2);
      }),
      (proto.yt.Tgr106.prototype.setEmu2 = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.Tgr106.prototype.clearEmu2 = function () {
        return this.setEmu2(void 0);
      }),
      (proto.yt.Tgr106.prototype.hasEmu2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Tgr106.prototype.getKo11 = function () {
        return o.Message.getWrapperField(this, proto.yt.Ko11, 11);
      }),
      (proto.yt.Tgr106.prototype.setKo11 = function (e) {
        return o.Message.setWrapperField(this, 11, e);
      }),
      (proto.yt.Tgr106.prototype.clearKo11 = function () {
        return this.setKo11(void 0);
      }),
      (proto.yt.Tgr106.prototype.hasKo11 = function () {
        return null != o.Message.getField(this, 11);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Result.prototype.toObject = function (e) {
          return proto.yt.Result.toObject(e, this);
        }),
        (proto.yt.Result.toObject = function (e, t) {
          var r,
            o = {
              playlist:
                (r = t.getPlaylist()) && proto.yt.RPlaylist.toObject(e, r),
              video: (r = t.getVideo()) && proto.yt.RVideo.toObject(e, r),
              cat153: (r = t.getCat153()) && proto.yt.Cat153.toObject(e, r),
              tgr106: (r = t.getTgr106()) && proto.yt.Tgr106.toObject(e, r),
              channel: (r = t.getChannel()) && proto.yt.RChannel.toObject(e, r),
              channelDetails:
                (r = t.getChannelDetails()) &&
                proto.yt.RChannelDetails.toObject(e, r),
              s54681060:
                (r = t.getS54681060()) && proto.yt.S54681060.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Result.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Result();
        return proto.yt.Result.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Result.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 50742631:
              var r = new proto.yt.RPlaylist();
              t.readMessage(r, proto.yt.RPlaylist.deserializeBinaryFromReader),
                e.setPlaylist(r);
              break;
            case 50630979:
              r = new proto.yt.RVideo();
              t.readMessage(r, proto.yt.RVideo.deserializeBinaryFromReader),
                e.setVideo(r);
              break;
            case 153515154:
              r = new proto.yt.Cat153();
              t.readMessage(r, proto.yt.Cat153.deserializeBinaryFromReader),
                e.setCat153(r);
              break;
            case 106862445:
              r = new proto.yt.Tgr106();
              t.readMessage(r, proto.yt.Tgr106.deserializeBinaryFromReader),
                e.setTgr106(r);
              break;
            case 50794305:
              r = new proto.yt.RChannel();
              t.readMessage(r, proto.yt.RChannel.deserializeBinaryFromReader),
                e.setChannel(r);
              break;
            case 52191200:
              r = new proto.yt.RChannelDetails();
              t.readMessage(
                r,
                proto.yt.RChannelDetails.deserializeBinaryFromReader
              ),
                e.setChannelDetails(r);
              break;
            case 54681060:
              r = new proto.yt.S54681060();
              t.readMessage(r, proto.yt.S54681060.deserializeBinaryFromReader),
                e.setS54681060(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Result.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Result.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Result.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getPlaylist()) &&
          t.writeMessage(
            50742631,
            r,
            proto.yt.RPlaylist.serializeBinaryToWriter
          ),
          null != (r = e.getVideo()) &&
            t.writeMessage(
              50630979,
              r,
              proto.yt.RVideo.serializeBinaryToWriter
            ),
          null != (r = e.getCat153()) &&
            t.writeMessage(
              153515154,
              r,
              proto.yt.Cat153.serializeBinaryToWriter
            ),
          null != (r = e.getTgr106()) &&
            t.writeMessage(
              106862445,
              r,
              proto.yt.Tgr106.serializeBinaryToWriter
            ),
          null != (r = e.getChannel()) &&
            t.writeMessage(
              50794305,
              r,
              proto.yt.RChannel.serializeBinaryToWriter
            ),
          null != (r = e.getChannelDetails()) &&
            t.writeMessage(
              52191200,
              r,
              proto.yt.RChannelDetails.serializeBinaryToWriter
            ),
          null != (r = e.getS54681060()) &&
            t.writeMessage(
              54681060,
              r,
              proto.yt.S54681060.serializeBinaryToWriter
            );
      }),
      (proto.yt.Result.prototype.getPlaylist = function () {
        return o.Message.getWrapperField(this, proto.yt.RPlaylist, 50742631);
      }),
      (proto.yt.Result.prototype.setPlaylist = function (e) {
        return o.Message.setWrapperField(this, 50742631, e);
      }),
      (proto.yt.Result.prototype.clearPlaylist = function () {
        return this.setPlaylist(void 0);
      }),
      (proto.yt.Result.prototype.hasPlaylist = function () {
        return null != o.Message.getField(this, 50742631);
      }),
      (proto.yt.Result.prototype.getVideo = function () {
        return o.Message.getWrapperField(this, proto.yt.RVideo, 50630979);
      }),
      (proto.yt.Result.prototype.setVideo = function (e) {
        return o.Message.setWrapperField(this, 50630979, e);
      }),
      (proto.yt.Result.prototype.clearVideo = function () {
        return this.setVideo(void 0);
      }),
      (proto.yt.Result.prototype.hasVideo = function () {
        return null != o.Message.getField(this, 50630979);
      }),
      (proto.yt.Result.prototype.getCat153 = function () {
        return o.Message.getWrapperField(this, proto.yt.Cat153, 153515154);
      }),
      (proto.yt.Result.prototype.setCat153 = function (e) {
        return o.Message.setWrapperField(this, 153515154, e);
      }),
      (proto.yt.Result.prototype.clearCat153 = function () {
        return this.setCat153(void 0);
      }),
      (proto.yt.Result.prototype.hasCat153 = function () {
        return null != o.Message.getField(this, 153515154);
      }),
      (proto.yt.Result.prototype.getTgr106 = function () {
        return o.Message.getWrapperField(this, proto.yt.Tgr106, 106862445);
      }),
      (proto.yt.Result.prototype.setTgr106 = function (e) {
        return o.Message.setWrapperField(this, 106862445, e);
      }),
      (proto.yt.Result.prototype.clearTgr106 = function () {
        return this.setTgr106(void 0);
      }),
      (proto.yt.Result.prototype.hasTgr106 = function () {
        return null != o.Message.getField(this, 106862445);
      }),
      (proto.yt.Result.prototype.getChannel = function () {
        return o.Message.getWrapperField(this, proto.yt.RChannel, 50794305);
      }),
      (proto.yt.Result.prototype.setChannel = function (e) {
        return o.Message.setWrapperField(this, 50794305, e);
      }),
      (proto.yt.Result.prototype.clearChannel = function () {
        return this.setChannel(void 0);
      }),
      (proto.yt.Result.prototype.hasChannel = function () {
        return null != o.Message.getField(this, 50794305);
      }),
      (proto.yt.Result.prototype.getChannelDetails = function () {
        return o.Message.getWrapperField(
          this,
          proto.yt.RChannelDetails,
          52191200
        );
      }),
      (proto.yt.Result.prototype.setChannelDetails = function (e) {
        return o.Message.setWrapperField(this, 52191200, e);
      }),
      (proto.yt.Result.prototype.clearChannelDetails = function () {
        return this.setChannelDetails(void 0);
      }),
      (proto.yt.Result.prototype.hasChannelDetails = function () {
        return null != o.Message.getField(this, 52191200);
      }),
      (proto.yt.Result.prototype.getS54681060 = function () {
        return o.Message.getWrapperField(this, proto.yt.S54681060, 54681060);
      }),
      (proto.yt.Result.prototype.setS54681060 = function (e) {
        return o.Message.setWrapperField(this, 54681060, e);
      }),
      (proto.yt.Result.prototype.clearS54681060 = function () {
        return this.setS54681060(void 0);
      }),
      (proto.yt.Result.prototype.hasS54681060 = function () {
        return null != o.Message.getField(this, 54681060);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.M520.prototype.toObject = function (e) {
          return proto.yt.M520.toObject(e, this);
        }),
        (proto.yt.M520.toObject = function (e, t) {
          var r,
            i = {
              continuationToken:
                null == (r = o.Message.getField(t, 1)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.M520.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.M520();
        return proto.yt.M520.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.M520.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setContinuationToken(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.M520.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.M520.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.M520.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r);
      }),
      (proto.yt.M520.prototype.getContinuationToken = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.M520.prototype.setContinuationToken = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.M520.prototype.clearContinuationToken = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.M520.prototype.hasContinuationToken = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.M2.prototype.toObject = function (e) {
          return proto.yt.M2.toObject(e, this);
        }),
        (proto.yt.M2.toObject = function (e, t) {
          var r,
            o = { m520: (r = t.getM520()) && proto.yt.M520.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.M2.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.M2();
        return proto.yt.M2.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.M2.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 52047593:
              var r = new proto.yt.M520();
              t.readMessage(r, proto.yt.M520.deserializeBinaryFromReader),
                e.setM520(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.M2.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.M2.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.M2.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getM520()) &&
          t.writeMessage(52047593, r, proto.yt.M520.serializeBinaryToWriter);
      }),
      (proto.yt.M2.prototype.getM520 = function () {
        return o.Message.getWrapperField(this, proto.yt.M520, 52047593);
      }),
      (proto.yt.M2.prototype.setM520 = function (e) {
        return o.Message.setWrapperField(this, 52047593, e);
      }),
      (proto.yt.M2.prototype.clearM520 = function () {
        return this.setM520(void 0);
      }),
      (proto.yt.M2.prototype.hasM520 = function () {
        return null != o.Message.getField(this, 52047593);
      }),
      (proto.yt.S501.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.S501.prototype.toObject = function (e) {
          return proto.yt.S501.toObject(e, this);
        }),
        (proto.yt.S501.toObject = function (e, t) {
          var r,
            i = {
              resultList: o.Message.toObjectList(
                t.getResultList(),
                proto.yt.Result.toObject,
                e
              ),
              m2: (r = t.getM2()) && proto.yt.M2.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.S501.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.S501();
        return proto.yt.S501.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.S501.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Result();
              t.readMessage(r, proto.yt.Result.deserializeBinaryFromReader),
                e.addResult(r);
              break;
            case 2:
              r = new proto.yt.M2();
              t.readMessage(r, proto.yt.M2.deserializeBinaryFromReader),
                e.setM2(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.S501.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.S501.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.S501.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        (r = e.getResultList()).length > 0 &&
          t.writeRepeatedMessage(1, r, proto.yt.Result.serializeBinaryToWriter),
          null != (r = e.getM2()) &&
            t.writeMessage(2, r, proto.yt.M2.serializeBinaryToWriter);
      }),
      (proto.yt.S501.prototype.getResultList = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.Result, 1);
      }),
      (proto.yt.S501.prototype.setResultList = function (e) {
        return o.Message.setRepeatedWrapperField(this, 1, e);
      }),
      (proto.yt.S501.prototype.addResult = function (e, t) {
        return o.Message.addToRepeatedWrapperField(
          this,
          1,
          e,
          proto.yt.Result,
          t
        );
      }),
      (proto.yt.S501.prototype.clearResultList = function () {
        return this.setResultList([]);
      }),
      (proto.yt.S501.prototype.getM2 = function () {
        return o.Message.getWrapperField(this, proto.yt.M2, 2);
      }),
      (proto.yt.S501.prototype.setM2 = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.S501.prototype.clearM2 = function () {
        return this.setM2(void 0);
      }),
      (proto.yt.S501.prototype.hasM2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.PVideo.prototype.toObject = function (e) {
          return proto.yt.PVideo.toObject(e, this);
        }),
        (proto.yt.PVideo.toObject = function (e, t) {
          var r,
            i = {
              id: null == (r = o.Message.getField(t, 1)) ? void 0 : r,
              title: (r = t.getTitle()) && proto.yt.Title.toObject(e, r),
              channel:
                (r = t.getChannel()) && proto.yt.ChannelInfo.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.PVideo.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.PVideo();
        return proto.yt.PVideo.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.PVideo.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setId(r);
              break;
            case 3:
              r = new proto.yt.Title();
              t.readMessage(r, proto.yt.Title.deserializeBinaryFromReader),
                e.setTitle(r);
              break;
            case 5:
              r = new proto.yt.ChannelInfo();
              t.readMessage(
                r,
                proto.yt.ChannelInfo.deserializeBinaryFromReader
              ),
                e.setChannel(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.PVideo.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.PVideo.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.PVideo.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r),
          null != (r = e.getTitle()) &&
            t.writeMessage(3, r, proto.yt.Title.serializeBinaryToWriter),
          null != (r = e.getChannel()) &&
            t.writeMessage(5, r, proto.yt.ChannelInfo.serializeBinaryToWriter);
      }),
      (proto.yt.PVideo.prototype.getId = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.PVideo.prototype.setId = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.PVideo.prototype.clearId = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.PVideo.prototype.hasId = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.PVideo.prototype.getTitle = function () {
        return o.Message.getWrapperField(this, proto.yt.Title, 3);
      }),
      (proto.yt.PVideo.prototype.setTitle = function (e) {
        return o.Message.setWrapperField(this, 3, e);
      }),
      (proto.yt.PVideo.prototype.clearTitle = function () {
        return this.setTitle(void 0);
      }),
      (proto.yt.PVideo.prototype.hasTitle = function () {
        return null != o.Message.getField(this, 3);
      }),
      (proto.yt.PVideo.prototype.getChannel = function () {
        return o.Message.getWrapperField(this, proto.yt.ChannelInfo, 5);
      }),
      (proto.yt.PVideo.prototype.setChannel = function (e) {
        return o.Message.setWrapperField(this, 5, e);
      }),
      (proto.yt.PVideo.prototype.clearChannel = function () {
        return this.setChannel(void 0);
      }),
      (proto.yt.PVideo.prototype.hasChannel = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.P1.prototype.toObject = function (e) {
          return proto.yt.P1.toObject(e, this);
        }),
        (proto.yt.P1.toObject = function (e, t) {
          var r,
            o = { video: (r = t.getVideo()) && proto.yt.PVideo.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.P1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.P1();
        return proto.yt.P1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.P1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 53330184:
              var r = new proto.yt.PVideo();
              t.readMessage(r, proto.yt.PVideo.deserializeBinaryFromReader),
                e.setVideo(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.P1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.P1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.P1.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getVideo()) &&
          t.writeMessage(53330184, r, proto.yt.PVideo.serializeBinaryToWriter);
      }),
      (proto.yt.P1.prototype.getVideo = function () {
        return o.Message.getWrapperField(this, proto.yt.PVideo, 53330184);
      }),
      (proto.yt.P1.prototype.setVideo = function (e) {
        return o.Message.setWrapperField(this, 53330184, e);
      }),
      (proto.yt.P1.prototype.clearVideo = function () {
        return this.setVideo(void 0);
      }),
      (proto.yt.P1.prototype.hasVideo = function () {
        return null != o.Message.getField(this, 53330184);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.P4.prototype.toObject = function (e) {
          return proto.yt.P4.toObject(e, this);
        }),
        (proto.yt.P4.toObject = function (e, t) {
          var r,
            o = { m520: (r = t.getM520()) && proto.yt.M520.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.P4.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.P4();
        return proto.yt.P4.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.P4.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 52047593:
              var r = new proto.yt.M520();
              t.readMessage(r, proto.yt.M520.deserializeBinaryFromReader),
                e.setM520(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.P4.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.P4.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.P4.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getM520()) &&
          t.writeMessage(52047593, r, proto.yt.M520.serializeBinaryToWriter);
      }),
      (proto.yt.P4.prototype.getM520 = function () {
        return o.Message.getWrapperField(this, proto.yt.M520, 52047593);
      }),
      (proto.yt.P4.prototype.setM520 = function (e) {
        return o.Message.setWrapperField(this, 52047593, e);
      }),
      (proto.yt.P4.prototype.clearM520 = function () {
        return this.setM520(void 0);
      }),
      (proto.yt.P4.prototype.hasM520 = function () {
        return null != o.Message.getField(this, 52047593);
      }),
      (proto.yt.S54681060.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.S54681060.prototype.toObject = function (e) {
          return proto.yt.S54681060.toObject(e, this);
        }),
        (proto.yt.S54681060.toObject = function (e, t) {
          var r,
            i = {
              p1List: o.Message.toObjectList(
                t.getP1List(),
                proto.yt.P1.toObject,
                e
              ),
              p4: (r = t.getP4()) && proto.yt.P4.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.S54681060.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.S54681060();
        return proto.yt.S54681060.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.S54681060.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.P1();
              t.readMessage(r, proto.yt.P1.deserializeBinaryFromReader),
                e.addP1(r);
              break;
            case 4:
              r = new proto.yt.P4();
              t.readMessage(r, proto.yt.P4.deserializeBinaryFromReader),
                e.setP4(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.S54681060.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.S54681060.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.S54681060.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        (r = e.getP1List()).length > 0 &&
          t.writeRepeatedMessage(1, r, proto.yt.P1.serializeBinaryToWriter),
          null != (r = e.getP4()) &&
            t.writeMessage(4, r, proto.yt.P4.serializeBinaryToWriter);
      }),
      (proto.yt.S54681060.prototype.getP1List = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.P1, 1);
      }),
      (proto.yt.S54681060.prototype.setP1List = function (e) {
        return o.Message.setRepeatedWrapperField(this, 1, e);
      }),
      (proto.yt.S54681060.prototype.addP1 = function (e, t) {
        return o.Message.addToRepeatedWrapperField(this, 1, e, proto.yt.P1, t);
      }),
      (proto.yt.S54681060.prototype.clearP1List = function () {
        return this.setP1List([]);
      }),
      (proto.yt.S54681060.prototype.getP4 = function () {
        return o.Message.getWrapperField(this, proto.yt.P4, 4);
      }),
      (proto.yt.S54681060.prototype.setP4 = function (e) {
        return o.Message.setWrapperField(this, 4, e);
      }),
      (proto.yt.S54681060.prototype.clearP4 = function () {
        return this.setP4(void 0);
      }),
      (proto.yt.S54681060.prototype.hasP4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.S1.prototype.toObject = function (e) {
          return proto.yt.S1.toObject(e, this);
        }),
        (proto.yt.S1.toObject = function (e, t) {
          var r,
            o = {
              s501: (r = t.getS501()) && proto.yt.S501.toObject(e, r),
              s54681060:
                (r = t.getS54681060()) && proto.yt.S54681060.toObject(e, r),
              c518: (r = t.getC518()) && proto.yt.C518.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.S1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.S1();
        return proto.yt.S1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.S1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 50195462:
              var r = new proto.yt.S501();
              t.readMessage(r, proto.yt.S501.deserializeBinaryFromReader),
                e.setS501(r);
              break;
            case 54681060:
              r = new proto.yt.S54681060();
              t.readMessage(r, proto.yt.S54681060.deserializeBinaryFromReader),
                e.setS54681060(r);
              break;
            case 51845067:
              r = new proto.yt.C518();
              t.readMessage(r, proto.yt.C518.deserializeBinaryFromReader),
                e.setC518(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.S1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.S1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.S1.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getS501()) &&
          t.writeMessage(50195462, r, proto.yt.S501.serializeBinaryToWriter),
          null != (r = e.getS54681060()) &&
            t.writeMessage(
              54681060,
              r,
              proto.yt.S54681060.serializeBinaryToWriter
            ),
          null != (r = e.getC518()) &&
            t.writeMessage(51845067, r, proto.yt.C518.serializeBinaryToWriter);
      }),
      (proto.yt.S1.prototype.getS501 = function () {
        return o.Message.getWrapperField(this, proto.yt.S501, 50195462);
      }),
      (proto.yt.S1.prototype.setS501 = function (e) {
        return o.Message.setWrapperField(this, 50195462, e);
      }),
      (proto.yt.S1.prototype.clearS501 = function () {
        return this.setS501(void 0);
      }),
      (proto.yt.S1.prototype.hasS501 = function () {
        return null != o.Message.getField(this, 50195462);
      }),
      (proto.yt.S1.prototype.getS54681060 = function () {
        return o.Message.getWrapperField(this, proto.yt.S54681060, 54681060);
      }),
      (proto.yt.S1.prototype.setS54681060 = function (e) {
        return o.Message.setWrapperField(this, 54681060, e);
      }),
      (proto.yt.S1.prototype.clearS54681060 = function () {
        return this.setS54681060(void 0);
      }),
      (proto.yt.S1.prototype.hasS54681060 = function () {
        return null != o.Message.getField(this, 54681060);
      }),
      (proto.yt.S1.prototype.getC518 = function () {
        return o.Message.getWrapperField(this, proto.yt.C518, 51845067);
      }),
      (proto.yt.S1.prototype.setC518 = function (e) {
        return o.Message.setWrapperField(this, 51845067, e);
      }),
      (proto.yt.S1.prototype.clearC518 = function () {
        return this.setC518(void 0);
      }),
      (proto.yt.S1.prototype.hasC518 = function () {
        return null != o.Message.getField(this, 51845067);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Boa604.prototype.toObject = function (e) {
          return proto.yt.Boa604.toObject(e, this);
        }),
        (proto.yt.Boa604.toObject = function (e, t) {
          var r,
            i = {
              continuationToken:
                null == (r = o.Message.getField(t, 1)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Boa604.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Boa604();
        return proto.yt.Boa604.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Boa604.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = t.readString();
              e.setContinuationToken(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Boa604.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Boa604.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Boa604.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = o.Message.getField(e, 1)) && t.writeString(1, r);
      }),
      (proto.yt.Boa604.prototype.getContinuationToken = function () {
        return o.Message.getFieldWithDefault(this, 1, '');
      }),
      (proto.yt.Boa604.prototype.setContinuationToken = function (e) {
        return o.Message.setField(this, 1, e);
      }),
      (proto.yt.Boa604.prototype.clearContinuationToken = function () {
        return o.Message.setField(this, 1, void 0);
      }),
      (proto.yt.Boa604.prototype.hasContinuationToken = function () {
        return null != o.Message.getField(this, 1);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Ant2.prototype.toObject = function (e) {
          return proto.yt.Ant2.toObject(e, this);
        }),
        (proto.yt.Ant2.toObject = function (e, t) {
          var r,
            o = {
              boa604: (r = t.getBoa604()) && proto.yt.Boa604.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Ant2.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Ant2();
        return proto.yt.Ant2.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Ant2.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 60487319:
              var r = new proto.yt.Boa604();
              t.readMessage(r, proto.yt.Boa604.deserializeBinaryFromReader),
                e.setBoa604(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Ant2.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Ant2.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Ant2.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getBoa604()) &&
          t.writeMessage(60487319, r, proto.yt.Boa604.serializeBinaryToWriter);
      }),
      (proto.yt.Ant2.prototype.getBoa604 = function () {
        return o.Message.getWrapperField(this, proto.yt.Boa604, 60487319);
      }),
      (proto.yt.Ant2.prototype.setBoa604 = function (e) {
        return o.Message.setWrapperField(this, 60487319, e);
      }),
      (proto.yt.Ant2.prototype.clearBoa604 = function () {
        return this.setBoa604(void 0);
      }),
      (proto.yt.Ant2.prototype.hasBoa604 = function () {
        return null != o.Message.getField(this, 60487319);
      }),
      (proto.yt.S49.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.S49.prototype.toObject = function (e) {
          return proto.yt.S49.toObject(e, this);
        }),
        (proto.yt.S49.toObject = function (e, t) {
          var r,
            i = {
              s1List: o.Message.toObjectList(
                t.getS1List(),
                proto.yt.S1.toObject,
                e
              ),
              ant2: (r = t.getAnt2()) && proto.yt.Ant2.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.S49.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.S49();
        return proto.yt.S49.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.S49.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.S1();
              t.readMessage(r, proto.yt.S1.deserializeBinaryFromReader),
                e.addS1(r);
              break;
            case 2:
              r = new proto.yt.Ant2();
              t.readMessage(r, proto.yt.Ant2.deserializeBinaryFromReader),
                e.setAnt2(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.S49.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.S49.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.S49.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        (r = e.getS1List()).length > 0 &&
          t.writeRepeatedMessage(1, r, proto.yt.S1.serializeBinaryToWriter),
          null != (r = e.getAnt2()) &&
            t.writeMessage(2, r, proto.yt.Ant2.serializeBinaryToWriter);
      }),
      (proto.yt.S49.prototype.getS1List = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.S1, 1);
      }),
      (proto.yt.S49.prototype.setS1List = function (e) {
        return o.Message.setRepeatedWrapperField(this, 1, e);
      }),
      (proto.yt.S49.prototype.addS1 = function (e, t) {
        return o.Message.addToRepeatedWrapperField(this, 1, e, proto.yt.S1, t);
      }),
      (proto.yt.S49.prototype.clearS1List = function () {
        return this.setS1List([]);
      }),
      (proto.yt.S49.prototype.getAnt2 = function () {
        return o.Message.getWrapperField(this, proto.yt.Ant2, 2);
      }),
      (proto.yt.S49.prototype.setAnt2 = function (e) {
        return o.Message.setWrapperField(this, 2, e);
      }),
      (proto.yt.S49.prototype.clearAnt2 = function () {
        return this.setAnt2(void 0);
      }),
      (proto.yt.S49.prototype.hasAnt2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.S4.prototype.toObject = function (e) {
          return proto.yt.S4.toObject(e, this);
        }),
        (proto.yt.S4.toObject = function (e, t) {
          var r,
            o = { s49: (r = t.getS49()) && proto.yt.S49.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.S4.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.S4();
        return proto.yt.S4.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.S4.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 49399797:
              var r = new proto.yt.S49();
              t.readMessage(r, proto.yt.S49.deserializeBinaryFromReader),
                e.setS49(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.S4.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.S4.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.S4.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getS49()) &&
          t.writeMessage(49399797, r, proto.yt.S49.serializeBinaryToWriter);
      }),
      (proto.yt.S4.prototype.getS49 = function () {
        return o.Message.getWrapperField(this, proto.yt.S49, 49399797);
      }),
      (proto.yt.S4.prototype.setS49 = function (e) {
        return o.Message.setWrapperField(this, 49399797, e);
      }),
      (proto.yt.S4.prototype.clearS49 = function () {
        return this.setS49(void 0);
      }),
      (proto.yt.S4.prototype.hasS49 = function () {
        return null != o.Message.getField(this, 49399797);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.SearchResponse.prototype.toObject = function (e) {
          return proto.yt.SearchResponse.toObject(e, this);
        }),
        (proto.yt.SearchResponse.toObject = function (e, t) {
          var r,
            o = { s4: (r = t.getS4()) && proto.yt.S4.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.SearchResponse.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.SearchResponse();
        return proto.yt.SearchResponse.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.SearchResponse.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 4:
              var r = new proto.yt.S4();
              t.readMessage(r, proto.yt.S4.deserializeBinaryFromReader),
                e.setS4(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.SearchResponse.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.SearchResponse.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.SearchResponse.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getS4()) &&
          t.writeMessage(4, r, proto.yt.S4.serializeBinaryToWriter);
      }),
      (proto.yt.SearchResponse.prototype.getS4 = function () {
        return o.Message.getWrapperField(this, proto.yt.S4, 4);
      }),
      (proto.yt.SearchResponse.prototype.setS4 = function (e) {
        return o.Message.setWrapperField(this, 4, e);
      }),
      (proto.yt.SearchResponse.prototype.clearS4 = function () {
        return this.setS4(void 0);
      }),
      (proto.yt.SearchResponse.prototype.hasS4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Wasp26.prototype.toObject = function (e) {
          return proto.yt.Wasp26.toObject(e, this);
        }),
        (proto.yt.Wasp26.toObject = function (e, t) {
          var r,
            i = {
              f2: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              f5: null == (r = o.Message.getField(t, 5)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Wasp26.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Wasp26();
        return proto.yt.Wasp26.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Wasp26.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = t.readInt32();
              e.setF2(r);
              break;
            case 5:
              r = t.readInt32();
              e.setF5(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Wasp26.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Wasp26.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Wasp26.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 2)) && t.writeInt32(2, r),
          null != (r = o.Message.getField(e, 5)) && t.writeInt32(5, r);
      }),
      (proto.yt.Wasp26.prototype.getF2 = function () {
        return o.Message.getFieldWithDefault(this, 2, 0);
      }),
      (proto.yt.Wasp26.prototype.setF2 = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.Wasp26.prototype.clearF2 = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.Wasp26.prototype.hasF2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Wasp26.prototype.getF5 = function () {
        return o.Message.getFieldWithDefault(this, 5, 0);
      }),
      (proto.yt.Wasp26.prototype.setF5 = function (e) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.Wasp26.prototype.clearF5 = function () {
        return o.Message.setField(this, 5, void 0);
      }),
      (proto.yt.Wasp26.prototype.hasF5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.BrowseRequest.prototype.toObject = function (e) {
          return proto.yt.BrowseRequest.toObject(e, this);
        }),
        (proto.yt.BrowseRequest.toObject = function (e, t) {
          var r,
            i = {
              b1: (r = t.getB1()) && proto.yt.B1.toObject(e, r),
              channelId: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              field3: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
              continuationToken:
                null == (r = o.Message.getField(t, 7)) ? void 0 : r,
              wasp26: (r = t.getWasp26()) && proto.yt.Wasp26.toObject(e, r),
              f29: null == (r = o.Message.getField(t, 29)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.BrowseRequest.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.BrowseRequest();
        return proto.yt.BrowseRequest.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.BrowseRequest.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.B1();
              t.readMessage(r, proto.yt.B1.deserializeBinaryFromReader),
                e.setB1(r);
              break;
            case 2:
              r = t.readString();
              e.setChannelId(r);
              break;
            case 3:
              r = t.readString();
              e.setField3(r);
              break;
            case 7:
              r = t.readString();
              e.setContinuationToken(r);
              break;
            case 26:
              r = new proto.yt.Wasp26();
              t.readMessage(r, proto.yt.Wasp26.deserializeBinaryFromReader),
                e.setWasp26(r);
              break;
            case 29:
              r = t.readInt32();
              e.setF29(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.BrowseRequest.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.BrowseRequest.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.BrowseRequest.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getB1()) &&
          t.writeMessage(1, r, proto.yt.B1.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 3)) && t.writeString(3, r),
          null != (r = o.Message.getField(e, 7)) && t.writeString(7, r),
          null != (r = e.getWasp26()) &&
            t.writeMessage(26, r, proto.yt.Wasp26.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 29)) && t.writeInt32(29, r);
      }),
      (proto.yt.BrowseRequest.prototype.getB1 = function () {
        return o.Message.getWrapperField(this, proto.yt.B1, 1);
      }),
      (proto.yt.BrowseRequest.prototype.setB1 = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.BrowseRequest.prototype.clearB1 = function () {
        return this.setB1(void 0);
      }),
      (proto.yt.BrowseRequest.prototype.hasB1 = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.BrowseRequest.prototype.getChannelId = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.BrowseRequest.prototype.setChannelId = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.BrowseRequest.prototype.clearChannelId = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.BrowseRequest.prototype.hasChannelId = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.BrowseRequest.prototype.getField3 = function () {
        return o.Message.getFieldWithDefault(this, 3, '');
      }),
      (proto.yt.BrowseRequest.prototype.setField3 = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.BrowseRequest.prototype.clearField3 = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.BrowseRequest.prototype.hasField3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      (proto.yt.BrowseRequest.prototype.getContinuationToken = function () {
        return o.Message.getFieldWithDefault(this, 7, '');
      }),
      (proto.yt.BrowseRequest.prototype.setContinuationToken = function (e) {
        return o.Message.setField(this, 7, e);
      }),
      (proto.yt.BrowseRequest.prototype.clearContinuationToken = function () {
        return o.Message.setField(this, 7, void 0);
      }),
      (proto.yt.BrowseRequest.prototype.hasContinuationToken = function () {
        return null != o.Message.getField(this, 7);
      }),
      (proto.yt.BrowseRequest.prototype.getWasp26 = function () {
        return o.Message.getWrapperField(this, proto.yt.Wasp26, 26);
      }),
      (proto.yt.BrowseRequest.prototype.setWasp26 = function (e) {
        return o.Message.setWrapperField(this, 26, e);
      }),
      (proto.yt.BrowseRequest.prototype.clearWasp26 = function () {
        return this.setWasp26(void 0);
      }),
      (proto.yt.BrowseRequest.prototype.hasWasp26 = function () {
        return null != o.Message.getField(this, 26);
      }),
      (proto.yt.BrowseRequest.prototype.getF29 = function () {
        return o.Message.getFieldWithDefault(this, 29, 0);
      }),
      (proto.yt.BrowseRequest.prototype.setF29 = function (e) {
        return o.Message.setField(this, 29, e);
      }),
      (proto.yt.BrowseRequest.prototype.clearF29 = function () {
        return o.Message.setField(this, 29, void 0);
      }),
      (proto.yt.BrowseRequest.prototype.hasF29 = function () {
        return null != o.Message.getField(this, 29);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.C26.prototype.toObject = function (e) {
          return proto.yt.C26.toObject(e, this);
        }),
        (proto.yt.C26.toObject = function (e, t) {
          var r,
            i = {
              n2: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              n5: null == (r = o.Message.getField(t, 5)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.C26.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.C26();
        return proto.yt.C26.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.C26.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = t.readInt32();
              e.setN2(r);
              break;
            case 5:
              r = t.readInt32();
              e.setN5(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.C26.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.C26.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.C26.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 2)) && t.writeInt32(2, r),
          null != (r = o.Message.getField(e, 5)) && t.writeInt32(5, r);
      }),
      (proto.yt.C26.prototype.getN2 = function () {
        return o.Message.getFieldWithDefault(this, 2, 0);
      }),
      (proto.yt.C26.prototype.setN2 = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.C26.prototype.clearN2 = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.C26.prototype.hasN2 = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.C26.prototype.getN5 = function () {
        return o.Message.getFieldWithDefault(this, 5, 0);
      }),
      (proto.yt.C26.prototype.setN5 = function (e) {
        return o.Message.setField(this, 5, e);
      }),
      (proto.yt.C26.prototype.clearN5 = function () {
        return o.Message.setField(this, 5, void 0);
      }),
      (proto.yt.C26.prototype.hasN5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Tk802.prototype.toObject = function (e) {
          return proto.yt.Tk802.toObject(e, this);
        }),
        (proto.yt.Tk802.toObject = function (e, t) {
          var r,
            i = {
              channelId: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              s3: null == (r = o.Message.getField(t, 3)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.Tk802.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Tk802();
        return proto.yt.Tk802.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Tk802.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = t.readString();
              e.setChannelId(r);
              break;
            case 3:
              r = t.readString();
              e.setS3(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Tk802.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Tk802.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Tk802.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = o.Message.getField(e, 3)) && t.writeString(3, r);
      }),
      (proto.yt.Tk802.prototype.getChannelId = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.Tk802.prototype.setChannelId = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.Tk802.prototype.clearChannelId = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.Tk802.prototype.hasChannelId = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.Tk802.prototype.getS3 = function () {
        return o.Message.getFieldWithDefault(this, 3, '');
      }),
      (proto.yt.Tk802.prototype.setS3 = function (e) {
        return o.Message.setField(this, 3, e);
      }),
      (proto.yt.Tk802.prototype.clearS3 = function () {
        return o.Message.setField(this, 3, void 0);
      }),
      (proto.yt.Tk802.prototype.hasS3 = function () {
        return null != o.Message.getField(this, 3);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Token.prototype.toObject = function (e) {
          return proto.yt.Token.toObject(e, this);
        }),
        (proto.yt.Token.toObject = function (e, t) {
          var r,
            o = { tk802: (r = t.getTk802()) && proto.yt.Tk802.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Token.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Token();
        return proto.yt.Token.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Token.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 80226972:
              var r = new proto.yt.Tk802();
              t.readMessage(r, proto.yt.Tk802.deserializeBinaryFromReader),
                e.setTk802(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Token.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Token.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Token.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getTk802()) &&
          t.writeMessage(80226972, r, proto.yt.Tk802.serializeBinaryToWriter);
      }),
      (proto.yt.Token.prototype.getTk802 = function () {
        return o.Message.getWrapperField(this, proto.yt.Tk802, 80226972);
      }),
      (proto.yt.Token.prototype.setTk802 = function (e) {
        return o.Message.setWrapperField(this, 80226972, e);
      }),
      (proto.yt.Token.prototype.clearTk802 = function () {
        return this.setTk802(void 0);
      }),
      (proto.yt.Token.prototype.hasTk802 = function () {
        return null != o.Message.getField(this, 80226972);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.C4.prototype.toObject = function (e) {
          return proto.yt.C4.toObject(e, this);
        }),
        (proto.yt.C4.toObject = function (e, t) {
          var r,
            o = { s49: (r = t.getS49()) && proto.yt.S49.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.C4.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.C4();
        return proto.yt.C4.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.C4.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 49399797:
              var r = new proto.yt.S49();
              t.readMessage(r, proto.yt.S49.deserializeBinaryFromReader),
                e.setS49(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.C4.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.C4.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.C4.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getS49()) &&
          t.writeMessage(49399797, r, proto.yt.S49.serializeBinaryToWriter);
      }),
      (proto.yt.C4.prototype.getS49 = function () {
        return o.Message.getWrapperField(this, proto.yt.S49, 49399797);
      }),
      (proto.yt.C4.prototype.setS49 = function (e) {
        return o.Message.setWrapperField(this, 49399797, e);
      }),
      (proto.yt.C4.prototype.clearS49 = function () {
        return this.setS49(void 0);
      }),
      (proto.yt.C4.prototype.hasS49 = function () {
        return null != o.Message.getField(this, 49399797);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.C58174.prototype.toObject = function (e) {
          return proto.yt.C58174.toObject(e, this);
        }),
        (proto.yt.C58174.toObject = function (e, t) {
          var r,
            i = {
              tab: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
              c4: (r = t.getC4()) && proto.yt.C4.toObject(e, r),
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.C58174.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.C58174();
        return proto.yt.C58174.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.C58174.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 2:
              var r = t.readString();
              e.setTab(r);
              break;
            case 4:
              r = new proto.yt.C4();
              t.readMessage(r, proto.yt.C4.deserializeBinaryFromReader),
                e.setC4(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.C58174.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.C58174.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.C58174.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = o.Message.getField(e, 2)) && t.writeString(2, r),
          null != (r = e.getC4()) &&
            t.writeMessage(4, r, proto.yt.C4.serializeBinaryToWriter);
      }),
      (proto.yt.C58174.prototype.getTab = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.C58174.prototype.setTab = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.C58174.prototype.clearTab = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.C58174.prototype.hasTab = function () {
        return null != o.Message.getField(this, 2);
      }),
      (proto.yt.C58174.prototype.getC4 = function () {
        return o.Message.getWrapperField(this, proto.yt.C4, 4);
      }),
      (proto.yt.C58174.prototype.setC4 = function (e) {
        return o.Message.setWrapperField(this, 4, e);
      }),
      (proto.yt.C58174.prototype.clearC4 = function () {
        return this.setC4(void 0);
      }),
      (proto.yt.C58174.prototype.hasC4 = function () {
        return null != o.Message.getField(this, 4);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.G1.prototype.toObject = function (e) {
          return proto.yt.G1.toObject(e, this);
        }),
        (proto.yt.G1.toObject = function (e, t) {
          var r,
            o = {
              c58174: (r = t.getC58174()) && proto.yt.C58174.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.G1.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.G1();
        return proto.yt.G1.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.G1.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 58174010:
              var r = new proto.yt.C58174();
              t.readMessage(r, proto.yt.C58174.deserializeBinaryFromReader),
                e.setC58174(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.G1.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.G1.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.G1.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getC58174()) &&
          t.writeMessage(58174010, r, proto.yt.C58174.serializeBinaryToWriter);
      }),
      (proto.yt.G1.prototype.getC58174 = function () {
        return o.Message.getWrapperField(this, proto.yt.C58174, 58174010);
      }),
      (proto.yt.G1.prototype.setC58174 = function (e) {
        return o.Message.setWrapperField(this, 58174010, e);
      }),
      (proto.yt.G1.prototype.clearC58174 = function () {
        return this.setC58174(void 0);
      }),
      (proto.yt.G1.prototype.hasC58174 = function () {
        return null != o.Message.getField(this, 58174010);
      }),
      (proto.yt.C58173.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.C58173.prototype.toObject = function (e) {
          return proto.yt.C58173.toObject(e, this);
        }),
        (proto.yt.C58173.toObject = function (e, t) {
          var r = {
            g1List: o.Message.toObjectList(
              t.getG1List(),
              proto.yt.G1.toObject,
              e
            ),
          };
          return e && (r.$jspbMessageInstance = t), r;
        })),
      (proto.yt.C58173.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.C58173();
        return proto.yt.C58173.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.C58173.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.G1();
              t.readMessage(r, proto.yt.G1.deserializeBinaryFromReader),
                e.addG1(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.C58173.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.C58173.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.C58173.serializeBinaryToWriter = function (e, t) {
        var r;
        (r = e.getG1List()).length > 0 &&
          t.writeRepeatedMessage(1, r, proto.yt.G1.serializeBinaryToWriter);
      }),
      (proto.yt.C58173.prototype.getG1List = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.G1, 1);
      }),
      (proto.yt.C58173.prototype.setG1List = function (e) {
        return o.Message.setRepeatedWrapperField(this, 1, e);
      }),
      (proto.yt.C58173.prototype.addG1 = function (e, t) {
        return o.Message.addToRepeatedWrapperField(this, 1, e, proto.yt.G1, t);
      }),
      (proto.yt.C58173.prototype.clearG1List = function () {
        return this.setG1List([]);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.B9.prototype.toObject = function (e) {
          return proto.yt.B9.toObject(e, this);
        }),
        (proto.yt.B9.toObject = function (e, t) {
          var r,
            o = {
              c58173: (r = t.getC58173()) && proto.yt.C58173.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.B9.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.B9();
        return proto.yt.B9.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.B9.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 58173949:
              var r = new proto.yt.C58173();
              t.readMessage(r, proto.yt.C58173.deserializeBinaryFromReader),
                e.setC58173(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.B9.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.B9.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.B9.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getC58173()) &&
          t.writeMessage(58173949, r, proto.yt.C58173.serializeBinaryToWriter);
      }),
      (proto.yt.B9.prototype.getC58173 = function () {
        return o.Message.getWrapperField(this, proto.yt.C58173, 58173949);
      }),
      (proto.yt.B9.prototype.setC58173 = function (e) {
        return o.Message.setWrapperField(this, 58173949, e);
      }),
      (proto.yt.B9.prototype.clearC58173 = function () {
        return this.setC58173(void 0);
      }),
      (proto.yt.B9.prototype.hasC58173 = function () {
        return null != o.Message.getField(this, 58173949);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.C518.prototype.toObject = function (e) {
          return proto.yt.C518.toObject(e, this);
        }),
        (proto.yt.C518.toObject = function (e, t) {
          var r,
            o = {
              collie5: (r = t.getCollie5()) && proto.yt.Collie5.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.C518.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.C518();
        return proto.yt.C518.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.C518.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 5:
              var r = new proto.yt.Collie5();
              t.readMessage(r, proto.yt.Collie5.deserializeBinaryFromReader),
                e.setCollie5(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.C518.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.C518.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.C518.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getCollie5()) &&
          t.writeMessage(5, r, proto.yt.Collie5.serializeBinaryToWriter);
      }),
      (proto.yt.C518.prototype.getCollie5 = function () {
        return o.Message.getWrapperField(this, proto.yt.Collie5, 5);
      }),
      (proto.yt.C518.prototype.setCollie5 = function (e) {
        return o.Message.setWrapperField(this, 5, e);
      }),
      (proto.yt.C518.prototype.clearCollie5 = function () {
        return this.setCollie5(void 0);
      }),
      (proto.yt.C518.prototype.hasCollie5 = function () {
        return null != o.Message.getField(this, 5);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.Collie5.prototype.toObject = function (e) {
          return proto.yt.Collie5.toObject(e, this);
        }),
        (proto.yt.Collie5.toObject = function (e, t) {
          var r,
            o = {
              hawk514: (r = t.getHawk514()) && proto.yt.Hawk514.toObject(e, r),
              c579: (r = t.getC579()) && proto.yt.C579.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.Collie5.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.Collie5();
        return proto.yt.Collie5.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.Collie5.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 51431404:
              var r = new proto.yt.Hawk514();
              t.readMessage(r, proto.yt.Hawk514.deserializeBinaryFromReader),
                e.setHawk514(r);
              break;
            case 57988071:
              r = new proto.yt.C579();
              t.readMessage(r, proto.yt.C579.deserializeBinaryFromReader),
                e.setC579(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.Collie5.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.Collie5.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.Collie5.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getHawk514()) &&
          t.writeMessage(51431404, r, proto.yt.Hawk514.serializeBinaryToWriter),
          null != (r = e.getC579()) &&
            t.writeMessage(57988071, r, proto.yt.C579.serializeBinaryToWriter);
      }),
      (proto.yt.Collie5.prototype.getHawk514 = function () {
        return o.Message.getWrapperField(this, proto.yt.Hawk514, 51431404);
      }),
      (proto.yt.Collie5.prototype.setHawk514 = function (e) {
        return o.Message.setWrapperField(this, 51431404, e);
      }),
      (proto.yt.Collie5.prototype.clearHawk514 = function () {
        return this.setHawk514(void 0);
      });
    (proto.yt.Collie5.prototype.hasHawk514 = function () {
      return null != o.Message.getField(this, 51431404);
    }),
      (proto.yt.Collie5.prototype.getC579 = function () {
        return o.Message.getWrapperField(this, proto.yt.C579, 57988071);
      }),
      (proto.yt.Collie5.prototype.setC579 = function (e) {
        return o.Message.setWrapperField(this, 57988071, e);
      }),
      (proto.yt.Collie5.prototype.clearC579 = function () {
        return this.setC579(void 0);
      }),
      (proto.yt.Collie5.prototype.hasC579 = function () {
        return null != o.Message.getField(this, 57988071);
      }),
      (proto.yt.C579.repeatedFields_ = [1]),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.C579.prototype.toObject = function (e) {
          return proto.yt.C579.toObject(e, this);
        }),
        (proto.yt.C579.toObject = function (e, t) {
          var r = {
            resultList: o.Message.toObjectList(
              t.getResultList(),
              proto.yt.Result.toObject,
              e
            ),
          };
          return e && (r.$jspbMessageInstance = t), r;
        })),
      (proto.yt.C579.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.C579();
        return proto.yt.C579.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.C579.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Result();
              t.readMessage(r, proto.yt.Result.deserializeBinaryFromReader),
                e.addResult(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.C579.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.C579.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.C579.serializeBinaryToWriter = function (e, t) {
        var r;
        (r = e.getResultList()).length > 0 &&
          t.writeRepeatedMessage(1, r, proto.yt.Result.serializeBinaryToWriter);
      }),
      (proto.yt.C579.prototype.getResultList = function () {
        return o.Message.getRepeatedWrapperField(this, proto.yt.Result, 1);
      }),
      (proto.yt.C579.prototype.setResultList = function (e) {
        return o.Message.setRepeatedWrapperField(this, 1, e);
      }),
      (proto.yt.C579.prototype.addResult = function (e, t) {
        return o.Message.addToRepeatedWrapperField(
          this,
          1,
          e,
          proto.yt.Result,
          t
        );
      }),
      (proto.yt.C579.prototype.clearResultList = function () {
        return this.setResultList([]);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.C361.prototype.toObject = function (e) {
          return proto.yt.C361.toObject(e, this);
        }),
        (proto.yt.C361.toObject = function (e, t) {
          var r,
            i = {
              result: (r = t.getResult()) && proto.yt.Result.toObject(e, r),
              title: null == (r = o.Message.getField(t, 2)) ? void 0 : r,
            };
          return e && (i.$jspbMessageInstance = t), i;
        })),
      (proto.yt.C361.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.C361();
        return proto.yt.C361.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.C361.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 1:
              var r = new proto.yt.Result();
              t.readMessage(r, proto.yt.Result.deserializeBinaryFromReader),
                e.setResult(r);
              break;
            case 2:
              r = t.readString();
              e.setTitle(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.C361.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.C361.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.C361.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getResult()) &&
          t.writeMessage(1, r, proto.yt.Result.serializeBinaryToWriter),
          null != (r = o.Message.getField(e, 2)) && t.writeString(2, r);
      }),
      (proto.yt.C361.prototype.getResult = function () {
        return o.Message.getWrapperField(this, proto.yt.Result, 1);
      }),
      (proto.yt.C361.prototype.setResult = function (e) {
        return o.Message.setWrapperField(this, 1, e);
      }),
      (proto.yt.C361.prototype.clearResult = function () {
        return this.setResult(void 0);
      }),
      (proto.yt.C361.prototype.hasResult = function () {
        return null != o.Message.getField(this, 1);
      }),
      (proto.yt.C361.prototype.getTitle = function () {
        return o.Message.getFieldWithDefault(this, 2, '');
      }),
      (proto.yt.C361.prototype.setTitle = function (e) {
        return o.Message.setField(this, 2, e);
      }),
      (proto.yt.C361.prototype.clearTitle = function () {
        return o.Message.setField(this, 2, void 0);
      }),
      (proto.yt.C361.prototype.hasTitle = function () {
        return null != o.Message.getField(this, 2);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.B13.prototype.toObject = function (e) {
          return proto.yt.B13.toObject(e, this);
        }),
        (proto.yt.B13.toObject = function (e, t) {
          var r,
            o = { c361: (r = t.getC361()) && proto.yt.C361.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.B13.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.B13();
        return proto.yt.B13.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.B13.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 361905772:
              var r = new proto.yt.C361();
              t.readMessage(r, proto.yt.C361.deserializeBinaryFromReader),
                e.setC361(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.B13.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.B13.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.B13.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getC361()) &&
          t.writeMessage(361905772, r, proto.yt.C361.serializeBinaryToWriter);
      }),
      (proto.yt.B13.prototype.getC361 = function () {
        return o.Message.getWrapperField(this, proto.yt.C361, 361905772);
      }),
      (proto.yt.B13.prototype.setC361 = function (e) {
        return o.Message.setWrapperField(this, 361905772, e);
      }),
      (proto.yt.B13.prototype.clearC361 = function () {
        return this.setC361(void 0);
      }),
      (proto.yt.B13.prototype.hasC361 = function () {
        return null != o.Message.getField(this, 361905772);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.ChannelResponse.prototype.toObject = function (e) {
          return proto.yt.ChannelResponse.toObject(e, this);
        }),
        (proto.yt.ChannelResponse.toObject = function (e, t) {
          var r,
            o = {
              b9: (r = t.getB9()) && proto.yt.B9.toObject(e, r),
              b13: (r = t.getB13()) && proto.yt.B13.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.ChannelResponse.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.ChannelResponse();
        return proto.yt.ChannelResponse.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.ChannelResponse.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 9:
              var r = new proto.yt.B9();
              t.readMessage(r, proto.yt.B9.deserializeBinaryFromReader),
                e.setB9(r);
              break;
            case 13:
              r = new proto.yt.B13();
              t.readMessage(r, proto.yt.B13.deserializeBinaryFromReader),
                e.setB13(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.ChannelResponse.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.ChannelResponse.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.ChannelResponse.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getB9()) &&
          t.writeMessage(9, r, proto.yt.B9.serializeBinaryToWriter),
          null != (r = e.getB13()) &&
            t.writeMessage(13, r, proto.yt.B13.serializeBinaryToWriter);
      }),
      (proto.yt.ChannelResponse.prototype.getB9 = function () {
        return o.Message.getWrapperField(this, proto.yt.B9, 9);
      }),
      (proto.yt.ChannelResponse.prototype.setB9 = function (e) {
        return o.Message.setWrapperField(this, 9, e);
      }),
      (proto.yt.ChannelResponse.prototype.clearB9 = function () {
        return this.setB9(void 0);
      }),
      (proto.yt.ChannelResponse.prototype.hasB9 = function () {
        return null != o.Message.getField(this, 9);
      }),
      (proto.yt.ChannelResponse.prototype.getB13 = function () {
        return o.Message.getWrapperField(this, proto.yt.B13, 13);
      }),
      (proto.yt.ChannelResponse.prototype.setB13 = function (e) {
        return o.Message.setWrapperField(this, 13, e);
      }),
      (proto.yt.ChannelResponse.prototype.clearB13 = function () {
        return this.setB13(void 0);
      }),
      (proto.yt.ChannelResponse.prototype.hasB13 = function () {
        return null != o.Message.getField(this, 13);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.B10.prototype.toObject = function (e) {
          return proto.yt.B10.toObject(e, this);
        }),
        (proto.yt.B10.toObject = function (e, t) {
          var r,
            o = {
              s49: (r = t.getS49()) && proto.yt.S49.toObject(e, r),
              s501: (r = t.getS501()) && proto.yt.S501.toObject(e, r),
              s54681060:
                (r = t.getS54681060()) && proto.yt.S54681060.toObject(e, r),
            };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.B10.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.B10();
        return proto.yt.B10.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.B10.deserializeBinaryFromReader = function (e, t) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 49399797:
              var r = new proto.yt.S49();
              t.readMessage(r, proto.yt.S49.deserializeBinaryFromReader),
                e.setS49(r);
              break;
            case 50195462:
              r = new proto.yt.S501();
              t.readMessage(r, proto.yt.S501.deserializeBinaryFromReader),
                e.setS501(r);
              break;
            case 54681060:
              r = new proto.yt.S54681060();
              t.readMessage(r, proto.yt.S54681060.deserializeBinaryFromReader),
                e.setS54681060(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.B10.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.B10.serializeBinaryToWriter(this, e), e.getResultBuffer()
        );
      }),
      (proto.yt.B10.serializeBinaryToWriter = function (e, t) {
        var r = void 0;
        null != (r = e.getS49()) &&
          t.writeMessage(49399797, r, proto.yt.S49.serializeBinaryToWriter),
          null != (r = e.getS501()) &&
            t.writeMessage(50195462, r, proto.yt.S501.serializeBinaryToWriter),
          null != (r = e.getS54681060()) &&
            t.writeMessage(
              54681060,
              r,
              proto.yt.S54681060.serializeBinaryToWriter
            );
      }),
      (proto.yt.B10.prototype.getS49 = function () {
        return o.Message.getWrapperField(this, proto.yt.S49, 49399797);
      }),
      (proto.yt.B10.prototype.setS49 = function (e) {
        return o.Message.setWrapperField(this, 49399797, e);
      }),
      (proto.yt.B10.prototype.clearS49 = function () {
        return this.setS49(void 0);
      }),
      (proto.yt.B10.prototype.hasS49 = function () {
        return null != o.Message.getField(this, 49399797);
      }),
      (proto.yt.B10.prototype.getS501 = function () {
        return o.Message.getWrapperField(this, proto.yt.S501, 50195462);
      }),
      (proto.yt.B10.prototype.setS501 = function (e) {
        return o.Message.setWrapperField(this, 50195462, e);
      }),
      (proto.yt.B10.prototype.clearS501 = function () {
        return this.setS501(void 0);
      }),
      (proto.yt.B10.prototype.hasS501 = function () {
        return null != o.Message.getField(this, 50195462);
      }),
      (proto.yt.B10.prototype.getS54681060 = function () {
        return o.Message.getWrapperField(this, proto.yt.S54681060, 54681060);
      }),
      (proto.yt.B10.prototype.setS54681060 = function (e) {
        return o.Message.setWrapperField(this, 54681060, e);
      }),
      (proto.yt.B10.prototype.clearS54681060 = function () {
        return this.setS54681060(void 0);
      }),
      (proto.yt.B10.prototype.hasS54681060 = function () {
        return null != o.Message.getField(this, 54681060);
      }),
      o.Message.GENERATE_TO_OBJECT &&
        ((proto.yt.ChannelTabResponse.prototype.toObject = function (e) {
          return proto.yt.ChannelTabResponse.toObject(e, this);
        }),
        (proto.yt.ChannelTabResponse.toObject = function (e, t) {
          var r,
            o = { b10: (r = t.getB10()) && proto.yt.B10.toObject(e, r) };
          return e && (o.$jspbMessageInstance = t), o;
        })),
      (proto.yt.ChannelTabResponse.deserializeBinary = function (e) {
        var t = new o.BinaryReader(e),
          r = new proto.yt.ChannelTabResponse();
        return proto.yt.ChannelTabResponse.deserializeBinaryFromReader(r, t);
      }),
      (proto.yt.ChannelTabResponse.deserializeBinaryFromReader = function (
        e,
        t
      ) {
        for (; t.nextField() && !t.isEndGroup(); ) {
          switch (t.getFieldNumber()) {
            case 10:
              var r = new proto.yt.B10();
              t.readMessage(r, proto.yt.B10.deserializeBinaryFromReader),
                e.setB10(r);
              break;
            default:
              t.skipField();
          }
        }
        return e;
      }),
      (proto.yt.ChannelTabResponse.prototype.serializeBinary = function () {
        var e = new o.BinaryWriter();
        return (
          proto.yt.ChannelTabResponse.serializeBinaryToWriter(this, e),
          e.getResultBuffer()
        );
      }),
      (proto.yt.ChannelTabResponse.serializeBinaryToWriter = function (e, t) {
        var r;
        null != (r = e.getB10()) &&
          t.writeMessage(10, r, proto.yt.B10.serializeBinaryToWriter);
      }),
      (proto.yt.ChannelTabResponse.prototype.getB10 = function () {
        return o.Message.getWrapperField(this, proto.yt.B10, 10);
      }),
      (proto.yt.ChannelTabResponse.prototype.setB10 = function (e) {
        return o.Message.setWrapperField(this, 10, e);
      }),
      (proto.yt.ChannelTabResponse.prototype.clearB10 = function () {
        return this.setB10(void 0);
      }),
      (proto.yt.ChannelTabResponse.prototype.hasB10 = function () {
        return null != o.Message.getField(this, 10);
      }),
      (proto.yt.ZeroEnum = { ZERO: 0 }),
      i.object.extend(t, proto.yt);
  },
  function (module, exports, __webpack_require__) {
    (function (global, Buffer) {
      var $jscomp = $jscomp || {};
      ($jscomp.scope = {}),
        ($jscomp.findInternal = function (e, t, r) {
          e instanceof String && (e = String(e));
          for (var o = e.length, i = 0; i < o; i++) {
            var n = e[i];
            if (t.call(r, n, i, e)) return { i: i, v: n };
          }
          return { i: -1, v: void 0 };
        }),
        ($jscomp.ASSUME_ES5 = !1),
        ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
        ($jscomp.ASSUME_NO_NATIVE_SET = !1),
        ($jscomp.SIMPLE_FROUND_POLYFILL = !1),
        ($jscomp.defineProperty =
          $jscomp.ASSUME_ES5 || 'function' == typeof Object.defineProperties
            ? Object.defineProperty
            : function (e, t, r) {
                e != Array.prototype &&
                  e != Object.prototype &&
                  (e[t] = r.value);
              }),
        ($jscomp.getGlobal = function (e) {
          return 'undefined' != typeof window && window === e
            ? e
            : void 0 !== global && null != global
            ? global
            : e;
        }),
        ($jscomp.global = $jscomp.getGlobal(this)),
        ($jscomp.polyfill = function (e, t, r, o) {
          if (t) {
            for (
              r = $jscomp.global, e = e.split('.'), o = 0;
              o < e.length - 1;
              o++
            ) {
              var i = e[o];
              i in r || (r[i] = {}), (r = r[i]);
            }
            (t = t((o = r[(e = e[e.length - 1])]))) != o &&
              null != t &&
              $jscomp.defineProperty(r, e, {
                configurable: !0,
                writable: !0,
                value: t,
              });
          }
        }),
        $jscomp.polyfill(
          'Array.prototype.findIndex',
          function (e) {
            return (
              e ||
              function (e, t) {
                return $jscomp.findInternal(this, e, t).i;
              }
            );
          },
          'es6',
          'es3'
        ),
        ($jscomp.checkStringArgs = function (e, t, r) {
          if (null == e)
            throw new TypeError(
              "The 'this' value for String.prototype." +
                r +
                ' must not be null or undefined'
            );
          if (t instanceof RegExp)
            throw new TypeError(
              'First argument to String.prototype.' +
                r +
                ' must not be a regular expression'
            );
          return e + '';
        }),
        $jscomp.polyfill(
          'String.prototype.endsWith',
          function (e) {
            return (
              e ||
              function (e, t) {
                var r = $jscomp.checkStringArgs(this, e, 'endsWith');
                (e += ''),
                  void 0 === t && (t = r.length),
                  (t = Math.max(0, Math.min(0 | t, r.length)));
                for (var o = e.length; 0 < o && 0 < t; )
                  if (r[--t] != e[--o]) return !1;
                return 0 >= o;
              }
            );
          },
          'es6',
          'es3'
        ),
        $jscomp.polyfill(
          'Array.prototype.find',
          function (e) {
            return (
              e ||
              function (e, t) {
                return $jscomp.findInternal(this, e, t).v;
              }
            );
          },
          'es6',
          'es3'
        ),
        $jscomp.polyfill(
          'String.prototype.startsWith',
          function (e) {
            return (
              e ||
              function (e, t) {
                var r = $jscomp.checkStringArgs(this, e, 'startsWith');
                e += '';
                var o = r.length,
                  i = e.length;
                t = Math.max(0, Math.min(0 | t, r.length));
                for (var n = 0; n < i && t < o; )
                  if (r[t++] != e[n++]) return !1;
                return n >= i;
              }
            );
          },
          'es6',
          'es3'
        ),
        $jscomp.polyfill(
          'String.prototype.repeat',
          function (e) {
            return (
              e ||
              function (e) {
                var t = $jscomp.checkStringArgs(this, null, 'repeat');
                if (0 > e || 1342177279 < e)
                  throw new RangeError('Invalid count value');
                e |= 0;
                for (var r = ''; e; ) 1 & e && (r += t), (e >>>= 1) && (t += t);
                return r;
              }
            );
          },
          'es6',
          'es3'
        );
      var COMPILED = !0,
        goog = goog || {};
      (goog.global = this || self),
        (goog.isDef = function (e) {
          return void 0 !== e;
        }),
        (goog.isString = function (e) {
          return 'string' == typeof e;
        }),
        (goog.isBoolean = function (e) {
          return 'boolean' == typeof e;
        }),
        (goog.isNumber = function (e) {
          return 'number' == typeof e;
        }),
        (goog.exportPath_ = function (e, t, r) {
          (e = e.split('.')),
            (r = r || goog.global),
            e[0] in r || void 0 === r.execScript || r.execScript('var ' + e[0]);
          for (var o; e.length && (o = e.shift()); )
            !e.length && goog.isDef(t)
              ? (r[o] = t)
              : (r = r[o] && r[o] !== Object.prototype[o] ? r[o] : (r[o] = {}));
        }),
        (goog.define = function (e, t) {
          if (!COMPILED) {
            var r = goog.global.CLOSURE_UNCOMPILED_DEFINES,
              o = goog.global.CLOSURE_DEFINES;
            r &&
            void 0 === r.nodeType &&
            Object.prototype.hasOwnProperty.call(r, e)
              ? (t = r[e])
              : o &&
                void 0 === o.nodeType &&
                Object.prototype.hasOwnProperty.call(o, e) &&
                (t = o[e]);
          }
          return t;
        }),
        (goog.FEATURESET_YEAR = 2012),
        (goog.DEBUG = !0),
        (goog.LOCALE = 'en'),
        (goog.TRUSTED_SITE = !0),
        (goog.STRICT_MODE_COMPATIBLE = !1),
        (goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG),
        (goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1),
        (goog.provide = function (e) {
          if (goog.isInModuleLoader_())
            throw Error('goog.provide cannot be used within a module.');
          if (!COMPILED && goog.isProvided_(e))
            throw Error('Namespace "' + e + '" already declared.');
          goog.constructNamespace_(e);
        }),
        (goog.constructNamespace_ = function (e, t) {
          if (!COMPILED) {
            delete goog.implicitNamespaces_[e];
            for (
              var r = e;
              (r = r.substring(0, r.lastIndexOf('.'))) &&
              !goog.getObjectByName(r);

            )
              goog.implicitNamespaces_[r] = !0;
          }
          goog.exportPath_(e, t);
        }),
        (goog.getScriptNonce = function (e) {
          return e && e != goog.global
            ? goog.getScriptNonce_(e.document)
            : (null === goog.cspNonce_ &&
                (goog.cspNonce_ = goog.getScriptNonce_(goog.global.document)),
              goog.cspNonce_);
        }),
        (goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/),
        (goog.cspNonce_ = null),
        (goog.getScriptNonce_ = function (e) {
          return (e = e.querySelector && e.querySelector('script[nonce]')) &&
            (e = e.nonce || e.getAttribute('nonce')) &&
            goog.NONCE_PATTERN_.test(e)
            ? e
            : '';
        }),
        (goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/),
        (goog.module = function (e) {
          if (!goog.isString(e) || !e || -1 == e.search(goog.VALID_MODULE_RE_))
            throw Error('Invalid module identifier');
          if (!goog.isInGoogModuleLoader_())
            throw Error(
              'Module ' +
                e +
                " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide."
            );
          if (goog.moduleLoaderState_.moduleName)
            throw Error('goog.module may only be called once per module.');
          if (((goog.moduleLoaderState_.moduleName = e), !COMPILED)) {
            if (goog.isProvided_(e))
              throw Error('Namespace "' + e + '" already declared.');
            delete goog.implicitNamespaces_[e];
          }
        }),
        (goog.module.get = function (e) {
          return goog.module.getInternal_(e);
        }),
        (goog.module.getInternal_ = function (e) {
          if (!COMPILED) {
            if (e in goog.loadedModules_) return goog.loadedModules_[e].exports;
            if (!goog.implicitNamespaces_[e])
              return null != (e = goog.getObjectByName(e)) ? e : null;
          }
          return null;
        }),
        (goog.ModuleType = { ES6: 'es6', GOOG: 'goog' }),
        (goog.moduleLoaderState_ = null),
        (goog.isInModuleLoader_ = function () {
          return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
        }),
        (goog.isInGoogModuleLoader_ = function () {
          return (
            !!goog.moduleLoaderState_ &&
            goog.moduleLoaderState_.type == goog.ModuleType.GOOG
          );
        }),
        (goog.isInEs6ModuleLoader_ = function () {
          if (
            goog.moduleLoaderState_ &&
            goog.moduleLoaderState_.type == goog.ModuleType.ES6
          )
            return !0;
          var e = goog.global.$jscomp;
          return (
            !!e &&
            'function' == typeof e.getCurrentModulePath &&
            !!e.getCurrentModulePath()
          );
        }),
        (goog.module.declareLegacyNamespace = function () {
          if (!COMPILED && !goog.isInGoogModuleLoader_())
            throw Error(
              'goog.module.declareLegacyNamespace must be called from within a goog.module'
            );
          if (!COMPILED && !goog.moduleLoaderState_.moduleName)
            throw Error(
              'goog.module must be called prior to goog.module.declareLegacyNamespace.'
            );
          goog.moduleLoaderState_.declareLegacyNamespace = !0;
        }),
        (goog.declareModuleId = function (e) {
          if (!COMPILED) {
            if (!goog.isInEs6ModuleLoader_())
              throw Error(
                'goog.declareModuleId may only be called from within an ES6 module'
              );
            if (goog.moduleLoaderState_ && goog.moduleLoaderState_.moduleName)
              throw Error(
                'goog.declareModuleId may only be called once per module.'
              );
            if (e in goog.loadedModules_)
              throw Error('Module with namespace "' + e + '" already exists.');
          }
          if (goog.moduleLoaderState_) goog.moduleLoaderState_.moduleName = e;
          else {
            var t = goog.global.$jscomp;
            if (!t || 'function' != typeof t.getCurrentModulePath)
              throw Error(
                'Module with namespace "' + e + '" has been loaded incorrectly.'
              );
            (t = t.require(t.getCurrentModulePath())),
              (goog.loadedModules_[e] = {
                exports: t,
                type: goog.ModuleType.ES6,
                moduleId: e,
              });
          }
        }),
        (goog.setTestOnly = function (e) {
          if (goog.DISALLOW_TEST_ONLY_CODE)
            throw (
              ((e = e || ''),
              Error(
                'Importing test-only code into non-debug environment' +
                  (e ? ': ' + e : '.')
              ))
            );
        }),
        (goog.forwardDeclare = function (e) {}),
        COMPILED ||
          ((goog.isProvided_ = function (e) {
            return (
              e in goog.loadedModules_ ||
              (!goog.implicitNamespaces_[e] &&
                goog.isDefAndNotNull(goog.getObjectByName(e)))
            );
          }),
          (goog.implicitNamespaces_ = { 'goog.module': !0 })),
        (goog.getObjectByName = function (e, t) {
          (e = e.split('.')), (t = t || goog.global);
          for (var r = 0; r < e.length; r++)
            if (((t = t[e[r]]), !goog.isDefAndNotNull(t))) return null;
          return t;
        }),
        (goog.globalize = function (e, t) {
          for (var r in ((t = t || goog.global), e)) t[r] = e[r];
        }),
        (goog.addDependency = function (e, t, r, o) {
          !COMPILED &&
            goog.DEPENDENCIES_ENABLED &&
            goog.debugLoader_.addDependency(e, t, r, o);
        }),
        (goog.ENABLE_DEBUG_LOADER = !0),
        (goog.logToConsole_ = function (e) {
          goog.global.console && goog.global.console.error(e);
        }),
        (goog.require = function (e) {
          if (!COMPILED) {
            if (
              (goog.ENABLE_DEBUG_LOADER && goog.debugLoader_.requested(e),
              goog.isProvided_(e))
            ) {
              if (goog.isInModuleLoader_()) return goog.module.getInternal_(e);
            } else if (goog.ENABLE_DEBUG_LOADER) {
              var t = goog.moduleLoaderState_;
              goog.moduleLoaderState_ = null;
              try {
                goog.debugLoader_.load_(e);
              } finally {
                goog.moduleLoaderState_ = t;
              }
            }
            return null;
          }
        }),
        (goog.requireType = function (e) {
          return {};
        }),
        (goog.basePath = ''),
        (goog.nullFunction = function () {}),
        (goog.abstractMethod = function () {
          throw Error('unimplemented abstract method');
        }),
        (goog.addSingletonGetter = function (e) {
          (e.instance_ = void 0),
            (e.getInstance = function () {
              return e.instance_
                ? e.instance_
                : (goog.DEBUG &&
                    (goog.instantiatedSingletons_[
                      goog.instantiatedSingletons_.length
                    ] = e),
                  (e.instance_ = new e()));
            });
        }),
        (goog.instantiatedSingletons_ = []),
        (goog.LOAD_MODULE_USING_EVAL = !0),
        (goog.SEAL_MODULE_EXPORTS = goog.DEBUG),
        (goog.loadedModules_ = {}),
        (goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER),
        (goog.TRANSPILE = 'detect'),
        (goog.ASSUME_ES_MODULES_TRANSPILED = !1),
        (goog.TRANSPILE_TO_LANGUAGE = ''),
        (goog.TRANSPILER = 'transpile.js'),
        (goog.hasBadLetScoping = null),
        (goog.useSafari10Workaround = function () {
          if (null == goog.hasBadLetScoping) {
            try {
              var a = !eval(
                '"use strict";let x = 1; function f() { return typeof x; };f() == "number";'
              );
            } catch (e) {
              a = !1;
            }
            goog.hasBadLetScoping = a;
          }
          return goog.hasBadLetScoping;
        }),
        (goog.workaroundSafari10EvalBug = function (e) {
          return '(function(){' + e + '\n;})();\n';
        }),
        (goog.loadModule = function (e) {
          var t = goog.moduleLoaderState_;
          try {
            if (
              ((goog.moduleLoaderState_ = {
                moduleName: '',
                declareLegacyNamespace: !1,
                type: goog.ModuleType.GOOG,
              }),
              goog.isFunction(e))
            )
              var r = e.call(void 0, {});
            else {
              if (!goog.isString(e)) throw Error('Invalid module definition');
              goog.useSafari10Workaround() &&
                (e = goog.workaroundSafari10EvalBug(e)),
                (r = goog.loadModuleFromSource_.call(void 0, e));
            }
            var o = goog.moduleLoaderState_.moduleName;
            if (!goog.isString(o) || !o)
              throw Error('Invalid module name "' + o + '"');
            goog.moduleLoaderState_.declareLegacyNamespace
              ? goog.constructNamespace_(o, r)
              : goog.SEAL_MODULE_EXPORTS &&
                Object.seal &&
                'object' == typeof r &&
                null != r &&
                Object.seal(r),
              (goog.loadedModules_[o] = {
                exports: r,
                type: goog.ModuleType.GOOG,
                moduleId: goog.moduleLoaderState_.moduleName,
              });
          } finally {
            goog.moduleLoaderState_ = t;
          }
        }),
        (goog.loadModuleFromSource_ = function (a) {
          return eval(a), {};
        }),
        (goog.normalizePath_ = function (e) {
          e = e.split('/');
          for (var t = 0; t < e.length; )
            '.' == e[t]
              ? e.splice(t, 1)
              : t && '..' == e[t] && e[t - 1] && '..' != e[t - 1]
              ? e.splice(--t, 2)
              : t++;
          return e.join('/');
        }),
        (goog.loadFileSync_ = function (e) {
          if (goog.global.CLOSURE_LOAD_FILE_SYNC)
            return goog.global.CLOSURE_LOAD_FILE_SYNC(e);
          try {
            var t = new goog.global.XMLHttpRequest();
            return (
              t.open('get', e, !1),
              t.send(),
              0 == t.status || 200 == t.status ? t.responseText : null
            );
          } catch (e) {
            return null;
          }
        }),
        (goog.transpile_ = function (e, t, r) {
          var o = goog.global.$jscomp;
          o || (goog.global.$jscomp = o = {});
          var i = o.transpile;
          if (!i) {
            var n = goog.basePath + goog.TRANSPILER,
              s = goog.loadFileSync_(n);
            if (s) {
              if (
                (function () {
                  (0, eval)(s + '\n//# sourceURL=' + n);
                }.call(goog.global),
                goog.global.$gwtExport &&
                  goog.global.$gwtExport.$jscomp &&
                  !goog.global.$gwtExport.$jscomp.transpile)
              )
                throw Error(
                  'The transpiler did not properly export the "transpile" method. $gwtExport: ' +
                    JSON.stringify(goog.global.$gwtExport)
                );
              (goog.global.$jscomp.transpile =
                goog.global.$gwtExport.$jscomp.transpile),
                (i = (o = goog.global.$jscomp).transpile);
            }
          }
          return (
            i ||
              (i = o.transpile =
                function (e, t) {
                  return (
                    goog.logToConsole_(
                      t + ' requires transpilation but no transpiler was found.'
                    ),
                    e
                  );
                }),
            i(e, t, r)
          );
        }),
        (goog.typeOf = function (e) {
          var t = typeof e;
          if ('object' == t) {
            if (!e) return 'null';
            if (e instanceof Array) return 'array';
            if (e instanceof Object) return t;
            var r = Object.prototype.toString.call(e);
            if ('[object Window]' == r) return 'object';
            if (
              '[object Array]' == r ||
              ('number' == typeof e.length &&
                void 0 !== e.splice &&
                void 0 !== e.propertyIsEnumerable &&
                !e.propertyIsEnumerable('splice'))
            )
              return 'array';
            if (
              '[object Function]' == r ||
              (void 0 !== e.call &&
                void 0 !== e.propertyIsEnumerable &&
                !e.propertyIsEnumerable('call'))
            )
              return 'function';
          } else if ('function' == t && void 0 === e.call) return 'object';
          return t;
        }),
        (goog.isNull = function (e) {
          return null === e;
        }),
        (goog.isDefAndNotNull = function (e) {
          return null != e;
        }),
        (goog.isArray = function (e) {
          return 'array' == goog.typeOf(e);
        }),
        (goog.isArrayLike = function (e) {
          var t = goog.typeOf(e);
          return 'array' == t || ('object' == t && 'number' == typeof e.length);
        }),
        (goog.isDateLike = function (e) {
          return goog.isObject(e) && 'function' == typeof e.getFullYear;
        }),
        (goog.isFunction = function (e) {
          return 'function' == goog.typeOf(e);
        }),
        (goog.isObject = function (e) {
          var t = typeof e;
          return ('object' == t && null != e) || 'function' == t;
        }),
        (goog.getUid = function (e) {
          return (
            e[goog.UID_PROPERTY_] ||
            (e[goog.UID_PROPERTY_] = ++goog.uidCounter_)
          );
        }),
        (goog.hasUid = function (e) {
          return !!e[goog.UID_PROPERTY_];
        }),
        (goog.removeUid = function (e) {
          null !== e &&
            'removeAttribute' in e &&
            e.removeAttribute(goog.UID_PROPERTY_);
          try {
            delete e[goog.UID_PROPERTY_];
          } catch (e) {}
        }),
        (goog.UID_PROPERTY_ = 'closure_uid_' + ((1e9 * Math.random()) >>> 0)),
        (goog.uidCounter_ = 0),
        (goog.getHashCode = goog.getUid),
        (goog.removeHashCode = goog.removeUid),
        (goog.cloneObject = function (e) {
          var t = goog.typeOf(e);
          if ('object' == t || 'array' == t) {
            if ('function' == typeof e.clone) return e.clone();
            for (var r in ((t = 'array' == t ? [] : {}), e))
              t[r] = goog.cloneObject(e[r]);
            return t;
          }
          return e;
        }),
        (goog.bindNative_ = function (e, t, r) {
          return e.call.apply(e.bind, arguments);
        }),
        (goog.bindJs_ = function (e, t, r) {
          if (!e) throw Error();
          if (2 < arguments.length) {
            var o = Array.prototype.slice.call(arguments, 2);
            return function () {
              var r = Array.prototype.slice.call(arguments);
              return Array.prototype.unshift.apply(r, o), e.apply(t, r);
            };
          }
          return function () {
            return e.apply(t, arguments);
          };
        }),
        (goog.bind = function (e, t, r) {
          return (
            Function.prototype.bind &&
            -1 != Function.prototype.bind.toString().indexOf('native code')
              ? (goog.bind = goog.bindNative_)
              : (goog.bind = goog.bindJs_),
            goog.bind.apply(null, arguments)
          );
        }),
        (goog.partial = function (e, t) {
          var r = Array.prototype.slice.call(arguments, 1);
          return function () {
            var t = r.slice();
            return t.push.apply(t, arguments), e.apply(this, t);
          };
        }),
        (goog.mixin = function (e, t) {
          for (var r in t) e[r] = t[r];
        }),
        (goog.now =
          (goog.TRUSTED_SITE && Date.now) ||
          function () {
            return +new Date();
          }),
        (goog.globalEval = function (e) {
          if (goog.global.execScript) goog.global.execScript(e, 'JavaScript');
          else {
            if (!goog.global.eval) throw Error('goog.globalEval not available');
            if (null == goog.evalWorksForGlobals_) {
              try {
                goog.global.eval('var _evalTest_ = 1;');
              } catch (e) {}
              if (void 0 !== goog.global._evalTest_) {
                try {
                  delete goog.global._evalTest_;
                } catch (e) {}
                goog.evalWorksForGlobals_ = !0;
              } else goog.evalWorksForGlobals_ = !1;
            }
            if (goog.evalWorksForGlobals_) goog.global.eval(e);
            else {
              var t = goog.global.document,
                r = t.createElement('SCRIPT');
              (r.type = 'text/javascript'),
                (r.defer = !1),
                r.appendChild(t.createTextNode(e)),
                t.head.appendChild(r),
                t.head.removeChild(r);
            }
          }
        }),
        (goog.evalWorksForGlobals_ = null),
        (goog.getCssName = function (e, t) {
          if ('.' == String(e).charAt(0))
            throw Error(
              'className passed in goog.getCssName must not start with ".". You passed: ' +
                e
            );
          var r = function (e) {
              return goog.cssNameMapping_[e] || e;
            },
            o = function (e) {
              e = e.split('-');
              for (var t = [], o = 0; o < e.length; o++) t.push(r(e[o]));
              return t.join('-');
            };
          return (
            (o = goog.cssNameMapping_
              ? 'BY_WHOLE' == goog.cssNameMappingStyle_
                ? r
                : o
              : function (e) {
                  return e;
                }),
            (e = t ? e + '-' + o(t) : o(e)),
            goog.global.CLOSURE_CSS_NAME_MAP_FN
              ? goog.global.CLOSURE_CSS_NAME_MAP_FN(e)
              : e
          );
        }),
        (goog.setCssNameMapping = function (e, t) {
          (goog.cssNameMapping_ = e), (goog.cssNameMappingStyle_ = t);
        }),
        !COMPILED &&
          goog.global.CLOSURE_CSS_NAME_MAPPING &&
          (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING),
        (goog.getMsg = function (e, t, r) {
          return (
            r && r.html && (e = e.replace(/</g, '&lt;')),
            t &&
              (e = e.replace(/\{\$([^}]+)}/g, function (e, r) {
                return null != t && r in t ? t[r] : e;
              })),
            e
          );
        }),
        (goog.getMsgWithFallback = function (e, t) {
          return e;
        }),
        (goog.exportSymbol = function (e, t, r) {
          goog.exportPath_(e, t, r);
        }),
        (goog.exportProperty = function (e, t, r) {
          e[t] = r;
        }),
        (goog.inherits = function (e, t) {
          function r() {}
          (r.prototype = t.prototype),
            (e.superClass_ = t.prototype),
            (e.prototype = new r()),
            (e.prototype.constructor = e),
            (e.base = function (e, r, o) {
              for (
                var i = Array(arguments.length - 2), n = 2;
                n < arguments.length;
                n++
              )
                i[n - 2] = arguments[n];
              return t.prototype[r].apply(e, i);
            });
        }),
        (goog.base = function (e, t, r) {
          var o = arguments.callee.caller;
          if (goog.STRICT_MODE_COMPATIBLE || (goog.DEBUG && !o))
            throw Error(
              'arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C'
            );
          if (void 0 !== o.superClass_) {
            for (
              var i = Array(arguments.length - 1), n = 1;
              n < arguments.length;
              n++
            )
              i[n - 1] = arguments[n];
            return o.superClass_.constructor.apply(e, i);
          }
          if ('string' != typeof t && 'symbol' != typeof t)
            throw Error(
              'method names provided to goog.base must be a string or a symbol'
            );
          for (
            i = Array(arguments.length - 2), n = 2;
            n < arguments.length;
            n++
          )
            i[n - 2] = arguments[n];
          n = !1;
          for (var s = e.constructor.prototype; s; s = Object.getPrototypeOf(s))
            if (s[t] === o) n = !0;
            else if (n) return s[t].apply(e, i);
          if (e[t] === o) return e.constructor.prototype[t].apply(e, i);
          throw Error(
            'goog.base called from a method of one name to a method of a different name'
          );
        }),
        (goog.scope = function (e) {
          if (goog.isInModuleLoader_())
            throw Error('goog.scope is not supported within a module.');
          e.call(goog.global);
        }),
        COMPILED || (goog.global.COMPILED = COMPILED),
        (goog.defineClass = function (e, t) {
          var r = t.constructor,
            o = t.statics;
          return (
            (r && r != Object.prototype.constructor) ||
              (r = function () {
                throw Error(
                  'cannot instantiate an interface (no constructor defined).'
                );
              }),
            (r = goog.defineClass.createSealingConstructor_(r, e)),
            e && goog.inherits(r, e),
            delete t.constructor,
            delete t.statics,
            goog.defineClass.applyProperties_(r.prototype, t),
            null != o &&
              (o instanceof Function
                ? o(r)
                : goog.defineClass.applyProperties_(r, o)),
            r
          );
        }),
        (goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG),
        (goog.defineClass.createSealingConstructor_ = function (e, t) {
          if (!goog.defineClass.SEAL_CLASS_INSTANCES) return e;
          var r = !goog.defineClass.isUnsealable_(t),
            o = function () {
              var t = e.apply(this, arguments) || this;
              return (
                (t[goog.UID_PROPERTY_] = t[goog.UID_PROPERTY_]),
                this.constructor === o &&
                  r &&
                  Object.seal instanceof Function &&
                  Object.seal(t),
                t
              );
            };
          return o;
        }),
        (goog.defineClass.isUnsealable_ = function (e) {
          return (
            e &&
            e.prototype &&
            e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]
          );
        }),
        (goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ =
          'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
            ' '
          )),
        (goog.defineClass.applyProperties_ = function (e, t) {
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          for (
            var o = 0;
            o < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;
            o++
          )
            (r = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[o]),
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        }),
        (goog.tagUnsealableClass = function (e) {
          !COMPILED &&
            goog.defineClass.SEAL_CLASS_INSTANCES &&
            (e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
        }),
        (goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ =
          'goog_defineClass_legacy_unsealable'),
        !COMPILED &&
          goog.DEPENDENCIES_ENABLED &&
          ((goog.inHtmlDocument_ = function () {
            var e = goog.global.document;
            return null != e && 'write' in e;
          }),
          (goog.isDocumentLoading_ = function () {
            var e = goog.global.document;
            return e.attachEvent
              ? 'complete' != e.readyState
              : 'loading' == e.readyState;
          }),
          (goog.findBasePath_ = function () {
            if (
              goog.isDef(goog.global.CLOSURE_BASE_PATH) &&
              goog.isString(goog.global.CLOSURE_BASE_PATH)
            )
              goog.basePath = goog.global.CLOSURE_BASE_PATH;
            else if (goog.inHtmlDocument_()) {
              var e = goog.global.document,
                t = e.currentScript;
              for (
                t = (e = t ? [t] : e.getElementsByTagName('SCRIPT')).length - 1;
                0 <= t;
                --t
              ) {
                var r = e[t].src,
                  o = r.lastIndexOf('?');
                if (
                  ((o = -1 == o ? r.length : o),
                  'base.js' == r.substr(o - 7, 7))
                ) {
                  goog.basePath = r.substr(0, o - 7);
                  break;
                }
              }
            }
          }),
          goog.findBasePath_(),
          (goog.Transpiler = function () {
            (this.requiresTranspilation_ = null),
              (this.transpilationTarget_ = goog.TRANSPILE_TO_LANGUAGE);
          }),
          (goog.Transpiler.prototype.createRequiresTranspilation_ =
            function () {
              function a(t, r) {
                e
                  ? (d[t] = !0)
                  : r()
                  ? ((c = t), (d[t] = !1))
                  : (e = d[t] = !0);
              }
              function b(a) {
                try {
                  return !!eval(a);
                } catch (e) {
                  return !1;
                }
              }
              var c = 'es3',
                d = { es3: !1 },
                e = !1,
                f =
                  goog.global.navigator && goog.global.navigator.userAgent
                    ? goog.global.navigator.userAgent
                    : '';
              return (
                a('es5', function () {
                  return b('[1,].length==1');
                }),
                a('es6', function () {
                  return (
                    !f.match(/Edge\/(\d+)(\.\d)*/i) &&
                    b(
                      '(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()'
                    )
                  );
                }),
                a('es7', function () {
                  return b('2 ** 2 == 4');
                }),
                a('es8', function () {
                  return b('async () => 1, true');
                }),
                a('es9', function () {
                  return b('({...rest} = {}), true');
                }),
                a('es_next', function () {
                  return !1;
                }),
                { target: c, map: d }
              );
            }),
          (goog.Transpiler.prototype.needsTranspile = function (e, t) {
            if ('always' == goog.TRANSPILE) return !0;
            if ('never' == goog.TRANSPILE) return !1;
            if (!this.requiresTranspilation_) {
              var r = this.createRequiresTranspilation_();
              (this.requiresTranspilation_ = r.map),
                (this.transpilationTarget_ =
                  this.transpilationTarget_ || r.target);
            }
            if (e in this.requiresTranspilation_)
              return (
                !!this.requiresTranspilation_[e] ||
                !(
                  !goog.inHtmlDocument_() ||
                  'es6' != t ||
                  'noModule' in goog.global.document.createElement('script')
                )
              );
            throw Error('Unknown language mode: ' + e);
          }),
          (goog.Transpiler.prototype.transpile = function (e, t) {
            return goog.transpile_(e, t, this.transpilationTarget_);
          }),
          (goog.transpiler_ = new goog.Transpiler()),
          (goog.protectScriptTag_ = function (e) {
            return e.replace(/<\/(SCRIPT)/gi, '\\x3c/$1');
          }),
          (goog.DebugLoader_ = function () {
            (this.dependencies_ = {}),
              (this.idToPath_ = {}),
              (this.written_ = {}),
              (this.loadingDeps_ = []),
              (this.depsToLoad_ = []),
              (this.paused_ = !1),
              (this.factory_ = new goog.DependencyFactory(goog.transpiler_)),
              (this.deferredCallbacks_ = {}),
              (this.deferredQueue_ = []);
          }),
          (goog.DebugLoader_.prototype.bootstrap = function (e, t) {
            function r() {
              o && (goog.global.setTimeout(o, 0), (o = null));
            }
            var o = t;
            if (e.length) {
              t = [];
              for (var i = 0; i < e.length; i++) {
                var n = this.getPathFromDeps_(e[i]);
                if (!n) throw Error('Unregonized namespace: ' + e[i]);
                t.push(this.dependencies_[n]);
              }
              n = goog.require;
              var s = 0;
              for (i = 0; i < e.length; i++)
                n(e[i]),
                  t[i].onLoad(function () {
                    ++s == e.length && r();
                  });
            } else r();
          }),
          (goog.DebugLoader_.prototype.loadClosureDeps = function () {
            this.depsToLoad_.push(
              this.factory_.createDependency(
                goog.normalizePath_(goog.basePath + 'deps.js'),
                'deps.js',
                [],
                [],
                {},
                !1
              )
            ),
              this.loadDeps_();
          }),
          (goog.DebugLoader_.prototype.requested = function (e, t) {
            (e = this.getPathFromDeps_(e)) &&
              (t || this.areDepsLoaded_(this.dependencies_[e].requires)) &&
              (t = this.deferredCallbacks_[e]) &&
              (delete this.deferredCallbacks_[e], t());
          }),
          (goog.DebugLoader_.prototype.setDependencyFactory = function (e) {
            this.factory_ = e;
          }),
          (goog.DebugLoader_.prototype.load_ = function (e) {
            if (!this.getPathFromDeps_(e))
              throw (
                ((e = 'goog.require could not find: ' + e),
                goog.logToConsole_(e),
                Error(e))
              );
            var t = this,
              r = [],
              o = function (e) {
                var i = t.getPathFromDeps_(e);
                if (!i) throw Error('Bad dependency path or symbol: ' + e);
                if (!t.written_[i]) {
                  for (
                    t.written_[i] = !0, e = t.dependencies_[i], i = 0;
                    i < e.requires.length;
                    i++
                  )
                    goog.isProvided_(e.requires[i]) || o(e.requires[i]);
                  r.push(e);
                }
              };
            o(e),
              (e = !!this.depsToLoad_.length),
              (this.depsToLoad_ = this.depsToLoad_.concat(r)),
              this.paused_ || e || this.loadDeps_();
          }),
          (goog.DebugLoader_.prototype.loadDeps_ = function () {
            for (
              var e = this, t = this.paused_;
              this.depsToLoad_.length && !t;

            )
              !(function () {
                var r = !1,
                  o = e.depsToLoad_.shift(),
                  i = !1;
                e.loading_(o);
                var n = {
                  pause: function () {
                    if (r)
                      throw Error('Cannot call pause after the call to load.');
                    t = !0;
                  },
                  resume: function () {
                    r ? e.resume_() : (t = !1);
                  },
                  loaded: function () {
                    if (i) throw Error('Double call to loaded.');
                    (i = !0), e.loaded_(o);
                  },
                  pending: function () {
                    for (var t = [], r = 0; r < e.loadingDeps_.length; r++)
                      t.push(e.loadingDeps_[r]);
                    return t;
                  },
                  setModuleState: function (e) {
                    goog.moduleLoaderState_ = {
                      type: e,
                      moduleName: '',
                      declareLegacyNamespace: !1,
                    };
                  },
                  registerEs6ModuleExports: function (e, t, r) {
                    r &&
                      (goog.loadedModules_[r] = {
                        exports: t,
                        type: goog.ModuleType.ES6,
                        moduleId: r || '',
                      });
                  },
                  registerGoogModuleExports: function (e, t) {
                    goog.loadedModules_[e] = {
                      exports: t,
                      type: goog.ModuleType.GOOG,
                      moduleId: e,
                    };
                  },
                  clearModuleState: function () {
                    goog.moduleLoaderState_ = null;
                  },
                  defer: function (t) {
                    if (r)
                      throw Error(
                        'Cannot register with defer after the call to load.'
                      );
                    e.defer_(o, t);
                  },
                  areDepsLoaded: function () {
                    return e.areDepsLoaded_(o.requires);
                  },
                };
                try {
                  o.load(n);
                } finally {
                  r = !0;
                }
              })();
            t && this.pause_();
          }),
          (goog.DebugLoader_.prototype.pause_ = function () {
            this.paused_ = !0;
          }),
          (goog.DebugLoader_.prototype.resume_ = function () {
            this.paused_ && ((this.paused_ = !1), this.loadDeps_());
          }),
          (goog.DebugLoader_.prototype.loading_ = function (e) {
            this.loadingDeps_.push(e);
          }),
          (goog.DebugLoader_.prototype.loaded_ = function (e) {
            for (var t = 0; t < this.loadingDeps_.length; t++)
              if (this.loadingDeps_[t] == e) {
                this.loadingDeps_.splice(t, 1);
                break;
              }
            for (t = 0; t < this.deferredQueue_.length; t++)
              if (this.deferredQueue_[t] == e.path) {
                this.deferredQueue_.splice(t, 1);
                break;
              }
            if (
              this.loadingDeps_.length == this.deferredQueue_.length &&
              !this.depsToLoad_.length
            )
              for (; this.deferredQueue_.length; )
                this.requested(this.deferredQueue_.shift(), !0);
            e.loaded();
          }),
          (goog.DebugLoader_.prototype.areDepsLoaded_ = function (e) {
            for (var t = 0; t < e.length; t++) {
              var r = this.getPathFromDeps_(e[t]);
              if (
                !r ||
                !(r in this.deferredCallbacks_ || goog.isProvided_(e[t]))
              )
                return !1;
            }
            return !0;
          }),
          (goog.DebugLoader_.prototype.getPathFromDeps_ = function (e) {
            return e in this.idToPath_
              ? this.idToPath_[e]
              : e in this.dependencies_
              ? e
              : null;
          }),
          (goog.DebugLoader_.prototype.defer_ = function (e, t) {
            (this.deferredCallbacks_[e.path] = t),
              this.deferredQueue_.push(e.path);
          }),
          (goog.LoadController = function () {}),
          (goog.LoadController.prototype.pause = function () {}),
          (goog.LoadController.prototype.resume = function () {}),
          (goog.LoadController.prototype.loaded = function () {}),
          (goog.LoadController.prototype.pending = function () {}),
          (goog.LoadController.prototype.registerEs6ModuleExports = function (
            e,
            t,
            r
          ) {}),
          (goog.LoadController.prototype.setModuleState = function (e) {}),
          (goog.LoadController.prototype.clearModuleState = function () {}),
          (goog.LoadController.prototype.defer = function (e) {}),
          (goog.LoadController.prototype.areDepsLoaded = function () {}),
          (goog.Dependency = function (e, t, r, o, i) {
            (this.path = e),
              (this.relativePath = t),
              (this.provides = r),
              (this.requires = o),
              (this.loadFlags = i),
              (this.loaded_ = !1),
              (this.loadCallbacks_ = []);
          }),
          (goog.Dependency.prototype.getPathName = function () {
            var e = this.path,
              t = e.indexOf('://');
            return (
              0 <= t &&
                0 <= (t = (e = e.substring(t + 3)).indexOf('/')) &&
                (e = e.substring(t + 1)),
              e
            );
          }),
          (goog.Dependency.prototype.onLoad = function (e) {
            this.loaded_ ? e() : this.loadCallbacks_.push(e);
          }),
          (goog.Dependency.prototype.loaded = function () {
            this.loaded_ = !0;
            var e = this.loadCallbacks_;
            this.loadCallbacks_ = [];
            for (var t = 0; t < e.length; t++) e[t]();
          }),
          (goog.Dependency.defer_ = !1),
          (goog.Dependency.callbackMap_ = {}),
          (goog.Dependency.registerCallback_ = function (e) {
            var t = Math.random().toString(32);
            return (goog.Dependency.callbackMap_[t] = e), t;
          }),
          (goog.Dependency.unregisterCallback_ = function (e) {
            delete goog.Dependency.callbackMap_[e];
          }),
          (goog.Dependency.callback_ = function (e, t) {
            if (!(e in goog.Dependency.callbackMap_))
              throw Error(
                'Callback key ' +
                  e +
                  ' does not exist (was base.js loaded more than once?).'
              );
            for (
              var r = goog.Dependency.callbackMap_[e], o = [], i = 1;
              i < arguments.length;
              i++
            )
              o.push(arguments[i]);
            r.apply(void 0, o);
          }),
          (goog.Dependency.prototype.load = function (e) {
            if (goog.global.CLOSURE_IMPORT_SCRIPT)
              goog.global.CLOSURE_IMPORT_SCRIPT(this.path)
                ? e.loaded()
                : e.pause();
            else if (goog.inHtmlDocument_()) {
              var t = goog.global.document;
              if (
                'complete' == t.readyState &&
                !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING
              ) {
                if (/\bdeps.js$/.test(this.path)) return void e.loaded();
                throw Error(
                  'Cannot write "' + this.path + '" after document load'
                );
              }
              if (
                !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING &&
                goog.isDocumentLoading_()
              ) {
                var r = goog.Dependency.registerCallback_(function (t) {
                    (goog.DebugLoader_.IS_OLD_IE_ &&
                      'complete' != t.readyState) ||
                      (goog.Dependency.unregisterCallback_(r), e.loaded());
                  }),
                  o =
                    !goog.DebugLoader_.IS_OLD_IE_ && goog.getScriptNonce()
                      ? ' nonce="' + goog.getScriptNonce() + '"'
                      : '';
                (o =
                  '<script src="' +
                  this.path +
                  '" ' +
                  (goog.DebugLoader_.IS_OLD_IE_
                    ? 'onreadystatechange'
                    : 'onload') +
                  '="goog.Dependency.callback_(\'' +
                  r +
                  '\', this)" type="text/javascript" ' +
                  (goog.Dependency.defer_ ? 'defer' : '') +
                  o +
                  '></script>'),
                  t.write(
                    goog.TRUSTED_TYPES_POLICY_
                      ? goog.TRUSTED_TYPES_POLICY_.createHTML(o)
                      : o
                  );
              } else {
                var i = t.createElement('script');
                (i.defer = goog.Dependency.defer_),
                  (i.async = !1),
                  (i.type = 'text/javascript'),
                  (o = goog.getScriptNonce()) && i.setAttribute('nonce', o),
                  goog.DebugLoader_.IS_OLD_IE_
                    ? (e.pause(),
                      (i.onreadystatechange = function () {
                        ('loaded' != i.readyState &&
                          'complete' != i.readyState) ||
                          (e.loaded(), e.resume());
                      }))
                    : (i.onload = function () {
                        (i.onload = null), e.loaded();
                      }),
                  (i.src = goog.TRUSTED_TYPES_POLICY_
                    ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path)
                    : this.path),
                  t.head.appendChild(i);
              }
            } else
              goog.logToConsole_(
                'Cannot use default debug loader outside of HTML documents.'
              ),
                'deps.js' == this.relativePath
                  ? (goog.logToConsole_(
                      'Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true.'
                    ),
                    e.loaded())
                  : e.pause();
          }),
          (goog.Es6ModuleDependency = function (e, t, r, o, i) {
            goog.Dependency.call(this, e, t, r, o, i);
          }),
          goog.inherits(goog.Es6ModuleDependency, goog.Dependency),
          (goog.Es6ModuleDependency.prototype.load = function (e) {
            if (goog.global.CLOSURE_IMPORT_SCRIPT)
              goog.global.CLOSURE_IMPORT_SCRIPT(this.path)
                ? e.loaded()
                : e.pause();
            else if (goog.inHtmlDocument_()) {
              var t = goog.global.document,
                r = this;
              if (goog.isDocumentLoading_()) {
                var o = function (e, r) {
                  (e = r
                    ? '<script type="module" crossorigin>' + r + '</script>'
                    : '<script type="module" crossorigin src="' +
                      e +
                      '"></script>'),
                    t.write(
                      goog.TRUSTED_TYPES_POLICY_
                        ? goog.TRUSTED_TYPES_POLICY_.createHTML(e)
                        : e
                    );
                };
                goog.Dependency.defer_ = !0;
              } else
                o = function (e, r) {
                  var o = t.createElement('script');
                  (o.defer = !0),
                    (o.async = !1),
                    (o.type = 'module'),
                    o.setAttribute('crossorigin', !0);
                  var i = goog.getScriptNonce();
                  i && o.setAttribute('nonce', i),
                    r
                      ? (o.textContent = goog.TRUSTED_TYPES_POLICY_
                          ? goog.TRUSTED_TYPES_POLICY_.createScript(r)
                          : r)
                      : (o.src = goog.TRUSTED_TYPES_POLICY_
                          ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(e)
                          : e),
                    t.head.appendChild(o);
                };
              var i = goog.Dependency.registerCallback_(function () {
                goog.Dependency.unregisterCallback_(i),
                  e.setModuleState(goog.ModuleType.ES6);
              });
              o(void 0, 'goog.Dependency.callback_("' + i + '")'),
                o(this.path, void 0);
              var n = goog.Dependency.registerCallback_(function (t) {
                goog.Dependency.unregisterCallback_(n),
                  e.registerEs6ModuleExports(
                    r.path,
                    t,
                    goog.moduleLoaderState_.moduleName
                  );
              });
              o(
                void 0,
                'import * as m from "' +
                  this.path +
                  '"; goog.Dependency.callback_("' +
                  n +
                  '", m)'
              );
              var s = goog.Dependency.registerCallback_(function () {
                goog.Dependency.unregisterCallback_(s),
                  e.clearModuleState(),
                  e.loaded();
              });
              o(void 0, 'goog.Dependency.callback_("' + s + '")');
            } else
              goog.logToConsole_(
                'Cannot use default debug loader outside of HTML documents.'
              ),
                e.pause();
          }),
          (goog.TransformedDependency = function (e, t, r, o, i) {
            goog.Dependency.call(this, e, t, r, o, i),
              (this.contents_ = null),
              (this.lazyFetch_ = !(
                goog.inHtmlDocument_() &&
                'noModule' in goog.global.document.createElement('script')
              ));
          }),
          goog.inherits(goog.TransformedDependency, goog.Dependency),
          (goog.TransformedDependency.prototype.load = function (e) {
            function t() {
              (o.contents_ = goog.loadFileSync_(o.path)),
                o.contents_ &&
                  ((o.contents_ = o.transform(o.contents_)),
                  o.contents_ && (o.contents_ += '\n//# sourceURL=' + o.path));
            }
            function r() {
              if ((o.lazyFetch_ && t(), o.contents_)) {
                i && e.setModuleState(goog.ModuleType.ES6);
                try {
                  var r = o.contents_;
                  if (((o.contents_ = null), goog.globalEval(r), i))
                    var n = goog.moduleLoaderState_.moduleName;
                } finally {
                  i && e.clearModuleState();
                }
                i &&
                  goog.global.$jscomp.require.ensure(
                    [o.getPathName()],
                    function () {
                      e.registerEs6ModuleExports(
                        o.path,
                        goog.global.$jscomp.require(o.getPathName()),
                        n
                      );
                    }
                  ),
                  e.loaded();
              }
            }
            var o = this;
            if (goog.global.CLOSURE_IMPORT_SCRIPT)
              t(),
                this.contents_ &&
                goog.global.CLOSURE_IMPORT_SCRIPT('', this.contents_)
                  ? ((this.contents_ = null), e.loaded())
                  : e.pause();
            else {
              var i = this.loadFlags.module == goog.ModuleType.ES6;
              this.lazyFetch_ || t();
              var n = 1 < e.pending().length,
                s = n && goog.DebugLoader_.IS_OLD_IE_;
              if (
                ((n =
                  goog.Dependency.defer_ && (n || goog.isDocumentLoading_())),
                s || n)
              )
                e.defer(function () {
                  r();
                });
              else {
                var a = goog.global.document;
                if (
                  ((s =
                    goog.inHtmlDocument_() && 'ActiveXObject' in goog.global),
                  i &&
                    goog.inHtmlDocument_() &&
                    goog.isDocumentLoading_() &&
                    !s)
                ) {
                  (goog.Dependency.defer_ = !0), e.pause();
                  var l = a.onreadystatechange;
                  a.onreadystatechange = function () {
                    'interactive' == a.readyState &&
                      ((a.onreadystatechange = l), r(), e.resume()),
                      goog.isFunction(l) && l.apply(void 0, arguments);
                  };
                } else
                  !goog.DebugLoader_.IS_OLD_IE_ &&
                  goog.inHtmlDocument_() &&
                  goog.isDocumentLoading_()
                    ? (function () {
                        var e = goog.global.document,
                          t = goog.Dependency.registerCallback_(function () {
                            goog.Dependency.unregisterCallback_(t), r();
                          }),
                          o =
                            '<script type="text/javascript">' +
                            goog.protectScriptTag_(
                              'goog.Dependency.callback_("' + t + '");'
                            ) +
                            '</script>';
                        e.write(
                          goog.TRUSTED_TYPES_POLICY_
                            ? goog.TRUSTED_TYPES_POLICY_.createHTML(o)
                            : o
                        );
                      })()
                    : r();
              }
            }
          }),
          (goog.TransformedDependency.prototype.transform = function (e) {}),
          (goog.TranspiledDependency = function (e, t, r, o, i, n) {
            goog.TransformedDependency.call(this, e, t, r, o, i),
              (this.transpiler = n);
          }),
          goog.inherits(goog.TranspiledDependency, goog.TransformedDependency),
          (goog.TranspiledDependency.prototype.transform = function (e) {
            return this.transpiler.transpile(e, this.getPathName());
          }),
          (goog.PreTranspiledEs6ModuleDependency = function (e, t, r, o, i) {
            goog.TransformedDependency.call(this, e, t, r, o, i);
          }),
          goog.inherits(
            goog.PreTranspiledEs6ModuleDependency,
            goog.TransformedDependency
          ),
          (goog.PreTranspiledEs6ModuleDependency.prototype.transform =
            function (e) {
              return e;
            }),
          (goog.GoogModuleDependency = function (e, t, r, o, i, n, s) {
            goog.TransformedDependency.call(this, e, t, r, o, i),
              (this.needsTranspile_ = n),
              (this.transpiler_ = s);
          }),
          goog.inherits(goog.GoogModuleDependency, goog.TransformedDependency),
          (goog.GoogModuleDependency.prototype.transform = function (e) {
            return (
              this.needsTranspile_ &&
                (e = this.transpiler_.transpile(e, this.getPathName())),
              goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON)
                ? 'goog.loadModule(' +
                  goog.global.JSON.stringify(
                    e + '\n//# sourceURL=' + this.path + '\n'
                  ) +
                  ');'
                : 'goog.loadModule(function(exports) {"use strict";' +
                  e +
                  '\n;return exports});\n//# sourceURL=' +
                  this.path +
                  '\n'
            );
          }),
          (goog.DebugLoader_.IS_OLD_IE_ = !(
            goog.global.atob ||
            !goog.global.document ||
            !goog.global.document.all
          )),
          (goog.DebugLoader_.prototype.addDependency = function (e, t, r, o) {
            (t = t || []), (e = e.replace(/\\/g, '/'));
            var i = goog.normalizePath_(goog.basePath + e);
            for (
              (o && 'boolean' != typeof o) ||
                (o = o ? { module: goog.ModuleType.GOOG } : {}),
                r = this.factory_.createDependency(
                  i,
                  e,
                  t,
                  r,
                  o,
                  goog.transpiler_.needsTranspile(o.lang || 'es3', o.module)
                ),
                this.dependencies_[i] = r,
                r = 0;
              r < t.length;
              r++
            )
              this.idToPath_[t[r]] = i;
            this.idToPath_[e] = i;
          }),
          (goog.DependencyFactory = function (e) {
            this.transpiler = e;
          }),
          (goog.DependencyFactory.prototype.createDependency = function (
            e,
            t,
            r,
            o,
            i,
            n
          ) {
            return i.module == goog.ModuleType.GOOG
              ? new goog.GoogModuleDependency(e, t, r, o, i, n, this.transpiler)
              : n
              ? new goog.TranspiledDependency(e, t, r, o, i, this.transpiler)
              : i.module == goog.ModuleType.ES6
              ? 'never' == goog.TRANSPILE && goog.ASSUME_ES_MODULES_TRANSPILED
                ? new goog.PreTranspiledEs6ModuleDependency(e, t, r, o, i)
                : new goog.Es6ModuleDependency(e, t, r, o, i)
              : new goog.Dependency(e, t, r, o, i);
          }),
          (goog.debugLoader_ = new goog.DebugLoader_()),
          (goog.loadClosureDeps = function () {
            goog.debugLoader_.loadClosureDeps();
          }),
          (goog.setDependencyFactory = function (e) {
            goog.debugLoader_.setDependencyFactory(e);
          }),
          goog.global.CLOSURE_NO_DEPS || goog.debugLoader_.loadClosureDeps(),
          (goog.bootstrap = function (e, t) {
            goog.debugLoader_.bootstrap(e, t);
          })),
        (goog.TRUSTED_TYPES_POLICY_NAME = ''),
        (goog.identity_ = function (e) {
          return e;
        }),
        (goog.createTrustedTypesPolicy = function (e) {
          var t = null;
          if ('undefined' == typeof TrustedTypes || !TrustedTypes.createPolicy)
            return t;
          try {
            t = TrustedTypes.createPolicy(e, {
              createHTML: goog.identity_,
              createScript: goog.identity_,
              createScriptURL: goog.identity_,
              createURL: goog.identity_,
            });
          } catch (e) {
            goog.logToConsole_(e.message);
          }
          return t;
        }),
        (goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME
          ? goog.createTrustedTypesPolicy(
              goog.TRUSTED_TYPES_POLICY_NAME + '#base'
            )
          : null);
      var jspb = {
        BinaryConstants: {},
        ConstBinaryMessage: function () {},
        BinaryMessage: function () {},
      };
      (jspb.BinaryConstants.FieldType = {
        INVALID: -1,
        DOUBLE: 1,
        FLOAT: 2,
        INT64: 3,
        UINT64: 4,
        INT32: 5,
        FIXED64: 6,
        FIXED32: 7,
        BOOL: 8,
        STRING: 9,
        GROUP: 10,
        MESSAGE: 11,
        BYTES: 12,
        UINT32: 13,
        ENUM: 14,
        SFIXED32: 15,
        SFIXED64: 16,
        SINT32: 17,
        SINT64: 18,
        FHASH64: 30,
        VHASH64: 31,
      }),
        (jspb.BinaryConstants.WireType = {
          INVALID: -1,
          VARINT: 0,
          FIXED64: 1,
          DELIMITED: 2,
          START_GROUP: 3,
          END_GROUP: 4,
          FIXED32: 5,
        }),
        (jspb.BinaryConstants.FieldTypeToWireType = function (e) {
          var t = jspb.BinaryConstants.FieldType,
            r = jspb.BinaryConstants.WireType;
          switch (e) {
            case t.INT32:
            case t.INT64:
            case t.UINT32:
            case t.UINT64:
            case t.SINT32:
            case t.SINT64:
            case t.BOOL:
            case t.ENUM:
            case t.VHASH64:
              return r.VARINT;
            case t.DOUBLE:
            case t.FIXED64:
            case t.SFIXED64:
            case t.FHASH64:
              return r.FIXED64;
            case t.STRING:
            case t.MESSAGE:
            case t.BYTES:
              return r.DELIMITED;
            case t.FLOAT:
            case t.FIXED32:
            case t.SFIXED32:
              return r.FIXED32;
            default:
              return r.INVALID;
          }
        }),
        (jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1),
        (jspb.BinaryConstants.FLOAT32_EPS = 1401298464324817e-60),
        (jspb.BinaryConstants.FLOAT32_MIN = 11754943508222875e-54),
        (jspb.BinaryConstants.FLOAT32_MAX = 34028234663852886e22),
        (jspb.BinaryConstants.FLOAT64_EPS = 5e-324),
        (jspb.BinaryConstants.FLOAT64_MIN = 22250738585072014e-324),
        (jspb.BinaryConstants.FLOAT64_MAX = 17976931348623157e292),
        (jspb.BinaryConstants.TWO_TO_20 = 1048576),
        (jspb.BinaryConstants.TWO_TO_23 = 8388608),
        (jspb.BinaryConstants.TWO_TO_31 = 2147483648),
        (jspb.BinaryConstants.TWO_TO_32 = 4294967296),
        (jspb.BinaryConstants.TWO_TO_52 = 4503599627370496),
        (jspb.BinaryConstants.TWO_TO_63 = 0x8000000000000000),
        (jspb.BinaryConstants.TWO_TO_64 = 0x10000000000000000),
        (jspb.BinaryConstants.ZERO_HASH = '\0\0\0\0\0\0\0\0'),
        (goog.dom = {}),
        (goog.dom.NodeType = {
          ELEMENT: 1,
          ATTRIBUTE: 2,
          TEXT: 3,
          CDATA_SECTION: 4,
          ENTITY_REFERENCE: 5,
          ENTITY: 6,
          PROCESSING_INSTRUCTION: 7,
          COMMENT: 8,
          DOCUMENT: 9,
          DOCUMENT_TYPE: 10,
          DOCUMENT_FRAGMENT: 11,
          NOTATION: 12,
        }),
        (goog.debug = {}),
        (goog.debug.Error = function (e) {
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, goog.debug.Error);
          else {
            var t = Error().stack;
            t && (this.stack = t);
          }
          e && (this.message = String(e)), (this.reportErrorToServer = !0);
        }),
        goog.inherits(goog.debug.Error, Error),
        (goog.debug.Error.prototype.name = 'CustomError'),
        (goog.asserts = {}),
        (goog.asserts.ENABLE_ASSERTS = goog.DEBUG),
        (goog.asserts.AssertionError = function (e, t) {
          goog.debug.Error.call(this, goog.asserts.subs_(e, t)),
            (this.messagePattern = e);
        }),
        goog.inherits(goog.asserts.AssertionError, goog.debug.Error),
        (goog.asserts.AssertionError.prototype.name = 'AssertionError'),
        (goog.asserts.DEFAULT_ERROR_HANDLER = function (e) {
          throw e;
        }),
        (goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER),
        (goog.asserts.subs_ = function (e, t) {
          for (
            var r = '', o = (e = e.split('%s')).length - 1, i = 0;
            i < o;
            i++
          )
            r += e[i] + (i < t.length ? t[i] : '%s');
          return r + e[o];
        }),
        (goog.asserts.doAssertFailure_ = function (e, t, r, o) {
          var i = 'Assertion failed';
          if (r) {
            i += ': ' + r;
            var n = o;
          } else e && ((i += ': ' + e), (n = t));
          (e = new goog.asserts.AssertionError('' + i, n || [])),
            goog.asserts.errorHandler_(e);
        }),
        (goog.asserts.setErrorHandler = function (e) {
          goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = e);
        }),
        (goog.asserts.assert = function (e, t, r) {
          return (
            goog.asserts.ENABLE_ASSERTS &&
              !e &&
              goog.asserts.doAssertFailure_(
                '',
                null,
                t,
                Array.prototype.slice.call(arguments, 2)
              ),
            e
          );
        }),
        (goog.asserts.assertExists = function (e, t, r) {
          return (
            goog.asserts.ENABLE_ASSERTS &&
              null == e &&
              goog.asserts.doAssertFailure_(
                'Expected to exist: %s.',
                [e],
                t,
                Array.prototype.slice.call(arguments, 2)
              ),
            e
          );
        }),
        (goog.asserts.fail = function (e, t) {
          goog.asserts.ENABLE_ASSERTS &&
            goog.asserts.errorHandler_(
              new goog.asserts.AssertionError(
                'Failure' + (e ? ': ' + e : ''),
                Array.prototype.slice.call(arguments, 1)
              )
            );
        }),
        (goog.asserts.assertNumber = function (e, t, r) {
          return (
            goog.asserts.ENABLE_ASSERTS &&
              !goog.isNumber(e) &&
              goog.asserts.doAssertFailure_(
                'Expected number but got %s: %s.',
                [goog.typeOf(e), e],
                t,
                Array.prototype.slice.call(arguments, 2)
              ),
            e
          );
        }),
        (goog.asserts.assertString = function (e, t, r) {
          return (
            goog.asserts.ENABLE_ASSERTS &&
              !goog.isString(e) &&
              goog.asserts.doAssertFailure_(
                'Expected string but got %s: %s.',
                [goog.typeOf(e), e],
                t,
                Array.prototype.slice.call(arguments, 2)
              ),
            e
          );
        }),
        (goog.asserts.assertFunction = function (e, t, r) {
          return (
            goog.asserts.ENABLE_ASSERTS &&
              !goog.isFunction(e) &&
              goog.asserts.doAssertFailure_(
                'Expected function but got %s: %s.',
                [goog.typeOf(e), e],
                t,
                Array.prototype.slice.call(arguments, 2)
              ),
            e
          );
        }),
        (goog.asserts.assertObject = function (e, t, r) {
          return (
            goog.asserts.ENABLE_ASSERTS &&
              !goog.isObject(e) &&
              goog.asserts.doAssertFailure_(
                'Expected object but got %s: %s.',
                [goog.typeOf(e), e],
                t,
                Array.prototype.slice.call(arguments, 2)
              ),
            e
          );
        }),
        (goog.asserts.assertArray = function (e, t, r) {
          return (
            goog.asserts.ENABLE_ASSERTS &&
              !goog.isArray(e) &&
              goog.asserts.doAssertFailure_(
                'Expected array but got %s: %s.',
                [goog.typeOf(e), e],
                t,
                Array.prototype.slice.call(arguments, 2)
              ),
            e
          );
        }),
        (goog.asserts.assertBoolean = function (e, t, r) {
          return (
            goog.asserts.ENABLE_ASSERTS &&
              !goog.isBoolean(e) &&
              goog.asserts.doAssertFailure_(
                'Expected boolean but got %s: %s.',
                [goog.typeOf(e), e],
                t,
                Array.prototype.slice.call(arguments, 2)
              ),
            e
          );
        }),
        (goog.asserts.assertElement = function (e, t, r) {
          return (
            !goog.asserts.ENABLE_ASSERTS ||
              (goog.isObject(e) && e.nodeType == goog.dom.NodeType.ELEMENT) ||
              goog.asserts.doAssertFailure_(
                'Expected Element but got %s: %s.',
                [goog.typeOf(e), e],
                t,
                Array.prototype.slice.call(arguments, 2)
              ),
            e
          );
        }),
        (goog.asserts.assertInstanceof = function (e, t, r, o) {
          return (
            !goog.asserts.ENABLE_ASSERTS ||
              e instanceof t ||
              goog.asserts.doAssertFailure_(
                'Expected instanceof %s but got %s.',
                [goog.asserts.getType_(t), goog.asserts.getType_(e)],
                r,
                Array.prototype.slice.call(arguments, 3)
              ),
            e
          );
        }),
        (goog.asserts.assertFinite = function (e, t, r) {
          return (
            !goog.asserts.ENABLE_ASSERTS ||
              ('number' == typeof e && isFinite(e)) ||
              goog.asserts.doAssertFailure_(
                'Expected %s to be a finite number but it is not.',
                [e],
                t,
                Array.prototype.slice.call(arguments, 2)
              ),
            e
          );
        }),
        (goog.asserts.assertObjectPrototypeIsIntact = function () {
          for (var e in Object.prototype)
            goog.asserts.fail(
              e + ' should not be enumerable in Object.prototype.'
            );
        }),
        (goog.asserts.getType_ = function (e) {
          return e instanceof Function
            ? e.displayName || e.name || 'unknown type name'
            : e instanceof Object
            ? e.constructor.displayName ||
              e.constructor.name ||
              Object.prototype.toString.call(e)
            : null === e
            ? 'null'
            : typeof e;
        }),
        (goog.array = {}),
        (goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE),
        (goog.array.ASSUME_NATIVE_FUNCTIONS = 2012 < goog.FEATURESET_YEAR),
        (goog.array.peek = function (e) {
          return e[e.length - 1];
        }),
        (goog.array.last = goog.array.peek),
        (goog.array.indexOf =
          goog.NATIVE_ARRAY_PROTOTYPES &&
          (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf)
            ? function (e, t, r) {
                return (
                  goog.asserts.assert(null != e.length),
                  Array.prototype.indexOf.call(e, t, r)
                );
              }
            : function (e, t, r) {
                if (
                  ((r = null == r ? 0 : 0 > r ? Math.max(0, e.length + r) : r),
                  goog.isString(e))
                )
                  return goog.isString(t) && 1 == t.length
                    ? e.indexOf(t, r)
                    : -1;
                for (; r < e.length; r++) if (r in e && e[r] === t) return r;
                return -1;
              }),
        (goog.array.lastIndexOf =
          goog.NATIVE_ARRAY_PROTOTYPES &&
          (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf)
            ? function (e, t, r) {
                return (
                  goog.asserts.assert(null != e.length),
                  Array.prototype.lastIndexOf.call(
                    e,
                    t,
                    null == r ? e.length - 1 : r
                  )
                );
              }
            : function (e, t, r) {
                if (
                  (0 > (r = null == r ? e.length - 1 : r) &&
                    (r = Math.max(0, e.length + r)),
                  goog.isString(e))
                )
                  return goog.isString(t) && 1 == t.length
                    ? e.lastIndexOf(t, r)
                    : -1;
                for (; 0 <= r; r--) if (r in e && e[r] === t) return r;
                return -1;
              }),
        (goog.array.forEach =
          goog.NATIVE_ARRAY_PROTOTYPES &&
          (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach)
            ? function (e, t, r) {
                goog.asserts.assert(null != e.length),
                  Array.prototype.forEach.call(e, t, r);
              }
            : function (e, t, r) {
                for (
                  var o = e.length,
                    i = goog.isString(e) ? e.split('') : e,
                    n = 0;
                  n < o;
                  n++
                )
                  n in i && t.call(r, i[n], n, e);
              }),
        (goog.array.forEachRight = function (e, t, r) {
          var o = e.length,
            i = goog.isString(e) ? e.split('') : e;
          for (--o; 0 <= o; --o) o in i && t.call(r, i[o], o, e);
        }),
        (goog.array.filter =
          goog.NATIVE_ARRAY_PROTOTYPES &&
          (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter)
            ? function (e, t, r) {
                return (
                  goog.asserts.assert(null != e.length),
                  Array.prototype.filter.call(e, t, r)
                );
              }
            : function (e, t, r) {
                for (
                  var o = e.length,
                    i = [],
                    n = 0,
                    s = goog.isString(e) ? e.split('') : e,
                    a = 0;
                  a < o;
                  a++
                )
                  if (a in s) {
                    var l = s[a];
                    t.call(r, l, a, e) && (i[n++] = l);
                  }
                return i;
              }),
        (goog.array.map =
          goog.NATIVE_ARRAY_PROTOTYPES &&
          (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map)
            ? function (e, t, r) {
                return (
                  goog.asserts.assert(null != e.length),
                  Array.prototype.map.call(e, t, r)
                );
              }
            : function (e, t, r) {
                for (
                  var o = e.length,
                    i = Array(o),
                    n = goog.isString(e) ? e.split('') : e,
                    s = 0;
                  s < o;
                  s++
                )
                  s in n && (i[s] = t.call(r, n[s], s, e));
                return i;
              }),
        (goog.array.reduce =
          goog.NATIVE_ARRAY_PROTOTYPES &&
          (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce)
            ? function (e, t, r, o) {
                return (
                  goog.asserts.assert(null != e.length),
                  o && (t = goog.bind(t, o)),
                  Array.prototype.reduce.call(e, t, r)
                );
              }
            : function (e, t, r, o) {
                var i = r;
                return (
                  goog.array.forEach(e, function (r, n) {
                    i = t.call(o, i, r, n, e);
                  }),
                  i
                );
              }),
        (goog.array.reduceRight =
          goog.NATIVE_ARRAY_PROTOTYPES &&
          (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight)
            ? function (e, t, r, o) {
                return (
                  goog.asserts.assert(null != e.length),
                  goog.asserts.assert(null != t),
                  o && (t = goog.bind(t, o)),
                  Array.prototype.reduceRight.call(e, t, r)
                );
              }
            : function (e, t, r, o) {
                var i = r;
                return (
                  goog.array.forEachRight(e, function (r, n) {
                    i = t.call(o, i, r, n, e);
                  }),
                  i
                );
              }),
        (goog.array.some =
          goog.NATIVE_ARRAY_PROTOTYPES &&
          (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some)
            ? function (e, t, r) {
                return (
                  goog.asserts.assert(null != e.length),
                  Array.prototype.some.call(e, t, r)
                );
              }
            : function (e, t, r) {
                for (
                  var o = e.length,
                    i = goog.isString(e) ? e.split('') : e,
                    n = 0;
                  n < o;
                  n++
                )
                  if (n in i && t.call(r, i[n], n, e)) return !0;
                return !1;
              }),
        (goog.array.every =
          goog.NATIVE_ARRAY_PROTOTYPES &&
          (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every)
            ? function (e, t, r) {
                return (
                  goog.asserts.assert(null != e.length),
                  Array.prototype.every.call(e, t, r)
                );
              }
            : function (e, t, r) {
                for (
                  var o = e.length,
                    i = goog.isString(e) ? e.split('') : e,
                    n = 0;
                  n < o;
                  n++
                )
                  if (n in i && !t.call(r, i[n], n, e)) return !1;
                return !0;
              }),
        (goog.array.count = function (e, t, r) {
          var o = 0;
          return (
            goog.array.forEach(
              e,
              function (e, i, n) {
                t.call(r, e, i, n) && ++o;
              },
              r
            ),
            o
          );
        }),
        (goog.array.find = function (e, t, r) {
          return 0 > (t = goog.array.findIndex(e, t, r))
            ? null
            : goog.isString(e)
            ? e.charAt(t)
            : e[t];
        }),
        (goog.array.findIndex = function (e, t, r) {
          for (
            var o = e.length, i = goog.isString(e) ? e.split('') : e, n = 0;
            n < o;
            n++
          )
            if (n in i && t.call(r, i[n], n, e)) return n;
          return -1;
        }),
        (goog.array.findRight = function (e, t, r) {
          return 0 > (t = goog.array.findIndexRight(e, t, r))
            ? null
            : goog.isString(e)
            ? e.charAt(t)
            : e[t];
        }),
        (goog.array.findIndexRight = function (e, t, r) {
          var o = e.length,
            i = goog.isString(e) ? e.split('') : e;
          for (--o; 0 <= o; o--) if (o in i && t.call(r, i[o], o, e)) return o;
          return -1;
        }),
        (goog.array.contains = function (e, t) {
          return 0 <= goog.array.indexOf(e, t);
        }),
        (goog.array.isEmpty = function (e) {
          return 0 == e.length;
        }),
        (goog.array.clear = function (e) {
          if (!goog.isArray(e))
            for (var t = e.length - 1; 0 <= t; t--) delete e[t];
          e.length = 0;
        }),
        (goog.array.insert = function (e, t) {
          goog.array.contains(e, t) || e.push(t);
        }),
        (goog.array.insertAt = function (e, t, r) {
          goog.array.splice(e, r, 0, t);
        }),
        (goog.array.insertArrayAt = function (e, t, r) {
          goog.partial(goog.array.splice, e, r, 0).apply(null, t);
        }),
        (goog.array.insertBefore = function (e, t, r) {
          var o;
          2 == arguments.length || 0 > (o = goog.array.indexOf(e, r))
            ? e.push(t)
            : goog.array.insertAt(e, t, o);
        }),
        (goog.array.remove = function (e, t) {
          var r;
          return (
            (r = 0 <= (t = goog.array.indexOf(e, t))) &&
              goog.array.removeAt(e, t),
            r
          );
        }),
        (goog.array.removeLast = function (e, t) {
          return (
            0 <= (t = goog.array.lastIndexOf(e, t)) &&
            (goog.array.removeAt(e, t), !0)
          );
        }),
        (goog.array.removeAt = function (e, t) {
          return (
            goog.asserts.assert(null != e.length),
            1 == Array.prototype.splice.call(e, t, 1).length
          );
        }),
        (goog.array.removeIf = function (e, t, r) {
          return (
            0 <= (t = goog.array.findIndex(e, t, r)) &&
            (goog.array.removeAt(e, t), !0)
          );
        }),
        (goog.array.removeAllIf = function (e, t, r) {
          var o = 0;
          return (
            goog.array.forEachRight(e, function (i, n) {
              t.call(r, i, n, e) && goog.array.removeAt(e, n) && o++;
            }),
            o
          );
        }),
        (goog.array.concat = function (e) {
          return Array.prototype.concat.apply([], arguments);
        }),
        (goog.array.join = function (e) {
          return Array.prototype.concat.apply([], arguments);
        }),
        (goog.array.toArray = function (e) {
          var t = e.length;
          if (0 < t) {
            for (var r = Array(t), o = 0; o < t; o++) r[o] = e[o];
            return r;
          }
          return [];
        }),
        (goog.array.clone = goog.array.toArray),
        (goog.array.extend = function (e, t) {
          for (var r = 1; r < arguments.length; r++) {
            var o = arguments[r];
            if (goog.isArrayLike(o)) {
              var i = e.length || 0,
                n = o.length || 0;
              e.length = i + n;
              for (var s = 0; s < n; s++) e[i + s] = o[s];
            } else e.push(o);
          }
        }),
        (goog.array.splice = function (e, t, r, o) {
          return (
            goog.asserts.assert(null != e.length),
            Array.prototype.splice.apply(e, goog.array.slice(arguments, 1))
          );
        }),
        (goog.array.slice = function (e, t, r) {
          return (
            goog.asserts.assert(null != e.length),
            2 >= arguments.length
              ? Array.prototype.slice.call(e, t)
              : Array.prototype.slice.call(e, t, r)
          );
        }),
        (goog.array.removeDuplicates = function (e, t, r) {
          t = t || e;
          var o = function (e) {
            return goog.isObject(e)
              ? 'o' + goog.getUid(e)
              : (typeof e).charAt(0) + e;
          };
          (r = r || o), (o = {});
          for (var i = 0, n = 0; n < e.length; ) {
            var s = e[n++],
              a = r(s);
            Object.prototype.hasOwnProperty.call(o, a) ||
              ((o[a] = !0), (t[i++] = s));
          }
          t.length = i;
        }),
        (goog.array.binarySearch = function (e, t, r) {
          return goog.array.binarySearch_(
            e,
            r || goog.array.defaultCompare,
            !1,
            t
          );
        }),
        (goog.array.binarySelect = function (e, t, r) {
          return goog.array.binarySearch_(e, t, !0, void 0, r);
        }),
        (goog.array.binarySearch_ = function (e, t, r, o, i) {
          for (var n, s = 0, a = e.length; s < a; ) {
            var l = (s + a) >> 1,
              g = r ? t.call(i, e[l], l, e) : t(o, e[l]);
            0 < g ? (s = l + 1) : ((a = l), (n = !g));
          }
          return n ? s : ~s;
        }),
        (goog.array.sort = function (e, t) {
          e.sort(t || goog.array.defaultCompare);
        }),
        (goog.array.stableSort = function (e, t) {
          for (var r = Array(e.length), o = 0; o < e.length; o++)
            r[o] = { index: o, value: e[o] };
          var i = t || goog.array.defaultCompare;
          for (
            goog.array.sort(r, function (e, t) {
              return i(e.value, t.value) || e.index - t.index;
            }),
              o = 0;
            o < e.length;
            o++
          )
            e[o] = r[o].value;
        }),
        (goog.array.sortByKey = function (e, t, r) {
          var o = r || goog.array.defaultCompare;
          goog.array.sort(e, function (e, r) {
            return o(t(e), t(r));
          });
        }),
        (goog.array.sortObjectsByKey = function (e, t, r) {
          goog.array.sortByKey(
            e,
            function (e) {
              return e[t];
            },
            r
          );
        }),
        (goog.array.isSorted = function (e, t, r) {
          t = t || goog.array.defaultCompare;
          for (var o = 1; o < e.length; o++) {
            var i = t(e[o - 1], e[o]);
            if (0 < i || (0 == i && r)) return !1;
          }
          return !0;
        }),
        (goog.array.equals = function (e, t, r) {
          if (
            !goog.isArrayLike(e) ||
            !goog.isArrayLike(t) ||
            e.length != t.length
          )
            return !1;
          var o = e.length;
          r = r || goog.array.defaultCompareEquality;
          for (var i = 0; i < o; i++) if (!r(e[i], t[i])) return !1;
          return !0;
        }),
        (goog.array.compare3 = function (e, t, r) {
          r = r || goog.array.defaultCompare;
          for (var o = Math.min(e.length, t.length), i = 0; i < o; i++) {
            var n = r(e[i], t[i]);
            if (0 != n) return n;
          }
          return goog.array.defaultCompare(e.length, t.length);
        }),
        (goog.array.defaultCompare = function (e, t) {
          return e > t ? 1 : e < t ? -1 : 0;
        }),
        (goog.array.inverseDefaultCompare = function (e, t) {
          return -goog.array.defaultCompare(e, t);
        }),
        (goog.array.defaultCompareEquality = function (e, t) {
          return e === t;
        }),
        (goog.array.binaryInsert = function (e, t, r) {
          return (
            0 > (r = goog.array.binarySearch(e, t, r)) &&
            (goog.array.insertAt(e, t, -(r + 1)), !0)
          );
        }),
        (goog.array.binaryRemove = function (e, t, r) {
          return (
            0 <= (t = goog.array.binarySearch(e, t, r)) &&
            goog.array.removeAt(e, t)
          );
        }),
        (goog.array.bucket = function (e, t, r) {
          for (var o = {}, i = 0; i < e.length; i++) {
            var n = e[i],
              s = t.call(r, n, i, e);
            goog.isDef(s) && (o[s] || (o[s] = [])).push(n);
          }
          return o;
        }),
        (goog.array.toObject = function (e, t, r) {
          var o = {};
          return (
            goog.array.forEach(e, function (i, n) {
              o[t.call(r, i, n, e)] = i;
            }),
            o
          );
        }),
        (goog.array.range = function (e, t, r) {
          var o = [],
            i = 0,
            n = e;
          if ((void 0 !== t && ((i = e), (n = t)), 0 > (r = r || 1) * (n - i)))
            return [];
          if (0 < r) for (e = i; e < n; e += r) o.push(e);
          else for (e = i; e > n; e += r) o.push(e);
          return o;
        }),
        (goog.array.repeat = function (e, t) {
          for (var r = [], o = 0; o < t; o++) r[o] = e;
          return r;
        }),
        (goog.array.flatten = function (e) {
          for (var t = [], r = 0; r < arguments.length; r++) {
            var o = arguments[r];
            if (goog.isArray(o))
              for (var i = 0; i < o.length; i += 8192) {
                var n = goog.array.slice(o, i, i + 8192);
                n = goog.array.flatten.apply(null, n);
                for (var s = 0; s < n.length; s++) t.push(n[s]);
              }
            else t.push(o);
          }
          return t;
        }),
        (goog.array.rotate = function (e, t) {
          return (
            goog.asserts.assert(null != e.length),
            e.length &&
              (0 < (t %= e.length)
                ? Array.prototype.unshift.apply(e, e.splice(-t, t))
                : 0 > t && Array.prototype.push.apply(e, e.splice(0, -t))),
            e
          );
        }),
        (goog.array.moveItem = function (e, t, r) {
          goog.asserts.assert(0 <= t && t < e.length),
            goog.asserts.assert(0 <= r && r < e.length),
            (t = Array.prototype.splice.call(e, t, 1)),
            Array.prototype.splice.call(e, r, 0, t[0]);
        }),
        (goog.array.zip = function (e) {
          if (!arguments.length) return [];
          for (
            var t = [], r = arguments[0].length, o = 1;
            o < arguments.length;
            o++
          )
            arguments[o].length < r && (r = arguments[o].length);
          for (o = 0; o < r; o++) {
            for (var i = [], n = 0; n < arguments.length; n++)
              i.push(arguments[n][o]);
            t.push(i);
          }
          return t;
        }),
        (goog.array.shuffle = function (e, t) {
          t = t || Math.random;
          for (var r = e.length - 1; 0 < r; r--) {
            var o = Math.floor(t() * (r + 1)),
              i = e[r];
            (e[r] = e[o]), (e[o] = i);
          }
        }),
        (goog.array.copyByIndex = function (e, t) {
          var r = [];
          return (
            goog.array.forEach(t, function (t) {
              r.push(e[t]);
            }),
            r
          );
        }),
        (goog.array.concatMap = function (e, t, r) {
          return goog.array.concat.apply([], goog.array.map(e, t, r));
        }),
        (goog.crypt = {}),
        (goog.crypt.stringToByteArray = function (e) {
          for (var t = [], r = 0, o = 0; o < e.length; o++) {
            var i = e.charCodeAt(o);
            255 < i && ((t[r++] = 255 & i), (i >>= 8)), (t[r++] = i);
          }
          return t;
        }),
        (goog.crypt.byteArrayToString = function (e) {
          if (8192 >= e.length) return String.fromCharCode.apply(null, e);
          for (var t = '', r = 0; r < e.length; r += 8192) {
            var o = goog.array.slice(e, r, r + 8192);
            t += String.fromCharCode.apply(null, o);
          }
          return t;
        }),
        (goog.crypt.byteArrayToHex = function (e, t) {
          return goog.array
            .map(e, function (e) {
              return 1 < (e = e.toString(16)).length ? e : '0' + e;
            })
            .join(t || '');
        }),
        (goog.crypt.hexToByteArray = function (e) {
          goog.asserts.assert(
            0 == e.length % 2,
            'Key string length must be multiple of 2'
          );
          for (var t = [], r = 0; r < e.length; r += 2)
            t.push(parseInt(e.substring(r, r + 2), 16));
          return t;
        }),
        (goog.crypt.stringToUtf8ByteArray = function (e) {
          for (var t = [], r = 0, o = 0; o < e.length; o++) {
            var i = e.charCodeAt(o);
            128 > i
              ? (t[r++] = i)
              : (2048 > i
                  ? (t[r++] = (i >> 6) | 192)
                  : (55296 == (64512 & i) &&
                    o + 1 < e.length &&
                    56320 == (64512 & e.charCodeAt(o + 1))
                      ? ((i =
                          65536 +
                          ((1023 & i) << 10) +
                          (1023 & e.charCodeAt(++o))),
                        (t[r++] = (i >> 18) | 240),
                        (t[r++] = ((i >> 12) & 63) | 128))
                      : (t[r++] = (i >> 12) | 224),
                    (t[r++] = ((i >> 6) & 63) | 128)),
                (t[r++] = (63 & i) | 128));
          }
          return t;
        }),
        (goog.crypt.utf8ByteArrayToString = function (e) {
          for (var t = [], r = 0, o = 0; r < e.length; ) {
            var i = e[r++];
            if (128 > i) t[o++] = String.fromCharCode(i);
            else if (191 < i && 224 > i) {
              var n = e[r++];
              t[o++] = String.fromCharCode(((31 & i) << 6) | (63 & n));
            } else if (239 < i && 365 > i) {
              n = e[r++];
              var s = e[r++];
              (i =
                (((7 & i) << 18) |
                  ((63 & n) << 12) |
                  ((63 & s) << 6) |
                  (63 & e[r++])) -
                65536),
                (t[o++] = String.fromCharCode(55296 + (i >> 10))),
                (t[o++] = String.fromCharCode(56320 + (1023 & i)));
            } else
              (n = e[r++]),
                (s = e[r++]),
                (t[o++] = String.fromCharCode(
                  ((15 & i) << 12) | ((63 & n) << 6) | (63 & s)
                ));
          }
          return t.join('');
        }),
        (goog.crypt.xorByteArray = function (e, t) {
          goog.asserts.assert(
            e.length == t.length,
            'XOR array lengths must match'
          );
          for (var r = [], o = 0; o < e.length; o++) r.push(e[o] ^ t[o]);
          return r;
        }),
        (goog.string = {}),
        (goog.string.internal = {}),
        (goog.string.internal.startsWith = function (e, t) {
          return 0 == e.lastIndexOf(t, 0);
        }),
        (goog.string.internal.endsWith = function (e, t) {
          var r = e.length - t.length;
          return 0 <= r && e.indexOf(t, r) == r;
        }),
        (goog.string.internal.caseInsensitiveStartsWith = function (e, t) {
          return (
            0 ==
            goog.string.internal.caseInsensitiveCompare(
              t,
              e.substr(0, t.length)
            )
          );
        }),
        (goog.string.internal.caseInsensitiveEndsWith = function (e, t) {
          return (
            0 ==
            goog.string.internal.caseInsensitiveCompare(
              t,
              e.substr(e.length - t.length, t.length)
            )
          );
        }),
        (goog.string.internal.caseInsensitiveEquals = function (e, t) {
          return e.toLowerCase() == t.toLowerCase();
        }),
        (goog.string.internal.isEmptyOrWhitespace = function (e) {
          return /^[\s\xa0]*$/.test(e);
        }),
        (goog.string.internal.trim =
          goog.TRUSTED_SITE && String.prototype.trim
            ? function (e) {
                return e.trim();
              }
            : function (e) {
                return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1];
              }),
        (goog.string.internal.caseInsensitiveCompare = function (e, t) {
          return (e = String(e).toLowerCase()) < (t = String(t).toLowerCase())
            ? -1
            : e == t
            ? 0
            : 1;
        }),
        (goog.string.internal.newLineToBr = function (e, t) {
          return e.replace(/(\r\n|\r|\n)/g, t ? '<br />' : '<br>');
        }),
        (goog.string.internal.htmlEscape = function (e, t) {
          if (t)
            e = e
              .replace(goog.string.internal.AMP_RE_, '&amp;')
              .replace(goog.string.internal.LT_RE_, '&lt;')
              .replace(goog.string.internal.GT_RE_, '&gt;')
              .replace(goog.string.internal.QUOT_RE_, '&quot;')
              .replace(goog.string.internal.SINGLE_QUOTE_RE_, '&#39;')
              .replace(goog.string.internal.NULL_RE_, '&#0;');
          else {
            if (!goog.string.internal.ALL_RE_.test(e)) return e;
            -1 != e.indexOf('&') &&
              (e = e.replace(goog.string.internal.AMP_RE_, '&amp;')),
              -1 != e.indexOf('<') &&
                (e = e.replace(goog.string.internal.LT_RE_, '&lt;')),
              -1 != e.indexOf('>') &&
                (e = e.replace(goog.string.internal.GT_RE_, '&gt;')),
              -1 != e.indexOf('"') &&
                (e = e.replace(goog.string.internal.QUOT_RE_, '&quot;')),
              -1 != e.indexOf("'") &&
                (e = e.replace(goog.string.internal.SINGLE_QUOTE_RE_, '&#39;')),
              -1 != e.indexOf('\0') &&
                (e = e.replace(goog.string.internal.NULL_RE_, '&#0;'));
          }
          return e;
        }),
        (goog.string.internal.AMP_RE_ = /&/g),
        (goog.string.internal.LT_RE_ = /</g),
        (goog.string.internal.GT_RE_ = />/g),
        (goog.string.internal.QUOT_RE_ = /"/g),
        (goog.string.internal.SINGLE_QUOTE_RE_ = /'/g),
        (goog.string.internal.NULL_RE_ = /\x00/g),
        (goog.string.internal.ALL_RE_ = /[\x00&<>"']/),
        (goog.string.internal.whitespaceEscape = function (e, t) {
          return goog.string.internal.newLineToBr(
            e.replace(/  /g, ' &#160;'),
            t
          );
        }),
        (goog.string.internal.contains = function (e, t) {
          return -1 != e.indexOf(t);
        }),
        (goog.string.internal.caseInsensitiveContains = function (e, t) {
          return goog.string.internal.contains(
            e.toLowerCase(),
            t.toLowerCase()
          );
        }),
        (goog.string.internal.compareVersions = function (e, t) {
          var r = 0;
          (e = goog.string.internal.trim(String(e)).split('.')),
            (t = goog.string.internal.trim(String(t)).split('.'));
          for (
            var o = Math.max(e.length, t.length), i = 0;
            0 == r && i < o;
            i++
          ) {
            var n = e[i] || '',
              s = t[i] || '';
            do {
              if (
                ((n = /(\d*)(\D*)(.*)/.exec(n) || ['', '', '', '']),
                (s = /(\d*)(\D*)(.*)/.exec(s) || ['', '', '', '']),
                0 == n[0].length && 0 == s[0].length)
              )
                break;
              r = 0 == n[1].length ? 0 : parseInt(n[1], 10);
              var a = 0 == s[1].length ? 0 : parseInt(s[1], 10);
              (r =
                goog.string.internal.compareElements_(r, a) ||
                goog.string.internal.compareElements_(
                  0 == n[2].length,
                  0 == s[2].length
                ) ||
                goog.string.internal.compareElements_(n[2], s[2])),
                (n = n[3]),
                (s = s[3]);
            } while (0 == r);
          }
          return r;
        }),
        (goog.string.internal.compareElements_ = function (e, t) {
          return e < t ? -1 : e > t ? 1 : 0;
        }),
        (goog.string.TypedString = function () {}),
        (goog.string.Const = function (e, t) {
          (this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ =
            (e === goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ &&
              t) ||
            ''),
            (this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ =
              goog.string.Const.TYPE_MARKER_);
        }),
        (goog.string.Const.prototype.implementsGoogStringTypedString = !0),
        (goog.string.Const.prototype.getTypedStringValue = function () {
          return this
            .stringConstValueWithSecurityContract__googStringSecurityPrivate_;
        }),
        (goog.string.Const.prototype.toString = function () {
          return (
            'Const{' +
            this
              .stringConstValueWithSecurityContract__googStringSecurityPrivate_ +
            '}'
          );
        }),
        (goog.string.Const.unwrap = function (e) {
          return e instanceof goog.string.Const &&
            e.constructor === goog.string.Const &&
            e.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ ===
              goog.string.Const.TYPE_MARKER_
            ? e.stringConstValueWithSecurityContract__googStringSecurityPrivate_
            : (goog.asserts.fail(
                "expected object of type Const, got '" + e + "'"
              ),
              'type_error:Const');
        }),
        (goog.string.Const.from = function (e) {
          return new goog.string.Const(
            goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_,
            e
          );
        }),
        (goog.string.Const.TYPE_MARKER_ = {}),
        (goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ = {}),
        (goog.string.Const.EMPTY = goog.string.Const.from('')),
        (goog.fs = {}),
        (goog.fs.url = {}),
        (goog.fs.url.createObjectUrl = function (e) {
          return goog.fs.url.getUrlObject_().createObjectURL(e);
        }),
        (goog.fs.url.revokeObjectUrl = function (e) {
          goog.fs.url.getUrlObject_().revokeObjectURL(e);
        }),
        (goog.fs.url.getUrlObject_ = function () {
          var e = goog.fs.url.findUrlObject_();
          if (null != e) return e;
          throw Error("This browser doesn't seem to support blob URLs");
        }),
        (goog.fs.url.findUrlObject_ = function () {
          return goog.isDef(goog.global.URL) &&
            goog.isDef(goog.global.URL.createObjectURL)
            ? goog.global.URL
            : goog.isDef(goog.global.webkitURL) &&
              goog.isDef(goog.global.webkitURL.createObjectURL)
            ? goog.global.webkitURL
            : goog.isDef(goog.global.createObjectURL)
            ? goog.global
            : null;
        }),
        (goog.fs.url.browserSupportsObjectUrls = function () {
          return null != goog.fs.url.findUrlObject_();
        }),
        (goog.html = {}),
        (goog.html.trustedtypes = {}),
        (goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY =
          goog.TRUSTED_TYPES_POLICY_NAME
            ? goog.createTrustedTypesPolicy(
                goog.TRUSTED_TYPES_POLICY_NAME + '#html'
              )
            : null),
        (goog.i18n = {}),
        (goog.i18n.bidi = {}),
        (goog.i18n.bidi.FORCE_RTL = !1),
        (goog.i18n.bidi.IS_RTL =
          goog.i18n.bidi.FORCE_RTL ||
          (('ar' == goog.LOCALE.substring(0, 2).toLowerCase() ||
            'fa' == goog.LOCALE.substring(0, 2).toLowerCase() ||
            'he' == goog.LOCALE.substring(0, 2).toLowerCase() ||
            'iw' == goog.LOCALE.substring(0, 2).toLowerCase() ||
            'ps' == goog.LOCALE.substring(0, 2).toLowerCase() ||
            'sd' == goog.LOCALE.substring(0, 2).toLowerCase() ||
            'ug' == goog.LOCALE.substring(0, 2).toLowerCase() ||
            'ur' == goog.LOCALE.substring(0, 2).toLowerCase() ||
            'yi' == goog.LOCALE.substring(0, 2).toLowerCase()) &&
            (2 == goog.LOCALE.length ||
              '-' == goog.LOCALE.substring(2, 3) ||
              '_' == goog.LOCALE.substring(2, 3))) ||
          (3 <= goog.LOCALE.length &&
            'ckb' == goog.LOCALE.substring(0, 3).toLowerCase() &&
            (3 == goog.LOCALE.length ||
              '-' == goog.LOCALE.substring(3, 4) ||
              '_' == goog.LOCALE.substring(3, 4))) ||
          (7 <= goog.LOCALE.length &&
            ('-' == goog.LOCALE.substring(2, 3) ||
              '_' == goog.LOCALE.substring(2, 3)) &&
            ('adlm' == goog.LOCALE.substring(3, 7).toLowerCase() ||
              'arab' == goog.LOCALE.substring(3, 7).toLowerCase() ||
              'hebr' == goog.LOCALE.substring(3, 7).toLowerCase() ||
              'nkoo' == goog.LOCALE.substring(3, 7).toLowerCase() ||
              'rohg' == goog.LOCALE.substring(3, 7).toLowerCase() ||
              'thaa' == goog.LOCALE.substring(3, 7).toLowerCase())) ||
          (8 <= goog.LOCALE.length &&
            ('-' == goog.LOCALE.substring(3, 4) ||
              '_' == goog.LOCALE.substring(3, 4)) &&
            ('adlm' == goog.LOCALE.substring(4, 8).toLowerCase() ||
              'arab' == goog.LOCALE.substring(4, 8).toLowerCase() ||
              'hebr' == goog.LOCALE.substring(4, 8).toLowerCase() ||
              'nkoo' == goog.LOCALE.substring(4, 8).toLowerCase() ||
              'rohg' == goog.LOCALE.substring(4, 8).toLowerCase() ||
              'thaa' == goog.LOCALE.substring(4, 8).toLowerCase()))),
        (goog.i18n.bidi.Format = {
          LRE: 'â€ª',
          RLE: 'â€«',
          PDF: 'â€¬',
          LRM: 'â€Ž',
          RLM: 'â€',
        }),
        (goog.i18n.bidi.Dir = { LTR: 1, RTL: -1, NEUTRAL: 0 }),
        (goog.i18n.bidi.RIGHT = 'right'),
        (goog.i18n.bidi.LEFT = 'left'),
        (goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL
          ? goog.i18n.bidi.LEFT
          : goog.i18n.bidi.RIGHT),
        (goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL
          ? goog.i18n.bidi.RIGHT
          : goog.i18n.bidi.LEFT),
        (goog.i18n.bidi.toDir = function (e, t) {
          return 'number' == typeof e
            ? 0 < e
              ? goog.i18n.bidi.Dir.LTR
              : 0 > e
              ? goog.i18n.bidi.Dir.RTL
              : t
              ? null
              : goog.i18n.bidi.Dir.NEUTRAL
            : null == e
            ? null
            : e
            ? goog.i18n.bidi.Dir.RTL
            : goog.i18n.bidi.Dir.LTR;
        }),
        (goog.i18n.bidi.ltrChars_ =
          'A-Za-zÃ€-Ã–Ã˜-Ã¶Ã¸-Ê¸Ì€-Öà¤€-á¿¿â€Žâ°€-\ud801\ud804-\ud839\ud83c-\udbffï¤€-ï¬œï¸€-ï¹¯ï»½-ï¿¿'),
        (goog.i18n.bidi.rtlChars_ =
          'Ö‘-Û¯Ûº-à£¿â€\ud802-\ud803\ud83a-\ud83bï¬-ï·¿ï¹°-ï»¼'),
        (goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g),
        (goog.i18n.bidi.stripHtmlIfNeeded_ = function (e, t) {
          return t ? e.replace(goog.i18n.bidi.htmlSkipReg_, '') : e;
        }),
        (goog.i18n.bidi.rtlCharReg_ = new RegExp(
          '[' + goog.i18n.bidi.rtlChars_ + ']'
        )),
        (goog.i18n.bidi.ltrCharReg_ = new RegExp(
          '[' + goog.i18n.bidi.ltrChars_ + ']'
        )),
        (goog.i18n.bidi.hasAnyRtl = function (e, t) {
          return goog.i18n.bidi.rtlCharReg_.test(
            goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
          );
        }),
        (goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl),
        (goog.i18n.bidi.hasAnyLtr = function (e, t) {
          return goog.i18n.bidi.ltrCharReg_.test(
            goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
          );
        }),
        (goog.i18n.bidi.ltrRe_ = new RegExp(
          '^[' + goog.i18n.bidi.ltrChars_ + ']'
        )),
        (goog.i18n.bidi.rtlRe_ = new RegExp(
          '^[' + goog.i18n.bidi.rtlChars_ + ']'
        )),
        (goog.i18n.bidi.isRtlChar = function (e) {
          return goog.i18n.bidi.rtlRe_.test(e);
        }),
        (goog.i18n.bidi.isLtrChar = function (e) {
          return goog.i18n.bidi.ltrRe_.test(e);
        }),
        (goog.i18n.bidi.isNeutralChar = function (e) {
          return !goog.i18n.bidi.isLtrChar(e) && !goog.i18n.bidi.isRtlChar(e);
        }),
        (goog.i18n.bidi.ltrDirCheckRe_ = new RegExp(
          '^[^' +
            goog.i18n.bidi.rtlChars_ +
            ']*[' +
            goog.i18n.bidi.ltrChars_ +
            ']'
        )),
        (goog.i18n.bidi.rtlDirCheckRe_ = new RegExp(
          '^[^' +
            goog.i18n.bidi.ltrChars_ +
            ']*[' +
            goog.i18n.bidi.rtlChars_ +
            ']'
        )),
        (goog.i18n.bidi.startsWithRtl = function (e, t) {
          return goog.i18n.bidi.rtlDirCheckRe_.test(
            goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
          );
        }),
        (goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl),
        (goog.i18n.bidi.startsWithLtr = function (e, t) {
          return goog.i18n.bidi.ltrDirCheckRe_.test(
            goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
          );
        }),
        (goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr),
        (goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/),
        (goog.i18n.bidi.isNeutralText = function (e, t) {
          return (
            (e = goog.i18n.bidi.stripHtmlIfNeeded_(e, t)),
            goog.i18n.bidi.isRequiredLtrRe_.test(e) ||
              (!goog.i18n.bidi.hasAnyLtr(e) && !goog.i18n.bidi.hasAnyRtl(e))
          );
        }),
        (goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp(
          '[' +
            goog.i18n.bidi.ltrChars_ +
            '][^' +
            goog.i18n.bidi.rtlChars_ +
            ']*$'
        )),
        (goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp(
          '[' +
            goog.i18n.bidi.rtlChars_ +
            '][^' +
            goog.i18n.bidi.ltrChars_ +
            ']*$'
        )),
        (goog.i18n.bidi.endsWithLtr = function (e, t) {
          return goog.i18n.bidi.ltrExitDirCheckRe_.test(
            goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
          );
        }),
        (goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr),
        (goog.i18n.bidi.endsWithRtl = function (e, t) {
          return goog.i18n.bidi.rtlExitDirCheckRe_.test(
            goog.i18n.bidi.stripHtmlIfNeeded_(e, t)
          );
        }),
        (goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl),
        (goog.i18n.bidi.rtlLocalesRe_ =
          /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i),
        (goog.i18n.bidi.isRtlLanguage = function (e) {
          return goog.i18n.bidi.rtlLocalesRe_.test(e);
        }),
        (goog.i18n.bidi.bracketGuardTextRe_ =
          /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g),
        (goog.i18n.bidi.guardBracketInText = function (e, t) {
          return (
            (t = (void 0 === t ? goog.i18n.bidi.hasAnyRtl(e) : t)
              ? goog.i18n.bidi.Format.RLM
              : goog.i18n.bidi.Format.LRM),
            e.replace(goog.i18n.bidi.bracketGuardTextRe_, t + '$&' + t)
          );
        }),
        (goog.i18n.bidi.enforceRtlInHtml = function (e) {
          return '<' == e.charAt(0)
            ? e.replace(/<\w+/, '$& dir=rtl')
            : '\n<span dir=rtl>' + e + '</span>';
        }),
        (goog.i18n.bidi.enforceRtlInText = function (e) {
          return goog.i18n.bidi.Format.RLE + e + goog.i18n.bidi.Format.PDF;
        }),
        (goog.i18n.bidi.enforceLtrInHtml = function (e) {
          return '<' == e.charAt(0)
            ? e.replace(/<\w+/, '$& dir=ltr')
            : '\n<span dir=ltr>' + e + '</span>';
        }),
        (goog.i18n.bidi.enforceLtrInText = function (e) {
          return goog.i18n.bidi.Format.LRE + e + goog.i18n.bidi.Format.PDF;
        }),
        (goog.i18n.bidi.dimensionsRe_ =
          /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g),
        (goog.i18n.bidi.leftRe_ = /left/gi),
        (goog.i18n.bidi.rightRe_ = /right/gi),
        (goog.i18n.bidi.tempRe_ = /%%%%/g),
        (goog.i18n.bidi.mirrorCSS = function (e) {
          return e
            .replace(goog.i18n.bidi.dimensionsRe_, ':$1 $4 $3 $2')
            .replace(goog.i18n.bidi.leftRe_, '%%%%')
            .replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT)
            .replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
        }),
        (goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g),
        (goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g),
        (goog.i18n.bidi.normalizeHebrewQuote = function (e) {
          return e
            .replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, '$1×´')
            .replace(goog.i18n.bidi.singleQuoteSubstituteRe_, '$1×³');
        }),
        (goog.i18n.bidi.wordSeparatorRe_ = /\s+/),
        (goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/),
        (goog.i18n.bidi.rtlDetectionThreshold_ = 0.4),
        (goog.i18n.bidi.estimateDirection = function (e, t) {
          var r = 0,
            o = 0,
            i = !1;
          for (
            e = goog.i18n.bidi
              .stripHtmlIfNeeded_(e, t)
              .split(goog.i18n.bidi.wordSeparatorRe_),
              t = 0;
            t < e.length;
            t++
          ) {
            var n = e[t];
            goog.i18n.bidi.startsWithRtl(n)
              ? (r++, o++)
              : goog.i18n.bidi.isRequiredLtrRe_.test(n)
              ? (i = !0)
              : goog.i18n.bidi.hasAnyLtr(n)
              ? o++
              : goog.i18n.bidi.hasNumeralsRe_.test(n) && (i = !0);
          }
          return 0 == o
            ? i
              ? goog.i18n.bidi.Dir.LTR
              : goog.i18n.bidi.Dir.NEUTRAL
            : r / o > goog.i18n.bidi.rtlDetectionThreshold_
            ? goog.i18n.bidi.Dir.RTL
            : goog.i18n.bidi.Dir.LTR;
        }),
        (goog.i18n.bidi.detectRtlDirectionality = function (e, t) {
          return (
            goog.i18n.bidi.estimateDirection(e, t) == goog.i18n.bidi.Dir.RTL
          );
        }),
        (goog.i18n.bidi.setElementDirAndAlign = function (e, t) {
          e &&
            (t = goog.i18n.bidi.toDir(t)) &&
            ((e.style.textAlign =
              t == goog.i18n.bidi.Dir.RTL
                ? goog.i18n.bidi.RIGHT
                : goog.i18n.bidi.LEFT),
            (e.dir = t == goog.i18n.bidi.Dir.RTL ? 'rtl' : 'ltr'));
        }),
        (goog.i18n.bidi.setElementDirByTextDirectionality = function (e, t) {
          switch (goog.i18n.bidi.estimateDirection(t)) {
            case goog.i18n.bidi.Dir.LTR:
              e.dir = 'ltr';
              break;
            case goog.i18n.bidi.Dir.RTL:
              e.dir = 'rtl';
              break;
            default:
              e.removeAttribute('dir');
          }
        }),
        (goog.i18n.bidi.DirectionalString = function () {}),
        (goog.html.TrustedResourceUrl = function () {
          (this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = ''),
            (this.trustedURL_ = null),
            (this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
              goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_);
        }),
        (goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString =
          !0),
        (goog.html.TrustedResourceUrl.prototype.getTypedStringValue =
          function () {
            return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString();
          }),
        (goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString =
          !0),
        (goog.html.TrustedResourceUrl.prototype.getDirection = function () {
          return goog.i18n.bidi.Dir.LTR;
        }),
        (goog.html.TrustedResourceUrl.prototype.cloneWithParams = function (
          e,
          t
        ) {
          var r = goog.html.TrustedResourceUrl.unwrap(this),
            o =
              (r = goog.html.TrustedResourceUrl.URL_PARAM_PARSER_.exec(r))[3] ||
              '';
          return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(
            r[1] +
              goog.html.TrustedResourceUrl.stringifyParams_(
                '?',
                r[2] || '',
                e
              ) +
              goog.html.TrustedResourceUrl.stringifyParams_('#', o, t)
          );
        }),
        goog.DEBUG &&
          (goog.html.TrustedResourceUrl.prototype.toString = function () {
            return (
              'TrustedResourceUrl{' +
              this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ +
              '}'
            );
          }),
        (goog.html.TrustedResourceUrl.unwrap = function (e) {
          return goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(
            e
          ).toString();
        }),
        (goog.html.TrustedResourceUrl.unwrapTrustedScriptURL = function (e) {
          return e instanceof goog.html.TrustedResourceUrl &&
            e.constructor === goog.html.TrustedResourceUrl &&
            e.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
              goog.html.TrustedResourceUrl
                .TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
            ? e.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
            : (goog.asserts.fail(
                "expected object of type TrustedResourceUrl, got '" +
                  e +
                  "' of type " +
                  goog.typeOf(e)
              ),
              'type_error:TrustedResourceUrl');
        }),
        (goog.html.TrustedResourceUrl.unwrapTrustedURL = function (e) {
          return e.trustedURL_
            ? e.trustedURL_
            : goog.html.TrustedResourceUrl.unwrap(e);
        }),
        (goog.html.TrustedResourceUrl.format = function (e, t) {
          var r = goog.string.Const.unwrap(e);
          if (!goog.html.TrustedResourceUrl.BASE_URL_.test(r))
            throw Error('Invalid TrustedResourceUrl format: ' + r);
          return (
            (e = r.replace(
              goog.html.TrustedResourceUrl.FORMAT_MARKER_,
              function (e, o) {
                if (!Object.prototype.hasOwnProperty.call(t, o))
                  throw Error(
                    'Found marker, "' +
                      o +
                      '", in format string, "' +
                      r +
                      '", but no valid label mapping found in args: ' +
                      JSON.stringify(t)
                  );
                return (e = t[o]) instanceof goog.string.Const
                  ? goog.string.Const.unwrap(e)
                  : encodeURIComponent(String(e));
              }
            )),
            goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(
              e
            )
          );
        }),
        (goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g),
        (goog.html.TrustedResourceUrl.BASE_URL_ =
          /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i),
        (goog.html.TrustedResourceUrl.URL_PARAM_PARSER_ =
          /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/),
        (goog.html.TrustedResourceUrl.formatWithParams = function (e, t, r, o) {
          return goog.html.TrustedResourceUrl.format(e, t).cloneWithParams(
            r,
            o
          );
        }),
        (goog.html.TrustedResourceUrl.fromConstant = function (e) {
          return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(
            goog.string.Const.unwrap(e)
          );
        }),
        (goog.html.TrustedResourceUrl.fromConstants = function (e) {
          for (var t = '', r = 0; r < e.length; r++)
            t += goog.string.Const.unwrap(e[r]);
          return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(
            t
          );
        }),
        (goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
          {}),
        (goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse =
          function (e) {
            var t = new goog.html.TrustedResourceUrl();
            return (
              (t.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = goog
                .html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY
                ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScriptURL(
                    e
                  )
                : e),
              goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY &&
                (t.trustedURL_ =
                  goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createURL(
                    e
                  )),
              t
            );
          }),
        (goog.html.TrustedResourceUrl.stringifyParams_ = function (e, t, r) {
          if (null == r) return t;
          if (goog.isString(r)) return r ? e + encodeURIComponent(r) : '';
          for (var o in r) {
            var i = r[o];
            i = goog.isArray(i) ? i : [i];
            for (var n = 0; n < i.length; n++) {
              var s = i[n];
              null != s &&
                (t || (t = e),
                (t +=
                  (t.length > e.length ? '&' : '') +
                  encodeURIComponent(o) +
                  '=' +
                  encodeURIComponent(String(s))));
            }
          }
          return t;
        }),
        (goog.html.SafeUrl = function () {
          (this.privateDoNotAccessOrElseSafeUrlWrappedValue_ = ''),
            (this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
              goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_);
        }),
        (goog.html.SafeUrl.INNOCUOUS_STRING = 'about:invalid#zClosurez'),
        (goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0),
        (goog.html.SafeUrl.prototype.getTypedStringValue = function () {
          return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
        }),
        (goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString =
          !0),
        (goog.html.SafeUrl.prototype.getDirection = function () {
          return goog.i18n.bidi.Dir.LTR;
        }),
        goog.DEBUG &&
          (goog.html.SafeUrl.prototype.toString = function () {
            return (
              'SafeUrl{' +
              this.privateDoNotAccessOrElseSafeUrlWrappedValue_ +
              '}'
            );
          }),
        (goog.html.SafeUrl.unwrap = function (e) {
          return goog.html.SafeUrl.unwrapTrustedURL(e).toString();
        }),
        (goog.html.SafeUrl.unwrapTrustedURL = function (e) {
          return e instanceof goog.html.SafeUrl &&
            e.constructor === goog.html.SafeUrl &&
            e.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
              goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
            ? e.privateDoNotAccessOrElseSafeUrlWrappedValue_
            : (goog.asserts.fail(
                "expected object of type SafeUrl, got '" +
                  e +
                  "' of type " +
                  goog.typeOf(e)
              ),
              'type_error:SafeUrl');
        }),
        (goog.html.SafeUrl.fromConstant = function (e) {
          return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
            goog.string.Const.unwrap(e)
          );
        }),
        (goog.html.SAFE_MIME_TYPE_PATTERN_ =
          /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-wav|wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime))(?:;\w+=(?:\w+|"[\w;=]+"))*$/i),
        (goog.html.SafeUrl.isSafeMimeType = function (e) {
          return goog.html.SAFE_MIME_TYPE_PATTERN_.test(e);
        }),
        (goog.html.SafeUrl.fromBlob = function (e) {
          return (
            (e = goog.html.SAFE_MIME_TYPE_PATTERN_.test(e.type)
              ? goog.fs.url.createObjectUrl(e)
              : goog.html.SafeUrl.INNOCUOUS_STRING),
            goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e)
          );
        }),
        (goog.html.DATA_URL_PATTERN_ = /^data:([^,]*);base64,[a-z0-9+\/]+=*$/i),
        (goog.html.SafeUrl.fromDataUrl = function (e) {
          var t = (e = e.replace(/(%0A|%0D)/g, '')).match(
            goog.html.DATA_URL_PATTERN_
          );
          return (
            (t = t && goog.html.SAFE_MIME_TYPE_PATTERN_.test(t[1])),
            goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
              t ? e : goog.html.SafeUrl.INNOCUOUS_STRING
            )
          );
        }),
        (goog.html.SafeUrl.fromTelUrl = function (e) {
          return (
            goog.string.internal.caseInsensitiveStartsWith(e, 'tel:') ||
              (e = goog.html.SafeUrl.INNOCUOUS_STRING),
            goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e)
          );
        }),
        (goog.html.SIP_URL_PATTERN_ =
          /^sip[s]?:[+a-z0-9_.!$%&'*\/=^`{|}~-]+@([a-z0-9-]+\.)+[a-z0-9]{2,63}$/i),
        (goog.html.SafeUrl.fromSipUrl = function (e) {
          return (
            goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(e)) ||
              (e = goog.html.SafeUrl.INNOCUOUS_STRING),
            goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e)
          );
        }),
        (goog.html.SafeUrl.fromFacebookMessengerUrl = function (e) {
          return (
            goog.string.internal.caseInsensitiveStartsWith(
              e,
              'fb-messenger://share'
            ) || (e = goog.html.SafeUrl.INNOCUOUS_STRING),
            goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e)
          );
        }),
        (goog.html.SafeUrl.fromWhatsAppUrl = function (e) {
          return (
            goog.string.internal.caseInsensitiveStartsWith(
              e,
              'whatsapp://send'
            ) || (e = goog.html.SafeUrl.INNOCUOUS_STRING),
            goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e)
          );
        }),
        (goog.html.SafeUrl.fromSmsUrl = function (e) {
          return (
            (goog.string.internal.caseInsensitiveStartsWith(e, 'sms:') &&
              goog.html.SafeUrl.isSmsUrlBodyValid_(e)) ||
              (e = goog.html.SafeUrl.INNOCUOUS_STRING),
            goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e)
          );
        }),
        (goog.html.SafeUrl.isSmsUrlBodyValid_ = function (e) {
          var t = e.indexOf('#');
          if ((0 < t && (e = e.substring(0, t)), !(t = e.match(/[?&]body=/gi))))
            return !0;
          if (1 < t.length) return !1;
          if (!(e = e.match(/[?&]body=([^&]*)/)[1])) return !0;
          try {
            decodeURIComponent(e);
          } catch (e) {
            return !1;
          }
          return /^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(e);
        }),
        (goog.html.SafeUrl.fromSshUrl = function (e) {
          return (
            goog.string.internal.caseInsensitiveStartsWith(e, 'ssh://') ||
              (e = goog.html.SafeUrl.INNOCUOUS_STRING),
            goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(e)
          );
        }),
        (goog.html.SafeUrl.sanitizeChromeExtensionUrl = function (e, t) {
          return goog.html.SafeUrl.sanitizeExtensionUrl_(
            /^chrome-extension:\/\/([^\/]+)\//,
            e,
            t
          );
        }),
        (goog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function (e, t) {
          return goog.html.SafeUrl.sanitizeExtensionUrl_(
            /^moz-extension:\/\/([^\/]+)\//,
            e,
            t
          );
        }),
        (goog.html.SafeUrl.sanitizeEdgeExtensionUrl = function (e, t) {
          return goog.html.SafeUrl.sanitizeExtensionUrl_(
            /^ms-browser-extension:\/\/([^\/]+)\//,
            e,
            t
          );
        }),
        (goog.html.SafeUrl.sanitizeExtensionUrl_ = function (e, t, r) {
          return (
            (e = e.exec(t))
              ? ((e = e[1]),
                -1 ==
                  (r instanceof goog.string.Const
                    ? [goog.string.Const.unwrap(r)]
                    : r.map(function (e) {
                        return goog.string.Const.unwrap(e);
                      })
                  ).indexOf(e) && (t = goog.html.SafeUrl.INNOCUOUS_STRING))
              : (t = goog.html.SafeUrl.INNOCUOUS_STRING),
            goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(t)
          );
        }),
        (goog.html.SafeUrl.fromTrustedResourceUrl = function (e) {
          return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
            goog.html.TrustedResourceUrl.unwrap(e)
          );
        }),
        (goog.html.SAFE_URL_PATTERN_ =
          /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i),
        (goog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_),
        (goog.html.SafeUrl.sanitize = function (e) {
          return e instanceof goog.html.SafeUrl
            ? e
            : ((e =
                'object' == typeof e && e.implementsGoogStringTypedString
                  ? e.getTypedStringValue()
                  : String(e)),
              goog.html.SAFE_URL_PATTERN_.test(e) ||
                (e = goog.html.SafeUrl.INNOCUOUS_STRING),
              goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                e
              ));
        }),
        (goog.html.SafeUrl.sanitizeAssertUnchanged = function (e, t) {
          return e instanceof goog.html.SafeUrl
            ? e
            : ((e =
                'object' == typeof e && e.implementsGoogStringTypedString
                  ? e.getTypedStringValue()
                  : String(e)),
              t &&
              /^data:/i.test(e) &&
              (t = goog.html.SafeUrl.fromDataUrl(e)).getTypedStringValue() == e
                ? t
                : (goog.asserts.assert(
                    goog.html.SAFE_URL_PATTERN_.test(e),
                    '%s does not match the safe URL pattern',
                    e
                  ) || (e = goog.html.SafeUrl.INNOCUOUS_STRING),
                  goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
                    e
                  )));
        }),
        (goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}),
        (goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse =
          function (e) {
            var t = new goog.html.SafeUrl();
            return (
              (t.privateDoNotAccessOrElseSafeUrlWrappedValue_ = goog.html
                .trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY
                ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createURL(
                    e
                  )
                : e),
              t
            );
          }),
        (goog.html.SafeUrl.ABOUT_BLANK =
          goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
            'about:blank'
          )),
        (goog.html.SafeStyle = function () {
          (this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = ''),
            (this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
              goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_);
        }),
        (goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0),
        (goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}),
        (goog.html.SafeStyle.fromConstant = function (e) {
          return 0 === (e = goog.string.Const.unwrap(e)).length
            ? goog.html.SafeStyle.EMPTY
            : (goog.asserts.assert(
                goog.string.internal.endsWith(e, ';'),
                "Last character of style string is not ';': " + e
              ),
              goog.asserts.assert(
                goog.string.internal.contains(e, ':'),
                'Style string must contain at least one \':\', to specify a "name: value" pair: ' +
                  e
              ),
              goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
                e
              ));
        }),
        (goog.html.SafeStyle.prototype.getTypedStringValue = function () {
          return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
        }),
        goog.DEBUG &&
          (goog.html.SafeStyle.prototype.toString = function () {
            return (
              'SafeStyle{' +
              this.privateDoNotAccessOrElseSafeStyleWrappedValue_ +
              '}'
            );
          }),
        (goog.html.SafeStyle.unwrap = function (e) {
          return e instanceof goog.html.SafeStyle &&
            e.constructor === goog.html.SafeStyle &&
            e.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
              goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
            ? e.privateDoNotAccessOrElseSafeStyleWrappedValue_
            : (goog.asserts.fail(
                "expected object of type SafeStyle, got '" +
                  e +
                  "' of type " +
                  goog.typeOf(e)
              ),
              'type_error:SafeStyle');
        }),
        (goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse =
          function (e) {
            return new goog.html.SafeStyle().initSecurityPrivateDoNotAccessOrElse_(
              e
            );
          }),
        (goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ =
          function (e) {
            return (
              (this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = e), this
            );
          }),
        (goog.html.SafeStyle.EMPTY =
          goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
            ''
          )),
        (goog.html.SafeStyle.INNOCUOUS_STRING = 'zClosurez'),
        (goog.html.SafeStyle.create = function (e) {
          var t,
            r = '';
          for (t in e) {
            if (!/^[-_a-zA-Z0-9]+$/.test(t))
              throw Error('Name allows only [-_a-zA-Z0-9], got: ' + t);
            var o = e[t];
            null != o &&
              (r +=
                t +
                ':' +
                (o = goog.isArray(o)
                  ? goog.array
                      .map(o, goog.html.SafeStyle.sanitizePropertyValue_)
                      .join(' ')
                  : goog.html.SafeStyle.sanitizePropertyValue_(o)) +
                ';');
          }
          return r
            ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
                r
              )
            : goog.html.SafeStyle.EMPTY;
        }),
        (goog.html.SafeStyle.sanitizePropertyValue_ = function (e) {
          if (e instanceof goog.html.SafeUrl)
            return (
              'url("' +
              goog.html.SafeUrl.unwrap(e)
                .replace(/</g, '%3c')
                .replace(/[\\"]/g, '\\$&') +
              '")'
            );
          if (
            ((e =
              e instanceof goog.string.Const
                ? goog.string.Const.unwrap(e)
                : goog.html.SafeStyle.sanitizePropertyValueString_(String(e))),
            /[{;}]/.test(e))
          )
            throw new goog.asserts.AssertionError(
              'Value does not allow [{;}], got: %s.',
              [e]
            );
          return e;
        }),
        (goog.html.SafeStyle.sanitizePropertyValueString_ = function (e) {
          var t = e
            .replace(goog.html.SafeStyle.FUNCTIONS_RE_, '$1')
            .replace(goog.html.SafeStyle.FUNCTIONS_RE_, '$1')
            .replace(goog.html.SafeStyle.URL_RE_, 'url');
          return goog.html.SafeStyle.VALUE_RE_.test(t)
            ? goog.html.SafeStyle.COMMENT_RE_.test(e)
              ? (goog.asserts.fail(
                  'String value disallows comments, got: ' + e
                ),
                goog.html.SafeStyle.INNOCUOUS_STRING)
              : goog.html.SafeStyle.hasBalancedQuotes_(e)
              ? goog.html.SafeStyle.hasBalancedSquareBrackets_(e)
                ? goog.html.SafeStyle.sanitizeUrl_(e)
                : (goog.asserts.fail(
                    'String value requires balanced square brackets and one identifier per pair of brackets, got: ' +
                      e
                  ),
                  goog.html.SafeStyle.INNOCUOUS_STRING)
              : (goog.asserts.fail(
                  'String value requires balanced quotes, got: ' + e
                ),
                goog.html.SafeStyle.INNOCUOUS_STRING)
            : (goog.asserts.fail(
                'String value allows only ' +
                  goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ +
                  ' and simple functions, got: ' +
                  e
              ),
              goog.html.SafeStyle.INNOCUOUS_STRING);
        }),
        (goog.html.SafeStyle.hasBalancedQuotes_ = function (e) {
          for (var t = !0, r = !0, o = 0; o < e.length; o++) {
            var i = e.charAt(o);
            "'" == i && r ? (t = !t) : '"' == i && t && (r = !r);
          }
          return t && r;
        }),
        (goog.html.SafeStyle.hasBalancedSquareBrackets_ = function (e) {
          for (var t = !0, r = /^[-_a-zA-Z0-9]$/, o = 0; o < e.length; o++) {
            var i = e.charAt(o);
            if (']' == i) {
              if (t) return !1;
              t = !0;
            } else if ('[' == i) {
              if (!t) return !1;
              t = !1;
            } else if (!t && !r.test(i)) return !1;
          }
          return t;
        }),
        (goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ =
          '[-,."\'%_!# a-zA-Z0-9\\[\\]]'),
        (goog.html.SafeStyle.VALUE_RE_ = new RegExp(
          '^' + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + '+$'
        )),
        (goog.html.SafeStyle.URL_RE_ =
          /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g),
        (goog.html.SafeStyle.FUNCTIONS_RE_ =
          /\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g),
        (goog.html.SafeStyle.COMMENT_RE_ = /\/\*/),
        (goog.html.SafeStyle.sanitizeUrl_ = function (e) {
          return e.replace(goog.html.SafeStyle.URL_RE_, function (e, t, r, o) {
            var i = '';
            return (
              (r = r.replace(/^(['"])(.*)\1$/, function (e, t, r) {
                return (i = t), r;
              })),
              (e = goog.html.SafeUrl.sanitize(r).getTypedStringValue()),
              t + i + e + i + o
            );
          });
        }),
        (goog.html.SafeStyle.concat = function (e) {
          var t = '',
            r = function (e) {
              goog.isArray(e)
                ? goog.array.forEach(e, r)
                : (t += goog.html.SafeStyle.unwrap(e));
            };
          return (
            goog.array.forEach(arguments, r),
            t
              ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
                  t
                )
              : goog.html.SafeStyle.EMPTY
          );
        }),
        (goog.html.SafeScript = function () {
          (this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = ''),
            (this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
              goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_);
        }),
        (goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0),
        (goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}),
        (goog.html.SafeScript.fromConstant = function (e) {
          return 0 === (e = goog.string.Const.unwrap(e)).length
            ? goog.html.SafeScript.EMPTY
            : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
                e
              );
        }),
        (goog.html.SafeScript.fromConstantAndArgs = function (e, t) {
          for (var r = [], o = 1; o < arguments.length; o++)
            r.push(goog.html.SafeScript.stringify_(arguments[o]));
          return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
            '(' + goog.string.Const.unwrap(e) + ')(' + r.join(', ') + ');'
          );
        }),
        (goog.html.SafeScript.fromJson = function (e) {
          return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
            goog.html.SafeScript.stringify_(e)
          );
        }),
        (goog.html.SafeScript.prototype.getTypedStringValue = function () {
          return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString();
        }),
        goog.DEBUG &&
          (goog.html.SafeScript.prototype.toString = function () {
            return (
              'SafeScript{' +
              this.privateDoNotAccessOrElseSafeScriptWrappedValue_ +
              '}'
            );
          }),
        (goog.html.SafeScript.unwrap = function (e) {
          return goog.html.SafeScript.unwrapTrustedScript(e).toString();
        }),
        (goog.html.SafeScript.unwrapTrustedScript = function (e) {
          return e instanceof goog.html.SafeScript &&
            e.constructor === goog.html.SafeScript &&
            e.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
              goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
            ? e.privateDoNotAccessOrElseSafeScriptWrappedValue_
            : (goog.asserts.fail(
                "expected object of type SafeScript, got '" +
                  e +
                  "' of type " +
                  goog.typeOf(e)
              ),
              'type_error:SafeScript');
        }),
        (goog.html.SafeScript.stringify_ = function (e) {
          return JSON.stringify(e).replace(/</g, '\\x3c');
        }),
        (goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse =
          function (e) {
            return new goog.html.SafeScript().initSecurityPrivateDoNotAccessOrElse_(
              e
            );
          }),
        (goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ =
          function (e) {
            return (
              (this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = goog.html
                .trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY
                ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScript(
                    e
                  )
                : e),
              this
            );
          }),
        (goog.html.SafeScript.EMPTY =
          goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
            ''
          )),
        (goog.object = {}),
        (goog.object.is = function (e, t) {
          return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
        }),
        (goog.object.forEach = function (e, t, r) {
          for (var o in e) t.call(r, e[o], o, e);
        }),
        (goog.object.filter = function (e, t, r) {
          var o,
            i = {};
          for (o in e) t.call(r, e[o], o, e) && (i[o] = e[o]);
          return i;
        }),
        (goog.object.map = function (e, t, r) {
          var o,
            i = {};
          for (o in e) i[o] = t.call(r, e[o], o, e);
          return i;
        }),
        (goog.object.some = function (e, t, r) {
          for (var o in e) if (t.call(r, e[o], o, e)) return !0;
          return !1;
        }),
        (goog.object.every = function (e, t, r) {
          for (var o in e) if (!t.call(r, e[o], o, e)) return !1;
          return !0;
        }),
        (goog.object.getCount = function (e) {
          var t,
            r = 0;
          for (t in e) r++;
          return r;
        }),
        (goog.object.getAnyKey = function (e) {
          for (var t in e) return t;
        }),
        (goog.object.getAnyValue = function (e) {
          for (var t in e) return e[t];
        }),
        (goog.object.contains = function (e, t) {
          return goog.object.containsValue(e, t);
        }),
        (goog.object.getValues = function (e) {
          var t,
            r = [],
            o = 0;
          for (t in e) r[o++] = e[t];
          return r;
        }),
        (goog.object.getKeys = function (e) {
          var t,
            r = [],
            o = 0;
          for (t in e) r[o++] = t;
          return r;
        }),
        (goog.object.getValueByKeys = function (e, t) {
          var r = goog.isArrayLike(t),
            o = r ? t : arguments;
          for (r = r ? 0 : 1; r < o.length; r++) {
            if (null == e) return;
            e = e[o[r]];
          }
          return e;
        }),
        (goog.object.containsKey = function (e, t) {
          return null !== e && t in e;
        }),
        (goog.object.containsValue = function (e, t) {
          for (var r in e) if (e[r] == t) return !0;
          return !1;
        }),
        (goog.object.findKey = function (e, t, r) {
          for (var o in e) if (t.call(r, e[o], o, e)) return o;
        }),
        (goog.object.findValue = function (e, t, r) {
          return (t = goog.object.findKey(e, t, r)) && e[t];
        }),
        (goog.object.isEmpty = function (e) {
          for (var t in e) return !1;
          return !0;
        }),
        (goog.object.clear = function (e) {
          for (var t in e) delete e[t];
        }),
        (goog.object.remove = function (e, t) {
          var r;
          return (r = t in e) && delete e[t], r;
        }),
        (goog.object.add = function (e, t, r) {
          if (null !== e && t in e)
            throw Error('The object already contains the key "' + t + '"');
          goog.object.set(e, t, r);
        }),
        (goog.object.get = function (e, t, r) {
          return null !== e && t in e ? e[t] : r;
        }),
        (goog.object.set = function (e, t, r) {
          e[t] = r;
        }),
        (goog.object.setIfUndefined = function (e, t, r) {
          return t in e ? e[t] : (e[t] = r);
        }),
        (goog.object.setWithReturnValueIfNotSet = function (e, t, r) {
          return t in e ? e[t] : ((r = r()), (e[t] = r));
        }),
        (goog.object.equals = function (e, t) {
          for (var r in e) if (!(r in t) || e[r] !== t[r]) return !1;
          for (var o in t) if (!(o in e)) return !1;
          return !0;
        }),
        (goog.object.clone = function (e) {
          var t,
            r = {};
          for (t in e) r[t] = e[t];
          return r;
        }),
        (goog.object.unsafeClone = function (e) {
          var t = goog.typeOf(e);
          if ('object' == t || 'array' == t) {
            if (goog.isFunction(e.clone)) return e.clone();
            for (var r in ((t = 'array' == t ? [] : {}), e))
              t[r] = goog.object.unsafeClone(e[r]);
            return t;
          }
          return e;
        }),
        (goog.object.transpose = function (e) {
          var t,
            r = {};
          for (t in e) r[e[t]] = t;
          return r;
        }),
        (goog.object.PROTOTYPE_FIELDS_ =
          'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(
            ' '
          )),
        (goog.object.extend = function (e, t) {
          for (var r, o, i = 1; i < arguments.length; i++) {
            for (r in (o = arguments[i])) e[r] = o[r];
            for (var n = 0; n < goog.object.PROTOTYPE_FIELDS_.length; n++)
              (r = goog.object.PROTOTYPE_FIELDS_[n]),
                Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
          }
        }),
        (goog.object.create = function (e) {
          var t = arguments.length;
          if (1 == t && goog.isArray(arguments[0]))
            return goog.object.create.apply(null, arguments[0]);
          if (t % 2) throw Error('Uneven number of arguments');
          for (var r = {}, o = 0; o < t; o += 2)
            r[arguments[o]] = arguments[o + 1];
          return r;
        }),
        (goog.object.createSet = function (e) {
          var t = arguments.length;
          if (1 == t && goog.isArray(arguments[0]))
            return goog.object.createSet.apply(null, arguments[0]);
          for (var r = {}, o = 0; o < t; o++) r[arguments[o]] = !0;
          return r;
        }),
        (goog.object.createImmutableView = function (e) {
          var t = e;
          return (
            Object.isFrozen &&
              !Object.isFrozen(e) &&
              ((t = Object.create(e)), Object.freeze(t)),
            t
          );
        }),
        (goog.object.isImmutableView = function (e) {
          return !!Object.isFrozen && Object.isFrozen(e);
        }),
        (goog.object.getAllPropertyNames = function (e, t, r) {
          if (!e) return [];
          if (!Object.getOwnPropertyNames || !Object.getPrototypeOf)
            return goog.object.getKeys(e);
          for (
            var o = {};
            e &&
            (e !== Object.prototype || t) &&
            (e !== Function.prototype || r);

          ) {
            for (
              var i = Object.getOwnPropertyNames(e), n = 0;
              n < i.length;
              n++
            )
              o[i[n]] = !0;
            e = Object.getPrototypeOf(e);
          }
          return goog.object.getKeys(o);
        }),
        (goog.object.getSuperClass = function (e) {
          return (e = Object.getPrototypeOf(e.prototype)) && e.constructor;
        }),
        (goog.html.SafeStyleSheet = function () {
          (this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = ''),
            (this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
              goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_);
        }),
        (goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString =
          !0),
        (goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}),
        (goog.html.SafeStyleSheet.createRule = function (e, t) {
          if (goog.string.internal.contains(e, '<'))
            throw Error("Selector does not allow '<', got: " + e);
          var r = e.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, '');
          if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(r))
            throw Error(
              'Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: ' +
                e
            );
          if (!goog.html.SafeStyleSheet.hasBalancedBrackets_(r))
            throw Error('() and [] in selector must be balanced, got: ' + e);
          return (
            t instanceof goog.html.SafeStyle ||
              (t = goog.html.SafeStyle.create(t)),
            (e =
              e +
              '{' +
              goog.html.SafeStyle.unwrap(t).replace(/</g, '\\3C ') +
              '}'),
            goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(
              e
            )
          );
        }),
        (goog.html.SafeStyleSheet.hasBalancedBrackets_ = function (e) {
          for (
            var t = { '(': ')', '[': ']' }, r = [], o = 0;
            o < e.length;
            o++
          ) {
            var i = e[o];
            if (t[i]) r.push(t[i]);
            else if (goog.object.contains(t, i) && r.pop() != i) return !1;
          }
          return 0 == r.length;
        }),
        (goog.html.SafeStyleSheet.concat = function (e) {
          var t = '',
            r = function (e) {
              goog.isArray(e)
                ? goog.array.forEach(e, r)
                : (t += goog.html.SafeStyleSheet.unwrap(e));
            };
          return (
            goog.array.forEach(arguments, r),
            goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(
              t
            )
          );
        }),
        (goog.html.SafeStyleSheet.fromConstant = function (e) {
          return 0 === (e = goog.string.Const.unwrap(e)).length
            ? goog.html.SafeStyleSheet.EMPTY
            : (goog.asserts.assert(
                !goog.string.internal.contains(e, '<'),
                "Forbidden '<' character in style sheet string: " + e
              ),
              goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(
                e
              ));
        }),
        (goog.html.SafeStyleSheet.prototype.getTypedStringValue = function () {
          return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
        }),
        goog.DEBUG &&
          (goog.html.SafeStyleSheet.prototype.toString = function () {
            return (
              'SafeStyleSheet{' +
              this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ +
              '}'
            );
          }),
        (goog.html.SafeStyleSheet.unwrap = function (e) {
          return e instanceof goog.html.SafeStyleSheet &&
            e.constructor === goog.html.SafeStyleSheet &&
            e.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
              goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
            ? e.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
            : (goog.asserts.fail(
                "expected object of type SafeStyleSheet, got '" +
                  e +
                  "' of type " +
                  goog.typeOf(e)
              ),
              'type_error:SafeStyleSheet');
        }),
        (goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse =
          function (e) {
            return new goog.html.SafeStyleSheet().initSecurityPrivateDoNotAccessOrElse_(
              e
            );
          }),
        (goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ =
          function (e) {
            return (
              (this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = e),
              this
            );
          }),
        (goog.html.SafeStyleSheet.EMPTY =
          goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(
            ''
          )),
        (goog.dom.tags = {}),
        (goog.dom.tags.VOID_TAGS_ = {
          area: !0,
          base: !0,
          br: !0,
          col: !0,
          command: !0,
          embed: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
        }),
        (goog.dom.tags.isVoidTag = function (e) {
          return !0 === goog.dom.tags.VOID_TAGS_[e];
        }),
        (goog.dom.HtmlElement = function () {}),
        (goog.dom.TagName = function (e) {
          this.tagName_ = e;
        }),
        (goog.dom.TagName.prototype.toString = function () {
          return this.tagName_;
        }),
        (goog.dom.TagName.A = new goog.dom.TagName('A')),
        (goog.dom.TagName.ABBR = new goog.dom.TagName('ABBR')),
        (goog.dom.TagName.ACRONYM = new goog.dom.TagName('ACRONYM')),
        (goog.dom.TagName.ADDRESS = new goog.dom.TagName('ADDRESS')),
        (goog.dom.TagName.APPLET = new goog.dom.TagName('APPLET')),
        (goog.dom.TagName.AREA = new goog.dom.TagName('AREA')),
        (goog.dom.TagName.ARTICLE = new goog.dom.TagName('ARTICLE')),
        (goog.dom.TagName.ASIDE = new goog.dom.TagName('ASIDE')),
        (goog.dom.TagName.AUDIO = new goog.dom.TagName('AUDIO')),
        (goog.dom.TagName.B = new goog.dom.TagName('B')),
        (goog.dom.TagName.BASE = new goog.dom.TagName('BASE')),
        (goog.dom.TagName.BASEFONT = new goog.dom.TagName('BASEFONT')),
        (goog.dom.TagName.BDI = new goog.dom.TagName('BDI')),
        (goog.dom.TagName.BDO = new goog.dom.TagName('BDO')),
        (goog.dom.TagName.BIG = new goog.dom.TagName('BIG')),
        (goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName('BLOCKQUOTE')),
        (goog.dom.TagName.BODY = new goog.dom.TagName('BODY')),
        (goog.dom.TagName.BR = new goog.dom.TagName('BR')),
        (goog.dom.TagName.BUTTON = new goog.dom.TagName('BUTTON')),
        (goog.dom.TagName.CANVAS = new goog.dom.TagName('CANVAS')),
        (goog.dom.TagName.CAPTION = new goog.dom.TagName('CAPTION')),
        (goog.dom.TagName.CENTER = new goog.dom.TagName('CENTER')),
        (goog.dom.TagName.CITE = new goog.dom.TagName('CITE')),
        (goog.dom.TagName.CODE = new goog.dom.TagName('CODE')),
        (goog.dom.TagName.COL = new goog.dom.TagName('COL')),
        (goog.dom.TagName.COLGROUP = new goog.dom.TagName('COLGROUP')),
        (goog.dom.TagName.COMMAND = new goog.dom.TagName('COMMAND')),
        (goog.dom.TagName.DATA = new goog.dom.TagName('DATA')),
        (goog.dom.TagName.DATALIST = new goog.dom.TagName('DATALIST')),
        (goog.dom.TagName.DD = new goog.dom.TagName('DD')),
        (goog.dom.TagName.DEL = new goog.dom.TagName('DEL')),
        (goog.dom.TagName.DETAILS = new goog.dom.TagName('DETAILS')),
        (goog.dom.TagName.DFN = new goog.dom.TagName('DFN')),
        (goog.dom.TagName.DIALOG = new goog.dom.TagName('DIALOG')),
        (goog.dom.TagName.DIR = new goog.dom.TagName('DIR')),
        (goog.dom.TagName.DIV = new goog.dom.TagName('DIV')),
        (goog.dom.TagName.DL = new goog.dom.TagName('DL')),
        (goog.dom.TagName.DT = new goog.dom.TagName('DT')),
        (goog.dom.TagName.EM = new goog.dom.TagName('EM')),
        (goog.dom.TagName.EMBED = new goog.dom.TagName('EMBED')),
        (goog.dom.TagName.FIELDSET = new goog.dom.TagName('FIELDSET')),
        (goog.dom.TagName.FIGCAPTION = new goog.dom.TagName('FIGCAPTION')),
        (goog.dom.TagName.FIGURE = new goog.dom.TagName('FIGURE')),
        (goog.dom.TagName.FONT = new goog.dom.TagName('FONT')),
        (goog.dom.TagName.FOOTER = new goog.dom.TagName('FOOTER')),
        (goog.dom.TagName.FORM = new goog.dom.TagName('FORM')),
        (goog.dom.TagName.FRAME = new goog.dom.TagName('FRAME')),
        (goog.dom.TagName.FRAMESET = new goog.dom.TagName('FRAMESET')),
        (goog.dom.TagName.H1 = new goog.dom.TagName('H1')),
        (goog.dom.TagName.H2 = new goog.dom.TagName('H2')),
        (goog.dom.TagName.H3 = new goog.dom.TagName('H3')),
        (goog.dom.TagName.H4 = new goog.dom.TagName('H4')),
        (goog.dom.TagName.H5 = new goog.dom.TagName('H5')),
        (goog.dom.TagName.H6 = new goog.dom.TagName('H6')),
        (goog.dom.TagName.HEAD = new goog.dom.TagName('HEAD')),
        (goog.dom.TagName.HEADER = new goog.dom.TagName('HEADER')),
        (goog.dom.TagName.HGROUP = new goog.dom.TagName('HGROUP')),
        (goog.dom.TagName.HR = new goog.dom.TagName('HR')),
        (goog.dom.TagName.HTML = new goog.dom.TagName('HTML')),
        (goog.dom.TagName.I = new goog.dom.TagName('I')),
        (goog.dom.TagName.IFRAME = new goog.dom.TagName('IFRAME')),
        (goog.dom.TagName.IMG = new goog.dom.TagName('IMG')),
        (goog.dom.TagName.INPUT = new goog.dom.TagName('INPUT')),
        (goog.dom.TagName.INS = new goog.dom.TagName('INS')),
        (goog.dom.TagName.ISINDEX = new goog.dom.TagName('ISINDEX')),
        (goog.dom.TagName.KBD = new goog.dom.TagName('KBD')),
        (goog.dom.TagName.KEYGEN = new goog.dom.TagName('KEYGEN')),
        (goog.dom.TagName.LABEL = new goog.dom.TagName('LABEL')),
        (goog.dom.TagName.LEGEND = new goog.dom.TagName('LEGEND')),
        (goog.dom.TagName.LI = new goog.dom.TagName('LI')),
        (goog.dom.TagName.LINK = new goog.dom.TagName('LINK')),
        (goog.dom.TagName.MAIN = new goog.dom.TagName('MAIN')),
        (goog.dom.TagName.MAP = new goog.dom.TagName('MAP')),
        (goog.dom.TagName.MARK = new goog.dom.TagName('MARK')),
        (goog.dom.TagName.MATH = new goog.dom.TagName('MATH')),
        (goog.dom.TagName.MENU = new goog.dom.TagName('MENU')),
        (goog.dom.TagName.MENUITEM = new goog.dom.TagName('MENUITEM')),
        (goog.dom.TagName.META = new goog.dom.TagName('META')),
        (goog.dom.TagName.METER = new goog.dom.TagName('METER')),
        (goog.dom.TagName.NAV = new goog.dom.TagName('NAV')),
        (goog.dom.TagName.NOFRAMES = new goog.dom.TagName('NOFRAMES')),
        (goog.dom.TagName.NOSCRIPT = new goog.dom.TagName('NOSCRIPT')),
        (goog.dom.TagName.OBJECT = new goog.dom.TagName('OBJECT')),
        (goog.dom.TagName.OL = new goog.dom.TagName('OL')),
        (goog.dom.TagName.OPTGROUP = new goog.dom.TagName('OPTGROUP')),
        (goog.dom.TagName.OPTION = new goog.dom.TagName('OPTION')),
        (goog.dom.TagName.OUTPUT = new goog.dom.TagName('OUTPUT')),
        (goog.dom.TagName.P = new goog.dom.TagName('P')),
        (goog.dom.TagName.PARAM = new goog.dom.TagName('PARAM')),
        (goog.dom.TagName.PICTURE = new goog.dom.TagName('PICTURE')),
        (goog.dom.TagName.PRE = new goog.dom.TagName('PRE')),
        (goog.dom.TagName.PROGRESS = new goog.dom.TagName('PROGRESS')),
        (goog.dom.TagName.Q = new goog.dom.TagName('Q')),
        (goog.dom.TagName.RP = new goog.dom.TagName('RP')),
        (goog.dom.TagName.RT = new goog.dom.TagName('RT')),
        (goog.dom.TagName.RTC = new goog.dom.TagName('RTC')),
        (goog.dom.TagName.RUBY = new goog.dom.TagName('RUBY')),
        (goog.dom.TagName.S = new goog.dom.TagName('S')),
        (goog.dom.TagName.SAMP = new goog.dom.TagName('SAMP')),
        (goog.dom.TagName.SCRIPT = new goog.dom.TagName('SCRIPT')),
        (goog.dom.TagName.SECTION = new goog.dom.TagName('SECTION')),
        (goog.dom.TagName.SELECT = new goog.dom.TagName('SELECT')),
        (goog.dom.TagName.SMALL = new goog.dom.TagName('SMALL')),
        (goog.dom.TagName.SOURCE = new goog.dom.TagName('SOURCE')),
        (goog.dom.TagName.SPAN = new goog.dom.TagName('SPAN')),
        (goog.dom.TagName.STRIKE = new goog.dom.TagName('STRIKE')),
        (goog.dom.TagName.STRONG = new goog.dom.TagName('STRONG')),
        (goog.dom.TagName.STYLE = new goog.dom.TagName('STYLE')),
        (goog.dom.TagName.SUB = new goog.dom.TagName('SUB')),
        (goog.dom.TagName.SUMMARY = new goog.dom.TagName('SUMMARY')),
        (goog.dom.TagName.SUP = new goog.dom.TagName('SUP')),
        (goog.dom.TagName.SVG = new goog.dom.TagName('SVG')),
        (goog.dom.TagName.TABLE = new goog.dom.TagName('TABLE')),
        (goog.dom.TagName.TBODY = new goog.dom.TagName('TBODY')),
        (goog.dom.TagName.TD = new goog.dom.TagName('TD')),
        (goog.dom.TagName.TEMPLATE = new goog.dom.TagName('TEMPLATE')),
        (goog.dom.TagName.TEXTAREA = new goog.dom.TagName('TEXTAREA')),
        (goog.dom.TagName.TFOOT = new goog.dom.TagName('TFOOT')),
        (goog.dom.TagName.TH = new goog.dom.TagName('TH')),
        (goog.dom.TagName.THEAD = new goog.dom.TagName('THEAD')),
        (goog.dom.TagName.TIME = new goog.dom.TagName('TIME')),
        (goog.dom.TagName.TITLE = new goog.dom.TagName('TITLE')),
        (goog.dom.TagName.TR = new goog.dom.TagName('TR')),
        (goog.dom.TagName.TRACK = new goog.dom.TagName('TRACK')),
        (goog.dom.TagName.TT = new goog.dom.TagName('TT')),
        (goog.dom.TagName.U = new goog.dom.TagName('U')),
        (goog.dom.TagName.UL = new goog.dom.TagName('UL')),
        (goog.dom.TagName.VAR = new goog.dom.TagName('VAR')),
        (goog.dom.TagName.VIDEO = new goog.dom.TagName('VIDEO')),
        (goog.dom.TagName.WBR = new goog.dom.TagName('WBR')),
        (goog.labs = {}),
        (goog.labs.userAgent = {}),
        (goog.labs.userAgent.util = {}),
        (goog.labs.userAgent.util.getNativeUserAgentString_ = function () {
          var e = goog.labs.userAgent.util.getNavigator_();
          return e && (e = e.userAgent) ? e : '';
        }),
        (goog.labs.userAgent.util.getNavigator_ = function () {
          return goog.global.navigator;
        }),
        (goog.labs.userAgent.util.userAgent_ =
          goog.labs.userAgent.util.getNativeUserAgentString_()),
        (goog.labs.userAgent.util.setUserAgent = function (e) {
          goog.labs.userAgent.util.userAgent_ =
            e || goog.labs.userAgent.util.getNativeUserAgentString_();
        }),
        (goog.labs.userAgent.util.getUserAgent = function () {
          return goog.labs.userAgent.util.userAgent_;
        }),
        (goog.labs.userAgent.util.matchUserAgent = function (e) {
          var t = goog.labs.userAgent.util.getUserAgent();
          return goog.string.internal.contains(t, e);
        }),
        (goog.labs.userAgent.util.matchUserAgentIgnoreCase = function (e) {
          var t = goog.labs.userAgent.util.getUserAgent();
          return goog.string.internal.caseInsensitiveContains(t, e);
        }),
        (goog.labs.userAgent.util.extractVersionTuples = function (e) {
          for (
            var t, r = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, o = [];
            (t = r.exec(e));

          )
            o.push([t[1], t[2], t[3] || void 0]);
          return o;
        }),
        (goog.labs.userAgent.browser = {}),
        (goog.labs.userAgent.browser.matchOpera_ = function () {
          return goog.labs.userAgent.util.matchUserAgent('Opera');
        }),
        (goog.labs.userAgent.browser.matchIE_ = function () {
          return (
            goog.labs.userAgent.util.matchUserAgent('Trident') ||
            goog.labs.userAgent.util.matchUserAgent('MSIE')
          );
        }),
        (goog.labs.userAgent.browser.matchEdgeHtml_ = function () {
          return goog.labs.userAgent.util.matchUserAgent('Edge');
        }),
        (goog.labs.userAgent.browser.matchEdgeChromium_ = function () {
          return goog.labs.userAgent.util.matchUserAgent('Edg/');
        }),
        (goog.labs.userAgent.browser.matchOperaChromium_ = function () {
          return goog.labs.userAgent.util.matchUserAgent('OPR');
        }),
        (goog.labs.userAgent.browser.matchFirefox_ = function () {
          return (
            goog.labs.userAgent.util.matchUserAgent('Firefox') ||
            goog.labs.userAgent.util.matchUserAgent('FxiOS')
          );
        }),
        (goog.labs.userAgent.browser.matchSafari_ = function () {
          return (
            goog.labs.userAgent.util.matchUserAgent('Safari') &&
            !(
              goog.labs.userAgent.browser.matchChrome_() ||
              goog.labs.userAgent.browser.matchCoast_() ||
              goog.labs.userAgent.browser.matchOpera_() ||
              goog.labs.userAgent.browser.matchEdgeHtml_() ||
              goog.labs.userAgent.browser.matchEdgeChromium_() ||
              goog.labs.userAgent.browser.matchOperaChromium_() ||
              goog.labs.userAgent.browser.matchFirefox_() ||
              goog.labs.userAgent.browser.isSilk() ||
              goog.labs.userAgent.util.matchUserAgent('Android')
            )
          );
        }),
        (goog.labs.userAgent.browser.matchCoast_ = function () {
          return goog.labs.userAgent.util.matchUserAgent('Coast');
        }),
        (goog.labs.userAgent.browser.matchIosWebview_ = function () {
          return (
            (goog.labs.userAgent.util.matchUserAgent('iPad') ||
              goog.labs.userAgent.util.matchUserAgent('iPhone')) &&
            !goog.labs.userAgent.browser.matchSafari_() &&
            !goog.labs.userAgent.browser.matchChrome_() &&
            !goog.labs.userAgent.browser.matchCoast_() &&
            !goog.labs.userAgent.browser.matchFirefox_() &&
            goog.labs.userAgent.util.matchUserAgent('AppleWebKit')
          );
        }),
        (goog.labs.userAgent.browser.matchChrome_ = function () {
          return (
            (goog.labs.userAgent.util.matchUserAgent('Chrome') ||
              goog.labs.userAgent.util.matchUserAgent('CriOS')) &&
            !goog.labs.userAgent.browser.matchEdgeHtml_()
          );
        }),
        (goog.labs.userAgent.browser.matchAndroidBrowser_ = function () {
          return (
            goog.labs.userAgent.util.matchUserAgent('Android') &&
            !(
              goog.labs.userAgent.browser.isChrome() ||
              goog.labs.userAgent.browser.isFirefox() ||
              goog.labs.userAgent.browser.isOpera() ||
              goog.labs.userAgent.browser.isSilk()
            )
          );
        }),
        (goog.labs.userAgent.browser.isOpera =
          goog.labs.userAgent.browser.matchOpera_),
        (goog.labs.userAgent.browser.isIE =
          goog.labs.userAgent.browser.matchIE_),
        (goog.labs.userAgent.browser.isEdge =
          goog.labs.userAgent.browser.matchEdgeHtml_),
        (goog.labs.userAgent.browser.isEdgeChromium =
          goog.labs.userAgent.browser.matchEdgeChromium_),
        (goog.labs.userAgent.browser.isOperaChromium =
          goog.labs.userAgent.browser.matchOperaChromium_),
        (goog.labs.userAgent.browser.isFirefox =
          goog.labs.userAgent.browser.matchFirefox_),
        (goog.labs.userAgent.browser.isSafari =
          goog.labs.userAgent.browser.matchSafari_),
        (goog.labs.userAgent.browser.isCoast =
          goog.labs.userAgent.browser.matchCoast_),
        (goog.labs.userAgent.browser.isIosWebview =
          goog.labs.userAgent.browser.matchIosWebview_),
        (goog.labs.userAgent.browser.isChrome =
          goog.labs.userAgent.browser.matchChrome_),
        (goog.labs.userAgent.browser.isAndroidBrowser =
          goog.labs.userAgent.browser.matchAndroidBrowser_),
        (goog.labs.userAgent.browser.isSilk = function () {
          return goog.labs.userAgent.util.matchUserAgent('Silk');
        }),
        (goog.labs.userAgent.browser.getVersion = function () {
          function e(e) {
            return (e = goog.array.find(e, o)), r[e] || '';
          }
          var t = goog.labs.userAgent.util.getUserAgent();
          if (goog.labs.userAgent.browser.isIE())
            return goog.labs.userAgent.browser.getIEVersion_(t);
          t = goog.labs.userAgent.util.extractVersionTuples(t);
          var r = {};
          goog.array.forEach(t, function (e) {
            r[e[0]] = e[1];
          });
          var o = goog.partial(goog.object.containsKey, r);
          return goog.labs.userAgent.browser.isOpera()
            ? e(['Version', 'Opera'])
            : goog.labs.userAgent.browser.isEdge()
            ? e(['Edge'])
            : goog.labs.userAgent.browser.isEdgeChromium()
            ? e(['Edg'])
            : goog.labs.userAgent.browser.isChrome()
            ? e(['Chrome', 'CriOS'])
            : ((t = t[2]) && t[1]) || '';
        }),
        (goog.labs.userAgent.browser.isVersionOrHigher = function (e) {
          return (
            0 <=
            goog.string.internal.compareVersions(
              goog.labs.userAgent.browser.getVersion(),
              e
            )
          );
        }),
        (goog.labs.userAgent.browser.getIEVersion_ = function (e) {
          var t = /rv: *([\d\.]*)/.exec(e);
          if (t && t[1]) return t[1];
          t = '';
          var r = /MSIE +([\d\.]+)/.exec(e);
          if (r && r[1])
            if (((e = /Trident\/(\d.\d)/.exec(e)), '7.0' == r[1]))
              if (e && e[1])
                switch (e[1]) {
                  case '4.0':
                    t = '8.0';
                    break;
                  case '5.0':
                    t = '9.0';
                    break;
                  case '6.0':
                    t = '10.0';
                    break;
                  case '7.0':
                    t = '11.0';
                }
              else t = '7.0';
            else t = r[1];
          return t;
        }),
        (goog.html.SafeHtml = function () {
          (this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = ''),
            (this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ =
              goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_),
            (this.dir_ = null);
        }),
        (goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString =
          !0),
        (goog.html.SafeHtml.prototype.getDirection = function () {
          return this.dir_;
        }),
        (goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0),
        (goog.html.SafeHtml.prototype.getTypedStringValue = function () {
          return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString();
        }),
        goog.DEBUG &&
          (goog.html.SafeHtml.prototype.toString = function () {
            return (
              'SafeHtml{' +
              this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ +
              '}'
            );
          }),
        (goog.html.SafeHtml.unwrap = function (e) {
          return goog.html.SafeHtml.unwrapTrustedHTML(e).toString();
        }),
        (goog.html.SafeHtml.unwrapTrustedHTML = function (e) {
          return e instanceof goog.html.SafeHtml &&
            e.constructor === goog.html.SafeHtml &&
            e.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ===
              goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
            ? e.privateDoNotAccessOrElseSafeHtmlWrappedValue_
            : (goog.asserts.fail(
                "expected object of type SafeHtml, got '" +
                  e +
                  "' of type " +
                  goog.typeOf(e)
              ),
              'type_error:SafeHtml');
        }),
        (goog.html.SafeHtml.htmlEscape = function (e) {
          if (e instanceof goog.html.SafeHtml) return e;
          var t = 'object' == typeof e,
            r = null;
          return (
            t &&
              e.implementsGoogI18nBidiDirectionalString &&
              (r = e.getDirection()),
            (e =
              t && e.implementsGoogStringTypedString
                ? e.getTypedStringValue()
                : String(e)),
            goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
              goog.string.internal.htmlEscape(e),
              r
            )
          );
        }),
        (goog.html.SafeHtml.htmlEscapePreservingNewlines = function (e) {
          return e instanceof goog.html.SafeHtml
            ? e
            : ((e = goog.html.SafeHtml.htmlEscape(e)),
              goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                goog.string.internal.newLineToBr(goog.html.SafeHtml.unwrap(e)),
                e.getDirection()
              ));
        }),
        (goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function (
          e
        ) {
          return e instanceof goog.html.SafeHtml
            ? e
            : ((e = goog.html.SafeHtml.htmlEscape(e)),
              goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                goog.string.internal.whitespaceEscape(
                  goog.html.SafeHtml.unwrap(e)
                ),
                e.getDirection()
              ));
        }),
        (goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape),
        (goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/),
        (goog.html.SafeHtml.URL_ATTRIBUTES_ = {
          action: !0,
          cite: !0,
          data: !0,
          formaction: !0,
          href: !0,
          manifest: !0,
          poster: !0,
          src: !0,
        }),
        (goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = {
          APPLET: !0,
          BASE: !0,
          EMBED: !0,
          IFRAME: !0,
          LINK: !0,
          MATH: !0,
          META: !0,
          OBJECT: !0,
          SCRIPT: !0,
          STYLE: !0,
          SVG: !0,
          TEMPLATE: !0,
        }),
        (goog.html.SafeHtml.create = function (e, t, r) {
          return (
            goog.html.SafeHtml.verifyTagName(String(e)),
            goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
              String(e),
              t,
              r
            )
          );
        }),
        (goog.html.SafeHtml.verifyTagName = function (e) {
          if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(e))
            throw Error('Invalid tag name <' + e + '>.');
          if (e.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_)
            throw Error('Tag name <' + e + '> is not allowed for SafeHtml.');
        }),
        (goog.html.SafeHtml.createIframe = function (e, t, r, o) {
          e && goog.html.TrustedResourceUrl.unwrap(e);
          var i = {};
          return (
            (i.src = e || null),
            (i.srcdoc = t && goog.html.SafeHtml.unwrap(t)),
            (e = goog.html.SafeHtml.combineAttributes(i, { sandbox: '' }, r)),
            goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
              'iframe',
              e,
              o
            )
          );
        }),
        (goog.html.SafeHtml.createSandboxIframe = function (e, t, r, o) {
          if (!goog.html.SafeHtml.canUseSandboxIframe())
            throw Error('The browser does not support sandboxed iframes.');
          var i = {};
          return (
            (i.src = e
              ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(e))
              : null),
            (i.srcdoc = t || null),
            (i.sandbox = ''),
            (e = goog.html.SafeHtml.combineAttributes(i, {}, r)),
            goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
              'iframe',
              e,
              o
            )
          );
        }),
        (goog.html.SafeHtml.canUseSandboxIframe = function () {
          return (
            goog.global.HTMLIFrameElement &&
            'sandbox' in goog.global.HTMLIFrameElement.prototype
          );
        }),
        (goog.html.SafeHtml.createScriptSrc = function (e, t) {
          return (
            goog.html.TrustedResourceUrl.unwrap(e),
            (e = goog.html.SafeHtml.combineAttributes({ src: e }, {}, t)),
            goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
              'script',
              e
            )
          );
        }),
        (goog.html.SafeHtml.createScript = function (e, t) {
          for (var r in t) {
            var o = r.toLowerCase();
            if ('language' == o || 'src' == o || 'text' == o || 'type' == o)
              throw Error('Cannot set "' + o + '" attribute');
          }
          for (r = '', e = goog.array.concat(e), o = 0; o < e.length; o++)
            r += goog.html.SafeScript.unwrap(e[o]);
          return (
            (e =
              goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                r,
                goog.i18n.bidi.Dir.NEUTRAL
              )),
            goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
              'script',
              t,
              e
            )
          );
        }),
        (goog.html.SafeHtml.createStyle = function (e, t) {
          t = goog.html.SafeHtml.combineAttributes({ type: 'text/css' }, {}, t);
          var r = '';
          e = goog.array.concat(e);
          for (var o = 0; o < e.length; o++)
            r += goog.html.SafeStyleSheet.unwrap(e[o]);
          return (
            (e =
              goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                r,
                goog.i18n.bidi.Dir.NEUTRAL
              )),
            goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
              'style',
              t,
              e
            )
          );
        }),
        (goog.html.SafeHtml.createMetaRefresh = function (e, t) {
          return (
            (e = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(e))),
            (goog.labs.userAgent.browser.isIE() ||
              goog.labs.userAgent.browser.isEdge()) &&
              goog.string.internal.contains(e, ';') &&
              (e = "'" + e.replace(/'/g, '%27') + "'"),
            goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(
              'meta',
              { 'http-equiv': 'refresh', content: (t || 0) + '; url=' + e }
            )
          );
        }),
        (goog.html.SafeHtml.getAttrNameAndValue_ = function (e, t, r) {
          if (r instanceof goog.string.Const) r = goog.string.Const.unwrap(r);
          else if ('style' == t.toLowerCase())
            r = goog.html.SafeHtml.getStyleValue_(r);
          else {
            if (/^on/i.test(t))
              throw Error(
                'Attribute "' +
                  t +
                  '" requires goog.string.Const value, "' +
                  r +
                  '" given.'
              );
            if (t.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_)
              if (r instanceof goog.html.TrustedResourceUrl)
                r = goog.html.TrustedResourceUrl.unwrap(r);
              else if (r instanceof goog.html.SafeUrl)
                r = goog.html.SafeUrl.unwrap(r);
              else {
                if (!goog.isString(r))
                  throw Error(
                    'Attribute "' +
                      t +
                      '" on tag "' +
                      e +
                      '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' +
                      r +
                      '" given.'
                  );
                r = goog.html.SafeUrl.sanitize(r).getTypedStringValue();
              }
          }
          return (
            r.implementsGoogStringTypedString && (r = r.getTypedStringValue()),
            goog.asserts.assert(
              goog.isString(r) || goog.isNumber(r),
              'String or number value expected, got ' +
                typeof r +
                ' with value: ' +
                r
            ),
            t + '="' + goog.string.internal.htmlEscape(String(r)) + '"'
          );
        }),
        (goog.html.SafeHtml.getStyleValue_ = function (e) {
          if (!goog.isObject(e))
            throw Error(
              'The "style" attribute requires goog.html.SafeStyle or map of style properties, ' +
                typeof e +
                ' given: ' +
                e
            );
          return (
            e instanceof goog.html.SafeStyle ||
              (e = goog.html.SafeStyle.create(e)),
            goog.html.SafeStyle.unwrap(e)
          );
        }),
        (goog.html.SafeHtml.createWithDir = function (e, t, r, o) {
          return ((t = goog.html.SafeHtml.create(t, r, o)).dir_ = e), t;
        }),
        (goog.html.SafeHtml.join = function (e, t) {
          var r = (e = goog.html.SafeHtml.htmlEscape(e)).getDirection(),
            o = [],
            i = function (e) {
              goog.isArray(e)
                ? goog.array.forEach(e, i)
                : ((e = goog.html.SafeHtml.htmlEscape(e)),
                  o.push(goog.html.SafeHtml.unwrap(e)),
                  (e = e.getDirection()),
                  r == goog.i18n.bidi.Dir.NEUTRAL
                    ? (r = e)
                    : e != goog.i18n.bidi.Dir.NEUTRAL && r != e && (r = null));
            };
          return (
            goog.array.forEach(t, i),
            goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
              o.join(goog.html.SafeHtml.unwrap(e)),
              r
            )
          );
        }),
        (goog.html.SafeHtml.concat = function (e) {
          return goog.html.SafeHtml.join(
            goog.html.SafeHtml.EMPTY,
            Array.prototype.slice.call(arguments)
          );
        }),
        (goog.html.SafeHtml.concatWithDir = function (e, t) {
          var r = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
          return (r.dir_ = e), r;
        }),
        (goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {}),
        (goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse =
          function (e, t) {
            return new goog.html.SafeHtml().initSecurityPrivateDoNotAccessOrElse_(
              e,
              t
            );
          }),
        (goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ =
          function (e, t) {
            return (
              (this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = goog.html
                .trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY
                ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createHTML(
                    e
                  )
                : e),
              (this.dir_ = t),
              this
            );
          }),
        (goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse =
          function (e, t, r) {
            var o = null,
              i = '<' + e + goog.html.SafeHtml.stringifyAttributes(e, t);
            return (
              goog.isDefAndNotNull(r) ? goog.isArray(r) || (r = [r]) : (r = []),
              goog.dom.tags.isVoidTag(e.toLowerCase())
                ? (goog.asserts.assert(
                    !r.length,
                    'Void tag <' + e + '> does not allow content.'
                  ),
                  (i += '>'))
                : ((o = goog.html.SafeHtml.concat(r)),
                  (i += '>' + goog.html.SafeHtml.unwrap(o) + '</' + e + '>'),
                  (o = o.getDirection())),
              (e = t && t.dir) &&
                (o = /^(ltr|rtl|auto)$/i.test(e)
                  ? goog.i18n.bidi.Dir.NEUTRAL
                  : null),
              goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                i,
                o
              )
            );
          }),
        (goog.html.SafeHtml.stringifyAttributes = function (e, t) {
          var r = '';
          if (t)
            for (var o in t) {
              if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(o))
                throw Error('Invalid attribute name "' + o + '".');
              var i = t[o];
              goog.isDefAndNotNull(i) &&
                (r += ' ' + goog.html.SafeHtml.getAttrNameAndValue_(e, o, i));
            }
          return r;
        }),
        (goog.html.SafeHtml.combineAttributes = function (e, t, r) {
          var o,
            i = {};
          for (o in e)
            goog.asserts.assert(o.toLowerCase() == o, 'Must be lower case'),
              (i[o] = e[o]);
          for (o in t)
            goog.asserts.assert(o.toLowerCase() == o, 'Must be lower case'),
              (i[o] = t[o]);
          for (o in r) {
            var n = o.toLowerCase();
            if (n in e)
              throw Error(
                'Cannot override "' +
                  n +
                  '" attribute, got "' +
                  o +
                  '" with value "' +
                  r[o] +
                  '"'
              );
            n in t && delete i[n], (i[o] = r[o]);
          }
          return i;
        }),
        (goog.html.SafeHtml.DOCTYPE_HTML =
          goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
            '<!DOCTYPE html>',
            goog.i18n.bidi.Dir.NEUTRAL
          )),
        (goog.html.SafeHtml.EMPTY =
          goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
            '',
            goog.i18n.bidi.Dir.NEUTRAL
          )),
        (goog.html.SafeHtml.BR =
          goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
            '<br>',
            goog.i18n.bidi.Dir.NEUTRAL
          )),
        (goog.html.uncheckedconversions = {}),
        (goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract =
          function (e, t, r) {
            return (
              goog.asserts.assertString(
                goog.string.Const.unwrap(e),
                'must provide justification'
              ),
              goog.asserts.assert(
                !goog.string.internal.isEmptyOrWhitespace(
                  goog.string.Const.unwrap(e)
                ),
                'must provide non-empty justification'
              ),
              goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
                t,
                r || null
              )
            );
          }),
        (goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract =
          function (e, t) {
            return (
              goog.asserts.assertString(
                goog.string.Const.unwrap(e),
                'must provide justification'
              ),
              goog.asserts.assert(
                !goog.string.internal.isEmptyOrWhitespace(
                  goog.string.Const.unwrap(e)
                ),
                'must provide non-empty justification'
              ),
              goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
                t
              )
            );
          }),
        (goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract =
          function (e, t) {
            return (
              goog.asserts.assertString(
                goog.string.Const.unwrap(e),
                'must provide justification'
              ),
              goog.asserts.assert(
                !goog.string.internal.isEmptyOrWhitespace(
                  goog.string.Const.unwrap(e)
                ),
                'must provide non-empty justification'
              ),
              goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
                t
              )
            );
          }),
        (goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract =
          function (e, t) {
            return (
              goog.asserts.assertString(
                goog.string.Const.unwrap(e),
                'must provide justification'
              ),
              goog.asserts.assert(
                !goog.string.internal.isEmptyOrWhitespace(
                  goog.string.Const.unwrap(e)
                ),
                'must provide non-empty justification'
              ),
              goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(
                t
              )
            );
          }),
        (goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract =
          function (e, t) {
            return (
              goog.asserts.assertString(
                goog.string.Const.unwrap(e),
                'must provide justification'
              ),
              goog.asserts.assert(
                !goog.string.internal.isEmptyOrWhitespace(
                  goog.string.Const.unwrap(e)
                ),
                'must provide non-empty justification'
              ),
              goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(t)
            );
          }),
        (goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract =
          function (e, t) {
            return (
              goog.asserts.assertString(
                goog.string.Const.unwrap(e),
                'must provide justification'
              ),
              goog.asserts.assert(
                !goog.string.internal.isEmptyOrWhitespace(
                  goog.string.Const.unwrap(e)
                ),
                'must provide non-empty justification'
              ),
              goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(
                t
              )
            );
          }),
        (goog.dom.asserts = {}),
        (goog.dom.asserts.assertIsLocation = function (e) {
          if (goog.asserts.ENABLE_ASSERTS) {
            var t = goog.dom.asserts.getWindow_(e);
            t &&
              (!e || (!(e instanceof t.Location) && e instanceof t.Element)) &&
              goog.asserts.fail(
                'Argument is not a Location (or a non-Element mock); got: %s',
                goog.dom.asserts.debugStringForType_(e)
              );
          }
          return e;
        }),
        (goog.dom.asserts.assertIsElementType_ = function (e, t) {
          if (goog.asserts.ENABLE_ASSERTS) {
            var r = goog.dom.asserts.getWindow_(e);
            r &&
              void 0 !== r[t] &&
              ((e &&
                (e instanceof r[t] ||
                  !(e instanceof r.Location || e instanceof r.Element))) ||
                goog.asserts.fail(
                  'Argument is not a %s (or a non-Element, non-Location mock); got: %s',
                  t,
                  goog.dom.asserts.debugStringForType_(e)
                ));
          }
          return e;
        }),
        (goog.dom.asserts.assertIsHTMLAnchorElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLAnchorElement');
        }),
        (goog.dom.asserts.assertIsHTMLButtonElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLButtonElement');
        }),
        (goog.dom.asserts.assertIsHTMLLinkElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLLinkElement');
        }),
        (goog.dom.asserts.assertIsHTMLImageElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLImageElement');
        }),
        (goog.dom.asserts.assertIsHTMLAudioElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLAudioElement');
        }),
        (goog.dom.asserts.assertIsHTMLVideoElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLVideoElement');
        }),
        (goog.dom.asserts.assertIsHTMLInputElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLInputElement');
        }),
        (goog.dom.asserts.assertIsHTMLTextAreaElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(
            e,
            'HTMLTextAreaElement'
          );
        }),
        (goog.dom.asserts.assertIsHTMLCanvasElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLCanvasElement');
        }),
        (goog.dom.asserts.assertIsHTMLEmbedElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLEmbedElement');
        }),
        (goog.dom.asserts.assertIsHTMLFormElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLFormElement');
        }),
        (goog.dom.asserts.assertIsHTMLFrameElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLFrameElement');
        }),
        (goog.dom.asserts.assertIsHTMLIFrameElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLIFrameElement');
        }),
        (goog.dom.asserts.assertIsHTMLObjectElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLObjectElement');
        }),
        (goog.dom.asserts.assertIsHTMLScriptElement = function (e) {
          return goog.dom.asserts.assertIsElementType_(e, 'HTMLScriptElement');
        }),
        (goog.dom.asserts.debugStringForType_ = function (e) {
          if (!goog.isObject(e))
            return void 0 === e ? 'undefined' : null === e ? 'null' : typeof e;
          try {
            return (
              e.constructor.displayName ||
              e.constructor.name ||
              Object.prototype.toString.call(e)
            );
          } catch (e) {
            return '<object could not be stringified>';
          }
        }),
        (goog.dom.asserts.getWindow_ = function (e) {
          try {
            var t = e && e.ownerDocument,
              r = t && (t.defaultView || t.parentWindow);
            if ((r = r || goog.global).Element && r.Location) return r;
          } catch (e) {}
          return null;
        }),
        (goog.functions = {}),
        (goog.functions.constant = function (e) {
          return function () {
            return e;
          };
        }),
        (goog.functions.FALSE = function () {
          return !1;
        }),
        (goog.functions.TRUE = function () {
          return !0;
        }),
        (goog.functions.NULL = function () {
          return null;
        }),
        (goog.functions.identity = function (e, t) {
          return e;
        }),
        (goog.functions.error = function (e) {
          return function () {
            throw Error(e);
          };
        }),
        (goog.functions.fail = function (e) {
          return function () {
            throw e;
          };
        }),
        (goog.functions.lock = function (e, t) {
          return (
            (t = t || 0),
            function () {
              return e.apply(this, Array.prototype.slice.call(arguments, 0, t));
            }
          );
        }),
        (goog.functions.nth = function (e) {
          return function () {
            return arguments[e];
          };
        }),
        (goog.functions.partialRight = function (e, t) {
          var r = Array.prototype.slice.call(arguments, 1);
          return function () {
            var t = Array.prototype.slice.call(arguments);
            return t.push.apply(t, r), e.apply(this, t);
          };
        }),
        (goog.functions.withReturnValue = function (e, t) {
          return goog.functions.sequence(e, goog.functions.constant(t));
        }),
        (goog.functions.equalTo = function (e, t) {
          return function (r) {
            return t ? e == r : e === r;
          };
        }),
        (goog.functions.compose = function (e, t) {
          var r = arguments,
            o = r.length;
          return function () {
            var e;
            o && (e = r[o - 1].apply(this, arguments));
            for (var t = o - 2; 0 <= t; t--) e = r[t].call(this, e);
            return e;
          };
        }),
        (goog.functions.sequence = function (e) {
          var t = arguments,
            r = t.length;
          return function () {
            for (var e, o = 0; o < r; o++) e = t[o].apply(this, arguments);
            return e;
          };
        }),
        (goog.functions.and = function (e) {
          var t = arguments,
            r = t.length;
          return function () {
            for (var e = 0; e < r; e++)
              if (!t[e].apply(this, arguments)) return !1;
            return !0;
          };
        }),
        (goog.functions.or = function (e) {
          var t = arguments,
            r = t.length;
          return function () {
            for (var e = 0; e < r; e++)
              if (t[e].apply(this, arguments)) return !0;
            return !1;
          };
        }),
        (goog.functions.not = function (e) {
          return function () {
            return !e.apply(this, arguments);
          };
        }),
        (goog.functions.create = function (e, t) {
          var r = function () {};
          return (
            (r.prototype = e.prototype),
            (r = new r()),
            e.apply(r, Array.prototype.slice.call(arguments, 1)),
            r
          );
        }),
        (goog.functions.CACHE_RETURN_VALUE = !0),
        (goog.functions.cacheReturnValue = function (e) {
          var t,
            r = !1;
          return function () {
            return goog.functions.CACHE_RETURN_VALUE
              ? (r || ((t = e()), (r = !0)), t)
              : e();
          };
        }),
        (goog.functions.once = function (e) {
          var t = e;
          return function () {
            if (t) {
              var e = t;
              (t = null), e();
            }
          };
        }),
        (goog.functions.debounce = function (e, t, r) {
          var o = 0;
          return function (i) {
            goog.global.clearTimeout(o);
            var n = arguments;
            o = goog.global.setTimeout(function () {
              e.apply(r, n);
            }, t);
          };
        }),
        (goog.functions.throttle = function (e, t, r) {
          var o = 0,
            i = !1,
            n = [],
            s = function () {
              (o = 0), i && ((i = !1), a());
            },
            a = function () {
              (o = goog.global.setTimeout(s, t)), e.apply(r, n);
            };
          return function (e) {
            (n = arguments), o ? (i = !0) : a();
          };
        }),
        (goog.functions.rateLimit = function (e, t, r) {
          var o = 0,
            i = function () {
              o = 0;
            };
          return function (n) {
            o || ((o = goog.global.setTimeout(i, t)), e.apply(r, arguments));
          };
        }),
        (goog.dom.safe = {}),
        (goog.dom.safe.InsertAdjacentHtmlPosition = {
          AFTERBEGIN: 'afterbegin',
          AFTEREND: 'afterend',
          BEFOREBEGIN: 'beforebegin',
          BEFOREEND: 'beforeend',
        }),
        (goog.dom.safe.insertAdjacentHtml = function (e, t, r) {
          e.insertAdjacentHTML(t, goog.html.SafeHtml.unwrapTrustedHTML(r));
        }),
        (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = {
          MATH: !0,
          SCRIPT: !0,
          STYLE: !0,
          SVG: !0,
          TEMPLATE: !0,
        }),
        (goog.dom.safe.isInnerHtmlCleanupRecursive_ =
          goog.functions.cacheReturnValue(function () {
            if (goog.DEBUG && 'undefined' == typeof document) return !1;
            var e = document.createElement('div'),
              t = document.createElement('div');
            return (
              t.appendChild(document.createElement('div')),
              e.appendChild(t),
              !(goog.DEBUG && !e.firstChild) &&
                ((t = e.firstChild.firstChild),
                (e.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(
                  goog.html.SafeHtml.EMPTY
                )),
                !t.parentElement)
            );
          })),
        (goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse = function (e, t) {
          if (goog.dom.safe.isInnerHtmlCleanupRecursive_())
            for (; e.lastChild; ) e.removeChild(e.lastChild);
          e.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(t);
        }),
        (goog.dom.safe.setInnerHtml = function (e, t) {
          if (goog.asserts.ENABLE_ASSERTS) {
            var r = e.tagName.toUpperCase();
            if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[r])
              throw Error(
                'goog.dom.safe.setInnerHtml cannot be used to set content of ' +
                  e.tagName +
                  '.'
              );
          }
          goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(e, t);
        }),
        (goog.dom.safe.setOuterHtml = function (e, t) {
          e.outerHTML = goog.html.SafeHtml.unwrapTrustedHTML(t);
        }),
        (goog.dom.safe.setFormElementAction = function (e, t) {
          (t =
            t instanceof goog.html.SafeUrl
              ? t
              : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
            (goog.dom.asserts.assertIsHTMLFormElement(e).action =
              goog.html.SafeUrl.unwrapTrustedURL(t));
        }),
        (goog.dom.safe.setButtonFormAction = function (e, t) {
          (t =
            t instanceof goog.html.SafeUrl
              ? t
              : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
            (goog.dom.asserts.assertIsHTMLButtonElement(e).formAction =
              goog.html.SafeUrl.unwrapTrustedURL(t));
        }),
        (goog.dom.safe.setInputFormAction = function (e, t) {
          (t =
            t instanceof goog.html.SafeUrl
              ? t
              : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
            (goog.dom.asserts.assertIsHTMLInputElement(e).formAction =
              goog.html.SafeUrl.unwrapTrustedURL(t));
        }),
        (goog.dom.safe.setStyle = function (e, t) {
          e.style.cssText = goog.html.SafeStyle.unwrap(t);
        }),
        (goog.dom.safe.documentWrite = function (e, t) {
          e.write(goog.html.SafeHtml.unwrapTrustedHTML(t));
        }),
        (goog.dom.safe.setAnchorHref = function (e, t) {
          goog.dom.asserts.assertIsHTMLAnchorElement(e),
            (t =
              t instanceof goog.html.SafeUrl
                ? t
                : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
            (e.href = goog.html.SafeUrl.unwrapTrustedURL(t));
        }),
        (goog.dom.safe.setImageSrc = function (e, t) {
          if (
            (goog.dom.asserts.assertIsHTMLImageElement(e),
            !(t instanceof goog.html.SafeUrl))
          ) {
            var r = /^data:image\//i.test(t);
            t = goog.html.SafeUrl.sanitizeAssertUnchanged(t, r);
          }
          e.src = goog.html.SafeUrl.unwrapTrustedURL(t);
        }),
        (goog.dom.safe.setAudioSrc = function (e, t) {
          if (
            (goog.dom.asserts.assertIsHTMLAudioElement(e),
            !(t instanceof goog.html.SafeUrl))
          ) {
            var r = /^data:audio\//i.test(t);
            t = goog.html.SafeUrl.sanitizeAssertUnchanged(t, r);
          }
          e.src = goog.html.SafeUrl.unwrapTrustedURL(t);
        }),
        (goog.dom.safe.setVideoSrc = function (e, t) {
          if (
            (goog.dom.asserts.assertIsHTMLVideoElement(e),
            !(t instanceof goog.html.SafeUrl))
          ) {
            var r = /^data:video\//i.test(t);
            t = goog.html.SafeUrl.sanitizeAssertUnchanged(t, r);
          }
          e.src = goog.html.SafeUrl.unwrapTrustedURL(t);
        }),
        (goog.dom.safe.setEmbedSrc = function (e, t) {
          goog.dom.asserts.assertIsHTMLEmbedElement(e),
            (e.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(t));
        }),
        (goog.dom.safe.setFrameSrc = function (e, t) {
          goog.dom.asserts.assertIsHTMLFrameElement(e),
            (e.src = goog.html.TrustedResourceUrl.unwrapTrustedURL(t));
        }),
        (goog.dom.safe.setIframeSrc = function (e, t) {
          goog.dom.asserts.assertIsHTMLIFrameElement(e),
            (e.src = goog.html.TrustedResourceUrl.unwrapTrustedURL(t));
        }),
        (goog.dom.safe.setIframeSrcdoc = function (e, t) {
          goog.dom.asserts.assertIsHTMLIFrameElement(e),
            (e.srcdoc = goog.html.SafeHtml.unwrapTrustedHTML(t));
        }),
        (goog.dom.safe.setLinkHrefAndRel = function (e, t, r) {
          goog.dom.asserts.assertIsHTMLLinkElement(e),
            (e.rel = r),
            goog.string.internal.caseInsensitiveContains(r, 'stylesheet')
              ? (goog.asserts.assert(
                  t instanceof goog.html.TrustedResourceUrl,
                  'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'
                ),
                (e.href = goog.html.TrustedResourceUrl.unwrapTrustedURL(t)))
              : (e.href =
                  t instanceof goog.html.TrustedResourceUrl
                    ? goog.html.TrustedResourceUrl.unwrapTrustedURL(t)
                    : t instanceof goog.html.SafeUrl
                    ? goog.html.SafeUrl.unwrapTrustedURL(t)
                    : goog.html.SafeUrl.unwrapTrustedURL(
                        goog.html.SafeUrl.sanitizeAssertUnchanged(t)
                      ));
        }),
        (goog.dom.safe.setObjectData = function (e, t) {
          goog.dom.asserts.assertIsHTMLObjectElement(e),
            (e.data = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(t));
        }),
        (goog.dom.safe.setScriptSrc = function (e, t) {
          goog.dom.asserts.assertIsHTMLScriptElement(e),
            (e.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(t)),
            (t = goog.getScriptNonce()) && e.setAttribute('nonce', t);
        }),
        (goog.dom.safe.setScriptContent = function (e, t) {
          goog.dom.asserts.assertIsHTMLScriptElement(e),
            (e.text = goog.html.SafeScript.unwrapTrustedScript(t)),
            (t = goog.getScriptNonce()) && e.setAttribute('nonce', t);
        }),
        (goog.dom.safe.setLocationHref = function (e, t) {
          goog.dom.asserts.assertIsLocation(e),
            (t =
              t instanceof goog.html.SafeUrl
                ? t
                : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
            (e.href = goog.html.SafeUrl.unwrapTrustedURL(t));
        }),
        (goog.dom.safe.assignLocation = function (e, t) {
          goog.dom.asserts.assertIsLocation(e),
            (t =
              t instanceof goog.html.SafeUrl
                ? t
                : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
            e.assign(goog.html.SafeUrl.unwrapTrustedURL(t));
        }),
        (goog.dom.safe.replaceLocation = function (e, t) {
          goog.dom.asserts.assertIsLocation(e),
            (t =
              t instanceof goog.html.SafeUrl
                ? t
                : goog.html.SafeUrl.sanitizeAssertUnchanged(t)),
            e.replace(goog.html.SafeUrl.unwrapTrustedURL(t));
        }),
        (goog.dom.safe.openInWindow = function (e, t, r, o, i) {
          return (
            (e =
              e instanceof goog.html.SafeUrl
                ? e
                : goog.html.SafeUrl.sanitizeAssertUnchanged(e)),
            (t || goog.global).open(
              goog.html.SafeUrl.unwrapTrustedURL(e),
              r ? goog.string.Const.unwrap(r) : '',
              o,
              i
            )
          );
        }),
        (goog.dom.safe.parseFromStringHtml = function (e, t) {
          return goog.dom.safe.parseFromString(e, t, 'text/html');
        }),
        (goog.dom.safe.parseFromString = function (e, t, r) {
          return e.parseFromString(goog.html.SafeHtml.unwrapTrustedHTML(t), r);
        }),
        (goog.dom.safe.createImageFromBlob = function (e) {
          if (!/^image\/.*/g.test(e.type))
            throw Error(
              'goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.'
            );
          var t = goog.global.URL.createObjectURL(e);
          return (
            ((e = new goog.global.Image()).onload = function () {
              goog.global.URL.revokeObjectURL(t);
            }),
            goog.dom.safe.setImageSrc(
              e,
              goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(
                goog.string.Const.from('Image blob URL.'),
                t
              )
            ),
            e
          );
        }),
        (goog.string.DETECT_DOUBLE_ESCAPING = !1),
        (goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1),
        (goog.string.Unicode = { NBSP: 'Â ' }),
        (goog.string.startsWith = goog.string.internal.startsWith),
        (goog.string.endsWith = goog.string.internal.endsWith),
        (goog.string.caseInsensitiveStartsWith =
          goog.string.internal.caseInsensitiveStartsWith),
        (goog.string.caseInsensitiveEndsWith =
          goog.string.internal.caseInsensitiveEndsWith),
        (goog.string.caseInsensitiveEquals =
          goog.string.internal.caseInsensitiveEquals),
        (goog.string.subs = function (e, t) {
          for (
            var r = e.split('%s'),
              o = '',
              i = Array.prototype.slice.call(arguments, 1);
            i.length && 1 < r.length;

          )
            o += r.shift() + i.shift();
          return o + r.join('%s');
        }),
        (goog.string.collapseWhitespace = function (e) {
          return e.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
        }),
        (goog.string.isEmptyOrWhitespace =
          goog.string.internal.isEmptyOrWhitespace),
        (goog.string.isEmptyString = function (e) {
          return 0 == e.length;
        }),
        (goog.string.isEmpty = goog.string.isEmptyOrWhitespace),
        (goog.string.isEmptyOrWhitespaceSafe = function (e) {
          return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(e));
        }),
        (goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe),
        (goog.string.isBreakingWhitespace = function (e) {
          return !/[^\t\n\r ]/.test(e);
        }),
        (goog.string.isAlpha = function (e) {
          return !/[^a-zA-Z]/.test(e);
        }),
        (goog.string.isNumeric = function (e) {
          return !/[^0-9]/.test(e);
        }),
        (goog.string.isAlphaNumeric = function (e) {
          return !/[^a-zA-Z0-9]/.test(e);
        }),
        (goog.string.isSpace = function (e) {
          return ' ' == e;
        }),
        (goog.string.isUnicodeChar = function (e) {
          return (
            (1 == e.length && ' ' <= e && '~' >= e) || ('Â€' <= e && 'ï¿½' >= e)
          );
        }),
        (goog.string.stripNewlines = function (e) {
          return e.replace(/(\r\n|\r|\n)+/g, ' ');
        }),
        (goog.string.canonicalizeNewlines = function (e) {
          return e.replace(/(\r\n|\r|\n)/g, '\n');
        }),
        (goog.string.normalizeWhitespace = function (e) {
          return e.replace(/\xa0|\s/g, ' ');
        }),
        (goog.string.normalizeSpaces = function (e) {
          return e.replace(/\xa0|[ \t]+/g, ' ');
        }),
        (goog.string.collapseBreakingSpaces = function (e) {
          return e
            .replace(/[\t\r\n ]+/g, ' ')
            .replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, '');
        }),
        (goog.string.trim = goog.string.internal.trim),
        (goog.string.trimLeft = function (e) {
          return e.replace(/^[\s\xa0]+/, '');
        }),
        (goog.string.trimRight = function (e) {
          return e.replace(/[\s\xa0]+$/, '');
        }),
        (goog.string.caseInsensitiveCompare =
          goog.string.internal.caseInsensitiveCompare),
        (goog.string.numberAwareCompare_ = function (e, t, r) {
          if (e == t) return 0;
          if (!e) return -1;
          if (!t) return 1;
          for (
            var o = e.toLowerCase().match(r),
              i = t.toLowerCase().match(r),
              n = Math.min(o.length, i.length),
              s = 0;
            s < n;
            s++
          ) {
            r = o[s];
            var a = i[s];
            if (r != a)
              return (
                (e = parseInt(r, 10)),
                !isNaN(e) && ((t = parseInt(a, 10)), !isNaN(t) && e - t)
                  ? e - t
                  : r < a
                  ? -1
                  : 1
              );
          }
          return o.length != i.length ? o.length - i.length : e < t ? -1 : 1;
        }),
        (goog.string.intAwareCompare = function (e, t) {
          return goog.string.numberAwareCompare_(e, t, /\d+|\D+/g);
        }),
        (goog.string.floatAwareCompare = function (e, t) {
          return goog.string.numberAwareCompare_(e, t, /\d+|\.\d+|\D+/g);
        }),
        (goog.string.numerateCompare = goog.string.floatAwareCompare),
        (goog.string.urlEncode = function (e) {
          return encodeURIComponent(String(e));
        }),
        (goog.string.urlDecode = function (e) {
          return decodeURIComponent(e.replace(/\+/g, ' '));
        }),
        (goog.string.newLineToBr = goog.string.internal.newLineToBr),
        (goog.string.htmlEscape = function (e, t) {
          return (
            (e = goog.string.internal.htmlEscape(e, t)),
            goog.string.DETECT_DOUBLE_ESCAPING &&
              (e = e.replace(goog.string.E_RE_, '&#101;')),
            e
          );
        }),
        (goog.string.E_RE_ = /e/g),
        (goog.string.unescapeEntities = function (e) {
          return goog.string.contains(e, '&')
            ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING &&
              'document' in goog.global
              ? goog.string.unescapeEntitiesUsingDom_(e)
              : goog.string.unescapePureXmlEntities_(e)
            : e;
        }),
        (goog.string.unescapeEntitiesWithDocument = function (e, t) {
          return goog.string.contains(e, '&')
            ? goog.string.unescapeEntitiesUsingDom_(e, t)
            : e;
        }),
        (goog.string.unescapeEntitiesUsingDom_ = function (e, t) {
          var r = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"' },
            o = t
              ? t.createElement('div')
              : goog.global.document.createElement('div');
          return e.replace(goog.string.HTML_ENTITY_PATTERN_, function (e, t) {
            var i = r[e];
            return (
              i ||
              ('#' == t.charAt(0) &&
                ((t = Number('0' + t.substr(1))),
                isNaN(t) || (i = String.fromCharCode(t))),
              i ||
                (goog.dom.safe.setInnerHtml(
                  o,
                  goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(
                    goog.string.Const.from('Single HTML entity.'),
                    e + ' '
                  )
                ),
                (i = o.firstChild.nodeValue.slice(0, -1))),
              (r[e] = i))
            );
          });
        }),
        (goog.string.unescapePureXmlEntities_ = function (e) {
          return e.replace(/&([^;]+);/g, function (e, t) {
            switch (t) {
              case 'amp':
                return '&';
              case 'lt':
                return '<';
              case 'gt':
                return '>';
              case 'quot':
                return '"';
              default:
                return '#' != t.charAt(0) ||
                  ((t = Number('0' + t.substr(1))), isNaN(t))
                  ? e
                  : String.fromCharCode(t);
            }
          });
        }),
        (goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g),
        (goog.string.whitespaceEscape = function (e, t) {
          return goog.string.newLineToBr(e.replace(/  /g, ' &#160;'), t);
        }),
        (goog.string.preserveSpaces = function (e) {
          return e.replace(/(^|[\n ]) /g, '$1' + goog.string.Unicode.NBSP);
        }),
        (goog.string.stripQuotes = function (e, t) {
          for (var r = t.length, o = 0; o < r; o++) {
            var i = 1 == r ? t : t.charAt(o);
            if (e.charAt(0) == i && e.charAt(e.length - 1) == i)
              return e.substring(1, e.length - 1);
          }
          return e;
        }),
        (goog.string.truncate = function (e, t, r) {
          return (
            r && (e = goog.string.unescapeEntities(e)),
            e.length > t && (e = e.substring(0, t - 3) + '...'),
            r && (e = goog.string.htmlEscape(e)),
            e
          );
        }),
        (goog.string.truncateMiddle = function (e, t, r, o) {
          if ((r && (e = goog.string.unescapeEntities(e)), o && e.length > t)) {
            o > t && (o = t);
            var i = e.length - o;
            e = e.substring(0, t - o) + '...' + e.substring(i);
          } else
            e.length > t &&
              ((o = Math.floor(t / 2)),
              (i = e.length - o),
              (e = e.substring(0, o + (t % 2)) + '...' + e.substring(i)));
          return r && (e = goog.string.htmlEscape(e)), e;
        }),
        (goog.string.specialEscapeChars_ = {
          '\0': '\\0',
          '\b': '\\b',
          '\f': '\\f',
          '\n': '\\n',
          '\r': '\\r',
          '\t': '\\t',
          '\v': '\\x0B',
          '"': '\\"',
          '\\': '\\\\',
          '<': '\\u003C',
        }),
        (goog.string.jsEscapeCache_ = { "'": "\\'" }),
        (goog.string.quote = function (e) {
          e = String(e);
          for (var t = ['"'], r = 0; r < e.length; r++) {
            var o = e.charAt(r),
              i = o.charCodeAt(0);
            t[r + 1] =
              goog.string.specialEscapeChars_[o] ||
              (31 < i && 127 > i ? o : goog.string.escapeChar(o));
          }
          return t.push('"'), t.join('');
        }),
        (goog.string.escapeString = function (e) {
          for (var t = [], r = 0; r < e.length; r++)
            t[r] = goog.string.escapeChar(e.charAt(r));
          return t.join('');
        }),
        (goog.string.escapeChar = function (e) {
          if (e in goog.string.jsEscapeCache_)
            return goog.string.jsEscapeCache_[e];
          if (e in goog.string.specialEscapeChars_)
            return (goog.string.jsEscapeCache_[e] =
              goog.string.specialEscapeChars_[e]);
          var t = e.charCodeAt(0);
          if (31 < t && 127 > t) var r = e;
          else
            256 > t
              ? ((r = '\\x'), (16 > t || 256 < t) && (r += '0'))
              : ((r = '\\u'), 4096 > t && (r += '0')),
              (r += t.toString(16).toUpperCase());
          return (goog.string.jsEscapeCache_[e] = r);
        }),
        (goog.string.contains = goog.string.internal.contains),
        (goog.string.caseInsensitiveContains =
          goog.string.internal.caseInsensitiveContains),
        (goog.string.countOf = function (e, t) {
          return e && t ? e.split(t).length - 1 : 0;
        }),
        (goog.string.removeAt = function (e, t, r) {
          var o = e;
          return (
            0 <= t &&
              t < e.length &&
              0 < r &&
              (o = e.substr(0, t) + e.substr(t + r, e.length - t - r)),
            o
          );
        }),
        (goog.string.remove = function (e, t) {
          return e.replace(t, '');
        }),
        (goog.string.removeAll = function (e, t) {
          return (
            (t = new RegExp(goog.string.regExpEscape(t), 'g')), e.replace(t, '')
          );
        }),
        (goog.string.replaceAll = function (e, t, r) {
          return (
            (t = new RegExp(goog.string.regExpEscape(t), 'g')),
            e.replace(t, r.replace(/\$/g, '$$$$'))
          );
        }),
        (goog.string.regExpEscape = function (e) {
          return String(e)
            .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1')
            .replace(/\x08/g, '\\x08');
        }),
        (goog.string.repeat = String.prototype.repeat
          ? function (e, t) {
              return e.repeat(t);
            }
          : function (e, t) {
              return Array(t + 1).join(e);
            }),
        (goog.string.padNumber = function (e, t, r) {
          return (
            -1 ==
              (r = (e = goog.isDef(r) ? e.toFixed(r) : String(e)).indexOf(
                '.'
              )) && (r = e.length),
            goog.string.repeat('0', Math.max(0, t - r)) + e
          );
        }),
        (goog.string.makeSafe = function (e) {
          return null == e ? '' : String(e);
        }),
        (goog.string.buildString = function (e) {
          return Array.prototype.join.call(arguments, '');
        }),
        (goog.string.getRandomString = function () {
          return (
            Math.floor(2147483648 * Math.random()).toString(36) +
            Math.abs(
              Math.floor(2147483648 * Math.random()) ^ goog.now()
            ).toString(36)
          );
        }),
        (goog.string.compareVersions = goog.string.internal.compareVersions),
        (goog.string.hashCode = function (e) {
          for (var t = 0, r = 0; r < e.length; ++r)
            t = (31 * t + e.charCodeAt(r)) >>> 0;
          return t;
        }),
        (goog.string.uniqueStringCounter_ = (2147483648 * Math.random()) | 0),
        (goog.string.createUniqueString = function () {
          return 'goog_' + goog.string.uniqueStringCounter_++;
        }),
        (goog.string.toNumber = function (e) {
          var t = Number(e);
          return 0 == t && goog.string.isEmptyOrWhitespace(e) ? NaN : t;
        }),
        (goog.string.isLowerCamelCase = function (e) {
          return /^[a-z]+([A-Z][a-z]*)*$/.test(e);
        }),
        (goog.string.isUpperCamelCase = function (e) {
          return /^([A-Z][a-z]*)+$/.test(e);
        }),
        (goog.string.toCamelCase = function (e) {
          return String(e).replace(/\-([a-z])/g, function (e, t) {
            return t.toUpperCase();
          });
        }),
        (goog.string.toSelectorCase = function (e) {
          return String(e)
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase();
        }),
        (goog.string.toTitleCase = function (e, t) {
          return (
            (t = goog.isString(t) ? goog.string.regExpEscape(t) : '\\s'),
            e.replace(
              new RegExp('(^' + (t ? '|[' + t + ']+' : '') + ')([a-z])', 'g'),
              function (e, t, r) {
                return t + r.toUpperCase();
              }
            )
          );
        }),
        (goog.string.capitalize = function (e) {
          return (
            String(e.charAt(0)).toUpperCase() +
            String(e.substr(1)).toLowerCase()
          );
        }),
        (goog.string.parseInt = function (e) {
          return (
            isFinite(e) && (e = String(e)),
            goog.isString(e)
              ? /^\s*-?0x/i.test(e)
                ? parseInt(e, 16)
                : parseInt(e, 10)
              : NaN
          );
        }),
        (goog.string.splitLimit = function (e, t, r) {
          e = e.split(t);
          for (var o = []; 0 < r && e.length; ) o.push(e.shift()), r--;
          return e.length && o.push(e.join(t)), o;
        }),
        (goog.string.lastComponent = function (e, t) {
          if (!t) return e;
          'string' == typeof t && (t = [t]);
          for (var r = -1, o = 0; o < t.length; o++)
            if ('' != t[o]) {
              var i = e.lastIndexOf(t[o]);
              i > r && (r = i);
            }
          return -1 == r ? e : e.slice(r + 1);
        }),
        (goog.string.editDistance = function (e, t) {
          var r = [],
            o = [];
          if (e == t) return 0;
          if (!e.length || !t.length) return Math.max(e.length, t.length);
          for (var i = 0; i < t.length + 1; i++) r[i] = i;
          for (i = 0; i < e.length; i++) {
            o[0] = i + 1;
            for (var n = 0; n < t.length; n++)
              o[n + 1] = Math.min(
                o[n] + 1,
                r[n + 1] + 1,
                r[n] + Number(e[i] != t[n])
              );
            for (n = 0; n < r.length; n++) r[n] = o[n];
          }
          return o[t.length];
        }),
        (goog.labs.userAgent.platform = {}),
        (goog.labs.userAgent.platform.isAndroid = function () {
          return goog.labs.userAgent.util.matchUserAgent('Android');
        }),
        (goog.labs.userAgent.platform.isIpod = function () {
          return goog.labs.userAgent.util.matchUserAgent('iPod');
        }),
        (goog.labs.userAgent.platform.isIphone = function () {
          return (
            goog.labs.userAgent.util.matchUserAgent('iPhone') &&
            !goog.labs.userAgent.util.matchUserAgent('iPod') &&
            !goog.labs.userAgent.util.matchUserAgent('iPad')
          );
        }),
        (goog.labs.userAgent.platform.isIpad = function () {
          return goog.labs.userAgent.util.matchUserAgent('iPad');
        }),
        (goog.labs.userAgent.platform.isIos = function () {
          return (
            goog.labs.userAgent.platform.isIphone() ||
            goog.labs.userAgent.platform.isIpad() ||
            goog.labs.userAgent.platform.isIpod()
          );
        }),
        (goog.labs.userAgent.platform.isMacintosh = function () {
          return goog.labs.userAgent.util.matchUserAgent('Macintosh');
        }),
        (goog.labs.userAgent.platform.isLinux = function () {
          return goog.labs.userAgent.util.matchUserAgent('Linux');
        }),
        (goog.labs.userAgent.platform.isWindows = function () {
          return goog.labs.userAgent.util.matchUserAgent('Windows');
        }),
        (goog.labs.userAgent.platform.isChromeOS = function () {
          return goog.labs.userAgent.util.matchUserAgent('CrOS');
        }),
        (goog.labs.userAgent.platform.isChromecast = function () {
          return goog.labs.userAgent.util.matchUserAgent('CrKey');
        }),
        (goog.labs.userAgent.platform.isKaiOS = function () {
          return goog.labs.userAgent.util.matchUserAgentIgnoreCase('KaiOS');
        }),
        (goog.labs.userAgent.platform.isGo2Phone = function () {
          return goog.labs.userAgent.util.matchUserAgentIgnoreCase('GAFP');
        }),
        (goog.labs.userAgent.platform.getVersion = function () {
          var e = goog.labs.userAgent.util.getUserAgent(),
            t = '';
          return (
            goog.labs.userAgent.platform.isWindows()
              ? (t = (e = (t = /Windows (?:NT|Phone) ([0-9.]+)/).exec(e))
                  ? e[1]
                  : '0.0')
              : goog.labs.userAgent.platform.isIos()
              ? (t =
                  (e = (t = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/).exec(e)) &&
                  e[1].replace(/_/g, '.'))
              : goog.labs.userAgent.platform.isMacintosh()
              ? (t = (e = (t = /Mac OS X ([0-9_.]+)/).exec(e))
                  ? e[1].replace(/_/g, '.')
                  : '10')
              : goog.labs.userAgent.platform.isKaiOS()
              ? (t = (e = (t = /(?:KaiOS)\/(\S+)/i).exec(e)) && e[1])
              : goog.labs.userAgent.platform.isAndroid()
              ? (t = (e = (t = /Android\s+([^\);]+)(\)|;)/).exec(e)) && e[1])
              : goog.labs.userAgent.platform.isChromeOS() &&
                (t =
                  (e = (t = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/).exec(
                    e
                  )) && e[1]),
            t || ''
          );
        }),
        (goog.labs.userAgent.platform.isVersionOrHigher = function (e) {
          return (
            0 <=
            goog.string.compareVersions(
              goog.labs.userAgent.platform.getVersion(),
              e
            )
          );
        }),
        (goog.reflect = {}),
        (goog.reflect.object = function (e, t) {
          return t;
        }),
        (goog.reflect.objectProperty = function (e, t) {
          return e;
        }),
        (goog.reflect.sinkValue = function (e) {
          return goog.reflect.sinkValue[' '](e), e;
        }),
        (goog.reflect.sinkValue[' '] = goog.nullFunction),
        (goog.reflect.canAccessProperty = function (e, t) {
          try {
            return goog.reflect.sinkValue(e[t]), !0;
          } catch (e) {}
          return !1;
        }),
        (goog.reflect.cache = function (e, t, r, o) {
          return (
            (o = o ? o(t) : t),
            Object.prototype.hasOwnProperty.call(e, o) ? e[o] : (e[o] = r(t))
          );
        }),
        (goog.labs.userAgent.engine = {}),
        (goog.labs.userAgent.engine.isPresto = function () {
          return goog.labs.userAgent.util.matchUserAgent('Presto');
        }),
        (goog.labs.userAgent.engine.isTrident = function () {
          return (
            goog.labs.userAgent.util.matchUserAgent('Trident') ||
            goog.labs.userAgent.util.matchUserAgent('MSIE')
          );
        }),
        (goog.labs.userAgent.engine.isEdge = function () {
          return goog.labs.userAgent.util.matchUserAgent('Edge');
        }),
        (goog.labs.userAgent.engine.isWebKit = function () {
          return (
            goog.labs.userAgent.util.matchUserAgentIgnoreCase('WebKit') &&
            !goog.labs.userAgent.engine.isEdge()
          );
        }),
        (goog.labs.userAgent.engine.isGecko = function () {
          return (
            goog.labs.userAgent.util.matchUserAgent('Gecko') &&
            !goog.labs.userAgent.engine.isWebKit() &&
            !goog.labs.userAgent.engine.isTrident() &&
            !goog.labs.userAgent.engine.isEdge()
          );
        }),
        (goog.labs.userAgent.engine.getVersion = function () {
          var e = goog.labs.userAgent.util.getUserAgent();
          if (e) {
            e = goog.labs.userAgent.util.extractVersionTuples(e);
            var t,
              r = goog.labs.userAgent.engine.getEngineTuple_(e);
            if (r)
              return 'Gecko' == r[0]
                ? goog.labs.userAgent.engine.getVersionForKey_(e, 'Firefox')
                : r[1];
            if ((e = e[0]) && (t = e[2]) && (t = /Trident\/([^\s;]+)/.exec(t)))
              return t[1];
          }
          return '';
        }),
        (goog.labs.userAgent.engine.getEngineTuple_ = function (e) {
          if (!goog.labs.userAgent.engine.isEdge()) return e[1];
          for (var t = 0; t < e.length; t++) {
            var r = e[t];
            if ('Edge' == r[0]) return r;
          }
        }),
        (goog.labs.userAgent.engine.isVersionOrHigher = function (e) {
          return (
            0 <=
            goog.string.compareVersions(
              goog.labs.userAgent.engine.getVersion(),
              e
            )
          );
        }),
        (goog.labs.userAgent.engine.getVersionForKey_ = function (e, t) {
          return (
            ((e = goog.array.find(e, function (e) {
              return t == e[0];
            })) &&
              e[1]) ||
            ''
          );
        }),
        (goog.userAgent = {}),
        (goog.userAgent.ASSUME_IE = !1),
        (goog.userAgent.ASSUME_EDGE = !1),
        (goog.userAgent.ASSUME_GECKO = !1),
        (goog.userAgent.ASSUME_WEBKIT = !1),
        (goog.userAgent.ASSUME_MOBILE_WEBKIT = !1),
        (goog.userAgent.ASSUME_OPERA = !1),
        (goog.userAgent.ASSUME_ANY_VERSION = !1),
        (goog.userAgent.BROWSER_KNOWN_ =
          goog.userAgent.ASSUME_IE ||
          goog.userAgent.ASSUME_EDGE ||
          goog.userAgent.ASSUME_GECKO ||
          goog.userAgent.ASSUME_MOBILE_WEBKIT ||
          goog.userAgent.ASSUME_WEBKIT ||
          goog.userAgent.ASSUME_OPERA),
        (goog.userAgent.getUserAgentString = function () {
          return goog.labs.userAgent.util.getUserAgent();
        }),
        (goog.userAgent.getNavigatorTyped = function () {
          return goog.global.navigator || null;
        }),
        (goog.userAgent.getNavigator = function () {
          return goog.userAgent.getNavigatorTyped();
        }),
        (goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_
          ? goog.userAgent.ASSUME_OPERA
          : goog.labs.userAgent.browser.isOpera()),
        (goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_
          ? goog.userAgent.ASSUME_IE
          : goog.labs.userAgent.browser.isIE()),
        (goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_
          ? goog.userAgent.ASSUME_EDGE
          : goog.labs.userAgent.engine.isEdge()),
        (goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE),
        (goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_
          ? goog.userAgent.ASSUME_GECKO
          : goog.labs.userAgent.engine.isGecko());
      (goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_
        ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT
        : goog.labs.userAgent.engine.isWebKit()),
        (goog.userAgent.isMobile_ = function () {
          return (
            goog.userAgent.WEBKIT &&
            goog.labs.userAgent.util.matchUserAgent('Mobile')
          );
        }),
        (goog.userAgent.MOBILE =
          goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_()),
        (goog.userAgent.SAFARI = goog.userAgent.WEBKIT),
        (goog.userAgent.determinePlatform_ = function () {
          var e = goog.userAgent.getNavigatorTyped();
          return (e && e.platform) || '';
        }),
        (goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_()),
        (goog.userAgent.ASSUME_MAC = !1),
        (goog.userAgent.ASSUME_WINDOWS = !1),
        (goog.userAgent.ASSUME_LINUX = !1),
        (goog.userAgent.ASSUME_X11 = !1),
        (goog.userAgent.ASSUME_ANDROID = !1),
        (goog.userAgent.ASSUME_IPHONE = !1),
        (goog.userAgent.ASSUME_IPAD = !1),
        (goog.userAgent.ASSUME_IPOD = !1),
        (goog.userAgent.ASSUME_KAIOS = !1),
        (goog.userAgent.ASSUME_GO2PHONE = !1),
        (goog.userAgent.PLATFORM_KNOWN_ =
          goog.userAgent.ASSUME_MAC ||
          goog.userAgent.ASSUME_WINDOWS ||
          goog.userAgent.ASSUME_LINUX ||
          goog.userAgent.ASSUME_X11 ||
          goog.userAgent.ASSUME_ANDROID ||
          goog.userAgent.ASSUME_IPHONE ||
          goog.userAgent.ASSUME_IPAD ||
          goog.userAgent.ASSUME_IPOD),
        (goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_MAC
          : goog.labs.userAgent.platform.isMacintosh()),
        (goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_WINDOWS
          : goog.labs.userAgent.platform.isWindows()),
        (goog.userAgent.isLegacyLinux_ = function () {
          return (
            goog.labs.userAgent.platform.isLinux() ||
            goog.labs.userAgent.platform.isChromeOS()
          );
        }),
        (goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_LINUX
          : goog.userAgent.isLegacyLinux_()),
        (goog.userAgent.isX11_ = function () {
          var e = goog.userAgent.getNavigatorTyped();
          return !!e && goog.string.contains(e.appVersion || '', 'X11');
        }),
        (goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_X11
          : goog.userAgent.isX11_()),
        (goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_ANDROID
          : goog.labs.userAgent.platform.isAndroid()),
        (goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_IPHONE
          : goog.labs.userAgent.platform.isIphone()),
        (goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_IPAD
          : goog.labs.userAgent.platform.isIpad()),
        (goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_IPOD
          : goog.labs.userAgent.platform.isIpod()),
        (goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_IPHONE ||
            goog.userAgent.ASSUME_IPAD ||
            goog.userAgent.ASSUME_IPOD
          : goog.labs.userAgent.platform.isIos()),
        (goog.userAgent.KAIOS = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_KAIOS
          : goog.labs.userAgent.platform.isKaiOS()),
        (goog.userAgent.GO2PHONE = goog.userAgent.PLATFORM_KNOWN_
          ? goog.userAgent.ASSUME_GO2PHONE
          : goog.labs.userAgent.platform.isGo2Phone()),
        (goog.userAgent.determineVersion_ = function () {
          var e = '',
            t = goog.userAgent.getVersionRegexResult_();
          return (
            t && (e = t ? t[1] : ''),
            goog.userAgent.IE &&
            null != (t = goog.userAgent.getDocumentMode_()) &&
            t > parseFloat(e)
              ? String(t)
              : e
          );
        }),
        (goog.userAgent.getVersionRegexResult_ = function () {
          var e = goog.userAgent.getUserAgentString();
          return goog.userAgent.GECKO
            ? /rv:([^\);]+)(\)|;)/.exec(e)
            : goog.userAgent.EDGE
            ? /Edge\/([\d\.]+)/.exec(e)
            : goog.userAgent.IE
            ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e)
            : goog.userAgent.WEBKIT
            ? /WebKit\/(\S+)/.exec(e)
            : goog.userAgent.OPERA
            ? /(?:Version)[ \/]?(\S+)/.exec(e)
            : void 0;
        }),
        (goog.userAgent.getDocumentMode_ = function () {
          var e = goog.global.document;
          return e ? e.documentMode : void 0;
        }),
        (goog.userAgent.VERSION = goog.userAgent.determineVersion_()),
        (goog.userAgent.compare = function (e, t) {
          return goog.string.compareVersions(e, t);
        }),
        (goog.userAgent.isVersionOrHigherCache_ = {}),
        (goog.userAgent.isVersionOrHigher = function (e) {
          return (
            goog.userAgent.ASSUME_ANY_VERSION ||
            goog.reflect.cache(
              goog.userAgent.isVersionOrHigherCache_,
              e,
              function () {
                return (
                  0 <= goog.string.compareVersions(goog.userAgent.VERSION, e)
                );
              }
            )
          );
        }),
        (goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher),
        (goog.userAgent.isDocumentModeOrHigher = function (e) {
          return Number(goog.userAgent.DOCUMENT_MODE) >= e;
        }),
        (goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher),
        (goog.userAgent.DOCUMENT_MODE = (function () {
          if (goog.global.document && goog.userAgent.IE)
            return goog.userAgent.getDocumentMode_();
        })()),
        (goog.userAgent.product = {}),
        (goog.userAgent.product.ASSUME_FIREFOX = !1),
        (goog.userAgent.product.ASSUME_IPHONE = !1),
        (goog.userAgent.product.ASSUME_IPAD = !1),
        (goog.userAgent.product.ASSUME_ANDROID = !1),
        (goog.userAgent.product.ASSUME_CHROME = !1),
        (goog.userAgent.product.ASSUME_SAFARI = !1),
        (goog.userAgent.product.PRODUCT_KNOWN_ =
          goog.userAgent.ASSUME_IE ||
          goog.userAgent.ASSUME_EDGE ||
          goog.userAgent.ASSUME_OPERA ||
          goog.userAgent.product.ASSUME_FIREFOX ||
          goog.userAgent.product.ASSUME_IPHONE ||
          goog.userAgent.product.ASSUME_IPAD ||
          goog.userAgent.product.ASSUME_ANDROID ||
          goog.userAgent.product.ASSUME_CHROME ||
          goog.userAgent.product.ASSUME_SAFARI),
        (goog.userAgent.product.OPERA = goog.userAgent.OPERA),
        (goog.userAgent.product.IE = goog.userAgent.IE),
        (goog.userAgent.product.EDGE = goog.userAgent.EDGE),
        (goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_
          ? goog.userAgent.product.ASSUME_FIREFOX
          : goog.labs.userAgent.browser.isFirefox()),
        (goog.userAgent.product.isIphoneOrIpod_ = function () {
          return (
            goog.labs.userAgent.platform.isIphone() ||
            goog.labs.userAgent.platform.isIpod()
          );
        }),
        (goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_
          ? goog.userAgent.product.ASSUME_IPHONE
          : goog.userAgent.product.isIphoneOrIpod_()),
        (goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_
          ? goog.userAgent.product.ASSUME_IPAD
          : goog.labs.userAgent.platform.isIpad()),
        (goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_
          ? goog.userAgent.product.ASSUME_ANDROID
          : goog.labs.userAgent.browser.isAndroidBrowser()),
        (goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_
          ? goog.userAgent.product.ASSUME_CHROME
          : goog.labs.userAgent.browser.isChrome()),
        (goog.userAgent.product.isSafariDesktop_ = function () {
          return (
            goog.labs.userAgent.browser.isSafari() &&
            !goog.labs.userAgent.platform.isIos()
          );
        }),
        (goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_
          ? goog.userAgent.product.ASSUME_SAFARI
          : goog.userAgent.product.isSafariDesktop_()),
        (goog.crypt.base64 = {}),
        (goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'),
        (goog.crypt.base64.ENCODED_VALS =
          goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + '+/='),
        (goog.crypt.base64.ENCODED_VALS_WEBSAFE =
          goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + '-_.'),
        (goog.crypt.base64.Alphabet = {
          DEFAULT: 0,
          NO_PADDING: 1,
          WEBSAFE: 2,
          WEBSAFE_DOT_PADDING: 3,
          WEBSAFE_NO_PADDING: 4,
        }),
        (goog.crypt.base64.paddingChars_ = '=.'),
        (goog.crypt.base64.isPadding_ = function (e) {
          return goog.string.contains(goog.crypt.base64.paddingChars_, e);
        }),
        (goog.crypt.base64.byteToCharMaps_ = {}),
        (goog.crypt.base64.charToByteMap_ = null),
        (goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ =
          goog.userAgent.GECKO ||
          (goog.userAgent.WEBKIT && !goog.userAgent.product.SAFARI) ||
          goog.userAgent.OPERA),
        (goog.crypt.base64.HAS_NATIVE_ENCODE_ =
          goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ ||
          'function' == typeof goog.global.btoa),
        (goog.crypt.base64.HAS_NATIVE_DECODE_ =
          goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ ||
          (!goog.userAgent.product.SAFARI &&
            !goog.userAgent.IE &&
            'function' == typeof goog.global.atob)),
        (goog.crypt.base64.encodeByteArray = function (e, t) {
          goog.asserts.assert(
            goog.isArrayLike(e),
            'encodeByteArray takes an array as a parameter'
          ),
            void 0 === t && (t = goog.crypt.base64.Alphabet.DEFAULT),
            goog.crypt.base64.init_(),
            (t = goog.crypt.base64.byteToCharMaps_[t]);
          for (var r = [], o = 0; o < e.length; o += 3) {
            var i = e[o],
              n = o + 1 < e.length,
              s = n ? e[o + 1] : 0,
              a = o + 2 < e.length,
              l = a ? e[o + 2] : 0,
              g = i >> 2;
            (i = ((3 & i) << 4) | (s >> 4)),
              (s = ((15 & s) << 2) | (l >> 6)),
              (l &= 63),
              a || ((l = 64), n || (s = 64)),
              r.push(t[g], t[i], t[s] || '', t[l] || '');
          }
          return r.join('');
        }),
        (goog.crypt.base64.encodeString = function (e, t) {
          return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !t
            ? goog.global.btoa(e)
            : goog.crypt.base64.encodeByteArray(
                goog.crypt.stringToByteArray(e),
                t
              );
        }),
        (goog.crypt.base64.decodeString = function (e, t) {
          if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !t)
            return goog.global.atob(e);
          var r = '';
          return (
            goog.crypt.base64.decodeStringInternal_(e, function (e) {
              r += String.fromCharCode(e);
            }),
            r
          );
        }),
        (goog.crypt.base64.decodeStringToByteArray = function (e, t) {
          var r = [];
          return (
            goog.crypt.base64.decodeStringInternal_(e, function (e) {
              r.push(e);
            }),
            r
          );
        }),
        (goog.crypt.base64.decodeStringToUint8Array = function (e) {
          goog.asserts.assert(
            !goog.userAgent.IE || goog.userAgent.isVersionOrHigher('10'),
            'Browser does not support typed arrays'
          );
          var t = e.length,
            r = (3 * t) / 4;
          r % 3
            ? (r = Math.floor(r))
            : goog.crypt.base64.isPadding_(e[t - 1]) &&
              (r = goog.crypt.base64.isPadding_(e[t - 2]) ? r - 2 : r - 1);
          var o = new Uint8Array(r),
            i = 0;
          return (
            goog.crypt.base64.decodeStringInternal_(e, function (e) {
              o[i++] = e;
            }),
            o.subarray(0, i)
          );
        }),
        (goog.crypt.base64.decodeStringInternal_ = function (e, t) {
          function r(t) {
            for (; o < e.length; ) {
              var r = e.charAt(o++),
                i = goog.crypt.base64.charToByteMap_[r];
              if (null != i) return i;
              if (!goog.string.isEmptyOrWhitespace(r))
                throw Error('Unknown base64 encoding at char: ' + r);
            }
            return t;
          }
          goog.crypt.base64.init_();
          for (var o = 0; ; ) {
            var i = r(-1),
              n = r(0),
              s = r(64),
              a = r(64);
            if (64 === a && -1 === i) break;
            t((i << 2) | (n >> 4)),
              64 != s &&
                (t(((n << 4) & 240) | (s >> 2)),
                64 != a && t(((s << 6) & 192) | a));
          }
        }),
        (goog.crypt.base64.init_ = function () {
          if (!goog.crypt.base64.charToByteMap_) {
            goog.crypt.base64.charToByteMap_ = {};
            for (
              var e = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_.split(''),
                t = ['+/=', '+/', '-_=', '-_.', '-_'],
                r = 0;
              5 > r;
              r++
            ) {
              var o = e.concat(t[r].split(''));
              goog.crypt.base64.byteToCharMaps_[r] = o;
              for (var i = 0; i < o.length; i++) {
                var n = o[i],
                  s = goog.crypt.base64.charToByteMap_[n];
                void 0 === s
                  ? (goog.crypt.base64.charToByteMap_[n] = i)
                  : goog.asserts.assert(s === i);
              }
            }
          }
        }),
        (jspb.utils = {}),
        (jspb.utils.split64Low = 0),
        (jspb.utils.split64High = 0),
        (jspb.utils.splitUint64 = function (e) {
          var t = e >>> 0;
          (e = Math.floor((e - t) / jspb.BinaryConstants.TWO_TO_32) >>> 0),
            (jspb.utils.split64Low = t),
            (jspb.utils.split64High = e);
        }),
        (jspb.utils.splitInt64 = function (e) {
          var t = 0 > e,
            r = (e = Math.abs(e)) >>> 0;
          (e = Math.floor((e - r) / jspb.BinaryConstants.TWO_TO_32)),
            (e >>>= 0),
            t &&
              ((e = ~e >>> 0),
              4294967295 < (r = 1 + (~r >>> 0)) &&
                ((r = 0), 4294967295 < ++e && (e = 0))),
            (jspb.utils.split64Low = r),
            (jspb.utils.split64High = e);
        }),
        (jspb.utils.splitZigzag64 = function (e) {
          var t = 0 > e;
          (e = 2 * Math.abs(e)),
            jspb.utils.splitUint64(e),
            (e = jspb.utils.split64Low);
          var r = jspb.utils.split64High;
          t &&
            (0 == e
              ? 0 == r
                ? (r = e = 4294967295)
                : (r--, (e = 4294967295))
              : e--),
            (jspb.utils.split64Low = e),
            (jspb.utils.split64High = r);
        }),
        (jspb.utils.splitFloat32 = function (e) {
          var t = 0 > e ? 1 : 0;
          if (0 === (e = t ? -e : e))
            0 < 1 / e
              ? ((jspb.utils.split64High = 0), (jspb.utils.split64Low = 0))
              : ((jspb.utils.split64High = 0),
                (jspb.utils.split64Low = 2147483648));
          else if (isNaN(e))
            (jspb.utils.split64High = 0), (jspb.utils.split64Low = 2147483647);
          else if (e > jspb.BinaryConstants.FLOAT32_MAX)
            (jspb.utils.split64High = 0),
              (jspb.utils.split64Low = ((t << 31) | 2139095040) >>> 0);
          else if (e < jspb.BinaryConstants.FLOAT32_MIN)
            (e = Math.round(e / Math.pow(2, -149))),
              (jspb.utils.split64High = 0),
              (jspb.utils.split64Low = ((t << 31) | e) >>> 0);
          else {
            var r = Math.floor(Math.log(e) / Math.LN2);
            (e *= Math.pow(2, -r)),
              (e = 8388607 & Math.round(e * jspb.BinaryConstants.TWO_TO_23)),
              (jspb.utils.split64High = 0),
              (jspb.utils.split64Low =
                ((t << 31) | ((r + 127) << 23) | e) >>> 0);
          }
        }),
        (jspb.utils.splitFloat64 = function (e) {
          var t = 0 > e ? 1 : 0;
          if (0 === (e = t ? -e : e))
            (jspb.utils.split64High = 0 < 1 / e ? 0 : 2147483648),
              (jspb.utils.split64Low = 0);
          else if (isNaN(e))
            (jspb.utils.split64High = 2147483647),
              (jspb.utils.split64Low = 4294967295);
          else if (e > jspb.BinaryConstants.FLOAT64_MAX)
            (jspb.utils.split64High = ((t << 31) | 2146435072) >>> 0),
              (jspb.utils.split64Low = 0);
          else if (e < jspb.BinaryConstants.FLOAT64_MIN) {
            var r = e / Math.pow(2, -1074);
            (e = r / jspb.BinaryConstants.TWO_TO_32),
              (jspb.utils.split64High = ((t << 31) | e) >>> 0),
              (jspb.utils.split64Low = r >>> 0);
          } else {
            var o = 0;
            if (2 <= (r = e)) for (; 2 <= r && 1023 > o; ) o++, (r /= 2);
            else for (; 1 > r && -1022 < o; ) (r *= 2), o--;
            (e =
              ((r = e * Math.pow(2, -o)) * jspb.BinaryConstants.TWO_TO_20) &
              1048575),
              (r = (r * jspb.BinaryConstants.TWO_TO_52) >>> 0),
              (jspb.utils.split64High =
                ((t << 31) | ((o + 1023) << 20) | e) >>> 0),
              (jspb.utils.split64Low = r);
          }
        }),
        (jspb.utils.splitHash64 = function (e) {
          var t = e.charCodeAt(0),
            r = e.charCodeAt(1),
            o = e.charCodeAt(2),
            i = e.charCodeAt(3),
            n = e.charCodeAt(4),
            s = e.charCodeAt(5),
            a = e.charCodeAt(6);
          (e = e.charCodeAt(7)),
            (jspb.utils.split64Low =
              (t + (r << 8) + (o << 16) + (i << 24)) >>> 0),
            (jspb.utils.split64High =
              (n + (s << 8) + (a << 16) + (e << 24)) >>> 0);
        }),
        (jspb.utils.joinUint64 = function (e, t) {
          return t * jspb.BinaryConstants.TWO_TO_32 + (e >>> 0);
        }),
        (jspb.utils.joinInt64 = function (e, t) {
          var r = 2147483648 & t;
          return (
            r &&
              ((t = ~t >>> 0),
              0 == (e = (1 + ~e) >>> 0) && (t = (t + 1) >>> 0)),
            (e = jspb.utils.joinUint64(e, t)),
            r ? -e : e
          );
        }),
        (jspb.utils.toZigzag64 = function (e, t, r) {
          var o = t >> 31;
          return r((e << 1) ^ o, ((t << 1) | (e >>> 31)) ^ o);
        }),
        (jspb.utils.joinZigzag64 = function (e, t) {
          return jspb.utils.fromZigzag64(e, t, jspb.utils.joinInt64);
        }),
        (jspb.utils.fromZigzag64 = function (e, t, r) {
          var o = -(1 & e);
          return r(((e >>> 1) | (t << 31)) ^ o, (t >>> 1) ^ o);
        }),
        (jspb.utils.joinFloat32 = function (e, t) {
          t = 2 * (e >> 31) + 1;
          var r = (e >>> 23) & 255;
          return (
            (e &= 8388607),
            255 == r
              ? e
                ? NaN
                : (1 / 0) * t
              : 0 == r
              ? t * Math.pow(2, -149) * e
              : t * Math.pow(2, r - 150) * (e + Math.pow(2, 23))
          );
        }),
        (jspb.utils.joinFloat64 = function (e, t) {
          var r = 2 * (t >> 31) + 1,
            o = (t >>> 20) & 2047;
          return (
            (e = jspb.BinaryConstants.TWO_TO_32 * (1048575 & t) + e),
            2047 == o
              ? e
                ? NaN
                : (1 / 0) * r
              : 0 == o
              ? r * Math.pow(2, -1074) * e
              : r * Math.pow(2, o - 1075) * (e + jspb.BinaryConstants.TWO_TO_52)
          );
        }),
        (jspb.utils.joinHash64 = function (e, t) {
          return String.fromCharCode(
            (e >>> 0) & 255,
            (e >>> 8) & 255,
            (e >>> 16) & 255,
            (e >>> 24) & 255,
            (t >>> 0) & 255,
            (t >>> 8) & 255,
            (t >>> 16) & 255,
            (t >>> 24) & 255
          );
        }),
        (jspb.utils.DIGITS = '0123456789abcdef'.split('')),
        (jspb.utils.ZERO_CHAR_CODE_ = 48),
        (jspb.utils.A_CHAR_CODE_ = 97),
        (jspb.utils.joinUnsignedDecimalString = function (e, t) {
          function r(e, t) {
            return (
              (e = e ? String(e) : ''), t ? '0000000'.slice(e.length) + e : e
            );
          }
          if (2097151 >= t)
            return '' + (jspb.BinaryConstants.TWO_TO_32 * t + e);
          var o = (((e >>> 24) | (t << 8)) >>> 0) & 16777215;
          return (
            (e =
              (16777215 & e) + 6777216 * o + 6710656 * (t = (t >> 16) & 65535)),
            (o += 8147497 * t),
            (t *= 2),
            1e7 <= e && ((o += Math.floor(e / 1e7)), (e %= 1e7)),
            1e7 <= o && ((t += Math.floor(o / 1e7)), (o %= 1e7)),
            r(t, 0) + r(o, t) + r(e, 1)
          );
        }),
        (jspb.utils.joinSignedDecimalString = function (e, t) {
          var r = 2147483648 & t;
          return (
            r && (t = (~t + (0 == (e = (1 + ~e) >>> 0) ? 1 : 0)) >>> 0),
            (e = jspb.utils.joinUnsignedDecimalString(e, t)),
            r ? '-' + e : e
          );
        }),
        (jspb.utils.hash64ToDecimalString = function (e, t) {
          jspb.utils.splitHash64(e), (e = jspb.utils.split64Low);
          var r = jspb.utils.split64High;
          return t
            ? jspb.utils.joinSignedDecimalString(e, r)
            : jspb.utils.joinUnsignedDecimalString(e, r);
        }),
        (jspb.utils.hash64ArrayToDecimalStrings = function (e, t) {
          for (var r = Array(e.length), o = 0; o < e.length; o++)
            r[o] = jspb.utils.hash64ToDecimalString(e[o], t);
          return r;
        }),
        (jspb.utils.decimalStringToHash64 = function (e) {
          function t(e, t) {
            for (var r = 0; 8 > r && (1 !== e || 0 < t); r++)
              (t = e * o[r] + t), (o[r] = 255 & t), (t >>>= 8);
          }
          goog.asserts.assert(0 < e.length);
          var r = !1;
          '-' === e[0] && ((r = !0), (e = e.slice(1)));
          for (var o = [0, 0, 0, 0, 0, 0, 0, 0], i = 0; i < e.length; i++)
            t(10, e.charCodeAt(i) - jspb.utils.ZERO_CHAR_CODE_);
          return (
            r &&
              ((function () {
                for (var e = 0; 8 > e; e++) o[e] = 255 & ~o[e];
              })(),
              t(1, 1)),
            goog.crypt.byteArrayToString(o)
          );
        }),
        (jspb.utils.splitDecimalString = function (e) {
          jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(e));
        }),
        (jspb.utils.toHexDigit_ = function (e) {
          return String.fromCharCode(
            10 > e
              ? jspb.utils.ZERO_CHAR_CODE_ + e
              : jspb.utils.A_CHAR_CODE_ - 10 + e
          );
        }),
        (jspb.utils.fromHexCharCode_ = function (e) {
          return e >= jspb.utils.A_CHAR_CODE_
            ? e - jspb.utils.A_CHAR_CODE_ + 10
            : e - jspb.utils.ZERO_CHAR_CODE_;
        }),
        (jspb.utils.hash64ToHexString = function (e) {
          var t = Array(18);
          (t[0] = '0'), (t[1] = 'x');
          for (var r = 0; 8 > r; r++) {
            var o = e.charCodeAt(7 - r);
            (t[2 * r + 2] = jspb.utils.toHexDigit_(o >> 4)),
              (t[2 * r + 3] = jspb.utils.toHexDigit_(15 & o));
          }
          return t.join('');
        }),
        (jspb.utils.hexStringToHash64 = function (e) {
          (e = e.toLowerCase()),
            goog.asserts.assert(18 == e.length),
            goog.asserts.assert('0' == e[0]),
            goog.asserts.assert('x' == e[1]);
          for (var t = '', r = 0; 8 > r; r++) {
            var o = jspb.utils.fromHexCharCode_(e.charCodeAt(2 * r + 2)),
              i = jspb.utils.fromHexCharCode_(e.charCodeAt(2 * r + 3));
            t = String.fromCharCode(16 * o + i) + t;
          }
          return t;
        }),
        (jspb.utils.hash64ToNumber = function (e, t) {
          jspb.utils.splitHash64(e), (e = jspb.utils.split64Low);
          var r = jspb.utils.split64High;
          return t ? jspb.utils.joinInt64(e, r) : jspb.utils.joinUint64(e, r);
        }),
        (jspb.utils.numberToHash64 = function (e) {
          return (
            jspb.utils.splitInt64(e),
            jspb.utils.joinHash64(jspb.utils.split64Low, jspb.utils.split64High)
          );
        }),
        (jspb.utils.countVarints = function (e, t, r) {
          for (var o = 0, i = t; i < r; i++) o += e[i] >> 7;
          return r - t - o;
        }),
        (jspb.utils.countVarintFields = function (e, t, r, o) {
          var i = 0;
          if (128 > (o = 8 * o + jspb.BinaryConstants.WireType.VARINT))
            for (; t < r && e[t++] == o; )
              for (i++; ; ) {
                var n = e[t++];
                if (0 == (128 & n)) break;
              }
          else
            for (; t < r; ) {
              for (n = o; 128 < n; ) {
                if (e[t] != ((127 & n) | 128)) return i;
                t++, (n >>= 7);
              }
              if (e[t++] != n) break;
              for (i++; 0 != (128 & (n = e[t++])); );
            }
          return i;
        }),
        (jspb.utils.countFixedFields_ = function (e, t, r, o, i) {
          var n = 0;
          if (128 > o) for (; t < r && e[t++] == o; ) n++, (t += i);
          else
            for (; t < r; ) {
              for (var s = o; 128 < s; ) {
                if (e[t++] != ((127 & s) | 128)) return n;
                s >>= 7;
              }
              if (e[t++] != s) break;
              n++, (t += i);
            }
          return n;
        }),
        (jspb.utils.countFixed32Fields = function (e, t, r, o) {
          return jspb.utils.countFixedFields_(
            e,
            t,
            r,
            8 * o + jspb.BinaryConstants.WireType.FIXED32,
            4
          );
        }),
        (jspb.utils.countFixed64Fields = function (e, t, r, o) {
          return jspb.utils.countFixedFields_(
            e,
            t,
            r,
            8 * o + jspb.BinaryConstants.WireType.FIXED64,
            8
          );
        }),
        (jspb.utils.countDelimitedFields = function (e, t, r, o) {
          var i = 0;
          for (o = 8 * o + jspb.BinaryConstants.WireType.DELIMITED; t < r; ) {
            for (var n = o; 128 < n; ) {
              if (e[t++] != ((127 & n) | 128)) return i;
              n >>= 7;
            }
            if (e[t++] != n) break;
            i++;
            for (
              var s = 0, a = 1;
              (s += (127 & (n = e[t++])) * a), (a *= 128), 0 != (128 & n);

            );
            t += s;
          }
          return i;
        }),
        (jspb.utils.debugBytesToTextFormat = function (e) {
          var t = '"';
          if (e) {
            e = jspb.utils.byteSourceToUint8Array(e);
            for (var r = 0; r < e.length; r++)
              (t += '\\x'), 16 > e[r] && (t += '0'), (t += e[r].toString(16));
          }
          return t + '"';
        }),
        (jspb.utils.debugScalarToTextFormat = function (e) {
          return 'string' == typeof e ? goog.string.quote(e) : e.toString();
        }),
        (jspb.utils.stringToByteArray = function (e) {
          for (var t = new Uint8Array(e.length), r = 0; r < e.length; r++) {
            var o = e.charCodeAt(r);
            if (255 < o)
              throw Error(
                'Conversion error: string contains codepoint outside of byte range'
              );
            t[r] = o;
          }
          return t;
        }),
        (jspb.utils.byteSourceToUint8Array = function (e) {
          return e.constructor === Uint8Array
            ? e
            : e.constructor === ArrayBuffer ||
              (void 0 !== Buffer && e.constructor === Buffer) ||
              e.constructor === Array
            ? new Uint8Array(e)
            : e.constructor === String
            ? goog.crypt.base64.decodeStringToUint8Array(e)
            : (goog.asserts.fail('Type not convertible to Uint8Array.'),
              new Uint8Array(0));
        }),
        (jspb.BinaryDecoder = function (e, t, r) {
          (this.bytes_ = null),
            (this.cursor_ = this.end_ = this.start_ = 0),
            (this.error_ = !1),
            e && this.setBlock(e, t, r);
        }),
        (jspb.BinaryDecoder.instanceCache_ = []),
        (jspb.BinaryDecoder.alloc = function (e, t, r) {
          if (jspb.BinaryDecoder.instanceCache_.length) {
            var o = jspb.BinaryDecoder.instanceCache_.pop();
            return e && o.setBlock(e, t, r), o;
          }
          return new jspb.BinaryDecoder(e, t, r);
        }),
        (jspb.BinaryDecoder.prototype.free = function () {
          this.clear(),
            100 > jspb.BinaryDecoder.instanceCache_.length &&
              jspb.BinaryDecoder.instanceCache_.push(this);
        }),
        (jspb.BinaryDecoder.prototype.clone = function () {
          return jspb.BinaryDecoder.alloc(
            this.bytes_,
            this.start_,
            this.end_ - this.start_
          );
        }),
        (jspb.BinaryDecoder.prototype.clear = function () {
          (this.bytes_ = null),
            (this.cursor_ = this.end_ = this.start_ = 0),
            (this.error_ = !1);
        }),
        (jspb.BinaryDecoder.prototype.getBuffer = function () {
          return this.bytes_;
        }),
        (jspb.BinaryDecoder.prototype.setBlock = function (e, t, r) {
          (this.bytes_ = jspb.utils.byteSourceToUint8Array(e)),
            (this.start_ = void 0 !== t ? t : 0),
            (this.end_ = void 0 !== r ? this.start_ + r : this.bytes_.length),
            (this.cursor_ = this.start_);
        }),
        (jspb.BinaryDecoder.prototype.getEnd = function () {
          return this.end_;
        }),
        (jspb.BinaryDecoder.prototype.setEnd = function (e) {
          this.end_ = e;
        }),
        (jspb.BinaryDecoder.prototype.reset = function () {
          this.cursor_ = this.start_;
        }),
        (jspb.BinaryDecoder.prototype.getCursor = function () {
          return this.cursor_;
        }),
        (jspb.BinaryDecoder.prototype.setCursor = function (e) {
          this.cursor_ = e;
        }),
        (jspb.BinaryDecoder.prototype.advance = function (e) {
          (this.cursor_ += e), goog.asserts.assert(this.cursor_ <= this.end_);
        }),
        (jspb.BinaryDecoder.prototype.atEnd = function () {
          return this.cursor_ == this.end_;
        }),
        (jspb.BinaryDecoder.prototype.pastEnd = function () {
          return this.cursor_ > this.end_;
        }),
        (jspb.BinaryDecoder.prototype.getError = function () {
          return this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_;
        }),
        (jspb.BinaryDecoder.prototype.readSplitVarint64 = function (e) {
          for (var t = 128, r = 0, o = 0, i = 0; 4 > i && 128 <= t; i++)
            r |= (127 & (t = this.bytes_[this.cursor_++])) << (7 * i);
          if (
            (128 <= t &&
              ((r |= (127 & (t = this.bytes_[this.cursor_++])) << 28),
              (o |= (127 & t) >> 4)),
            128 <= t)
          )
            for (i = 0; 5 > i && 128 <= t; i++)
              o |= (127 & (t = this.bytes_[this.cursor_++])) << (7 * i + 3);
          if (128 > t) return e(r >>> 0, o >>> 0);
          goog.asserts.fail('Failed to read varint, encoding is invalid.'),
            (this.error_ = !0);
        }),
        (jspb.BinaryDecoder.prototype.readSplitZigzagVarint64 = function (e) {
          return this.readSplitVarint64(function (t, r) {
            return jspb.utils.fromZigzag64(t, r, e);
          });
        }),
        (jspb.BinaryDecoder.prototype.readSplitFixed64 = function (e) {
          var t = this.bytes_,
            r = this.cursor_;
          this.cursor_ += 8;
          for (var o = 0, i = 0, n = r + 7; n >= r; n--)
            (o = (o << 8) | t[n]), (i = (i << 8) | t[n + 4]);
          return e(o, i);
        }),
        (jspb.BinaryDecoder.prototype.skipVarint = function () {
          for (; 128 & this.bytes_[this.cursor_]; ) this.cursor_++;
          this.cursor_++;
        }),
        (jspb.BinaryDecoder.prototype.unskipVarint = function (e) {
          for (; 128 < e; ) this.cursor_--, (e >>>= 7);
          this.cursor_--;
        }),
        (jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function () {
          var e = this.bytes_,
            t = e[this.cursor_ + 0],
            r = 127 & t;
          return 128 > t
            ? ((this.cursor_ += 1),
              goog.asserts.assert(this.cursor_ <= this.end_),
              r)
            : ((r |= (127 & (t = e[this.cursor_ + 1])) << 7),
              128 > t
                ? ((this.cursor_ += 2),
                  goog.asserts.assert(this.cursor_ <= this.end_),
                  r)
                : ((r |= (127 & (t = e[this.cursor_ + 2])) << 14),
                  128 > t
                    ? ((this.cursor_ += 3),
                      goog.asserts.assert(this.cursor_ <= this.end_),
                      r)
                    : ((r |= (127 & (t = e[this.cursor_ + 3])) << 21),
                      128 > t
                        ? ((this.cursor_ += 4),
                          goog.asserts.assert(this.cursor_ <= this.end_),
                          r)
                        : ((r |= (15 & (t = e[this.cursor_ + 4])) << 28),
                          128 > t
                            ? ((this.cursor_ += 5),
                              goog.asserts.assert(this.cursor_ <= this.end_),
                              r >>> 0)
                            : ((this.cursor_ += 5),
                              128 <= e[this.cursor_++] &&
                                128 <= e[this.cursor_++] &&
                                128 <= e[this.cursor_++] &&
                                128 <= e[this.cursor_++] &&
                                128 <= e[this.cursor_++] &&
                                goog.asserts.assert(!1),
                              goog.asserts.assert(this.cursor_ <= this.end_),
                              r)))));
        }),
        (jspb.BinaryDecoder.prototype.readSignedVarint32 =
          jspb.BinaryDecoder.prototype.readUnsignedVarint32),
        (jspb.BinaryDecoder.prototype.readUnsignedVarint32String = function () {
          return this.readUnsignedVarint32().toString();
        }),
        (jspb.BinaryDecoder.prototype.readSignedVarint32String = function () {
          return this.readSignedVarint32().toString();
        }),
        (jspb.BinaryDecoder.prototype.readZigzagVarint32 = function () {
          var e = this.readUnsignedVarint32();
          return (e >>> 1) ^ -(1 & e);
        }),
        (jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function () {
          return this.readSplitVarint64(jspb.utils.joinUint64);
        }),
        (jspb.BinaryDecoder.prototype.readUnsignedVarint64String = function () {
          return this.readSplitVarint64(jspb.utils.joinUnsignedDecimalString);
        }),
        (jspb.BinaryDecoder.prototype.readSignedVarint64 = function () {
          return this.readSplitVarint64(jspb.utils.joinInt64);
        }),
        (jspb.BinaryDecoder.prototype.readSignedVarint64String = function () {
          return this.readSplitVarint64(jspb.utils.joinSignedDecimalString);
        }),
        (jspb.BinaryDecoder.prototype.readZigzagVarint64 = function () {
          return this.readSplitVarint64(jspb.utils.joinZigzag64);
        }),
        (jspb.BinaryDecoder.prototype.readZigzagVarintHash64 = function () {
          return this.readSplitZigzagVarint64(jspb.utils.joinHash64);
        }),
        (jspb.BinaryDecoder.prototype.readZigzagVarint64String = function () {
          return this.readSplitZigzagVarint64(
            jspb.utils.joinSignedDecimalString
          );
        }),
        (jspb.BinaryDecoder.prototype.readUint8 = function () {
          var e = this.bytes_[this.cursor_ + 0];
          return (
            (this.cursor_ += 1),
            goog.asserts.assert(this.cursor_ <= this.end_),
            e
          );
        }),
        (jspb.BinaryDecoder.prototype.readUint16 = function () {
          var e = this.bytes_[this.cursor_ + 0],
            t = this.bytes_[this.cursor_ + 1];
          return (
            (this.cursor_ += 2),
            goog.asserts.assert(this.cursor_ <= this.end_),
            (e << 0) | (t << 8)
          );
        }),
        (jspb.BinaryDecoder.prototype.readUint32 = function () {
          var e = this.bytes_[this.cursor_ + 0],
            t = this.bytes_[this.cursor_ + 1],
            r = this.bytes_[this.cursor_ + 2],
            o = this.bytes_[this.cursor_ + 3];
          return (
            (this.cursor_ += 4),
            goog.asserts.assert(this.cursor_ <= this.end_),
            ((e << 0) | (t << 8) | (r << 16) | (o << 24)) >>> 0
          );
        }),
        (jspb.BinaryDecoder.prototype.readUint64 = function () {
          var e = this.readUint32(),
            t = this.readUint32();
          return jspb.utils.joinUint64(e, t);
        }),
        (jspb.BinaryDecoder.prototype.readUint64String = function () {
          var e = this.readUint32(),
            t = this.readUint32();
          return jspb.utils.joinUnsignedDecimalString(e, t);
        }),
        (jspb.BinaryDecoder.prototype.readInt8 = function () {
          var e = this.bytes_[this.cursor_ + 0];
          return (
            (this.cursor_ += 1),
            goog.asserts.assert(this.cursor_ <= this.end_),
            (e << 24) >> 24
          );
        }),
        (jspb.BinaryDecoder.prototype.readInt16 = function () {
          var e = this.bytes_[this.cursor_ + 0],
            t = this.bytes_[this.cursor_ + 1];
          return (
            (this.cursor_ += 2),
            goog.asserts.assert(this.cursor_ <= this.end_),
            (((e << 0) | (t << 8)) << 16) >> 16
          );
        }),
        (jspb.BinaryDecoder.prototype.readInt32 = function () {
          var e = this.bytes_[this.cursor_ + 0],
            t = this.bytes_[this.cursor_ + 1],
            r = this.bytes_[this.cursor_ + 2],
            o = this.bytes_[this.cursor_ + 3];
          return (
            (this.cursor_ += 4),
            goog.asserts.assert(this.cursor_ <= this.end_),
            (e << 0) | (t << 8) | (r << 16) | (o << 24)
          );
        }),
        (jspb.BinaryDecoder.prototype.readInt64 = function () {
          var e = this.readUint32(),
            t = this.readUint32();
          return jspb.utils.joinInt64(e, t);
        }),
        (jspb.BinaryDecoder.prototype.readInt64String = function () {
          var e = this.readUint32(),
            t = this.readUint32();
          return jspb.utils.joinSignedDecimalString(e, t);
        }),
        (jspb.BinaryDecoder.prototype.readFloat = function () {
          var e = this.readUint32();
          return jspb.utils.joinFloat32(e, 0);
        }),
        (jspb.BinaryDecoder.prototype.readDouble = function () {
          var e = this.readUint32(),
            t = this.readUint32();
          return jspb.utils.joinFloat64(e, t);
        }),
        (jspb.BinaryDecoder.prototype.readBool = function () {
          return !!this.bytes_[this.cursor_++];
        }),
        (jspb.BinaryDecoder.prototype.readEnum = function () {
          return this.readSignedVarint32();
        }),
        (jspb.BinaryDecoder.prototype.readString = function (e) {
          var t = this.bytes_,
            r = this.cursor_;
          e = r + e;
          for (var o = [], i = ''; r < e; ) {
            var n = t[r++];
            if (128 > n) o.push(n);
            else {
              if (192 > n) continue;
              if (224 > n) {
                var s = t[r++];
                o.push(((31 & n) << 6) | (63 & s));
              } else if (240 > n) {
                s = t[r++];
                var a = t[r++];
                o.push(((15 & n) << 12) | ((63 & s) << 6) | (63 & a));
              } else if (248 > n) {
                (n =
                  ((7 & n) << 18) |
                  ((63 & (s = t[r++])) << 12) |
                  ((63 & (a = t[r++])) << 6) |
                  (63 & t[r++])),
                  (n -= 65536),
                  o.push(55296 + ((n >> 10) & 1023), 56320 + (1023 & n));
              }
            }
            8192 <= o.length &&
              ((i += String.fromCharCode.apply(null, o)), (o.length = 0));
          }
          return (i += goog.crypt.byteArrayToString(o)), (this.cursor_ = r), i;
        }),
        (jspb.BinaryDecoder.prototype.readStringWithLength = function () {
          var e = this.readUnsignedVarint32();
          return this.readString(e);
        }),
        (jspb.BinaryDecoder.prototype.readBytes = function (e) {
          if (0 > e || this.cursor_ + e > this.bytes_.length)
            return (
              (this.error_ = !0),
              goog.asserts.fail('Invalid byte length!'),
              new Uint8Array(0)
            );
          var t = this.bytes_.subarray(this.cursor_, this.cursor_ + e);
          return (
            (this.cursor_ += e),
            goog.asserts.assert(this.cursor_ <= this.end_),
            t
          );
        }),
        (jspb.BinaryDecoder.prototype.readVarintHash64 = function () {
          return this.readSplitVarint64(jspb.utils.joinHash64);
        }),
        (jspb.BinaryDecoder.prototype.readFixedHash64 = function () {
          var e = this.bytes_,
            t = this.cursor_,
            r = e[t + 0],
            o = e[t + 1],
            i = e[t + 2],
            n = e[t + 3],
            s = e[t + 4],
            a = e[t + 5],
            l = e[t + 6];
          return (
            (e = e[t + 7]),
            (this.cursor_ += 8),
            String.fromCharCode(r, o, i, n, s, a, l, e)
          );
        }),
        (jspb.BinaryReader = function (e, t, r) {
          (this.decoder_ = jspb.BinaryDecoder.alloc(e, t, r)),
            (this.fieldCursor_ = this.decoder_.getCursor()),
            (this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER),
            (this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID),
            (this.error_ = !1),
            (this.readCallbacks_ = null);
        }),
        (jspb.BinaryReader.instanceCache_ = []),
        (jspb.BinaryReader.alloc = function (e, t, r) {
          if (jspb.BinaryReader.instanceCache_.length) {
            var o = jspb.BinaryReader.instanceCache_.pop();
            return e && o.decoder_.setBlock(e, t, r), o;
          }
          return new jspb.BinaryReader(e, t, r);
        }),
        (jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc),
        (jspb.BinaryReader.prototype.free = function () {
          this.decoder_.clear(),
            (this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER),
            (this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID),
            (this.error_ = !1),
            (this.readCallbacks_ = null),
            100 > jspb.BinaryReader.instanceCache_.length &&
              jspb.BinaryReader.instanceCache_.push(this);
        }),
        (jspb.BinaryReader.prototype.getFieldCursor = function () {
          return this.fieldCursor_;
        }),
        (jspb.BinaryReader.prototype.getCursor = function () {
          return this.decoder_.getCursor();
        }),
        (jspb.BinaryReader.prototype.getBuffer = function () {
          return this.decoder_.getBuffer();
        }),
        (jspb.BinaryReader.prototype.getFieldNumber = function () {
          return this.nextField_;
        }),
        (jspb.BinaryReader.prototype.getWireType = function () {
          return this.nextWireType_;
        }),
        (jspb.BinaryReader.prototype.isEndGroup = function () {
          return this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP;
        }),
        (jspb.BinaryReader.prototype.getError = function () {
          return this.error_ || this.decoder_.getError();
        }),
        (jspb.BinaryReader.prototype.setBlock = function (e, t, r) {
          this.decoder_.setBlock(e, t, r),
            (this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER),
            (this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID);
        }),
        (jspb.BinaryReader.prototype.reset = function () {
          this.decoder_.reset(),
            (this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER),
            (this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID);
        }),
        (jspb.BinaryReader.prototype.advance = function (e) {
          this.decoder_.advance(e);
        }),
        (jspb.BinaryReader.prototype.nextField = function () {
          if (this.decoder_.atEnd()) return !1;
          if (this.getError())
            return goog.asserts.fail('Decoder hit an error'), !1;
          this.fieldCursor_ = this.decoder_.getCursor();
          var e = this.decoder_.readUnsignedVarint32(),
            t = e >>> 3;
          return (e &= 7) != jspb.BinaryConstants.WireType.VARINT &&
            e != jspb.BinaryConstants.WireType.FIXED32 &&
            e != jspb.BinaryConstants.WireType.FIXED64 &&
            e != jspb.BinaryConstants.WireType.DELIMITED &&
            e != jspb.BinaryConstants.WireType.START_GROUP &&
            e != jspb.BinaryConstants.WireType.END_GROUP
            ? (goog.asserts.fail(
                'Invalid wire type: %s (at position %s)',
                e,
                this.fieldCursor_
              ),
              (this.error_ = !0),
              !1)
            : ((this.nextField_ = t), (this.nextWireType_ = e), !0);
        }),
        (jspb.BinaryReader.prototype.unskipHeader = function () {
          this.decoder_.unskipVarint(
            (this.nextField_ << 3) | this.nextWireType_
          );
        }),
        (jspb.BinaryReader.prototype.skipMatchingFields = function () {
          var e = this.nextField_;
          for (
            this.unskipHeader();
            this.nextField() && this.getFieldNumber() == e;

          )
            this.skipField();
          this.decoder_.atEnd() || this.unskipHeader();
        }),
        (jspb.BinaryReader.prototype.skipVarintField = function () {
          this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT
            ? (goog.asserts.fail('Invalid wire type for skipVarintField'),
              this.skipField())
            : this.decoder_.skipVarint();
        }),
        (jspb.BinaryReader.prototype.skipDelimitedField = function () {
          if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED)
            goog.asserts.fail('Invalid wire type for skipDelimitedField'),
              this.skipField();
          else {
            var e = this.decoder_.readUnsignedVarint32();
            this.decoder_.advance(e);
          }
        }),
        (jspb.BinaryReader.prototype.skipFixed32Field = function () {
          this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32
            ? (goog.asserts.fail('Invalid wire type for skipFixed32Field'),
              this.skipField())
            : this.decoder_.advance(4);
        }),
        (jspb.BinaryReader.prototype.skipFixed64Field = function () {
          this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64
            ? (goog.asserts.fail('Invalid wire type for skipFixed64Field'),
              this.skipField())
            : this.decoder_.advance(8);
        }),
        (jspb.BinaryReader.prototype.skipGroup = function () {
          for (var e = this.nextField_; ; ) {
            if (!this.nextField()) {
              goog.asserts.fail('Unmatched start-group tag: stream EOF'),
                (this.error_ = !0);
              break;
            }
            if (this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP) {
              this.nextField_ != e &&
                (goog.asserts.fail('Unmatched end-group tag'),
                (this.error_ = !0));
              break;
            }
            this.skipField();
          }
        }),
        (jspb.BinaryReader.prototype.skipField = function () {
          switch (this.nextWireType_) {
            case jspb.BinaryConstants.WireType.VARINT:
              this.skipVarintField();
              break;
            case jspb.BinaryConstants.WireType.FIXED64:
              this.skipFixed64Field();
              break;
            case jspb.BinaryConstants.WireType.DELIMITED:
              this.skipDelimitedField();
              break;
            case jspb.BinaryConstants.WireType.FIXED32:
              this.skipFixed32Field();
              break;
            case jspb.BinaryConstants.WireType.START_GROUP:
              this.skipGroup();
              break;
            default:
              goog.asserts.fail('Invalid wire encoding for field.');
          }
        }),
        (jspb.BinaryReader.prototype.registerReadCallback = function (e, t) {
          null === this.readCallbacks_ && (this.readCallbacks_ = {}),
            goog.asserts.assert(!this.readCallbacks_[e]),
            (this.readCallbacks_[e] = t);
        }),
        (jspb.BinaryReader.prototype.runReadCallback = function (e) {
          return (
            goog.asserts.assert(null !== this.readCallbacks_),
            (e = this.readCallbacks_[e]),
            goog.asserts.assert(e),
            e(this)
          );
        }),
        (jspb.BinaryReader.prototype.readAny = function (e) {
          this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(e);
          var t = jspb.BinaryConstants.FieldType;
          switch (e) {
            case t.DOUBLE:
              return this.readDouble();
            case t.FLOAT:
              return this.readFloat();
            case t.INT64:
              return this.readInt64();
            case t.UINT64:
              return this.readUint64();
            case t.INT32:
              return this.readInt32();
            case t.FIXED64:
              return this.readFixed64();
            case t.FIXED32:
              return this.readFixed32();
            case t.BOOL:
              return this.readBool();
            case t.STRING:
              return this.readString();
            case t.GROUP:
              goog.asserts.fail('Group field type not supported in readAny()');
            case t.MESSAGE:
              goog.asserts.fail(
                'Message field type not supported in readAny()'
              );
            case t.BYTES:
              return this.readBytes();
            case t.UINT32:
              return this.readUint32();
            case t.ENUM:
              return this.readEnum();
            case t.SFIXED32:
              return this.readSfixed32();
            case t.SFIXED64:
              return this.readSfixed64();
            case t.SINT32:
              return this.readSint32();
            case t.SINT64:
              return this.readSint64();
            case t.FHASH64:
              return this.readFixedHash64();
            case t.VHASH64:
              return this.readVarintHash64();
            default:
              goog.asserts.fail('Invalid field type in readAny()');
          }
          return 0;
        }),
        (jspb.BinaryReader.prototype.readMessage = function (e, t) {
          goog.asserts.assert(
            this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
          );
          var r = this.decoder_.getEnd(),
            o = this.decoder_.readUnsignedVarint32();
          (o = this.decoder_.getCursor() + o),
            this.decoder_.setEnd(o),
            t(e, this),
            this.decoder_.setCursor(o),
            this.decoder_.setEnd(r);
        }),
        (jspb.BinaryReader.prototype.readGroup = function (e, t, r) {
          goog.asserts.assert(
            this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP
          ),
            goog.asserts.assert(this.nextField_ == e),
            r(t, this),
            this.error_ ||
              this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP ||
              (goog.asserts.fail(
                'Group submessage did not end with an END_GROUP tag'
              ),
              (this.error_ = !0));
        }),
        (jspb.BinaryReader.prototype.getFieldDecoder = function () {
          goog.asserts.assert(
            this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
          );
          var e = this.decoder_.readUnsignedVarint32(),
            t = this.decoder_.getCursor(),
            r = t + e;
          return (
            (e = jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), t, e)),
            this.decoder_.setCursor(r),
            e
          );
        }),
        (jspb.BinaryReader.prototype.readInt32 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readSignedVarint32()
          );
        }),
        (jspb.BinaryReader.prototype.readInt32String = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readSignedVarint32String()
          );
        }),
        (jspb.BinaryReader.prototype.readInt64 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readSignedVarint64()
          );
        }),
        (jspb.BinaryReader.prototype.readInt64String = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readSignedVarint64String()
          );
        }),
        (jspb.BinaryReader.prototype.readUint32 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readUnsignedVarint32()
          );
        }),
        (jspb.BinaryReader.prototype.readUint32String = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readUnsignedVarint32String()
          );
        }),
        (jspb.BinaryReader.prototype.readUint64 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readUnsignedVarint64()
          );
        }),
        (jspb.BinaryReader.prototype.readUint64String = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readUnsignedVarint64String()
          );
        }),
        (jspb.BinaryReader.prototype.readSint32 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readZigzagVarint32()
          );
        }),
        (jspb.BinaryReader.prototype.readSint64 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readZigzagVarint64()
          );
        }),
        (jspb.BinaryReader.prototype.readSint64String = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readZigzagVarint64String()
          );
        }),
        (jspb.BinaryReader.prototype.readFixed32 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32
            ),
            this.decoder_.readUint32()
          );
        }),
        (jspb.BinaryReader.prototype.readFixed64 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
            ),
            this.decoder_.readUint64()
          );
        }),
        (jspb.BinaryReader.prototype.readFixed64String = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
            ),
            this.decoder_.readUint64String()
          );
        }),
        (jspb.BinaryReader.prototype.readSfixed32 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32
            ),
            this.decoder_.readInt32()
          );
        }),
        (jspb.BinaryReader.prototype.readSfixed32String = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32
            ),
            this.decoder_.readInt32().toString()
          );
        }),
        (jspb.BinaryReader.prototype.readSfixed64 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
            ),
            this.decoder_.readInt64()
          );
        }),
        (jspb.BinaryReader.prototype.readSfixed64String = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
            ),
            this.decoder_.readInt64String()
          );
        }),
        (jspb.BinaryReader.prototype.readFloat = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32
            ),
            this.decoder_.readFloat()
          );
        }),
        (jspb.BinaryReader.prototype.readDouble = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
            ),
            this.decoder_.readDouble()
          );
        }),
        (jspb.BinaryReader.prototype.readBool = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            !!this.decoder_.readUnsignedVarint32()
          );
        }),
        (jspb.BinaryReader.prototype.readEnum = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readSignedVarint64()
          );
        }),
        (jspb.BinaryReader.prototype.readString = function () {
          goog.asserts.assert(
            this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
          );
          var e = this.decoder_.readUnsignedVarint32();
          return this.decoder_.readString(e);
        }),
        (jspb.BinaryReader.prototype.readBytes = function () {
          goog.asserts.assert(
            this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
          );
          var e = this.decoder_.readUnsignedVarint32();
          return this.decoder_.readBytes(e);
        }),
        (jspb.BinaryReader.prototype.readVarintHash64 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readVarintHash64()
          );
        }),
        (jspb.BinaryReader.prototype.readSintHash64 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readZigzagVarintHash64()
          );
        }),
        (jspb.BinaryReader.prototype.readSplitVarint64 = function (e) {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readSplitVarint64(e)
          );
        }),
        (jspb.BinaryReader.prototype.readSplitZigzagVarint64 = function (e) {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT
            ),
            this.decoder_.readSplitVarint64(function (t, r) {
              return jspb.utils.fromZigzag64(t, r, e);
            })
          );
        }),
        (jspb.BinaryReader.prototype.readFixedHash64 = function () {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
            ),
            this.decoder_.readFixedHash64()
          );
        }),
        (jspb.BinaryReader.prototype.readSplitFixed64 = function (e) {
          return (
            goog.asserts.assert(
              this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64
            ),
            this.decoder_.readSplitFixed64(e)
          );
        }),
        (jspb.BinaryReader.prototype.readPackedField_ = function (e) {
          goog.asserts.assert(
            this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED
          );
          var t = this.decoder_.readUnsignedVarint32();
          t = this.decoder_.getCursor() + t;
          for (var r = []; this.decoder_.getCursor() < t; )
            r.push(e.call(this.decoder_));
          return r;
        }),
        (jspb.BinaryReader.prototype.readPackedInt32 = function () {
          return this.readPackedField_(this.decoder_.readSignedVarint32);
        }),
        (jspb.BinaryReader.prototype.readPackedInt32String = function () {
          return this.readPackedField_(this.decoder_.readSignedVarint32String);
        }),
        (jspb.BinaryReader.prototype.readPackedInt64 = function () {
          return this.readPackedField_(this.decoder_.readSignedVarint64);
        }),
        (jspb.BinaryReader.prototype.readPackedInt64String = function () {
          return this.readPackedField_(this.decoder_.readSignedVarint64String);
        }),
        (jspb.BinaryReader.prototype.readPackedUint32 = function () {
          return this.readPackedField_(this.decoder_.readUnsignedVarint32);
        }),
        (jspb.BinaryReader.prototype.readPackedUint32String = function () {
          return this.readPackedField_(
            this.decoder_.readUnsignedVarint32String
          );
        }),
        (jspb.BinaryReader.prototype.readPackedUint64 = function () {
          return this.readPackedField_(this.decoder_.readUnsignedVarint64);
        }),
        (jspb.BinaryReader.prototype.readPackedUint64String = function () {
          return this.readPackedField_(
            this.decoder_.readUnsignedVarint64String
          );
        }),
        (jspb.BinaryReader.prototype.readPackedSint32 = function () {
          return this.readPackedField_(this.decoder_.readZigzagVarint32);
        }),
        (jspb.BinaryReader.prototype.readPackedSint64 = function () {
          return this.readPackedField_(this.decoder_.readZigzagVarint64);
        }),
        (jspb.BinaryReader.prototype.readPackedSint64String = function () {
          return this.readPackedField_(this.decoder_.readZigzagVarint64String);
        }),
        (jspb.BinaryReader.prototype.readPackedFixed32 = function () {
          return this.readPackedField_(this.decoder_.readUint32);
        }),
        (jspb.BinaryReader.prototype.readPackedFixed64 = function () {
          return this.readPackedField_(this.decoder_.readUint64);
        }),
        (jspb.BinaryReader.prototype.readPackedFixed64String = function () {
          return this.readPackedField_(this.decoder_.readUint64String);
        }),
        (jspb.BinaryReader.prototype.readPackedSfixed32 = function () {
          return this.readPackedField_(this.decoder_.readInt32);
        }),
        (jspb.BinaryReader.prototype.readPackedSfixed64 = function () {
          return this.readPackedField_(this.decoder_.readInt64);
        }),
        (jspb.BinaryReader.prototype.readPackedSfixed64String = function () {
          return this.readPackedField_(this.decoder_.readInt64String);
        }),
        (jspb.BinaryReader.prototype.readPackedFloat = function () {
          return this.readPackedField_(this.decoder_.readFloat);
        }),
        (jspb.BinaryReader.prototype.readPackedDouble = function () {
          return this.readPackedField_(this.decoder_.readDouble);
        }),
        (jspb.BinaryReader.prototype.readPackedBool = function () {
          return this.readPackedField_(this.decoder_.readBool);
        }),
        (jspb.BinaryReader.prototype.readPackedEnum = function () {
          return this.readPackedField_(this.decoder_.readEnum);
        }),
        (jspb.BinaryReader.prototype.readPackedVarintHash64 = function () {
          return this.readPackedField_(this.decoder_.readVarintHash64);
        }),
        (jspb.BinaryReader.prototype.readPackedFixedHash64 = function () {
          return this.readPackedField_(this.decoder_.readFixedHash64);
        }),
        (jspb.Map = function (e, t) {
          (this.arr_ = e),
            (this.valueCtor_ = t),
            (this.map_ = {}),
            (this.arrClean = !0),
            0 < this.arr_.length && this.loadFromArray_();
        }),
        (jspb.Map.prototype.loadFromArray_ = function () {
          for (var e = 0; e < this.arr_.length; e++) {
            var t = this.arr_[e],
              r = t[0];
            this.map_[r.toString()] = new jspb.Map.Entry_(r, t[1]);
          }
          this.arrClean = !0;
        }),
        (jspb.Map.prototype.toArray = function () {
          if (this.arrClean) {
            if (this.valueCtor_) {
              var e,
                t = this.map_;
              for (e in t)
                if (Object.prototype.hasOwnProperty.call(t, e)) {
                  var r = t[e].valueWrapper;
                  r && r.toArray();
                }
            }
          } else {
            for (
              this.arr_.length = 0, (t = this.stringKeys_()).sort(), e = 0;
              e < t.length;
              e++
            ) {
              var o = this.map_[t[e]];
              (r = o.valueWrapper) && r.toArray(),
                this.arr_.push([o.key, o.value]);
            }
            this.arrClean = !0;
          }
          return this.arr_;
        }),
        (jspb.Map.prototype.toObject = function (e, t) {
          for (var r = this.toArray(), o = [], i = 0; i < r.length; i++) {
            var n = this.map_[r[i][0].toString()];
            this.wrapEntry_(n);
            var s = n.valueWrapper;
            s
              ? (goog.asserts.assert(t), o.push([n.key, t(e, s)]))
              : o.push([n.key, n.value]);
          }
          return o;
        }),
        (jspb.Map.fromObject = function (e, t, r) {
          t = new jspb.Map([], t);
          for (var o = 0; o < e.length; o++) {
            var i = e[o][0],
              n = r(e[o][1]);
            t.set(i, n);
          }
          return t;
        }),
        (jspb.Map.ArrayIteratorIterable_ = function (e) {
          (this.idx_ = 0), (this.arr_ = e);
        }),
        (jspb.Map.ArrayIteratorIterable_.prototype.next = function () {
          return this.idx_ < this.arr_.length
            ? { done: !1, value: this.arr_[this.idx_++] }
            : { done: !0, value: void 0 };
        }),
        'undefined' != typeof Symbol &&
          (jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator] =
            function () {
              return this;
            }),
        (jspb.Map.prototype.getLength = function () {
          return this.stringKeys_().length;
        }),
        (jspb.Map.prototype.clear = function () {
          (this.map_ = {}), (this.arrClean = !1);
        }),
        (jspb.Map.prototype.del = function (e) {
          e = e.toString();
          var t = this.map_.hasOwnProperty(e);
          return delete this.map_[e], (this.arrClean = !1), t;
        }),
        (jspb.Map.prototype.getEntryList = function () {
          var e = [],
            t = this.stringKeys_();
          t.sort();
          for (var r = 0; r < t.length; r++) {
            var o = this.map_[t[r]];
            e.push([o.key, o.value]);
          }
          return e;
        }),
        (jspb.Map.prototype.entries = function () {
          var e = [],
            t = this.stringKeys_();
          t.sort();
          for (var r = 0; r < t.length; r++) {
            var o = this.map_[t[r]];
            e.push([o.key, this.wrapEntry_(o)]);
          }
          return new jspb.Map.ArrayIteratorIterable_(e);
        }),
        (jspb.Map.prototype.keys = function () {
          var e = [],
            t = this.stringKeys_();
          t.sort();
          for (var r = 0; r < t.length; r++) e.push(this.map_[t[r]].key);
          return new jspb.Map.ArrayIteratorIterable_(e);
        }),
        (jspb.Map.prototype.values = function () {
          var e = [],
            t = this.stringKeys_();
          t.sort();
          for (var r = 0; r < t.length; r++)
            e.push(this.wrapEntry_(this.map_[t[r]]));
          return new jspb.Map.ArrayIteratorIterable_(e);
        }),
        (jspb.Map.prototype.forEach = function (e, t) {
          var r = this.stringKeys_();
          r.sort();
          for (var o = 0; o < r.length; o++) {
            var i = this.map_[r[o]];
            e.call(t, this.wrapEntry_(i), i.key, this);
          }
        }),
        (jspb.Map.prototype.set = function (e, t) {
          var r = new jspb.Map.Entry_(e);
          return (
            this.valueCtor_
              ? ((r.valueWrapper = t), (r.value = t.toArray()))
              : (r.value = t),
            (this.map_[e.toString()] = r),
            (this.arrClean = !1),
            this
          );
        }),
        (jspb.Map.prototype.wrapEntry_ = function (e) {
          return this.valueCtor_
            ? (e.valueWrapper ||
                (e.valueWrapper = new this.valueCtor_(e.value)),
              e.valueWrapper)
            : e.value;
        }),
        (jspb.Map.prototype.get = function (e) {
          if ((e = this.map_[e.toString()])) return this.wrapEntry_(e);
        }),
        (jspb.Map.prototype.has = function (e) {
          return e.toString() in this.map_;
        }),
        (jspb.Map.prototype.serializeBinary = function (e, t, r, o, i) {
          var n = this.stringKeys_();
          n.sort();
          for (var s = 0; s < n.length; s++) {
            var a = this.map_[n[s]];
            t.beginSubMessage(e),
              r.call(t, 1, a.key),
              this.valueCtor_
                ? o.call(t, 2, this.wrapEntry_(a), i)
                : o.call(t, 2, a.value),
              t.endSubMessage();
          }
        }),
        (jspb.Map.deserializeBinary = function (e, t, r, o, i, n, s) {
          for (; t.nextField() && !t.isEndGroup(); ) {
            var a = t.getFieldNumber();
            1 == a
              ? (n = r.call(t))
              : 2 == a &&
                (e.valueCtor_
                  ? (goog.asserts.assert(i),
                    s || (s = new e.valueCtor_()),
                    o.call(t, s, i))
                  : (s = o.call(t)));
          }
          goog.asserts.assert(null != n),
            goog.asserts.assert(null != s),
            e.set(n, s);
        }),
        (jspb.Map.prototype.stringKeys_ = function () {
          var e,
            t = this.map_,
            r = [];
          for (e in t) Object.prototype.hasOwnProperty.call(t, e) && r.push(e);
          return r;
        }),
        (jspb.Map.Entry_ = function (e, t) {
          (this.key = e), (this.value = t), (this.valueWrapper = void 0);
        }),
        (jspb.ExtensionFieldInfo = function (e, t, r, o, i) {
          (this.fieldIndex = e),
            (this.fieldName = t),
            (this.ctor = r),
            (this.toObjectFn = o),
            (this.isRepeated = i);
        }),
        (jspb.ExtensionFieldBinaryInfo = function (e, t, r, o, i, n) {
          (this.fieldInfo = e),
            (this.binaryReaderFn = t),
            (this.binaryWriterFn = r),
            (this.binaryMessageSerializeFn = o),
            (this.binaryMessageDeserializeFn = i),
            (this.isPacked = n);
        }),
        (jspb.ExtensionFieldInfo.prototype.isMessageType = function () {
          return !!this.ctor;
        }),
        (jspb.Message = function () {}),
        (jspb.Message.GENERATE_TO_OBJECT = !0),
        (jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE),
        (jspb.Message.GENERATE_TO_STRING = !0),
        (jspb.Message.ASSUME_LOCAL_ARRAYS = !1),
        (jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS = !0),
        (jspb.Message.SUPPORTS_UINT8ARRAY_ = 'function' == typeof Uint8Array),
        (jspb.Message.prototype.getJsPbMessageId = function () {
          return this.messageId_;
        }),
        (jspb.Message.getIndex_ = function (e, t) {
          return t + e.arrayIndexOffset_;
        }),
        (jspb.Message.hiddenES6Property_ = function () {}),
        (jspb.Message.getFieldNumber_ = function (e, t) {
          return t - e.arrayIndexOffset_;
        }),
        (jspb.Message.initialize = function (e, t, r, o, i, n) {
          if (
            ((e.wrappers_ = null),
            t || (t = r ? [r] : []),
            (e.messageId_ = r ? String(r) : void 0),
            (e.arrayIndexOffset_ = 0 === r ? -1 : 0),
            (e.array = t),
            jspb.Message.initPivotAndExtensionObject_(e, o),
            (e.convertedPrimitiveFields_ = {}),
            jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS ||
              (e.repeatedFields = i),
            i)
          )
            for (t = 0; t < i.length; t++)
              (r = i[t]) < e.pivot_
                ? ((r = jspb.Message.getIndex_(e, r)),
                  (e.array[r] =
                    e.array[r] || jspb.Message.EMPTY_LIST_SENTINEL_))
                : (jspb.Message.maybeInitEmptyExtensionObject_(e),
                  (e.extensionObject_[r] =
                    e.extensionObject_[r] ||
                    jspb.Message.EMPTY_LIST_SENTINEL_));
          if (n && n.length)
            for (t = 0; t < n.length; t++)
              jspb.Message.computeOneofCase(e, n[t]);
        }),
        (jspb.Message.EMPTY_LIST_SENTINEL_ =
          goog.DEBUG && Object.freeze ? Object.freeze([]) : []),
        (jspb.Message.isArray_ = function (e) {
          return jspb.Message.ASSUME_LOCAL_ARRAYS
            ? e instanceof Array
            : goog.isArray(e);
        }),
        (jspb.Message.isExtensionObject_ = function (e) {
          return !(
            null === e ||
            'object' != typeof e ||
            jspb.Message.isArray_(e) ||
            (jspb.Message.SUPPORTS_UINT8ARRAY_ && e instanceof Uint8Array)
          );
        }),
        (jspb.Message.initPivotAndExtensionObject_ = function (e, t) {
          var r = e.array.length,
            o = -1;
          if (
            r &&
            ((o = r - 1), (r = e.array[o]), jspb.Message.isExtensionObject_(r))
          )
            return (
              (e.pivot_ = jspb.Message.getFieldNumber_(e, o)),
              void (e.extensionObject_ = r)
            );
          -1 < t
            ? ((e.pivot_ = Math.max(t, jspb.Message.getFieldNumber_(e, o + 1))),
              (e.extensionObject_ = null))
            : (e.pivot_ = Number.MAX_VALUE);
        }),
        (jspb.Message.maybeInitEmptyExtensionObject_ = function (e) {
          var t = jspb.Message.getIndex_(e, e.pivot_);
          e.array[t] || (e.extensionObject_ = e.array[t] = {});
        }),
        (jspb.Message.toObjectList = function (e, t, r) {
          for (var o = [], i = 0; i < e.length; i++)
            o[i] = t.call(e[i], r, e[i]);
          return o;
        }),
        (jspb.Message.toObjectExtension = function (e, t, r, o, i) {
          for (var n in r) {
            var s = r[n],
              a = o.call(e, s);
            if (null != a) {
              for (var l in s.fieldName)
                if (s.fieldName.hasOwnProperty(l)) break;
              t[l] = s.toObjectFn
                ? s.isRepeated
                  ? jspb.Message.toObjectList(a, s.toObjectFn, i)
                  : s.toObjectFn(i, a)
                : a;
            }
          }
        }),
        (jspb.Message.serializeBinaryExtensions = function (e, t, r, o) {
          for (var i in r) {
            var n = r[i],
              s = n.fieldInfo;
            if (!n.binaryWriterFn)
              throw Error(
                'Message extension present that was generated without binary serialization support'
              );
            var a = o.call(e, s);
            if (null != a)
              if (s.isMessageType()) {
                if (!n.binaryMessageSerializeFn)
                  throw Error(
                    'Message extension present holding submessage without binary support enabled, and message is being serialized to binary format'
                  );
                n.binaryWriterFn.call(
                  t,
                  s.fieldIndex,
                  a,
                  n.binaryMessageSerializeFn
                );
              } else n.binaryWriterFn.call(t, s.fieldIndex, a);
          }
        }),
        (jspb.Message.readBinaryExtension = function (e, t, r, o, i) {
          var n = r[t.getFieldNumber()];
          if (n) {
            if (((r = n.fieldInfo), !n.binaryReaderFn))
              throw Error(
                'Deserializing extension whose generated code does not support binary format'
              );
            if (r.isMessageType()) {
              var s = new r.ctor();
              n.binaryReaderFn.call(t, s, n.binaryMessageDeserializeFn);
            } else s = n.binaryReaderFn.call(t);
            r.isRepeated && !n.isPacked
              ? (t = o.call(e, r))
                ? t.push(s)
                : i.call(e, r, [s])
              : i.call(e, r, s);
          } else t.skipField();
        }),
        (jspb.Message.getField = function (e, t) {
          if (t < e.pivot_) {
            t = jspb.Message.getIndex_(e, t);
            var r = e.array[t];
            return r === jspb.Message.EMPTY_LIST_SENTINEL_
              ? (e.array[t] = [])
              : r;
          }
          if (e.extensionObject_)
            return (r = e.extensionObject_[t]) ===
              jspb.Message.EMPTY_LIST_SENTINEL_
              ? (e.extensionObject_[t] = [])
              : r;
        }),
        (jspb.Message.getRepeatedField = function (e, t) {
          return jspb.Message.getField(e, t);
        }),
        (jspb.Message.getOptionalFloatingPointField = function (e, t) {
          return null == (e = jspb.Message.getField(e, t)) ? e : +e;
        }),
        (jspb.Message.getBooleanField = function (e, t) {
          return null == (e = jspb.Message.getField(e, t)) ? e : !!e;
        }),
        (jspb.Message.getRepeatedFloatingPointField = function (e, t) {
          var r = jspb.Message.getRepeatedField(e, t);
          if (
            (e.convertedPrimitiveFields_ || (e.convertedPrimitiveFields_ = {}),
            !e.convertedPrimitiveFields_[t])
          ) {
            for (var o = 0; o < r.length; o++) r[o] = +r[o];
            e.convertedPrimitiveFields_[t] = !0;
          }
          return r;
        }),
        (jspb.Message.getRepeatedBooleanField = function (e, t) {
          var r = jspb.Message.getRepeatedField(e, t);
          if (
            (e.convertedPrimitiveFields_ || (e.convertedPrimitiveFields_ = {}),
            !e.convertedPrimitiveFields_[t])
          ) {
            for (var o = 0; o < r.length; o++) r[o] = !!r[o];
            e.convertedPrimitiveFields_[t] = !0;
          }
          return r;
        }),
        (jspb.Message.bytesAsB64 = function (e) {
          return null == e || 'string' == typeof e
            ? e
            : jspb.Message.SUPPORTS_UINT8ARRAY_ && e instanceof Uint8Array
            ? goog.crypt.base64.encodeByteArray(e)
            : (goog.asserts.fail(
                'Cannot coerce to b64 string: ' + goog.typeOf(e)
              ),
              null);
        }),
        (jspb.Message.bytesAsU8 = function (e) {
          return null == e || e instanceof Uint8Array
            ? e
            : 'string' == typeof e
            ? goog.crypt.base64.decodeStringToUint8Array(e)
            : (goog.asserts.fail(
                'Cannot coerce to Uint8Array: ' + goog.typeOf(e)
              ),
              null);
        }),
        (jspb.Message.bytesListAsB64 = function (e) {
          return (
            jspb.Message.assertConsistentTypes_(e),
            e.length && 'string' != typeof e[0]
              ? goog.array.map(e, jspb.Message.bytesAsB64)
              : e
          );
        }),
        (jspb.Message.bytesListAsU8 = function (e) {
          return (
            jspb.Message.assertConsistentTypes_(e),
            !e.length || e[0] instanceof Uint8Array
              ? e
              : goog.array.map(e, jspb.Message.bytesAsU8)
          );
        }),
        (jspb.Message.assertConsistentTypes_ = function (e) {
          if (goog.DEBUG && e && 1 < e.length) {
            var t = goog.typeOf(e[0]);
            goog.array.forEach(e, function (e) {
              goog.typeOf(e) != t &&
                goog.asserts.fail(
                  'Inconsistent type in JSPB repeated field array. Got ' +
                    goog.typeOf(e) +
                    ' expected ' +
                    t
                );
            });
          }
        }),
        (jspb.Message.getFieldWithDefault = function (e, t, r) {
          return null == (e = jspb.Message.getField(e, t)) ? r : e;
        }),
        (jspb.Message.getBooleanFieldWithDefault = function (e, t, r) {
          return null == (e = jspb.Message.getBooleanField(e, t)) ? r : e;
        }),
        (jspb.Message.getFloatingPointFieldWithDefault = function (e, t, r) {
          return null == (e = jspb.Message.getOptionalFloatingPointField(e, t))
            ? r
            : e;
        }),
        (jspb.Message.getFieldProto3 = jspb.Message.getFieldWithDefault),
        (jspb.Message.getMapField = function (e, t, r, o) {
          if ((e.wrappers_ || (e.wrappers_ = {}), t in e.wrappers_))
            return e.wrappers_[t];
          var i = jspb.Message.getField(e, t);
          if (!i) {
            if (r) return;
            (i = []), jspb.Message.setField(e, t, i);
          }
          return (e.wrappers_[t] = new jspb.Map(i, o));
        }),
        (jspb.Message.setField = function (e, t, r) {
          return (
            goog.asserts.assertInstanceof(e, jspb.Message),
            t < e.pivot_
              ? (e.array[jspb.Message.getIndex_(e, t)] = r)
              : (jspb.Message.maybeInitEmptyExtensionObject_(e),
                (e.extensionObject_[t] = r)),
            e
          );
        }),
        (jspb.Message.setProto3IntField = function (e, t, r) {
          return jspb.Message.setFieldIgnoringDefault_(e, t, r, 0);
        }),
        (jspb.Message.setProto3FloatField = function (e, t, r) {
          return jspb.Message.setFieldIgnoringDefault_(e, t, r, 0);
        }),
        (jspb.Message.setProto3BooleanField = function (e, t, r) {
          return jspb.Message.setFieldIgnoringDefault_(e, t, r, !1);
        }),
        (jspb.Message.setProto3StringField = function (e, t, r) {
          return jspb.Message.setFieldIgnoringDefault_(e, t, r, '');
        }),
        (jspb.Message.setProto3BytesField = function (e, t, r) {
          return jspb.Message.setFieldIgnoringDefault_(e, t, r, '');
        }),
        (jspb.Message.setProto3EnumField = function (e, t, r) {
          return jspb.Message.setFieldIgnoringDefault_(e, t, r, 0);
        }),
        (jspb.Message.setProto3StringIntField = function (e, t, r) {
          return jspb.Message.setFieldIgnoringDefault_(e, t, r, '0');
        }),
        (jspb.Message.setFieldIgnoringDefault_ = function (e, t, r, o) {
          return (
            goog.asserts.assertInstanceof(e, jspb.Message),
            r !== o
              ? jspb.Message.setField(e, t, r)
              : (e.array[jspb.Message.getIndex_(e, t)] = null),
            e
          );
        }),
        (jspb.Message.addToRepeatedField = function (e, t, r, o) {
          return (
            goog.asserts.assertInstanceof(e, jspb.Message),
            (t = jspb.Message.getRepeatedField(e, t)),
            null != o ? t.splice(o, 0, r) : t.push(r),
            e
          );
        }),
        (jspb.Message.setOneofField = function (e, t, r, o) {
          return (
            goog.asserts.assertInstanceof(e, jspb.Message),
            (r = jspb.Message.computeOneofCase(e, r)) &&
              r !== t &&
              void 0 !== o &&
              (e.wrappers_ && r in e.wrappers_ && (e.wrappers_[r] = void 0),
              jspb.Message.setField(e, r, void 0)),
            jspb.Message.setField(e, t, o)
          );
        }),
        (jspb.Message.computeOneofCase = function (e, t) {
          for (var r, o, i = 0; i < t.length; i++) {
            var n = t[i],
              s = jspb.Message.getField(e, n);
            null != s &&
              ((r = n), (o = s), jspb.Message.setField(e, n, void 0));
          }
          return r ? (jspb.Message.setField(e, r, o), r) : 0;
        }),
        (jspb.Message.getWrapperField = function (e, t, r, o) {
          if ((e.wrappers_ || (e.wrappers_ = {}), !e.wrappers_[r])) {
            var i = jspb.Message.getField(e, r);
            (o || i) && (e.wrappers_[r] = new t(i));
          }
          return e.wrappers_[r];
        }),
        (jspb.Message.getRepeatedWrapperField = function (e, t, r) {
          return (
            jspb.Message.wrapRepeatedField_(e, t, r),
            (t = e.wrappers_[r]) == jspb.Message.EMPTY_LIST_SENTINEL_ &&
              (t = e.wrappers_[r] = []),
            t
          );
        }),
        (jspb.Message.wrapRepeatedField_ = function (e, t, r) {
          if ((e.wrappers_ || (e.wrappers_ = {}), !e.wrappers_[r])) {
            for (
              var o = jspb.Message.getRepeatedField(e, r), i = [], n = 0;
              n < o.length;
              n++
            )
              i[n] = new t(o[n]);
            e.wrappers_[r] = i;
          }
        }),
        (jspb.Message.setWrapperField = function (e, t, r) {
          goog.asserts.assertInstanceof(e, jspb.Message),
            e.wrappers_ || (e.wrappers_ = {});
          var o = r ? r.toArray() : r;
          return (e.wrappers_[t] = r), jspb.Message.setField(e, t, o);
        }),
        (jspb.Message.setOneofWrapperField = function (e, t, r, o) {
          goog.asserts.assertInstanceof(e, jspb.Message),
            e.wrappers_ || (e.wrappers_ = {});
          var i = o ? o.toArray() : o;
          return (e.wrappers_[t] = o), jspb.Message.setOneofField(e, t, r, i);
        }),
        (jspb.Message.setRepeatedWrapperField = function (e, t, r) {
          goog.asserts.assertInstanceof(e, jspb.Message),
            e.wrappers_ || (e.wrappers_ = {}),
            (r = r || []);
          for (var o = [], i = 0; i < r.length; i++) o[i] = r[i].toArray();
          return (e.wrappers_[t] = r), jspb.Message.setField(e, t, o);
        }),
        (jspb.Message.addToRepeatedWrapperField = function (e, t, r, o, i) {
          jspb.Message.wrapRepeatedField_(e, o, t);
          var n = e.wrappers_[t];
          return (
            n || (n = e.wrappers_[t] = []),
            (r = r || new o()),
            (e = jspb.Message.getRepeatedField(e, t)),
            null != i
              ? (n.splice(i, 0, r), e.splice(i, 0, r.toArray()))
              : (n.push(r), e.push(r.toArray())),
            r
          );
        }),
        (jspb.Message.toMap = function (e, t, r, o) {
          for (var i = {}, n = 0; n < e.length; n++)
            i[t.call(e[n])] = r ? r.call(e[n], o, e[n]) : e[n];
          return i;
        }),
        (jspb.Message.prototype.syncMapFields_ = function () {
          if (this.wrappers_)
            for (var e in this.wrappers_) {
              var t = this.wrappers_[e];
              if (goog.isArray(t))
                for (var r = 0; r < t.length; r++) t[r] && t[r].toArray();
              else t && t.toArray();
            }
        }),
        (jspb.Message.prototype.toArray = function () {
          return this.syncMapFields_(), this.array;
        }),
        jspb.Message.GENERATE_TO_STRING &&
          (jspb.Message.prototype.toString = function () {
            return this.syncMapFields_(), this.array.toString();
          }),
        (jspb.Message.prototype.getExtension = function (e) {
          if (this.extensionObject_) {
            this.wrappers_ || (this.wrappers_ = {});
            var t = e.fieldIndex;
            if (e.isRepeated) {
              if (e.isMessageType())
                return (
                  this.wrappers_[t] ||
                    (this.wrappers_[t] = goog.array.map(
                      this.extensionObject_[t] || [],
                      function (t) {
                        return new e.ctor(t);
                      }
                    )),
                  this.wrappers_[t]
                );
            } else if (e.isMessageType())
              return (
                !this.wrappers_[t] &&
                  this.extensionObject_[t] &&
                  (this.wrappers_[t] = new e.ctor(this.extensionObject_[t])),
                this.wrappers_[t]
              );
            return this.extensionObject_[t];
          }
        }),
        (jspb.Message.prototype.setExtension = function (e, t) {
          this.wrappers_ || (this.wrappers_ = {}),
            jspb.Message.maybeInitEmptyExtensionObject_(this);
          var r = e.fieldIndex;
          return (
            e.isRepeated
              ? ((t = t || []),
                e.isMessageType()
                  ? ((this.wrappers_[r] = t),
                    (this.extensionObject_[r] = goog.array.map(t, function (e) {
                      return e.toArray();
                    })))
                  : (this.extensionObject_[r] = t))
              : e.isMessageType()
              ? ((this.wrappers_[r] = t),
                (this.extensionObject_[r] = t ? t.toArray() : t))
              : (this.extensionObject_[r] = t),
            this
          );
        }),
        (jspb.Message.difference = function (e, t) {
          if (!(e instanceof t.constructor))
            throw Error('Messages have different types.');
          var r = e.toArray();
          t = t.toArray();
          var o = [],
            i = 0,
            n = r.length > t.length ? r.length : t.length;
          for (
            e.getJsPbMessageId() && ((o[0] = e.getJsPbMessageId()), (i = 1));
            i < n;
            i++
          )
            jspb.Message.compareFields(r[i], t[i]) || (o[i] = t[i]);
          return new e.constructor(o);
        }),
        (jspb.Message.equals = function (e, t) {
          return (
            e == t ||
            (!(!e || !t) &&
              e instanceof t.constructor &&
              jspb.Message.compareFields(e.toArray(), t.toArray()))
          );
        }),
        (jspb.Message.compareExtensions = function (e, t) {
          (e = e || {}), (t = t || {});
          var r,
            o = {};
          for (r in e) o[r] = 0;
          for (r in t) o[r] = 0;
          for (r in o) if (!jspb.Message.compareFields(e[r], t[r])) return !1;
          return !0;
        }),
        (jspb.Message.compareFields = function (e, t) {
          if (e == t) return !0;
          if (!goog.isObject(e) || !goog.isObject(t))
            return (
              !!(
                ('number' == typeof e && isNaN(e)) ||
                ('number' == typeof t && isNaN(t))
              ) && String(e) == String(t)
            );
          if (e.constructor != t.constructor) return !1;
          if (
            jspb.Message.SUPPORTS_UINT8ARRAY_ &&
            e.constructor === Uint8Array
          ) {
            if (e.length != t.length) return !1;
            for (var r = 0; r < e.length; r++) if (e[r] != t[r]) return !1;
            return !0;
          }
          if (e.constructor === Array) {
            var o = void 0,
              i = void 0,
              n = Math.max(e.length, t.length);
            for (r = 0; r < n; r++) {
              var s = e[r],
                a = t[r];
              if (
                (s &&
                  s.constructor == Object &&
                  (goog.asserts.assert(void 0 === o),
                  goog.asserts.assert(r === e.length - 1),
                  (o = s),
                  (s = void 0)),
                a &&
                  a.constructor == Object &&
                  (goog.asserts.assert(void 0 === i),
                  goog.asserts.assert(r === t.length - 1),
                  (i = a),
                  (a = void 0)),
                !jspb.Message.compareFields(s, a))
              )
                return !1;
            }
            return (
              (!o && !i) ||
              ((o = o || {}),
              (i = i || {}),
              jspb.Message.compareExtensions(o, i))
            );
          }
          if (e.constructor === Object)
            return jspb.Message.compareExtensions(e, t);
          throw Error('Invalid type in JSPB array');
        }),
        (jspb.Message.prototype.cloneMessage = function () {
          return jspb.Message.cloneMessage(this);
        }),
        (jspb.Message.prototype.clone = function () {
          return jspb.Message.cloneMessage(this);
        }),
        (jspb.Message.clone = function (e) {
          return jspb.Message.cloneMessage(e);
        }),
        (jspb.Message.cloneMessage = function (e) {
          return new e.constructor(jspb.Message.clone_(e.toArray()));
        }),
        (jspb.Message.copyInto = function (e, t) {
          goog.asserts.assertInstanceof(e, jspb.Message),
            goog.asserts.assertInstanceof(t, jspb.Message),
            goog.asserts.assert(
              e.constructor == t.constructor,
              'Copy source and target message should have the same type.'
            ),
            (e = jspb.Message.clone(e));
          for (
            var r = t.toArray(), o = e.toArray(), i = (r.length = 0);
            i < o.length;
            i++
          )
            r[i] = o[i];
          (t.wrappers_ = e.wrappers_),
            (t.extensionObject_ = e.extensionObject_);
        }),
        (jspb.Message.clone_ = function (e) {
          if (goog.isArray(e)) {
            for (var t = Array(e.length), r = 0; r < e.length; r++) {
              var o = e[r];
              null != o &&
                (t[r] =
                  'object' == typeof o
                    ? jspb.Message.clone_(goog.asserts.assert(o))
                    : o);
            }
            return t;
          }
          if (jspb.Message.SUPPORTS_UINT8ARRAY_ && e instanceof Uint8Array)
            return new Uint8Array(e);
          for (r in ((t = {}), e))
            null != (o = e[r]) &&
              (t[r] =
                'object' == typeof o
                  ? jspb.Message.clone_(goog.asserts.assert(o))
                  : o);
          return t;
        }),
        (jspb.Message.registerMessageType = function (e, t) {
          t.messageId = e;
        }),
        (jspb.Message.messageSetExtensions = {}),
        (jspb.Message.messageSetExtensionsBinary = {}),
        (jspb.arith = {}),
        (jspb.arith.UInt64 = function (e, t) {
          (this.lo = e), (this.hi = t);
        }),
        (jspb.arith.UInt64.prototype.cmp = function (e) {
          return this.hi < e.hi || (this.hi == e.hi && this.lo < e.lo)
            ? -1
            : this.hi == e.hi && this.lo == e.lo
            ? 0
            : 1;
        }),
        (jspb.arith.UInt64.prototype.rightShift = function () {
          return new jspb.arith.UInt64(
            ((this.lo >>> 1) | ((1 & this.hi) << 31)) >>> 0,
            (this.hi >>> 1) >>> 0
          );
        }),
        (jspb.arith.UInt64.prototype.leftShift = function () {
          return new jspb.arith.UInt64(
            (this.lo << 1) >>> 0,
            ((this.hi << 1) | (this.lo >>> 31)) >>> 0
          );
        }),
        (jspb.arith.UInt64.prototype.msb = function () {
          return !!(2147483648 & this.hi);
        }),
        (jspb.arith.UInt64.prototype.lsb = function () {
          return !!(1 & this.lo);
        }),
        (jspb.arith.UInt64.prototype.zero = function () {
          return 0 == this.lo && 0 == this.hi;
        }),
        (jspb.arith.UInt64.prototype.add = function (e) {
          return new jspb.arith.UInt64(
            (((this.lo + e.lo) & 4294967295) >>> 0) >>> 0,
            ((((this.hi + e.hi) & 4294967295) >>> 0) +
              (4294967296 <= this.lo + e.lo ? 1 : 0)) >>>
              0
          );
        }),
        (jspb.arith.UInt64.prototype.sub = function (e) {
          return new jspb.arith.UInt64(
            (((this.lo - e.lo) & 4294967295) >>> 0) >>> 0,
            ((((this.hi - e.hi) & 4294967295) >>> 0) -
              (0 > this.lo - e.lo ? 1 : 0)) >>>
              0
          );
        }),
        (jspb.arith.UInt64.mul32x32 = function (e, t) {
          var r = 65535 & e,
            o = 65535 & t,
            i = t >>> 16;
          for (
            t =
              r * o +
              65536 * ((r * i) & 65535) +
              65536 * (((e >>>= 16) * o) & 65535),
              r = e * i + ((r * i) >>> 16) + ((e * o) >>> 16);
            4294967296 <= t;

          )
            (t -= 4294967296), (r += 1);
          return new jspb.arith.UInt64(t >>> 0, r >>> 0);
        }),
        (jspb.arith.UInt64.prototype.mul = function (e) {
          var t = jspb.arith.UInt64.mul32x32(this.lo, e);
          return (
            ((e = jspb.arith.UInt64.mul32x32(this.hi, e)).hi = e.lo),
            (e.lo = 0),
            t.add(e)
          );
        }),
        (jspb.arith.UInt64.prototype.div = function (e) {
          if (0 == e) return [];
          var t = new jspb.arith.UInt64(0, 0),
            r = new jspb.arith.UInt64(this.lo, this.hi);
          e = new jspb.arith.UInt64(e, 0);
          for (var o = new jspb.arith.UInt64(1, 0); !e.msb(); )
            (e = e.leftShift()), (o = o.leftShift());
          for (; !o.zero(); )
            0 >= e.cmp(r) && ((t = t.add(o)), (r = r.sub(e))),
              (e = e.rightShift()),
              (o = o.rightShift());
          return [t, r];
        }),
        (jspb.arith.UInt64.prototype.toString = function () {
          for (var e = '', t = this; !t.zero(); ) {
            var r = (t = t.div(10))[0];
            (e = t[1].lo + e), (t = r);
          }
          return '' == e && (e = '0'), e;
        }),
        (jspb.arith.UInt64.fromString = function (e) {
          for (
            var t = new jspb.arith.UInt64(0, 0),
              r = new jspb.arith.UInt64(0, 0),
              o = 0;
            o < e.length;
            o++
          ) {
            if ('0' > e[o] || '9' < e[o]) return null;
            var i = parseInt(e[o], 10);
            (r.lo = i), (t = t.mul(10).add(r));
          }
          return t;
        }),
        (jspb.arith.UInt64.prototype.clone = function () {
          return new jspb.arith.UInt64(this.lo, this.hi);
        }),
        (jspb.arith.Int64 = function (e, t) {
          (this.lo = e), (this.hi = t);
        }),
        (jspb.arith.Int64.prototype.add = function (e) {
          return new jspb.arith.Int64(
            (((this.lo + e.lo) & 4294967295) >>> 0) >>> 0,
            ((((this.hi + e.hi) & 4294967295) >>> 0) +
              (4294967296 <= this.lo + e.lo ? 1 : 0)) >>>
              0
          );
        }),
        (jspb.arith.Int64.prototype.sub = function (e) {
          return new jspb.arith.Int64(
            (((this.lo - e.lo) & 4294967295) >>> 0) >>> 0,
            ((((this.hi - e.hi) & 4294967295) >>> 0) -
              (0 > this.lo - e.lo ? 1 : 0)) >>>
              0
          );
        }),
        (jspb.arith.Int64.prototype.clone = function () {
          return new jspb.arith.Int64(this.lo, this.hi);
        }),
        (jspb.arith.Int64.prototype.toString = function () {
          var e = 0 != (2147483648 & this.hi),
            t = new jspb.arith.UInt64(this.lo, this.hi);
          return (
            e && (t = new jspb.arith.UInt64(0, 0).sub(t)),
            (e ? '-' : '') + t.toString()
          );
        }),
        (jspb.arith.Int64.fromString = function (e) {
          var t = 0 < e.length && '-' == e[0];
          return (
            t && (e = e.substring(1)),
            null === (e = jspb.arith.UInt64.fromString(e))
              ? null
              : (t && (e = new jspb.arith.UInt64(0, 0).sub(e)),
                new jspb.arith.Int64(e.lo, e.hi))
          );
        }),
        (jspb.BinaryEncoder = function () {
          this.buffer_ = [];
        }),
        (jspb.BinaryEncoder.prototype.length = function () {
          return this.buffer_.length;
        }),
        (jspb.BinaryEncoder.prototype.end = function () {
          var e = this.buffer_;
          return (this.buffer_ = []), e;
        }),
        (jspb.BinaryEncoder.prototype.writeSplitVarint64 = function (e, t) {
          for (
            goog.asserts.assert(e == Math.floor(e)),
              goog.asserts.assert(t == Math.floor(t)),
              goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32),
              goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32);
            0 < t || 127 < e;

          )
            this.buffer_.push((127 & e) | 128),
              (e = ((e >>> 7) | (t << 25)) >>> 0),
              (t >>>= 7);
          this.buffer_.push(e);
        }),
        (jspb.BinaryEncoder.prototype.writeSplitFixed64 = function (e, t) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(t == Math.floor(t)),
            goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32),
            goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32),
            this.writeUint32(e),
            this.writeUint32(t);
        }),
        (jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function (e) {
          for (
            goog.asserts.assert(e == Math.floor(e)),
              goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32);
            127 < e;

          )
            this.buffer_.push((127 & e) | 128), (e >>>= 7);
          this.buffer_.push(e);
        }),
        (jspb.BinaryEncoder.prototype.writeSignedVarint32 = function (e) {
          if (
            (goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(
              e >= -jspb.BinaryConstants.TWO_TO_31 &&
                e < jspb.BinaryConstants.TWO_TO_31
            ),
            0 <= e)
          )
            this.writeUnsignedVarint32(e);
          else {
            for (var t = 0; 9 > t; t++)
              this.buffer_.push((127 & e) | 128), (e >>= 7);
            this.buffer_.push(1);
          }
        }),
        (jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_64),
            jspb.utils.splitInt64(e),
            this.writeSplitVarint64(
              jspb.utils.split64Low,
              jspb.utils.split64High
            );
        }),
        (jspb.BinaryEncoder.prototype.writeSignedVarint64 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(
              e >= -jspb.BinaryConstants.TWO_TO_63 &&
                e < jspb.BinaryConstants.TWO_TO_63
            ),
            jspb.utils.splitInt64(e),
            this.writeSplitVarint64(
              jspb.utils.split64Low,
              jspb.utils.split64High
            );
        }),
        (jspb.BinaryEncoder.prototype.writeZigzagVarint32 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(
              e >= -jspb.BinaryConstants.TWO_TO_31 &&
                e < jspb.BinaryConstants.TWO_TO_31
            ),
            this.writeUnsignedVarint32(((e << 1) ^ (e >> 31)) >>> 0);
        }),
        (jspb.BinaryEncoder.prototype.writeZigzagVarint64 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(
              e >= -jspb.BinaryConstants.TWO_TO_63 &&
                e < jspb.BinaryConstants.TWO_TO_63
            ),
            jspb.utils.splitZigzag64(e),
            this.writeSplitVarint64(
              jspb.utils.split64Low,
              jspb.utils.split64High
            );
        }),
        (jspb.BinaryEncoder.prototype.writeZigzagVarint64String = function (e) {
          this.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(e));
        }),
        (jspb.BinaryEncoder.prototype.writeZigzagVarintHash64 = function (e) {
          var t = this;
          jspb.utils.splitHash64(e),
            jspb.utils.toZigzag64(
              jspb.utils.split64Low,
              jspb.utils.split64High,
              function (e, r) {
                t.writeSplitVarint64(e >>> 0, r >>> 0);
              }
            );
        }),
        (jspb.BinaryEncoder.prototype.writeUint8 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(0 <= e && 256 > e),
            this.buffer_.push((e >>> 0) & 255);
        }),
        (jspb.BinaryEncoder.prototype.writeUint16 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(0 <= e && 65536 > e),
            this.buffer_.push((e >>> 0) & 255),
            this.buffer_.push((e >>> 8) & 255);
        }),
        (jspb.BinaryEncoder.prototype.writeUint32 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32),
            this.buffer_.push((e >>> 0) & 255),
            this.buffer_.push((e >>> 8) & 255),
            this.buffer_.push((e >>> 16) & 255),
            this.buffer_.push((e >>> 24) & 255);
        }),
        (jspb.BinaryEncoder.prototype.writeUint64 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_64),
            jspb.utils.splitUint64(e),
            this.writeUint32(jspb.utils.split64Low),
            this.writeUint32(jspb.utils.split64High);
        }),
        (jspb.BinaryEncoder.prototype.writeInt8 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(-128 <= e && 128 > e),
            this.buffer_.push((e >>> 0) & 255);
        }),
        (jspb.BinaryEncoder.prototype.writeInt16 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(-32768 <= e && 32768 > e),
            this.buffer_.push((e >>> 0) & 255),
            this.buffer_.push((e >>> 8) & 255);
        }),
        (jspb.BinaryEncoder.prototype.writeInt32 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(
              e >= -jspb.BinaryConstants.TWO_TO_31 &&
                e < jspb.BinaryConstants.TWO_TO_31
            ),
            this.buffer_.push((e >>> 0) & 255),
            this.buffer_.push((e >>> 8) & 255),
            this.buffer_.push((e >>> 16) & 255),
            this.buffer_.push((e >>> 24) & 255);
        }),
        (jspb.BinaryEncoder.prototype.writeInt64 = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(
              e >= -jspb.BinaryConstants.TWO_TO_63 &&
                e < jspb.BinaryConstants.TWO_TO_63
            ),
            jspb.utils.splitInt64(e),
            this.writeSplitFixed64(
              jspb.utils.split64Low,
              jspb.utils.split64High
            );
        }),
        (jspb.BinaryEncoder.prototype.writeInt64String = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(
              +e >= -jspb.BinaryConstants.TWO_TO_63 &&
                +e < jspb.BinaryConstants.TWO_TO_63
            ),
            jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(e)),
            this.writeSplitFixed64(
              jspb.utils.split64Low,
              jspb.utils.split64High
            );
        }),
        (jspb.BinaryEncoder.prototype.writeFloat = function (e) {
          goog.asserts.assert(
            1 / 0 === e ||
              -1 / 0 === e ||
              isNaN(e) ||
              (e >= -jspb.BinaryConstants.FLOAT32_MAX &&
                e <= jspb.BinaryConstants.FLOAT32_MAX)
          ),
            jspb.utils.splitFloat32(e),
            this.writeUint32(jspb.utils.split64Low);
        }),
        (jspb.BinaryEncoder.prototype.writeDouble = function (e) {
          goog.asserts.assert(
            1 / 0 === e ||
              -1 / 0 === e ||
              isNaN(e) ||
              (e >= -jspb.BinaryConstants.FLOAT64_MAX &&
                e <= jspb.BinaryConstants.FLOAT64_MAX)
          ),
            jspb.utils.splitFloat64(e),
            this.writeUint32(jspb.utils.split64Low),
            this.writeUint32(jspb.utils.split64High);
        }),
        (jspb.BinaryEncoder.prototype.writeBool = function (e) {
          goog.asserts.assert('boolean' == typeof e || 'number' == typeof e),
            this.buffer_.push(e ? 1 : 0);
        }),
        (jspb.BinaryEncoder.prototype.writeEnum = function (e) {
          goog.asserts.assert(e == Math.floor(e)),
            goog.asserts.assert(
              e >= -jspb.BinaryConstants.TWO_TO_31 &&
                e < jspb.BinaryConstants.TWO_TO_31
            ),
            this.writeSignedVarint32(e);
        }),
        (jspb.BinaryEncoder.prototype.writeBytes = function (e) {
          this.buffer_.push.apply(this.buffer_, e);
        }),
        (jspb.BinaryEncoder.prototype.writeVarintHash64 = function (e) {
          jspb.utils.splitHash64(e),
            this.writeSplitVarint64(
              jspb.utils.split64Low,
              jspb.utils.split64High
            );
        }),
        (jspb.BinaryEncoder.prototype.writeFixedHash64 = function (e) {
          jspb.utils.splitHash64(e),
            this.writeUint32(jspb.utils.split64Low),
            this.writeUint32(jspb.utils.split64High);
        }),
        (jspb.BinaryEncoder.prototype.writeString = function (e) {
          for (var t = this.buffer_.length, r = 0; r < e.length; r++) {
            var o = e.charCodeAt(r);
            if (128 > o) this.buffer_.push(o);
            else if (2048 > o)
              this.buffer_.push((o >> 6) | 192),
                this.buffer_.push((63 & o) | 128);
            else if (65536 > o)
              if (55296 <= o && 56319 >= o && r + 1 < e.length) {
                var i = e.charCodeAt(r + 1);
                56320 <= i &&
                  57343 >= i &&
                  ((o = 1024 * (o - 55296) + i - 56320 + 65536),
                  this.buffer_.push((o >> 18) | 240),
                  this.buffer_.push(((o >> 12) & 63) | 128),
                  this.buffer_.push(((o >> 6) & 63) | 128),
                  this.buffer_.push((63 & o) | 128),
                  r++);
              } else
                this.buffer_.push((o >> 12) | 224),
                  this.buffer_.push(((o >> 6) & 63) | 128),
                  this.buffer_.push((63 & o) | 128);
          }
          return this.buffer_.length - t;
        }),
        (jspb.BinaryWriter = function () {
          (this.blocks_ = []),
            (this.totalLength_ = 0),
            (this.encoder_ = new jspb.BinaryEncoder()),
            (this.bookmarks_ = []);
        }),
        (jspb.BinaryWriter.prototype.appendUint8Array_ = function (e) {
          var t = this.encoder_.end();
          this.blocks_.push(t),
            this.blocks_.push(e),
            (this.totalLength_ += t.length + e.length);
        }),
        (jspb.BinaryWriter.prototype.beginDelimited_ = function (e) {
          return (
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED),
            (e = this.encoder_.end()),
            this.blocks_.push(e),
            (this.totalLength_ += e.length),
            e.push(this.totalLength_),
            e
          );
        }),
        (jspb.BinaryWriter.prototype.endDelimited_ = function (e) {
          var t = e.pop();
          for (
            t = this.totalLength_ + this.encoder_.length() - t,
              goog.asserts.assert(0 <= t);
            127 < t;

          )
            e.push((127 & t) | 128), (t >>>= 7), this.totalLength_++;
          e.push(t), this.totalLength_++;
        }),
        (jspb.BinaryWriter.prototype.writeSerializedMessage = function (
          e,
          t,
          r
        ) {
          this.appendUint8Array_(e.subarray(t, r));
        }),
        (jspb.BinaryWriter.prototype.maybeWriteSerializedMessage = function (
          e,
          t,
          r
        ) {
          null != e &&
            null != t &&
            null != r &&
            this.writeSerializedMessage(e, t, r);
        }),
        (jspb.BinaryWriter.prototype.reset = function () {
          (this.blocks_ = []),
            this.encoder_.end(),
            (this.totalLength_ = 0),
            (this.bookmarks_ = []);
        }),
        (jspb.BinaryWriter.prototype.getResultBuffer = function () {
          goog.asserts.assert(0 == this.bookmarks_.length);
          for (
            var e = new Uint8Array(this.totalLength_ + this.encoder_.length()),
              t = this.blocks_,
              r = t.length,
              o = 0,
              i = 0;
            i < r;
            i++
          ) {
            var n = t[i];
            e.set(n, o), (o += n.length);
          }
          return (
            (t = this.encoder_.end()),
            e.set(t, o),
            (o += t.length),
            goog.asserts.assert(o == e.length),
            (this.blocks_ = [e]),
            e
          );
        }),
        (jspb.BinaryWriter.prototype.getResultBase64String = function (e) {
          return goog.crypt.base64.encodeByteArray(this.getResultBuffer(), e);
        }),
        (jspb.BinaryWriter.prototype.beginSubMessage = function (e) {
          this.bookmarks_.push(this.beginDelimited_(e));
        }),
        (jspb.BinaryWriter.prototype.endSubMessage = function () {
          goog.asserts.assert(0 <= this.bookmarks_.length),
            this.endDelimited_(this.bookmarks_.pop());
        }),
        (jspb.BinaryWriter.prototype.writeFieldHeader_ = function (e, t) {
          goog.asserts.assert(1 <= e && e == Math.floor(e)),
            this.encoder_.writeUnsignedVarint32(8 * e + t);
        }),
        (jspb.BinaryWriter.prototype.writeAny = function (e, t, r) {
          var o = jspb.BinaryConstants.FieldType;
          switch (e) {
            case o.DOUBLE:
              this.writeDouble(t, r);
              break;
            case o.FLOAT:
              this.writeFloat(t, r);
              break;
            case o.INT64:
              this.writeInt64(t, r);
              break;
            case o.UINT64:
              this.writeUint64(t, r);
              break;
            case o.INT32:
              this.writeInt32(t, r);
              break;
            case o.FIXED64:
              this.writeFixed64(t, r);
              break;
            case o.FIXED32:
              this.writeFixed32(t, r);
              break;
            case o.BOOL:
              this.writeBool(t, r);
              break;
            case o.STRING:
              this.writeString(t, r);
              break;
            case o.GROUP:
              goog.asserts.fail('Group field type not supported in writeAny()');
              break;
            case o.MESSAGE:
              goog.asserts.fail(
                'Message field type not supported in writeAny()'
              );
              break;
            case o.BYTES:
              this.writeBytes(t, r);
              break;
            case o.UINT32:
              this.writeUint32(t, r);
              break;
            case o.ENUM:
              this.writeEnum(t, r);
              break;
            case o.SFIXED32:
              this.writeSfixed32(t, r);
              break;
            case o.SFIXED64:
              this.writeSfixed64(t, r);
              break;
            case o.SINT32:
              this.writeSint32(t, r);
              break;
            case o.SINT64:
              this.writeSint64(t, r);
              break;
            case o.FHASH64:
              this.writeFixedHash64(t, r);
              break;
            case o.VHASH64:
              this.writeVarintHash64(t, r);
              break;
            default:
              goog.asserts.fail('Invalid field type in writeAny()');
          }
        }),
        (jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function (e, t) {
          null != t &&
            (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeUnsignedVarint32(t));
        }),
        (jspb.BinaryWriter.prototype.writeSignedVarint32_ = function (e, t) {
          null != t &&
            (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeSignedVarint32(t));
        }),
        (jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function (e, t) {
          null != t &&
            (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeUnsignedVarint64(t));
        }),
        (jspb.BinaryWriter.prototype.writeSignedVarint64_ = function (e, t) {
          null != t &&
            (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeSignedVarint64(t));
        }),
        (jspb.BinaryWriter.prototype.writeZigzagVarint32_ = function (e, t) {
          null != t &&
            (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeZigzagVarint32(t));
        }),
        (jspb.BinaryWriter.prototype.writeZigzagVarint64_ = function (e, t) {
          null != t &&
            (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeZigzagVarint64(t));
        }),
        (jspb.BinaryWriter.prototype.writeZigzagVarint64String_ = function (
          e,
          t
        ) {
          null != t &&
            (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeZigzagVarint64String(t));
        }),
        (jspb.BinaryWriter.prototype.writeZigzagVarintHash64_ = function (
          e,
          t
        ) {
          null != t &&
            (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeZigzagVarintHash64(t));
        }),
        (jspb.BinaryWriter.prototype.writeInt32 = function (e, t) {
          null != t &&
            (goog.asserts.assert(
              t >= -jspb.BinaryConstants.TWO_TO_31 &&
                t < jspb.BinaryConstants.TWO_TO_31
            ),
            this.writeSignedVarint32_(e, t));
        }),
        (jspb.BinaryWriter.prototype.writeInt32String = function (e, t) {
          null != t &&
            ((t = parseInt(t, 10)),
            goog.asserts.assert(
              t >= -jspb.BinaryConstants.TWO_TO_31 &&
                t < jspb.BinaryConstants.TWO_TO_31
            ),
            this.writeSignedVarint32_(e, t));
        }),
        (jspb.BinaryWriter.prototype.writeInt64 = function (e, t) {
          null != t &&
            (goog.asserts.assert(
              t >= -jspb.BinaryConstants.TWO_TO_63 &&
                t < jspb.BinaryConstants.TWO_TO_63
            ),
            this.writeSignedVarint64_(e, t));
        }),
        (jspb.BinaryWriter.prototype.writeInt64String = function (e, t) {
          null != t &&
            ((t = jspb.arith.Int64.fromString(t)),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeSplitVarint64(t.lo, t.hi));
        }),
        (jspb.BinaryWriter.prototype.writeUint32 = function (e, t) {
          null != t &&
            (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32),
            this.writeUnsignedVarint32_(e, t));
        }),
        (jspb.BinaryWriter.prototype.writeUint32String = function (e, t) {
          null != t &&
            ((t = parseInt(t, 10)),
            goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32),
            this.writeUnsignedVarint32_(e, t));
        }),
        (jspb.BinaryWriter.prototype.writeUint64 = function (e, t) {
          null != t &&
            (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_64),
            this.writeUnsignedVarint64_(e, t));
        }),
        (jspb.BinaryWriter.prototype.writeUint64String = function (e, t) {
          null != t &&
            ((t = jspb.arith.UInt64.fromString(t)),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeSplitVarint64(t.lo, t.hi));
        }),
        (jspb.BinaryWriter.prototype.writeSint32 = function (e, t) {
          null != t &&
            (goog.asserts.assert(
              t >= -jspb.BinaryConstants.TWO_TO_31 &&
                t < jspb.BinaryConstants.TWO_TO_31
            ),
            this.writeZigzagVarint32_(e, t));
        }),
        (jspb.BinaryWriter.prototype.writeSint64 = function (e, t) {
          null != t &&
            (goog.asserts.assert(
              t >= -jspb.BinaryConstants.TWO_TO_63 &&
                t < jspb.BinaryConstants.TWO_TO_63
            ),
            this.writeZigzagVarint64_(e, t));
        }),
        (jspb.BinaryWriter.prototype.writeSintHash64 = function (e, t) {
          null != t && this.writeZigzagVarintHash64_(e, t);
        }),
        (jspb.BinaryWriter.prototype.writeSint64String = function (e, t) {
          null != t && this.writeZigzagVarint64String_(e, t);
        }),
        (jspb.BinaryWriter.prototype.writeFixed32 = function (e, t) {
          null != t &&
            (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED32),
            this.encoder_.writeUint32(t));
        }),
        (jspb.BinaryWriter.prototype.writeFixed64 = function (e, t) {
          null != t &&
            (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_64),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64),
            this.encoder_.writeUint64(t));
        }),
        (jspb.BinaryWriter.prototype.writeFixed64String = function (e, t) {
          null != t &&
            ((t = jspb.arith.UInt64.fromString(t)),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64),
            this.encoder_.writeSplitFixed64(t.lo, t.hi));
        }),
        (jspb.BinaryWriter.prototype.writeSfixed32 = function (e, t) {
          null != t &&
            (goog.asserts.assert(
              t >= -jspb.BinaryConstants.TWO_TO_31 &&
                t < jspb.BinaryConstants.TWO_TO_31
            ),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED32),
            this.encoder_.writeInt32(t));
        }),
        (jspb.BinaryWriter.prototype.writeSfixed64 = function (e, t) {
          null != t &&
            (goog.asserts.assert(
              t >= -jspb.BinaryConstants.TWO_TO_63 &&
                t < jspb.BinaryConstants.TWO_TO_63
            ),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64),
            this.encoder_.writeInt64(t));
        }),
        (jspb.BinaryWriter.prototype.writeSfixed64String = function (e, t) {
          null != t &&
            ((t = jspb.arith.Int64.fromString(t)),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64),
            this.encoder_.writeSplitFixed64(t.lo, t.hi));
        }),
        (jspb.BinaryWriter.prototype.writeFloat = function (e, t) {
          null != t &&
            (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED32),
            this.encoder_.writeFloat(t));
        }),
        (jspb.BinaryWriter.prototype.writeDouble = function (e, t) {
          null != t &&
            (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64),
            this.encoder_.writeDouble(t));
        }),
        (jspb.BinaryWriter.prototype.writeBool = function (e, t) {
          null != t &&
            (goog.asserts.assert('boolean' == typeof t || 'number' == typeof t),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeBool(t));
        }),
        (jspb.BinaryWriter.prototype.writeEnum = function (e, t) {
          null != t &&
            (goog.asserts.assert(
              t >= -jspb.BinaryConstants.TWO_TO_31 &&
                t < jspb.BinaryConstants.TWO_TO_31
            ),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeSignedVarint32(t));
        }),
        (jspb.BinaryWriter.prototype.writeString = function (e, t) {
          null != t &&
            ((e = this.beginDelimited_(e)),
            this.encoder_.writeString(t),
            this.endDelimited_(e));
        }),
        (jspb.BinaryWriter.prototype.writeBytes = function (e, t) {
          null != t &&
            ((t = jspb.utils.byteSourceToUint8Array(t)),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED),
            this.encoder_.writeUnsignedVarint32(t.length),
            this.appendUint8Array_(t));
        }),
        (jspb.BinaryWriter.prototype.writeMessage = function (e, t, r) {
          null != t &&
            ((e = this.beginDelimited_(e)), r(t, this), this.endDelimited_(e));
        }),
        (jspb.BinaryWriter.prototype.writeMessageSet = function (e, t, r) {
          null != t &&
            (this.writeFieldHeader_(
              1,
              jspb.BinaryConstants.WireType.START_GROUP
            ),
            this.writeFieldHeader_(2, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeSignedVarint32(e),
            (e = this.beginDelimited_(3)),
            r(t, this),
            this.endDelimited_(e),
            this.writeFieldHeader_(1, jspb.BinaryConstants.WireType.END_GROUP));
        }),
        (jspb.BinaryWriter.prototype.writeGroup = function (e, t, r) {
          null != t &&
            (this.writeFieldHeader_(
              e,
              jspb.BinaryConstants.WireType.START_GROUP
            ),
            r(t, this),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.END_GROUP));
        }),
        (jspb.BinaryWriter.prototype.writeFixedHash64 = function (e, t) {
          null != t &&
            (goog.asserts.assert(8 == t.length),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64),
            this.encoder_.writeFixedHash64(t));
        }),
        (jspb.BinaryWriter.prototype.writeVarintHash64 = function (e, t) {
          null != t &&
            (goog.asserts.assert(8 == t.length),
            this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeVarintHash64(t));
        }),
        (jspb.BinaryWriter.prototype.writeSplitFixed64 = function (e, t, r) {
          this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64),
            this.encoder_.writeSplitFixed64(t, r);
        }),
        (jspb.BinaryWriter.prototype.writeSplitVarint64 = function (e, t, r) {
          this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT),
            this.encoder_.writeSplitVarint64(t, r);
        }),
        (jspb.BinaryWriter.prototype.writeSplitZigzagVarint64 = function (
          e,
          t,
          r
        ) {
          this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT);
          var o = this.encoder_;
          jspb.utils.toZigzag64(t, r, function (e, t) {
            o.writeSplitVarint64(e >>> 0, t >>> 0);
          });
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedInt32 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++)
              this.writeSignedVarint32_(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedInt32String = function (
          e,
          t
        ) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeInt32String(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedInt64 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++)
              this.writeSignedVarint64_(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedSplitFixed64 = function (
          e,
          t,
          r,
          o
        ) {
          if (null != t)
            for (var i = 0; i < t.length; i++)
              this.writeSplitFixed64(e, r(t[i]), o(t[i]));
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedSplitVarint64 = function (
          e,
          t,
          r,
          o
        ) {
          if (null != t)
            for (var i = 0; i < t.length; i++)
              this.writeSplitVarint64(e, r(t[i]), o(t[i]));
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedSplitZigzagVarint64 =
          function (e, t, r, o) {
            if (null != t)
              for (var i = 0; i < t.length; i++)
                this.writeSplitZigzagVarint64(e, r(t[i]), o(t[i]));
          }),
        (jspb.BinaryWriter.prototype.writeRepeatedInt64String = function (
          e,
          t
        ) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeInt64String(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedUint32 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++)
              this.writeUnsignedVarint32_(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedUint32String = function (
          e,
          t
        ) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeUint32String(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedUint64 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++)
              this.writeUnsignedVarint64_(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedUint64String = function (
          e,
          t
        ) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeUint64String(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedSint32 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++)
              this.writeZigzagVarint32_(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedSint64 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++)
              this.writeZigzagVarint64_(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedSint64String = function (
          e,
          t
        ) {
          if (null != t)
            for (var r = 0; r < t.length; r++)
              this.writeZigzagVarint64String_(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedSintHash64 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++)
              this.writeZigzagVarintHash64_(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedFixed32 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeFixed32(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedFixed64 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeFixed64(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedFixed64String = function (
          e,
          t
        ) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeFixed64String(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedSfixed32 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeSfixed32(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedSfixed64 = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeSfixed64(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedSfixed64String = function (
          e,
          t
        ) {
          if (null != t)
            for (var r = 0; r < t.length; r++)
              this.writeSfixed64String(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedFloat = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeFloat(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedDouble = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeDouble(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedBool = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeBool(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedEnum = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeEnum(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedString = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeString(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedBytes = function (e, t) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeBytes(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedMessage = function (e, t, r) {
          if (null != t)
            for (var o = 0; o < t.length; o++) {
              var i = this.beginDelimited_(e);
              r(t[o], this), this.endDelimited_(i);
            }
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedGroup = function (e, t, r) {
          if (null != t)
            for (var o = 0; o < t.length; o++)
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.START_GROUP
              ),
                r(t[o], this),
                this.writeFieldHeader_(
                  e,
                  jspb.BinaryConstants.WireType.END_GROUP
                );
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedFixedHash64 = function (
          e,
          t
        ) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeFixedHash64(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writeRepeatedVarintHash64 = function (
          e,
          t
        ) {
          if (null != t)
            for (var r = 0; r < t.length; r++) this.writeVarintHash64(e, t[r]);
        }),
        (jspb.BinaryWriter.prototype.writePackedInt32 = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeSignedVarint32(t[r]);
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedInt32String = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeSignedVarint32(parseInt(t[r], 10));
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedInt64 = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeSignedVarint64(t[r]);
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedSplitFixed64 = function (
          e,
          t,
          r,
          o
        ) {
          if (null != t) {
            e = this.beginDelimited_(e);
            for (var i = 0; i < t.length; i++)
              this.encoder_.writeSplitFixed64(r(t[i]), o(t[i]));
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedSplitVarint64 = function (
          e,
          t,
          r,
          o
        ) {
          if (null != t) {
            e = this.beginDelimited_(e);
            for (var i = 0; i < t.length; i++)
              this.encoder_.writeSplitVarint64(r(t[i]), o(t[i]));
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedSplitZigzagVarint64 = function (
          e,
          t,
          r,
          o
        ) {
          if (null != t) {
            e = this.beginDelimited_(e);
            for (var i = this.encoder_, n = 0; n < t.length; n++)
              jspb.utils.toZigzag64(r(t[n]), o(t[n]), function (e, t) {
                i.writeSplitVarint64(e >>> 0, t >>> 0);
              });
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedInt64String = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++) {
              var o = jspb.arith.Int64.fromString(t[r]);
              this.encoder_.writeSplitVarint64(o.lo, o.hi);
            }
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedUint32 = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeUnsignedVarint32(t[r]);
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedUint32String = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeUnsignedVarint32(parseInt(t[r], 10));
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedUint64 = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeUnsignedVarint64(t[r]);
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedUint64String = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++) {
              var o = jspb.arith.UInt64.fromString(t[r]);
              this.encoder_.writeSplitVarint64(o.lo, o.hi);
            }
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedSint32 = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeZigzagVarint32(t[r]);
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedSint64 = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeZigzagVarint64(t[r]);
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedSint64String = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeZigzagVarintHash64(
                jspb.utils.decimalStringToHash64(t[r])
              );
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedSintHash64 = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeZigzagVarintHash64(t[r]);
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedFixed32 = function (e, t) {
          if (null != t && t.length)
            for (
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.DELIMITED
              ),
                this.encoder_.writeUnsignedVarint32(4 * t.length),
                e = 0;
              e < t.length;
              e++
            )
              this.encoder_.writeUint32(t[e]);
        }),
        (jspb.BinaryWriter.prototype.writePackedFixed64 = function (e, t) {
          if (null != t && t.length)
            for (
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.DELIMITED
              ),
                this.encoder_.writeUnsignedVarint32(8 * t.length),
                e = 0;
              e < t.length;
              e++
            )
              this.encoder_.writeUint64(t[e]);
        }),
        (jspb.BinaryWriter.prototype.writePackedFixed64String = function (
          e,
          t
        ) {
          if (null != t && t.length)
            for (
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.DELIMITED
              ),
                this.encoder_.writeUnsignedVarint32(8 * t.length),
                e = 0;
              e < t.length;
              e++
            ) {
              var r = jspb.arith.UInt64.fromString(t[e]);
              this.encoder_.writeSplitFixed64(r.lo, r.hi);
            }
        }),
        (jspb.BinaryWriter.prototype.writePackedSfixed32 = function (e, t) {
          if (null != t && t.length)
            for (
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.DELIMITED
              ),
                this.encoder_.writeUnsignedVarint32(4 * t.length),
                e = 0;
              e < t.length;
              e++
            )
              this.encoder_.writeInt32(t[e]);
        }),
        (jspb.BinaryWriter.prototype.writePackedSfixed64 = function (e, t) {
          if (null != t && t.length)
            for (
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.DELIMITED
              ),
                this.encoder_.writeUnsignedVarint32(8 * t.length),
                e = 0;
              e < t.length;
              e++
            )
              this.encoder_.writeInt64(t[e]);
        }),
        (jspb.BinaryWriter.prototype.writePackedSfixed64String = function (
          e,
          t
        ) {
          if (null != t && t.length)
            for (
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.DELIMITED
              ),
                this.encoder_.writeUnsignedVarint32(8 * t.length),
                e = 0;
              e < t.length;
              e++
            )
              this.encoder_.writeInt64String(t[e]);
        }),
        (jspb.BinaryWriter.prototype.writePackedFloat = function (e, t) {
          if (null != t && t.length)
            for (
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.DELIMITED
              ),
                this.encoder_.writeUnsignedVarint32(4 * t.length),
                e = 0;
              e < t.length;
              e++
            )
              this.encoder_.writeFloat(t[e]);
        }),
        (jspb.BinaryWriter.prototype.writePackedDouble = function (e, t) {
          if (null != t && t.length)
            for (
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.DELIMITED
              ),
                this.encoder_.writeUnsignedVarint32(8 * t.length),
                e = 0;
              e < t.length;
              e++
            )
              this.encoder_.writeDouble(t[e]);
        }),
        (jspb.BinaryWriter.prototype.writePackedBool = function (e, t) {
          if (null != t && t.length)
            for (
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.DELIMITED
              ),
                this.encoder_.writeUnsignedVarint32(t.length),
                e = 0;
              e < t.length;
              e++
            )
              this.encoder_.writeBool(t[e]);
        }),
        (jspb.BinaryWriter.prototype.writePackedEnum = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++) this.encoder_.writeEnum(t[r]);
            this.endDelimited_(e);
          }
        }),
        (jspb.BinaryWriter.prototype.writePackedFixedHash64 = function (e, t) {
          if (null != t && t.length)
            for (
              this.writeFieldHeader_(
                e,
                jspb.BinaryConstants.WireType.DELIMITED
              ),
                this.encoder_.writeUnsignedVarint32(8 * t.length),
                e = 0;
              e < t.length;
              e++
            )
              this.encoder_.writeFixedHash64(t[e]);
        }),
        (jspb.BinaryWriter.prototype.writePackedVarintHash64 = function (e, t) {
          if (null != t && t.length) {
            e = this.beginDelimited_(e);
            for (var r = 0; r < t.length; r++)
              this.encoder_.writeVarintHash64(t[r]);
            this.endDelimited_(e);
          }
        }),
        (jspb.Export = {}),
        (exports.Map = jspb.Map),
        (exports.Message = jspb.Message),
        (exports.BinaryReader = jspb.BinaryReader),
        (exports.BinaryWriter = jspb.BinaryWriter),
        (exports.ExtensionFieldInfo = jspb.ExtensionFieldInfo),
        (exports.ExtensionFieldBinaryInfo = jspb.ExtensionFieldBinaryInfo),
        (exports.exportSymbol = goog.exportSymbol),
        (exports.inherits = goog.inherits),
        (exports.object = { extend: goog.object.extend }),
        (exports.typeOf = goog.typeOf);
    }).call(this, __webpack_require__(6), __webpack_require__(16).Buffer);
  },
  function (e, t, r) {
    'use strict';
    (function (e) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <http://feross.org>
       * @license  MIT
       */
      var o = r(17),
        i = r(18),
        n = r(19);
      function s() {
        return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function a(e, t) {
        if (s() < t) throw new RangeError('Invalid typed array length');
        return (
          l.TYPED_ARRAY_SUPPORT
            ? ((e = new Uint8Array(t)).__proto__ = l.prototype)
            : (null === e && (e = new l(t)), (e.length = t)),
          e
        );
      }
      function l(e, t, r) {
        if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l))
          return new l(e, t, r);
        if ('number' == typeof e) {
          if ('string' == typeof t)
            throw new Error(
              'If encoding is specified then the first argument must be a string'
            );
          return u(this, e);
        }
        return g(this, e, t, r);
      }
      function g(e, t, r, o) {
        if ('number' == typeof t)
          throw new TypeError('"value" argument must not be a number');
        return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer
          ? (function (e, t, r, o) {
              if ((t.byteLength, r < 0 || t.byteLength < r))
                throw new RangeError("'offset' is out of bounds");
              if (t.byteLength < r + (o || 0))
                throw new RangeError("'length' is out of bounds");
              t =
                void 0 === r && void 0 === o
                  ? new Uint8Array(t)
                  : void 0 === o
                  ? new Uint8Array(t, r)
                  : new Uint8Array(t, r, o);
              l.TYPED_ARRAY_SUPPORT
                ? ((e = t).__proto__ = l.prototype)
                : (e = y(e, t));
              return e;
            })(e, t, r, o)
          : 'string' == typeof t
          ? (function (e, t, r) {
              ('string' == typeof r && '' !== r) || (r = 'utf8');
              if (!l.isEncoding(r))
                throw new TypeError(
                  '"encoding" must be a valid string encoding'
                );
              var o = 0 | d(t, r),
                i = (e = a(e, o)).write(t, r);
              i !== o && (e = e.slice(0, i));
              return e;
            })(e, t, r)
          : (function (e, t) {
              if (l.isBuffer(t)) {
                var r = 0 | c(t.length);
                return 0 === (e = a(e, r)).length ? e : (t.copy(e, 0, 0, r), e);
              }
              if (t) {
                if (
                  ('undefined' != typeof ArrayBuffer &&
                    t.buffer instanceof ArrayBuffer) ||
                  'length' in t
                )
                  return 'number' != typeof t.length || (o = t.length) != o
                    ? a(e, 0)
                    : y(e, t);
                if ('Buffer' === t.type && n(t.data)) return y(e, t.data);
              }
              var o;
              throw new TypeError(
                'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
              );
            })(e, t);
      }
      function p(e) {
        if ('number' != typeof e)
          throw new TypeError('"size" argument must be a number');
        if (e < 0) throw new RangeError('"size" argument must not be negative');
      }
      function u(e, t) {
        if ((p(t), (e = a(e, t < 0 ? 0 : 0 | c(t))), !l.TYPED_ARRAY_SUPPORT))
          for (var r = 0; r < t; ++r) e[r] = 0;
        return e;
      }
      function y(e, t) {
        var r = t.length < 0 ? 0 : 0 | c(t.length);
        e = a(e, r);
        for (var o = 0; o < r; o += 1) e[o] = 255 & t[o];
        return e;
      }
      function c(e) {
        if (e >= s())
          throw new RangeError(
            'Attempt to allocate Buffer larger than maximum size: 0x' +
              s().toString(16) +
              ' bytes'
          );
        return 0 | e;
      }
      function d(e, t) {
        if (l.isBuffer(e)) return e.length;
        if (
          'undefined' != typeof ArrayBuffer &&
          'function' == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
        )
          return e.byteLength;
        'string' != typeof e && (e = '' + e);
        var r = e.length;
        if (0 === r) return 0;
        for (var o = !1; ; )
          switch (t) {
            case 'ascii':
            case 'latin1':
            case 'binary':
              return r;
            case 'utf8':
            case 'utf-8':
            case void 0:
              return k(e).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return 2 * r;
            case 'hex':
              return r >>> 1;
            case 'base64':
              return x(e).length;
            default:
              if (o) return k(e).length;
              (t = ('' + t).toLowerCase()), (o = !0);
          }
      }
      function f(e, t, r) {
        var o = !1;
        if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return '';
        if (((void 0 === r || r > this.length) && (r = this.length), r <= 0))
          return '';
        if ((r >>>= 0) <= (t >>>= 0)) return '';
        for (e || (e = 'utf8'); ; )
          switch (e) {
            case 'hex':
              return C(this, t, r);
            case 'utf8':
            case 'utf-8':
              return B(this, t, r);
            case 'ascii':
              return w(this, t, r);
            case 'latin1':
            case 'binary':
              return O(this, t, r);
            case 'base64':
              return E(this, t, r);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return A(this, t, r);
            default:
              if (o) throw new TypeError('Unknown encoding: ' + e);
              (e = (e + '').toLowerCase()), (o = !0);
          }
      }
      function h(e, t, r) {
        var o = e[t];
        (e[t] = e[r]), (e[r] = o);
      }
      function b(e, t, r, o, i) {
        if (0 === e.length) return -1;
        if (
          ('string' == typeof r
            ? ((o = r), (r = 0))
            : r > 2147483647
            ? (r = 2147483647)
            : r < -2147483648 && (r = -2147483648),
          (r = +r),
          isNaN(r) && (r = i ? 0 : e.length - 1),
          r < 0 && (r = e.length + r),
          r >= e.length)
        ) {
          if (i) return -1;
          r = e.length - 1;
        } else if (r < 0) {
          if (!i) return -1;
          r = 0;
        }
        if (('string' == typeof t && (t = l.from(t, o)), l.isBuffer(t)))
          return 0 === t.length ? -1 : m(e, t, r, o, i);
        if ('number' == typeof t)
          return (
            (t &= 255),
            l.TYPED_ARRAY_SUPPORT &&
            'function' == typeof Uint8Array.prototype.indexOf
              ? i
                ? Uint8Array.prototype.indexOf.call(e, t, r)
                : Uint8Array.prototype.lastIndexOf.call(e, t, r)
              : m(e, [t], r, o, i)
          );
        throw new TypeError('val must be string, number or Buffer');
      }
      function m(e, t, r, o, i) {
        var n,
          s = 1,
          a = e.length,
          l = t.length;
        if (
          void 0 !== o &&
          ('ucs2' === (o = String(o).toLowerCase()) ||
            'ucs-2' === o ||
            'utf16le' === o ||
            'utf-16le' === o)
        ) {
          if (e.length < 2 || t.length < 2) return -1;
          (s = 2), (a /= 2), (l /= 2), (r /= 2);
        }
        function g(e, t) {
          return 1 === s ? e[t] : e.readUInt16BE(t * s);
        }
        if (i) {
          var p = -1;
          for (n = r; n < a; n++)
            if (g(e, n) === g(t, -1 === p ? 0 : n - p)) {
              if ((-1 === p && (p = n), n - p + 1 === l)) return p * s;
            } else -1 !== p && (n -= n - p), (p = -1);
        } else
          for (r + l > a && (r = a - l), n = r; n >= 0; n--) {
            for (var u = !0, y = 0; y < l; y++)
              if (g(e, n + y) !== g(t, y)) {
                u = !1;
                break;
              }
            if (u) return n;
          }
        return -1;
      }
      function T(e, t, r, o) {
        r = Number(r) || 0;
        var i = e.length - r;
        o ? (o = Number(o)) > i && (o = i) : (o = i);
        var n = t.length;
        if (n % 2 != 0) throw new TypeError('Invalid hex string');
        o > n / 2 && (o = n / 2);
        for (var s = 0; s < o; ++s) {
          var a = parseInt(t.substr(2 * s, 2), 16);
          if (isNaN(a)) return s;
          e[r + s] = a;
        }
        return s;
      }
      function S(e, t, r, o) {
        return H(k(t, e.length - r), e, r, o);
      }
      function M(e, t, r, o) {
        return H(
          (function (e) {
            for (var t = [], r = 0; r < e.length; ++r)
              t.push(255 & e.charCodeAt(r));
            return t;
          })(t),
          e,
          r,
          o
        );
      }
      function F(e, t, r, o) {
        return M(e, t, r, o);
      }
      function R(e, t, r, o) {
        return H(x(t), e, r, o);
      }
      function _(e, t, r, o) {
        return H(
          (function (e, t) {
            for (
              var r, o, i, n = [], s = 0;
              s < e.length && !((t -= 2) < 0);
              ++s
            )
              (r = e.charCodeAt(s)),
                (o = r >> 8),
                (i = r % 256),
                n.push(i),
                n.push(o);
            return n;
          })(t, e.length - r),
          e,
          r,
          o
        );
      }
      function E(e, t, r) {
        return 0 === t && r === e.length
          ? o.fromByteArray(e)
          : o.fromByteArray(e.slice(t, r));
      }
      function B(e, t, r) {
        r = Math.min(e.length, r);
        for (var o = [], i = t; i < r; ) {
          var n,
            s,
            a,
            l,
            g = e[i],
            p = null,
            u = g > 239 ? 4 : g > 223 ? 3 : g > 191 ? 2 : 1;
          if (i + u <= r)
            switch (u) {
              case 1:
                g < 128 && (p = g);
                break;
              case 2:
                128 == (192 & (n = e[i + 1])) &&
                  (l = ((31 & g) << 6) | (63 & n)) > 127 &&
                  (p = l);
                break;
              case 3:
                (n = e[i + 1]),
                  (s = e[i + 2]),
                  128 == (192 & n) &&
                    128 == (192 & s) &&
                    (l = ((15 & g) << 12) | ((63 & n) << 6) | (63 & s)) >
                      2047 &&
                    (l < 55296 || l > 57343) &&
                    (p = l);
                break;
              case 4:
                (n = e[i + 1]),
                  (s = e[i + 2]),
                  (a = e[i + 3]),
                  128 == (192 & n) &&
                    128 == (192 & s) &&
                    128 == (192 & a) &&
                    (l =
                      ((15 & g) << 18) |
                      ((63 & n) << 12) |
                      ((63 & s) << 6) |
                      (63 & a)) > 65535 &&
                    l < 1114112 &&
                    (p = l);
            }
          null === p
            ? ((p = 65533), (u = 1))
            : p > 65535 &&
              ((p -= 65536),
              o.push(((p >>> 10) & 1023) | 55296),
              (p = 56320 | (1023 & p))),
            o.push(p),
            (i += u);
        }
        return (function (e) {
          var t = e.length;
          if (t <= v) return String.fromCharCode.apply(String, e);
          var r = '',
            o = 0;
          for (; o < t; )
            r += String.fromCharCode.apply(String, e.slice(o, (o += v)));
          return r;
        })(o);
      }
      (t.Buffer = l),
        (t.SlowBuffer = function (e) {
          +e != e && (e = 0);
          return l.alloc(+e);
        }),
        (t.INSPECT_MAX_BYTES = 50),
        (l.TYPED_ARRAY_SUPPORT =
          void 0 !== e.TYPED_ARRAY_SUPPORT
            ? e.TYPED_ARRAY_SUPPORT
            : (function () {
                try {
                  var e = new Uint8Array(1);
                  return (
                    (e.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function () {
                        return 42;
                      },
                    }),
                    42 === e.foo() &&
                      'function' == typeof e.subarray &&
                      0 === e.subarray(1, 1).byteLength
                  );
                } catch (e) {
                  return !1;
                }
              })()),
        (t.kMaxLength = s()),
        (l.poolSize = 8192),
        (l._augment = function (e) {
          return (e.__proto__ = l.prototype), e;
        }),
        (l.from = function (e, t, r) {
          return g(null, e, t, r);
        }),
        l.TYPED_ARRAY_SUPPORT &&
          ((l.prototype.__proto__ = Uint8Array.prototype),
          (l.__proto__ = Uint8Array),
          'undefined' != typeof Symbol &&
            Symbol.species &&
            l[Symbol.species] === l &&
            Object.defineProperty(l, Symbol.species, {
              value: null,
              configurable: !0,
            })),
        (l.alloc = function (e, t, r) {
          return (function (e, t, r, o) {
            return (
              p(t),
              t <= 0
                ? a(e, t)
                : void 0 !== r
                ? 'string' == typeof o
                  ? a(e, t).fill(r, o)
                  : a(e, t).fill(r)
                : a(e, t)
            );
          })(null, e, t, r);
        }),
        (l.allocUnsafe = function (e) {
          return u(null, e);
        }),
        (l.allocUnsafeSlow = function (e) {
          return u(null, e);
        }),
        (l.isBuffer = function (e) {
          return !(null == e || !e._isBuffer);
        }),
        (l.compare = function (e, t) {
          if (!l.isBuffer(e) || !l.isBuffer(t))
            throw new TypeError('Arguments must be Buffers');
          if (e === t) return 0;
          for (
            var r = e.length, o = t.length, i = 0, n = Math.min(r, o);
            i < n;
            ++i
          )
            if (e[i] !== t[i]) {
              (r = e[i]), (o = t[i]);
              break;
            }
          return r < o ? -1 : o < r ? 1 : 0;
        }),
        (l.isEncoding = function (e) {
          switch (String(e).toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'latin1':
            case 'binary':
            case 'base64':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return !0;
            default:
              return !1;
          }
        }),
        (l.concat = function (e, t) {
          if (!n(e))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === e.length) return l.alloc(0);
          var r;
          if (void 0 === t)
            for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
          var o = l.allocUnsafe(t),
            i = 0;
          for (r = 0; r < e.length; ++r) {
            var s = e[r];
            if (!l.isBuffer(s))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            s.copy(o, i), (i += s.length);
          }
          return o;
        }),
        (l.byteLength = d),
        (l.prototype._isBuffer = !0),
        (l.prototype.swap16 = function () {
          var e = this.length;
          if (e % 2 != 0)
            throw new RangeError('Buffer size must be a multiple of 16-bits');
          for (var t = 0; t < e; t += 2) h(this, t, t + 1);
          return this;
        }),
        (l.prototype.swap32 = function () {
          var e = this.length;
          if (e % 4 != 0)
            throw new RangeError('Buffer size must be a multiple of 32-bits');
          for (var t = 0; t < e; t += 4)
            h(this, t, t + 3), h(this, t + 1, t + 2);
          return this;
        }),
        (l.prototype.swap64 = function () {
          var e = this.length;
          if (e % 8 != 0)
            throw new RangeError('Buffer size must be a multiple of 64-bits');
          for (var t = 0; t < e; t += 8)
            h(this, t, t + 7),
              h(this, t + 1, t + 6),
              h(this, t + 2, t + 5),
              h(this, t + 3, t + 4);
          return this;
        }),
        (l.prototype.toString = function () {
          var e = 0 | this.length;
          return 0 === e
            ? ''
            : 0 === arguments.length
            ? B(this, 0, e)
            : f.apply(this, arguments);
        }),
        (l.prototype.equals = function (e) {
          if (!l.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
          return this === e || 0 === l.compare(this, e);
        }),
        (l.prototype.inspect = function () {
          var e = '',
            r = t.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((e = this.toString('hex', 0, r).match(/.{2}/g).join(' ')),
              this.length > r && (e += ' ... ')),
            '<Buffer ' + e + '>'
          );
        }),
        (l.prototype.compare = function (e, t, r, o, i) {
          if (!l.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
          if (
            (void 0 === t && (t = 0),
            void 0 === r && (r = e ? e.length : 0),
            void 0 === o && (o = 0),
            void 0 === i && (i = this.length),
            t < 0 || r > e.length || o < 0 || i > this.length)
          )
            throw new RangeError('out of range index');
          if (o >= i && t >= r) return 0;
          if (o >= i) return -1;
          if (t >= r) return 1;
          if (this === e) return 0;
          for (
            var n = (i >>>= 0) - (o >>>= 0),
              s = (r >>>= 0) - (t >>>= 0),
              a = Math.min(n, s),
              g = this.slice(o, i),
              p = e.slice(t, r),
              u = 0;
            u < a;
            ++u
          )
            if (g[u] !== p[u]) {
              (n = g[u]), (s = p[u]);
              break;
            }
          return n < s ? -1 : s < n ? 1 : 0;
        }),
        (l.prototype.includes = function (e, t, r) {
          return -1 !== this.indexOf(e, t, r);
        }),
        (l.prototype.indexOf = function (e, t, r) {
          return b(this, e, t, r, !0);
        }),
        (l.prototype.lastIndexOf = function (e, t, r) {
          return b(this, e, t, r, !1);
        }),
        (l.prototype.write = function (e, t, r, o) {
          if (void 0 === t) (o = 'utf8'), (r = this.length), (t = 0);
          else if (void 0 === r && 'string' == typeof t)
            (o = t), (r = this.length), (t = 0);
          else {
            if (!isFinite(t))
              throw new Error(
                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
              );
            (t |= 0),
              isFinite(r)
                ? ((r |= 0), void 0 === o && (o = 'utf8'))
                : ((o = r), (r = void 0));
          }
          var i = this.length - t;
          if (
            ((void 0 === r || r > i) && (r = i),
            (e.length > 0 && (r < 0 || t < 0)) || t > this.length)
          )
            throw new RangeError('Attempt to write outside buffer bounds');
          o || (o = 'utf8');
          for (var n = !1; ; )
            switch (o) {
              case 'hex':
                return T(this, e, t, r);
              case 'utf8':
              case 'utf-8':
                return S(this, e, t, r);
              case 'ascii':
                return M(this, e, t, r);
              case 'latin1':
              case 'binary':
                return F(this, e, t, r);
              case 'base64':
                return R(this, e, t, r);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return _(this, e, t, r);
              default:
                if (n) throw new TypeError('Unknown encoding: ' + o);
                (o = ('' + o).toLowerCase()), (n = !0);
            }
        }),
        (l.prototype.toJSON = function () {
          return {
            type: 'Buffer',
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        });
      var v = 4096;
      function w(e, t, r) {
        var o = '';
        r = Math.min(e.length, r);
        for (var i = t; i < r; ++i) o += String.fromCharCode(127 & e[i]);
        return o;
      }
      function O(e, t, r) {
        var o = '';
        r = Math.min(e.length, r);
        for (var i = t; i < r; ++i) o += String.fromCharCode(e[i]);
        return o;
      }
      function C(e, t, r) {
        var o = e.length;
        (!t || t < 0) && (t = 0), (!r || r < 0 || r > o) && (r = o);
        for (var i = '', n = t; n < r; ++n) i += U(e[n]);
        return i;
      }
      function A(e, t, r) {
        for (var o = e.slice(t, r), i = '', n = 0; n < o.length; n += 2)
          i += String.fromCharCode(o[n] + 256 * o[n + 1]);
        return i;
      }
      function I(e, t, r) {
        if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
        if (e + t > r)
          throw new RangeError('Trying to access beyond buffer length');
      }
      function j(e, t, r, o, i, n) {
        if (!l.isBuffer(e))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > i || t < n)
          throw new RangeError('"value" argument is out of bounds');
        if (r + o > e.length) throw new RangeError('Index out of range');
      }
      function D(e, t, r, o) {
        t < 0 && (t = 65535 + t + 1);
        for (var i = 0, n = Math.min(e.length - r, 2); i < n; ++i)
          e[r + i] =
            (t & (255 << (8 * (o ? i : 1 - i)))) >>> (8 * (o ? i : 1 - i));
      }
      function P(e, t, r, o) {
        t < 0 && (t = 4294967295 + t + 1);
        for (var i = 0, n = Math.min(e.length - r, 4); i < n; ++i)
          e[r + i] = (t >>> (8 * (o ? i : 3 - i))) & 255;
      }
      function W(e, t, r, o, i, n) {
        if (r + o > e.length) throw new RangeError('Index out of range');
        if (r < 0) throw new RangeError('Index out of range');
      }
      function N(e, t, r, o, n) {
        return n || W(e, 0, r, 4), i.write(e, t, r, o, 23, 4), r + 4;
      }
      function z(e, t, r, o, n) {
        return n || W(e, 0, r, 8), i.write(e, t, r, o, 52, 8), r + 8;
      }
      (l.prototype.slice = function (e, t) {
        var r,
          o = this.length;
        if (
          ((e = ~~e) < 0 ? (e += o) < 0 && (e = 0) : e > o && (e = o),
          (t = void 0 === t ? o : ~~t) < 0
            ? (t += o) < 0 && (t = 0)
            : t > o && (t = o),
          t < e && (t = e),
          l.TYPED_ARRAY_SUPPORT)
        )
          (r = this.subarray(e, t)).__proto__ = l.prototype;
        else {
          var i = t - e;
          r = new l(i, void 0);
          for (var n = 0; n < i; ++n) r[n] = this[n + e];
        }
        return r;
      }),
        (l.prototype.readUIntLE = function (e, t, r) {
          (e |= 0), (t |= 0), r || I(e, t, this.length);
          for (var o = this[e], i = 1, n = 0; ++n < t && (i *= 256); )
            o += this[e + n] * i;
          return o;
        }),
        (l.prototype.readUIntBE = function (e, t, r) {
          (e |= 0), (t |= 0), r || I(e, t, this.length);
          for (var o = this[e + --t], i = 1; t > 0 && (i *= 256); )
            o += this[e + --t] * i;
          return o;
        }),
        (l.prototype.readUInt8 = function (e, t) {
          return t || I(e, 1, this.length), this[e];
        }),
        (l.prototype.readUInt16LE = function (e, t) {
          return t || I(e, 2, this.length), this[e] | (this[e + 1] << 8);
        }),
        (l.prototype.readUInt16BE = function (e, t) {
          return t || I(e, 2, this.length), (this[e] << 8) | this[e + 1];
        }),
        (l.prototype.readUInt32LE = function (e, t) {
          return (
            t || I(e, 4, this.length),
            (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
              16777216 * this[e + 3]
          );
        }),
        (l.prototype.readUInt32BE = function (e, t) {
          return (
            t || I(e, 4, this.length),
            16777216 * this[e] +
              ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
          );
        }),
        (l.prototype.readIntLE = function (e, t, r) {
          (e |= 0), (t |= 0), r || I(e, t, this.length);
          for (var o = this[e], i = 1, n = 0; ++n < t && (i *= 256); )
            o += this[e + n] * i;
          return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o;
        }),
        (l.prototype.readIntBE = function (e, t, r) {
          (e |= 0), (t |= 0), r || I(e, t, this.length);
          for (var o = t, i = 1, n = this[e + --o]; o > 0 && (i *= 256); )
            n += this[e + --o] * i;
          return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n;
        }),
        (l.prototype.readInt8 = function (e, t) {
          return (
            t || I(e, 1, this.length),
            128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
          );
        }),
        (l.prototype.readInt16LE = function (e, t) {
          t || I(e, 2, this.length);
          var r = this[e] | (this[e + 1] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (l.prototype.readInt16BE = function (e, t) {
          t || I(e, 2, this.length);
          var r = this[e + 1] | (this[e] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (l.prototype.readInt32LE = function (e, t) {
          return (
            t || I(e, 4, this.length),
            this[e] |
              (this[e + 1] << 8) |
              (this[e + 2] << 16) |
              (this[e + 3] << 24)
          );
        }),
        (l.prototype.readInt32BE = function (e, t) {
          return (
            t || I(e, 4, this.length),
            (this[e] << 24) |
              (this[e + 1] << 16) |
              (this[e + 2] << 8) |
              this[e + 3]
          );
        }),
        (l.prototype.readFloatLE = function (e, t) {
          return t || I(e, 4, this.length), i.read(this, e, !0, 23, 4);
        }),
        (l.prototype.readFloatBE = function (e, t) {
          return t || I(e, 4, this.length), i.read(this, e, !1, 23, 4);
        }),
        (l.prototype.readDoubleLE = function (e, t) {
          return t || I(e, 8, this.length), i.read(this, e, !0, 52, 8);
        }),
        (l.prototype.readDoubleBE = function (e, t) {
          return t || I(e, 8, this.length), i.read(this, e, !1, 52, 8);
        }),
        (l.prototype.writeUIntLE = function (e, t, r, o) {
          ((e = +e), (t |= 0), (r |= 0), o) ||
            j(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
          var i = 1,
            n = 0;
          for (this[t] = 255 & e; ++n < r && (i *= 256); )
            this[t + n] = (e / i) & 255;
          return t + r;
        }),
        (l.prototype.writeUIntBE = function (e, t, r, o) {
          ((e = +e), (t |= 0), (r |= 0), o) ||
            j(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
          var i = r - 1,
            n = 1;
          for (this[t + i] = 255 & e; --i >= 0 && (n *= 256); )
            this[t + i] = (e / n) & 255;
          return t + r;
        }),
        (l.prototype.writeUInt8 = function (e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || j(this, e, t, 1, 255, 0),
            l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            (this[t] = 255 & e),
            t + 1
          );
        }),
        (l.prototype.writeUInt16LE = function (e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || j(this, e, t, 2, 65535, 0),
            l.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
              : D(this, e, t, !0),
            t + 2
          );
        }),
        (l.prototype.writeUInt16BE = function (e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || j(this, e, t, 2, 65535, 0),
            l.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
              : D(this, e, t, !1),
            t + 2
          );
        }),
        (l.prototype.writeUInt32LE = function (e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || j(this, e, t, 4, 4294967295, 0),
            l.TYPED_ARRAY_SUPPORT
              ? ((this[t + 3] = e >>> 24),
                (this[t + 2] = e >>> 16),
                (this[t + 1] = e >>> 8),
                (this[t] = 255 & e))
              : P(this, e, t, !0),
            t + 4
          );
        }),
        (l.prototype.writeUInt32BE = function (e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || j(this, e, t, 4, 4294967295, 0),
            l.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 24),
                (this[t + 1] = e >>> 16),
                (this[t + 2] = e >>> 8),
                (this[t + 3] = 255 & e))
              : P(this, e, t, !1),
            t + 4
          );
        }),
        (l.prototype.writeIntLE = function (e, t, r, o) {
          if (((e = +e), (t |= 0), !o)) {
            var i = Math.pow(2, 8 * r - 1);
            j(this, e, t, r, i - 1, -i);
          }
          var n = 0,
            s = 1,
            a = 0;
          for (this[t] = 255 & e; ++n < r && (s *= 256); )
            e < 0 && 0 === a && 0 !== this[t + n - 1] && (a = 1),
              (this[t + n] = (((e / s) >> 0) - a) & 255);
          return t + r;
        }),
        (l.prototype.writeIntBE = function (e, t, r, o) {
          if (((e = +e), (t |= 0), !o)) {
            var i = Math.pow(2, 8 * r - 1);
            j(this, e, t, r, i - 1, -i);
          }
          var n = r - 1,
            s = 1,
            a = 0;
          for (this[t + n] = 255 & e; --n >= 0 && (s *= 256); )
            e < 0 && 0 === a && 0 !== this[t + n + 1] && (a = 1),
              (this[t + n] = (((e / s) >> 0) - a) & 255);
          return t + r;
        }),
        (l.prototype.writeInt8 = function (e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || j(this, e, t, 1, 127, -128),
            l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            e < 0 && (e = 255 + e + 1),
            (this[t] = 255 & e),
            t + 1
          );
        }),
        (l.prototype.writeInt16LE = function (e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || j(this, e, t, 2, 32767, -32768),
            l.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
              : D(this, e, t, !0),
            t + 2
          );
        }),
        (l.prototype.writeInt16BE = function (e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || j(this, e, t, 2, 32767, -32768),
            l.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
              : D(this, e, t, !1),
            t + 2
          );
        }),
        (l.prototype.writeInt32LE = function (e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || j(this, e, t, 4, 2147483647, -2147483648),
            l.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & e),
                (this[t + 1] = e >>> 8),
                (this[t + 2] = e >>> 16),
                (this[t + 3] = e >>> 24))
              : P(this, e, t, !0),
            t + 4
          );
        }),
        (l.prototype.writeInt32BE = function (e, t, r) {
          return (
            (e = +e),
            (t |= 0),
            r || j(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            l.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 24),
                (this[t + 1] = e >>> 16),
                (this[t + 2] = e >>> 8),
                (this[t + 3] = 255 & e))
              : P(this, e, t, !1),
            t + 4
          );
        }),
        (l.prototype.writeFloatLE = function (e, t, r) {
          return N(this, e, t, !0, r);
        }),
        (l.prototype.writeFloatBE = function (e, t, r) {
          return N(this, e, t, !1, r);
        }),
        (l.prototype.writeDoubleLE = function (e, t, r) {
          return z(this, e, t, !0, r);
        }),
        (l.prototype.writeDoubleBE = function (e, t, r) {
          return z(this, e, t, !1, r);
        }),
        (l.prototype.copy = function (e, t, r, o) {
          if (
            (r || (r = 0),
            o || 0 === o || (o = this.length),
            t >= e.length && (t = e.length),
            t || (t = 0),
            o > 0 && o < r && (o = r),
            o === r)
          )
            return 0;
          if (0 === e.length || 0 === this.length) return 0;
          if (t < 0) throw new RangeError('targetStart out of bounds');
          if (r < 0 || r >= this.length)
            throw new RangeError('sourceStart out of bounds');
          if (o < 0) throw new RangeError('sourceEnd out of bounds');
          o > this.length && (o = this.length),
            e.length - t < o - r && (o = e.length - t + r);
          var i,
            n = o - r;
          if (this === e && r < t && t < o)
            for (i = n - 1; i >= 0; --i) e[i + t] = this[i + r];
          else if (n < 1e3 || !l.TYPED_ARRAY_SUPPORT)
            for (i = 0; i < n; ++i) e[i + t] = this[i + r];
          else Uint8Array.prototype.set.call(e, this.subarray(r, r + n), t);
          return n;
        }),
        (l.prototype.fill = function (e, t, r, o) {
          if ('string' == typeof e) {
            if (
              ('string' == typeof t
                ? ((o = t), (t = 0), (r = this.length))
                : 'string' == typeof r && ((o = r), (r = this.length)),
              1 === e.length)
            ) {
              var i = e.charCodeAt(0);
              i < 256 && (e = i);
            }
            if (void 0 !== o && 'string' != typeof o)
              throw new TypeError('encoding must be a string');
            if ('string' == typeof o && !l.isEncoding(o))
              throw new TypeError('Unknown encoding: ' + o);
          } else 'number' == typeof e && (e &= 255);
          if (t < 0 || this.length < t || this.length < r)
            throw new RangeError('Out of range index');
          if (r <= t) return this;
          var n;
          if (
            ((t >>>= 0),
            (r = void 0 === r ? this.length : r >>> 0),
            e || (e = 0),
            'number' == typeof e)
          )
            for (n = t; n < r; ++n) this[n] = e;
          else {
            var s = l.isBuffer(e) ? e : k(new l(e, o).toString()),
              a = s.length;
            for (n = 0; n < r - t; ++n) this[n + t] = s[n % a];
          }
          return this;
        });
      var L = /[^+\/0-9A-Za-z-_]/g;
      function U(e) {
        return e < 16 ? '0' + e.toString(16) : e.toString(16);
      }
      function k(e, t) {
        var r;
        t = t || 1 / 0;
        for (var o = e.length, i = null, n = [], s = 0; s < o; ++s) {
          if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
            if (!i) {
              if (r > 56319) {
                (t -= 3) > -1 && n.push(239, 191, 189);
                continue;
              }
              if (s + 1 === o) {
                (t -= 3) > -1 && n.push(239, 191, 189);
                continue;
              }
              i = r;
              continue;
            }
            if (r < 56320) {
              (t -= 3) > -1 && n.push(239, 191, 189), (i = r);
              continue;
            }
            r = 65536 + (((i - 55296) << 10) | (r - 56320));
          } else i && (t -= 3) > -1 && n.push(239, 191, 189);
          if (((i = null), r < 128)) {
            if ((t -= 1) < 0) break;
            n.push(r);
          } else if (r < 2048) {
            if ((t -= 2) < 0) break;
            n.push((r >> 6) | 192, (63 & r) | 128);
          } else if (r < 65536) {
            if ((t -= 3) < 0) break;
            n.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
          } else {
            if (!(r < 1114112)) throw new Error('Invalid code point');
            if ((t -= 4) < 0) break;
            n.push(
              (r >> 18) | 240,
              ((r >> 12) & 63) | 128,
              ((r >> 6) & 63) | 128,
              (63 & r) | 128
            );
          }
        }
        return n;
      }
      function x(e) {
        return o.toByteArray(
          (function (e) {
            if (
              (e = (function (e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
              })(e).replace(L, '')).length < 2
            )
              return '';
            for (; e.length % 4 != 0; ) e += '=';
            return e;
          })(e)
        );
      }
      function H(e, t, r, o) {
        for (var i = 0; i < o && !(i + r >= t.length || i >= e.length); ++i)
          t[i + r] = e[i];
        return i;
      }
    }).call(this, r(6));
  },
  function (e, t, r) {
    'use strict';
    (t.byteLength = function (e) {
      var t = g(e),
        r = t[0],
        o = t[1];
      return (3 * (r + o)) / 4 - o;
    }),
      (t.toByteArray = function (e) {
        var t,
          r,
          o = g(e),
          s = o[0],
          a = o[1],
          l = new n(
            (function (e, t, r) {
              return (3 * (t + r)) / 4 - r;
            })(0, s, a)
          ),
          p = 0,
          u = a > 0 ? s - 4 : s;
        for (r = 0; r < u; r += 4)
          (t =
            (i[e.charCodeAt(r)] << 18) |
            (i[e.charCodeAt(r + 1)] << 12) |
            (i[e.charCodeAt(r + 2)] << 6) |
            i[e.charCodeAt(r + 3)]),
            (l[p++] = (t >> 16) & 255),
            (l[p++] = (t >> 8) & 255),
            (l[p++] = 255 & t);
        2 === a &&
          ((t = (i[e.charCodeAt(r)] << 2) | (i[e.charCodeAt(r + 1)] >> 4)),
          (l[p++] = 255 & t));
        1 === a &&
          ((t =
            (i[e.charCodeAt(r)] << 10) |
            (i[e.charCodeAt(r + 1)] << 4) |
            (i[e.charCodeAt(r + 2)] >> 2)),
          (l[p++] = (t >> 8) & 255),
          (l[p++] = 255 & t));
        return l;
      }),
      (t.fromByteArray = function (e) {
        for (
          var t, r = e.length, i = r % 3, n = [], s = 0, a = r - i;
          s < a;
          s += 16383
        )
          n.push(p(e, s, s + 16383 > a ? a : s + 16383));
        1 === i
          ? ((t = e[r - 1]), n.push(o[t >> 2] + o[(t << 4) & 63] + '=='))
          : 2 === i &&
            ((t = (e[r - 2] << 8) + e[r - 1]),
            n.push(o[t >> 10] + o[(t >> 4) & 63] + o[(t << 2) & 63] + '='));
        return n.join('');
      });
    for (
      var o = [],
        i = [],
        n = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
        s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        a = 0,
        l = s.length;
      a < l;
      ++a
    )
      (o[a] = s[a]), (i[s.charCodeAt(a)] = a);
    function g(e) {
      var t = e.length;
      if (t % 4 > 0)
        throw new Error('Invalid string. Length must be a multiple of 4');
      var r = e.indexOf('=');
      return -1 === r && (r = t), [r, r === t ? 0 : 4 - (r % 4)];
    }
    function p(e, t, r) {
      for (var i, n, s = [], a = t; a < r; a += 3)
        (i =
          ((e[a] << 16) & 16711680) +
          ((e[a + 1] << 8) & 65280) +
          (255 & e[a + 2])),
          s.push(
            o[((n = i) >> 18) & 63] +
              o[(n >> 12) & 63] +
              o[(n >> 6) & 63] +
              o[63 & n]
          );
      return s.join('');
    }
    (i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63);
  },
  function (e, t) {
    (t.read = function (e, t, r, o, i) {
      var n,
        s,
        a = 8 * i - o - 1,
        l = (1 << a) - 1,
        g = l >> 1,
        p = -7,
        u = r ? i - 1 : 0,
        y = r ? -1 : 1,
        c = e[t + u];
      for (
        u += y, n = c & ((1 << -p) - 1), c >>= -p, p += a;
        p > 0;
        n = 256 * n + e[t + u], u += y, p -= 8
      );
      for (
        s = n & ((1 << -p) - 1), n >>= -p, p += o;
        p > 0;
        s = 256 * s + e[t + u], u += y, p -= 8
      );
      if (0 === n) n = 1 - g;
      else {
        if (n === l) return s ? NaN : (1 / 0) * (c ? -1 : 1);
        (s += Math.pow(2, o)), (n -= g);
      }
      return (c ? -1 : 1) * s * Math.pow(2, n - o);
    }),
      (t.write = function (e, t, r, o, i, n) {
        var s,
          a,
          l,
          g = 8 * n - i - 1,
          p = (1 << g) - 1,
          u = p >> 1,
          y = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          c = o ? 0 : n - 1,
          d = o ? 1 : -1,
          f = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
        for (
          t = Math.abs(t),
            isNaN(t) || t === 1 / 0
              ? ((a = isNaN(t) ? 1 : 0), (s = p))
              : ((s = Math.floor(Math.log(t) / Math.LN2)),
                t * (l = Math.pow(2, -s)) < 1 && (s--, (l *= 2)),
                (t += s + u >= 1 ? y / l : y * Math.pow(2, 1 - u)) * l >= 2 &&
                  (s++, (l /= 2)),
                s + u >= p
                  ? ((a = 0), (s = p))
                  : s + u >= 1
                  ? ((a = (t * l - 1) * Math.pow(2, i)), (s += u))
                  : ((a = t * Math.pow(2, u - 1) * Math.pow(2, i)), (s = 0)));
          i >= 8;
          e[r + c] = 255 & a, c += d, a /= 256, i -= 8
        );
        for (
          s = (s << i) | a, g += i;
          g > 0;
          e[r + c] = 255 & s, c += d, s /= 256, g -= 8
        );
        e[r + c - d] |= 128 * f;
      });
  },
  function (e, t) {
    var r = {}.toString;
    e.exports =
      Array.isArray ||
      function (e) {
        return '[object Array]' == r.call(e);
      };
  },
]);
