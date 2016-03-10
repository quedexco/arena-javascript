// ThreeWebGL.js r40 - http://github.com/mrdoob/three.js
var THREE = THREE || {};
if (!window.Int32Array) {
  window.Int32Array = Array;
  window.Float32Array = Array
}
THREE.Color = function (b) {
  this.setHex(b)
};
THREE.Color.prototype = {
  copy: function (b) {
    this.r = b.r;
    this.g = b.g;
    this.b = b.b;
    this.hex = b.hex
  }, setHex: function (b) {
    this.hex = ~~b & 16777215;
    this.updateRGB()
  }, setRGB: function (b, d, e) {
    this.r = b;
    this.g = d;
    this.b = e;
    this.updateHex()
  }, setHSV: function (b, d, e) {
    var g, h, p, o, q, r;
    if (e == 0)g = h = p = 0; else {
      o = Math.floor(b * 6);
      q = b * 6 - o;
      b = e * (1 - d);
      r = e * (1 - d * q);
      d = e * (1 - d * (1 - q));
      switch (o) {
        case 1:
          g = r;
          h = e;
          p = b;
          break;
        case 2:
          g = b;
          h = e;
          p = d;
          break;
        case 3:
          g = b;
          h = r;
          p = e;
          break;
        case 4:
          g = d;
          h = b;
          p = e;
          break;
        case 5:
          g = e;
          h = b;
          p = r;
          break;
        case 6:
        case 0:
          g = e;
          h = d;
          p = b
      }
    }
    this.setRGB(g,
      h, p)
  }, updateHex: function () {
    this.hex = ~~(this.r * 255) << 16 ^ ~~(this.g * 255) << 8 ^ ~~(this.b * 255)
  }, updateRGB: function () {
    this.r = (this.hex >> 16 & 255) / 255;
    this.g = (this.hex >> 8 & 255) / 255;
    this.b = (this.hex & 255) / 255
  }, clone: function () {
    return new THREE.Color(this.hex)
  }
};
THREE.Vector2 = function (b, d) {
  this.set(b || 0, d || 0)
};
THREE.Vector2.prototype = {
  set: function (b, d) {
    this.x = b;
    this.y = d;
    return this
  }, copy: function (b) {
    this.set(b.x, b.y);
    return this
  }, addSelf: function (b) {
    this.set(this.x + b.x, this.y + b.y);
    return this
  }, add: function (b, d) {
    this.set(b.x + d.x, b.y + d.y);
    return this
  }, subSelf: function (b) {
    this.set(this.x - b.x, this.y - b.y);
    return this
  }, sub: function (b, d) {
    this.set(b.x - d.x, b.y - d.y);
    return this
  }, multiplyScalar: function (b) {
    this.set(this.x * b, this.y * b);
    return this
  }, negate: function () {
    this.set(-this.x, -this.y);
    return this
  }, unit: function () {
    this.multiplyScalar(1 /
      this.length());
    return this
  }, length: function () {
    return Math.sqrt(this.lengthSq())
  }, lengthSq: function () {
    return this.x * this.x + this.y * this.y
  }, clone: function () {
    return new THREE.Vector2(this.x, this.y)
  }
};
THREE.Vector3 = function (b, d, e) {
  this.set(b || 0, d || 0, e || 0)
};
THREE.Vector3.prototype = {
  set: function (b, d, e) {
    this.x = b;
    this.y = d;
    this.z = e;
    return this
  }, copy: function (b) {
    this.set(b.x, b.y, b.z);
    return this
  }, add: function (b, d) {
    this.set(b.x + d.x, b.y + d.y, b.z + d.z);
    return this
  }, addSelf: function (b) {
    this.set(this.x + b.x, this.y + b.y, this.z + b.z);
    return this
  }, addScalar: function (b) {
    this.set(this.x + b, this.y + b, this.z + b);
    return this
  }, sub: function (b, d) {
    this.set(b.x - d.x, b.y - d.y, b.z - d.z);
    return this
  }, subSelf: function (b) {
    this.set(this.x - b.x, this.y - b.y, this.z - b.z);
    return this
  }, cross: function (b,
                      d) {
    this.set(b.y * d.z - b.z * d.y, b.z * d.x - b.x * d.z, b.x * d.y - b.y * d.x);
    return this
  }, crossSelf: function (b) {
    var d = this.x, e = this.y, g = this.z;
    this.set(e * b.z - g * b.y, g * b.x - d * b.z, d * b.y - e * b.x);
    return this
  }, multiply: function (b, d) {
    this.set(b.x * d.x, b.y * d.y, b.z * d.z);
    return this
  }, multiplySelf: function (b) {
    this.set(this.x * b.x, this.y * b.y, this.z * b.z);
    return this
  }, multiplyScalar: function (b) {
    this.set(this.x * b, this.y * b, this.z * b);
    return this
  }, divideSelf: function (b) {
    this.set(this.x / b.x, this.y / b.y, this.z / b.z);
    return this
  }, divideScalar: function (b) {
    this.set(this.x /
      b, this.y / b, this.z / b);
    return this
  }, negate: function () {
    this.set(-this.x, -this.y, -this.z);
    return this
  }, dot: function (b) {
    return this.x * b.x + this.y * b.y + this.z * b.z
  }, distanceTo: function (b) {
    return Math.sqrt(this.distanceToSquared(b))
  }, distanceToSquared: function (b) {
    var d = this.x - b.x, e = this.y - b.y;
    b = this.z - b.z;
    return d * d + e * e + b * b
  }, length: function () {
    return Math.sqrt(this.lengthSq())
  }, lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }, lengthManhattan: function () {
    return this.x + this.y + this.z
  }, normalize: function () {
    var b =
      this.length();
    b > 0 ? this.multiplyScalar(1 / b) : this.set(0, 0, 0);
    return this
  }, setPositionFromMatrix: function (b) {
    this.x = b.n14;
    this.y = b.n24;
    this.z = b.n34
  }, setRotationFromMatrix: function (b) {
    var d = Math.cos(this.y);
    this.y = Math.asin(b.n13);
    if (Math.abs(d) > 1.0E-5) {
      this.x = Math.atan2(-b.n23 / d, b.n33 / d);
      this.z = Math.atan2(-b.n12 / d, b.n11 / d)
    } else {
      this.x = 0;
      this.z = Math.atan2(b.n21, b.n22)
    }
  }, setLength: function (b) {
    return this.normalize().multiplyScalar(b)
  }, isZero: function () {
    return Math.abs(this.x) < 1.0E-4 && Math.abs(this.y) <
      1.0E-4 && Math.abs(this.z) < 1.0E-4
  }, clone: function () {
    return new THREE.Vector3(this.x, this.y, this.z)
  }
};
THREE.Vector4 = function (b, d, e, g) {
  this.set(b || 0, d || 0, e || 0, g || 1)
};
THREE.Vector4.prototype = {
  set: function (b, d, e, g) {
    this.x = b;
    this.y = d;
    this.z = e;
    this.w = g;
    return this
  }, copy: function (b) {
    this.set(b.x, b.y, b.z, b.w || 1);
    return this
  }, add: function (b, d) {
    this.set(b.x + d.x, b.y + d.y, b.z + d.z, b.w + d.w);
    return this
  }, addSelf: function (b) {
    this.set(this.x + b.x, this.y + b.y, this.z + b.z, this.w + b.w);
    return this
  }, sub: function (b, d) {
    this.set(b.x - d.x, b.y - d.y, b.z - d.z, b.w - d.w);
    return this
  }, subSelf: function (b) {
    this.set(this.x - b.x, this.y - b.y, this.z - b.z, this.w - b.w);
    return this
  }, multiplyScalar: function (b) {
    this.set(this.x *
      b, this.y * b, this.z * b, this.w * b);
    return this
  }, divideScalar: function (b) {
    this.set(this.x / b, this.y / b, this.z / b, this.w / b);
    return this
  }, lerpSelf: function (b, d) {
    this.set(this.x + (b.x - this.x) * d, this.y + (b.y - this.y) * d, this.z + (b.z - this.z) * d, this.w + (b.w - this.w) * d)
  }, clone: function () {
    return new THREE.Vector4(this.x, this.y, this.z, this.w)
  }
};
THREE.Ray = function (b, d) {
  this.origin = b || new THREE.Vector3;
  this.direction = d || new THREE.Vector3
};
THREE.Ray.prototype = {
  intersectScene: function (b) {
    return this.intersectObjects(b.objects)
  }, intersectObjects: function (b) {
    var d, e, g, h = [];
    d = 0;
    for (e = b.length; d < e; d++) {
      g = b[d];
      g instanceof THREE.Mesh && (h = h.concat(this.intersectObject(g)))
    }
    h.sort(function (p, o) {
      return p.distance - o.distance
    });
    return h
  }, intersectObject: function (b) {
    function d(P, L, ea, W) {
      W = W.clone().subSelf(L);
      ea = ea.clone().subSelf(L);
      var Z = P.clone().subSelf(L);
      P = W.dot(W);
      L = W.dot(ea);
      W = W.dot(Z);
      var X = ea.dot(ea);
      ea = ea.dot(Z);
      Z = 1 / (P * X - L * L);
      X = (X * W -
        L * ea) * Z;
      P = (P * ea - L * W) * Z;
      return X > 0 && P > 0 && X + P < 1
    }

    var e, g, h, p, o, q, r, v, E, G, H, C = b.geometry, F = C.vertices, O = [];
    e = 0;
    for (g = C.faces.length; e < g; e++) {
      h = C.faces[e];
      G = this.origin.clone();
      H = this.direction.clone();
      r = b.matrixWorld;
      p = r.multiplyVector3(F[h.a].position.clone());
      o = r.multiplyVector3(F[h.b].position.clone());
      q = r.multiplyVector3(F[h.c].position.clone());
      r = h instanceof THREE.Face4 ? r.multiplyVector3(F[h.d].position.clone()) : null;
      v = b.matrixRotationWorld.multiplyVector3(h.normal.clone());
      E = H.dot(v);
      if (b.doubleSided ||
        (b.flipSided ? E > 0 : E < 0)) {
        v = v.dot((new THREE.Vector3).sub(p, G)) / E;
        G = G.addSelf(H.multiplyScalar(v));
        if (h instanceof THREE.Face3) {
          if (d(G, p, o, q)) {
            h = {distance: this.origin.distanceTo(G), point: G, face: h, object: b};
            O.push(h)
          }
        } else if (h instanceof THREE.Face4 && (d(G, p, o, r) || d(G, o, q, r))) {
          h = {distance: this.origin.distanceTo(G), point: G, face: h, object: b};
          O.push(h)
        }
      }
    }
    return O
  }
};
THREE.Rectangle = function () {
  function b() {
    p = g - d;
    o = h - e
  }

  var d, e, g, h, p, o, q = !0;
  this.getX = function () {
    return d
  };
  this.getY = function () {
    return e
  };
  this.getWidth = function () {
    return p
  };
  this.getHeight = function () {
    return o
  };
  this.getLeft = function () {
    return d
  };
  this.getTop = function () {
    return e
  };
  this.getRight = function () {
    return g
  };
  this.getBottom = function () {
    return h
  };
  this.set = function (r, v, E, G) {
    q = !1;
    d = r;
    e = v;
    g = E;
    h = G;
    b()
  };
  this.addPoint = function (r, v) {
    if (q) {
      q = !1;
      d = r;
      e = v;
      g = r;
      h = v
    } else {
      d = d < r ? d : r;
      e = e < v ? e : v;
      g = g > r ? g : r;
      h = h > v ? h : v
    }
    b()
  };
  this.add3Points = function (r, v, E, G, H, C) {
    if (q) {
      q = !1;
      d = r < E ? r < H ? r : H : E < H ? E : H;
      e = v < G ? v < C ? v : C : G < C ? G : C;
      g = r > E ? r > H ? r : H : E > H ? E : H;
      h = v > G ? v > C ? v : C : G > C ? G : C
    } else {
      d = r < E ? r < H ? r < d ? r : d : H < d ? H : d : E < H ? E < d ? E : d : H < d ? H : d;
      e = v < G ? v < C ? v < e ? v : e : C < e ? C : e : G < C ? G < e ? G : e : C < e ? C : e;
      g = r > E ? r > H ? r > g ? r : g : H > g ? H : g : E > H ? E > g ? E : g : H > g ? H : g;
      h = v > G ? v > C ? v > h ? v : h : C > h ? C : h : G > C ? G > h ? G : h : C > h ? C : h
    }
    b()
  };
  this.addRectangle = function (r) {
    if (q) {
      q = !1;
      d = r.getLeft();
      e = r.getTop();
      g = r.getRight();
      h = r.getBottom()
    } else {
      d = d < r.getLeft() ? d : r.getLeft();
      e = e < r.getTop() ? e : r.getTop();
      g = g > r.getRight() ?
        g : r.getRight();
      h = h > r.getBottom() ? h : r.getBottom()
    }
    b()
  };
  this.inflate = function (r) {
    d -= r;
    e -= r;
    g += r;
    h += r;
    b()
  };
  this.minSelf = function (r) {
    d = d > r.getLeft() ? d : r.getLeft();
    e = e > r.getTop() ? e : r.getTop();
    g = g < r.getRight() ? g : r.getRight();
    h = h < r.getBottom() ? h : r.getBottom();
    b()
  };
  this.instersects = function (r) {
    return Math.min(g, r.getRight()) - Math.max(d, r.getLeft()) >= 0 && Math.min(h, r.getBottom()) - Math.max(e, r.getTop()) >= 0
  };
  this.empty = function () {
    q = !0;
    h = g = e = d = 0;
    b()
  };
  this.isEmpty = function () {
    return q
  }
};
THREE.Matrix3 = function () {
  this.m = []
};
THREE.Matrix3.prototype = {
  transpose: function () {
    var b, d = this.m;
    b = d[1];
    d[1] = d[3];
    d[3] = b;
    b = d[2];
    d[2] = d[6];
    d[6] = b;
    b = d[5];
    d[5] = d[7];
    d[7] = b;
    return this
  }, transposeIntoArray: function (b) {
    var d = this.m;
    b[0] = d[0];
    b[1] = d[3];
    b[2] = d[6];
    b[3] = d[1];
    b[4] = d[4];
    b[5] = d[7];
    b[6] = d[2];
    b[7] = d[5];
    b[8] = d[8];
    return this
  }
};
THREE.Matrix4 = function (b, d, e, g, h, p, o, q, r, v, E, G, H, C, F, O) {
  this.set(b || 1, d || 0, e || 0, g || 0, h || 0, p || 1, o || 0, q || 0, r || 0, v || 0, E || 1, G || 0, H || 0, C || 0, F || 0, O || 1);
  this.flat = Array(16);
  this.m33 = new THREE.Matrix3
};
THREE.Matrix4.prototype = {
  set: function (b, d, e, g, h, p, o, q, r, v, E, G, H, C, F, O) {
    this.n11 = b;
    this.n12 = d;
    this.n13 = e;
    this.n14 = g;
    this.n21 = h;
    this.n22 = p;
    this.n23 = o;
    this.n24 = q;
    this.n31 = r;
    this.n32 = v;
    this.n33 = E;
    this.n34 = G;
    this.n41 = H;
    this.n42 = C;
    this.n43 = F;
    this.n44 = O;
    return this
  }, identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this
  }, copy: function (b) {
    this.set(b.n11, b.n12, b.n13, b.n14, b.n21, b.n22, b.n23, b.n24, b.n31, b.n32, b.n33, b.n34, b.n41, b.n42, b.n43, b.n44);
    return this
  }, lookAt: function (b, d, e) {
    var g = THREE.Matrix4.__v1,
      h = THREE.Matrix4.__v2, p = THREE.Matrix4.__v3;
    p.sub(b, d).normalize();
    if (p.length() === 0)p.z = 1;
    g.cross(e, p).normalize();
    if (g.length() === 0) {
      p.x += 1.0E-4;
      g.cross(e, p).normalize()
    }
    h.cross(p, g).normalize();
    this.n11 = g.x;
    this.n12 = h.x;
    this.n13 = p.x;
    this.n21 = g.y;
    this.n22 = h.y;
    this.n23 = p.y;
    this.n31 = g.z;
    this.n32 = h.z;
    this.n33 = p.z;
    return this
  }, multiplyVector3: function (b) {
    var d = b.x, e = b.y, g = b.z, h = 1 / (this.n41 * d + this.n42 * e + this.n43 * g + this.n44);
    b.x = (this.n11 * d + this.n12 * e + this.n13 * g + this.n14) * h;
    b.y = (this.n21 * d + this.n22 * e + this.n23 *
      g + this.n24) * h;
    b.z = (this.n31 * d + this.n32 * e + this.n33 * g + this.n34) * h;
    return b
  }, multiplyVector4: function (b) {
    var d = b.x, e = b.y, g = b.z, h = b.w;
    b.x = this.n11 * d + this.n12 * e + this.n13 * g + this.n14 * h;
    b.y = this.n21 * d + this.n22 * e + this.n23 * g + this.n24 * h;
    b.z = this.n31 * d + this.n32 * e + this.n33 * g + this.n34 * h;
    b.w = this.n41 * d + this.n42 * e + this.n43 * g + this.n44 * h;
    return b
  }, rotateAxis: function (b) {
    var d = b.x, e = b.y, g = b.z;
    b.x = d * this.n11 + e * this.n12 + g * this.n13;
    b.y = d * this.n21 + e * this.n22 + g * this.n23;
    b.z = d * this.n31 + e * this.n32 + g * this.n33;
    b.normalize();
    return b
  }, crossVector: function (b) {
    var d = new THREE.Vector4;
    d.x = this.n11 * b.x + this.n12 * b.y + this.n13 * b.z + this.n14 * b.w;
    d.y = this.n21 * b.x + this.n22 * b.y + this.n23 * b.z + this.n24 * b.w;
    d.z = this.n31 * b.x + this.n32 * b.y + this.n33 * b.z + this.n34 * b.w;
    d.w = b.w ? this.n41 * b.x + this.n42 * b.y + this.n43 * b.z + this.n44 * b.w : 1;
    return d
  }, multiply: function (b, d) {
    var e = b.n11, g = b.n12, h = b.n13, p = b.n14, o = b.n21, q = b.n22, r = b.n23, v = b.n24, E = b.n31, G = b.n32, H = b.n33, C = b.n34, F = b.n41, O = b.n42, P = b.n43, L = b.n44, ea = d.n11, W = d.n12, Z = d.n13, X = d.n14, M = d.n21, Ia = d.n22,
      fa = d.n23, Fa = d.n24, ha = d.n31, T = d.n32, c = d.n33, ia = d.n34;
    this.n11 = e * ea + g * M + h * ha;
    this.n12 = e * W + g * Ia + h * T;
    this.n13 = e * Z + g * fa + h * c;
    this.n14 = e * X + g * Fa + h * ia + p;
    this.n21 = o * ea + q * M + r * ha;
    this.n22 = o * W + q * Ia + r * T;
    this.n23 = o * Z + q * fa + r * c;
    this.n24 = o * X + q * Fa + r * ia + v;
    this.n31 = E * ea + G * M + H * ha;
    this.n32 = E * W + G * Ia + H * T;
    this.n33 = E * Z + G * fa + H * c;
    this.n34 = E * X + G * Fa + H * ia + C;
    this.n41 = F * ea + O * M + P * ha;
    this.n42 = F * W + O * Ia + P * T;
    this.n43 = F * Z + O * fa + P * c;
    this.n44 = F * X + O * Fa + P * ia + L;
    return this
  }, multiplyToArray: function (b, d, e) {
    this.multiply(b, d);
    e[0] = this.n11;
    e[1] =
      this.n21;
    e[2] = this.n31;
    e[3] = this.n41;
    e[4] = this.n12;
    e[5] = this.n22;
    e[6] = this.n32;
    e[7] = this.n42;
    e[8] = this.n13;
    e[9] = this.n23;
    e[10] = this.n33;
    e[11] = this.n43;
    e[12] = this.n14;
    e[13] = this.n24;
    e[14] = this.n34;
    e[15] = this.n44;
    return this
  }, multiplySelf: function (b) {
    this.multiply(this, b);
    return this
  }, multiplyScalar: function (b) {
    this.n11 *= b;
    this.n12 *= b;
    this.n13 *= b;
    this.n14 *= b;
    this.n21 *= b;
    this.n22 *= b;
    this.n23 *= b;
    this.n24 *= b;
    this.n31 *= b;
    this.n32 *= b;
    this.n33 *= b;
    this.n34 *= b;
    this.n41 *= b;
    this.n42 *= b;
    this.n43 *= b;
    this.n44 *=
      b;
    return this
  }, determinant: function () {
    var b = this.n11, d = this.n12, e = this.n13, g = this.n14, h = this.n21, p = this.n22, o = this.n23, q = this.n24, r = this.n31, v = this.n32, E = this.n33, G = this.n34, H = this.n41, C = this.n42, F = this.n43, O = this.n44;
    return g * o * v * H - e * q * v * H - g * p * E * H + d * q * E * H + e * p * G * H - d * o * G * H - g * o * r * C + e * q * r * C + g * h * E * C - b * q * E * C - e * h * G * C + b * o * G * C + g * p * r * F - d * q * r * F - g * h * v * F + b * q * v * F + d * h * G * F - b * p * G * F - e * p * r * O + d * o * r * O + e * h * v * O - b * o * v * O - d * h * E * O + b * p * E * O
  }, transpose: function () {
    var b;
    b = this.n21;
    this.n21 = this.n12;
    this.n12 = b;
    b = this.n31;
    this.n31 =
      this.n13;
    this.n13 = b;
    b = this.n32;
    this.n32 = this.n23;
    this.n23 = b;
    b = this.n41;
    this.n41 = this.n14;
    this.n14 = b;
    b = this.n42;
    this.n42 = this.n24;
    this.n24 = b;
    b = this.n43;
    this.n43 = this.n34;
    this.n43 = b;
    return this
  }, clone: function () {
    var b = new THREE.Matrix4;
    b.n11 = this.n11;
    b.n12 = this.n12;
    b.n13 = this.n13;
    b.n14 = this.n14;
    b.n21 = this.n21;
    b.n22 = this.n22;
    b.n23 = this.n23;
    b.n24 = this.n24;
    b.n31 = this.n31;
    b.n32 = this.n32;
    b.n33 = this.n33;
    b.n34 = this.n34;
    b.n41 = this.n41;
    b.n42 = this.n42;
    b.n43 = this.n43;
    b.n44 = this.n44;
    return b
  }, flatten: function () {
    this.flat[0] =
      this.n11;
    this.flat[1] = this.n21;
    this.flat[2] = this.n31;
    this.flat[3] = this.n41;
    this.flat[4] = this.n12;
    this.flat[5] = this.n22;
    this.flat[6] = this.n32;
    this.flat[7] = this.n42;
    this.flat[8] = this.n13;
    this.flat[9] = this.n23;
    this.flat[10] = this.n33;
    this.flat[11] = this.n43;
    this.flat[12] = this.n14;
    this.flat[13] = this.n24;
    this.flat[14] = this.n34;
    this.flat[15] = this.n44;
    return this.flat
  }, flattenToArray: function (b) {
    b[0] = this.n11;
    b[1] = this.n21;
    b[2] = this.n31;
    b[3] = this.n41;
    b[4] = this.n12;
    b[5] = this.n22;
    b[6] = this.n32;
    b[7] = this.n42;
    b[8] = this.n13;
    b[9] = this.n23;
    b[10] = this.n33;
    b[11] = this.n43;
    b[12] = this.n14;
    b[13] = this.n24;
    b[14] = this.n34;
    b[15] = this.n44;
    return b
  }, flattenToArrayOffset: function (b, d) {
    b[d] = this.n11;
    b[d + 1] = this.n21;
    b[d + 2] = this.n31;
    b[d + 3] = this.n41;
    b[d + 4] = this.n12;
    b[d + 5] = this.n22;
    b[d + 6] = this.n32;
    b[d + 7] = this.n42;
    b[d + 8] = this.n13;
    b[d + 9] = this.n23;
    b[d + 10] = this.n33;
    b[d + 11] = this.n43;
    b[d + 12] = this.n14;
    b[d + 13] = this.n24;
    b[d + 14] = this.n34;
    b[d + 15] = this.n44;
    return b
  }, setTranslation: function (b, d, e) {
    this.set(1, 0, 0, b, 0, 1, 0, d, 0, 0, 1, e, 0, 0,
      0, 1);
    return this
  }, setScale: function (b, d, e) {
    this.set(b, 0, 0, 0, 0, d, 0, 0, 0, 0, e, 0, 0, 0, 0, 1);
    return this
  }, setRotationX: function (b) {
    var d = Math.cos(b);
    b = Math.sin(b);
    this.set(1, 0, 0, 0, 0, d, -b, 0, 0, b, d, 0, 0, 0, 0, 1);
    return this
  }, setRotationY: function (b) {
    var d = Math.cos(b);
    b = Math.sin(b);
    this.set(d, 0, b, 0, 0, 1, 0, 0, -b, 0, d, 0, 0, 0, 0, 1);
    return this
  }, setRotationZ: function (b) {
    var d = Math.cos(b);
    b = Math.sin(b);
    this.set(d, -b, 0, 0, b, d, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this
  }, setRotationAxis: function (b, d) {
    var e = Math.cos(d), g = Math.sin(d), h =
      1 - e, p = b.x, o = b.y, q = b.z, r = h * p, v = h * o;
    this.set(r * p + e, r * o - g * q, r * q + g * o, 0, r * o + g * q, v * o + e, v * q - g * p, 0, r * q - g * o, v * q + g * p, h * q * q + e, 0, 0, 0, 0, 1);
    return this
  }, setPosition: function (b) {
    this.n14 = b.x;
    this.n24 = b.y;
    this.n34 = b.z;
    return this
  }, getPosition: function () {
    if (!this.position)this.position = new THREE.Vector3;
    this.position.set(this.n14, this.n24, this.n34);
    return this.position
  }, getColumnX: function () {
    if (!this.columnX)this.columnX = new THREE.Vector3;
    this.columnX.set(this.n11, this.n21, this.n31);
    return this.columnX
  }, getColumnY: function () {
    if (!this.columnY)this.columnY =
      new THREE.Vector3;
    this.columnY.set(this.n12, this.n22, this.n32);
    return this.columnY
  }, getColumnZ: function () {
    if (!this.columnZ)this.columnZ = new THREE.Vector3;
    this.columnZ.set(this.n13, this.n23, this.n33);
    return this.columnZ
  }, setRotationFromEuler: function (b) {
    var d = b.x, e = b.y, g = b.z;
    b = Math.cos(d);
    d = Math.sin(d);
    var h = Math.cos(e);
    e = Math.sin(e);
    var p = Math.cos(g);
    g = Math.sin(g);
    var o = b * e, q = d * e;
    this.n11 = h * p;
    this.n12 = -h * g;
    this.n13 = e;
    this.n21 = q * p + b * g;
    this.n22 = -q * g + b * p;
    this.n23 = -d * h;
    this.n31 = -o * p + d * g;
    this.n32 = o * g +
      d * p;
    this.n33 = b * h;
    return this
  }, setRotationFromQuaternion: function (b) {
    var d = b.x, e = b.y, g = b.z, h = b.w, p = d + d, o = e + e, q = g + g;
    b = d * p;
    var r = d * o;
    d *= q;
    var v = e * o;
    e *= q;
    g *= q;
    p *= h;
    o *= h;
    h *= q;
    this.n11 = 1 - (v + g);
    this.n12 = r - h;
    this.n13 = d + o;
    this.n21 = r + h;
    this.n22 = 1 - (b + g);
    this.n23 = e - p;
    this.n31 = d - o;
    this.n32 = e + p;
    this.n33 = 1 - (b + v);
    return this
  }, scale: function (b) {
    var d = b.x, e = b.y;
    b = b.z;
    this.n11 *= d;
    this.n12 *= e;
    this.n13 *= b;
    this.n21 *= d;
    this.n22 *= e;
    this.n23 *= b;
    this.n31 *= d;
    this.n32 *= e;
    this.n33 *= b;
    this.n41 *= d;
    this.n42 *= e;
    this.n43 *= b;
    return this
  },
  extractPosition: function (b) {
    this.n14 = b.n14;
    this.n24 = b.n24;
    this.n34 = b.n34
  }, extractRotation: function (b, d) {
    var e = 1 / d.x, g = 1 / d.y, h = 1 / d.z;
    this.n11 = b.n11 * e;
    this.n21 = b.n21 * e;
    this.n31 = b.n31 * e;
    this.n12 = b.n12 * g;
    this.n22 = b.n22 * g;
    this.n32 = b.n32 * g;
    this.n13 = b.n13 * h;
    this.n23 = b.n23 * h;
    this.n33 = b.n33 * h
  }
};
THREE.Matrix4.makeInvert = function (b, d) {
  var e = b.n11, g = b.n12, h = b.n13, p = b.n14, o = b.n21, q = b.n22, r = b.n23, v = b.n24, E = b.n31, G = b.n32, H = b.n33, C = b.n34, F = b.n41, O = b.n42, P = b.n43, L = b.n44;
  d === undefined && (d = new THREE.Matrix4);
  d.n11 = r * C * O - v * H * O + v * G * P - q * C * P - r * G * L + q * H * L;
  d.n12 = p * H * O - h * C * O - p * G * P + g * C * P + h * G * L - g * H * L;
  d.n13 = h * v * O - p * r * O + p * q * P - g * v * P - h * q * L + g * r * L;
  d.n14 = p * r * G - h * v * G - p * q * H + g * v * H + h * q * C - g * r * C;
  d.n21 = v * H * F - r * C * F - v * E * P + o * C * P + r * E * L - o * H * L;
  d.n22 = h * C * F - p * H * F + p * E * P - e * C * P - h * E * L + e * H * L;
  d.n23 = p * r * F - h * v * F - p * o * P + e * v * P + h * o * L - e * r * L;
  d.n24 = h * v * E - p * r * E + p * o * H - e * v * H - h * o * C + e * r * C;
  d.n31 = q * C * F - v * G * F + v * E * O - o * C * O - q * E * L + o * G * L;
  d.n32 = p * G * F - g * C * F - p * E * O + e * C * O + g * E * L - e * G * L;
  d.n33 = h * v * F - p * q * F + p * o * O - e * v * O - g * o * L + e * q * L;
  d.n34 = p * q * E - g * v * E - p * o * G + e * v * G + g * o * C - e * q * C;
  d.n41 = r * G * F - q * H * F - r * E * O + o * H * O + q * E * P - o * G * P;
  d.n42 = g * H * F - h * G * F + h * E * O - e * H * O - g * E * P + e * G * P;
  d.n43 = h * q * F - g * r * F - h * o * O + e * r * O + g * o * P - e * q * P;
  d.n44 = g * r * E - h * q * E + h * o * G - e * r * G - g * o * H + e * q * H;
  d.multiplyScalar(1 / b.determinant());
  return d
};
THREE.Matrix4.makeInvert3x3 = function (b) {
  var d = b.m33, e = d.m, g = b.n33 * b.n22 - b.n32 * b.n23, h = -b.n33 * b.n21 + b.n31 * b.n23, p = b.n32 * b.n21 - b.n31 * b.n22, o = -b.n33 * b.n12 + b.n32 * b.n13, q = b.n33 * b.n11 - b.n31 * b.n13, r = -b.n32 * b.n11 + b.n31 * b.n12, v = b.n23 * b.n12 - b.n22 * b.n13, E = -b.n23 * b.n11 + b.n21 * b.n13, G = b.n22 * b.n11 - b.n21 * b.n12;
  b = b.n11 * g + b.n21 * o + b.n31 * v;
  if (b == 0)throw"matrix not invertible";
  b = 1 / b;
  e[0] = b * g;
  e[1] = b * h;
  e[2] = b * p;
  e[3] = b * o;
  e[4] = b * q;
  e[5] = b * r;
  e[6] = b * v;
  e[7] = b * E;
  e[8] = b * G;
  return d
};
THREE.Matrix4.makeFrustum = function (b, d, e, g, h, p) {
  var o;
  o = new THREE.Matrix4;
  o.n11 = 2 * h / (d - b);
  o.n12 = 0;
  o.n13 = (d + b) / (d - b);
  o.n14 = 0;
  o.n21 = 0;
  o.n22 = 2 * h / (g - e);
  o.n23 = (g + e) / (g - e);
  o.n24 = 0;
  o.n31 = 0;
  o.n32 = 0;
  o.n33 = -(p + h) / (p - h);
  o.n34 = -2 * p * h / (p - h);
  o.n41 = 0;
  o.n42 = 0;
  o.n43 = -1;
  o.n44 = 0;
  return o
};
THREE.Matrix4.makePerspective = function (b, d, e, g) {
  var h;
  b = e * Math.tan(b * Math.PI / 360);
  h = -b;
  return THREE.Matrix4.makeFrustum(h * d, b * d, h, b, e, g)
};
THREE.Matrix4.makeOrtho = function (b, d, e, g, h, p) {
  var o, q, r, v;
  o = new THREE.Matrix4;
  q = d - b;
  r = e - g;
  v = p - h;
  o.n11 = 2 / q;
  o.n12 = 0;
  o.n13 = 0;
  o.n14 = -((d + b) / q);
  o.n21 = 0;
  o.n22 = 2 / r;
  o.n23 = 0;
  o.n24 = -((e + g) / r);
  o.n31 = 0;
  o.n32 = 0;
  o.n33 = -2 / v;
  o.n34 = -((p + h) / v);
  o.n41 = 0;
  o.n42 = 0;
  o.n43 = 0;
  o.n44 = 1;
  return o
};
THREE.Matrix4.__v1 = new THREE.Vector3;
THREE.Matrix4.__v2 = new THREE.Vector3;
THREE.Matrix4.__v3 = new THREE.Vector3;
THREE.Object3D = function () {
  this.parent = undefined;
  this.children = [];
  this.up = new THREE.Vector3(0, 1, 0);
  this.position = new THREE.Vector3;
  this.rotation = new THREE.Vector3;
  this.scale = new THREE.Vector3(1, 1, 1);
  this.dynamic = !1;
  this.rotationAutoUpdate = !0;
  this.matrix = new THREE.Matrix4;
  this.matrixWorld = new THREE.Matrix4;
  this.matrixRotationWorld = new THREE.Matrix4;
  this.matrixAutoUpdate = !0;
  this.matrixWorldNeedsUpdate = !0;
  this.quaternion = new THREE.Quaternion;
  this.useQuaternion = !1;
  this.boundRadius = 0;
  this.boundRadiusScale =
    1;
  this.visible = !0;
  this._vector = new THREE.Vector3;
  this.name = ""
};
THREE.Object3D.prototype = {
  translate: function (b, d) {
    this.matrix.rotateAxis(d);
    this.position.addSelf(d.multiplyScalar(b))
  }, translateX: function (b) {
    this.translate(b, this._vector.set(1, 0, 0))
  }, translateY: function (b) {
    this.translate(b, this._vector.set(0, 1, 0))
  }, translateZ: function (b) {
    this.translate(b, this._vector.set(0, 0, 1))
  }, lookAt: function (b) {
    this.matrix.lookAt(b, this.position, this.up);
    this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix)
  }, addChild: function (b) {
    if (this.children.indexOf(b) === -1) {
      b.parent !== undefined && b.parent.removeChild(b);
      b.parent = this;
      this.children.push(b);
      for (var d = this; d.parent !== undefined;)d = d.parent;
      d !== undefined && d instanceof THREE.Scene && d.addChildRecurse(b)
    }
  }, removeChild: function (b) {
    var d = this.children.indexOf(b);
    if (d !== -1) {
      b.parent = undefined;
      this.children.splice(d, 1)
    }
  }, getChildByName: function (b, d) {
    var e, g, h;
    e = 0;
    for (g = this.children.length; e < g; e++) {
      h = this.children[e];
      if (h.name === b)return h;
      if (d) {
        h = h.getChildByName(b, d);
        if (h !== undefined)return h
      }
    }
  }, updateMatrix: function () {
    this.matrix.setPosition(this.position);
    this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation);
    if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) {
      this.matrix.scale(this.scale);
      this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z))
    }
    this.matrixWorldNeedsUpdate = !0
  }, update: function (b, d, e) {
    this.matrixAutoUpdate && this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || d) {
      b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
      this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale);
      this.matrixWorldNeedsUpdate = !1;
      d = !0
    }
    b = 0;
    for (var g = this.children.length; b < g; b++)this.children[b].update(this.matrixWorld, d, e)
  }
};
THREE.Quaternion = function (b, d, e, g) {
  this.set(b || 0, d || 0, e || 0, g !== undefined ? g : 1)
};
THREE.Quaternion.prototype = {
  set: function (b, d, e, g) {
    this.x = b;
    this.y = d;
    this.z = e;
    this.w = g;
    return this
  }, copy: function (b) {
    this.x = b.x;
    this.y = b.y;
    this.z = b.z;
    this.w = b.w;
    return this
  }, setFromEuler: function (b) {
    var d = 0.5 * Math.PI / 360, e = b.x * d, g = b.y * d, h = b.z * d;
    b = Math.cos(g);
    g = Math.sin(g);
    d = Math.cos(-h);
    h = Math.sin(-h);
    var p = Math.cos(e);
    e = Math.sin(e);
    var o = b * d, q = g * h;
    this.w = o * p - q * e;
    this.x = o * e + q * p;
    this.y = g * d * p + b * h * e;
    this.z = b * h * p - g * d * e;
    return this
  }, setFromAxisAngle: function (b, d) {
    var e = d / 2, g = Math.sin(e);
    this.x = b.x * g;
    this.y =
      b.y * g;
    this.z = b.z * g;
    this.w = Math.cos(e);
    return this
  }, calculateW: function () {
    this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z));
    return this
  }, inverse: function () {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    return this
  }, length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
  }, normalize: function () {
    var b = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    if (b == 0)this.w = this.z = this.y = this.x = 0; else {
      b = 1 / b;
      this.x *= b;
      this.y *= b;
      this.z *= b;
      this.w *= b
    }
    return this
  },
  multiplySelf: function (b) {
    var d = this.x, e = this.y, g = this.z, h = this.w, p = b.x, o = b.y, q = b.z;
    b = b.w;
    this.x = d * b + h * p + e * q - g * o;
    this.y = e * b + h * o + g * p - d * q;
    this.z = g * b + h * q + d * o - e * p;
    this.w = h * b - d * p - e * o - g * q;
    return this
  }, multiply: function (b, d) {
    this.x = b.x * d.w + b.y * d.z - b.z * d.y + b.w * d.x;
    this.y = -b.x * d.z + b.y * d.w + b.z * d.x + b.w * d.y;
    this.z = b.x * d.y - b.y * d.x + b.z * d.w + b.w * d.z;
    this.w = -b.x * d.x - b.y * d.y - b.z * d.z + b.w * d.w;
    return this
  }, multiplyVector3: function (b, d) {
    d || (d = b);
    var e = b.x, g = b.y, h = b.z, p = this.x, o = this.y, q = this.z, r = this.w, v = r * e + o * h - q * g, E =
      r * g + q * e - p * h, G = r * h + p * g - o * e;
    e = -p * e - o * g - q * h;
    d.x = v * r + e * -p + E * -q - G * -o;
    d.y = E * r + e * -o + G * -p - v * -q;
    d.z = G * r + e * -q + v * -o - E * -p;
    return d
  }
};
THREE.Quaternion.slerp = function (b, d, e, g) {
  var h = b.w * d.w + b.x * d.x + b.y * d.y + b.z * d.z;
  if (Math.abs(h) >= 1) {
    e.w = b.w;
    e.x = b.x;
    e.y = b.y;
    e.z = b.z;
    return e
  }
  var p = Math.acos(h), o = Math.sqrt(1 - h * h);
  if (Math.abs(o) < 0.001) {
    e.w = 0.5 * (b.w + d.w);
    e.x = 0.5 * (b.x + d.x);
    e.y = 0.5 * (b.y + d.y);
    e.z = 0.5 * (b.z + d.z);
    return e
  }
  h = Math.sin((1 - g) * p) / o;
  g = Math.sin(g * p) / o;
  e.w = b.w * h + d.w * g;
  e.x = b.x * h + d.x * g;
  e.y = b.y * h + d.y * g;
  e.z = b.z * h + d.z * g;
  return e
};
THREE.Vertex = function (b) {
  this.position = b || new THREE.Vector3
};
THREE.Face3 = function (b, d, e, g, h, p) {
  this.a = b;
  this.b = d;
  this.c = e;
  this.normal = g instanceof THREE.Vector3 ? g : new THREE.Vector3;
  this.vertexNormals = g instanceof Array ? g : [];
  this.color = h instanceof THREE.Color ? h : new THREE.Color;
  this.vertexColors = h instanceof Array ? h : [];
  this.vertexTangents = [];
  this.materials = p instanceof Array ? p : [p];
  this.centroid = new THREE.Vector3
};
THREE.Face4 = function (b, d, e, g, h, p, o) {
  this.a = b;
  this.b = d;
  this.c = e;
  this.d = g;
  this.normal = h instanceof THREE.Vector3 ? h : new THREE.Vector3;
  this.vertexNormals = h instanceof Array ? h : [];
  this.color = p instanceof THREE.Color ? p : new THREE.Color;
  this.vertexColors = p instanceof Array ? p : [];
  this.vertexTangents = [];
  this.materials = o instanceof Array ? o : [o];
  this.centroid = new THREE.Vector3
};
THREE.UV = function (b, d) {
  this.set(b || 0, d || 0)
};
THREE.UV.prototype = {
  set: function (b, d) {
    this.u = b;
    this.v = d;
    return this
  }, copy: function (b) {
    this.set(b.u, b.v);
    return this
  }
};
THREE.Geometry = function () {
  this.id = "Geometry" + THREE.GeometryIdCounter++;
  this.vertices = [];
  this.colors = [];
  this.faces = [];
  this.edges = [];
  this.faceUvs = [[]];
  this.faceVertexUvs = [[]];
  this.morphTargets = [];
  this.morphColors = [];
  this.skinWeights = [];
  this.skinIndices = [];
  this.boundingSphere = this.boundingBox = null;
  this.hasTangents = !1
};
THREE.Geometry.prototype = {
  computeCentroids: function () {
    var b, d, e;
    b = 0;
    for (d = this.faces.length; b < d; b++) {
      e = this.faces[b];
      e.centroid.set(0, 0, 0);
      if (e instanceof THREE.Face3) {
        e.centroid.addSelf(this.vertices[e.a].position);
        e.centroid.addSelf(this.vertices[e.b].position);
        e.centroid.addSelf(this.vertices[e.c].position);
        e.centroid.divideScalar(3)
      } else if (e instanceof THREE.Face4) {
        e.centroid.addSelf(this.vertices[e.a].position);
        e.centroid.addSelf(this.vertices[e.b].position);
        e.centroid.addSelf(this.vertices[e.c].position);
        e.centroid.addSelf(this.vertices[e.d].position);
        e.centroid.divideScalar(4)
      }
    }
  }, computeFaceNormals: function (b) {
    var d, e, g, h, p, o, q = new THREE.Vector3, r = new THREE.Vector3;
    g = 0;
    for (h = this.faces.length; g < h; g++) {
      p = this.faces[g];
      if (b && p.vertexNormals.length) {
        q.set(0, 0, 0);
        d = 0;
        for (e = p.vertexNormals.length; d < e; d++)q.addSelf(p.vertexNormals[d]);
        q.divideScalar(3)
      } else {
        d = this.vertices[p.a];
        e = this.vertices[p.b];
        o = this.vertices[p.c];
        q.sub(o.position, e.position);
        r.sub(d.position, e.position);
        q.crossSelf(r)
      }
      q.isZero() ||
      q.normalize();
      p.normal.copy(q)
    }
  }, computeVertexNormals: function () {
    var b, d, e, g;
    if (this.__tmpVertices == undefined) {
      g = this.__tmpVertices = Array(this.vertices.length);
      b = 0;
      for (d = this.vertices.length; b < d; b++)g[b] = new THREE.Vector3;
      b = 0;
      for (d = this.faces.length; b < d; b++) {
        e = this.faces[b];
        if (e instanceof THREE.Face3)e.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]; else if (e instanceof THREE.Face4)e.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
      }
    } else {
      g =
        this.__tmpVertices;
      b = 0;
      for (d = this.vertices.length; b < d; b++)g[b].set(0, 0, 0)
    }
    b = 0;
    for (d = this.faces.length; b < d; b++) {
      e = this.faces[b];
      if (e instanceof THREE.Face3) {
        g[e.a].addSelf(e.normal);
        g[e.b].addSelf(e.normal);
        g[e.c].addSelf(e.normal)
      } else if (e instanceof THREE.Face4) {
        g[e.a].addSelf(e.normal);
        g[e.b].addSelf(e.normal);
        g[e.c].addSelf(e.normal);
        g[e.d].addSelf(e.normal)
      }
    }
    b = 0;
    for (d = this.vertices.length; b < d; b++)g[b].normalize();
    b = 0;
    for (d = this.faces.length; b < d; b++) {
      e = this.faces[b];
      if (e instanceof THREE.Face3) {
        e.vertexNormals[0].copy(g[e.a]);
        e.vertexNormals[1].copy(g[e.b]);
        e.vertexNormals[2].copy(g[e.c])
      } else if (e instanceof THREE.Face4) {
        e.vertexNormals[0].copy(g[e.a]);
        e.vertexNormals[1].copy(g[e.b]);
        e.vertexNormals[2].copy(g[e.c]);
        e.vertexNormals[3].copy(g[e.d])
      }
    }
  }, computeTangents: function () {
    function b($, qa, ra, ja, aa, va, sa) {
      q = $.vertices[qa].position;
      r = $.vertices[ra].position;
      v = $.vertices[ja].position;
      E = o[aa];
      G = o[va];
      H = o[sa];
      C = r.x - q.x;
      F = v.x - q.x;
      O = r.y - q.y;
      P = v.y - q.y;
      L = r.z - q.z;
      ea = v.z - q.z;
      W = G.u - E.u;
      Z = H.u - E.u;
      X = G.v - E.v;
      M = H.v - E.v;
      Ia = 1 / (W * M -
        Z * X);
      T.set((M * C - X * F) * Ia, (M * O - X * P) * Ia, (M * L - X * ea) * Ia);
      c.set((W * F - Z * C) * Ia, (W * P - Z * O) * Ia, (W * ea - Z * L) * Ia);
      Fa[qa].addSelf(T);
      Fa[ra].addSelf(T);
      Fa[ja].addSelf(T);
      ha[qa].addSelf(c);
      ha[ra].addSelf(c);
      ha[ja].addSelf(c)
    }

    var d, e, g, h, p, o, q, r, v, E, G, H, C, F, O, P, L, ea, W, Z, X, M, Ia, fa, Fa = [], ha = [], T = new THREE.Vector3, c = new THREE.Vector3, ia = new THREE.Vector3, xa = new THREE.Vector3, ta = new THREE.Vector3;
    d = 0;
    for (e = this.vertices.length; d < e; d++) {
      Fa[d] = new THREE.Vector3;
      ha[d] = new THREE.Vector3
    }
    d = 0;
    for (e = this.faces.length; d < e; d++) {
      p =
        this.faces[d];
      o = this.faceVertexUvs[0][d];
      if (p instanceof THREE.Face3)b(this, p.a, p.b, p.c, 0, 1, 2); else if (p instanceof THREE.Face4) {
        b(this, p.a, p.b, p.c, 0, 1, 2);
        b(this, p.a, p.b, p.d, 0, 1, 3)
      }
    }
    var ya = ["a", "b", "c", "d"];
    d = 0;
    for (e = this.faces.length; d < e; d++) {
      p = this.faces[d];
      for (g = 0; g < p.vertexNormals.length; g++) {
        ta.copy(p.vertexNormals[g]);
        h = p[ya[g]];
        fa = Fa[h];
        ia.copy(fa);
        ia.subSelf(ta.multiplyScalar(ta.dot(fa))).normalize();
        xa.cross(p.vertexNormals[g], fa);
        h = xa.dot(ha[h]);
        h = h < 0 ? -1 : 1;
        p.vertexTangents[g] = new THREE.Vector4(ia.x,
          ia.y, ia.z, h)
      }
    }
    this.hasTangents = !0
  }, computeBoundingBox: function () {
    var b;
    if (this.vertices.length > 0) {
      this.boundingBox = {
        x: [this.vertices[0].position.x, this.vertices[0].position.x],
        y: [this.vertices[0].position.y, this.vertices[0].position.y],
        z: [this.vertices[0].position.z, this.vertices[0].position.z]
      };
      for (var d = 1, e = this.vertices.length; d < e; d++) {
        b = this.vertices[d];
        if (b.position.x < this.boundingBox.x[0])this.boundingBox.x[0] = b.position.x; else if (b.position.x > this.boundingBox.x[1])this.boundingBox.x[1] = b.position.x;
        if (b.position.y < this.boundingBox.y[0])this.boundingBox.y[0] = b.position.y; else if (b.position.y > this.boundingBox.y[1])this.boundingBox.y[1] = b.position.y;
        if (b.position.z < this.boundingBox.z[0])this.boundingBox.z[0] = b.position.z; else if (b.position.z > this.boundingBox.z[1])this.boundingBox.z[1] = b.position.z
      }
    }
  }, computeBoundingSphere: function () {
    for (var b = this.boundingSphere === null ? 0 : this.boundingSphere.radius, d = 0, e = this.vertices.length; d < e; d++)b = Math.max(b, this.vertices[d].position.length());
    this.boundingSphere =
    {radius: b}
  }, computeEdgeFaces: function () {
    function b(r, v) {
      return Math.min(r, v) + "_" + Math.max(r, v)
    }

    function d(r, v, E) {
      if (r[v] === undefined) {
        r[v] = {set: {}, array: []};
        r[v].set[E] = 1;
        r[v].array.push(E)
      } else if (r[v].set[E] === undefined) {
        r[v].set[E] = 1;
        r[v].array.push(E)
      }
    }

    var e, g, h, p, o, q = {};
    e = 0;
    for (g = this.faces.length; e < g; e++) {
      o = this.faces[e];
      if (o instanceof THREE.Face3) {
        h = b(o.a, o.b);
        d(q, h, e);
        h = b(o.b, o.c);
        d(q, h, e);
        h = b(o.a, o.c);
        d(q, h, e)
      } else if (o instanceof THREE.Face4) {
        h = b(o.b, o.d);
        d(q, h, e);
        h = b(o.a, o.b);
        d(q, h, e);
        h = b(o.a, o.d);
        d(q, h, e);
        h = b(o.b, o.c);
        d(q, h, e);
        h = b(o.c, o.d);
        d(q, h, e)
      }
    }
    e = 0;
    for (g = this.edges.length; e < g; e++) {
      o = this.edges[e];
      h = o.vertexIndices[0];
      p = o.vertexIndices[1];
      o.faceIndices = q[b(h, p)].array;
      for (h = 0; h < o.faceIndices.length; h++) {
        p = o.faceIndices[h];
        o.faces.push(this.faces[p])
      }
    }
  }
};
THREE.GeometryIdCounter = 0;
THREE.Spline = function (b) {
  function d(C, F, O, P, L, ea, W) {
    C = (O - C) * 0.5;
    P = (P - F) * 0.5;
    return (2 * (F - O) + C + P) * W + (-3 * (F - O) - 2 * C - P) * ea + C * L + F
  }

  this.points = b;
  var e = [], g = {x: 0, y: 0, z: 0}, h, p, o, q, r, v, E, G, H;
  this.initFromArray = function (C) {
    this.points = [];
    for (var F = 0; F < C.length; F++)this.points[F] = {x: C[F][0], y: C[F][1], z: C[F][2]}
  };
  this.getPoint = function (C) {
    h = (this.points.length - 1) * C;
    p = Math.floor(h);
    o = h - p;
    e[0] = p == 0 ? p : p - 1;
    e[1] = p;
    e[2] = p > this.points.length - 2 ? p : p + 1;
    e[3] = p > this.points.length - 3 ? p : p + 2;
    v = this.points[e[0]];
    E = this.points[e[1]];
    G = this.points[e[2]];
    H = this.points[e[3]];
    q = o * o;
    r = o * q;
    g.x = d(v.x, E.x, G.x, H.x, o, q, r);
    g.y = d(v.y, E.y, G.y, H.y, o, q, r);
    g.z = d(v.z, E.z, G.z, H.z, o, q, r);
    return g
  };
  this.getControlPointsArray = function () {
    var C, F, O = this.points.length, P = [];
    for (C = 0; C < O; C++) {
      F = this.points[C];
      P[C] = [F.x, F.y, F.z]
    }
    return P
  };
  this.getLength = function (C) {
    var F, O, P = F = F = 0, L = new THREE.Vector3, ea = new THREE.Vector3, W = [], Z = 0;
    W[0] = 0;
    C || (C = 100);
    O = this.points.length * C;
    L.copy(this.points[0]);
    for (C = 1; C < O; C++) {
      F = C / O;
      position = this.getPoint(F);
      ea.copy(position);
      Z += ea.distanceTo(L);
      L.copy(position);
      F *= this.points.length - 1;
      F = Math.floor(F);
      if (F != P) {
        W[F] = Z;
        P = F
      }
    }
    W[W.length] = Z;
    return {chunks: W, total: Z}
  };
  this.reparametrizeByArcLength = function (C) {
    var F, O, P, L, ea, W, Z = [], X = new THREE.Vector3, M = this.getLength();
    Z.push(X.copy(this.points[0]).clone());
    for (F = 1; F < this.points.length; F++) {
      O = M.chunks[F] - M.chunks[F - 1];
      W = Math.ceil(C * O / M.total);
      L = (F - 1) / (this.points.length - 1);
      ea = F / (this.points.length - 1);
      for (O = 1; O < W - 1; O++) {
        P = L + O * (1 / W) * (ea - L);
        position = this.getPoint(P);
        Z.push(X.copy(position).clone())
      }
      Z.push(X.copy(this.points[F]).clone())
    }
    this.points =
      Z
  }
};
THREE.Edge = function (b, d, e, g) {
  this.vertices = [b, d];
  this.vertexIndices = [e, g];
  this.faces = [];
  this.faceIndices = []
};
THREE.Camera = function (b, d, e, g, h) {
  THREE.Object3D.call(this);
  this.fov = b || 50;
  this.aspect = d || 1;
  this.near = e || 0.1;
  this.far = g || 2E3;
  this.target = h || new THREE.Object3D;
  this.useTarget = !0;
  this.matrixWorldInverse = new THREE.Matrix4;
  this.projectionMatrix = null;
  this.updateProjectionMatrix()
};
THREE.Camera.prototype = new THREE.Object3D;
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.supr = THREE.Object3D.prototype;
THREE.Camera.prototype.translate = function (b, d) {
  this.matrix.rotateAxis(d);
  this.position.addSelf(d.multiplyScalar(b));
  this.target.position.addSelf(d.multiplyScalar(b))
};
THREE.Camera.prototype.updateProjectionMatrix = function () {
  this.projectionMatrix = THREE.Matrix4.makePerspective(this.fov, this.aspect, this.near, this.far)
};
THREE.Camera.prototype.update = function (b, d, e) {
  if (this.useTarget) {
    this.matrix.lookAt(this.position, this.target.position, this.up);
    this.matrix.setPosition(this.position);
    b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
    THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
    d = !0
  } else {
    this.matrixAutoUpdate && this.updateMatrix();
    if (d || this.matrixWorldNeedsUpdate) {
      b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
      this.matrixWorldNeedsUpdate = !1;
      d = !0;
      THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse)
    }
  }
  for (b = 0; b < this.children.length; b++)this.children[b].update(this.matrixWorld, d, e)
};
THREE.Light = function (b) {
  THREE.Object3D.call(this);
  this.color = new THREE.Color(b)
};
THREE.Light.prototype = new THREE.Object3D;
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
THREE.AmbientLight = function (b) {
  THREE.Light.call(this, b)
};
THREE.AmbientLight.prototype = new THREE.Light;
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function (b, d, e, g) {
  THREE.Light.call(this, b);
  this.position = new THREE.Vector3(0, 1, 0);
  this.intensity = d || 1;
  this.distance = e || 0;
  this.castShadow = g !== undefined ? g : !1
};
THREE.DirectionalLight.prototype = new THREE.Light;
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.PointLight = function (b, d, e) {
  THREE.Light.call(this, b);
  this.position = new THREE.Vector3;
  this.intensity = d || 1;
  this.distance = e || 0
};
THREE.PointLight.prototype = new THREE.Light;
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.LensFlare = function (b, d, e, g) {
  THREE.Object3D.call(this);
  this.positionScreen = new THREE.Vector3;
  this.lensFlares = [];
  this.customUpdateCallback = undefined;
  b !== undefined && this.add(b, d, e, g)
};
THREE.LensFlare.prototype = new THREE.Object3D;
THREE.LensFlare.prototype.constructor = THREE.LensFlare;
THREE.LensFlare.prototype.supr = THREE.Object3D.prototype;
THREE.LensFlare.prototype.add = function (b, d, e, g) {
  d === undefined && (d = -1);
  e === undefined && (e = 0);
  if (g === undefined)g = THREE.BillboardBlending;
  e = Math.min(e, Math.max(0, e));
  this.lensFlares.push({texture: b, size: d, distance: e, x: 0, y: 0, z: 0, scale: 1, rotation: 1, opacity: 1, blending: g})
};
THREE.LensFlare.prototype.updateLensFlares = function () {
  var b, d = this.lensFlares.length, e, g = -this.positionScreen.x * 2, h = -this.positionScreen.y * 2;
  for (b = 0; b < d; b++) {
    e = this.lensFlares[b];
    e.x = this.positionScreen.x + g * e.distance;
    e.y = this.positionScreen.y + h * e.distance;
    e.wantedRotation = e.x * Math.PI * 0.25;
    e.rotation += (e.wantedRotation - e.rotation) * 0.25
  }
};
THREE.Material = function (b) {
  this.id = THREE.MaterialCounter.value++;
  b = b || {};
  this.opacity = b.opacity !== undefined ? b.opacity : 1;
  this.transparent = b.transparent !== undefined ? b.transparent : !1;
  this.blending = b.blending !== undefined ? b.blending : THREE.NormalBlending;
  this.depthTest = b.depthTest !== undefined ? b.depthTest : !0
};
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NormalBlending = 0;
THREE.AdditiveBlending = 1;
THREE.SubtractiveBlending = 2;
THREE.MultiplyBlending = 3;
THREE.AdditiveAlphaBlending = 4;
THREE.MaterialCounter = {value: 0};
THREE.CubeReflectionMapping = function () {
};
THREE.CubeRefractionMapping = function () {
};
THREE.LatitudeReflectionMapping = function () {
};
THREE.LatitudeRefractionMapping = function () {
};
THREE.SphericalReflectionMapping = function () {
};
THREE.SphericalRefractionMapping = function () {
};
THREE.UVMapping = function () {
};
THREE.LineBasicMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.linewidth = b.linewidth !== undefined ? b.linewidth : 1;
  this.linecap = b.linecap !== undefined ? b.linecap : "round";
  this.linejoin = b.linejoin !== undefined ? b.linejoin : "round";
  this.vertexColors = b.vertexColors ? b.vertexColors : !1
};
THREE.LineBasicMaterial.prototype = new THREE.Material;
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.MeshBasicMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.map = b.map !== undefined ? b.map : null;
  this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
  this.envMap = b.envMap !== undefined ? b.envMap : null;
  this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
  this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
  this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio : 0.98;
  this.shading =
    b.shading !== undefined ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
  this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
  this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : "round";
  this.wireframeLinejoin = b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : "round";
  this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
  this.skinning = b.skinning !== undefined ? b.skinning : !1;
  this.morphTargets = b.morphTargets !== undefined ?
    b.morphTargets : !1
};
THREE.MeshBasicMaterial.prototype = new THREE.Material;
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.map = b.map !== undefined ? b.map : null;
  this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
  this.envMap = b.envMap !== undefined ? b.envMap : null;
  this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
  this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
  this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio : 0.98;
  this.shading =
    b.shading !== undefined ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
  this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
  this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : "round";
  this.wireframeLinejoin = b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : "round";
  this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
  this.skinning = b.skinning !== undefined ? b.skinning : !1;
  this.morphTargets = b.morphTargets !== undefined ?
    b.morphTargets : !1
};
THREE.MeshLambertMaterial.prototype = new THREE.Material;
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.ambient = b.ambient !== undefined ? new THREE.Color(b.ambient) : new THREE.Color(328965);
  this.specular = b.specular !== undefined ? new THREE.Color(b.specular) : new THREE.Color(1118481);
  this.shininess = b.shininess !== undefined ? b.shininess : 30;
  this.map = b.map !== undefined ? b.map : null;
  this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
  this.envMap = b.envMap !== undefined ?
    b.envMap : null;
  this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
  this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
  this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio : 0.98;
  this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
  this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
  this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : "round";
  this.wireframeLinejoin =
    b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : "round";
  this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
  this.skinning = b.skinning !== undefined ? b.skinning : !1;
  this.morphTargets = b.morphTargets !== undefined ? b.morphTargets : !1
};
THREE.MeshPhongMaterial.prototype = new THREE.Material;
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshDepthMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
  this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1
};
THREE.MeshDepthMaterial.prototype = new THREE.Material;
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.shading = b.shading ? b.shading : THREE.FlatShading;
  this.wireframe = b.wireframe ? b.wireframe : !1;
  this.wireframeLinewidth = b.wireframeLinewidth ? b.wireframeLinewidth : 1
};
THREE.MeshNormalMaterial.prototype = new THREE.Material;
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshFaceMaterial = function () {
};
THREE.MeshShaderMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.fragmentShader = b.fragmentShader !== undefined ? b.fragmentShader : "void main() {}";
  this.vertexShader = b.vertexShader !== undefined ? b.vertexShader : "void main() {}";
  this.uniforms = b.uniforms !== undefined ? b.uniforms : {};
  this.attributes = b.attributes;
  this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
  this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth :
    1;
  this.fog = b.fog !== undefined ? b.fog : !1;
  this.lights = b.lights !== undefined ? b.lights : !1;
  this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
  this.skinning = b.skinning !== undefined ? b.skinning : !1;
  this.morphTargets = b.morphTargets !== undefined ? b.morphTargets : !1
};
THREE.MeshShaderMaterial.prototype = new THREE.Material;
THREE.MeshShaderMaterial.prototype.constructor = THREE.MeshShaderMaterial;
THREE.ParticleBasicMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.map = b.map !== undefined ? b.map : null;
  this.size = b.size !== undefined ? b.size : 1;
  this.sizeAttenuation = b.sizeAttenuation !== undefined ? b.sizeAttenuation : !0;
  this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1
};
THREE.ParticleBasicMaterial.prototype = new THREE.Material;
THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial;
THREE.ShadowVolumeDynamicMaterial = function (b) {
  THREE.Material.call(this, b);
  b = b || {};
  this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
  this.map = b.map !== undefined ? b.map : null;
  this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
  this.envMap = b.envMap !== undefined ? b.envMap : null;
  this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
  this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
  this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio :
    0.98;
  this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
  this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
  this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
  this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : "round";
  this.wireframeLinejoin = b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : "round";
  this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
  this.skinning = b.skinning !== undefined ? b.skinning : !1;
  this.morphTargets = b.morphTargets !==
  undefined ? b.morphTargets : !1
};
THREE.ShadowVolumeDynamicMaterial.prototype = new THREE.Material;
THREE.ShadowVolumeDynamicMaterial.prototype.constructor = THREE.ShadowVolumeDynamicMaterial;
THREE.Texture = function (b, d, e, g, h, p) {
  this.image = b;
  this.mapping = d !== undefined ? d : new THREE.UVMapping;
  this.wrapS = e !== undefined ? e : THREE.ClampToEdgeWrapping;
  this.wrapT = g !== undefined ? g : THREE.ClampToEdgeWrapping;
  this.magFilter = h !== undefined ? h : THREE.LinearFilter;
  this.minFilter = p !== undefined ? p : THREE.LinearMipMapLinearFilter;
  this.needsUpdate = !1
};
THREE.Texture.prototype = {
  clone: function () {
    return new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter)
  }
};
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.RepeatWrapping = 0;
THREE.ClampToEdgeWrapping = 1;
THREE.MirroredRepeatWrapping = 2;
THREE.NearestFilter = 3;
THREE.NearestMipMapNearestFilter = 4;
THREE.NearestMipMapLinearFilter = 5;
THREE.LinearFilter = 6;
THREE.LinearMipMapNearestFilter = 7;
THREE.LinearMipMapLinearFilter = 8;
THREE.ByteType = 9;
THREE.UnsignedByteType = 10;
THREE.ShortType = 11;
THREE.UnsignedShortType = 12;
THREE.IntType = 13;
THREE.UnsignedIntType = 14;
THREE.FloatType = 15;
THREE.AlphaFormat = 16;
THREE.RGBFormat = 17;
THREE.RGBAFormat = 18;
THREE.LuminanceFormat = 19;
THREE.LuminanceAlphaFormat = 20;
THREE.ParticleSystem = function (b, d) {
  THREE.Object3D.call(this);
  this.geometry = b;
  this.materials = d instanceof Array ? d : [d];
  this.sortParticles = !1
};
THREE.ParticleSystem.prototype = new THREE.Object3D;
THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem;
THREE.Line = function (b, d, e) {
  THREE.Object3D.call(this);
  this.geometry = b;
  this.materials = d instanceof Array ? d : [d];
  this.type = e != undefined ? e : THREE.LineStrip
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = new THREE.Object3D;
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function (b, d) {
  THREE.Object3D.call(this);
  this.geometry = b;
  this.materials = d && d.length ? d : [d];
  this.flipSided = !1;
  this.doubleSided = !1;
  this.overdraw = !1;
  if (this.geometry) {
    this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
    this.boundRadius = b.boundingSphere.radius;
    if (this.geometry.morphTargets.length) {
      this.morphTargetBase = -1;
      this.morphTargetForcedOrder = [];
      this.morphTargetInfluences = [];
      this.morphTargetDictionary = {};
      for (var e = 0; e < this.geometry.morphTargets.length; e++) {
        this.morphTargetInfluences.push(0);
        this.morphTargetDictionary[this.geometry.morphTargets[e].name] = e
      }
    }
  }
};
THREE.Mesh.prototype = new THREE.Object3D;
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName = function (b) {
  if (this.morphTargetDictionary[b] !== undefined)return this.morphTargetDictionary[b];
  console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + b + " does not exist. Returning 0.");
  return 0
};
THREE.Bone = function (b) {
  THREE.Object3D.call(this);
  this.skin = b;
  this.skinMatrix = new THREE.Matrix4;
  this.hasNoneBoneChildren = !1
};
THREE.Bone.prototype = new THREE.Object3D;
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;
THREE.Bone.prototype.update = function (b, d, e) {
  this.matrixAutoUpdate && (d |= this.updateMatrix());
  if (d || this.matrixWorldNeedsUpdate) {
    b ? this.skinMatrix.multiply(b, this.matrix) : this.skinMatrix.copy(this.matrix);
    this.matrixWorldNeedsUpdate = !1;
    d = !0
  }
  var g, h = this.children.length;
  if (this.hasNoneBoneChildren) {
    this.matrixWorld.multiply(this.skin.matrixWorld, this.skinMatrix);
    for (g = 0; g < h; g++) {
      b = this.children[g];
      b instanceof THREE.Bone ? b.update(this.skinMatrix, d, e) : b.update(this.matrixWorld, !0, e)
    }
  } else for (g = 0; g < h; g++)this.children[g].update(this.skinMatrix,
    d, e)
};
THREE.Bone.prototype.addChild = function (b) {
  if (this.children.indexOf(b) === -1) {
    b.parent !== undefined && b.parent.removeChild(b);
    b.parent = this;
    this.children.push(b);
    if (!(b instanceof THREE.Bone))this.hasNoneBoneChildren = !0
  }
};
THREE.SkinnedMesh = function (b, d) {
  THREE.Mesh.call(this, b, d);
  this.identityMatrix = new THREE.Matrix4;
  this.bones = [];
  this.boneMatrices = [];
  var e, g, h, p, o, q;
  if (this.geometry.bones !== undefined) {
    for (e = 0; e < this.geometry.bones.length; e++) {
      h = this.geometry.bones[e];
      p = h.pos;
      o = h.rotq;
      q = h.scl;
      g = this.addBone();
      g.name = h.name;
      g.position.set(p[0], p[1], p[2]);
      g.quaternion.set(o[0], o[1], o[2], o[3]);
      g.useQuaternion = !0;
      q !== undefined ? g.scale.set(q[0], q[1], q[2]) : g.scale.set(1, 1, 1)
    }
    for (e = 0; e < this.bones.length; e++) {
      h = this.geometry.bones[e];
      g = this.bones[e];
      h.parent === -1 ? this.addChild(g) : this.bones[h.parent].addChild(g)
    }
    this.boneMatrices = new Float32Array(16 * this.bones.length);
    this.pose()
  }
};
THREE.SkinnedMesh.prototype = new THREE.Mesh;
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.update = function (b, d, e) {
  if (this.visible) {
    this.matrixAutoUpdate && (d |= this.updateMatrix());
    if (d || this.matrixWorldNeedsUpdate) {
      b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
      this.matrixWorldNeedsUpdate = !1;
      d = !0
    }
    var g, h = this.children.length;
    for (g = 0; g < h; g++) {
      b = this.children[g];
      b instanceof THREE.Bone ? b.update(this.identityMatrix, !1, e) : b.update(this.matrixWorld, d, e)
    }
    e = this.bones.length;
    ba = this.bones;
    bm = this.boneMatrices;
    for (d = 0; d < e; d++)ba[d].skinMatrix.flattenToArrayOffset(bm,
      d * 16)
  }
};
THREE.SkinnedMesh.prototype.addBone = function (b) {
  b === undefined && (b = new THREE.Bone(this));
  this.bones.push(b);
  return b
};
THREE.SkinnedMesh.prototype.pose = function () {
  this.update(undefined, !0);
  for (var b, d = [], e = 0; e < this.bones.length; e++) {
    b = this.bones[e];
    d.push(THREE.Matrix4.makeInvert(b.skinMatrix));
    b.skinMatrix.flattenToArrayOffset(this.boneMatrices, e * 16)
  }
  if (this.geometry.skinVerticesA === undefined) {
    this.geometry.skinVerticesA = [];
    this.geometry.skinVerticesB = [];
    var g;
    for (b = 0; b < this.geometry.skinIndices.length; b++) {
      e = this.geometry.vertices[b].position;
      var h = this.geometry.skinIndices[b].x, p = this.geometry.skinIndices[b].y;
      g = new THREE.Vector3(e.x, e.y, e.z);
      this.geometry.skinVerticesA.push(d[h].multiplyVector3(g));
      g = new THREE.Vector3(e.x, e.y, e.z);
      this.geometry.skinVerticesB.push(d[p].multiplyVector3(g));
      if (this.geometry.skinWeights[b].x + this.geometry.skinWeights[b].y !== 1) {
        e = (1 - (this.geometry.skinWeights[b].x + this.geometry.skinWeights[b].y)) * 0.5;
        this.geometry.skinWeights[b].x += e;
        this.geometry.skinWeights[b].y += e
      }
    }
  }
};
THREE.Ribbon = function (b, d) {
  THREE.Object3D.call(this);
  this.geometry = b;
  this.materials = d instanceof Array ? d : [d];
  this.flipSided = !1;
  this.doubleSided = !1
};
THREE.Ribbon.prototype = new THREE.Object3D;
THREE.Ribbon.prototype.constructor = THREE.Ribbon;
THREE.Sound = function (b, d, e, g) {
  THREE.Object3D.call(this);
  this.isLoaded = !1;
  this.isAddedToDOM = !1;
  this.isPlaying = !1;
  this.duration = -1;
  this.radius = d !== undefined ? Math.abs(d) : 100;
  this.volume = Math.min(1, Math.max(0, e !== undefined ? e : 1));
  this.domElement = document.createElement("audio");
  this.domElement.volume = 0;
  this.domElement.pan = 0;
  this.domElement.loop = g !== undefined ? g : !0;
  this.sources = b instanceof Array ? b : [b];
  var h;
  e = this.sources.length;
  for (b = 0; b < e; b++) {
    d = this.sources[b];
    d.toLowerCase();
    if (d.indexOf(".mp3") !== -1)h =
      "audio/mpeg"; else if (d.indexOf(".ogg") !== -1)h = "audio/ogg"; else d.indexOf(".wav") !== -1 && (h = "audio/wav");
    if (this.domElement.canPlayType(h)) {
      h = document.createElement("source");
      h.src = this.sources[b];
      this.domElement.THREESound = this;
      this.domElement.appendChild(h);
      this.domElement.addEventListener("canplay", this.onLoad, !0);
      this.domElement.load();
      break
    }
  }
};
THREE.Sound.prototype = new THREE.Object3D;
THREE.Sound.prototype.constructor = THREE.Sound;
THREE.Sound.prototype.supr = THREE.Object3D.prototype;
THREE.Sound.prototype.onLoad = function () {
  var b = this.THREESound;
  if (!b.isLoaded) {
    this.removeEventListener("canplay", this.onLoad, !0);
    b.isLoaded = !0;
    b.duration = this.duration;
    b.isPlaying && b.play()
  }
};
THREE.Sound.prototype.addToDOM = function (b) {
  this.isAddedToDOM = !0;
  b.appendChild(this.domElement)
};
THREE.Sound.prototype.play = function (b) {
  this.isPlaying = !0;
  if (this.isLoaded) {
    this.domElement.play();
    if (b)this.domElement.currentTime = b % this.duration
  }
};
THREE.Sound.prototype.pause = function () {
  this.isPlaying = !1;
  this.domElement.pause()
};
THREE.Sound.prototype.stop = function () {
  this.isPlaying = !1;
  this.domElement.pause();
  this.domElement.currentTime = 0
};
THREE.Sound.prototype.calculateVolumeAndPan = function (b) {
  b = b.length();
  this.domElement.volume = b <= this.radius ? this.volume * (1 - b / this.radius) : 0
};
THREE.Sound.prototype.update = function (b, d, e) {
  if (this.matrixAutoUpdate) {
    this.matrix.setPosition(this.position);
    d = !0
  }
  if (d || this.matrixWorldNeedsUpdate) {
    b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
    this.matrixWorldNeedsUpdate = !1;
    d = !0
  }
  var g = this.children.length;
  for (b = 0; b < g; b++)this.children[b].update(this.matrixWorld, d, e)
};
THREE.LOD = function () {
  THREE.Object3D.call(this);
  this.LODs = []
};
THREE.LOD.prototype = new THREE.Object3D;
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.supr = THREE.Object3D.prototype;
THREE.LOD.prototype.add = function (b, d) {
  d === undefined && (d = 0);
  d = Math.abs(d);
  for (var e = 0; e < this.LODs.length; e++)if (d < this.LODs[e].visibleAtDistance)break;
  this.LODs.splice(e, 0, {visibleAtDistance: d, object3D: b});
  this.addChild(b)
};
THREE.LOD.prototype.update = function (b, d, e) {
  this.matrixAutoUpdate && (d |= this.updateMatrix());
  if (d || this.matrixWorldNeedsUpdate) {
    b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
    this.matrixWorldNeedsUpdate = !1;
    d = !0
  }
  if (this.LODs.length > 1) {
    b = e.matrixWorldInverse;
    b = -(b.n31 * this.position.x + b.n32 * this.position.y + b.n33 * this.position.z + b.n34);
    this.LODs[0].object3D.visible = !0;
    for (var g = 1; g < this.LODs.length; g++)if (b >= this.LODs[g].visibleAtDistance) {
      this.LODs[g - 1].object3D.visible = !1;
      this.LODs[g].object3D.visible = !0
    } else break;
    for (; g < this.LODs.length; g++)this.LODs[g].object3D.visible = !1
  }
  for (b = 0; b < this.children.length; b++)this.children[b].update(this.matrixWorld, d, e)
};
THREE.ShadowVolume = function (b, d) {
  if (b instanceof THREE.Mesh) {
    THREE.Mesh.call(this, b.geometry, d ? [new THREE.ShadowVolumeDynamicMaterial] : [new THREE.ShadowVolumeDynamicMaterial]);
    b.addChild(this)
  } else THREE.Mesh.call(this, b, d ? [new THREE.ShadowVolumeDynamicMaterial] : [new THREE.ShadowVolumeDynamicMaterial]);
  this.calculateShadowVolumeGeometry()
};
THREE.ShadowVolume.prototype = new THREE.Mesh;
THREE.ShadowVolume.prototype.constructor = THREE.ShadowVolume;
THREE.ShadowVolume.prototype.supr = THREE.Mesh.prototype;
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometry = function () {
  if (this.geometry.edges && this.geometry.edges.length) {
    var b, d, e, g, h, p, o, q, r, v, E, G, H, C, F = new THREE.Geometry;
    F.vertices = this.geometry.vertices;
    g = F.faces = this.geometry.faces;
    var O = F.egdes = this.geometry.edges, P = F.edgeFaces = [];
    h = 0;
    var L = [];
    b = 0;
    for (d = g.length; b < d; b++) {
      e = g[b];
      L.push(h);
      h += e instanceof THREE.Face3 ? 3 : 4;
      e.vertexNormals[0] = e.normal;
      e.vertexNormals[1] = e.normal;
      e.vertexNormals[2] = e.normal;
      if (e instanceof THREE.Face4)e.vertexNormals[3] =
        e.normal
    }
    b = 0;
    for (d = O.length; b < d; b++) {
      q = O[b];
      e = q.faces[0];
      g = q.faces[1];
      h = q.faceIndices[0];
      p = q.faceIndices[1];
      o = q.vertexIndices[0];
      q = q.vertexIndices[1];
      if (e.a === o) {
        r = "a";
        E = L[h] + 0
      } else if (e.b === o) {
        r = "b";
        E = L[h] + 1
      } else if (e.c === o) {
        r = "c";
        E = L[h] + 2
      } else if (e.d === o) {
        r = "d";
        E = L[h] + 3
      }
      if (e.a === q) {
        r += "a";
        G = L[h] + 0
      } else if (e.b === q) {
        r += "b";
        G = L[h] + 1
      } else if (e.c === q) {
        r += "c";
        G = L[h] + 2
      } else if (e.d === q) {
        r += "d";
        G = L[h] + 3
      }
      if (g.a === o) {
        v = "a";
        H = L[p] + 0
      } else if (g.b === o) {
        v = "b";
        H = L[p] + 1
      } else if (g.c === o) {
        v = "c";
        H = L[p] + 2
      } else if (g.d ===
        o) {
        v = "d";
        H = L[p] + 3
      }
      if (g.a === q) {
        v += "a";
        C = L[p] + 0
      } else if (g.b === q) {
        v += "b";
        C = L[p] + 1
      } else if (g.c === q) {
        v += "c";
        C = L[p] + 2
      } else if (g.d === q) {
        v += "d";
        C = L[p] + 3
      }
      if (r === "ac" || r === "ad" || r === "ca" || r === "da") {
        if (E > G) {
          e = E;
          E = G;
          G = e
        }
      } else if (E < G) {
        e = E;
        E = G;
        G = e
      }
      if (v === "ac" || v === "ad" || v === "ca" || v === "da") {
        if (H > C) {
          e = H;
          H = C;
          C = e
        }
      } else if (H < C) {
        e = H;
        H = C;
        C = e
      }
      e = new THREE.Face4(E, G, H, C);
      e.normal.set(1, 0, 0);
      P.push(e)
    }
    this.geometry = F
  } else this.calculateShadowVolumeGeometryWithoutEdgeInfo(this.geometry)
};
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometryWithoutEdgeInfo = function (b) {
  this.geometry = new THREE.Geometry;
  this.geometry.boundingSphere = b.boundingSphere;
  this.geometry.edgeFaces = [];
  var d = this.geometry.vertices, e = this.geometry.faces, g = this.geometry.edgeFaces, h = b.faces;
  b = b.vertices;
  var p = h.length, o, q, r, v, E, G = ["a", "b", "c", "d"];
  for (r = 0; r < p; r++) {
    q = d.length;
    o = h[r];
    if (o instanceof THREE.Face4) {
      v = 4;
      q = new THREE.Face4(q, q + 1, q + 2, q + 3)
    } else {
      v = 3;
      q = new THREE.Face3(q, q + 1, q + 2)
    }
    q.normal.copy(o.normal);
    e.push(q);
    for (q = 0; q < v; q++) {
      E = b[o[G[q]]];
      d.push(new THREE.Vertex(E.position.clone()))
    }
  }
  for (p = 0; p < h.length - 1; p++) {
    b = e[p];
    for (o = p + 1; o < h.length; o++) {
      q = e[o];
      q = this.facesShareEdge(d, b, q);
      if (q !== undefined) {
        q = new THREE.Face4(q.indices[0], q.indices[3], q.indices[2], q.indices[1]);
        q.normal.set(1, 0, 0);
        g.push(q)
      }
    }
  }
};
THREE.ShadowVolume.prototype.facesShareEdge = function (b, d, e) {
  var g, h, p, o, q, r, v, E, G, H, C, F, O, P = 0, L = ["a", "b", "c", "d"];
  g = d instanceof THREE.Face4 ? 4 : 3;
  h = e instanceof THREE.Face4 ? 4 : 3;
  for (F = 0; F < g; F++) {
    p = d[L[F]];
    q = b[p];
    for (O = 0; O < h; O++) {
      o = e[L[O]];
      r = b[o];
      if (Math.abs(q.position.x - r.position.x) < 1.0E-4 && Math.abs(q.position.y - r.position.y) < 1.0E-4 && Math.abs(q.position.z - r.position.z) < 1.0E-4) {
        P++;
        if (P === 1) {
          v = q;
          E = r;
          G = p;
          H = o;
          C = L[F]
        }
        if (P === 2) {
          C += L[F];
          return C === "ad" || C === "ac" ? {
            faces: [d, e], vertices: [v, E, r, q], indices: [G,
              H, o, p], vertexTypes: [1, 2, 2, 1], extrudable: !0
          } : {faces: [d, e], vertices: [v, q, r, E], indices: [G, p, o, H], vertexTypes: [1, 1, 2, 2], extrudable: !0}
        }
      }
    }
  }
};
THREE.Sprite = function (b) {
  THREE.Object3D.call(this);
  if (b.material !== undefined) {
    this.material = b.material;
    this.map = undefined;
    this.blending = material.blending
  } else if (b.map !== undefined) {
    this.map = b.map instanceof THREE.Texture ? b.map : ImageUtils.loadTexture(b.map);
    this.material = undefined;
    this.blending = b.blending !== undefined ? b.blending : THREE.NormalBlending
  }
  this.useScreenCoordinates = b.useScreenCoordinates !== undefined ? b.useScreenCoordinates : !0;
  this.mergeWith3D = b.mergeWith3D !== undefined ? b.mergeWith3D : !this.useScreenCoordinates;
  this.affectedByDistance = b.affectedByDistance !== undefined ? b.affectedByDistance : !this.useScreenCoordinates;
  this.alignment = b.alignment instanceof THREE.Vector2 ? b.alignment : THREE.SpriteAlignment.center;
  this.rotation3d = this.rotation;
  this.rotation = 0;
  this.opacity = 1;
  this.uvOffset = new THREE.Vector2(0, 0);
  this.uvScale = new THREE.Vector2(1, 1)
};
THREE.Sprite.prototype = new THREE.Object3D;
THREE.Sprite.prototype.constructor = THREE.Sprite;
THREE.Sprite.prototype.supr = THREE.Object3D.prototype;
THREE.Sprite.prototype.updateMatrix = function () {
  this.matrix.setPosition(this.position);
  this.rotation3d.set(0, 0, this.rotation);
  this.matrix.setRotationFromEuler(this.rotation3d);
  if (this.scale.x !== 1 || this.scale.y !== 1) {
    this.matrix.scale(this.scale);
    this.boundRadiusScale = Math.max(this.scale.x, this.scale.y)
  }
  this.matrixWorldNeedsUpdate = !0
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Scene = function () {
  THREE.Object3D.call(this);
  this.matrixAutoUpdate = !1;
  this.collisions = this.fog = null;
  this.objects = [];
  this.lights = [];
  this.sounds = [];
  this.__objectsAdded = [];
  this.__objectsRemoved = []
};
THREE.Scene.prototype = new THREE.Object3D;
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.supr = THREE.Object3D.prototype;
THREE.Scene.prototype.addChild = function (b) {
  this.supr.addChild.call(this, b);
  this.addChildRecurse(b)
};
THREE.Scene.prototype.addChildRecurse = function (b) {
  if (b instanceof THREE.Light)this.lights.indexOf(b) === -1 && this.lights.push(b); else if (b instanceof THREE.Sound)this.sounds.indexOf(b) === -1 && this.sounds.push(b); else if (!(b instanceof THREE.Camera || b instanceof THREE.Bone) && this.objects.indexOf(b) === -1) {
    this.objects.push(b);
    this.__objectsAdded.push(b)
  }
  for (var d = 0; d < b.children.length; d++)this.addChildRecurse(b.children[d])
};
THREE.Scene.prototype.removeChild = function (b) {
  this.supr.removeChild.call(this, b);
  this.removeChildRecurse(b)
};
THREE.Scene.prototype.removeChildRecurse = function (b) {
  if (b instanceof THREE.Light) {
    var d = this.lights.indexOf(b);
    d !== -1 && this.lights.splice(d, 1)
  } else if (b instanceof THREE.Sound) {
    d = this.sounds.indexOf(b);
    d !== -1 && this.sounds.splice(d, 1)
  } else if (!(b instanceof THREE.Camera)) {
    d = this.objects.indexOf(b);
    if (d !== -1) {
      this.objects.splice(d, 1);
      this.__objectsRemoved.push(b)
    }
  }
  for (d = 0; d < b.children.length; d++)this.removeChildRecurse(b.children[d])
};
THREE.Scene.prototype.addObject = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeObject = THREE.Scene.prototype.removeChild;
THREE.Scene.prototype.addLight = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeLight = THREE.Scene.prototype.removeChild;
THREE.Fog = function (b, d, e) {
  this.color = new THREE.Color(b);
  this.near = d || 1;
  this.far = e || 1E3
};
THREE.FogExp2 = function (b, d) {
  this.color = new THREE.Color(b);
  this.density = d !== undefined ? d : 2.5E-4
};
THREE.Projector = function () {
  function b() {
    var T = r[q] = r[q] || new THREE.RenderableVertex;
    q++;
    return T
  }

  function d(T, c) {
    return c.z - T.z
  }

  function e(T, c) {
    var ia = 0, xa = 1, ta = T.z + T.w, ya = c.z + c.w, $ = -T.z + T.w, qa = -c.z + c.w;
    if (ta >= 0 && ya >= 0 && $ >= 0 && qa >= 0)return !0; else if (ta < 0 && ya < 0 || $ < 0 && qa < 0)return !1; else {
      if (ta < 0)ia = Math.max(ia, ta / (ta - ya)); else ya < 0 && (xa = Math.min(xa, ta / (ta - ya)));
      if ($ < 0)ia = Math.max(ia, $ / ($ - qa)); else qa < 0 && (xa = Math.min(xa, $ / ($ - qa)));
      if (xa < ia)return !1; else {
        T.lerpSelf(c, ia);
        c.lerpSelf(T, 1 - xa);
        return !0
      }
    }
  }

  var g,
    h, p = [], o, q, r = [], v, E, G = [], H, C = [], F, O, P = [], L, ea, W = [], Z = new THREE.Vector4, X = new THREE.Vector4, M = new THREE.Matrix4, Ia = new THREE.Matrix4, fa = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4], Fa = new THREE.Vector4, ha = new THREE.Vector4;
  this.projectVector = function (T, c) {
    M.multiply(c.projectionMatrix, c.matrixWorldInverse);
    M.multiplyVector3(T);
    return T
  };
  this.unprojectVector = function (T, c) {
    M.multiply(c.matrixWorld, THREE.Matrix4.makeInvert(c.projectionMatrix));
    M.multiplyVector3(T);
    return T
  };
  this.projectObjects = function (T, c, ia) {
    c = [];
    var xa, ta, ya;
    h = 0;
    ta = T.objects;
    T = 0;
    for (xa = ta.length; T < xa; T++) {
      ya = ta[T];
      var $;
      if (!($ = !ya.visible))if ($ = ya instanceof THREE.Mesh) {
        a:{
          $ = void 0;
          for (var qa = ya.matrixWorld, ra = -ya.geometry.boundingSphere.radius * Math.max(ya.scale.x, Math.max(ya.scale.y, ya.scale.z)), ja = 0; ja < 6; ja++) {
            $ = fa[ja].x * qa.n14 + fa[ja].y * qa.n24 + fa[ja].z * qa.n34 + fa[ja].w;
            if ($ <= ra) {
              $ = !1;
              break a
            }
          }
          $ = !0
        }
        $ = !$
      }
      if (!$) {
        $ = p[h] = p[h] || new THREE.RenderableObject;
        h++;
        g = $;
        Z.copy(ya.position);
        M.multiplyVector3(Z);
        g.object = ya;
        g.z = Z.z;
        c.push(g)
      }
    }
    ia && c.sort(d);
    return c
  };
  this.projectScene = function (T, c, ia) {
    var xa = [], ta = c.near, ya = c.far, $, qa, ra, ja, aa, va, sa, za, Aa, ca, Pa, Ta, Ya, Ua, Sa, fb, R;
    ea = O = H = E = 0;
    c.matrixAutoUpdate && c.update(undefined, !0);
    T.update(undefined, !1, c);
    M.multiply(c.projectionMatrix, c.matrixWorldInverse);
    fa[0].set(M.n41 - M.n11, M.n42 - M.n12, M.n43 - M.n13, M.n44 - M.n14);
    fa[1].set(M.n41 + M.n11, M.n42 + M.n12, M.n43 + M.n13, M.n44 + M.n14);
    fa[2].set(M.n41 + M.n21, M.n42 + M.n22, M.n43 + M.n23, M.n44 + M.n24);
    fa[3].set(M.n41 -
      M.n21, M.n42 - M.n22, M.n43 - M.n23, M.n44 - M.n24);
    fa[4].set(M.n41 - M.n31, M.n42 - M.n32, M.n43 - M.n33, M.n44 - M.n34);
    fa[5].set(M.n41 + M.n31, M.n42 + M.n32, M.n43 + M.n33, M.n44 + M.n34);
    for ($ = 0; $ < 6; $++) {
      Aa = fa[$];
      Aa.divideScalar(Math.sqrt(Aa.x * Aa.x + Aa.y * Aa.y + Aa.z * Aa.z))
    }
    Aa = this.projectObjects(T, c, !0);
    T = 0;
    for ($ = Aa.length; T < $; T++) {
      ca = Aa[T].object;
      if (ca.visible) {
        Pa = ca.matrixWorld;
        Ta = ca.matrixRotationWorld;
        Ya = ca.materials;
        Ua = ca.overdraw;
        q = 0;
        if (ca instanceof THREE.Mesh) {
          Sa = ca.geometry;
          ja = Sa.vertices;
          fb = Sa.faces;
          Sa = Sa.faceVertexUvs;
          qa = 0;
          for (ra = ja.length; qa < ra; qa++) {
            o = b();
            o.positionWorld.copy(ja[qa].position);
            Pa.multiplyVector3(o.positionWorld);
            o.positionScreen.copy(o.positionWorld);
            M.multiplyVector4(o.positionScreen);
            o.positionScreen.x /= o.positionScreen.w;
            o.positionScreen.y /= o.positionScreen.w;
            o.visible = o.positionScreen.z > ta && o.positionScreen.z < ya
          }
          ja = 0;
          for (qa = fb.length; ja < qa; ja++) {
            ra = fb[ja];
            if (ra instanceof THREE.Face3) {
              aa = r[ra.a];
              va = r[ra.b];
              sa = r[ra.c];
              if (aa.visible && va.visible && sa.visible && (ca.doubleSided || ca.flipSided != (sa.positionScreen.x -
                aa.positionScreen.x) * (va.positionScreen.y - aa.positionScreen.y) - (sa.positionScreen.y - aa.positionScreen.y) * (va.positionScreen.x - aa.positionScreen.x) < 0)) {
                za = G[E] = G[E] || new THREE.RenderableFace3;
                E++;
                v = za;
                v.v1.copy(aa);
                v.v2.copy(va);
                v.v3.copy(sa)
              } else continue
            } else if (ra instanceof THREE.Face4) {
              aa = r[ra.a];
              va = r[ra.b];
              sa = r[ra.c];
              za = r[ra.d];
              if (aa.visible && va.visible && sa.visible && za.visible && (ca.doubleSided || ca.flipSided != ((za.positionScreen.x - aa.positionScreen.x) * (va.positionScreen.y - aa.positionScreen.y) -
                (za.positionScreen.y - aa.positionScreen.y) * (va.positionScreen.x - aa.positionScreen.x) < 0 || (va.positionScreen.x - sa.positionScreen.x) * (za.positionScreen.y - sa.positionScreen.y) - (va.positionScreen.y - sa.positionScreen.y) * (za.positionScreen.x - sa.positionScreen.x) < 0))) {
                R = C[H] = C[H] || new THREE.RenderableFace4;
                H++;
                v = R;
                v.v1.copy(aa);
                v.v2.copy(va);
                v.v3.copy(sa);
                v.v4.copy(za)
              } else continue
            }
            v.normalWorld.copy(ra.normal);
            Ta.multiplyVector3(v.normalWorld);
            v.centroidWorld.copy(ra.centroid);
            Pa.multiplyVector3(v.centroidWorld);
            v.centroidScreen.copy(v.centroidWorld);
            M.multiplyVector3(v.centroidScreen);
            sa = ra.vertexNormals;
            aa = 0;
            for (va = sa.length; aa < va; aa++) {
              za = v.vertexNormalsWorld[aa];
              za.copy(sa[aa]);
              Ta.multiplyVector3(za)
            }
            aa = 0;
            for (va = Sa.length; aa < va; aa++)if (R = Sa[aa][ja]) {
              sa = 0;
              for (za = R.length; sa < za; sa++)v.uvs[aa][sa] = R[sa]
            }
            v.meshMaterials = Ya;
            v.faceMaterials = ra.materials;
            v.overdraw = Ua;
            v.z = v.centroidScreen.z;
            xa.push(v)
          }
        } else if (ca instanceof THREE.Line) {
          Ia.multiply(M, Pa);
          ja = ca.geometry.vertices;
          aa = b();
          aa.positionScreen.copy(ja[0].position);
          Ia.multiplyVector4(aa.positionScreen);
          qa = 1;
          for (ra = ja.length; qa < ra; qa++) {
            aa = b();
            aa.positionScreen.copy(ja[qa].position);
            Ia.multiplyVector4(aa.positionScreen);
            va = r[q - 2];
            Fa.copy(aa.positionScreen);
            ha.copy(va.positionScreen);
            if (e(Fa, ha)) {
              Fa.multiplyScalar(1 / Fa.w);
              ha.multiplyScalar(1 / ha.w);
              Pa = P[O] = P[O] || new THREE.RenderableLine;
              O++;
              F = Pa;
              F.v1.positionScreen.copy(Fa);
              F.v2.positionScreen.copy(ha);
              F.z = Math.max(Fa.z, ha.z);
              F.materials = ca.materials;
              xa.push(F)
            }
          }
        } else if (ca instanceof THREE.Particle) {
          X.set(ca.matrixWorld.n14,
            ca.matrixWorld.n24, ca.matrixWorld.n34, 1);
          M.multiplyVector4(X);
          X.z /= X.w;
          if (X.z > 0 && X.z < 1) {
            Pa = W[ea] = W[ea] || new THREE.RenderableParticle;
            ea++;
            L = Pa;
            L.x = X.x / X.w;
            L.y = X.y / X.w;
            L.z = X.z;
            L.rotation = ca.rotation.z;
            L.scale.x = ca.scale.x * Math.abs(L.x - (X.x + c.projectionMatrix.n11) / (X.w + c.projectionMatrix.n14));
            L.scale.y = ca.scale.y * Math.abs(L.y - (X.y + c.projectionMatrix.n22) / (X.w + c.projectionMatrix.n24));
            L.materials = ca.materials;
            xa.push(L)
          }
        }
      }
    }
    ia && xa.sort(d);
    return xa
  }
};
THREE.SoundRenderer = function () {
  this.volume = 1;
  this.domElement = document.createElement("div");
  this.domElement.id = "THREESound";
  this.cameraPosition = new THREE.Vector3;
  this.soundPosition = new THREE.Vector3;
  this.render = function (b, d, e) {
    e && b.update(undefined, !1, d);
    e = b.sounds;
    var g, h = e.length;
    for (g = 0; g < h; g++) {
      b = e[g];
      this.soundPosition.set(b.matrixWorld.n14, b.matrixWorld.n24, b.matrixWorld.n34);
      this.soundPosition.subSelf(d.position);
      if (b.isPlaying && b.isLoaded) {
        b.isAddedToDOM || b.addToDOM(this.domElement);
        b.calculateVolumeAndPan(this.soundPosition)
      }
    }
  }
};
THREE.ShaderChunk = {
  fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
  fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
  envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif",
  envmap_fragment: "#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif",
  envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
  envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
  map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
  map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
  map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
  map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\n#endif",
  map_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif",
  map_vertex: "#ifdef USE_MAP\nvUv = uv;\n#endif",
  lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
  lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
  lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
  lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
  lights_pars_vertex: "uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#ifdef PHONG\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",
  lights_vertex: "if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef PHONG\nvPointLight[ i ] = vec4( lVector, lDistance );\n#endif\n}\n#endif\n}",
  lights_pars_fragment: "#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
  lights_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 mColor = vec4( diffuse, opacity );\nvec4 mSpecular = vec4( specular, opacity );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointDiffuse  = vec4( 0.0 );\nvec4 pointSpecular = vec4( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + vViewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse  += mColor * pointDiffuseWeight * pointDistance;\npointSpecular += mSpecular * pointSpecularWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirDiffuse  = vec4( 0.0 );\nvec4 dirSpecular = vec4( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse  += mColor * dirDiffuseWeight;\ndirSpecular += mSpecular * dirSpecularWeight;\n}\n#endif\nvec4 totalLight = vec4( ambient, opacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirDiffuse + dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointDiffuse + pointSpecular;\n#endif\ngl_FragColor = gl_FragColor * totalLight;",
  color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
  color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
  color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
  color_vertex: "#ifdef USE_COLOR\nvColor = color;\n#endif",
  skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
  skinning_vertex: "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
  morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",
  morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
  default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif"
};
THREE.UniformsUtils = {
  merge: function (b) {
    var d, e, g, h = {};
    for (d = 0; d < b.length; d++) {
      g = this.clone(b[d]);
      for (e in g)h[e] = g[e]
    }
    return h
  }, clone: function (b) {
    var d, e, g, h = {};
    for (d in b) {
      h[d] = {};
      for (e in b[d]) {
        g = b[d][e];
        h[d][e] = g instanceof THREE.Color || g instanceof THREE.Vector3 || g instanceof THREE.Texture ? g.clone() : g
      }
    }
    return h
  }
};
THREE.UniformsLib = {
  common: {
    diffuse: {type: "c", value: new THREE.Color(15658734)},
    opacity: {type: "f", value: 1},
    map: {type: "t", value: 0, texture: null},
    lightMap: {type: "t", value: 2, texture: null},
    envMap: {type: "t", value: 1, texture: null},
    useRefract: {type: "i", value: 0},
    reflectivity: {type: "f", value: 1},
    refractionRatio: {type: "f", value: 0.98},
    combine: {type: "i", value: 0},
    fogDensity: {type: "f", value: 2.5E-4},
    fogNear: {type: "f", value: 1},
    fogFar: {type: "f", value: 2E3},
    fogColor: {type: "c", value: new THREE.Color(16777215)},
    morphTargetInfluences: {
      type: "f",
      value: 0
    }
  },
  lights: {
    enableLighting: {type: "i", value: 1},
    ambientLightColor: {type: "fv", value: []},
    directionalLightDirection: {type: "fv", value: []},
    directionalLightColor: {type: "fv", value: []},
    pointLightColor: {type: "fv", value: []},
    pointLightPosition: {type: "fv", value: []},
    pointLightDistance: {type: "fv1", value: []}
  },
  particle: {
    psColor: {type: "c", value: new THREE.Color(15658734)},
    opacity: {type: "f", value: 1},
    size: {type: "f", value: 1},
    scale: {type: "f", value: 1},
    map: {type: "t", value: 0, texture: null},
    fogDensity: {type: "f", value: 2.5E-4},
    fogNear: {type: "f", value: 1},
    fogFar: {type: "f", value: 2E3},
    fogColor: {type: "c", value: new THREE.Color(16777215)}
  }
};
THREE.ShaderLib = {
  lensFlareVertexTexture: {
    vertexShader: "uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nuniform\tsampler2D\tocclusionMap;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvarying\tfloat\tvVisibility;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ));\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvarying\tfloat\t\tvVisibility;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * vVisibility;\ngl_FragColor = color;\n}\n}"
  },
  lensFlare: {
    vertexShader: "uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tsampler2D\tocclusionMap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 )).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * visibility;\ngl_FragColor = color;\n}\n}"
  },
  sprite: {
    vertexShader: "uniform\tint\t\tuseScreenCoordinates;\nuniform    int     affectedByDistance;\nuniform\tvec3\tscreenPosition;\nuniform \tmat4 \tmodelViewMatrix;\nuniform \tmat4 \tprojectionMatrix;\nuniform    float   rotation;\nuniform    vec2    scale;\nuniform    vec2    alignment;\nuniform    vec2    uvOffset;\nuniform\tvec2    uvScale;\nattribute \tvec2 \tposition;\nattribute  vec2\tuv;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
    fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity;\ngl_FragColor = color;\n}"
  },
  shadowPost: {
    vertexShader: "uniform \tmat4 \tprojectionMatrix;\nattribute \tvec3 \tposition;\nvoid main(void)\n{\ngl_Position = projectionMatrix * vec4( position, 1.0 );\n}",
    fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform \tfloat \tdarkness;\nvoid main( void )\n{\ngl_FragColor = vec4( 0, 0, 0, darkness );\n}"
  },
  shadowVolumeDynamic: {
    uniforms: {directionalLightDirection: {type: "fv", value: []}},
    vertexShader: "uniform \tvec3 \tdirectionalLightDirection;\nvoid main() {\nvec4 pos      = objectMatrix * vec4( position, 1.0 );\nvec3 norm     = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nvec4 extruded = vec4( directionalLightDirection * 5000.0 * step( 0.0, dot( directionalLightDirection, norm )), 0.0 );\ngl_Position   = projectionMatrix * viewMatrix * ( pos + extruded );\n}",
    fragmentShader: "void main() {\ngl_FragColor = vec4( 1.0 );\n}"
  },
  depth: {
    uniforms: {mNear: {type: "f", value: 1}, mFar: {type: "f", value: 2E3}, opacity: {type: "f", value: 1}},
    fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",
    vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"
  },
  normal: {
    uniforms: {opacity: {type: "f", value: 1}},
    fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",
    vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}"
  },
  basic: {
    uniforms: THREE.UniformsLib.common,
    fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment,
      THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
    vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex,
      THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n")
  },
  lambert: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights]),
    fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nvarying vec3 vLightWeighting;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );\ngl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment,
      THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
    vertexShader: ["varying vec3 vLightWeighting;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex,
      THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "vec3 transformedNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n")
  },
  phong: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights, {
      ambient: {type: "c", value: new THREE.Color(328965)},
      specular: {type: "c", value: new THREE.Color(1118481)},
      shininess: {type: "f", value: 30}
    }]),
    fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;\nvarying vec3 vLightWeighting;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_pars_fragment, "void main() {\ngl_FragColor = vec4( vLightWeighting, 1.0 );", THREE.ShaderChunk.lights_fragment, THREE.ShaderChunk.map_fragment,
      THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
    vertexShader: ["#define PHONG\nvarying vec3 vLightWeighting;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex,
      "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = cameraPosition - mPosition.xyz;\nvec3 transformedNormal = normalize( normalMatrix * normal );\nvNormal = transformedNormal;", THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex,
      THREE.ShaderChunk.default_vertex, "}"].join("\n")
  },
  particle_basic: {
    uniforms: THREE.UniformsLib.particle,
    fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
    vertexShader: ["uniform float size;\nuniform float scale;",
      THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n")
  }
};
THREE.WebGLRenderer = function (b) {
  function d(f, s, k) {
    var i, m, x, w = f.vertices, u = w.length, z = f.colors, D = z.length, n = f.__vertexArray, y = f.__colorArray, B = f.__sortArray, K = f.__dirtyVertices, J = f.__dirtyColors;
    if (k.sortParticles) {
      Pa.multiplySelf(k.matrixWorld);
      for (i = 0; i < u; i++) {
        m = w[i].position;
        Ua.copy(m);
        Pa.multiplyVector3(Ua);
        B[i] = [Ua.z, i]
      }
      B.sort(function (Y, Q) {
        return Q[0] - Y[0]
      });
      for (i = 0; i < u; i++) {
        m = w[B[i][1]].position;
        x = i * 3;
        n[x] = m.x;
        n[x + 1] = m.y;
        n[x + 2] = m.z
      }
      for (i = 0; i < D; i++) {
        x = i * 3;
        color = z[B[i][1]];
        y[x] = color.r;
        y[x + 1] =
          color.g;
        y[x + 2] = color.b
      }
    } else {
      if (K)for (i = 0; i < u; i++) {
        m = w[i].position;
        x = i * 3;
        n[x] = m.x;
        n[x + 1] = m.y;
        n[x + 2] = m.z
      }
      if (J)for (i = 0; i < D; i++) {
        color = z[i];
        x = i * 3;
        y[x] = color.r;
        y[x + 1] = color.g;
        y[x + 2] = color.b
      }
    }
    if (K || k.sortParticles) {
      c.bindBuffer(c.ARRAY_BUFFER, f.__webglVertexBuffer);
      c.bufferData(c.ARRAY_BUFFER, n, s)
    }
    if (J || k.sortParticles) {
      c.bindBuffer(c.ARRAY_BUFFER, f.__webglColorBuffer);
      c.bufferData(c.ARRAY_BUFFER, y, s)
    }
  }

  function e(f, s, k, i, m) {
    i.program || T.initMaterial(i, s, k, m);
    var x = i.program, w = x.uniforms, u = i.uniforms;
    if (x !=
      ta) {
      c.useProgram(x);
      ta = x
    }
    c.uniformMatrix4fv(w.projectionMatrix, !1, Ta);
    if (k && (i instanceof THREE.MeshBasicMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshPhongMaterial || i instanceof THREE.LineBasicMaterial || i instanceof THREE.ParticleBasicMaterial || i.fog)) {
      u.fogColor.value = k.color;
      if (k instanceof THREE.Fog) {
        u.fogNear.value = k.near;
        u.fogFar.value = k.far
      } else if (k instanceof THREE.FogExp2)u.fogDensity.value = k.density
    }
    if (i instanceof THREE.MeshPhongMaterial || i instanceof THREE.MeshLambertMaterial ||
      i.lights) {
      var z, D, n = 0, y = 0, B = 0, K, J, Y, Q, da = Sa, Ga = da.directional.colors, Va = da.directional.positions, S = da.point.colors, U = da.point.positions, V = da.point.distances, pa = 0, t = 0;
      k = D = Q = 0;
      for (z = s.length; k < z; k++) {
        D = s[k];
        K = D.color;
        J = D.position;
        Y = D.intensity;
        Q = D.distance;
        if (D instanceof THREE.AmbientLight) {
          n += K.r;
          y += K.g;
          B += K.b
        } else if (D instanceof THREE.DirectionalLight) {
          Q = pa * 3;
          Ga[Q] = K.r * Y;
          Ga[Q + 1] = K.g * Y;
          Ga[Q + 2] = K.b * Y;
          Va[Q] = J.x;
          Va[Q + 1] = J.y;
          Va[Q + 2] = J.z;
          pa += 1
        } else if (D instanceof THREE.PointLight) {
          D = t * 3;
          S[D] = K.r * Y;
          S[D +
          1] = K.g * Y;
          S[D + 2] = K.b * Y;
          U[D] = J.x;
          U[D + 1] = J.y;
          U[D + 2] = J.z;
          V[t] = Q;
          t += 1
        }
      }
      for (k = pa * 3; k < Ga.length; k++)Ga[k] = 0;
      for (k = t * 3; k < S.length; k++)S[k] = 0;
      da.point.length = t;
      da.directional.length = pa;
      da.ambient[0] = n;
      da.ambient[1] = y;
      da.ambient[2] = B;
      k = Sa;
      u.enableLighting.value = k.directional.length + k.point.length;
      u.ambientLightColor.value = k.ambient;
      u.directionalLightColor.value = k.directional.colors;
      u.directionalLightDirection.value = k.directional.positions;
      u.pointLightColor.value = k.point.colors;
      u.pointLightPosition.value = k.point.positions;
      u.pointLightDistance.value = k.point.distances
    }
    if (i instanceof THREE.MeshBasicMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshPhongMaterial) {
      u.diffuse.value = i.color;
      u.opacity.value = i.opacity;
      u.map.texture = i.map;
      u.lightMap.texture = i.lightMap;
      u.envMap.texture = i.envMap;
      u.reflectivity.value = i.reflectivity;
      u.refractionRatio.value = i.refractionRatio;
      u.combine.value = i.combine;
      u.useRefract.value = i.envMap && i.envMap.mapping instanceof THREE.CubeRefractionMapping
    }
    if (i instanceof THREE.LineBasicMaterial) {
      u.diffuse.value =
        i.color;
      u.opacity.value = i.opacity
    } else if (i instanceof THREE.ParticleBasicMaterial) {
      u.psColor.value = i.color;
      u.opacity.value = i.opacity;
      u.size.value = i.size;
      u.scale.value = ia.height / 2;
      u.map.texture = i.map
    } else if (i instanceof THREE.MeshPhongMaterial) {
      u.ambient.value = i.ambient;
      u.specular.value = i.specular;
      u.shininess.value = i.shininess
    } else if (i instanceof THREE.MeshDepthMaterial) {
      u.mNear.value = f.near;
      u.mFar.value = f.far;
      u.opacity.value = i.opacity
    } else if (i instanceof THREE.MeshNormalMaterial)u.opacity.value =
      i.opacity;
    for (var I in u)if (y = x.uniforms[I]) {
      z = u[I];
      n = z.type;
      k = z.value;
      if (n == "i")c.uniform1i(y, k); else if (n == "f")c.uniform1f(y, k); else if (n == "fv1")c.uniform1fv(y, k); else if (n == "fv")c.uniform3fv(y, k); else if (n == "v2")c.uniform2f(y, k.x, k.y); else if (n == "v3")c.uniform3f(y, k.x, k.y, k.z); else if (n == "v4")c.uniform4f(y, k.x, k.y, k.z, k.w); else if (n == "c")c.uniform3f(y, k.r, k.g, k.b); else if (n == "t") {
        c.uniform1i(y, k);
        if (z = z.texture)if (z.image instanceof Array && z.image.length == 6) {
          if (z.image.length == 6) {
            if (z.needsUpdate) {
              if (z.__webglInit) {
                c.bindTexture(c.TEXTURE_CUBE_MAP,
                  z.image.__webglTextureCube);
                for (n = 0; n < 6; ++n)c.texSubImage2D(c.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0, 0, 0, c.RGBA, c.UNSIGNED_BYTE, z.image[n])
              } else {
                z.image.__webglTextureCube = c.createTexture();
                c.bindTexture(c.TEXTURE_CUBE_MAP, z.image.__webglTextureCube);
                for (n = 0; n < 6; ++n)c.texImage2D(c.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, z.image[n]);
                z.__webglInit = !0
              }
              X(c.TEXTURE_CUBE_MAP, z, z.image[0]);
              c.bindTexture(c.TEXTURE_CUBE_MAP, null);
              z.needsUpdate = !1
            }
            c.activeTexture(c.TEXTURE0 + k);
            c.bindTexture(c.TEXTURE_CUBE_MAP,
              z.image.__webglTextureCube)
          }
        } else M(z, k)
      }
    }
    c.uniformMatrix4fv(w.modelViewMatrix, !1, m._modelViewMatrixArray);
    c.uniformMatrix3fv(w.normalMatrix, !1, m._normalMatrixArray);
    (i instanceof THREE.MeshShaderMaterial || i instanceof THREE.MeshPhongMaterial || i.envMap) && w.cameraPosition !== null && c.uniform3f(w.cameraPosition, f.position.x, f.position.y, f.position.z);
    (i instanceof THREE.MeshShaderMaterial || i.envMap || i.skinning) && w.objectMatrix !== null && c.uniformMatrix4fv(w.objectMatrix, !1, m._objectMatrixArray);
    (i instanceof
    THREE.MeshPhongMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshShaderMaterial || i.skinning) && w.viewMatrix !== null && c.uniformMatrix4fv(w.viewMatrix, !1, Ya);
    if (i instanceof THREE.ShadowVolumeDynamicMaterial) {
      f = u.directionalLightDirection.value;
      f[0] = -s[1].position.x;
      f[1] = -s[1].position.y;
      f[2] = -s[1].position.z;
      c.uniform3fv(w.directionalLightDirection, f);
      c.uniformMatrix4fv(w.objectMatrix, !1, m._objectMatrixArray);
      c.uniformMatrix4fv(w.viewMatrix, !1, Ya)
    }
    if (i.skinning) {
      c.uniformMatrix4fv(w.cameraInverseMatrix,
        !1, Ya);
      c.uniformMatrix4fv(w.boneGlobalMatrices, !1, m.boneMatrices)
    }
    return x
  }

  function g(f, s, k, i, m, x) {
    if (i.opacity != 0) {
      var w;
      f = e(f, s, k, i, x).attributes;
      if (!i.morphTargets && f.position >= 0) {
        c.bindBuffer(c.ARRAY_BUFFER, m.__webglVertexBuffer);
        c.vertexAttribPointer(f.position, 3, c.FLOAT, !1, 0, 0)
      } else {
        s = i.program.attributes;
        if (x.morphTargetBase !== -1) {
          c.bindBuffer(c.ARRAY_BUFFER, m.__webglMorphTargetsBuffers[x.morphTargetBase]);
          c.vertexAttribPointer(s.position, 3, c.FLOAT, !1, 0, 0)
        } else if (s.position >= 0) {
          c.bindBuffer(c.ARRAY_BUFFER,
            m.__webglVertexBuffer);
          c.vertexAttribPointer(s.position, 3, c.FLOAT, !1, 0, 0)
        }
        if (x.morphTargetForcedOrder.length) {
          k = 0;
          for (var u = x.morphTargetForcedOrder, z = x.morphTargetInfluences; k < i.numSupportedMorphTargets && k < u.length;) {
            c.bindBuffer(c.ARRAY_BUFFER, m.__webglMorphTargetsBuffers[u[k]]);
            c.vertexAttribPointer(s["morphTarget" + k], 3, c.FLOAT, !1, 0, 0);
            x.__webglMorphTargetInfluences[k] = z[u[k]];
            k++
          }
        } else {
          u = [];
          var D = -1, n = 0;
          z = x.morphTargetInfluences;
          var y, B = z.length;
          k = 0;
          for (x.morphTargetBase !== -1 && (u[x.morphTargetBase] = !0); k < i.numSupportedMorphTargets;) {
            for (y = 0; y < B; y++)if (!u[y] && z[y] > D) {
              n = y;
              D = z[n]
            }
            c.bindBuffer(c.ARRAY_BUFFER, m.__webglMorphTargetsBuffers[n]);
            c.vertexAttribPointer(s["morphTarget" + k], 3, c.FLOAT, !1, 0, 0);
            x.__webglMorphTargetInfluences[k] = D;
            u[n] = 1;
            D = -1;
            k++
          }
        }
        i.program.uniforms.morphTargetInfluences !== null && c.uniform1fv(i.program.uniforms.morphTargetInfluences, x.__webglMorphTargetInfluences)
      }
      if (i.attributes)for (w in i.attributes)if (f[w] !== undefined && f[w] >= 0) {
        s = i.attributes[w];
        if (s.buffer) {
          c.bindBuffer(c.ARRAY_BUFFER,
            s.buffer);
          c.vertexAttribPointer(f[w], s.size, c.FLOAT, !1, 0, 0)
        }
      }
      if (f.color >= 0) {
        c.bindBuffer(c.ARRAY_BUFFER, m.__webglColorBuffer);
        c.vertexAttribPointer(f.color, 3, c.FLOAT, !1, 0, 0)
      }
      if (f.normal >= 0) {
        c.bindBuffer(c.ARRAY_BUFFER, m.__webglNormalBuffer);
        c.vertexAttribPointer(f.normal, 3, c.FLOAT, !1, 0, 0)
      }
      if (f.tangent >= 0) {
        c.bindBuffer(c.ARRAY_BUFFER, m.__webglTangentBuffer);
        c.vertexAttribPointer(f.tangent, 4, c.FLOAT, !1, 0, 0)
      }
      if (f.uv >= 0)if (m.__webglUVBuffer) {
        c.bindBuffer(c.ARRAY_BUFFER, m.__webglUVBuffer);
        c.vertexAttribPointer(f.uv,
          2, c.FLOAT, !1, 0, 0);
        c.enableVertexAttribArray(f.uv)
      } else c.disableVertexAttribArray(f.uv);
      if (f.uv2 >= 0)if (m.__webglUV2Buffer) {
        c.bindBuffer(c.ARRAY_BUFFER, m.__webglUV2Buffer);
        c.vertexAttribPointer(f.uv2, 2, c.FLOAT, !1, 0, 0);
        c.enableVertexAttribArray(f.uv2)
      } else c.disableVertexAttribArray(f.uv2);
      if (i.skinning && f.skinVertexA >= 0 && f.skinVertexB >= 0 && f.skinIndex >= 0 && f.skinWeight >= 0) {
        c.bindBuffer(c.ARRAY_BUFFER, m.__webglSkinVertexABuffer);
        c.vertexAttribPointer(f.skinVertexA, 4, c.FLOAT, !1, 0, 0);
        c.bindBuffer(c.ARRAY_BUFFER,
          m.__webglSkinVertexBBuffer);
        c.vertexAttribPointer(f.skinVertexB, 4, c.FLOAT, !1, 0, 0);
        c.bindBuffer(c.ARRAY_BUFFER, m.__webglSkinIndicesBuffer);
        c.vertexAttribPointer(f.skinIndex, 4, c.FLOAT, !1, 0, 0);
        c.bindBuffer(c.ARRAY_BUFFER, m.__webglSkinWeightsBuffer);
        c.vertexAttribPointer(f.skinWeight, 4, c.FLOAT, !1, 0, 0)
      }
      if (x instanceof THREE.Mesh) {
        if (i.wireframe) {
          c.lineWidth(i.wireframeLinewidth);
          c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, m.__webglLineBuffer);
          c.drawElements(c.LINES, m.__webglLineCount, c.UNSIGNED_SHORT, 0)
        } else {
          c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,
            m.__webglFaceBuffer);
          c.drawElements(c.TRIANGLES, m.__webglFaceCount, c.UNSIGNED_SHORT, 0)
        }
        T.data.vertices += m.__webglFaceCount;
        T.data.faces += m.__webglFaceCount / 3;
        T.data.drawCalls++
      } else if (x instanceof THREE.Line) {
        x = x.type == THREE.LineStrip ? c.LINE_STRIP : c.LINES;
        c.lineWidth(i.linewidth);
        c.drawArrays(x, 0, m.__webglLineCount);
        T.data.drawCalls++
      } else if (x instanceof THREE.ParticleSystem) {
        c.drawArrays(c.POINTS, 0, m.__webglParticleCount);
        T.data.drawCalls++
      } else if (x instanceof THREE.Ribbon) {
        c.drawArrays(c.TRIANGLE_STRIP,
          0, m.__webglVertexCount);
        T.data.drawCalls++
      }
    }
  }

  function h(f, s, k) {
    if (!f.__webglVertexBuffer)f.__webglVertexBuffer = c.createBuffer();
    if (!f.__webglNormalBuffer)f.__webglNormalBuffer = c.createBuffer();
    if (f.hasPos) {
      c.bindBuffer(c.ARRAY_BUFFER, f.__webglVertexBuffer);
      c.bufferData(c.ARRAY_BUFFER, f.positionArray, c.DYNAMIC_DRAW);
      c.enableVertexAttribArray(s.attributes.position);
      c.vertexAttribPointer(s.attributes.position, 3, c.FLOAT, !1, 0, 0)
    }
    if (f.hasNormal) {
      c.bindBuffer(c.ARRAY_BUFFER, f.__webglNormalBuffer);
      if (k ==
        THREE.FlatShading) {
        var i, m, x, w, u, z, D, n, y, B, K = f.count * 3;
        for (B = 0; B < K; B += 9) {
          k = f.normalArray;
          i = k[B];
          m = k[B + 1];
          x = k[B + 2];
          w = k[B + 3];
          z = k[B + 4];
          n = k[B + 5];
          u = k[B + 6];
          D = k[B + 7];
          y = k[B + 8];
          i = (i + w + u) / 3;
          m = (m + z + D) / 3;
          x = (x + n + y) / 3;
          k[B] = i;
          k[B + 1] = m;
          k[B + 2] = x;
          k[B + 3] = i;
          k[B + 4] = m;
          k[B + 5] = x;
          k[B + 6] = i;
          k[B + 7] = m;
          k[B + 8] = x
        }
      }
      c.bufferData(c.ARRAY_BUFFER, f.normalArray, c.DYNAMIC_DRAW);
      c.enableVertexAttribArray(s.attributes.normal);
      c.vertexAttribPointer(s.attributes.normal, 3, c.FLOAT, !1, 0, 0)
    }
    c.drawArrays(c.TRIANGLES, 0, f.count);
    f.count = 0
  }

  function p(f) {
    if (qa !=
      f.doubleSided) {
      f.doubleSided ? c.disable(c.CULL_FACE) : c.enable(c.CULL_FACE);
      qa = f.doubleSided
    }
    if (ra != f.flipSided) {
      f.flipSided ? c.frontFace(c.CW) : c.frontFace(c.CCW);
      ra = f.flipSided
    }
  }

  function o(f) {
    if (aa != f) {
      f ? c.enable(c.DEPTH_TEST) : c.disable(c.DEPTH_TEST);
      aa = f
    }
  }

  function q(f) {
    ca[0].set(f.n41 - f.n11, f.n42 - f.n12, f.n43 - f.n13, f.n44 - f.n14);
    ca[1].set(f.n41 + f.n11, f.n42 + f.n12, f.n43 + f.n13, f.n44 + f.n14);
    ca[2].set(f.n41 + f.n21, f.n42 + f.n22, f.n43 + f.n23, f.n44 + f.n24);
    ca[3].set(f.n41 - f.n21, f.n42 - f.n22, f.n43 - f.n23, f.n44 - f.n24);
    ca[4].set(f.n41 - f.n31, f.n42 - f.n32, f.n43 - f.n33, f.n44 - f.n34);
    ca[5].set(f.n41 + f.n31, f.n42 + f.n32, f.n43 + f.n33, f.n44 + f.n34);
    var s;
    for (f = 0; f < 6; f++) {
      s = ca[f];
      s.divideScalar(Math.sqrt(s.x * s.x + s.y * s.y + s.z * s.z))
    }
  }

  function r(f) {
    for (var s = f.matrixWorld, k = -f.geometry.boundingSphere.radius * Math.max(f.scale.x, Math.max(f.scale.y, f.scale.z)), i = 0; i < 6; i++) {
      f = ca[i].x * s.n14 + ca[i].y * s.n24 + ca[i].z * s.n34 + ca[i].w;
      if (f <= k)return !1
    }
    return !0
  }

  function v(f, s) {
    f.list[f.count] = s;
    f.count += 1
  }

  function E(f) {
    var s, k, i = f.object, m = f.opaque,
      x = f.transparent;
    x.count = 0;
    f = m.count = 0;
    for (s = i.materials.length; f < s; f++) {
      k = i.materials[f];
      k.transparent ? v(x, k) : v(m, k)
    }
  }

  function G(f) {
    var s, k, i, m, x = f.object, w = f.buffer, u = f.opaque, z = f.transparent;
    z.count = 0;
    f = u.count = 0;
    for (i = x.materials.length; f < i; f++) {
      s = x.materials[f];
      if (s instanceof THREE.MeshFaceMaterial) {
        s = 0;
        for (k = w.materials.length; s < k; s++)(m = w.materials[s]) && (m.transparent ? v(z, m) : v(u, m))
      } else(m = s) && (m.transparent ? v(z, m) : v(u, m))
    }
  }

  function H(f, s) {
    return s.z - f.z
  }

  function C(f) {
    c.enable(c.POLYGON_OFFSET_FILL);
    c.polygonOffset(0.1, 1);
    c.enable(c.STENCIL_TEST);
    c.enable(c.DEPTH_TEST);
    c.depthMask(!1);
    c.colorMask(!1, !1, !1, !1);
    c.stencilFunc(c.ALWAYS, 1, 255);
    c.stencilOpSeparate(c.BACK, c.KEEP, c.INCR, c.KEEP);
    c.stencilOpSeparate(c.FRONT, c.KEEP, c.DECR, c.KEEP);
    var s, k = f.lights.length, i, m = f.lights, x = [], w, u, z, D, n, y = f.__webglShadowVolumes.length;
    for (s = 0; s < k; s++) {
      i = f.lights[s];
      if (i instanceof THREE.DirectionalLight && i.castShadow) {
        x[0] = -i.position.x;
        x[1] = -i.position.y;
        x[2] = -i.position.z;
        for (n = 0; n < y; n++) {
          i = f.__webglShadowVolumes[n].object;
          w = f.__webglShadowVolumes[n].buffer;
          u = i.materials[0];
          u.program || T.initMaterial(u, m, undefined, i);
          u = u.program;
          z = u.uniforms;
          D = u.attributes;
          if (ta !== u) {
            c.useProgram(u);
            ta = u;
            c.uniformMatrix4fv(z.projectionMatrix, !1, Ta);
            c.uniformMatrix4fv(z.viewMatrix, !1, Ya);
            c.uniform3fv(z.directionalLightDirection, x)
          }
          i.matrixWorld.flattenToArray(i._objectMatrixArray);
          c.uniformMatrix4fv(z.objectMatrix, !1, i._objectMatrixArray);
          c.bindBuffer(c.ARRAY_BUFFER, w.__webglVertexBuffer);
          c.vertexAttribPointer(D.position, 3, c.FLOAT, !1,
            0, 0);
          c.bindBuffer(c.ARRAY_BUFFER, w.__webglNormalBuffer);
          c.vertexAttribPointer(D.normal, 3, c.FLOAT, !1, 0, 0);
          c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, w.__webglFaceBuffer);
          c.cullFace(c.FRONT);
          c.drawElements(c.TRIANGLES, w.__webglFaceCount, c.UNSIGNED_SHORT, 0);
          c.cullFace(c.BACK);
          c.drawElements(c.TRIANGLES, w.__webglFaceCount, c.UNSIGNED_SHORT, 0)
        }
      }
    }
    c.disable(c.POLYGON_OFFSET_FILL);
    c.colorMask(!0, !0, !0, !0);
    c.stencilFunc(c.NOTEQUAL, 0, 255);
    c.stencilOp(c.KEEP, c.KEEP, c.KEEP);
    c.disable(c.DEPTH_TEST);
    ja = -1;
    ta = R.program;
    c.useProgram(R.program);
    c.uniformMatrix4fv(R.projectionLocation, !1, Ta);
    c.uniform1f(R.darknessLocation, R.darkness);
    c.bindBuffer(c.ARRAY_BUFFER, R.vertexBuffer);
    c.vertexAttribPointer(R.vertexLocation, 3, c.FLOAT, !1, 0, 0);
    c.enableVertexAttribArray(R.vertexLocation);
    c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA);
    c.blendEquation(c.FUNC_ADD);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, R.elementBuffer);
    c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0);
    c.disable(c.STENCIL_TEST);
    c.enable(c.DEPTH_TEST);
    c.depthMask($)
  }

  function F(f,
             s) {
    var k, i, m;
    k = _sprite.attributes;
    var x = _sprite.uniforms, w = Aa / za, u, z = [], D = za * 0.5, n = Aa * 0.5, y = !0;
    c.useProgram(_sprite.program);
    ta = _sprite.program;
    ja = -1;
    if (!qb) {
      c.enableVertexAttribArray(_sprite.attributes.position);
      c.enableVertexAttribArray(_sprite.attributes.uv);
      qb = !0
    }
    c.disable(c.CULL_FACE);
    c.enable(c.BLEND);
    c.depthMask(!0);
    c.bindBuffer(c.ARRAY_BUFFER, _sprite.vertexBuffer);
    c.vertexAttribPointer(k.position, 2, c.FLOAT, !1, 16, 0);
    c.vertexAttribPointer(k.uv, 2, c.FLOAT, !1, 16, 8);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,
      _sprite.elementBuffer);
    c.uniformMatrix4fv(x.projectionMatrix, !1, Ta);
    c.activeTexture(c.TEXTURE0);
    c.uniform1i(x.map, 0);
    k = 0;
    for (i = f.__webglSprites.length; k < i; k++) {
      m = f.__webglSprites[k];
      if (m.useScreenCoordinates)m.z = -m.position.z; else {
        m._modelViewMatrix.multiplyToArray(s.matrixWorldInverse, m.matrixWorld, m._modelViewMatrixArray);
        m.z = -m._modelViewMatrix.n34
      }
    }
    f.__webglSprites.sort(H);
    k = 0;
    for (i = f.__webglSprites.length; k < i; k++) {
      m = f.__webglSprites[k];
      if (m.material === undefined && m.map && m.map.image && m.map.image.width) {
        if (m.useScreenCoordinates) {
          c.uniform1i(x.useScreenCoordinates,
            1);
          c.uniform3f(x.screenPosition, (m.position.x - D) / D, (n - m.position.y) / n, Math.max(0, Math.min(1, m.position.z)))
        } else {
          c.uniform1i(x.useScreenCoordinates, 0);
          c.uniform1i(x.affectedByDistance, m.affectedByDistance ? 1 : 0);
          c.uniformMatrix4fv(x.modelViewMatrix, !1, m._modelViewMatrixArray)
        }
        u = m.map.image.width / (m.affectedByDistance ? 1 : Aa);
        z[0] = u * w * m.scale.x;
        z[1] = u * m.scale.y;
        c.uniform2f(x.uvScale, m.uvScale.x, m.uvScale.y);
        c.uniform2f(x.uvOffset, m.uvOffset.x, m.uvOffset.y);
        c.uniform2f(x.alignment, m.alignment.x, m.alignment.y);
        c.uniform1f(x.opacity, m.opacity);
        c.uniform1f(x.rotation, m.rotation);
        c.uniform2fv(x.scale, z);
        if (m.mergeWith3D && !y) {
          c.enable(c.DEPTH_TEST);
          y = !0
        } else if (!m.mergeWith3D && y) {
          c.disable(c.DEPTH_TEST);
          y = !1
        }
        Z(m.blending);
        M(m.map, 0);
        c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0)
      }
    }
    c.enable(c.CULL_FACE);
    c.enable(c.DEPTH_TEST);
    c.depthMask($)
  }

  function O(f, s) {
    var k, i, m = f.__webglLensFlares.length, x, w, u, z = new THREE.Vector3, D = Aa / za, n = za * 0.5, y = Aa * 0.5, B = 16 / Aa, K = [B * D, B], J = [1, 1, 0], Y = [1, 1], Q = N.uniforms;
    k = N.attributes;
    c.useProgram(N.program);
    ta = N.program;
    ja = -1;
    if (!rb) {
      c.enableVertexAttribArray(N.attributes.vertex);
      c.enableVertexAttribArray(N.attributes.uv);
      rb = !0
    }
    c.uniform1i(Q.occlusionMap, 0);
    c.uniform1i(Q.map, 1);
    c.bindBuffer(c.ARRAY_BUFFER, N.vertexBuffer);
    c.vertexAttribPointer(k.vertex, 2, c.FLOAT, !1, 16, 0);
    c.vertexAttribPointer(k.uv, 2, c.FLOAT, !1, 16, 8);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, N.elementBuffer);
    c.disable(c.CULL_FACE);
    c.depthMask(!1);
    c.activeTexture(c.TEXTURE0);
    c.bindTexture(c.TEXTURE_2D, N.occlusionTexture);
    c.activeTexture(c.TEXTURE1);
    for (i = 0; i < m; i++) {
      k = f.__webglLensFlares[i].object;
      z.set(k.matrixWorld.n14, k.matrixWorld.n24, k.matrixWorld.n34);
      s.matrixWorldInverse.multiplyVector3(z);
      s.projectionMatrix.multiplyVector3(z);
      J[0] = z.x;
      J[1] = z.y;
      J[2] = z.z;
      Y[0] = J[0] * n + n;
      Y[1] = J[1] * y + y;
      if (N.hasVertexTexture || Y[0] > 0 && Y[0] < za && Y[1] > 0 && Y[1] < Aa) {
        c.bindTexture(c.TEXTURE_2D, N.tempTexture);
        c.copyTexImage2D(c.TEXTURE_2D, 0, c.RGB, Y[0] - 8, Y[1] - 8, 16, 16, 0);
        c.uniform1i(Q.renderType, 0);
        c.uniform2fv(Q.scale, K);
        c.uniform3fv(Q.screenPosition,
          J);
        c.disable(c.BLEND);
        c.enable(c.DEPTH_TEST);
        c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0);
        c.bindTexture(c.TEXTURE_2D, N.occlusionTexture);
        c.copyTexImage2D(c.TEXTURE_2D, 0, c.RGBA, Y[0] - 8, Y[1] - 8, 16, 16, 0);
        c.uniform1i(Q.renderType, 1);
        c.disable(c.DEPTH_TEST);
        c.bindTexture(c.TEXTURE_2D, N.tempTexture);
        c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0);
        k.positionScreen.x = J[0];
        k.positionScreen.y = J[1];
        k.positionScreen.z = J[2];
        k.customUpdateCallback ? k.customUpdateCallback(k) : k.updateLensFlares();
        c.uniform1i(Q.renderType,
          2);
        c.enable(c.BLEND);
        x = 0;
        for (w = k.lensFlares.length; x < w; x++) {
          u = k.lensFlares[x];
          if (u.opacity > 0.001 && u.scale > 0.001) {
            J[0] = u.x;
            J[1] = u.y;
            J[2] = u.z;
            B = u.size * u.scale / Aa;
            K[0] = B * D;
            K[1] = B;
            c.uniform3fv(Q.screenPosition, J);
            c.uniform2fv(Q.scale, K);
            c.uniform1f(Q.rotation, u.rotation);
            c.uniform1f(Q.opacity, u.opacity);
            Z(u.blending);
            M(u.texture, 1);
            c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0)
          }
        }
      }
    }
    c.enable(c.CULL_FACE);
    c.enable(c.DEPTH_TEST);
    c.depthMask($)
  }

  function P(f, s) {
    f._modelViewMatrix.multiplyToArray(s.matrixWorldInverse,
      f.matrixWorld, f._modelViewMatrixArray);
    THREE.Matrix4.makeInvert3x3(f._modelViewMatrix).transposeIntoArray(f._normalMatrixArray)
  }

  function L(f) {
    var s, k, i, m, x;
    if (f instanceof THREE.Mesh) {
      k = f.geometry;
      for (s in k.geometryGroups) {
        i = k.geometryGroups[s];
        x = !1;
        for (m in i.__webglCustomAttributes)if (i.__webglCustomAttributes[m].needsUpdate) {
          x = !0;
          break
        }
        if (k.__dirtyVertices || k.__dirtyMorphTargets || k.__dirtyElements || k.__dirtyUvs || k.__dirtyNormals || k.__dirtyColors || k.__dirtyTangents || x) {
          x = f;
          var w = c.DYNAMIC_DRAW;
          if (i.__inittedArrays) {
            var u = void 0, z = void 0, D = void 0, n = void 0;
            D = void 0;
            var y = void 0, B = void 0, K = void 0, J = void 0, Y = void 0, Q = void 0, da = void 0, Ga = void 0, Va = void 0, S = void 0, U = void 0, V = void 0, pa = void 0;
            B = void 0;
            K = void 0;
            n = void 0;
            J = void 0;
            n = void 0;
            var t = void 0, I = void 0;
            B = void 0;
            t = void 0;
            I = void 0;
            var j = void 0, Ka = void 0;
            t = void 0;
            I = void 0;
            j = void 0;
            Ka = void 0;
            t = void 0;
            I = void 0;
            j = void 0;
            Ka = void 0;
            t = void 0;
            I = void 0;
            j = void 0;
            n = void 0;
            J = void 0;
            y = void 0;
            D = void 0;
            D = void 0;
            t = void 0;
            I = void 0;
            j = void 0;
            var Wa = void 0, ua =
              0, Ba = 0, $a = 0, ab = 0, Ja = 0, La = 0, ga = 0, Ma = 0, wa = 0, A = 0, Ca = 0;
            I = t = 0;
            var Da = i.__vertexArray, hb = i.__uvArray, ib = i.__uv2Array, Qa = i.__normalArray, ka = i.__tangentArray, Ea = i.__colorArray, la = i.__skinVertexAArray, ma = i.__skinVertexBArray, na = i.__skinIndexArray, oa = i.__skinWeightArray, jb = i.__morphTargetsArrays, Ra = i.__webglCustomAttributes;
            j = void 0;
            var Na = i.__faceArray, Oa = i.__lineArray, sb = i.__needsSmoothNormals;
            Q = i.__vertexColorType;
            Y = i.__uvType;
            da = i.__normalType;
            var Ha = x.geometry, kb = Ha.__dirtyVertices, lb = Ha.__dirtyElements,
              gb = Ha.__dirtyUvs, mb = Ha.__dirtyNormals, nb = Ha.__dirtyTangents, ob = Ha.__dirtyColors, pb = Ha.__dirtyMorphTargets, bb = Ha.vertices, tb = i.faces, wb = Ha.faces, ub = Ha.faceVertexUvs[0], vb = Ha.faceVertexUvs[1], cb = Ha.skinVerticesA, db = Ha.skinVerticesB, eb = Ha.skinIndices, Xa = Ha.skinWeights, Za = x instanceof THREE.ShadowVolume ? Ha.edgeFaces : undefined;
            morphTargets = Ha.morphTargets;
            if (Ra)for (Wa in Ra) {
              Ra[Wa].offset = 0;
              Ra[Wa].offsetSrc = 0
            }
            u = 0;
            for (z = tb.length; u < z; u++) {
              D = tb[u];
              n = wb[D];
              ub && (Ga = ub[D]);
              vb && (Va = vb[D]);
              D = n.vertexNormals;
              y = n.normal;
              B = n.vertexColors;
              K = n.color;
              J = n.vertexTangents;
              if (n instanceof THREE.Face3) {
                if (kb) {
                  S = bb[n.a].position;
                  U = bb[n.b].position;
                  V = bb[n.c].position;
                  Da[Ba] = S.x;
                  Da[Ba + 1] = S.y;
                  Da[Ba + 2] = S.z;
                  Da[Ba + 3] = U.x;
                  Da[Ba + 4] = U.y;
                  Da[Ba + 5] = U.z;
                  Da[Ba + 6] = V.x;
                  Da[Ba + 7] = V.y;
                  Da[Ba + 8] = V.z;
                  Ba += 9
                }
                if (Ra)for (Wa in Ra) {
                  j = Ra[Wa];
                  if (j.needsUpdate) {
                    t = j.offset;
                    I = j.offsetSrc;
                    if (j.size === 1) {
                      if (j.boundTo === undefined || j.boundTo === "vertices") {
                        j.array[t + 0] = j.value[n.a];
                        j.array[t + 1] = j.value[n.b];
                        j.array[t + 2] = j.value[n.c]
                      } else if (j.boundTo ===
                        "faces") {
                        j.array[t + 0] = j.value[I];
                        j.array[t + 1] = j.value[I];
                        j.array[t + 2] = j.value[I];
                        j.offsetSrc++
                      } else if (j.boundTo === "faceVertices") {
                        j.array[t + 0] = j.value[I + 0];
                        j.array[t + 1] = j.value[I + 1];
                        j.array[t + 2] = j.value[I + 2];
                        j.offsetSrc += 3
                      }
                      j.offset += 3
                    } else {
                      if (j.boundTo === undefined || j.boundTo === "vertices") {
                        S = j.value[n.a];
                        U = j.value[n.b];
                        V = j.value[n.c]
                      } else if (j.boundTo === "faces") {
                        S = j.value[I];
                        U = j.value[I];
                        V = j.value[I];
                        j.offsetSrc++
                      } else if (j.boundTo === "faceVertices") {
                        S = j.value[I + 0];
                        U = j.value[I + 1];
                        V = j.value[I + 2];
                        j.offsetSrc +=
                          3
                      }
                      if (j.size === 2) {
                        j.array[t + 0] = S.x;
                        j.array[t + 1] = S.y;
                        j.array[t + 2] = U.x;
                        j.array[t + 3] = U.y;
                        j.array[t + 4] = V.x;
                        j.array[t + 5] = V.y;
                        j.offset += 6
                      } else if (j.size === 3) {
                        if (j.type === "c") {
                          j.array[t + 0] = S.r;
                          j.array[t + 1] = S.g;
                          j.array[t + 2] = S.b;
                          j.array[t + 3] = U.r;
                          j.array[t + 4] = U.g;
                          j.array[t + 5] = U.b;
                          j.array[t + 6] = V.r;
                          j.array[t + 7] = V.g;
                          j.array[t + 8] = V.b
                        } else {
                          j.array[t + 0] = S.x;
                          j.array[t + 1] = S.y;
                          j.array[t + 2] = S.z;
                          j.array[t + 3] = U.x;
                          j.array[t + 4] = U.y;
                          j.array[t + 5] = U.z;
                          j.array[t + 6] = V.x;
                          j.array[t + 7] = V.y;
                          j.array[t + 8] = V.z
                        }
                        j.offset += 9
                      } else {
                        j.array[t +
                        0] = S.x;
                        j.array[t + 1] = S.y;
                        j.array[t + 2] = S.z;
                        j.array[t + 3] = S.w;
                        j.array[t + 4] = U.x;
                        j.array[t + 5] = U.y;
                        j.array[t + 6] = U.z;
                        j.array[t + 7] = U.w;
                        j.array[t + 8] = V.x;
                        j.array[t + 9] = V.y;
                        j.array[t + 10] = V.z;
                        j.array[t + 11] = V.w;
                        j.offset += 12
                      }
                    }
                  }
                }
                if (pb) {
                  t = 0;
                  for (I = morphTargets.length; t < I; t++) {
                    S = morphTargets[t].vertices[n.a].position;
                    U = morphTargets[t].vertices[n.b].position;
                    V = morphTargets[t].vertices[n.c].position;
                    j = jb[t];
                    j[Ca + 0] = S.x;
                    j[Ca + 1] = S.y;
                    j[Ca + 2] = S.z;
                    j[Ca + 3] = U.x;
                    j[Ca + 4] = U.y;
                    j[Ca + 5] = U.z;
                    j[Ca + 6] = V.x;
                    j[Ca + 7] = V.y;
                    j[Ca + 8] = V.z
                  }
                  Ca +=
                    9
                }
                if (Xa.length) {
                  t = Xa[n.a];
                  I = Xa[n.b];
                  j = Xa[n.c];
                  oa[A] = t.x;
                  oa[A + 1] = t.y;
                  oa[A + 2] = t.z;
                  oa[A + 3] = t.w;
                  oa[A + 4] = I.x;
                  oa[A + 5] = I.y;
                  oa[A + 6] = I.z;
                  oa[A + 7] = I.w;
                  oa[A + 8] = j.x;
                  oa[A + 9] = j.y;
                  oa[A + 10] = j.z;
                  oa[A + 11] = j.w;
                  t = eb[n.a];
                  I = eb[n.b];
                  j = eb[n.c];
                  na[A] = t.x;
                  na[A + 1] = t.y;
                  na[A + 2] = t.z;
                  na[A + 3] = t.w;
                  na[A + 4] = I.x;
                  na[A + 5] = I.y;
                  na[A + 6] = I.z;
                  na[A + 7] = I.w;
                  na[A + 8] = j.x;
                  na[A + 9] = j.y;
                  na[A + 10] = j.z;
                  na[A + 11] = j.w;
                  t = cb[n.a];
                  I = cb[n.b];
                  j = cb[n.c];
                  la[A] = t.x;
                  la[A + 1] = t.y;
                  la[A + 2] = t.z;
                  la[A + 3] = 1;
                  la[A + 4] = I.x;
                  la[A + 5] = I.y;
                  la[A + 6] = I.z;
                  la[A + 7] = 1;
                  la[A + 8] = j.x;
                  la[A +
                  9] = j.y;
                  la[A + 10] = j.z;
                  la[A + 11] = 1;
                  t = db[n.a];
                  I = db[n.b];
                  j = db[n.c];
                  ma[A] = t.x;
                  ma[A + 1] = t.y;
                  ma[A + 2] = t.z;
                  ma[A + 3] = 1;
                  ma[A + 4] = I.x;
                  ma[A + 5] = I.y;
                  ma[A + 6] = I.z;
                  ma[A + 7] = 1;
                  ma[A + 8] = j.x;
                  ma[A + 9] = j.y;
                  ma[A + 10] = j.z;
                  ma[A + 11] = 1;
                  A += 12
                }
                if (ob && Q) {
                  if (B.length == 3 && Q == THREE.VertexColors) {
                    n = B[0];
                    t = B[1];
                    I = B[2]
                  } else I = t = n = K;
                  Ea[wa] = n.r;
                  Ea[wa + 1] = n.g;
                  Ea[wa + 2] = n.b;
                  Ea[wa + 3] = t.r;
                  Ea[wa + 4] = t.g;
                  Ea[wa + 5] = t.b;
                  Ea[wa + 6] = I.r;
                  Ea[wa + 7] = I.g;
                  Ea[wa + 8] = I.b;
                  wa += 9
                }
                if (nb && Ha.hasTangents) {
                  B = J[0];
                  K = J[1];
                  n = J[2];
                  ka[ga] = B.x;
                  ka[ga + 1] = B.y;
                  ka[ga + 2] = B.z;
                  ka[ga + 3] = B.w;
                  ka[ga + 4] = K.x;
                  ka[ga + 5] = K.y;
                  ka[ga + 6] = K.z;
                  ka[ga + 7] = K.w;
                  ka[ga + 8] = n.x;
                  ka[ga + 9] = n.y;
                  ka[ga + 10] = n.z;
                  ka[ga + 11] = n.w;
                  ga += 12
                }
                if (mb && da)if (D.length == 3 && sb)for (J = 0; J < 3; J++) {
                  y = D[J];
                  Qa[La] = y.x;
                  Qa[La + 1] = y.y;
                  Qa[La + 2] = y.z;
                  La += 3
                } else for (J = 0; J < 3; J++) {
                  Qa[La] = y.x;
                  Qa[La + 1] = y.y;
                  Qa[La + 2] = y.z;
                  La += 3
                }
                if (gb && Ga !== undefined && Y)for (J = 0; J < 3; J++) {
                  D = Ga[J];
                  hb[$a] = D.u;
                  hb[$a + 1] = D.v;
                  $a += 2
                }
                if (gb && Va !== undefined && Y)for (J = 0; J < 3; J++) {
                  D = Va[J];
                  ib[ab] = D.u;
                  ib[ab + 1] = D.v;
                  ab += 2
                }
                if (lb) {
                  Na[Ja] = ua;
                  Na[Ja + 1] = ua + 1;
                  Na[Ja + 2] = ua + 2;
                  Ja += 3;
                  Oa[Ma] = ua;
                  Oa[Ma +
                  1] = ua + 1;
                  Oa[Ma + 2] = ua;
                  Oa[Ma + 3] = ua + 2;
                  Oa[Ma + 4] = ua + 1;
                  Oa[Ma + 5] = ua + 2;
                  Ma += 6;
                  ua += 3
                }
              } else if (n instanceof THREE.Face4) {
                if (kb) {
                  S = bb[n.a].position;
                  U = bb[n.b].position;
                  V = bb[n.c].position;
                  pa = bb[n.d].position;
                  Da[Ba] = S.x;
                  Da[Ba + 1] = S.y;
                  Da[Ba + 2] = S.z;
                  Da[Ba + 3] = U.x;
                  Da[Ba + 4] = U.y;
                  Da[Ba + 5] = U.z;
                  Da[Ba + 6] = V.x;
                  Da[Ba + 7] = V.y;
                  Da[Ba + 8] = V.z;
                  Da[Ba + 9] = pa.x;
                  Da[Ba + 10] = pa.y;
                  Da[Ba + 11] = pa.z;
                  Ba += 12
                }
                if (Ra)for (Wa in Ra) {
                  j = Ra[Wa];
                  if (j.needsUpdate) {
                    t = j.offset;
                    I = j.offsetSrc;
                    if (j.size === 1) {
                      if (j.boundTo === undefined || j.boundTo === "vertices") {
                        j.array[t +
                        0] = j.value[n.a];
                        j.array[t + 1] = j.value[n.b];
                        j.array[t + 2] = j.value[n.c];
                        j.array[t + 3] = j.value[n.d]
                      } else if (j.boundTo === "faces") {
                        j.array[t + 0] = j.value[I];
                        j.array[t + 1] = j.value[I];
                        j.array[t + 2] = j.value[I];
                        j.array[t + 3] = j.value[I];
                        j.offsetSrc++
                      } else if (j.boundTo === "faceVertices") {
                        j.array[t + 0] = j.value[I + 0];
                        j.array[t + 1] = j.value[I + 1];
                        j.array[t + 2] = j.value[I + 2];
                        j.array[t + 3] = j.value[I + 3];
                        j.offsetSrc += 4
                      }
                      j.offset += 4
                    } else {
                      if (j.boundTo === undefined || j.boundTo === "vertices") {
                        S = j.value[n.a];
                        U = j.value[n.b];
                        V = j.value[n.c];
                        pa =
                          j.value[n.d]
                      } else if (j.boundTo === "faces") {
                        S = j.value[I];
                        U = j.value[I];
                        V = j.value[I];
                        pa = j.value[I];
                        j.offsetSrc++
                      } else if (j.boundTo === "faceVertices") {
                        S = j.value[I + 0];
                        U = j.value[I + 1];
                        V = j.value[I + 2];
                        pa = j.value[I + 3];
                        j.offsetSrc += 4
                      }
                      if (j.size === 2) {
                        j.array[t + 0] = S.x;
                        j.array[t + 1] = S.y;
                        j.array[t + 2] = U.x;
                        j.array[t + 3] = U.y;
                        j.array[t + 4] = V.x;
                        j.array[t + 5] = V.y;
                        j.array[t + 6] = pa.x;
                        j.array[t + 7] = pa.y;
                        j.offset += 8
                      } else if (j.size === 3) {
                        if (j.type === "c") {
                          j.array[t + 0] = S.r;
                          j.array[t + 1] = S.g;
                          j.array[t + 2] = S.b;
                          j.array[t + 3] = U.r;
                          j.array[t +
                          4] = U.g;
                          j.array[t + 5] = U.b;
                          j.array[t + 6] = V.r;
                          j.array[t + 7] = V.g;
                          j.array[t + 8] = V.b;
                          j.array[t + 9] = pa.r;
                          j.array[t + 10] = pa.g;
                          j.array[t + 11] = pa.b
                        } else {
                          j.array[t + 0] = S.x;
                          j.array[t + 1] = S.y;
                          j.array[t + 2] = S.z;
                          j.array[t + 3] = U.x;
                          j.array[t + 4] = U.y;
                          j.array[t + 5] = U.z;
                          j.array[t + 6] = V.x;
                          j.array[t + 7] = V.y;
                          j.array[t + 8] = V.z;
                          j.array[t + 9] = pa.x;
                          j.array[t + 10] = pa.y;
                          j.array[t + 11] = pa.z
                        }
                        j.offset += 12
                      } else {
                        j.array[t + 0] = S.x;
                        j.array[t + 1] = S.y;
                        j.array[t + 2] = S.z;
                        j.array[t + 3] = S.w;
                        j.array[t + 4] = U.x;
                        j.array[t + 5] = U.y;
                        j.array[t + 6] = U.z;
                        j.array[t + 7] = U.w;
                        j.array[t +
                        8] = V.x;
                        j.array[t + 9] = V.y;
                        j.array[t + 10] = V.z;
                        j.array[t + 11] = V.w;
                        j.array[t + 12] = pa.x;
                        j.array[t + 13] = pa.y;
                        j.array[t + 14] = pa.z;
                        j.array[t + 15] = pa.w;
                        j.offset += 16
                      }
                    }
                  }
                }
                if (pb) {
                  t = 0;
                  for (I = morphTargets.length; t < I; t++) {
                    S = morphTargets[t].vertices[n.a].position;
                    U = morphTargets[t].vertices[n.b].position;
                    V = morphTargets[t].vertices[n.c].position;
                    pa = morphTargets[t].vertices[n.d].position;
                    j = jb[t];
                    j[Ca + 0] = S.x;
                    j[Ca + 1] = S.y;
                    j[Ca + 2] = S.z;
                    j[Ca + 3] = U.x;
                    j[Ca + 4] = U.y;
                    j[Ca + 5] = U.z;
                    j[Ca + 6] = V.x;
                    j[Ca + 7] = V.y;
                    j[Ca + 8] = V.z;
                    j[Ca + 9] = pa.x;
                    j[Ca + 10] =
                      pa.y;
                    j[Ca + 11] = pa.z
                  }
                  Ca += 12
                }
                if (Xa.length) {
                  t = Xa[n.a];
                  I = Xa[n.b];
                  j = Xa[n.c];
                  Ka = Xa[n.d];
                  oa[A] = t.x;
                  oa[A + 1] = t.y;
                  oa[A + 2] = t.z;
                  oa[A + 3] = t.w;
                  oa[A + 4] = I.x;
                  oa[A + 5] = I.y;
                  oa[A + 6] = I.z;
                  oa[A + 7] = I.w;
                  oa[A + 8] = j.x;
                  oa[A + 9] = j.y;
                  oa[A + 10] = j.z;
                  oa[A + 11] = j.w;
                  oa[A + 12] = Ka.x;
                  oa[A + 13] = Ka.y;
                  oa[A + 14] = Ka.z;
                  oa[A + 15] = Ka.w;
                  t = eb[n.a];
                  I = eb[n.b];
                  j = eb[n.c];
                  Ka = eb[n.d];
                  na[A] = t.x;
                  na[A + 1] = t.y;
                  na[A + 2] = t.z;
                  na[A + 3] = t.w;
                  na[A + 4] = I.x;
                  na[A + 5] = I.y;
                  na[A + 6] = I.z;
                  na[A + 7] = I.w;
                  na[A + 8] = j.x;
                  na[A + 9] = j.y;
                  na[A + 10] = j.z;
                  na[A + 11] = j.w;
                  na[A + 12] = Ka.x;
                  na[A + 13] = Ka.y;
                  na[A + 14] =
                    Ka.z;
                  na[A + 15] = Ka.w;
                  t = cb[n.a];
                  I = cb[n.b];
                  j = cb[n.c];
                  Ka = cb[n.d];
                  la[A] = t.x;
                  la[A + 1] = t.y;
                  la[A + 2] = t.z;
                  la[A + 3] = 1;
                  la[A + 4] = I.x;
                  la[A + 5] = I.y;
                  la[A + 6] = I.z;
                  la[A + 7] = 1;
                  la[A + 8] = j.x;
                  la[A + 9] = j.y;
                  la[A + 10] = j.z;
                  la[A + 11] = 1;
                  la[A + 12] = Ka.x;
                  la[A + 13] = Ka.y;
                  la[A + 14] = Ka.z;
                  la[A + 15] = 1;
                  t = db[n.a];
                  I = db[n.b];
                  j = db[n.c];
                  n = db[n.d];
                  ma[A] = t.x;
                  ma[A + 1] = t.y;
                  ma[A + 2] = t.z;
                  ma[A + 3] = 1;
                  ma[A + 4] = I.x;
                  ma[A + 5] = I.y;
                  ma[A + 6] = I.z;
                  ma[A + 7] = 1;
                  ma[A + 8] = j.x;
                  ma[A + 9] = j.y;
                  ma[A + 10] = j.z;
                  ma[A + 11] = 1;
                  ma[A + 12] = n.x;
                  ma[A + 13] = n.y;
                  ma[A + 14] = n.z;
                  ma[A + 15] = 1;
                  A += 16
                }
                if (ob && Q) {
                  if (B.length ==
                    4 && Q == THREE.VertexColors) {
                    n = B[0];
                    t = B[1];
                    I = B[2];
                    B = B[3]
                  } else B = I = t = n = K;
                  Ea[wa] = n.r;
                  Ea[wa + 1] = n.g;
                  Ea[wa + 2] = n.b;
                  Ea[wa + 3] = t.r;
                  Ea[wa + 4] = t.g;
                  Ea[wa + 5] = t.b;
                  Ea[wa + 6] = I.r;
                  Ea[wa + 7] = I.g;
                  Ea[wa + 8] = I.b;
                  Ea[wa + 9] = B.r;
                  Ea[wa + 10] = B.g;
                  Ea[wa + 11] = B.b;
                  wa += 12
                }
                if (nb && Ha.hasTangents) {
                  B = J[0];
                  K = J[1];
                  n = J[2];
                  J = J[3];
                  ka[ga] = B.x;
                  ka[ga + 1] = B.y;
                  ka[ga + 2] = B.z;
                  ka[ga + 3] = B.w;
                  ka[ga + 4] = K.x;
                  ka[ga + 5] = K.y;
                  ka[ga + 6] = K.z;
                  ka[ga + 7] = K.w;
                  ka[ga + 8] = n.x;
                  ka[ga + 9] = n.y;
                  ka[ga + 10] = n.z;
                  ka[ga + 11] = n.w;
                  ka[ga + 12] = J.x;
                  ka[ga + 13] = J.y;
                  ka[ga + 14] = J.z;
                  ka[ga + 15] = J.w;
                  ga += 16
                }
                if (mb &&
                  da)if (D.length == 4 && sb)for (J = 0; J < 4; J++) {
                  y = D[J];
                  Qa[La] = y.x;
                  Qa[La + 1] = y.y;
                  Qa[La + 2] = y.z;
                  La += 3
                } else for (J = 0; J < 4; J++) {
                  Qa[La] = y.x;
                  Qa[La + 1] = y.y;
                  Qa[La + 2] = y.z;
                  La += 3
                }
                if (gb && Ga !== undefined && Y)for (J = 0; J < 4; J++) {
                  D = Ga[J];
                  hb[$a] = D.u;
                  hb[$a + 1] = D.v;
                  $a += 2
                }
                if (gb && Va !== undefined && Y)for (J = 0; J < 4; J++) {
                  D = Va[J];
                  ib[ab] = D.u;
                  ib[ab + 1] = D.v;
                  ab += 2
                }
                if (lb) {
                  Na[Ja] = ua;
                  Na[Ja + 1] = ua + 1;
                  Na[Ja + 2] = ua + 3;
                  Na[Ja + 3] = ua + 1;
                  Na[Ja + 4] = ua + 2;
                  Na[Ja + 5] = ua + 3;
                  Ja += 6;
                  Oa[Ma] = ua;
                  Oa[Ma + 1] = ua + 1;
                  Oa[Ma + 2] = ua;
                  Oa[Ma + 3] = ua + 3;
                  Oa[Ma + 4] = ua + 1;
                  Oa[Ma + 5] = ua + 2;
                  Oa[Ma + 6] = ua + 2;
                  Oa[Ma +
                  7] = ua + 3;
                  Ma += 8;
                  ua += 4
                }
              }
            }
            if (Za) {
              u = 0;
              for (z = Za.length; u < z; u++) {
                Na[Ja] = Za[u].a;
                Na[Ja + 1] = Za[u].b;
                Na[Ja + 2] = Za[u].c;
                Na[Ja + 3] = Za[u].a;
                Na[Ja + 4] = Za[u].c;
                Na[Ja + 5] = Za[u].d;
                Ja += 6
              }
            }
            if (kb) {
              c.bindBuffer(c.ARRAY_BUFFER, i.__webglVertexBuffer);
              c.bufferData(c.ARRAY_BUFFER, Da, w)
            }
            if (Ra)for (Wa in Ra) {
              j = Ra[Wa];
              if (j.needsUpdate) {
                c.bindBuffer(c.ARRAY_BUFFER, j.buffer);
                c.bufferData(c.ARRAY_BUFFER, j.array, w);
                j.needsUpdate = !1
              }
            }
            if (pb) {
              t = 0;
              for (I = morphTargets.length; t < I; t++) {
                c.bindBuffer(c.ARRAY_BUFFER, i.__webglMorphTargetsBuffers[t]);
                c.bufferData(c.ARRAY_BUFFER, jb[t], w)
              }
            }
            if (ob && wa > 0) {
              c.bindBuffer(c.ARRAY_BUFFER, i.__webglColorBuffer);
              c.bufferData(c.ARRAY_BUFFER, Ea, w)
            }
            if (mb) {
              c.bindBuffer(c.ARRAY_BUFFER, i.__webglNormalBuffer);
              c.bufferData(c.ARRAY_BUFFER, Qa, w)
            }
            if (nb && Ha.hasTangents) {
              c.bindBuffer(c.ARRAY_BUFFER, i.__webglTangentBuffer);
              c.bufferData(c.ARRAY_BUFFER, ka, w)
            }
            if (gb && $a > 0) {
              c.bindBuffer(c.ARRAY_BUFFER, i.__webglUVBuffer);
              c.bufferData(c.ARRAY_BUFFER, hb, w)
            }
            if (gb && ab > 0) {
              c.bindBuffer(c.ARRAY_BUFFER, i.__webglUV2Buffer);
              c.bufferData(c.ARRAY_BUFFER,
                ib, w)
            }
            if (lb) {
              c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, i.__webglFaceBuffer);
              c.bufferData(c.ELEMENT_ARRAY_BUFFER, Na, w);
              c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, i.__webglLineBuffer);
              c.bufferData(c.ELEMENT_ARRAY_BUFFER, Oa, w)
            }
            if (A > 0) {
              c.bindBuffer(c.ARRAY_BUFFER, i.__webglSkinVertexABuffer);
              c.bufferData(c.ARRAY_BUFFER, la, w);
              c.bindBuffer(c.ARRAY_BUFFER, i.__webglSkinVertexBBuffer);
              c.bufferData(c.ARRAY_BUFFER, ma, w);
              c.bindBuffer(c.ARRAY_BUFFER, i.__webglSkinIndicesBuffer);
              c.bufferData(c.ARRAY_BUFFER, na, w);
              c.bindBuffer(c.ARRAY_BUFFER,
                i.__webglSkinWeightsBuffer);
              c.bufferData(c.ARRAY_BUFFER, oa, w)
            }
            if (!x.dynamic) {
              delete i.__inittedArrays;
              delete i.__colorArray;
              delete i.__normalArray;
              delete i.__tangentArray;
              delete i.__uvArray;
              delete i.__uv2Array;
              delete i.__faceArray;
              delete i.__vertexArray;
              delete i.__lineArray;
              delete i.__skinVertexAArray;
              delete i.__skinVertexBArray;
              delete i.__skinIndexArray;
              delete i.__skinWeightArray
            }
          }
        }
      }
      k.__dirtyVertices = !1;
      k.__dirtyMorphTargets = !1;
      k.__dirtyElements = !1;
      k.__dirtyUvs = !1;
      k.__dirtyNormals = !1;
      k.__dirtyTangents = !1;
      k.__dirtyColors = !1
    } else if (f instanceof THREE.Ribbon) {
      k = f.geometry;
      if (k.__dirtyVertices || k.__dirtyColors) {
        f = k;
        s = c.DYNAMIC_DRAW;
        Y = f.vertices;
        i = f.colors;
        Q = Y.length;
        x = i.length;
        da = f.__vertexArray;
        w = f.__colorArray;
        Ga = f.__dirtyColors;
        if (f.__dirtyVertices) {
          for (u = 0; u < Q; u++) {
            z = Y[u].position;
            m = u * 3;
            da[m] = z.x;
            da[m + 1] = z.y;
            da[m + 2] = z.z
          }
          c.bindBuffer(c.ARRAY_BUFFER, f.__webglVertexBuffer);
          c.bufferData(c.ARRAY_BUFFER, da, s)
        }
        if (Ga) {
          for (u = 0; u < x; u++) {
            color = i[u];
            m = u * 3;
            w[m] = color.r;
            w[m + 1] = color.g;
            w[m + 2] = color.b
          }
          c.bindBuffer(c.ARRAY_BUFFER,
            f.__webglColorBuffer);
          c.bufferData(c.ARRAY_BUFFER, w, s)
        }
      }
      k.__dirtyVertices = !1;
      k.__dirtyColors = !1
    } else if (f instanceof THREE.Line) {
      k = f.geometry;
      if (k.__dirtyVertices || k.__dirtyColors) {
        f = k;
        s = c.DYNAMIC_DRAW;
        Y = f.vertices;
        i = f.colors;
        Q = Y.length;
        x = i.length;
        da = f.__vertexArray;
        w = f.__colorArray;
        Ga = f.__dirtyColors;
        if (f.__dirtyVertices) {
          for (u = 0; u < Q; u++) {
            z = Y[u].position;
            m = u * 3;
            da[m] = z.x;
            da[m + 1] = z.y;
            da[m + 2] = z.z
          }
          c.bindBuffer(c.ARRAY_BUFFER, f.__webglVertexBuffer);
          c.bufferData(c.ARRAY_BUFFER, da, s)
        }
        if (Ga) {
          for (u = 0; u < x; u++) {
            color =
              i[u];
            m = u * 3;
            w[m] = color.r;
            w[m + 1] = color.g;
            w[m + 2] = color.b
          }
          c.bindBuffer(c.ARRAY_BUFFER, f.__webglColorBuffer);
          c.bufferData(c.ARRAY_BUFFER, w, s)
        }
      }
      k.__dirtyVertices = !1;
      k.__dirtyColors = !1
    } else if (f instanceof THREE.ParticleSystem) {
      k = f.geometry;
      (k.__dirtyVertices || k.__dirtyColors || f.sortParticles) && d(k, c.DYNAMIC_DRAW, f);
      k.__dirtyVertices = !1;
      k.__dirtyColors = !1
    }
  }

  function ea(f) {
    function s(B) {
      var K = [];
      k = 0;
      for (i = B.length; k < i; k++)B[k] == undefined ? K.push("undefined") : K.push(B[k].id);
      return K.join("_")
    }

    var k, i, m, x, w,
      u, z, D, n = {}, y = f.morphTargets !== undefined ? f.morphTargets.length : 0;
    f.geometryGroups = {};
    m = 0;
    for (x = f.faces.length; m < x; m++) {
      w = f.faces[m];
      u = w.materials;
      z = s(u);
      n[z] == undefined && (n[z] = {hash: z, counter: 0});
      D = n[z].hash + "_" + n[z].counter;
      f.geometryGroups[D] == undefined && (f.geometryGroups[D] = {faces: [], materials: u, vertices: 0, numMorphTargets: y});
      w = w instanceof THREE.Face3 ? 3 : 4;
      if (f.geometryGroups[D].vertices + w > 65535) {
        n[z].counter += 1;
        D = n[z].hash + "_" + n[z].counter;
        f.geometryGroups[D] == undefined && (f.geometryGroups[D] = {
          faces: [],
          materials: u, vertices: 0, numMorphTargets: y
        })
      }
      f.geometryGroups[D].faces.push(m);
      f.geometryGroups[D].vertices += w
    }
  }

  function W(f, s, k) {
    f.push({buffer: s, object: k, opaque: {list: [], count: 0}, transparent: {list: [], count: 0}})
  }

  function Z(f) {
    if (f != ja) {
      switch (f) {
        case THREE.AdditiveBlending:
          c.blendEquation(c.FUNC_ADD);
          c.blendFunc(c.SRC_ALPHA, c.ONE);
          break;
        case THREE.SubtractiveBlending:
          c.blendEquation(c.FUNC_ADD);
          c.blendFunc(c.ZERO, c.ONE_MINUS_SRC_COLOR);
          break;
        case THREE.MultiplyBlending:
          c.blendEquation(c.FUNC_ADD);
          c.blendFunc(c.ZERO, c.SRC_COLOR);
          break;
        default:
          c.blendEquationSeparate(c.FUNC_ADD, c.FUNC_ADD);
          c.blendFuncSeparate(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA, c.ONE, c.ONE_MINUS_SRC_ALPHA)
      }
      ja = f
    }
  }

  function X(f, s, k) {
    if ((k.width & k.width - 1) == 0 && (k.height & k.height - 1) == 0) {
      c.texParameteri(f, c.TEXTURE_WRAP_S, ha(s.wrapS));
      c.texParameteri(f, c.TEXTURE_WRAP_T, ha(s.wrapT));
      c.texParameteri(f, c.TEXTURE_MAG_FILTER, ha(s.magFilter));
      c.texParameteri(f, c.TEXTURE_MIN_FILTER, ha(s.minFilter));
      c.generateMipmap(f)
    } else {
      c.texParameteri(f,
        c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
      c.texParameteri(f, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
      c.texParameteri(f, c.TEXTURE_MAG_FILTER, Fa(s.magFilter));
      c.texParameteri(f, c.TEXTURE_MIN_FILTER, Fa(s.minFilter))
    }
  }

  function M(f, s) {
    if (f.needsUpdate) {
      if (f.__webglInit) {
        c.bindTexture(c.TEXTURE_2D, f.__webglTexture);
        c.texSubImage2D(c.TEXTURE_2D, 0, 0, 0, c.RGBA, c.UNSIGNED_BYTE, f.image)
      } else {
        f.__webglTexture = c.createTexture();
        c.bindTexture(c.TEXTURE_2D, f.__webglTexture);
        c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE,
          f.image);
        f.__webglInit = !0
      }
      X(c.TEXTURE_2D, f, f.image);
      c.bindTexture(c.TEXTURE_2D, null);
      f.needsUpdate = !1
    }
    c.activeTexture(c.TEXTURE0 + s);
    c.bindTexture(c.TEXTURE_2D, f.__webglTexture)
  }

  function Ia(f) {
    if (f && !f.__webglFramebuffer) {
      if (f.depthBuffer === undefined)f.depthBuffer = !0;
      if (f.stencilBuffer === undefined)f.stencilBuffer = !0;
      f.__webglFramebuffer = c.createFramebuffer();
      f.__webglRenderbuffer = c.createRenderbuffer();
      f.__webglTexture = c.createTexture();
      c.bindTexture(c.TEXTURE_2D, f.__webglTexture);
      c.texParameteri(c.TEXTURE_2D,
        c.TEXTURE_WRAP_S, ha(f.wrapS));
      c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, ha(f.wrapT));
      c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, ha(f.magFilter));
      c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, ha(f.minFilter));
      c.texImage2D(c.TEXTURE_2D, 0, ha(f.format), f.width, f.height, 0, ha(f.format), ha(f.type), null);
      c.bindRenderbuffer(c.RENDERBUFFER, f.__webglRenderbuffer);
      c.bindFramebuffer(c.FRAMEBUFFER, f.__webglFramebuffer);
      c.framebufferTexture2D(c.FRAMEBUFFER, c.COLOR_ATTACHMENT0, c.TEXTURE_2D, f.__webglTexture,
        0);
      if (f.depthBuffer && !f.stencilBuffer) {
        c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_COMPONENT16, f.width, f.height);
        c.framebufferRenderbuffer(c.FRAMEBUFFER, c.DEPTH_ATTACHMENT, c.RENDERBUFFER, f.__webglRenderbuffer)
      } else if (f.depthBuffer && f.stencilBuffer) {
        c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_STENCIL, f.width, f.height);
        c.framebufferRenderbuffer(c.FRAMEBUFFER, c.DEPTH_STENCIL_ATTACHMENT, c.RENDERBUFFER, f.__webglRenderbuffer)
      } else c.renderbufferStorage(c.RENDERBUFFER, c.RGBA4, f.width, f.height);
      c.bindTexture(c.TEXTURE_2D,
        null);
      c.bindRenderbuffer(c.RENDERBUFFER, null);
      c.bindFramebuffer(c.FRAMEBUFFER, null)
    }
    var s, k;
    if (f) {
      s = f.__webglFramebuffer;
      k = f.width;
      f = f.height
    } else {
      s = null;
      k = za;
      f = Aa
    }
    if (s != ya) {
      c.bindFramebuffer(c.FRAMEBUFFER, s);
      c.viewport(va, sa, k, f);
      ya = s
    }
  }

  function fa(f, s) {
    var k;
    if (f == "fragment")k = c.createShader(c.FRAGMENT_SHADER); else f == "vertex" && (k = c.createShader(c.VERTEX_SHADER));
    c.shaderSource(k, s);
    c.compileShader(k);
    if (!c.getShaderParameter(k, c.COMPILE_STATUS)) {
      console.error(c.getShaderInfoLog(k));
      console.error(s);
      return null
    }
    return k
  }

  function Fa(f) {
    switch (f) {
      case THREE.NearestFilter:
      case THREE.NearestMipMapNearestFilter:
      case THREE.NearestMipMapLinearFilter:
        return c.NEAREST;
      default:
        return c.LINEAR
    }
  }

  function ha(f) {
    switch (f) {
      case THREE.RepeatWrapping:
        return c.REPEAT;
      case THREE.ClampToEdgeWrapping:
        return c.CLAMP_TO_EDGE;
      case THREE.MirroredRepeatWrapping:
        return c.MIRRORED_REPEAT;
      case THREE.NearestFilter:
        return c.NEAREST;
      case THREE.NearestMipMapNearestFilter:
        return c.NEAREST_MIPMAP_NEAREST;
      case THREE.NearestMipMapLinearFilter:
        return c.NEAREST_MIPMAP_LINEAR;
      case THREE.LinearFilter:
        return c.LINEAR;
      case THREE.LinearMipMapNearestFilter:
        return c.LINEAR_MIPMAP_NEAREST;
      case THREE.LinearMipMapLinearFilter:
        return c.LINEAR_MIPMAP_LINEAR;
      case THREE.ByteType:
        return c.BYTE;
      case THREE.UnsignedByteType:
        return c.UNSIGNED_BYTE;
      case THREE.ShortType:
        return c.SHORT;
      case THREE.UnsignedShortType:
        return c.UNSIGNED_SHORT;
      case THREE.IntType:
        return c.INT;
      case THREE.UnsignedShortType:
        return c.UNSIGNED_INT;
      case THREE.FloatType:
        return c.FLOAT;
      case THREE.AlphaFormat:
        return c.ALPHA;
      case THREE.RGBFormat:
        return c.RGB;
      case THREE.RGBAFormat:
        return c.RGBA;
      case THREE.LuminanceFormat:
        return c.LUMINANCE;
      case THREE.LuminanceAlphaFormat:
        return c.LUMINANCE_ALPHA
    }
    return 0
  }

  var T = this, c, ia = document.createElement("canvas"), xa = [], ta = null, ya = null, $ = !0, qa = null, ra = null, ja = null, aa = null, va = 0, sa = 0, za = 0, Aa = 0, ca = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4], Pa = new THREE.Matrix4, Ta = new Float32Array(16), Ya = new Float32Array(16), Ua = new THREE.Vector4,
    Sa = {ambient: [0, 0, 0], directional: {length: 0, colors: [], positions: []}, point: {length: 0, colors: [], positions: [], distances: []}};
  b = b || {};
  stencil = b.stencil !== undefined ? b.stencil : !0;
  antialias = b.antialias !== undefined ? b.antialias : !1;
  clearColor = b.clearColor !== undefined ? new THREE.Color(b.clearColor) : new THREE.Color(0);
  clearAlpha = b.clearAlpha !== undefined ? b.clearAlpha : 0;
  this.data = {vertices: 0, faces: 0, drawCalls: 0};
  this.maxMorphTargets = 8;
  this.domElement = ia;
  this.autoClear = !0;
  this.sortObjects = !0;
  (function (f, s, k, i) {
    try {
      if (!(c =
          ia.getContext("experimental-webgl", {antialias: f, stencil: i})))throw"Error creating WebGL context.";
    } catch (m) {
      console.error(m)
    }
    console.log(navigator.userAgent + " | " + c.getParameter(c.VERSION) + " | " + c.getParameter(c.VENDOR) + " | " + c.getParameter(c.RENDERER) + " | " + c.getParameter(c.SHADING_LANGUAGE_VERSION));
    c.clearColor(0, 0, 0, 1);
    c.clearDepth(1);
    c.enable(c.DEPTH_TEST);
    c.depthFunc(c.LEQUAL);
    c.frontFace(c.CCW);
    c.cullFace(c.BACK);
    c.enable(c.CULL_FACE);
    c.enable(c.BLEND);
    c.blendEquation(c.FUNC_ADD);
    c.blendFunc(c.SRC_ALPHA,
      c.ONE_MINUS_SRC_ALPHA);
    c.clearColor(s.r, s.g, s.b, k)
  })(antialias, clearColor, clearAlpha, stencil);
  this.context = c;
  var fb = c.getParameter(c.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0;
  if (stencil) {
    var R = {};
    R.vertices = new Float32Array(12);
    R.faces = new Uint16Array(6);
    R.darkness = 0.5;
    R.vertices[0] = -20;
    R.vertices[1] = -20;
    R.vertices[2] = -1;
    R.vertices[3] = 20;
    R.vertices[4] = -20;
    R.vertices[5] = -1;
    R.vertices[6] = 20;
    R.vertices[7] = 20;
    R.vertices[8] = -1;
    R.vertices[9] = -20;
    R.vertices[10] = 20;
    R.vertices[11] = -1;
    R.faces[0] = 0;
    R.faces[1] = 1;
    R.faces[2] =
      2;
    R.faces[3] = 0;
    R.faces[4] = 2;
    R.faces[5] = 3;
    R.vertexBuffer = c.createBuffer();
    R.elementBuffer = c.createBuffer();
    c.bindBuffer(c.ARRAY_BUFFER, R.vertexBuffer);
    c.bufferData(c.ARRAY_BUFFER, R.vertices, c.STATIC_DRAW);
    c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, R.elementBuffer);
    c.bufferData(c.ELEMENT_ARRAY_BUFFER, R.faces, c.STATIC_DRAW);
    R.program = c.createProgram();
    c.attachShader(R.program, fa("fragment", THREE.ShaderLib.shadowPost.fragmentShader));
    c.attachShader(R.program, fa("vertex", THREE.ShaderLib.shadowPost.vertexShader));
    c.linkProgram(R.program);
    R.vertexLocation = c.getAttribLocation(R.program, "position");
    R.projectionLocation = c.getUniformLocation(R.program, "projectionMatrix");
    R.darknessLocation = c.getUniformLocation(R.program, "darkness")
  }
  var N = {};
  N.vertices = new Float32Array(16);
  N.faces = new Uint16Array(6);
  b = 0;
  N.vertices[b++] = -1;
  N.vertices[b++] = -1;
  N.vertices[b++] = 0;
  N.vertices[b++] = 0;
  N.vertices[b++] = 1;
  N.vertices[b++] = -1;
  N.vertices[b++] = 1;
  N.vertices[b++] = 0;
  N.vertices[b++] = 1;
  N.vertices[b++] = 1;
  N.vertices[b++] = 1;
  N.vertices[b++] =
    1;
  N.vertices[b++] = -1;
  N.vertices[b++] = 1;
  N.vertices[b++] = 0;
  N.vertices[b++] = 1;
  b = 0;
  N.faces[b++] = 0;
  N.faces[b++] = 1;
  N.faces[b++] = 2;
  N.faces[b++] = 0;
  N.faces[b++] = 2;
  N.faces[b++] = 3;
  N.vertexBuffer = c.createBuffer();
  N.elementBuffer = c.createBuffer();
  N.tempTexture = c.createTexture();
  N.occlusionTexture = c.createTexture();
  c.bindBuffer(c.ARRAY_BUFFER, N.vertexBuffer);
  c.bufferData(c.ARRAY_BUFFER, N.vertices, c.STATIC_DRAW);
  c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, N.elementBuffer);
  c.bufferData(c.ELEMENT_ARRAY_BUFFER, N.faces, c.STATIC_DRAW);
  c.bindTexture(c.TEXTURE_2D, N.tempTexture);
  c.texImage2D(c.TEXTURE_2D, 0, c.RGB, 16, 16, 0, c.RGB, c.UNSIGNED_BYTE, null);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST);
  c.bindTexture(c.TEXTURE_2D, N.occlusionTexture);
  c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, 16, 16, 0, c.RGBA, c.UNSIGNED_BYTE, null);
  c.texParameteri(c.TEXTURE_2D,
    c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST);
  if (c.getParameter(c.MAX_VERTEX_TEXTURE_IMAGE_UNITS) <= 0) {
    N.hasVertexTexture = !1;
    N.program = c.createProgram();
    c.attachShader(N.program, fa("fragment", THREE.ShaderLib.lensFlare.fragmentShader));
    c.attachShader(N.program, fa("vertex", THREE.ShaderLib.lensFlare.vertexShader))
  } else {
    N.hasVertexTexture = !0;
    N.program = c.createProgram();
    c.attachShader(N.program, fa("fragment", THREE.ShaderLib.lensFlareVertexTexture.fragmentShader));
    c.attachShader(N.program, fa("vertex", THREE.ShaderLib.lensFlareVertexTexture.vertexShader))
  }
  c.linkProgram(N.program);
  N.attributes = {};
  N.uniforms = {};
  N.attributes.vertex = c.getAttribLocation(N.program, "position");
  N.attributes.uv = c.getAttribLocation(N.program, "UV");
  N.uniforms.renderType = c.getUniformLocation(N.program, "renderType");
  N.uniforms.map = c.getUniformLocation(N.program, "map");
  N.uniforms.occlusionMap = c.getUniformLocation(N.program, "occlusionMap");
  N.uniforms.opacity = c.getUniformLocation(N.program, "opacity");
  N.uniforms.scale = c.getUniformLocation(N.program, "scale");
  N.uniforms.rotation = c.getUniformLocation(N.program, "rotation");
  N.uniforms.screenPosition = c.getUniformLocation(N.program, "screenPosition");
  var rb = !1;
  _sprite = {};
  _sprite.vertices = new Float32Array(16);
  _sprite.faces = new Uint16Array(6);
  b = 0;
  _sprite.vertices[b++] = -1;
  _sprite.vertices[b++] = -1;
  _sprite.vertices[b++] = 0;
  _sprite.vertices[b++] =
    0;
  _sprite.vertices[b++] = 1;
  _sprite.vertices[b++] = -1;
  _sprite.vertices[b++] = 1;
  _sprite.vertices[b++] = 0;
  _sprite.vertices[b++] = 1;
  _sprite.vertices[b++] = 1;
  _sprite.vertices[b++] = 1;
  _sprite.vertices[b++] = 1;
  _sprite.vertices[b++] = -1;
  _sprite.vertices[b++] = 1;
  _sprite.vertices[b++] = 0;
  _sprite.vertices[b++] = 1;
  b = 0;
  _sprite.faces[b++] = 0;
  _sprite.faces[b++] = 1;
  _sprite.faces[b++] = 2;
  _sprite.faces[b++] = 0;
  _sprite.faces[b++] = 2;
  _sprite.faces[b++] = 3;
  _sprite.vertexBuffer = c.createBuffer();
  _sprite.elementBuffer = c.createBuffer();
  c.bindBuffer(c.ARRAY_BUFFER,
    _sprite.vertexBuffer);
  c.bufferData(c.ARRAY_BUFFER, _sprite.vertices, c.STATIC_DRAW);
  c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer);
  c.bufferData(c.ELEMENT_ARRAY_BUFFER, _sprite.faces, c.STATIC_DRAW);
  _sprite.program = c.createProgram();
  c.attachShader(_sprite.program, fa("fragment", THREE.ShaderLib.sprite.fragmentShader));
  c.attachShader(_sprite.program, fa("vertex", THREE.ShaderLib.sprite.vertexShader));
  c.linkProgram(_sprite.program);
  _sprite.attributes = {};
  _sprite.uniforms = {};
  _sprite.attributes.position =
    c.getAttribLocation(_sprite.program, "position");
  _sprite.attributes.uv = c.getAttribLocation(_sprite.program, "uv");
  _sprite.uniforms.uvOffset = c.getUniformLocation(_sprite.program, "uvOffset");
  _sprite.uniforms.uvScale = c.getUniformLocation(_sprite.program, "uvScale");
  _sprite.uniforms.rotation = c.getUniformLocation(_sprite.program, "rotation");
  _sprite.uniforms.scale = c.getUniformLocation(_sprite.program, "scale");
  _sprite.uniforms.alignment = c.getUniformLocation(_sprite.program, "alignment");
  _sprite.uniforms.map =
    c.getUniformLocation(_sprite.program, "map");
  _sprite.uniforms.opacity = c.getUniformLocation(_sprite.program, "opacity");
  _sprite.uniforms.useScreenCoordinates = c.getUniformLocation(_sprite.program, "useScreenCoordinates");
  _sprite.uniforms.affectedByDistance = c.getUniformLocation(_sprite.program, "affectedByDistance");
  _sprite.uniforms.screenPosition = c.getUniformLocation(_sprite.program, "screenPosition");
  _sprite.uniforms.modelViewMatrix = c.getUniformLocation(_sprite.program, "modelViewMatrix");
  _sprite.uniforms.projectionMatrix =
    c.getUniformLocation(_sprite.program, "projectionMatrix");
  var qb = !1;
  this.setSize = function (f, s) {
    ia.width = f;
    ia.height = s;
    this.setViewport(0, 0, ia.width, ia.height)
  };
  this.setViewport = function (f, s, k, i) {
    va = f;
    sa = s;
    za = k;
    Aa = i;
    c.viewport(va, sa, za, Aa)
  };
  this.setScissor = function (f, s, k, i) {
    c.scissor(f, s, k, i)
  };
  this.enableScissorTest = function (f) {
    f ? c.enable(c.SCISSOR_TEST) : c.disable(c.SCISSOR_TEST)
  };
  this.enableDepthBufferWrite = function (f) {
    $ = f;
    c.depthMask(f)
  };
  this.setClearColorHex = function (f, s) {
    var k = new THREE.Color(f);
    c.clearColor(k.r, k.g, k.b, s)
  };
  this.setClearColor = function (f, s) {
    c.clearColor(f.r, f.g, f.b, s)
  };
  this.clear = function () {
    c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT | c.STENCIL_BUFFER_BIT)
  };
  this.setStencilShadowDarkness = function (f) {
    R.darkness = f
  };
  this.getContext = function () {
    return c
  };
  this.initMaterial = function (f, s, k, i) {
    var m, x, w;
    if (f instanceof THREE.MeshDepthMaterial)w = "depth"; else if (f instanceof THREE.ShadowVolumeDynamicMaterial)w = "shadowVolumeDynamic"; else if (f instanceof THREE.MeshNormalMaterial)w = "normal";
    else if (f instanceof THREE.MeshBasicMaterial)w = "basic"; else if (f instanceof THREE.MeshLambertMaterial)w = "lambert"; else if (f instanceof THREE.MeshPhongMaterial)w = "phong"; else if (f instanceof THREE.LineBasicMaterial)w = "basic"; else f instanceof THREE.ParticleBasicMaterial && (w = "particle_basic");
    if (w) {
      var u = THREE.ShaderLib[w];
      f.uniforms = THREE.UniformsUtils.clone(u.uniforms);
      f.vertexShader = u.vertexShader;
      f.fragmentShader = u.fragmentShader
    }
    var z, D, n;
    z = n = u = 0;
    for (D = s.length; z < D; z++) {
      x = s[z];
      x instanceof THREE.DirectionalLight &&
      n++;
      x instanceof THREE.PointLight && u++
    }
    if (u + n <= 4)s = n; else {
      s = Math.ceil(4 * n / (u + n));
      u = 4 - s
    }
    x = {directional: s, point: u};
    n = 50;
    if (i !== undefined && i instanceof THREE.SkinnedMesh)n = i.bones.length;
    var y;
    a:{
      z = f.fragmentShader;
      D = f.vertexShader;
      u = f.uniforms;
      s = f.attributes;
      k = {
        map: !!f.map,
        envMap: !!f.envMap,
        lightMap: !!f.lightMap,
        vertexColors: f.vertexColors,
        fog: k,
        sizeAttenuation: f.sizeAttenuation,
        skinning: f.skinning,
        morphTargets: f.morphTargets,
        maxMorphTargets: this.maxMorphTargets,
        maxDirLights: x.directional,
        maxPointLights: x.point,
        maxBones: n
      };
      var B;
      x = [];
      if (w)x.push(w); else {
        x.push(z);
        x.push(D)
      }
      for (B in k) {
        x.push(B);
        x.push(k[B])
      }
      w = x.join();
      B = 0;
      for (x = xa.length; B < x; B++)if (xa[B].code == w) {
        y = xa[B].program;
        break a
      }
      B = c.createProgram();
      prefix_fragment = ["#ifdef GL_ES\nprecision highp float;\n#endif", "#define MAX_DIR_LIGHTS " + k.maxDirLights, "#define MAX_POINT_LIGHTS " + k.maxPointLights, k.fog ? "#define USE_FOG" : "", k.fog instanceof THREE.FogExp2 ? "#define FOG_EXP2" : "", k.map ? "#define USE_MAP" : "", k.envMap ? "#define USE_ENVMAP" : "", k.lightMap ? "#define USE_LIGHTMAP" :
        "", k.vertexColors ? "#define USE_COLOR" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");
      prefix_vertex = [fb ? "#define VERTEX_TEXTURES" : "", "#define MAX_DIR_LIGHTS " + k.maxDirLights, "#define MAX_POINT_LIGHTS " + k.maxPointLights, "#define MAX_BONES " + k.maxBones, k.map ? "#define USE_MAP" : "", k.envMap ? "#define USE_ENVMAP" : "", k.lightMap ? "#define USE_LIGHTMAP" : "", k.vertexColors ? "#define USE_COLOR" : "", k.skinning ? "#define USE_SKINNING" : "", k.morphTargets ? "#define USE_MORPHTARGETS" : "", k.sizeAttenuation ?
        "#define USE_SIZEATTENUATION" : "", "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
      c.attachShader(B, fa("fragment", prefix_fragment + z));
      c.attachShader(B, fa("vertex", prefix_vertex + D));
      c.linkProgram(B);
      c.getProgramParameter(B, c.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + c.getProgramParameter(B, c.VALIDATE_STATUS) + ", gl error [" + c.getError() + "]");
      B.uniforms = {};
      B.attributes = {};
      var K;
      z = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "objectMatrix", "cameraPosition", "cameraInverseMatrix", "boneGlobalMatrices", "morphTargetInfluences"];
      for (K in u)z.push(K);
      K = z;
      u = 0;
      for (z = K.length; u < z; u++) {
        D = K[u];
        B.uniforms[D] = c.getUniformLocation(B, D)
      }
      z = ["position", "normal", "uv", "uv2", "tangent", "color", "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"];
      for (K = 0; K < k.maxMorphTargets; K++)z.push("morphTarget" + K);
      for (y in s)z.push(y);
      y = z;
      K = 0;
      for (s = y.length; K < s; K++) {
        k = y[K];
        B.attributes[k] = c.getAttribLocation(B, k)
      }
      xa.push({program: B, code: w});
      y = B
    }
    f.program = y;
    y = f.program.attributes;
    y.position >= 0 && c.enableVertexAttribArray(y.position);
    y.color >= 0 && c.enableVertexAttribArray(y.color);
    y.normal >= 0 && c.enableVertexAttribArray(y.normal);
    y.tangent >= 0 && c.enableVertexAttribArray(y.tangent);
    if (f.skinning && y.skinVertexA >= 0 && y.skinVertexB >= 0 && y.skinIndex >= 0 && y.skinWeight >= 0) {
      c.enableVertexAttribArray(y.skinVertexA);
      c.enableVertexAttribArray(y.skinVertexB);
      c.enableVertexAttribArray(y.skinIndex);
      c.enableVertexAttribArray(y.skinWeight)
    }
    if (f.attributes)for (m in f.attributes)y[m] !== undefined && y[m] >= 0 && c.enableVertexAttribArray(y[m]);
    if (f.morphTargets) {
      f.numSupportedMorphTargets = 0;
      if (y.morphTarget0 >=
        0) {
        c.enableVertexAttribArray(y.morphTarget0);
        f.numSupportedMorphTargets++
      }
      if (y.morphTarget1 >= 0) {
        c.enableVertexAttribArray(y.morphTarget1);
        f.numSupportedMorphTargets++
      }
      if (y.morphTarget2 >= 0) {
        c.enableVertexAttribArray(y.morphTarget2);
        f.numSupportedMorphTargets++
      }
      if (y.morphTarget3 >= 0) {
        c.enableVertexAttribArray(y.morphTarget3);
        f.numSupportedMorphTargets++
      }
      if (y.morphTarget4 >= 0) {
        c.enableVertexAttribArray(y.morphTarget4);
        f.numSupportedMorphTargets++
      }
      if (y.morphTarget5 >= 0) {
        c.enableVertexAttribArray(y.morphTarget5);
        f.numSupportedMorphTargets++
      }
      if (y.morphTarget6 >= 0) {
        c.enableVertexAttribArray(y.morphTarget6);
        f.numSupportedMorphTargets++
      }
      if (y.morphTarget7 >= 0) {
        c.enableVertexAttribArray(y.morphTarget7);
        f.numSupportedMorphTargets++
      }
      i.__webglMorphTargetInfluences = new Float32Array(this.maxMorphTargets);
      f = 0;
      for (m = this.maxMorphTargets; f < m; f++)i.__webglMorphTargetInfluences[f] = 0
    }
  };
  this.render = function (f, s, k, i) {
    var m, x, w, u, z, D, n, y, B = f.lights, K = f.fog;
    T.data.vertices = 0;
    T.data.faces = 0;
    T.data.drawCalls = 0;
    s.matrixAutoUpdate &&
    s.update(undefined, !0);
    f.update(undefined, !1, s);
    s.matrixWorldInverse.flattenToArray(Ya);
    s.projectionMatrix.flattenToArray(Ta);
    Pa.multiply(s.projectionMatrix, s.matrixWorldInverse);
    q(Pa);
    this.initWebGLObjects(f);
    Ia(k);
    (this.autoClear || i) && this.clear();
    z = f.__webglObjects.length;
    for (i = 0; i < z; i++) {
      m = f.__webglObjects[i];
      n = m.object;
      if (n.visible)if (!(n instanceof THREE.Mesh) || r(n)) {
        n.matrixWorld.flattenToArray(n._objectMatrixArray);
        P(n, s);
        G(m);
        m.render = !0;
        if (this.sortObjects) {
          Ua.copy(n.position);
          Pa.multiplyVector3(Ua);
          m.z = Ua.z
        }
      } else m.render = !1; else m.render = !1
    }
    this.sortObjects && f.__webglObjects.sort(H);
    D = f.__webglObjectsImmediate.length;
    for (i = 0; i < D; i++) {
      m = f.__webglObjectsImmediate[i];
      n = m.object;
      if (n.visible) {
        n.matrixAutoUpdate && n.matrixWorld.flattenToArray(n._objectMatrixArray);
        P(n, s);
        E(m)
      }
    }
    Z(THREE.NormalBlending);
    for (i = 0; i < z; i++) {
      m = f.__webglObjects[i];
      if (m.render) {
        n = m.object;
        y = m.buffer;
        w = m.opaque;
        p(n);
        for (m = 0; m < w.count; m++) {
          u = w.list[m];
          o(u.depthTest);
          g(s, B, K, u, y, n)
        }
      }
    }
    for (i = 0; i < D; i++) {
      m = f.__webglObjectsImmediate[i];
      n = m.object;
      if (n.visible) {
        w = m.opaque;
        p(n);
        for (m = 0; m < w.count; m++) {
          u = w.list[m];
          o(u.depthTest);
          x = e(s, B, K, u, n);
          n.render(function (J) {
            h(J, x, u.shading)
          })
        }
      }
    }
    for (i = 0; i < z; i++) {
      m = f.__webglObjects[i];
      if (m.render) {
        n = m.object;
        y = m.buffer;
        w = m.transparent;
        p(n);
        for (m = 0; m < w.count; m++) {
          u = w.list[m];
          Z(u.blending);
          o(u.depthTest);
          g(s, B, K, u, y, n)
        }
      }
    }
    for (i = 0; i < D; i++) {
      m = f.__webglObjectsImmediate[i];
      n = m.object;
      if (n.visible) {
        w = m.transparent;
        p(n);
        for (m = 0; m < w.count; m++) {
          u = w.list[m];
          Z(u.blending);
          o(u.depthTest);
          x = e(s, B, K, u, n);
          n.render(function (J) {
            h(J,
              x, u.shading)
          })
        }
      }
    }
    f.__webglSprites.length && F(f, s);
    stencil && f.__webglShadowVolumes.length && f.lights.length && C(f);
    f.__webglLensFlares.length && O(f, s);
    if (k && k.minFilter !== THREE.NearestFilter && k.minFilter !== THREE.LinearFilter) {
      c.bindTexture(c.TEXTURE_2D, k.__webglTexture);
      c.generateMipmap(c.TEXTURE_2D);
      c.bindTexture(c.TEXTURE_2D, null)
    }
  };
  this.initWebGLObjects = function (f) {
    if (!f.__webglObjects) {
      f.__webglObjects = [];
      f.__webglObjectsImmediate = [];
      f.__webglShadowVolumes = [];
      f.__webglLensFlares = [];
      f.__webglSprites =
        []
    }
    for (; f.__objectsAdded.length;) {
      var s = f.__objectsAdded[0], k = f, i = void 0, m = void 0, x = void 0;
      if (s._modelViewMatrix == undefined) {
        s._modelViewMatrix = new THREE.Matrix4;
        s._normalMatrixArray = new Float32Array(9);
        s._modelViewMatrixArray = new Float32Array(16);
        s._objectMatrixArray = new Float32Array(16);
        s.matrixWorld.flattenToArray(s._objectMatrixArray)
      }
      if (s instanceof THREE.Mesh) {
        m = s.geometry;
        m.geometryGroups == undefined && ea(m);
        for (i in m.geometryGroups) {
          x = m.geometryGroups[i];
          if (!x.__webglVertexBuffer) {
            var w = x;
            w.__webglVertexBuffer = c.createBuffer();
            w.__webglNormalBuffer = c.createBuffer();
            w.__webglTangentBuffer = c.createBuffer();
            w.__webglColorBuffer = c.createBuffer();
            w.__webglUVBuffer = c.createBuffer();
            w.__webglUV2Buffer = c.createBuffer();
            w.__webglSkinVertexABuffer = c.createBuffer();
            w.__webglSkinVertexBBuffer = c.createBuffer();
            w.__webglSkinIndicesBuffer = c.createBuffer();
            w.__webglSkinWeightsBuffer = c.createBuffer();
            w.__webglFaceBuffer = c.createBuffer();
            w.__webglLineBuffer = c.createBuffer();
            if (w.numMorphTargets) {
              var u =
                void 0, z = void 0;
              w.__webglMorphTargetsBuffers = [];
              u = 0;
              for (z = w.numMorphTargets; u < z; u++)w.__webglMorphTargetsBuffers.push(c.createBuffer())
            }
            w = x;
            u = s;
            var D = void 0, n = void 0, y = void 0;
            y = void 0;
            var B = void 0, K = void 0, J = void 0, Y = J = z = 0;
            n = void 0;
            y = void 0;
            var Q = void 0;
            D = void 0;
            n = void 0;
            B = u.geometry;
            Q = B.faces;
            K = w.faces;
            D = 0;
            for (n = K.length; D < n; D++) {
              y = K[D];
              y = Q[y];
              if (y instanceof THREE.Face3) {
                z += 3;
                J += 1;
                Y += 3
              } else if (y instanceof THREE.Face4) {
                z += 4;
                J += 2;
                Y += 4
              }
            }
            D = w;
            n = u;
            Q = void 0;
            K = void 0;
            var da = void 0, Ga = void 0;
            da = void 0;
            y = [];
            Q = 0;
            for (K = n.materials.length; Q < K; Q++) {
              da = n.materials[Q];
              if (da instanceof THREE.MeshFaceMaterial) {
                da = 0;
                for (l = D.materials.length; da < l; da++)(Ga = D.materials[da]) && y.push(Ga)
              } else(Ga = da) && y.push(Ga)
            }
            D = y;
            a:{
              n = void 0;
              Q = void 0;
              K = D.length;
              for (n = 0; n < K; n++) {
                Q = D[n];
                if (Q.map || Q.lightMap || Q instanceof THREE.MeshShaderMaterial) {
                  n = !0;
                  break a
                }
              }
              n = !1
            }
            a:{
              Q = void 0;
              K = void 0;
              y = D.length;
              for (Q = 0; Q < y; Q++) {
                K = D[Q];
                if (!(K instanceof THREE.MeshBasicMaterial && !K.envMap || K instanceof THREE.MeshDepthMaterial)) {
                  Q = K && K.shading !=
                  undefined && K.shading == THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading;
                  break a
                }
              }
              Q = !1
            }
            a:{
              K = void 0;
              y = void 0;
              da = D.length;
              for (K = 0; K < da; K++) {
                y = D[K];
                if (y.vertexColors) {
                  y = y.vertexColors;
                  break a
                }
              }
              y = !1
            }
            w.__vertexArray = new Float32Array(z * 3);
            if (Q)w.__normalArray = new Float32Array(z * 3);
            if (B.hasTangents)w.__tangentArray = new Float32Array(z * 4);
            if (y)w.__colorArray = new Float32Array(z * 3);
            if (n) {
              if (B.faceUvs.length > 0 || B.faceVertexUvs.length > 0)w.__uvArray = new Float32Array(z * 2);
              if (B.faceUvs.length > 1 || B.faceVertexUvs.length >
                1)w.__uv2Array = new Float32Array(z * 2)
            }
            if (u.geometry.skinWeights.length && u.geometry.skinIndices.length) {
              w.__skinVertexAArray = new Float32Array(z * 4);
              w.__skinVertexBArray = new Float32Array(z * 4);
              w.__skinIndexArray = new Float32Array(z * 4);
              w.__skinWeightArray = new Float32Array(z * 4)
            }
            w.__faceArray = new Uint16Array(J * 3 + (u.geometry.edgeFaces ? u.geometry.edgeFaces.length * 6 : 0));
            w.__lineArray = new Uint16Array(Y * 2);
            if (w.numMorphTargets) {
              w.__morphTargetsArrays = [];
              B = 0;
              for (K = w.numMorphTargets; B < K; B++)w.__morphTargetsArrays.push(new Float32Array(z *
                3))
            }
            w.__needsSmoothNormals = Q == THREE.SmoothShading;
            w.__uvType = n;
            w.__vertexColorType = y;
            w.__normalType = Q;
            w.__webglFaceCount = J * 3 + (u.geometry.edgeFaces ? u.geometry.edgeFaces.length * 6 : 0);
            w.__webglLineCount = Y * 2;
            B = 0;
            for (K = D.length; B < K; B++)if (D[B].attributes) {
              w.__webglCustomAttributes = {};
              for (a in D[B].attributes) {
                n = D[B].attributes[a];
                if (!n.__webglInitialized || n.createUniqueBuffers) {
                  n.__webglInitialized = !0;
                  J = 1;
                  if (n.type === "v2")J = 2; else if (n.type === "v3")J = 3; else if (n.type === "v4")J = 4; else n.type === "c" && (J = 3);
                  n.size = J;
                  n.needsUpdate = !0;
                  n.array = new Float32Array(z * J);
                  n.buffer = c.createBuffer();
                  n.buffer.belongsToAttribute = a
                }
                w.__webglCustomAttributes[a] = n
              }
            }
            w.__inittedArrays = !0;
            m.__dirtyVertices = !0;
            m.__dirtyMorphTargets = !0;
            m.__dirtyElements = !0;
            m.__dirtyUvs = !0;
            m.__dirtyNormals = !0;
            m.__dirtyTangents = !0;
            m.__dirtyColors = !0
          }
          s instanceof THREE.ShadowVolume ? W(k.__webglShadowVolumes, x, s) : W(k.__webglObjects, x, s)
        }
      } else if (s instanceof THREE.LensFlare)W(k.__webglLensFlares, undefined, s); else if (s instanceof THREE.Ribbon) {
        m =
          s.geometry;
        if (!m.__webglVertexBuffer) {
          i = m;
          i.__webglVertexBuffer = c.createBuffer();
          i.__webglColorBuffer = c.createBuffer();
          i = m;
          x = i.vertices.length;
          i.__vertexArray = new Float32Array(x * 3);
          i.__colorArray = new Float32Array(x * 3);
          i.__webglVertexCount = x;
          m.__dirtyVertices = !0;
          m.__dirtyColors = !0
        }
        W(k.__webglObjects, m, s)
      } else if (s instanceof THREE.Line) {
        m = s.geometry;
        if (!m.__webglVertexBuffer) {
          i = m;
          i.__webglVertexBuffer = c.createBuffer();
          i.__webglColorBuffer = c.createBuffer();
          i = m;
          x = i.vertices.length;
          i.__vertexArray = new Float32Array(x *
            3);
          i.__colorArray = new Float32Array(x * 3);
          i.__webglLineCount = x;
          m.__dirtyVertices = !0;
          m.__dirtyColors = !0
        }
        W(k.__webglObjects, m, s)
      } else if (s instanceof THREE.ParticleSystem) {
        m = s.geometry;
        if (!m.__webglVertexBuffer) {
          i = m;
          i.__webglVertexBuffer = c.createBuffer();
          i.__webglColorBuffer = c.createBuffer();
          i = m;
          x = i.vertices.length;
          i.__vertexArray = new Float32Array(x * 3);
          i.__colorArray = new Float32Array(x * 3);
          i.__sortArray = [];
          i.__webglParticleCount = x;
          m.__dirtyVertices = !0;
          m.__dirtyColors = !0
        }
        W(k.__webglObjects, m, s)
      } else if (THREE.MarchingCubes !==
        undefined && s instanceof THREE.MarchingCubes)k.__webglObjectsImmediate.push({
        object: s,
        opaque: {list: [], count: 0},
        transparent: {list: [], count: 0}
      }); else s instanceof THREE.Sprite && k.__webglSprites.push(s);
      f.__objectsAdded.splice(0, 1)
    }
    for (; f.__objectsRemoved.length;) {
      s = f.__objectsRemoved[0];
      k = f;
      m = void 0;
      i = void 0;
      if (s instanceof THREE.Mesh)for (m = k.__webglObjects.length - 1; m >= 0; m--) {
        i = k.__webglObjects[m].object;
        if (s == i) {
          k.__webglObjects.splice(m, 1);
          break
        }
      } else if (s instanceof THREE.Sprite)for (m = k.__webglSprites.length -
        1; m >= 0; m--) {
        i = k.__webglSprites[m];
        if (s == i) {
          k.__webglSprites.splice(m, 1);
          break
        }
      }
      f.__objectsRemoved.splice(0, 1)
    }
    s = 0;
    for (k = f.__webglObjects.length; s < k; s++)L(f.__webglObjects[s].object, f);
    s = 0;
    for (k = f.__webglShadowVolumes.length; s < k; s++)L(f.__webglShadowVolumes[s].object, f);
    s = 0;
    for (k = f.__webglLensFlares.length; s < k; s++)L(f.__webglLensFlares[s].object, f)
  };
  this.setFaceCulling = function (f, s) {
    if (f) {
      !s || s == "ccw" ? c.frontFace(c.CCW) : c.frontFace(c.CW);
      if (f == "back")c.cullFace(c.BACK); else f == "front" ? c.cullFace(c.FRONT) :
        c.cullFace(c.FRONT_AND_BACK);
      c.enable(c.CULL_FACE)
    } else c.disable(c.CULL_FACE)
  };
  this.supportsVertexTextures = function () {
    return fb
  }
};
THREE.WebGLRenderTarget = function (b, d, e) {
  this.width = b;
  this.height = d;
  e = e || {};
  this.wrapS = e.wrapS !== undefined ? e.wrapS : THREE.ClampToEdgeWrapping;
  this.wrapT = e.wrapT !== undefined ? e.wrapT : THREE.ClampToEdgeWrapping;
  this.magFilter = e.magFilter !== undefined ? e.magFilter : THREE.LinearFilter;
  this.minFilter = e.minFilter !== undefined ? e.minFilter : THREE.LinearMipMapLinearFilter;
  this.format = e.format !== undefined ? e.format : THREE.RGBAFormat;
  this.type = e.type !== undefined ? e.type : THREE.UnsignedByteType;
  this.depthBuffer = e.depthBuffer !==
  undefined ? e.depthBuffer : !0;
  this.stencilBuffer = e.stencilBuffer !== undefined ? e.stencilBuffer : !0
};
