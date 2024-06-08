import { defineComponent as eI, ref as h, onMounted as RI, onBeforeUnmount as kM, h as QA, getCurrentInstance as Lg, watchEffect as Cu, nextTick as VI, unref as r, Teleport as wT, shallowRef as gD, reactive as QD, markRaw as cI, provide as LM, customRef as ll, getCurrentScope as yl, onScopeDispose as ET, watch as SI, openBlock as Y, createElementBlock as $, createElementVNode as f, warn as cl, computed as J, inject as yI, toRef as GM, onUnmounted as xl, isRef as vN, onBeforeMount as rl, mergeProps as qM, renderSlot as dI, useAttrs as wl, useSlots as dT, onUpdated as zT, withDirectives as ig, createCommentVNode as TI, Fragment as iM, normalizeClass as _, createBlock as DI, withCtx as F, resolveDynamicComponent as $M, withModifiers as _D, createVNode as MI, toDisplayString as IM, normalizeStyle as BI, vShow as Dt, Transition as uu, cloneVNode as El, Text as mT, Comment as dl, toRefs as bT, resolveComponent as xI, readonly as YT, onDeactivated as zl, renderList as eA, resolveDirective as ml, withKeys as Bt, createTextVNode as Zg, normalizeProps as bl, guardReactiveProps as Yl, createSlots as pl, isVNode as pT, render as QT, vModelText as cC, pushScopeId as hT, popScopeId as OT } from "vue";
function lM(M) {
  this.content = M;
}
lM.prototype = {
  constructor: lM,
  find: function(M) {
    for (var I = 0; I < this.content.length; I += 2)
      if (this.content[I] === M)
        return I;
    return -1;
  },
  get: function(M) {
    var I = this.find(M);
    return I == -1 ? void 0 : this.content[I + 1];
  },
  update: function(M, I, g) {
    var A = g && g != M ? this.remove(g) : this, t = A.find(M), D = A.content.slice();
    return t == -1 ? D.push(g || M, I) : (D[t + 1] = I, g && (D[t] = g)), new lM(D);
  },
  remove: function(M) {
    var I = this.find(M);
    if (I == -1)
      return this;
    var g = this.content.slice();
    return g.splice(I, 2), new lM(g);
  },
  addToStart: function(M, I) {
    return new lM([M, I].concat(this.remove(M).content));
  },
  addToEnd: function(M, I) {
    var g = this.remove(M).content.slice();
    return g.push(M, I), new lM(g);
  },
  addBefore: function(M, I, g) {
    var A = this.remove(I), t = A.content.slice(), D = A.find(M);
    return t.splice(D == -1 ? t.length : D, 0, I, g), new lM(t);
  },
  forEach: function(M) {
    for (var I = 0; I < this.content.length; I += 2)
      M(this.content[I], this.content[I + 1]);
  },
  prepend: function(M) {
    return M = lM.from(M), M.size ? new lM(M.content.concat(this.subtract(M).content)) : this;
  },
  append: function(M) {
    return M = lM.from(M), M.size ? new lM(this.subtract(M).content.concat(M.content)) : this;
  },
  subtract: function(M) {
    var I = this;
    M = lM.from(M);
    for (var g = 0; g < M.content.length; g += 2)
      I = I.remove(M.content[g]);
    return I;
  },
  get size() {
    return this.content.length >> 1;
  }
};
lM.from = function(M) {
  if (M instanceof lM)
    return M;
  var I = [];
  if (M)
    for (var g in M)
      I.push(g, M[g]);
  return new lM(I);
};
function kT(M, I, g) {
  for (let A = 0; ; A++) {
    if (A == M.childCount || A == I.childCount)
      return M.childCount == I.childCount ? null : g;
    let t = M.child(A), D = I.child(A);
    if (t == D) {
      g += t.nodeSize;
      continue;
    }
    if (!t.sameMarkup(D))
      return g;
    if (t.isText && t.text != D.text) {
      for (let e = 0; t.text[e] == D.text[e]; e++)
        g++;
      return g;
    }
    if (t.content.size || D.content.size) {
      let e = kT(t.content, D.content, g + 1);
      if (e != null)
        return e;
    }
    g += t.nodeSize;
  }
}
function PT(M, I, g, A) {
  for (let t = M.childCount, D = I.childCount; ; ) {
    if (t == 0 || D == 0)
      return t == D ? null : { a: g, b: A };
    let e = M.child(--t), i = I.child(--D), N = e.nodeSize;
    if (e == i) {
      g -= N, A -= N;
      continue;
    }
    if (!e.sameMarkup(i))
      return { a: g, b: A };
    if (e.isText && e.text != i.text) {
      let C = 0, u = Math.min(e.text.length, i.text.length);
      for (; C < u && e.text[e.text.length - C - 1] == i.text[i.text.length - C - 1]; )
        C++, g--, A--;
      return { a: g, b: A };
    }
    if (e.content.size || i.content.size) {
      let C = PT(e.content, i.content, g - 1, A - 1);
      if (C)
        return C;
    }
    g -= N, A -= N;
  }
}
class G {
  constructor(I, g) {
    if (this.content = I, this.size = g || 0, g == null)
      for (let A = 0; A < I.length; A++)
        this.size += I[A].nodeSize;
  }
  nodesBetween(I, g, A, t = 0, D) {
    for (let e = 0, i = 0; i < g; e++) {
      let N = this.content[e], C = i + N.nodeSize;
      if (C > I && A(N, t + i, D || null, e) !== !1 && N.content.size) {
        let u = i + 1;
        N.nodesBetween(Math.max(0, I - u), Math.min(N.content.size, g - u), A, t + u);
      }
      i = C;
    }
  }
  descendants(I) {
    this.nodesBetween(0, this.size, I);
  }
  textBetween(I, g, A, t) {
    let D = "", e = !0;
    return this.nodesBetween(I, g, (i, N) => {
      i.isText ? (D += i.text.slice(Math.max(I, N) - N, g - N), e = !A) : i.isLeaf ? (t ? D += typeof t == "function" ? t(i) : t : i.type.spec.leafText && (D += i.type.spec.leafText(i)), e = !A) : !e && i.isBlock && (D += A, e = !0);
    }, 0), D;
  }
  append(I) {
    if (!I.size)
      return this;
    if (!this.size)
      return I;
    let g = this.lastChild, A = I.firstChild, t = this.content.slice(), D = 0;
    for (g.isText && g.sameMarkup(A) && (t[t.length - 1] = g.withText(g.text + A.text), D = 1); D < I.content.length; D++)
      t.push(I.content[D]);
    return new G(t, this.size + I.size);
  }
  cut(I, g = this.size) {
    if (I == 0 && g == this.size)
      return this;
    let A = [], t = 0;
    if (g > I)
      for (let D = 0, e = 0; e < g; D++) {
        let i = this.content[D], N = e + i.nodeSize;
        N > I && ((e < I || N > g) && (i.isText ? i = i.cut(Math.max(0, I - e), Math.min(i.text.length, g - e)) : i = i.cut(Math.max(0, I - e - 1), Math.min(i.content.size, g - e - 1))), A.push(i), t += i.nodeSize), e = N;
      }
    return new G(A, t);
  }
  cutByIndex(I, g) {
    return I == g ? G.empty : I == 0 && g == this.content.length ? this : new G(this.content.slice(I, g));
  }
  replaceChild(I, g) {
    let A = this.content[I];
    if (A == g)
      return this;
    let t = this.content.slice(), D = this.size + g.nodeSize - A.nodeSize;
    return t[I] = g, new G(t, D);
  }
  addToStart(I) {
    return new G([I].concat(this.content), this.size + I.nodeSize);
  }
  addToEnd(I) {
    return new G(this.content.concat(I), this.size + I.nodeSize);
  }
  eq(I) {
    if (this.content.length != I.content.length)
      return !1;
    for (let g = 0; g < this.content.length; g++)
      if (!this.content[g].eq(I.content[g]))
        return !1;
    return !0;
  }
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  get childCount() {
    return this.content.length;
  }
  child(I) {
    let g = this.content[I];
    if (!g)
      throw new RangeError("Index " + I + " out of range for " + this);
    return g;
  }
  maybeChild(I) {
    return this.content[I] || null;
  }
  forEach(I) {
    for (let g = 0, A = 0; g < this.content.length; g++) {
      let t = this.content[g];
      I(t, A, g), A += t.nodeSize;
    }
  }
  findDiffStart(I, g = 0) {
    return kT(this, I, g);
  }
  findDiffEnd(I, g = this.size, A = I.size) {
    return PT(this, I, g, A);
  }
  findIndex(I, g = -1) {
    if (I == 0)
      return ji(0, I);
    if (I == this.size)
      return ji(this.content.length, I);
    if (I > this.size || I < 0)
      throw new RangeError(`Position ${I} outside of fragment (${this})`);
    for (let A = 0, t = 0; ; A++) {
      let D = this.child(A), e = t + D.nodeSize;
      if (e >= I)
        return e == I || g > 0 ? ji(A + 1, e) : ji(A, t);
      t = e;
    }
  }
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  toStringInner() {
    return this.content.join(", ");
  }
  toJSON() {
    return this.content.length ? this.content.map((I) => I.toJSON()) : null;
  }
  static fromJSON(I, g) {
    if (!g)
      return G.empty;
    if (!Array.isArray(g))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new G(g.map(I.nodeFromJSON));
  }
  static fromArray(I) {
    if (!I.length)
      return G.empty;
    let g, A = 0;
    for (let t = 0; t < I.length; t++) {
      let D = I[t];
      A += D.nodeSize, t && D.isText && I[t - 1].sameMarkup(D) ? (g || (g = I.slice(0, t)), g[g.length - 1] = D.withText(g[g.length - 1].text + D.text)) : g && g.push(D);
    }
    return new G(g || I, A);
  }
  static from(I) {
    if (!I)
      return G.empty;
    if (I instanceof G)
      return I;
    if (Array.isArray(I))
      return this.fromArray(I);
    if (I.attrs)
      return new G([I], I.nodeSize);
    throw new RangeError("Can not convert " + I + " to a Fragment" + (I.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
G.empty = new G([], 0);
const xC = { index: 0, offset: 0 };
function ji(M, I) {
  return xC.index = M, xC.offset = I, xC;
}
function Hi(M, I) {
  if (M === I)
    return !0;
  if (!(M && typeof M == "object") || !(I && typeof I == "object"))
    return !1;
  let g = Array.isArray(M);
  if (Array.isArray(I) != g)
    return !1;
  if (g) {
    if (M.length != I.length)
      return !1;
    for (let A = 0; A < M.length; A++)
      if (!Hi(M[A], I[A]))
        return !1;
  } else {
    for (let A in M)
      if (!(A in I) || !Hi(M[A], I[A]))
        return !1;
    for (let A in I)
      if (!(A in M))
        return !1;
  }
  return !0;
}
class YI {
  constructor(I, g) {
    this.type = I, this.attrs = g;
  }
  addToSet(I) {
    let g, A = !1;
    for (let t = 0; t < I.length; t++) {
      let D = I[t];
      if (this.eq(D))
        return I;
      if (this.type.excludes(D.type))
        g || (g = I.slice(0, t));
      else {
        if (D.type.excludes(this.type))
          return I;
        !A && D.type.rank > this.type.rank && (g || (g = I.slice(0, t)), g.push(this), A = !0), g && g.push(D);
      }
    }
    return g || (g = I.slice()), A || g.push(this), g;
  }
  removeFromSet(I) {
    for (let g = 0; g < I.length; g++)
      if (this.eq(I[g]))
        return I.slice(0, g).concat(I.slice(g + 1));
    return I;
  }
  isInSet(I) {
    for (let g = 0; g < I.length; g++)
      if (this.eq(I[g]))
        return !0;
    return !1;
  }
  eq(I) {
    return this == I || this.type == I.type && Hi(this.attrs, I.attrs);
  }
  toJSON() {
    let I = { type: this.type.name };
    for (let g in this.attrs) {
      I.attrs = this.attrs;
      break;
    }
    return I;
  }
  static fromJSON(I, g) {
    if (!g)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let A = I.marks[g.type];
    if (!A)
      throw new RangeError(`There is no mark type ${g.type} in this schema`);
    return A.create(g.attrs);
  }
  static sameSet(I, g) {
    if (I == g)
      return !0;
    if (I.length != g.length)
      return !1;
    for (let A = 0; A < I.length; A++)
      if (!I[A].eq(g[A]))
        return !1;
    return !0;
  }
  static setFrom(I) {
    if (!I || Array.isArray(I) && I.length == 0)
      return YI.none;
    if (I instanceof YI)
      return [I];
    let g = I.slice();
    return g.sort((A, t) => A.type.rank - t.type.rank), g;
  }
}
YI.none = [];
class le extends Error {
}
class K {
  constructor(I, g, A) {
    this.content = I, this.openStart = g, this.openEnd = A;
  }
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  insertAt(I, g) {
    let A = GT(this.content, I + this.openStart, g);
    return A && new K(A, this.openStart, this.openEnd);
  }
  removeBetween(I, g) {
    return new K(fT(this.content, I + this.openStart, g + this.openStart), this.openStart, this.openEnd);
  }
  eq(I) {
    return this.content.eq(I.content) && this.openStart == I.openStart && this.openEnd == I.openEnd;
  }
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  toJSON() {
    if (!this.content.size)
      return null;
    let I = { content: this.content.toJSON() };
    return this.openStart > 0 && (I.openStart = this.openStart), this.openEnd > 0 && (I.openEnd = this.openEnd), I;
  }
  static fromJSON(I, g) {
    if (!g)
      return K.empty;
    let A = g.openStart || 0, t = g.openEnd || 0;
    if (typeof A != "number" || typeof t != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new K(G.fromJSON(I, g.content), A, t);
  }
  static maxOpen(I, g = !0) {
    let A = 0, t = 0;
    for (let D = I.firstChild; D && !D.isLeaf && (g || !D.type.spec.isolating); D = D.firstChild)
      A++;
    for (let D = I.lastChild; D && !D.isLeaf && (g || !D.type.spec.isolating); D = D.lastChild)
      t++;
    return new K(I, A, t);
  }
}
K.empty = new K(G.empty, 0, 0);
function fT(M, I, g) {
  let { index: A, offset: t } = M.findIndex(I), D = M.maybeChild(A), { index: e, offset: i } = M.findIndex(g);
  if (t == I || D.isText) {
    if (i != g && !M.child(e).isText)
      throw new RangeError("Removing non-flat range");
    return M.cut(0, I).append(M.cut(g));
  }
  if (A != e)
    throw new RangeError("Removing non-flat range");
  return M.replaceChild(A, D.copy(fT(D.content, I - t - 1, g - t - 1)));
}
function GT(M, I, g, A) {
  let { index: t, offset: D } = M.findIndex(I), e = M.maybeChild(t);
  if (D == I || e.isText)
    return A && !A.canReplace(t, t, g) ? null : M.cut(0, I).append(g).append(M.cut(I));
  let i = GT(e.content, I - D - 1, g);
  return i && M.replaceChild(t, e.copy(i));
}
function Ql(M, I, g) {
  if (g.openStart > M.depth)
    throw new le("Inserted content deeper than insertion position");
  if (M.depth - g.openStart != I.depth - g.openEnd)
    throw new le("Inconsistent open depths");
  return WT(M, I, g, 0);
}
function WT(M, I, g, A) {
  let t = M.index(A), D = M.node(A);
  if (t == I.index(A) && A < M.depth - g.openStart) {
    let e = WT(M, I, g, A + 1);
    return D.copy(D.content.replaceChild(t, e));
  } else if (g.content.size)
    if (!g.openStart && !g.openEnd && M.depth == A && I.depth == A) {
      let e = M.parent, i = e.content;
      return it(e, i.cut(0, M.parentOffset).append(g.content).append(i.cut(I.parentOffset)));
    } else {
      let { start: e, end: i } = hl(g, M);
      return it(D, vT(M, e, i, I, A));
    }
  else
    return it(D, Vi(M, I, A));
}
function ZT(M, I) {
  if (!I.type.compatibleContent(M.type))
    throw new le("Cannot join " + I.type.name + " onto " + M.type.name);
}
function n0(M, I, g) {
  let A = M.node(g);
  return ZT(A, I.node(g)), A;
}
function et(M, I) {
  let g = I.length - 1;
  g >= 0 && M.isText && M.sameMarkup(I[g]) ? I[g] = M.withText(I[g].text + M.text) : I.push(M);
}
function te(M, I, g, A) {
  let t = (I || M).node(g), D = 0, e = I ? I.index(g) : t.childCount;
  M && (D = M.index(g), M.depth > g ? D++ : M.textOffset && (et(M.nodeAfter, A), D++));
  for (let i = D; i < e; i++)
    et(t.child(i), A);
  I && I.depth == g && I.textOffset && et(I.nodeBefore, A);
}
function it(M, I) {
  if (!M.type.validContent(I))
    throw new le("Invalid content for node " + M.type.name);
  return M.copy(I);
}
function vT(M, I, g, A, t) {
  let D = M.depth > t && n0(M, I, t + 1), e = A.depth > t && n0(g, A, t + 1), i = [];
  return te(null, M, t, i), D && e && I.index(t) == g.index(t) ? (ZT(D, e), et(it(D, vT(M, I, g, A, t + 1)), i)) : (D && et(it(D, Vi(M, I, t + 1)), i), te(I, g, t, i), e && et(it(e, Vi(g, A, t + 1)), i)), te(A, null, t, i), new G(i);
}
function Vi(M, I, g) {
  let A = [];
  if (te(null, M, g, A), M.depth > g) {
    let t = n0(M, I, g + 1);
    et(it(t, Vi(M, I, g + 1)), A);
  }
  return te(I, null, g, A), new G(A);
}
function hl(M, I) {
  let g = I.depth - M.openStart, t = I.node(g).copy(M.content);
  for (let D = g - 1; D >= 0; D--)
    t = I.node(D).copy(G.from(t));
  return {
    start: t.resolveNoCache(M.openStart + g),
    end: t.resolveNoCache(t.content.size - M.openEnd - g)
  };
}
class ye {
  constructor(I, g, A) {
    this.pos = I, this.path = g, this.parentOffset = A, this.depth = g.length / 3 - 1;
  }
  resolveDepth(I) {
    return I == null ? this.depth : I < 0 ? this.depth + I : I;
  }
  get parent() {
    return this.node(this.depth);
  }
  get doc() {
    return this.node(0);
  }
  node(I) {
    return this.path[this.resolveDepth(I) * 3];
  }
  index(I) {
    return this.path[this.resolveDepth(I) * 3 + 1];
  }
  indexAfter(I) {
    return I = this.resolveDepth(I), this.index(I) + (I == this.depth && !this.textOffset ? 0 : 1);
  }
  start(I) {
    return I = this.resolveDepth(I), I == 0 ? 0 : this.path[I * 3 - 1] + 1;
  }
  end(I) {
    return I = this.resolveDepth(I), this.start(I) + this.node(I).content.size;
  }
  before(I) {
    if (I = this.resolveDepth(I), !I)
      throw new RangeError("There is no position before the top-level node");
    return I == this.depth + 1 ? this.pos : this.path[I * 3 - 1];
  }
  after(I) {
    if (I = this.resolveDepth(I), !I)
      throw new RangeError("There is no position after the top-level node");
    return I == this.depth + 1 ? this.pos : this.path[I * 3 - 1] + this.path[I * 3].nodeSize;
  }
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  get nodeAfter() {
    let I = this.parent, g = this.index(this.depth);
    if (g == I.childCount)
      return null;
    let A = this.pos - this.path[this.path.length - 1], t = I.child(g);
    return A ? I.child(g).cut(A) : t;
  }
  get nodeBefore() {
    let I = this.index(this.depth), g = this.pos - this.path[this.path.length - 1];
    return g ? this.parent.child(I).cut(0, g) : I == 0 ? null : this.parent.child(I - 1);
  }
  posAtIndex(I, g) {
    g = this.resolveDepth(g);
    let A = this.path[g * 3], t = g == 0 ? 0 : this.path[g * 3 - 1] + 1;
    for (let D = 0; D < I; D++)
      t += A.child(D).nodeSize;
    return t;
  }
  marks() {
    let I = this.parent, g = this.index();
    if (I.content.size == 0)
      return YI.none;
    if (this.textOffset)
      return I.child(g).marks;
    let A = I.maybeChild(g - 1), t = I.maybeChild(g);
    if (!A) {
      let i = A;
      A = t, t = i;
    }
    let D = A.marks;
    for (var e = 0; e < D.length; e++)
      D[e].type.spec.inclusive === !1 && (!t || !D[e].isInSet(t.marks)) && (D = D[e--].removeFromSet(D));
    return D;
  }
  marksAcross(I) {
    let g = this.parent.maybeChild(this.index());
    if (!g || !g.isInline)
      return null;
    let A = g.marks, t = I.parent.maybeChild(I.index());
    for (var D = 0; D < A.length; D++)
      A[D].type.spec.inclusive === !1 && (!t || !A[D].isInSet(t.marks)) && (A = A[D--].removeFromSet(A));
    return A;
  }
  sharedDepth(I) {
    for (let g = this.depth; g > 0; g--)
      if (this.start(g) <= I && this.end(g) >= I)
        return g;
    return 0;
  }
  blockRange(I = this, g) {
    if (I.pos < this.pos)
      return I.blockRange(this);
    for (let A = this.depth - (this.parent.inlineContent || this.pos == I.pos ? 1 : 0); A >= 0; A--)
      if (I.pos <= this.end(A) && (!g || g(this.node(A))))
        return new Fi(this, I, A);
    return null;
  }
  sameParent(I) {
    return this.pos - this.parentOffset == I.pos - I.parentOffset;
  }
  max(I) {
    return I.pos > this.pos ? I : this;
  }
  min(I) {
    return I.pos < this.pos ? I : this;
  }
  toString() {
    let I = "";
    for (let g = 1; g <= this.depth; g++)
      I += (I ? "/" : "") + this.node(g).type.name + "_" + this.index(g - 1);
    return I + ":" + this.parentOffset;
  }
  static resolve(I, g) {
    if (!(g >= 0 && g <= I.content.size))
      throw new RangeError("Position " + g + " out of range");
    let A = [], t = 0, D = g;
    for (let e = I; ; ) {
      let { index: i, offset: N } = e.content.findIndex(D), C = D - N;
      if (A.push(e, i, t + N), !C || (e = e.child(i), e.isText))
        break;
      D = C - 1, t += N + 1;
    }
    return new ye(g, A, D);
  }
  static resolveCached(I, g) {
    for (let t = 0; t < rC.length; t++) {
      let D = rC[t];
      if (D.pos == g && D.doc == I)
        return D;
    }
    let A = rC[wC] = ye.resolve(I, g);
    return wC = (wC + 1) % Ol, A;
  }
}
let rC = [], wC = 0, Ol = 12;
class Fi {
  constructor(I, g, A) {
    this.$from = I, this.$to = g, this.depth = A;
  }
  get start() {
    return this.$from.before(this.depth + 1);
  }
  get end() {
    return this.$to.after(this.depth + 1);
  }
  get parent() {
    return this.$from.node(this.depth);
  }
  get startIndex() {
    return this.$from.index(this.depth);
  }
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const kl = /* @__PURE__ */ Object.create(null);
class vg {
  constructor(I, g, A, t = YI.none) {
    this.type = I, this.attrs = g, this.marks = t, this.content = A || G.empty;
  }
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  get childCount() {
    return this.content.childCount;
  }
  child(I) {
    return this.content.child(I);
  }
  maybeChild(I) {
    return this.content.maybeChild(I);
  }
  forEach(I) {
    this.content.forEach(I);
  }
  nodesBetween(I, g, A, t = 0) {
    this.content.nodesBetween(I, g, A, t, this);
  }
  descendants(I) {
    this.nodesBetween(0, this.content.size, I);
  }
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  textBetween(I, g, A, t) {
    return this.content.textBetween(I, g, A, t);
  }
  get firstChild() {
    return this.content.firstChild;
  }
  get lastChild() {
    return this.content.lastChild;
  }
  eq(I) {
    return this == I || this.sameMarkup(I) && this.content.eq(I.content);
  }
  sameMarkup(I) {
    return this.hasMarkup(I.type, I.attrs, I.marks);
  }
  hasMarkup(I, g, A) {
    return this.type == I && Hi(this.attrs, g || I.defaultAttrs || kl) && YI.sameSet(this.marks, A || YI.none);
  }
  copy(I = null) {
    return I == this.content ? this : new vg(this.type, this.attrs, I, this.marks);
  }
  mark(I) {
    return I == this.marks ? this : new vg(this.type, this.attrs, this.content, I);
  }
  cut(I, g = this.content.size) {
    return I == 0 && g == this.content.size ? this : this.copy(this.content.cut(I, g));
  }
  slice(I, g = this.content.size, A = !1) {
    if (I == g)
      return K.empty;
    let t = this.resolve(I), D = this.resolve(g), e = A ? 0 : t.sharedDepth(g), i = t.start(e), C = t.node(e).content.cut(t.pos - i, D.pos - i);
    return new K(C, t.depth - e, D.depth - e);
  }
  replace(I, g, A) {
    return Ql(this.resolve(I), this.resolve(g), A);
  }
  nodeAt(I) {
    for (let g = this; ; ) {
      let { index: A, offset: t } = g.content.findIndex(I);
      if (g = g.maybeChild(A), !g)
        return null;
      if (t == I || g.isText)
        return g;
      I -= t + 1;
    }
  }
  childAfter(I) {
    let { index: g, offset: A } = this.content.findIndex(I);
    return { node: this.content.maybeChild(g), index: g, offset: A };
  }
  childBefore(I) {
    if (I == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: g, offset: A } = this.content.findIndex(I);
    if (A < I)
      return { node: this.content.child(g), index: g, offset: A };
    let t = this.content.child(g - 1);
    return { node: t, index: g - 1, offset: A - t.nodeSize };
  }
  resolve(I) {
    return ye.resolveCached(this, I);
  }
  resolveNoCache(I) {
    return ye.resolve(this, I);
  }
  rangeHasMark(I, g, A) {
    let t = !1;
    return g > I && this.nodesBetween(I, g, (D) => (A.isInSet(D.marks) && (t = !0), !t)), t;
  }
  get isBlock() {
    return this.type.isBlock;
  }
  get isTextblock() {
    return this.type.isTextblock;
  }
  get inlineContent() {
    return this.type.inlineContent;
  }
  get isInline() {
    return this.type.isInline;
  }
  get isText() {
    return this.type.isText;
  }
  get isLeaf() {
    return this.type.isLeaf;
  }
  get isAtom() {
    return this.type.isAtom;
  }
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let I = this.type.name;
    return this.content.size && (I += "(" + this.content.toStringInner() + ")"), UT(this.marks, I);
  }
  contentMatchAt(I) {
    let g = this.type.contentMatch.matchFragment(this.content, 0, I);
    if (!g)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return g;
  }
  canReplace(I, g, A = G.empty, t = 0, D = A.childCount) {
    let e = this.contentMatchAt(I).matchFragment(A, t, D), i = e && e.matchFragment(this.content, g);
    if (!i || !i.validEnd)
      return !1;
    for (let N = t; N < D; N++)
      if (!this.type.allowsMarks(A.child(N).marks))
        return !1;
    return !0;
  }
  canReplaceWith(I, g, A, t) {
    if (t && !this.type.allowsMarks(t))
      return !1;
    let D = this.contentMatchAt(I).matchType(A), e = D && D.matchFragment(this.content, g);
    return e ? e.validEnd : !1;
  }
  canAppend(I) {
    return I.content.size ? this.canReplace(this.childCount, this.childCount, I.content) : this.type.compatibleContent(I.type);
  }
  check() {
    if (!this.type.validContent(this.content))
      throw new RangeError(`Invalid content for node ${this.type.name}: ${this.content.toString().slice(0, 50)}`);
    let I = YI.none;
    for (let g = 0; g < this.marks.length; g++)
      I = this.marks[g].addToSet(I);
    if (!YI.sameSet(I, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((g) => g.type.name)}`);
    this.content.forEach((g) => g.check());
  }
  toJSON() {
    let I = { type: this.type.name };
    for (let g in this.attrs) {
      I.attrs = this.attrs;
      break;
    }
    return this.content.size && (I.content = this.content.toJSON()), this.marks.length && (I.marks = this.marks.map((g) => g.toJSON())), I;
  }
  static fromJSON(I, g) {
    if (!g)
      throw new RangeError("Invalid input for Node.fromJSON");
    let A = null;
    if (g.marks) {
      if (!Array.isArray(g.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      A = g.marks.map(I.markFromJSON);
    }
    if (g.type == "text") {
      if (typeof g.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return I.text(g.text, A);
    }
    let t = G.fromJSON(I, g.content);
    return I.nodeType(g.type).create(g.attrs, t, A);
  }
}
vg.prototype.text = void 0;
class Xi extends vg {
  constructor(I, g, A, t) {
    if (super(I, g, null, t), !A)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = A;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : UT(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(I, g) {
    return this.text.slice(I, g);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(I) {
    return I == this.marks ? this : new Xi(this.type, this.attrs, this.text, I);
  }
  withText(I) {
    return I == this.text ? this : new Xi(this.type, this.attrs, I, this.marks);
  }
  cut(I = 0, g = this.text.length) {
    return I == 0 && g == this.text.length ? this : this.withText(this.text.slice(I, g));
  }
  eq(I) {
    return this.sameMarkup(I) && this.text == I.text;
  }
  toJSON() {
    let I = super.toJSON();
    return I.text = this.text, I;
  }
}
function UT(M, I) {
  for (let g = M.length - 1; g >= 0; g--)
    I = M[g].type.name + "(" + I + ")";
  return I;
}
class st {
  constructor(I) {
    this.validEnd = I, this.next = [], this.wrapCache = [];
  }
  static parse(I, g) {
    let A = new Pl(I, g);
    if (A.next == null)
      return st.empty;
    let t = JT(A);
    A.next && A.err("Unexpected trailing text");
    let D = Jl(Ul(t));
    return Bl(D, A), D;
  }
  matchType(I) {
    for (let g = 0; g < this.next.length; g++)
      if (this.next[g].type == I)
        return this.next[g].next;
    return null;
  }
  matchFragment(I, g = 0, A = I.childCount) {
    let t = this;
    for (let D = g; t && D < A; D++)
      t = t.matchType(I.child(D).type);
    return t;
  }
  get inlineContent() {
    return this.next.length && this.next[0].type.isInline;
  }
  get defaultType() {
    for (let I = 0; I < this.next.length; I++) {
      let { type: g } = this.next[I];
      if (!(g.isText || g.hasRequiredAttrs()))
        return g;
    }
    return null;
  }
  compatible(I) {
    for (let g = 0; g < this.next.length; g++)
      for (let A = 0; A < I.next.length; A++)
        if (this.next[g].type == I.next[A].type)
          return !0;
    return !1;
  }
  fillBefore(I, g = !1, A = 0) {
    let t = [this];
    function D(e, i) {
      let N = e.matchFragment(I, A);
      if (N && (!g || N.validEnd))
        return G.from(i.map((C) => C.createAndFill()));
      for (let C = 0; C < e.next.length; C++) {
        let { type: u, next: j } = e.next[C];
        if (!(u.isText || u.hasRequiredAttrs()) && t.indexOf(j) == -1) {
          t.push(j);
          let n = D(j, i.concat(u));
          if (n)
            return n;
        }
      }
      return null;
    }
    return D(this, []);
  }
  findWrapping(I) {
    for (let A = 0; A < this.wrapCache.length; A += 2)
      if (this.wrapCache[A] == I)
        return this.wrapCache[A + 1];
    let g = this.computeWrapping(I);
    return this.wrapCache.push(I, g), g;
  }
  computeWrapping(I) {
    let g = /* @__PURE__ */ Object.create(null), A = [{ match: this, type: null, via: null }];
    for (; A.length; ) {
      let t = A.shift(), D = t.match;
      if (D.matchType(I)) {
        let e = [];
        for (let i = t; i.type; i = i.via)
          e.push(i.type);
        return e.reverse();
      }
      for (let e = 0; e < D.next.length; e++) {
        let { type: i, next: N } = D.next[e];
        !i.isLeaf && !i.hasRequiredAttrs() && !(i.name in g) && (!t.type || N.validEnd) && (A.push({ match: i.contentMatch, type: i, via: t }), g[i.name] = !0);
      }
    }
    return null;
  }
  get edgeCount() {
    return this.next.length;
  }
  edge(I) {
    if (I >= this.next.length)
      throw new RangeError(`There's no ${I}th edge in this content match`);
    return this.next[I];
  }
  toString() {
    let I = [];
    function g(A) {
      I.push(A);
      for (let t = 0; t < A.next.length; t++)
        I.indexOf(A.next[t].next) == -1 && g(A.next[t].next);
    }
    return g(this), I.map((A, t) => {
      let D = t + (A.validEnd ? "*" : " ") + " ";
      for (let e = 0; e < A.next.length; e++)
        D += (e ? ", " : "") + A.next[e].type.name + "->" + I.indexOf(A.next[e].next);
      return D;
    }).join(`
`);
  }
}
st.empty = new st(!0);
class Pl {
  constructor(I, g) {
    this.string = I, this.nodeTypes = g, this.inline = null, this.pos = 0, this.tokens = I.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(I) {
    return this.next == I && (this.pos++ || !0);
  }
  err(I) {
    throw new SyntaxError(I + " (in content expression '" + this.string + "')");
  }
}
function JT(M) {
  let I = [];
  do
    I.push(fl(M));
  while (M.eat("|"));
  return I.length == 1 ? I[0] : { type: "choice", exprs: I };
}
function fl(M) {
  let I = [];
  do
    I.push(Gl(M));
  while (M.next && M.next != ")" && M.next != "|");
  return I.length == 1 ? I[0] : { type: "seq", exprs: I };
}
function Gl(M) {
  let I = vl(M);
  for (; ; )
    if (M.eat("+"))
      I = { type: "plus", expr: I };
    else if (M.eat("*"))
      I = { type: "star", expr: I };
    else if (M.eat("?"))
      I = { type: "opt", expr: I };
    else if (M.eat("{"))
      I = Wl(M, I);
    else
      break;
  return I;
}
function Vj(M) {
  /\D/.test(M.next) && M.err("Expected number, got '" + M.next + "'");
  let I = Number(M.next);
  return M.pos++, I;
}
function Wl(M, I) {
  let g = Vj(M), A = g;
  return M.eat(",") && (M.next != "}" ? A = Vj(M) : A = -1), M.eat("}") || M.err("Unclosed braced range"), { type: "range", min: g, max: A, expr: I };
}
function Zl(M, I) {
  let g = M.nodeTypes, A = g[I];
  if (A)
    return [A];
  let t = [];
  for (let D in g) {
    let e = g[D];
    e.groups.indexOf(I) > -1 && t.push(e);
  }
  return t.length == 0 && M.err("No node type or group '" + I + "' found"), t;
}
function vl(M) {
  if (M.eat("(")) {
    let I = JT(M);
    return M.eat(")") || M.err("Missing closing paren"), I;
  } else if (/\W/.test(M.next))
    M.err("Unexpected token '" + M.next + "'");
  else {
    let I = Zl(M, M.next).map((g) => (M.inline == null ? M.inline = g.isInline : M.inline != g.isInline && M.err("Mixing inline and block content"), { type: "name", value: g }));
    return M.pos++, I.length == 1 ? I[0] : { type: "choice", exprs: I };
  }
}
function Ul(M) {
  let I = [[]];
  return t(D(M, 0), g()), I;
  function g() {
    return I.push([]) - 1;
  }
  function A(e, i, N) {
    let C = { term: N, to: i };
    return I[e].push(C), C;
  }
  function t(e, i) {
    e.forEach((N) => N.to = i);
  }
  function D(e, i) {
    if (e.type == "choice")
      return e.exprs.reduce((N, C) => N.concat(D(C, i)), []);
    if (e.type == "seq")
      for (let N = 0; ; N++) {
        let C = D(e.exprs[N], i);
        if (N == e.exprs.length - 1)
          return C;
        t(C, i = g());
      }
    else if (e.type == "star") {
      let N = g();
      return A(i, N), t(D(e.expr, N), N), [A(N)];
    } else if (e.type == "plus") {
      let N = g();
      return t(D(e.expr, i), N), t(D(e.expr, N), N), [A(N)];
    } else {
      if (e.type == "opt")
        return [A(i)].concat(D(e.expr, i));
      if (e.type == "range") {
        let N = i;
        for (let C = 0; C < e.min; C++) {
          let u = g();
          t(D(e.expr, N), u), N = u;
        }
        if (e.max == -1)
          t(D(e.expr, N), N);
        else
          for (let C = e.min; C < e.max; C++) {
            let u = g();
            A(N, u), t(D(e.expr, N), u), N = u;
          }
        return [A(N)];
      } else {
        if (e.type == "name")
          return [A(i, void 0, e.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function BT(M, I) {
  return I - M;
}
function Fj(M, I) {
  let g = [];
  return A(I), g.sort(BT);
  function A(t) {
    let D = M[t];
    if (D.length == 1 && !D[0].term)
      return A(D[0].to);
    g.push(t);
    for (let e = 0; e < D.length; e++) {
      let { term: i, to: N } = D[e];
      !i && g.indexOf(N) == -1 && A(N);
    }
  }
}
function Jl(M) {
  let I = /* @__PURE__ */ Object.create(null);
  return g(Fj(M, 0));
  function g(A) {
    let t = [];
    A.forEach((e) => {
      M[e].forEach(({ term: i, to: N }) => {
        if (!i)
          return;
        let C;
        for (let u = 0; u < t.length; u++)
          t[u][0] == i && (C = t[u][1]);
        Fj(M, N).forEach((u) => {
          C || t.push([i, C = []]), C.indexOf(u) == -1 && C.push(u);
        });
      });
    });
    let D = I[A.join(",")] = new st(A.indexOf(M.length - 1) > -1);
    for (let e = 0; e < t.length; e++) {
      let i = t[e][1].sort(BT);
      D.next.push({ type: t[e][0], next: I[i.join(",")] || g(i) });
    }
    return D;
  }
}
function Bl(M, I) {
  for (let g = 0, A = [M]; g < A.length; g++) {
    let t = A[g], D = !t.validEnd, e = [];
    for (let i = 0; i < t.next.length; i++) {
      let { type: N, next: C } = t.next[i];
      e.push(N.name), D && !(N.isText || N.hasRequiredAttrs()) && (D = !1), A.indexOf(C) == -1 && A.push(C);
    }
    D && I.err("Only non-generatable nodes (" + e.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function RT(M) {
  let I = /* @__PURE__ */ Object.create(null);
  for (let g in M) {
    let A = M[g];
    if (!A.hasDefault)
      return null;
    I[g] = A.default;
  }
  return I;
}
function HT(M, I) {
  let g = /* @__PURE__ */ Object.create(null);
  for (let A in M) {
    let t = I && I[A];
    if (t === void 0) {
      let D = M[A];
      if (D.hasDefault)
        t = D.default;
      else
        throw new RangeError("No value supplied for attribute " + A);
    }
    g[A] = t;
  }
  return g;
}
function VT(M) {
  let I = /* @__PURE__ */ Object.create(null);
  if (M)
    for (let g in M)
      I[g] = new Rl(M[g]);
  return I;
}
class Ki {
  constructor(I, g, A) {
    this.name = I, this.schema = g, this.spec = A, this.markSet = null, this.groups = A.group ? A.group.split(" ") : [], this.attrs = VT(A.attrs), this.defaultAttrs = RT(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(A.inline || I == "text"), this.isText = I == "text";
  }
  get isInline() {
    return !this.isBlock;
  }
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  get isLeaf() {
    return this.contentMatch == st.empty;
  }
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  hasRequiredAttrs() {
    for (let I in this.attrs)
      if (this.attrs[I].isRequired)
        return !0;
    return !1;
  }
  compatibleContent(I) {
    return this == I || this.contentMatch.compatible(I.contentMatch);
  }
  computeAttrs(I) {
    return !I && this.defaultAttrs ? this.defaultAttrs : HT(this.attrs, I);
  }
  create(I = null, g, A) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new vg(this, this.computeAttrs(I), G.from(g), YI.setFrom(A));
  }
  createChecked(I = null, g, A) {
    if (g = G.from(g), !this.validContent(g))
      throw new RangeError("Invalid content for node " + this.name);
    return new vg(this, this.computeAttrs(I), g, YI.setFrom(A));
  }
  createAndFill(I = null, g, A) {
    if (I = this.computeAttrs(I), g = G.from(g), g.size) {
      let e = this.contentMatch.fillBefore(g);
      if (!e)
        return null;
      g = e.append(g);
    }
    let t = this.contentMatch.matchFragment(g), D = t && t.fillBefore(G.empty, !0);
    return D ? new vg(this, I, g.append(D), YI.setFrom(A)) : null;
  }
  validContent(I) {
    let g = this.contentMatch.matchFragment(I);
    if (!g || !g.validEnd)
      return !1;
    for (let A = 0; A < I.childCount; A++)
      if (!this.allowsMarks(I.child(A).marks))
        return !1;
    return !0;
  }
  allowsMarkType(I) {
    return this.markSet == null || this.markSet.indexOf(I) > -1;
  }
  allowsMarks(I) {
    if (this.markSet == null)
      return !0;
    for (let g = 0; g < I.length; g++)
      if (!this.allowsMarkType(I[g].type))
        return !1;
    return !0;
  }
  allowedMarks(I) {
    if (this.markSet == null)
      return I;
    let g;
    for (let A = 0; A < I.length; A++)
      this.allowsMarkType(I[A].type) ? g && g.push(I[A]) : g || (g = I.slice(0, A));
    return g ? g.length ? g : YI.none : I;
  }
  static compile(I, g) {
    let A = /* @__PURE__ */ Object.create(null);
    I.forEach((D, e) => A[D] = new Ki(D, g, e));
    let t = g.spec.topNode || "doc";
    if (!A[t])
      throw new RangeError("Schema is missing its top node type ('" + t + "')");
    if (!A.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let D in A.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return A;
  }
}
class Rl {
  constructor(I) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(I, "default"), this.default = I.default;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class UN {
  constructor(I, g, A, t) {
    this.name = I, this.rank = g, this.schema = A, this.spec = t, this.attrs = VT(t.attrs), this.excluded = null;
    let D = RT(this.attrs);
    this.instance = D ? new YI(this, D) : null;
  }
  create(I = null) {
    return !I && this.instance ? this.instance : new YI(this, HT(this.attrs, I));
  }
  static compile(I, g) {
    let A = /* @__PURE__ */ Object.create(null), t = 0;
    return I.forEach((D, e) => A[D] = new UN(D, t++, g, e)), A;
  }
  removeFromSet(I) {
    for (var g = 0; g < I.length; g++)
      I[g].type == this && (I = I.slice(0, g).concat(I.slice(g + 1)), g--);
    return I;
  }
  isInSet(I) {
    for (let g = 0; g < I.length; g++)
      if (I[g].type == this)
        return I[g];
  }
  excludes(I) {
    return this.excluded.indexOf(I) > -1;
  }
}
class Hl {
  constructor(I) {
    this.cached = /* @__PURE__ */ Object.create(null), this.spec = {
      nodes: lM.from(I.nodes),
      marks: lM.from(I.marks || {}),
      topNode: I.topNode
    }, this.nodes = Ki.compile(this.spec.nodes, this), this.marks = UN.compile(this.spec.marks, this);
    let g = /* @__PURE__ */ Object.create(null);
    for (let A in this.nodes) {
      if (A in this.marks)
        throw new RangeError(A + " can not be both a node and a mark");
      let t = this.nodes[A], D = t.spec.content || "", e = t.spec.marks;
      t.contentMatch = g[D] || (g[D] = st.parse(D, this.nodes)), t.inlineContent = t.contentMatch.inlineContent, t.markSet = e == "_" ? null : e ? Xj(this, e.split(" ")) : e == "" || !t.inlineContent ? [] : null;
    }
    for (let A in this.marks) {
      let t = this.marks[A], D = t.spec.excludes;
      t.excluded = D == null ? [t] : D == "" ? [] : Xj(this, D.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  node(I, g = null, A, t) {
    if (typeof I == "string")
      I = this.nodeType(I);
    else if (I instanceof Ki) {
      if (I.schema != this)
        throw new RangeError("Node type from different schema used (" + I.name + ")");
    } else
      throw new RangeError("Invalid node type: " + I);
    return I.createChecked(g, A, t);
  }
  text(I, g) {
    let A = this.nodes.text;
    return new Xi(A, A.defaultAttrs, I, YI.setFrom(g));
  }
  mark(I, g) {
    return typeof I == "string" && (I = this.marks[I]), I.create(g);
  }
  nodeFromJSON(I) {
    return vg.fromJSON(this, I);
  }
  markFromJSON(I) {
    return YI.fromJSON(this, I);
  }
  nodeType(I) {
    let g = this.nodes[I];
    if (!g)
      throw new RangeError("Unknown node type: " + I);
    return g;
  }
}
function Xj(M, I) {
  let g = [];
  for (let A = 0; A < I.length; A++) {
    let t = I[A], D = M.marks[t], e = D;
    if (D)
      g.push(D);
    else
      for (let i in M.marks) {
        let N = M.marks[i];
        (t == "_" || N.spec.group && N.spec.group.split(" ").indexOf(t) > -1) && g.push(e = N);
      }
    if (!e)
      throw new SyntaxError("Unknown mark type: '" + I[A] + "'");
  }
  return g;
}
class uD {
  constructor(I, g) {
    this.schema = I, this.rules = g, this.tags = [], this.styles = [], g.forEach((A) => {
      A.tag ? this.tags.push(A) : A.style && this.styles.push(A);
    }), this.normalizeLists = !this.tags.some((A) => {
      if (!/^(ul|ol)\b/.test(A.tag) || !A.node)
        return !1;
      let t = I.nodes[A.node];
      return t.contentMatch.matchType(t);
    });
  }
  parse(I, g = {}) {
    let A = new _j(this, g, !1);
    return A.addAll(I, g.from, g.to), A.finish();
  }
  parseSlice(I, g = {}) {
    let A = new _j(this, g, !0);
    return A.addAll(I, g.from, g.to), K.maxOpen(A.finish());
  }
  matchTag(I, g, A) {
    for (let t = A ? this.tags.indexOf(A) + 1 : 0; t < this.tags.length; t++) {
      let D = this.tags[t];
      if (Xl(I, D.tag) && (D.namespace === void 0 || I.namespaceURI == D.namespace) && (!D.context || g.matchesContext(D.context))) {
        if (D.getAttrs) {
          let e = D.getAttrs(I);
          if (e === !1)
            continue;
          D.attrs = e || void 0;
        }
        return D;
      }
    }
  }
  matchStyle(I, g, A, t) {
    for (let D = t ? this.styles.indexOf(t) + 1 : 0; D < this.styles.length; D++) {
      let e = this.styles[D], i = e.style;
      if (!(i.indexOf(I) != 0 || e.context && !A.matchesContext(e.context) || i.length > I.length && (i.charCodeAt(I.length) != 61 || i.slice(I.length + 1) != g))) {
        if (e.getAttrs) {
          let N = e.getAttrs(g);
          if (N === !1)
            continue;
          e.attrs = N || void 0;
        }
        return e;
      }
    }
  }
  static schemaRules(I) {
    let g = [];
    function A(t) {
      let D = t.priority == null ? 50 : t.priority, e = 0;
      for (; e < g.length; e++) {
        let i = g[e];
        if ((i.priority == null ? 50 : i.priority) < D)
          break;
      }
      g.splice(e, 0, t);
    }
    for (let t in I.marks) {
      let D = I.marks[t].spec.parseDOM;
      D && D.forEach((e) => {
        A(e = $j(e)), e.mark = t;
      });
    }
    for (let t in I.nodes) {
      let D = I.nodes[t].spec.parseDOM;
      D && D.forEach((e) => {
        A(e = $j(e)), e.node = t;
      });
    }
    return g;
  }
  static fromSchema(I) {
    return I.cached.domParser || (I.cached.domParser = new uD(I, uD.schemaRules(I)));
  }
}
const FT = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, Vl = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, XT = { ol: !0, ul: !0 }, _i = 1, $i = 2, De = 4;
function Kj(M, I, g) {
  return I != null ? (I ? _i : 0) | (I === "full" ? $i : 0) : M && M.whitespace == "pre" ? _i | $i : g & ~De;
}
class ni {
  constructor(I, g, A, t, D, e, i) {
    this.type = I, this.attrs = g, this.marks = A, this.pendingMarks = t, this.solid = D, this.options = i, this.content = [], this.activeMarks = YI.none, this.stashMarks = [], this.match = e || (i & De ? null : I.contentMatch);
  }
  findWrapping(I) {
    if (!this.match) {
      if (!this.type)
        return [];
      let g = this.type.contentMatch.fillBefore(G.from(I));
      if (g)
        this.match = this.type.contentMatch.matchFragment(g);
      else {
        let A = this.type.contentMatch, t;
        return (t = A.findWrapping(I.type)) ? (this.match = A, t) : null;
      }
    }
    return this.match.findWrapping(I.type);
  }
  finish(I) {
    if (!(this.options & _i)) {
      let A = this.content[this.content.length - 1], t;
      if (A && A.isText && (t = /[ \t\r\n\u000c]+$/.exec(A.text))) {
        let D = A;
        A.text.length == t[0].length ? this.content.pop() : this.content[this.content.length - 1] = D.withText(D.text.slice(0, D.text.length - t[0].length));
      }
    }
    let g = G.from(this.content);
    return !I && this.match && (g = g.append(this.match.fillBefore(G.empty, !0))), this.type ? this.type.create(this.attrs, g, this.marks) : g;
  }
  popFromStashMark(I) {
    for (let g = this.stashMarks.length - 1; g >= 0; g--)
      if (I.eq(this.stashMarks[g]))
        return this.stashMarks.splice(g, 1)[0];
  }
  applyPending(I) {
    for (let g = 0, A = this.pendingMarks; g < A.length; g++) {
      let t = A[g];
      (this.type ? this.type.allowsMarkType(t.type) : _l(t.type, I)) && !t.isInSet(this.activeMarks) && (this.activeMarks = t.addToSet(this.activeMarks), this.pendingMarks = t.removeFromSet(this.pendingMarks));
    }
  }
  inlineContext(I) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : I.parentNode && !FT.hasOwnProperty(I.parentNode.nodeName.toLowerCase());
  }
}
class _j {
  constructor(I, g, A) {
    this.parser = I, this.options = g, this.isOpen = A, this.open = 0;
    let t = g.topNode, D, e = Kj(null, g.preserveWhitespace, 0) | (A ? De : 0);
    t ? D = new ni(t.type, t.attrs, YI.none, YI.none, !0, g.topMatch || t.type.contentMatch, e) : A ? D = new ni(null, null, YI.none, YI.none, !0, null, e) : D = new ni(I.schema.topNodeType, null, YI.none, YI.none, !0, null, e), this.nodes = [D], this.find = g.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  addDOM(I) {
    if (I.nodeType == 3)
      this.addTextNode(I);
    else if (I.nodeType == 1) {
      let g = I.getAttribute("style"), A = g ? this.readStyles(Kl(g)) : null, t = this.top;
      if (A != null)
        for (let D = 0; D < A.length; D++)
          this.addPendingMark(A[D]);
      if (this.addElement(I), A != null)
        for (let D = 0; D < A.length; D++)
          this.removePendingMark(A[D], t);
    }
  }
  addTextNode(I) {
    let g = I.nodeValue, A = this.top;
    if (A.options & $i || A.inlineContext(I) || /[^ \t\r\n\u000c]/.test(g)) {
      if (A.options & _i)
        A.options & $i ? g = g.replace(/\r\n?/g, `
`) : g = g.replace(/\r?\n|\r/g, " ");
      else if (g = g.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(g) && this.open == this.nodes.length - 1) {
        let t = A.content[A.content.length - 1], D = I.previousSibling;
        (!t || D && D.nodeName == "BR" || t.isText && /[ \t\r\n\u000c]$/.test(t.text)) && (g = g.slice(1));
      }
      g && this.insertNode(this.parser.schema.text(g)), this.findInText(I);
    } else
      this.findInside(I);
  }
  addElement(I, g) {
    let A = I.nodeName.toLowerCase(), t;
    XT.hasOwnProperty(A) && this.parser.normalizeLists && Fl(I);
    let D = this.options.ruleFromNode && this.options.ruleFromNode(I) || (t = this.parser.matchTag(I, this, g));
    if (D ? D.ignore : Vl.hasOwnProperty(A))
      this.findInside(I), this.ignoreFallback(I);
    else if (!D || D.skip || D.closeParent) {
      D && D.closeParent ? this.open = Math.max(0, this.open - 1) : D && D.skip.nodeType && (I = D.skip);
      let e, i = this.top, N = this.needsBlock;
      if (FT.hasOwnProperty(A))
        e = !0, i.type || (this.needsBlock = !0);
      else if (!I.firstChild) {
        this.leafFallback(I);
        return;
      }
      this.addAll(I), e && this.sync(i), this.needsBlock = N;
    } else
      this.addElementByRule(I, D, D.consuming === !1 ? t : void 0);
  }
  leafFallback(I) {
    I.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(I.ownerDocument.createTextNode(`
`));
  }
  ignoreFallback(I) {
    I.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"));
  }
  readStyles(I) {
    let g = YI.none;
    I:
      for (let A = 0; A < I.length; A += 2)
        for (let t = void 0; ; ) {
          let D = this.parser.matchStyle(I[A], I[A + 1], this, t);
          if (!D)
            continue I;
          if (D.ignore)
            return null;
          if (g = this.parser.schema.marks[D.mark].create(D.attrs).addToSet(g), D.consuming === !1)
            t = D;
          else
            break;
        }
    return g;
  }
  addElementByRule(I, g, A) {
    let t, D, e;
    g.node ? (D = this.parser.schema.nodes[g.node], D.isLeaf ? this.insertNode(D.create(g.attrs)) || this.leafFallback(I) : t = this.enter(D, g.attrs || null, g.preserveWhitespace)) : (e = this.parser.schema.marks[g.mark].create(g.attrs), this.addPendingMark(e));
    let i = this.top;
    if (D && D.isLeaf)
      this.findInside(I);
    else if (A)
      this.addElement(I, A);
    else if (g.getContent)
      this.findInside(I), g.getContent(I, this.parser.schema).forEach((N) => this.insertNode(N));
    else {
      let N = I;
      typeof g.contentElement == "string" ? N = I.querySelector(g.contentElement) : typeof g.contentElement == "function" ? N = g.contentElement(I) : g.contentElement && (N = g.contentElement), this.findAround(I, N, !0), this.addAll(N);
    }
    t && this.sync(i) && this.open--, e && this.removePendingMark(e, i);
  }
  addAll(I, g, A) {
    let t = g || 0;
    for (let D = g ? I.childNodes[g] : I.firstChild, e = A == null ? null : I.childNodes[A]; D != e; D = D.nextSibling, ++t)
      this.findAtPoint(I, t), this.addDOM(D);
    this.findAtPoint(I, t);
  }
  findPlace(I) {
    let g, A;
    for (let t = this.open; t >= 0; t--) {
      let D = this.nodes[t], e = D.findWrapping(I);
      if (e && (!g || g.length > e.length) && (g = e, A = D, !e.length) || D.solid)
        break;
    }
    if (!g)
      return !1;
    this.sync(A);
    for (let t = 0; t < g.length; t++)
      this.enterInner(g[t], null, !1);
    return !0;
  }
  insertNode(I) {
    if (I.isInline && this.needsBlock && !this.top.type) {
      let g = this.textblockFromContext();
      g && this.enterInner(g);
    }
    if (this.findPlace(I)) {
      this.closeExtra();
      let g = this.top;
      g.applyPending(I.type), g.match && (g.match = g.match.matchType(I.type));
      let A = g.activeMarks;
      for (let t = 0; t < I.marks.length; t++)
        (!g.type || g.type.allowsMarkType(I.marks[t].type)) && (A = I.marks[t].addToSet(A));
      return g.content.push(I.mark(A)), !0;
    }
    return !1;
  }
  enter(I, g, A) {
    let t = this.findPlace(I.create(g));
    return t && this.enterInner(I, g, !0, A), t;
  }
  enterInner(I, g = null, A = !1, t) {
    this.closeExtra();
    let D = this.top;
    D.applyPending(I), D.match = D.match && D.match.matchType(I);
    let e = Kj(I, t, D.options);
    D.options & De && D.content.length == 0 && (e |= De), this.nodes.push(new ni(I, g, D.activeMarks, D.pendingMarks, A, null, e)), this.open++;
  }
  closeExtra(I = !1) {
    let g = this.nodes.length - 1;
    if (g > this.open) {
      for (; g > this.open; g--)
        this.nodes[g - 1].content.push(this.nodes[g].finish(I));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen || this.options.topOpen);
  }
  sync(I) {
    for (let g = this.open; g >= 0; g--)
      if (this.nodes[g] == I)
        return this.open = g, !0;
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let I = 0;
    for (let g = this.open; g >= 0; g--) {
      let A = this.nodes[g].content;
      for (let t = A.length - 1; t >= 0; t--)
        I += A[t].nodeSize;
      g && I++;
    }
    return I;
  }
  findAtPoint(I, g) {
    if (this.find)
      for (let A = 0; A < this.find.length; A++)
        this.find[A].node == I && this.find[A].offset == g && (this.find[A].pos = this.currentPos);
  }
  findInside(I) {
    if (this.find)
      for (let g = 0; g < this.find.length; g++)
        this.find[g].pos == null && I.nodeType == 1 && I.contains(this.find[g].node) && (this.find[g].pos = this.currentPos);
  }
  findAround(I, g, A) {
    if (I != g && this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && I.nodeType == 1 && I.contains(this.find[t].node) && g.compareDocumentPosition(this.find[t].node) & (A ? 2 : 4) && (this.find[t].pos = this.currentPos);
  }
  findInText(I) {
    if (this.find)
      for (let g = 0; g < this.find.length; g++)
        this.find[g].node == I && (this.find[g].pos = this.currentPos - (I.nodeValue.length - this.find[g].offset));
  }
  matchesContext(I) {
    if (I.indexOf("|") > -1)
      return I.split(/\s*\|\s*/).some(this.matchesContext, this);
    let g = I.split("/"), A = this.options.context, t = !this.isOpen && (!A || A.parent.type == this.nodes[0].type), D = -(A ? A.depth + 1 : 0) + (t ? 0 : 1), e = (i, N) => {
      for (; i >= 0; i--) {
        let C = g[i];
        if (C == "") {
          if (i == g.length - 1 || i == 0)
            continue;
          for (; N >= D; N--)
            if (e(i - 1, N))
              return !0;
          return !1;
        } else {
          let u = N > 0 || N == 0 && t ? this.nodes[N].type : A && N >= D ? A.node(N - D).type : null;
          if (!u || u.name != C && u.groups.indexOf(C) == -1)
            return !1;
          N--;
        }
      }
      return !0;
    };
    return e(g.length - 1, this.open);
  }
  textblockFromContext() {
    let I = this.options.context;
    if (I)
      for (let g = I.depth; g >= 0; g--) {
        let A = I.node(g).contentMatchAt(I.indexAfter(g)).defaultType;
        if (A && A.isTextblock && A.defaultAttrs)
          return A;
      }
    for (let g in this.parser.schema.nodes) {
      let A = this.parser.schema.nodes[g];
      if (A.isTextblock && A.defaultAttrs)
        return A;
    }
  }
  addPendingMark(I) {
    let g = $l(I, this.top.pendingMarks);
    g && this.top.stashMarks.push(g), this.top.pendingMarks = I.addToSet(this.top.pendingMarks);
  }
  removePendingMark(I, g) {
    for (let A = this.open; A >= 0; A--) {
      let t = this.nodes[A];
      if (t.pendingMarks.lastIndexOf(I) > -1)
        t.pendingMarks = I.removeFromSet(t.pendingMarks);
      else {
        t.activeMarks = I.removeFromSet(t.activeMarks);
        let e = t.popFromStashMark(I);
        e && t.type && t.type.allowsMarkType(e.type) && (t.activeMarks = e.addToSet(t.activeMarks));
      }
      if (t == g)
        break;
    }
  }
}
function Fl(M) {
  for (let I = M.firstChild, g = null; I; I = I.nextSibling) {
    let A = I.nodeType == 1 ? I.nodeName.toLowerCase() : null;
    A && XT.hasOwnProperty(A) && g ? (g.appendChild(I), I = g) : A == "li" ? g = I : A && (g = null);
  }
}
function Xl(M, I) {
  return (M.matches || M.msMatchesSelector || M.webkitMatchesSelector || M.mozMatchesSelector).call(M, I);
}
function Kl(M) {
  let I = /\s*([\w-]+)\s*:\s*([^;]+)/g, g, A = [];
  for (; g = I.exec(M); )
    A.push(g[1], g[2].trim());
  return A;
}
function $j(M) {
  let I = {};
  for (let g in M)
    I[g] = M[g];
  return I;
}
function _l(M, I) {
  let g = I.schema.nodes;
  for (let A in g) {
    let t = g[A];
    if (!t.allowsMarkType(M))
      continue;
    let D = [], e = (i) => {
      D.push(i);
      for (let N = 0; N < i.edgeCount; N++) {
        let { type: C, next: u } = i.edge(N);
        if (C == I || D.indexOf(u) < 0 && e(u))
          return !0;
      }
    };
    if (e(t.contentMatch))
      return !0;
  }
}
function $l(M, I) {
  for (let g = 0; g < I.length; g++)
    if (M.eq(I[g]))
      return I[g];
}
class Gg {
  constructor(I, g) {
    this.nodes = I, this.marks = g;
  }
  serializeFragment(I, g = {}, A) {
    A || (A = EC(g).createDocumentFragment());
    let t = A, D = [];
    return I.forEach((e) => {
      if (D.length || e.marks.length) {
        let i = 0, N = 0;
        for (; i < D.length && N < e.marks.length; ) {
          let C = e.marks[N];
          if (!this.marks[C.type.name]) {
            N++;
            continue;
          }
          if (!C.eq(D[i][0]) || C.type.spec.spanning === !1)
            break;
          i++, N++;
        }
        for (; i < D.length; )
          t = D.pop()[1];
        for (; N < e.marks.length; ) {
          let C = e.marks[N++], u = this.serializeMark(C, e.isInline, g);
          u && (D.push([C, t]), t.appendChild(u.dom), t = u.contentDOM || u.dom);
        }
      }
      t.appendChild(this.serializeNodeInner(e, g));
    }), A;
  }
  serializeNodeInner(I, g) {
    let { dom: A, contentDOM: t } = Gg.renderSpec(EC(g), this.nodes[I.type.name](I));
    if (t) {
      if (I.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(I.content, g, t);
    }
    return A;
  }
  serializeNode(I, g = {}) {
    let A = this.serializeNodeInner(I, g);
    for (let t = I.marks.length - 1; t >= 0; t--) {
      let D = this.serializeMark(I.marks[t], I.isInline, g);
      D && ((D.contentDOM || D.dom).appendChild(A), A = D.dom);
    }
    return A;
  }
  serializeMark(I, g, A = {}) {
    let t = this.marks[I.type.name];
    return t && Gg.renderSpec(EC(A), t(I, g));
  }
  static renderSpec(I, g, A = null) {
    if (typeof g == "string")
      return { dom: I.createTextNode(g) };
    if (g.nodeType != null)
      return { dom: g };
    if (g.dom && g.dom.nodeType != null)
      return g;
    let t = g[0], D = t.indexOf(" ");
    D > 0 && (A = t.slice(0, D), t = t.slice(D + 1));
    let e, i = A ? I.createElementNS(A, t) : I.createElement(t), N = g[1], C = 1;
    if (N && typeof N == "object" && N.nodeType == null && !Array.isArray(N)) {
      C = 2;
      for (let u in N)
        if (N[u] != null) {
          let j = u.indexOf(" ");
          j > 0 ? i.setAttributeNS(u.slice(0, j), u.slice(j + 1), N[u]) : i.setAttribute(u, N[u]);
        }
    }
    for (let u = C; u < g.length; u++) {
      let j = g[u];
      if (j === 0) {
        if (u < g.length - 1 || u > C)
          throw new RangeError("Content hole must be the only child of its parent node");
        return { dom: i, contentDOM: i };
      } else {
        let { dom: n, contentDOM: L } = Gg.renderSpec(I, j, A);
        if (i.appendChild(n), L) {
          if (e)
            throw new RangeError("Multiple content holes");
          e = L;
        }
      }
    }
    return { dom: i, contentDOM: e };
  }
  static fromSchema(I) {
    return I.cached.domSerializer || (I.cached.domSerializer = new Gg(this.nodesFromSchema(I), this.marksFromSchema(I)));
  }
  static nodesFromSchema(I) {
    let g = qj(I.nodes);
    return g.text || (g.text = (A) => A.text), g;
  }
  static marksFromSchema(I) {
    return qj(I.marks);
  }
}
function qj(M) {
  let I = {};
  for (let g in M) {
    let A = M[g].spec.toDOM;
    A && (I[g] = A);
  }
  return I;
}
function EC(M) {
  return M.document || window.document;
}
const KT = 65535, _T = Math.pow(2, 16);
function ql(M, I) {
  return M + I * _T;
}
function In(M) {
  return M & KT;
}
function Iy(M) {
  return (M - (M & KT)) / _T;
}
const $T = 1, qT = 2, Yi = 4, I4 = 8;
class L0 {
  constructor(I, g, A) {
    this.pos = I, this.delInfo = g, this.recover = A;
  }
  get deleted() {
    return (this.delInfo & I4) > 0;
  }
  get deletedBefore() {
    return (this.delInfo & ($T | Yi)) > 0;
  }
  get deletedAfter() {
    return (this.delInfo & (qT | Yi)) > 0;
  }
  get deletedAcross() {
    return (this.delInfo & Yi) > 0;
  }
}
class Dg {
  constructor(I, g = !1) {
    if (this.ranges = I, this.inverted = g, !I.length && Dg.empty)
      return Dg.empty;
  }
  recover(I) {
    let g = 0, A = In(I);
    if (!this.inverted)
      for (let t = 0; t < A; t++)
        g += this.ranges[t * 3 + 2] - this.ranges[t * 3 + 1];
    return this.ranges[A * 3] + g + Iy(I);
  }
  mapResult(I, g = 1) {
    return this._map(I, g, !1);
  }
  map(I, g = 1) {
    return this._map(I, g, !0);
  }
  _map(I, g, A) {
    let t = 0, D = this.inverted ? 2 : 1, e = this.inverted ? 1 : 2;
    for (let i = 0; i < this.ranges.length; i += 3) {
      let N = this.ranges[i] - (this.inverted ? t : 0);
      if (N > I)
        break;
      let C = this.ranges[i + D], u = this.ranges[i + e], j = N + C;
      if (I <= j) {
        let n = C ? I == N ? -1 : I == j ? 1 : g : g, L = N + t + (n < 0 ? 0 : u);
        if (A)
          return L;
        let o = I == (g < 0 ? N : j) ? null : ql(i / 3, I - N), T = I == N ? qT : I == j ? $T : Yi;
        return (g < 0 ? I != N : I != j) && (T |= I4), new L0(L, T, o);
      }
      t += u - C;
    }
    return A ? I + t : new L0(I + t, 0, null);
  }
  touches(I, g) {
    let A = 0, t = In(g), D = this.inverted ? 2 : 1, e = this.inverted ? 1 : 2;
    for (let i = 0; i < this.ranges.length; i += 3) {
      let N = this.ranges[i] - (this.inverted ? A : 0);
      if (N > I)
        break;
      let C = this.ranges[i + D], u = N + C;
      if (I <= u && i == t * 3)
        return !0;
      A += this.ranges[i + e] - C;
    }
    return !1;
  }
  forEach(I) {
    let g = this.inverted ? 2 : 1, A = this.inverted ? 1 : 2;
    for (let t = 0, D = 0; t < this.ranges.length; t += 3) {
      let e = this.ranges[t], i = e - (this.inverted ? D : 0), N = e + (this.inverted ? 0 : D), C = this.ranges[t + g], u = this.ranges[t + A];
      I(i, i + C, N, N + u), D += u - C;
    }
  }
  invert() {
    return new Dg(this.ranges, !this.inverted);
  }
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  static offset(I) {
    return I == 0 ? Dg.empty : new Dg(I < 0 ? [0, -I, 0] : [0, 0, I]);
  }
}
Dg.empty = new Dg([]);
class AD {
  constructor(I = [], g, A = 0, t = I.length) {
    this.maps = I, this.mirror = g, this.from = A, this.to = t;
  }
  slice(I = 0, g = this.maps.length) {
    return new AD(this.maps, this.mirror, I, g);
  }
  copy() {
    return new AD(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  }
  appendMap(I, g) {
    this.to = this.maps.push(I), g != null && this.setMirror(this.maps.length - 1, g);
  }
  appendMapping(I) {
    for (let g = 0, A = this.maps.length; g < I.maps.length; g++) {
      let t = I.getMirror(g);
      this.appendMap(I.maps[g], t != null && t < g ? A + t : void 0);
    }
  }
  getMirror(I) {
    if (this.mirror) {
      for (let g = 0; g < this.mirror.length; g++)
        if (this.mirror[g] == I)
          return this.mirror[g + (g % 2 ? -1 : 1)];
    }
  }
  setMirror(I, g) {
    this.mirror || (this.mirror = []), this.mirror.push(I, g);
  }
  appendMappingInverted(I) {
    for (let g = I.maps.length - 1, A = this.maps.length + I.maps.length; g >= 0; g--) {
      let t = I.getMirror(g);
      this.appendMap(I.maps[g].invert(), t != null && t > g ? A - t - 1 : void 0);
    }
  }
  invert() {
    let I = new AD();
    return I.appendMappingInverted(this), I;
  }
  map(I, g = 1) {
    if (this.mirror)
      return this._map(I, g, !0);
    for (let A = this.from; A < this.to; A++)
      I = this.maps[A].map(I, g);
    return I;
  }
  mapResult(I, g = 1) {
    return this._map(I, g, !1);
  }
  _map(I, g, A) {
    let t = 0;
    for (let D = this.from; D < this.to; D++) {
      let e = this.maps[D], i = e.mapResult(I, g);
      if (i.recover != null) {
        let N = this.getMirror(D);
        if (N != null && N > D && N < this.to) {
          D = N, I = this.maps[N].recover(i.recover);
          continue;
        }
      }
      t |= i.delInfo, I = i.pos;
    }
    return A ? I : new L0(I, t, null);
  }
}
const dC = /* @__PURE__ */ Object.create(null);
class RM {
  getMap() {
    return Dg.empty;
  }
  merge(I) {
    return null;
  }
  static fromJSON(I, g) {
    if (!g || !g.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let A = dC[g.stepType];
    if (!A)
      throw new RangeError(`No step type ${g.stepType} defined`);
    return A.fromJSON(I, g);
  }
  static jsonID(I, g) {
    if (I in dC)
      throw new RangeError("Duplicate use of step JSON ID " + I);
    return dC[I] = g, g.prototype.jsonID = I, g;
  }
}
class eM {
  constructor(I, g) {
    this.doc = I, this.failed = g;
  }
  static ok(I) {
    return new eM(I, null);
  }
  static fail(I) {
    return new eM(null, I);
  }
  static fromReplace(I, g, A, t) {
    try {
      return eM.ok(I.replace(g, A, t));
    } catch (D) {
      if (D instanceof le)
        return eM.fail(D.message);
      throw D;
    }
  }
}
function ju(M, I, g) {
  let A = [];
  for (let t = 0; t < M.childCount; t++) {
    let D = M.child(t);
    D.content.size && (D = D.copy(ju(D.content, I, D))), D.isInline && (D = I(D, g, t)), A.push(D);
  }
  return G.fromArray(A);
}
class xA extends RM {
  constructor(I, g, A) {
    super(), this.from = I, this.to = g, this.mark = A;
  }
  apply(I) {
    let g = I.slice(this.from, this.to), A = I.resolve(this.from), t = A.node(A.sharedDepth(this.to)), D = new K(ju(g.content, (e, i) => !e.isAtom || !i.type.allowsMarkType(this.mark.type) ? e : e.mark(this.mark.addToSet(e.marks)), t), g.openStart, g.openEnd);
    return eM.fromReplace(I, this.from, this.to, D);
  }
  invert() {
    return new Wg(this.from, this.to, this.mark);
  }
  map(I) {
    let g = I.mapResult(this.from, 1), A = I.mapResult(this.to, -1);
    return g.deleted && A.deleted || g.pos >= A.pos ? null : new xA(g.pos, A.pos, this.mark);
  }
  merge(I) {
    return I instanceof xA && I.mark.eq(this.mark) && this.from <= I.to && this.to >= I.from ? new xA(Math.min(this.from, I.from), Math.max(this.to, I.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  static fromJSON(I, g) {
    if (typeof g.from != "number" || typeof g.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new xA(g.from, g.to, I.markFromJSON(g.mark));
  }
}
RM.jsonID("addMark", xA);
class Wg extends RM {
  constructor(I, g, A) {
    super(), this.from = I, this.to = g, this.mark = A;
  }
  apply(I) {
    let g = I.slice(this.from, this.to), A = new K(ju(g.content, (t) => t.mark(this.mark.removeFromSet(t.marks)), I), g.openStart, g.openEnd);
    return eM.fromReplace(I, this.from, this.to, A);
  }
  invert() {
    return new xA(this.from, this.to, this.mark);
  }
  map(I) {
    let g = I.mapResult(this.from, 1), A = I.mapResult(this.to, -1);
    return g.deleted && A.deleted || g.pos >= A.pos ? null : new Wg(g.pos, A.pos, this.mark);
  }
  merge(I) {
    return I instanceof Wg && I.mark.eq(this.mark) && this.from <= I.to && this.to >= I.from ? new Wg(Math.min(this.from, I.from), Math.max(this.to, I.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  static fromJSON(I, g) {
    if (typeof g.from != "number" || typeof g.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new Wg(g.from, g.to, I.markFromJSON(g.mark));
  }
}
RM.jsonID("removeMark", Wg);
class rA extends RM {
  constructor(I, g) {
    super(), this.pos = I, this.mark = g;
  }
  apply(I) {
    let g = I.nodeAt(this.pos);
    if (!g)
      return eM.fail("No node at mark step's position");
    let A = g.type.create(g.attrs, null, this.mark.addToSet(g.marks));
    return eM.fromReplace(I, this.pos, this.pos + 1, new K(G.from(A), 0, g.isLeaf ? 0 : 1));
  }
  invert(I) {
    let g = I.nodeAt(this.pos);
    if (g) {
      let A = this.mark.addToSet(g.marks);
      if (A.length == g.marks.length) {
        for (let t = 0; t < g.marks.length; t++)
          if (!g.marks[t].isInSet(A))
            return new rA(this.pos, g.marks[t]);
        return new rA(this.pos, this.mark);
      }
    }
    return new jD(this.pos, this.mark);
  }
  map(I) {
    let g = I.mapResult(this.pos, 1);
    return g.deletedAfter ? null : new rA(g.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  static fromJSON(I, g) {
    if (typeof g.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new rA(g.pos, I.markFromJSON(g.mark));
  }
}
RM.jsonID("addNodeMark", rA);
class jD extends RM {
  constructor(I, g) {
    super(), this.pos = I, this.mark = g;
  }
  apply(I) {
    let g = I.nodeAt(this.pos);
    if (!g)
      return eM.fail("No node at mark step's position");
    let A = g.type.create(g.attrs, null, this.mark.removeFromSet(g.marks));
    return eM.fromReplace(I, this.pos, this.pos + 1, new K(G.from(A), 0, g.isLeaf ? 0 : 1));
  }
  invert(I) {
    let g = I.nodeAt(this.pos);
    return !g || !this.mark.isInSet(g.marks) ? this : new rA(this.pos, this.mark);
  }
  map(I) {
    let g = I.mapResult(this.pos, 1);
    return g.deletedAfter ? null : new jD(g.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  static fromJSON(I, g) {
    if (typeof g.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new jD(g.pos, I.markFromJSON(g.mark));
  }
}
RM.jsonID("removeNodeMark", jD);
class dM extends RM {
  constructor(I, g, A, t = !1) {
    super(), this.from = I, this.to = g, this.slice = A, this.structure = t;
  }
  apply(I) {
    return this.structure && o0(I, this.from, this.to) ? eM.fail("Structure replace would overwrite content") : eM.fromReplace(I, this.from, this.to, this.slice);
  }
  getMap() {
    return new Dg([this.from, this.to - this.from, this.slice.size]);
  }
  invert(I) {
    return new dM(this.from, this.from + this.slice.size, I.slice(this.from, this.to));
  }
  map(I) {
    let g = I.mapResult(this.from, 1), A = I.mapResult(this.to, -1);
    return g.deletedAcross && A.deletedAcross ? null : new dM(g.pos, Math.max(g.pos, A.pos), this.slice);
  }
  merge(I) {
    if (!(I instanceof dM) || I.structure || this.structure)
      return null;
    if (this.from + this.slice.size == I.from && !this.slice.openEnd && !I.slice.openStart) {
      let g = this.slice.size + I.slice.size == 0 ? K.empty : new K(this.slice.content.append(I.slice.content), this.slice.openStart, I.slice.openEnd);
      return new dM(this.from, this.to + (I.to - I.from), g, this.structure);
    } else if (I.to == this.from && !this.slice.openStart && !I.slice.openEnd) {
      let g = this.slice.size + I.slice.size == 0 ? K.empty : new K(I.slice.content.append(this.slice.content), I.slice.openStart, this.slice.openEnd);
      return new dM(I.from, this.to, g, this.structure);
    } else
      return null;
  }
  toJSON() {
    let I = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (I.slice = this.slice.toJSON()), this.structure && (I.structure = !0), I;
  }
  static fromJSON(I, g) {
    if (typeof g.from != "number" || typeof g.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new dM(g.from, g.to, K.fromJSON(I, g.slice), !!g.structure);
  }
}
RM.jsonID("replace", dM);
class uM extends RM {
  constructor(I, g, A, t, D, e, i = !1) {
    super(), this.from = I, this.to = g, this.gapFrom = A, this.gapTo = t, this.slice = D, this.insert = e, this.structure = i;
  }
  apply(I) {
    if (this.structure && (o0(I, this.from, this.gapFrom) || o0(I, this.gapTo, this.to)))
      return eM.fail("Structure gap-replace would overwrite content");
    let g = I.slice(this.gapFrom, this.gapTo);
    if (g.openStart || g.openEnd)
      return eM.fail("Gap is not a flat range");
    let A = this.slice.insertAt(this.insert, g.content);
    return A ? eM.fromReplace(I, this.from, this.to, A) : eM.fail("Content does not fit in gap");
  }
  getMap() {
    return new Dg([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(I) {
    let g = this.gapTo - this.gapFrom;
    return new uM(this.from, this.from + this.slice.size + g, this.from + this.insert, this.from + this.insert + g, I.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(I) {
    let g = I.mapResult(this.from, 1), A = I.mapResult(this.to, -1), t = I.map(this.gapFrom, -1), D = I.map(this.gapTo, 1);
    return g.deletedAcross && A.deletedAcross || t < g.pos || D > A.pos ? null : new uM(g.pos, A.pos, t, D, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let I = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (I.slice = this.slice.toJSON()), this.structure && (I.structure = !0), I;
  }
  static fromJSON(I, g) {
    if (typeof g.from != "number" || typeof g.to != "number" || typeof g.gapFrom != "number" || typeof g.gapTo != "number" || typeof g.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new uM(g.from, g.to, g.gapFrom, g.gapTo, K.fromJSON(I, g.slice), g.insert, !!g.structure);
  }
}
RM.jsonID("replaceAround", uM);
function o0(M, I, g) {
  let A = M.resolve(I), t = g - I, D = A.depth;
  for (; t > 0 && D > 0 && A.indexAfter(D) == A.node(D).childCount; )
    D--, t--;
  if (t > 0) {
    let e = A.node(D).maybeChild(A.indexAfter(D));
    for (; t > 0; ) {
      if (!e || e.isLeaf)
        return !0;
      e = e.firstChild, t--;
    }
  }
  return !1;
}
function My(M, I, g, A) {
  let t = [], D = [], e, i;
  M.doc.nodesBetween(I, g, (N, C, u) => {
    if (!N.isInline)
      return;
    let j = N.marks;
    if (!A.isInSet(j) && u.type.allowsMarkType(A.type)) {
      let n = Math.max(C, I), L = Math.min(C + N.nodeSize, g), o = A.addToSet(j);
      for (let T = 0; T < j.length; T++)
        j[T].isInSet(o) || (e && e.to == n && e.mark.eq(j[T]) ? e.to = L : t.push(e = new Wg(n, L, j[T])));
      i && i.to == n ? i.to = L : D.push(i = new xA(n, L, A));
    }
  }), t.forEach((N) => M.step(N)), D.forEach((N) => M.step(N));
}
function gy(M, I, g, A) {
  let t = [], D = 0;
  M.doc.nodesBetween(I, g, (e, i) => {
    if (!e.isInline)
      return;
    D++;
    let N = null;
    if (A instanceof UN) {
      let C = e.marks, u;
      for (; u = A.isInSet(C); )
        (N || (N = [])).push(u), C = u.removeFromSet(C);
    } else
      A ? A.isInSet(e.marks) && (N = [A]) : N = e.marks;
    if (N && N.length) {
      let C = Math.min(i + e.nodeSize, g);
      for (let u = 0; u < N.length; u++) {
        let j = N[u], n;
        for (let L = 0; L < t.length; L++) {
          let o = t[L];
          o.step == D - 1 && j.eq(t[L].style) && (n = o);
        }
        n ? (n.to = C, n.step = D) : t.push({ style: j, from: Math.max(i, I), to: C, step: D });
      }
    }
  }), t.forEach((e) => M.step(new Wg(e.from, e.to, e.style)));
}
function Ay(M, I, g, A = g.contentMatch) {
  let t = M.doc.nodeAt(I), D = [], e = I + 1;
  for (let i = 0; i < t.childCount; i++) {
    let N = t.child(i), C = e + N.nodeSize, u = A.matchType(N.type);
    if (!u)
      D.push(new dM(e, C, K.empty));
    else {
      A = u;
      for (let j = 0; j < N.marks.length; j++)
        g.allowsMarkType(N.marks[j].type) || M.step(new Wg(e, C, N.marks[j]));
    }
    e = C;
  }
  if (!A.validEnd) {
    let i = A.fillBefore(G.empty, !0);
    M.replace(e, e, new K(i, 0, 0));
  }
  for (let i = D.length - 1; i >= 0; i--)
    M.step(D[i]);
}
function ty(M, I, g) {
  return (I == 0 || M.canReplace(I, M.childCount)) && (g == M.childCount || M.canReplace(0, g));
}
function hD(M) {
  let g = M.parent.content.cutByIndex(M.startIndex, M.endIndex);
  for (let A = M.depth; ; --A) {
    let t = M.$from.node(A), D = M.$from.index(A), e = M.$to.indexAfter(A);
    if (A < M.depth && t.canReplace(D, e, g))
      return A;
    if (A == 0 || t.type.spec.isolating || !ty(t, D, e))
      break;
  }
  return null;
}
function Dy(M, I, g) {
  let { $from: A, $to: t, depth: D } = I, e = A.before(D + 1), i = t.after(D + 1), N = e, C = i, u = G.empty, j = 0;
  for (let o = D, T = !1; o > g; o--)
    T || A.index(o) > 0 ? (T = !0, u = G.from(A.node(o).copy(u)), j++) : N--;
  let n = G.empty, L = 0;
  for (let o = D, T = !1; o > g; o--)
    T || t.after(o + 1) < t.end(o) ? (T = !0, n = G.from(t.node(o).copy(n)), L++) : C++;
  M.step(new uM(N, C, e, i, new K(u.append(n), j, L), u.size - j, !0));
}
function nu(M, I, g = null, A = M) {
  let t = ey(M, I), D = t && iy(A, I);
  return D ? t.map(Mn).concat({ type: I, attrs: g }).concat(D.map(Mn)) : null;
}
function Mn(M) {
  return { type: M, attrs: null };
}
function ey(M, I) {
  let { parent: g, startIndex: A, endIndex: t } = M, D = g.contentMatchAt(A).findWrapping(I);
  if (!D)
    return null;
  let e = D.length ? D[0] : I;
  return g.canReplaceWith(A, t, e) ? D : null;
}
function iy(M, I) {
  let { parent: g, startIndex: A, endIndex: t } = M, D = g.child(A), e = I.contentMatch.findWrapping(D.type);
  if (!e)
    return null;
  let N = (e.length ? e[e.length - 1] : I).contentMatch;
  for (let C = A; N && C < t; C++)
    N = N.matchType(g.child(C).type);
  return !N || !N.validEnd ? null : e;
}
function Ny(M, I, g) {
  let A = G.empty;
  for (let e = g.length - 1; e >= 0; e--) {
    if (A.size) {
      let i = g[e].type.contentMatch.matchFragment(A);
      if (!i || !i.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    A = G.from(g[e].type.create(g[e].attrs, A));
  }
  let t = I.start, D = I.end;
  M.step(new uM(t, D, t, D, new K(A, 0, 0), g.length, !0));
}
function Cy(M, I, g, A, t) {
  if (!A.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let D = M.steps.length;
  M.doc.nodesBetween(I, g, (e, i) => {
    if (e.isTextblock && !e.hasMarkup(A, t) && uy(M.doc, M.mapping.slice(D).map(i), A)) {
      M.clearIncompatible(M.mapping.slice(D).map(i, 1), A);
      let N = M.mapping.slice(D), C = N.map(i, 1), u = N.map(i + e.nodeSize, 1);
      return M.step(new uM(C, u, C + 1, u - 1, new K(G.from(A.create(t, null, e.marks)), 0, 0), 1, !0)), !1;
    }
  });
}
function uy(M, I, g) {
  let A = M.resolve(I), t = A.index();
  return A.parent.canReplaceWith(t, t + 1, g);
}
function jy(M, I, g, A, t) {
  let D = M.doc.nodeAt(I);
  if (!D)
    throw new RangeError("No node at given position");
  g || (g = D.type);
  let e = g.create(A, null, t || D.marks);
  if (D.isLeaf)
    return M.replaceWith(I, I + D.nodeSize, e);
  if (!g.validContent(D.content))
    throw new RangeError("Invalid content for node type " + g.name);
  M.step(new uM(I, I + D.nodeSize, I + 1, I + D.nodeSize - 1, new K(G.from(e), 0, 0), 1, !0));
}
function tD(M, I, g = 1, A) {
  let t = M.resolve(I), D = t.depth - g, e = A && A[A.length - 1] || t.parent;
  if (D < 0 || t.parent.type.spec.isolating || !t.parent.canReplace(t.index(), t.parent.childCount) || !e.type.validContent(t.parent.content.cutByIndex(t.index(), t.parent.childCount)))
    return !1;
  for (let C = t.depth - 1, u = g - 2; C > D; C--, u--) {
    let j = t.node(C), n = t.index(C);
    if (j.type.spec.isolating)
      return !1;
    let L = j.content.cutByIndex(n, j.childCount), o = A && A[u] || j;
    if (o != j && (L = L.replaceChild(0, o.type.create(o.attrs))), !j.canReplace(n + 1, j.childCount) || !o.type.validContent(L))
      return !1;
  }
  let i = t.indexAfter(D), N = A && A[0];
  return t.node(D).canReplaceWith(i, i, N ? N.type : t.node(D + 1).type);
}
function ny(M, I, g = 1, A) {
  let t = M.doc.resolve(I), D = G.empty, e = G.empty;
  for (let i = t.depth, N = t.depth - g, C = g - 1; i > N; i--, C--) {
    D = G.from(t.node(i).copy(D));
    let u = A && A[C];
    e = G.from(u ? u.type.create(u.attrs, e) : t.node(i).copy(e));
  }
  M.step(new dM(I, I, new K(D.append(e), g, g), !0));
}
function OD(M, I) {
  let g = M.resolve(I), A = g.index();
  return Ly(g.nodeBefore, g.nodeAfter) && g.parent.canReplace(A, A + 1);
}
function Ly(M, I) {
  return !!(M && I && !M.isLeaf && M.canAppend(I));
}
function oy(M, I, g) {
  let A = new dM(I - g, I + g, K.empty, !0);
  M.step(A);
}
function Ty(M, I, g) {
  let A = M.resolve(I);
  if (A.parent.canReplaceWith(A.index(), A.index(), g))
    return I;
  if (A.parentOffset == 0)
    for (let t = A.depth - 1; t >= 0; t--) {
      let D = A.index(t);
      if (A.node(t).canReplaceWith(D, D, g))
        return A.before(t + 1);
      if (D > 0)
        return null;
    }
  if (A.parentOffset == A.parent.content.size)
    for (let t = A.depth - 1; t >= 0; t--) {
      let D = A.indexAfter(t);
      if (A.node(t).canReplaceWith(D, D, g))
        return A.after(t + 1);
      if (D < A.node(t).childCount)
        return null;
    }
  return null;
}
function M4(M, I, g) {
  let A = M.resolve(I);
  if (!g.content.size)
    return I;
  let t = g.content;
  for (let D = 0; D < g.openStart; D++)
    t = t.firstChild.content;
  for (let D = 1; D <= (g.openStart == 0 && g.size ? 2 : 1); D++)
    for (let e = A.depth; e >= 0; e--) {
      let i = e == A.depth ? 0 : A.pos <= (A.start(e + 1) + A.end(e + 1)) / 2 ? -1 : 1, N = A.index(e) + (i > 0 ? 1 : 0), C = A.node(e), u = !1;
      if (D == 1)
        u = C.canReplace(N, N, t);
      else {
        let j = C.contentMatchAt(N).findWrapping(t.firstChild.type);
        u = j && C.canReplaceWith(N, N, j[0]);
      }
      if (u)
        return i == 0 ? A.pos : i < 0 ? A.before(e + 1) : A.after(e + 1);
    }
  return null;
}
function Lu(M, I, g = I, A = K.empty) {
  if (I == g && !A.size)
    return null;
  let t = M.resolve(I), D = M.resolve(g);
  return g4(t, D, A) ? new dM(I, g, A) : new sy(t, D, A).fit();
}
function g4(M, I, g) {
  return !g.openStart && !g.openEnd && M.start() == I.start() && M.parent.canReplace(M.index(), I.index(), g.content);
}
class sy {
  constructor(I, g, A) {
    this.$from = I, this.$to = g, this.unplaced = A, this.frontier = [], this.placed = G.empty;
    for (let t = 0; t <= I.depth; t++) {
      let D = I.node(t);
      this.frontier.push({
        type: D.type,
        match: D.contentMatchAt(I.indexAfter(t))
      });
    }
    for (let t = I.depth; t > 0; t--)
      this.placed = G.from(I.node(t).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let C = this.findFittable();
      C ? this.placeNodes(C) : this.openMore() || this.dropNode();
    }
    let I = this.mustMoveInline(), g = this.placed.size - this.depth - this.$from.depth, A = this.$from, t = this.close(I < 0 ? this.$to : A.doc.resolve(I));
    if (!t)
      return null;
    let D = this.placed, e = A.depth, i = t.depth;
    for (; e && i && D.childCount == 1; )
      D = D.firstChild.content, e--, i--;
    let N = new K(D, e, i);
    return I > -1 ? new uM(A.pos, I, this.$to.pos, this.$to.end(), N, g) : N.size || A.pos != this.$to.pos ? new dM(A.pos, t.pos, N) : null;
  }
  findFittable() {
    for (let I = 1; I <= 2; I++)
      for (let g = this.unplaced.openStart; g >= 0; g--) {
        let A, t = null;
        g ? (t = zC(this.unplaced.content, g - 1).firstChild, A = t.content) : A = this.unplaced.content;
        let D = A.firstChild;
        for (let e = this.depth; e >= 0; e--) {
          let { type: i, match: N } = this.frontier[e], C, u = null;
          if (I == 1 && (D ? N.matchType(D.type) || (u = N.fillBefore(G.from(D), !1)) : t && i.compatibleContent(t.type)))
            return { sliceDepth: g, frontierDepth: e, parent: t, inject: u };
          if (I == 2 && D && (C = N.findWrapping(D.type)))
            return { sliceDepth: g, frontierDepth: e, parent: t, wrap: C };
          if (t && N.matchType(t.type))
            break;
        }
      }
  }
  openMore() {
    let { content: I, openStart: g, openEnd: A } = this.unplaced, t = zC(I, g);
    return !t.childCount || t.firstChild.isLeaf ? !1 : (this.unplaced = new K(I, g + 1, Math.max(A, t.size + g >= I.size - A ? g + 1 : 0)), !0);
  }
  dropNode() {
    let { content: I, openStart: g, openEnd: A } = this.unplaced, t = zC(I, g);
    if (t.childCount <= 1 && g > 0) {
      let D = I.size - g <= g + t.size;
      this.unplaced = new K($D(I, g - 1, 1), g - 1, D ? g - 1 : A);
    } else
      this.unplaced = new K($D(I, g, 1), g, A);
  }
  placeNodes({ sliceDepth: I, frontierDepth: g, parent: A, inject: t, wrap: D }) {
    for (; this.depth > g; )
      this.closeFrontierNode();
    if (D)
      for (let T = 0; T < D.length; T++)
        this.openFrontierNode(D[T]);
    let e = this.unplaced, i = A ? A.content : e.content, N = e.openStart - I, C = 0, u = [], { match: j, type: n } = this.frontier[g];
    if (t) {
      for (let T = 0; T < t.childCount; T++)
        u.push(t.child(T));
      j = j.matchFragment(t);
    }
    let L = i.size + I - (e.content.size - e.openEnd);
    for (; C < i.childCount; ) {
      let T = i.child(C), s = j.matchType(T.type);
      if (!s)
        break;
      C++, (C > 1 || N == 0 || T.content.size) && (j = s, u.push(A4(T.mark(n.allowedMarks(T.marks)), C == 1 ? N : 0, C == i.childCount ? L : -1)));
    }
    let o = C == i.childCount;
    o || (L = -1), this.placed = qD(this.placed, g, G.from(u)), this.frontier[g].match = j, o && L < 0 && A && A.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let T = 0, s = i; T < L; T++) {
      let S = s.lastChild;
      this.frontier.push({ type: S.type, match: S.contentMatchAt(S.childCount) }), s = S.content;
    }
    this.unplaced = o ? I == 0 ? K.empty : new K($D(e.content, I - 1, 1), I - 1, L < 0 ? e.openEnd : I - 1) : new K($D(e.content, I, C), e.openStart, e.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let I = this.frontier[this.depth], g;
    if (!I.type.isTextblock || !mC(this.$to, this.$to.depth, I.type, I.match, !1) || this.$to.depth == this.depth && (g = this.findCloseLevel(this.$to)) && g.depth == this.depth)
      return -1;
    let { depth: A } = this.$to, t = this.$to.after(A);
    for (; A > 1 && t == this.$to.end(--A); )
      ++t;
    return t;
  }
  findCloseLevel(I) {
    I:
      for (let g = Math.min(this.depth, I.depth); g >= 0; g--) {
        let { match: A, type: t } = this.frontier[g], D = g < I.depth && I.end(g + 1) == I.pos + (I.depth - (g + 1)), e = mC(I, g, t, A, D);
        if (!!e) {
          for (let i = g - 1; i >= 0; i--) {
            let { match: N, type: C } = this.frontier[i], u = mC(I, i, C, N, !0);
            if (!u || u.childCount)
              continue I;
          }
          return { depth: g, fit: e, move: D ? I.doc.resolve(I.after(g + 1)) : I };
        }
      }
  }
  close(I) {
    let g = this.findCloseLevel(I);
    if (!g)
      return null;
    for (; this.depth > g.depth; )
      this.closeFrontierNode();
    g.fit.childCount && (this.placed = qD(this.placed, g.depth, g.fit)), I = g.move;
    for (let A = g.depth + 1; A <= I.depth; A++) {
      let t = I.node(A), D = t.type.contentMatch.fillBefore(t.content, !0, I.index(A));
      this.openFrontierNode(t.type, t.attrs, D);
    }
    return I;
  }
  openFrontierNode(I, g = null, A) {
    let t = this.frontier[this.depth];
    t.match = t.match.matchType(I), this.placed = qD(this.placed, this.depth, G.from(I.create(g, A))), this.frontier.push({ type: I, match: I.contentMatch });
  }
  closeFrontierNode() {
    let g = this.frontier.pop().match.fillBefore(G.empty, !0);
    g.childCount && (this.placed = qD(this.placed, this.frontier.length, g));
  }
}
function $D(M, I, g) {
  return I == 0 ? M.cutByIndex(g, M.childCount) : M.replaceChild(0, M.firstChild.copy($D(M.firstChild.content, I - 1, g)));
}
function qD(M, I, g) {
  return I == 0 ? M.append(g) : M.replaceChild(M.childCount - 1, M.lastChild.copy(qD(M.lastChild.content, I - 1, g)));
}
function zC(M, I) {
  for (let g = 0; g < I; g++)
    M = M.firstChild.content;
  return M;
}
function A4(M, I, g) {
  if (I <= 0)
    return M;
  let A = M.content;
  return I > 1 && (A = A.replaceChild(0, A4(A.firstChild, I - 1, A.childCount == 1 ? g - 1 : 0))), I > 0 && (A = M.type.contentMatch.fillBefore(A).append(A), g <= 0 && (A = A.append(M.type.contentMatch.matchFragment(A).fillBefore(G.empty, !0)))), M.copy(A);
}
function mC(M, I, g, A, t) {
  let D = M.node(I), e = t ? M.indexAfter(I) : M.index(I);
  if (e == D.childCount && !g.compatibleContent(D.type))
    return null;
  let i = A.fillBefore(D.content, !0, e);
  return i && !Sy(g, D.content, e) ? i : null;
}
function Sy(M, I, g) {
  for (let A = g; A < I.childCount; A++)
    if (!M.allowsMarks(I.child(A).marks))
      return !0;
  return !1;
}
function ay(M) {
  return M.spec.defining || M.spec.definingForContent;
}
function ly(M, I, g, A) {
  if (!A.size)
    return M.deleteRange(I, g);
  let t = M.doc.resolve(I), D = M.doc.resolve(g);
  if (g4(t, D, A))
    return M.step(new dM(I, g, A));
  let e = D4(t, M.doc.resolve(g));
  e[e.length - 1] == 0 && e.pop();
  let i = -(t.depth + 1);
  e.unshift(i);
  for (let n = t.depth, L = t.pos - 1; n > 0; n--, L--) {
    let o = t.node(n).type.spec;
    if (o.defining || o.definingAsContext || o.isolating)
      break;
    e.indexOf(n) > -1 ? i = n : t.before(n) == L && e.splice(1, 0, -n);
  }
  let N = e.indexOf(i), C = [], u = A.openStart;
  for (let n = A.content, L = 0; ; L++) {
    let o = n.firstChild;
    if (C.push(o), L == A.openStart)
      break;
    n = o.content;
  }
  for (let n = u - 1; n >= 0; n--) {
    let L = C[n].type, o = ay(L);
    if (o && t.node(N).type != L)
      u = n;
    else if (o || !L.isTextblock)
      break;
  }
  for (let n = A.openStart; n >= 0; n--) {
    let L = (n + u + 1) % (A.openStart + 1), o = C[L];
    if (!!o)
      for (let T = 0; T < e.length; T++) {
        let s = e[(T + N) % e.length], S = !0;
        s < 0 && (S = !1, s = -s);
        let y = t.node(s - 1), x = t.index(s - 1);
        if (y.canReplaceWith(x, x, o.type, o.marks))
          return M.replace(t.before(s), S ? D.after(s) : g, new K(t4(A.content, 0, A.openStart, L), L, A.openEnd));
      }
  }
  let j = M.steps.length;
  for (let n = e.length - 1; n >= 0 && (M.replace(I, g, A), !(M.steps.length > j)); n--) {
    let L = e[n];
    L < 0 || (I = t.before(L), g = D.after(L));
  }
}
function t4(M, I, g, A, t) {
  if (I < g) {
    let D = M.firstChild;
    M = M.replaceChild(0, D.copy(t4(D.content, I + 1, g, A, D)));
  }
  if (I > A) {
    let D = t.contentMatchAt(0), e = D.fillBefore(M).append(M);
    M = e.append(D.matchFragment(e).fillBefore(G.empty, !0));
  }
  return M;
}
function yy(M, I, g, A) {
  if (!A.isInline && I == g && M.doc.resolve(I).parent.content.size) {
    let t = Ty(M.doc, I, A.type);
    t != null && (I = g = t);
  }
  M.replaceRange(I, g, new K(G.from(A), 0, 0));
}
function cy(M, I, g) {
  let A = M.doc.resolve(I), t = M.doc.resolve(g), D = D4(A, t);
  for (let e = 0; e < D.length; e++) {
    let i = D[e], N = e == D.length - 1;
    if (N && i == 0 || A.node(i).type.contentMatch.validEnd)
      return M.delete(A.start(i), t.end(i));
    if (i > 0 && (N || A.node(i - 1).canReplace(A.index(i - 1), t.indexAfter(i - 1))))
      return M.delete(A.before(i), t.after(i));
  }
  for (let e = 1; e <= A.depth && e <= t.depth; e++)
    if (I - A.start(e) == A.depth - e && g > A.end(e) && t.end(e) - g != t.depth - e)
      return M.delete(A.before(e), g);
  M.delete(I, g);
}
function D4(M, I) {
  let g = [], A = Math.min(M.depth, I.depth);
  for (let t = A; t >= 0; t--) {
    let D = M.start(t);
    if (D < M.pos - (M.depth - t) || I.end(t) > I.pos + (I.depth - t) || M.node(t).type.spec.isolating || I.node(t).type.spec.isolating)
      break;
    (D == I.start(t) || t == M.depth && t == I.depth && M.parent.inlineContent && I.parent.inlineContent && t && I.start(t - 1) == D - 1) && g.push(t);
  }
  return g;
}
class DD extends RM {
  constructor(I, g, A) {
    super(), this.pos = I, this.attr = g, this.value = A;
  }
  apply(I) {
    let g = I.nodeAt(this.pos);
    if (!g)
      return eM.fail("No node at attribute step's position");
    let A = /* @__PURE__ */ Object.create(null);
    for (let D in g.attrs)
      A[D] = g.attrs[D];
    A[this.attr] = this.value;
    let t = g.type.create(A, null, g.marks);
    return eM.fromReplace(I, this.pos, this.pos + 1, new K(G.from(t), 0, g.isLeaf ? 0 : 1));
  }
  getMap() {
    return Dg.empty;
  }
  invert(I) {
    return new DD(this.pos, this.attr, I.nodeAt(this.pos).attrs[this.attr]);
  }
  map(I) {
    let g = I.mapResult(this.pos, 1);
    return g.deletedAfter ? null : new DD(g.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(I, g) {
    if (typeof g.pos != "number" || typeof g.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new DD(g.pos, g.attr, g.value);
  }
}
RM.jsonID("attr", DD);
let nD = class extends Error {
};
nD = function M(I) {
  let g = Error.call(this, I);
  return g.__proto__ = M.prototype, g;
};
nD.prototype = Object.create(Error.prototype);
nD.prototype.constructor = nD;
nD.prototype.name = "TransformError";
class ou {
  constructor(I) {
    this.doc = I, this.steps = [], this.docs = [], this.mapping = new AD();
  }
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  step(I) {
    let g = this.maybeStep(I);
    if (g.failed)
      throw new nD(g.failed);
    return this;
  }
  maybeStep(I) {
    let g = I.apply(this.doc);
    return g.failed || this.addStep(I, g.doc), g;
  }
  get docChanged() {
    return this.steps.length > 0;
  }
  addStep(I, g) {
    this.docs.push(this.doc), this.steps.push(I), this.mapping.appendMap(I.getMap()), this.doc = g;
  }
  replace(I, g = I, A = K.empty) {
    let t = Lu(this.doc, I, g, A);
    return t && this.step(t), this;
  }
  replaceWith(I, g, A) {
    return this.replace(I, g, new K(G.from(A), 0, 0));
  }
  delete(I, g) {
    return this.replace(I, g, K.empty);
  }
  insert(I, g) {
    return this.replaceWith(I, I, g);
  }
  replaceRange(I, g, A) {
    return ly(this, I, g, A), this;
  }
  replaceRangeWith(I, g, A) {
    return yy(this, I, g, A), this;
  }
  deleteRange(I, g) {
    return cy(this, I, g), this;
  }
  lift(I, g) {
    return Dy(this, I, g), this;
  }
  join(I, g = 1) {
    return oy(this, I, g), this;
  }
  wrap(I, g) {
    return Ny(this, I, g), this;
  }
  setBlockType(I, g = I, A, t = null) {
    return Cy(this, I, g, A, t), this;
  }
  setNodeMarkup(I, g, A = null, t = []) {
    return jy(this, I, g, A, t), this;
  }
  setNodeAttribute(I, g, A) {
    return this.step(new DD(I, g, A)), this;
  }
  addNodeMark(I, g) {
    return this.step(new rA(I, g)), this;
  }
  removeNodeMark(I, g) {
    if (!(g instanceof YI)) {
      let A = this.doc.nodeAt(I);
      if (!A)
        throw new RangeError("No node at position " + I);
      if (g = g.isInSet(A.marks), !g)
        return this;
    }
    return this.step(new jD(I, g)), this;
  }
  split(I, g = 1, A) {
    return ny(this, I, g, A), this;
  }
  addMark(I, g, A) {
    return My(this, I, g, A), this;
  }
  removeMark(I, g, A) {
    return gy(this, I, g, A), this;
  }
  clearIncompatible(I, g, A) {
    return Ay(this, I, g, A), this;
  }
}
const bC = /* @__PURE__ */ Object.create(null);
class uI {
  constructor(I, g, A) {
    this.$anchor = I, this.$head = g, this.ranges = A || [new e4(I.min(g), I.max(g))];
  }
  get anchor() {
    return this.$anchor.pos;
  }
  get head() {
    return this.$head.pos;
  }
  get from() {
    return this.$from.pos;
  }
  get to() {
    return this.$to.pos;
  }
  get $from() {
    return this.ranges[0].$from;
  }
  get $to() {
    return this.ranges[0].$to;
  }
  get empty() {
    let I = this.ranges;
    for (let g = 0; g < I.length; g++)
      if (I[g].$from.pos != I[g].$to.pos)
        return !1;
    return !0;
  }
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  replace(I, g = K.empty) {
    let A = g.content.lastChild, t = null;
    for (let i = 0; i < g.openEnd; i++)
      t = A, A = A.lastChild;
    let D = I.steps.length, e = this.ranges;
    for (let i = 0; i < e.length; i++) {
      let { $from: N, $to: C } = e[i], u = I.mapping.slice(D);
      I.replaceRange(u.map(N.pos), u.map(C.pos), i ? K.empty : g), i == 0 && tn(I, D, (A ? A.isInline : t && t.isTextblock) ? -1 : 1);
    }
  }
  replaceWith(I, g) {
    let A = I.steps.length, t = this.ranges;
    for (let D = 0; D < t.length; D++) {
      let { $from: e, $to: i } = t[D], N = I.mapping.slice(A), C = N.map(e.pos), u = N.map(i.pos);
      D ? I.deleteRange(C, u) : (I.replaceRangeWith(C, u, g), tn(I, A, g.isInline ? -1 : 1));
    }
  }
  static findFrom(I, g, A = !1) {
    let t = I.parent.inlineContent ? new LI(I) : Zt(I.node(0), I.parent, I.pos, I.index(), g, A);
    if (t)
      return t;
    for (let D = I.depth - 1; D >= 0; D--) {
      let e = g < 0 ? Zt(I.node(0), I.node(D), I.before(D + 1), I.index(D), g, A) : Zt(I.node(0), I.node(D), I.after(D + 1), I.index(D) + 1, g, A);
      if (e)
        return e;
    }
    return null;
  }
  static near(I, g = 1) {
    return this.findFrom(I, g) || this.findFrom(I, -g) || new rg(I.node(0));
  }
  static atStart(I) {
    return Zt(I, I, 0, 0, 1) || new rg(I);
  }
  static atEnd(I) {
    return Zt(I, I, I.content.size, I.childCount, -1) || new rg(I);
  }
  static fromJSON(I, g) {
    if (!g || !g.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let A = bC[g.type];
    if (!A)
      throw new RangeError(`No selection type ${g.type} defined`);
    return A.fromJSON(I, g);
  }
  static jsonID(I, g) {
    if (I in bC)
      throw new RangeError("Duplicate use of selection JSON ID " + I);
    return bC[I] = g, g.prototype.jsonID = I, g;
  }
  getBookmark() {
    return LI.between(this.$anchor, this.$head).getBookmark();
  }
}
uI.prototype.visible = !0;
class e4 {
  constructor(I, g) {
    this.$from = I, this.$to = g;
  }
}
let gn = !1;
function An(M) {
  !gn && !M.parent.inlineContent && (gn = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + M.parent.type.name + ")"));
}
class LI extends uI {
  constructor(I, g = I) {
    An(I), An(g), super(I, g);
  }
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(I, g) {
    let A = I.resolve(g.map(this.head));
    if (!A.parent.inlineContent)
      return uI.near(A);
    let t = I.resolve(g.map(this.anchor));
    return new LI(t.parent.inlineContent ? t : A, A);
  }
  replace(I, g = K.empty) {
    if (super.replace(I, g), g == K.empty) {
      let A = this.$from.marksAcross(this.$to);
      A && I.ensureMarks(A);
    }
  }
  eq(I) {
    return I instanceof LI && I.anchor == this.anchor && I.head == this.head;
  }
  getBookmark() {
    return new JN(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  static fromJSON(I, g) {
    if (typeof g.anchor != "number" || typeof g.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new LI(I.resolve(g.anchor), I.resolve(g.head));
  }
  static create(I, g, A = g) {
    let t = I.resolve(g);
    return new this(t, A == g ? t : I.resolve(A));
  }
  static between(I, g, A) {
    let t = I.pos - g.pos;
    if ((!A || t) && (A = t >= 0 ? 1 : -1), !g.parent.inlineContent) {
      let D = uI.findFrom(g, A, !0) || uI.findFrom(g, -A, !0);
      if (D)
        g = D.$head;
      else
        return uI.near(g, A);
    }
    return I.parent.inlineContent || (t == 0 ? I = g : (I = (uI.findFrom(I, -A, !0) || uI.findFrom(I, A, !0)).$anchor, I.pos < g.pos != t < 0 && (I = g))), new LI(I, g);
  }
}
uI.jsonID("text", LI);
class JN {
  constructor(I, g) {
    this.anchor = I, this.head = g;
  }
  map(I) {
    return new JN(I.map(this.anchor), I.map(this.head));
  }
  resolve(I) {
    return LI.between(I.resolve(this.anchor), I.resolve(this.head));
  }
}
class CI extends uI {
  constructor(I) {
    let g = I.nodeAfter, A = I.node(0).resolve(I.pos + g.nodeSize);
    super(I, A), this.node = g;
  }
  map(I, g) {
    let { deleted: A, pos: t } = g.mapResult(this.anchor), D = I.resolve(t);
    return A ? uI.near(D) : new CI(D);
  }
  content() {
    return new K(G.from(this.node), 0, 0);
  }
  eq(I) {
    return I instanceof CI && I.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Tu(this.anchor);
  }
  static fromJSON(I, g) {
    if (typeof g.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new CI(I.resolve(g.anchor));
  }
  static create(I, g) {
    return new CI(I.resolve(g));
  }
  static isSelectable(I) {
    return !I.isText && I.type.spec.selectable !== !1;
  }
}
CI.prototype.visible = !1;
uI.jsonID("node", CI);
class Tu {
  constructor(I) {
    this.anchor = I;
  }
  map(I) {
    let { deleted: g, pos: A } = I.mapResult(this.anchor);
    return g ? new JN(A, A) : new Tu(A);
  }
  resolve(I) {
    let g = I.resolve(this.anchor), A = g.nodeAfter;
    return A && CI.isSelectable(A) ? new CI(g) : uI.near(g);
  }
}
class rg extends uI {
  constructor(I) {
    super(I.resolve(0), I.resolve(I.content.size));
  }
  replace(I, g = K.empty) {
    if (g == K.empty) {
      I.delete(0, I.doc.content.size);
      let A = uI.atStart(I.doc);
      A.eq(I.selection) || I.setSelection(A);
    } else
      super.replace(I, g);
  }
  toJSON() {
    return { type: "all" };
  }
  static fromJSON(I) {
    return new rg(I);
  }
  map(I) {
    return new rg(I);
  }
  eq(I) {
    return I instanceof rg;
  }
  getBookmark() {
    return xy;
  }
}
uI.jsonID("all", rg);
const xy = {
  map() {
    return this;
  },
  resolve(M) {
    return new rg(M);
  }
};
function Zt(M, I, g, A, t, D = !1) {
  if (I.inlineContent)
    return LI.create(M, g);
  for (let e = A - (t > 0 ? 0 : 1); t > 0 ? e < I.childCount : e >= 0; e += t) {
    let i = I.child(e);
    if (i.isAtom) {
      if (!D && CI.isSelectable(i))
        return CI.create(M, g - (t < 0 ? i.nodeSize : 0));
    } else {
      let N = Zt(M, i, g + t, t < 0 ? i.childCount : 0, t, D);
      if (N)
        return N;
    }
    g += i.nodeSize * t;
  }
  return null;
}
function tn(M, I, g) {
  let A = M.steps.length - 1;
  if (A < I)
    return;
  let t = M.steps[A];
  if (!(t instanceof dM || t instanceof uM))
    return;
  let D = M.mapping.maps[A], e;
  D.forEach((i, N, C, u) => {
    e == null && (e = u);
  }), M.setSelection(uI.near(M.doc.resolve(e), g));
}
const Dn = 1, Li = 2, en = 4;
class ry extends ou {
  constructor(I) {
    super(I.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = I.selection, this.storedMarks = I.storedMarks;
  }
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  setSelection(I) {
    if (I.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = I, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Dn) & ~Li, this.storedMarks = null, this;
  }
  get selectionSet() {
    return (this.updated & Dn) > 0;
  }
  setStoredMarks(I) {
    return this.storedMarks = I, this.updated |= Li, this;
  }
  ensureMarks(I) {
    return YI.sameSet(this.storedMarks || this.selection.$from.marks(), I) || this.setStoredMarks(I), this;
  }
  addStoredMark(I) {
    return this.ensureMarks(I.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  removeStoredMark(I) {
    return this.ensureMarks(I.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  get storedMarksSet() {
    return (this.updated & Li) > 0;
  }
  addStep(I, g) {
    super.addStep(I, g), this.updated = this.updated & ~Li, this.storedMarks = null;
  }
  setTime(I) {
    return this.time = I, this;
  }
  replaceSelection(I) {
    return this.selection.replace(this, I), this;
  }
  replaceSelectionWith(I, g = !0) {
    let A = this.selection;
    return g && (I = I.mark(this.storedMarks || (A.empty ? A.$from.marks() : A.$from.marksAcross(A.$to) || YI.none))), A.replaceWith(this, I), this;
  }
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  insertText(I, g, A) {
    let t = this.doc.type.schema;
    if (g == null)
      return I ? this.replaceSelectionWith(t.text(I), !0) : this.deleteSelection();
    {
      if (A == null && (A = g), A = A == null ? g : A, !I)
        return this.deleteRange(g, A);
      let D = this.storedMarks;
      if (!D) {
        let e = this.doc.resolve(g);
        D = A == g ? e.marks() : e.marksAcross(this.doc.resolve(A));
      }
      return this.replaceRangeWith(g, A, t.text(I, D)), this.selection.empty || this.setSelection(uI.near(this.selection.$to)), this;
    }
  }
  setMeta(I, g) {
    return this.meta[typeof I == "string" ? I : I.key] = g, this;
  }
  getMeta(I) {
    return this.meta[typeof I == "string" ? I : I.key];
  }
  get isGeneric() {
    for (let I in this.meta)
      return !1;
    return !0;
  }
  scrollIntoView() {
    return this.updated |= en, this;
  }
  get scrolledIntoView() {
    return (this.updated & en) > 0;
  }
}
function Nn(M, I) {
  return !I || !M ? M : M.bind(I);
}
class Ie {
  constructor(I, g, A) {
    this.name = I, this.init = Nn(g.init, A), this.apply = Nn(g.apply, A);
  }
}
const wy = [
  new Ie("doc", {
    init(M) {
      return M.doc || M.schema.topNodeType.createAndFill();
    },
    apply(M) {
      return M.doc;
    }
  }),
  new Ie("selection", {
    init(M, I) {
      return M.selection || uI.atStart(I.doc);
    },
    apply(M) {
      return M.selection;
    }
  }),
  new Ie("storedMarks", {
    init(M) {
      return M.storedMarks || null;
    },
    apply(M, I, g, A) {
      return A.selection.$cursor ? M.storedMarks : null;
    }
  }),
  new Ie("scrollToSelection", {
    init() {
      return 0;
    },
    apply(M, I) {
      return M.scrolledIntoView ? I + 1 : I;
    }
  })
];
class YC {
  constructor(I, g) {
    this.schema = I, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = wy.slice(), g && g.forEach((A) => {
      if (this.pluginsByKey[A.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + A.key + ")");
      this.plugins.push(A), this.pluginsByKey[A.key] = A, A.spec.state && this.fields.push(new Ie(A.key, A.spec.state, A));
    });
  }
}
class Rt {
  constructor(I) {
    this.config = I;
  }
  get schema() {
    return this.config.schema;
  }
  get plugins() {
    return this.config.plugins;
  }
  apply(I) {
    return this.applyTransaction(I).state;
  }
  filterTransaction(I, g = -1) {
    for (let A = 0; A < this.config.plugins.length; A++)
      if (A != g) {
        let t = this.config.plugins[A];
        if (t.spec.filterTransaction && !t.spec.filterTransaction.call(t, I, this))
          return !1;
      }
    return !0;
  }
  applyTransaction(I) {
    if (!this.filterTransaction(I))
      return { state: this, transactions: [] };
    let g = [I], A = this.applyInner(I), t = null;
    for (; ; ) {
      let D = !1;
      for (let e = 0; e < this.config.plugins.length; e++) {
        let i = this.config.plugins[e];
        if (i.spec.appendTransaction) {
          let N = t ? t[e].n : 0, C = t ? t[e].state : this, u = N < g.length && i.spec.appendTransaction.call(i, N ? g.slice(N) : g, C, A);
          if (u && A.filterTransaction(u, e)) {
            if (u.setMeta("appendedTransaction", I), !t) {
              t = [];
              for (let j = 0; j < this.config.plugins.length; j++)
                t.push(j < e ? { state: A, n: g.length } : { state: this, n: 0 });
            }
            g.push(u), A = A.applyInner(u), D = !0;
          }
          t && (t[e] = { state: A, n: g.length });
        }
      }
      if (!D)
        return { state: A, transactions: g };
    }
  }
  applyInner(I) {
    if (!I.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let g = new Rt(this.config), A = this.config.fields;
    for (let t = 0; t < A.length; t++) {
      let D = A[t];
      g[D.name] = D.apply(I, this[D.name], this, g);
    }
    return g;
  }
  get tr() {
    return new ry(this);
  }
  static create(I) {
    let g = new YC(I.doc ? I.doc.type.schema : I.schema, I.plugins), A = new Rt(g);
    for (let t = 0; t < g.fields.length; t++)
      A[g.fields[t].name] = g.fields[t].init(I, A);
    return A;
  }
  reconfigure(I) {
    let g = new YC(this.schema, I.plugins), A = g.fields, t = new Rt(g);
    for (let D = 0; D < A.length; D++) {
      let e = A[D].name;
      t[e] = this.hasOwnProperty(e) ? this[e] : A[D].init(I, t);
    }
    return t;
  }
  toJSON(I) {
    let g = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (g.storedMarks = this.storedMarks.map((A) => A.toJSON())), I && typeof I == "object")
      for (let A in I) {
        if (A == "doc" || A == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let t = I[A], D = t.spec.state;
        D && D.toJSON && (g[A] = D.toJSON.call(t, this[t.key]));
      }
    return g;
  }
  static fromJSON(I, g, A) {
    if (!g)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!I.schema)
      throw new RangeError("Required config field 'schema' missing");
    let t = new YC(I.schema, I.plugins), D = new Rt(t);
    return t.fields.forEach((e) => {
      if (e.name == "doc")
        D.doc = vg.fromJSON(I.schema, g.doc);
      else if (e.name == "selection")
        D.selection = uI.fromJSON(D.doc, g.selection);
      else if (e.name == "storedMarks")
        g.storedMarks && (D.storedMarks = g.storedMarks.map(I.schema.markFromJSON));
      else {
        if (A)
          for (let i in A) {
            let N = A[i], C = N.spec.state;
            if (N.key == e.name && C && C.fromJSON && Object.prototype.hasOwnProperty.call(g, i)) {
              D[e.name] = C.fromJSON.call(N, I, g[i], D);
              return;
            }
          }
        D[e.name] = e.init(I, D);
      }
    }), D;
  }
}
function i4(M, I, g) {
  for (let A in M) {
    let t = M[A];
    t instanceof Function ? t = t.bind(I) : A == "handleDOMEvents" && (t = i4(t, I, {})), g[A] = t;
  }
  return g;
}
class XI {
  constructor(I) {
    this.spec = I, this.props = {}, I.props && i4(I.props, this, this.props), this.key = I.key ? I.key.key : N4("plugin");
  }
  getState(I) {
    return I[this.key];
  }
}
const pC = /* @__PURE__ */ Object.create(null);
function N4(M) {
  return M in pC ? M + "$" + ++pC[M] : (pC[M] = 0, M + "$");
}
class TM {
  constructor(I = "key") {
    this.key = N4(I);
  }
  get(I) {
    return I.config.pluginsByKey[this.key];
  }
  getState(I) {
    return I[this.key];
  }
}
const PA = typeof navigator < "u" ? navigator : null, Cn = typeof document < "u" ? document : null, ZA = PA && PA.userAgent || "", T0 = /Edge\/(\d+)/.exec(ZA), C4 = /MSIE \d/.exec(ZA), s0 = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ZA), WM = !!(C4 || s0 || T0), hA = C4 ? document.documentMode : s0 ? +s0[1] : T0 ? +T0[1] : 0, dg = !WM && /gecko\/(\d+)/i.test(ZA);
dg && +(/Firefox\/(\d+)/.exec(ZA) || [0, 0])[1];
const S0 = !WM && /Chrome\/(\d+)/.exec(ZA), pM = !!S0, Ey = S0 ? +S0[1] : 0, BM = !WM && !!PA && /Apple Computer/.test(PA.vendor), LD = BM && (/Mobile\/\w+/.test(ZA) || !!PA && PA.maxTouchPoints > 2), tg = LD || (PA ? /Mac/.test(PA.platform) : !1), Pg = /Android \d/.test(ZA), BN = !!Cn && "webkitFontSmoothing" in Cn.documentElement.style, dy = BN ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0, XM = function(M) {
  for (var I = 0; ; I++)
    if (M = M.previousSibling, !M)
      return I;
}, su = function(M) {
  let I = M.assignedSlot || M.parentNode;
  return I && I.nodeType == 11 ? I.host : I;
};
let un = null;
const _g = function(M, I, g) {
  let A = un || (un = document.createRange());
  return A.setEnd(M, g == null ? M.nodeValue.length : g), A.setStart(M, I || 0), A;
}, ce = function(M, I, g, A) {
  return g && (jn(M, I, g, A, -1) || jn(M, I, g, A, 1));
}, zy = /^(img|br|input|textarea|hr)$/i;
function jn(M, I, g, A, t) {
  for (; ; ) {
    if (M == g && I == A)
      return !0;
    if (I == (t < 0 ? 0 : fg(M))) {
      let D = M.parentNode;
      if (!D || D.nodeType != 1 || by(M) || zy.test(M.nodeName) || M.contentEditable == "false")
        return !1;
      I = XM(M) + (t < 0 ? 0 : 1), M = D;
    } else if (M.nodeType == 1) {
      if (M = M.childNodes[I + (t < 0 ? -1 : 0)], M.contentEditable == "false")
        return !1;
      I = t < 0 ? fg(M) : 0;
    } else
      return !1;
  }
}
function fg(M) {
  return M.nodeType == 3 ? M.nodeValue.length : M.childNodes.length;
}
function my(M, I, g) {
  for (let A = I == 0, t = I == fg(M); A || t; ) {
    if (M == g)
      return !0;
    let D = XM(M);
    if (M = M.parentNode, !M)
      return !1;
    A = A && D == 0, t = t && D == fg(M);
  }
}
function by(M) {
  let I;
  for (let g = M; g && !(I = g.pmViewDesc); g = g.parentNode)
    ;
  return I && I.node && I.node.isBlock && (I.dom == M || I.contentDOM == M);
}
const RN = function(M) {
  let I = M.isCollapsed;
  return I && pM && M.rangeCount && !M.getRangeAt(0).collapsed && (I = !1), I;
};
function Ht(M, I) {
  let g = document.createEvent("Event");
  return g.initEvent("keydown", !0, !0), g.keyCode = M, g.key = g.code = I, g;
}
function Yy(M) {
  return {
    left: 0,
    right: M.documentElement.clientWidth,
    top: 0,
    bottom: M.documentElement.clientHeight
  };
}
function CA(M, I) {
  return typeof M == "number" ? M : M[I];
}
function py(M) {
  let I = M.getBoundingClientRect(), g = I.width / M.offsetWidth || 1, A = I.height / M.offsetHeight || 1;
  return {
    left: I.left,
    right: I.left + M.clientWidth * g,
    top: I.top,
    bottom: I.top + M.clientHeight * A
  };
}
function nn(M, I, g) {
  let A = M.someProp("scrollThreshold") || 0, t = M.someProp("scrollMargin") || 5, D = M.dom.ownerDocument;
  for (let e = g || M.dom; e; e = su(e)) {
    if (e.nodeType != 1)
      continue;
    let i = e, N = i == D.body, C = N ? Yy(D) : py(i), u = 0, j = 0;
    if (I.top < C.top + CA(A, "top") ? j = -(C.top - I.top + CA(t, "top")) : I.bottom > C.bottom - CA(A, "bottom") && (j = I.bottom - C.bottom + CA(t, "bottom")), I.left < C.left + CA(A, "left") ? u = -(C.left - I.left + CA(t, "left")) : I.right > C.right - CA(A, "right") && (u = I.right - C.right + CA(t, "right")), u || j)
      if (N)
        D.defaultView.scrollBy(u, j);
      else {
        let n = i.scrollLeft, L = i.scrollTop;
        j && (i.scrollTop += j), u && (i.scrollLeft += u);
        let o = i.scrollLeft - n, T = i.scrollTop - L;
        I = { left: I.left - o, top: I.top - T, right: I.right - o, bottom: I.bottom - T };
      }
    if (N)
      break;
  }
}
function Qy(M) {
  let I = M.dom.getBoundingClientRect(), g = Math.max(0, I.top), A, t;
  for (let D = (I.left + I.right) / 2, e = g + 1; e < Math.min(innerHeight, I.bottom); e += 5) {
    let i = M.root.elementFromPoint(D, e);
    if (!i || i == M.dom || !M.dom.contains(i))
      continue;
    let N = i.getBoundingClientRect();
    if (N.top >= g - 20) {
      A = i, t = N.top;
      break;
    }
  }
  return { refDOM: A, refTop: t, stack: u4(M.dom) };
}
function u4(M) {
  let I = [], g = M.ownerDocument;
  for (let A = M; A && (I.push({ dom: A, top: A.scrollTop, left: A.scrollLeft }), M != g); A = su(A))
    ;
  return I;
}
function hy({ refDOM: M, refTop: I, stack: g }) {
  let A = M ? M.getBoundingClientRect().top : 0;
  j4(g, A == 0 ? 0 : A - I);
}
function j4(M, I) {
  for (let g = 0; g < M.length; g++) {
    let { dom: A, top: t, left: D } = M[g];
    A.scrollTop != t + I && (A.scrollTop = t + I), A.scrollLeft != D && (A.scrollLeft = D);
  }
}
let Ot = null;
function Oy(M) {
  if (M.setActive)
    return M.setActive();
  if (Ot)
    return M.focus(Ot);
  let I = u4(M);
  M.focus(Ot == null ? {
    get preventScroll() {
      return Ot = { preventScroll: !0 }, !0;
    }
  } : void 0), Ot || (Ot = !1, j4(I, 0));
}
function n4(M, I) {
  let g, A = 2e8, t, D = 0, e = I.top, i = I.top;
  for (let N = M.firstChild, C = 0; N; N = N.nextSibling, C++) {
    let u;
    if (N.nodeType == 1)
      u = N.getClientRects();
    else if (N.nodeType == 3)
      u = _g(N).getClientRects();
    else
      continue;
    for (let j = 0; j < u.length; j++) {
      let n = u[j];
      if (n.top <= e && n.bottom >= i) {
        e = Math.max(n.bottom, e), i = Math.min(n.top, i);
        let L = n.left > I.left ? n.left - I.left : n.right < I.left ? I.left - n.right : 0;
        if (L < A) {
          g = N, A = L, t = L && g.nodeType == 3 ? {
            left: n.right < I.left ? n.right : n.left,
            top: I.top
          } : I, N.nodeType == 1 && L && (D = C + (I.left >= (n.left + n.right) / 2 ? 1 : 0));
          continue;
        }
      }
      !g && (I.left >= n.right && I.top >= n.top || I.left >= n.left && I.top >= n.bottom) && (D = C + 1);
    }
  }
  return g && g.nodeType == 3 ? ky(g, t) : !g || A && g.nodeType == 1 ? { node: M, offset: D } : n4(g, t);
}
function ky(M, I) {
  let g = M.nodeValue.length, A = document.createRange();
  for (let t = 0; t < g; t++) {
    A.setEnd(M, t + 1), A.setStart(M, t);
    let D = nA(A, 1);
    if (D.top != D.bottom && Su(I, D))
      return { node: M, offset: t + (I.left >= (D.left + D.right) / 2 ? 1 : 0) };
  }
  return { node: M, offset: 0 };
}
function Su(M, I) {
  return M.left >= I.left - 1 && M.left <= I.right + 1 && M.top >= I.top - 1 && M.top <= I.bottom + 1;
}
function Py(M, I) {
  let g = M.parentNode;
  return g && /^li$/i.test(g.nodeName) && I.left < M.getBoundingClientRect().left ? g : M;
}
function fy(M, I, g) {
  let { node: A, offset: t } = n4(I, g), D = -1;
  if (A.nodeType == 1 && !A.firstChild) {
    let e = A.getBoundingClientRect();
    D = e.left != e.right && g.left > (e.left + e.right) / 2 ? 1 : -1;
  }
  return M.docView.posFromDOM(A, t, D);
}
function Gy(M, I, g, A) {
  let t = -1;
  for (let D = I; D != M.dom; ) {
    let e = M.docView.nearestDesc(D, !0);
    if (!e)
      return null;
    if (e.node.isBlock && e.parent) {
      let i = e.dom.getBoundingClientRect();
      if (i.left > A.left || i.top > A.top)
        t = e.posBefore;
      else if (i.right < A.left || i.bottom < A.top)
        t = e.posAfter;
      else
        break;
    }
    D = e.dom.parentNode;
  }
  return t > -1 ? t : M.docView.posFromDOM(I, g, 1);
}
function L4(M, I, g) {
  let A = M.childNodes.length;
  if (A && g.top < g.bottom)
    for (let t = Math.max(0, Math.min(A - 1, Math.floor(A * (I.top - g.top) / (g.bottom - g.top)) - 2)), D = t; ; ) {
      let e = M.childNodes[D];
      if (e.nodeType == 1) {
        let i = e.getClientRects();
        for (let N = 0; N < i.length; N++) {
          let C = i[N];
          if (Su(I, C))
            return L4(e, I, C);
        }
      }
      if ((D = (D + 1) % A) == t)
        break;
    }
  return M;
}
function Wy(M, I) {
  let g = M.dom.ownerDocument, A, t = 0;
  if (g.caretPositionFromPoint)
    try {
      let N = g.caretPositionFromPoint(I.left, I.top);
      N && ({ offsetNode: A, offset: t } = N);
    } catch {
    }
  if (!A && g.caretRangeFromPoint) {
    let N = g.caretRangeFromPoint(I.left, I.top);
    N && ({ startContainer: A, startOffset: t } = N);
  }
  let D = (M.root.elementFromPoint ? M.root : g).elementFromPoint(I.left, I.top), e;
  if (!D || !M.dom.contains(D.nodeType != 1 ? D.parentNode : D)) {
    let N = M.dom.getBoundingClientRect();
    if (!Su(I, N) || (D = L4(M.dom, I, N), !D))
      return null;
  }
  if (BM)
    for (let N = D; A && N; N = su(N))
      N.draggable && (A = void 0);
  if (D = Py(D, I), A) {
    if (dg && A.nodeType == 1 && (t = Math.min(t, A.childNodes.length), t < A.childNodes.length)) {
      let N = A.childNodes[t], C;
      N.nodeName == "IMG" && (C = N.getBoundingClientRect()).right <= I.left && C.bottom > I.top && t++;
    }
    A == M.dom && t == A.childNodes.length - 1 && A.lastChild.nodeType == 1 && I.top > A.lastChild.getBoundingClientRect().bottom ? e = M.state.doc.content.size : (t == 0 || A.nodeType != 1 || A.childNodes[t - 1].nodeName != "BR") && (e = Gy(M, A, t, I));
  }
  e == null && (e = fy(M, D, I));
  let i = M.docView.nearestDesc(D, !0);
  return { pos: e, inside: i ? i.posAtStart - i.border : -1 };
}
function nA(M, I) {
  let g = M.getClientRects();
  return g.length ? g[I < 0 ? 0 : g.length - 1] : M.getBoundingClientRect();
}
const Zy = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function o4(M, I, g) {
  let { node: A, offset: t, atom: D } = M.docView.domFromPos(I, g < 0 ? -1 : 1), e = BN || dg;
  if (A.nodeType == 3)
    if (e && (Zy.test(A.nodeValue) || (g < 0 ? !t : t == A.nodeValue.length))) {
      let N = nA(_g(A, t, t), g);
      if (dg && t && /\s/.test(A.nodeValue[t - 1]) && t < A.nodeValue.length) {
        let C = nA(_g(A, t - 1, t - 1), -1);
        if (C.top == N.top) {
          let u = nA(_g(A, t, t + 1), -1);
          if (u.top != N.top)
            return vD(u, u.left < C.left);
        }
      }
      return N;
    } else {
      let N = t, C = t, u = g < 0 ? 1 : -1;
      return g < 0 && !t ? (C++, u = -1) : g >= 0 && t == A.nodeValue.length ? (N--, u = 1) : g < 0 ? N-- : C++, vD(nA(_g(A, N, C), 1), u < 0);
    }
  if (!M.state.doc.resolve(I - (D || 0)).parent.inlineContent) {
    if (D == null && t && (g < 0 || t == fg(A))) {
      let N = A.childNodes[t - 1];
      if (N.nodeType == 1)
        return QC(N.getBoundingClientRect(), !1);
    }
    if (D == null && t < fg(A)) {
      let N = A.childNodes[t];
      if (N.nodeType == 1)
        return QC(N.getBoundingClientRect(), !0);
    }
    return QC(A.getBoundingClientRect(), g >= 0);
  }
  if (D == null && t && (g < 0 || t == fg(A))) {
    let N = A.childNodes[t - 1], C = N.nodeType == 3 ? _g(N, fg(N) - (e ? 0 : 1)) : N.nodeType == 1 && (N.nodeName != "BR" || !N.nextSibling) ? N : null;
    if (C)
      return vD(nA(C, 1), !1);
  }
  if (D == null && t < fg(A)) {
    let N = A.childNodes[t];
    for (; N.pmViewDesc && N.pmViewDesc.ignoreForCoords; )
      N = N.nextSibling;
    let C = N ? N.nodeType == 3 ? _g(N, 0, e ? 0 : 1) : N.nodeType == 1 ? N : null : null;
    if (C)
      return vD(nA(C, -1), !0);
  }
  return vD(nA(A.nodeType == 3 ? _g(A) : A, -g), g >= 0);
}
function vD(M, I) {
  if (M.width == 0)
    return M;
  let g = I ? M.left : M.right;
  return { top: M.top, bottom: M.bottom, left: g, right: g };
}
function QC(M, I) {
  if (M.height == 0)
    return M;
  let g = I ? M.top : M.bottom;
  return { top: g, bottom: g, left: M.left, right: M.right };
}
function T4(M, I, g) {
  let A = M.state, t = M.root.activeElement;
  A != I && M.updateState(I), t != M.dom && M.focus();
  try {
    return g();
  } finally {
    A != I && M.updateState(A), t != M.dom && t && t.focus();
  }
}
function vy(M, I, g) {
  let A = I.selection, t = g == "up" ? A.$from : A.$to;
  return T4(M, I, () => {
    let { node: D } = M.docView.domFromPos(t.pos, g == "up" ? -1 : 1);
    for (; ; ) {
      let i = M.docView.nearestDesc(D, !0);
      if (!i)
        break;
      if (i.node.isBlock) {
        D = i.dom;
        break;
      }
      D = i.dom.parentNode;
    }
    let e = o4(M, t.pos, 1);
    for (let i = D.firstChild; i; i = i.nextSibling) {
      let N;
      if (i.nodeType == 1)
        N = i.getClientRects();
      else if (i.nodeType == 3)
        N = _g(i, 0, i.nodeValue.length).getClientRects();
      else
        continue;
      for (let C = 0; C < N.length; C++) {
        let u = N[C];
        if (u.bottom > u.top + 1 && (g == "up" ? e.top - u.top > (u.bottom - e.top) * 2 : u.bottom - e.bottom > (e.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const Uy = /[\u0590-\u08ac]/;
function Jy(M, I, g) {
  let { $head: A } = I.selection;
  if (!A.parent.isTextblock)
    return !1;
  let t = A.parentOffset, D = !t, e = t == A.parent.content.size, i = M.domSelection();
  return !Uy.test(A.parent.textContent) || !i.modify ? g == "left" || g == "backward" ? D : e : T4(M, I, () => {
    let N = i.getRangeAt(0), C = i.focusNode, u = i.focusOffset, j = i.caretBidiLevel;
    i.modify("move", g, "character");
    let L = !(A.depth ? M.docView.domAfterPos(A.before()) : M.dom).contains(i.focusNode.nodeType == 1 ? i.focusNode : i.focusNode.parentNode) || C == i.focusNode && u == i.focusOffset;
    return i.removeAllRanges(), i.addRange(N), j != null && (i.caretBidiLevel = j), L;
  });
}
let Ln = null, on = null, Tn = !1;
function By(M, I, g) {
  return Ln == I && on == g ? Tn : (Ln = I, on = g, Tn = g == "up" || g == "down" ? vy(M, I, g) : Jy(M, I, g));
}
const wg = 0, sn = 1, Vt = 2, Bg = 3;
class Xe {
  constructor(I, g, A, t) {
    this.parent = I, this.children = g, this.dom = A, this.contentDOM = t, this.dirty = wg, A.pmViewDesc = this;
  }
  matchesWidget(I) {
    return !1;
  }
  matchesMark(I) {
    return !1;
  }
  matchesNode(I, g, A) {
    return !1;
  }
  matchesHack(I) {
    return !1;
  }
  parseRule() {
    return null;
  }
  stopEvent(I) {
    return !1;
  }
  get size() {
    let I = 0;
    for (let g = 0; g < this.children.length; g++)
      I += this.children[g].size;
    return I;
  }
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let I = 0; I < this.children.length; I++)
      this.children[I].destroy();
  }
  posBeforeChild(I) {
    for (let g = 0, A = this.posAtStart; ; g++) {
      let t = this.children[g];
      if (t == I)
        return A;
      A += t.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(I, g, A) {
    if (this.contentDOM && this.contentDOM.contains(I.nodeType == 1 ? I : I.parentNode))
      if (A < 0) {
        let D, e;
        if (I == this.contentDOM)
          D = I.childNodes[g - 1];
        else {
          for (; I.parentNode != this.contentDOM; )
            I = I.parentNode;
          D = I.previousSibling;
        }
        for (; D && !((e = D.pmViewDesc) && e.parent == this); )
          D = D.previousSibling;
        return D ? this.posBeforeChild(e) + e.size : this.posAtStart;
      } else {
        let D, e;
        if (I == this.contentDOM)
          D = I.childNodes[g];
        else {
          for (; I.parentNode != this.contentDOM; )
            I = I.parentNode;
          D = I.nextSibling;
        }
        for (; D && !((e = D.pmViewDesc) && e.parent == this); )
          D = D.nextSibling;
        return D ? this.posBeforeChild(e) : this.posAtEnd;
      }
    let t;
    if (I == this.dom && this.contentDOM)
      t = g > XM(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      t = I.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (g == 0)
        for (let D = I; ; D = D.parentNode) {
          if (D == this.dom) {
            t = !1;
            break;
          }
          if (D.previousSibling)
            break;
        }
      if (t == null && g == I.childNodes.length)
        for (let D = I; ; D = D.parentNode) {
          if (D == this.dom) {
            t = !0;
            break;
          }
          if (D.nextSibling)
            break;
        }
    }
    return (t == null ? A > 0 : t) ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(I, g = !1) {
    for (let A = !0, t = I; t; t = t.parentNode) {
      let D = this.getDesc(t), e;
      if (D && (!g || D.node))
        if (A && (e = D.nodeDOM) && !(e.nodeType == 1 ? e.contains(I.nodeType == 1 ? I : I.parentNode) : e == I))
          A = !1;
        else
          return D;
    }
  }
  getDesc(I) {
    let g = I.pmViewDesc;
    for (let A = g; A; A = A.parent)
      if (A == this)
        return g;
  }
  posFromDOM(I, g, A) {
    for (let t = I; t; t = t.parentNode) {
      let D = this.getDesc(t);
      if (D)
        return D.localPosFromDOM(I, g, A);
    }
    return -1;
  }
  descAt(I) {
    for (let g = 0, A = 0; g < this.children.length; g++) {
      let t = this.children[g], D = A + t.size;
      if (A == I && D != A) {
        for (; !t.border && t.children.length; )
          t = t.children[0];
        return t;
      }
      if (I < D)
        return t.descAt(I - A - t.border);
      A = D;
    }
  }
  domFromPos(I, g) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: I + 1 };
    let A = 0, t = 0;
    for (let D = 0; A < this.children.length; A++) {
      let e = this.children[A], i = D + e.size;
      if (i > I || e instanceof S4) {
        t = I - D;
        break;
      }
      D = i;
    }
    if (t)
      return this.children[A].domFromPos(t - this.children[A].border, g);
    for (let D; A && !(D = this.children[A - 1]).size && D instanceof s4 && D.side >= 0; A--)
      ;
    if (g <= 0) {
      let D, e = !0;
      for (; D = A ? this.children[A - 1] : null, !(!D || D.dom.parentNode == this.contentDOM); A--, e = !1)
        ;
      return D && g && e && !D.border && !D.domAtom ? D.domFromPos(D.size, g) : { node: this.contentDOM, offset: D ? XM(D.dom) + 1 : 0 };
    } else {
      let D, e = !0;
      for (; D = A < this.children.length ? this.children[A] : null, !(!D || D.dom.parentNode == this.contentDOM); A++, e = !1)
        ;
      return D && e && !D.border && !D.domAtom ? D.domFromPos(0, g) : { node: this.contentDOM, offset: D ? XM(D.dom) : this.contentDOM.childNodes.length };
    }
  }
  parseRange(I, g, A = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: I, to: g, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let t = -1, D = -1;
    for (let e = A, i = 0; ; i++) {
      let N = this.children[i], C = e + N.size;
      if (t == -1 && I <= C) {
        let u = e + N.border;
        if (I >= u && g <= C - N.border && N.node && N.contentDOM && this.contentDOM.contains(N.contentDOM))
          return N.parseRange(I, g, u);
        I = e;
        for (let j = i; j > 0; j--) {
          let n = this.children[j - 1];
          if (n.size && n.dom.parentNode == this.contentDOM && !n.emptyChildAt(1)) {
            t = XM(n.dom) + 1;
            break;
          }
          I -= n.size;
        }
        t == -1 && (t = 0);
      }
      if (t > -1 && (C > g || i == this.children.length - 1)) {
        g = C;
        for (let u = i + 1; u < this.children.length; u++) {
          let j = this.children[u];
          if (j.size && j.dom.parentNode == this.contentDOM && !j.emptyChildAt(-1)) {
            D = XM(j.dom);
            break;
          }
          g += j.size;
        }
        D == -1 && (D = this.contentDOM.childNodes.length);
        break;
      }
      e = C;
    }
    return { node: this.contentDOM, from: I, to: g, fromOffset: t, toOffset: D };
  }
  emptyChildAt(I) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let g = this.children[I < 0 ? 0 : this.children.length - 1];
    return g.size == 0 || g.emptyChildAt(I);
  }
  domAfterPos(I) {
    let { node: g, offset: A } = this.domFromPos(I, 0);
    if (g.nodeType != 1 || A == g.childNodes.length)
      throw new RangeError("No node after pos " + I);
    return g.childNodes[A];
  }
  setSelection(I, g, A, t = !1) {
    let D = Math.min(I, g), e = Math.max(I, g);
    for (let n = 0, L = 0; n < this.children.length; n++) {
      let o = this.children[n], T = L + o.size;
      if (D > L && e < T)
        return o.setSelection(I - L - o.border, g - L - o.border, A, t);
      L = T;
    }
    let i = this.domFromPos(I, I ? -1 : 1), N = g == I ? i : this.domFromPos(g, g ? -1 : 1), C = A.getSelection(), u = !1;
    if ((dg || BM) && I == g) {
      let { node: n, offset: L } = i;
      if (n.nodeType == 3) {
        if (u = !!(L && n.nodeValue[L - 1] == `
`), u && L == n.nodeValue.length)
          for (let o = n, T; o; o = o.parentNode) {
            if (T = o.nextSibling) {
              T.nodeName == "BR" && (i = N = { node: T.parentNode, offset: XM(T) + 1 });
              break;
            }
            let s = o.pmViewDesc;
            if (s && s.node && s.node.isBlock)
              break;
          }
      } else {
        let o = n.childNodes[L - 1];
        u = o && (o.nodeName == "BR" || o.contentEditable == "false");
      }
    }
    if (dg && C.focusNode && C.focusNode != N.node && C.focusNode.nodeType == 1) {
      let n = C.focusNode.childNodes[C.focusOffset];
      n && n.contentEditable == "false" && (t = !0);
    }
    if (!(t || u && BM) && ce(i.node, i.offset, C.anchorNode, C.anchorOffset) && ce(N.node, N.offset, C.focusNode, C.focusOffset))
      return;
    let j = !1;
    if ((C.extend || I == g) && !u) {
      C.collapse(i.node, i.offset);
      try {
        if (I != g)
          try {
            C.extend(N.node, N.offset);
          } catch {
          }
        j = !0;
      } catch (n) {
        if (!(n instanceof DOMException))
          throw n;
      }
    }
    if (!j) {
      if (I > g) {
        let L = i;
        i = N, N = L;
      }
      let n = document.createRange();
      n.setEnd(N.node, N.offset), n.setStart(i.node, i.offset), C.removeAllRanges(), C.addRange(n);
    }
  }
  ignoreMutation(I) {
    return !this.contentDOM && I.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  markDirty(I, g) {
    for (let A = 0, t = 0; t < this.children.length; t++) {
      let D = this.children[t], e = A + D.size;
      if (A == e ? I <= e && g >= A : I < e && g > A) {
        let i = A + D.border, N = e - D.border;
        if (I >= i && g <= N) {
          this.dirty = I == A || g == e ? Vt : sn, I == i && g == N && (D.contentLost || D.dom.parentNode != this.contentDOM) ? D.dirty = Bg : D.markDirty(I - i, g - i);
          return;
        } else
          D.dirty = D.dom == D.contentDOM && D.dom.parentNode == this.contentDOM && !D.children.length ? Vt : Bg;
      }
      A = e;
    }
    this.dirty = Vt;
  }
  markParentsDirty() {
    let I = 1;
    for (let g = this.parent; g; g = g.parent, I++) {
      let A = I == 1 ? Vt : sn;
      g.dirty < A && (g.dirty = A);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
}
class s4 extends Xe {
  constructor(I, g, A, t) {
    let D, e = g.type.toDOM;
    if (typeof e == "function" && (e = e(A, () => {
      if (!D)
        return t;
      if (D.parent)
        return D.parent.posBeforeChild(D);
    })), !g.type.spec.raw) {
      if (e.nodeType != 1) {
        let i = document.createElement("span");
        i.appendChild(e), e = i;
      }
      e.contentEditable = "false", e.classList.add("ProseMirror-widget");
    }
    super(I, [], e, null), this.widget = g, this.widget = g, D = this;
  }
  matchesWidget(I) {
    return this.dirty == wg && I.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(I) {
    let g = this.widget.spec.stopEvent;
    return g ? g(I) : !1;
  }
  ignoreMutation(I) {
    return I.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get side() {
    return this.widget.type.side;
  }
}
class Ry extends Xe {
  constructor(I, g, A, t) {
    super(I, [], g, null), this.textDOM = A, this.text = t;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(I, g) {
    return I != this.textDOM ? this.posAtStart + (g ? this.size : 0) : this.posAtStart + g;
  }
  domFromPos(I) {
    return { node: this.textDOM, offset: I };
  }
  ignoreMutation(I) {
    return I.type === "characterData" && I.target.nodeValue == I.oldValue;
  }
}
class St extends Xe {
  constructor(I, g, A, t) {
    super(I, [], A, t), this.mark = g;
  }
  static create(I, g, A, t) {
    let D = t.nodeViews[g.type.name], e = D && D(g, t, A);
    return (!e || !e.dom) && (e = Gg.renderSpec(document, g.type.spec.toDOM(g, A))), new St(I, g, e.dom, e.contentDOM || e.dom);
  }
  parseRule() {
    return this.dirty & Bg || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM || void 0 };
  }
  matchesMark(I) {
    return this.dirty != Bg && this.mark.eq(I);
  }
  markDirty(I, g) {
    if (super.markDirty(I, g), this.dirty != wg) {
      let A = this.parent;
      for (; !A.node; )
        A = A.parent;
      A.dirty < this.dirty && (A.dirty = this.dirty), this.dirty = wg;
    }
  }
  slice(I, g, A) {
    let t = St.create(this.parent, this.mark, !0, A), D = this.children, e = this.size;
    g < e && (D = y0(D, g, e, A)), I > 0 && (D = y0(D, 0, I, A));
    for (let i = 0; i < D.length; i++)
      D[i].parent = t;
    return t.children = D, t;
  }
}
class at extends Xe {
  constructor(I, g, A, t, D, e, i, N, C) {
    super(I, [], D, e), this.node = g, this.outerDeco = A, this.innerDeco = t, this.nodeDOM = i, e && this.updateChildren(N, C);
  }
  static create(I, g, A, t, D, e) {
    let i = D.nodeViews[g.type.name], N, C = i && i(g, D, () => {
      if (!N)
        return e;
      if (N.parent)
        return N.parent.posBeforeChild(N);
    }, A, t), u = C && C.dom, j = C && C.contentDOM;
    if (g.isText) {
      if (!u)
        u = document.createTextNode(g.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else
      u || ({ dom: u, contentDOM: j } = Gg.renderSpec(document, g.type.spec.toDOM(g)));
    !j && !g.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), g.type.spec.draggable && (u.draggable = !0));
    let n = u;
    return u = y4(u, A, g), C ? N = new Hy(I, g, A, t, u, j || null, n, C, D, e + 1) : g.isText ? new HN(I, g, A, t, u, n, D) : new at(I, g, A, t, u, j || null, n, D, e + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let I = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (I.preserveWhitespace = "full"), !this.contentDOM)
      I.getContent = () => this.node.content;
    else if (!this.contentLost)
      I.contentElement = this.contentDOM;
    else {
      for (let g = this.children.length - 1; g >= 0; g--) {
        let A = this.children[g];
        if (this.dom.contains(A.dom.parentNode)) {
          I.contentElement = A.dom.parentNode;
          break;
        }
      }
      I.contentElement || (I.getContent = () => G.empty);
    }
    return I;
  }
  matchesNode(I, g, A) {
    return this.dirty == wg && I.eq(this.node) && l0(g, this.outerDeco) && A.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  updateChildren(I, g) {
    let A = this.node.inlineContent, t = g, D = I.composing ? this.localCompositionInfo(I, g) : null, e = D && D.pos > -1 ? D : null, i = D && D.pos < 0, N = new Fy(this, e && e.node, I);
    _y(this.node, this.innerDeco, (C, u, j) => {
      C.spec.marks ? N.syncToMarks(C.spec.marks, A, I) : C.type.side >= 0 && !j && N.syncToMarks(u == this.node.childCount ? YI.none : this.node.child(u).marks, A, I), N.placeWidget(C, I, t);
    }, (C, u, j, n) => {
      N.syncToMarks(C.marks, A, I);
      let L;
      N.findNodeMatch(C, u, j, n) || i && I.state.selection.from > t && I.state.selection.to < t + C.nodeSize && (L = N.findIndexWithChild(D.node)) > -1 && N.updateNodeAt(C, u, j, L, I) || N.updateNextNode(C, u, j, I, n) || N.addNode(C, u, j, I, t), t += C.nodeSize;
    }), N.syncToMarks([], A, I), this.node.isTextblock && N.addTextblockHacks(), N.destroyRest(), (N.changed || this.dirty == Vt) && (e && this.protectLocalComposition(I, e), a4(this.contentDOM, this.children, I), LD && $y(this.dom));
  }
  localCompositionInfo(I, g) {
    let { from: A, to: t } = I.state.selection;
    if (!(I.state.selection instanceof LI) || A < g || t > g + this.node.content.size)
      return null;
    let D = I.domSelection(), e = qy(D.focusNode, D.focusOffset);
    if (!e || !this.dom.contains(e.parentNode))
      return null;
    if (this.node.inlineContent) {
      let i = e.nodeValue, N = Ic(this.node.content, i, A - g, t - g);
      return N < 0 ? null : { node: e, pos: N, text: i };
    } else
      return { node: e, pos: -1, text: "" };
  }
  protectLocalComposition(I, { node: g, pos: A, text: t }) {
    if (this.getDesc(g))
      return;
    let D = g;
    for (; D.parentNode != this.contentDOM; D = D.parentNode) {
      for (; D.previousSibling; )
        D.parentNode.removeChild(D.previousSibling);
      for (; D.nextSibling; )
        D.parentNode.removeChild(D.nextSibling);
      D.pmViewDesc && (D.pmViewDesc = void 0);
    }
    let e = new Ry(this, D, g, t);
    I.input.compositionNodes.push(e), this.children = y0(this.children, A, A + t.length, I, e);
  }
  update(I, g, A, t) {
    return this.dirty == Bg || !I.sameMarkup(this.node) ? !1 : (this.updateInner(I, g, A, t), !0);
  }
  updateInner(I, g, A, t) {
    this.updateOuterDeco(g), this.node = I, this.innerDeco = A, this.contentDOM && this.updateChildren(t, this.posAtStart), this.dirty = wg;
  }
  updateOuterDeco(I) {
    if (l0(I, this.outerDeco))
      return;
    let g = this.nodeDOM.nodeType != 1, A = this.dom;
    this.dom = l4(this.dom, this.nodeDOM, a0(this.outerDeco, this.node, g), a0(I, this.node, g)), this.dom != A && (A.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = I;
  }
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  deselectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable");
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function Sn(M, I, g, A, t) {
  return y4(A, I, M), new at(void 0, M, I, g, A, A, A, t, 0);
}
class HN extends at {
  constructor(I, g, A, t, D, e, i) {
    super(I, g, A, t, D, null, e, i, 0);
  }
  parseRule() {
    let I = this.nodeDOM.parentNode;
    for (; I && I != this.dom && !I.pmIsDeco; )
      I = I.parentNode;
    return { skip: I || !0 };
  }
  update(I, g, A, t) {
    return this.dirty == Bg || this.dirty != wg && !this.inParent() || !I.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(g), (this.dirty != wg || I.text != this.node.text) && I.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = I.text, t.trackWrites == this.nodeDOM && (t.trackWrites = null)), this.node = I, this.dirty = wg, !0);
  }
  inParent() {
    let I = this.parent.contentDOM;
    for (let g = this.nodeDOM; g; g = g.parentNode)
      if (g == I)
        return !0;
    return !1;
  }
  domFromPos(I) {
    return { node: this.nodeDOM, offset: I };
  }
  localPosFromDOM(I, g, A) {
    return I == this.nodeDOM ? this.posAtStart + Math.min(g, this.node.text.length) : super.localPosFromDOM(I, g, A);
  }
  ignoreMutation(I) {
    return I.type != "characterData" && I.type != "selection";
  }
  slice(I, g, A) {
    let t = this.node.cut(I, g), D = document.createTextNode(t.text);
    return new HN(this.parent, t, this.outerDeco, this.innerDeco, D, D, A);
  }
  markDirty(I, g) {
    super.markDirty(I, g), this.dom != this.nodeDOM && (I == 0 || g == this.nodeDOM.nodeValue.length) && (this.dirty = Bg);
  }
  get domAtom() {
    return !1;
  }
}
class S4 extends Xe {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(I) {
    return this.dirty == wg && this.dom.nodeName == I;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class Hy extends at {
  constructor(I, g, A, t, D, e, i, N, C, u) {
    super(I, g, A, t, D, e, i, C, u), this.spec = N;
  }
  update(I, g, A, t) {
    if (this.dirty == Bg)
      return !1;
    if (this.spec.update) {
      let D = this.spec.update(I, g, A);
      return D && this.updateInner(I, g, A, t), D;
    } else
      return !this.contentDOM && !I.isLeaf ? !1 : super.update(I, g, A, t);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(I, g, A, t) {
    this.spec.setSelection ? this.spec.setSelection(I, g, A) : super.setSelection(I, g, A, t);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(I) {
    return this.spec.stopEvent ? this.spec.stopEvent(I) : !1;
  }
  ignoreMutation(I) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(I) : super.ignoreMutation(I);
  }
}
function a4(M, I, g) {
  let A = M.firstChild, t = !1;
  for (let D = 0; D < I.length; D++) {
    let e = I[D], i = e.dom;
    if (i.parentNode == M) {
      for (; i != A; )
        A = an(A), t = !0;
      A = A.nextSibling;
    } else
      t = !0, M.insertBefore(i, A);
    if (e instanceof St) {
      let N = A ? A.previousSibling : M.lastChild;
      a4(e.contentDOM, e.children, g), A = N ? N.nextSibling : M.firstChild;
    }
  }
  for (; A; )
    A = an(A), t = !0;
  t && g.trackWrites == M && (g.trackWrites = null);
}
const ee = function(M) {
  M && (this.nodeName = M);
};
ee.prototype = /* @__PURE__ */ Object.create(null);
const Mt = [new ee()];
function a0(M, I, g) {
  if (M.length == 0)
    return Mt;
  let A = g ? Mt[0] : new ee(), t = [A];
  for (let D = 0; D < M.length; D++) {
    let e = M[D].type.attrs;
    if (!!e) {
      e.nodeName && t.push(A = new ee(e.nodeName));
      for (let i in e) {
        let N = e[i];
        N != null && (g && t.length == 1 && t.push(A = new ee(I.isInline ? "span" : "div")), i == "class" ? A.class = (A.class ? A.class + " " : "") + N : i == "style" ? A.style = (A.style ? A.style + ";" : "") + N : i != "nodeName" && (A[i] = N));
      }
    }
  }
  return t;
}
function l4(M, I, g, A) {
  if (g == Mt && A == Mt)
    return I;
  let t = I;
  for (let D = 0; D < A.length; D++) {
    let e = A[D], i = g[D];
    if (D) {
      let N;
      i && i.nodeName == e.nodeName && t != M && (N = t.parentNode) && N.nodeName.toLowerCase() == e.nodeName || (N = document.createElement(e.nodeName), N.pmIsDeco = !0, N.appendChild(t), i = Mt[0]), t = N;
    }
    Vy(t, i || Mt[0], e);
  }
  return t;
}
function Vy(M, I, g) {
  for (let A in I)
    A != "class" && A != "style" && A != "nodeName" && !(A in g) && M.removeAttribute(A);
  for (let A in g)
    A != "class" && A != "style" && A != "nodeName" && g[A] != I[A] && M.setAttribute(A, g[A]);
  if (I.class != g.class) {
    let A = I.class ? I.class.split(" ").filter(Boolean) : [], t = g.class ? g.class.split(" ").filter(Boolean) : [];
    for (let D = 0; D < A.length; D++)
      t.indexOf(A[D]) == -1 && M.classList.remove(A[D]);
    for (let D = 0; D < t.length; D++)
      A.indexOf(t[D]) == -1 && M.classList.add(t[D]);
    M.classList.length == 0 && M.removeAttribute("class");
  }
  if (I.style != g.style) {
    if (I.style) {
      let A = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, t;
      for (; t = A.exec(I.style); )
        M.style.removeProperty(t[1]);
    }
    g.style && (M.style.cssText += g.style);
  }
}
function y4(M, I, g) {
  return l4(M, M, Mt, a0(I, g, M.nodeType != 1));
}
function l0(M, I) {
  if (M.length != I.length)
    return !1;
  for (let g = 0; g < M.length; g++)
    if (!M[g].type.eq(I[g].type))
      return !1;
  return !0;
}
function an(M) {
  let I = M.nextSibling;
  return M.parentNode.removeChild(M), I;
}
class Fy {
  constructor(I, g, A) {
    this.lock = g, this.view = A, this.index = 0, this.stack = [], this.changed = !1, this.top = I, this.preMatch = Xy(I.node.content, I);
  }
  destroyBetween(I, g) {
    if (I != g) {
      for (let A = I; A < g; A++)
        this.top.children[A].destroy();
      this.top.children.splice(I, g - I), this.changed = !0;
    }
  }
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  syncToMarks(I, g, A) {
    let t = 0, D = this.stack.length >> 1, e = Math.min(D, I.length);
    for (; t < e && (t == D - 1 ? this.top : this.stack[t + 1 << 1]).matchesMark(I[t]) && I[t].type.spec.spanning !== !1; )
      t++;
    for (; t < D; )
      this.destroyRest(), this.top.dirty = wg, this.index = this.stack.pop(), this.top = this.stack.pop(), D--;
    for (; D < I.length; ) {
      this.stack.push(this.top, this.index + 1);
      let i = -1;
      for (let N = this.index; N < Math.min(this.index + 3, this.top.children.length); N++)
        if (this.top.children[N].matchesMark(I[D])) {
          i = N;
          break;
        }
      if (i > -1)
        i > this.index && (this.changed = !0, this.destroyBetween(this.index, i)), this.top = this.top.children[this.index];
      else {
        let N = St.create(this.top, I[D], g, A);
        this.top.children.splice(this.index, 0, N), this.top = N, this.changed = !0;
      }
      this.index = 0, D++;
    }
  }
  findNodeMatch(I, g, A, t) {
    let D = -1, e;
    if (t >= this.preMatch.index && (e = this.preMatch.matches[t - this.preMatch.index]).parent == this.top && e.matchesNode(I, g, A))
      D = this.top.children.indexOf(e, this.index);
    else
      for (let i = this.index, N = Math.min(this.top.children.length, i + 5); i < N; i++) {
        let C = this.top.children[i];
        if (C.matchesNode(I, g, A) && !this.preMatch.matched.has(C)) {
          D = i;
          break;
        }
      }
    return D < 0 ? !1 : (this.destroyBetween(this.index, D), this.index++, !0);
  }
  updateNodeAt(I, g, A, t, D) {
    let e = this.top.children[t];
    return e.dirty == Bg && e.dom == e.contentDOM && (e.dirty = Vt), e.update(I, g, A, D) ? (this.destroyBetween(this.index, t), this.index++, !0) : !1;
  }
  findIndexWithChild(I) {
    for (; ; ) {
      let g = I.parentNode;
      if (!g)
        return -1;
      if (g == this.top.contentDOM) {
        let A = I.pmViewDesc;
        if (A) {
          for (let t = this.index; t < this.top.children.length; t++)
            if (this.top.children[t] == A)
              return t;
        }
        return -1;
      }
      I = g;
    }
  }
  updateNextNode(I, g, A, t, D) {
    for (let e = this.index; e < this.top.children.length; e++) {
      let i = this.top.children[e];
      if (i instanceof at) {
        let N = this.preMatch.matched.get(i);
        if (N != null && N != D)
          return !1;
        let C = i.dom;
        if (!(this.lock && (C == this.lock || C.nodeType == 1 && C.contains(this.lock.parentNode)) && !(I.isText && i.node && i.node.isText && i.nodeDOM.nodeValue == I.text && i.dirty != Bg && l0(g, i.outerDeco))) && i.update(I, g, A, t))
          return this.destroyBetween(this.index, e), i.dom != C && (this.changed = !0), this.index++, !0;
        break;
      }
    }
    return !1;
  }
  addNode(I, g, A, t, D) {
    this.top.children.splice(this.index++, 0, at.create(this.top, I, g, A, t, D)), this.changed = !0;
  }
  placeWidget(I, g, A) {
    let t = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (t && t.matchesWidget(I) && (I == t.widget || !t.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let D = new s4(this.top, I, g, A);
      this.top.children.splice(this.index++, 0, D), this.changed = !0;
    }
  }
  addTextblockHacks() {
    let I = this.top.children[this.index - 1], g = this.top;
    for (; I instanceof St; )
      g = I, I = g.children[g.children.length - 1];
    (!I || !(I instanceof HN) || /\n$/.test(I.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(I.node.text)) && ((BM || pM) && I && I.dom.contentEditable == "false" && this.addHackNode("IMG", g), this.addHackNode("BR", this.top));
  }
  addHackNode(I, g) {
    if (g == this.top && this.index < g.children.length && g.children[this.index].matchesHack(I))
      this.index++;
    else {
      let A = document.createElement(I);
      I == "IMG" && (A.className = "ProseMirror-separator", A.alt = ""), I == "BR" && (A.className = "ProseMirror-trailingBreak");
      let t = new S4(this.top, [], A, null);
      g != this.top ? g.children.push(t) : g.children.splice(this.index++, 0, t), this.changed = !0;
    }
  }
}
function Xy(M, I) {
  let g = I, A = g.children.length, t = M.childCount, D = /* @__PURE__ */ new Map(), e = [];
  I:
    for (; t > 0; ) {
      let i;
      for (; ; )
        if (A) {
          let C = g.children[A - 1];
          if (C instanceof St)
            g = C, A = C.children.length;
          else {
            i = C, A--;
            break;
          }
        } else {
          if (g == I)
            break I;
          A = g.parent.children.indexOf(g), g = g.parent;
        }
      let N = i.node;
      if (!!N) {
        if (N != M.child(t - 1))
          break;
        --t, D.set(i, t), e.push(i);
      }
    }
  return { index: t, matched: D, matches: e.reverse() };
}
function Ky(M, I) {
  return M.type.side - I.type.side;
}
function _y(M, I, g, A) {
  let t = I.locals(M), D = 0;
  if (t.length == 0) {
    for (let C = 0; C < M.childCount; C++) {
      let u = M.child(C);
      A(u, t, I.forChild(D, u), C), D += u.nodeSize;
    }
    return;
  }
  let e = 0, i = [], N = null;
  for (let C = 0; ; ) {
    if (e < t.length && t[e].to == D) {
      let o = t[e++], T;
      for (; e < t.length && t[e].to == D; )
        (T || (T = [o])).push(t[e++]);
      if (T) {
        T.sort(Ky);
        for (let s = 0; s < T.length; s++)
          g(T[s], C, !!N);
      } else
        g(o, C, !!N);
    }
    let u, j;
    if (N)
      j = -1, u = N, N = null;
    else if (C < M.childCount)
      j = C, u = M.child(C++);
    else
      break;
    for (let o = 0; o < i.length; o++)
      i[o].to <= D && i.splice(o--, 1);
    for (; e < t.length && t[e].from <= D && t[e].to > D; )
      i.push(t[e++]);
    let n = D + u.nodeSize;
    if (u.isText) {
      let o = n;
      e < t.length && t[e].from < o && (o = t[e].from);
      for (let T = 0; T < i.length; T++)
        i[T].to < o && (o = i[T].to);
      o < n && (N = u.cut(o - D), u = u.cut(0, o - D), n = o, j = -1);
    }
    let L = u.isInline && !u.isLeaf ? i.filter((o) => !o.inline) : i.slice();
    A(u, L, I.forChild(D, u), j), D = n;
  }
}
function $y(M) {
  if (M.nodeName == "UL" || M.nodeName == "OL") {
    let I = M.style.cssText;
    M.style.cssText = I + "; list-style: square !important", window.getComputedStyle(M).listStyle, M.style.cssText = I;
  }
}
function qy(M, I) {
  for (; ; ) {
    if (M.nodeType == 3)
      return M;
    if (M.nodeType == 1 && I > 0) {
      if (M.childNodes.length > I && M.childNodes[I].nodeType == 3)
        return M.childNodes[I];
      M = M.childNodes[I - 1], I = fg(M);
    } else if (M.nodeType == 1 && I < M.childNodes.length)
      M = M.childNodes[I], I = 0;
    else
      return null;
  }
}
function Ic(M, I, g, A) {
  for (let t = 0, D = 0; t < M.childCount && D <= A; ) {
    let e = M.child(t++), i = D;
    if (D += e.nodeSize, !e.isText)
      continue;
    let N = e.text;
    for (; t < M.childCount; ) {
      let C = M.child(t++);
      if (D += C.nodeSize, !C.isText)
        break;
      N += C.text;
    }
    if (D >= g) {
      let C = i < A ? N.lastIndexOf(I, A - i - 1) : -1;
      if (C >= 0 && C + I.length + i >= g)
        return i + C;
      if (g == A && N.length >= A + I.length - i && N.slice(A - i, A - i + I.length) == I)
        return A;
    }
  }
  return -1;
}
function y0(M, I, g, A, t) {
  let D = [];
  for (let e = 0, i = 0; e < M.length; e++) {
    let N = M[e], C = i, u = i += N.size;
    C >= g || u <= I ? D.push(N) : (C < I && D.push(N.slice(0, I - C, A)), t && (D.push(t), t = void 0), u > g && D.push(N.slice(g - C, N.size, A)));
  }
  return D;
}
function au(M, I = null) {
  let g = M.domSelection(), A = M.state.doc;
  if (!g.focusNode)
    return null;
  let t = M.docView.nearestDesc(g.focusNode), D = t && t.size == 0, e = M.docView.posFromDOM(g.focusNode, g.focusOffset, 1);
  if (e < 0)
    return null;
  let i = A.resolve(e), N, C;
  if (RN(g)) {
    for (N = i; t && !t.node; )
      t = t.parent;
    let u = t.node;
    if (t && u.isAtom && CI.isSelectable(u) && t.parent && !(u.isInline && my(g.focusNode, g.focusOffset, t.dom))) {
      let j = t.posBefore;
      C = new CI(e == j ? i : A.resolve(j));
    }
  } else {
    let u = M.docView.posFromDOM(g.anchorNode, g.anchorOffset, 1);
    if (u < 0)
      return null;
    N = A.resolve(u);
  }
  if (!C) {
    let u = I == "pointer" || M.state.selection.head < i.pos && !D ? 1 : -1;
    C = lu(M, N, i, u);
  }
  return C;
}
function c4(M) {
  return M.editable ? M.hasFocus() : r4(M) && document.activeElement && document.activeElement.contains(M.dom);
}
function gA(M, I = !1) {
  let g = M.state.selection;
  if (x4(M, g), !!c4(M)) {
    if (!I && M.input.mouseDown && M.input.mouseDown.allowDefault && pM) {
      let A = M.domSelection(), t = M.domObserver.currentSelection;
      if (A.anchorNode && t.anchorNode && ce(A.anchorNode, A.anchorOffset, t.anchorNode, t.anchorOffset)) {
        M.input.mouseDown.delayedSelectionSync = !0, M.domObserver.setCurSelection();
        return;
      }
    }
    if (M.domObserver.disconnectSelection(), M.cursorWrapper)
      gc(M);
    else {
      let { anchor: A, head: t } = g, D, e;
      ln && !(g instanceof LI) && (g.$from.parent.inlineContent || (D = yn(M, g.from)), !g.empty && !g.$from.parent.inlineContent && (e = yn(M, g.to))), M.docView.setSelection(A, t, M.root, I), ln && (D && cn(D), e && cn(e)), g.visible ? M.dom.classList.remove("ProseMirror-hideselection") : (M.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Mc(M));
    }
    M.domObserver.setCurSelection(), M.domObserver.connectSelection();
  }
}
const ln = BM || pM && Ey < 63;
function yn(M, I) {
  let { node: g, offset: A } = M.docView.domFromPos(I, 0), t = A < g.childNodes.length ? g.childNodes[A] : null, D = A ? g.childNodes[A - 1] : null;
  if (BM && t && t.contentEditable == "false")
    return hC(t);
  if ((!t || t.contentEditable == "false") && (!D || D.contentEditable == "false")) {
    if (t)
      return hC(t);
    if (D)
      return hC(D);
  }
}
function hC(M) {
  return M.contentEditable = "true", BM && M.draggable && (M.draggable = !1, M.wasDraggable = !0), M;
}
function cn(M) {
  M.contentEditable = "false", M.wasDraggable && (M.draggable = !0, M.wasDraggable = null);
}
function Mc(M) {
  let I = M.dom.ownerDocument;
  I.removeEventListener("selectionchange", M.input.hideSelectionGuard);
  let g = M.domSelection(), A = g.anchorNode, t = g.anchorOffset;
  I.addEventListener("selectionchange", M.input.hideSelectionGuard = () => {
    (g.anchorNode != A || g.anchorOffset != t) && (I.removeEventListener("selectionchange", M.input.hideSelectionGuard), setTimeout(() => {
      (!c4(M) || M.state.selection.visible) && M.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function gc(M) {
  let I = M.domSelection(), g = document.createRange(), A = M.cursorWrapper.dom, t = A.nodeName == "IMG";
  t ? g.setEnd(A.parentNode, XM(A) + 1) : g.setEnd(A, 0), g.collapse(!1), I.removeAllRanges(), I.addRange(g), !t && !M.state.selection.visible && WM && hA <= 11 && (A.disabled = !0, A.disabled = !1);
}
function x4(M, I) {
  if (I instanceof CI) {
    let g = M.docView.descAt(I.from);
    g != M.lastSelectedViewDesc && (xn(M), g && g.selectNode(), M.lastSelectedViewDesc = g);
  } else
    xn(M);
}
function xn(M) {
  M.lastSelectedViewDesc && (M.lastSelectedViewDesc.parent && M.lastSelectedViewDesc.deselectNode(), M.lastSelectedViewDesc = void 0);
}
function lu(M, I, g, A) {
  return M.someProp("createSelectionBetween", (t) => t(M, I, g)) || LI.between(I, g, A);
}
function rn(M) {
  return M.editable && !M.hasFocus() ? !1 : r4(M);
}
function r4(M) {
  let I = M.domSelection();
  if (!I.anchorNode)
    return !1;
  try {
    return M.dom.contains(I.anchorNode.nodeType == 3 ? I.anchorNode.parentNode : I.anchorNode) && (M.editable || M.dom.contains(I.focusNode.nodeType == 3 ? I.focusNode.parentNode : I.focusNode));
  } catch {
    return !1;
  }
}
function Ac(M) {
  let I = M.docView.domFromPos(M.state.selection.anchor, 0), g = M.domSelection();
  return ce(I.node, I.offset, g.anchorNode, g.anchorOffset);
}
function c0(M, I) {
  let { $anchor: g, $head: A } = M.selection, t = I > 0 ? g.max(A) : g.min(A), D = t.parent.inlineContent ? t.depth ? M.doc.resolve(I > 0 ? t.after() : t.before()) : null : t;
  return D && uI.findFrom(D, I);
}
function qA(M, I) {
  return M.dispatch(M.state.tr.setSelection(I).scrollIntoView()), !0;
}
function wn(M, I, g) {
  let A = M.state.selection;
  if (A instanceof LI) {
    if (!A.empty || g.indexOf("s") > -1)
      return !1;
    if (M.endOfTextblock(I > 0 ? "right" : "left")) {
      let t = c0(M.state, I);
      return t && t instanceof CI ? qA(M, t) : !1;
    } else if (!(tg && g.indexOf("m") > -1)) {
      let t = A.$head, D = t.textOffset ? null : I < 0 ? t.nodeBefore : t.nodeAfter, e;
      if (!D || D.isText)
        return !1;
      let i = I < 0 ? t.pos - D.nodeSize : t.pos;
      return D.isAtom || (e = M.docView.descAt(i)) && !e.contentDOM ? CI.isSelectable(D) ? qA(M, new CI(I < 0 ? M.state.doc.resolve(t.pos - D.nodeSize) : t)) : BN ? qA(M, new LI(M.state.doc.resolve(I < 0 ? i : i + D.nodeSize))) : !1 : !1;
    }
  } else {
    if (A instanceof CI && A.node.isInline)
      return qA(M, new LI(I > 0 ? A.$to : A.$from));
    {
      let t = c0(M.state, I);
      return t ? qA(M, t) : !1;
    }
  }
}
function qi(M) {
  return M.nodeType == 3 ? M.nodeValue.length : M.childNodes.length;
}
function ie(M) {
  let I = M.pmViewDesc;
  return I && I.size == 0 && (M.nextSibling || M.nodeName != "BR");
}
function OC(M) {
  let I = M.domSelection(), g = I.focusNode, A = I.focusOffset;
  if (!g)
    return;
  let t, D, e = !1;
  for (dg && g.nodeType == 1 && A < qi(g) && ie(g.childNodes[A]) && (e = !0); ; )
    if (A > 0) {
      if (g.nodeType != 1)
        break;
      {
        let i = g.childNodes[A - 1];
        if (ie(i))
          t = g, D = --A;
        else if (i.nodeType == 3)
          g = i, A = g.nodeValue.length;
        else
          break;
      }
    } else {
      if (w4(g))
        break;
      {
        let i = g.previousSibling;
        for (; i && ie(i); )
          t = g.parentNode, D = XM(i), i = i.previousSibling;
        if (i)
          g = i, A = qi(g);
        else {
          if (g = g.parentNode, g == M.dom)
            break;
          A = 0;
        }
      }
    }
  e ? x0(M, I, g, A) : t && x0(M, I, t, D);
}
function kC(M) {
  let I = M.domSelection(), g = I.focusNode, A = I.focusOffset;
  if (!g)
    return;
  let t = qi(g), D, e;
  for (; ; )
    if (A < t) {
      if (g.nodeType != 1)
        break;
      let i = g.childNodes[A];
      if (ie(i))
        D = g, e = ++A;
      else
        break;
    } else {
      if (w4(g))
        break;
      {
        let i = g.nextSibling;
        for (; i && ie(i); )
          D = i.parentNode, e = XM(i) + 1, i = i.nextSibling;
        if (i)
          g = i, A = 0, t = qi(g);
        else {
          if (g = g.parentNode, g == M.dom)
            break;
          A = t = 0;
        }
      }
    }
  D && x0(M, I, D, e);
}
function w4(M) {
  let I = M.pmViewDesc;
  return I && I.node && I.node.isBlock;
}
function x0(M, I, g, A) {
  if (RN(I)) {
    let D = document.createRange();
    D.setEnd(g, A), D.setStart(g, A), I.removeAllRanges(), I.addRange(D);
  } else
    I.extend && I.extend(g, A);
  M.domObserver.setCurSelection();
  let { state: t } = M;
  setTimeout(() => {
    M.state == t && gA(M);
  }, 50);
}
function En(M, I, g) {
  let A = M.state.selection;
  if (A instanceof LI && !A.empty || g.indexOf("s") > -1 || tg && g.indexOf("m") > -1)
    return !1;
  let { $from: t, $to: D } = A;
  if (!t.parent.inlineContent || M.endOfTextblock(I < 0 ? "up" : "down")) {
    let e = c0(M.state, I);
    if (e && e instanceof CI)
      return qA(M, e);
  }
  if (!t.parent.inlineContent) {
    let e = I < 0 ? t : D, i = A instanceof rg ? uI.near(e, I) : uI.findFrom(e, I);
    return i ? qA(M, i) : !1;
  }
  return !1;
}
function dn(M, I) {
  if (!(M.state.selection instanceof LI))
    return !0;
  let { $head: g, $anchor: A, empty: t } = M.state.selection;
  if (!g.sameParent(A))
    return !0;
  if (!t)
    return !1;
  if (M.endOfTextblock(I > 0 ? "forward" : "backward"))
    return !0;
  let D = !g.textOffset && (I < 0 ? g.nodeBefore : g.nodeAfter);
  if (D && !D.isText) {
    let e = M.state.tr;
    return I < 0 ? e.delete(g.pos - D.nodeSize, g.pos) : e.delete(g.pos, g.pos + D.nodeSize), M.dispatch(e), !0;
  }
  return !1;
}
function zn(M, I, g) {
  M.domObserver.stop(), I.contentEditable = g, M.domObserver.start();
}
function tc(M) {
  if (!BM || M.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: I, focusOffset: g } = M.domSelection();
  if (I && I.nodeType == 1 && g == 0 && I.firstChild && I.firstChild.contentEditable == "false") {
    let A = I.firstChild;
    zn(M, A, "true"), setTimeout(() => zn(M, A, "false"), 20);
  }
  return !1;
}
function Dc(M) {
  let I = "";
  return M.ctrlKey && (I += "c"), M.metaKey && (I += "m"), M.altKey && (I += "a"), M.shiftKey && (I += "s"), I;
}
function ec(M, I) {
  let g = I.keyCode, A = Dc(I);
  return g == 8 || tg && g == 72 && A == "c" ? dn(M, -1) || OC(M) : g == 46 || tg && g == 68 && A == "c" ? dn(M, 1) || kC(M) : g == 13 || g == 27 ? !0 : g == 37 || tg && g == 66 && A == "c" ? wn(M, -1, A) || OC(M) : g == 39 || tg && g == 70 && A == "c" ? wn(M, 1, A) || kC(M) : g == 38 || tg && g == 80 && A == "c" ? En(M, -1, A) || OC(M) : g == 40 || tg && g == 78 && A == "c" ? tc(M) || En(M, 1, A) || kC(M) : A == (tg ? "m" : "c") && (g == 66 || g == 73 || g == 89 || g == 90);
}
function E4(M, I) {
  M.someProp("transformCopied", (L) => {
    I = L(I);
  });
  let g = [], { content: A, openStart: t, openEnd: D } = I;
  for (; t > 1 && D > 1 && A.childCount == 1 && A.firstChild.childCount == 1; ) {
    t--, D--;
    let L = A.firstChild;
    g.push(L.type.name, L.attrs != L.type.defaultAttrs ? L.attrs : null), A = L.content;
  }
  let e = M.someProp("clipboardSerializer") || Gg.fromSchema(M.state.schema), i = p4(), N = i.createElement("div");
  N.appendChild(e.serializeFragment(A, { document: i }));
  let C = N.firstChild, u, j = 0;
  for (; C && C.nodeType == 1 && (u = Y4[C.nodeName.toLowerCase()]); ) {
    for (let L = u.length - 1; L >= 0; L--) {
      let o = i.createElement(u[L]);
      for (; N.firstChild; )
        o.appendChild(N.firstChild);
      N.appendChild(o), j++;
    }
    C = N.firstChild;
  }
  C && C.nodeType == 1 && C.setAttribute("data-pm-slice", `${t} ${D}${j ? ` -${j}` : ""} ${JSON.stringify(g)}`);
  let n = M.someProp("clipboardTextSerializer", (L) => L(I)) || I.content.textBetween(0, I.content.size, `

`);
  return { dom: N, text: n };
}
function d4(M, I, g, A, t) {
  let D = t.parent.type.spec.code, e, i;
  if (!g && !I)
    return null;
  let N = I && (A || D || !g);
  if (N) {
    if (M.someProp("transformPastedText", (n) => {
      I = n(I, D || A);
    }), D)
      return I ? new K(G.from(M.state.schema.text(I.replace(/\r\n?/g, `
`))), 0, 0) : K.empty;
    let j = M.someProp("clipboardTextParser", (n) => n(I, t, A));
    if (j)
      i = j;
    else {
      let n = t.marks(), { schema: L } = M.state, o = Gg.fromSchema(L);
      e = document.createElement("div"), I.split(/(?:\r\n?|\n)+/).forEach((T) => {
        let s = e.appendChild(document.createElement("p"));
        T && s.appendChild(o.serializeNode(L.text(T, n)));
      });
    }
  } else
    M.someProp("transformPastedHTML", (j) => {
      g = j(g);
    }), e = Cc(g), BN && uc(e);
  let C = e && e.querySelector("[data-pm-slice]"), u = C && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(C.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let j = +u[3]; j > 0 && e.firstChild; j--)
      e = e.firstChild;
  if (i || (i = (M.someProp("clipboardParser") || M.someProp("domParser") || uD.fromSchema(M.state.schema)).parseSlice(e, {
    preserveWhitespace: !!(N || u),
    context: t,
    ruleFromNode(n) {
      return n.nodeName == "BR" && !n.nextSibling && n.parentNode && !ic.test(n.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    i = jc(mn(i, +u[1], +u[2]), u[4]);
  else if (i = K.maxOpen(Nc(i.content, t), !0), i.openStart || i.openEnd) {
    let j = 0, n = 0;
    for (let L = i.content.firstChild; j < i.openStart && !L.type.spec.isolating; j++, L = L.firstChild)
      ;
    for (let L = i.content.lastChild; n < i.openEnd && !L.type.spec.isolating; n++, L = L.lastChild)
      ;
    i = mn(i, j, n);
  }
  return M.someProp("transformPasted", (j) => {
    i = j(i);
  }), i;
}
const ic = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Nc(M, I) {
  if (M.childCount < 2)
    return M;
  for (let g = I.depth; g >= 0; g--) {
    let t = I.node(g).contentMatchAt(I.index(g)), D, e = [];
    if (M.forEach((i) => {
      if (!e)
        return;
      let N = t.findWrapping(i.type), C;
      if (!N)
        return e = null;
      if (C = e.length && D.length && m4(N, D, i, e[e.length - 1], 0))
        e[e.length - 1] = C;
      else {
        e.length && (e[e.length - 1] = b4(e[e.length - 1], D.length));
        let u = z4(i, N);
        e.push(u), t = t.matchType(u.type), D = N;
      }
    }), e)
      return G.from(e);
  }
  return M;
}
function z4(M, I, g = 0) {
  for (let A = I.length - 1; A >= g; A--)
    M = I[A].create(null, G.from(M));
  return M;
}
function m4(M, I, g, A, t) {
  if (t < M.length && t < I.length && M[t] == I[t]) {
    let D = m4(M, I, g, A.lastChild, t + 1);
    if (D)
      return A.copy(A.content.replaceChild(A.childCount - 1, D));
    if (A.contentMatchAt(A.childCount).matchType(t == M.length - 1 ? g.type : M[t + 1]))
      return A.copy(A.content.append(G.from(z4(g, M, t + 1))));
  }
}
function b4(M, I) {
  if (I == 0)
    return M;
  let g = M.content.replaceChild(M.childCount - 1, b4(M.lastChild, I - 1)), A = M.contentMatchAt(M.childCount).fillBefore(G.empty, !0);
  return M.copy(g.append(A));
}
function r0(M, I, g, A, t, D) {
  let e = I < 0 ? M.firstChild : M.lastChild, i = e.content;
  return t < A - 1 && (i = r0(i, I, g, A, t + 1, D)), t >= g && (i = I < 0 ? e.contentMatchAt(0).fillBefore(i, M.childCount > 1 || D <= t).append(i) : i.append(e.contentMatchAt(e.childCount).fillBefore(G.empty, !0))), M.replaceChild(I < 0 ? 0 : M.childCount - 1, e.copy(i));
}
function mn(M, I, g) {
  return I < M.openStart && (M = new K(r0(M.content, -1, I, M.openStart, 0, M.openEnd), I, M.openEnd)), g < M.openEnd && (M = new K(r0(M.content, 1, g, M.openEnd, 0, 0), M.openStart, g)), M;
}
const Y4 = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let bn = null;
function p4() {
  return bn || (bn = document.implementation.createHTMLDocument("title"));
}
function Cc(M) {
  let I = /^(\s*<meta [^>]*>)*/.exec(M);
  I && (M = M.slice(I[0].length));
  let g = p4().createElement("div"), A = /<([a-z][^>\s]+)/i.exec(M), t;
  if ((t = A && Y4[A[1].toLowerCase()]) && (M = t.map((D) => "<" + D + ">").join("") + M + t.map((D) => "</" + D + ">").reverse().join("")), g.innerHTML = M, t)
    for (let D = 0; D < t.length; D++)
      g = g.querySelector(t[D]) || g;
  return g;
}
function uc(M) {
  let I = M.querySelectorAll(pM ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let g = 0; g < I.length; g++) {
    let A = I[g];
    A.childNodes.length == 1 && A.textContent == "\xA0" && A.parentNode && A.parentNode.replaceChild(M.ownerDocument.createTextNode(" "), A);
  }
}
function jc(M, I) {
  if (!M.size)
    return M;
  let g = M.content.firstChild.type.schema, A;
  try {
    A = JSON.parse(I);
  } catch {
    return M;
  }
  let { content: t, openStart: D, openEnd: e } = M;
  for (let i = A.length - 2; i >= 0; i -= 2) {
    let N = g.nodes[A[i]];
    if (!N || N.hasRequiredAttrs())
      break;
    t = G.from(N.create(A[i + 1], t)), D++, e++;
  }
  return new K(t, D, e);
}
const hM = {}, OM = {}, nc = { touchstart: !0, touchmove: !0 };
class Lc {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "" }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastAndroidDelete = 0, this.composing = !1, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function oc(M) {
  for (let I in hM) {
    let g = hM[I];
    M.dom.addEventListener(I, M.input.eventHandlers[I] = (A) => {
      sc(M, A) && !yu(M, A) && (M.editable || !(A.type in OM)) && g(M, A);
    }, nc[I] ? { passive: !0 } : void 0);
  }
  BM && M.dom.addEventListener("input", () => null), w0(M);
}
function wA(M, I) {
  M.input.lastSelectionOrigin = I, M.input.lastSelectionTime = Date.now();
}
function Tc(M) {
  M.domObserver.stop();
  for (let I in M.input.eventHandlers)
    M.dom.removeEventListener(I, M.input.eventHandlers[I]);
  clearTimeout(M.input.composingTimeout), clearTimeout(M.input.lastIOSEnterFallbackTimeout);
}
function w0(M) {
  M.someProp("handleDOMEvents", (I) => {
    for (let g in I)
      M.input.eventHandlers[g] || M.dom.addEventListener(g, M.input.eventHandlers[g] = (A) => yu(M, A));
  });
}
function yu(M, I) {
  return M.someProp("handleDOMEvents", (g) => {
    let A = g[I.type];
    return A ? A(M, I) || I.defaultPrevented : !1;
  });
}
function sc(M, I) {
  if (!I.bubbles)
    return !0;
  if (I.defaultPrevented)
    return !1;
  for (let g = I.target; g != M.dom; g = g.parentNode)
    if (!g || g.nodeType == 11 || g.pmViewDesc && g.pmViewDesc.stopEvent(I))
      return !1;
  return !0;
}
function Sc(M, I) {
  !yu(M, I) && hM[I.type] && (M.editable || !(I.type in OM)) && hM[I.type](M, I);
}
OM.keydown = (M, I) => {
  let g = I;
  if (M.input.shiftKey = g.keyCode == 16 || g.shiftKey, !h4(M, g) && (M.input.lastKeyCode = g.keyCode, M.input.lastKeyCodeTime = Date.now(), !(Pg && pM && g.keyCode == 13)))
    if (g.keyCode != 229 && M.domObserver.forceFlush(), LD && g.keyCode == 13 && !g.ctrlKey && !g.altKey && !g.metaKey) {
      let A = Date.now();
      M.input.lastIOSEnter = A, M.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        M.input.lastIOSEnter == A && (M.someProp("handleKeyDown", (t) => t(M, Ht(13, "Enter"))), M.input.lastIOSEnter = 0);
      }, 200);
    } else
      M.someProp("handleKeyDown", (A) => A(M, g)) || ec(M, g) ? g.preventDefault() : wA(M, "key");
};
OM.keyup = (M, I) => {
  I.keyCode == 16 && (M.input.shiftKey = !1);
};
OM.keypress = (M, I) => {
  let g = I;
  if (h4(M, g) || !g.charCode || g.ctrlKey && !g.altKey || tg && g.metaKey)
    return;
  if (M.someProp("handleKeyPress", (t) => t(M, g))) {
    g.preventDefault();
    return;
  }
  let A = M.state.selection;
  if (!(A instanceof LI) || !A.$from.sameParent(A.$to)) {
    let t = String.fromCharCode(g.charCode);
    M.someProp("handleTextInput", (D) => D(M, A.$from.pos, A.$to.pos, t)) || M.dispatch(M.state.tr.insertText(t).scrollIntoView()), g.preventDefault();
  }
};
function VN(M) {
  return { left: M.clientX, top: M.clientY };
}
function ac(M, I) {
  let g = I.x - M.clientX, A = I.y - M.clientY;
  return g * g + A * A < 100;
}
function cu(M, I, g, A, t) {
  if (A == -1)
    return !1;
  let D = M.state.doc.resolve(A);
  for (let e = D.depth + 1; e > 0; e--)
    if (M.someProp(I, (i) => e > D.depth ? i(M, g, D.nodeAfter, D.before(e), t, !0) : i(M, g, D.node(e), D.before(e), t, !1)))
      return !0;
  return !1;
}
function eD(M, I, g) {
  M.focused || M.focus();
  let A = M.state.tr.setSelection(I);
  g == "pointer" && A.setMeta("pointer", !0), M.dispatch(A);
}
function lc(M, I) {
  if (I == -1)
    return !1;
  let g = M.state.doc.resolve(I), A = g.nodeAfter;
  return A && A.isAtom && CI.isSelectable(A) ? (eD(M, new CI(g), "pointer"), !0) : !1;
}
function yc(M, I) {
  if (I == -1)
    return !1;
  let g = M.state.selection, A, t;
  g instanceof CI && (A = g.node);
  let D = M.state.doc.resolve(I);
  for (let e = D.depth + 1; e > 0; e--) {
    let i = e > D.depth ? D.nodeAfter : D.node(e);
    if (CI.isSelectable(i)) {
      A && g.$from.depth > 0 && e >= g.$from.depth && D.before(g.$from.depth + 1) == g.$from.pos ? t = D.before(g.$from.depth) : t = D.before(e);
      break;
    }
  }
  return t != null ? (eD(M, CI.create(M.state.doc, t), "pointer"), !0) : !1;
}
function cc(M, I, g, A, t) {
  return cu(M, "handleClickOn", I, g, A) || M.someProp("handleClick", (D) => D(M, I, A)) || (t ? yc(M, g) : lc(M, g));
}
function xc(M, I, g, A) {
  return cu(M, "handleDoubleClickOn", I, g, A) || M.someProp("handleDoubleClick", (t) => t(M, I, A));
}
function rc(M, I, g, A) {
  return cu(M, "handleTripleClickOn", I, g, A) || M.someProp("handleTripleClick", (t) => t(M, I, A)) || wc(M, g, A);
}
function wc(M, I, g) {
  if (g.button != 0)
    return !1;
  let A = M.state.doc;
  if (I == -1)
    return A.inlineContent ? (eD(M, LI.create(A, 0, A.content.size), "pointer"), !0) : !1;
  let t = A.resolve(I);
  for (let D = t.depth + 1; D > 0; D--) {
    let e = D > t.depth ? t.nodeAfter : t.node(D), i = t.before(D);
    if (e.inlineContent)
      eD(M, LI.create(A, i + 1, i + 1 + e.content.size), "pointer");
    else if (CI.isSelectable(e))
      eD(M, CI.create(A, i), "pointer");
    else
      continue;
    return !0;
  }
}
function xu(M) {
  return IN(M);
}
const Q4 = tg ? "metaKey" : "ctrlKey";
hM.mousedown = (M, I) => {
  let g = I;
  M.input.shiftKey = g.shiftKey;
  let A = xu(M), t = Date.now(), D = "singleClick";
  t - M.input.lastClick.time < 500 && ac(g, M.input.lastClick) && !g[Q4] && (M.input.lastClick.type == "singleClick" ? D = "doubleClick" : M.input.lastClick.type == "doubleClick" && (D = "tripleClick")), M.input.lastClick = { time: t, x: g.clientX, y: g.clientY, type: D };
  let e = M.posAtCoords(VN(g));
  !e || (D == "singleClick" ? (M.input.mouseDown && M.input.mouseDown.done(), M.input.mouseDown = new Ec(M, e, g, !!A)) : (D == "doubleClick" ? xc : rc)(M, e.pos, e.inside, g) ? g.preventDefault() : wA(M, "pointer"));
};
class Ec {
  constructor(I, g, A, t) {
    this.view = I, this.pos = g, this.event = A, this.flushed = t, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = I.state.doc, this.selectNode = !!A[Q4], this.allowDefault = A.shiftKey;
    let D, e;
    if (g.inside > -1)
      D = I.state.doc.nodeAt(g.inside), e = g.inside;
    else {
      let u = I.state.doc.resolve(g.pos);
      D = u.parent, e = u.depth ? u.before() : 0;
    }
    const i = t ? null : A.target, N = i ? I.docView.nearestDesc(i, !0) : null;
    this.target = N ? N.dom : null;
    let { selection: C } = I.state;
    (A.button == 0 && D.type.spec.draggable && D.type.spec.selectable !== !1 || C instanceof CI && C.from <= e && C.to > e) && (this.mightDrag = {
      node: D,
      pos: e,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && dg && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), I.root.addEventListener("mouseup", this.up = this.up.bind(this)), I.root.addEventListener("mousemove", this.move = this.move.bind(this)), wA(I, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => gA(this.view)), this.view.input.mouseDown = null;
  }
  up(I) {
    if (this.done(), !this.view.dom.contains(I.target))
      return;
    let g = this.pos;
    this.view.state.doc != this.startDoc && (g = this.view.posAtCoords(VN(I))), this.updateAllowDefault(I), this.allowDefault || !g ? wA(this.view, "pointer") : cc(this.view, g.pos, g.inside, I, this.selectNode) ? I.preventDefault() : I.button == 0 && (this.flushed || BM && this.mightDrag && !this.mightDrag.node.isAtom || pM && !this.view.state.selection.visible && Math.min(Math.abs(g.pos - this.view.state.selection.from), Math.abs(g.pos - this.view.state.selection.to)) <= 2) ? (eD(this.view, uI.near(this.view.state.doc.resolve(g.pos)), "pointer"), I.preventDefault()) : wA(this.view, "pointer");
  }
  move(I) {
    this.updateAllowDefault(I), wA(this.view, "pointer"), I.buttons == 0 && this.done();
  }
  updateAllowDefault(I) {
    !this.allowDefault && (Math.abs(this.event.x - I.clientX) > 4 || Math.abs(this.event.y - I.clientY) > 4) && (this.allowDefault = !0);
  }
}
hM.touchstart = (M) => {
  M.input.lastTouch = Date.now(), xu(M), wA(M, "pointer");
};
hM.touchmove = (M) => {
  M.input.lastTouch = Date.now(), wA(M, "pointer");
};
hM.contextmenu = (M) => xu(M);
function h4(M, I) {
  return M.composing ? !0 : BM && Math.abs(I.timeStamp - M.input.compositionEndedAt) < 500 ? (M.input.compositionEndedAt = -2e8, !0) : !1;
}
const dc = Pg ? 5e3 : -1;
OM.compositionstart = OM.compositionupdate = (M) => {
  if (!M.composing) {
    M.domObserver.flush();
    let { state: I } = M, g = I.selection.$from;
    if (I.selection.empty && (I.storedMarks || !g.textOffset && g.parentOffset && g.nodeBefore.marks.some((A) => A.type.spec.inclusive === !1)))
      M.markCursor = M.state.storedMarks || g.marks(), IN(M, !0), M.markCursor = null;
    else if (IN(M), dg && I.selection.empty && g.parentOffset && !g.textOffset && g.nodeBefore.marks.length) {
      let A = M.domSelection();
      for (let t = A.focusNode, D = A.focusOffset; t && t.nodeType == 1 && D != 0; ) {
        let e = D < 0 ? t.lastChild : t.childNodes[D - 1];
        if (!e)
          break;
        if (e.nodeType == 3) {
          A.collapse(e, e.nodeValue.length);
          break;
        } else
          t = e, D = -1;
      }
    }
    M.input.composing = !0;
  }
  O4(M, dc);
};
OM.compositionend = (M, I) => {
  M.composing && (M.input.composing = !1, M.input.compositionEndedAt = I.timeStamp, O4(M, 20));
};
function O4(M, I) {
  clearTimeout(M.input.composingTimeout), I > -1 && (M.input.composingTimeout = setTimeout(() => IN(M), I));
}
function k4(M) {
  for (M.composing && (M.input.composing = !1, M.input.compositionEndedAt = zc()); M.input.compositionNodes.length > 0; )
    M.input.compositionNodes.pop().markParentsDirty();
}
function zc() {
  let M = document.createEvent("Event");
  return M.initEvent("event", !0, !0), M.timeStamp;
}
function IN(M, I = !1) {
  if (!(Pg && M.domObserver.flushingSoon >= 0)) {
    if (M.domObserver.forceFlush(), k4(M), I || M.docView && M.docView.dirty) {
      let g = au(M);
      return g && !g.eq(M.state.selection) ? M.dispatch(M.state.tr.setSelection(g)) : M.updateState(M.state), !0;
    }
    return !1;
  }
}
function mc(M, I) {
  if (!M.dom.parentNode)
    return;
  let g = M.dom.parentNode.appendChild(document.createElement("div"));
  g.appendChild(I), g.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let A = getSelection(), t = document.createRange();
  t.selectNodeContents(I), M.dom.blur(), A.removeAllRanges(), A.addRange(t), setTimeout(() => {
    g.parentNode && g.parentNode.removeChild(g), M.focus();
  }, 50);
}
const oD = WM && hA < 15 || LD && dy < 604;
hM.copy = OM.cut = (M, I) => {
  let g = I, A = M.state.selection, t = g.type == "cut";
  if (A.empty)
    return;
  let D = oD ? null : g.clipboardData, e = A.content(), { dom: i, text: N } = E4(M, e);
  D ? (g.preventDefault(), D.clearData(), D.setData("text/html", i.innerHTML), D.setData("text/plain", N)) : mc(M, i), t && M.dispatch(M.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function bc(M) {
  return M.openStart == 0 && M.openEnd == 0 && M.content.childCount == 1 ? M.content.firstChild : null;
}
function Yc(M, I) {
  if (!M.dom.parentNode)
    return;
  let g = M.input.shiftKey || M.state.selection.$from.parent.type.spec.code, A = M.dom.parentNode.appendChild(document.createElement(g ? "textarea" : "div"));
  g || (A.contentEditable = "true"), A.style.cssText = "position: fixed; left: -10000px; top: 10px", A.focus(), setTimeout(() => {
    M.focus(), A.parentNode && A.parentNode.removeChild(A), g ? E0(M, A.value, null, I) : E0(M, A.textContent, A.innerHTML, I);
  }, 50);
}
function E0(M, I, g, A) {
  let t = d4(M, I, g, M.input.shiftKey, M.state.selection.$from);
  if (M.someProp("handlePaste", (i) => i(M, A, t || K.empty)))
    return !0;
  if (!t)
    return !1;
  let D = bc(t), e = D ? M.state.tr.replaceSelectionWith(D, M.input.shiftKey) : M.state.tr.replaceSelection(t);
  return M.dispatch(e.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
OM.paste = (M, I) => {
  let g = I;
  if (M.composing && !Pg)
    return;
  let A = oD ? null : g.clipboardData;
  A && E0(M, A.getData("text/plain"), A.getData("text/html"), g) ? g.preventDefault() : Yc(M, g);
};
class pc {
  constructor(I, g) {
    this.slice = I, this.move = g;
  }
}
const P4 = tg ? "altKey" : "ctrlKey";
hM.dragstart = (M, I) => {
  let g = I, A = M.input.mouseDown;
  if (A && A.done(), !g.dataTransfer)
    return;
  let t = M.state.selection, D = t.empty ? null : M.posAtCoords(VN(g));
  if (!(D && D.pos >= t.from && D.pos <= (t instanceof CI ? t.to - 1 : t.to))) {
    if (A && A.mightDrag)
      M.dispatch(M.state.tr.setSelection(CI.create(M.state.doc, A.mightDrag.pos)));
    else if (g.target && g.target.nodeType == 1) {
      let C = M.docView.nearestDesc(g.target, !0);
      C && C.node.type.spec.draggable && C != M.docView && M.dispatch(M.state.tr.setSelection(CI.create(M.state.doc, C.posBefore)));
    }
  }
  let e = M.state.selection.content(), { dom: i, text: N } = E4(M, e);
  g.dataTransfer.clearData(), g.dataTransfer.setData(oD ? "Text" : "text/html", i.innerHTML), g.dataTransfer.effectAllowed = "copyMove", oD || g.dataTransfer.setData("text/plain", N), M.dragging = new pc(e, !g[P4]);
};
hM.dragend = (M) => {
  let I = M.dragging;
  window.setTimeout(() => {
    M.dragging == I && (M.dragging = null);
  }, 50);
};
OM.dragover = OM.dragenter = (M, I) => I.preventDefault();
OM.drop = (M, I) => {
  let g = I, A = M.dragging;
  if (M.dragging = null, !g.dataTransfer)
    return;
  let t = M.posAtCoords(VN(g));
  if (!t)
    return;
  let D = M.state.doc.resolve(t.pos), e = A && A.slice;
  e ? M.someProp("transformPasted", (o) => {
    e = o(e);
  }) : e = d4(M, g.dataTransfer.getData(oD ? "Text" : "text/plain"), oD ? null : g.dataTransfer.getData("text/html"), !1, D);
  let i = !!(A && !g[P4]);
  if (M.someProp("handleDrop", (o) => o(M, g, e || K.empty, i))) {
    g.preventDefault();
    return;
  }
  if (!e)
    return;
  g.preventDefault();
  let N = e ? M4(M.state.doc, D.pos, e) : D.pos;
  N == null && (N = D.pos);
  let C = M.state.tr;
  i && C.deleteSelection();
  let u = C.mapping.map(N), j = e.openStart == 0 && e.openEnd == 0 && e.content.childCount == 1, n = C.doc;
  if (j ? C.replaceRangeWith(u, u, e.content.firstChild) : C.replaceRange(u, u, e), C.doc.eq(n))
    return;
  let L = C.doc.resolve(u);
  if (j && CI.isSelectable(e.content.firstChild) && L.nodeAfter && L.nodeAfter.sameMarkup(e.content.firstChild))
    C.setSelection(new CI(L));
  else {
    let o = C.mapping.map(N);
    C.mapping.maps[C.mapping.maps.length - 1].forEach((T, s, S, y) => o = y), C.setSelection(lu(M, L, C.doc.resolve(o)));
  }
  M.focus(), M.dispatch(C.setMeta("uiEvent", "drop"));
};
hM.focus = (M) => {
  M.input.lastFocus = Date.now(), M.focused || (M.domObserver.stop(), M.dom.classList.add("ProseMirror-focused"), M.domObserver.start(), M.focused = !0, setTimeout(() => {
    M.docView && M.hasFocus() && !M.domObserver.currentSelection.eq(M.domSelection()) && gA(M);
  }, 20));
};
hM.blur = (M, I) => {
  let g = I;
  M.focused && (M.domObserver.stop(), M.dom.classList.remove("ProseMirror-focused"), M.domObserver.start(), g.relatedTarget && M.dom.contains(g.relatedTarget) && M.domObserver.currentSelection.clear(), M.focused = !1);
};
hM.beforeinput = (M, I) => {
  if (pM && Pg && I.inputType == "deleteContentBackward") {
    M.domObserver.flushSoon();
    let { domChangeCount: A } = M.input;
    setTimeout(() => {
      if (M.input.domChangeCount != A || (M.dom.blur(), M.focus(), M.someProp("handleKeyDown", (D) => D(M, Ht(8, "Backspace")))))
        return;
      let { $cursor: t } = M.state.selection;
      t && t.pos > 0 && M.dispatch(M.state.tr.delete(t.pos - 1, t.pos).scrollIntoView());
    }, 50);
  }
};
for (let M in OM)
  hM[M] = OM[M];
function xe(M, I) {
  if (M == I)
    return !0;
  for (let g in M)
    if (M[g] !== I[g])
      return !1;
  for (let g in I)
    if (!(g in M))
      return !1;
  return !0;
}
class ru {
  constructor(I, g) {
    this.toDOM = I, this.spec = g || Nt, this.side = this.spec.side || 0;
  }
  map(I, g, A, t) {
    let { pos: D, deleted: e } = I.mapResult(g.from + t, this.side < 0 ? -1 : 1);
    return e ? null : new zM(D - A, D - A, this);
  }
  valid() {
    return !0;
  }
  eq(I) {
    return this == I || I instanceof ru && (this.spec.key && this.spec.key == I.spec.key || this.toDOM == I.toDOM && xe(this.spec, I.spec));
  }
  destroy(I) {
    this.spec.destroy && this.spec.destroy(I);
  }
}
class OA {
  constructor(I, g) {
    this.attrs = I, this.spec = g || Nt;
  }
  map(I, g, A, t) {
    let D = I.map(g.from + t, this.spec.inclusiveStart ? -1 : 1) - A, e = I.map(g.to + t, this.spec.inclusiveEnd ? 1 : -1) - A;
    return D >= e ? null : new zM(D, e, this);
  }
  valid(I, g) {
    return g.from < g.to;
  }
  eq(I) {
    return this == I || I instanceof OA && xe(this.attrs, I.attrs) && xe(this.spec, I.spec);
  }
  static is(I) {
    return I.type instanceof OA;
  }
  destroy() {
  }
}
class wu {
  constructor(I, g) {
    this.attrs = I, this.spec = g || Nt;
  }
  map(I, g, A, t) {
    let D = I.mapResult(g.from + t, 1);
    if (D.deleted)
      return null;
    let e = I.mapResult(g.to + t, -1);
    return e.deleted || e.pos <= D.pos ? null : new zM(D.pos - A, e.pos - A, this);
  }
  valid(I, g) {
    let { index: A, offset: t } = I.content.findIndex(g.from), D;
    return t == g.from && !(D = I.child(A)).isText && t + D.nodeSize == g.to;
  }
  eq(I) {
    return this == I || I instanceof wu && xe(this.attrs, I.attrs) && xe(this.spec, I.spec);
  }
  destroy() {
  }
}
class zM {
  constructor(I, g, A) {
    this.from = I, this.to = g, this.type = A;
  }
  copy(I, g) {
    return new zM(I, g, this.type);
  }
  eq(I, g = 0) {
    return this.type.eq(I.type) && this.from + g == I.from && this.to + g == I.to;
  }
  map(I, g, A) {
    return this.type.map(I, this, g, A);
  }
  static widget(I, g, A) {
    return new zM(I, I, new ru(g, A));
  }
  static inline(I, g, A, t) {
    return new zM(I, g, new OA(A, t));
  }
  static node(I, g, A, t) {
    return new zM(I, g, new wu(A, t));
  }
  get spec() {
    return this.type.spec;
  }
  get inline() {
    return this.type instanceof OA;
  }
}
const vt = [], Nt = {};
class qI {
  constructor(I, g) {
    this.local = I.length ? I : vt, this.children = g.length ? g : vt;
  }
  static create(I, g) {
    return g.length ? MN(g, I, 0, Nt) : EM;
  }
  find(I, g, A) {
    let t = [];
    return this.findInner(I == null ? 0 : I, g == null ? 1e9 : g, t, 0, A), t;
  }
  findInner(I, g, A, t, D) {
    for (let e = 0; e < this.local.length; e++) {
      let i = this.local[e];
      i.from <= g && i.to >= I && (!D || D(i.spec)) && A.push(i.copy(i.from + t, i.to + t));
    }
    for (let e = 0; e < this.children.length; e += 3)
      if (this.children[e] < g && this.children[e + 1] > I) {
        let i = this.children[e] + 1;
        this.children[e + 2].findInner(I - i, g - i, A, t + i, D);
      }
  }
  map(I, g, A) {
    return this == EM || I.maps.length == 0 ? this : this.mapInner(I, g, 0, 0, A || Nt);
  }
  mapInner(I, g, A, t, D) {
    let e;
    for (let i = 0; i < this.local.length; i++) {
      let N = this.local[i].map(I, A, t);
      N && N.type.valid(g, N) ? (e || (e = [])).push(N) : D.onRemove && D.onRemove(this.local[i].spec);
    }
    return this.children.length ? Qc(this.children, e || [], I, g, A, t, D) : e ? new qI(e.sort(Ct), vt) : EM;
  }
  add(I, g) {
    return g.length ? this == EM ? qI.create(I, g) : this.addInner(I, g, 0) : this;
  }
  addInner(I, g, A) {
    let t, D = 0;
    I.forEach((i, N) => {
      let C = N + A, u;
      if (!!(u = G4(g, i, C))) {
        for (t || (t = this.children.slice()); D < t.length && t[D] < N; )
          D += 3;
        t[D] == N ? t[D + 2] = t[D + 2].addInner(i, u, C + 1) : t.splice(D, 0, N, N + i.nodeSize, MN(u, i, C + 1, Nt)), D += 3;
      }
    });
    let e = f4(D ? W4(g) : g, -A);
    for (let i = 0; i < e.length; i++)
      e[i].type.valid(I, e[i]) || e.splice(i--, 1);
    return new qI(e.length ? this.local.concat(e).sort(Ct) : this.local, t || this.children);
  }
  remove(I) {
    return I.length == 0 || this == EM ? this : this.removeInner(I, 0);
  }
  removeInner(I, g) {
    let A = this.children, t = this.local;
    for (let D = 0; D < A.length; D += 3) {
      let e, i = A[D] + g, N = A[D + 1] + g;
      for (let u = 0, j; u < I.length; u++)
        (j = I[u]) && j.from > i && j.to < N && (I[u] = null, (e || (e = [])).push(j));
      if (!e)
        continue;
      A == this.children && (A = this.children.slice());
      let C = A[D + 2].removeInner(e, i + 1);
      C != EM ? A[D + 2] = C : (A.splice(D, 3), D -= 3);
    }
    if (t.length) {
      for (let D = 0, e; D < I.length; D++)
        if (e = I[D])
          for (let i = 0; i < t.length; i++)
            t[i].eq(e, g) && (t == this.local && (t = this.local.slice()), t.splice(i--, 1));
    }
    return A == this.children && t == this.local ? this : t.length || A.length ? new qI(t, A) : EM;
  }
  forChild(I, g) {
    if (this == EM)
      return this;
    if (g.isLeaf)
      return qI.empty;
    let A, t;
    for (let i = 0; i < this.children.length; i += 3)
      if (this.children[i] >= I) {
        this.children[i] == I && (A = this.children[i + 2]);
        break;
      }
    let D = I + 1, e = D + g.content.size;
    for (let i = 0; i < this.local.length; i++) {
      let N = this.local[i];
      if (N.from < e && N.to > D && N.type instanceof OA) {
        let C = Math.max(D, N.from) - D, u = Math.min(e, N.to) - D;
        C < u && (t || (t = [])).push(N.copy(C, u));
      }
    }
    if (t) {
      let i = new qI(t.sort(Ct), vt);
      return A ? new yA([i, A]) : i;
    }
    return A || EM;
  }
  eq(I) {
    if (this == I)
      return !0;
    if (!(I instanceof qI) || this.local.length != I.local.length || this.children.length != I.children.length)
      return !1;
    for (let g = 0; g < this.local.length; g++)
      if (!this.local[g].eq(I.local[g]))
        return !1;
    for (let g = 0; g < this.children.length; g += 3)
      if (this.children[g] != I.children[g] || this.children[g + 1] != I.children[g + 1] || !this.children[g + 2].eq(I.children[g + 2]))
        return !1;
    return !0;
  }
  locals(I) {
    return Eu(this.localsInner(I));
  }
  localsInner(I) {
    if (this == EM)
      return vt;
    if (I.inlineContent || !this.local.some(OA.is))
      return this.local;
    let g = [];
    for (let A = 0; A < this.local.length; A++)
      this.local[A].type instanceof OA || g.push(this.local[A]);
    return g;
  }
}
qI.empty = new qI([], []);
qI.removeOverlap = Eu;
const EM = qI.empty;
class yA {
  constructor(I) {
    this.members = I;
  }
  map(I, g) {
    const A = this.members.map((t) => t.map(I, g, Nt));
    return yA.from(A);
  }
  forChild(I, g) {
    if (g.isLeaf)
      return qI.empty;
    let A = [];
    for (let t = 0; t < this.members.length; t++) {
      let D = this.members[t].forChild(I, g);
      D != EM && (D instanceof yA ? A = A.concat(D.members) : A.push(D));
    }
    return yA.from(A);
  }
  eq(I) {
    if (!(I instanceof yA) || I.members.length != this.members.length)
      return !1;
    for (let g = 0; g < this.members.length; g++)
      if (!this.members[g].eq(I.members[g]))
        return !1;
    return !0;
  }
  locals(I) {
    let g, A = !0;
    for (let t = 0; t < this.members.length; t++) {
      let D = this.members[t].localsInner(I);
      if (!!D.length)
        if (!g)
          g = D;
        else {
          A && (g = g.slice(), A = !1);
          for (let e = 0; e < D.length; e++)
            g.push(D[e]);
        }
    }
    return g ? Eu(A ? g : g.sort(Ct)) : vt;
  }
  static from(I) {
    switch (I.length) {
      case 0:
        return EM;
      case 1:
        return I[0];
      default:
        return new yA(I);
    }
  }
}
function Qc(M, I, g, A, t, D, e) {
  let i = M.slice();
  for (let C = 0, u = D; C < g.maps.length; C++) {
    let j = 0;
    g.maps[C].forEach((n, L, o, T) => {
      let s = T - o - (L - n);
      for (let S = 0; S < i.length; S += 3) {
        let y = i[S + 1];
        if (y < 0 || n > y + u - j)
          continue;
        let x = i[S] + u - j;
        L >= x ? i[S + 1] = n <= x ? -2 : -1 : o >= t && s && (i[S] += s, i[S + 1] += s);
      }
      j += s;
    }), u = g.maps[C].map(u, -1);
  }
  let N = !1;
  for (let C = 0; C < i.length; C += 3)
    if (i[C + 1] < 0) {
      if (i[C + 1] == -2) {
        N = !0, i[C + 1] = -1;
        continue;
      }
      let u = g.map(M[C] + D), j = u - t;
      if (j < 0 || j >= A.content.size) {
        N = !0;
        continue;
      }
      let n = g.map(M[C + 1] + D, -1), L = n - t, { index: o, offset: T } = A.content.findIndex(j), s = A.maybeChild(o);
      if (s && T == j && T + s.nodeSize == L) {
        let S = i[C + 2].mapInner(g, s, u + 1, M[C] + D + 1, e);
        S != EM ? (i[C] = j, i[C + 1] = L, i[C + 2] = S) : (i[C + 1] = -2, N = !0);
      } else
        N = !0;
    }
  if (N) {
    let C = hc(i, M, I, g, t, D, e), u = MN(C, A, 0, e);
    I = u.local;
    for (let j = 0; j < i.length; j += 3)
      i[j + 1] < 0 && (i.splice(j, 3), j -= 3);
    for (let j = 0, n = 0; j < u.children.length; j += 3) {
      let L = u.children[j];
      for (; n < i.length && i[n] < L; )
        n += 3;
      i.splice(n, 0, u.children[j], u.children[j + 1], u.children[j + 2]);
    }
  }
  return new qI(I.sort(Ct), i);
}
function f4(M, I) {
  if (!I || !M.length)
    return M;
  let g = [];
  for (let A = 0; A < M.length; A++) {
    let t = M[A];
    g.push(new zM(t.from + I, t.to + I, t.type));
  }
  return g;
}
function hc(M, I, g, A, t, D, e) {
  function i(N, C) {
    for (let u = 0; u < N.local.length; u++) {
      let j = N.local[u].map(A, t, C);
      j ? g.push(j) : e.onRemove && e.onRemove(N.local[u].spec);
    }
    for (let u = 0; u < N.children.length; u += 3)
      i(N.children[u + 2], N.children[u] + C + 1);
  }
  for (let N = 0; N < M.length; N += 3)
    M[N + 1] == -1 && i(M[N + 2], I[N] + D + 1);
  return g;
}
function G4(M, I, g) {
  if (I.isLeaf)
    return null;
  let A = g + I.nodeSize, t = null;
  for (let D = 0, e; D < M.length; D++)
    (e = M[D]) && e.from > g && e.to < A && ((t || (t = [])).push(e), M[D] = null);
  return t;
}
function W4(M) {
  let I = [];
  for (let g = 0; g < M.length; g++)
    M[g] != null && I.push(M[g]);
  return I;
}
function MN(M, I, g, A) {
  let t = [], D = !1;
  I.forEach((i, N) => {
    let C = G4(M, i, N + g);
    if (C) {
      D = !0;
      let u = MN(C, i, g + N + 1, A);
      u != EM && t.push(N, N + i.nodeSize, u);
    }
  });
  let e = f4(D ? W4(M) : M, -g).sort(Ct);
  for (let i = 0; i < e.length; i++)
    e[i].type.valid(I, e[i]) || (A.onRemove && A.onRemove(e[i].spec), e.splice(i--, 1));
  return e.length || t.length ? new qI(e, t) : EM;
}
function Ct(M, I) {
  return M.from - I.from || M.to - I.to;
}
function Eu(M) {
  let I = M;
  for (let g = 0; g < I.length - 1; g++) {
    let A = I[g];
    if (A.from != A.to)
      for (let t = g + 1; t < I.length; t++) {
        let D = I[t];
        if (D.from == A.from) {
          D.to != A.to && (I == M && (I = M.slice()), I[t] = D.copy(D.from, A.to), Yn(I, t + 1, D.copy(A.to, D.to)));
          continue;
        } else {
          D.from < A.to && (I == M && (I = M.slice()), I[g] = A.copy(A.from, D.from), Yn(I, t, A.copy(D.from, A.to)));
          break;
        }
      }
  }
  return I;
}
function Yn(M, I, g) {
  for (; I < M.length && Ct(g, M[I]) > 0; )
    I++;
  M.splice(I, 0, g);
}
function PC(M) {
  let I = [];
  return M.someProp("decorations", (g) => {
    let A = g(M.state);
    A && A != EM && I.push(A);
  }), M.cursorWrapper && I.push(qI.create(M.state.doc, [M.cursorWrapper.deco])), yA.from(I);
}
const Oc = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, kc = WM && hA <= 11;
class Pc {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(I) {
    this.anchorNode = I.anchorNode, this.anchorOffset = I.anchorOffset, this.focusNode = I.focusNode, this.focusOffset = I.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(I) {
    return I.anchorNode == this.anchorNode && I.anchorOffset == this.anchorOffset && I.focusNode == this.focusNode && I.focusOffset == this.focusOffset;
  }
}
class fc {
  constructor(I, g) {
    this.view = I, this.handleDOMChange = g, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new Pc(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.observer = window.MutationObserver && new window.MutationObserver((A) => {
      for (let t = 0; t < A.length; t++)
        this.queue.push(A[t]);
      WM && hA <= 11 && A.some((t) => t.type == "childList" && t.removedNodes.length || t.type == "characterData" && t.oldValue.length > t.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), kc && (this.onCharData = (A) => {
      this.queue.push({ target: A.target, type: "characterData", oldValue: A.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Oc)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let I = this.observer.takeRecords();
      if (I.length) {
        for (let g = 0; g < I.length; g++)
          this.queue.push(I[g]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (!!rn(this.view)) {
      if (this.suppressingSelectionUpdates)
        return gA(this.view);
      if (WM && hA <= 11 && !this.view.state.selection.empty) {
        let I = this.view.domSelection();
        if (I.focusNode && ce(I.focusNode, I.focusOffset, I.anchorNode, I.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelection());
  }
  ignoreSelectionChange(I) {
    if (I.rangeCount == 0)
      return !0;
    let g = I.getRangeAt(0).commonAncestorContainer, A = this.view.docView.nearestDesc(g);
    if (A && A.ignoreMutation({
      type: "selection",
      target: g.nodeType == 3 ? g.parentNode : g
    }))
      return this.setCurSelection(), !0;
  }
  flush() {
    let { view: I } = this;
    if (!I.docView || this.flushingSoon > -1)
      return;
    let g = this.observer ? this.observer.takeRecords() : [];
    this.queue.length && (g = this.queue.concat(g), this.queue.length = 0);
    let A = I.domSelection(), t = !this.suppressingSelectionUpdates && !this.currentSelection.eq(A) && rn(I) && !this.ignoreSelectionChange(A), D = -1, e = -1, i = !1, N = [];
    if (I.editable)
      for (let u = 0; u < g.length; u++) {
        let j = this.registerMutation(g[u], N);
        j && (D = D < 0 ? j.from : Math.min(j.from, D), e = e < 0 ? j.to : Math.max(j.to, e), j.typeOver && (i = !0));
      }
    if (dg && N.length > 1) {
      let u = N.filter((j) => j.nodeName == "BR");
      if (u.length == 2) {
        let j = u[0], n = u[1];
        j.parentNode && j.parentNode.parentNode == n.parentNode ? n.remove() : j.remove();
      }
    }
    let C = null;
    D < 0 && t && I.input.lastFocus > Date.now() - 200 && I.input.lastTouch < Date.now() - 300 && RN(A) && (C = au(I)) && C.eq(uI.near(I.state.doc.resolve(0), 1)) ? (I.input.lastFocus = 0, gA(I), this.currentSelection.set(A), I.scrollToSelection()) : (D > -1 || t) && (D > -1 && (I.docView.markDirty(D, e), Gc(I)), this.handleDOMChange(D, e, i, N), I.docView && I.docView.dirty ? I.updateState(I.state) : this.currentSelection.eq(A) || gA(I), this.currentSelection.set(A));
  }
  registerMutation(I, g) {
    if (g.indexOf(I.target) > -1)
      return null;
    let A = this.view.docView.nearestDesc(I.target);
    if (I.type == "attributes" && (A == this.view.docView || I.attributeName == "contenteditable" || I.attributeName == "style" && !I.oldValue && !I.target.getAttribute("style")) || !A || A.ignoreMutation(I))
      return null;
    if (I.type == "childList") {
      for (let u = 0; u < I.addedNodes.length; u++)
        g.push(I.addedNodes[u]);
      if (A.contentDOM && A.contentDOM != A.dom && !A.contentDOM.contains(I.target))
        return { from: A.posBefore, to: A.posAfter };
      let t = I.previousSibling, D = I.nextSibling;
      if (WM && hA <= 11 && I.addedNodes.length)
        for (let u = 0; u < I.addedNodes.length; u++) {
          let { previousSibling: j, nextSibling: n } = I.addedNodes[u];
          (!j || Array.prototype.indexOf.call(I.addedNodes, j) < 0) && (t = j), (!n || Array.prototype.indexOf.call(I.addedNodes, n) < 0) && (D = n);
        }
      let e = t && t.parentNode == I.target ? XM(t) + 1 : 0, i = A.localPosFromDOM(I.target, e, -1), N = D && D.parentNode == I.target ? XM(D) : I.target.childNodes.length, C = A.localPosFromDOM(I.target, N, 1);
      return { from: i, to: C };
    } else
      return I.type == "attributes" ? { from: A.posAtStart - A.border, to: A.posAtEnd + A.border } : {
        from: A.posAtStart,
        to: A.posAtEnd,
        typeOver: I.target.nodeValue == I.oldValue
      };
  }
}
let pn = /* @__PURE__ */ new WeakMap(), Qn = !1;
function Gc(M) {
  if (!pn.has(M) && (pn.set(M, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(M.dom).whiteSpace) !== -1)) {
    if (M.requiresGeckoHackNode = dg, Qn)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), Qn = !0;
  }
}
function Wc(M, I, g) {
  let { node: A, fromOffset: t, toOffset: D, from: e, to: i } = M.docView.parseRange(I, g), N = M.domSelection(), C, u = N.anchorNode;
  if (u && M.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (C = [{ node: u, offset: N.anchorOffset }], RN(N) || C.push({ node: N.focusNode, offset: N.focusOffset })), pM && M.input.lastKeyCode === 8)
    for (let s = D; s > t; s--) {
      let S = A.childNodes[s - 1], y = S.pmViewDesc;
      if (S.nodeName == "BR" && !y) {
        D = s;
        break;
      }
      if (!y || y.size)
        break;
    }
  let j = M.state.doc, n = M.someProp("domParser") || uD.fromSchema(M.state.schema), L = j.resolve(e), o = null, T = n.parse(A, {
    topNode: L.parent,
    topMatch: L.parent.contentMatchAt(L.index()),
    topOpen: !0,
    from: t,
    to: D,
    preserveWhitespace: L.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: C,
    ruleFromNode: Zc,
    context: L
  });
  if (C && C[0].pos != null) {
    let s = C[0].pos, S = C[1] && C[1].pos;
    S == null && (S = s), o = { anchor: s + e, head: S + e };
  }
  return { doc: T, sel: o, from: e, to: i };
}
function Zc(M) {
  let I = M.pmViewDesc;
  if (I)
    return I.parseRule();
  if (M.nodeName == "BR" && M.parentNode) {
    if (BM && /^(ul|ol)$/i.test(M.parentNode.nodeName)) {
      let g = document.createElement("div");
      return g.appendChild(document.createElement("li")), { skip: g };
    } else if (M.parentNode.lastChild == M || BM && /^(tr|table)$/i.test(M.parentNode.nodeName))
      return { ignore: !0 };
  } else if (M.nodeName == "IMG" && M.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
function vc(M, I, g, A, t) {
  if (I < 0) {
    let m = M.input.lastSelectionTime > Date.now() - 50 ? M.input.lastSelectionOrigin : null, p = au(M, m);
    if (p && !M.state.selection.eq(p)) {
      let V = M.state.tr.setSelection(p);
      m == "pointer" ? V.setMeta("pointer", !0) : m == "key" && V.scrollIntoView(), M.dispatch(V);
    }
    return;
  }
  let D = M.state.doc.resolve(I), e = D.sharedDepth(g);
  I = D.before(e + 1), g = M.state.doc.resolve(g).after(e + 1);
  let i = M.state.selection, N = Wc(M, I, g), C = M.state.doc, u = C.slice(N.from, N.to), j, n;
  M.input.lastKeyCode === 8 && Date.now() - 100 < M.input.lastKeyCodeTime ? (j = M.state.selection.to, n = "end") : (j = M.state.selection.from, n = "start"), M.input.lastKeyCode = null;
  let L = Bc(u.content, N.doc.content, N.from, j, n);
  if ((LD && M.input.lastIOSEnter > Date.now() - 225 || Pg) && t.some((m) => m.nodeName == "DIV" || m.nodeName == "P") && (!L || L.endA >= L.endB) && M.someProp("handleKeyDown", (m) => m(M, Ht(13, "Enter")))) {
    M.input.lastIOSEnter = 0;
    return;
  }
  if (!L)
    if (A && i instanceof LI && !i.empty && i.$head.sameParent(i.$anchor) && !M.composing && !(N.sel && N.sel.anchor != N.sel.head))
      L = { start: i.from, endA: i.to, endB: i.to };
    else {
      if (N.sel) {
        let m = hn(M, M.state.doc, N.sel);
        m && !m.eq(M.state.selection) && M.dispatch(M.state.tr.setSelection(m));
      }
      return;
    }
  if (pM && M.cursorWrapper && N.sel && N.sel.anchor == M.cursorWrapper.deco.from && N.sel.head == N.sel.anchor) {
    let m = L.endB - L.start;
    N.sel = { anchor: N.sel.anchor + m, head: N.sel.anchor + m };
  }
  M.input.domChangeCount++, M.state.selection.from < M.state.selection.to && L.start == L.endB && M.state.selection instanceof LI && (L.start > M.state.selection.from && L.start <= M.state.selection.from + 2 && M.state.selection.from >= N.from ? L.start = M.state.selection.from : L.endA < M.state.selection.to && L.endA >= M.state.selection.to - 2 && M.state.selection.to <= N.to && (L.endB += M.state.selection.to - L.endA, L.endA = M.state.selection.to)), WM && hA <= 11 && L.endB == L.start + 1 && L.endA == L.start && L.start > N.from && N.doc.textBetween(L.start - N.from - 1, L.start - N.from + 1) == " \xA0" && (L.start--, L.endA--, L.endB--);
  let o = N.doc.resolveNoCache(L.start - N.from), T = N.doc.resolveNoCache(L.endB - N.from), s = C.resolve(L.start), S = o.sameParent(T) && o.parent.inlineContent && s.end() >= L.endA, y;
  if ((LD && M.input.lastIOSEnter > Date.now() - 225 && (!S || t.some((m) => m.nodeName == "DIV" || m.nodeName == "P")) || !S && o.pos < N.doc.content.size && (y = uI.findFrom(N.doc.resolve(o.pos + 1), 1, !0)) && y.head == T.pos) && M.someProp("handleKeyDown", (m) => m(M, Ht(13, "Enter")))) {
    M.input.lastIOSEnter = 0;
    return;
  }
  if (M.state.selection.anchor > L.start && Jc(C, L.start, L.endA, o, T) && M.someProp("handleKeyDown", (m) => m(M, Ht(8, "Backspace")))) {
    Pg && pM && M.domObserver.suppressSelectionUpdates();
    return;
  }
  pM && Pg && L.endB == L.start && (M.input.lastAndroidDelete = Date.now()), Pg && !S && o.start() != T.start() && T.parentOffset == 0 && o.depth == T.depth && N.sel && N.sel.anchor == N.sel.head && N.sel.head == L.endA && (L.endB -= 2, T = N.doc.resolveNoCache(L.endB - N.from), setTimeout(() => {
    M.someProp("handleKeyDown", function(m) {
      return m(M, Ht(13, "Enter"));
    });
  }, 20));
  let x = L.start, a = L.endA, z, c, E;
  if (S) {
    if (o.pos == T.pos)
      WM && hA <= 11 && o.parentOffset == 0 && (M.domObserver.suppressSelectionUpdates(), setTimeout(() => gA(M), 20)), z = M.state.tr.delete(x, a), c = C.resolve(L.start).marksAcross(C.resolve(L.endA));
    else if (L.endA == L.endB && (E = Uc(o.parent.content.cut(o.parentOffset, T.parentOffset), s.parent.content.cut(s.parentOffset, L.endA - s.start()))))
      z = M.state.tr, E.type == "add" ? z.addMark(x, a, E.mark) : z.removeMark(x, a, E.mark);
    else if (o.parent.child(o.index()).isText && o.index() == T.index() - (T.textOffset ? 0 : 1)) {
      let m = o.parent.textBetween(o.parentOffset, T.parentOffset);
      if (M.someProp("handleTextInput", (p) => p(M, x, a, m)))
        return;
      z = M.state.tr.insertText(m, x, a);
    }
  }
  if (z || (z = M.state.tr.replace(x, a, N.doc.slice(L.start - N.from, L.endB - N.from))), N.sel) {
    let m = hn(M, z.doc, N.sel);
    m && !(pM && Pg && M.composing && m.empty && (L.start != L.endB || M.input.lastAndroidDelete < Date.now() - 100) && (m.head == x || m.head == z.mapping.map(a) - 1) || WM && m.empty && m.head == x) && z.setSelection(m);
  }
  c && z.ensureMarks(c), M.dispatch(z.scrollIntoView());
}
function hn(M, I, g) {
  return Math.max(g.anchor, g.head) > I.content.size ? null : lu(M, I.resolve(g.anchor), I.resolve(g.head));
}
function Uc(M, I) {
  let g = M.firstChild.marks, A = I.firstChild.marks, t = g, D = A, e, i, N;
  for (let u = 0; u < A.length; u++)
    t = A[u].removeFromSet(t);
  for (let u = 0; u < g.length; u++)
    D = g[u].removeFromSet(D);
  if (t.length == 1 && D.length == 0)
    i = t[0], e = "add", N = (u) => u.mark(i.addToSet(u.marks));
  else if (t.length == 0 && D.length == 1)
    i = D[0], e = "remove", N = (u) => u.mark(i.removeFromSet(u.marks));
  else
    return null;
  let C = [];
  for (let u = 0; u < I.childCount; u++)
    C.push(N(I.child(u)));
  if (G.from(C).eq(M))
    return { mark: i, type: e };
}
function Jc(M, I, g, A, t) {
  if (!A.parent.isTextblock || g - I <= t.pos - A.pos || fC(A, !0, !1) < t.pos)
    return !1;
  let D = M.resolve(I);
  if (D.parentOffset < D.parent.content.size || !D.parent.isTextblock)
    return !1;
  let e = M.resolve(fC(D, !0, !0));
  return !e.parent.isTextblock || e.pos > g || fC(e, !0, !1) < g ? !1 : A.parent.content.cut(A.parentOffset).eq(e.parent.content);
}
function fC(M, I, g) {
  let A = M.depth, t = I ? M.end() : M.pos;
  for (; A > 0 && (I || M.indexAfter(A) == M.node(A).childCount); )
    A--, t++, I = !1;
  if (g) {
    let D = M.node(A).maybeChild(M.indexAfter(A));
    for (; D && !D.isLeaf; )
      D = D.firstChild, t++;
  }
  return t;
}
function Bc(M, I, g, A, t) {
  let D = M.findDiffStart(I, g);
  if (D == null)
    return null;
  let { a: e, b: i } = M.findDiffEnd(I, g + M.size, g + I.size);
  if (t == "end") {
    let N = Math.max(0, D - Math.min(e, i));
    A -= e + N - D;
  }
  return e < D && M.size < I.size ? (D -= A <= D && A >= e ? D - A : 0, i = D + (i - e), e = D) : i < D && (D -= A <= D && A >= i ? D - A : 0, e = D + (e - i), i = D), { start: D, endA: e, endB: i };
}
class Rc {
  constructor(I, g) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Lc(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = g, this.state = g.state, this.directPlugins = g.plugins || [], this.directPlugins.forEach(Gn), this.dispatch = this.dispatch.bind(this), this.dom = I && I.mount || document.createElement("div"), I && (I.appendChild ? I.appendChild(this.dom) : typeof I == "function" ? I(this.dom) : I.mount && (this.mounted = !0)), this.editable = Pn(this), kn(this), this.nodeViews = fn(this), this.docView = Sn(this.state.doc, On(this), PC(this), this.dom, this), this.domObserver = new fc(this, (A, t, D, e) => vc(this, A, t, D, e)), this.domObserver.start(), oc(this), this.updatePluginViews();
  }
  get composing() {
    return this.input.composing;
  }
  get props() {
    if (this._props.state != this.state) {
      let I = this._props;
      this._props = {};
      for (let g in I)
        this._props[g] = I[g];
      this._props.state = this.state;
    }
    return this._props;
  }
  update(I) {
    I.handleDOMEvents != this._props.handleDOMEvents && w0(this);
    let g = this._props;
    this._props = I, I.plugins && (I.plugins.forEach(Gn), this.directPlugins = I.plugins), this.updateStateInner(I.state, g);
  }
  setProps(I) {
    let g = {};
    for (let A in this._props)
      g[A] = this._props[A];
    g.state = this.state;
    for (let A in I)
      g[A] = I[A];
    this.update(g);
  }
  updateState(I) {
    this.updateStateInner(I, this._props);
  }
  updateStateInner(I, g) {
    let A = this.state, t = !1, D = !1;
    I.storedMarks && this.composing && (k4(this), D = !0), this.state = I;
    let e = A.plugins != I.plugins || this._props.plugins != g.plugins;
    if (e || this._props.plugins != g.plugins || this._props.nodeViews != g.nodeViews) {
      let n = fn(this);
      Vc(n, this.nodeViews) && (this.nodeViews = n, t = !0);
    }
    (e || g.handleDOMEvents != this._props.handleDOMEvents) && w0(this), this.editable = Pn(this), kn(this);
    let i = PC(this), N = On(this), C = A.plugins != I.plugins && !A.doc.eq(I.doc) ? "reset" : I.scrollToSelection > A.scrollToSelection ? "to selection" : "preserve", u = t || !this.docView.matchesNode(I.doc, N, i);
    (u || !I.selection.eq(A.selection)) && (D = !0);
    let j = C == "preserve" && D && this.dom.style.overflowAnchor == null && Qy(this);
    if (D) {
      this.domObserver.stop();
      let n = u && (WM || pM) && !this.composing && !A.selection.empty && !I.selection.empty && Hc(A.selection, I.selection);
      if (u) {
        let L = pM ? this.trackWrites = this.domSelection().focusNode : null;
        (t || !this.docView.update(I.doc, N, i, this)) && (this.docView.updateOuterDeco([]), this.docView.destroy(), this.docView = Sn(I.doc, N, i, this.dom, this)), L && !this.trackWrites && (n = !0);
      }
      n || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelection()) && Ac(this)) ? gA(this, n) : (x4(this, I.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(A), C == "reset" ? this.dom.scrollTop = 0 : C == "to selection" ? this.scrollToSelection() : j && hy(j);
  }
  scrollToSelection() {
    let I = this.domSelection().focusNode;
    if (!this.someProp("handleScrollToSelection", (g) => g(this)))
      if (this.state.selection instanceof CI) {
        let g = this.docView.domAfterPos(this.state.selection.from);
        g.nodeType == 1 && nn(this, g.getBoundingClientRect(), I);
      } else
        nn(this, this.coordsAtPos(this.state.selection.head, 1), I);
  }
  destroyPluginViews() {
    let I;
    for (; I = this.pluginViews.pop(); )
      I.destroy && I.destroy();
  }
  updatePluginViews(I) {
    if (!I || I.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let g = 0; g < this.directPlugins.length; g++) {
        let A = this.directPlugins[g];
        A.spec.view && this.pluginViews.push(A.spec.view(this));
      }
      for (let g = 0; g < this.state.plugins.length; g++) {
        let A = this.state.plugins[g];
        A.spec.view && this.pluginViews.push(A.spec.view(this));
      }
    } else
      for (let g = 0; g < this.pluginViews.length; g++) {
        let A = this.pluginViews[g];
        A.update && A.update(this, I);
      }
  }
  someProp(I, g) {
    let A = this._props && this._props[I], t;
    if (A != null && (t = g ? g(A) : A))
      return t;
    for (let e = 0; e < this.directPlugins.length; e++) {
      let i = this.directPlugins[e].props[I];
      if (i != null && (t = g ? g(i) : i))
        return t;
    }
    let D = this.state.plugins;
    if (D)
      for (let e = 0; e < D.length; e++) {
        let i = D[e].props[I];
        if (i != null && (t = g ? g(i) : i))
          return t;
      }
  }
  hasFocus() {
    if (WM) {
      let I = this.root.activeElement;
      if (I == this.dom)
        return !0;
      if (!I || !this.dom.contains(I))
        return !1;
      for (; I && this.dom != I && this.dom.contains(I); ) {
        if (I.contentEditable == "false")
          return !1;
        I = I.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  focus() {
    this.domObserver.stop(), this.editable && Oy(this.dom), gA(this), this.domObserver.start();
  }
  get root() {
    let I = this._root;
    if (I == null) {
      for (let g = this.dom.parentNode; g; g = g.parentNode)
        if (g.nodeType == 9 || g.nodeType == 11 && g.host)
          return g.getSelection || (Object.getPrototypeOf(g).getSelection = () => g.ownerDocument.getSelection()), this._root = g;
    }
    return I || document;
  }
  posAtCoords(I) {
    return Wy(this, I);
  }
  coordsAtPos(I, g = 1) {
    return o4(this, I, g);
  }
  domAtPos(I, g = 0) {
    return this.docView.domFromPos(I, g);
  }
  nodeDOM(I) {
    let g = this.docView.descAt(I);
    return g ? g.nodeDOM : null;
  }
  posAtDOM(I, g, A = -1) {
    let t = this.docView.posFromDOM(I, g, A);
    if (t == null)
      throw new RangeError("DOM position not inside the editor");
    return t;
  }
  endOfTextblock(I, g) {
    return By(this, g || this.state, I);
  }
  destroy() {
    !this.docView || (Tc(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], PC(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null);
  }
  get isDestroyed() {
    return this.docView == null;
  }
  dispatchEvent(I) {
    return Sc(this, I);
  }
  dispatch(I) {
    let g = this._props.dispatchTransaction;
    g ? g.call(this, I) : this.updateState(this.state.apply(I));
  }
  domSelection() {
    return this.root.getSelection();
  }
}
function On(M) {
  let I = /* @__PURE__ */ Object.create(null);
  return I.class = "ProseMirror", I.contenteditable = String(M.editable), I.translate = "no", M.someProp("attributes", (g) => {
    if (typeof g == "function" && (g = g(M.state)), g)
      for (let A in g)
        A == "class" && (I.class += " " + g[A]), A == "style" ? I.style = (I.style ? I.style + ";" : "") + g[A] : !I[A] && A != "contenteditable" && A != "nodeName" && (I[A] = String(g[A]));
  }), [zM.node(0, M.state.doc.content.size, I)];
}
function kn(M) {
  if (M.markCursor) {
    let I = document.createElement("img");
    I.className = "ProseMirror-separator", I.setAttribute("mark-placeholder", "true"), I.setAttribute("alt", ""), M.cursorWrapper = { dom: I, deco: zM.widget(M.state.selection.head, I, { raw: !0, marks: M.markCursor }) };
  } else
    M.cursorWrapper = null;
}
function Pn(M) {
  return !M.someProp("editable", (I) => I(M.state) === !1);
}
function Hc(M, I) {
  let g = Math.min(M.$anchor.sharedDepth(M.head), I.$anchor.sharedDepth(I.head));
  return M.$anchor.start(g) != I.$anchor.start(g);
}
function fn(M) {
  let I = /* @__PURE__ */ Object.create(null);
  function g(A) {
    for (let t in A)
      Object.prototype.hasOwnProperty.call(I, t) || (I[t] = A[t]);
  }
  return M.someProp("nodeViews", g), M.someProp("markViews", g), I;
}
function Vc(M, I) {
  let g = 0, A = 0;
  for (let t in M) {
    if (M[t] != I[t])
      return !0;
    g++;
  }
  for (let t in I)
    A++;
  return g != A;
}
function Gn(M) {
  if (M.spec.state || M.spec.filterTransaction || M.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var fA = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, gN = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, Wn = typeof navigator < "u" && /Chrome\/(\d+)/.exec(navigator.userAgent);
typeof navigator < "u" && /Gecko\/\d+/.test(navigator.userAgent);
var Fc = typeof navigator < "u" && /Mac/.test(navigator.platform), Xc = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), Kc = Fc || Wn && +Wn[1] < 57;
for (var yM = 0; yM < 10; yM++)
  fA[48 + yM] = fA[96 + yM] = String(yM);
for (var yM = 1; yM <= 24; yM++)
  fA[yM + 111] = "F" + yM;
for (var yM = 65; yM <= 90; yM++)
  fA[yM] = String.fromCharCode(yM + 32), gN[yM] = String.fromCharCode(yM);
for (var GC in fA)
  gN.hasOwnProperty(GC) || (gN[GC] = fA[GC]);
function _c(M) {
  var I = Kc && (M.ctrlKey || M.altKey || M.metaKey) || Xc && M.shiftKey && M.key && M.key.length == 1 || M.key == "Unidentified", g = !I && M.key || (M.shiftKey ? gN : fA)[M.keyCode] || M.key || "Unidentified";
  return g == "Esc" && (g = "Escape"), g == "Del" && (g = "Delete"), g == "Left" && (g = "ArrowLeft"), g == "Up" && (g = "ArrowUp"), g == "Right" && (g = "ArrowRight"), g == "Down" && (g = "ArrowDown"), g;
}
const $c = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function qc(M) {
  let I = M.split(/-(?!$)/), g = I[I.length - 1];
  g == "Space" && (g = " ");
  let A, t, D, e;
  for (let i = 0; i < I.length - 1; i++) {
    let N = I[i];
    if (/^(cmd|meta|m)$/i.test(N))
      e = !0;
    else if (/^a(lt)?$/i.test(N))
      A = !0;
    else if (/^(c|ctrl|control)$/i.test(N))
      t = !0;
    else if (/^s(hift)?$/i.test(N))
      D = !0;
    else if (/^mod$/i.test(N))
      $c ? e = !0 : t = !0;
    else
      throw new Error("Unrecognized modifier name: " + N);
  }
  return A && (g = "Alt-" + g), t && (g = "Ctrl-" + g), e && (g = "Meta-" + g), D && (g = "Shift-" + g), g;
}
function Ix(M) {
  let I = /* @__PURE__ */ Object.create(null);
  for (let g in M)
    I[qc(g)] = M[g];
  return I;
}
function WC(M, I, g) {
  return I.altKey && (M = "Alt-" + M), I.ctrlKey && (M = "Ctrl-" + M), I.metaKey && (M = "Meta-" + M), g !== !1 && I.shiftKey && (M = "Shift-" + M), M;
}
function Mx(M) {
  return new XI({ props: { handleKeyDown: du(M) } });
}
function du(M) {
  let I = Ix(M);
  return function(g, A) {
    let t = _c(A), D = t.length == 1 && t != " ", e, i = I[WC(t, A, !D)];
    if (i && i(g.state, g.dispatch, g))
      return !0;
    if (D && (A.shiftKey || A.altKey || A.metaKey || t.charCodeAt(0) > 127) && (e = fA[A.keyCode]) && e != t) {
      let N = I[WC(e, A, !0)];
      if (N && N(g.state, g.dispatch, g))
        return !0;
    } else if (D && A.shiftKey) {
      let N = I[WC(t, A, !0)];
      if (N && N(g.state, g.dispatch, g))
        return !0;
    }
    return !1;
  };
}
const gx = (M, I) => M.selection.empty ? !1 : (I && I(M.tr.deleteSelection().scrollIntoView()), !0), Ax = (M, I, g) => {
  let { $cursor: A } = M.selection;
  if (!A || (g ? !g.endOfTextblock("backward", M) : A.parentOffset > 0))
    return !1;
  let t = Z4(A);
  if (!t) {
    let e = A.blockRange(), i = e && hD(e);
    return i == null ? !1 : (I && I(M.tr.lift(e, i).scrollIntoView()), !0);
  }
  let D = t.nodeBefore;
  if (!D.type.spec.isolating && J4(M, t, I))
    return !0;
  if (A.parent.content.size == 0 && (TD(D, "end") || CI.isSelectable(D))) {
    let e = Lu(M.doc, A.before(), A.after(), K.empty);
    if (e && e.slice.size < e.to - e.from) {
      if (I) {
        let i = M.tr.step(e);
        i.setSelection(TD(D, "end") ? uI.findFrom(i.doc.resolve(i.mapping.map(t.pos, -1)), -1) : CI.create(i.doc, t.pos - D.nodeSize)), I(i.scrollIntoView());
      }
      return !0;
    }
  }
  return D.isAtom && t.depth == A.depth - 1 ? (I && I(M.tr.delete(t.pos - D.nodeSize, t.pos).scrollIntoView()), !0) : !1;
};
function TD(M, I, g = !1) {
  for (let A = M; A; A = I == "start" ? A.firstChild : A.lastChild) {
    if (A.isTextblock)
      return !0;
    if (g && A.childCount != 1)
      return !1;
  }
  return !1;
}
const tx = (M, I, g) => {
  let { $head: A, empty: t } = M.selection, D = A;
  if (!t)
    return !1;
  if (A.parent.isTextblock) {
    if (g ? !g.endOfTextblock("backward", M) : A.parentOffset > 0)
      return !1;
    D = Z4(A);
  }
  let e = D && D.nodeBefore;
  return !e || !CI.isSelectable(e) ? !1 : (I && I(M.tr.setSelection(CI.create(M.doc, D.pos - e.nodeSize)).scrollIntoView()), !0);
};
function Z4(M) {
  if (!M.parent.type.spec.isolating)
    for (let I = M.depth - 1; I >= 0; I--) {
      if (M.index(I) > 0)
        return M.doc.resolve(M.before(I + 1));
      if (M.node(I).type.spec.isolating)
        break;
    }
  return null;
}
const Dx = (M, I, g) => {
  let { $cursor: A } = M.selection;
  if (!A || (g ? !g.endOfTextblock("forward", M) : A.parentOffset < A.parent.content.size))
    return !1;
  let t = v4(A);
  if (!t)
    return !1;
  let D = t.nodeAfter;
  if (J4(M, t, I))
    return !0;
  if (A.parent.content.size == 0 && (TD(D, "start") || CI.isSelectable(D))) {
    let e = Lu(M.doc, A.before(), A.after(), K.empty);
    if (e && e.slice.size < e.to - e.from) {
      if (I) {
        let i = M.tr.step(e);
        i.setSelection(TD(D, "start") ? uI.findFrom(i.doc.resolve(i.mapping.map(t.pos)), 1) : CI.create(i.doc, i.mapping.map(t.pos))), I(i.scrollIntoView());
      }
      return !0;
    }
  }
  return D.isAtom && t.depth == A.depth - 1 ? (I && I(M.tr.delete(t.pos, t.pos + D.nodeSize).scrollIntoView()), !0) : !1;
}, ex = (M, I, g) => {
  let { $head: A, empty: t } = M.selection, D = A;
  if (!t)
    return !1;
  if (A.parent.isTextblock) {
    if (g ? !g.endOfTextblock("forward", M) : A.parentOffset < A.parent.content.size)
      return !1;
    D = v4(A);
  }
  let e = D && D.nodeAfter;
  return !e || !CI.isSelectable(e) ? !1 : (I && I(M.tr.setSelection(CI.create(M.doc, D.pos)).scrollIntoView()), !0);
};
function v4(M) {
  if (!M.parent.type.spec.isolating)
    for (let I = M.depth - 1; I >= 0; I--) {
      let g = M.node(I);
      if (M.index(I) + 1 < g.childCount)
        return M.doc.resolve(M.after(I + 1));
      if (g.type.spec.isolating)
        break;
    }
  return null;
}
const ix = (M, I) => {
  let { $from: g, $to: A } = M.selection, t = g.blockRange(A), D = t && hD(t);
  return D == null ? !1 : (I && I(M.tr.lift(t, D).scrollIntoView()), !0);
}, Nx = (M, I) => {
  let { $head: g, $anchor: A } = M.selection;
  return !g.parent.type.spec.code || !g.sameParent(A) ? !1 : (I && I(M.tr.insertText(`
`).scrollIntoView()), !0);
};
function U4(M) {
  for (let I = 0; I < M.edgeCount; I++) {
    let { type: g } = M.edge(I);
    if (g.isTextblock && !g.hasRequiredAttrs())
      return g;
  }
  return null;
}
const Cx = (M, I) => {
  let { $head: g, $anchor: A } = M.selection;
  if (!g.parent.type.spec.code || !g.sameParent(A))
    return !1;
  let t = g.node(-1), D = g.indexAfter(-1), e = U4(t.contentMatchAt(D));
  if (!e || !t.canReplaceWith(D, D, e))
    return !1;
  if (I) {
    let i = g.after(), N = M.tr.replaceWith(i, i, e.createAndFill());
    N.setSelection(uI.near(N.doc.resolve(i), 1)), I(N.scrollIntoView());
  }
  return !0;
}, ux = (M, I) => {
  let g = M.selection, { $from: A, $to: t } = g;
  if (g instanceof rg || A.parent.inlineContent || t.parent.inlineContent)
    return !1;
  let D = U4(t.parent.contentMatchAt(t.indexAfter()));
  if (!D || !D.isTextblock)
    return !1;
  if (I) {
    let e = (!A.parentOffset && t.index() < t.parent.childCount ? A : t).pos, i = M.tr.insert(e, D.createAndFill());
    i.setSelection(LI.create(i.doc, e + 1)), I(i.scrollIntoView());
  }
  return !0;
}, jx = (M, I) => {
  let { $cursor: g } = M.selection;
  if (!g || g.parent.content.size)
    return !1;
  if (g.depth > 1 && g.after() != g.end(-1)) {
    let D = g.before();
    if (tD(M.doc, D))
      return I && I(M.tr.split(D).scrollIntoView()), !0;
  }
  let A = g.blockRange(), t = A && hD(A);
  return t == null ? !1 : (I && I(M.tr.lift(A, t).scrollIntoView()), !0);
}, nx = (M, I) => {
  let { $from: g, to: A } = M.selection, t, D = g.sharedDepth(A);
  return D == 0 ? !1 : (t = g.before(D), I && I(M.tr.setSelection(CI.create(M.doc, t))), !0);
};
function Lx(M, I, g) {
  let A = I.nodeBefore, t = I.nodeAfter, D = I.index();
  return !A || !t || !A.type.compatibleContent(t.type) ? !1 : !A.content.size && I.parent.canReplace(D - 1, D) ? (g && g(M.tr.delete(I.pos - A.nodeSize, I.pos).scrollIntoView()), !0) : !I.parent.canReplace(D, D + 1) || !(t.isTextblock || OD(M.doc, I.pos)) ? !1 : (g && g(M.tr.clearIncompatible(I.pos, A.type, A.contentMatchAt(A.childCount)).join(I.pos).scrollIntoView()), !0);
}
function J4(M, I, g) {
  let A = I.nodeBefore, t = I.nodeAfter, D, e;
  if (A.type.spec.isolating || t.type.spec.isolating)
    return !1;
  if (Lx(M, I, g))
    return !0;
  let i = I.parent.canReplace(I.index(), I.index() + 1);
  if (i && (D = (e = A.contentMatchAt(A.childCount)).findWrapping(t.type)) && e.matchType(D[0] || t.type).validEnd) {
    if (g) {
      let j = I.pos + t.nodeSize, n = G.empty;
      for (let T = D.length - 1; T >= 0; T--)
        n = G.from(D[T].create(null, n));
      n = G.from(A.copy(n));
      let L = M.tr.step(new uM(I.pos - 1, j, I.pos, j, new K(n, 1, 0), D.length, !0)), o = j + 2 * D.length;
      OD(L.doc, o) && L.join(o), g(L.scrollIntoView());
    }
    return !0;
  }
  let N = uI.findFrom(I, 1), C = N && N.$from.blockRange(N.$to), u = C && hD(C);
  if (u != null && u >= I.depth)
    return g && g(M.tr.lift(C, u).scrollIntoView()), !0;
  if (i && TD(t, "start", !0) && TD(A, "end")) {
    let j = A, n = [];
    for (; n.push(j), !j.isTextblock; )
      j = j.lastChild;
    let L = t, o = 1;
    for (; !L.isTextblock; L = L.firstChild)
      o++;
    if (j.canReplace(j.childCount, j.childCount, L.content)) {
      if (g) {
        let T = G.empty;
        for (let S = n.length - 1; S >= 0; S--)
          T = G.from(n[S].copy(T));
        let s = M.tr.step(new uM(I.pos - n.length, I.pos + t.nodeSize, I.pos + o, I.pos + t.nodeSize - o, new K(T, n.length, 0), 0, !0));
        g(s.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function B4(M) {
  return function(I, g) {
    let A = I.selection, t = M < 0 ? A.$from : A.$to, D = t.depth;
    for (; t.node(D).isInline; ) {
      if (!D)
        return !1;
      D--;
    }
    return t.node(D).isTextblock ? (g && g(I.tr.setSelection(LI.create(I.doc, M < 0 ? t.start(D) : t.end(D)))), !0) : !1;
  };
}
const ox = B4(-1), Tx = B4(1);
function sx(M, I = null) {
  return function(g, A) {
    let { $from: t, $to: D } = g.selection, e = t.blockRange(D), i = e && nu(e, M, I);
    return i ? (A && A(g.tr.wrap(e, i).scrollIntoView()), !0) : !1;
  };
}
function Zn(M, I = null) {
  return function(g, A) {
    let { from: t, to: D } = g.selection, e = !1;
    return g.doc.nodesBetween(t, D, (i, N) => {
      if (e)
        return !1;
      if (!(!i.isTextblock || i.hasMarkup(M, I)))
        if (i.type == M)
          e = !0;
        else {
          let C = g.doc.resolve(N), u = C.index();
          e = C.parent.canReplaceWith(u, u + 1, M);
        }
    }), e ? (A && A(g.tr.setBlockType(t, D, M, I).scrollIntoView()), !0) : !1;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Sx(M, I = null) {
  return function(g, A) {
    let { $from: t, $to: D } = g.selection, e = t.blockRange(D), i = !1, N = e;
    if (!e)
      return !1;
    if (e.depth >= 2 && t.node(e.depth - 1).type.compatibleContent(M) && e.startIndex == 0) {
      if (t.index(e.depth - 1) == 0)
        return !1;
      let u = g.doc.resolve(e.start - 2);
      N = new Fi(u, u, e.depth), e.endIndex < e.parent.childCount && (e = new Fi(t, g.doc.resolve(D.end(e.depth)), e.depth)), i = !0;
    }
    let C = nu(N, M, I, e);
    return C ? (A && A(ax(g.tr, e, C, i, M).scrollIntoView()), !0) : !1;
  };
}
function ax(M, I, g, A, t) {
  let D = G.empty;
  for (let u = g.length - 1; u >= 0; u--)
    D = G.from(g[u].type.create(g[u].attrs, D));
  M.step(new uM(I.start - (A ? 2 : 0), I.end, I.start, I.end, new K(D, 0, 0), g.length, !0));
  let e = 0;
  for (let u = 0; u < g.length; u++)
    g[u].type == t && (e = u + 1);
  let i = g.length - e, N = I.start + g.length - (A ? 2 : 0), C = I.parent;
  for (let u = I.startIndex, j = I.endIndex, n = !0; u < j; u++, n = !1)
    !n && tD(M.doc, N, i) && (M.split(N, i), N += 2 * i), N += C.child(u).nodeSize;
  return M;
}
function lx(M) {
  return function(I, g) {
    let { $from: A, $to: t } = I.selection, D = A.blockRange(t, (e) => e.childCount > 0 && e.firstChild.type == M);
    return D ? g ? A.node(D.depth - 1).type == M ? yx(I, g, M, D) : cx(I, g, D) : !0 : !1;
  };
}
function yx(M, I, g, A) {
  let t = M.tr, D = A.end, e = A.$to.end(A.depth);
  D < e && (t.step(new uM(D - 1, e, D, e, new K(G.from(g.create(null, A.parent.copy())), 1, 0), 1, !0)), A = new Fi(t.doc.resolve(A.$from.pos), t.doc.resolve(e), A.depth));
  const i = hD(A);
  if (i == null)
    return !1;
  t.lift(A, i);
  let N = t.mapping.map(D, -1) - 1;
  return OD(t.doc, N) && t.join(N), I(t.scrollIntoView()), !0;
}
function cx(M, I, g) {
  let A = M.tr, t = g.parent;
  for (let L = g.end, o = g.endIndex - 1, T = g.startIndex; o > T; o--)
    L -= t.child(o).nodeSize, A.delete(L - 1, L + 1);
  let D = A.doc.resolve(g.start), e = D.nodeAfter;
  if (A.mapping.map(g.end) != g.start + D.nodeAfter.nodeSize)
    return !1;
  let i = g.startIndex == 0, N = g.endIndex == t.childCount, C = D.node(-1), u = D.index(-1);
  if (!C.canReplace(u + (i ? 0 : 1), u + 1, e.content.append(N ? G.empty : G.from(t))))
    return !1;
  let j = D.pos, n = j + e.nodeSize;
  return A.step(new uM(j - (i ? 1 : 0), n + (N ? 1 : 0), j + 1, n - 1, new K((i ? G.empty : G.from(t.copy(G.empty))).append(N ? G.empty : G.from(t.copy(G.empty))), i ? 0 : 1, N ? 0 : 1), i ? 0 : 1)), I(A.scrollIntoView()), !0;
}
function xx(M) {
  return function(I, g) {
    let { $from: A, $to: t } = I.selection, D = A.blockRange(t, (C) => C.childCount > 0 && C.firstChild.type == M);
    if (!D)
      return !1;
    let e = D.startIndex;
    if (e == 0)
      return !1;
    let i = D.parent, N = i.child(e - 1);
    if (N.type != M)
      return !1;
    if (g) {
      let C = N.lastChild && N.lastChild.type == i.type, u = G.from(C ? M.create() : null), j = new K(G.from(M.create(null, G.from(i.type.create(null, u)))), C ? 3 : 1, 0), n = D.start, L = D.end;
      g(I.tr.step(new uM(n - (C ? 3 : 1), L, n, L, j, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function FN(M) {
  const { state: I, transaction: g } = M;
  let { selection: A } = g, { doc: t } = g, { storedMarks: D } = g;
  return {
    ...I,
    apply: I.apply.bind(I),
    applyTransaction: I.applyTransaction.bind(I),
    filterTransaction: I.filterTransaction,
    plugins: I.plugins,
    schema: I.schema,
    reconfigure: I.reconfigure.bind(I),
    toJSON: I.toJSON.bind(I),
    get storedMarks() {
      return D;
    },
    get selection() {
      return A;
    },
    get doc() {
      return t;
    },
    get tr() {
      return A = g.selection, t = g.doc, D = g.storedMarks, g;
    }
  };
}
class XN {
  constructor(I) {
    this.editor = I.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = I.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: I, editor: g, state: A } = this, { view: t } = g, { tr: D } = A, e = this.buildProps(D);
    return Object.fromEntries(Object.entries(I).map(([i, N]) => [i, (...u) => {
      const j = N(...u)(e);
      return !D.getMeta("preventDispatch") && !this.hasCustomState && t.dispatch(D), j;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(I, g = !0) {
    const { rawCommands: A, editor: t, state: D } = this, { view: e } = t, i = [], N = !!I, C = I || D.tr, u = () => (!N && g && !C.getMeta("preventDispatch") && !this.hasCustomState && e.dispatch(C), i.every((n) => n === !0)), j = {
      ...Object.fromEntries(Object.entries(A).map(([n, L]) => [n, (...T) => {
        const s = this.buildProps(C, g), S = L(...T)(s);
        return i.push(S), j;
      }])),
      run: u
    };
    return j;
  }
  createCan(I) {
    const { rawCommands: g, state: A } = this, t = !1, D = I || A.tr, e = this.buildProps(D, t);
    return {
      ...Object.fromEntries(Object.entries(g).map(([N, C]) => [N, (...u) => C(...u)({ ...e, dispatch: void 0 })])),
      chain: () => this.createChain(D, t)
    };
  }
  buildProps(I, g = !0) {
    const { rawCommands: A, editor: t, state: D } = this, { view: e } = t;
    D.storedMarks && I.setStoredMarks(D.storedMarks);
    const i = {
      tr: I,
      editor: t,
      view: e,
      state: FN({
        state: D,
        transaction: I
      }),
      dispatch: g ? () => {
      } : void 0,
      chain: () => this.createChain(I),
      can: () => this.createCan(I),
      get commands() {
        return Object.fromEntries(Object.entries(A).map(([N, C]) => [N, (...u) => C(...u)(i)]));
      }
    };
    return i;
  }
}
class rx {
  constructor() {
    this.callbacks = {};
  }
  on(I, g) {
    return this.callbacks[I] || (this.callbacks[I] = []), this.callbacks[I].push(g), this;
  }
  emit(I, ...g) {
    const A = this.callbacks[I];
    return A && A.forEach((t) => t.apply(this, g)), this;
  }
  off(I, g) {
    const A = this.callbacks[I];
    return A && (g ? this.callbacks[I] = A.filter((t) => t !== g) : delete this.callbacks[I]), this;
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function AI(M, I, g) {
  return M.config[I] === void 0 && M.parent ? AI(M.parent, I, g) : typeof M.config[I] == "function" ? M.config[I].bind({
    ...g,
    parent: M.parent ? AI(M.parent, I, g) : null
  }) : M.config[I];
}
function KN(M) {
  const I = M.filter((t) => t.type === "extension"), g = M.filter((t) => t.type === "node"), A = M.filter((t) => t.type === "mark");
  return {
    baseExtensions: I,
    nodeExtensions: g,
    markExtensions: A
  };
}
function R4(M) {
  const I = [], { nodeExtensions: g, markExtensions: A } = KN(M), t = [...g, ...A], D = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return M.forEach((e) => {
    const i = {
      name: e.name,
      options: e.options,
      storage: e.storage
    }, N = AI(e, "addGlobalAttributes", i);
    if (!N)
      return;
    N().forEach((u) => {
      u.types.forEach((j) => {
        Object.entries(u.attributes).forEach(([n, L]) => {
          I.push({
            type: j,
            name: n,
            attribute: {
              ...D,
              ...L
            }
          });
        });
      });
    });
  }), t.forEach((e) => {
    const i = {
      name: e.name,
      options: e.options,
      storage: e.storage
    }, N = AI(e, "addAttributes", i);
    if (!N)
      return;
    const C = N();
    Object.entries(C).forEach(([u, j]) => {
      const n = {
        ...D,
        ...j
      };
      j.isRequired && j.default === void 0 && delete n.default, I.push({
        type: e.name,
        name: u,
        attribute: n
      });
    });
  }), I;
}
function oM(M, I) {
  if (typeof M == "string") {
    if (!I.nodes[M])
      throw Error(`There is no node type named '${M}'. Maybe you forgot to add the extension?`);
    return I.nodes[M];
  }
  return M;
}
function OI(...M) {
  return M.filter((I) => !!I).reduce((I, g) => {
    const A = { ...I };
    return Object.entries(g).forEach(([t, D]) => {
      if (!A[t]) {
        A[t] = D;
        return;
      }
      t === "class" ? A[t] = [A[t], D].join(" ") : t === "style" ? A[t] = [A[t], D].join("; ") : A[t] = D;
    }), A;
  }, {});
}
function d0(M, I) {
  return I.filter((g) => g.attribute.rendered).map((g) => g.attribute.renderHTML ? g.attribute.renderHTML(M.attrs) || {} : {
    [g.name]: M.attrs[g.name]
  }).reduce((g, A) => OI(g, A), {});
}
function H4(M) {
  return typeof M == "function";
}
function lI(M, I = void 0, ...g) {
  return H4(M) ? I ? M.bind(I)(...g) : M(...g) : M;
}
function wx(M = {}) {
  return Object.keys(M).length === 0 && M.constructor === Object;
}
function Ex(M) {
  return typeof M != "string" ? M : M.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(M) : M === "true" ? !0 : M === "false" ? !1 : M;
}
function vn(M, I) {
  return M.style ? M : {
    ...M,
    getAttrs: (g) => {
      const A = M.getAttrs ? M.getAttrs(g) : M.attrs;
      if (A === !1)
        return !1;
      const t = I.reduce((D, e) => {
        const i = e.attribute.parseHTML ? e.attribute.parseHTML(g) : Ex(g.getAttribute(e.name));
        return i == null ? D : {
          ...D,
          [e.name]: i
        };
      }, {});
      return { ...A, ...t };
    }
  };
}
function Un(M) {
  return Object.fromEntries(Object.entries(M).filter(([I, g]) => I === "attrs" && wx(g) ? !1 : g != null));
}
function dx(M) {
  var I;
  const g = R4(M), { nodeExtensions: A, markExtensions: t } = KN(M), D = (I = A.find((N) => AI(N, "topNode"))) === null || I === void 0 ? void 0 : I.name, e = Object.fromEntries(A.map((N) => {
    const C = g.filter((s) => s.type === N.name), u = {
      name: N.name,
      options: N.options,
      storage: N.storage
    }, j = M.reduce((s, S) => {
      const y = AI(S, "extendNodeSchema", u);
      return {
        ...s,
        ...y ? y(N) : {}
      };
    }, {}), n = Un({
      ...j,
      content: lI(AI(N, "content", u)),
      marks: lI(AI(N, "marks", u)),
      group: lI(AI(N, "group", u)),
      inline: lI(AI(N, "inline", u)),
      atom: lI(AI(N, "atom", u)),
      selectable: lI(AI(N, "selectable", u)),
      draggable: lI(AI(N, "draggable", u)),
      code: lI(AI(N, "code", u)),
      defining: lI(AI(N, "defining", u)),
      isolating: lI(AI(N, "isolating", u)),
      attrs: Object.fromEntries(C.map((s) => {
        var S;
        return [s.name, { default: (S = s == null ? void 0 : s.attribute) === null || S === void 0 ? void 0 : S.default }];
      }))
    }), L = lI(AI(N, "parseHTML", u));
    L && (n.parseDOM = L.map((s) => vn(s, C)));
    const o = AI(N, "renderHTML", u);
    o && (n.toDOM = (s) => o({
      node: s,
      HTMLAttributes: d0(s, C)
    }));
    const T = AI(N, "renderText", u);
    return T && (n.toText = T), [N.name, n];
  })), i = Object.fromEntries(t.map((N) => {
    const C = g.filter((T) => T.type === N.name), u = {
      name: N.name,
      options: N.options,
      storage: N.storage
    }, j = M.reduce((T, s) => {
      const S = AI(s, "extendMarkSchema", u);
      return {
        ...T,
        ...S ? S(N) : {}
      };
    }, {}), n = Un({
      ...j,
      inclusive: lI(AI(N, "inclusive", u)),
      excludes: lI(AI(N, "excludes", u)),
      group: lI(AI(N, "group", u)),
      spanning: lI(AI(N, "spanning", u)),
      code: lI(AI(N, "code", u)),
      attrs: Object.fromEntries(C.map((T) => {
        var s;
        return [T.name, { default: (s = T == null ? void 0 : T.attribute) === null || s === void 0 ? void 0 : s.default }];
      }))
    }), L = lI(AI(N, "parseHTML", u));
    L && (n.parseDOM = L.map((T) => vn(T, C)));
    const o = AI(N, "renderHTML", u);
    return o && (n.toDOM = (T) => o({
      mark: T,
      HTMLAttributes: d0(T, C)
    })), [N.name, n];
  }));
  return new Hl({
    topNode: D,
    nodes: e,
    marks: i
  });
}
function ZC(M, I) {
  return I.nodes[M] || I.marks[M] || null;
}
function Jn(M, I) {
  return Array.isArray(I) ? I.some((g) => (typeof g == "string" ? g : g.name) === M.name) : I;
}
const zx = (M, I = 500) => {
  let g = "";
  return M.parent.nodesBetween(Math.max(0, M.parentOffset - I), M.parentOffset, (A, t, D, e) => {
    var i, N, C;
    g += ((N = (i = A.type.spec).toText) === null || N === void 0 ? void 0 : N.call(i, {
      node: A,
      pos: t,
      parent: D,
      index: e
    })) || ((C = M.nodeBefore) === null || C === void 0 ? void 0 : C.text) || "%leaf%";
  }), g;
};
function zu(M) {
  return Object.prototype.toString.call(M) === "[object RegExp]";
}
class Ke {
  constructor(I) {
    this.find = I.find, this.handler = I.handler;
  }
}
const mx = (M, I) => {
  if (zu(I))
    return I.exec(M);
  const g = I(M);
  if (!g)
    return null;
  const A = [];
  return A.push(g.text), A.index = g.index, A.input = M, A.data = g.data, g.replaceWith && (g.text.includes(g.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), A.push(g.replaceWith)), A;
};
function vC(M) {
  var I;
  const { editor: g, from: A, to: t, text: D, rules: e, plugin: i } = M, { view: N } = g;
  if (N.composing)
    return !1;
  const C = N.state.doc.resolve(A);
  if (C.parent.type.spec.code || !!(!((I = C.nodeBefore || C.nodeAfter) === null || I === void 0) && I.marks.find((n) => n.type.spec.code)))
    return !1;
  let u = !1;
  const j = zx(C) + D;
  return e.forEach((n) => {
    if (u)
      return;
    const L = mx(j, n.find);
    if (!L)
      return;
    const o = N.state.tr, T = FN({
      state: N.state,
      transaction: o
    }), s = {
      from: A - (L[0].length - D.length),
      to: t
    }, { commands: S, chain: y, can: x } = new XN({
      editor: g,
      state: T
    });
    n.handler({
      state: T,
      range: s,
      match: L,
      commands: S,
      chain: y,
      can: x
    }) === null || !o.steps.length || (o.setMeta(i, {
      transform: o,
      from: A,
      to: t,
      text: D
    }), N.dispatch(o), u = !0);
  }), u;
}
function bx(M) {
  const { editor: I, rules: g } = M, A = new XI({
    state: {
      init() {
        return null;
      },
      apply(t, D) {
        const e = t.getMeta(A);
        return e || (t.selectionSet || t.docChanged ? null : D);
      }
    },
    props: {
      handleTextInput(t, D, e, i) {
        return vC({
          editor: I,
          from: D,
          to: e,
          text: i,
          rules: g,
          plugin: A
        });
      },
      handleDOMEvents: {
        compositionend: (t) => (setTimeout(() => {
          const { $cursor: D } = t.state.selection;
          D && vC({
            editor: I,
            from: D.pos,
            to: D.pos,
            text: "",
            rules: g,
            plugin: A
          });
        }), !1)
      },
      handleKeyDown(t, D) {
        if (D.key !== "Enter")
          return !1;
        const { $cursor: e } = t.state.selection;
        return e ? vC({
          editor: I,
          from: e.pos,
          to: e.pos,
          text: `
`,
          rules: g,
          plugin: A
        }) : !1;
      }
    },
    isInputRules: !0
  });
  return A;
}
function Yx(M) {
  return typeof M == "number";
}
class px {
  constructor(I) {
    this.find = I.find, this.handler = I.handler;
  }
}
const Qx = (M, I) => {
  if (zu(I))
    return [...M.matchAll(I)];
  const g = I(M);
  return g ? g.map((A) => {
    const t = [];
    return t.push(A.text), t.index = A.index, t.input = M, t.data = A.data, A.replaceWith && (A.text.includes(A.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), t.push(A.replaceWith)), t;
  }) : [];
};
function hx(M) {
  const { editor: I, state: g, from: A, to: t, rule: D } = M, { commands: e, chain: i, can: N } = new XN({
    editor: I,
    state: g
  }), C = [];
  return g.doc.nodesBetween(A, t, (j, n) => {
    if (!j.isTextblock || j.type.spec.code)
      return;
    const L = Math.max(A, n), o = Math.min(t, n + j.content.size), T = j.textBetween(L - n, o - n, void 0, "\uFFFC");
    Qx(T, D.find).forEach((S) => {
      if (S.index === void 0)
        return;
      const y = L + S.index + 1, x = y + S[0].length, a = {
        from: g.tr.mapping.map(y),
        to: g.tr.mapping.map(x)
      }, z = D.handler({
        state: g,
        range: a,
        match: S,
        commands: e,
        chain: i,
        can: N
      });
      C.push(z);
    });
  }), C.every((j) => j !== null);
}
function Ox(M) {
  const { editor: I, rules: g } = M;
  let A = null, t = !1, D = !1;
  return g.map((i) => new XI({
    view(N) {
      const C = (u) => {
        var j;
        A = !((j = N.dom.parentElement) === null || j === void 0) && j.contains(u.target) ? N.dom.parentElement : null;
      };
      return window.addEventListener("dragstart", C), {
        destroy() {
          window.removeEventListener("dragstart", C);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (N) => (D = A === N.dom.parentElement, !1),
        paste: (N, C) => {
          var u;
          const j = (u = C.clipboardData) === null || u === void 0 ? void 0 : u.getData("text/html");
          return t = !!(j != null && j.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (N, C, u) => {
      const j = N[0], n = j.getMeta("uiEvent") === "paste" && !t, L = j.getMeta("uiEvent") === "drop" && !D;
      if (!n && !L)
        return;
      const o = C.doc.content.findDiffStart(u.doc.content), T = C.doc.content.findDiffEnd(u.doc.content);
      if (!Yx(o) || !T || o === T.b)
        return;
      const s = u.tr, S = FN({
        state: u,
        transaction: s
      });
      if (!(!hx({
        editor: I,
        state: S,
        from: Math.max(o - 1, 0),
        to: T.b - 1,
        rule: i
      }) || !s.steps.length))
        return s;
    }
  }));
}
function kx(M) {
  const I = M.filter((g, A) => M.indexOf(g) !== A);
  return [...new Set(I)];
}
class Ft {
  constructor(I, g) {
    this.splittableMarks = [], this.editor = g, this.extensions = Ft.resolve(I), this.schema = dx(this.extensions), this.extensions.forEach((A) => {
      var t;
      this.editor.extensionStorage[A.name] = A.storage;
      const D = {
        name: A.name,
        options: A.options,
        storage: A.storage,
        editor: this.editor,
        type: ZC(A.name, this.schema)
      };
      A.type === "mark" && ((t = lI(AI(A, "keepOnSplit", D))) !== null && t !== void 0 ? t : !0) && this.splittableMarks.push(A.name);
      const e = AI(A, "onBeforeCreate", D);
      e && this.editor.on("beforeCreate", e);
      const i = AI(A, "onCreate", D);
      i && this.editor.on("create", i);
      const N = AI(A, "onUpdate", D);
      N && this.editor.on("update", N);
      const C = AI(A, "onSelectionUpdate", D);
      C && this.editor.on("selectionUpdate", C);
      const u = AI(A, "onTransaction", D);
      u && this.editor.on("transaction", u);
      const j = AI(A, "onFocus", D);
      j && this.editor.on("focus", j);
      const n = AI(A, "onBlur", D);
      n && this.editor.on("blur", n);
      const L = AI(A, "onDestroy", D);
      L && this.editor.on("destroy", L);
    });
  }
  static resolve(I) {
    const g = Ft.sort(Ft.flatten(I)), A = kx(g.map((t) => t.name));
    return A.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${A.map((t) => `'${t}'`).join(", ")}]. This can lead to issues.`), g;
  }
  static flatten(I) {
    return I.map((g) => {
      const A = {
        name: g.name,
        options: g.options,
        storage: g.storage
      }, t = AI(g, "addExtensions", A);
      return t ? [
        g,
        ...this.flatten(t())
      ] : g;
    }).flat(10);
  }
  static sort(I) {
    return I.sort((A, t) => {
      const D = AI(A, "priority") || 100, e = AI(t, "priority") || 100;
      return D > e ? -1 : D < e ? 1 : 0;
    });
  }
  get commands() {
    return this.extensions.reduce((I, g) => {
      const A = {
        name: g.name,
        options: g.options,
        storage: g.storage,
        editor: this.editor,
        type: ZC(g.name, this.schema)
      }, t = AI(g, "addCommands", A);
      return t ? {
        ...I,
        ...t()
      } : I;
    }, {});
  }
  get plugins() {
    const { editor: I } = this, g = Ft.sort([...this.extensions].reverse()), A = [], t = [], D = g.map((e) => {
      const i = {
        name: e.name,
        options: e.options,
        storage: e.storage,
        editor: I,
        type: ZC(e.name, this.schema)
      }, N = [], C = AI(e, "addKeyboardShortcuts", i);
      let u = {};
      if (e.type === "mark" && e.config.exitable && (u.ArrowRight = () => zg.handleExit({ editor: I, mark: e })), C) {
        const T = Object.fromEntries(Object.entries(C()).map(([s, S]) => [s, () => S({ editor: I })]));
        u = { ...u, ...T };
      }
      const j = Mx(u);
      N.push(j);
      const n = AI(e, "addInputRules", i);
      Jn(e, I.options.enableInputRules) && n && A.push(...n());
      const L = AI(e, "addPasteRules", i);
      Jn(e, I.options.enablePasteRules) && L && t.push(...L());
      const o = AI(e, "addProseMirrorPlugins", i);
      if (o) {
        const T = o();
        N.push(...T);
      }
      return N;
    }).flat();
    return [
      bx({
        editor: I,
        rules: A
      }),
      ...Ox({
        editor: I,
        rules: t
      }),
      ...D
    ];
  }
  get attributes() {
    return R4(this.extensions);
  }
  get nodeViews() {
    const { editor: I } = this, { nodeExtensions: g } = KN(this.extensions);
    return Object.fromEntries(g.filter((A) => !!AI(A, "addNodeView")).map((A) => {
      const t = this.attributes.filter((N) => N.type === A.name), D = {
        name: A.name,
        options: A.options,
        storage: A.storage,
        editor: I,
        type: oM(A.name, this.schema)
      }, e = AI(A, "addNodeView", D);
      if (!e)
        return [];
      const i = (N, C, u, j) => {
        const n = d0(N, t);
        return e()({
          editor: I,
          node: N,
          getPos: u,
          decorations: j,
          HTMLAttributes: n,
          extension: A
        });
      };
      return [A.name, i];
    }));
  }
}
function Px(M) {
  return Object.prototype.toString.call(M).slice(8, -1);
}
function UC(M) {
  return Px(M) !== "Object" ? !1 : M.constructor === Object && Object.getPrototypeOf(M) === Object.prototype;
}
function _N(M, I) {
  const g = { ...M };
  return UC(M) && UC(I) && Object.keys(I).forEach((A) => {
    UC(I[A]) ? A in M ? g[A] = _N(M[A], I[A]) : Object.assign(g, { [A]: I[A] }) : Object.assign(g, { [A]: I[A] });
  }), g;
}
class tM {
  constructor(I = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...I
    }, this.name = this.config.name, I.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = lI(AI(this, "addOptions", {
      name: this.name
    }))), this.storage = lI(AI(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(I = {}) {
    return new tM(I);
  }
  configure(I = {}) {
    const g = this.extend();
    return g.options = _N(this.options, I), g.storage = lI(AI(g, "addStorage", {
      name: g.name,
      options: g.options
    })), g;
  }
  extend(I = {}) {
    const g = new tM(I);
    return g.parent = this, this.child = g, g.name = I.name ? I.name : g.parent.name, I.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${g.name}".`), g.options = lI(AI(g, "addOptions", {
      name: g.name
    })), g.storage = lI(AI(g, "addStorage", {
      name: g.name,
      options: g.options
    })), g;
  }
}
function V4(M, I, g) {
  const { from: A, to: t } = I, { blockSeparator: D = `

`, textSerializers: e = {} } = g || {};
  let i = "", N = !0;
  return M.nodesBetween(A, t, (C, u, j, n) => {
    var L;
    const o = e == null ? void 0 : e[C.type.name];
    o ? (C.isBlock && !N && (i += D, N = !0), j && (i += o({
      node: C,
      pos: u,
      parent: j,
      index: n,
      range: I
    }))) : C.isText ? (i += (L = C == null ? void 0 : C.text) === null || L === void 0 ? void 0 : L.slice(Math.max(A, u) - u, t - u), N = !1) : C.isBlock && !N && (i += D, N = !0);
  }), i;
}
function F4(M) {
  return Object.fromEntries(Object.entries(M.nodes).filter(([, I]) => I.spec.toText).map(([I, g]) => [I, g.spec.toText]));
}
const fx = tM.create({
  name: "clipboardTextSerializer",
  addProseMirrorPlugins() {
    return [
      new XI({
        key: new TM("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: M } = this, { state: I, schema: g } = M, { doc: A, selection: t } = I, { ranges: D } = t, e = Math.min(...D.map((u) => u.$from.pos)), i = Math.max(...D.map((u) => u.$to.pos)), N = F4(g);
            return V4(A, { from: e, to: i }, {
              textSerializers: N
            });
          }
        }
      })
    ];
  }
}), Gx = () => ({ editor: M, view: I }) => (requestAnimationFrame(() => {
  var g;
  M.isDestroyed || (I.dom.blur(), (g = window == null ? void 0 : window.getSelection()) === null || g === void 0 || g.removeAllRanges());
}), !0), Wx = (M = !1) => ({ commands: I }) => I.setContent("", M), Zx = () => ({ state: M, tr: I, dispatch: g }) => {
  const { selection: A } = I, { ranges: t } = A;
  return g && t.forEach(({ $from: D, $to: e }) => {
    M.doc.nodesBetween(D.pos, e.pos, (i, N) => {
      if (i.type.isText)
        return;
      const { doc: C, mapping: u } = I, j = C.resolve(u.map(N)), n = C.resolve(u.map(N + i.nodeSize)), L = j.blockRange(n);
      if (!L)
        return;
      const o = hD(L);
      if (i.type.isTextblock) {
        const { defaultType: T } = j.parent.contentMatchAt(j.index());
        I.setNodeMarkup(L.start, T);
      }
      (o || o === 0) && I.lift(L, o);
    });
  }), !0;
}, vx = (M) => (I) => M(I), Ux = () => ({ state: M, dispatch: I }) => ux(M, I), Jx = (M) => ({ tr: I, state: g, dispatch: A }) => {
  const t = oM(M, g.schema), D = I.selection.$anchor;
  for (let e = D.depth; e > 0; e -= 1)
    if (D.node(e).type === t) {
      if (A) {
        const N = D.before(e), C = D.after(e);
        I.delete(N, C).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Bx = (M) => ({ tr: I, dispatch: g }) => {
  const { from: A, to: t } = M;
  return g && I.delete(A, t), !0;
}, Rx = () => ({ state: M, dispatch: I }) => gx(M, I), Hx = () => ({ commands: M }) => M.keyboardShortcut("Enter"), Vx = () => ({ state: M, dispatch: I }) => Cx(M, I);
function AN(M, I, g = { strict: !0 }) {
  const A = Object.keys(I);
  return A.length ? A.every((t) => g.strict ? I[t] === M[t] : zu(I[t]) ? I[t].test(M[t]) : I[t] === M[t]) : !0;
}
function z0(M, I, g = {}) {
  return M.find((A) => A.type === I && AN(A.attrs, g));
}
function Fx(M, I, g = {}) {
  return !!z0(M, I, g);
}
function mu(M, I, g = {}) {
  if (!M || !I)
    return;
  let A = M.parent.childAfter(M.parentOffset);
  if (M.parentOffset === A.offset && A.offset !== 0 && (A = M.parent.childBefore(M.parentOffset)), !A.node)
    return;
  const t = z0([...A.node.marks], I, g);
  if (!t)
    return;
  let D = A.index, e = M.start() + A.offset, i = D + 1, N = e + A.node.nodeSize;
  for (z0([...A.node.marks], I, g); D > 0 && t.isInSet(M.parent.child(D - 1).marks); )
    D -= 1, e -= M.parent.child(D).nodeSize;
  for (; i < M.parent.childCount && Fx([...M.parent.child(i).marks], I, g); )
    N += M.parent.child(i).nodeSize, i += 1;
  return {
    from: e,
    to: N
  };
}
function vA(M, I) {
  if (typeof M == "string") {
    if (!I.marks[M])
      throw Error(`There is no mark type named '${M}'. Maybe you forgot to add the extension?`);
    return I.marks[M];
  }
  return M;
}
const Xx = (M, I = {}) => ({ tr: g, state: A, dispatch: t }) => {
  const D = vA(M, A.schema), { doc: e, selection: i } = g, { $from: N, from: C, to: u } = i;
  if (t) {
    const j = mu(N, D, I);
    if (j && j.from <= C && j.to >= u) {
      const n = LI.create(e, j.from, j.to);
      g.setSelection(n);
    }
  }
  return !0;
}, Kx = (M) => (I) => {
  const g = typeof M == "function" ? M(I) : M;
  for (let A = 0; A < g.length; A += 1)
    if (g[A](I))
      return !0;
  return !1;
};
function bu(M) {
  return M instanceof LI;
}
function MA(M = 0, I = 0, g = 0) {
  return Math.min(Math.max(M, I), g);
}
function X4(M, I = null) {
  if (!I)
    return null;
  const g = uI.atStart(M), A = uI.atEnd(M);
  if (I === "start" || I === !0)
    return g;
  if (I === "end")
    return A;
  const t = g.from, D = A.to;
  return I === "all" ? LI.create(M, MA(0, t, D), MA(M.content.size, t, D)) : LI.create(M, MA(I, t, D), MA(I, t, D));
}
function $N() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const _x = (M = null, I = {}) => ({ editor: g, view: A, tr: t, dispatch: D }) => {
  I = {
    scrollIntoView: !0,
    ...I
  };
  const e = () => {
    $N() && A.dom.focus(), requestAnimationFrame(() => {
      g.isDestroyed || (A.focus(), I != null && I.scrollIntoView && g.commands.scrollIntoView());
    });
  };
  if (A.hasFocus() && M === null || M === !1)
    return !0;
  if (D && M === null && !bu(g.state.selection))
    return e(), !0;
  const i = X4(t.doc, M) || g.state.selection, N = g.state.selection.eq(i);
  return D && (N || t.setSelection(i), N && t.storedMarks && t.setStoredMarks(t.storedMarks), e()), !0;
}, $x = (M, I) => (g) => M.every((A, t) => I(A, { ...g, index: t })), qx = (M, I) => ({ tr: g, commands: A }) => A.insertContentAt({ from: g.selection.from, to: g.selection.to }, M, I);
function Bn(M) {
  const I = `<body>${M}</body>`;
  return new window.DOMParser().parseFromString(I, "text/html").body;
}
function tN(M, I, g) {
  if (g = {
    slice: !0,
    parseOptions: {},
    ...g
  }, typeof M == "object" && M !== null)
    try {
      return Array.isArray(M) ? G.fromArray(M.map((A) => I.nodeFromJSON(A))) : I.nodeFromJSON(M);
    } catch (A) {
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", M, "Error:", A), tN("", I, g);
    }
  if (typeof M == "string") {
    const A = uD.fromSchema(I);
    return g.slice ? A.parseSlice(Bn(M), g.parseOptions).content : A.parse(Bn(M), g.parseOptions);
  }
  return tN("", I, g);
}
function Ir(M, I, g) {
  const A = M.steps.length - 1;
  if (A < I)
    return;
  const t = M.steps[A];
  if (!(t instanceof dM || t instanceof uM))
    return;
  const D = M.mapping.maps[A];
  let e = 0;
  D.forEach((i, N, C, u) => {
    e === 0 && (e = u);
  }), M.setSelection(uI.near(M.doc.resolve(e), g));
}
const Mr = (M) => M.toString().startsWith("<"), gr = (M, I, g) => ({ tr: A, dispatch: t, editor: D }) => {
  if (t) {
    g = {
      parseOptions: {},
      updateSelection: !0,
      ...g
    };
    const e = tN(I, D.schema, {
      parseOptions: {
        preserveWhitespace: "full",
        ...g.parseOptions
      }
    });
    if (e.toString() === "<>")
      return !0;
    let { from: i, to: N } = typeof M == "number" ? { from: M, to: M } : M, C = !0, u = !0;
    if ((Mr(e) ? e : [e]).forEach((n) => {
      n.check(), C = C ? n.isText && n.marks.length === 0 : !1, u = u ? n.isBlock : !1;
    }), i === N && u) {
      const { parent: n } = A.doc.resolve(i);
      n.isTextblock && !n.type.spec.code && !n.childCount && (i -= 1, N += 1);
    }
    C ? A.insertText(I, i, N) : A.replaceWith(i, N, e), g.updateSelection && Ir(A, A.steps.length - 1, -1);
  }
  return !0;
}, Ar = () => ({ state: M, dispatch: I }) => Ax(M, I), tr = () => ({ state: M, dispatch: I }) => Dx(M, I);
function K4() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Dr(M) {
  const I = M.split(/-(?!$)/);
  let g = I[I.length - 1];
  g === "Space" && (g = " ");
  let A, t, D, e;
  for (let i = 0; i < I.length - 1; i += 1) {
    const N = I[i];
    if (/^(cmd|meta|m)$/i.test(N))
      e = !0;
    else if (/^a(lt)?$/i.test(N))
      A = !0;
    else if (/^(c|ctrl|control)$/i.test(N))
      t = !0;
    else if (/^s(hift)?$/i.test(N))
      D = !0;
    else if (/^mod$/i.test(N))
      $N() || K4() ? e = !0 : t = !0;
    else
      throw new Error(`Unrecognized modifier name: ${N}`);
  }
  return A && (g = `Alt-${g}`), t && (g = `Ctrl-${g}`), e && (g = `Meta-${g}`), D && (g = `Shift-${g}`), g;
}
const er = (M) => ({ editor: I, view: g, tr: A, dispatch: t }) => {
  const D = Dr(M).split(/-(?!$)/), e = D.find((C) => !["Alt", "Ctrl", "Meta", "Shift"].includes(C)), i = new KeyboardEvent("keydown", {
    key: e === "Space" ? " " : e,
    altKey: D.includes("Alt"),
    ctrlKey: D.includes("Ctrl"),
    metaKey: D.includes("Meta"),
    shiftKey: D.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), N = I.captureTransaction(() => {
    g.someProp("handleKeyDown", (C) => C(g, i));
  });
  return N == null || N.steps.forEach((C) => {
    const u = C.map(A.mapping);
    u && t && A.maybeStep(u);
  }), !0;
};
function re(M, I, g = {}) {
  const { from: A, to: t, empty: D } = M.selection, e = I ? oM(I, M.schema) : null, i = [];
  M.doc.nodesBetween(A, t, (j, n) => {
    if (j.isText)
      return;
    const L = Math.max(A, n), o = Math.min(t, n + j.nodeSize);
    i.push({
      node: j,
      from: L,
      to: o
    });
  });
  const N = t - A, C = i.filter((j) => e ? e.name === j.node.type.name : !0).filter((j) => AN(j.node.attrs, g, { strict: !1 }));
  return D ? !!C.length : C.reduce((j, n) => j + n.to - n.from, 0) >= N;
}
const ir = (M, I = {}) => ({ state: g, dispatch: A }) => {
  const t = oM(M, g.schema);
  return re(g, t, I) ? ix(g, A) : !1;
}, Nr = () => ({ state: M, dispatch: I }) => jx(M, I), Cr = (M) => ({ state: I, dispatch: g }) => {
  const A = oM(M, I.schema);
  return lx(A)(I, g);
}, ur = () => ({ state: M, dispatch: I }) => Nx(M, I);
function qN(M, I) {
  return I.nodes[M] ? "node" : I.marks[M] ? "mark" : null;
}
function Rn(M, I) {
  const g = typeof I == "string" ? [I] : I;
  return Object.keys(M).reduce((A, t) => (g.includes(t) || (A[t] = M[t]), A), {});
}
const jr = (M, I) => ({ tr: g, state: A, dispatch: t }) => {
  let D = null, e = null;
  const i = qN(typeof M == "string" ? M : M.name, A.schema);
  return i ? (i === "node" && (D = oM(M, A.schema)), i === "mark" && (e = vA(M, A.schema)), t && g.selection.ranges.forEach((N) => {
    A.doc.nodesBetween(N.$from.pos, N.$to.pos, (C, u) => {
      D && D === C.type && g.setNodeMarkup(u, void 0, Rn(C.attrs, I)), e && C.marks.length && C.marks.forEach((j) => {
        e === j.type && g.addMark(u, u + C.nodeSize, e.create(Rn(j.attrs, I)));
      });
    });
  }), !0) : !1;
}, nr = () => ({ tr: M, dispatch: I }) => (I && M.scrollIntoView(), !0), Lr = () => ({ tr: M, commands: I }) => I.setTextSelection({
  from: 0,
  to: M.doc.content.size
}), or = () => ({ state: M, dispatch: I }) => tx(M, I), Tr = () => ({ state: M, dispatch: I }) => ex(M, I), sr = () => ({ state: M, dispatch: I }) => nx(M, I), Sr = () => ({ state: M, dispatch: I }) => Tx(M, I), ar = () => ({ state: M, dispatch: I }) => ox(M, I);
function _4(M, I, g = {}) {
  return tN(M, I, { slice: !1, parseOptions: g });
}
const lr = (M, I = !1, g = {}) => ({ tr: A, editor: t, dispatch: D }) => {
  const { doc: e } = A, i = _4(M, t.schema, g);
  return D && A.replaceWith(0, e.content.size, i).setMeta("preventUpdate", !I), !0;
};
function yr(M, I) {
  const g = new ou(M);
  return I.forEach((A) => {
    A.steps.forEach((t) => {
      g.step(t);
    });
  }), g;
}
function cr(M) {
  for (let I = 0; I < M.edgeCount; I += 1) {
    const { type: g } = M.edge(I);
    if (g.isTextblock && !g.hasRequiredAttrs())
      return g;
  }
  return null;
}
function m0(M, I) {
  const g = [];
  return M.descendants((A, t) => {
    I(A) && g.push({
      node: A,
      pos: t
    });
  }), g;
}
function xr(M, I, g) {
  const A = [];
  return M.nodesBetween(I.from, I.to, (t, D) => {
    g(t) && A.push({
      node: t,
      pos: D
    });
  }), A;
}
function $4(M, I) {
  for (let g = M.depth; g > 0; g -= 1) {
    const A = M.node(g);
    if (I(A))
      return {
        pos: g > 0 ? M.before(g) : 0,
        start: M.start(g),
        depth: g,
        node: A
      };
  }
}
function Yu(M) {
  return (I) => $4(I.$from, M);
}
function rr(M, I) {
  const g = Gg.fromSchema(I).serializeFragment(M), t = document.implementation.createHTMLDocument().createElement("div");
  return t.appendChild(g), t.innerHTML;
}
function wr(M, I) {
  const g = {
    from: 0,
    to: M.content.size
  };
  return V4(M, g, I);
}
function pu(M, I) {
  const g = vA(I, M.schema), { from: A, to: t, empty: D } = M.selection, e = [];
  D ? (M.storedMarks && e.push(...M.storedMarks), e.push(...M.selection.$head.marks())) : M.doc.nodesBetween(A, t, (N) => {
    e.push(...N.marks);
  });
  const i = e.find((N) => N.type.name === g.name);
  return i ? { ...i.attrs } : {};
}
function Er(M, I) {
  const g = oM(I, M.schema), { from: A, to: t } = M.selection, D = [];
  M.doc.nodesBetween(A, t, (i) => {
    D.push(i);
  });
  const e = D.reverse().find((i) => i.type.name === g.name);
  return e ? { ...e.attrs } : {};
}
function q4(M, I) {
  const g = qN(typeof I == "string" ? I : I.name, M.schema);
  return g === "node" ? Er(M, I) : g === "mark" ? pu(M, I) : {};
}
function dr(M, I = JSON.stringify) {
  const g = {};
  return M.filter((A) => {
    const t = I(A);
    return Object.prototype.hasOwnProperty.call(g, t) ? !1 : g[t] = !0;
  });
}
function zr(M) {
  const I = dr(M);
  return I.length === 1 ? I : I.filter((g, A) => !I.filter((D, e) => e !== A).some((D) => g.oldRange.from >= D.oldRange.from && g.oldRange.to <= D.oldRange.to && g.newRange.from >= D.newRange.from && g.newRange.to <= D.newRange.to));
}
function mr(M) {
  const { mapping: I, steps: g } = M, A = [];
  return I.maps.forEach((t, D) => {
    const e = [];
    if (t.ranges.length)
      t.forEach((i, N) => {
        e.push({ from: i, to: N });
      });
    else {
      const { from: i, to: N } = g[D];
      if (i === void 0 || N === void 0)
        return;
      e.push({ from: i, to: N });
    }
    e.forEach(({ from: i, to: N }) => {
      const C = I.slice(D).map(i, -1), u = I.slice(D).map(N), j = I.invert().map(C, -1), n = I.invert().map(u);
      A.push({
        oldRange: {
          from: j,
          to: n
        },
        newRange: {
          from: C,
          to: u
        }
      });
    });
  }), zr(A);
}
function DN(M, I, g) {
  const A = [];
  return M === I ? g.resolve(M).marks().forEach((t) => {
    const D = g.resolve(M - 1), e = mu(D, t.type);
    !e || A.push({
      mark: t,
      ...e
    });
  }) : g.nodesBetween(M, I, (t, D) => {
    A.push(...t.marks.map((e) => ({
      from: D,
      to: D + t.nodeSize,
      mark: e
    })));
  }), A;
}
function b0(M, I, g = {}) {
  const { empty: A, ranges: t } = M.selection, D = I ? vA(I, M.schema) : null;
  if (A)
    return !!(M.storedMarks || M.selection.$from.marks()).filter((j) => D ? D.name === j.type.name : !0).find((j) => AN(j.attrs, g, { strict: !1 }));
  let e = 0;
  const i = [];
  if (t.forEach(({ $from: j, $to: n }) => {
    const L = j.pos, o = n.pos;
    M.doc.nodesBetween(L, o, (T, s) => {
      if (!T.isText && !T.marks.length)
        return;
      const S = Math.max(L, s), y = Math.min(o, s + T.nodeSize);
      e += y - S, i.push(...T.marks.map((a) => ({
        mark: a,
        from: S,
        to: y
      })));
    });
  }), e === 0)
    return !1;
  const N = i.filter((j) => D ? D.name === j.mark.type.name : !0).filter((j) => AN(j.mark.attrs, g, { strict: !1 })).reduce((j, n) => j + n.to - n.from, 0), C = i.filter((j) => D ? j.mark.type !== D && j.mark.type.excludes(D) : !0).reduce((j, n) => j + n.to - n.from, 0);
  return (N > 0 ? N + C : N) >= e;
}
function br(M, I, g = {}) {
  if (!I)
    return re(M, null, g) || b0(M, null, g);
  const A = qN(I, M.schema);
  return A === "node" ? re(M, I, g) : A === "mark" ? b0(M, I, g) : !1;
}
function Hn(M, I) {
  const { nodeExtensions: g } = KN(I), A = g.find((e) => e.name === M);
  if (!A)
    return !1;
  const t = {
    name: A.name,
    options: A.options,
    storage: A.storage
  }, D = lI(AI(A, "group", t));
  return typeof D != "string" ? !1 : D.split(" ").includes("list");
}
function Yr(M) {
  var I;
  const g = (I = M.type.createAndFill()) === null || I === void 0 ? void 0 : I.toJSON(), A = M.toJSON();
  return JSON.stringify(g) === JSON.stringify(A);
}
function pr(M) {
  return M instanceof CI;
}
function Is(M, I, g) {
  const t = M.state.doc.content.size, D = MA(I, 0, t), e = MA(g, 0, t), i = M.coordsAtPos(D), N = M.coordsAtPos(e, -1), C = Math.min(i.top, N.top), u = Math.max(i.bottom, N.bottom), j = Math.min(i.left, N.left), n = Math.max(i.right, N.right), L = n - j, o = u - C, S = {
    top: C,
    bottom: u,
    left: j,
    right: n,
    width: L,
    height: o,
    x: j,
    y: C
  };
  return {
    ...S,
    toJSON: () => S
  };
}
function Qr(M, I, g) {
  var A;
  const { selection: t } = I;
  let D = null;
  if (bu(t) && (D = t.$cursor), D) {
    const i = (A = M.storedMarks) !== null && A !== void 0 ? A : D.marks();
    return !!g.isInSet(i) || !i.some((N) => N.type.excludes(g));
  }
  const { ranges: e } = t;
  return e.some(({ $from: i, $to: N }) => {
    let C = i.depth === 0 ? M.doc.inlineContent && M.doc.type.allowsMarkType(g) : !1;
    return M.doc.nodesBetween(i.pos, N.pos, (u, j, n) => {
      if (C)
        return !1;
      if (u.isInline) {
        const L = !n || n.type.allowsMarkType(g), o = !!g.isInSet(u.marks) || !u.marks.some((T) => T.type.excludes(g));
        C = L && o;
      }
      return !C;
    }), C;
  });
}
const hr = (M, I = {}) => ({ tr: g, state: A, dispatch: t }) => {
  const { selection: D } = g, { empty: e, ranges: i } = D, N = vA(M, A.schema);
  if (t)
    if (e) {
      const C = pu(A, N);
      g.addStoredMark(N.create({
        ...C,
        ...I
      }));
    } else
      i.forEach((C) => {
        const u = C.$from.pos, j = C.$to.pos;
        A.doc.nodesBetween(u, j, (n, L) => {
          const o = Math.max(L, u), T = Math.min(L + n.nodeSize, j);
          n.marks.find((S) => S.type === N) ? n.marks.forEach((S) => {
            N === S.type && g.addMark(o, T, N.create({
              ...S.attrs,
              ...I
            }));
          }) : g.addMark(o, T, N.create(I));
        });
      });
  return Qr(A, g, N);
}, Or = (M, I) => ({ tr: g }) => (g.setMeta(M, I), !0), kr = (M, I = {}) => ({ state: g, dispatch: A, chain: t }) => {
  const D = oM(M, g.schema);
  return D.isTextblock ? t().command(({ commands: e }) => Zn(D, I)(g) ? !0 : e.clearNodes()).command(({ state: e }) => Zn(D, I)(e, A)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Pr = (M) => ({ tr: I, dispatch: g }) => {
  if (g) {
    const { doc: A } = I, t = MA(M, 0, A.content.size), D = CI.create(A, t);
    I.setSelection(D);
  }
  return !0;
}, fr = (M) => ({ tr: I, dispatch: g }) => {
  if (g) {
    const { doc: A } = I, { from: t, to: D } = typeof M == "number" ? { from: M, to: M } : M, e = LI.atStart(A).from, i = LI.atEnd(A).to, N = MA(t, e, i), C = MA(D, e, i), u = LI.create(A, N, C);
    I.setSelection(u);
  }
  return !0;
}, Gr = (M) => ({ state: I, dispatch: g }) => {
  const A = oM(M, I.schema);
  return xx(A)(I, g);
};
function pi(M, I, g) {
  return Object.fromEntries(Object.entries(g).filter(([A]) => {
    const t = M.find((D) => D.type === I && D.name === A);
    return t ? t.attribute.keepOnSplit : !1;
  }));
}
function Vn(M, I) {
  const g = M.storedMarks || M.selection.$to.parentOffset && M.selection.$from.marks();
  if (g) {
    const A = g.filter((t) => I == null ? void 0 : I.includes(t.type.name));
    M.tr.ensureMarks(A);
  }
}
const Wr = ({ keepMarks: M = !0 } = {}) => ({ tr: I, state: g, dispatch: A, editor: t }) => {
  const { selection: D, doc: e } = I, { $from: i, $to: N } = D, C = t.extensionManager.attributes, u = pi(C, i.node().type.name, i.node().attrs);
  if (D instanceof CI && D.node.isBlock)
    return !i.parentOffset || !tD(e, i.pos) ? !1 : (A && (M && Vn(g, t.extensionManager.splittableMarks), I.split(i.pos).scrollIntoView()), !0);
  if (!i.parent.isBlock)
    return !1;
  if (A) {
    const j = N.parentOffset === N.parent.content.size;
    D instanceof LI && I.deleteSelection();
    const n = i.depth === 0 ? void 0 : cr(i.node(-1).contentMatchAt(i.indexAfter(-1)));
    let L = j && n ? [{
      type: n,
      attrs: u
    }] : void 0, o = tD(I.doc, I.mapping.map(i.pos), 1, L);
    if (!L && !o && tD(I.doc, I.mapping.map(i.pos), 1, n ? [{ type: n }] : void 0) && (o = !0, L = n ? [{
      type: n,
      attrs: u
    }] : void 0), o && (I.split(I.mapping.map(i.pos), 1, L), n && !j && !i.parentOffset && i.parent.type !== n)) {
      const T = I.mapping.map(i.before()), s = I.doc.resolve(T);
      i.node(-1).canReplaceWith(s.index(), s.index() + 1, n) && I.setNodeMarkup(I.mapping.map(i.before()), n);
    }
    M && Vn(g, t.extensionManager.splittableMarks), I.scrollIntoView();
  }
  return !0;
}, Zr = (M) => ({ tr: I, state: g, dispatch: A, editor: t }) => {
  var D;
  const e = oM(M, g.schema), { $from: i, $to: N } = g.selection, C = g.selection.node;
  if (C && C.isBlock || i.depth < 2 || !i.sameParent(N))
    return !1;
  const u = i.node(-1);
  if (u.type !== e)
    return !1;
  const j = t.extensionManager.attributes;
  if (i.parent.content.size === 0 && i.node(-1).childCount === i.indexAfter(-1)) {
    if (i.depth === 2 || i.node(-3).type !== e || i.index(-2) !== i.node(-2).childCount - 1)
      return !1;
    if (A) {
      let s = G.empty;
      const S = i.index(-1) ? 1 : i.index(-2) ? 2 : 3;
      for (let E = i.depth - S; E >= i.depth - 3; E -= 1)
        s = G.from(i.node(E).copy(s));
      const y = i.indexAfter(-1) < i.node(-2).childCount ? 1 : i.indexAfter(-2) < i.node(-3).childCount ? 2 : 3, x = pi(j, i.node().type.name, i.node().attrs), a = ((D = e.contentMatch.defaultType) === null || D === void 0 ? void 0 : D.createAndFill(x)) || void 0;
      s = s.append(G.from(e.createAndFill(null, a) || void 0));
      const z = i.before(i.depth - (S - 1));
      I.replace(z, i.after(-y), new K(s, 4 - S, 0));
      let c = -1;
      I.doc.nodesBetween(z, I.doc.content.size, (E, m) => {
        if (c > -1)
          return !1;
        E.isTextblock && E.content.size === 0 && (c = m + 1);
      }), c > -1 && I.setSelection(LI.near(I.doc.resolve(c))), I.scrollIntoView();
    }
    return !0;
  }
  const n = N.pos === i.end() ? u.contentMatchAt(0).defaultType : null, L = pi(j, u.type.name, u.attrs), o = pi(j, i.node().type.name, i.node().attrs);
  I.delete(i.pos, N.pos);
  const T = n ? [{ type: e, attrs: L }, { type: n, attrs: o }] : [{ type: e, attrs: L }];
  return tD(I.doc, i.pos, 2) ? (A && I.split(i.pos, 2, T).scrollIntoView(), !0) : !1;
}, Fn = (M, I) => {
  const g = Yu((e) => e.type === I)(M.selection);
  if (!g)
    return !0;
  const A = M.doc.resolve(Math.max(0, g.pos - 1)).before(g.depth);
  if (A === void 0)
    return !0;
  const t = M.doc.nodeAt(A);
  return g.node.type === (t == null ? void 0 : t.type) && OD(M.doc, g.pos) && M.join(g.pos), !0;
}, Xn = (M, I) => {
  const g = Yu((e) => e.type === I)(M.selection);
  if (!g)
    return !0;
  const A = M.doc.resolve(g.start).after(g.depth);
  if (A === void 0)
    return !0;
  const t = M.doc.nodeAt(A);
  return g.node.type === (t == null ? void 0 : t.type) && OD(M.doc, A) && M.join(A), !0;
}, vr = (M, I) => ({ editor: g, tr: A, state: t, dispatch: D, chain: e, commands: i, can: N }) => {
  const { extensions: C } = g.extensionManager, u = oM(M, t.schema), j = oM(I, t.schema), { selection: n } = t, { $from: L, $to: o } = n, T = L.blockRange(o);
  if (!T)
    return !1;
  const s = Yu((S) => Hn(S.type.name, C))(n);
  if (T.depth >= 1 && s && T.depth - s.depth <= 1) {
    if (s.node.type === u)
      return i.liftListItem(j);
    if (Hn(s.node.type.name, C) && u.validContent(s.node.content) && D)
      return e().command(() => (A.setNodeMarkup(s.pos, u), !0)).command(() => Fn(A, u)).command(() => Xn(A, u)).run();
  }
  return e().command(() => N().wrapInList(u) ? !0 : i.clearNodes()).wrapInList(u).command(() => Fn(A, u)).command(() => Xn(A, u)).run();
}, Ur = (M, I = {}, g = {}) => ({ state: A, commands: t }) => {
  const { extendEmptyMarkRange: D = !1 } = g, e = vA(M, A.schema);
  return b0(A, e, I) ? t.unsetMark(e, { extendEmptyMarkRange: D }) : t.setMark(e, I);
}, Jr = (M, I, g = {}) => ({ state: A, commands: t }) => {
  const D = oM(M, A.schema), e = oM(I, A.schema);
  return re(A, D, g) ? t.setNode(e) : t.setNode(D, g);
}, Br = (M, I = {}) => ({ state: g, commands: A }) => {
  const t = oM(M, g.schema);
  return re(g, t, I) ? A.lift(t) : A.wrapIn(t, I);
}, Rr = () => ({ state: M, dispatch: I }) => {
  const g = M.plugins;
  for (let A = 0; A < g.length; A += 1) {
    const t = g[A];
    let D;
    if (t.spec.isInputRules && (D = t.getState(M))) {
      if (I) {
        const e = M.tr, i = D.transform;
        for (let N = i.steps.length - 1; N >= 0; N -= 1)
          e.step(i.steps[N].invert(i.docs[N]));
        if (D.text) {
          const N = e.doc.resolve(D.from).marks();
          e.replaceWith(D.from, D.to, M.schema.text(D.text, N));
        } else
          e.delete(D.from, D.to);
      }
      return !0;
    }
  }
  return !1;
}, Hr = () => ({ tr: M, dispatch: I }) => {
  const { selection: g } = M, { empty: A, ranges: t } = g;
  return A || I && t.forEach((D) => {
    M.removeMark(D.$from.pos, D.$to.pos);
  }), !0;
}, Vr = (M, I = {}) => ({ tr: g, state: A, dispatch: t }) => {
  var D;
  const { extendEmptyMarkRange: e = !1 } = I, { selection: i } = g, N = vA(M, A.schema), { $from: C, empty: u, ranges: j } = i;
  if (!t)
    return !0;
  if (u && e) {
    let { from: n, to: L } = i;
    const o = (D = C.marks().find((s) => s.type === N)) === null || D === void 0 ? void 0 : D.attrs, T = mu(C, N, o);
    T && (n = T.from, L = T.to), g.removeMark(n, L, N);
  } else
    j.forEach((n) => {
      g.removeMark(n.$from.pos, n.$to.pos, N);
    });
  return g.removeStoredMark(N), !0;
}, Fr = (M, I = {}) => ({ tr: g, state: A, dispatch: t }) => {
  let D = null, e = null;
  const i = qN(typeof M == "string" ? M : M.name, A.schema);
  return i ? (i === "node" && (D = oM(M, A.schema)), i === "mark" && (e = vA(M, A.schema)), t && g.selection.ranges.forEach((N) => {
    const C = N.$from.pos, u = N.$to.pos;
    A.doc.nodesBetween(C, u, (j, n) => {
      D && D === j.type && g.setNodeMarkup(n, void 0, {
        ...j.attrs,
        ...I
      }), e && j.marks.length && j.marks.forEach((L) => {
        if (e === L.type) {
          const o = Math.max(n, C), T = Math.min(n + j.nodeSize, u);
          g.addMark(o, T, e.create({
            ...L.attrs,
            ...I
          }));
        }
      });
    });
  }), !0) : !1;
}, Xr = (M, I = {}) => ({ state: g, dispatch: A }) => {
  const t = oM(M, g.schema);
  return sx(t, I)(g, A);
}, Kr = (M, I = {}) => ({ state: g, dispatch: A }) => {
  const t = oM(M, g.schema);
  return Sx(t, I)(g, A);
};
var _r = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: Gx,
  clearContent: Wx,
  clearNodes: Zx,
  command: vx,
  createParagraphNear: Ux,
  deleteNode: Jx,
  deleteRange: Bx,
  deleteSelection: Rx,
  enter: Hx,
  exitCode: Vx,
  extendMarkRange: Xx,
  first: Kx,
  focus: _x,
  forEach: $x,
  insertContent: qx,
  insertContentAt: gr,
  joinBackward: Ar,
  joinForward: tr,
  keyboardShortcut: er,
  lift: ir,
  liftEmptyBlock: Nr,
  liftListItem: Cr,
  newlineInCode: ur,
  resetAttributes: jr,
  scrollIntoView: nr,
  selectAll: Lr,
  selectNodeBackward: or,
  selectNodeForward: Tr,
  selectParentNode: sr,
  selectTextblockEnd: Sr,
  selectTextblockStart: ar,
  setContent: lr,
  setMark: hr,
  setMeta: Or,
  setNode: kr,
  setNodeSelection: Pr,
  setTextSelection: fr,
  sinkListItem: Gr,
  splitBlock: Wr,
  splitListItem: Zr,
  toggleList: vr,
  toggleMark: Ur,
  toggleNode: Jr,
  toggleWrap: Br,
  undoInputRule: Rr,
  unsetAllMarks: Hr,
  unsetMark: Vr,
  updateAttributes: Fr,
  wrapIn: Xr,
  wrapInList: Kr
});
const $r = tM.create({
  name: "commands",
  addCommands() {
    return {
      ..._r
    };
  }
}), qr = tM.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new XI({
        key: new TM("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), Iw = tM.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: M } = this;
    return [
      new XI({
        key: new TM("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (I, g) => {
              M.isFocused = !0;
              const A = M.state.tr.setMeta("focus", { event: g }).setMeta("addToHistory", !1);
              return I.dispatch(A), !1;
            },
            blur: (I, g) => {
              M.isFocused = !1;
              const A = M.state.tr.setMeta("blur", { event: g }).setMeta("addToHistory", !1);
              return I.dispatch(A), !1;
            }
          }
        }
      })
    ];
  }
}), Mw = tM.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const M = () => this.editor.commands.first(({ commands: e }) => [
      () => e.undoInputRule(),
      () => e.command(({ tr: i }) => {
        const { selection: N, doc: C } = i, { empty: u, $anchor: j } = N, { pos: n, parent: L } = j, o = uI.atStart(C).from === n;
        return !u || !o || !L.type.isTextblock || L.textContent.length ? !1 : e.clearNodes();
      }),
      () => e.deleteSelection(),
      () => e.joinBackward(),
      () => e.selectNodeBackward()
    ]), I = () => this.editor.commands.first(({ commands: e }) => [
      () => e.deleteSelection(),
      () => e.joinForward(),
      () => e.selectNodeForward()
    ]), A = {
      Enter: () => this.editor.commands.first(({ commands: e }) => [
        () => e.newlineInCode(),
        () => e.createParagraphNear(),
        () => e.liftEmptyBlock(),
        () => e.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: M,
      "Mod-Backspace": M,
      "Shift-Backspace": M,
      Delete: I,
      "Mod-Delete": I,
      "Mod-a": () => this.editor.commands.selectAll()
    }, t = {
      ...A
    }, D = {
      ...A,
      "Ctrl-h": M,
      "Alt-Backspace": M,
      "Ctrl-d": I,
      "Ctrl-Alt-Backspace": I,
      "Alt-Delete": I,
      "Alt-d": I,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return $N() || K4() ? D : t;
  },
  addProseMirrorPlugins() {
    return [
      new XI({
        key: new TM("clearDocument"),
        appendTransaction: (M, I, g) => {
          if (!(M.some((o) => o.docChanged) && !I.doc.eq(g.doc)))
            return;
          const { empty: t, from: D, to: e } = I.selection, i = uI.atStart(I.doc).from, N = uI.atEnd(I.doc).to, C = D === i && e === N, u = g.doc.textBetween(0, g.doc.content.size, " ", " ").length === 0;
          if (t || !C || !u)
            return;
          const j = g.tr, n = FN({
            state: g,
            transaction: j
          }), { commands: L } = new XN({
            editor: this.editor,
            state: n
          });
          if (L.clearNodes(), !!j.steps.length)
            return j;
        }
      })
    ];
  }
}), gw = tM.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new XI({
        key: new TM("tabindex"),
        props: {
          attributes: this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
var Aw = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ClipboardTextSerializer: fx,
  Commands: $r,
  Editable: qr,
  FocusEvents: Iw,
  Keymap: Mw,
  Tabindex: gw
});
const tw = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 1px !important;
  height: 1px !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function Dw(M, I) {
  const g = document.querySelector("style[data-tiptap-style]");
  if (g !== null)
    return g;
  const A = document.createElement("style");
  return I && A.setAttribute("nonce", I), A.setAttribute("data-tiptap-style", ""), A.innerHTML = M, document.getElementsByTagName("head")[0].appendChild(A), A;
}
class ew extends rx {
  constructor(I = {}) {
    super(), this.isFocused = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(I), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }));
    }, 0);
  }
  get storage() {
    return this.extensionStorage;
  }
  get commands() {
    return this.commandManager.commands;
  }
  chain() {
    return this.commandManager.chain();
  }
  can() {
    return this.commandManager.can();
  }
  injectCSS() {
    this.options.injectCSS && document && (this.css = Dw(tw, this.options.injectNonce));
  }
  setOptions(I = {}) {
    this.options = {
      ...this.options,
      ...I
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  setEditable(I) {
    this.setOptions({ editable: I }), this.emit("update", { editor: this, transaction: this.state.tr });
  }
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  get state() {
    return this.view.state;
  }
  registerPlugin(I, g) {
    const A = H4(g) ? g(I, [...this.state.plugins]) : [...this.state.plugins, I], t = this.state.reconfigure({ plugins: A });
    this.view.updateState(t);
  }
  unregisterPlugin(I) {
    if (this.isDestroyed)
      return;
    const g = typeof I == "string" ? `${I}$` : I.key, A = this.state.reconfigure({
      plugins: this.state.plugins.filter((t) => !t.key.startsWith(g))
    });
    this.view.updateState(A);
  }
  createExtensionManager() {
    const g = [...this.options.enableCoreExtensions ? Object.values(Aw) : [], ...this.options.extensions].filter((A) => ["extension", "node", "mark"].includes(A == null ? void 0 : A.type));
    this.extensionManager = new Ft(g, this);
  }
  createCommandManager() {
    this.commandManager = new XN({
      editor: this
    });
  }
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  createView() {
    const I = _4(this.options.content, this.schema, this.options.parseOptions), g = X4(I, this.options.autofocus);
    this.view = new Rc(this.options.element, {
      ...this.options.editorProps,
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: Rt.create({
        doc: I,
        selection: g || void 0
      })
    });
    const A = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(A), this.createNodeViews();
    const t = this.view.dom;
    t.editor = this;
  }
  createNodeViews() {
    this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  captureTransaction(I) {
    this.isCapturingTransaction = !0, I(), this.isCapturingTransaction = !1;
    const g = this.capturedTransaction;
    return this.capturedTransaction = null, g;
  }
  dispatchTransaction(I) {
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = I;
        return;
      }
      I.steps.forEach((e) => {
        var i;
        return (i = this.capturedTransaction) === null || i === void 0 ? void 0 : i.step(e);
      });
      return;
    }
    const g = this.state.apply(I), A = !this.state.selection.eq(g.selection);
    this.view.updateState(g), this.emit("transaction", {
      editor: this,
      transaction: I
    }), A && this.emit("selectionUpdate", {
      editor: this,
      transaction: I
    });
    const t = I.getMeta("focus"), D = I.getMeta("blur");
    t && this.emit("focus", {
      editor: this,
      event: t.event,
      transaction: I
    }), D && this.emit("blur", {
      editor: this,
      event: D.event,
      transaction: I
    }), !(!I.docChanged || I.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: I
    });
  }
  getAttributes(I) {
    return q4(this.state, I);
  }
  isActive(I, g) {
    const A = typeof I == "string" ? I : null, t = typeof I == "string" ? g : I;
    return br(this.state, A, t);
  }
  getJSON() {
    return this.state.doc.toJSON();
  }
  getHTML() {
    return rr(this.state.doc.content, this.schema);
  }
  getText(I) {
    const { blockSeparator: g = `

`, textSerializers: A = {} } = I || {};
    return wr(this.state.doc, {
      blockSeparator: g,
      textSerializers: {
        ...A,
        ...F4(this.schema)
      }
    });
  }
  get isEmpty() {
    return Yr(this.state.doc);
  }
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  destroy() {
    this.emit("destroy"), this.view && this.view.destroy(), this.removeAllListeners();
  }
  get isDestroyed() {
    var I;
    return !(!((I = this.view) === null || I === void 0) && I.docView);
  }
}
function lt(M) {
  return new Ke({
    find: M.find,
    handler: ({ state: I, range: g, match: A }) => {
      const t = lI(M.getAttributes, void 0, A);
      if (t === !1 || t === null)
        return null;
      const { tr: D } = I, e = A[A.length - 1], i = A[0];
      let N = g.to;
      if (e) {
        const C = i.search(/\S/), u = g.from + i.indexOf(e), j = u + e.length;
        if (DN(g.from, g.to, I.doc).filter((L) => L.mark.type.excluded.find((T) => T === M.type && T !== L.mark.type)).filter((L) => L.to > u).length)
          return null;
        j < g.to && D.delete(j, g.to), u > g.from && D.delete(g.from + C, u), N = g.from + C + e.length, D.addMark(g.from + C, N, M.type.create(t || {})), D.removeStoredMark(M.type);
      }
    }
  });
}
function Ms(M) {
  return new Ke({
    find: M.find,
    handler: ({ state: I, range: g, match: A }) => {
      const t = lI(M.getAttributes, void 0, A) || {}, { tr: D } = I, e = g.from;
      let i = g.to;
      if (A[1]) {
        const N = A[0].lastIndexOf(A[1]);
        let C = e + N;
        C > i ? C = i : i = C + A[1].length;
        const u = A[0][A[0].length - 1];
        D.insertText(u, e + A[0].length - 1), D.replaceWith(C, i, M.type.create(t));
      } else
        A[0] && D.replaceWith(e, i, M.type.create(t));
    }
  });
}
function Y0(M) {
  return new Ke({
    find: M.find,
    handler: ({ state: I, range: g, match: A }) => {
      const t = I.doc.resolve(g.from), D = lI(M.getAttributes, void 0, A) || {};
      if (!t.node(-1).canReplaceWith(t.index(-1), t.indexAfter(-1), M.type))
        return null;
      I.tr.delete(g.from, g.to).setBlockType(g.from, g.from, M.type, D);
    }
  });
}
function MM(M) {
  return new Ke({
    find: M.find,
    handler: ({ state: I, range: g, match: A }) => {
      let t = M.replace, D = g.from;
      const e = g.to;
      if (A[1]) {
        const i = A[0].lastIndexOf(A[1]);
        t += A[0].slice(i + A[1].length), D += i;
        const N = D - e;
        N > 0 && (t = A[0].slice(i - N, i) + t, D = e);
      }
      I.tr.insertText(t, D, e);
    }
  });
}
function IC(M) {
  return new Ke({
    find: M.find,
    handler: ({ state: I, range: g, match: A }) => {
      const t = lI(M.getAttributes, void 0, A) || {}, D = I.tr.delete(g.from, g.to), i = D.doc.resolve(g.from).blockRange(), N = i && nu(i, M.type, t);
      if (!N)
        return null;
      D.wrap(i, N);
      const C = D.doc.resolve(g.from - 1).nodeBefore;
      C && C.type === M.type && OD(D.doc, g.from - 1) && (!M.joinPredicate || M.joinPredicate(A, C)) && D.join(g.from - 1);
    }
  });
}
class zg {
  constructor(I = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...I
    }, this.name = this.config.name, I.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = lI(AI(this, "addOptions", {
      name: this.name
    }))), this.storage = lI(AI(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(I = {}) {
    return new zg(I);
  }
  configure(I = {}) {
    const g = this.extend();
    return g.options = _N(this.options, I), g.storage = lI(AI(g, "addStorage", {
      name: g.name,
      options: g.options
    })), g;
  }
  extend(I = {}) {
    const g = new zg(I);
    return g.parent = this, this.child = g, g.name = I.name ? I.name : g.parent.name, I.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${g.name}".`), g.options = lI(AI(g, "addOptions", {
      name: g.name
    })), g.storage = lI(AI(g, "addStorage", {
      name: g.name,
      options: g.options
    })), g;
  }
  static handleExit({ editor: I, mark: g }) {
    const { tr: A } = I.state, t = I.state.selection.$from;
    if (t.pos === t.end()) {
      const e = t.marks();
      if (!!!e.find((C) => (C == null ? void 0 : C.type.name) === g.name))
        return !1;
      const N = e.find((C) => (C == null ? void 0 : C.type.name) === g.name);
      return N && A.removeStoredMark(N), A.insertText(" ", t.pos), I.view.dispatch(A), !0;
    }
    return !1;
  }
}
class JI {
  constructor(I = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...I
    }, this.name = this.config.name, I.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = lI(AI(this, "addOptions", {
      name: this.name
    }))), this.storage = lI(AI(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(I = {}) {
    return new JI(I);
  }
  configure(I = {}) {
    const g = this.extend();
    return g.options = _N(this.options, I), g.storage = lI(AI(g, "addStorage", {
      name: g.name,
      options: g.options
    })), g;
  }
  extend(I = {}) {
    const g = new JI(I);
    return g.parent = this, this.child = g, g.name = I.name ? I.name : g.parent.name, I.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${g.name}".`), g.options = lI(AI(g, "addOptions", {
      name: g.name
    })), g.storage = lI(AI(g, "addStorage", {
      name: g.name,
      options: g.options
    })), g;
  }
}
class iw {
  constructor(I, g, A) {
    this.isDragging = !1, this.component = I, this.editor = g.editor, this.options = {
      stopEvent: null,
      ignoreMutation: null,
      ...A
    }, this.extension = g.extension, this.node = g.node, this.decorations = g.decorations, this.getPos = g.getPos, this.mount();
  }
  mount() {
  }
  get dom() {
    return this.editor.view.dom;
  }
  get contentDOM() {
    return null;
  }
  onDragStart(I) {
    var g, A, t, D, e, i, N;
    const { view: C } = this.editor, u = I.target, j = u.nodeType === 3 ? (g = u.parentElement) === null || g === void 0 ? void 0 : g.closest("[data-drag-handle]") : u.closest("[data-drag-handle]");
    if (!this.dom || ((A = this.contentDOM) === null || A === void 0 ? void 0 : A.contains(u)) || !j)
      return;
    let n = 0, L = 0;
    if (this.dom !== j) {
      const s = this.dom.getBoundingClientRect(), S = j.getBoundingClientRect(), y = (t = I.offsetX) !== null && t !== void 0 ? t : (D = I.nativeEvent) === null || D === void 0 ? void 0 : D.offsetX, x = (e = I.offsetY) !== null && e !== void 0 ? e : (i = I.nativeEvent) === null || i === void 0 ? void 0 : i.offsetY;
      n = S.x - s.x + y, L = S.y - s.y + x;
    }
    (N = I.dataTransfer) === null || N === void 0 || N.setDragImage(this.dom, n, L);
    const o = CI.create(C.state.doc, this.getPos()), T = C.state.tr.setSelection(o);
    C.dispatch(T);
  }
  stopEvent(I) {
    var g;
    if (!this.dom)
      return !1;
    if (typeof this.options.stopEvent == "function")
      return this.options.stopEvent({ event: I });
    const A = I.target;
    if (!(this.dom.contains(A) && !(!((g = this.contentDOM) === null || g === void 0) && g.contains(A))))
      return !1;
    const D = I.type === "drop";
    if ((["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(A.tagName) || A.isContentEditable) && !D)
      return !0;
    const { isEditable: i } = this.editor, { isDragging: N } = this, C = !!this.node.type.spec.draggable, u = CI.isSelectable(this.node), j = I.type === "copy", n = I.type === "paste", L = I.type === "cut", o = I.type === "mousedown", T = I.type.startsWith("drag");
    if (!C && u && T && I.preventDefault(), C && T && !N)
      return I.preventDefault(), !1;
    if (C && i && !N && o) {
      const s = A.closest("[data-drag-handle]");
      s && (this.dom === s || this.dom.contains(s)) && (this.isDragging = !0, document.addEventListener("dragend", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("mouseup", () => {
        this.isDragging = !1;
      }, { once: !0 }));
    }
    return !(N || D || j || n || L || o && u);
  }
  ignoreMutation(I) {
    return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({ mutation: I }) : this.node.isLeaf || this.node.isAtom ? !0 : I.type === "selection" || this.dom.contains(I.target) && I.type === "childList" && $N() && this.editor.isFocused && [
      ...Array.from(I.addedNodes),
      ...Array.from(I.removedNodes)
    ].every((A) => A.isContentEditable) ? !1 : this.contentDOM === I.target && I.type === "attributes" ? !0 : !this.contentDOM.contains(I.target);
  }
  updateAttributes(I) {
    this.editor.commands.command(({ tr: g }) => {
      const A = this.getPos();
      return g.setNodeMarkup(A, void 0, {
        ...this.node.attrs,
        ...I
      }), !0;
    });
  }
  deleteNode() {
    const I = this.getPos(), g = I + this.node.nodeSize;
    this.editor.commands.deleteRange({ from: I, to: g });
  }
}
function GA(M) {
  return new px({
    find: M.find,
    handler: ({ state: I, range: g, match: A }) => {
      const t = lI(M.getAttributes, void 0, A);
      if (t === !1 || t === null)
        return null;
      const { tr: D } = I, e = A[A.length - 1], i = A[0];
      let N = g.to;
      if (e) {
        const C = i.search(/\S/), u = g.from + i.indexOf(e), j = u + e.length;
        if (DN(g.from, g.to, I.doc).filter((L) => L.mark.type.excluded.find((T) => T === M.type && T !== L.mark.type)).filter((L) => L.to > u).length)
          return null;
        j < g.to && D.delete(j, g.to), u > g.from && D.delete(g.from + C, u), N = g.from + C + e.length, D.addMark(g.from + C, N, M.type.create(t || {})), D.removeStoredMark(M.type);
      }
    }
  });
}
var ZM = "top", Cg = "bottom", ug = "right", vM = "left", MC = "auto", _e = [ZM, Cg, ug, vM], sD = "start", we = "end", Nw = "clippingParents", gs = "viewport", UD = "popper", Cw = "reference", Kn = /* @__PURE__ */ _e.reduce(function(M, I) {
  return M.concat([I + "-" + sD, I + "-" + we]);
}, []), As = /* @__PURE__ */ [].concat(_e, [MC]).reduce(function(M, I) {
  return M.concat([I, I + "-" + sD, I + "-" + we]);
}, []), uw = "beforeRead", jw = "read", nw = "afterRead", Lw = "beforeMain", ow = "main", Tw = "afterMain", sw = "beforeWrite", Sw = "write", aw = "afterWrite", p0 = [uw, jw, nw, Lw, ow, Tw, sw, Sw, aw];
function Rg(M) {
  return M ? (M.nodeName || "").toLowerCase() : null;
}
function og(M) {
  if (M == null)
    return window;
  if (M.toString() !== "[object Window]") {
    var I = M.ownerDocument;
    return I && I.defaultView || window;
  }
  return M;
}
function yt(M) {
  var I = og(M).Element;
  return M instanceof I || M instanceof Element;
}
function Ig(M) {
  var I = og(M).HTMLElement;
  return M instanceof I || M instanceof HTMLElement;
}
function Qu(M) {
  if (typeof ShadowRoot > "u")
    return !1;
  var I = og(M).ShadowRoot;
  return M instanceof I || M instanceof ShadowRoot;
}
function lw(M) {
  var I = M.state;
  Object.keys(I.elements).forEach(function(g) {
    var A = I.styles[g] || {}, t = I.attributes[g] || {}, D = I.elements[g];
    !Ig(D) || !Rg(D) || (Object.assign(D.style, A), Object.keys(t).forEach(function(e) {
      var i = t[e];
      i === !1 ? D.removeAttribute(e) : D.setAttribute(e, i === !0 ? "" : i);
    }));
  });
}
function yw(M) {
  var I = M.state, g = {
    popper: {
      position: I.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(I.elements.popper.style, g.popper), I.styles = g, I.elements.arrow && Object.assign(I.elements.arrow.style, g.arrow), function() {
    Object.keys(I.elements).forEach(function(A) {
      var t = I.elements[A], D = I.attributes[A] || {}, e = Object.keys(I.styles.hasOwnProperty(A) ? I.styles[A] : g[A]), i = e.reduce(function(N, C) {
        return N[C] = "", N;
      }, {});
      !Ig(t) || !Rg(t) || (Object.assign(t.style, i), Object.keys(D).forEach(function(N) {
        t.removeAttribute(N);
      }));
    });
  };
}
const ts = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: lw,
  effect: yw,
  requires: ["computeStyles"]
};
function Eg(M) {
  return M.split("-")[0];
}
var ut = Math.max, eN = Math.min, SD = Math.round;
function Q0() {
  var M = navigator.userAgentData;
  return M != null && M.brands ? M.brands.map(function(I) {
    return I.brand + "/" + I.version;
  }).join(" ") : navigator.userAgent;
}
function Ds() {
  return !/^((?!chrome|android).)*safari/i.test(Q0());
}
function aD(M, I, g) {
  I === void 0 && (I = !1), g === void 0 && (g = !1);
  var A = M.getBoundingClientRect(), t = 1, D = 1;
  I && Ig(M) && (t = M.offsetWidth > 0 && SD(A.width) / M.offsetWidth || 1, D = M.offsetHeight > 0 && SD(A.height) / M.offsetHeight || 1);
  var e = yt(M) ? og(M) : window, i = e.visualViewport, N = !Ds() && g, C = (A.left + (N && i ? i.offsetLeft : 0)) / t, u = (A.top + (N && i ? i.offsetTop : 0)) / D, j = A.width / t, n = A.height / D;
  return {
    width: j,
    height: n,
    top: u,
    right: C + j,
    bottom: u + n,
    left: C,
    x: C,
    y: u
  };
}
function hu(M) {
  var I = aD(M), g = M.offsetWidth, A = M.offsetHeight;
  return Math.abs(I.width - g) <= 1 && (g = I.width), Math.abs(I.height - A) <= 1 && (A = I.height), {
    x: M.offsetLeft,
    y: M.offsetTop,
    width: g,
    height: A
  };
}
function es(M, I) {
  var g = I.getRootNode && I.getRootNode();
  if (M.contains(I))
    return !0;
  if (g && Qu(g)) {
    var A = I;
    do {
      if (A && M.isSameNode(A))
        return !0;
      A = A.parentNode || A.host;
    } while (A);
  }
  return !1;
}
function mg(M) {
  return og(M).getComputedStyle(M);
}
function cw(M) {
  return ["table", "td", "th"].indexOf(Rg(M)) >= 0;
}
function UA(M) {
  return ((yt(M) ? M.ownerDocument : M.document) || window.document).documentElement;
}
function gC(M) {
  return Rg(M) === "html" ? M : M.assignedSlot || M.parentNode || (Qu(M) ? M.host : null) || UA(M);
}
function _n(M) {
  return !Ig(M) || mg(M).position === "fixed" ? null : M.offsetParent;
}
function xw(M) {
  var I = /firefox/i.test(Q0()), g = /Trident/i.test(Q0());
  if (g && Ig(M)) {
    var A = mg(M);
    if (A.position === "fixed")
      return null;
  }
  var t = gC(M);
  for (Qu(t) && (t = t.host); Ig(t) && ["html", "body"].indexOf(Rg(t)) < 0; ) {
    var D = mg(t);
    if (D.transform !== "none" || D.perspective !== "none" || D.contain === "paint" || ["transform", "perspective"].indexOf(D.willChange) !== -1 || I && D.willChange === "filter" || I && D.filter && D.filter !== "none")
      return t;
    t = t.parentNode;
  }
  return null;
}
function $e(M) {
  for (var I = og(M), g = _n(M); g && cw(g) && mg(g).position === "static"; )
    g = _n(g);
  return g && (Rg(g) === "html" || Rg(g) === "body" && mg(g).position === "static") ? I : g || xw(M) || I;
}
function Ou(M) {
  return ["top", "bottom"].indexOf(M) >= 0 ? "x" : "y";
}
function Ne(M, I, g) {
  return ut(M, eN(I, g));
}
function rw(M, I, g) {
  var A = Ne(M, I, g);
  return A > g ? g : A;
}
function is() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ns(M) {
  return Object.assign({}, is(), M);
}
function Cs(M, I) {
  return I.reduce(function(g, A) {
    return g[A] = M, g;
  }, {});
}
var ww = function(I, g) {
  return I = typeof I == "function" ? I(Object.assign({}, g.rects, {
    placement: g.placement
  })) : I, Ns(typeof I != "number" ? I : Cs(I, _e));
};
function Ew(M) {
  var I, g = M.state, A = M.name, t = M.options, D = g.elements.arrow, e = g.modifiersData.popperOffsets, i = Eg(g.placement), N = Ou(i), C = [vM, ug].indexOf(i) >= 0, u = C ? "height" : "width";
  if (!(!D || !e)) {
    var j = ww(t.padding, g), n = hu(D), L = N === "y" ? ZM : vM, o = N === "y" ? Cg : ug, T = g.rects.reference[u] + g.rects.reference[N] - e[N] - g.rects.popper[u], s = e[N] - g.rects.reference[N], S = $e(D), y = S ? N === "y" ? S.clientHeight || 0 : S.clientWidth || 0 : 0, x = T / 2 - s / 2, a = j[L], z = y - n[u] - j[o], c = y / 2 - n[u] / 2 + x, E = Ne(a, c, z), m = N;
    g.modifiersData[A] = (I = {}, I[m] = E, I.centerOffset = E - c, I);
  }
}
function dw(M) {
  var I = M.state, g = M.options, A = g.element, t = A === void 0 ? "[data-popper-arrow]" : A;
  if (t != null && !(typeof t == "string" && (t = I.elements.popper.querySelector(t), !t))) {
    if (process.env.NODE_ENV !== "production" && (Ig(t) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !es(I.elements.popper, t)) {
      process.env.NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    I.elements.arrow = t;
  }
}
const zw = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ew,
  effect: dw,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function lD(M) {
  return M.split("-")[1];
}
var mw = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function bw(M) {
  var I = M.x, g = M.y, A = window, t = A.devicePixelRatio || 1;
  return {
    x: SD(I * t) / t || 0,
    y: SD(g * t) / t || 0
  };
}
function $n(M) {
  var I, g = M.popper, A = M.popperRect, t = M.placement, D = M.variation, e = M.offsets, i = M.position, N = M.gpuAcceleration, C = M.adaptive, u = M.roundOffsets, j = M.isFixed, n = e.x, L = n === void 0 ? 0 : n, o = e.y, T = o === void 0 ? 0 : o, s = typeof u == "function" ? u({
    x: L,
    y: T
  }) : {
    x: L,
    y: T
  };
  L = s.x, T = s.y;
  var S = e.hasOwnProperty("x"), y = e.hasOwnProperty("y"), x = vM, a = ZM, z = window;
  if (C) {
    var c = $e(g), E = "clientHeight", m = "clientWidth";
    if (c === og(g) && (c = UA(g), mg(c).position !== "static" && i === "absolute" && (E = "scrollHeight", m = "scrollWidth")), c = c, t === ZM || (t === vM || t === ug) && D === we) {
      a = Cg;
      var p = j && c === z && z.visualViewport ? z.visualViewport.height : c[E];
      T -= p - A.height, T *= N ? 1 : -1;
    }
    if (t === vM || (t === ZM || t === Cg) && D === we) {
      x = ug;
      var V = j && c === z && z.visualViewport ? z.visualViewport.width : c[m];
      L -= V - A.width, L *= N ? 1 : -1;
    }
  }
  var U = Object.assign({
    position: i
  }, C && mw), gI = u === !0 ? bw({
    x: L,
    y: T
  }) : {
    x: L,
    y: T
  };
  if (L = gI.x, T = gI.y, N) {
    var R;
    return Object.assign({}, U, (R = {}, R[a] = y ? "0" : "", R[x] = S ? "0" : "", R.transform = (z.devicePixelRatio || 1) <= 1 ? "translate(" + L + "px, " + T + "px)" : "translate3d(" + L + "px, " + T + "px, 0)", R));
  }
  return Object.assign({}, U, (I = {}, I[a] = y ? T + "px" : "", I[x] = S ? L + "px" : "", I.transform = "", I));
}
function Yw(M) {
  var I = M.state, g = M.options, A = g.gpuAcceleration, t = A === void 0 ? !0 : A, D = g.adaptive, e = D === void 0 ? !0 : D, i = g.roundOffsets, N = i === void 0 ? !0 : i;
  if (process.env.NODE_ENV !== "production") {
    var C = mg(I.elements.popper).transitionProperty || "";
    e && ["transform", "top", "right", "bottom", "left"].some(function(j) {
      return C.indexOf(j) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var u = {
    placement: Eg(I.placement),
    variation: lD(I.placement),
    popper: I.elements.popper,
    popperRect: I.rects.popper,
    gpuAcceleration: t,
    isFixed: I.options.strategy === "fixed"
  };
  I.modifiersData.popperOffsets != null && (I.styles.popper = Object.assign({}, I.styles.popper, $n(Object.assign({}, u, {
    offsets: I.modifiersData.popperOffsets,
    position: I.options.strategy,
    adaptive: e,
    roundOffsets: N
  })))), I.modifiersData.arrow != null && (I.styles.arrow = Object.assign({}, I.styles.arrow, $n(Object.assign({}, u, {
    offsets: I.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: N
  })))), I.attributes.popper = Object.assign({}, I.attributes.popper, {
    "data-popper-placement": I.placement
  });
}
const pw = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Yw,
  data: {}
};
var oi = {
  passive: !0
};
function Qw(M) {
  var I = M.state, g = M.instance, A = M.options, t = A.scroll, D = t === void 0 ? !0 : t, e = A.resize, i = e === void 0 ? !0 : e, N = og(I.elements.popper), C = [].concat(I.scrollParents.reference, I.scrollParents.popper);
  return D && C.forEach(function(u) {
    u.addEventListener("scroll", g.update, oi);
  }), i && N.addEventListener("resize", g.update, oi), function() {
    D && C.forEach(function(u) {
      u.removeEventListener("scroll", g.update, oi);
    }), i && N.removeEventListener("resize", g.update, oi);
  };
}
const hw = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Qw,
  data: {}
};
var Ow = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Qi(M) {
  return M.replace(/left|right|bottom|top/g, function(I) {
    return Ow[I];
  });
}
var kw = {
  start: "end",
  end: "start"
};
function qn(M) {
  return M.replace(/start|end/g, function(I) {
    return kw[I];
  });
}
function ku(M) {
  var I = og(M), g = I.pageXOffset, A = I.pageYOffset;
  return {
    scrollLeft: g,
    scrollTop: A
  };
}
function Pu(M) {
  return aD(UA(M)).left + ku(M).scrollLeft;
}
function Pw(M, I) {
  var g = og(M), A = UA(M), t = g.visualViewport, D = A.clientWidth, e = A.clientHeight, i = 0, N = 0;
  if (t) {
    D = t.width, e = t.height;
    var C = Ds();
    (C || !C && I === "fixed") && (i = t.offsetLeft, N = t.offsetTop);
  }
  return {
    width: D,
    height: e,
    x: i + Pu(M),
    y: N
  };
}
function fw(M) {
  var I, g = UA(M), A = ku(M), t = (I = M.ownerDocument) == null ? void 0 : I.body, D = ut(g.scrollWidth, g.clientWidth, t ? t.scrollWidth : 0, t ? t.clientWidth : 0), e = ut(g.scrollHeight, g.clientHeight, t ? t.scrollHeight : 0, t ? t.clientHeight : 0), i = -A.scrollLeft + Pu(M), N = -A.scrollTop;
  return mg(t || g).direction === "rtl" && (i += ut(g.clientWidth, t ? t.clientWidth : 0) - D), {
    width: D,
    height: e,
    x: i,
    y: N
  };
}
function fu(M) {
  var I = mg(M), g = I.overflow, A = I.overflowX, t = I.overflowY;
  return /auto|scroll|overlay|hidden/.test(g + t + A);
}
function us(M) {
  return ["html", "body", "#document"].indexOf(Rg(M)) >= 0 ? M.ownerDocument.body : Ig(M) && fu(M) ? M : us(gC(M));
}
function Ce(M, I) {
  var g;
  I === void 0 && (I = []);
  var A = us(M), t = A === ((g = M.ownerDocument) == null ? void 0 : g.body), D = og(A), e = t ? [D].concat(D.visualViewport || [], fu(A) ? A : []) : A, i = I.concat(e);
  return t ? i : i.concat(Ce(gC(e)));
}
function h0(M) {
  return Object.assign({}, M, {
    left: M.x,
    top: M.y,
    right: M.x + M.width,
    bottom: M.y + M.height
  });
}
function Gw(M, I) {
  var g = aD(M, !1, I === "fixed");
  return g.top = g.top + M.clientTop, g.left = g.left + M.clientLeft, g.bottom = g.top + M.clientHeight, g.right = g.left + M.clientWidth, g.width = M.clientWidth, g.height = M.clientHeight, g.x = g.left, g.y = g.top, g;
}
function IL(M, I, g) {
  return I === gs ? h0(Pw(M, g)) : yt(I) ? Gw(I, g) : h0(fw(UA(M)));
}
function Ww(M) {
  var I = Ce(gC(M)), g = ["absolute", "fixed"].indexOf(mg(M).position) >= 0, A = g && Ig(M) ? $e(M) : M;
  return yt(A) ? I.filter(function(t) {
    return yt(t) && es(t, A) && Rg(t) !== "body";
  }) : [];
}
function Zw(M, I, g, A) {
  var t = I === "clippingParents" ? Ww(M) : [].concat(I), D = [].concat(t, [g]), e = D[0], i = D.reduce(function(N, C) {
    var u = IL(M, C, A);
    return N.top = ut(u.top, N.top), N.right = eN(u.right, N.right), N.bottom = eN(u.bottom, N.bottom), N.left = ut(u.left, N.left), N;
  }, IL(M, e, A));
  return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
function js(M) {
  var I = M.reference, g = M.element, A = M.placement, t = A ? Eg(A) : null, D = A ? lD(A) : null, e = I.x + I.width / 2 - g.width / 2, i = I.y + I.height / 2 - g.height / 2, N;
  switch (t) {
    case ZM:
      N = {
        x: e,
        y: I.y - g.height
      };
      break;
    case Cg:
      N = {
        x: e,
        y: I.y + I.height
      };
      break;
    case ug:
      N = {
        x: I.x + I.width,
        y: i
      };
      break;
    case vM:
      N = {
        x: I.x - g.width,
        y: i
      };
      break;
    default:
      N = {
        x: I.x,
        y: I.y
      };
  }
  var C = t ? Ou(t) : null;
  if (C != null) {
    var u = C === "y" ? "height" : "width";
    switch (D) {
      case sD:
        N[C] = N[C] - (I[u] / 2 - g[u] / 2);
        break;
      case we:
        N[C] = N[C] + (I[u] / 2 - g[u] / 2);
        break;
    }
  }
  return N;
}
function Ee(M, I) {
  I === void 0 && (I = {});
  var g = I, A = g.placement, t = A === void 0 ? M.placement : A, D = g.strategy, e = D === void 0 ? M.strategy : D, i = g.boundary, N = i === void 0 ? Nw : i, C = g.rootBoundary, u = C === void 0 ? gs : C, j = g.elementContext, n = j === void 0 ? UD : j, L = g.altBoundary, o = L === void 0 ? !1 : L, T = g.padding, s = T === void 0 ? 0 : T, S = Ns(typeof s != "number" ? s : Cs(s, _e)), y = n === UD ? Cw : UD, x = M.rects.popper, a = M.elements[o ? y : n], z = Zw(yt(a) ? a : a.contextElement || UA(M.elements.popper), N, u, e), c = aD(M.elements.reference), E = js({
    reference: c,
    element: x,
    strategy: "absolute",
    placement: t
  }), m = h0(Object.assign({}, x, E)), p = n === UD ? m : c, V = {
    top: z.top - p.top + S.top,
    bottom: p.bottom - z.bottom + S.bottom,
    left: z.left - p.left + S.left,
    right: p.right - z.right + S.right
  }, U = M.modifiersData.offset;
  if (n === UD && U) {
    var gI = U[t];
    Object.keys(V).forEach(function(R) {
      var H = [ug, Cg].indexOf(R) >= 0 ? 1 : -1, W = [ZM, Cg].indexOf(R) >= 0 ? "y" : "x";
      V[R] += gI[W] * H;
    });
  }
  return V;
}
function vw(M, I) {
  I === void 0 && (I = {});
  var g = I, A = g.placement, t = g.boundary, D = g.rootBoundary, e = g.padding, i = g.flipVariations, N = g.allowedAutoPlacements, C = N === void 0 ? As : N, u = lD(A), j = u ? i ? Kn : Kn.filter(function(o) {
    return lD(o) === u;
  }) : _e, n = j.filter(function(o) {
    return C.indexOf(o) >= 0;
  });
  n.length === 0 && (n = j, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var L = n.reduce(function(o, T) {
    return o[T] = Ee(M, {
      placement: T,
      boundary: t,
      rootBoundary: D,
      padding: e
    })[Eg(T)], o;
  }, {});
  return Object.keys(L).sort(function(o, T) {
    return L[o] - L[T];
  });
}
function Uw(M) {
  if (Eg(M) === MC)
    return [];
  var I = Qi(M);
  return [qn(M), I, qn(I)];
}
function Jw(M) {
  var I = M.state, g = M.options, A = M.name;
  if (!I.modifiersData[A]._skip) {
    for (var t = g.mainAxis, D = t === void 0 ? !0 : t, e = g.altAxis, i = e === void 0 ? !0 : e, N = g.fallbackPlacements, C = g.padding, u = g.boundary, j = g.rootBoundary, n = g.altBoundary, L = g.flipVariations, o = L === void 0 ? !0 : L, T = g.allowedAutoPlacements, s = I.options.placement, S = Eg(s), y = S === s, x = N || (y || !o ? [Qi(s)] : Uw(s)), a = [s].concat(x).reduce(function(jI, sI) {
      return jI.concat(Eg(sI) === MC ? vw(I, {
        placement: sI,
        boundary: u,
        rootBoundary: j,
        padding: C,
        flipVariations: o,
        allowedAutoPlacements: T
      }) : sI);
    }, []), z = I.rects.reference, c = I.rects.popper, E = /* @__PURE__ */ new Map(), m = !0, p = a[0], V = 0; V < a.length; V++) {
      var U = a[V], gI = Eg(U), R = lD(U) === sD, H = [ZM, Cg].indexOf(gI) >= 0, W = H ? "width" : "height", l = Ee(I, {
        placement: U,
        boundary: u,
        rootBoundary: j,
        altBoundary: n,
        padding: C
      }), w = H ? R ? ug : vM : R ? Cg : ZM;
      z[W] > c[W] && (w = Qi(w));
      var Q = Qi(w), k = [];
      if (D && k.push(l[gI] <= 0), i && k.push(l[w] <= 0, l[Q] <= 0), k.every(function(jI) {
        return jI;
      })) {
        p = U, m = !1;
        break;
      }
      E.set(U, k);
    }
    if (m)
      for (var B = o ? 3 : 1, iI = function(sI) {
        var PI = a.find(function(KI) {
          var UI = E.get(KI);
          if (UI)
            return UI.slice(0, sI).every(function(rM) {
              return rM;
            });
        });
        if (PI)
          return p = PI, "break";
      }, aI = B; aI > 0; aI--) {
        var kI = iI(aI);
        if (kI === "break")
          break;
      }
    I.placement !== p && (I.modifiersData[A]._skip = !0, I.placement = p, I.reset = !0);
  }
}
const Bw = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Jw,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ML(M, I, g) {
  return g === void 0 && (g = {
    x: 0,
    y: 0
  }), {
    top: M.top - I.height - g.y,
    right: M.right - I.width + g.x,
    bottom: M.bottom - I.height + g.y,
    left: M.left - I.width - g.x
  };
}
function gL(M) {
  return [ZM, ug, Cg, vM].some(function(I) {
    return M[I] >= 0;
  });
}
function Rw(M) {
  var I = M.state, g = M.name, A = I.rects.reference, t = I.rects.popper, D = I.modifiersData.preventOverflow, e = Ee(I, {
    elementContext: "reference"
  }), i = Ee(I, {
    altBoundary: !0
  }), N = ML(e, A), C = ML(i, t, D), u = gL(N), j = gL(C);
  I.modifiersData[g] = {
    referenceClippingOffsets: N,
    popperEscapeOffsets: C,
    isReferenceHidden: u,
    hasPopperEscaped: j
  }, I.attributes.popper = Object.assign({}, I.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": j
  });
}
const Hw = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Rw
};
function Vw(M, I, g) {
  var A = Eg(M), t = [vM, ZM].indexOf(A) >= 0 ? -1 : 1, D = typeof g == "function" ? g(Object.assign({}, I, {
    placement: M
  })) : g, e = D[0], i = D[1];
  return e = e || 0, i = (i || 0) * t, [vM, ug].indexOf(A) >= 0 ? {
    x: i,
    y: e
  } : {
    x: e,
    y: i
  };
}
function Fw(M) {
  var I = M.state, g = M.options, A = M.name, t = g.offset, D = t === void 0 ? [0, 0] : t, e = As.reduce(function(u, j) {
    return u[j] = Vw(j, I.rects, D), u;
  }, {}), i = e[I.placement], N = i.x, C = i.y;
  I.modifiersData.popperOffsets != null && (I.modifiersData.popperOffsets.x += N, I.modifiersData.popperOffsets.y += C), I.modifiersData[A] = e;
}
const Xw = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Fw
};
function Kw(M) {
  var I = M.state, g = M.name;
  I.modifiersData[g] = js({
    reference: I.rects.reference,
    element: I.rects.popper,
    strategy: "absolute",
    placement: I.placement
  });
}
const _w = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Kw,
  data: {}
};
function $w(M) {
  return M === "x" ? "y" : "x";
}
function qw(M) {
  var I = M.state, g = M.options, A = M.name, t = g.mainAxis, D = t === void 0 ? !0 : t, e = g.altAxis, i = e === void 0 ? !1 : e, N = g.boundary, C = g.rootBoundary, u = g.altBoundary, j = g.padding, n = g.tether, L = n === void 0 ? !0 : n, o = g.tetherOffset, T = o === void 0 ? 0 : o, s = Ee(I, {
    boundary: N,
    rootBoundary: C,
    padding: j,
    altBoundary: u
  }), S = Eg(I.placement), y = lD(I.placement), x = !y, a = Ou(S), z = $w(a), c = I.modifiersData.popperOffsets, E = I.rects.reference, m = I.rects.popper, p = typeof T == "function" ? T(Object.assign({}, I.rects, {
    placement: I.placement
  })) : T, V = typeof p == "number" ? {
    mainAxis: p,
    altAxis: p
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, p), U = I.modifiersData.offset ? I.modifiersData.offset[I.placement] : null, gI = {
    x: 0,
    y: 0
  };
  if (!!c) {
    if (D) {
      var R, H = a === "y" ? ZM : vM, W = a === "y" ? Cg : ug, l = a === "y" ? "height" : "width", w = c[a], Q = w + s[H], k = w - s[W], B = L ? -m[l] / 2 : 0, iI = y === sD ? E[l] : m[l], aI = y === sD ? -m[l] : -E[l], kI = I.elements.arrow, jI = L && kI ? hu(kI) : {
        width: 0,
        height: 0
      }, sI = I.modifiersData["arrow#persistent"] ? I.modifiersData["arrow#persistent"].padding : is(), PI = sI[H], KI = sI[W], UI = Ne(0, E[l], jI[l]), rM = x ? E[l] / 2 - B - UI - PI - V.mainAxis : iI - UI - PI - V.mainAxis, sM = x ? -E[l] / 2 + B + UI + KI + V.mainAxis : aI + UI + KI + V.mainAxis, SM = I.elements.arrow && $e(I.elements.arrow), DM = SM ? a === "y" ? SM.clientTop || 0 : SM.clientLeft || 0 : 0, aM = (R = U == null ? void 0 : U[a]) != null ? R : 0, fI = w + rM - aM - DM, HM = w + sM - aM, NM = Ne(L ? eN(Q, fI) : Q, w, L ? ut(k, HM) : k);
      c[a] = NM, gI[a] = NM - w;
    }
    if (i) {
      var Z, bM = a === "x" ? ZM : vM, oI = a === "x" ? Cg : ug, q = c[z], GI = z === "y" ? "height" : "width", WI = q + s[bM], _I = q - s[oI], P = [ZM, vM].indexOf(S) !== -1, d = (Z = U == null ? void 0 : U[z]) != null ? Z : 0, b = P ? WI : q - E[GI] - m[GI] - d + V.altAxis, v = P ? q + E[GI] + m[GI] - d - V.altAxis : _I, II = L && P ? rw(b, q, v) : Ne(L ? b : WI, q, L ? v : _I);
      c[z] = II, gI[z] = II - q;
    }
    I.modifiersData[A] = gI;
  }
}
const IE = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: qw,
  requiresIfExists: ["offset"]
};
function ME(M) {
  return {
    scrollLeft: M.scrollLeft,
    scrollTop: M.scrollTop
  };
}
function gE(M) {
  return M === og(M) || !Ig(M) ? ku(M) : ME(M);
}
function AE(M) {
  var I = M.getBoundingClientRect(), g = SD(I.width) / M.offsetWidth || 1, A = SD(I.height) / M.offsetHeight || 1;
  return g !== 1 || A !== 1;
}
function tE(M, I, g) {
  g === void 0 && (g = !1);
  var A = Ig(I), t = Ig(I) && AE(I), D = UA(I), e = aD(M, t, g), i = {
    scrollLeft: 0,
    scrollTop: 0
  }, N = {
    x: 0,
    y: 0
  };
  return (A || !A && !g) && ((Rg(I) !== "body" || fu(D)) && (i = gE(I)), Ig(I) ? (N = aD(I, !0), N.x += I.clientLeft, N.y += I.clientTop) : D && (N.x = Pu(D))), {
    x: e.left + i.scrollLeft - N.x,
    y: e.top + i.scrollTop - N.y,
    width: e.width,
    height: e.height
  };
}
function DE(M) {
  var I = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set(), A = [];
  M.forEach(function(D) {
    I.set(D.name, D);
  });
  function t(D) {
    g.add(D.name);
    var e = [].concat(D.requires || [], D.requiresIfExists || []);
    e.forEach(function(i) {
      if (!g.has(i)) {
        var N = I.get(i);
        N && t(N);
      }
    }), A.push(D);
  }
  return M.forEach(function(D) {
    g.has(D.name) || t(D);
  }), A;
}
function eE(M) {
  var I = DE(M);
  return p0.reduce(function(g, A) {
    return g.concat(I.filter(function(t) {
      return t.phase === A;
    }));
  }, []);
}
function iE(M) {
  var I;
  return function() {
    return I || (I = new Promise(function(g) {
      Promise.resolve().then(function() {
        I = void 0, g(M());
      });
    })), I;
  };
}
function uA(M) {
  for (var I = arguments.length, g = new Array(I > 1 ? I - 1 : 0), A = 1; A < I; A++)
    g[A - 1] = arguments[A];
  return [].concat(g).reduce(function(t, D) {
    return t.replace(/%s/, D);
  }, M);
}
var HA = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', NE = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', AL = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function CE(M) {
  M.forEach(function(I) {
    [].concat(Object.keys(I), AL).filter(function(g, A, t) {
      return t.indexOf(g) === A;
    }).forEach(function(g) {
      switch (g) {
        case "name":
          typeof I.name != "string" && console.error(uA(HA, String(I.name), '"name"', '"string"', '"' + String(I.name) + '"'));
          break;
        case "enabled":
          typeof I.enabled != "boolean" && console.error(uA(HA, I.name, '"enabled"', '"boolean"', '"' + String(I.enabled) + '"'));
          break;
        case "phase":
          p0.indexOf(I.phase) < 0 && console.error(uA(HA, I.name, '"phase"', "either " + p0.join(", "), '"' + String(I.phase) + '"'));
          break;
        case "fn":
          typeof I.fn != "function" && console.error(uA(HA, I.name, '"fn"', '"function"', '"' + String(I.fn) + '"'));
          break;
        case "effect":
          I.effect != null && typeof I.effect != "function" && console.error(uA(HA, I.name, '"effect"', '"function"', '"' + String(I.fn) + '"'));
          break;
        case "requires":
          I.requires != null && !Array.isArray(I.requires) && console.error(uA(HA, I.name, '"requires"', '"array"', '"' + String(I.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(I.requiresIfExists) || console.error(uA(HA, I.name, '"requiresIfExists"', '"array"', '"' + String(I.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + I.name + '" modifier, valid properties are ' + AL.map(function(A) {
            return '"' + A + '"';
          }).join(", ") + '; but "' + g + '" was provided.');
      }
      I.requires && I.requires.forEach(function(A) {
        M.find(function(t) {
          return t.name === A;
        }) == null && console.error(uA(NE, String(I.name), A, A));
      });
    });
  });
}
function uE(M, I) {
  var g = /* @__PURE__ */ new Set();
  return M.filter(function(A) {
    var t = I(A);
    if (!g.has(t))
      return g.add(t), !0;
  });
}
function jE(M) {
  var I = M.reduce(function(g, A) {
    var t = g[A.name];
    return g[A.name] = t ? Object.assign({}, t, A, {
      options: Object.assign({}, t.options, A.options),
      data: Object.assign({}, t.data, A.data)
    }) : A, g;
  }, {});
  return Object.keys(I).map(function(g) {
    return I[g];
  });
}
var tL = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", nE = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", DL = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function eL() {
  for (var M = arguments.length, I = new Array(M), g = 0; g < M; g++)
    I[g] = arguments[g];
  return !I.some(function(A) {
    return !(A && typeof A.getBoundingClientRect == "function");
  });
}
function LE(M) {
  M === void 0 && (M = {});
  var I = M, g = I.defaultModifiers, A = g === void 0 ? [] : g, t = I.defaultOptions, D = t === void 0 ? DL : t;
  return function(i, N, C) {
    C === void 0 && (C = D);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DL, D),
      modifiersData: {},
      elements: {
        reference: i,
        popper: N
      },
      attributes: {},
      styles: {}
    }, j = [], n = !1, L = {
      state: u,
      setOptions: function(S) {
        var y = typeof S == "function" ? S(u.options) : S;
        T(), u.options = Object.assign({}, D, u.options, y), u.scrollParents = {
          reference: yt(i) ? Ce(i) : i.contextElement ? Ce(i.contextElement) : [],
          popper: Ce(N)
        };
        var x = eE(jE([].concat(A, u.options.modifiers)));
        if (u.orderedModifiers = x.filter(function(U) {
          return U.enabled;
        }), process.env.NODE_ENV !== "production") {
          var a = uE([].concat(x, u.options.modifiers), function(U) {
            var gI = U.name;
            return gI;
          });
          if (CE(a), Eg(u.options.placement) === MC) {
            var z = u.orderedModifiers.find(function(U) {
              var gI = U.name;
              return gI === "flip";
            });
            z || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var c = mg(N), E = c.marginTop, m = c.marginRight, p = c.marginBottom, V = c.marginLeft;
          [E, m, p, V].some(function(U) {
            return parseFloat(U);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return o(), L.update();
      },
      forceUpdate: function() {
        if (!n) {
          var S = u.elements, y = S.reference, x = S.popper;
          if (!eL(y, x)) {
            process.env.NODE_ENV !== "production" && console.error(tL);
            return;
          }
          u.rects = {
            reference: tE(y, $e(x), u.options.strategy === "fixed"),
            popper: hu(x)
          }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(U) {
            return u.modifiersData[U.name] = Object.assign({}, U.data);
          });
          for (var a = 0, z = 0; z < u.orderedModifiers.length; z++) {
            if (process.env.NODE_ENV !== "production" && (a += 1, a > 100)) {
              console.error(nE);
              break;
            }
            if (u.reset === !0) {
              u.reset = !1, z = -1;
              continue;
            }
            var c = u.orderedModifiers[z], E = c.fn, m = c.options, p = m === void 0 ? {} : m, V = c.name;
            typeof E == "function" && (u = E({
              state: u,
              options: p,
              name: V,
              instance: L
            }) || u);
          }
        }
      },
      update: iE(function() {
        return new Promise(function(s) {
          L.forceUpdate(), s(u);
        });
      }),
      destroy: function() {
        T(), n = !0;
      }
    };
    if (!eL(i, N))
      return process.env.NODE_ENV !== "production" && console.error(tL), L;
    L.setOptions(C).then(function(s) {
      !n && C.onFirstUpdate && C.onFirstUpdate(s);
    });
    function o() {
      u.orderedModifiers.forEach(function(s) {
        var S = s.name, y = s.options, x = y === void 0 ? {} : y, a = s.effect;
        if (typeof a == "function") {
          var z = a({
            state: u,
            name: S,
            instance: L,
            options: x
          }), c = function() {
          };
          j.push(z || c);
        }
      });
    }
    function T() {
      j.forEach(function(s) {
        return s();
      }), j = [];
    }
    return L;
  };
}
var oE = [hw, _w, pw, ts, Xw, Bw, IE, zw, Hw], TE = /* @__PURE__ */ LE({
  defaultModifiers: oE
}), sE = "tippy-box", ns = "tippy-content", SE = "tippy-backdrop", Ls = "tippy-arrow", Ts = "tippy-svg-arrow", _A = {
  passive: !0,
  capture: !0
}, ss = function() {
  return document.body;
};
function aE(M, I) {
  return {}.hasOwnProperty.call(M, I);
}
function JC(M, I, g) {
  if (Array.isArray(M)) {
    var A = M[I];
    return A == null ? Array.isArray(g) ? g[I] : g : A;
  }
  return M;
}
function Gu(M, I) {
  var g = {}.toString.call(M);
  return g.indexOf("[object") === 0 && g.indexOf(I + "]") > -1;
}
function Ss(M, I) {
  return typeof M == "function" ? M.apply(void 0, I) : M;
}
function iL(M, I) {
  if (I === 0)
    return M;
  var g;
  return function(A) {
    clearTimeout(g), g = setTimeout(function() {
      M(A);
    }, I);
  };
}
function lE(M, I) {
  var g = Object.assign({}, M);
  return I.forEach(function(A) {
    delete g[A];
  }), g;
}
function yE(M) {
  return M.split(/\s+/).filter(Boolean);
}
function Ut(M) {
  return [].concat(M);
}
function NL(M, I) {
  M.indexOf(I) === -1 && M.push(I);
}
function cE(M) {
  return M.filter(function(I, g) {
    return M.indexOf(I) === g;
  });
}
function xE(M) {
  return M.split("-")[0];
}
function iN(M) {
  return [].slice.call(M);
}
function CL(M) {
  return Object.keys(M).reduce(function(I, g) {
    return M[g] !== void 0 && (I[g] = M[g]), I;
  }, {});
}
function ue() {
  return document.createElement("div");
}
function de(M) {
  return ["Element", "Fragment"].some(function(I) {
    return Gu(M, I);
  });
}
function rE(M) {
  return Gu(M, "NodeList");
}
function wE(M) {
  return Gu(M, "MouseEvent");
}
function EE(M) {
  return !!(M && M._tippy && M._tippy.reference === M);
}
function dE(M) {
  return de(M) ? [M] : rE(M) ? iN(M) : Array.isArray(M) ? M : iN(document.querySelectorAll(M));
}
function BC(M, I) {
  M.forEach(function(g) {
    g && (g.style.transitionDuration = I + "ms");
  });
}
function uL(M, I) {
  M.forEach(function(g) {
    g && g.setAttribute("data-state", I);
  });
}
function zE(M) {
  var I, g = Ut(M), A = g[0];
  return A != null && (I = A.ownerDocument) != null && I.body ? A.ownerDocument : document;
}
function mE(M, I) {
  var g = I.clientX, A = I.clientY;
  return M.every(function(t) {
    var D = t.popperRect, e = t.popperState, i = t.props, N = i.interactiveBorder, C = xE(e.placement), u = e.modifiersData.offset;
    if (!u)
      return !0;
    var j = C === "bottom" ? u.top.y : 0, n = C === "top" ? u.bottom.y : 0, L = C === "right" ? u.left.x : 0, o = C === "left" ? u.right.x : 0, T = D.top - A + j > N, s = A - D.bottom - n > N, S = D.left - g + L > N, y = g - D.right - o > N;
    return T || s || S || y;
  });
}
function RC(M, I, g) {
  var A = I + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(t) {
    M[A](t, g);
  });
}
function jL(M, I) {
  for (var g = I; g; ) {
    var A;
    if (M.contains(g))
      return !0;
    g = g.getRootNode == null || (A = g.getRootNode()) == null ? void 0 : A.host;
  }
  return !1;
}
var kg = {
  isTouch: !1
}, nL = 0;
function bE() {
  kg.isTouch || (kg.isTouch = !0, window.performance && document.addEventListener("mousemove", as));
}
function as() {
  var M = performance.now();
  M - nL < 20 && (kg.isTouch = !1, document.removeEventListener("mousemove", as)), nL = M;
}
function YE() {
  var M = document.activeElement;
  if (EE(M)) {
    var I = M._tippy;
    M.blur && !I.state.isVisible && M.blur();
  }
}
function pE() {
  document.addEventListener("touchstart", bE, _A), window.addEventListener("blur", YE);
}
var QE = typeof window < "u" && typeof document < "u", hE = QE ? !!window.msCrypto : !1;
function kt(M) {
  var I = M === "destroy" ? "n already-" : " ";
  return [M + "() was called on a" + I + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function LL(M) {
  var I = /[ \t]{2,}/g, g = /^[ \t]*/gm;
  return M.replace(I, " ").replace(g, "").trim();
}
function OE(M) {
  return LL(`
  %ctippy.js

  %c` + LL(M) + `

  %c\u{1F477}\u200D This is a development-only message. It will be removed in production.
  `);
}
function ls(M) {
  return [
    OE(M),
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    "line-height: 1.5",
    "color: #a6a095;"
  ];
}
var ze;
process.env.NODE_ENV !== "production" && kE();
function kE() {
  ze = /* @__PURE__ */ new Set();
}
function $g(M, I) {
  if (M && !ze.has(I)) {
    var g;
    ze.add(I), (g = console).warn.apply(g, ls(I));
  }
}
function O0(M, I) {
  if (M && !ze.has(I)) {
    var g;
    ze.add(I), (g = console).error.apply(g, ls(I));
  }
}
function PE(M) {
  var I = !M, g = Object.prototype.toString.call(M) === "[object Object]" && !M.addEventListener;
  O0(I, ["tippy() was passed", "`" + String(M) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), O0(g, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var ys = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, fE = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, _M = Object.assign({
  appendTo: ss,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, ys, fE), GE = Object.keys(_M), WE = function(I) {
  process.env.NODE_ENV !== "production" && xs(I, []);
  var g = Object.keys(I);
  g.forEach(function(A) {
    _M[A] = I[A];
  });
};
function cs(M) {
  var I = M.plugins || [], g = I.reduce(function(A, t) {
    var D = t.name, e = t.defaultValue;
    if (D) {
      var i;
      A[D] = M[D] !== void 0 ? M[D] : (i = _M[D]) != null ? i : e;
    }
    return A;
  }, {});
  return Object.assign({}, M, g);
}
function ZE(M, I) {
  var g = I ? Object.keys(cs(Object.assign({}, _M, {
    plugins: I
  }))) : GE, A = g.reduce(function(t, D) {
    var e = (M.getAttribute("data-tippy-" + D) || "").trim();
    if (!e)
      return t;
    if (D === "content")
      t[D] = e;
    else
      try {
        t[D] = JSON.parse(e);
      } catch {
        t[D] = e;
      }
    return t;
  }, {});
  return A;
}
function oL(M, I) {
  var g = Object.assign({}, I, {
    content: Ss(I.content, [M])
  }, I.ignoreAttributes ? {} : ZE(M, I.plugins));
  return g.aria = Object.assign({}, _M.aria, g.aria), g.aria = {
    expanded: g.aria.expanded === "auto" ? I.interactive : g.aria.expanded,
    content: g.aria.content === "auto" ? I.interactive ? null : "describedby" : g.aria.content
  }, g;
}
function xs(M, I) {
  M === void 0 && (M = {}), I === void 0 && (I = []);
  var g = Object.keys(M);
  g.forEach(function(A) {
    var t = lE(_M, Object.keys(ys)), D = !aE(t, A);
    D && (D = I.filter(function(e) {
      return e.name === A;
    }).length === 0), $g(D, ["`" + A + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var vE = function() {
  return "innerHTML";
};
function k0(M, I) {
  M[vE()] = I;
}
function TL(M) {
  var I = ue();
  return M === !0 ? I.className = Ls : (I.className = Ts, de(M) ? I.appendChild(M) : k0(I, M)), I;
}
function sL(M, I) {
  de(I.content) ? (k0(M, ""), M.appendChild(I.content)) : typeof I.content != "function" && (I.allowHTML ? k0(M, I.content) : M.textContent = I.content);
}
function P0(M) {
  var I = M.firstElementChild, g = iN(I.children);
  return {
    box: I,
    content: g.find(function(A) {
      return A.classList.contains(ns);
    }),
    arrow: g.find(function(A) {
      return A.classList.contains(Ls) || A.classList.contains(Ts);
    }),
    backdrop: g.find(function(A) {
      return A.classList.contains(SE);
    })
  };
}
function rs(M) {
  var I = ue(), g = ue();
  g.className = sE, g.setAttribute("data-state", "hidden"), g.setAttribute("tabindex", "-1");
  var A = ue();
  A.className = ns, A.setAttribute("data-state", "hidden"), sL(A, M.props), I.appendChild(g), g.appendChild(A), t(M.props, M.props);
  function t(D, e) {
    var i = P0(I), N = i.box, C = i.content, u = i.arrow;
    e.theme ? N.setAttribute("data-theme", e.theme) : N.removeAttribute("data-theme"), typeof e.animation == "string" ? N.setAttribute("data-animation", e.animation) : N.removeAttribute("data-animation"), e.inertia ? N.setAttribute("data-inertia", "") : N.removeAttribute("data-inertia"), N.style.maxWidth = typeof e.maxWidth == "number" ? e.maxWidth + "px" : e.maxWidth, e.role ? N.setAttribute("role", e.role) : N.removeAttribute("role"), (D.content !== e.content || D.allowHTML !== e.allowHTML) && sL(C, M.props), e.arrow ? u ? D.arrow !== e.arrow && (N.removeChild(u), N.appendChild(TL(e.arrow))) : N.appendChild(TL(e.arrow)) : u && N.removeChild(u);
  }
  return {
    popper: I,
    onUpdate: t
  };
}
rs.$$tippy = !0;
var UE = 1, Ti = [], HC = [];
function JE(M, I) {
  var g = oL(M, Object.assign({}, _M, cs(CL(I)))), A, t, D, e = !1, i = !1, N = !1, C = !1, u, j, n, L = [], o = iL(fI, g.interactiveDebounce), T, s = UE++, S = null, y = cE(g.plugins), x = {
    isEnabled: !0,
    isVisible: !1,
    isDestroyed: !1,
    isMounted: !1,
    isShown: !1
  }, a = {
    id: s,
    reference: M,
    popper: ue(),
    popperInstance: S,
    props: g,
    state: x,
    plugins: y,
    clearDelayTimeouts: b,
    setProps: v,
    setContent: II,
    show: rI,
    hide: $I,
    hideWithInteractivity: WD,
    enable: P,
    disable: d,
    unmount: ZD,
    destroy: Sl
  };
  if (!g.render)
    return process.env.NODE_ENV !== "production" && O0(!0, "render() function has not been supplied."), a;
  var z = g.render(a), c = z.popper, E = z.onUpdate;
  c.setAttribute("data-tippy-root", ""), c.id = "tippy-" + a.id, a.popper = c, M._tippy = a, c._tippy = a;
  var m = y.map(function(O) {
    return O.fn(a);
  }), p = M.hasAttribute("aria-expanded");
  return SM(), B(), w(), Q("onCreate", [a]), g.showOnCreate && WI(), c.addEventListener("mouseenter", function() {
    a.props.interactive && a.state.isVisible && a.clearDelayTimeouts();
  }), c.addEventListener("mouseleave", function() {
    a.props.interactive && a.props.trigger.indexOf("mouseenter") >= 0 && H().addEventListener("mousemove", o);
  }), a;
  function V() {
    var O = a.props.touch;
    return Array.isArray(O) ? O : [O, 0];
  }
  function U() {
    return V()[0] === "hold";
  }
  function gI() {
    var O;
    return !!((O = a.props.render) != null && O.$$tippy);
  }
  function R() {
    return T || M;
  }
  function H() {
    var O = R().parentNode;
    return O ? zE(O) : document;
  }
  function W() {
    return P0(c);
  }
  function l(O) {
    return a.state.isMounted && !a.state.isVisible || kg.isTouch || u && u.type === "focus" ? 0 : JC(a.props.delay, O ? 0 : 1, _M.delay);
  }
  function w(O) {
    O === void 0 && (O = !1), c.style.pointerEvents = a.props.interactive && !O ? "" : "none", c.style.zIndex = "" + a.props.zIndex;
  }
  function Q(O, tI, nI) {
    if (nI === void 0 && (nI = !0), m.forEach(function(zI) {
      zI[O] && zI[O].apply(zI, tI);
    }), nI) {
      var pI;
      (pI = a.props)[O].apply(pI, tI);
    }
  }
  function k() {
    var O = a.props.aria;
    if (!!O.content) {
      var tI = "aria-" + O.content, nI = c.id, pI = Ut(a.props.triggerTarget || M);
      pI.forEach(function(zI) {
        var YM = zI.getAttribute(tI);
        if (a.state.isVisible)
          zI.setAttribute(tI, YM ? YM + " " + nI : nI);
        else {
          var gg = YM && YM.replace(nI, "").trim();
          gg ? zI.setAttribute(tI, gg) : zI.removeAttribute(tI);
        }
      });
    }
  }
  function B() {
    if (!(p || !a.props.aria.expanded)) {
      var O = Ut(a.props.triggerTarget || M);
      O.forEach(function(tI) {
        a.props.interactive ? tI.setAttribute("aria-expanded", a.state.isVisible && tI === R() ? "true" : "false") : tI.removeAttribute("aria-expanded");
      });
    }
  }
  function iI() {
    H().removeEventListener("mousemove", o), Ti = Ti.filter(function(O) {
      return O !== o;
    });
  }
  function aI(O) {
    if (!(kg.isTouch && (N || O.type === "mousedown"))) {
      var tI = O.composedPath && O.composedPath()[0] || O.target;
      if (!(a.props.interactive && jL(c, tI))) {
        if (Ut(a.props.triggerTarget || M).some(function(nI) {
          return jL(nI, tI);
        })) {
          if (kg.isTouch || a.state.isVisible && a.props.trigger.indexOf("click") >= 0)
            return;
        } else
          Q("onClickOutside", [a, O]);
        a.props.hideOnClick === !0 && (a.clearDelayTimeouts(), a.hide(), i = !0, setTimeout(function() {
          i = !1;
        }), a.state.isMounted || PI());
      }
    }
  }
  function kI() {
    N = !0;
  }
  function jI() {
    N = !1;
  }
  function sI() {
    var O = H();
    O.addEventListener("mousedown", aI, !0), O.addEventListener("touchend", aI, _A), O.addEventListener("touchstart", jI, _A), O.addEventListener("touchmove", kI, _A);
  }
  function PI() {
    var O = H();
    O.removeEventListener("mousedown", aI, !0), O.removeEventListener("touchend", aI, _A), O.removeEventListener("touchstart", jI, _A), O.removeEventListener("touchmove", kI, _A);
  }
  function KI(O, tI) {
    rM(O, function() {
      !a.state.isVisible && c.parentNode && c.parentNode.contains(c) && tI();
    });
  }
  function UI(O, tI) {
    rM(O, tI);
  }
  function rM(O, tI) {
    var nI = W().box;
    function pI(zI) {
      zI.target === nI && (RC(nI, "remove", pI), tI());
    }
    if (O === 0)
      return tI();
    RC(nI, "remove", j), RC(nI, "add", pI), j = pI;
  }
  function sM(O, tI, nI) {
    nI === void 0 && (nI = !1);
    var pI = Ut(a.props.triggerTarget || M);
    pI.forEach(function(zI) {
      zI.addEventListener(O, tI, nI), L.push({
        node: zI,
        eventType: O,
        handler: tI,
        options: nI
      });
    });
  }
  function SM() {
    U() && (sM("touchstart", aM, {
      passive: !0
    }), sM("touchend", HM, {
      passive: !0
    })), yE(a.props.trigger).forEach(function(O) {
      if (O !== "manual")
        switch (sM(O, aM), O) {
          case "mouseenter":
            sM("mouseleave", HM);
            break;
          case "focus":
            sM(hE ? "focusout" : "blur", NM);
            break;
          case "focusin":
            sM("focusout", NM);
            break;
        }
    });
  }
  function DM() {
    L.forEach(function(O) {
      var tI = O.node, nI = O.eventType, pI = O.handler, zI = O.options;
      tI.removeEventListener(nI, pI, zI);
    }), L = [];
  }
  function aM(O) {
    var tI, nI = !1;
    if (!(!a.state.isEnabled || Z(O) || i)) {
      var pI = ((tI = u) == null ? void 0 : tI.type) === "focus";
      u = O, T = O.currentTarget, B(), !a.state.isVisible && wE(O) && Ti.forEach(function(zI) {
        return zI(O);
      }), O.type === "click" && (a.props.trigger.indexOf("mouseenter") < 0 || e) && a.props.hideOnClick !== !1 && a.state.isVisible ? nI = !0 : WI(O), O.type === "click" && (e = !nI), nI && !pI && _I(O);
    }
  }
  function fI(O) {
    var tI = O.target, nI = R().contains(tI) || c.contains(tI);
    if (!(O.type === "mousemove" && nI)) {
      var pI = GI().concat(c).map(function(zI) {
        var YM, gg = zI._tippy, Qt = (YM = gg.popperInstance) == null ? void 0 : YM.state;
        return Qt ? {
          popperRect: zI.getBoundingClientRect(),
          popperState: Qt,
          props: g
        } : null;
      }).filter(Boolean);
      mE(pI, O) && (iI(), _I(O));
    }
  }
  function HM(O) {
    var tI = Z(O) || a.props.trigger.indexOf("click") >= 0 && e;
    if (!tI) {
      if (a.props.interactive) {
        a.hideWithInteractivity(O);
        return;
      }
      _I(O);
    }
  }
  function NM(O) {
    a.props.trigger.indexOf("focusin") < 0 && O.target !== R() || a.props.interactive && O.relatedTarget && c.contains(O.relatedTarget) || _I(O);
  }
  function Z(O) {
    return kg.isTouch ? U() !== O.type.indexOf("touch") >= 0 : !1;
  }
  function bM() {
    oI();
    var O = a.props, tI = O.popperOptions, nI = O.placement, pI = O.offset, zI = O.getReferenceClientRect, YM = O.moveTransition, gg = gI() ? P0(c).arrow : null, Qt = zI ? {
      getBoundingClientRect: zI,
      contextElement: zI.contextElement || R()
    } : M, Hj = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Ci) {
        var ht = Ci.state;
        if (gI()) {
          var al = W(), yC = al.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(ui) {
            ui === "placement" ? yC.setAttribute("data-placement", ht.placement) : ht.attributes.popper["data-popper-" + ui] ? yC.setAttribute("data-" + ui, "") : yC.removeAttribute("data-" + ui);
          }), ht.attributes.popper = {};
        }
      }
    }, RA = [{
      name: "offset",
      options: {
        offset: pI
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !YM
      }
    }, Hj];
    gI() && gg && RA.push({
      name: "arrow",
      options: {
        element: gg,
        padding: 3
      }
    }), RA.push.apply(RA, (tI == null ? void 0 : tI.modifiers) || []), a.popperInstance = TE(Qt, c, Object.assign({}, tI, {
      placement: nI,
      onFirstUpdate: n,
      modifiers: RA
    }));
  }
  function oI() {
    a.popperInstance && (a.popperInstance.destroy(), a.popperInstance = null);
  }
  function q() {
    var O = a.props.appendTo, tI, nI = R();
    a.props.interactive && O === ss || O === "parent" ? tI = nI.parentNode : tI = Ss(O, [nI]), tI.contains(c) || tI.appendChild(c), a.state.isMounted = !0, bM(), process.env.NODE_ENV !== "production" && $g(a.props.interactive && O === _M.appendTo && nI.nextElementSibling !== c, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function GI() {
    return iN(c.querySelectorAll("[data-tippy-root]"));
  }
  function WI(O) {
    a.clearDelayTimeouts(), O && Q("onTrigger", [a, O]), sI();
    var tI = l(!0), nI = V(), pI = nI[0], zI = nI[1];
    kg.isTouch && pI === "hold" && zI && (tI = zI), tI ? A = setTimeout(function() {
      a.show();
    }, tI) : a.show();
  }
  function _I(O) {
    if (a.clearDelayTimeouts(), Q("onUntrigger", [a, O]), !a.state.isVisible) {
      PI();
      return;
    }
    if (!(a.props.trigger.indexOf("mouseenter") >= 0 && a.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(O.type) >= 0 && e)) {
      var tI = l(!1);
      tI ? t = setTimeout(function() {
        a.state.isVisible && a.hide();
      }, tI) : D = requestAnimationFrame(function() {
        a.hide();
      });
    }
  }
  function P() {
    a.state.isEnabled = !0;
  }
  function d() {
    a.hide(), a.state.isEnabled = !1;
  }
  function b() {
    clearTimeout(A), clearTimeout(t), cancelAnimationFrame(D);
  }
  function v(O) {
    if (process.env.NODE_ENV !== "production" && $g(a.state.isDestroyed, kt("setProps")), !a.state.isDestroyed) {
      Q("onBeforeUpdate", [a, O]), DM();
      var tI = a.props, nI = oL(M, Object.assign({}, tI, CL(O), {
        ignoreAttributes: !0
      }));
      a.props = nI, SM(), tI.interactiveDebounce !== nI.interactiveDebounce && (iI(), o = iL(fI, nI.interactiveDebounce)), tI.triggerTarget && !nI.triggerTarget ? Ut(tI.triggerTarget).forEach(function(pI) {
        pI.removeAttribute("aria-expanded");
      }) : nI.triggerTarget && M.removeAttribute("aria-expanded"), B(), w(), E && E(tI, nI), a.popperInstance && (bM(), GI().forEach(function(pI) {
        requestAnimationFrame(pI._tippy.popperInstance.forceUpdate);
      })), Q("onAfterUpdate", [a, O]);
    }
  }
  function II(O) {
    a.setProps({
      content: O
    });
  }
  function rI() {
    process.env.NODE_ENV !== "production" && $g(a.state.isDestroyed, kt("show"));
    var O = a.state.isVisible, tI = a.state.isDestroyed, nI = !a.state.isEnabled, pI = kg.isTouch && !a.props.touch, zI = JC(a.props.duration, 0, _M.duration);
    if (!(O || tI || nI || pI) && !R().hasAttribute("disabled") && (Q("onShow", [a], !1), a.props.onShow(a) !== !1)) {
      if (a.state.isVisible = !0, gI() && (c.style.visibility = "visible"), w(), sI(), a.state.isMounted || (c.style.transition = "none"), gI()) {
        var YM = W(), gg = YM.box, Qt = YM.content;
        BC([gg, Qt], 0);
      }
      n = function() {
        var RA;
        if (!(!a.state.isVisible || C)) {
          if (C = !0, c.offsetHeight, c.style.transition = a.props.moveTransition, gI() && a.props.animation) {
            var lC = W(), Ci = lC.box, ht = lC.content;
            BC([Ci, ht], zI), uL([Ci, ht], "visible");
          }
          k(), B(), NL(HC, a), (RA = a.popperInstance) == null || RA.forceUpdate(), Q("onMount", [a]), a.props.animation && gI() && UI(zI, function() {
            a.state.isShown = !0, Q("onShown", [a]);
          });
        }
      }, q();
    }
  }
  function $I() {
    process.env.NODE_ENV !== "production" && $g(a.state.isDestroyed, kt("hide"));
    var O = !a.state.isVisible, tI = a.state.isDestroyed, nI = !a.state.isEnabled, pI = JC(a.props.duration, 1, _M.duration);
    if (!(O || tI || nI) && (Q("onHide", [a], !1), a.props.onHide(a) !== !1)) {
      if (a.state.isVisible = !1, a.state.isShown = !1, C = !1, e = !1, gI() && (c.style.visibility = "hidden"), iI(), PI(), w(!0), gI()) {
        var zI = W(), YM = zI.box, gg = zI.content;
        a.props.animation && (BC([YM, gg], pI), uL([YM, gg], "hidden"));
      }
      k(), B(), a.props.animation ? gI() && KI(pI, a.unmount) : a.unmount();
    }
  }
  function WD(O) {
    process.env.NODE_ENV !== "production" && $g(a.state.isDestroyed, kt("hideWithInteractivity")), H().addEventListener("mousemove", o), NL(Ti, o), o(O);
  }
  function ZD() {
    process.env.NODE_ENV !== "production" && $g(a.state.isDestroyed, kt("unmount")), a.state.isVisible && a.hide(), a.state.isMounted && (oI(), GI().forEach(function(O) {
      O._tippy.unmount();
    }), c.parentNode && c.parentNode.removeChild(c), HC = HC.filter(function(O) {
      return O !== a;
    }), a.state.isMounted = !1, Q("onHidden", [a]));
  }
  function Sl() {
    process.env.NODE_ENV !== "production" && $g(a.state.isDestroyed, kt("destroy")), !a.state.isDestroyed && (a.clearDelayTimeouts(), a.unmount(), DM(), delete M._tippy, a.state.isDestroyed = !0, Q("onDestroy", [a]));
  }
}
function dt(M, I) {
  I === void 0 && (I = {});
  var g = _M.plugins.concat(I.plugins || []);
  process.env.NODE_ENV !== "production" && (PE(M), xs(I, g)), pE();
  var A = Object.assign({}, I, {
    plugins: g
  }), t = dE(M);
  if (process.env.NODE_ENV !== "production") {
    var D = de(A.content), e = t.length > 1;
    $g(D && e, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var i = t.reduce(function(N, C) {
    var u = C && JE(C, A);
    return u && N.push(u), N;
  }, []);
  return de(M) ? i[0] : i;
}
dt.defaultProps = _M;
dt.setDefaultProps = WE;
dt.currentInput = kg;
Object.assign({}, ts, {
  effect: function(I) {
    var g = I.state, A = {
      popper: {
        position: g.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(g.elements.popper.style, A.popper), g.styles = A, g.elements.arrow && Object.assign(g.elements.arrow.style, A.arrow);
  }
});
dt.setDefaultProps({
  render: rs
});
class BE {
  constructor({ editor: I, element: g, view: A, tippyOptions: t = {}, shouldShow: D }) {
    this.preventHide = !1, this.shouldShow = ({ view: e, state: i, from: N, to: C }) => {
      const { doc: u, selection: j } = i, { empty: n } = j, L = !u.textBetween(N, C).length && bu(i.selection), o = this.element.contains(document.activeElement);
      return !(!(e.hasFocus() || o) || n || L || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.dragstartHandler = () => {
      this.hide();
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: e }) => {
      var i;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      (e == null ? void 0 : e.relatedTarget) && ((i = this.element.parentNode) === null || i === void 0 ? void 0 : i.contains(e.relatedTarget)) || this.hide();
    }, this.editor = I, this.element = g, this.view = A, D && (this.shouldShow = D), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = t, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: I } = this.editor.options, g = !!I.parentElement;
    this.tippy || !g || (this.tippy = dt(I, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", (A) => {
      this.blurHandler({ event: A });
    }));
  }
  update(I, g) {
    var A, t, D;
    const { state: e, composing: i } = I, { doc: N, selection: C } = e, u = g && g.doc.eq(N) && g.selection.eq(C);
    if (i || u)
      return;
    this.createTooltip();
    const { ranges: j } = C, n = Math.min(...j.map((T) => T.$from.pos)), L = Math.max(...j.map((T) => T.$to.pos));
    if (!((A = this.shouldShow) === null || A === void 0 ? void 0 : A.call(this, {
      editor: this.editor,
      view: I,
      state: e,
      oldState: g,
      from: n,
      to: L
    }))) {
      this.hide();
      return;
    }
    (t = this.tippy) === null || t === void 0 || t.setProps({
      getReferenceClientRect: ((D = this.tippyOptions) === null || D === void 0 ? void 0 : D.getReferenceClientRect) || (() => {
        if (pr(e.selection)) {
          const T = I.nodeDOM(n);
          if (T)
            return T.getBoundingClientRect();
        }
        return Is(I, n, L);
      })
    }), this.show();
  }
  show() {
    var I;
    (I = this.tippy) === null || I === void 0 || I.show();
  }
  hide() {
    var I;
    (I = this.tippy) === null || I === void 0 || I.hide();
  }
  destroy() {
    var I;
    (I = this.tippy) === null || I === void 0 || I.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const ws = (M) => new XI({
  key: typeof M.pluginKey == "string" ? new TM(M.pluginKey) : M.pluginKey,
  view: (I) => new BE({ view: I, ...M })
});
tM.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      ws({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
class RE {
  constructor({ editor: I, element: g, view: A, tippyOptions: t = {}, shouldShow: D }) {
    this.preventHide = !1, this.shouldShow = ({ view: e, state: i }) => {
      const { selection: N } = i, { $anchor: C, empty: u } = N, j = C.depth === 1, n = C.parent.isTextblock && !C.parent.type.spec.code && !C.parent.textContent;
      return !(!e.hasFocus() || !u || !j || !n || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: e }) => {
      var i;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      (e == null ? void 0 : e.relatedTarget) && ((i = this.element.parentNode) === null || i === void 0 ? void 0 : i.contains(e.relatedTarget)) || this.hide();
    }, this.editor = I, this.element = g, this.view = A, D && (this.shouldShow = D), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = t, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: I } = this.editor.options, g = !!I.parentElement;
    this.tippy || !g || (this.tippy = dt(I, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", (A) => {
      this.blurHandler({ event: A });
    }));
  }
  update(I, g) {
    var A, t, D;
    const { state: e } = I, { doc: i, selection: N } = e, { from: C, to: u } = N;
    if (g && g.doc.eq(i) && g.selection.eq(N))
      return;
    if (this.createTooltip(), !((A = this.shouldShow) === null || A === void 0 ? void 0 : A.call(this, {
      editor: this.editor,
      view: I,
      state: e,
      oldState: g
    }))) {
      this.hide();
      return;
    }
    (t = this.tippy) === null || t === void 0 || t.setProps({
      getReferenceClientRect: ((D = this.tippyOptions) === null || D === void 0 ? void 0 : D.getReferenceClientRect) || (() => Is(I, C, u))
    }), this.show();
  }
  show() {
    var I;
    (I = this.tippy) === null || I === void 0 || I.show();
  }
  hide() {
    var I;
    (I = this.tippy) === null || I === void 0 || I.hide();
  }
  destroy() {
    var I;
    (I = this.tippy) === null || I === void 0 || I.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const Es = (M) => new XI({
  key: typeof M.pluginKey == "string" ? new TM(M.pluginKey) : M.pluginKey,
  view: (I) => new RE({ view: I, ...M })
});
tM.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "floatingMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Es({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
const HE = eI({
  name: "BubbleMenu",
  props: {
    pluginKey: {
      type: null,
      default: "bubbleMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(M, { slots: I }) {
    const g = h(null);
    return RI(() => {
      const { pluginKey: A, editor: t, tippyOptions: D, shouldShow: e } = M;
      t.registerPlugin(ws({
        pluginKey: A,
        editor: t,
        element: g.value,
        tippyOptions: D,
        shouldShow: e
      }));
    }), kM(() => {
      const { pluginKey: A, editor: t } = M;
      t.unregisterPlugin(A);
    }), () => {
      var A;
      return QA("div", { ref: g }, (A = I.default) === null || A === void 0 ? void 0 : A.call(I));
    };
  }
});
function SL(M) {
  return ll((I, g) => ({
    get() {
      return I(), M;
    },
    set(A) {
      M = A, requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          g();
        });
      });
    }
  }));
}
class VE extends ew {
  constructor(I = {}) {
    return super(I), this.vueRenderers = QD(/* @__PURE__ */ new Map()), this.contentComponent = null, this.reactiveState = SL(this.view.state), this.reactiveExtensionStorage = SL(this.extensionStorage), this.on("transaction", () => {
      this.reactiveState.value = this.view.state, this.reactiveExtensionStorage.value = this.extensionStorage;
    }), cI(this);
  }
  get state() {
    return this.reactiveState ? this.reactiveState.value : this.view.state;
  }
  get storage() {
    return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
  }
  registerPlugin(I, g) {
    super.registerPlugin(I, g), this.reactiveState.value = this.view.state;
  }
  unregisterPlugin(I) {
    super.unregisterPlugin(I), this.reactiveState.value = this.view.state;
  }
}
const FE = eI({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(M) {
    const I = h(), g = Lg();
    return Cu(() => {
      const A = M.editor;
      A && A.options.element && I.value && VI(() => {
        if (!I.value || !A.options.element.firstChild)
          return;
        const t = r(I.value);
        I.value.append(...A.options.element.childNodes), A.contentComponent = g.ctx._, A.setOptions({
          element: t
        }), A.createNodeViews();
      });
    }), kM(() => {
      const A = M.editor;
      if (!A || (A.isDestroyed || A.view.setProps({
        nodeViews: {}
      }), A.contentComponent = null, !A.options.element.firstChild))
        return;
      const t = document.createElement("div");
      t.append(...A.options.element.childNodes), A.setOptions({
        element: t
      });
    }), { rootEl: I };
  },
  render() {
    const M = [];
    return this.editor && this.editor.vueRenderers.forEach((I) => {
      const g = QA(wT, {
        to: I.teleportElement,
        key: I.id
      }, QA(I.component, {
        ref: I.id,
        ...I.props
      }));
      M.push(g);
    }), QA("div", {
      ref: (I) => {
        this.rootEl = I;
      }
    }, ...M);
  }
}), XE = eI({
  name: "FloatingMenu",
  props: {
    pluginKey: {
      type: null,
      default: "floatingMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(M, { slots: I }) {
    const g = h(null);
    return RI(() => {
      const { pluginKey: A, editor: t, tippyOptions: D, shouldShow: e } = M;
      t.registerPlugin(Es({
        pluginKey: A,
        editor: t,
        element: g.value,
        tippyOptions: D,
        shouldShow: e
      }));
    }), kM(() => {
      const { pluginKey: A, editor: t } = M;
      t.unregisterPlugin(A);
    }), () => {
      var A;
      return QA("div", { ref: g }, (A = I.default) === null || A === void 0 ? void 0 : A.call(I));
    };
  }
}), Wu = eI({
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return QA(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
}), qe = eI({
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  inject: ["onDragStart", "decorationClasses"],
  render() {
    var M, I;
    return QA(this.as, {
      class: this.decorationClasses,
      style: {
        whiteSpace: "normal"
      },
      "data-node-view-wrapper": "",
      onDragstart: this.onDragStart
    }, (I = (M = this.$slots).default) === null || I === void 0 ? void 0 : I.call(M));
  }
}), KE = (M = {}) => {
  const I = gD();
  return RI(() => {
    I.value = new VE(M);
  }), kM(() => {
    var g;
    (g = I.value) === null || g === void 0 || g.destroy();
  }), I;
};
class _E {
  constructor(I, { props: g = {}, editor: A }) {
    if (this.id = Math.floor(Math.random() * 4294967295).toString(), this.editor = A, this.component = cI(I), this.teleportElement = document.createElement("div"), this.element = this.teleportElement, this.props = QD(g), this.editor.vueRenderers.set(this.id, this), this.editor.contentComponent) {
      if (this.editor.contentComponent.update(), this.teleportElement.children.length !== 1)
        throw Error("VueRenderer doesn\u2019t support multiple child elements.");
      this.element = this.teleportElement.firstElementChild;
    }
  }
  get ref() {
    var I;
    return (I = this.editor.contentComponent) === null || I === void 0 ? void 0 : I.refs[this.id];
  }
  updateProps(I = {}) {
    Object.entries(I).forEach(([g, A]) => {
      this.props[g] = A;
    });
  }
  destroy() {
    this.editor.vueRenderers.delete(this.id);
  }
}
const Ii = {
  editor: {
    type: Object,
    required: !0
  },
  node: {
    type: Object,
    required: !0
  },
  decorations: {
    type: Object,
    required: !0
  },
  selected: {
    type: Boolean,
    required: !0
  },
  extension: {
    type: Object,
    required: !0
  },
  getPos: {
    type: Function,
    required: !0
  },
  updateAttributes: {
    type: Function,
    required: !0
  },
  deleteNode: {
    type: Function,
    required: !0
  }
};
class $E extends iw {
  mount() {
    const I = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      selected: !1,
      extension: this.extension,
      getPos: () => this.getPos(),
      updateAttributes: (t = {}) => this.updateAttributes(t),
      deleteNode: () => this.deleteNode()
    }, g = this.onDragStart.bind(this);
    this.decorationClasses = h(this.getDecorationClasses());
    const A = eI({
      extends: { ...this.component },
      props: Object.keys(I),
      template: this.component.template,
      setup: (t) => {
        var D, e;
        return LM("onDragStart", g), LM("decorationClasses", this.decorationClasses), (e = (D = this.component).setup) === null || e === void 0 ? void 0 : e.call(D, t, {
          expose: () => {
          }
        });
      },
      __scopeId: this.component.__scopeId,
      __cssModules: this.component.__cssModules
    });
    this.renderer = new _E(A, {
      editor: this.editor,
      props: I
    });
  }
  get dom() {
    if (!this.renderer.element.hasAttribute("data-node-view-wrapper"))
      throw Error("Please use the NodeViewWrapper component for your node view.");
    return this.renderer.element;
  }
  get contentDOM() {
    return this.node.isLeaf ? null : this.dom.querySelector("[data-node-view-content]") || this.dom;
  }
  update(I, g) {
    const A = (t) => {
      this.decorationClasses.value = this.getDecorationClasses(), this.renderer.updateProps(t);
    };
    if (typeof this.options.update == "function") {
      const t = this.node, D = this.decorations;
      return this.node = I, this.decorations = g, this.options.update({
        oldNode: t,
        oldDecorations: D,
        newNode: I,
        newDecorations: g,
        updateProps: () => A({ node: I, decorations: g })
      });
    }
    return I.type !== this.node.type ? !1 : (I === this.node && this.decorations === g || (this.node = I, this.decorations = g, A({ node: I, decorations: g })), !0);
  }
  selectNode() {
    this.renderer.updateProps({
      selected: !0
    });
  }
  deselectNode() {
    this.renderer.updateProps({
      selected: !1
    });
  }
  getDecorationClasses() {
    return this.decorations.map((I) => I.type.attrs.class).flat().join(" ");
  }
  destroy() {
    this.renderer.destroy();
  }
}
function Mi(M, I) {
  return (g) => g.editor.contentComponent ? new $E(M, g, I) : {};
}
const qE = MM({
  find: /--$/,
  replace: "\u2014"
}), Id = MM({
  find: /\.\.\.$/,
  replace: "\u2026"
}), Md = MM({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/,
  replace: "\u201C"
}), gd = MM({
  find: /"$/,
  replace: "\u201D"
}), Ad = MM({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/,
  replace: "\u2018"
}), td = MM({
  find: /'$/,
  replace: "\u2019"
}), Dd = MM({
  find: /<-$/,
  replace: "\u2190"
}), ed = MM({
  find: /->$/,
  replace: "\u2192"
}), id = MM({
  find: /\(c\)$/,
  replace: "\xA9"
}), Nd = MM({
  find: /\(tm\)$/,
  replace: "\u2122"
}), Cd = MM({
  find: /\(r\)$/,
  replace: "\xAE"
}), ud = MM({
  find: /1\/2$/,
  replace: "\xBD"
}), jd = MM({
  find: /\+\/-$/,
  replace: "\xB1"
}), nd = MM({
  find: /!=$/,
  replace: "\u2260"
}), Ld = MM({
  find: /<<$/,
  replace: "\xAB"
}), od = MM({
  find: />>$/,
  replace: "\xBB"
}), Td = MM({
  find: /\d+\s?([*x])\s?\d+$/,
  replace: "\xD7"
}), sd = MM({
  find: /\^2$/,
  replace: "\xB2"
}), Sd = MM({
  find: /\^3$/,
  replace: "\xB3"
}), ad = MM({
  find: /1\/4$/,
  replace: "\xBC"
}), ld = MM({
  find: /3\/4$/,
  replace: "\xBE"
}), yd = tM.create({
  name: "typography",
  addInputRules() {
    const M = [];
    return this.options.emDash !== !1 && M.push(qE), this.options.ellipsis !== !1 && M.push(Id), this.options.openDoubleQuote !== !1 && M.push(Md), this.options.closeDoubleQuote !== !1 && M.push(gd), this.options.openSingleQuote !== !1 && M.push(Ad), this.options.closeSingleQuote !== !1 && M.push(td), this.options.leftArrow !== !1 && M.push(Dd), this.options.rightArrow !== !1 && M.push(ed), this.options.copyright !== !1 && M.push(id), this.options.trademark !== !1 && M.push(Nd), this.options.registeredTrademark !== !1 && M.push(Cd), this.options.oneHalf !== !1 && M.push(ud), this.options.plusMinus !== !1 && M.push(jd), this.options.notEqual !== !1 && M.push(nd), this.options.laquo !== !1 && M.push(Ld), this.options.raquo !== !1 && M.push(od), this.options.multiplication !== !1 && M.push(Td), this.options.superscriptTwo !== !1 && M.push(sd), this.options.superscriptThree !== !1 && M.push(Sd), this.options.oneQuarter !== !1 && M.push(ad), this.options.threeQuarters !== !1 && M.push(ld), M;
  }
}), cd = /^\s*>\s$/, xd = JI.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["blockquote", OI(this.options.HTMLAttributes, M), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: M }) => M.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: M }) => M.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: M }) => M.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      IC({
        find: cd,
        type: this.type
      })
    ];
  }
}), rd = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))$/, wd = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))/g, Ed = /(?:^|\s)((?:__)((?:[^__]+))(?:__))$/, dd = /(?:^|\s)((?:__)((?:[^__]+))(?:__))/g, zd = zg.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (M) => M.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight",
        getAttrs: (M) => /^(bold(er)?|[5-9]\d{2,})$/.test(M) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["strong", OI(this.options.HTMLAttributes, M), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: M }) => M.setMark(this.name),
      toggleBold: () => ({ commands: M }) => M.toggleMark(this.name),
      unsetBold: () => ({ commands: M }) => M.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      lt({
        find: rd,
        type: this.type
      }),
      lt({
        find: Ed,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      GA({
        find: wd,
        type: this.type
      }),
      GA({
        find: dd,
        type: this.type
      })
    ];
  }
}), md = /^\s*([-+*])\s$/, bd = JI.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["ul", OI(this.options.HTMLAttributes, M), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: M }) => M.toggleList(this.name, this.options.itemTypeName)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    return [
      IC({
        find: md,
        type: this.type
      })
    ];
  }
}), Yd = /(?:^|\s)((?:`)((?:[^`]+))(?:`))$/, pd = /(?:^|\s)((?:`)((?:[^`]+))(?:`))/g, Qd = zg.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["code", OI(this.options.HTMLAttributes, M), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands: M }) => M.setMark(this.name),
      toggleCode: () => ({ commands: M }) => M.toggleMark(this.name),
      unsetCode: () => ({ commands: M }) => M.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      lt({
        find: Yd,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      GA({
        find: pd,
        type: this.type
      })
    ];
  }
}), hd = /^```([a-z]+)?[\s\n]$/, Od = /^~~~([a-z]+)?[\s\n]$/, ds = JI.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: null,
        parseHTML: (M) => {
          var I;
          const { languageClassPrefix: g } = this.options, D = [...((I = M.firstElementChild) === null || I === void 0 ? void 0 : I.classList) || []].filter((e) => e.startsWith(g)).map((e) => e.replace(g, ""))[0];
          return D || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: M, HTMLAttributes: I }) {
    return [
      "pre",
      OI(this.options.HTMLAttributes, I),
      [
        "code",
        {
          class: M.attrs.language ? this.options.languageClassPrefix + M.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (M) => ({ commands: I }) => I.setNode(this.name, M),
      toggleCodeBlock: (M) => ({ commands: I }) => I.toggleNode(this.name, "paragraph", M)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      Backspace: () => {
        const { empty: M, $anchor: I } = this.editor.state.selection, g = I.pos === 1;
        return !M || I.parent.type.name !== this.name ? !1 : g || !I.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      Enter: ({ editor: M }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: I } = M, { selection: g } = I, { $from: A, empty: t } = g;
        if (!t || A.parent.type !== this.type)
          return !1;
        const D = A.parentOffset === A.parent.nodeSize - 2, e = A.parent.textContent.endsWith(`

`);
        return !D || !e ? !1 : M.chain().command(({ tr: i }) => (i.delete(A.pos - 2, A.pos), !0)).exitCode().run();
      },
      ArrowDown: ({ editor: M }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: I } = M, { selection: g, doc: A } = I, { $from: t, empty: D } = g;
        if (!D || t.parent.type !== this.type || !(t.parentOffset === t.parent.nodeSize - 2))
          return !1;
        const i = t.after();
        return i === void 0 || A.nodeAt(i) ? !1 : M.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      Y0({
        find: hd,
        type: this.type,
        getAttributes: (M) => ({
          language: M[1]
        })
      }),
      Y0({
        find: Od,
        type: this.type,
        getAttributes: (M) => ({
          language: M[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      new XI({
        key: new TM("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (M, I) => {
            if (!I.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const g = I.clipboardData.getData("text/plain"), A = I.clipboardData.getData("vscode-editor-data"), t = A ? JSON.parse(A) : void 0, D = t == null ? void 0 : t.mode;
            if (!g || !D)
              return !1;
            const { tr: e } = M.state;
            return e.replaceSelectionWith(this.type.create({ language: D })), e.setSelection(LI.near(e.doc.resolve(Math.max(0, e.selection.from - 2)))), e.insertText(g.replace(/\r\n?/g, `
`)), e.setMeta("paste", !0), M.dispatch(e), !0;
          }
        }
      })
    ];
  }
}), zs = JI.create({
  name: "doc",
  topNode: !0,
  content: "block+"
});
function kd(M = {}) {
  return new XI({
    view(I) {
      return new Pd(I, M);
    }
  });
}
class Pd {
  constructor(I, g) {
    this.editorView = I, this.cursorPos = null, this.element = null, this.timeout = -1, this.width = g.width || 1, this.color = g.color || "black", this.class = g.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((A) => {
      let t = (D) => {
        this[A](D);
      };
      return I.dom.addEventListener(A, t), { name: A, handler: t };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: I, handler: g }) => this.editorView.dom.removeEventListener(I, g));
  }
  update(I, g) {
    this.cursorPos != null && g.doc != I.state.doc && (this.cursorPos > I.state.doc.content.size ? this.setCursor(null) : this.updateOverlay());
  }
  setCursor(I) {
    I != this.cursorPos && (this.cursorPos = I, I == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let I = this.editorView.state.doc.resolve(this.cursorPos), g;
    if (!I.parent.inlineContent) {
      let e = I.nodeBefore, i = I.nodeAfter;
      if (e || i) {
        let N = this.editorView.nodeDOM(this.cursorPos - (e ? e.nodeSize : 0)).getBoundingClientRect(), C = e ? N.bottom : N.top;
        e && i && (C = (C + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2), g = { left: N.left, right: N.right, top: C - this.width / 2, bottom: C + this.width / 2 };
      }
    }
    if (!g) {
      let e = this.editorView.coordsAtPos(this.cursorPos);
      g = { left: e.left - this.width / 2, right: e.left + this.width / 2, top: e.top, bottom: e.bottom };
    }
    let A = this.editorView.dom.offsetParent;
    this.element || (this.element = A.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none; background-color: " + this.color);
    let t, D;
    if (!A || A == document.body && getComputedStyle(A).position == "static")
      t = -pageXOffset, D = -pageYOffset;
    else {
      let e = A.getBoundingClientRect();
      t = e.left - A.scrollLeft, D = e.top - A.scrollTop;
    }
    this.element.style.left = g.left - t + "px", this.element.style.top = g.top - D + "px", this.element.style.width = g.right - g.left + "px", this.element.style.height = g.bottom - g.top + "px";
  }
  scheduleRemoval(I) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), I);
  }
  dragover(I) {
    if (!this.editorView.editable)
      return;
    let g = this.editorView.posAtCoords({ left: I.clientX, top: I.clientY }), A = g && g.inside >= 0 && this.editorView.state.doc.nodeAt(g.inside), t = A && A.type.spec.disableDropCursor, D = typeof t == "function" ? t(this.editorView, g) : t;
    if (g && !D) {
      let e = g.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice && (e = M4(this.editorView.state.doc, e, this.editorView.dragging.slice), e == null))
        return this.setCursor(null);
      this.setCursor(e), this.scheduleRemoval(5e3);
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(I) {
    (I.target == this.editorView.dom || !this.editorView.dom.contains(I.relatedTarget)) && this.setCursor(null);
  }
}
const fd = tM.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      kd(this.options)
    ];
  }
});
class HI extends uI {
  constructor(I) {
    super(I, I);
  }
  map(I, g) {
    let A = I.resolve(g.map(this.head));
    return HI.valid(A) ? new HI(A) : uI.near(A);
  }
  content() {
    return K.empty;
  }
  eq(I) {
    return I instanceof HI && I.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  static fromJSON(I, g) {
    if (typeof g.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new HI(I.resolve(g.pos));
  }
  getBookmark() {
    return new Zu(this.anchor);
  }
  static valid(I) {
    let g = I.parent;
    if (g.isTextblock || !Gd(I) || !Wd(I))
      return !1;
    let A = g.type.spec.allowGapCursor;
    if (A != null)
      return A;
    let t = g.contentMatchAt(I.index()).defaultType;
    return t && t.isTextblock;
  }
  static findGapCursorFrom(I, g, A = !1) {
    I:
      for (; ; ) {
        if (!A && HI.valid(I))
          return I;
        let t = I.pos, D = null;
        for (let e = I.depth; ; e--) {
          let i = I.node(e);
          if (g > 0 ? I.indexAfter(e) < i.childCount : I.index(e) > 0) {
            D = i.child(g > 0 ? I.indexAfter(e) : I.index(e) - 1);
            break;
          } else if (e == 0)
            return null;
          t += g;
          let N = I.doc.resolve(t);
          if (HI.valid(N))
            return N;
        }
        for (; ; ) {
          let e = g > 0 ? D.firstChild : D.lastChild;
          if (!e) {
            if (D.isAtom && !D.isText && !CI.isSelectable(D)) {
              I = I.doc.resolve(t + D.nodeSize * g), A = !1;
              continue I;
            }
            break;
          }
          D = e, t += g;
          let i = I.doc.resolve(t);
          if (HI.valid(i))
            return i;
        }
        return null;
      }
  }
}
HI.prototype.visible = !1;
HI.findFrom = HI.findGapCursorFrom;
uI.jsonID("gapcursor", HI);
class Zu {
  constructor(I) {
    this.pos = I;
  }
  map(I) {
    return new Zu(I.map(this.pos));
  }
  resolve(I) {
    let g = I.resolve(this.pos);
    return HI.valid(g) ? new HI(g) : uI.near(g);
  }
}
function Gd(M) {
  for (let I = M.depth; I >= 0; I--) {
    let g = M.index(I), A = M.node(I);
    if (g == 0) {
      if (A.type.spec.isolating)
        return !0;
      continue;
    }
    for (let t = A.child(g - 1); ; t = t.lastChild) {
      if (t.childCount == 0 && !t.inlineContent || t.isAtom || t.type.spec.isolating)
        return !0;
      if (t.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Wd(M) {
  for (let I = M.depth; I >= 0; I--) {
    let g = M.indexAfter(I), A = M.node(I);
    if (g == A.childCount) {
      if (A.type.spec.isolating)
        return !0;
      continue;
    }
    for (let t = A.child(g); ; t = t.firstChild) {
      if (t.childCount == 0 && !t.inlineContent || t.isAtom || t.type.spec.isolating)
        return !0;
      if (t.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Zd() {
  return new XI({
    props: {
      decorations: Bd,
      createSelectionBetween(M, I, g) {
        return I.pos == g.pos && HI.valid(g) ? new HI(g) : null;
      },
      handleClick: Ud,
      handleKeyDown: vd,
      handleDOMEvents: { beforeinput: Jd }
    }
  });
}
const vd = du({
  ArrowLeft: si("horiz", -1),
  ArrowRight: si("horiz", 1),
  ArrowUp: si("vert", -1),
  ArrowDown: si("vert", 1)
});
function si(M, I) {
  const g = M == "vert" ? I > 0 ? "down" : "up" : I > 0 ? "right" : "left";
  return function(A, t, D) {
    let e = A.selection, i = I > 0 ? e.$to : e.$from, N = e.empty;
    if (e instanceof LI) {
      if (!D.endOfTextblock(g) || i.depth == 0)
        return !1;
      N = !1, i = A.doc.resolve(I > 0 ? i.after() : i.before());
    }
    let C = HI.findGapCursorFrom(i, I, N);
    return C ? (t && t(A.tr.setSelection(new HI(C))), !0) : !1;
  };
}
function Ud(M, I, g) {
  if (!M || !M.editable)
    return !1;
  let A = M.state.doc.resolve(I);
  if (!HI.valid(A))
    return !1;
  let t = M.posAtCoords({ left: g.clientX, top: g.clientY });
  return t && t.inside > -1 && CI.isSelectable(M.state.doc.nodeAt(t.inside)) ? !1 : (M.dispatch(M.state.tr.setSelection(new HI(A))), !0);
}
function Jd(M, I) {
  if (I.inputType != "insertCompositionText" || !(M.state.selection instanceof HI))
    return !1;
  let { $from: g } = M.state.selection, A = g.parent.contentMatchAt(g.index()).findWrapping(M.state.schema.nodes.text);
  if (!A)
    return !1;
  let t = G.empty;
  for (let e = A.length - 1; e >= 0; e--)
    t = G.from(A[e].createAndFill(null, t));
  let D = M.state.tr.replace(g.pos, g.pos, new K(t, 0, 0));
  return D.setSelection(LI.near(D.doc.resolve(g.pos + 1))), M.dispatch(D), !1;
}
function Bd(M) {
  if (!(M.selection instanceof HI))
    return null;
  let I = document.createElement("div");
  return I.className = "ProseMirror-gapcursor", qI.create(M.doc, [zM.widget(M.selection.head, I, { key: "gapcursor" })]);
}
const Rd = tM.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      Zd()
    ];
  },
  extendNodeSchema(M) {
    var I;
    const g = {
      name: M.name,
      options: M.options,
      storage: M.storage
    };
    return {
      allowGapCursor: (I = lI(AI(M, "allowGapCursor", g))) !== null && I !== void 0 ? I : null
    };
  }
}), Hd = JI.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["br", OI(this.options.HTMLAttributes, M)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: M, chain: I, state: g, editor: A }) => M.first([
        () => M.exitCode(),
        () => M.command(() => {
          const { selection: t, storedMarks: D } = g;
          if (t.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: e } = this.options, { splittableMarks: i } = A.extensionManager, N = D || t.$to.parentOffset && t.$from.marks();
          return I().insertContent({ type: this.name }).command(({ tr: C, dispatch: u }) => {
            if (u && N && e) {
              const j = N.filter((n) => i.includes(n.type.name));
              C.ensureMarks(j);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), Vd = JI.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((M) => ({
      tag: `h${M}`,
      attrs: { level: M }
    }));
  },
  renderHTML({ node: M, HTMLAttributes: I }) {
    return [`h${this.options.levels.includes(M.attrs.level) ? M.attrs.level : this.options.levels[0]}`, OI(this.options.HTMLAttributes, I), 0];
  },
  addCommands() {
    return {
      setHeading: (M) => ({ commands: I }) => this.options.levels.includes(M.level) ? I.setNode(this.name, M) : !1,
      toggleHeading: (M) => ({ commands: I }) => this.options.levels.includes(M.level) ? I.toggleNode(this.name, "paragraph", M) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((M, I) => ({
      ...M,
      [`Mod-Alt-${I}`]: () => this.editor.commands.toggleHeading({ level: I })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((M) => Y0({
      find: new RegExp(`^(#{1,${M}})\\s$`),
      type: this.type,
      getAttributes: {
        level: M
      }
    }));
  }
});
var NN = 200, cM = function() {
};
cM.prototype.append = function(I) {
  return I.length ? (I = cM.from(I), !this.length && I || I.length < NN && this.leafAppend(I) || this.length < NN && I.leafPrepend(this) || this.appendInner(I)) : this;
};
cM.prototype.prepend = function(I) {
  return I.length ? cM.from(I).append(this) : this;
};
cM.prototype.appendInner = function(I) {
  return new Fd(this, I);
};
cM.prototype.slice = function(I, g) {
  return I === void 0 && (I = 0), g === void 0 && (g = this.length), I >= g ? cM.empty : this.sliceInner(Math.max(0, I), Math.min(this.length, g));
};
cM.prototype.get = function(I) {
  if (!(I < 0 || I >= this.length))
    return this.getInner(I);
};
cM.prototype.forEach = function(I, g, A) {
  g === void 0 && (g = 0), A === void 0 && (A = this.length), g <= A ? this.forEachInner(I, g, A, 0) : this.forEachInvertedInner(I, g, A, 0);
};
cM.prototype.map = function(I, g, A) {
  g === void 0 && (g = 0), A === void 0 && (A = this.length);
  var t = [];
  return this.forEach(function(D, e) {
    return t.push(I(D, e));
  }, g, A), t;
};
cM.from = function(I) {
  return I instanceof cM ? I : I && I.length ? new ms(I) : cM.empty;
};
var ms = /* @__PURE__ */ function(M) {
  function I(A) {
    M.call(this), this.values = A;
  }
  M && (I.__proto__ = M), I.prototype = Object.create(M && M.prototype), I.prototype.constructor = I;
  var g = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return I.prototype.flatten = function() {
    return this.values;
  }, I.prototype.sliceInner = function(t, D) {
    return t == 0 && D == this.length ? this : new I(this.values.slice(t, D));
  }, I.prototype.getInner = function(t) {
    return this.values[t];
  }, I.prototype.forEachInner = function(t, D, e, i) {
    for (var N = D; N < e; N++)
      if (t(this.values[N], i + N) === !1)
        return !1;
  }, I.prototype.forEachInvertedInner = function(t, D, e, i) {
    for (var N = D - 1; N >= e; N--)
      if (t(this.values[N], i + N) === !1)
        return !1;
  }, I.prototype.leafAppend = function(t) {
    if (this.length + t.length <= NN)
      return new I(this.values.concat(t.flatten()));
  }, I.prototype.leafPrepend = function(t) {
    if (this.length + t.length <= NN)
      return new I(t.flatten().concat(this.values));
  }, g.length.get = function() {
    return this.values.length;
  }, g.depth.get = function() {
    return 0;
  }, Object.defineProperties(I.prototype, g), I;
}(cM);
cM.empty = new ms([]);
var Fd = /* @__PURE__ */ function(M) {
  function I(g, A) {
    M.call(this), this.left = g, this.right = A, this.length = g.length + A.length, this.depth = Math.max(g.depth, A.depth) + 1;
  }
  return M && (I.__proto__ = M), I.prototype = Object.create(M && M.prototype), I.prototype.constructor = I, I.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, I.prototype.getInner = function(A) {
    return A < this.left.length ? this.left.get(A) : this.right.get(A - this.left.length);
  }, I.prototype.forEachInner = function(A, t, D, e) {
    var i = this.left.length;
    if (t < i && this.left.forEachInner(A, t, Math.min(D, i), e) === !1 || D > i && this.right.forEachInner(A, Math.max(t - i, 0), Math.min(this.length, D) - i, e + i) === !1)
      return !1;
  }, I.prototype.forEachInvertedInner = function(A, t, D, e) {
    var i = this.left.length;
    if (t > i && this.right.forEachInvertedInner(A, t - i, Math.max(D, i) - i, e + i) === !1 || D < i && this.left.forEachInvertedInner(A, Math.min(t, i), D, e) === !1)
      return !1;
  }, I.prototype.sliceInner = function(A, t) {
    if (A == 0 && t == this.length)
      return this;
    var D = this.left.length;
    return t <= D ? this.left.slice(A, t) : A >= D ? this.right.slice(A - D, t - D) : this.left.slice(A, D).append(this.right.slice(0, t - D));
  }, I.prototype.leafAppend = function(A) {
    var t = this.right.leafAppend(A);
    if (t)
      return new I(this.left, t);
  }, I.prototype.leafPrepend = function(A) {
    var t = this.left.leafPrepend(A);
    if (t)
      return new I(t, this.right);
  }, I.prototype.appendInner = function(A) {
    return this.left.depth >= Math.max(this.right.depth, A.depth) + 1 ? new I(this.left, new I(this.right, A)) : new I(this, A);
  }, I;
}(cM), bs = cM;
const Xd = 500;
class yg {
  constructor(I, g) {
    this.items = I, this.eventCount = g;
  }
  popEvent(I, g) {
    if (this.eventCount == 0)
      return null;
    let A = this.items.length;
    for (; ; A--)
      if (this.items.get(A - 1).selection) {
        --A;
        break;
      }
    let t, D;
    g && (t = this.remapping(A, this.items.length), D = t.maps.length);
    let e = I.tr, i, N, C = [], u = [];
    return this.items.forEach((j, n) => {
      if (!j.step) {
        t || (t = this.remapping(A, n + 1), D = t.maps.length), D--, u.push(j);
        return;
      }
      if (t) {
        u.push(new hg(j.map));
        let L = j.step.map(t.slice(D)), o;
        L && e.maybeStep(L).doc && (o = e.mapping.maps[e.mapping.maps.length - 1], C.push(new hg(o, void 0, void 0, C.length + u.length))), D--, o && t.appendMap(o, D);
      } else
        e.maybeStep(j.step);
      if (j.selection)
        return i = t ? j.selection.map(t.slice(D)) : j.selection, N = new yg(this.items.slice(0, A).append(u.reverse().concat(C)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: N, transform: e, selection: i };
  }
  addTransform(I, g, A, t) {
    let D = [], e = this.eventCount, i = this.items, N = !t && i.length ? i.get(i.length - 1) : null;
    for (let u = 0; u < I.steps.length; u++) {
      let j = I.steps[u].invert(I.docs[u]), n = new hg(I.mapping.maps[u], j, g), L;
      (L = N && N.merge(n)) && (n = L, u ? D.pop() : i = i.slice(0, i.length - 1)), D.push(n), g && (e++, g = void 0), t || (N = n);
    }
    let C = e - A.depth;
    return C > _d && (i = Kd(i, C), e -= C), new yg(i.append(D), e);
  }
  remapping(I, g) {
    let A = new AD();
    return this.items.forEach((t, D) => {
      let e = t.mirrorOffset != null && D - t.mirrorOffset >= I ? A.maps.length - t.mirrorOffset : void 0;
      A.appendMap(t.map, e);
    }, I, g), A;
  }
  addMaps(I) {
    return this.eventCount == 0 ? this : new yg(this.items.append(I.map((g) => new hg(g))), this.eventCount);
  }
  rebased(I, g) {
    if (!this.eventCount)
      return this;
    let A = [], t = Math.max(0, this.items.length - g), D = I.mapping, e = I.steps.length, i = this.eventCount;
    this.items.forEach((n) => {
      n.selection && i--;
    }, t);
    let N = g;
    this.items.forEach((n) => {
      let L = D.getMirror(--N);
      if (L == null)
        return;
      e = Math.min(e, L);
      let o = D.maps[L];
      if (n.step) {
        let T = I.steps[L].invert(I.docs[L]), s = n.selection && n.selection.map(D.slice(N + 1, L));
        s && i++, A.push(new hg(o, T, s));
      } else
        A.push(new hg(o));
    }, t);
    let C = [];
    for (let n = g; n < e; n++)
      C.push(new hg(D.maps[n]));
    let u = this.items.slice(0, t).append(C).append(A), j = new yg(u, i);
    return j.emptyItemCount() > Xd && (j = j.compress(this.items.length - A.length)), j;
  }
  emptyItemCount() {
    let I = 0;
    return this.items.forEach((g) => {
      g.step || I++;
    }), I;
  }
  compress(I = this.items.length) {
    let g = this.remapping(0, I), A = g.maps.length, t = [], D = 0;
    return this.items.forEach((e, i) => {
      if (i >= I)
        t.push(e), e.selection && D++;
      else if (e.step) {
        let N = e.step.map(g.slice(A)), C = N && N.getMap();
        if (A--, C && g.appendMap(C, A), N) {
          let u = e.selection && e.selection.map(g.slice(A));
          u && D++;
          let j = new hg(C.invert(), N, u), n, L = t.length - 1;
          (n = t.length && t[L].merge(j)) ? t[L] = n : t.push(j);
        }
      } else
        e.map && A--;
    }, this.items.length, 0), new yg(bs.from(t.reverse()), D);
  }
}
yg.empty = new yg(bs.empty, 0);
function Kd(M, I) {
  let g;
  return M.forEach((A, t) => {
    if (A.selection && I-- == 0)
      return g = t, !1;
  }), M.slice(g);
}
class hg {
  constructor(I, g, A, t) {
    this.map = I, this.step = g, this.selection = A, this.mirrorOffset = t;
  }
  merge(I) {
    if (this.step && I.step && !I.selection) {
      let g = I.step.merge(this.step);
      if (g)
        return new hg(g.getMap().invert(), g, this.selection);
    }
  }
}
class SA {
  constructor(I, g, A, t) {
    this.done = I, this.undone = g, this.prevRanges = A, this.prevTime = t;
  }
}
const _d = 20;
function $d(M, I, g, A) {
  let t = g.getMeta(kA), D;
  if (t)
    return t.historyState;
  g.getMeta(Iz) && (M = new SA(M.done, M.undone, null, 0));
  let e = g.getMeta("appendedTransaction");
  if (g.steps.length == 0)
    return M;
  if (e && e.getMeta(kA))
    return e.getMeta(kA).redo ? new SA(M.done.addTransform(g, void 0, A, hi(I)), M.undone, aL(g.mapping.maps[g.steps.length - 1]), M.prevTime) : new SA(M.done, M.undone.addTransform(g, void 0, A, hi(I)), null, M.prevTime);
  if (g.getMeta("addToHistory") !== !1 && !(e && e.getMeta("addToHistory") === !1)) {
    let i = M.prevTime == 0 || !e && (M.prevTime < (g.time || 0) - A.newGroupDelay || !qd(g, M.prevRanges)), N = e ? VC(M.prevRanges, g.mapping) : aL(g.mapping.maps[g.steps.length - 1]);
    return new SA(M.done.addTransform(g, i ? I.selection.getBookmark() : void 0, A, hi(I)), yg.empty, N, g.time);
  } else
    return (D = g.getMeta("rebased")) ? new SA(M.done.rebased(g, D), M.undone.rebased(g, D), VC(M.prevRanges, g.mapping), M.prevTime) : new SA(M.done.addMaps(g.mapping.maps), M.undone.addMaps(g.mapping.maps), VC(M.prevRanges, g.mapping), M.prevTime);
}
function qd(M, I) {
  if (!I)
    return !1;
  if (!M.docChanged)
    return !0;
  let g = !1;
  return M.mapping.maps[0].forEach((A, t) => {
    for (let D = 0; D < I.length; D += 2)
      A <= I[D + 1] && t >= I[D] && (g = !0);
  }), g;
}
function aL(M) {
  let I = [];
  return M.forEach((g, A, t, D) => I.push(t, D)), I;
}
function VC(M, I) {
  if (!M)
    return null;
  let g = [];
  for (let A = 0; A < M.length; A += 2) {
    let t = I.map(M[A], 1), D = I.map(M[A + 1], -1);
    t <= D && g.push(t, D);
  }
  return g;
}
function Ys(M, I, g, A) {
  let t = hi(I), D = kA.get(I).spec.config, e = (A ? M.undone : M.done).popEvent(I, t);
  if (!e)
    return;
  let i = e.selection.resolve(e.transform.doc), N = (A ? M.done : M.undone).addTransform(e.transform, I.selection.getBookmark(), D, t), C = new SA(A ? N : e.remaining, A ? e.remaining : N, null, 0);
  g(e.transform.setSelection(i).setMeta(kA, { redo: A, historyState: C }).scrollIntoView());
}
let FC = !1, lL = null;
function hi(M) {
  let I = M.plugins;
  if (lL != I) {
    FC = !1, lL = I;
    for (let g = 0; g < I.length; g++)
      if (I[g].spec.historyPreserveItems) {
        FC = !0;
        break;
      }
  }
  return FC;
}
const kA = new TM("history"), Iz = new TM("closeHistory");
function Mz(M = {}) {
  return M = {
    depth: M.depth || 100,
    newGroupDelay: M.newGroupDelay || 500
  }, new XI({
    key: kA,
    state: {
      init() {
        return new SA(yg.empty, yg.empty, null, 0);
      },
      apply(I, g, A) {
        return $d(g, A, I, M);
      }
    },
    config: M,
    props: {
      handleDOMEvents: {
        beforeinput(I, g) {
          let A = g.inputType, t = A == "historyUndo" ? ps : A == "historyRedo" ? Qs : null;
          return t ? (g.preventDefault(), t(I.state, I.dispatch)) : !1;
        }
      }
    }
  });
}
const ps = (M, I) => {
  let g = kA.getState(M);
  return !g || g.done.eventCount == 0 ? !1 : (I && Ys(g, M, I, !1), !0);
}, Qs = (M, I) => {
  let g = kA.getState(M);
  return !g || g.undone.eventCount == 0 ? !1 : (I && Ys(g, M, I, !0), !0);
}, gz = tM.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: M, dispatch: I }) => ps(M, I),
      redo: () => ({ state: M, dispatch: I }) => Qs(M, I)
    };
  },
  addProseMirrorPlugins() {
    return [
      Mz(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Mod-y": () => this.editor.commands.redo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-\u044F": () => this.editor.commands.undo(),
      "Shift-Mod-\u044F": () => this.editor.commands.redo()
    };
  }
}), Az = JI.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [
      { tag: "hr" }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["hr", OI(this.options.HTMLAttributes, M)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: M }) => M().insertContent({ type: this.name }).command(({ tr: I, dispatch: g }) => {
        var A;
        if (g) {
          const { $to: t } = I.selection, D = t.end();
          if (t.nodeAfter)
            I.setSelection(LI.create(I.doc, t.pos));
          else {
            const e = (A = t.parent.type.contentMatch.defaultType) === null || A === void 0 ? void 0 : A.create();
            e && (I.insert(D, e), I.setSelection(LI.create(I.doc, D)));
          }
          I.scrollIntoView();
        }
        return !0;
      }).run()
    };
  },
  addInputRules() {
    return [
      Ms({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), tz = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))$/, Dz = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))/g, ez = /(?:^|\s)((?:_)((?:[^_]+))(?:_))$/, iz = /(?:^|\s)((?:_)((?:[^_]+))(?:_))/g, Nz = zg.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (M) => M.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["em", OI(this.options.HTMLAttributes, M), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: M }) => M.setMark(this.name),
      toggleItalic: () => ({ commands: M }) => M.toggleMark(this.name),
      unsetItalic: () => ({ commands: M }) => M.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      lt({
        find: tz,
        type: this.type
      }),
      lt({
        find: ez,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      GA({
        find: Dz,
        type: this.type
      }),
      GA({
        find: iz,
        type: this.type
      })
    ];
  }
}), Cz = JI.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["li", OI(this.options.HTMLAttributes, M), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), uz = /^(\d+)\.\s$/, jz = JI.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (M) => M.hasAttribute("start") ? parseInt(M.getAttribute("start") || "", 10) : 1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    const { start: I, ...g } = M;
    return I === 1 ? ["ol", OI(this.options.HTMLAttributes, g), 0] : ["ol", OI(this.options.HTMLAttributes, M), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: M }) => M.toggleList(this.name, this.options.itemTypeName)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    return [
      IC({
        find: uz,
        type: this.type,
        getAttributes: (M) => ({ start: +M[1] }),
        joinPredicate: (M, I) => I.childCount + I.attrs.start === +M[1]
      })
    ];
  }
}), nz = JI.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["p", OI(this.options.HTMLAttributes, M), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: M }) => M.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), Lz = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))$/, oz = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))/g, Tz = zg.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (M) => M.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["s", OI(this.options.HTMLAttributes, M), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: M }) => M.setMark(this.name),
      toggleStrike: () => ({ commands: M }) => M.toggleMark(this.name),
      unsetStrike: () => ({ commands: M }) => M.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-x": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      lt({
        find: Lz,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      GA({
        find: oz,
        type: this.type
      })
    ];
  }
}), sz = JI.create({
  name: "text",
  group: "inline"
}), Sz = tM.create({
  name: "starterKit",
  addExtensions() {
    var M, I, g, A, t, D, e, i, N, C, u, j, n, L, o, T, s, S;
    const y = [];
    return this.options.blockquote !== !1 && y.push(xd.configure((M = this.options) === null || M === void 0 ? void 0 : M.blockquote)), this.options.bold !== !1 && y.push(zd.configure((I = this.options) === null || I === void 0 ? void 0 : I.bold)), this.options.bulletList !== !1 && y.push(bd.configure((g = this.options) === null || g === void 0 ? void 0 : g.bulletList)), this.options.code !== !1 && y.push(Qd.configure((A = this.options) === null || A === void 0 ? void 0 : A.code)), this.options.codeBlock !== !1 && y.push(ds.configure((t = this.options) === null || t === void 0 ? void 0 : t.codeBlock)), this.options.document !== !1 && y.push(zs.configure((D = this.options) === null || D === void 0 ? void 0 : D.document)), this.options.dropcursor !== !1 && y.push(fd.configure((e = this.options) === null || e === void 0 ? void 0 : e.dropcursor)), this.options.gapcursor !== !1 && y.push(Rd.configure((i = this.options) === null || i === void 0 ? void 0 : i.gapcursor)), this.options.hardBreak !== !1 && y.push(Hd.configure((N = this.options) === null || N === void 0 ? void 0 : N.hardBreak)), this.options.heading !== !1 && y.push(Vd.configure((C = this.options) === null || C === void 0 ? void 0 : C.heading)), this.options.history !== !1 && y.push(gz.configure((u = this.options) === null || u === void 0 ? void 0 : u.history)), this.options.horizontalRule !== !1 && y.push(Az.configure((j = this.options) === null || j === void 0 ? void 0 : j.horizontalRule)), this.options.italic !== !1 && y.push(Nz.configure((n = this.options) === null || n === void 0 ? void 0 : n.italic)), this.options.listItem !== !1 && y.push(Cz.configure((L = this.options) === null || L === void 0 ? void 0 : L.listItem)), this.options.orderedList !== !1 && y.push(jz.configure((o = this.options) === null || o === void 0 ? void 0 : o.orderedList)), this.options.paragraph !== !1 && y.push(nz.configure((T = this.options) === null || T === void 0 ? void 0 : T.paragraph)), this.options.strike !== !1 && y.push(Tz.configure((s = this.options) === null || s === void 0 ? void 0 : s.strike)), this.options.text !== !1 && y.push(sz.configure((S = this.options) === null || S === void 0 ? void 0 : S.text)), y;
  }
}), az = tM.create({
  name: "textAlign",
  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left"
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (M) => M.style.textAlign || this.options.defaultAlignment,
            renderHTML: (M) => M.textAlign === this.options.defaultAlignment ? {} : { style: `text-align: ${M.textAlign}` }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTextAlign: (M) => ({ commands: I }) => this.options.alignments.includes(M) ? this.options.types.every((g) => I.updateAttributes(g, { textAlign: M })) : !1,
      unsetTextAlign: () => ({ commands: M }) => this.options.types.every((I) => M.resetAttributes(I, "textAlign"))
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
      "Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
      "Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
      "Mod-Shift-j": () => this.editor.commands.setTextAlign("justify")
    };
  }
});
function vu(M) {
  this.j = {}, this.jr = [], this.jd = null, this.t = M;
}
vu.prototype = {
  accepts: function() {
    return !!this.t;
  },
  tt: function(I, g) {
    if (g && g.j)
      return this.j[I] = g, g;
    var A = g, t = this.j[I];
    if (t)
      return A && (t.t = A), t;
    t = hI();
    var D = CN(this, I);
    return D ? (Object.assign(t.j, D.j), t.jr.append(D.jr), t.jr = D.jd, t.t = A || D.t) : t.t = A, this.j[I] = t, t;
  }
};
var hI = function() {
  return new vu();
}, NI = function(I) {
  return new vu(I);
}, X = function(I, g, A) {
  I.j[g] || (I.j[g] = A);
}, CM = function(I, g, A) {
  I.jr.push([g, A]);
}, CN = function(I, g) {
  var A = I.j[g];
  if (A)
    return A;
  for (var t = 0; t < I.jr.length; t++) {
    var D = I.jr[t][0], e = I.jr[t][1];
    if (D.test(g))
      return e;
  }
  return I.jd;
}, wI = function(I, g, A) {
  for (var t = 0; t < g.length; t++)
    X(I, g[t], A);
}, lz = function(I, g) {
  for (var A = 0; A < g.length; A++) {
    var t = g[A][0], D = g[A][1];
    X(I, t, D);
  }
}, VA = function(I, g, A, t) {
  for (var D = 0, e = g.length, i; D < e && (i = I.j[g[D]]); )
    I = i, D++;
  if (D >= e)
    return [];
  for (; D < e - 1; )
    i = t(), X(I, g[D], i), I = i, D++;
  X(I, g[e - 1], A);
}, ag = "DOMAIN", qg = "LOCALHOST", Og = "TLD", Ag = "NUM", yD = "PROTOCOL", Uu = "MAILTO", hs = "WS", Ju = "NL", Xt = "OPENBRACE", je = "OPENBRACKET", ne = "OPENANGLEBRACKET", Le = "OPENPAREN", It = "CLOSEBRACE", Kt = "CLOSEBRACKET", _t = "CLOSEANGLEBRACKET", $t = "CLOSEPAREN", uN = "AMPERSAND", jN = "APOSTROPHE", nN = "ASTERISK", qt = "AT", LN = "BACKSLASH", oN = "BACKTICK", TN = "CARET", oe = "COLON", Bu = "COMMA", sN = "DOLLAR", aA = "DOT", SN = "EQUALS", Ru = "EXCLAMATION", aN = "HYPHEN", lN = "PERCENT", yN = "PIPE", cN = "PLUS", xN = "POUND", rN = "QUERY", Hu = "QUOTE", Vu = "SEMI", IA = "SLASH", wN = "TILDE", EN = "UNDERSCORE", dN = "SYM", yz = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  DOMAIN: ag,
  LOCALHOST: qg,
  TLD: Og,
  NUM: Ag,
  PROTOCOL: yD,
  MAILTO: Uu,
  WS: hs,
  NL: Ju,
  OPENBRACE: Xt,
  OPENBRACKET: je,
  OPENANGLEBRACKET: ne,
  OPENPAREN: Le,
  CLOSEBRACE: It,
  CLOSEBRACKET: Kt,
  CLOSEANGLEBRACKET: _t,
  CLOSEPAREN: $t,
  AMPERSAND: uN,
  APOSTROPHE: jN,
  ASTERISK: nN,
  AT: qt,
  BACKSLASH: LN,
  BACKTICK: oN,
  CARET: TN,
  COLON: oe,
  COMMA: Bu,
  DOLLAR: sN,
  DOT: aA,
  EQUALS: SN,
  EXCLAMATION: Ru,
  HYPHEN: aN,
  PERCENT: lN,
  PIPE: yN,
  PLUS: cN,
  POUND: xN,
  QUERY: rN,
  QUOTE: Hu,
  SEMI: Vu,
  SLASH: IA,
  TILDE: wN,
  UNDERSCORE: EN,
  SYM: dN
}), yL = "aaa aarp abarth abb abbott abbvie abc able abogado abudhabi ac academy accenture accountant accountants aco actor ad adac ads adult ae aeg aero aetna af afamilycompany afl africa ag agakhan agency ai aig airbus airforce airtel akdn al alfaromeo alibaba alipay allfinanz allstate ally alsace alstom am amazon americanexpress americanfamily amex amfam amica amsterdam analytics android anquan anz ao aol apartments app apple aq aquarelle ar arab aramco archi army arpa art arte as asda asia associates at athleta attorney au auction audi audible audio auspost author auto autos avianca aw aws ax axa az azure ba baby baidu banamex bananarepublic band bank bar barcelona barclaycard barclays barefoot bargains baseball basketball bauhaus bayern bb bbc bbt bbva bcg bcn bd be beats beauty beer bentley berlin best bestbuy bet bf bg bh bharti bi bible bid bike bing bingo bio biz bj black blackfriday blockbuster blog bloomberg blue bm bms bmw bn bnpparibas bo boats boehringer bofa bom bond boo book booking bosch bostik boston bot boutique box br bradesco bridgestone broadway broker brother brussels bs bt budapest bugatti build builders business buy buzz bv bw by bz bzh ca cab cafe cal call calvinklein cam camera camp cancerresearch canon capetown capital capitalone car caravan cards care career careers cars casa case cash casino cat catering catholic cba cbn cbre cbs cc cd center ceo cern cf cfa cfd cg ch chanel channel charity chase chat cheap chintai christmas chrome church ci cipriani circle cisco citadel citi citic city cityeats ck cl claims cleaning click clinic clinique clothing cloud club clubmed cm cn co coach codes coffee college cologne com comcast commbank community company compare computer comsec condos construction consulting contact contractors cooking cookingchannel cool coop corsica country coupon coupons courses cpa cr credit creditcard creditunion cricket crown crs cruise cruises csc cu cuisinella cv cw cx cy cymru cyou cz dabur dad dance data date dating datsun day dclk dds de deal dealer deals degree delivery dell deloitte delta democrat dental dentist desi design dev dhl diamonds diet digital direct directory discount discover dish diy dj dk dm dnp do docs doctor dog domains dot download drive dtv dubai duck dunlop dupont durban dvag dvr dz earth eat ec eco edeka edu education ee eg email emerck energy engineer engineering enterprises epson equipment er ericsson erni es esq estate et etisalat eu eurovision eus events exchange expert exposed express extraspace fage fail fairwinds faith family fan fans farm farmers fashion fast fedex feedback ferrari ferrero fi fiat fidelity fido film final finance financial fire firestone firmdale fish fishing fit fitness fj fk flickr flights flir florist flowers fly fm fo foo food foodnetwork football ford forex forsale forum foundation fox fr free fresenius frl frogans frontdoor frontier ftr fujitsu fujixerox fun fund furniture futbol fyi ga gal gallery gallo gallup game games gap garden gay gb gbiz gd gdn ge gea gent genting george gf gg ggee gh gi gift gifts gives giving gl glade glass gle global globo gm gmail gmbh gmo gmx gn godaddy gold goldpoint golf goo goodyear goog google gop got gov gp gq gr grainger graphics gratis green gripe grocery group gs gt gu guardian gucci guge guide guitars guru gw gy hair hamburg hangout haus hbo hdfc hdfcbank health healthcare help helsinki here hermes hgtv hiphop hisamitsu hitachi hiv hk hkt hm hn hockey holdings holiday homedepot homegoods homes homesense honda horse hospital host hosting hot hoteles hotels hotmail house how hr hsbc ht hu hughes hyatt hyundai ibm icbc ice icu id ie ieee ifm ikano il im imamat imdb immo immobilien in inc industries infiniti info ing ink institute insurance insure int international intuit investments io ipiranga iq ir irish is ismaili ist istanbul it itau itv iveco jaguar java jcb je jeep jetzt jewelry jio jll jm jmp jnj jo jobs joburg jot joy jp jpmorgan jprs juegos juniper kaufen kddi ke kerryhotels kerrylogistics kerryproperties kfh kg kh ki kia kim kinder kindle kitchen kiwi km kn koeln komatsu kosher kp kpmg kpn kr krd kred kuokgroup kw ky kyoto kz la lacaixa lamborghini lamer lancaster lancia land landrover lanxess lasalle lat latino latrobe law lawyer lb lc lds lease leclerc lefrak legal lego lexus lgbt li lidl life lifeinsurance lifestyle lighting like lilly limited limo lincoln linde link lipsy live living lixil lk llc llp loan loans locker locus loft lol london lotte lotto love lpl lplfinancial lr ls lt ltd ltda lu lundbeck luxe luxury lv ly ma macys madrid maif maison makeup man management mango map market marketing markets marriott marshalls maserati mattel mba mc mckinsey md me med media meet melbourne meme memorial men menu merckmsd mg mh miami microsoft mil mini mint mit mitsubishi mk ml mlb mls mm mma mn mo mobi mobile moda moe moi mom monash money monster mormon mortgage moscow moto motorcycles mov movie mp mq mr ms msd mt mtn mtr mu museum mutual mv mw mx my mz na nab nagoya name nationwide natura navy nba nc ne nec net netbank netflix network neustar new news next nextdirect nexus nf nfl ng ngo nhk ni nico nike nikon ninja nissan nissay nl no nokia northwesternmutual norton now nowruz nowtv np nr nra nrw ntt nu nyc nz obi observer off office okinawa olayan olayangroup oldnavy ollo om omega one ong onl online onyourside ooo open oracle orange org organic origins osaka otsuka ott ovh pa page panasonic paris pars partners parts party passagens pay pccw pe pet pf pfizer pg ph pharmacy phd philips phone photo photography photos physio pics pictet pictures pid pin ping pink pioneer pizza pk pl place play playstation plumbing plus pm pn pnc pohl poker politie porn post pr pramerica praxi press prime pro prod productions prof progressive promo properties property protection pru prudential ps pt pub pw pwc py qa qpon quebec quest qvc racing radio raid re read realestate realtor realty recipes red redstone redumbrella rehab reise reisen reit reliance ren rent rentals repair report republican rest restaurant review reviews rexroth rich richardli ricoh ril rio rip rmit ro rocher rocks rodeo rogers room rs rsvp ru rugby ruhr run rw rwe ryukyu sa saarland safe safety sakura sale salon samsclub samsung sandvik sandvikcoromant sanofi sap sarl sas save saxo sb sbi sbs sc sca scb schaeffler schmidt scholarships school schule schwarz science scjohnson scot sd se search seat secure security seek select sener services ses seven sew sex sexy sfr sg sh shangrila sharp shaw shell shia shiksha shoes shop shopping shouji show showtime si silk sina singles site sj sk ski skin sky skype sl sling sm smart smile sn sncf so soccer social softbank software sohu solar solutions song sony soy spa space sport spot spreadbetting sr srl ss st stada staples star statebank statefarm stc stcgroup stockholm storage store stream studio study style su sucks supplies supply support surf surgery suzuki sv swatch swiftcover swiss sx sy sydney systems sz tab taipei talk taobao target tatamotors tatar tattoo tax taxi tc tci td tdk team tech technology tel temasek tennis teva tf tg th thd theater theatre tiaa tickets tienda tiffany tips tires tirol tj tjmaxx tjx tk tkmaxx tl tm tmall tn to today tokyo tools top toray toshiba total tours town toyota toys tr trade trading training travel travelchannel travelers travelersinsurance trust trv tt tube tui tunes tushu tv tvs tw tz ua ubank ubs ug uk unicom university uno uol ups us uy uz va vacations vana vanguard vc ve vegas ventures verisign versicherung vet vg vi viajes video vig viking villas vin vip virgin visa vision viva vivo vlaanderen vn vodka volkswagen volvo vote voting voto voyage vu vuelos wales walmart walter wang wanggou watch watches weather weatherchannel webcam weber website wed wedding weibo weir wf whoswho wien wiki williamhill win windows wine winners wme wolterskluwer woodside work works world wow ws wtc wtf xbox xerox xfinity xihuan xin xxx xyz yachts yahoo yamaxun yandex ye yodobashi yoga yokohama you youtube yt yun za zappos zara zero zip zm zone zuerich zw verm\xF6gensberater-ctb verm\xF6gensberatung-pwb \u03B5\u03BB \u03B5\u03C5 \u0431\u0433 \u0431\u0435\u043B \u0434\u0435\u0442\u0438 \u0435\u044E \u043A\u0430\u0442\u043E\u043B\u0438\u043A \u043A\u043E\u043C \u049B\u0430\u0437 \u043C\u043A\u0434 \u043C\u043E\u043D \u043C\u043E\u0441\u043A\u0432\u0430 \u043E\u043D\u043B\u0430\u0439\u043D \u043E\u0440\u0433 \u0440\u0443\u0441 \u0440\u0444 \u0441\u0430\u0439\u0442 \u0441\u0440\u0431 \u0443\u043A\u0440 \u10D2\u10D4 \u0570\u0561\u0575 \u05D9\u05E9\u05E8\u05D0\u05DC \u05E7\u05D5\u05DD \u0627\u0628\u0648\u0638\u0628\u064A \u0627\u062A\u0635\u0627\u0644\u0627\u062A \u0627\u0631\u0627\u0645\u0643\u0648 \u0627\u0644\u0627\u0631\u062F\u0646 \u0627\u0644\u0628\u062D\u0631\u064A\u0646 \u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u0627\u0644\u0639\u0644\u064A\u0627\u0646 \u0627\u0644\u0645\u063A\u0631\u0628 \u0627\u0645\u0627\u0631\u0627\u062A \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627\u0631\u062A \u0628\u0627\u0632\u0627\u0631 \u0628\u06BE\u0627\u0631\u062A \u0628\u064A\u062A\u0643 \u067E\u0627\u06A9\u0633\u062A\u0627\u0646 \u0680\u0627\u0631\u062A \u062A\u0648\u0646\u0633 \u0633\u0648\u062F\u0627\u0646 \u0633\u0648\u0631\u064A\u0629 \u0634\u0628\u0643\u0629 \u0639\u0631\u0627\u0642 \u0639\u0631\u0628 \u0639\u0645\u0627\u0646 \u0641\u0644\u0633\u0637\u064A\u0646 \u0642\u0637\u0631 \u0643\u0627\u062B\u0648\u0644\u064A\u0643 \u0643\u0648\u0645 \u0645\u0635\u0631 \u0645\u0644\u064A\u0633\u064A\u0627 \u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627 \u0645\u0648\u0642\u0639 \u0647\u0645\u0631\u0627\u0647 \u0915\u0949\u092E \u0928\u0947\u091F \u092D\u093E\u0930\u0924 \u092D\u093E\u0930\u0924\u092E\u094D \u092D\u093E\u0930\u094B\u0924 \u0938\u0902\u0917\u0920\u0928 \u09AC\u09BE\u0982\u09B2\u09BE \u09AD\u09BE\u09B0\u09A4 \u09AD\u09BE\u09F0\u09A4 \u0A2D\u0A3E\u0A30\u0A24 \u0AAD\u0ABE\u0AB0\u0AA4 \u0B2D\u0B3E\u0B30\u0B24 \u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE \u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8 \u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD \u0C2D\u0C3E\u0C30\u0C24\u0C4D \u0CAD\u0CBE\u0CB0\u0CA4 \u0D2D\u0D3E\u0D30\u0D24\u0D02 \u0DBD\u0D82\u0D9A\u0DCF \u0E04\u0E2D\u0E21 \u0E44\u0E17\u0E22 \u0EA5\u0EB2\u0EA7 \uB2F7\uB137 \uB2F7\uCEF4 \uC0BC\uC131 \uD55C\uAD6D \u30A2\u30DE\u30BE\u30F3 \u30B0\u30FC\u30B0\u30EB \u30AF\u30E9\u30A6\u30C9 \u30B3\u30E0 \u30B9\u30C8\u30A2 \u30BB\u30FC\u30EB \u30D5\u30A1\u30C3\u30B7\u30E7\u30F3 \u30DD\u30A4\u30F3\u30C8 \u307F\u3093\u306A \u4E16\u754C \u4E2D\u4FE1 \u4E2D\u56FD \u4E2D\u570B \u4E2D\u6587\u7F51 \u4E9A\u9A6C\u900A \u4F01\u4E1A \u4F5B\u5C71 \u4FE1\u606F \u5065\u5EB7 \u516B\u5366 \u516C\u53F8 \u516C\u76CA \u53F0\u6E7E \u53F0\u7063 \u5546\u57CE \u5546\u5E97 \u5546\u6807 \u5609\u91CC \u5609\u91CC\u5927\u9152\u5E97 \u5728\u7EBF \u5927\u4F17\u6C7D\u8F66 \u5927\u62FF \u5929\u4E3B\u6559 \u5A31\u4E50 \u5BB6\u96FB \u5E7F\u4E1C \u5FAE\u535A \u6148\u5584 \u6211\u7231\u4F60 \u624B\u673A \u62DB\u8058 \u653F\u52A1 \u653F\u5E9C \u65B0\u52A0\u5761 \u65B0\u95FB \u65F6\u5C1A \u66F8\u7C4D \u673A\u6784 \u6DE1\u9A6C\u9521 \u6E38\u620F \u6FB3\u9580 \u70B9\u770B \u79FB\u52A8 \u7EC4\u7EC7\u673A\u6784 \u7F51\u5740 \u7F51\u5E97 \u7F51\u7AD9 \u7F51\u7EDC \u8054\u901A \u8BFA\u57FA\u4E9A \u8C37\u6B4C \u8D2D\u7269 \u901A\u8CA9 \u96C6\u56E2 \u96FB\u8A0A\u76C8\u79D1 \u98DE\u5229\u6D66 \u98DF\u54C1 \u9910\u5385 \u9999\u683C\u91CC\u62C9 \u9999\u6E2F".split(" "), JD = /(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/, BD = /(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEDD-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDDFF\uDE70-\uDE74\uDE78-\uDE7C\uDE80-\uDE86\uDE90-\uDEAC\uDEB0-\uDEBA\uDEC0-\uDEC5\uDED0-\uDED9\uDEE0-\uDEE7\uDEF0-\uDEF6])/, RD = /\uFE0F/, HD = /\d/, cL = /\s/;
function cz() {
  var M = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], I = hI(), g = NI(Ag), A = NI(ag), t = hI(), D = NI(hs), e = [[HD, A], [JD, A], [BD, A], [RD, A]], i = function() {
    var a = NI(ag);
    return a.j = {
      "-": t
    }, a.jr = [].concat(e), a;
  }, N = function(a) {
    var z = i();
    return z.t = a, z;
  };
  lz(I, [["'", NI(jN)], ["{", NI(Xt)], ["[", NI(je)], ["<", NI(ne)], ["(", NI(Le)], ["}", NI(It)], ["]", NI(Kt)], [">", NI(_t)], [")", NI($t)], ["&", NI(uN)], ["*", NI(nN)], ["@", NI(qt)], ["`", NI(oN)], ["^", NI(TN)], [":", NI(oe)], [",", NI(Bu)], ["$", NI(sN)], [".", NI(aA)], ["=", NI(SN)], ["!", NI(Ru)], ["-", NI(aN)], ["%", NI(lN)], ["|", NI(yN)], ["+", NI(cN)], ["#", NI(xN)], ["?", NI(rN)], ['"', NI(Hu)], ["/", NI(IA)], [";", NI(Vu)], ["~", NI(wN)], ["_", NI(EN)], ["\\", NI(LN)]]), X(I, `
`, NI(Ju)), CM(I, cL, D), X(D, `
`, hI()), CM(D, cL, D);
  for (var C = 0; C < yL.length; C++)
    VA(I, yL[C], N(Og), i);
  var u = i(), j = i(), n = i(), L = i();
  VA(I, "file", u, i), VA(I, "ftp", j, i), VA(I, "http", n, i), VA(I, "mailto", L, i);
  var o = i(), T = NI(yD), s = NI(Uu);
  X(j, "s", o), X(j, ":", T), X(n, "s", o), X(n, ":", T), X(u, ":", T), X(o, ":", T), X(L, ":", s);
  for (var S = i(), y = 0; y < M.length; y++)
    VA(I, M[y], S, i);
  return X(S, ":", T), VA(I, "localhost", N(qg), i), CM(I, HD, g), CM(I, JD, A), CM(I, BD, A), CM(I, RD, A), CM(g, HD, g), CM(g, JD, A), CM(g, BD, A), CM(g, RD, A), X(g, "-", t), X(A, "-", t), X(t, "-", t), CM(A, HD, A), CM(A, JD, A), CM(A, BD, A), CM(A, RD, A), CM(t, HD, A), CM(t, JD, A), CM(t, BD, A), CM(t, RD, A), I.jd = NI(dN), I;
}
function xz(M, I) {
  for (var g = rz(I.replace(/[A-Z]/g, function(L) {
    return L.toLowerCase();
  })), A = g.length, t = [], D = 0, e = 0; e < A; ) {
    for (var i = M, N = null, C = 0, u = null, j = -1, n = -1; e < A && (N = CN(i, g[e])); )
      i = N, i.accepts() ? (j = 0, n = 0, u = i) : j >= 0 && (j += g[e].length, n++), C += g[e].length, D += g[e].length, e++;
    D -= j, e -= n, C -= j, t.push({
      t: u.t,
      v: I.substr(D - C, C),
      s: D - C,
      e: D
    });
  }
  return t;
}
function rz(M) {
  for (var I = [], g = M.length, A = 0; A < g; ) {
    var t = M.charCodeAt(A), D = void 0, e = t < 55296 || t > 56319 || A + 1 === g || (D = M.charCodeAt(A + 1)) < 56320 || D > 57343 ? M[A] : M.slice(A, A + 2);
    I.push(e), A += e.length;
  }
  return I;
}
function Oi(M) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Oi = function(I) {
    return typeof I;
  } : Oi = function(I) {
    return I && typeof Symbol == "function" && I.constructor === Symbol && I !== Symbol.prototype ? "symbol" : typeof I;
  }, Oi(M);
}
var wM = {
  defaultProtocol: "http",
  events: null,
  format: xL,
  formatHref: xL,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 0,
  className: null,
  attributes: null,
  ignoreTags: []
};
function wz(M) {
  M = M || {}, this.defaultProtocol = "defaultProtocol" in M ? M.defaultProtocol : wM.defaultProtocol, this.events = "events" in M ? M.events : wM.events, this.format = "format" in M ? M.format : wM.format, this.formatHref = "formatHref" in M ? M.formatHref : wM.formatHref, this.nl2br = "nl2br" in M ? M.nl2br : wM.nl2br, this.tagName = "tagName" in M ? M.tagName : wM.tagName, this.target = "target" in M ? M.target : wM.target, this.rel = "rel" in M ? M.rel : wM.rel, this.validate = "validate" in M ? M.validate : wM.validate, this.truncate = "truncate" in M ? M.truncate : wM.truncate, this.className = "className" in M ? M.className : wM.className, this.attributes = M.attributes || wM.attributes, this.ignoreTags = [];
  for (var I = ("ignoreTags" in M) ? M.ignoreTags : wM.ignoreTags, g = 0; g < I.length; g++)
    this.ignoreTags.push(I[g].toUpperCase());
}
wz.prototype = {
  resolve: function(I) {
    var g = I.toHref(this.defaultProtocol);
    return {
      formatted: this.get("format", I.toString(), I),
      formattedHref: this.get("formatHref", g, I),
      tagName: this.get("tagName", g, I),
      className: this.get("className", g, I),
      target: this.get("target", g, I),
      rel: this.get("rel", g, I),
      events: this.getObject("events", g, I),
      attributes: this.getObject("attributes", g, I),
      truncate: this.get("truncate", g, I)
    };
  },
  check: function(I) {
    return this.get("validate", I.toString(), I);
  },
  get: function(I, g, A) {
    var t = this[I];
    if (!t)
      return t;
    var D;
    switch (Oi(t)) {
      case "function":
        return t(g, A.t);
      case "object":
        return D = A.t in t ? t[A.t] : wM[I], typeof D == "function" ? D(g, A.t) : D;
    }
    return t;
  },
  getObject: function(I, g, A) {
    var t = this[I];
    return typeof t == "function" ? t(g, A.t) : t;
  }
};
function xL(M) {
  return M;
}
function Ez(M, I) {
  var g = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, A = Object.create(M.prototype);
  for (var t in g)
    A[t] = g[t];
  return A.constructor = I, I.prototype = A, I;
}
function zN() {
}
zN.prototype = {
  t: "token",
  isLink: !1,
  toString: function() {
    return this.v;
  },
  toHref: function() {
    return this.toString();
  },
  startIndex: function() {
    return this.tk[0].s;
  },
  endIndex: function() {
    return this.tk[this.tk.length - 1].e;
  },
  toObject: function() {
    var I = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : wM.defaultProtocol;
    return {
      type: this.t,
      value: this.v,
      isLink: this.isLink,
      href: this.toHref(I),
      start: this.startIndex(),
      end: this.endIndex()
    };
  }
};
function zt(M, I) {
  function g(A, t) {
    this.t = M, this.v = A, this.tk = t;
  }
  return Ez(zN, g, I), g;
}
var Os = zt("email", {
  isLink: !0
}), f0 = zt("email", {
  isLink: !0,
  toHref: function() {
    return "mailto:" + this.toString();
  }
}), G0 = zt("text"), ks = zt("nl"), LA = zt("url", {
  isLink: !0,
  toHref: function() {
    for (var I = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : wM.defaultProtocol, g = this.tk, A = !1, t = !1, D = [], e = 0; g[e].t === yD; )
      A = !0, D.push(g[e].v), e++;
    for (; g[e].t === IA; )
      t = !0, D.push(g[e].v), e++;
    for (; e < g.length; e++)
      D.push(g[e].v);
    return D = D.join(""), A || t || (D = "".concat(I, "://").concat(D)), D;
  },
  hasProtocol: function() {
    return this.tk[0].t === yD;
  }
}), dz = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MultiToken: zN,
  Base: zN,
  createTokenClass: zt,
  MailtoEmail: Os,
  Email: f0,
  Text: G0,
  Nl: ks,
  Url: LA
});
function zz() {
  var M = hI(), I = hI(), g = hI(), A = hI(), t = hI(), D = hI(), e = hI(), i = NI(LA), N = hI(), C = NI(LA), u = NI(LA), j = hI(), n = hI(), L = hI(), o = hI(), T = hI(), s = NI(LA), S = NI(LA), y = NI(LA), x = NI(LA), a = hI(), z = hI(), c = hI(), E = hI(), m = hI(), p = hI(), V = NI(f0), U = hI(), gI = NI(f0), R = NI(Os), H = hI(), W = hI(), l = hI(), w = hI(), Q = NI(ks);
  X(M, Ju, Q), X(M, yD, I), X(M, Uu, g), X(I, IA, A), X(A, IA, t), X(M, Og, D), X(M, ag, D), X(M, qg, i), X(M, Ag, D), X(t, Og, u), X(t, ag, u), X(t, Ag, u), X(t, qg, u), X(D, aA, e), X(m, aA, p), X(e, Og, i), X(e, ag, D), X(e, Ag, D), X(e, qg, D), X(p, Og, V), X(p, ag, m), X(p, Ag, m), X(p, qg, m), X(i, aA, e), X(V, aA, p), X(i, oe, N), X(i, IA, u), X(N, Ag, C), X(C, IA, u), X(V, oe, U), X(U, Ag, gI);
  var k = [uN, nN, qt, LN, oN, TN, sN, ag, SN, aN, qg, Ag, lN, yN, cN, xN, yD, IA, dN, wN, Og, EN], B = [jN, _t, It, Kt, $t, oe, Bu, aA, Ru, ne, Xt, je, Le, rN, Hu, Vu];
  X(u, Xt, n), X(u, je, L), X(u, ne, o), X(u, Le, T), X(j, Xt, n), X(j, je, L), X(j, ne, o), X(j, Le, T), X(n, It, u), X(L, Kt, u), X(o, _t, u), X(T, $t, u), X(s, It, u), X(S, Kt, u), X(y, _t, u), X(x, $t, u), X(a, It, u), X(z, Kt, u), X(c, _t, u), X(E, $t, u), wI(n, k, s), wI(L, k, S), wI(o, k, y), wI(T, k, x), wI(n, B, a), wI(L, B, z), wI(o, B, c), wI(T, B, E), wI(s, k, s), wI(S, k, S), wI(y, k, y), wI(x, k, x), wI(s, B, s), wI(S, B, S), wI(y, B, y), wI(x, B, x), wI(a, k, s), wI(z, k, S), wI(c, k, y), wI(E, k, x), wI(a, B, a), wI(z, B, z), wI(c, B, c), wI(E, B, E), wI(u, k, u), wI(j, k, u), wI(u, B, j), wI(j, B, j), X(g, Og, R), X(g, ag, R), X(g, Ag, R), X(g, qg, R), wI(R, k, R), wI(R, B, H), wI(H, k, R), wI(H, B, H);
  var iI = [uN, jN, nN, LN, oN, TN, It, sN, ag, SN, aN, Ag, Xt, lN, yN, cN, xN, rN, IA, dN, wN, Og, EN];
  return wI(D, iI, W), X(D, qt, l), wI(i, iI, W), X(i, qt, l), wI(e, iI, W), wI(W, iI, W), X(W, qt, l), X(W, aA, w), wI(w, iI, W), X(l, Og, m), X(l, ag, m), X(l, Ag, m), X(l, qg, V), M;
}
function mz(M, I, g) {
  for (var A = g.length, t = 0, D = [], e = []; t < A; ) {
    for (var i = M, N = null, C = null, u = 0, j = null, n = -1; t < A && !(N = CN(i, g[t].t)); )
      e.push(g[t++]);
    for (; t < A && (C = N || CN(i, g[t].t)); )
      N = null, i = C, i.accepts() ? (n = 0, j = i) : n >= 0 && n++, t++, u++;
    if (n < 0)
      for (var L = t - u; L < t; L++)
        e.push(g[L]);
    else {
      e.length > 0 && (D.push(XC(G0, I, e)), e = []), t -= n, u -= n;
      var o = j.t, T = g.slice(t - u, t);
      D.push(XC(o, I, T));
    }
  }
  return e.length > 0 && D.push(XC(G0, I, e)), D;
}
function XC(M, I, g) {
  var A = g[0].s, t = g[g.length - 1].e, D = I.substr(A, t - A);
  return new M(D, g);
}
var bz = typeof console < "u" && console && console.warn || function() {
}, FM = {
  scanner: null,
  parser: null,
  pluginQueue: [],
  customProtocols: [],
  initialized: !1
};
function Yz(M) {
  if (FM.initialized && bz('linkifyjs: already initialized - will not register custom protocol "'.concat(M, '" until you manually call linkify.init(). To avoid this warning, please register all custom protocols before invoking linkify the first time.')), !/^[a-z-]+$/.test(M))
    throw Error("linkifyjs: protocols containing characters other than a-z or - (hyphen) are not supported");
  FM.customProtocols.push(M);
}
function pz() {
  FM.scanner = {
    start: cz(FM.customProtocols),
    tokens: yz
  }, FM.parser = {
    start: zz(),
    tokens: dz
  };
  for (var M = {
    createTokenClass: zt
  }, I = 0; I < FM.pluginQueue.length; I++)
    FM.pluginQueue[I][1]({
      scanner: FM.scanner,
      parser: FM.parser,
      utils: M
    });
  FM.initialized = !0;
}
function Ps(M) {
  return FM.initialized || pz(), mz(FM.parser.start, M, xz(FM.scanner.start, M));
}
function Fu(M) {
  for (var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, g = Ps(M), A = [], t = 0; t < g.length; t++) {
    var D = g[t];
    D.isLink && (!I || D.t === I) && A.push(D.toObject());
  }
  return A;
}
function rL(M) {
  var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, g = Ps(M);
  return g.length === 1 && g[0].isLink && (!I || g[0].t === I);
}
function Qz(M) {
  return new XI({
    key: new TM("autolink"),
    appendTransaction: (I, g, A) => {
      const t = I.some((u) => u.docChanged) && !g.doc.eq(A.doc), D = I.some((u) => u.getMeta("preventAutolink"));
      if (!t || D)
        return;
      const { tr: e } = A, i = yr(g.doc, [...I]), { mapping: N } = i;
      if (mr(i).forEach(({ oldRange: u, newRange: j }) => {
        DN(u.from, u.to, g.doc).filter((T) => T.mark.type === M.type).forEach((T) => {
          const s = N.map(T.from), S = N.map(T.to), y = DN(s, S, A.doc).filter((m) => m.mark.type === M.type);
          if (!y.length)
            return;
          const x = y[0], a = g.doc.textBetween(T.from, T.to, void 0, " "), z = A.doc.textBetween(x.from, x.to, void 0, " "), c = rL(a), E = rL(z);
          c && !E && e.removeMark(x.from, x.to, M.type);
        });
        const n = xr(A.doc, j, (T) => T.isTextblock);
        let L, o;
        if (n.length > 1 ? (L = n[0], o = A.doc.textBetween(L.pos, L.pos + L.node.nodeSize, void 0, " ")) : n.length && A.doc.textBetween(j.from, j.to, " ", " ").endsWith(" ") && (L = n[0], o = A.doc.textBetween(L.pos, j.to, void 0, " ")), L && o) {
          const T = o.split(" ").filter((y) => y !== "");
          if (T.length <= 0)
            return !1;
          const s = T[T.length - 1], S = L.pos + o.lastIndexOf(s);
          if (!s)
            return !1;
          Fu(s).filter((y) => y.isLink).filter((y) => M.validate ? M.validate(y.value) : !0).map((y) => ({
            ...y,
            from: S + y.start + 1,
            to: S + y.end + 1
          })).forEach((y) => {
            e.addMark(y.from, y.to, M.type.create({
              href: y.href
            }));
          });
        }
      }), !!e.steps.length)
        return e;
    }
  });
}
function hz(M) {
  return new XI({
    key: new TM("handleClickLink"),
    props: {
      handleClick: (I, g, A) => {
        var t;
        const D = q4(I.state, M.type.name);
        return ((t = A.target) === null || t === void 0 ? void 0 : t.closest("a")) && D.href ? (window.open(D.href, D.target), !0) : !1;
      }
    }
  });
}
function Oz(M) {
  return new XI({
    key: new TM("handlePasteLink"),
    props: {
      handlePaste: (I, g, A) => {
        const { state: t } = I, { selection: D } = t, { empty: e } = D;
        if (e)
          return !1;
        let i = "";
        A.content.forEach((C) => {
          i += C.textContent;
        });
        const N = Fu(i).find((C) => C.isLink && C.value === i);
        return !i || !N ? !1 : (M.editor.commands.setMark(M.type, {
          href: N.href
        }), !0);
      }
    }
  });
}
const kz = zg.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  onCreate() {
    this.options.protocols.forEach(Yz);
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      validate: void 0
    };
  },
  addAttributes() {
    return {
      href: {
        default: null
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [
      { tag: 'a[href]:not([href *= "javascript:" i])' }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return [
      "a",
      OI(this.options.HTMLAttributes, M),
      0
    ];
  },
  addCommands() {
    return {
      setLink: (M) => ({ chain: I }) => I().setMark(this.name, M).setMeta("preventAutolink", !0).run(),
      toggleLink: (M) => ({ chain: I }) => I().toggleMark(this.name, M, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run(),
      unsetLink: () => ({ chain: M }) => M().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      GA({
        find: (M) => Fu(M).filter((I) => this.options.validate ? this.options.validate(I.value) : !0).filter((I) => I.isLink).map((I) => ({
          text: I.value,
          index: I.start,
          data: I
        })),
        type: this.type,
        getAttributes: (M) => {
          var I;
          return {
            href: (I = M.data) === null || I === void 0 ? void 0 : I.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const M = [];
    return this.options.autolink && M.push(Qz({
      type: this.type,
      validate: this.options.validate
    })), this.options.openOnClick && M.push(hz({
      type: this.type
    })), this.options.linkOnPaste && M.push(Oz({
      editor: this.editor,
      type: this.type
    })), M;
  }
});
var Pz = typeof global == "object" && global && global.Object === Object && global;
const fz = Pz;
var Gz = typeof self == "object" && self && self.Object === Object && self, Wz = fz || Gz || Function("return this")();
const AC = Wz;
var Zz = AC.Symbol;
const cD = Zz;
var fs = Object.prototype, vz = fs.hasOwnProperty, Uz = fs.toString, VD = cD ? cD.toStringTag : void 0;
function Jz(M) {
  var I = vz.call(M, VD), g = M[VD];
  try {
    M[VD] = void 0;
    var A = !0;
  } catch {
  }
  var t = Uz.call(M);
  return A && (I ? M[VD] = g : delete M[VD]), t;
}
var Bz = Object.prototype, Rz = Bz.toString;
function Hz(M) {
  return Rz.call(M);
}
var Vz = "[object Null]", Fz = "[object Undefined]", wL = cD ? cD.toStringTag : void 0;
function Gs(M) {
  return M == null ? M === void 0 ? Fz : Vz : wL && wL in Object(M) ? Jz(M) : Hz(M);
}
function Xz(M) {
  return M != null && typeof M == "object";
}
var Kz = "[object Symbol]";
function tC(M) {
  return typeof M == "symbol" || Xz(M) && Gs(M) == Kz;
}
function _z(M, I) {
  for (var g = -1, A = M == null ? 0 : M.length, t = Array(A); ++g < A; )
    t[g] = I(M[g], g, M);
  return t;
}
var $z = Array.isArray;
const Xu = $z;
var qz = 1 / 0, EL = cD ? cD.prototype : void 0, dL = EL ? EL.toString : void 0;
function Ws(M) {
  if (typeof M == "string")
    return M;
  if (Xu(M))
    return _z(M, Ws) + "";
  if (tC(M))
    return dL ? dL.call(M) : "";
  var I = M + "";
  return I == "0" && 1 / M == -qz ? "-0" : I;
}
var Im = /\s/;
function Mm(M) {
  for (var I = M.length; I-- && Im.test(M.charAt(I)); )
    ;
  return I;
}
var gm = /^\s+/;
function Am(M) {
  return M && M.slice(0, Mm(M) + 1).replace(gm, "");
}
function me(M) {
  var I = typeof M;
  return M != null && (I == "object" || I == "function");
}
var zL = 0 / 0, tm = /^[-+]0x[0-9a-f]+$/i, Dm = /^0b[01]+$/i, em = /^0o[0-7]+$/i, im = parseInt;
function mL(M) {
  if (typeof M == "number")
    return M;
  if (tC(M))
    return zL;
  if (me(M)) {
    var I = typeof M.valueOf == "function" ? M.valueOf() : M;
    M = me(I) ? I + "" : I;
  }
  if (typeof M != "string")
    return M === 0 ? M : +M;
  M = Am(M);
  var g = Dm.test(M);
  return g || em.test(M) ? im(M.slice(2), g ? 2 : 8) : tm.test(M) ? zL : +M;
}
var Nm = "[object AsyncFunction]", Cm = "[object Function]", um = "[object GeneratorFunction]", jm = "[object Proxy]";
function nm(M) {
  if (!me(M))
    return !1;
  var I = Gs(M);
  return I == Cm || I == um || I == Nm || I == jm;
}
var Lm = AC["__core-js_shared__"];
const KC = Lm;
var bL = function() {
  var M = /[^.]+$/.exec(KC && KC.keys && KC.keys.IE_PROTO || "");
  return M ? "Symbol(src)_1." + M : "";
}();
function om(M) {
  return !!bL && bL in M;
}
var Tm = Function.prototype, sm = Tm.toString;
function Sm(M) {
  if (M != null) {
    try {
      return sm.call(M);
    } catch {
    }
    try {
      return M + "";
    } catch {
    }
  }
  return "";
}
var am = /[\\^$.*+?()[\]{}|]/g, lm = /^\[object .+?Constructor\]$/, ym = Function.prototype, cm = Object.prototype, xm = ym.toString, rm = cm.hasOwnProperty, wm = RegExp(
  "^" + xm.call(rm).replace(am, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Em(M) {
  if (!me(M) || om(M))
    return !1;
  var I = nm(M) ? wm : lm;
  return I.test(Sm(M));
}
function dm(M, I) {
  return M == null ? void 0 : M[I];
}
function Zs(M, I) {
  var g = dm(M, I);
  return Em(g) ? g : void 0;
}
function zm(M, I) {
  return M === I || M !== M && I !== I;
}
var mm = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, bm = /^\w*$/;
function Ym(M, I) {
  if (Xu(M))
    return !1;
  var g = typeof M;
  return g == "number" || g == "symbol" || g == "boolean" || M == null || tC(M) ? !0 : bm.test(M) || !mm.test(M) || I != null && M in Object(I);
}
var pm = Zs(Object, "create");
const be = pm;
function Qm() {
  this.__data__ = be ? be(null) : {}, this.size = 0;
}
function hm(M) {
  var I = this.has(M) && delete this.__data__[M];
  return this.size -= I ? 1 : 0, I;
}
var Om = "__lodash_hash_undefined__", km = Object.prototype, Pm = km.hasOwnProperty;
function fm(M) {
  var I = this.__data__;
  if (be) {
    var g = I[M];
    return g === Om ? void 0 : g;
  }
  return Pm.call(I, M) ? I[M] : void 0;
}
var Gm = Object.prototype, Wm = Gm.hasOwnProperty;
function Zm(M) {
  var I = this.__data__;
  return be ? I[M] !== void 0 : Wm.call(I, M);
}
var vm = "__lodash_hash_undefined__";
function Um(M, I) {
  var g = this.__data__;
  return this.size += this.has(M) ? 0 : 1, g[M] = be && I === void 0 ? vm : I, this;
}
function ct(M) {
  var I = -1, g = M == null ? 0 : M.length;
  for (this.clear(); ++I < g; ) {
    var A = M[I];
    this.set(A[0], A[1]);
  }
}
ct.prototype.clear = Qm;
ct.prototype.delete = hm;
ct.prototype.get = fm;
ct.prototype.has = Zm;
ct.prototype.set = Um;
function Jm() {
  this.__data__ = [], this.size = 0;
}
function DC(M, I) {
  for (var g = M.length; g--; )
    if (zm(M[g][0], I))
      return g;
  return -1;
}
var Bm = Array.prototype, Rm = Bm.splice;
function Hm(M) {
  var I = this.__data__, g = DC(I, M);
  if (g < 0)
    return !1;
  var A = I.length - 1;
  return g == A ? I.pop() : Rm.call(I, g, 1), --this.size, !0;
}
function Vm(M) {
  var I = this.__data__, g = DC(I, M);
  return g < 0 ? void 0 : I[g][1];
}
function Fm(M) {
  return DC(this.__data__, M) > -1;
}
function Xm(M, I) {
  var g = this.__data__, A = DC(g, M);
  return A < 0 ? (++this.size, g.push([M, I])) : g[A][1] = I, this;
}
function kD(M) {
  var I = -1, g = M == null ? 0 : M.length;
  for (this.clear(); ++I < g; ) {
    var A = M[I];
    this.set(A[0], A[1]);
  }
}
kD.prototype.clear = Jm;
kD.prototype.delete = Hm;
kD.prototype.get = Vm;
kD.prototype.has = Fm;
kD.prototype.set = Xm;
var Km = Zs(AC, "Map");
const _m = Km;
function $m() {
  this.size = 0, this.__data__ = {
    hash: new ct(),
    map: new (_m || kD)(),
    string: new ct()
  };
}
function qm(M) {
  var I = typeof M;
  return I == "string" || I == "number" || I == "symbol" || I == "boolean" ? M !== "__proto__" : M === null;
}
function eC(M, I) {
  var g = M.__data__;
  return qm(I) ? g[typeof I == "string" ? "string" : "hash"] : g.map;
}
function Ib(M) {
  var I = eC(this, M).delete(M);
  return this.size -= I ? 1 : 0, I;
}
function Mb(M) {
  return eC(this, M).get(M);
}
function gb(M) {
  return eC(this, M).has(M);
}
function Ab(M, I) {
  var g = eC(this, M), A = g.size;
  return g.set(M, I), this.size += g.size == A ? 0 : 1, this;
}
function mt(M) {
  var I = -1, g = M == null ? 0 : M.length;
  for (this.clear(); ++I < g; ) {
    var A = M[I];
    this.set(A[0], A[1]);
  }
}
mt.prototype.clear = $m;
mt.prototype.delete = Ib;
mt.prototype.get = Mb;
mt.prototype.has = gb;
mt.prototype.set = Ab;
var tb = "Expected a function";
function Ku(M, I) {
  if (typeof M != "function" || I != null && typeof I != "function")
    throw new TypeError(tb);
  var g = function() {
    var A = arguments, t = I ? I.apply(this, A) : A[0], D = g.cache;
    if (D.has(t))
      return D.get(t);
    var e = M.apply(this, A);
    return g.cache = D.set(t, e) || D, e;
  };
  return g.cache = new (Ku.Cache || mt)(), g;
}
Ku.Cache = mt;
var Db = 500;
function eb(M) {
  var I = Ku(M, function(A) {
    return g.size === Db && g.clear(), A;
  }), g = I.cache;
  return I;
}
var ib = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Nb = /\\(\\)?/g, Cb = eb(function(M) {
  var I = [];
  return M.charCodeAt(0) === 46 && I.push(""), M.replace(ib, function(g, A, t, D) {
    I.push(t ? D.replace(Nb, "$1") : A || g);
  }), I;
});
const ub = Cb;
function jb(M) {
  return M == null ? "" : Ws(M);
}
function nb(M, I) {
  return Xu(M) ? M : Ym(M, I) ? [M] : ub(jb(M));
}
var Lb = 1 / 0;
function ob(M) {
  if (typeof M == "string" || tC(M))
    return M;
  var I = M + "";
  return I == "0" && 1 / M == -Lb ? "-0" : I;
}
function Tb(M, I) {
  I = nb(I, M);
  for (var g = 0, A = I.length; M != null && g < A; )
    M = M[ob(I[g++])];
  return g && g == A ? M : void 0;
}
function sb(M, I, g) {
  var A = M == null ? void 0 : Tb(M, I);
  return A === void 0 ? g : A;
}
var Sb = function() {
  return AC.Date.now();
};
const _C = Sb;
var ab = "Expected a function", lb = Math.max, yb = Math.min;
function cb(M, I, g) {
  var A, t, D, e, i, N, C = 0, u = !1, j = !1, n = !0;
  if (typeof M != "function")
    throw new TypeError(ab);
  I = mL(I) || 0, me(g) && (u = !!g.leading, j = "maxWait" in g, D = j ? lb(mL(g.maxWait) || 0, I) : D, n = "trailing" in g ? !!g.trailing : n);
  function L(c) {
    var E = A, m = t;
    return A = t = void 0, C = c, e = M.apply(m, E), e;
  }
  function o(c) {
    return C = c, i = setTimeout(S, I), u ? L(c) : e;
  }
  function T(c) {
    var E = c - N, m = c - C, p = I - E;
    return j ? yb(p, D - m) : p;
  }
  function s(c) {
    var E = c - N, m = c - C;
    return N === void 0 || E >= I || E < 0 || j && m >= D;
  }
  function S() {
    var c = _C();
    if (s(c))
      return y(c);
    i = setTimeout(S, T(c));
  }
  function y(c) {
    return i = void 0, n && A ? L(c) : (A = t = void 0, e);
  }
  function x() {
    i !== void 0 && clearTimeout(i), C = 0, A = N = t = i = void 0;
  }
  function a() {
    return i === void 0 ? e : y(_C());
  }
  function z() {
    var c = _C(), E = s(c);
    if (A = arguments, t = this, N = c, E) {
      if (i === void 0)
        return o(N);
      if (j)
        return clearTimeout(i), i = setTimeout(S, I), L(N);
    }
    return i === void 0 && (i = setTimeout(S, I)), e;
  }
  return z.cancel = x, z.flush = a, z;
}
function vs(M) {
  for (var I = -1, g = M == null ? 0 : M.length, A = {}; ++I < g; ) {
    var t = M[I];
    A[t[0]] = t[1];
  }
  return A;
}
function iC(M) {
  return M == null;
}
const xb = 'a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])', rb = (M) => process.env.NODE_ENV === "test" ? !0 : getComputedStyle(M).position === "fixed" ? !1 : M.offsetParent !== null, YL = (M) => Array.from(M.querySelectorAll(xb)).filter((I) => wb(I) && rb(I)), wb = (M) => {
  if (M.tabIndex > 0 || M.tabIndex === 0 && M.getAttribute("tabIndex") !== null)
    return !0;
  if (M.disabled)
    return !1;
  switch (M.nodeName) {
    case "A":
      return !!M.href && M.rel !== "ignore";
    case "INPUT":
      return !(M.type === "hidden" || M.type === "file");
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return !0;
    default:
      return !1;
  }
}, AM = (M, I, { checkForDefaultPrevented: g = !0 } = {}) => (t) => {
  const D = M == null ? void 0 : M(t);
  if (g === !1 || !D)
    return I == null ? void 0 : I(t);
}, pL = (M) => (I) => I.pointerType === "mouse" ? M(I) : void 0;
var QL;
const jM = typeof window < "u", mN = (M) => typeof M == "boolean", EA = (M) => typeof M == "number", Eb = (M) => typeof M == "string", $C = () => {
};
jM && ((QL = window == null ? void 0 : window.navigator) == null ? void 0 : QL.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function db(M) {
  return typeof M == "function" ? M() : r(M);
}
function zb(M) {
  return M;
}
function _u(M) {
  return yl() ? (ET(M), !0) : !1;
}
function mb(M, I = !0) {
  Lg() ? RI(M) : I ? M() : VI(M);
}
function dA(M) {
  var I;
  const g = db(M);
  return (I = g == null ? void 0 : g.$el) != null ? I : g;
}
const $u = jM ? window : void 0;
function zA(...M) {
  let I, g, A, t;
  if (Eb(M[0]) ? ([g, A, t] = M, I = $u) : [I, g, A, t] = M, !I)
    return $C;
  let D = $C;
  const e = SI(() => dA(I), (N) => {
    D(), N && (N.addEventListener(g, A, t), D = () => {
      N.removeEventListener(g, A, t), D = $C;
    });
  }, { immediate: !0, flush: "post" }), i = () => {
    e(), D();
  };
  return _u(i), i;
}
function bb(M, I, g = {}) {
  const { window: A = $u, ignore: t, capture: D = !0, detectIframe: e = !1 } = g;
  if (!A)
    return;
  const i = h(!0);
  let N;
  const C = (n) => {
    A.clearTimeout(N);
    const L = dA(M), o = n.composedPath();
    !L || L === n.target || o.includes(L) || !i.value || t && t.length > 0 && t.some((T) => {
      const s = dA(T);
      return s && (n.target === s || o.includes(s));
    }) || I(n);
  }, u = [
    zA(A, "click", C, { passive: !0, capture: D }),
    zA(A, "pointerdown", (n) => {
      const L = dA(M);
      i.value = !!L && !n.composedPath().includes(L);
    }, { passive: !0 }),
    zA(A, "pointerup", (n) => {
      if (n.button === 0) {
        const L = n.composedPath();
        n.composedPath = () => L, N = A.setTimeout(() => C(n), 50);
      }
    }, { passive: !0 }),
    e && zA(A, "blur", (n) => {
      var L;
      const o = dA(M);
      ((L = document.activeElement) == null ? void 0 : L.tagName) === "IFRAME" && !(o != null && o.contains(document.activeElement)) && I(n);
    })
  ].filter(Boolean);
  return () => u.forEach((n) => n());
}
function Yb(M, I = !1) {
  const g = h(), A = () => g.value = Boolean(M());
  return A(), mb(A, I), g;
}
const W0 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Z0 = "__vueuse_ssr_handlers__";
W0[Z0] = W0[Z0] || {};
W0[Z0];
var hL = Object.getOwnPropertySymbols, pb = Object.prototype.hasOwnProperty, Qb = Object.prototype.propertyIsEnumerable, hb = (M, I) => {
  var g = {};
  for (var A in M)
    pb.call(M, A) && I.indexOf(A) < 0 && (g[A] = M[A]);
  if (M != null && hL)
    for (var A of hL(M))
      I.indexOf(A) < 0 && Qb.call(M, A) && (g[A] = M[A]);
  return g;
};
function Us(M, I, g = {}) {
  const A = g, { window: t = $u } = A, D = hb(A, ["window"]);
  let e;
  const i = Yb(() => t && "ResizeObserver" in t), N = () => {
    e && (e.disconnect(), e = void 0);
  }, C = SI(() => dA(M), (j) => {
    N(), i.value && t && j && (e = new ResizeObserver(I), e.observe(j, D));
  }, { immediate: !0, flush: "post" }), u = () => {
    N(), C();
  };
  return _u(u), {
    isSupported: i,
    stop: u
  };
}
var OL;
(function(M) {
  M.UP = "UP", M.RIGHT = "RIGHT", M.DOWN = "DOWN", M.LEFT = "LEFT", M.NONE = "NONE";
})(OL || (OL = {}));
var Ob = Object.defineProperty, kL = Object.getOwnPropertySymbols, kb = Object.prototype.hasOwnProperty, Pb = Object.prototype.propertyIsEnumerable, PL = (M, I, g) => I in M ? Ob(M, I, { enumerable: !0, configurable: !0, writable: !0, value: g }) : M[I] = g, fb = (M, I) => {
  for (var g in I || (I = {}))
    kb.call(I, g) && PL(M, g, I[g]);
  if (kL)
    for (var g of kL(I))
      Pb.call(I, g) && PL(M, g, I[g]);
  return M;
};
const Gb = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
fb({
  linear: zb
}, Gb);
const qu = (M) => {
  let I, g;
  return M.type === "touchend" ? (g = M.changedTouches[0].clientY, I = M.changedTouches[0].clientX) : M.type.startsWith("touch") ? (g = M.touches[0].clientY, I = M.touches[0].clientX) : (g = M.clientY, I = M.clientX), {
    clientX: I,
    clientY: g
  };
};
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const AA = () => {
}, Wb = Object.assign, Zb = Object.prototype.hasOwnProperty, xD = (M, I) => Zb.call(M, I), Js = Array.isArray, mA = (M) => typeof M == "function", jt = (M) => typeof M == "string", xt = (M) => M !== null && typeof M == "object", vb = (M) => {
  const I = /* @__PURE__ */ Object.create(null);
  return (g) => I[g] || (I[g] = M(g));
}, Ub = /-(\w)/g, Jb = vb((M) => M.replace(Ub, (I, g) => g ? g.toUpperCase() : "")), bN = (M) => M === void 0, Ye = (M) => typeof Element > "u" ? !1 : M instanceof Element;
class Bs extends Error {
  constructor(I) {
    super(I), this.name = "ElementPlusError";
  }
}
function Rs(M, I) {
  throw new Bs(`[${M}] ${I}`);
}
function QM(M, I) {
  if (process.env.NODE_ENV !== "production") {
    const g = jt(M) ? new Bs(`[${M}] ${I}`) : M;
    console.warn(g);
  }
}
const Bb = "utils/dom/style", Hs = (M = "") => M.split(" ").filter((I) => !!I.trim()), fL = (M, I) => {
  if (!M || !I)
    return !1;
  if (I.includes(" "))
    throw new Error("className should not contain space.");
  return M.classList.contains(I);
}, Rb = (M, I) => {
  !M || !I.trim() || M.classList.add(...Hs(I));
}, Hb = (M, I) => {
  !M || !I.trim() || M.classList.remove(...Hs(I));
}, Vb = (M, I) => {
  var g;
  if (!jM || !M || !I)
    return "";
  let A = Jb(I);
  A === "float" && (A = "cssFloat");
  try {
    const t = M.style[A];
    if (t)
      return t;
    const D = (g = document.defaultView) == null ? void 0 : g.getComputedStyle(M, "");
    return D ? D[A] : "";
  } catch {
    return M.style[A];
  }
};
function rt(M, I = "px") {
  if (!M)
    return "";
  if (jt(M))
    return M;
  if (EA(M))
    return `${M}${I}`;
  QM(Bb, "binding value must be a string or number");
}
let Si;
const Fb = (M) => {
  var I;
  if (!jM)
    return 0;
  if (Si !== void 0)
    return Si;
  const g = document.createElement("div");
  g.className = `${M}-scrollbar__wrap`, g.style.visibility = "hidden", g.style.width = "100px", g.style.position = "absolute", g.style.top = "-9999px", document.body.appendChild(g);
  const A = g.offsetWidth;
  g.style.overflow = "scroll";
  const t = document.createElement("div");
  t.style.width = "100%", g.appendChild(t);
  const D = t.offsetWidth;
  return (I = g.parentNode) == null || I.removeChild(g), Si = A - D, Si;
};
/*! Element Plus Icons Vue v2.0.9 */
var Tg = (M, I) => {
  let g = M.__vccOpts || M;
  for (let [A, t] of I)
    g[A] = t;
  return g;
}, Xb = {
  name: "ArrowDown"
}, Kb = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _b = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
}, null, -1), $b = [
  _b
];
function qb(M, I, g, A, t, D) {
  return Y(), $("svg", Kb, $b);
}
var gi = /* @__PURE__ */ Tg(Xb, [["render", qb], ["__file", "arrow-down.vue"]]), I2 = {
  name: "Check"
}, M2 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, g2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
}, null, -1), A2 = [
  g2
];
function t2(M, I, g, A, t, D) {
  return Y(), $("svg", M2, A2);
}
var v0 = /* @__PURE__ */ Tg(I2, [["render", t2], ["__file", "check.vue"]]), D2 = {
  name: "CircleCheck"
}, e2 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, i2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
}, null, -1), N2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
}, null, -1), C2 = [
  i2,
  N2
];
function u2(M, I, g, A, t, D) {
  return Y(), $("svg", e2, C2);
}
var j2 = /* @__PURE__ */ Tg(D2, [["render", u2], ["__file", "circle-check.vue"]]), n2 = {
  name: "CircleCloseFilled"
}, L2 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, o2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
}, null, -1), T2 = [
  o2
];
function s2(M, I, g, A, t, D) {
  return Y(), $("svg", L2, T2);
}
var Vs = /* @__PURE__ */ Tg(n2, [["render", s2], ["__file", "circle-close-filled.vue"]]), S2 = {
  name: "CircleClose"
}, a2 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, l2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
}, null, -1), y2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
}, null, -1), c2 = [
  l2,
  y2
];
function x2(M, I, g, A, t, D) {
  return Y(), $("svg", a2, c2);
}
var Fs = /* @__PURE__ */ Tg(S2, [["render", x2], ["__file", "circle-close.vue"]]), r2 = {
  name: "Close"
}, w2 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, E2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
}, null, -1), d2 = [
  E2
];
function z2(M, I, g, A, t, D) {
  return Y(), $("svg", w2, d2);
}
var Xs = /* @__PURE__ */ Tg(r2, [["render", z2], ["__file", "close.vue"]]), m2 = {
  name: "Hide"
}, b2 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Y2 = /* @__PURE__ */ f("path", {
  d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z",
  fill: "currentColor"
}, null, -1), p2 = /* @__PURE__ */ f("path", {
  d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z",
  fill: "currentColor"
}, null, -1), Q2 = [
  Y2,
  p2
];
function h2(M, I, g, A, t, D) {
  return Y(), $("svg", b2, Q2);
}
var O2 = /* @__PURE__ */ Tg(m2, [["render", h2], ["__file", "hide.vue"]]), k2 = {
  name: "InfoFilled"
}, P2 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, f2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
}, null, -1), G2 = [
  f2
];
function W2(M, I, g, A, t, D) {
  return Y(), $("svg", P2, G2);
}
var Ks = /* @__PURE__ */ Tg(k2, [["render", W2], ["__file", "info-filled.vue"]]), Z2 = {
  name: "Loading"
}, v2 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, U2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
}, null, -1), J2 = [
  U2
];
function B2(M, I, g, A, t, D) {
  return Y(), $("svg", v2, J2);
}
var _s = /* @__PURE__ */ Tg(Z2, [["render", B2], ["__file", "loading.vue"]]), R2 = {
  name: "SuccessFilled"
}, H2 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, V2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
}, null, -1), F2 = [
  V2
];
function X2(M, I, g, A, t, D) {
  return Y(), $("svg", H2, F2);
}
var $s = /* @__PURE__ */ Tg(R2, [["render", X2], ["__file", "success-filled.vue"]]), K2 = {
  name: "View"
}, _2 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, $2 = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
}, null, -1), q2 = [
  $2
];
function IY(M, I, g, A, t, D) {
  return Y(), $("svg", _2, q2);
}
var MY = /* @__PURE__ */ Tg(K2, [["render", IY], ["__file", "view.vue"]]), gY = {
  name: "WarningFilled"
}, AY = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, tY = /* @__PURE__ */ f("path", {
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
}, null, -1), DY = [
  tY
];
function eY(M, I, g, A, t, D) {
  return Y(), $("svg", AY, DY);
}
var qs = /* @__PURE__ */ Tg(gY, [["render", eY], ["__file", "warning-filled.vue"]]);
const IS = "__epPropKey", mI = (M) => M, iY = (M) => xt(M) && !!M[IS], NC = (M, I) => {
  if (!xt(M) || iY(M))
    return M;
  const { values: g, required: A, default: t, type: D, validator: e } = M, N = {
    type: D,
    required: !!A,
    validator: g || e ? (C) => {
      let u = !1, j = [];
      if (g && (j = Array.from(g), xD(M, "default") && j.push(t), u || (u = j.includes(C))), e && (u || (u = e(C))), !u && j.length > 0) {
        const n = [...new Set(j)].map((L) => JSON.stringify(L)).join(", ");
        cl(`Invalid prop: validation failed${I ? ` for prop "${I}"` : ""}. Expected one of [${n}], got value ${JSON.stringify(C)}.`);
      }
      return u;
    } : void 0,
    [IS]: !0
  };
  return xD(M, "default") && (N.default = t), N;
}, gM = (M) => vs(Object.entries(M).map(([I, g]) => [
  I,
  NC(g, I)
])), pe = mI([
  String,
  Object,
  Function
]), NY = {
  Close: Xs,
  SuccessFilled: $s,
  InfoFilled: Ks,
  WarningFilled: qs,
  CircleCloseFilled: Vs
}, GL = {
  success: $s,
  warning: qs,
  error: Vs,
  info: Ks
}, CY = {
  validating: _s,
  success: j2,
  error: Fs
}, JA = (M, I) => {
  if (M.install = (g) => {
    for (const A of [M, ...Object.values(I != null ? I : {})])
      g.component(A.name, A);
  }, I)
    for (const [g, A] of Object.entries(I))
      M[g] = A;
  return M;
}, uY = (M, I) => (M.install = (g) => {
  g.directive(I, M);
}, M), Ij = (M) => (M.install = AA, M), MS = (...M) => (I) => {
  M.forEach((g) => {
    mA(g) ? g(I) : g.value = I;
  });
}, ZI = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
}, iD = "update:modelValue", gS = ["", "default", "small", "large"], AS = (M) => ["", ...gS].includes(M);
var ki = /* @__PURE__ */ ((M) => (M[M.TEXT = 1] = "TEXT", M[M.CLASS = 2] = "CLASS", M[M.STYLE = 4] = "STYLE", M[M.PROPS = 8] = "PROPS", M[M.FULL_PROPS = 16] = "FULL_PROPS", M[M.HYDRATE_EVENTS = 32] = "HYDRATE_EVENTS", M[M.STABLE_FRAGMENT = 64] = "STABLE_FRAGMENT", M[M.KEYED_FRAGMENT = 128] = "KEYED_FRAGMENT", M[M.UNKEYED_FRAGMENT = 256] = "UNKEYED_FRAGMENT", M[M.NEED_PATCH = 512] = "NEED_PATCH", M[M.DYNAMIC_SLOTS = 1024] = "DYNAMIC_SLOTS", M[M.HOISTED = -1] = "HOISTED", M[M.BAIL = -2] = "BAIL", M))(ki || {});
const jY = (M) => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(M), nY = () => Math.floor(Math.random() * 1e4), LY = (M) => M, oY = ["class", "style"], TY = /^on[A-Z]/, sY = (M = {}) => {
  const { excludeListeners: I = !1, excludeKeys: g } = M, A = J(() => ((g == null ? void 0 : g.value) || []).concat(oY)), t = Lg();
  return t ? J(() => {
    var D;
    return vs(Object.entries((D = t.proxy) == null ? void 0 : D.$attrs).filter(([e]) => !A.value.includes(e) && !(I && TY.test(e))));
  }) : (QM("use-attrs", "getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function"), J(() => ({})));
}, tS = Symbol("buttonGroupContextKey"), SY = Symbol(), Mj = Symbol("formContextKey"), YN = Symbol("formItemContextKey"), DS = Symbol("scrollbarContextKey"), gj = Symbol("popper"), eS = Symbol("popperContent"), iS = (M) => {
  const I = Lg();
  return J(() => {
    var g, A;
    return (A = ((g = I.proxy) == null ? void 0 : g.$props)[M]) != null ? A : void 0;
  });
}, WL = h();
function bt(M, I = void 0) {
  const g = Lg() ? yI(SY, WL) : WL;
  return M ? J(() => {
    var A, t;
    return (t = (A = g.value) == null ? void 0 : A[M]) != null ? t : I;
  }) : g;
}
const NS = NC({
  type: String,
  values: gS,
  required: !1
}), Ai = (M, I = {}) => {
  const g = h(void 0), A = I.prop ? g : iS("size"), t = I.global ? g : bt("size"), D = I.form ? { size: void 0 } : yI(Mj, void 0), e = I.formItem ? { size: void 0 } : yI(YN, void 0);
  return J(() => A.value || r(M) || (e == null ? void 0 : e.size) || (D == null ? void 0 : D.size) || t.value || "");
}, Aj = (M) => {
  const I = iS("disabled"), g = yI(Mj, void 0);
  return J(() => I.value || r(M) || (g == null ? void 0 : g.disabled) || !1);
}, aY = ({ from: M, replacement: I, scope: g, version: A, ref: t, type: D = "API" }, e) => {
  SI(() => r(e), (i) => {
    i && QM(g, `[${D}] ${M} is about to be deprecated in version ${A}, please use ${I} instead.
For more detail, please visit: ${t}
`);
  }, {
    immediate: !0
  });
}, lY = (M, I, g) => {
  let A = {
    offsetX: 0,
    offsetY: 0
  };
  const t = (i) => {
    const N = i.clientX, C = i.clientY, { offsetX: u, offsetY: j } = A, n = M.value.getBoundingClientRect(), L = n.left, o = n.top, T = n.width, s = n.height, S = document.documentElement.clientWidth, y = document.documentElement.clientHeight, x = -L + u, a = -o + j, z = S - L - T + u, c = y - o - s + j, E = (p) => {
      const V = Math.min(Math.max(u + p.clientX - N, x), z), U = Math.min(Math.max(j + p.clientY - C, a), c);
      A = {
        offsetX: V,
        offsetY: U
      }, M.value.style.transform = `translate(${rt(V)}, ${rt(U)})`;
    }, m = () => {
      document.removeEventListener("mousemove", E), document.removeEventListener("mouseup", m);
    };
    document.addEventListener("mousemove", E), document.addEventListener("mouseup", m);
  }, D = () => {
    I.value && M.value && I.value.addEventListener("mousedown", t);
  }, e = () => {
    I.value && M.value && I.value.removeEventListener("mousedown", t);
  };
  RI(() => {
    Cu(() => {
      g.value ? D() : e();
    });
  }), kM(() => {
    e();
  });
}, tj = "el", yY = "is-", FA = (M, I, g, A, t) => {
  let D = `${M}-${I}`;
  return g && (D += `-${g}`), A && (D += `__${A}`), t && (D += `--${t}`), D;
}, vI = (M) => {
  const I = bt("namespace", tj);
  return {
    namespace: I,
    b: (o = "") => FA(I.value, M, o, "", ""),
    e: (o) => o ? FA(I.value, M, "", o, "") : "",
    m: (o) => o ? FA(I.value, M, "", "", o) : "",
    be: (o, T) => o && T ? FA(I.value, M, o, T, "") : "",
    em: (o, T) => o && T ? FA(I.value, M, "", o, T) : "",
    bm: (o, T) => o && T ? FA(I.value, M, o, "", T) : "",
    bem: (o, T, s) => o && T && s ? FA(I.value, M, o, T, s) : "",
    is: (o, ...T) => {
      const s = T.length >= 1 ? T[0] : !0;
      return o && s ? `${yY}${o}` : "";
    },
    cssVar: (o) => {
      const T = {};
      for (const s in o)
        o[s] && (T[`--${I.value}-${s}`] = o[s]);
      return T;
    },
    cssVarName: (o) => `--${I.value}-${o}`,
    cssVarBlock: (o) => {
      const T = {};
      for (const s in o)
        o[s] && (T[`--${I.value}-${M}-${s}`] = o[s]);
      return T;
    },
    cssVarBlockName: (o) => `--${I.value}-${M}-${o}`
  };
}, ZL = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, cY = Symbol("elIdInjection"), rD = (M) => {
  const I = yI(cY, ZL);
  !jM && I === ZL && QM("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);
  const g = bt("namespace", tj);
  return J(() => r(M) || `${g.value}-id-${I.prefix}-${I.current++}`);
}, Dj = () => {
  const M = yI(Mj, void 0), I = yI(YN, void 0);
  return {
    form: M,
    formItem: I
  };
}, CS = (M, {
  formItemContext: I,
  disableIdGeneration: g,
  disableIdManagement: A
}) => {
  g || (g = h(!1)), A || (A = h(!1));
  const t = h();
  let D;
  const e = J(() => {
    var i;
    return !!(!M.label && I && I.inputIds && ((i = I.inputIds) == null ? void 0 : i.length) <= 1);
  });
  return RI(() => {
    D = SI([GM(M, "id"), g], ([i, N]) => {
      const C = i != null ? i : N ? void 0 : rD().value;
      C !== t.value && (I != null && I.removeInputId && (t.value && I.removeInputId(t.value), !(A != null && A.value) && !N && C && I.addInputId(C)), t.value = C);
    }, { immediate: !0 });
  }), xl(() => {
    D && D(), I != null && I.removeInputId && t.value && I.removeInputId(t.value);
  }), {
    isLabeledByFormItem: e,
    inputId: t
  };
};
var xY = {
  name: "en",
  el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color."
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }
  }
};
const rY = (M) => (I, g) => wY(I, g, r(M)), wY = (M, I, g) => sb(g, M, M).replace(/\{(\w+)\}/g, (A, t) => {
  var D;
  return `${(D = I == null ? void 0 : I[t]) != null ? D : `{${t}}`}`;
}), EY = (M) => {
  const I = J(() => r(M).name), g = vN(M) ? M : h(M);
  return {
    lang: I,
    locale: g,
    t: rY(M)
  };
}, ej = () => {
  const M = bt("locale");
  return EY(J(() => M.value || xY));
};
let dY;
function zY(M, I = dY) {
  I && I.active && I.effects.push(M);
}
const vL = (M) => {
  const I = new Set(M);
  return I.w = 0, I.n = 0, I;
}, uS = (M) => (M.w & WA) > 0, jS = (M) => (M.n & WA) > 0, mY = ({ deps: M }) => {
  if (M.length)
    for (let I = 0; I < M.length; I++)
      M[I].w |= WA;
}, bY = (M) => {
  const { deps: I } = M;
  if (I.length) {
    let g = 0;
    for (let A = 0; A < I.length; A++) {
      const t = I[A];
      uS(t) && !jS(t) ? t.delete(M) : I[g++] = t, t.w &= ~WA, t.n &= ~WA;
    }
    I.length = g;
  }
};
let Me = 0, WA = 1;
const U0 = 30;
let KM;
Symbol(process.env.NODE_ENV !== "production" ? "iterate" : "");
Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class YY {
  constructor(I, g = null, A) {
    this.fn = I, this.scheduler = g, this.active = !0, this.deps = [], this.parent = void 0, zY(this, A);
  }
  run() {
    if (!this.active)
      return this.fn();
    let I = KM, g = Pi;
    for (; I; ) {
      if (I === this)
        return;
      I = I.parent;
    }
    try {
      return this.parent = KM, KM = this, Pi = !0, WA = 1 << ++Me, Me <= U0 ? mY(this) : UL(this), this.fn();
    } finally {
      Me <= U0 && bY(this), WA = 1 << --Me, KM = this.parent, Pi = g, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    KM === this ? this.deferStop = !0 : this.active && (UL(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function UL(M) {
  const { deps: I } = M;
  if (I.length) {
    for (let g = 0; g < I.length; g++)
      I[g].delete(M);
    I.length = 0;
  }
}
let Pi = !0;
function JL(M, I) {
  let g = !1;
  Me <= U0 ? jS(M) || (M.n |= WA, g = !uS(M)) : g = !M.has(KM), g && (M.add(KM), KM.deps.push(M), process.env.NODE_ENV !== "production" && KM.onTrack && KM.onTrack(Object.assign({ effect: KM }, I)));
}
function BL(M, I) {
  const g = Js(M) ? M : [...M];
  for (const A of g)
    A.computed && RL(A, I);
  for (const A of g)
    A.computed || RL(A, I);
}
function RL(M, I) {
  (M !== KM || M.allowRecurse) && (process.env.NODE_ENV !== "production" && M.onTrigger && M.onTrigger(Wb({ effect: M }, I)), M.scheduler ? M.scheduler() : M.run());
}
function CC(M) {
  const I = M && M.__v_raw;
  return I ? CC(I) : M;
}
function pY(M) {
  Pi && KM && (M = CC(M), process.env.NODE_ENV !== "production" ? JL(M.dep || (M.dep = vL()), {
    target: M,
    type: "get",
    key: "value"
  }) : JL(M.dep || (M.dep = vL())));
}
function QY(M, I) {
  M = CC(M), M.dep && (process.env.NODE_ENV !== "production" ? BL(M.dep, {
    target: M,
    type: "set",
    key: "value",
    newValue: I
  }) : BL(M.dep));
}
var nS;
class hY {
  constructor(I, g, A, t) {
    this._setter = g, this.dep = void 0, this.__v_isRef = !0, this[nS] = !1, this._dirty = !0, this.effect = new YY(I, () => {
      this._dirty || (this._dirty = !0, QY(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !t, this.__v_isReadonly = A;
  }
  get value() {
    const I = CC(this);
    return pY(I), (I._dirty || !I._cacheable) && (I._dirty = !1, I._value = I.effect.run()), I._value;
  }
  set value(I) {
    this._setter(I);
  }
}
nS = "__v_isReadonly";
function OY(M, I, g = !1) {
  let A, t;
  const D = mA(M);
  D ? (A = M, t = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : AA) : (A = M.get, t = M.set);
  const e = new hY(A, t, D || !t, g);
  return process.env.NODE_ENV !== "production" && I && !g && (e.effect.onTrack = I.onTrack, e.effect.onTrigger = I.onTrigger), e;
}
const kY = (M) => {
  vN(M) || Rs("[useLockscreen]", "You need to pass a ref param to this function");
  const I = vI("popup"), g = OY(() => I.bm("parent", "hidden"));
  if (!jM || fL(document.body, g.value))
    return;
  let A = 0, t = !1, D = "0";
  const e = () => {
    setTimeout(() => {
      Hb(document.body, g.value), t && (document.body.style.width = D);
    }, 200);
  };
  SI(M, (i) => {
    if (!i) {
      e();
      return;
    }
    t = !fL(document.body, g.value), t && (D = document.body.style.width), A = Fb(I.namespace.value);
    const N = document.documentElement.clientHeight < document.body.scrollHeight, C = Vb(document.body, "overflowY");
    A > 0 && (N || C === "scroll") && t && (document.body.style.width = `calc(100% - ${A}px)`), Rb(document.body, g.value);
  }), ET(() => e());
}, PY = NC({
  type: mI(Boolean),
  default: null
}), fY = NC({
  type: mI(Function)
}), GY = (M) => {
  const I = `update:${M}`, g = `onUpdate:${M}`, A = [I], t = {
    [M]: PY,
    [g]: fY
  };
  return {
    useModelToggle: ({
      indicator: e,
      toggleReason: i,
      shouldHideWhenRouteChanges: N,
      shouldProceed: C,
      onShow: u,
      onHide: j
    }) => {
      const n = Lg(), { emit: L } = n, o = n.props, T = J(() => mA(o[g])), s = J(() => o[M] === null), S = (E) => {
        e.value !== !0 && (e.value = !0, i && (i.value = E), mA(u) && u(E));
      }, y = (E) => {
        e.value !== !1 && (e.value = !1, i && (i.value = E), mA(j) && j(E));
      }, x = (E) => {
        if (o.disabled === !0 || mA(C) && !C())
          return;
        const m = T.value && jM;
        m && L(I, !0), (s.value || !m) && S(E);
      }, a = (E) => {
        if (o.disabled === !0 || !jM)
          return;
        const m = T.value && jM;
        m && L(I, !1), (s.value || !m) && y(E);
      }, z = (E) => {
        !mN(E) || (o.disabled && E ? T.value && L(I, !1) : e.value !== E && (E ? S() : y()));
      }, c = () => {
        e.value ? a() : x();
      };
      return SI(() => o[M], z), N && n.appContext.config.globalProperties.$route !== void 0 && SI(() => ({
        ...n.proxy.$route
      }), () => {
        N.value && e.value && a();
      }), RI(() => {
        z(o[M]);
      }), {
        hide: a,
        show: x,
        toggle: c,
        hasUpdateHandler: T
      };
    },
    useModelToggleProps: t,
    useModelToggleEmits: A
  };
}, WY = (M, I) => {
  let g;
  SI(() => M.value, (A) => {
    var t, D;
    A ? (g = document.activeElement, vN(I) && ((D = (t = I.value).focus) == null || D.call(t))) : process.env.NODE_ENV === "test" ? g.focus.call(g) : g.focus();
  });
}, LS = (M) => {
  if (!M)
    return { onClick: AA, onMousedown: AA, onMouseup: AA };
  let I = !1, g = !1;
  return { onClick: (e) => {
    I && g && M(e), I = g = !1;
  }, onMousedown: (e) => {
    I = e.target === e.currentTarget;
  }, onMouseup: (e) => {
    g = e.target === e.currentTarget;
  } };
};
function ZY() {
  let M;
  const I = (A, t) => {
    g(), M = window.setTimeout(A, t);
  }, g = () => window.clearTimeout(M);
  return _u(() => g()), {
    registerTimeout: I,
    cancelTimeout: g
  };
}
let Jt = [];
const HL = (M) => {
  const I = M;
  I.key === ZI.esc && Jt.forEach((g) => g(I));
}, vY = (M) => {
  RI(() => {
    Jt.length === 0 && document.addEventListener("keydown", HL), jM && Jt.push(M);
  }), kM(() => {
    Jt = Jt.filter((I) => I !== M), Jt.length === 0 && jM && document.removeEventListener("keydown", HL);
  });
};
let VL;
const UY = bt("namespace", tj), oS = `${UY.value}-popper-container-${nY()}`, TS = `#${oS}`, JY = () => {
  const M = document.createElement("div");
  return M.id = oS, document.body.appendChild(M), M;
}, BY = () => {
  rl(() => {
    !jM || (process.env.NODE_ENV === "test" || !VL || !document.body.querySelector(TS)) && (VL = JY());
  });
}, RY = gM({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  }
}), HY = ({
  showAfter: M,
  hideAfter: I,
  open: g,
  close: A
}) => {
  const { registerTimeout: t } = ZY();
  return {
    onOpen: (i) => {
      t(() => {
        g(i);
      }, r(M));
    },
    onClose: (i) => {
      t(() => {
        A(i);
      }, r(I));
    }
  };
}, sS = Symbol("elForwardRef"), VY = (M) => {
  LM(sS, {
    setForwardRef: (g) => {
      M.value = g;
    }
  });
}, FY = (M) => ({
  mounted(I) {
    M(I);
  },
  updated(I) {
    M(I);
  },
  unmounted() {
    M(null);
  }
}), FL = h(0), SS = () => {
  const M = bt("zIndex", 2e3), I = J(() => M.value + FL.value);
  return {
    initialZIndex: M,
    currentZIndex: I,
    nextZIndex: () => (FL.value++, I.value)
  };
};
function XY(M) {
  const I = h();
  function g() {
    if (M.value == null)
      return;
    const { selectionStart: t, selectionEnd: D, value: e } = M.value;
    if (t == null || D == null)
      return;
    const i = e.slice(0, Math.max(0, t)), N = e.slice(Math.max(0, D));
    I.value = {
      selectionStart: t,
      selectionEnd: D,
      value: e,
      beforeTxt: i,
      afterTxt: N
    };
  }
  function A() {
    if (M.value == null || I.value == null)
      return;
    const { value: t } = M.value, { beforeTxt: D, afterTxt: e, selectionStart: i } = I.value;
    if (D == null || e == null || i == null)
      return;
    let N = t.length;
    if (t.endsWith(e))
      N = t.length - e.length;
    else if (t.startsWith(D))
      N = D.length;
    else {
      const C = D[i - 1], u = t.indexOf(C, i - 1);
      u !== -1 && (N = u + 1);
    }
    M.value.setSelectionRange(N, N);
  }
  return [g, A];
}
var bI = (M, I) => {
  const g = M.__vccOpts || M;
  for (const [A, t] of I)
    g[A] = t;
  return g;
};
const KY = gM({
  size: {
    type: mI([Number, String])
  },
  color: {
    type: String
  }
}), _Y = {
  name: "ElIcon",
  inheritAttrs: !1
}, $Y = /* @__PURE__ */ eI({
  ..._Y,
  props: KY,
  setup(M) {
    const I = M, g = vI("icon"), A = J(() => {
      const { size: t, color: D } = I;
      return !t && !D ? {} : {
        fontSize: bN(t) ? void 0 : rt(t),
        "--color": D
      };
    });
    return (t, D) => (Y(), $("i", qM({
      class: r(g).b(),
      style: r(A)
    }, t.$attrs), [
      dI(t.$slots, "default")
    ], 16));
  }
});
var qY = /* @__PURE__ */ bI($Y, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const PM = JA(qY);
let sg;
const Ip = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`, Mp = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function gp(M) {
  const I = window.getComputedStyle(M), g = I.getPropertyValue("box-sizing"), A = Number.parseFloat(I.getPropertyValue("padding-bottom")) + Number.parseFloat(I.getPropertyValue("padding-top")), t = Number.parseFloat(I.getPropertyValue("border-bottom-width")) + Number.parseFloat(I.getPropertyValue("border-top-width"));
  return { contextStyle: Mp.map((e) => `${e}:${I.getPropertyValue(e)}`).join(";"), paddingSize: A, borderSize: t, boxSizing: g };
}
function XL(M, I = 1, g) {
  var A;
  sg || (sg = document.createElement("textarea"), document.body.appendChild(sg));
  const { paddingSize: t, borderSize: D, boxSizing: e, contextStyle: i } = gp(M);
  sg.setAttribute("style", `${i};${Ip}`), sg.value = M.value || M.placeholder || "";
  let N = sg.scrollHeight;
  const C = {};
  e === "border-box" ? N = N + D : e === "content-box" && (N = N - t), sg.value = "";
  const u = sg.scrollHeight - t;
  if (EA(I)) {
    let j = u * I;
    e === "border-box" && (j = j + t + D), N = Math.max(j, N), C.minHeight = `${j}px`;
  }
  if (EA(g)) {
    let j = u * g;
    e === "border-box" && (j = j + t + D), N = Math.min(j, N);
  }
  return C.height = `${N}px`, (A = sg.parentNode) == null || A.removeChild(sg), sg = void 0, C;
}
const Ap = gM({
  id: {
    type: String,
    default: void 0
  },
  size: NS,
  disabled: Boolean,
  modelValue: {
    type: mI([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  type: {
    type: String,
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: mI([Boolean, Object]),
    default: !1
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  placeholder: {
    type: String
  },
  form: {
    type: String,
    default: ""
  },
  readonly: {
    type: Boolean,
    default: !1
  },
  clearable: {
    type: Boolean,
    default: !1
  },
  showPassword: {
    type: Boolean,
    default: !1
  },
  showWordLimit: {
    type: Boolean,
    default: !1
  },
  suffixIcon: {
    type: pe
  },
  prefixIcon: {
    type: pe
  },
  containerRole: {
    type: String,
    default: void 0
  },
  label: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  inputStyle: {
    type: mI([Object, Array, String]),
    default: () => LY({})
  }
}), tp = {
  [iD]: (M) => jt(M),
  input: (M) => jt(M),
  change: (M) => jt(M),
  focus: (M) => M instanceof FocusEvent,
  blur: (M) => M instanceof FocusEvent,
  clear: () => !0,
  mouseleave: (M) => M instanceof MouseEvent,
  mouseenter: (M) => M instanceof MouseEvent,
  keydown: (M) => M instanceof Event,
  compositionstart: (M) => M instanceof CompositionEvent,
  compositionupdate: (M) => M instanceof CompositionEvent,
  compositionend: (M) => M instanceof CompositionEvent
}, Dp = ["role"], ep = ["id", "type", "disabled", "formatter", "parser", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder"], ip = ["id", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder"], Np = {
  name: "ElInput",
  inheritAttrs: !1
}, Cp = /* @__PURE__ */ eI({
  ...Np,
  props: Ap,
  emits: tp,
  setup(M, { expose: I, emit: g }) {
    const A = M, t = {
      suffix: "append",
      prefix: "prepend"
    }, D = Lg(), e = wl(), i = dT(), N = J(() => {
      const P = {};
      return A.containerRole === "combobox" && (P["aria-haspopup"] = e["aria-haspopup"], P["aria-owns"] = e["aria-owns"], P["aria-expanded"] = e["aria-expanded"]), P;
    }), C = sY({
      excludeKeys: J(() => Object.keys(N.value))
    }), { form: u, formItem: j } = Dj(), { inputId: n } = CS(A, {
      formItemContext: j
    }), L = Ai(), o = Aj(), T = vI("input"), s = vI("textarea"), S = gD(), y = gD(), x = h(!1), a = h(!1), z = h(!1), c = h(!1), E = h(), m = gD(A.inputStyle), p = J(() => S.value || y.value), V = J(() => {
      var P;
      return (P = u == null ? void 0 : u.statusIcon) != null ? P : !1;
    }), U = J(() => (j == null ? void 0 : j.validateState) || ""), gI = J(() => U.value && CY[U.value]), R = J(() => c.value ? MY : O2), H = J(() => [
      e.style,
      A.inputStyle
    ]), W = J(() => [
      A.inputStyle,
      m.value,
      { resize: A.resize }
    ]), l = J(() => iC(A.modelValue) ? "" : String(A.modelValue)), w = J(() => A.clearable && !o.value && !A.readonly && !!l.value && (x.value || a.value)), Q = J(() => A.showPassword && !o.value && !A.readonly && !!l.value && (!!l.value || x.value)), k = J(() => A.showWordLimit && !!C.value.maxlength && (A.type === "text" || A.type === "textarea") && !o.value && !A.readonly && !A.showPassword), B = J(() => Array.from(l.value).length), iI = J(() => !!k.value && B.value > Number(C.value.maxlength)), aI = J(() => !!i.suffix || !!A.suffixIcon || w.value || A.showPassword || k.value || !!U.value && V.value), [kI, jI] = XY(S);
    Us(y, (P) => {
      if (!k.value || A.resize !== "both")
        return;
      const d = P[0], { width: b } = d.contentRect;
      E.value = {
        right: `calc(100% - ${b + 15 + 6}px)`
      };
    });
    const sI = () => {
      const { type: P, autosize: d } = A;
      if (!(!jM || P !== "textarea"))
        if (d) {
          const b = xt(d) ? d.minRows : void 0, v = xt(d) ? d.maxRows : void 0;
          m.value = {
            ...XL(y.value, b, v)
          };
        } else
          m.value = {
            minHeight: XL(y.value).minHeight
          };
    }, PI = () => {
      const P = p.value;
      !P || P.value === l.value || (P.value = l.value);
    }, KI = (P) => {
      const { el: d } = D.vnode;
      if (!d)
        return;
      const v = Array.from(d.querySelectorAll(`.${T.e(P)}`)).find((rI) => rI.parentNode === d);
      if (!v)
        return;
      const II = t[P];
      i[II] ? v.style.transform = `translateX(${P === "suffix" ? "-" : ""}${d.querySelector(`.${T.be("group", II)}`).offsetWidth}px)` : v.removeAttribute("style");
    }, UI = () => {
      KI("prefix"), KI("suffix");
    }, rM = async (P) => {
      kI();
      let { value: d } = P.target;
      if (A.formatter && (d = A.parser ? A.parser(d) : d, d = A.formatter(d)), !z.value) {
        if (d === l.value) {
          PI();
          return;
        }
        g(iD, d), g("input", d), await VI(), PI(), jI();
      }
    }, sM = (P) => {
      g("change", P.target.value);
    }, SM = (P) => {
      g("compositionstart", P), z.value = !0;
    }, DM = (P) => {
      var d;
      g("compositionupdate", P);
      const b = (d = P.target) == null ? void 0 : d.value, v = b[b.length - 1] || "";
      z.value = !jY(v);
    }, aM = (P) => {
      g("compositionend", P), z.value && (z.value = !1, rM(P));
    }, fI = () => {
      c.value = !c.value, HM();
    }, HM = async () => {
      var P;
      await VI(), (P = p.value) == null || P.focus();
    }, NM = () => {
      var P;
      return (P = p.value) == null ? void 0 : P.blur();
    }, Z = (P) => {
      x.value = !0, g("focus", P);
    }, bM = (P) => {
      var d;
      x.value = !1, g("blur", P), A.validateEvent && ((d = j == null ? void 0 : j.validate) == null || d.call(j, "blur").catch((b) => QM(b)));
    }, oI = (P) => {
      a.value = !1, g("mouseleave", P);
    }, q = (P) => {
      a.value = !0, g("mouseenter", P);
    }, GI = (P) => {
      g("keydown", P);
    }, WI = () => {
      var P;
      (P = p.value) == null || P.select();
    }, _I = () => {
      g(iD, ""), g("change", ""), g("clear"), g("input", "");
    };
    return SI(() => A.modelValue, () => {
      var P;
      VI(() => sI()), A.validateEvent && ((P = j == null ? void 0 : j.validate) == null || P.call(j, "change").catch((d) => QM(d)));
    }), SI(l, () => PI()), SI(() => A.type, async () => {
      await VI(), PI(), sI(), UI();
    }), RI(async () => {
      !A.formatter && A.parser && QM("ElInput", "If you set the parser, you also need to set the formatter."), PI(), UI(), await VI(), sI();
    }), zT(async () => {
      await VI(), UI();
    }), I({
      input: S,
      textarea: y,
      ref: p,
      textareaStyle: W,
      autosize: GM(A, "autosize"),
      focus: HM,
      blur: NM,
      select: WI,
      clear: _I,
      resizeTextarea: sI
    }), (P, d) => ig((Y(), $("div", qM(r(N), {
      class: [
        P.type === "textarea" ? r(s).b() : r(T).b(),
        r(T).m(r(L)),
        r(T).is("disabled", r(o)),
        r(T).is("exceed", r(iI)),
        {
          [r(T).b("group")]: P.$slots.prepend || P.$slots.append,
          [r(T).bm("group", "append")]: P.$slots.append,
          [r(T).bm("group", "prepend")]: P.$slots.prepend,
          [r(T).m("prefix")]: P.$slots.prefix || P.prefixIcon,
          [r(T).m("suffix")]: P.$slots.suffix || P.suffixIcon || P.clearable || P.showPassword,
          [r(T).bm("suffix", "password-clear")]: r(w) && r(Q)
        },
        P.$attrs.class
      ],
      style: r(H),
      role: P.containerRole,
      onMouseenter: q,
      onMouseleave: oI
    }), [
      TI(" input "),
      P.type !== "textarea" ? (Y(), $(iM, { key: 0 }, [
        TI(" prepend slot "),
        P.$slots.prepend ? (Y(), $("div", {
          key: 0,
          class: _(r(T).be("group", "prepend"))
        }, [
          dI(P.$slots, "prepend")
        ], 2)) : TI("v-if", !0),
        f("div", {
          class: _([r(T).e("wrapper"), r(T).is("focus", x.value)])
        }, [
          TI(" prefix slot "),
          P.$slots.prefix || P.prefixIcon ? (Y(), $("span", {
            key: 0,
            class: _(r(T).e("prefix"))
          }, [
            f("span", {
              class: _(r(T).e("prefix-inner"))
            }, [
              dI(P.$slots, "prefix"),
              P.prefixIcon ? (Y(), DI(r(PM), {
                key: 0,
                class: _(r(T).e("icon"))
              }, {
                default: F(() => [
                  (Y(), DI($M(P.prefixIcon)))
                ]),
                _: 1
              }, 8, ["class"])) : TI("v-if", !0)
            ], 2)
          ], 2)) : TI("v-if", !0),
          f("input", qM({
            id: r(n),
            ref_key: "input",
            ref: S,
            class: r(T).e("inner")
          }, r(C), {
            type: P.showPassword ? c.value ? "text" : "password" : P.type,
            disabled: r(o),
            formatter: P.formatter,
            parser: P.parser,
            readonly: P.readonly,
            autocomplete: P.autocomplete,
            tabindex: P.tabindex,
            "aria-label": P.label,
            placeholder: P.placeholder,
            style: P.inputStyle,
            onCompositionstart: SM,
            onCompositionupdate: DM,
            onCompositionend: aM,
            onInput: rM,
            onFocus: Z,
            onBlur: bM,
            onChange: sM,
            onKeydown: GI
          }), null, 16, ep),
          TI(" suffix slot "),
          r(aI) ? (Y(), $("span", {
            key: 1,
            class: _(r(T).e("suffix"))
          }, [
            f("span", {
              class: _(r(T).e("suffix-inner"))
            }, [
              !r(w) || !r(Q) || !r(k) ? (Y(), $(iM, { key: 0 }, [
                dI(P.$slots, "suffix"),
                P.suffixIcon ? (Y(), DI(r(PM), {
                  key: 0,
                  class: _(r(T).e("icon"))
                }, {
                  default: F(() => [
                    (Y(), DI($M(P.suffixIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : TI("v-if", !0)
              ], 64)) : TI("v-if", !0),
              r(w) ? (Y(), DI(r(PM), {
                key: 1,
                class: _([r(T).e("icon"), r(T).e("clear")]),
                onMousedown: _D(r(AA), ["prevent"]),
                onClick: _I
              }, {
                default: F(() => [
                  MI(r(Fs))
                ]),
                _: 1
              }, 8, ["class", "onMousedown"])) : TI("v-if", !0),
              r(Q) ? (Y(), DI(r(PM), {
                key: 2,
                class: _([r(T).e("icon"), r(T).e("password")]),
                onClick: fI
              }, {
                default: F(() => [
                  (Y(), DI($M(r(R))))
                ]),
                _: 1
              }, 8, ["class"])) : TI("v-if", !0),
              r(k) ? (Y(), $("span", {
                key: 3,
                class: _(r(T).e("count"))
              }, [
                f("span", {
                  class: _(r(T).e("count-inner"))
                }, IM(r(B)) + " / " + IM(r(C).maxlength), 3)
              ], 2)) : TI("v-if", !0),
              r(U) && r(gI) && r(V) ? (Y(), DI(r(PM), {
                key: 4,
                class: _([
                  r(T).e("icon"),
                  r(T).e("validateIcon"),
                  r(T).is("loading", r(U) === "validating")
                ])
              }, {
                default: F(() => [
                  (Y(), DI($M(r(gI))))
                ]),
                _: 1
              }, 8, ["class"])) : TI("v-if", !0)
            ], 2)
          ], 2)) : TI("v-if", !0)
        ], 2),
        TI(" append slot "),
        P.$slots.append ? (Y(), $("div", {
          key: 1,
          class: _(r(T).be("group", "append"))
        }, [
          dI(P.$slots, "append")
        ], 2)) : TI("v-if", !0)
      ], 64)) : (Y(), $(iM, { key: 1 }, [
        TI(" textarea "),
        f("textarea", qM({
          id: r(n),
          ref_key: "textarea",
          ref: y,
          class: r(s).e("inner")
        }, r(C), {
          tabindex: P.tabindex,
          disabled: r(o),
          readonly: P.readonly,
          autocomplete: P.autocomplete,
          style: r(W),
          "aria-label": P.label,
          placeholder: P.placeholder,
          onCompositionstart: SM,
          onCompositionupdate: DM,
          onCompositionend: aM,
          onInput: rM,
          onFocus: Z,
          onBlur: bM,
          onChange: sM,
          onKeydown: GI
        }), null, 16, ip),
        r(k) ? (Y(), $("span", {
          key: 0,
          style: BI(E.value),
          class: _(r(T).e("count"))
        }, IM(r(B)) + " / " + IM(r(C).maxlength), 7)) : TI("v-if", !0)
      ], 64))
    ], 16, Dp)), [
      [Dt, P.type !== "hidden"]
    ]);
  }
});
var up = /* @__PURE__ */ bI(Cp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);
const ij = JA(up), ID = 4, jp = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
}, np = ({
  move: M,
  size: I,
  bar: g
}) => ({
  [g.size]: I,
  transform: `translate${g.axis}(${M}%)`
}), Lp = gM({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: !0
  },
  always: Boolean
}), op = /* @__PURE__ */ eI({
  __name: "thumb",
  props: Lp,
  setup(M) {
    const I = M, g = "Thumb", A = yI(DS), t = vI("scrollbar");
    A || Rs(g, "can not inject scrollbar context");
    const D = h(), e = h(), i = h({}), N = h(!1);
    let C = !1, u = !1, j = jM ? document.onselectstart : null;
    const n = J(() => jp[I.vertical ? "vertical" : "horizontal"]), L = J(() => np({
      size: I.size,
      move: I.move,
      bar: n.value
    })), o = J(() => D.value[n.value.offset] ** 2 / A.wrapElement[n.value.scrollSize] / I.ratio / e.value[n.value.offset]), T = (E) => {
      var m;
      if (E.stopPropagation(), E.ctrlKey || [1, 2].includes(E.button))
        return;
      (m = window.getSelection()) == null || m.removeAllRanges(), S(E);
      const p = E.currentTarget;
      !p || (i.value[n.value.axis] = p[n.value.offset] - (E[n.value.client] - p.getBoundingClientRect()[n.value.direction]));
    }, s = (E) => {
      if (!e.value || !D.value || !A.wrapElement)
        return;
      const m = Math.abs(E.target.getBoundingClientRect()[n.value.direction] - E[n.value.client]), p = e.value[n.value.offset] / 2, V = (m - p) * 100 * o.value / D.value[n.value.offset];
      A.wrapElement[n.value.scroll] = V * A.wrapElement[n.value.scrollSize] / 100;
    }, S = (E) => {
      E.stopImmediatePropagation(), C = !0, document.addEventListener("mousemove", y), document.addEventListener("mouseup", x), j = document.onselectstart, document.onselectstart = () => !1;
    }, y = (E) => {
      if (!D.value || !e.value || C === !1)
        return;
      const m = i.value[n.value.axis];
      if (!m)
        return;
      const p = (D.value.getBoundingClientRect()[n.value.direction] - E[n.value.client]) * -1, V = e.value[n.value.offset] - m, U = (p - V) * 100 * o.value / D.value[n.value.offset];
      A.wrapElement[n.value.scroll] = U * A.wrapElement[n.value.scrollSize] / 100;
    }, x = () => {
      C = !1, i.value[n.value.axis] = 0, document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", x), c(), u && (N.value = !1);
    }, a = () => {
      u = !1, N.value = !!I.size;
    }, z = () => {
      u = !0, N.value = C;
    };
    kM(() => {
      c(), document.removeEventListener("mouseup", x);
    });
    const c = () => {
      document.onselectstart !== j && (document.onselectstart = j);
    };
    return zA(GM(A, "scrollbarElement"), "mousemove", a), zA(GM(A, "scrollbarElement"), "mouseleave", z), (E, m) => (Y(), DI(uu, {
      name: r(t).b("fade"),
      persisted: ""
    }, {
      default: F(() => [
        ig(f("div", {
          ref_key: "instance",
          ref: D,
          class: _([r(t).e("bar"), r(t).is(r(n).key)]),
          onMousedown: s
        }, [
          f("div", {
            ref_key: "thumb",
            ref: e,
            class: _(r(t).e("thumb")),
            style: BI(r(L)),
            onMousedown: T
          }, null, 38)
        ], 34), [
          [Dt, E.always || N.value]
        ])
      ]),
      _: 1
    }, 8, ["name"]));
  }
});
var KL = /* @__PURE__ */ bI(op, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);
const Tp = gM({
  always: {
    type: Boolean,
    default: !0
  },
  width: String,
  height: String,
  ratioX: {
    type: Number,
    default: 1
  },
  ratioY: {
    type: Number,
    default: 1
  }
}), sp = /* @__PURE__ */ eI({
  __name: "bar",
  props: Tp,
  setup(M, { expose: I }) {
    const g = M, A = h(0), t = h(0);
    return I({
      handleScroll: (e) => {
        if (e) {
          const i = e.offsetHeight - ID, N = e.offsetWidth - ID;
          t.value = e.scrollTop * 100 / i * g.ratioY, A.value = e.scrollLeft * 100 / N * g.ratioX;
        }
      }
    }), (e, i) => (Y(), $(iM, null, [
      MI(KL, {
        move: A.value,
        ratio: e.ratioX,
        size: e.width,
        always: e.always
      }, null, 8, ["move", "ratio", "size", "always"]),
      MI(KL, {
        move: t.value,
        ratio: e.ratioY,
        size: e.height,
        vertical: "",
        always: e.always
      }, null, 8, ["move", "ratio", "size", "always"])
    ], 64));
  }
});
var Sp = /* @__PURE__ */ bI(sp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);
const ap = gM({
  height: {
    type: [String, Number],
    default: ""
  },
  maxHeight: {
    type: [String, Number],
    default: ""
  },
  native: Boolean,
  wrapStyle: {
    type: mI([String, Object, Array]),
    default: ""
  },
  wrapClass: {
    type: [String, Array],
    default: ""
  },
  viewClass: {
    type: [String, Array],
    default: ""
  },
  viewStyle: {
    type: [String, Array, Object],
    default: ""
  },
  noresize: Boolean,
  tag: {
    type: String,
    default: "div"
  },
  always: Boolean,
  minSize: {
    type: Number,
    default: 20
  }
}), lp = {
  scroll: ({
    scrollTop: M,
    scrollLeft: I
  }) => [M, I].every(EA)
}, yp = {
  name: "ElScrollbar"
}, cp = /* @__PURE__ */ eI({
  ...yp,
  props: ap,
  emits: lp,
  setup(M, { expose: I, emit: g }) {
    const A = M, t = vI("scrollbar");
    let D, e;
    const i = h(), N = h(), C = h(), u = h("0"), j = h("0"), n = h(), L = h(1), o = h(1), T = "ElScrollbar", s = J(() => {
      const c = {};
      return A.height && (c.height = rt(A.height)), A.maxHeight && (c.maxHeight = rt(A.maxHeight)), [A.wrapStyle, c];
    }), S = () => {
      var c;
      N.value && ((c = n.value) == null || c.handleScroll(N.value), g("scroll", {
        scrollTop: N.value.scrollTop,
        scrollLeft: N.value.scrollLeft
      }));
    };
    function y(c, E) {
      xt(c) ? N.value.scrollTo(c) : EA(c) && EA(E) && N.value.scrollTo(c, E);
    }
    const x = (c) => {
      if (!EA(c)) {
        QM(T, "value must be a number");
        return;
      }
      N.value.scrollTop = c;
    }, a = (c) => {
      if (!EA(c)) {
        QM(T, "value must be a number");
        return;
      }
      N.value.scrollLeft = c;
    }, z = () => {
      if (!N.value)
        return;
      const c = N.value.offsetHeight - ID, E = N.value.offsetWidth - ID, m = c ** 2 / N.value.scrollHeight, p = E ** 2 / N.value.scrollWidth, V = Math.max(m, A.minSize), U = Math.max(p, A.minSize);
      L.value = m / (c - m) / (V / (c - V)), o.value = p / (E - p) / (U / (E - U)), j.value = V + ID < c ? `${V}px` : "", u.value = U + ID < E ? `${U}px` : "";
    };
    return SI(() => A.noresize, (c) => {
      c ? (D == null || D(), e == null || e()) : ({ stop: D } = Us(C, z), e = zA("resize", z));
    }, { immediate: !0 }), SI(() => [A.maxHeight, A.height], () => {
      A.native || VI(() => {
        var c;
        z(), N.value && ((c = n.value) == null || c.handleScroll(N.value));
      });
    }), LM(DS, QD({
      scrollbarElement: i,
      wrapElement: N
    })), RI(() => {
      A.native || VI(() => {
        z();
      });
    }), zT(() => z()), I({
      wrap$: N,
      update: z,
      scrollTo: y,
      setScrollTop: x,
      setScrollLeft: a,
      handleScroll: S
    }), (c, E) => (Y(), $("div", {
      ref_key: "scrollbar$",
      ref: i,
      class: _(r(t).b())
    }, [
      f("div", {
        ref_key: "wrap$",
        ref: N,
        class: _([
          c.wrapClass,
          r(t).e("wrap"),
          { [r(t).em("wrap", "hidden-default")]: !c.native }
        ]),
        style: BI(r(s)),
        onScroll: S
      }, [
        (Y(), DI($M(c.tag), {
          ref_key: "resize$",
          ref: C,
          class: _([r(t).e("view"), c.viewClass]),
          style: BI(c.viewStyle)
        }, {
          default: F(() => [
            dI(c.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]))
      ], 38),
      c.native ? TI("v-if", !0) : (Y(), DI(Sp, {
        key: 0,
        ref_key: "barRef",
        ref: n,
        height: j.value,
        width: u.value,
        always: c.always,
        "ratio-x": o.value,
        "ratio-y": L.value
      }, null, 8, ["height", "width", "always", "ratio-x", "ratio-y"]))
    ], 2));
  }
});
var xp = /* @__PURE__ */ bI(cp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);
const rp = JA(xp), wp = [
  "dialog",
  "grid",
  "listbox",
  "menu",
  "tooltip",
  "tree"
], aS = gM({
  role: {
    type: String,
    values: wp,
    default: "tooltip"
  }
}), Ep = {
  name: "ElPopperRoot",
  inheritAttrs: !1
}, dp = /* @__PURE__ */ eI({
  ...Ep,
  props: aS,
  setup(M, { expose: I }) {
    const g = M, A = h(), t = h(), D = h(), e = h(), i = J(() => g.role), N = {
      triggerRef: A,
      popperInstanceRef: t,
      contentRef: D,
      referenceRef: e,
      role: i
    };
    return I(N), LM(gj, N), (C, u) => dI(C.$slots, "default");
  }
});
var zp = /* @__PURE__ */ bI(dp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
const lS = gM({
  arrowOffset: {
    type: Number,
    default: 5
  }
}), mp = {
  name: "ElPopperArrow",
  inheritAttrs: !1
}, bp = /* @__PURE__ */ eI({
  ...mp,
  props: lS,
  setup(M, { expose: I }) {
    const g = M, A = vI("popper"), { arrowOffset: t, arrowRef: D } = yI(eS, void 0);
    return SI(() => g.arrowOffset, (e) => {
      t.value = e;
    }), kM(() => {
      D.value = void 0;
    }), I({
      arrowRef: D
    }), (e, i) => (Y(), $("span", {
      ref_key: "arrowRef",
      ref: D,
      class: _(r(A).e("arrow")),
      "data-popper-arrow": ""
    }, null, 2));
  }
});
var Yp = /* @__PURE__ */ bI(bp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
const qC = "ElOnlyChild", yS = eI({
  name: qC,
  setup(M, {
    slots: I,
    attrs: g
  }) {
    var A;
    const t = yI(sS), D = FY((A = t == null ? void 0 : t.setForwardRef) != null ? A : AA);
    return () => {
      var e;
      const i = (e = I.default) == null ? void 0 : e.call(I, g);
      if (!i)
        return null;
      if (i.length > 1)
        return QM(qC, "requires exact only one valid child."), null;
      const N = cS(i);
      return N ? ig(El(N, g), [[D]]) : (QM(qC, "no valid child node found"), null);
    };
  }
});
function cS(M) {
  if (!M)
    return null;
  const I = M;
  for (const g of I) {
    if (xt(g))
      switch (g.type) {
        case dl:
          continue;
        case mT:
        case "svg":
          return _L(g);
        case iM:
          return cS(g.children);
        default:
          return g;
      }
    return _L(g);
  }
  return null;
}
function _L(M) {
  const I = vI("only-child");
  return MI("span", {
    class: I.e("content")
  }, [M]);
}
const xS = gM({
  virtualRef: {
    type: mI(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: Function,
  onMouseleave: Function,
  onClick: Function,
  onKeydown: Function,
  onFocus: Function,
  onBlur: Function,
  onContextmenu: Function,
  id: String,
  open: Boolean
}), pp = {
  name: "ElPopperTrigger",
  inheritAttrs: !1
}, Qp = /* @__PURE__ */ eI({
  ...pp,
  props: xS,
  setup(M, { expose: I }) {
    const g = M, { role: A, triggerRef: t } = yI(gj, void 0);
    VY(t);
    const D = J(() => i.value ? g.id : void 0), e = J(() => {
      if (A && A.value === "tooltip")
        return g.open && g.id ? g.id : void 0;
    }), i = J(() => {
      if (A && A.value !== "tooltip")
        return A.value;
    }), N = J(() => i.value ? `${g.open}` : void 0);
    let C;
    return RI(() => {
      SI(() => g.virtualRef, (u) => {
        u && (t.value = dA(u));
      }, {
        immediate: !0
      }), SI(() => t.value, (u, j) => {
        C == null || C(), C = void 0, Ye(u) && ([
          "onMouseenter",
          "onMouseleave",
          "onClick",
          "onKeydown",
          "onFocus",
          "onBlur",
          "onContextmenu"
        ].forEach((n) => {
          var L;
          const o = g[n];
          o && (u.addEventListener(n.slice(2).toLowerCase(), o), (L = j == null ? void 0 : j.removeEventListener) == null || L.call(j, n.slice(2).toLowerCase(), o));
        }), C = SI([D, e, i, N], (n) => {
          [
            "aria-controls",
            "aria-describedby",
            "aria-haspopup",
            "aria-expanded"
          ].forEach((L, o) => {
            iC(n[o]) ? u.removeAttribute(L) : u.setAttribute(L, n[o]);
          });
        }, { immediate: !0 })), Ye(j) && [
          "aria-controls",
          "aria-describedby",
          "aria-haspopup",
          "aria-expanded"
        ].forEach((n) => j.removeAttribute(n));
      }, {
        immediate: !0
      });
    }), kM(() => {
      C == null || C(), C = void 0;
    }), I({
      triggerRef: t
    }), (u, j) => u.virtualTriggering ? TI("v-if", !0) : (Y(), DI(r(yS), qM({ key: 0 }, u.$attrs, {
      "aria-controls": r(D),
      "aria-describedby": r(e),
      "aria-expanded": r(N),
      "aria-haspopup": r(i)
    }), {
      default: F(() => [
        dI(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"]));
  }
});
var hp = /* @__PURE__ */ bI(Qp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]), UM = "top", jg = "bottom", ng = "right", JM = "left", Nj = "auto", ti = [UM, jg, ng, JM], wD = "start", Qe = "end", Op = "clippingParents", rS = "viewport", FD = "popper", kp = "reference", $L = ti.reduce(function(M, I) {
  return M.concat([I + "-" + wD, I + "-" + Qe]);
}, []), Cj = [].concat(ti, [Nj]).reduce(function(M, I) {
  return M.concat([I, I + "-" + wD, I + "-" + Qe]);
}, []), Pp = "beforeRead", fp = "read", Gp = "afterRead", Wp = "beforeMain", Zp = "main", vp = "afterMain", Up = "beforeWrite", Jp = "write", Bp = "afterWrite", Rp = [Pp, fp, Gp, Wp, Zp, vp, Up, Jp, Bp];
function Hg(M) {
  return M ? (M.nodeName || "").toLowerCase() : null;
}
function bg(M) {
  if (M == null)
    return window;
  if (M.toString() !== "[object Window]") {
    var I = M.ownerDocument;
    return I && I.defaultView || window;
  }
  return M;
}
function ED(M) {
  var I = bg(M).Element;
  return M instanceof I || M instanceof Element;
}
function Ng(M) {
  var I = bg(M).HTMLElement;
  return M instanceof I || M instanceof HTMLElement;
}
function uj(M) {
  if (typeof ShadowRoot > "u")
    return !1;
  var I = bg(M).ShadowRoot;
  return M instanceof I || M instanceof ShadowRoot;
}
function Hp(M) {
  var I = M.state;
  Object.keys(I.elements).forEach(function(g) {
    var A = I.styles[g] || {}, t = I.attributes[g] || {}, D = I.elements[g];
    !Ng(D) || !Hg(D) || (Object.assign(D.style, A), Object.keys(t).forEach(function(e) {
      var i = t[e];
      i === !1 ? D.removeAttribute(e) : D.setAttribute(e, i === !0 ? "" : i);
    }));
  });
}
function Vp(M) {
  var I = M.state, g = { popper: { position: I.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return Object.assign(I.elements.popper.style, g.popper), I.styles = g, I.elements.arrow && Object.assign(I.elements.arrow.style, g.arrow), function() {
    Object.keys(I.elements).forEach(function(A) {
      var t = I.elements[A], D = I.attributes[A] || {}, e = Object.keys(I.styles.hasOwnProperty(A) ? I.styles[A] : g[A]), i = e.reduce(function(N, C) {
        return N[C] = "", N;
      }, {});
      !Ng(t) || !Hg(t) || (Object.assign(t.style, i), Object.keys(D).forEach(function(N) {
        t.removeAttribute(N);
      }));
    });
  };
}
var wS = { name: "applyStyles", enabled: !0, phase: "write", fn: Hp, effect: Vp, requires: ["computeStyles"] };
function Ug(M) {
  return M.split("-")[0];
}
var nt = Math.max, pN = Math.min, dD = Math.round;
function zD(M, I) {
  I === void 0 && (I = !1);
  var g = M.getBoundingClientRect(), A = 1, t = 1;
  if (Ng(M) && I) {
    var D = M.offsetHeight, e = M.offsetWidth;
    e > 0 && (A = dD(g.width) / e || 1), D > 0 && (t = dD(g.height) / D || 1);
  }
  return { width: g.width / A, height: g.height / t, top: g.top / t, right: g.right / A, bottom: g.bottom / t, left: g.left / A, x: g.left / A, y: g.top / t };
}
function jj(M) {
  var I = zD(M), g = M.offsetWidth, A = M.offsetHeight;
  return Math.abs(I.width - g) <= 1 && (g = I.width), Math.abs(I.height - A) <= 1 && (A = I.height), { x: M.offsetLeft, y: M.offsetTop, width: g, height: A };
}
function ES(M, I) {
  var g = I.getRootNode && I.getRootNode();
  if (M.contains(I))
    return !0;
  if (g && uj(g)) {
    var A = I;
    do {
      if (A && M.isSameNode(A))
        return !0;
      A = A.parentNode || A.host;
    } while (A);
  }
  return !1;
}
function tA(M) {
  return bg(M).getComputedStyle(M);
}
function Fp(M) {
  return ["table", "td", "th"].indexOf(Hg(M)) >= 0;
}
function BA(M) {
  return ((ED(M) ? M.ownerDocument : M.document) || window.document).documentElement;
}
function uC(M) {
  return Hg(M) === "html" ? M : M.assignedSlot || M.parentNode || (uj(M) ? M.host : null) || BA(M);
}
function qL(M) {
  return !Ng(M) || tA(M).position === "fixed" ? null : M.offsetParent;
}
function Xp(M) {
  var I = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, g = navigator.userAgent.indexOf("Trident") !== -1;
  if (g && Ng(M)) {
    var A = tA(M);
    if (A.position === "fixed")
      return null;
  }
  var t = uC(M);
  for (uj(t) && (t = t.host); Ng(t) && ["html", "body"].indexOf(Hg(t)) < 0; ) {
    var D = tA(t);
    if (D.transform !== "none" || D.perspective !== "none" || D.contain === "paint" || ["transform", "perspective"].indexOf(D.willChange) !== -1 || I && D.willChange === "filter" || I && D.filter && D.filter !== "none")
      return t;
    t = t.parentNode;
  }
  return null;
}
function Di(M) {
  for (var I = bg(M), g = qL(M); g && Fp(g) && tA(g).position === "static"; )
    g = qL(g);
  return g && (Hg(g) === "html" || Hg(g) === "body" && tA(g).position === "static") ? I : g || Xp(M) || I;
}
function nj(M) {
  return ["top", "bottom"].indexOf(M) >= 0 ? "x" : "y";
}
function Te(M, I, g) {
  return nt(M, pN(I, g));
}
function Kp(M, I, g) {
  var A = Te(M, I, g);
  return A > g ? g : A;
}
function dS() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function zS(M) {
  return Object.assign({}, dS(), M);
}
function mS(M, I) {
  return I.reduce(function(g, A) {
    return g[A] = M, g;
  }, {});
}
var _p = function(M, I) {
  return M = typeof M == "function" ? M(Object.assign({}, I.rects, { placement: I.placement })) : M, zS(typeof M != "number" ? M : mS(M, ti));
};
function $p(M) {
  var I, g = M.state, A = M.name, t = M.options, D = g.elements.arrow, e = g.modifiersData.popperOffsets, i = Ug(g.placement), N = nj(i), C = [JM, ng].indexOf(i) >= 0, u = C ? "height" : "width";
  if (!(!D || !e)) {
    var j = _p(t.padding, g), n = jj(D), L = N === "y" ? UM : JM, o = N === "y" ? jg : ng, T = g.rects.reference[u] + g.rects.reference[N] - e[N] - g.rects.popper[u], s = e[N] - g.rects.reference[N], S = Di(D), y = S ? N === "y" ? S.clientHeight || 0 : S.clientWidth || 0 : 0, x = T / 2 - s / 2, a = j[L], z = y - n[u] - j[o], c = y / 2 - n[u] / 2 + x, E = Te(a, c, z), m = N;
    g.modifiersData[A] = (I = {}, I[m] = E, I.centerOffset = E - c, I);
  }
}
function qp(M) {
  var I = M.state, g = M.options, A = g.element, t = A === void 0 ? "[data-popper-arrow]" : A;
  t != null && (typeof t == "string" && (t = I.elements.popper.querySelector(t), !t) || !ES(I.elements.popper, t) || (I.elements.arrow = t));
}
var IQ = { name: "arrow", enabled: !0, phase: "main", fn: $p, effect: qp, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function mD(M) {
  return M.split("-")[1];
}
var MQ = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function gQ(M) {
  var I = M.x, g = M.y, A = window, t = A.devicePixelRatio || 1;
  return { x: dD(I * t) / t || 0, y: dD(g * t) / t || 0 };
}
function Io(M) {
  var I, g = M.popper, A = M.popperRect, t = M.placement, D = M.variation, e = M.offsets, i = M.position, N = M.gpuAcceleration, C = M.adaptive, u = M.roundOffsets, j = M.isFixed, n = e.x, L = n === void 0 ? 0 : n, o = e.y, T = o === void 0 ? 0 : o, s = typeof u == "function" ? u({ x: L, y: T }) : { x: L, y: T };
  L = s.x, T = s.y;
  var S = e.hasOwnProperty("x"), y = e.hasOwnProperty("y"), x = JM, a = UM, z = window;
  if (C) {
    var c = Di(g), E = "clientHeight", m = "clientWidth";
    if (c === bg(g) && (c = BA(g), tA(c).position !== "static" && i === "absolute" && (E = "scrollHeight", m = "scrollWidth")), c = c, t === UM || (t === JM || t === ng) && D === Qe) {
      a = jg;
      var p = j && c === z && z.visualViewport ? z.visualViewport.height : c[E];
      T -= p - A.height, T *= N ? 1 : -1;
    }
    if (t === JM || (t === UM || t === jg) && D === Qe) {
      x = ng;
      var V = j && c === z && z.visualViewport ? z.visualViewport.width : c[m];
      L -= V - A.width, L *= N ? 1 : -1;
    }
  }
  var U = Object.assign({ position: i }, C && MQ), gI = u === !0 ? gQ({ x: L, y: T }) : { x: L, y: T };
  if (L = gI.x, T = gI.y, N) {
    var R;
    return Object.assign({}, U, (R = {}, R[a] = y ? "0" : "", R[x] = S ? "0" : "", R.transform = (z.devicePixelRatio || 1) <= 1 ? "translate(" + L + "px, " + T + "px)" : "translate3d(" + L + "px, " + T + "px, 0)", R));
  }
  return Object.assign({}, U, (I = {}, I[a] = y ? T + "px" : "", I[x] = S ? L + "px" : "", I.transform = "", I));
}
function AQ(M) {
  var I = M.state, g = M.options, A = g.gpuAcceleration, t = A === void 0 ? !0 : A, D = g.adaptive, e = D === void 0 ? !0 : D, i = g.roundOffsets, N = i === void 0 ? !0 : i, C = { placement: Ug(I.placement), variation: mD(I.placement), popper: I.elements.popper, popperRect: I.rects.popper, gpuAcceleration: t, isFixed: I.options.strategy === "fixed" };
  I.modifiersData.popperOffsets != null && (I.styles.popper = Object.assign({}, I.styles.popper, Io(Object.assign({}, C, { offsets: I.modifiersData.popperOffsets, position: I.options.strategy, adaptive: e, roundOffsets: N })))), I.modifiersData.arrow != null && (I.styles.arrow = Object.assign({}, I.styles.arrow, Io(Object.assign({}, C, { offsets: I.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: N })))), I.attributes.popper = Object.assign({}, I.attributes.popper, { "data-popper-placement": I.placement });
}
var bS = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: AQ, data: {} }, ai = { passive: !0 };
function tQ(M) {
  var I = M.state, g = M.instance, A = M.options, t = A.scroll, D = t === void 0 ? !0 : t, e = A.resize, i = e === void 0 ? !0 : e, N = bg(I.elements.popper), C = [].concat(I.scrollParents.reference, I.scrollParents.popper);
  return D && C.forEach(function(u) {
    u.addEventListener("scroll", g.update, ai);
  }), i && N.addEventListener("resize", g.update, ai), function() {
    D && C.forEach(function(u) {
      u.removeEventListener("scroll", g.update, ai);
    }), i && N.removeEventListener("resize", g.update, ai);
  };
}
var YS = { name: "eventListeners", enabled: !0, phase: "write", fn: function() {
}, effect: tQ, data: {} }, DQ = { left: "right", right: "left", bottom: "top", top: "bottom" };
function fi(M) {
  return M.replace(/left|right|bottom|top/g, function(I) {
    return DQ[I];
  });
}
var eQ = { start: "end", end: "start" };
function Mo(M) {
  return M.replace(/start|end/g, function(I) {
    return eQ[I];
  });
}
function Lj(M) {
  var I = bg(M), g = I.pageXOffset, A = I.pageYOffset;
  return { scrollLeft: g, scrollTop: A };
}
function oj(M) {
  return zD(BA(M)).left + Lj(M).scrollLeft;
}
function iQ(M) {
  var I = bg(M), g = BA(M), A = I.visualViewport, t = g.clientWidth, D = g.clientHeight, e = 0, i = 0;
  return A && (t = A.width, D = A.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (e = A.offsetLeft, i = A.offsetTop)), { width: t, height: D, x: e + oj(M), y: i };
}
function NQ(M) {
  var I, g = BA(M), A = Lj(M), t = (I = M.ownerDocument) == null ? void 0 : I.body, D = nt(g.scrollWidth, g.clientWidth, t ? t.scrollWidth : 0, t ? t.clientWidth : 0), e = nt(g.scrollHeight, g.clientHeight, t ? t.scrollHeight : 0, t ? t.clientHeight : 0), i = -A.scrollLeft + oj(M), N = -A.scrollTop;
  return tA(t || g).direction === "rtl" && (i += nt(g.clientWidth, t ? t.clientWidth : 0) - D), { width: D, height: e, x: i, y: N };
}
function Tj(M) {
  var I = tA(M), g = I.overflow, A = I.overflowX, t = I.overflowY;
  return /auto|scroll|overlay|hidden/.test(g + t + A);
}
function pS(M) {
  return ["html", "body", "#document"].indexOf(Hg(M)) >= 0 ? M.ownerDocument.body : Ng(M) && Tj(M) ? M : pS(uC(M));
}
function se(M, I) {
  var g;
  I === void 0 && (I = []);
  var A = pS(M), t = A === ((g = M.ownerDocument) == null ? void 0 : g.body), D = bg(A), e = t ? [D].concat(D.visualViewport || [], Tj(A) ? A : []) : A, i = I.concat(e);
  return t ? i : i.concat(se(uC(e)));
}
function J0(M) {
  return Object.assign({}, M, { left: M.x, top: M.y, right: M.x + M.width, bottom: M.y + M.height });
}
function CQ(M) {
  var I = zD(M);
  return I.top = I.top + M.clientTop, I.left = I.left + M.clientLeft, I.bottom = I.top + M.clientHeight, I.right = I.left + M.clientWidth, I.width = M.clientWidth, I.height = M.clientHeight, I.x = I.left, I.y = I.top, I;
}
function go(M, I) {
  return I === rS ? J0(iQ(M)) : ED(I) ? CQ(I) : J0(NQ(BA(M)));
}
function uQ(M) {
  var I = se(uC(M)), g = ["absolute", "fixed"].indexOf(tA(M).position) >= 0, A = g && Ng(M) ? Di(M) : M;
  return ED(A) ? I.filter(function(t) {
    return ED(t) && ES(t, A) && Hg(t) !== "body";
  }) : [];
}
function jQ(M, I, g) {
  var A = I === "clippingParents" ? uQ(M) : [].concat(I), t = [].concat(A, [g]), D = t[0], e = t.reduce(function(i, N) {
    var C = go(M, N);
    return i.top = nt(C.top, i.top), i.right = pN(C.right, i.right), i.bottom = pN(C.bottom, i.bottom), i.left = nt(C.left, i.left), i;
  }, go(M, D));
  return e.width = e.right - e.left, e.height = e.bottom - e.top, e.x = e.left, e.y = e.top, e;
}
function QS(M) {
  var I = M.reference, g = M.element, A = M.placement, t = A ? Ug(A) : null, D = A ? mD(A) : null, e = I.x + I.width / 2 - g.width / 2, i = I.y + I.height / 2 - g.height / 2, N;
  switch (t) {
    case UM:
      N = { x: e, y: I.y - g.height };
      break;
    case jg:
      N = { x: e, y: I.y + I.height };
      break;
    case ng:
      N = { x: I.x + I.width, y: i };
      break;
    case JM:
      N = { x: I.x - g.width, y: i };
      break;
    default:
      N = { x: I.x, y: I.y };
  }
  var C = t ? nj(t) : null;
  if (C != null) {
    var u = C === "y" ? "height" : "width";
    switch (D) {
      case wD:
        N[C] = N[C] - (I[u] / 2 - g[u] / 2);
        break;
      case Qe:
        N[C] = N[C] + (I[u] / 2 - g[u] / 2);
        break;
    }
  }
  return N;
}
function he(M, I) {
  I === void 0 && (I = {});
  var g = I, A = g.placement, t = A === void 0 ? M.placement : A, D = g.boundary, e = D === void 0 ? Op : D, i = g.rootBoundary, N = i === void 0 ? rS : i, C = g.elementContext, u = C === void 0 ? FD : C, j = g.altBoundary, n = j === void 0 ? !1 : j, L = g.padding, o = L === void 0 ? 0 : L, T = zS(typeof o != "number" ? o : mS(o, ti)), s = u === FD ? kp : FD, S = M.rects.popper, y = M.elements[n ? s : u], x = jQ(ED(y) ? y : y.contextElement || BA(M.elements.popper), e, N), a = zD(M.elements.reference), z = QS({ reference: a, element: S, strategy: "absolute", placement: t }), c = J0(Object.assign({}, S, z)), E = u === FD ? c : a, m = { top: x.top - E.top + T.top, bottom: E.bottom - x.bottom + T.bottom, left: x.left - E.left + T.left, right: E.right - x.right + T.right }, p = M.modifiersData.offset;
  if (u === FD && p) {
    var V = p[t];
    Object.keys(m).forEach(function(U) {
      var gI = [ng, jg].indexOf(U) >= 0 ? 1 : -1, R = [UM, jg].indexOf(U) >= 0 ? "y" : "x";
      m[U] += V[R] * gI;
    });
  }
  return m;
}
function nQ(M, I) {
  I === void 0 && (I = {});
  var g = I, A = g.placement, t = g.boundary, D = g.rootBoundary, e = g.padding, i = g.flipVariations, N = g.allowedAutoPlacements, C = N === void 0 ? Cj : N, u = mD(A), j = u ? i ? $L : $L.filter(function(o) {
    return mD(o) === u;
  }) : ti, n = j.filter(function(o) {
    return C.indexOf(o) >= 0;
  });
  n.length === 0 && (n = j);
  var L = n.reduce(function(o, T) {
    return o[T] = he(M, { placement: T, boundary: t, rootBoundary: D, padding: e })[Ug(T)], o;
  }, {});
  return Object.keys(L).sort(function(o, T) {
    return L[o] - L[T];
  });
}
function LQ(M) {
  if (Ug(M) === Nj)
    return [];
  var I = fi(M);
  return [Mo(M), I, Mo(I)];
}
function oQ(M) {
  var I = M.state, g = M.options, A = M.name;
  if (!I.modifiersData[A]._skip) {
    for (var t = g.mainAxis, D = t === void 0 ? !0 : t, e = g.altAxis, i = e === void 0 ? !0 : e, N = g.fallbackPlacements, C = g.padding, u = g.boundary, j = g.rootBoundary, n = g.altBoundary, L = g.flipVariations, o = L === void 0 ? !0 : L, T = g.allowedAutoPlacements, s = I.options.placement, S = Ug(s), y = S === s, x = N || (y || !o ? [fi(s)] : LQ(s)), a = [s].concat(x).reduce(function(jI, sI) {
      return jI.concat(Ug(sI) === Nj ? nQ(I, { placement: sI, boundary: u, rootBoundary: j, padding: C, flipVariations: o, allowedAutoPlacements: T }) : sI);
    }, []), z = I.rects.reference, c = I.rects.popper, E = /* @__PURE__ */ new Map(), m = !0, p = a[0], V = 0; V < a.length; V++) {
      var U = a[V], gI = Ug(U), R = mD(U) === wD, H = [UM, jg].indexOf(gI) >= 0, W = H ? "width" : "height", l = he(I, { placement: U, boundary: u, rootBoundary: j, altBoundary: n, padding: C }), w = H ? R ? ng : JM : R ? jg : UM;
      z[W] > c[W] && (w = fi(w));
      var Q = fi(w), k = [];
      if (D && k.push(l[gI] <= 0), i && k.push(l[w] <= 0, l[Q] <= 0), k.every(function(jI) {
        return jI;
      })) {
        p = U, m = !1;
        break;
      }
      E.set(U, k);
    }
    if (m)
      for (var B = o ? 3 : 1, iI = function(jI) {
        var sI = a.find(function(PI) {
          var KI = E.get(PI);
          if (KI)
            return KI.slice(0, jI).every(function(UI) {
              return UI;
            });
        });
        if (sI)
          return p = sI, "break";
      }, aI = B; aI > 0; aI--) {
        var kI = iI(aI);
        if (kI === "break")
          break;
      }
    I.placement !== p && (I.modifiersData[A]._skip = !0, I.placement = p, I.reset = !0);
  }
}
var TQ = { name: "flip", enabled: !0, phase: "main", fn: oQ, requiresIfExists: ["offset"], data: { _skip: !1 } };
function Ao(M, I, g) {
  return g === void 0 && (g = { x: 0, y: 0 }), { top: M.top - I.height - g.y, right: M.right - I.width + g.x, bottom: M.bottom - I.height + g.y, left: M.left - I.width - g.x };
}
function to(M) {
  return [UM, ng, jg, JM].some(function(I) {
    return M[I] >= 0;
  });
}
function sQ(M) {
  var I = M.state, g = M.name, A = I.rects.reference, t = I.rects.popper, D = I.modifiersData.preventOverflow, e = he(I, { elementContext: "reference" }), i = he(I, { altBoundary: !0 }), N = Ao(e, A), C = Ao(i, t, D), u = to(N), j = to(C);
  I.modifiersData[g] = { referenceClippingOffsets: N, popperEscapeOffsets: C, isReferenceHidden: u, hasPopperEscaped: j }, I.attributes.popper = Object.assign({}, I.attributes.popper, { "data-popper-reference-hidden": u, "data-popper-escaped": j });
}
var SQ = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: sQ };
function aQ(M, I, g) {
  var A = Ug(M), t = [JM, UM].indexOf(A) >= 0 ? -1 : 1, D = typeof g == "function" ? g(Object.assign({}, I, { placement: M })) : g, e = D[0], i = D[1];
  return e = e || 0, i = (i || 0) * t, [JM, ng].indexOf(A) >= 0 ? { x: i, y: e } : { x: e, y: i };
}
function lQ(M) {
  var I = M.state, g = M.options, A = M.name, t = g.offset, D = t === void 0 ? [0, 0] : t, e = Cj.reduce(function(u, j) {
    return u[j] = aQ(j, I.rects, D), u;
  }, {}), i = e[I.placement], N = i.x, C = i.y;
  I.modifiersData.popperOffsets != null && (I.modifiersData.popperOffsets.x += N, I.modifiersData.popperOffsets.y += C), I.modifiersData[A] = e;
}
var yQ = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: lQ };
function cQ(M) {
  var I = M.state, g = M.name;
  I.modifiersData[g] = QS({ reference: I.rects.reference, element: I.rects.popper, strategy: "absolute", placement: I.placement });
}
var hS = { name: "popperOffsets", enabled: !0, phase: "read", fn: cQ, data: {} };
function xQ(M) {
  return M === "x" ? "y" : "x";
}
function rQ(M) {
  var I = M.state, g = M.options, A = M.name, t = g.mainAxis, D = t === void 0 ? !0 : t, e = g.altAxis, i = e === void 0 ? !1 : e, N = g.boundary, C = g.rootBoundary, u = g.altBoundary, j = g.padding, n = g.tether, L = n === void 0 ? !0 : n, o = g.tetherOffset, T = o === void 0 ? 0 : o, s = he(I, { boundary: N, rootBoundary: C, padding: j, altBoundary: u }), S = Ug(I.placement), y = mD(I.placement), x = !y, a = nj(S), z = xQ(a), c = I.modifiersData.popperOffsets, E = I.rects.reference, m = I.rects.popper, p = typeof T == "function" ? T(Object.assign({}, I.rects, { placement: I.placement })) : T, V = typeof p == "number" ? { mainAxis: p, altAxis: p } : Object.assign({ mainAxis: 0, altAxis: 0 }, p), U = I.modifiersData.offset ? I.modifiersData.offset[I.placement] : null, gI = { x: 0, y: 0 };
  if (c) {
    if (D) {
      var R, H = a === "y" ? UM : JM, W = a === "y" ? jg : ng, l = a === "y" ? "height" : "width", w = c[a], Q = w + s[H], k = w - s[W], B = L ? -m[l] / 2 : 0, iI = y === wD ? E[l] : m[l], aI = y === wD ? -m[l] : -E[l], kI = I.elements.arrow, jI = L && kI ? jj(kI) : { width: 0, height: 0 }, sI = I.modifiersData["arrow#persistent"] ? I.modifiersData["arrow#persistent"].padding : dS(), PI = sI[H], KI = sI[W], UI = Te(0, E[l], jI[l]), rM = x ? E[l] / 2 - B - UI - PI - V.mainAxis : iI - UI - PI - V.mainAxis, sM = x ? -E[l] / 2 + B + UI + KI + V.mainAxis : aI + UI + KI + V.mainAxis, SM = I.elements.arrow && Di(I.elements.arrow), DM = SM ? a === "y" ? SM.clientTop || 0 : SM.clientLeft || 0 : 0, aM = (R = U == null ? void 0 : U[a]) != null ? R : 0, fI = w + rM - aM - DM, HM = w + sM - aM, NM = Te(L ? pN(Q, fI) : Q, w, L ? nt(k, HM) : k);
      c[a] = NM, gI[a] = NM - w;
    }
    if (i) {
      var Z, bM = a === "x" ? UM : JM, oI = a === "x" ? jg : ng, q = c[z], GI = z === "y" ? "height" : "width", WI = q + s[bM], _I = q - s[oI], P = [UM, JM].indexOf(S) !== -1, d = (Z = U == null ? void 0 : U[z]) != null ? Z : 0, b = P ? WI : q - E[GI] - m[GI] - d + V.altAxis, v = P ? q + E[GI] + m[GI] - d - V.altAxis : _I, II = L && P ? Kp(b, q, v) : Te(L ? b : WI, q, L ? v : _I);
      c[z] = II, gI[z] = II - q;
    }
    I.modifiersData[A] = gI;
  }
}
var wQ = { name: "preventOverflow", enabled: !0, phase: "main", fn: rQ, requiresIfExists: ["offset"] };
function EQ(M) {
  return { scrollLeft: M.scrollLeft, scrollTop: M.scrollTop };
}
function dQ(M) {
  return M === bg(M) || !Ng(M) ? Lj(M) : EQ(M);
}
function zQ(M) {
  var I = M.getBoundingClientRect(), g = dD(I.width) / M.offsetWidth || 1, A = dD(I.height) / M.offsetHeight || 1;
  return g !== 1 || A !== 1;
}
function mQ(M, I, g) {
  g === void 0 && (g = !1);
  var A = Ng(I), t = Ng(I) && zQ(I), D = BA(I), e = zD(M, t), i = { scrollLeft: 0, scrollTop: 0 }, N = { x: 0, y: 0 };
  return (A || !A && !g) && ((Hg(I) !== "body" || Tj(D)) && (i = dQ(I)), Ng(I) ? (N = zD(I, !0), N.x += I.clientLeft, N.y += I.clientTop) : D && (N.x = oj(D))), { x: e.left + i.scrollLeft - N.x, y: e.top + i.scrollTop - N.y, width: e.width, height: e.height };
}
function bQ(M) {
  var I = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set(), A = [];
  M.forEach(function(D) {
    I.set(D.name, D);
  });
  function t(D) {
    g.add(D.name);
    var e = [].concat(D.requires || [], D.requiresIfExists || []);
    e.forEach(function(i) {
      if (!g.has(i)) {
        var N = I.get(i);
        N && t(N);
      }
    }), A.push(D);
  }
  return M.forEach(function(D) {
    g.has(D.name) || t(D);
  }), A;
}
function YQ(M) {
  var I = bQ(M);
  return Rp.reduce(function(g, A) {
    return g.concat(I.filter(function(t) {
      return t.phase === A;
    }));
  }, []);
}
function pQ(M) {
  var I;
  return function() {
    return I || (I = new Promise(function(g) {
      Promise.resolve().then(function() {
        I = void 0, g(M());
      });
    })), I;
  };
}
function QQ(M) {
  var I = M.reduce(function(g, A) {
    var t = g[A.name];
    return g[A.name] = t ? Object.assign({}, t, A, { options: Object.assign({}, t.options, A.options), data: Object.assign({}, t.data, A.data) }) : A, g;
  }, {});
  return Object.keys(I).map(function(g) {
    return I[g];
  });
}
var Do = { placement: "bottom", modifiers: [], strategy: "absolute" };
function eo() {
  for (var M = arguments.length, I = new Array(M), g = 0; g < M; g++)
    I[g] = arguments[g];
  return !I.some(function(A) {
    return !(A && typeof A.getBoundingClientRect == "function");
  });
}
function sj(M) {
  M === void 0 && (M = {});
  var I = M, g = I.defaultModifiers, A = g === void 0 ? [] : g, t = I.defaultOptions, D = t === void 0 ? Do : t;
  return function(e, i, N) {
    N === void 0 && (N = D);
    var C = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Do, D), modifiersData: {}, elements: { reference: e, popper: i }, attributes: {}, styles: {} }, u = [], j = !1, n = { state: C, setOptions: function(T) {
      var s = typeof T == "function" ? T(C.options) : T;
      o(), C.options = Object.assign({}, D, C.options, s), C.scrollParents = { reference: ED(e) ? se(e) : e.contextElement ? se(e.contextElement) : [], popper: se(i) };
      var S = YQ(QQ([].concat(A, C.options.modifiers)));
      return C.orderedModifiers = S.filter(function(y) {
        return y.enabled;
      }), L(), n.update();
    }, forceUpdate: function() {
      if (!j) {
        var T = C.elements, s = T.reference, S = T.popper;
        if (eo(s, S)) {
          C.rects = { reference: mQ(s, Di(S), C.options.strategy === "fixed"), popper: jj(S) }, C.reset = !1, C.placement = C.options.placement, C.orderedModifiers.forEach(function(m) {
            return C.modifiersData[m.name] = Object.assign({}, m.data);
          });
          for (var y = 0; y < C.orderedModifiers.length; y++) {
            if (C.reset === !0) {
              C.reset = !1, y = -1;
              continue;
            }
            var x = C.orderedModifiers[y], a = x.fn, z = x.options, c = z === void 0 ? {} : z, E = x.name;
            typeof a == "function" && (C = a({ state: C, options: c, name: E, instance: n }) || C);
          }
        }
      }
    }, update: pQ(function() {
      return new Promise(function(T) {
        n.forceUpdate(), T(C);
      });
    }), destroy: function() {
      o(), j = !0;
    } };
    if (!eo(e, i))
      return n;
    n.setOptions(N).then(function(T) {
      !j && N.onFirstUpdate && N.onFirstUpdate(T);
    });
    function L() {
      C.orderedModifiers.forEach(function(T) {
        var s = T.name, S = T.options, y = S === void 0 ? {} : S, x = T.effect;
        if (typeof x == "function") {
          var a = x({ state: C, name: s, instance: n, options: y }), z = function() {
          };
          u.push(a || z);
        }
      });
    }
    function o() {
      u.forEach(function(T) {
        return T();
      }), u = [];
    }
    return n;
  };
}
sj();
var hQ = [YS, hS, bS, wS];
sj({ defaultModifiers: hQ });
var OQ = [YS, hS, bS, wS, yQ, TQ, wQ, IQ, SQ], kQ = sj({ defaultModifiers: OQ });
const OS = (M) => {
  const I = [], g = document.createTreeWalker(M, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (A) => {
      const t = A.tagName === "INPUT" && A.type === "hidden";
      return A.disabled || A.hidden || t ? NodeFilter.FILTER_SKIP : A.tabIndex >= 0 || A === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; g.nextNode(); )
    I.push(g.currentNode);
  return I;
}, io = (M, I) => {
  for (const g of M)
    if (!PQ(g, I))
      return g;
}, PQ = (M, I) => {
  if (process.env.NODE_ENV === "test")
    return !1;
  if (getComputedStyle(M).visibility === "hidden")
    return !0;
  for (; M; ) {
    if (I && M === I)
      return !1;
    if (getComputedStyle(M).display === "none")
      return !0;
    M = M.parentElement;
  }
  return !1;
}, fQ = (M) => {
  const I = OS(M), g = io(I, M), A = io(I.reverse(), M);
  return [g, A];
}, GQ = (M) => M instanceof HTMLInputElement && "select" in M, oA = (M, I) => {
  if (M && M.focus) {
    const g = document.activeElement;
    M.focus({ preventScroll: !0 }), M !== g && GQ(M) && I && M.select();
  }
};
function No(M, I) {
  const g = [...M], A = M.indexOf(I);
  return A !== -1 && g.splice(A, 1), g;
}
const WQ = () => {
  let M = [];
  return {
    push: (A) => {
      const t = M[0];
      t && A !== t && t.pause(), M = No(M, A), M.unshift(A);
    },
    remove: (A) => {
      var t, D;
      M = No(M, A), (D = (t = M[0]) == null ? void 0 : t.resume) == null || D.call(t);
    }
  };
}, ZQ = (M, I = !1) => {
  const g = document.activeElement;
  for (const A of M)
    if (oA(A, I), document.activeElement !== g)
      return;
}, Co = WQ(), I0 = "focus-trap.focus-after-trapped", M0 = "focus-trap.focus-after-released", uo = {
  cancelable: !0,
  bubbles: !1
}, jo = "focusAfterTrapped", no = "focusAfterReleased", kS = Symbol("elFocusTrap"), vQ = eI({
  name: "ElFocusTrap",
  inheritAttrs: !1,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    jo,
    no,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(M, { emit: I }) {
    const g = h();
    let A, t;
    vY((L) => {
      M.trapped && !D.paused && I("release-requested", L);
    });
    const D = {
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }, e = (L) => {
      if (!M.loop && !M.trapped || D.paused)
        return;
      const { key: o, altKey: T, ctrlKey: s, metaKey: S, currentTarget: y, shiftKey: x } = L, { loop: a } = M, z = o === ZI.tab && !T && !s && !S, c = document.activeElement;
      if (z && c) {
        const E = y, [m, p] = fQ(E);
        m && p ? !x && c === p ? (L.preventDefault(), a && oA(m, !0), I("focusout-prevented")) : x && [m, E].includes(c) && (L.preventDefault(), a && oA(p, !0), I("focusout-prevented")) : c === E && (L.preventDefault(), I("focusout-prevented"));
      }
    };
    LM(kS, {
      focusTrapRef: g,
      onKeydown: e
    }), SI(() => M.focusTrapEl, (L) => {
      L && (g.value = L);
    }, { immediate: !0 }), SI([g], ([L], [o]) => {
      L && (L.addEventListener("keydown", e), L.addEventListener("focusin", C), L.addEventListener("focusout", u)), o && (o.removeEventListener("keydown", e), o.removeEventListener("focusin", C), o.removeEventListener("focusout", u));
    });
    const i = (L) => {
      I(jo, L);
    }, N = (L) => I(no, L), C = (L) => {
      const o = r(g);
      if (!o)
        return;
      const T = L.target, s = T && o.contains(T);
      s && I("focusin", L), !D.paused && M.trapped && (s ? t = T : oA(t, !0));
    }, u = (L) => {
      const o = r(g);
      if (!(D.paused || !o))
        if (M.trapped) {
          const T = L.relatedTarget;
          !iC(T) && !o.contains(T) && setTimeout(() => {
            !D.paused && M.trapped && oA(t, !0);
          }, 0);
        } else {
          const T = L.target;
          T && o.contains(T) || I("focusout", L);
        }
    };
    async function j() {
      await VI();
      const L = r(g);
      if (L) {
        Co.push(D);
        const o = document.activeElement;
        if (A = o, !L.contains(o)) {
          const s = new Event(I0, uo);
          L.addEventListener(I0, i), L.dispatchEvent(s), s.defaultPrevented || VI(() => {
            let S = M.focusStartEl;
            jt(S) || (oA(S), document.activeElement !== S && (S = "first")), S === "first" && ZQ(OS(L), !0), (document.activeElement === o || S === "container") && oA(L);
          });
        }
      }
    }
    function n() {
      const L = r(g);
      if (L) {
        L.removeEventListener(I0, i);
        const o = new Event(M0, uo);
        L.addEventListener(M0, N), L.dispatchEvent(o), o.defaultPrevented || oA(A != null ? A : document.body, !0), L.removeEventListener(M0, i), Co.remove(D);
      }
    }
    return RI(() => {
      M.trapped && j(), SI(() => M.trapped, (L) => {
        L ? j() : n();
      });
    }), kM(() => {
      M.trapped && n();
    }), {
      onKeydown: e
    };
  }
});
function UQ(M, I, g, A, t, D) {
  return dI(M.$slots, "default", { handleKeydown: M.onKeydown });
}
var PS = /* @__PURE__ */ bI(vQ, [["render", UQ], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
const JQ = ["fixed", "absolute"], BQ = gM({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: mI(Array),
    default: void 0
  },
  gpuAcceleration: {
    type: Boolean,
    default: !0
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: Cj,
    default: "bottom"
  },
  popperOptions: {
    type: mI(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: JQ,
    default: "absolute"
  }
}), fS = gM({
  ...BQ,
  id: String,
  style: { type: mI([String, Array, Object]) },
  className: { type: mI([String, Array, Object]) },
  effect: {
    type: String,
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: !0
  },
  pure: Boolean,
  focusOnShow: {
    type: Boolean,
    default: !1
  },
  trapping: {
    type: Boolean,
    default: !1
  },
  popperClass: {
    type: mI([String, Array, Object])
  },
  popperStyle: {
    type: mI([String, Array, Object])
  },
  referenceEl: {
    type: mI(Object)
  },
  triggerTargetEl: {
    type: mI(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: !0
  },
  ariaLabel: {
    type: String,
    default: void 0
  },
  virtualTriggering: Boolean,
  zIndex: Number
}), RQ = [
  "mouseenter",
  "mouseleave",
  "focus",
  "blur",
  "close"
], Lo = (M, I) => {
  const { placement: g, strategy: A, popperOptions: t } = M, D = {
    placement: g,
    strategy: A,
    ...t,
    modifiers: VQ(M)
  };
  return FQ(D, I), XQ(D, t == null ? void 0 : t.modifiers), D;
}, HQ = (M) => {
  if (!!jM)
    return dA(M);
};
function VQ(M) {
  const { offset: I, gpuAcceleration: g, fallbackPlacements: A } = M;
  return [
    {
      name: "offset",
      options: {
        offset: [0, I != null ? I : 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements: A
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration: g,
        adaptive: g
      }
    }
  ];
}
function FQ(M, { arrowEl: I, arrowOffset: g }) {
  M.modifiers.push({
    name: "arrow",
    options: {
      element: I,
      padding: g != null ? g : 5
    }
  });
}
function XQ(M, I) {
  I && (M.modifiers = [...M.modifiers, ...I != null ? I : []]);
}
const KQ = {
  name: "ElPopperContent"
}, _Q = /* @__PURE__ */ eI({
  ...KQ,
  props: fS,
  emits: RQ,
  setup(M, { expose: I, emit: g }) {
    const A = M, { popperInstanceRef: t, contentRef: D, triggerRef: e, role: i } = yI(gj, void 0), N = yI(YN, void 0), { nextZIndex: C } = SS(), u = vI("popper"), j = h(), n = h("first"), L = h(), o = h();
    LM(eS, {
      arrowRef: L,
      arrowOffset: o
    }), N && (N.addInputId || N.removeInputId) && LM(YN, {
      ...N,
      addInputId: AA,
      removeInputId: AA
    });
    const T = h(A.zIndex || C()), s = h(!1);
    let S;
    const y = J(() => HQ(A.referenceEl) || r(e)), x = J(() => [{ zIndex: r(T) }, A.popperStyle]), a = J(() => [
      u.b(),
      u.is("pure", A.pure),
      u.is(A.effect),
      A.popperClass
    ]), z = J(() => i && i.value === "dialog" ? "false" : void 0), c = ({ referenceEl: H, popperContentEl: W, arrowEl: l }) => {
      const w = Lo(A, {
        arrowEl: l,
        arrowOffset: r(o)
      });
      return kQ(H, W, w);
    }, E = (H = !0) => {
      var W;
      (W = r(t)) == null || W.update(), H && (T.value = A.zIndex || C());
    }, m = () => {
      var H, W;
      const l = { name: "eventListeners", enabled: A.visible };
      (W = (H = r(t)) == null ? void 0 : H.setOptions) == null || W.call(H, (w) => ({
        ...w,
        modifiers: [...w.modifiers || [], l]
      })), E(!1), A.visible && A.focusOnShow ? s.value = !0 : A.visible === !1 && (s.value = !1);
    }, p = () => {
      g("focus");
    }, V = () => {
      n.value = "first", g("blur");
    }, U = (H) => {
      var W;
      A.visible && !s.value && (H.target && (n.value = H.target), s.value = !0, H.relatedTarget && ((W = H.relatedTarget) == null || W.focus()));
    }, gI = () => {
      A.trapping || (s.value = !1);
    }, R = () => {
      s.value = !1, g("close");
    };
    return RI(() => {
      let H;
      SI(y, (W) => {
        var l;
        H == null || H();
        const w = r(t);
        if ((l = w == null ? void 0 : w.destroy) == null || l.call(w), W) {
          const Q = r(j);
          D.value = Q, t.value = c({
            referenceEl: W,
            popperContentEl: Q,
            arrowEl: r(L)
          }), H = SI(() => W.getBoundingClientRect(), () => E(), {
            immediate: !0
          });
        } else
          t.value = void 0;
      }, {
        immediate: !0
      }), SI(() => A.triggerTargetEl, (W, l) => {
        S == null || S(), S = void 0;
        const w = r(W || j.value), Q = r(l || j.value);
        if (Ye(w)) {
          const { ariaLabel: k, id: B } = bT(A);
          S = SI([i, k, z, B], (iI) => {
            ["role", "aria-label", "aria-modal", "id"].forEach((aI, kI) => {
              iC(iI[kI]) ? w.removeAttribute(aI) : w.setAttribute(aI, iI[kI]);
            });
          }, { immediate: !0 });
        }
        Q !== w && Ye(Q) && ["role", "aria-label", "aria-modal", "id"].forEach((k) => {
          Q.removeAttribute(k);
        });
      }, { immediate: !0 }), SI(() => A.visible, m, { immediate: !0 }), SI(() => Lo(A, {
        arrowEl: r(L),
        arrowOffset: r(o)
      }), (W) => {
        var l;
        return (l = t.value) == null ? void 0 : l.setOptions(W);
      });
    }), kM(() => {
      S == null || S(), S = void 0;
    }), I({
      popperContentRef: j,
      popperInstanceRef: t,
      updatePopper: E,
      contentStyle: x
    }), (H, W) => (Y(), $("div", {
      ref_key: "popperContentRef",
      ref: j,
      style: BI(r(x)),
      class: _(r(a)),
      tabindex: "-1",
      onMouseenter: W[0] || (W[0] = (l) => H.$emit("mouseenter", l)),
      onMouseleave: W[1] || (W[1] = (l) => H.$emit("mouseleave", l))
    }, [
      MI(r(PS), {
        trapped: s.value,
        "trap-on-focus-in": !0,
        "focus-trap-el": j.value,
        "focus-start-el": n.value,
        onFocusAfterTrapped: p,
        onFocusAfterReleased: V,
        onFocusin: U,
        onFocusoutPrevented: gI,
        onReleaseRequested: R
      }, {
        default: F(() => [
          dI(H.$slots, "default")
        ]),
        _: 3
      }, 8, ["trapped", "focus-trap-el", "focus-start-el"])
    ], 38));
  }
});
var $Q = /* @__PURE__ */ bI(_Q, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
const qQ = JA(zp), I1 = vI("tooltip"), lg = gM({
  ...RY,
  ...fS,
  appendTo: {
    type: mI([String, Object]),
    default: TS
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: {
    type: Boolean,
    default: !1
  },
  persistent: Boolean,
  ariaLabel: String,
  visible: {
    type: mI(Boolean),
    default: null
  },
  transition: {
    type: String,
    default: `${I1.namespace.value}-fade-in-linear`
  },
  teleported: {
    type: Boolean,
    default: !0
  },
  disabled: {
    type: Boolean
  }
}), Oe = gM({
  ...xS,
  disabled: Boolean,
  trigger: {
    type: mI([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: mI(Array),
    default: () => [ZI.enter, ZI.space]
  }
}), M1 = gM({
  openDelay: {
    type: Number
  },
  visibleArrow: {
    type: Boolean,
    default: void 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  showArrow: {
    type: Boolean,
    default: !0
  }
}), Sj = Symbol("elTooltip"), g1 = eI({
  name: "ElTooltipContent",
  components: {
    ElPopperContent: $Q
  },
  inheritAttrs: !1,
  props: lg,
  setup(M) {
    const I = h(null), g = h(!1), A = h(!1), t = h(!1), D = h(!1), {
      controlled: e,
      id: i,
      open: N,
      trigger: C,
      onClose: u,
      onOpen: j,
      onShow: n,
      onHide: L,
      onBeforeShow: o,
      onBeforeHide: T
    } = yI(Sj, void 0), s = J(() => process.env.NODE_ENV === "test" ? !0 : M.persistent);
    kM(() => {
      D.value = !0;
    });
    const S = J(() => r(s) ? !0 : r(N)), y = J(() => M.disabled ? !1 : r(N)), x = J(() => {
      var H;
      return (H = M.style) != null ? H : {};
    }), a = J(() => !r(N)), z = () => {
      L();
    }, c = () => {
      if (r(e))
        return !0;
    }, E = AM(c, () => {
      M.enterable && r(C) === "hover" && j();
    }), m = AM(c, () => {
      r(C) === "hover" && u();
    }), p = () => {
      var H, W;
      (W = (H = I.value) == null ? void 0 : H.updatePopper) == null || W.call(H), o == null || o();
    }, V = () => {
      T == null || T();
    }, U = () => {
      n(), R = bb(J(() => {
        var H;
        return (H = I.value) == null ? void 0 : H.popperContentRef;
      }), () => {
        if (r(e))
          return;
        r(C) !== "hover" && u();
      });
    }, gI = () => {
      M.virtualTriggering || u();
    };
    let R;
    return SI(() => r(N), (H) => {
      H || R == null || R();
    }, {
      flush: "post"
    }), {
      ariaHidden: a,
      entering: A,
      leaving: t,
      id: i,
      intermediateOpen: g,
      contentStyle: x,
      contentRef: I,
      destroyed: D,
      shouldRender: S,
      shouldShow: y,
      onClose: u,
      open: N,
      onAfterShow: U,
      onBeforeEnter: p,
      onBeforeLeave: V,
      onContentEnter: E,
      onContentLeave: m,
      onTransitionLeave: z,
      onBlur: gI
    };
  }
});
function A1(M, I, g, A, t, D) {
  const e = xI("el-popper-content");
  return Y(), DI(wT, {
    disabled: !M.teleported,
    to: M.appendTo
  }, [
    MI(uu, {
      name: M.transition,
      onAfterLeave: M.onTransitionLeave,
      onBeforeEnter: M.onBeforeEnter,
      onAfterEnter: M.onAfterShow,
      onBeforeLeave: M.onBeforeLeave
    }, {
      default: F(() => [
        M.shouldRender ? ig((Y(), DI(e, qM({
          key: 0,
          id: M.id,
          ref: "contentRef"
        }, M.$attrs, {
          "aria-label": M.ariaLabel,
          "aria-hidden": M.ariaHidden,
          "boundaries-padding": M.boundariesPadding,
          "fallback-placements": M.fallbackPlacements,
          "gpu-acceleration": M.gpuAcceleration,
          offset: M.offset,
          placement: M.placement,
          "popper-options": M.popperOptions,
          strategy: M.strategy,
          effect: M.effect,
          enterable: M.enterable,
          pure: M.pure,
          "popper-class": M.popperClass,
          "popper-style": [M.popperStyle, M.contentStyle],
          "reference-el": M.referenceEl,
          "trigger-target-el": M.triggerTargetEl,
          visible: M.shouldShow,
          "z-index": M.zIndex,
          onMouseenter: M.onContentEnter,
          onMouseleave: M.onContentLeave,
          onBlur: M.onBlur,
          onClose: M.onClose
        }), {
          default: F(() => [
            TI(" Workaround bug #6378 "),
            M.destroyed ? TI("v-if", !0) : dI(M.$slots, "default", { key: 0 })
          ]),
          _: 3
        }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onBlur", "onClose"])), [
          [Dt, M.shouldShow]
        ]) : TI("v-if", !0)
      ]),
      _: 3
    }, 8, ["name", "onAfterLeave", "onBeforeEnter", "onAfterEnter", "onBeforeLeave"])
  ], 8, ["disabled", "to"]);
}
var t1 = /* @__PURE__ */ bI(g1, [["render", A1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
const D1 = (M, I) => Js(M) ? M.includes(I) : M === I, Pt = (M, I, g) => (A) => {
  D1(r(M), I) && g(A);
}, e1 = eI({
  name: "ElTooltipTrigger",
  components: {
    ElPopperTrigger: hp
  },
  props: Oe,
  setup(M) {
    const I = vI("tooltip"), { controlled: g, id: A, open: t, onOpen: D, onClose: e, onToggle: i } = yI(Sj, void 0), N = h(null), C = () => {
      if (r(g) || M.disabled)
        return !0;
    }, u = GM(M, "trigger"), j = AM(C, Pt(u, "hover", D)), n = AM(C, Pt(u, "hover", e)), L = AM(C, Pt(u, "click", (y) => {
      y.button === 0 && i(y);
    })), o = AM(C, Pt(u, "focus", D)), T = AM(C, Pt(u, "focus", e)), s = AM(C, Pt(u, "contextmenu", (y) => {
      y.preventDefault(), i(y);
    })), S = AM(C, (y) => {
      const { code: x } = y;
      M.triggerKeys.includes(x) && (y.preventDefault(), i(y));
    });
    return {
      onBlur: T,
      onContextMenu: s,
      onFocus: o,
      onMouseenter: j,
      onMouseleave: n,
      onClick: L,
      onKeydown: S,
      open: t,
      id: A,
      triggerRef: N,
      ns: I
    };
  }
});
function i1(M, I, g, A, t, D) {
  const e = xI("el-popper-trigger");
  return Y(), DI(e, {
    id: M.id,
    "virtual-ref": M.virtualRef,
    open: M.open,
    "virtual-triggering": M.virtualTriggering,
    class: _(M.ns.e("trigger")),
    onBlur: M.onBlur,
    onClick: M.onClick,
    onContextmenu: M.onContextMenu,
    onFocus: M.onFocus,
    onMouseenter: M.onMouseenter,
    onMouseleave: M.onMouseleave,
    onKeydown: M.onKeydown
  }, {
    default: F(() => [
      dI(M.$slots, "default")
    ]),
    _: 3
  }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]);
}
var N1 = /* @__PURE__ */ bI(e1, [["render", i1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
const { useModelToggleProps: C1, useModelToggle: u1, useModelToggleEmits: j1 } = GY("visible"), n1 = eI({
  name: "ElTooltip",
  components: {
    ElPopper: qQ,
    ElPopperArrow: Yp,
    ElTooltipContent: t1,
    ElTooltipTrigger: N1
  },
  props: {
    ...aS,
    ...C1,
    ...lg,
    ...Oe,
    ...lS,
    ...M1
  },
  emits: [
    ...j1,
    "before-show",
    "before-hide",
    "show",
    "hide",
    "open",
    "close"
  ],
  setup(M, { emit: I }) {
    BY();
    const g = J(() => (bN(M.openDelay) || QM("ElTooltip", "open-delay is about to be deprecated in the next major version, please use `show-after` instead"), M.openDelay || M.showAfter)), A = J(() => (bN(M.visibleArrow) || QM("ElTooltip", "`visible-arrow` is about to be deprecated in the next major version, please use `show-arrow` instead"), mN(M.visibleArrow) ? M.visibleArrow : M.showArrow)), t = rD(), D = h(null), e = h(null), i = () => {
      var S;
      const y = r(D);
      y && ((S = y.popperInstanceRef) == null || S.update());
    }, N = h(!1), C = h(void 0), { show: u, hide: j, hasUpdateHandler: n } = u1({
      indicator: N,
      toggleReason: C
    }), { onOpen: L, onClose: o } = HY({
      showAfter: g,
      hideAfter: GM(M, "hideAfter"),
      open: u,
      close: j
    }), T = J(() => mN(M.visible) && !n.value);
    LM(Sj, {
      controlled: T,
      id: t,
      open: YT(N),
      trigger: GM(M, "trigger"),
      onOpen: (S) => {
        L(S);
      },
      onClose: (S) => {
        o(S);
      },
      onToggle: (S) => {
        r(N) ? o(S) : L(S);
      },
      onShow: () => {
        I("show", C.value);
      },
      onHide: () => {
        I("hide", C.value);
      },
      onBeforeShow: () => {
        I("before-show", C.value);
      },
      onBeforeHide: () => {
        I("before-hide", C.value);
      },
      updatePopper: i
    }), SI(() => M.disabled, (S) => {
      S && N.value && (N.value = !1);
    });
    const s = () => {
      var S, y;
      const x = (y = (S = e.value) == null ? void 0 : S.contentRef) == null ? void 0 : y.popperContentRef;
      return x && x.contains(document.activeElement);
    };
    return zl(() => N.value && j()), {
      compatShowAfter: g,
      compatShowArrow: A,
      popperRef: D,
      contentRef: e,
      open: N,
      hide: j,
      isFocusInsideContent: s,
      updatePopper: i,
      onOpen: L,
      onClose: o
    };
  }
}), L1 = ["innerHTML"], o1 = { key: 1 };
function T1(M, I, g, A, t, D) {
  const e = xI("el-tooltip-trigger"), i = xI("el-popper-arrow"), N = xI("el-tooltip-content"), C = xI("el-popper");
  return Y(), DI(C, {
    ref: "popperRef",
    role: M.role
  }, {
    default: F(() => [
      MI(e, {
        disabled: M.disabled,
        trigger: M.trigger,
        "trigger-keys": M.triggerKeys,
        "virtual-ref": M.virtualRef,
        "virtual-triggering": M.virtualTriggering
      }, {
        default: F(() => [
          M.$slots.default ? dI(M.$slots, "default", { key: 0 }) : TI("v-if", !0)
        ]),
        _: 3
      }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering"]),
      MI(N, {
        ref: "contentRef",
        "aria-label": M.ariaLabel,
        "boundaries-padding": M.boundariesPadding,
        content: M.content,
        disabled: M.disabled,
        effect: M.effect,
        enterable: M.enterable,
        "fallback-placements": M.fallbackPlacements,
        "hide-after": M.hideAfter,
        "gpu-acceleration": M.gpuAcceleration,
        offset: M.offset,
        persistent: M.persistent,
        "popper-class": M.popperClass,
        "popper-style": M.popperStyle,
        placement: M.placement,
        "popper-options": M.popperOptions,
        pure: M.pure,
        "raw-content": M.rawContent,
        "reference-el": M.referenceEl,
        "trigger-target-el": M.triggerTargetEl,
        "show-after": M.compatShowAfter,
        strategy: M.strategy,
        teleported: M.teleported,
        transition: M.transition,
        "virtual-triggering": M.virtualTriggering,
        "z-index": M.zIndex,
        "append-to": M.appendTo
      }, {
        default: F(() => [
          dI(M.$slots, "content", {}, () => [
            M.rawContent ? (Y(), $("span", {
              key: 0,
              innerHTML: M.content
            }, null, 8, L1)) : (Y(), $("span", o1, IM(M.content), 1))
          ]),
          M.compatShowArrow ? (Y(), DI(i, {
            key: 0,
            "arrow-offset": M.arrowOffset
          }, null, 8, ["arrow-offset"])) : TI("v-if", !0)
        ]),
        _: 3
      }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
    ]),
    _: 3
  }, 8, ["role"]);
}
var s1 = /* @__PURE__ */ bI(n1, [["render", T1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
const aj = JA(s1), S1 = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
], a1 = ["button", "submit", "reset"], B0 = gM({
  size: NS,
  disabled: Boolean,
  type: {
    type: String,
    values: S1,
    default: ""
  },
  icon: {
    type: pe
  },
  nativeType: {
    type: String,
    values: a1,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: pe,
    default: () => _s
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  }
}), l1 = {
  click: (M) => M instanceof MouseEvent
};
function xM(M, I) {
  y1(M) && (M = "100%");
  var g = c1(M);
  return M = I === 360 ? M : Math.min(I, Math.max(0, parseFloat(M))), g && (M = parseInt(String(M * I), 10) / 100), Math.abs(M - I) < 1e-6 ? 1 : (I === 360 ? M = (M < 0 ? M % I + I : M % I) / parseFloat(String(I)) : M = M % I / parseFloat(String(I)), M);
}
function li(M) {
  return Math.min(1, Math.max(0, M));
}
function y1(M) {
  return typeof M == "string" && M.indexOf(".") !== -1 && parseFloat(M) === 1;
}
function c1(M) {
  return typeof M == "string" && M.indexOf("%") !== -1;
}
function GS(M) {
  return M = parseFloat(M), (isNaN(M) || M < 0 || M > 1) && (M = 1), M;
}
function yi(M) {
  return M <= 1 ? "".concat(Number(M) * 100, "%") : M;
}
function gt(M) {
  return M.length === 1 ? "0" + M : String(M);
}
function x1(M, I, g) {
  return {
    r: xM(M, 255) * 255,
    g: xM(I, 255) * 255,
    b: xM(g, 255) * 255
  };
}
function oo(M, I, g) {
  M = xM(M, 255), I = xM(I, 255), g = xM(g, 255);
  var A = Math.max(M, I, g), t = Math.min(M, I, g), D = 0, e = 0, i = (A + t) / 2;
  if (A === t)
    e = 0, D = 0;
  else {
    var N = A - t;
    switch (e = i > 0.5 ? N / (2 - A - t) : N / (A + t), A) {
      case M:
        D = (I - g) / N + (I < g ? 6 : 0);
        break;
      case I:
        D = (g - M) / N + 2;
        break;
      case g:
        D = (M - I) / N + 4;
        break;
    }
    D /= 6;
  }
  return { h: D, s: e, l: i };
}
function g0(M, I, g) {
  return g < 0 && (g += 1), g > 1 && (g -= 1), g < 1 / 6 ? M + (I - M) * (6 * g) : g < 1 / 2 ? I : g < 2 / 3 ? M + (I - M) * (2 / 3 - g) * 6 : M;
}
function r1(M, I, g) {
  var A, t, D;
  if (M = xM(M, 360), I = xM(I, 100), g = xM(g, 100), I === 0)
    t = g, D = g, A = g;
  else {
    var e = g < 0.5 ? g * (1 + I) : g + I - g * I, i = 2 * g - e;
    A = g0(i, e, M + 1 / 3), t = g0(i, e, M), D = g0(i, e, M - 1 / 3);
  }
  return { r: A * 255, g: t * 255, b: D * 255 };
}
function To(M, I, g) {
  M = xM(M, 255), I = xM(I, 255), g = xM(g, 255);
  var A = Math.max(M, I, g), t = Math.min(M, I, g), D = 0, e = A, i = A - t, N = A === 0 ? 0 : i / A;
  if (A === t)
    D = 0;
  else {
    switch (A) {
      case M:
        D = (I - g) / i + (I < g ? 6 : 0);
        break;
      case I:
        D = (g - M) / i + 2;
        break;
      case g:
        D = (M - I) / i + 4;
        break;
    }
    D /= 6;
  }
  return { h: D, s: N, v: e };
}
function w1(M, I, g) {
  M = xM(M, 360) * 6, I = xM(I, 100), g = xM(g, 100);
  var A = Math.floor(M), t = M - A, D = g * (1 - I), e = g * (1 - t * I), i = g * (1 - (1 - t) * I), N = A % 6, C = [g, e, D, D, i, g][N], u = [i, g, g, e, D, D][N], j = [D, D, i, g, g, e][N];
  return { r: C * 255, g: u * 255, b: j * 255 };
}
function so(M, I, g, A) {
  var t = [
    gt(Math.round(M).toString(16)),
    gt(Math.round(I).toString(16)),
    gt(Math.round(g).toString(16))
  ];
  return A && t[0].startsWith(t[0].charAt(1)) && t[1].startsWith(t[1].charAt(1)) && t[2].startsWith(t[2].charAt(1)) ? t[0].charAt(0) + t[1].charAt(0) + t[2].charAt(0) : t.join("");
}
function E1(M, I, g, A, t) {
  var D = [
    gt(Math.round(M).toString(16)),
    gt(Math.round(I).toString(16)),
    gt(Math.round(g).toString(16)),
    gt(d1(A))
  ];
  return t && D[0].startsWith(D[0].charAt(1)) && D[1].startsWith(D[1].charAt(1)) && D[2].startsWith(D[2].charAt(1)) && D[3].startsWith(D[3].charAt(1)) ? D[0].charAt(0) + D[1].charAt(0) + D[2].charAt(0) + D[3].charAt(0) : D.join("");
}
function d1(M) {
  return Math.round(parseFloat(M) * 255).toString(16);
}
function So(M) {
  return VM(M) / 255;
}
function VM(M) {
  return parseInt(M, 16);
}
function z1(M) {
  return {
    r: M >> 16,
    g: (M & 65280) >> 8,
    b: M & 255
  };
}
var R0 = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function m1(M) {
  var I = { r: 0, g: 0, b: 0 }, g = 1, A = null, t = null, D = null, e = !1, i = !1;
  return typeof M == "string" && (M = p1(M)), typeof M == "object" && (Xg(M.r) && Xg(M.g) && Xg(M.b) ? (I = x1(M.r, M.g, M.b), e = !0, i = String(M.r).substr(-1) === "%" ? "prgb" : "rgb") : Xg(M.h) && Xg(M.s) && Xg(M.v) ? (A = yi(M.s), t = yi(M.v), I = w1(M.h, A, t), e = !0, i = "hsv") : Xg(M.h) && Xg(M.s) && Xg(M.l) && (A = yi(M.s), D = yi(M.l), I = r1(M.h, A, D), e = !0, i = "hsl"), Object.prototype.hasOwnProperty.call(M, "a") && (g = M.a)), g = GS(g), {
    ok: e,
    format: M.format || i,
    r: Math.min(255, Math.max(I.r, 0)),
    g: Math.min(255, Math.max(I.g, 0)),
    b: Math.min(255, Math.max(I.b, 0)),
    a: g
  };
}
var b1 = "[-\\+]?\\d+%?", Y1 = "[-\\+]?\\d*\\.\\d+%?", bA = "(?:".concat(Y1, ")|(?:").concat(b1, ")"), A0 = "[\\s|\\(]+(".concat(bA, ")[,|\\s]+(").concat(bA, ")[,|\\s]+(").concat(bA, ")\\s*\\)?"), t0 = "[\\s|\\(]+(".concat(bA, ")[,|\\s]+(").concat(bA, ")[,|\\s]+(").concat(bA, ")[,|\\s]+(").concat(bA, ")\\s*\\)?"), Sg = {
  CSS_UNIT: new RegExp(bA),
  rgb: new RegExp("rgb" + A0),
  rgba: new RegExp("rgba" + t0),
  hsl: new RegExp("hsl" + A0),
  hsla: new RegExp("hsla" + t0),
  hsv: new RegExp("hsv" + A0),
  hsva: new RegExp("hsva" + t0),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function p1(M) {
  if (M = M.trim().toLowerCase(), M.length === 0)
    return !1;
  var I = !1;
  if (R0[M])
    M = R0[M], I = !0;
  else if (M === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var g = Sg.rgb.exec(M);
  return g ? { r: g[1], g: g[2], b: g[3] } : (g = Sg.rgba.exec(M), g ? { r: g[1], g: g[2], b: g[3], a: g[4] } : (g = Sg.hsl.exec(M), g ? { h: g[1], s: g[2], l: g[3] } : (g = Sg.hsla.exec(M), g ? { h: g[1], s: g[2], l: g[3], a: g[4] } : (g = Sg.hsv.exec(M), g ? { h: g[1], s: g[2], v: g[3] } : (g = Sg.hsva.exec(M), g ? { h: g[1], s: g[2], v: g[3], a: g[4] } : (g = Sg.hex8.exec(M), g ? {
    r: VM(g[1]),
    g: VM(g[2]),
    b: VM(g[3]),
    a: So(g[4]),
    format: I ? "name" : "hex8"
  } : (g = Sg.hex6.exec(M), g ? {
    r: VM(g[1]),
    g: VM(g[2]),
    b: VM(g[3]),
    format: I ? "name" : "hex"
  } : (g = Sg.hex4.exec(M), g ? {
    r: VM(g[1] + g[1]),
    g: VM(g[2] + g[2]),
    b: VM(g[3] + g[3]),
    a: So(g[4] + g[4]),
    format: I ? "name" : "hex8"
  } : (g = Sg.hex3.exec(M), g ? {
    r: VM(g[1] + g[1]),
    g: VM(g[2] + g[2]),
    b: VM(g[3] + g[3]),
    format: I ? "name" : "hex"
  } : !1)))))))));
}
function Xg(M) {
  return Boolean(Sg.CSS_UNIT.exec(String(M)));
}
var Q1 = function() {
  function M(I, g) {
    I === void 0 && (I = ""), g === void 0 && (g = {});
    var A;
    if (I instanceof M)
      return I;
    typeof I == "number" && (I = z1(I)), this.originalInput = I;
    var t = m1(I);
    this.originalInput = I, this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (A = g.format) !== null && A !== void 0 ? A : t.format, this.gradientType = g.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = t.ok;
  }
  return M.prototype.isDark = function() {
    return this.getBrightness() < 128;
  }, M.prototype.isLight = function() {
    return !this.isDark();
  }, M.prototype.getBrightness = function() {
    var I = this.toRgb();
    return (I.r * 299 + I.g * 587 + I.b * 114) / 1e3;
  }, M.prototype.getLuminance = function() {
    var I = this.toRgb(), g, A, t, D = I.r / 255, e = I.g / 255, i = I.b / 255;
    return D <= 0.03928 ? g = D / 12.92 : g = Math.pow((D + 0.055) / 1.055, 2.4), e <= 0.03928 ? A = e / 12.92 : A = Math.pow((e + 0.055) / 1.055, 2.4), i <= 0.03928 ? t = i / 12.92 : t = Math.pow((i + 0.055) / 1.055, 2.4), 0.2126 * g + 0.7152 * A + 0.0722 * t;
  }, M.prototype.getAlpha = function() {
    return this.a;
  }, M.prototype.setAlpha = function(I) {
    return this.a = GS(I), this.roundA = Math.round(100 * this.a) / 100, this;
  }, M.prototype.toHsv = function() {
    var I = To(this.r, this.g, this.b);
    return { h: I.h * 360, s: I.s, v: I.v, a: this.a };
  }, M.prototype.toHsvString = function() {
    var I = To(this.r, this.g, this.b), g = Math.round(I.h * 360), A = Math.round(I.s * 100), t = Math.round(I.v * 100);
    return this.a === 1 ? "hsv(".concat(g, ", ").concat(A, "%, ").concat(t, "%)") : "hsva(".concat(g, ", ").concat(A, "%, ").concat(t, "%, ").concat(this.roundA, ")");
  }, M.prototype.toHsl = function() {
    var I = oo(this.r, this.g, this.b);
    return { h: I.h * 360, s: I.s, l: I.l, a: this.a };
  }, M.prototype.toHslString = function() {
    var I = oo(this.r, this.g, this.b), g = Math.round(I.h * 360), A = Math.round(I.s * 100), t = Math.round(I.l * 100);
    return this.a === 1 ? "hsl(".concat(g, ", ").concat(A, "%, ").concat(t, "%)") : "hsla(".concat(g, ", ").concat(A, "%, ").concat(t, "%, ").concat(this.roundA, ")");
  }, M.prototype.toHex = function(I) {
    return I === void 0 && (I = !1), so(this.r, this.g, this.b, I);
  }, M.prototype.toHexString = function(I) {
    return I === void 0 && (I = !1), "#" + this.toHex(I);
  }, M.prototype.toHex8 = function(I) {
    return I === void 0 && (I = !1), E1(this.r, this.g, this.b, this.a, I);
  }, M.prototype.toHex8String = function(I) {
    return I === void 0 && (I = !1), "#" + this.toHex8(I);
  }, M.prototype.toRgb = function() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a
    };
  }, M.prototype.toRgbString = function() {
    var I = Math.round(this.r), g = Math.round(this.g), A = Math.round(this.b);
    return this.a === 1 ? "rgb(".concat(I, ", ").concat(g, ", ").concat(A, ")") : "rgba(".concat(I, ", ").concat(g, ", ").concat(A, ", ").concat(this.roundA, ")");
  }, M.prototype.toPercentageRgb = function() {
    var I = function(g) {
      return "".concat(Math.round(xM(g, 255) * 100), "%");
    };
    return {
      r: I(this.r),
      g: I(this.g),
      b: I(this.b),
      a: this.a
    };
  }, M.prototype.toPercentageRgbString = function() {
    var I = function(g) {
      return Math.round(xM(g, 255) * 100);
    };
    return this.a === 1 ? "rgb(".concat(I(this.r), "%, ").concat(I(this.g), "%, ").concat(I(this.b), "%)") : "rgba(".concat(I(this.r), "%, ").concat(I(this.g), "%, ").concat(I(this.b), "%, ").concat(this.roundA, ")");
  }, M.prototype.toName = function() {
    if (this.a === 0)
      return "transparent";
    if (this.a < 1)
      return !1;
    for (var I = "#" + so(this.r, this.g, this.b, !1), g = 0, A = Object.entries(R0); g < A.length; g++) {
      var t = A[g], D = t[0], e = t[1];
      if (I === e)
        return D;
    }
    return !1;
  }, M.prototype.toString = function(I) {
    var g = Boolean(I);
    I = I != null ? I : this.format;
    var A = !1, t = this.a < 1 && this.a >= 0, D = !g && t && (I.startsWith("hex") || I === "name");
    return D ? I === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (I === "rgb" && (A = this.toRgbString()), I === "prgb" && (A = this.toPercentageRgbString()), (I === "hex" || I === "hex6") && (A = this.toHexString()), I === "hex3" && (A = this.toHexString(!0)), I === "hex4" && (A = this.toHex8String(!0)), I === "hex8" && (A = this.toHex8String()), I === "name" && (A = this.toName()), I === "hsl" && (A = this.toHslString()), I === "hsv" && (A = this.toHsvString()), A || this.toHexString());
  }, M.prototype.toNumber = function() {
    return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
  }, M.prototype.clone = function() {
    return new M(this.toString());
  }, M.prototype.lighten = function(I) {
    I === void 0 && (I = 10);
    var g = this.toHsl();
    return g.l += I / 100, g.l = li(g.l), new M(g);
  }, M.prototype.brighten = function(I) {
    I === void 0 && (I = 10);
    var g = this.toRgb();
    return g.r = Math.max(0, Math.min(255, g.r - Math.round(255 * -(I / 100)))), g.g = Math.max(0, Math.min(255, g.g - Math.round(255 * -(I / 100)))), g.b = Math.max(0, Math.min(255, g.b - Math.round(255 * -(I / 100)))), new M(g);
  }, M.prototype.darken = function(I) {
    I === void 0 && (I = 10);
    var g = this.toHsl();
    return g.l -= I / 100, g.l = li(g.l), new M(g);
  }, M.prototype.tint = function(I) {
    return I === void 0 && (I = 10), this.mix("white", I);
  }, M.prototype.shade = function(I) {
    return I === void 0 && (I = 10), this.mix("black", I);
  }, M.prototype.desaturate = function(I) {
    I === void 0 && (I = 10);
    var g = this.toHsl();
    return g.s -= I / 100, g.s = li(g.s), new M(g);
  }, M.prototype.saturate = function(I) {
    I === void 0 && (I = 10);
    var g = this.toHsl();
    return g.s += I / 100, g.s = li(g.s), new M(g);
  }, M.prototype.greyscale = function() {
    return this.desaturate(100);
  }, M.prototype.spin = function(I) {
    var g = this.toHsl(), A = (g.h + I) % 360;
    return g.h = A < 0 ? 360 + A : A, new M(g);
  }, M.prototype.mix = function(I, g) {
    g === void 0 && (g = 50);
    var A = this.toRgb(), t = new M(I).toRgb(), D = g / 100, e = {
      r: (t.r - A.r) * D + A.r,
      g: (t.g - A.g) * D + A.g,
      b: (t.b - A.b) * D + A.b,
      a: (t.a - A.a) * D + A.a
    };
    return new M(e);
  }, M.prototype.analogous = function(I, g) {
    I === void 0 && (I = 6), g === void 0 && (g = 30);
    var A = this.toHsl(), t = 360 / g, D = [this];
    for (A.h = (A.h - (t * I >> 1) + 720) % 360; --I; )
      A.h = (A.h + t) % 360, D.push(new M(A));
    return D;
  }, M.prototype.complement = function() {
    var I = this.toHsl();
    return I.h = (I.h + 180) % 360, new M(I);
  }, M.prototype.monochromatic = function(I) {
    I === void 0 && (I = 6);
    for (var g = this.toHsv(), A = g.h, t = g.s, D = g.v, e = [], i = 1 / I; I--; )
      e.push(new M({ h: A, s: t, v: D })), D = (D + i) % 1;
    return e;
  }, M.prototype.splitcomplement = function() {
    var I = this.toHsl(), g = I.h;
    return [
      this,
      new M({ h: (g + 72) % 360, s: I.s, l: I.l }),
      new M({ h: (g + 216) % 360, s: I.s, l: I.l })
    ];
  }, M.prototype.onBackground = function(I) {
    var g = this.toRgb(), A = new M(I).toRgb();
    return new M({
      r: A.r + (g.r - A.r) * g.a,
      g: A.g + (g.g - A.g) * g.a,
      b: A.b + (g.b - A.b) * g.a
    });
  }, M.prototype.triad = function() {
    return this.polyad(3);
  }, M.prototype.tetrad = function() {
    return this.polyad(4);
  }, M.prototype.polyad = function(I) {
    for (var g = this.toHsl(), A = g.h, t = [this], D = 360 / I, e = 1; e < I; e++)
      t.push(new M({ h: (A + e * D) % 360, s: g.s, l: g.l }));
    return t;
  }, M.prototype.equals = function(I) {
    return this.toRgbString() === new M(I).toRgbString();
  }, M;
}();
function jA(M, I = 20) {
  return M.mix("#141414", I).toString();
}
function h1(M) {
  const I = Aj(), g = vI("button");
  return J(() => {
    let A = {};
    const t = M.color;
    if (t) {
      const D = new Q1(t), e = M.dark ? D.tint(20).toString() : jA(D, 20);
      if (M.plain)
        A = g.cssVarBlock({
          "bg-color": M.dark ? jA(D, 90) : D.tint(90).toString(),
          "text-color": t,
          "border-color": M.dark ? jA(D, 50) : D.tint(50).toString(),
          "hover-text-color": `var(${g.cssVarName("color-white")})`,
          "hover-bg-color": t,
          "hover-border-color": t,
          "active-bg-color": e,
          "active-text-color": `var(${g.cssVarName("color-white")})`,
          "active-border-color": e
        }), I.value && (A[g.cssVarBlockName("disabled-bg-color")] = M.dark ? jA(D, 90) : D.tint(90).toString(), A[g.cssVarBlockName("disabled-text-color")] = M.dark ? jA(D, 50) : D.tint(50).toString(), A[g.cssVarBlockName("disabled-border-color")] = M.dark ? jA(D, 80) : D.tint(80).toString());
      else {
        const i = M.dark ? jA(D, 30) : D.tint(30).toString(), N = D.isDark() ? `var(${g.cssVarName("color-white")})` : `var(${g.cssVarName("color-black")})`;
        if (A = g.cssVarBlock({
          "bg-color": t,
          "text-color": N,
          "border-color": t,
          "hover-bg-color": i,
          "hover-text-color": N,
          "hover-border-color": i,
          "active-bg-color": e,
          "active-border-color": e
        }), I.value) {
          const C = M.dark ? jA(D, 50) : D.tint(50).toString();
          A[g.cssVarBlockName("disabled-bg-color")] = C, A[g.cssVarBlockName("disabled-text-color")] = M.dark ? "rgba(255, 255, 255, 0.5)" : `var(${g.cssVarName("color-white")})`, A[g.cssVarBlockName("disabled-border-color")] = C;
        }
      }
    }
    return A;
  });
}
const O1 = ["aria-disabled", "disabled", "autofocus", "type"], k1 = {
  name: "ElButton"
}, P1 = /* @__PURE__ */ eI({
  ...k1,
  props: B0,
  emits: l1,
  setup(M, { expose: I, emit: g }) {
    const A = M, t = dT();
    aY({
      from: "type.text",
      replacement: "link",
      version: "3.0.0",
      scope: "props",
      ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
    }, J(() => A.type === "text"));
    const D = yI(tS, void 0), e = bt("button"), i = vI("button"), { form: N } = Dj(), C = Ai(J(() => D == null ? void 0 : D.size)), u = Aj(), j = h(), n = J(() => A.type || (D == null ? void 0 : D.type) || ""), L = J(() => {
      var S, y, x;
      return (x = (y = A.autoInsertSpace) != null ? y : (S = e.value) == null ? void 0 : S.autoInsertSpace) != null ? x : !1;
    }), o = J(() => {
      var S;
      const y = (S = t.default) == null ? void 0 : S.call(t);
      if (L.value && (y == null ? void 0 : y.length) === 1) {
        const x = y[0];
        if ((x == null ? void 0 : x.type) === mT) {
          const a = x.children;
          return /^\p{Unified_Ideograph}{2}$/u.test(a.trim());
        }
      }
      return !1;
    }), T = h1(A), s = (S) => {
      A.nativeType === "reset" && (N == null || N.resetFields()), g("click", S);
    };
    return I({
      ref: j,
      size: C,
      type: n,
      disabled: u,
      shouldAddSpace: o
    }), (S, y) => (Y(), $("button", {
      ref_key: "_ref",
      ref: j,
      class: _([
        r(i).b(),
        r(i).m(r(n)),
        r(i).m(r(C)),
        r(i).is("disabled", r(u)),
        r(i).is("loading", S.loading),
        r(i).is("plain", S.plain),
        r(i).is("round", S.round),
        r(i).is("circle", S.circle),
        r(i).is("text", S.text),
        r(i).is("link", S.link),
        r(i).is("has-bg", S.bg)
      ]),
      "aria-disabled": r(u) || S.loading,
      disabled: r(u) || S.loading,
      autofocus: S.autofocus,
      type: S.nativeType,
      style: BI(r(T)),
      onClick: s
    }, [
      S.loading ? (Y(), $(iM, { key: 0 }, [
        S.$slots.loading ? dI(S.$slots, "loading", { key: 0 }) : (Y(), DI(r(PM), {
          key: 1,
          class: _(r(i).is("loading"))
        }, {
          default: F(() => [
            (Y(), DI($M(S.loadingIcon)))
          ]),
          _: 1
        }, 8, ["class"]))
      ], 64)) : S.icon || S.$slots.icon ? (Y(), DI(r(PM), { key: 1 }, {
        default: F(() => [
          S.icon ? (Y(), DI($M(S.icon), { key: 0 })) : dI(S.$slots, "icon", { key: 1 })
        ]),
        _: 3
      })) : TI("v-if", !0),
      S.$slots.default ? (Y(), $("span", {
        key: 2,
        class: _({ [r(i).em("text", "expand")]: r(o) })
      }, [
        dI(S.$slots, "default")
      ], 2)) : TI("v-if", !0)
    ], 14, O1));
  }
});
var f1 = /* @__PURE__ */ bI(P1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
const G1 = {
  size: B0.size,
  type: B0.type
}, W1 = {
  name: "ElButtonGroup"
}, Z1 = /* @__PURE__ */ eI({
  ...W1,
  props: G1,
  setup(M) {
    const I = M;
    LM(tS, QD({
      size: GM(I, "size"),
      type: GM(I, "type")
    }));
    const g = vI("button");
    return (A, t) => (Y(), $("div", {
      class: _(`${r(g).b("group")}`)
    }, [
      dI(A.$slots, "default")
    ], 2));
  }
});
var WS = /* @__PURE__ */ bI(Z1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
const PD = JA(f1, {
  ButtonGroup: WS
});
Ij(WS);
const TA = /* @__PURE__ */ new Map();
let ao;
jM && (document.addEventListener("mousedown", (M) => ao = M), document.addEventListener("mouseup", (M) => {
  for (const I of TA.values())
    for (const { documentHandler: g } of I)
      g(M, ao);
}));
function lo(M, I) {
  let g = [];
  return Array.isArray(I.arg) ? g = I.arg : Ye(I.arg) && g.push(I.arg), function(A, t) {
    const D = I.instance.popperRef, e = A.target, i = t == null ? void 0 : t.target, N = !I || !I.instance, C = !e || !i, u = M.contains(e) || M.contains(i), j = M === e, n = g.length && g.some((o) => o == null ? void 0 : o.contains(e)) || g.length && g.includes(i), L = D && (D.contains(e) || D.contains(i));
    N || C || u || j || n || L || I.value(A, t);
  };
}
const v1 = {
  beforeMount(M, I) {
    TA.has(M) || TA.set(M, []), TA.get(M).push({
      documentHandler: lo(M, I),
      bindingFn: I.value
    });
  },
  updated(M, I) {
    TA.has(M) || TA.set(M, []);
    const g = TA.get(M), A = g.findIndex((D) => D.bindingFn === I.oldValue), t = {
      documentHandler: lo(M, I),
      bindingFn: I.value
    };
    A >= 0 ? g.splice(A, 1, t) : g.push(t);
  },
  unmounted(M) {
    TA.delete(M);
  }
}, H0 = "_trap-focus-children", At = [], yo = (M) => {
  var I;
  if (At.length === 0)
    return;
  const g = At[At.length - 1][H0];
  if (g.length > 0 && M.code === ZI.tab) {
    if (g.length === 1) {
      M.preventDefault(), document.activeElement !== g[0] && g[0].focus();
      return;
    }
    const A = M.shiftKey, t = M.target === g[0], D = M.target === g[g.length - 1];
    if (t && A && (M.preventDefault(), g[g.length - 1].focus()), D && !A && (M.preventDefault(), g[0].focus()), process.env.NODE_ENV === "test") {
      const e = g.indexOf(M.target);
      e !== -1 && ((I = g[A ? e - 1 : e + 1]) == null || I.focus());
    }
  }
}, U1 = {
  beforeMount(M) {
    M[H0] = YL(M), At.push(M), At.length <= 1 && document.addEventListener("keydown", yo);
  },
  updated(M) {
    VI(() => {
      M[H0] = YL(M);
    });
  },
  unmounted() {
    At.shift(), At.length === 0 && document.removeEventListener("keydown", yo);
  }
};
let D0 = !1;
function ke(M, I) {
  if (!jM)
    return;
  const g = function(D) {
    var e;
    (e = I.drag) == null || e.call(I, D);
  }, A = function(D) {
    var e;
    document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", A), document.removeEventListener("touchmove", g), document.removeEventListener("touchend", A), document.onselectstart = null, document.ondragstart = null, D0 = !1, (e = I.end) == null || e.call(I, D);
  }, t = function(D) {
    var e;
    D0 || (D.preventDefault(), document.onselectstart = () => !1, document.ondragstart = () => !1, document.addEventListener("mousemove", g), document.addEventListener("mouseup", A), document.addEventListener("touchmove", g), document.addEventListener("touchend", A), D0 = !0, (e = I.start) == null || e.call(I, D));
  };
  M.addEventListener("mousedown", t), M.addEventListener("touchstart", t);
}
const J1 = eI({
  name: "ElColorAlphaSlider",
  props: {
    color: {
      type: Object,
      required: !0
    },
    vertical: {
      type: Boolean,
      default: !1
    }
  },
  setup(M) {
    const I = vI("color-alpha-slider"), g = Lg(), A = gD(null), t = gD(null), D = h(0), e = h(0), i = h(null);
    SI(() => M.color.get("alpha"), () => {
      L();
    }), SI(() => M.color.value, () => {
      L();
    });
    function N() {
      if (M.vertical)
        return 0;
      const o = g.vnode.el, T = M.color.get("alpha");
      return o ? Math.round(T * (o.offsetWidth - A.value.offsetWidth / 2) / 100) : 0;
    }
    function C() {
      const o = g.vnode.el;
      if (!M.vertical)
        return 0;
      const T = M.color.get("alpha");
      return o ? Math.round(T * (o.offsetHeight - A.value.offsetHeight / 2) / 100) : 0;
    }
    function u() {
      if (M.color && M.color.value) {
        const { r: o, g: T, b: s } = M.color.toRgb();
        return `linear-gradient(to right, rgba(${o}, ${T}, ${s}, 0) 0%, rgba(${o}, ${T}, ${s}, 1) 100%)`;
      }
      return null;
    }
    function j(o) {
      o.target !== A.value && n(o);
    }
    function n(o) {
      const s = g.vnode.el.getBoundingClientRect(), { clientX: S, clientY: y } = qu(o);
      if (M.vertical) {
        let x = y - s.top;
        x = Math.max(A.value.offsetHeight / 2, x), x = Math.min(x, s.height - A.value.offsetHeight / 2), M.color.set("alpha", Math.round((x - A.value.offsetHeight / 2) / (s.height - A.value.offsetHeight) * 100));
      } else {
        let x = S - s.left;
        x = Math.max(A.value.offsetWidth / 2, x), x = Math.min(x, s.width - A.value.offsetWidth / 2), M.color.set("alpha", Math.round((x - A.value.offsetWidth / 2) / (s.width - A.value.offsetWidth) * 100));
      }
    }
    function L() {
      D.value = N(), e.value = C(), i.value = u();
    }
    return RI(() => {
      const o = {
        drag: (T) => {
          n(T);
        },
        end: (T) => {
          n(T);
        }
      };
      ke(t.value, o), ke(A.value, o), L();
    }), {
      thumb: A,
      bar: t,
      thumbLeft: D,
      thumbTop: e,
      background: i,
      handleClick: j,
      update: L,
      ns: I
    };
  }
});
function B1(M, I, g, A, t, D) {
  return Y(), $("div", {
    class: _([M.ns.b(), M.ns.is("vertical", M.vertical)])
  }, [
    f("div", {
      ref: "bar",
      class: _(M.ns.e("bar")),
      style: BI({
        background: M.background
      }),
      onClick: I[0] || (I[0] = (...e) => M.handleClick && M.handleClick(...e))
    }, null, 6),
    f("div", {
      ref: "thumb",
      class: _(M.ns.e("thumb")),
      style: BI({
        left: M.thumbLeft + "px",
        top: M.thumbTop + "px"
      })
    }, null, 6)
  ], 2);
}
var R1 = /* @__PURE__ */ bI(J1, [["render", B1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/alpha-slider.vue"]]);
const H1 = eI({
  name: "ElColorHueSlider",
  props: {
    color: {
      type: Object,
      required: !0
    },
    vertical: Boolean
  },
  setup(M) {
    const I = vI("color-hue-slider"), g = Lg(), A = h(null), t = h(null), D = h(0), e = h(0), i = J(() => M.color.get("hue"));
    SI(() => i.value, () => {
      n();
    });
    function N(L) {
      L.target !== A.value && C(L);
    }
    function C(L) {
      const T = g.vnode.el.getBoundingClientRect(), { clientX: s, clientY: S } = qu(L);
      let y;
      if (M.vertical) {
        let x = S - T.top;
        x = Math.min(x, T.height - A.value.offsetHeight / 2), x = Math.max(A.value.offsetHeight / 2, x), y = Math.round((x - A.value.offsetHeight / 2) / (T.height - A.value.offsetHeight) * 360);
      } else {
        let x = s - T.left;
        x = Math.min(x, T.width - A.value.offsetWidth / 2), x = Math.max(A.value.offsetWidth / 2, x), y = Math.round((x - A.value.offsetWidth / 2) / (T.width - A.value.offsetWidth) * 360);
      }
      M.color.set("hue", y);
    }
    function u() {
      const L = g.vnode.el;
      if (M.vertical)
        return 0;
      const o = M.color.get("hue");
      return L ? Math.round(o * (L.offsetWidth - A.value.offsetWidth / 2) / 360) : 0;
    }
    function j() {
      const L = g.vnode.el;
      if (!M.vertical)
        return 0;
      const o = M.color.get("hue");
      return L ? Math.round(o * (L.offsetHeight - A.value.offsetHeight / 2) / 360) : 0;
    }
    function n() {
      D.value = u(), e.value = j();
    }
    return RI(() => {
      const L = {
        drag: (o) => {
          C(o);
        },
        end: (o) => {
          C(o);
        }
      };
      ke(t.value, L), ke(A.value, L), n();
    }), {
      bar: t,
      thumb: A,
      thumbLeft: D,
      thumbTop: e,
      hueValue: i,
      handleClick: N,
      update: n,
      ns: I
    };
  }
});
function V1(M, I, g, A, t, D) {
  return Y(), $("div", {
    class: _([M.ns.b(), M.ns.is("vertical", M.vertical)])
  }, [
    f("div", {
      ref: "bar",
      class: _(M.ns.e("bar")),
      onClick: I[0] || (I[0] = (...e) => M.handleClick && M.handleClick(...e))
    }, null, 2),
    f("div", {
      ref: "thumb",
      class: _(M.ns.e("thumb")),
      style: BI({
        left: M.thumbLeft + "px",
        top: M.thumbTop + "px"
      })
    }, null, 6)
  ], 2);
}
var F1 = /* @__PURE__ */ bI(H1, [["render", V1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/hue-slider.vue"]]);
const ZS = Symbol(), X1 = () => yI(ZS), co = function(M, I, g) {
  return [
    M,
    I * g / ((M = (2 - I) * g) < 1 ? M : 2 - M) || 0,
    M / 2
  ];
}, K1 = function(M) {
  return typeof M == "string" && M.includes(".") && Number.parseFloat(M) === 1;
}, _1 = function(M) {
  return typeof M == "string" && M.includes("%");
}, ND = function(M, I) {
  K1(M) && (M = "100%");
  const g = _1(M);
  return M = Math.min(I, Math.max(0, Number.parseFloat(`${M}`))), g && (M = Number.parseInt(`${M * I}`, 10) / 100), Math.abs(M - I) < 1e-6 ? 1 : M % I / Number.parseFloat(I);
}, xo = { 10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F" }, Gi = function(M) {
  M = Math.min(Math.round(M), 255);
  const I = Math.floor(M / 16), g = M % 16;
  return `${xo[I] || I}${xo[g] || g}`;
}, ro = function({ r: M, g: I, b: g }) {
  return Number.isNaN(+M) || Number.isNaN(+I) || Number.isNaN(+g) ? "" : `#${Gi(M)}${Gi(I)}${Gi(g)}`;
}, e0 = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 }, XA = function(M) {
  return M.length === 2 ? (e0[M[0].toUpperCase()] || +M[0]) * 16 + (e0[M[1].toUpperCase()] || +M[1]) : e0[M[1].toUpperCase()] || +M[1];
}, $1 = function(M, I, g) {
  I = I / 100, g = g / 100;
  let A = I;
  const t = Math.max(g, 0.01);
  g *= 2, I *= g <= 1 ? g : 2 - g, A *= t <= 1 ? t : 2 - t;
  const D = (g + I) / 2, e = g === 0 ? 2 * A / (t + A) : 2 * I / (g + I);
  return {
    h: M,
    s: e * 100,
    v: D * 100
  };
}, wo = function(M, I, g) {
  M = ND(M, 255), I = ND(I, 255), g = ND(g, 255);
  const A = Math.max(M, I, g), t = Math.min(M, I, g);
  let D;
  const e = A, i = A - t, N = A === 0 ? 0 : i / A;
  if (A === t)
    D = 0;
  else {
    switch (A) {
      case M: {
        D = (I - g) / i + (I < g ? 6 : 0);
        break;
      }
      case I: {
        D = (g - M) / i + 2;
        break;
      }
      case g: {
        D = (M - I) / i + 4;
        break;
      }
    }
    D /= 6;
  }
  return { h: D * 360, s: N * 100, v: e * 100 };
}, XD = function(M, I, g) {
  M = ND(M, 360) * 6, I = ND(I, 100), g = ND(g, 100);
  const A = Math.floor(M), t = M - A, D = g * (1 - I), e = g * (1 - t * I), i = g * (1 - (1 - t) * I), N = A % 6, C = [g, e, D, D, i, g][N], u = [i, g, g, e, D, D][N], j = [D, D, i, g, g, e][N];
  return {
    r: Math.round(C * 255),
    g: Math.round(u * 255),
    b: Math.round(j * 255)
  };
};
class Se {
  constructor(I) {
    this._hue = 0, this._saturation = 100, this._value = 100, this._alpha = 100, this.enableAlpha = !1, this.format = "hex", this.value = "", I = I || {};
    for (const g in I)
      xD(I, g) && (this[g] = I[g]);
    I.value ? this.fromString(I.value) : this.doOnChange();
  }
  set(I, g) {
    if (arguments.length === 1 && typeof I == "object") {
      for (const A in I)
        xD(I, A) && this.set(A, I[A]);
      return;
    }
    this[`_${I}`] = g, this.doOnChange();
  }
  get(I) {
    return I === "alpha" ? Math.floor(this[`_${I}`]) : this[`_${I}`];
  }
  toRgb() {
    return XD(this._hue, this._saturation, this._value);
  }
  fromString(I) {
    if (!I) {
      this._hue = 0, this._saturation = 100, this._value = 100, this.doOnChange();
      return;
    }
    const g = (A, t, D) => {
      this._hue = Math.max(0, Math.min(360, A)), this._saturation = Math.max(0, Math.min(100, t)), this._value = Math.max(0, Math.min(100, D)), this.doOnChange();
    };
    if (I.includes("hsl")) {
      const A = I.replace(/hsla|hsl|\(|\)/gm, "").split(/\s|,/g).filter((t) => t !== "").map((t, D) => D > 2 ? Number.parseFloat(t) : Number.parseInt(t, 10));
      if (A.length === 4 ? this._alpha = Number.parseFloat(A[3]) * 100 : A.length === 3 && (this._alpha = 100), A.length >= 3) {
        const { h: t, s: D, v: e } = $1(A[0], A[1], A[2]);
        g(t, D, e);
      }
    } else if (I.includes("hsv")) {
      const A = I.replace(/hsva|hsv|\(|\)/gm, "").split(/\s|,/g).filter((t) => t !== "").map((t, D) => D > 2 ? Number.parseFloat(t) : Number.parseInt(t, 10));
      A.length === 4 ? this._alpha = Number.parseFloat(A[3]) * 100 : A.length === 3 && (this._alpha = 100), A.length >= 3 && g(A[0], A[1], A[2]);
    } else if (I.includes("rgb")) {
      const A = I.replace(/rgba|rgb|\(|\)/gm, "").split(/\s|,/g).filter((t) => t !== "").map((t, D) => D > 2 ? Number.parseFloat(t) : Number.parseInt(t, 10));
      if (A.length === 4 ? this._alpha = Number.parseFloat(A[3]) * 100 : A.length === 3 && (this._alpha = 100), A.length >= 3) {
        const { h: t, s: D, v: e } = wo(A[0], A[1], A[2]);
        g(t, D, e);
      }
    } else if (I.includes("#")) {
      const A = I.replace("#", "").trim();
      if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(A))
        return;
      let t, D, e;
      A.length === 3 ? (t = XA(A[0] + A[0]), D = XA(A[1] + A[1]), e = XA(A[2] + A[2])) : (A.length === 6 || A.length === 8) && (t = XA(A.slice(0, 2)), D = XA(A.slice(2, 4)), e = XA(A.slice(4, 6))), A.length === 8 ? this._alpha = XA(A.slice(6)) / 255 * 100 : (A.length === 3 || A.length === 6) && (this._alpha = 100);
      const { h: i, s: N, v: C } = wo(t, D, e);
      g(i, N, C);
    }
  }
  compare(I) {
    return Math.abs(I._hue - this._hue) < 2 && Math.abs(I._saturation - this._saturation) < 1 && Math.abs(I._value - this._value) < 1 && Math.abs(I._alpha - this._alpha) < 1;
  }
  doOnChange() {
    const { _hue: I, _saturation: g, _value: A, _alpha: t, format: D } = this;
    if (this.enableAlpha)
      switch (D) {
        case "hsl": {
          const e = co(I, g / 100, A / 100);
          this.value = `hsla(${I}, ${Math.round(e[1] * 100)}%, ${Math.round(e[2] * 100)}%, ${this.get("alpha") / 100})`;
          break;
        }
        case "hsv": {
          this.value = `hsva(${I}, ${Math.round(g)}%, ${Math.round(A)}%, ${this.get("alpha") / 100})`;
          break;
        }
        case "hex": {
          this.value = `${ro(XD(I, g, A))}${Gi(t * 255 / 100)}`;
          break;
        }
        default: {
          const { r: e, g: i, b: N } = XD(I, g, A);
          this.value = `rgba(${e}, ${i}, ${N}, ${this.get("alpha") / 100})`;
        }
      }
    else
      switch (D) {
        case "hsl": {
          const e = co(I, g / 100, A / 100);
          this.value = `hsl(${I}, ${Math.round(e[1] * 100)}%, ${Math.round(e[2] * 100)}%)`;
          break;
        }
        case "hsv": {
          this.value = `hsv(${I}, ${Math.round(g)}%, ${Math.round(A)}%)`;
          break;
        }
        case "rgb": {
          const { r: e, g: i, b: N } = XD(I, g, A);
          this.value = `rgb(${e}, ${i}, ${N})`;
          break;
        }
        default:
          this.value = ro(XD(I, g, A));
      }
  }
}
const q1 = eI({
  props: {
    colors: { type: Array, required: !0 },
    color: {
      type: Object,
      required: !0
    }
  },
  setup(M) {
    const I = vI("color-predefine"), { currentColor: g } = X1(), A = h(D(M.colors, M.color));
    SI(() => g.value, (e) => {
      const i = new Se();
      i.fromString(e), A.value.forEach((N) => {
        N.selected = i.compare(N);
      });
    }), Cu(() => {
      A.value = D(M.colors, M.color);
    });
    function t(e) {
      M.color.fromString(M.colors[e]);
    }
    function D(e, i) {
      return e.map((N) => {
        const C = new Se();
        return C.enableAlpha = !0, C.format = "rgba", C.fromString(N), C.selected = C.value === i.value, C;
      });
    }
    return {
      rgbaColors: A,
      handleSelect: t,
      ns: I
    };
  }
}), Ih = ["onClick"];
function Mh(M, I, g, A, t, D) {
  return Y(), $("div", {
    class: _(M.ns.b())
  }, [
    f("div", {
      class: _(M.ns.e("colors"))
    }, [
      (Y(!0), $(iM, null, eA(M.rgbaColors, (e, i) => (Y(), $("div", {
        key: M.colors[i],
        class: _([
          M.ns.e("color-selector"),
          M.ns.is("alpha", e._alpha < 100),
          { selected: e.selected }
        ]),
        onClick: (N) => M.handleSelect(i)
      }, [
        f("div", {
          style: BI({ backgroundColor: e.value })
        }, null, 4)
      ], 10, Ih))), 128))
    ], 2)
  ], 2);
}
var gh = /* @__PURE__ */ bI(q1, [["render", Mh], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/predefine.vue"]]);
const Ah = eI({
  name: "ElSlPanel",
  props: {
    color: {
      type: Object,
      required: !0
    }
  },
  setup(M) {
    const I = vI("color-svpanel"), g = Lg(), A = h(0), t = h(0), D = h("hsl(0, 100%, 50%)"), e = J(() => {
      const C = M.color.get("hue"), u = M.color.get("value");
      return { hue: C, value: u };
    });
    function i() {
      const C = M.color.get("saturation"), u = M.color.get("value"), j = g.vnode.el, { clientWidth: n, clientHeight: L } = j;
      t.value = C * n / 100, A.value = (100 - u) * L / 100, D.value = `hsl(${M.color.get("hue")}, 100%, 50%)`;
    }
    function N(C) {
      const j = g.vnode.el.getBoundingClientRect(), { clientX: n, clientY: L } = qu(C);
      let o = n - j.left, T = L - j.top;
      o = Math.max(0, o), o = Math.min(o, j.width), T = Math.max(0, T), T = Math.min(T, j.height), t.value = o, A.value = T, M.color.set({
        saturation: o / j.width * 100,
        value: 100 - T / j.height * 100
      });
    }
    return SI(() => e.value, () => {
      i();
    }), RI(() => {
      ke(g.vnode.el, {
        drag: (C) => {
          N(C);
        },
        end: (C) => {
          N(C);
        }
      }), i();
    }), {
      cursorTop: A,
      cursorLeft: t,
      background: D,
      colorValue: e,
      handleDrag: N,
      update: i,
      ns: I
    };
  }
}), th = /* @__PURE__ */ f("div", null, null, -1), Dh = [
  th
];
function eh(M, I, g, A, t, D) {
  return Y(), $("div", {
    class: _(M.ns.b()),
    style: BI({
      backgroundColor: M.background
    })
  }, [
    f("div", {
      class: _(M.ns.e("white"))
    }, null, 2),
    f("div", {
      class: _(M.ns.e("black"))
    }, null, 2),
    f("div", {
      class: _(M.ns.e("cursor")),
      style: BI({
        top: M.cursorTop + "px",
        left: M.cursorLeft + "px"
      })
    }, Dh, 6)
  ], 6);
}
var ih = /* @__PURE__ */ bI(Ah, [["render", eh], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/sv-panel.vue"]]);
const Nh = eI({
  name: "ElColorPicker",
  components: {
    ElButton: PD,
    ElTooltip: aj,
    ElInput: ij,
    ElIcon: PM,
    Close: Xs,
    ArrowDown: gi,
    SvPanel: ih,
    HueSlider: F1,
    AlphaSlider: R1,
    Predefine: gh
  },
  directives: {
    ClickOutside: v1
  },
  props: {
    modelValue: String,
    id: String,
    showAlpha: Boolean,
    colorFormat: String,
    disabled: Boolean,
    size: {
      type: String,
      validator: AS
    },
    popperClass: String,
    label: {
      type: String,
      default: void 0
    },
    tabindex: {
      type: [String, Number],
      default: 0
    },
    predefine: Array,
    validateEvent: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["change", "active-change", iD],
  setup(M, { emit: I }) {
    const { t: g } = ej(), A = vI("color"), { form: t, formItem: D } = Dj(), { inputId: e, isLabeledByFormItem: i } = CS(M, {
      formItemContext: D
    }), N = h(), C = h(), u = h(), j = h(null);
    let n = !0;
    const L = QD(new Se({
      enableAlpha: M.showAlpha,
      format: M.colorFormat || "",
      value: M.modelValue
    })), o = h(!1), T = h(!1), s = h(""), S = J(() => !M.modelValue && !T.value ? "transparent" : E(L, M.showAlpha)), y = Ai(), x = J(() => !!(M.disabled || (t == null ? void 0 : t.disabled))), a = J(() => !M.modelValue && !T.value ? "" : L.value), z = J(() => i.value ? void 0 : M.label || g("el.colorpicker.defaultLabel")), c = J(() => i.value ? D == null ? void 0 : D.labelId : void 0);
    SI(() => M.modelValue, (l) => {
      l ? l && l !== L.value && (n = !1, L.fromString(l)) : T.value = !1;
    }), SI(() => a.value, (l) => {
      s.value = l, n && I("active-change", l), n = !0;
    }), SI(() => L.value, () => {
      !M.modelValue && !T.value && (T.value = !0);
    });
    function E(l, w) {
      if (!(l instanceof Se))
        throw new TypeError("color should be instance of _color Class");
      const { r: Q, g: k, b: B } = l.toRgb();
      return w ? `rgba(${Q}, ${k}, ${B}, ${l.get("alpha") / 100})` : `rgb(${Q}, ${k}, ${B})`;
    }
    function m(l) {
      o.value = l;
    }
    const p = cb(m, 100);
    function V() {
      p(!1), U();
    }
    function U() {
      VI(() => {
        M.modelValue ? L.fromString(M.modelValue) : (L.value = "", VI(() => {
          T.value = !1;
        }));
      });
    }
    function gI() {
      x.value || p(!o.value);
    }
    function R() {
      L.fromString(s.value);
    }
    function H() {
      const l = L.value;
      I(iD, l), I("change", l), M.validateEvent && (D == null || D.validate("change").catch((w) => QM(w))), p(!1), VI(() => {
        const w = new Se({
          enableAlpha: M.showAlpha,
          format: M.colorFormat || "",
          value: M.modelValue
        });
        L.compare(w) || U();
      });
    }
    function W() {
      p(!1), I(iD, null), I("change", null), M.modelValue !== null && M.validateEvent && (D == null || D.validate("change").catch((l) => QM(l))), U();
    }
    return RI(() => {
      M.modelValue && (s.value = a.value);
    }), SI(() => o.value, () => {
      VI(() => {
        var l, w, Q;
        (l = N.value) == null || l.update(), (w = C.value) == null || w.update(), (Q = u.value) == null || Q.update();
      });
    }), LM(ZS, {
      currentColor: a
    }), {
      color: L,
      colorDisabled: x,
      colorSize: y,
      displayedColor: S,
      showPanelColor: T,
      showPicker: o,
      customInput: s,
      buttonId: e,
      buttonAriaLabel: z,
      buttonAriaLabelledby: c,
      handleConfirm: R,
      hide: V,
      handleTrigger: gI,
      clear: W,
      confirmValue: H,
      t: g,
      ns: A,
      hue: N,
      svPanel: C,
      alpha: u,
      popper: j
    };
  }
}), Ch = ["id", "aria-label", "aria-labelledby", "aria-description", "tabindex"];
function uh(M, I, g, A, t, D) {
  const e = xI("hue-slider"), i = xI("sv-panel"), N = xI("alpha-slider"), C = xI("predefine"), u = xI("el-input"), j = xI("el-button"), n = xI("arrow-down"), L = xI("el-icon"), o = xI("close"), T = xI("el-tooltip"), s = ml("click-outside");
  return Y(), DI(T, {
    ref: "popper",
    visible: M.showPicker,
    "show-arrow": !1,
    "fallback-placements": ["bottom", "top", "right", "left"],
    offset: 0,
    "gpu-acceleration": !1,
    "popper-class": [M.ns.be("picker", "panel"), M.ns.b("dropdown"), M.popperClass],
    "stop-popper-mouse-event": !1,
    effect: "light",
    trigger: "click",
    transition: `${M.ns.namespace.value}-zoom-in-top`,
    persistent: ""
  }, {
    content: F(() => [
      ig((Y(), $("div", null, [
        f("div", {
          class: _(M.ns.be("dropdown", "main-wrapper"))
        }, [
          MI(e, {
            ref: "hue",
            class: "hue-slider",
            color: M.color,
            vertical: ""
          }, null, 8, ["color"]),
          MI(i, {
            ref: "svPanel",
            color: M.color
          }, null, 8, ["color"])
        ], 2),
        M.showAlpha ? (Y(), DI(N, {
          key: 0,
          ref: "alpha",
          color: M.color
        }, null, 8, ["color"])) : TI("v-if", !0),
        M.predefine ? (Y(), DI(C, {
          key: 1,
          ref: "predefine",
          color: M.color,
          colors: M.predefine
        }, null, 8, ["color", "colors"])) : TI("v-if", !0),
        f("div", {
          class: _(M.ns.be("dropdown", "btns"))
        }, [
          f("span", {
            class: _(M.ns.be("dropdown", "value"))
          }, [
            MI(u, {
              modelValue: M.customInput,
              "onUpdate:modelValue": I[0] || (I[0] = (S) => M.customInput = S),
              "validate-event": !1,
              size: "small",
              onKeyup: Bt(M.handleConfirm, ["enter"]),
              onBlur: M.handleConfirm
            }, null, 8, ["modelValue", "onKeyup", "onBlur"])
          ], 2),
          MI(j, {
            class: _(M.ns.be("dropdown", "link-btn")),
            text: "",
            size: "small",
            onClick: M.clear
          }, {
            default: F(() => [
              Zg(IM(M.t("el.colorpicker.clear")), 1)
            ]),
            _: 1
          }, 8, ["class", "onClick"]),
          MI(j, {
            plain: "",
            size: "small",
            class: _(M.ns.be("dropdown", "btn")),
            onClick: M.confirmValue
          }, {
            default: F(() => [
              Zg(IM(M.t("el.colorpicker.confirm")), 1)
            ]),
            _: 1
          }, 8, ["class", "onClick"])
        ], 2)
      ])), [
        [s, M.hide]
      ])
    ]),
    default: F(() => [
      f("div", {
        id: M.buttonId,
        class: _([
          M.ns.b("picker"),
          M.ns.is("disabled", M.colorDisabled),
          M.ns.bm("picker", M.colorSize)
        ]),
        role: "button",
        "aria-label": M.buttonAriaLabel,
        "aria-labelledby": M.buttonAriaLabelledby,
        "aria-description": M.t("el.colorpicker.description", { color: M.modelValue || "" }),
        tabindex: M.tabindex,
        onKeydown: I[2] || (I[2] = Bt((...S) => M.handleTrigger && M.handleTrigger(...S), ["enter"]))
      }, [
        M.colorDisabled ? (Y(), $("div", {
          key: 0,
          class: _(M.ns.be("picker", "mask"))
        }, null, 2)) : TI("v-if", !0),
        f("div", {
          class: _(M.ns.be("picker", "trigger")),
          onClick: I[1] || (I[1] = (...S) => M.handleTrigger && M.handleTrigger(...S))
        }, [
          f("span", {
            class: _([M.ns.be("picker", "color"), M.ns.is("alpha", M.showAlpha)])
          }, [
            f("span", {
              class: _(M.ns.be("picker", "color-inner")),
              style: BI({
                backgroundColor: M.displayedColor
              })
            }, [
              ig(MI(L, {
                class: _([M.ns.be("picker", "icon"), M.ns.is("icon-arrow-down")])
              }, {
                default: F(() => [
                  MI(n)
                ]),
                _: 1
              }, 8, ["class"]), [
                [Dt, M.modelValue || M.showPanelColor]
              ]),
              !M.modelValue && !M.showPanelColor ? (Y(), DI(L, {
                key: 0,
                class: _([M.ns.be("picker", "empty"), M.ns.is("icon-close")])
              }, {
                default: F(() => [
                  MI(o)
                ]),
                _: 1
              }, 8, ["class"])) : TI("v-if", !0)
            ], 6)
          ], 2)
        ], 2)
      ], 42, Ch)
    ]),
    _: 1
  }, 8, ["visible", "popper-class", "transition"]);
}
var Wi = /* @__PURE__ */ bI(Nh, [["render", uh], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/index.vue"]]);
Wi.install = (M) => {
  M.component(Wi.name, Wi);
};
const jh = Wi, nh = jh, Lh = gM({
  mask: {
    type: Boolean,
    default: !0
  },
  customMaskEvent: {
    type: Boolean,
    default: !1
  },
  overlayClass: {
    type: mI([
      String,
      Array,
      Object
    ])
  },
  zIndex: {
    type: mI([String, Number])
  }
}), oh = {
  click: (M) => M instanceof MouseEvent
};
var Th = eI({
  name: "ElOverlay",
  props: Lh,
  emits: oh,
  setup(M, { slots: I, emit: g }) {
    const A = vI("overlay"), t = (N) => {
      g("click", N);
    }, { onClick: D, onMousedown: e, onMouseup: i } = LS(M.customMaskEvent ? void 0 : t);
    return () => M.mask ? MI("div", {
      class: [A.b(), M.overlayClass],
      style: {
        zIndex: M.zIndex
      },
      onClick: D,
      onMousedown: e,
      onMouseup: i
    }, [dI(I, "default")], ki.STYLE | ki.CLASS | ki.PROPS, ["onClick", "onMouseup", "onMousedown"]) : QA("div", {
      class: M.overlayClass,
      style: {
        zIndex: M.zIndex,
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px"
      }
    }, [dI(I, "default")]);
  }
});
const sh = Th, Sh = {
  inheritAttrs: !1
};
function ah(M, I, g, A, t, D) {
  return dI(M.$slots, "default");
}
var lh = /* @__PURE__ */ bI(Sh, [["render", ah], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection.vue"]]);
const yh = {
  name: "ElCollectionItem",
  inheritAttrs: !1
};
function ch(M, I, g, A, t, D) {
  return dI(M.$slots, "default");
}
var xh = /* @__PURE__ */ bI(yh, [["render", ch], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection-item.vue"]]);
const vS = "data-el-collection-item", US = (M) => {
  const I = `El${M}Collection`, g = `${I}Item`, A = Symbol(I), t = Symbol(g), D = {
    ...lh,
    name: I,
    setup() {
      const i = h(null), N = /* @__PURE__ */ new Map();
      LM(A, {
        itemMap: N,
        getItems: () => {
          const u = r(i);
          if (!u)
            return [];
          const j = Array.from(u.querySelectorAll(`[${vS}]`));
          return [...N.values()].sort((L, o) => j.indexOf(L.ref) - j.indexOf(o.ref));
        },
        collectionRef: i
      });
    }
  }, e = {
    ...xh,
    name: g,
    setup(i, { attrs: N }) {
      const C = h(null), u = yI(A, void 0);
      LM(t, {
        collectionItemRef: C
      }), RI(() => {
        const j = r(C);
        j && u.itemMap.set(j, {
          ref: j,
          ...N
        });
      }), kM(() => {
        const j = r(C);
        u.itemMap.delete(j);
      });
    }
  };
  return {
    COLLECTION_INJECTION_KEY: A,
    COLLECTION_ITEM_INJECTION_KEY: t,
    ElCollection: D,
    ElCollectionItem: e
  };
}, rh = gM({
  style: { type: mI([String, Array, Object]) },
  currentTabId: {
    type: mI(String)
  },
  defaultCurrentTabId: String,
  loop: Boolean,
  dir: {
    type: String,
    values: ["ltr", "rtl"],
    default: "ltr"
  },
  orientation: {
    type: mI(String)
  },
  onBlur: Function,
  onFocus: Function,
  onMousedown: Function
}), {
  ElCollection: wh,
  ElCollectionItem: Eh,
  COLLECTION_INJECTION_KEY: lj,
  COLLECTION_ITEM_INJECTION_KEY: dh
} = US("RovingFocusGroup"), yj = Symbol("elRovingFocusGroup"), JS = Symbol("elRovingFocusGroupItem"), zh = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
}, mh = (M, I) => {
  if (I !== "rtl")
    return M;
  switch (M) {
    case ZI.right:
      return ZI.left;
    case ZI.left:
      return ZI.right;
    default:
      return M;
  }
}, bh = (M, I, g) => {
  const A = mh(M.key, g);
  if (!(I === "vertical" && [ZI.left, ZI.right].includes(A)) && !(I === "horizontal" && [ZI.up, ZI.down].includes(A)))
    return zh[A];
}, Yh = (M, I) => M.map((g, A) => M[(A + I) % M.length]), cj = (M) => {
  const { activeElement: I } = document;
  for (const g of M)
    if (g === I || (g.focus(), I !== document.activeElement))
      return;
}, Eo = "currentTabIdChange", zo = "rovingFocusGroup.entryFocus", ph = { bubbles: !1, cancelable: !0 }, Qh = eI({
  name: "ElRovingFocusGroupImpl",
  inheritAttrs: !1,
  props: rh,
  emits: [Eo, "entryFocus"],
  setup(M, { emit: I }) {
    var g;
    const A = h((g = M.currentTabId || M.defaultCurrentTabId) != null ? g : null), t = h(!1), D = h(!1), e = h(null), { getItems: i } = yI(lj, void 0), N = J(() => [
      {
        outline: "none"
      },
      M.style
    ]), C = (T) => {
      I(Eo, T);
    }, u = () => {
      t.value = !0;
    }, j = AM((T) => {
      var s;
      (s = M.onMousedown) == null || s.call(M, T);
    }, () => {
      D.value = !0;
    }), n = AM((T) => {
      var s;
      (s = M.onFocus) == null || s.call(M, T);
    }, (T) => {
      const s = !r(D), { target: S, currentTarget: y } = T;
      if (S === y && s && !r(t)) {
        const x = new Event(zo, ph);
        if (y == null || y.dispatchEvent(x), !x.defaultPrevented) {
          const a = i().filter((p) => p.focusable), z = a.find((p) => p.active), c = a.find((p) => p.id === r(A)), m = [z, c, ...a].filter(Boolean).map((p) => p.ref);
          cj(m);
        }
      }
      D.value = !1;
    }), L = AM((T) => {
      var s;
      (s = M.onBlur) == null || s.call(M, T);
    }, () => {
      t.value = !1;
    }), o = (...T) => {
      I("entryFocus", ...T);
    };
    LM(yj, {
      currentTabbedId: YT(A),
      loop: GM(M, "loop"),
      tabIndex: J(() => r(t) ? -1 : 0),
      rovingFocusGroupRef: e,
      rovingFocusGroupRootStyle: N,
      orientation: GM(M, "orientation"),
      dir: GM(M, "dir"),
      onItemFocus: C,
      onItemShiftTab: u,
      onBlur: L,
      onFocus: n,
      onMousedown: j
    }), SI(() => M.currentTabId, (T) => {
      A.value = T != null ? T : null;
    }), zA(e, zo, o);
  }
});
function hh(M, I, g, A, t, D) {
  return dI(M.$slots, "default");
}
var Oh = /* @__PURE__ */ bI(Qh, [["render", hh], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group-impl.vue"]]);
const kh = eI({
  name: "ElRovingFocusGroup",
  components: {
    ElFocusGroupCollection: wh,
    ElRovingFocusGroupImpl: Oh
  }
});
function Ph(M, I, g, A, t, D) {
  const e = xI("el-roving-focus-group-impl"), i = xI("el-focus-group-collection");
  return Y(), DI(i, null, {
    default: F(() => [
      MI(e, bl(Yl(M.$attrs)), {
        default: F(() => [
          dI(M.$slots, "default")
        ]),
        _: 3
      }, 16)
    ]),
    _: 3
  });
}
var fh = /* @__PURE__ */ bI(kh, [["render", Ph], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group.vue"]]);
const Gh = eI({
  components: {
    ElRovingFocusCollectionItem: Eh
  },
  props: {
    focusable: {
      type: Boolean,
      default: !0
    },
    active: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["mousedown", "focus", "keydown"],
  setup(M, { emit: I }) {
    const { currentTabbedId: g, loop: A, onItemFocus: t, onItemShiftTab: D } = yI(yj, void 0), { getItems: e } = yI(lj, void 0), i = rD(), N = h(null), C = AM((L) => {
      I("mousedown", L);
    }, (L) => {
      M.focusable ? t(r(i)) : L.preventDefault();
    }), u = AM((L) => {
      I("focus", L);
    }, () => {
      t(r(i));
    }), j = AM((L) => {
      I("keydown", L);
    }, (L) => {
      const { key: o, shiftKey: T, target: s, currentTarget: S } = L;
      if (o === ZI.tab && T) {
        D();
        return;
      }
      if (s !== S)
        return;
      const y = bh(L);
      if (y) {
        L.preventDefault();
        let a = e().filter((z) => z.focusable).map((z) => z.ref);
        switch (y) {
          case "last": {
            a.reverse();
            break;
          }
          case "prev":
          case "next": {
            y === "prev" && a.reverse();
            const z = a.indexOf(S);
            a = A.value ? Yh(a, z + 1) : a.slice(z + 1);
            break;
          }
        }
        VI(() => {
          cj(a);
        });
      }
    }), n = J(() => g.value === r(i));
    return LM(JS, {
      rovingFocusGroupItemRef: N,
      tabIndex: J(() => r(n) ? 0 : -1),
      handleMousedown: C,
      handleFocus: u,
      handleKeydown: j
    }), {
      id: i,
      handleKeydown: j,
      handleFocus: u,
      handleMousedown: C
    };
  }
});
function Wh(M, I, g, A, t, D) {
  const e = xI("el-roving-focus-collection-item");
  return Y(), DI(e, {
    id: M.id,
    focusable: M.focusable,
    active: M.active
  }, {
    default: F(() => [
      dI(M.$slots, "default")
    ]),
    _: 3
  }, 8, ["id", "focusable", "active"]);
}
var Zh = /* @__PURE__ */ bI(Gh, [["render", Wh], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-item.vue"]]);
const Zi = gM({
  trigger: Oe.trigger,
  effect: {
    ...lg.effect,
    default: "light"
  },
  type: {
    type: mI(String)
  },
  placement: {
    type: mI(String),
    default: "bottom"
  },
  popperOptions: {
    type: mI(Object),
    default: () => ({})
  },
  id: String,
  size: {
    type: String,
    default: ""
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: !0
  },
  loop: {
    type: Boolean,
    default: !0
  },
  showTimeout: {
    type: Number,
    default: 150
  },
  hideTimeout: {
    type: Number,
    default: 150
  },
  tabindex: {
    type: mI([Number, String]),
    default: 0
  },
  maxHeight: {
    type: mI([Number, String]),
    default: ""
  },
  popperClass: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  role: {
    type: String,
    default: "menu"
  },
  buttonProps: {
    type: mI(Object)
  }
}), BS = gM({
  command: {
    type: [Object, String, Number],
    default: () => ({})
  },
  disabled: Boolean,
  divided: Boolean,
  textValue: String,
  icon: {
    type: pe
  }
}), vh = gM({
  onKeydown: { type: mI(Function) }
}), Uh = [
  ZI.down,
  ZI.pageDown,
  ZI.home
], RS = [ZI.up, ZI.pageUp, ZI.end], Jh = [...Uh, ...RS], {
  ElCollection: Bh,
  ElCollectionItem: Rh,
  COLLECTION_INJECTION_KEY: Hh,
  COLLECTION_ITEM_INJECTION_KEY: Vh
} = US("Dropdown"), jC = Symbol("elDropdown"), { ButtonGroup: Fh } = PD, Xh = eI({
  name: "ElDropdown",
  components: {
    ElButton: PD,
    ElButtonGroup: Fh,
    ElScrollbar: rp,
    ElDropdownCollection: Bh,
    ElTooltip: aj,
    ElRovingFocusGroup: fh,
    ElOnlyChild: yS,
    ElIcon: PM,
    ArrowDown: gi
  },
  props: Zi,
  emits: ["visible-change", "click", "command"],
  setup(M, { emit: I }) {
    const g = Lg(), A = vI("dropdown"), { t } = ej(), D = h(), e = h(), i = h(null), N = h(null), C = h(null), u = h(null), j = h(!1), n = [ZI.enter, ZI.space, ZI.down], L = J(() => ({
      maxHeight: rt(M.maxHeight)
    })), o = J(() => [A.m(a.value)]), T = rD().value, s = J(() => M.id || T);
    function S() {
      y();
    }
    function y() {
      var W;
      (W = i.value) == null || W.onClose();
    }
    function x() {
      var W;
      (W = i.value) == null || W.onOpen();
    }
    const a = Ai();
    function z(...W) {
      I("command", ...W);
    }
    function c() {
    }
    function E() {
      const W = r(N);
      W == null || W.focus(), u.value = null;
    }
    function m(W) {
      u.value = W;
    }
    function p(W) {
      j.value || (W.preventDefault(), W.stopImmediatePropagation());
    }
    function V() {
      I("visible-change", !0);
    }
    function U(W) {
      (W == null ? void 0 : W.type) === "keydown" && N.value.focus();
    }
    function gI() {
      I("visible-change", !1);
    }
    return LM(jC, {
      contentRef: N,
      role: J(() => M.role),
      triggerId: s,
      isUsingKeyboard: j,
      onItemEnter: c,
      onItemLeave: E
    }), LM("elDropdown", {
      instance: g,
      dropdownSize: a,
      handleClick: S,
      commandHandler: z,
      trigger: GM(M, "trigger"),
      hideOnClick: GM(M, "hideOnClick")
    }), {
      t,
      ns: A,
      scrollbar: C,
      wrapStyle: L,
      dropdownTriggerKls: o,
      dropdownSize: a,
      triggerId: s,
      triggerKeys: n,
      currentTabId: u,
      handleCurrentTabIdChange: m,
      handlerMainButtonClick: (W) => {
        I("click", W);
      },
      handleEntryFocus: p,
      handleClose: y,
      handleOpen: x,
      handleBeforeShowTooltip: V,
      handleShowTooltip: U,
      handleBeforeHideTooltip: gI,
      onFocusAfterTrapped: (W) => {
        var l, w;
        W.preventDefault(), (w = (l = N.value) == null ? void 0 : l.focus) == null || w.call(l, {
          preventScroll: !0
        });
      },
      popperRef: i,
      contentRef: N,
      triggeringElementRef: D,
      referenceElementRef: e
    };
  }
});
function Kh(M, I, g, A, t, D) {
  var e;
  const i = xI("el-dropdown-collection"), N = xI("el-roving-focus-group"), C = xI("el-scrollbar"), u = xI("el-only-child"), j = xI("el-tooltip"), n = xI("el-button"), L = xI("arrow-down"), o = xI("el-icon"), T = xI("el-button-group");
  return Y(), $("div", {
    class: _([M.ns.b(), M.ns.is("disabled", M.disabled)])
  }, [
    MI(j, {
      ref: "popperRef",
      role: M.role,
      effect: M.effect,
      "fallback-placements": ["bottom", "top"],
      "popper-options": M.popperOptions,
      "gpu-acceleration": !1,
      "hide-after": M.trigger === "hover" ? M.hideTimeout : 0,
      "manual-mode": !0,
      placement: M.placement,
      "popper-class": [M.ns.e("popper"), M.popperClass],
      "reference-element": (e = M.referenceElementRef) == null ? void 0 : e.$el,
      trigger: M.trigger,
      "trigger-keys": M.triggerKeys,
      "trigger-target-el": M.contentRef,
      "show-after": M.trigger === "hover" ? M.showTimeout : 0,
      "stop-popper-mouse-event": !1,
      "virtual-ref": M.triggeringElementRef,
      "virtual-triggering": M.splitButton,
      disabled: M.disabled,
      transition: `${M.ns.namespace.value}-zoom-in-top`,
      teleported: "",
      pure: "",
      persistent: "",
      onBeforeShow: M.handleBeforeShowTooltip,
      onShow: M.handleShowTooltip,
      onBeforeHide: M.handleBeforeHideTooltip
    }, pl({
      content: F(() => [
        MI(C, {
          ref: "scrollbar",
          "wrap-style": M.wrapStyle,
          tag: "div",
          "view-class": M.ns.e("list")
        }, {
          default: F(() => [
            MI(N, {
              loop: M.loop,
              "current-tab-id": M.currentTabId,
              orientation: "horizontal",
              onCurrentTabIdChange: M.handleCurrentTabIdChange,
              onEntryFocus: M.handleEntryFocus
            }, {
              default: F(() => [
                MI(i, null, {
                  default: F(() => [
                    dI(M.$slots, "dropdown")
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }, 8, ["loop", "current-tab-id", "onCurrentTabIdChange", "onEntryFocus"])
          ]),
          _: 3
        }, 8, ["wrap-style", "view-class"])
      ]),
      _: 2
    }, [
      M.splitButton ? void 0 : {
        name: "default",
        fn: F(() => [
          MI(u, {
            id: M.triggerId,
            role: "button",
            tabindex: M.tabindex
          }, {
            default: F(() => [
              dI(M.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "tabindex"])
        ])
      }
    ]), 1032, ["role", "effect", "popper-options", "hide-after", "placement", "popper-class", "reference-element", "trigger", "trigger-keys", "trigger-target-el", "show-after", "virtual-ref", "virtual-triggering", "disabled", "transition", "onBeforeShow", "onShow", "onBeforeHide"]),
    M.splitButton ? (Y(), DI(T, { key: 0 }, {
      default: F(() => [
        MI(n, qM({ ref: "referenceElementRef" }, M.buttonProps, {
          size: M.dropdownSize,
          type: M.type,
          disabled: M.disabled,
          tabindex: M.tabindex,
          onClick: M.handlerMainButtonClick
        }), {
          default: F(() => [
            dI(M.$slots, "default")
          ]),
          _: 3
        }, 16, ["size", "type", "disabled", "tabindex", "onClick"]),
        MI(n, qM({
          id: M.triggerId,
          ref: "triggeringElementRef"
        }, M.buttonProps, {
          role: "button",
          size: M.dropdownSize,
          type: M.type,
          class: M.ns.e("caret-button"),
          disabled: M.disabled,
          tabindex: M.tabindex,
          "aria-label": M.t("el.dropdown.toggleDropdown")
        }), {
          default: F(() => [
            MI(o, {
              class: _(M.ns.e("icon"))
            }, {
              default: F(() => [
                MI(L)
              ]),
              _: 1
            }, 8, ["class"])
          ]),
          _: 1
        }, 16, ["id", "size", "type", "class", "disabled", "tabindex", "aria-label"])
      ]),
      _: 3
    })) : TI("v-if", !0)
  ], 2);
}
var _h = /* @__PURE__ */ bI(Xh, [["render", Kh], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown.vue"]]);
const $h = eI({
  name: "DropdownItemImpl",
  components: {
    ElIcon: PM
  },
  props: BS,
  emits: ["pointermove", "pointerleave", "click", "clickimpl"],
  setup(M, { emit: I }) {
    const g = vI("dropdown"), { role: A } = yI(jC, void 0), { collectionItemRef: t } = yI(Vh, void 0), { collectionItemRef: D } = yI(dh, void 0), {
      rovingFocusGroupItemRef: e,
      tabIndex: i,
      handleFocus: N,
      handleKeydown: C,
      handleMousedown: u
    } = yI(JS, void 0), j = MS(t, D, e), n = J(() => A.value === "menu" ? "menuitem" : A.value === "navigation" ? "link" : "button"), L = AM((o) => {
      const { code: T } = o;
      if (T === ZI.enter || T === ZI.space)
        return o.preventDefault(), o.stopImmediatePropagation(), I("clickimpl", o), !0;
    }, C);
    return {
      ns: g,
      itemRef: j,
      dataset: {
        [vS]: ""
      },
      role: n,
      tabIndex: i,
      handleFocus: N,
      handleKeydown: L,
      handleMousedown: u
    };
  }
}), qh = ["aria-disabled", "tabindex", "role"];
function IO(M, I, g, A, t, D) {
  const e = xI("el-icon");
  return Y(), $(iM, null, [
    M.divided ? (Y(), $("li", qM({
      key: 0,
      role: "separator",
      class: M.ns.bem("menu", "item", "divided")
    }, M.$attrs), null, 16)) : TI("v-if", !0),
    f("li", qM({ ref: M.itemRef }, { ...M.dataset, ...M.$attrs }, {
      "aria-disabled": M.disabled,
      class: [M.ns.be("menu", "item"), M.ns.is("disabled", M.disabled)],
      tabindex: M.tabIndex,
      role: M.role,
      onClick: I[0] || (I[0] = (i) => M.$emit("clickimpl", i)),
      onFocus: I[1] || (I[1] = (...i) => M.handleFocus && M.handleFocus(...i)),
      onKeydown: I[2] || (I[2] = (...i) => M.handleKeydown && M.handleKeydown(...i)),
      onMousedown: I[3] || (I[3] = (...i) => M.handleMousedown && M.handleMousedown(...i)),
      onPointermove: I[4] || (I[4] = (i) => M.$emit("pointermove", i)),
      onPointerleave: I[5] || (I[5] = (i) => M.$emit("pointerleave", i))
    }), [
      M.icon ? (Y(), DI(e, { key: 0 }, {
        default: F(() => [
          (Y(), DI($M(M.icon)))
        ]),
        _: 1
      })) : TI("v-if", !0),
      dI(M.$slots, "default")
    ], 16, qh)
  ], 64);
}
var MO = /* @__PURE__ */ bI($h, [["render", IO], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item-impl.vue"]]);
const HS = () => {
  const M = yI("elDropdown", {}), I = J(() => M == null ? void 0 : M.dropdownSize);
  return {
    elDropdown: M,
    _elDropdownSize: I
  };
}, gO = eI({
  name: "ElDropdownItem",
  components: {
    ElDropdownCollectionItem: Rh,
    ElRovingFocusItem: Zh,
    ElDropdownItemImpl: MO
  },
  inheritAttrs: !1,
  props: BS,
  emits: ["pointermove", "pointerleave", "click"],
  setup(M, { emit: I, attrs: g }) {
    const { elDropdown: A } = HS(), t = Lg(), D = h(null), e = J(() => {
      var L, o;
      return (o = (L = r(D)) == null ? void 0 : L.textContent) != null ? o : "";
    }), { onItemEnter: i, onItemLeave: N } = yI(jC, void 0), C = AM((L) => (I("pointermove", L), L.defaultPrevented), pL((L) => {
      var o;
      M.disabled ? N(L) : (i(L), L.defaultPrevented || (o = L.currentTarget) == null || o.focus());
    })), u = AM((L) => (I("pointerleave", L), L.defaultPrevented), pL((L) => {
      N(L);
    })), j = AM((L) => (I("click", L), L.type !== "keydown" && L.defaultPrevented), (L) => {
      var o, T, s;
      if (M.disabled) {
        L.stopImmediatePropagation();
        return;
      }
      (o = A == null ? void 0 : A.hideOnClick) != null && o.value && ((T = A.handleClick) == null || T.call(A)), (s = A.commandHandler) == null || s.call(A, M.command, t, L);
    }), n = J(() => ({ ...M, ...g }));
    return {
      handleClick: j,
      handlePointerMove: C,
      handlePointerLeave: u,
      textContent: e,
      propsAndAttrs: n
    };
  }
});
function AO(M, I, g, A, t, D) {
  var e;
  const i = xI("el-dropdown-item-impl"), N = xI("el-roving-focus-item"), C = xI("el-dropdown-collection-item");
  return Y(), DI(C, {
    disabled: M.disabled,
    "text-value": (e = M.textValue) != null ? e : M.textContent
  }, {
    default: F(() => [
      MI(N, {
        focusable: !M.disabled
      }, {
        default: F(() => [
          MI(i, qM(M.propsAndAttrs, {
            onPointerleave: M.handlePointerLeave,
            onPointermove: M.handlePointerMove,
            onClickimpl: M.handleClick
          }), {
            default: F(() => [
              dI(M.$slots, "default")
            ]),
            _: 3
          }, 16, ["onPointerleave", "onPointermove", "onClickimpl"])
        ]),
        _: 3
      }, 8, ["focusable"])
    ]),
    _: 3
  }, 8, ["disabled", "text-value"]);
}
var VS = /* @__PURE__ */ bI(gO, [["render", AO], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item.vue"]]);
const tO = eI({
  name: "ElDropdownMenu",
  props: vh,
  setup(M) {
    const I = vI("dropdown"), { _elDropdownSize: g } = HS(), A = g.value, { focusTrapRef: t, onKeydown: D } = yI(kS, void 0), { contentRef: e, role: i, triggerId: N } = yI(jC, void 0), { collectionRef: C, getItems: u } = yI(Hh, void 0), {
      rovingFocusGroupRef: j,
      rovingFocusGroupRootStyle: n,
      tabIndex: L,
      onBlur: o,
      onFocus: T,
      onMousedown: s
    } = yI(yj, void 0), { collectionRef: S } = yI(lj, void 0), y = J(() => [I.b("menu"), I.bm("menu", A == null ? void 0 : A.value)]), x = MS(e, C, t, j, S), a = AM((c) => {
      var E;
      (E = M.onKeydown) == null || E.call(M, c);
    }, (c) => {
      const { currentTarget: E, code: m, target: p } = c;
      if (E.contains(p), ZI.tab === m && c.stopImmediatePropagation(), c.preventDefault(), p !== r(e) || !Jh.includes(m))
        return;
      const U = u().filter((gI) => !gI.disabled).map((gI) => gI.ref);
      RS.includes(m) && U.reverse(), cj(U);
    });
    return {
      size: A,
      rovingFocusGroupRootStyle: n,
      tabIndex: L,
      dropdownKls: y,
      role: i,
      triggerId: N,
      dropdownListWrapperRef: x,
      handleKeydown: (c) => {
        a(c), D(c);
      },
      onBlur: o,
      onFocus: T,
      onMousedown: s
    };
  }
}), DO = ["role", "aria-labelledby"];
function eO(M, I, g, A, t, D) {
  return Y(), $("ul", {
    ref: M.dropdownListWrapperRef,
    class: _(M.dropdownKls),
    style: BI(M.rovingFocusGroupRootStyle),
    tabindex: -1,
    role: M.role,
    "aria-labelledby": M.triggerId,
    onBlur: I[0] || (I[0] = (...e) => M.onBlur && M.onBlur(...e)),
    onFocus: I[1] || (I[1] = (...e) => M.onFocus && M.onFocus(...e)),
    onKeydown: I[2] || (I[2] = (...e) => M.handleKeydown && M.handleKeydown(...e)),
    onMousedown: I[3] || (I[3] = (...e) => M.onMousedown && M.onMousedown(...e))
  }, [
    dI(M.$slots, "default")
  ], 46, DO);
}
var FS = /* @__PURE__ */ bI(tO, [["render", eO], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-menu.vue"]]);
const xj = JA(_h, {
  DropdownItem: VS,
  DropdownMenu: FS
}), rj = Ij(VS), wj = Ij(FS), iO = gM({
  trigger: Oe.trigger,
  placement: Zi.placement,
  disabled: Oe.disabled,
  visible: lg.visible,
  transition: lg.transition,
  popperOptions: Zi.popperOptions,
  tabindex: Zi.tabindex,
  content: lg.content,
  popperStyle: lg.popperStyle,
  popperClass: lg.popperClass,
  enterable: {
    ...lg.enterable,
    default: !0
  },
  effect: {
    ...lg.effect,
    default: "light"
  },
  teleported: lg.teleported,
  title: String,
  width: {
    type: [String, Number],
    default: 150
  },
  offset: {
    type: Number,
    default: void 0
  },
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  },
  showArrow: {
    type: Boolean,
    default: !0
  },
  persistent: {
    type: Boolean,
    default: !0
  },
  "onUpdate:visible": {
    type: Function
  }
}), NO = {
  "update:visible": (M) => mN(M),
  "before-enter": () => !0,
  "before-leave": () => !0,
  "after-enter": () => !0,
  "after-leave": () => !0
}, CO = {
  name: "ElPopover"
}, uO = /* @__PURE__ */ eI({
  ...CO,
  props: iO,
  emits: NO,
  setup(M, { expose: I, emit: g }) {
    const A = M, t = "onUpdate:visible", D = J(() => A[t]), e = vI("popover"), i = h(), N = J(() => {
      var S;
      return (S = r(i)) == null ? void 0 : S.popperRef;
    }), C = J(() => [
      {
        width: rt(A.width)
      },
      A.popperStyle
    ]), u = J(() => [e.b(), A.popperClass, { [e.m("plain")]: !!A.content }]), j = J(() => A.transition === `${e.namespace.value}-fade-in-linear`), n = () => {
      var S;
      (S = i.value) == null || S.hide();
    }, L = () => {
      g("before-enter");
    }, o = () => {
      g("before-leave");
    }, T = () => {
      g("after-enter");
    }, s = () => {
      g("update:visible", !1), g("after-leave");
    };
    return I({
      popperRef: N,
      hide: n
    }), (S, y) => (Y(), DI(r(aj), qM({
      ref_key: "tooltipRef",
      ref: i
    }, S.$attrs, {
      trigger: S.trigger,
      placement: S.placement,
      disabled: S.disabled,
      visible: S.visible,
      transition: S.transition,
      "popper-options": S.popperOptions,
      tabindex: S.tabindex,
      content: S.content,
      offset: S.offset,
      "show-after": S.showAfter,
      "hide-after": S.hideAfter,
      "auto-close": S.autoClose,
      "show-arrow": S.showArrow,
      "aria-label": S.title,
      effect: S.effect,
      enterable: S.enterable,
      "popper-class": r(u),
      "popper-style": r(C),
      teleported: S.teleported,
      persistent: S.persistent,
      "gpu-acceleration": r(j),
      "onUpdate:visible": r(D),
      onBeforeShow: L,
      onBeforeHide: o,
      onShow: T,
      onHide: s
    }), {
      content: F(() => [
        S.title ? (Y(), $("div", {
          key: 0,
          class: _(r(e).e("title")),
          role: "title"
        }, IM(S.title), 3)) : TI("v-if", !0),
        dI(S.$slots, "default", {}, () => [
          Zg(IM(S.content), 1)
        ])
      ]),
      default: F(() => [
        S.$slots.reference ? dI(S.$slots, "reference", { key: 0 }) : TI("v-if", !0)
      ]),
      _: 3
    }, 16, ["trigger", "placement", "disabled", "visible", "transition", "popper-options", "tabindex", "content", "offset", "show-after", "hide-after", "auto-close", "show-arrow", "aria-label", "effect", "enterable", "popper-class", "popper-style", "teleported", "persistent", "gpu-acceleration", "onUpdate:visible"]));
  }
});
var jO = /* @__PURE__ */ bI(uO, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popover/src/popover.vue"]]);
const mo = (M, I) => {
  const g = I.arg || I.value, A = g == null ? void 0 : g.popperRef;
  A && (A.triggerRef = M);
};
var nO = {
  mounted(M, I) {
    mo(M, I);
  },
  updated(M, I) {
    mo(M, I);
  }
};
const LO = "popover", oO = uY(nO, LO), Ej = JA(jO, {
  directive: oO
}), TO = eI({
  name: "ElMessageBox",
  directives: {
    TrapFocus: U1
  },
  components: {
    ElButton: PD,
    ElFocusTrap: PS,
    ElInput: ij,
    ElOverlay: sh,
    ElIcon: PM,
    ...NY
  },
  inheritAttrs: !1,
  props: {
    buttonSize: {
      type: String,
      validator: AS
    },
    modal: {
      type: Boolean,
      default: !0
    },
    lockScroll: {
      type: Boolean,
      default: !0
    },
    showClose: {
      type: Boolean,
      default: !0
    },
    closeOnClickModal: {
      type: Boolean,
      default: !0
    },
    closeOnPressEscape: {
      type: Boolean,
      default: !0
    },
    closeOnHashChange: {
      type: Boolean,
      default: !0
    },
    center: Boolean,
    draggable: Boolean,
    roundButton: {
      default: !1,
      type: Boolean
    },
    container: {
      type: String,
      default: "body"
    },
    boxType: {
      type: String,
      default: ""
    }
  },
  emits: ["vanish", "action"],
  setup(M, { emit: I }) {
    const { t: g } = ej(), A = vI("message-box"), t = h(!1), { nextZIndex: D } = SS(), e = QD({
      autofocus: !0,
      beforeClose: null,
      callback: null,
      cancelButtonText: "",
      cancelButtonClass: "",
      confirmButtonText: "",
      confirmButtonClass: "",
      customClass: "",
      customStyle: {},
      dangerouslyUseHTMLString: !1,
      distinguishCancelAndClose: !1,
      icon: "",
      inputPattern: null,
      inputPlaceholder: "",
      inputType: "text",
      inputValue: null,
      inputValidator: null,
      inputErrorMessage: "",
      message: null,
      modalFade: !0,
      modalClass: "",
      showCancelButton: !1,
      showConfirmButton: !0,
      type: "",
      title: void 0,
      showInput: !1,
      action: "",
      confirmButtonLoading: !1,
      cancelButtonLoading: !1,
      confirmButtonDisabled: !1,
      editorErrorMessage: "",
      validateError: !1,
      zIndex: D()
    }), i = J(() => {
      const R = e.type;
      return { [A.bm("icon", R)]: R && GL[R] };
    }), N = rD(), C = rD(), u = Ai(J(() => M.buttonSize), { prop: !0, form: !0, formItem: !0 }), j = J(() => e.icon || GL[e.type] || ""), n = J(() => !!e.message), L = h(), o = h(), T = h(), s = h(), S = h(), y = J(() => e.confirmButtonClass);
    SI(() => e.inputValue, async (R) => {
      await VI(), M.boxType === "prompt" && R !== null && p();
    }, { immediate: !0 }), SI(() => t.value, (R) => {
      var H, W;
      R && (M.boxType !== "prompt" && (e.autofocus ? T.value = (W = (H = S.value) == null ? void 0 : H.$el) != null ? W : L.value : T.value = L.value), e.zIndex = D()), M.boxType === "prompt" && (R ? VI().then(() => {
        var l;
        s.value && s.value.$el && (e.autofocus ? T.value = (l = V()) != null ? l : L.value : T.value = L.value);
      }) : (e.editorErrorMessage = "", e.validateError = !1));
    });
    const x = J(() => M.draggable);
    lY(L, o, x), RI(async () => {
      await VI(), M.closeOnHashChange && window.addEventListener("hashchange", a);
    }), kM(() => {
      M.closeOnHashChange && window.removeEventListener("hashchange", a);
    });
    function a() {
      !t.value || (t.value = !1, VI(() => {
        e.action && I("action", e.action);
      }));
    }
    const z = () => {
      M.closeOnClickModal && m(e.distinguishCancelAndClose ? "close" : "cancel");
    }, c = LS(z), E = (R) => {
      if (e.inputType !== "textarea")
        return R.preventDefault(), m("confirm");
    }, m = (R) => {
      var H;
      M.boxType === "prompt" && R === "confirm" && !p() || (e.action = R, e.beforeClose ? (H = e.beforeClose) == null || H.call(e, R, e, a) : a());
    }, p = () => {
      if (M.boxType === "prompt") {
        const R = e.inputPattern;
        if (R && !R.test(e.inputValue || ""))
          return e.editorErrorMessage = e.inputErrorMessage || g("el.messagebox.error"), e.validateError = !0, !1;
        const H = e.inputValidator;
        if (typeof H == "function") {
          const W = H(e.inputValue);
          if (W === !1)
            return e.editorErrorMessage = e.inputErrorMessage || g("el.messagebox.error"), e.validateError = !0, !1;
          if (typeof W == "string")
            return e.editorErrorMessage = W, e.validateError = !0, !1;
        }
      }
      return e.editorErrorMessage = "", e.validateError = !1, !0;
    }, V = () => {
      const R = s.value.$refs;
      return R.input || R.textarea;
    }, U = () => {
      m("close");
    }, gI = () => {
      M.closeOnPressEscape && U();
    };
    return M.lockScroll && kY(t), WY(t), {
      ...bT(e),
      ns: A,
      overlayEvent: c,
      visible: t,
      hasMessage: n,
      typeClass: i,
      contentId: N,
      inputId: C,
      btnSize: u,
      iconComponent: j,
      confirmButtonClasses: y,
      rootRef: L,
      focusStartRef: T,
      headerRef: o,
      inputRef: s,
      confirmRef: S,
      doClose: a,
      handleClose: U,
      onCloseRequested: gI,
      handleWrapperClick: z,
      handleInputEnter: E,
      handleAction: m,
      t: g
    };
  }
}), sO = ["aria-label", "aria-describedby"], SO = ["aria-label"], aO = ["id"];
function lO(M, I, g, A, t, D) {
  const e = xI("el-icon"), i = xI("close"), N = xI("el-input"), C = xI("el-button"), u = xI("el-focus-trap"), j = xI("el-overlay");
  return Y(), DI(uu, {
    name: "fade-in-linear",
    onAfterLeave: I[11] || (I[11] = (n) => M.$emit("vanish")),
    persisted: ""
  }, {
    default: F(() => [
      ig(MI(j, {
        "z-index": M.zIndex,
        "overlay-class": [M.ns.is("message-box"), M.modalClass],
        mask: M.modal
      }, {
        default: F(() => [
          f("div", {
            role: "dialog",
            "aria-label": M.title,
            "aria-modal": "true",
            "aria-describedby": M.showInput ? void 0 : M.contentId,
            class: _(`${M.ns.namespace.value}-overlay-message-box`),
            onClick: I[8] || (I[8] = (...n) => M.overlayEvent.onClick && M.overlayEvent.onClick(...n)),
            onMousedown: I[9] || (I[9] = (...n) => M.overlayEvent.onMousedown && M.overlayEvent.onMousedown(...n)),
            onMouseup: I[10] || (I[10] = (...n) => M.overlayEvent.onMouseup && M.overlayEvent.onMouseup(...n))
          }, [
            MI(u, {
              loop: "",
              trapped: M.visible,
              "focus-trap-el": M.rootRef,
              "focus-start-el": M.focusStartRef,
              onReleaseRequested: M.onCloseRequested
            }, {
              default: F(() => [
                f("div", {
                  ref: "rootRef",
                  class: _([
                    M.ns.b(),
                    M.customClass,
                    M.ns.is("draggable", M.draggable),
                    { [M.ns.m("center")]: M.center }
                  ]),
                  style: BI(M.customStyle),
                  tabindex: "-1",
                  onClick: I[7] || (I[7] = _D(() => {
                  }, ["stop"]))
                }, [
                  M.title !== null && M.title !== void 0 ? (Y(), $("div", {
                    key: 0,
                    ref: "headerRef",
                    class: _(M.ns.e("header"))
                  }, [
                    f("div", {
                      class: _(M.ns.e("title"))
                    }, [
                      M.iconComponent && M.center ? (Y(), DI(e, {
                        key: 0,
                        class: _([M.ns.e("status"), M.typeClass])
                      }, {
                        default: F(() => [
                          (Y(), DI($M(M.iconComponent)))
                        ]),
                        _: 1
                      }, 8, ["class"])) : TI("v-if", !0),
                      f("span", null, IM(M.title), 1)
                    ], 2),
                    M.showClose ? (Y(), $("button", {
                      key: 0,
                      type: "button",
                      class: _(M.ns.e("headerbtn")),
                      "aria-label": M.t("el.messagebox.close"),
                      onClick: I[0] || (I[0] = (n) => M.handleAction(M.distinguishCancelAndClose ? "close" : "cancel")),
                      onKeydown: I[1] || (I[1] = Bt(_D((n) => M.handleAction(M.distinguishCancelAndClose ? "close" : "cancel"), ["prevent"]), ["enter"]))
                    }, [
                      MI(e, {
                        class: _(M.ns.e("close"))
                      }, {
                        default: F(() => [
                          MI(i)
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ], 42, SO)) : TI("v-if", !0)
                  ], 2)) : TI("v-if", !0),
                  f("div", {
                    id: M.contentId,
                    class: _(M.ns.e("content"))
                  }, [
                    f("div", {
                      class: _(M.ns.e("container"))
                    }, [
                      M.iconComponent && !M.center && M.hasMessage ? (Y(), DI(e, {
                        key: 0,
                        class: _([M.ns.e("status"), M.typeClass])
                      }, {
                        default: F(() => [
                          (Y(), DI($M(M.iconComponent)))
                        ]),
                        _: 1
                      }, 8, ["class"])) : TI("v-if", !0),
                      M.hasMessage ? (Y(), $("div", {
                        key: 1,
                        class: _(M.ns.e("message"))
                      }, [
                        dI(M.$slots, "default", {}, () => [
                          M.dangerouslyUseHTMLString ? (Y(), DI($M(M.showInput ? "label" : "p"), {
                            key: 1,
                            for: M.showInput ? M.inputId : void 0,
                            innerHTML: M.message
                          }, null, 8, ["for", "innerHTML"])) : (Y(), DI($M(M.showInput ? "label" : "p"), {
                            key: 0,
                            for: M.showInput ? M.inputId : void 0
                          }, {
                            default: F(() => [
                              Zg(IM(M.dangerouslyUseHTMLString ? "" : M.message), 1)
                            ]),
                            _: 1
                          }, 8, ["for"]))
                        ])
                      ], 2)) : TI("v-if", !0)
                    ], 2),
                    ig(f("div", {
                      class: _(M.ns.e("input"))
                    }, [
                      MI(N, {
                        id: M.inputId,
                        ref: "inputRef",
                        modelValue: M.inputValue,
                        "onUpdate:modelValue": I[2] || (I[2] = (n) => M.inputValue = n),
                        type: M.inputType,
                        placeholder: M.inputPlaceholder,
                        "aria-invalid": M.validateError,
                        class: _({ invalid: M.validateError }),
                        onKeydown: Bt(M.handleInputEnter, ["enter"])
                      }, null, 8, ["id", "modelValue", "type", "placeholder", "aria-invalid", "class", "onKeydown"]),
                      f("div", {
                        class: _(M.ns.e("errormsg")),
                        style: BI({
                          visibility: M.editorErrorMessage ? "visible" : "hidden"
                        })
                      }, IM(M.editorErrorMessage), 7)
                    ], 2), [
                      [Dt, M.showInput]
                    ])
                  ], 10, aO),
                  f("div", {
                    class: _(M.ns.e("btns"))
                  }, [
                    M.showCancelButton ? (Y(), DI(C, {
                      key: 0,
                      loading: M.cancelButtonLoading,
                      class: _([M.cancelButtonClass]),
                      round: M.roundButton,
                      size: M.btnSize,
                      onClick: I[3] || (I[3] = (n) => M.handleAction("cancel")),
                      onKeydown: I[4] || (I[4] = Bt(_D((n) => M.handleAction("cancel"), ["prevent"]), ["enter"]))
                    }, {
                      default: F(() => [
                        Zg(IM(M.cancelButtonText || M.t("el.messagebox.cancel")), 1)
                      ]),
                      _: 1
                    }, 8, ["loading", "class", "round", "size"])) : TI("v-if", !0),
                    ig(MI(C, {
                      ref: "confirmRef",
                      type: "primary",
                      loading: M.confirmButtonLoading,
                      class: _([M.confirmButtonClasses]),
                      round: M.roundButton,
                      disabled: M.confirmButtonDisabled,
                      size: M.btnSize,
                      onClick: I[5] || (I[5] = (n) => M.handleAction("confirm")),
                      onKeydown: I[6] || (I[6] = Bt(_D((n) => M.handleAction("confirm"), ["prevent"]), ["enter"]))
                    }, {
                      default: F(() => [
                        Zg(IM(M.confirmButtonText || M.t("el.messagebox.confirm")), 1)
                      ]),
                      _: 1
                    }, 8, ["loading", "class", "round", "disabled", "size"]), [
                      [Dt, M.showConfirmButton]
                    ])
                  ], 2)
                ], 6)
              ]),
              _: 3
            }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onReleaseRequested"])
          ], 42, sO)
        ]),
        _: 3
      }, 8, ["z-index", "overlay-class", "mask"]), [
        [Dt, M.visible]
      ])
    ]),
    _: 3
  });
}
var yO = /* @__PURE__ */ bI(TO, [["render", lO], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/message-box/src/index.vue"]]);
const Pe = /* @__PURE__ */ new Map(), cO = (M, I, g = null) => {
  const A = MI(yO, M, mA(M.message) || pT(M.message) ? {
    default: mA(M.message) ? M.message : () => M.message
  } : null);
  return A.appContext = g, QT(A, I), document.body.appendChild(I.firstElementChild), A.component;
}, xO = () => document.createElement("div"), rO = (M, I) => {
  const g = xO();
  M.onVanish = () => {
    QT(null, g), Pe.delete(t);
  }, M.onAction = (D) => {
    const e = Pe.get(t);
    let i;
    M.showInput ? i = { value: t.inputValue, action: D } : i = D, M.callback ? M.callback(i, A.proxy) : D === "cancel" || D === "close" ? M.distinguishCancelAndClose && D !== "cancel" ? e.reject("close") : e.reject("cancel") : e.resolve(i);
  };
  const A = cO(M, g, I), t = A.proxy;
  for (const D in M)
    xD(M, D) && !xD(t.$props, D) && (t[D] = M[D]);
  return t.visible = !0, t;
};
function fD(M, I = null) {
  if (!jM)
    return Promise.reject();
  let g;
  return jt(M) || pT(M) ? M = {
    message: M
  } : g = M.callback, new Promise((A, t) => {
    const D = rO(M, I != null ? I : fD._context);
    Pe.set(D, {
      options: M,
      callback: g,
      resolve: A,
      reject: t
    });
  });
}
const wO = ["alert", "confirm", "prompt"], EO = {
  alert: { closeOnPressEscape: !1, closeOnClickModal: !1 },
  confirm: { showCancelButton: !0 },
  prompt: { showCancelButton: !0, showInput: !0 }
};
wO.forEach((M) => {
  fD[M] = dO(M);
});
function dO(M) {
  return (I, g, A, t) => {
    let D = "";
    return xt(g) ? (A = g, D = "") : bN(g) ? D = "" : D = g, fD(Object.assign({
      title: D,
      message: I,
      type: "",
      ...EO[M]
    }, A, {
      boxType: M
    }), t);
  };
}
fD.close = () => {
  Pe.forEach((M, I) => {
    I.doClose();
  }), Pe.clear();
};
fD._context = null;
const sA = fD;
sA.install = (M) => {
  sA._context = M._context, M.config.globalProperties.$msgbox = sA, M.config.globalProperties.$messageBox = sA, M.config.globalProperties.$alert = sA.alert, M.config.globalProperties.$confirm = sA.confirm, M.config.globalProperties.$prompt = sA.prompt;
};
const zO = sA;
var mO = { value: () => {
} };
function XS() {
  for (var M = 0, I = arguments.length, g = {}, A; M < I; ++M) {
    if (!(A = arguments[M] + "") || A in g || /[\s.]/.test(A))
      throw new Error("illegal type: " + A);
    g[A] = [];
  }
  return new vi(g);
}
function vi(M) {
  this._ = M;
}
function bO(M, I) {
  return M.trim().split(/^|\s+/).map(function(g) {
    var A = "", t = g.indexOf(".");
    if (t >= 0 && (A = g.slice(t + 1), g = g.slice(0, t)), g && !I.hasOwnProperty(g))
      throw new Error("unknown type: " + g);
    return { type: g, name: A };
  });
}
vi.prototype = XS.prototype = {
  constructor: vi,
  on: function(M, I) {
    var g = this._, A = bO(M + "", g), t, D = -1, e = A.length;
    if (arguments.length < 2) {
      for (; ++D < e; )
        if ((t = (M = A[D]).type) && (t = YO(g[t], M.name)))
          return t;
      return;
    }
    if (I != null && typeof I != "function")
      throw new Error("invalid callback: " + I);
    for (; ++D < e; )
      if (t = (M = A[D]).type)
        g[t] = bo(g[t], M.name, I);
      else if (I == null)
        for (t in g)
          g[t] = bo(g[t], M.name, null);
    return this;
  },
  copy: function() {
    var M = {}, I = this._;
    for (var g in I)
      M[g] = I[g].slice();
    return new vi(M);
  },
  call: function(M, I) {
    if ((t = arguments.length - 2) > 0)
      for (var g = new Array(t), A = 0, t, D; A < t; ++A)
        g[A] = arguments[A + 2];
    if (!this._.hasOwnProperty(M))
      throw new Error("unknown type: " + M);
    for (D = this._[M], A = 0, t = D.length; A < t; ++A)
      D[A].value.apply(I, g);
  },
  apply: function(M, I, g) {
    if (!this._.hasOwnProperty(M))
      throw new Error("unknown type: " + M);
    for (var A = this._[M], t = 0, D = A.length; t < D; ++t)
      A[t].value.apply(I, g);
  }
};
function YO(M, I) {
  for (var g = 0, A = M.length, t; g < A; ++g)
    if ((t = M[g]).name === I)
      return t.value;
}
function bo(M, I, g) {
  for (var A = 0, t = M.length; A < t; ++A)
    if (M[A].name === I) {
      M[A] = mO, M = M.slice(0, A).concat(M.slice(A + 1));
      break;
    }
  return g != null && M.push({ name: I, value: g }), M;
}
var V0 = "http://www.w3.org/1999/xhtml";
const Yo = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: V0,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function nC(M) {
  var I = M += "", g = I.indexOf(":");
  return g >= 0 && (I = M.slice(0, g)) !== "xmlns" && (M = M.slice(g + 1)), Yo.hasOwnProperty(I) ? { space: Yo[I], local: M } : M;
}
function pO(M) {
  return function() {
    var I = this.ownerDocument, g = this.namespaceURI;
    return g === V0 && I.documentElement.namespaceURI === V0 ? I.createElement(M) : I.createElementNS(g, M);
  };
}
function QO(M) {
  return function() {
    return this.ownerDocument.createElementNS(M.space, M.local);
  };
}
function KS(M) {
  var I = nC(M);
  return (I.local ? QO : pO)(I);
}
function hO() {
}
function dj(M) {
  return M == null ? hO : function() {
    return this.querySelector(M);
  };
}
function OO(M) {
  typeof M != "function" && (M = dj(M));
  for (var I = this._groups, g = I.length, A = new Array(g), t = 0; t < g; ++t)
    for (var D = I[t], e = D.length, i = A[t] = new Array(e), N, C, u = 0; u < e; ++u)
      (N = D[u]) && (C = M.call(N, N.__data__, u, D)) && ("__data__" in N && (C.__data__ = N.__data__), i[u] = C);
  return new Mg(A, this._parents);
}
function kO(M) {
  return M == null ? [] : Array.isArray(M) ? M : Array.from(M);
}
function PO() {
  return [];
}
function _S(M) {
  return M == null ? PO : function() {
    return this.querySelectorAll(M);
  };
}
function fO(M) {
  return function() {
    return kO(M.apply(this, arguments));
  };
}
function GO(M) {
  typeof M == "function" ? M = fO(M) : M = _S(M);
  for (var I = this._groups, g = I.length, A = [], t = [], D = 0; D < g; ++D)
    for (var e = I[D], i = e.length, N, C = 0; C < i; ++C)
      (N = e[C]) && (A.push(M.call(N, N.__data__, C, e)), t.push(N));
  return new Mg(A, t);
}
function $S(M) {
  return function() {
    return this.matches(M);
  };
}
function qS(M) {
  return function(I) {
    return I.matches(M);
  };
}
var WO = Array.prototype.find;
function ZO(M) {
  return function() {
    return WO.call(this.children, M);
  };
}
function vO() {
  return this.firstElementChild;
}
function UO(M) {
  return this.select(M == null ? vO : ZO(typeof M == "function" ? M : qS(M)));
}
var JO = Array.prototype.filter;
function BO() {
  return Array.from(this.children);
}
function RO(M) {
  return function() {
    return JO.call(this.children, M);
  };
}
function HO(M) {
  return this.selectAll(M == null ? BO : RO(typeof M == "function" ? M : qS(M)));
}
function VO(M) {
  typeof M != "function" && (M = $S(M));
  for (var I = this._groups, g = I.length, A = new Array(g), t = 0; t < g; ++t)
    for (var D = I[t], e = D.length, i = A[t] = [], N, C = 0; C < e; ++C)
      (N = D[C]) && M.call(N, N.__data__, C, D) && i.push(N);
  return new Mg(A, this._parents);
}
function Ia(M) {
  return new Array(M.length);
}
function FO() {
  return new Mg(this._enter || this._groups.map(Ia), this._parents);
}
function QN(M, I) {
  this.ownerDocument = M.ownerDocument, this.namespaceURI = M.namespaceURI, this._next = null, this._parent = M, this.__data__ = I;
}
QN.prototype = {
  constructor: QN,
  appendChild: function(M) {
    return this._parent.insertBefore(M, this._next);
  },
  insertBefore: function(M, I) {
    return this._parent.insertBefore(M, I);
  },
  querySelector: function(M) {
    return this._parent.querySelector(M);
  },
  querySelectorAll: function(M) {
    return this._parent.querySelectorAll(M);
  }
};
function XO(M) {
  return function() {
    return M;
  };
}
function KO(M, I, g, A, t, D) {
  for (var e = 0, i, N = I.length, C = D.length; e < C; ++e)
    (i = I[e]) ? (i.__data__ = D[e], A[e] = i) : g[e] = new QN(M, D[e]);
  for (; e < N; ++e)
    (i = I[e]) && (t[e] = i);
}
function _O(M, I, g, A, t, D, e) {
  var i, N, C = /* @__PURE__ */ new Map(), u = I.length, j = D.length, n = new Array(u), L;
  for (i = 0; i < u; ++i)
    (N = I[i]) && (n[i] = L = e.call(N, N.__data__, i, I) + "", C.has(L) ? t[i] = N : C.set(L, N));
  for (i = 0; i < j; ++i)
    L = e.call(M, D[i], i, D) + "", (N = C.get(L)) ? (A[i] = N, N.__data__ = D[i], C.delete(L)) : g[i] = new QN(M, D[i]);
  for (i = 0; i < u; ++i)
    (N = I[i]) && C.get(n[i]) === N && (t[i] = N);
}
function $O(M) {
  return M.__data__;
}
function qO(M, I) {
  if (!arguments.length)
    return Array.from(this, $O);
  var g = I ? _O : KO, A = this._parents, t = this._groups;
  typeof M != "function" && (M = XO(M));
  for (var D = t.length, e = new Array(D), i = new Array(D), N = new Array(D), C = 0; C < D; ++C) {
    var u = A[C], j = t[C], n = j.length, L = Ik(M.call(u, u && u.__data__, C, A)), o = L.length, T = i[C] = new Array(o), s = e[C] = new Array(o), S = N[C] = new Array(n);
    g(u, j, T, s, S, L, I);
    for (var y = 0, x = 0, a, z; y < o; ++y)
      if (a = T[y]) {
        for (y >= x && (x = y + 1); !(z = s[x]) && ++x < o; )
          ;
        a._next = z || null;
      }
  }
  return e = new Mg(e, A), e._enter = i, e._exit = N, e;
}
function Ik(M) {
  return typeof M == "object" && "length" in M ? M : Array.from(M);
}
function Mk() {
  return new Mg(this._exit || this._groups.map(Ia), this._parents);
}
function gk(M, I, g) {
  var A = this.enter(), t = this, D = this.exit();
  return typeof M == "function" ? (A = M(A), A && (A = A.selection())) : A = A.append(M + ""), I != null && (t = I(t), t && (t = t.selection())), g == null ? D.remove() : g(D), A && t ? A.merge(t).order() : t;
}
function Ak(M) {
  for (var I = M.selection ? M.selection() : M, g = this._groups, A = I._groups, t = g.length, D = A.length, e = Math.min(t, D), i = new Array(t), N = 0; N < e; ++N)
    for (var C = g[N], u = A[N], j = C.length, n = i[N] = new Array(j), L, o = 0; o < j; ++o)
      (L = C[o] || u[o]) && (n[o] = L);
  for (; N < t; ++N)
    i[N] = g[N];
  return new Mg(i, this._parents);
}
function tk() {
  for (var M = this._groups, I = -1, g = M.length; ++I < g; )
    for (var A = M[I], t = A.length - 1, D = A[t], e; --t >= 0; )
      (e = A[t]) && (D && e.compareDocumentPosition(D) ^ 4 && D.parentNode.insertBefore(e, D), D = e);
  return this;
}
function Dk(M) {
  M || (M = ek);
  function I(j, n) {
    return j && n ? M(j.__data__, n.__data__) : !j - !n;
  }
  for (var g = this._groups, A = g.length, t = new Array(A), D = 0; D < A; ++D) {
    for (var e = g[D], i = e.length, N = t[D] = new Array(i), C, u = 0; u < i; ++u)
      (C = e[u]) && (N[u] = C);
    N.sort(I);
  }
  return new Mg(t, this._parents).order();
}
function ek(M, I) {
  return M < I ? -1 : M > I ? 1 : M >= I ? 0 : NaN;
}
function ik() {
  var M = arguments[0];
  return arguments[0] = this, M.apply(null, arguments), this;
}
function Nk() {
  return Array.from(this);
}
function Ck() {
  for (var M = this._groups, I = 0, g = M.length; I < g; ++I)
    for (var A = M[I], t = 0, D = A.length; t < D; ++t) {
      var e = A[t];
      if (e)
        return e;
    }
  return null;
}
function uk() {
  let M = 0;
  for (const I of this)
    ++M;
  return M;
}
function jk() {
  return !this.node();
}
function nk(M) {
  for (var I = this._groups, g = 0, A = I.length; g < A; ++g)
    for (var t = I[g], D = 0, e = t.length, i; D < e; ++D)
      (i = t[D]) && M.call(i, i.__data__, D, t);
  return this;
}
function Lk(M) {
  return function() {
    this.removeAttribute(M);
  };
}
function ok(M) {
  return function() {
    this.removeAttributeNS(M.space, M.local);
  };
}
function Tk(M, I) {
  return function() {
    this.setAttribute(M, I);
  };
}
function sk(M, I) {
  return function() {
    this.setAttributeNS(M.space, M.local, I);
  };
}
function Sk(M, I) {
  return function() {
    var g = I.apply(this, arguments);
    g == null ? this.removeAttribute(M) : this.setAttribute(M, g);
  };
}
function ak(M, I) {
  return function() {
    var g = I.apply(this, arguments);
    g == null ? this.removeAttributeNS(M.space, M.local) : this.setAttributeNS(M.space, M.local, g);
  };
}
function lk(M, I) {
  var g = nC(M);
  if (arguments.length < 2) {
    var A = this.node();
    return g.local ? A.getAttributeNS(g.space, g.local) : A.getAttribute(g);
  }
  return this.each((I == null ? g.local ? ok : Lk : typeof I == "function" ? g.local ? ak : Sk : g.local ? sk : Tk)(g, I));
}
function Ma(M) {
  return M.ownerDocument && M.ownerDocument.defaultView || M.document && M || M.defaultView;
}
function yk(M) {
  return function() {
    this.style.removeProperty(M);
  };
}
function ck(M, I, g) {
  return function() {
    this.style.setProperty(M, I, g);
  };
}
function xk(M, I, g) {
  return function() {
    var A = I.apply(this, arguments);
    A == null ? this.style.removeProperty(M) : this.style.setProperty(M, A, g);
  };
}
function rk(M, I, g) {
  return arguments.length > 1 ? this.each((I == null ? yk : typeof I == "function" ? xk : ck)(M, I, g == null ? "" : g)) : bD(this.node(), M);
}
function bD(M, I) {
  return M.style.getPropertyValue(I) || Ma(M).getComputedStyle(M, null).getPropertyValue(I);
}
function wk(M) {
  return function() {
    delete this[M];
  };
}
function Ek(M, I) {
  return function() {
    this[M] = I;
  };
}
function dk(M, I) {
  return function() {
    var g = I.apply(this, arguments);
    g == null ? delete this[M] : this[M] = g;
  };
}
function zk(M, I) {
  return arguments.length > 1 ? this.each((I == null ? wk : typeof I == "function" ? dk : Ek)(M, I)) : this.node()[M];
}
function ga(M) {
  return M.trim().split(/^|\s+/);
}
function zj(M) {
  return M.classList || new Aa(M);
}
function Aa(M) {
  this._node = M, this._names = ga(M.getAttribute("class") || "");
}
Aa.prototype = {
  add: function(M) {
    var I = this._names.indexOf(M);
    I < 0 && (this._names.push(M), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(M) {
    var I = this._names.indexOf(M);
    I >= 0 && (this._names.splice(I, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(M) {
    return this._names.indexOf(M) >= 0;
  }
};
function ta(M, I) {
  for (var g = zj(M), A = -1, t = I.length; ++A < t; )
    g.add(I[A]);
}
function Da(M, I) {
  for (var g = zj(M), A = -1, t = I.length; ++A < t; )
    g.remove(I[A]);
}
function mk(M) {
  return function() {
    ta(this, M);
  };
}
function bk(M) {
  return function() {
    Da(this, M);
  };
}
function Yk(M, I) {
  return function() {
    (I.apply(this, arguments) ? ta : Da)(this, M);
  };
}
function pk(M, I) {
  var g = ga(M + "");
  if (arguments.length < 2) {
    for (var A = zj(this.node()), t = -1, D = g.length; ++t < D; )
      if (!A.contains(g[t]))
        return !1;
    return !0;
  }
  return this.each((typeof I == "function" ? Yk : I ? mk : bk)(g, I));
}
function Qk() {
  this.textContent = "";
}
function hk(M) {
  return function() {
    this.textContent = M;
  };
}
function Ok(M) {
  return function() {
    var I = M.apply(this, arguments);
    this.textContent = I == null ? "" : I;
  };
}
function kk(M) {
  return arguments.length ? this.each(M == null ? Qk : (typeof M == "function" ? Ok : hk)(M)) : this.node().textContent;
}
function Pk() {
  this.innerHTML = "";
}
function fk(M) {
  return function() {
    this.innerHTML = M;
  };
}
function Gk(M) {
  return function() {
    var I = M.apply(this, arguments);
    this.innerHTML = I == null ? "" : I;
  };
}
function Wk(M) {
  return arguments.length ? this.each(M == null ? Pk : (typeof M == "function" ? Gk : fk)(M)) : this.node().innerHTML;
}
function Zk() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function vk() {
  return this.each(Zk);
}
function Uk() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Jk() {
  return this.each(Uk);
}
function Bk(M) {
  var I = typeof M == "function" ? M : KS(M);
  return this.select(function() {
    return this.appendChild(I.apply(this, arguments));
  });
}
function Rk() {
  return null;
}
function Hk(M, I) {
  var g = typeof M == "function" ? M : KS(M), A = I == null ? Rk : typeof I == "function" ? I : dj(I);
  return this.select(function() {
    return this.insertBefore(g.apply(this, arguments), A.apply(this, arguments) || null);
  });
}
function Vk() {
  var M = this.parentNode;
  M && M.removeChild(this);
}
function Fk() {
  return this.each(Vk);
}
function Xk() {
  var M = this.cloneNode(!1), I = this.parentNode;
  return I ? I.insertBefore(M, this.nextSibling) : M;
}
function Kk() {
  var M = this.cloneNode(!0), I = this.parentNode;
  return I ? I.insertBefore(M, this.nextSibling) : M;
}
function _k(M) {
  return this.select(M ? Kk : Xk);
}
function $k(M) {
  return arguments.length ? this.property("__data__", M) : this.node().__data__;
}
function qk(M) {
  return function(I) {
    M.call(this, I, this.__data__);
  };
}
function IP(M) {
  return M.trim().split(/^|\s+/).map(function(I) {
    var g = "", A = I.indexOf(".");
    return A >= 0 && (g = I.slice(A + 1), I = I.slice(0, A)), { type: I, name: g };
  });
}
function MP(M) {
  return function() {
    var I = this.__on;
    if (!!I) {
      for (var g = 0, A = -1, t = I.length, D; g < t; ++g)
        D = I[g], (!M.type || D.type === M.type) && D.name === M.name ? this.removeEventListener(D.type, D.listener, D.options) : I[++A] = D;
      ++A ? I.length = A : delete this.__on;
    }
  };
}
function gP(M, I, g) {
  return function() {
    var A = this.__on, t, D = qk(I);
    if (A) {
      for (var e = 0, i = A.length; e < i; ++e)
        if ((t = A[e]).type === M.type && t.name === M.name) {
          this.removeEventListener(t.type, t.listener, t.options), this.addEventListener(t.type, t.listener = D, t.options = g), t.value = I;
          return;
        }
    }
    this.addEventListener(M.type, D, g), t = { type: M.type, name: M.name, value: I, listener: D, options: g }, A ? A.push(t) : this.__on = [t];
  };
}
function AP(M, I, g) {
  var A = IP(M + ""), t, D = A.length, e;
  if (arguments.length < 2) {
    var i = this.node().__on;
    if (i) {
      for (var N = 0, C = i.length, u; N < C; ++N)
        for (t = 0, u = i[N]; t < D; ++t)
          if ((e = A[t]).type === u.type && e.name === u.name)
            return u.value;
    }
    return;
  }
  for (i = I ? gP : MP, t = 0; t < D; ++t)
    this.each(i(A[t], I, g));
  return this;
}
function ea(M, I, g) {
  var A = Ma(M), t = A.CustomEvent;
  typeof t == "function" ? t = new t(I, g) : (t = A.document.createEvent("Event"), g ? (t.initEvent(I, g.bubbles, g.cancelable), t.detail = g.detail) : t.initEvent(I, !1, !1)), M.dispatchEvent(t);
}
function tP(M, I) {
  return function() {
    return ea(this, M, I);
  };
}
function DP(M, I) {
  return function() {
    return ea(this, M, I.apply(this, arguments));
  };
}
function eP(M, I) {
  return this.each((typeof I == "function" ? DP : tP)(M, I));
}
function* iP() {
  for (var M = this._groups, I = 0, g = M.length; I < g; ++I)
    for (var A = M[I], t = 0, D = A.length, e; t < D; ++t)
      (e = A[t]) && (yield e);
}
var ia = [null];
function Mg(M, I) {
  this._groups = M, this._parents = I;
}
function ei() {
  return new Mg([[document.documentElement]], ia);
}
function NP() {
  return this;
}
Mg.prototype = ei.prototype = {
  constructor: Mg,
  select: OO,
  selectAll: GO,
  selectChild: UO,
  selectChildren: HO,
  filter: VO,
  data: qO,
  enter: FO,
  exit: Mk,
  join: gk,
  merge: Ak,
  selection: NP,
  order: tk,
  sort: Dk,
  call: ik,
  nodes: Nk,
  node: Ck,
  size: uk,
  empty: jk,
  each: nk,
  attr: lk,
  style: rk,
  property: zk,
  classed: pk,
  text: kk,
  html: Wk,
  raise: vk,
  lower: Jk,
  append: Bk,
  insert: Hk,
  remove: Fk,
  clone: _k,
  datum: $k,
  on: AP,
  dispatch: eP,
  [Symbol.iterator]: iP
};
function CP(M) {
  return typeof M == "string" ? new Mg([[document.querySelector(M)]], [document.documentElement]) : new Mg([[M]], ia);
}
function Na(M) {
  let I;
  for (; I = M.sourceEvent; )
    M = I;
  return M;
}
function uP(M, I) {
  if (M = Na(M), I === void 0 && (I = M.currentTarget), I) {
    var g = I.ownerSVGElement || I;
    if (g.createSVGPoint) {
      var A = g.createSVGPoint();
      return A.x = M.clientX, A.y = M.clientY, A = A.matrixTransform(I.getScreenCTM().inverse()), [A.x, A.y];
    }
    if (I.getBoundingClientRect) {
      var t = I.getBoundingClientRect();
      return [M.clientX - t.left - I.clientLeft, M.clientY - t.top - I.clientTop];
    }
  }
  return [M.pageX, M.pageY];
}
function jP(M, I) {
  return M.target && (M = Na(M), I === void 0 && (I = M.currentTarget), M = M.touches || [M]), Array.from(M, (g) => uP(g, I));
}
function mj(M, I, g) {
  M.prototype = I.prototype = g, g.constructor = M;
}
function Ca(M, I) {
  var g = Object.create(M.prototype);
  for (var A in I)
    g[A] = I[A];
  return g;
}
function ii() {
}
var fe = 0.7, hN = 1 / fe, CD = "\\s*([+-]?\\d+)\\s*", Ge = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Jg = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", nP = /^#([0-9a-f]{3,8})$/, LP = new RegExp(`^rgb\\(${CD},${CD},${CD}\\)$`), oP = new RegExp(`^rgb\\(${Jg},${Jg},${Jg}\\)$`), TP = new RegExp(`^rgba\\(${CD},${CD},${CD},${Ge}\\)$`), sP = new RegExp(`^rgba\\(${Jg},${Jg},${Jg},${Ge}\\)$`), SP = new RegExp(`^hsl\\(${Ge},${Jg},${Jg}\\)$`), aP = new RegExp(`^hsla\\(${Ge},${Jg},${Jg},${Ge}\\)$`), po = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
mj(ii, We, {
  copy(M) {
    return Object.assign(new this.constructor(), this, M);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Qo,
  formatHex: Qo,
  formatHex8: lP,
  formatHsl: yP,
  formatRgb: ho,
  toString: ho
});
function Qo() {
  return this.rgb().formatHex();
}
function lP() {
  return this.rgb().formatHex8();
}
function yP() {
  return ua(this).formatHsl();
}
function ho() {
  return this.rgb().formatRgb();
}
function We(M) {
  var I, g;
  return M = (M + "").trim().toLowerCase(), (I = nP.exec(M)) ? (g = I[1].length, I = parseInt(I[1], 16), g === 6 ? Oo(I) : g === 3 ? new fM(I >> 8 & 15 | I >> 4 & 240, I >> 4 & 15 | I & 240, (I & 15) << 4 | I & 15, 1) : g === 8 ? ci(I >> 24 & 255, I >> 16 & 255, I >> 8 & 255, (I & 255) / 255) : g === 4 ? ci(I >> 12 & 15 | I >> 8 & 240, I >> 8 & 15 | I >> 4 & 240, I >> 4 & 15 | I & 240, ((I & 15) << 4 | I & 15) / 255) : null) : (I = LP.exec(M)) ? new fM(I[1], I[2], I[3], 1) : (I = oP.exec(M)) ? new fM(I[1] * 255 / 100, I[2] * 255 / 100, I[3] * 255 / 100, 1) : (I = TP.exec(M)) ? ci(I[1], I[2], I[3], I[4]) : (I = sP.exec(M)) ? ci(I[1] * 255 / 100, I[2] * 255 / 100, I[3] * 255 / 100, I[4]) : (I = SP.exec(M)) ? fo(I[1], I[2] / 100, I[3] / 100, 1) : (I = aP.exec(M)) ? fo(I[1], I[2] / 100, I[3] / 100, I[4]) : po.hasOwnProperty(M) ? Oo(po[M]) : M === "transparent" ? new fM(NaN, NaN, NaN, 0) : null;
}
function Oo(M) {
  return new fM(M >> 16 & 255, M >> 8 & 255, M & 255, 1);
}
function ci(M, I, g, A) {
  return A <= 0 && (M = I = g = NaN), new fM(M, I, g, A);
}
function cP(M) {
  return M instanceof ii || (M = We(M)), M ? (M = M.rgb(), new fM(M.r, M.g, M.b, M.opacity)) : new fM();
}
function F0(M, I, g, A) {
  return arguments.length === 1 ? cP(M) : new fM(M, I, g, A == null ? 1 : A);
}
function fM(M, I, g, A) {
  this.r = +M, this.g = +I, this.b = +g, this.opacity = +A;
}
mj(fM, F0, Ca(ii, {
  brighter(M) {
    return M = M == null ? hN : Math.pow(hN, M), new fM(this.r * M, this.g * M, this.b * M, this.opacity);
  },
  darker(M) {
    return M = M == null ? fe : Math.pow(fe, M), new fM(this.r * M, this.g * M, this.b * M, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new fM(Lt(this.r), Lt(this.g), Lt(this.b), ON(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ko,
  formatHex: ko,
  formatHex8: xP,
  formatRgb: Po,
  toString: Po
}));
function ko() {
  return `#${tt(this.r)}${tt(this.g)}${tt(this.b)}`;
}
function xP() {
  return `#${tt(this.r)}${tt(this.g)}${tt(this.b)}${tt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Po() {
  const M = ON(this.opacity);
  return `${M === 1 ? "rgb(" : "rgba("}${Lt(this.r)}, ${Lt(this.g)}, ${Lt(this.b)}${M === 1 ? ")" : `, ${M})`}`;
}
function ON(M) {
  return isNaN(M) ? 1 : Math.max(0, Math.min(1, M));
}
function Lt(M) {
  return Math.max(0, Math.min(255, Math.round(M) || 0));
}
function tt(M) {
  return M = Lt(M), (M < 16 ? "0" : "") + M.toString(16);
}
function fo(M, I, g, A) {
  return A <= 0 ? M = I = g = NaN : g <= 0 || g >= 1 ? M = I = NaN : I <= 0 && (M = NaN), new cg(M, I, g, A);
}
function ua(M) {
  if (M instanceof cg)
    return new cg(M.h, M.s, M.l, M.opacity);
  if (M instanceof ii || (M = We(M)), !M)
    return new cg();
  if (M instanceof cg)
    return M;
  M = M.rgb();
  var I = M.r / 255, g = M.g / 255, A = M.b / 255, t = Math.min(I, g, A), D = Math.max(I, g, A), e = NaN, i = D - t, N = (D + t) / 2;
  return i ? (I === D ? e = (g - A) / i + (g < A) * 6 : g === D ? e = (A - I) / i + 2 : e = (I - g) / i + 4, i /= N < 0.5 ? D + t : 2 - D - t, e *= 60) : i = N > 0 && N < 1 ? 0 : e, new cg(e, i, N, M.opacity);
}
function rP(M, I, g, A) {
  return arguments.length === 1 ? ua(M) : new cg(M, I, g, A == null ? 1 : A);
}
function cg(M, I, g, A) {
  this.h = +M, this.s = +I, this.l = +g, this.opacity = +A;
}
mj(cg, rP, Ca(ii, {
  brighter(M) {
    return M = M == null ? hN : Math.pow(hN, M), new cg(this.h, this.s, this.l * M, this.opacity);
  },
  darker(M) {
    return M = M == null ? fe : Math.pow(fe, M), new cg(this.h, this.s, this.l * M, this.opacity);
  },
  rgb() {
    var M = this.h % 360 + (this.h < 0) * 360, I = isNaN(M) || isNaN(this.s) ? 0 : this.s, g = this.l, A = g + (g < 0.5 ? g : 1 - g) * I, t = 2 * g - A;
    return new fM(
      i0(M >= 240 ? M - 240 : M + 120, t, A),
      i0(M, t, A),
      i0(M < 120 ? M + 240 : M - 120, t, A),
      this.opacity
    );
  },
  clamp() {
    return new cg(Go(this.h), xi(this.s), xi(this.l), ON(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const M = ON(this.opacity);
    return `${M === 1 ? "hsl(" : "hsla("}${Go(this.h)}, ${xi(this.s) * 100}%, ${xi(this.l) * 100}%${M === 1 ? ")" : `, ${M})`}`;
  }
}));
function Go(M) {
  return M = (M || 0) % 360, M < 0 ? M + 360 : M;
}
function xi(M) {
  return Math.max(0, Math.min(1, M || 0));
}
function i0(M, I, g) {
  return (M < 60 ? I + (g - I) * M / 60 : M < 180 ? g : M < 240 ? I + (g - I) * (240 - M) / 60 : I) * 255;
}
const ja = (M) => () => M;
function wP(M, I) {
  return function(g) {
    return M + g * I;
  };
}
function EP(M, I, g) {
  return M = Math.pow(M, g), I = Math.pow(I, g) - M, g = 1 / g, function(A) {
    return Math.pow(M + A * I, g);
  };
}
function dP(M) {
  return (M = +M) == 1 ? na : function(I, g) {
    return g - I ? EP(I, g, M) : ja(isNaN(I) ? g : I);
  };
}
function na(M, I) {
  var g = I - M;
  return g ? wP(M, g) : ja(isNaN(M) ? I : M);
}
const Wo = function M(I) {
  var g = dP(I);
  function A(t, D) {
    var e = g((t = F0(t)).r, (D = F0(D)).r), i = g(t.g, D.g), N = g(t.b, D.b), C = na(t.opacity, D.opacity);
    return function(u) {
      return t.r = e(u), t.g = i(u), t.b = N(u), t.opacity = C(u), t + "";
    };
  }
  return A.gamma = M, A;
}(1);
function lA(M, I) {
  return M = +M, I = +I, function(g) {
    return M * (1 - g) + I * g;
  };
}
var X0 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, N0 = new RegExp(X0.source, "g");
function zP(M) {
  return function() {
    return M;
  };
}
function mP(M) {
  return function(I) {
    return M(I) + "";
  };
}
function bP(M, I) {
  var g = X0.lastIndex = N0.lastIndex = 0, A, t, D, e = -1, i = [], N = [];
  for (M = M + "", I = I + ""; (A = X0.exec(M)) && (t = N0.exec(I)); )
    (D = t.index) > g && (D = I.slice(g, D), i[e] ? i[e] += D : i[++e] = D), (A = A[0]) === (t = t[0]) ? i[e] ? i[e] += t : i[++e] = t : (i[++e] = null, N.push({ i: e, x: lA(A, t) })), g = N0.lastIndex;
  return g < I.length && (D = I.slice(g), i[e] ? i[e] += D : i[++e] = D), i.length < 2 ? N[0] ? mP(N[0].x) : zP(I) : (I = N.length, function(C) {
    for (var u = 0, j; u < I; ++u)
      i[(j = N[u]).i] = j.x(C);
    return i.join("");
  });
}
var Zo = 180 / Math.PI, K0 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function La(M, I, g, A, t, D) {
  var e, i, N;
  return (e = Math.sqrt(M * M + I * I)) && (M /= e, I /= e), (N = M * g + I * A) && (g -= M * N, A -= I * N), (i = Math.sqrt(g * g + A * A)) && (g /= i, A /= i, N /= i), M * A < I * g && (M = -M, I = -I, N = -N, e = -e), {
    translateX: t,
    translateY: D,
    rotate: Math.atan2(I, M) * Zo,
    skewX: Math.atan(N) * Zo,
    scaleX: e,
    scaleY: i
  };
}
var ri;
function YP(M) {
  const I = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(M + "");
  return I.isIdentity ? K0 : La(I.a, I.b, I.c, I.d, I.e, I.f);
}
function pP(M) {
  return M == null || (ri || (ri = document.createElementNS("http://www.w3.org/2000/svg", "g")), ri.setAttribute("transform", M), !(M = ri.transform.baseVal.consolidate())) ? K0 : (M = M.matrix, La(M.a, M.b, M.c, M.d, M.e, M.f));
}
function oa(M, I, g, A) {
  function t(C) {
    return C.length ? C.pop() + " " : "";
  }
  function D(C, u, j, n, L, o) {
    if (C !== j || u !== n) {
      var T = L.push("translate(", null, I, null, g);
      o.push({ i: T - 4, x: lA(C, j) }, { i: T - 2, x: lA(u, n) });
    } else
      (j || n) && L.push("translate(" + j + I + n + g);
  }
  function e(C, u, j, n) {
    C !== u ? (C - u > 180 ? u += 360 : u - C > 180 && (C += 360), n.push({ i: j.push(t(j) + "rotate(", null, A) - 2, x: lA(C, u) })) : u && j.push(t(j) + "rotate(" + u + A);
  }
  function i(C, u, j, n) {
    C !== u ? n.push({ i: j.push(t(j) + "skewX(", null, A) - 2, x: lA(C, u) }) : u && j.push(t(j) + "skewX(" + u + A);
  }
  function N(C, u, j, n, L, o) {
    if (C !== j || u !== n) {
      var T = L.push(t(L) + "scale(", null, ",", null, ")");
      o.push({ i: T - 4, x: lA(C, j) }, { i: T - 2, x: lA(u, n) });
    } else
      (j !== 1 || n !== 1) && L.push(t(L) + "scale(" + j + "," + n + ")");
  }
  return function(C, u) {
    var j = [], n = [];
    return C = M(C), u = M(u), D(C.translateX, C.translateY, u.translateX, u.translateY, j, n), e(C.rotate, u.rotate, j, n), i(C.skewX, u.skewX, j, n), N(C.scaleX, C.scaleY, u.scaleX, u.scaleY, j, n), C = u = null, function(L) {
      for (var o = -1, T = n.length, s; ++o < T; )
        j[(s = n[o]).i] = s.x(L);
      return j.join("");
    };
  };
}
var QP = oa(YP, "px, ", "px)", "deg)"), hP = oa(pP, ", ", ")", ")"), YD = 0, ge = 0, KD = 0, Ta = 1e3, kN, Ae, PN = 0, wt = 0, LC = 0, Ze = typeof performance == "object" && performance.now ? performance : Date, sa = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(M) {
  setTimeout(M, 17);
};
function bj() {
  return wt || (sa(OP), wt = Ze.now() + LC);
}
function OP() {
  wt = 0;
}
function fN() {
  this._call = this._time = this._next = null;
}
fN.prototype = Sa.prototype = {
  constructor: fN,
  restart: function(M, I, g) {
    if (typeof M != "function")
      throw new TypeError("callback is not a function");
    g = (g == null ? bj() : +g) + (I == null ? 0 : +I), !this._next && Ae !== this && (Ae ? Ae._next = this : kN = this, Ae = this), this._call = M, this._time = g, _0();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, _0());
  }
};
function Sa(M, I, g) {
  var A = new fN();
  return A.restart(M, I, g), A;
}
function kP() {
  bj(), ++YD;
  for (var M = kN, I; M; )
    (I = wt - M._time) >= 0 && M._call.call(void 0, I), M = M._next;
  --YD;
}
function vo() {
  wt = (PN = Ze.now()) + LC, YD = ge = 0;
  try {
    kP();
  } finally {
    YD = 0, fP(), wt = 0;
  }
}
function PP() {
  var M = Ze.now(), I = M - PN;
  I > Ta && (LC -= I, PN = M);
}
function fP() {
  for (var M, I = kN, g, A = 1 / 0; I; )
    I._call ? (A > I._time && (A = I._time), M = I, I = I._next) : (g = I._next, I._next = null, I = M ? M._next = g : kN = g);
  Ae = M, _0(A);
}
function _0(M) {
  if (!YD) {
    ge && (ge = clearTimeout(ge));
    var I = M - wt;
    I > 24 ? (M < 1 / 0 && (ge = setTimeout(vo, M - Ze.now() - LC)), KD && (KD = clearInterval(KD))) : (KD || (PN = Ze.now(), KD = setInterval(PP, Ta)), YD = 1, sa(vo));
  }
}
function Uo(M, I, g) {
  var A = new fN();
  return I = I == null ? 0 : +I, A.restart((t) => {
    A.stop(), M(t + I);
  }, I, g), A;
}
var GP = XS("start", "end", "cancel", "interrupt"), WP = [], aa = 0, Jo = 1, $0 = 2, Ui = 3, Bo = 4, q0 = 5, Ji = 6;
function oC(M, I, g, A, t, D) {
  var e = M.__transition;
  if (!e)
    M.__transition = {};
  else if (g in e)
    return;
  ZP(M, g, {
    name: I,
    index: A,
    group: t,
    on: GP,
    tween: WP,
    time: D.time,
    delay: D.delay,
    duration: D.duration,
    ease: D.ease,
    timer: null,
    state: aa
  });
}
function Yj(M, I) {
  var g = Yg(M, I);
  if (g.state > aa)
    throw new Error("too late; already scheduled");
  return g;
}
function Vg(M, I) {
  var g = Yg(M, I);
  if (g.state > Ui)
    throw new Error("too late; already running");
  return g;
}
function Yg(M, I) {
  var g = M.__transition;
  if (!g || !(g = g[I]))
    throw new Error("transition not found");
  return g;
}
function ZP(M, I, g) {
  var A = M.__transition, t;
  A[I] = g, g.timer = Sa(D, 0, g.time);
  function D(C) {
    g.state = Jo, g.timer.restart(e, g.delay, g.time), g.delay <= C && e(C - g.delay);
  }
  function e(C) {
    var u, j, n, L;
    if (g.state !== Jo)
      return N();
    for (u in A)
      if (L = A[u], L.name === g.name) {
        if (L.state === Ui)
          return Uo(e);
        L.state === Bo ? (L.state = Ji, L.timer.stop(), L.on.call("interrupt", M, M.__data__, L.index, L.group), delete A[u]) : +u < I && (L.state = Ji, L.timer.stop(), L.on.call("cancel", M, M.__data__, L.index, L.group), delete A[u]);
      }
    if (Uo(function() {
      g.state === Ui && (g.state = Bo, g.timer.restart(i, g.delay, g.time), i(C));
    }), g.state = $0, g.on.call("start", M, M.__data__, g.index, g.group), g.state === $0) {
      for (g.state = Ui, t = new Array(n = g.tween.length), u = 0, j = -1; u < n; ++u)
        (L = g.tween[u].value.call(M, M.__data__, g.index, g.group)) && (t[++j] = L);
      t.length = j + 1;
    }
  }
  function i(C) {
    for (var u = C < g.duration ? g.ease.call(null, C / g.duration) : (g.timer.restart(N), g.state = q0, 1), j = -1, n = t.length; ++j < n; )
      t[j].call(M, u);
    g.state === q0 && (g.on.call("end", M, M.__data__, g.index, g.group), N());
  }
  function N() {
    g.state = Ji, g.timer.stop(), delete A[I];
    for (var C in A)
      return;
    delete M.__transition;
  }
}
function vP(M, I) {
  var g = M.__transition, A, t, D = !0, e;
  if (!!g) {
    I = I == null ? null : I + "";
    for (e in g) {
      if ((A = g[e]).name !== I) {
        D = !1;
        continue;
      }
      t = A.state > $0 && A.state < q0, A.state = Ji, A.timer.stop(), A.on.call(t ? "interrupt" : "cancel", M, M.__data__, A.index, A.group), delete g[e];
    }
    D && delete M.__transition;
  }
}
function UP(M) {
  return this.each(function() {
    vP(this, M);
  });
}
function JP(M, I) {
  var g, A;
  return function() {
    var t = Vg(this, M), D = t.tween;
    if (D !== g) {
      A = g = D;
      for (var e = 0, i = A.length; e < i; ++e)
        if (A[e].name === I) {
          A = A.slice(), A.splice(e, 1);
          break;
        }
    }
    t.tween = A;
  };
}
function BP(M, I, g) {
  var A, t;
  if (typeof g != "function")
    throw new Error();
  return function() {
    var D = Vg(this, M), e = D.tween;
    if (e !== A) {
      t = (A = e).slice();
      for (var i = { name: I, value: g }, N = 0, C = t.length; N < C; ++N)
        if (t[N].name === I) {
          t[N] = i;
          break;
        }
      N === C && t.push(i);
    }
    D.tween = t;
  };
}
function RP(M, I) {
  var g = this._id;
  if (M += "", arguments.length < 2) {
    for (var A = Yg(this.node(), g).tween, t = 0, D = A.length, e; t < D; ++t)
      if ((e = A[t]).name === M)
        return e.value;
    return null;
  }
  return this.each((I == null ? JP : BP)(g, M, I));
}
function pj(M, I, g) {
  var A = M._id;
  return M.each(function() {
    var t = Vg(this, A);
    (t.value || (t.value = {}))[I] = g.apply(this, arguments);
  }), function(t) {
    return Yg(t, A).value[I];
  };
}
function la(M, I) {
  var g;
  return (typeof I == "number" ? lA : I instanceof We ? Wo : (g = We(I)) ? (I = g, Wo) : bP)(M, I);
}
function HP(M) {
  return function() {
    this.removeAttribute(M);
  };
}
function VP(M) {
  return function() {
    this.removeAttributeNS(M.space, M.local);
  };
}
function FP(M, I, g) {
  var A, t = g + "", D;
  return function() {
    var e = this.getAttribute(M);
    return e === t ? null : e === A ? D : D = I(A = e, g);
  };
}
function XP(M, I, g) {
  var A, t = g + "", D;
  return function() {
    var e = this.getAttributeNS(M.space, M.local);
    return e === t ? null : e === A ? D : D = I(A = e, g);
  };
}
function KP(M, I, g) {
  var A, t, D;
  return function() {
    var e, i = g(this), N;
    return i == null ? void this.removeAttribute(M) : (e = this.getAttribute(M), N = i + "", e === N ? null : e === A && N === t ? D : (t = N, D = I(A = e, i)));
  };
}
function _P(M, I, g) {
  var A, t, D;
  return function() {
    var e, i = g(this), N;
    return i == null ? void this.removeAttributeNS(M.space, M.local) : (e = this.getAttributeNS(M.space, M.local), N = i + "", e === N ? null : e === A && N === t ? D : (t = N, D = I(A = e, i)));
  };
}
function $P(M, I) {
  var g = nC(M), A = g === "transform" ? hP : la;
  return this.attrTween(M, typeof I == "function" ? (g.local ? _P : KP)(g, A, pj(this, "attr." + M, I)) : I == null ? (g.local ? VP : HP)(g) : (g.local ? XP : FP)(g, A, I));
}
function qP(M, I) {
  return function(g) {
    this.setAttribute(M, I.call(this, g));
  };
}
function If(M, I) {
  return function(g) {
    this.setAttributeNS(M.space, M.local, I.call(this, g));
  };
}
function Mf(M, I) {
  var g, A;
  function t() {
    var D = I.apply(this, arguments);
    return D !== A && (g = (A = D) && If(M, D)), g;
  }
  return t._value = I, t;
}
function gf(M, I) {
  var g, A;
  function t() {
    var D = I.apply(this, arguments);
    return D !== A && (g = (A = D) && qP(M, D)), g;
  }
  return t._value = I, t;
}
function Af(M, I) {
  var g = "attr." + M;
  if (arguments.length < 2)
    return (g = this.tween(g)) && g._value;
  if (I == null)
    return this.tween(g, null);
  if (typeof I != "function")
    throw new Error();
  var A = nC(M);
  return this.tween(g, (A.local ? Mf : gf)(A, I));
}
function tf(M, I) {
  return function() {
    Yj(this, M).delay = +I.apply(this, arguments);
  };
}
function Df(M, I) {
  return I = +I, function() {
    Yj(this, M).delay = I;
  };
}
function ef(M) {
  var I = this._id;
  return arguments.length ? this.each((typeof M == "function" ? tf : Df)(I, M)) : Yg(this.node(), I).delay;
}
function Nf(M, I) {
  return function() {
    Vg(this, M).duration = +I.apply(this, arguments);
  };
}
function Cf(M, I) {
  return I = +I, function() {
    Vg(this, M).duration = I;
  };
}
function uf(M) {
  var I = this._id;
  return arguments.length ? this.each((typeof M == "function" ? Nf : Cf)(I, M)) : Yg(this.node(), I).duration;
}
function jf(M, I) {
  if (typeof I != "function")
    throw new Error();
  return function() {
    Vg(this, M).ease = I;
  };
}
function nf(M) {
  var I = this._id;
  return arguments.length ? this.each(jf(I, M)) : Yg(this.node(), I).ease;
}
function Lf(M, I) {
  return function() {
    var g = I.apply(this, arguments);
    if (typeof g != "function")
      throw new Error();
    Vg(this, M).ease = g;
  };
}
function of(M) {
  if (typeof M != "function")
    throw new Error();
  return this.each(Lf(this._id, M));
}
function Tf(M) {
  typeof M != "function" && (M = $S(M));
  for (var I = this._groups, g = I.length, A = new Array(g), t = 0; t < g; ++t)
    for (var D = I[t], e = D.length, i = A[t] = [], N, C = 0; C < e; ++C)
      (N = D[C]) && M.call(N, N.__data__, C, D) && i.push(N);
  return new DA(A, this._parents, this._name, this._id);
}
function sf(M) {
  if (M._id !== this._id)
    throw new Error();
  for (var I = this._groups, g = M._groups, A = I.length, t = g.length, D = Math.min(A, t), e = new Array(A), i = 0; i < D; ++i)
    for (var N = I[i], C = g[i], u = N.length, j = e[i] = new Array(u), n, L = 0; L < u; ++L)
      (n = N[L] || C[L]) && (j[L] = n);
  for (; i < A; ++i)
    e[i] = I[i];
  return new DA(e, this._parents, this._name, this._id);
}
function Sf(M) {
  return (M + "").trim().split(/^|\s+/).every(function(I) {
    var g = I.indexOf(".");
    return g >= 0 && (I = I.slice(0, g)), !I || I === "start";
  });
}
function af(M, I, g) {
  var A, t, D = Sf(I) ? Yj : Vg;
  return function() {
    var e = D(this, M), i = e.on;
    i !== A && (t = (A = i).copy()).on(I, g), e.on = t;
  };
}
function lf(M, I) {
  var g = this._id;
  return arguments.length < 2 ? Yg(this.node(), g).on.on(M) : this.each(af(g, M, I));
}
function yf(M) {
  return function() {
    var I = this.parentNode;
    for (var g in this.__transition)
      if (+g !== M)
        return;
    I && I.removeChild(this);
  };
}
function cf() {
  return this.on("end.remove", yf(this._id));
}
function xf(M) {
  var I = this._name, g = this._id;
  typeof M != "function" && (M = dj(M));
  for (var A = this._groups, t = A.length, D = new Array(t), e = 0; e < t; ++e)
    for (var i = A[e], N = i.length, C = D[e] = new Array(N), u, j, n = 0; n < N; ++n)
      (u = i[n]) && (j = M.call(u, u.__data__, n, i)) && ("__data__" in u && (j.__data__ = u.__data__), C[n] = j, oC(C[n], I, g, n, C, Yg(u, g)));
  return new DA(D, this._parents, I, g);
}
function rf(M) {
  var I = this._name, g = this._id;
  typeof M != "function" && (M = _S(M));
  for (var A = this._groups, t = A.length, D = [], e = [], i = 0; i < t; ++i)
    for (var N = A[i], C = N.length, u, j = 0; j < C; ++j)
      if (u = N[j]) {
        for (var n = M.call(u, u.__data__, j, N), L, o = Yg(u, g), T = 0, s = n.length; T < s; ++T)
          (L = n[T]) && oC(L, I, g, T, n, o);
        D.push(n), e.push(u);
      }
  return new DA(D, e, I, g);
}
var wf = ei.prototype.constructor;
function Ef() {
  return new wf(this._groups, this._parents);
}
function df(M, I) {
  var g, A, t;
  return function() {
    var D = bD(this, M), e = (this.style.removeProperty(M), bD(this, M));
    return D === e ? null : D === g && e === A ? t : t = I(g = D, A = e);
  };
}
function ya(M) {
  return function() {
    this.style.removeProperty(M);
  };
}
function zf(M, I, g) {
  var A, t = g + "", D;
  return function() {
    var e = bD(this, M);
    return e === t ? null : e === A ? D : D = I(A = e, g);
  };
}
function mf(M, I, g) {
  var A, t, D;
  return function() {
    var e = bD(this, M), i = g(this), N = i + "";
    return i == null && (N = i = (this.style.removeProperty(M), bD(this, M))), e === N ? null : e === A && N === t ? D : (t = N, D = I(A = e, i));
  };
}
function bf(M, I) {
  var g, A, t, D = "style." + I, e = "end." + D, i;
  return function() {
    var N = Vg(this, M), C = N.on, u = N.value[D] == null ? i || (i = ya(I)) : void 0;
    (C !== g || t !== u) && (A = (g = C).copy()).on(e, t = u), N.on = A;
  };
}
function Yf(M, I, g) {
  var A = (M += "") == "transform" ? QP : la;
  return I == null ? this.styleTween(M, df(M, A)).on("end.style." + M, ya(M)) : typeof I == "function" ? this.styleTween(M, mf(M, A, pj(this, "style." + M, I))).each(bf(this._id, M)) : this.styleTween(M, zf(M, A, I), g).on("end.style." + M, null);
}
function pf(M, I, g) {
  return function(A) {
    this.style.setProperty(M, I.call(this, A), g);
  };
}
function Qf(M, I, g) {
  var A, t;
  function D() {
    var e = I.apply(this, arguments);
    return e !== t && (A = (t = e) && pf(M, e, g)), A;
  }
  return D._value = I, D;
}
function hf(M, I, g) {
  var A = "style." + (M += "");
  if (arguments.length < 2)
    return (A = this.tween(A)) && A._value;
  if (I == null)
    return this.tween(A, null);
  if (typeof I != "function")
    throw new Error();
  return this.tween(A, Qf(M, I, g == null ? "" : g));
}
function Of(M) {
  return function() {
    this.textContent = M;
  };
}
function kf(M) {
  return function() {
    var I = M(this);
    this.textContent = I == null ? "" : I;
  };
}
function Pf(M) {
  return this.tween("text", typeof M == "function" ? kf(pj(this, "text", M)) : Of(M == null ? "" : M + ""));
}
function ff(M) {
  return function(I) {
    this.textContent = M.call(this, I);
  };
}
function Gf(M) {
  var I, g;
  function A() {
    var t = M.apply(this, arguments);
    return t !== g && (I = (g = t) && ff(t)), I;
  }
  return A._value = M, A;
}
function Wf(M) {
  var I = "text";
  if (arguments.length < 1)
    return (I = this.tween(I)) && I._value;
  if (M == null)
    return this.tween(I, null);
  if (typeof M != "function")
    throw new Error();
  return this.tween(I, Gf(M));
}
function Zf() {
  for (var M = this._name, I = this._id, g = ca(), A = this._groups, t = A.length, D = 0; D < t; ++D)
    for (var e = A[D], i = e.length, N, C = 0; C < i; ++C)
      if (N = e[C]) {
        var u = Yg(N, I);
        oC(N, M, g, C, e, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new DA(A, this._parents, M, g);
}
function vf() {
  var M, I, g = this, A = g._id, t = g.size();
  return new Promise(function(D, e) {
    var i = { value: e }, N = { value: function() {
      --t === 0 && D();
    } };
    g.each(function() {
      var C = Vg(this, A), u = C.on;
      u !== M && (I = (M = u).copy(), I._.cancel.push(i), I._.interrupt.push(i), I._.end.push(N)), C.on = I;
    }), t === 0 && D();
  });
}
var Uf = 0;
function DA(M, I, g, A) {
  this._groups = M, this._parents = I, this._name = g, this._id = A;
}
function ca() {
  return ++Uf;
}
var Kg = ei.prototype;
DA.prototype = {
  constructor: DA,
  select: xf,
  selectAll: rf,
  selectChild: Kg.selectChild,
  selectChildren: Kg.selectChildren,
  filter: Tf,
  merge: sf,
  selection: Ef,
  transition: Zf,
  call: Kg.call,
  nodes: Kg.nodes,
  node: Kg.node,
  size: Kg.size,
  empty: Kg.empty,
  each: Kg.each,
  on: lf,
  attr: $P,
  attrTween: Af,
  style: Yf,
  styleTween: hf,
  text: Pf,
  textTween: Wf,
  remove: cf,
  tween: RP,
  delay: ef,
  duration: uf,
  ease: nf,
  easeVarying: of,
  end: vf,
  [Symbol.iterator]: Kg[Symbol.iterator]
};
function Jf(M) {
  return ((M *= 2) <= 1 ? M * M * M : (M -= 2) * M * M + 2) / 2;
}
var Bf = {
  time: null,
  delay: 0,
  duration: 250,
  ease: Jf
};
function Rf(M, I) {
  for (var g; !(g = M.__transition) || !(g = g[I]); )
    if (!(M = M.parentNode))
      throw new Error(`transition ${I} not found`);
  return g;
}
function Hf(M) {
  var I, g;
  M instanceof DA ? (I = M._id, M = M._name) : (I = ca(), (g = Bf).time = bj(), M = M == null ? null : M + "");
  for (var A = this._groups, t = A.length, D = 0; D < t; ++D)
    for (var e = A[D], i = e.length, N, C = 0; C < i; ++C)
      (N = e[C]) && oC(N, M, I, C, e, g || Rf(N, I));
  return new DA(A, this._parents, M, I);
}
ei.prototype.interrupt = UP;
ei.prototype.transition = Hf;
const Iu = Math.PI, Mu = 2 * Iu, $A = 1e-6, Vf = Mu - $A;
function gu() {
  this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "";
}
function xa() {
  return new gu();
}
gu.prototype = xa.prototype = {
  constructor: gu,
  moveTo: function(M, I) {
    this._ += "M" + (this._x0 = this._x1 = +M) + "," + (this._y0 = this._y1 = +I);
  },
  closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  },
  lineTo: function(M, I) {
    this._ += "L" + (this._x1 = +M) + "," + (this._y1 = +I);
  },
  quadraticCurveTo: function(M, I, g, A) {
    this._ += "Q" + +M + "," + +I + "," + (this._x1 = +g) + "," + (this._y1 = +A);
  },
  bezierCurveTo: function(M, I, g, A, t, D) {
    this._ += "C" + +M + "," + +I + "," + +g + "," + +A + "," + (this._x1 = +t) + "," + (this._y1 = +D);
  },
  arcTo: function(M, I, g, A, t) {
    M = +M, I = +I, g = +g, A = +A, t = +t;
    var D = this._x1, e = this._y1, i = g - M, N = A - I, C = D - M, u = e - I, j = C * C + u * u;
    if (t < 0)
      throw new Error("negative radius: " + t);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = M) + "," + (this._y1 = I);
    else if (j > $A)
      if (!(Math.abs(u * i - N * C) > $A) || !t)
        this._ += "L" + (this._x1 = M) + "," + (this._y1 = I);
      else {
        var n = g - D, L = A - e, o = i * i + N * N, T = n * n + L * L, s = Math.sqrt(o), S = Math.sqrt(j), y = t * Math.tan((Iu - Math.acos((o + j - T) / (2 * s * S))) / 2), x = y / S, a = y / s;
        Math.abs(x - 1) > $A && (this._ += "L" + (M + x * C) + "," + (I + x * u)), this._ += "A" + t + "," + t + ",0,0," + +(u * n > C * L) + "," + (this._x1 = M + a * i) + "," + (this._y1 = I + a * N);
      }
  },
  arc: function(M, I, g, A, t, D) {
    M = +M, I = +I, g = +g, D = !!D;
    var e = g * Math.cos(A), i = g * Math.sin(A), N = M + e, C = I + i, u = 1 ^ D, j = D ? A - t : t - A;
    if (g < 0)
      throw new Error("negative radius: " + g);
    this._x1 === null ? this._ += "M" + N + "," + C : (Math.abs(this._x1 - N) > $A || Math.abs(this._y1 - C) > $A) && (this._ += "L" + N + "," + C), g && (j < 0 && (j = j % Mu + Mu), j > Vf ? this._ += "A" + g + "," + g + ",0,1," + u + "," + (M - e) + "," + (I - i) + "A" + g + "," + g + ",0,1," + u + "," + (this._x1 = N) + "," + (this._y1 = C) : j > $A && (this._ += "A" + g + "," + g + ",0," + +(j >= Iu) + "," + u + "," + (this._x1 = M + g * Math.cos(t)) + "," + (this._y1 = I + g * Math.sin(t))));
  },
  rect: function(M, I, g, A) {
    this._ += "M" + (this._x0 = this._x1 = +M) + "," + (this._y0 = this._y1 = +I) + "h" + +g + "v" + +A + "h" + -g + "Z";
  },
  toString: function() {
    return this._;
  }
};
function ft(M) {
  return function() {
    return M;
  };
}
function Ff(M) {
  return typeof M == "object" && "length" in M ? M : Array.from(M);
}
function ra(M) {
  this._context = M;
}
ra.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(M, I) {
    switch (M = +M, I = +I, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(M, I) : this._context.moveTo(M, I);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(M, I);
        break;
    }
  }
};
function Xf(M) {
  return new ra(M);
}
function Kf(M) {
  return M[0];
}
function _f(M) {
  return M[1];
}
function $f(M, I) {
  var g = ft(!0), A = null, t = Xf, D = null;
  M = typeof M == "function" ? M : M === void 0 ? Kf : ft(M), I = typeof I == "function" ? I : I === void 0 ? _f : ft(I);
  function e(i) {
    var N, C = (i = Ff(i)).length, u, j = !1, n;
    for (A == null && (D = t(n = xa())), N = 0; N <= C; ++N)
      !(N < C && g(u = i[N], N, i)) === j && ((j = !j) ? D.lineStart() : D.lineEnd()), j && D.point(+M(u, N, i), +I(u, N, i));
    if (n)
      return D = null, n + "" || null;
  }
  return e.x = function(i) {
    return arguments.length ? (M = typeof i == "function" ? i : ft(+i), e) : M;
  }, e.y = function(i) {
    return arguments.length ? (I = typeof i == "function" ? i : ft(+i), e) : I;
  }, e.defined = function(i) {
    return arguments.length ? (g = typeof i == "function" ? i : ft(!!i), e) : g;
  }, e.curve = function(i) {
    return arguments.length ? (t = i, A != null && (D = t(A)), e) : t;
  }, e.context = function(i) {
    return arguments.length ? (i == null ? A = D = null : D = t(A = i), e) : A;
  }, e;
}
function Ro(M, I, g) {
  M._context.bezierCurveTo(
    (2 * M._x0 + M._x1) / 3,
    (2 * M._y0 + M._y1) / 3,
    (M._x0 + 2 * M._x1) / 3,
    (M._y0 + 2 * M._y1) / 3,
    (M._x0 + 4 * M._x1 + I) / 6,
    (M._y0 + 4 * M._y1 + g) / 6
  );
}
function wa(M) {
  this._context = M;
}
wa.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        Ro(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(M, I) {
    switch (M = +M, I = +I, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(M, I) : this._context.moveTo(M, I);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        Ro(this, M, I);
        break;
    }
    this._x0 = this._x1, this._x1 = M, this._y0 = this._y1, this._y1 = I;
  }
};
function qf(M) {
  return new wa(M);
}
function MD(M, I, g) {
  this.k = M, this.x = I, this.y = g;
}
MD.prototype = {
  constructor: MD,
  scale: function(M) {
    return M === 1 ? this : new MD(this.k * M, this.x, this.y);
  },
  translate: function(M, I) {
    return M === 0 & I === 0 ? this : new MD(this.k, this.x + this.k * M, this.y + this.k * I);
  },
  apply: function(M) {
    return [M[0] * this.k + this.x, M[1] * this.k + this.y];
  },
  applyX: function(M) {
    return M * this.k + this.x;
  },
  applyY: function(M) {
    return M * this.k + this.y;
  },
  invert: function(M) {
    return [(M[0] - this.x) / this.k, (M[1] - this.y) / this.k];
  },
  invertX: function(M) {
    return (M - this.x) / this.k;
  },
  invertY: function(M) {
    return (M - this.y) / this.k;
  },
  rescaleX: function(M) {
    return M.copy().domain(M.range().map(this.invertX, this).map(M.invert, M));
  },
  rescaleY: function(M) {
    return M.copy().domain(M.range().map(this.invertY, this).map(M.invert, M));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
new MD(1, 0, 0);
MD.prototype;
const iA = Symbol("TiptapEditor");
function Ho() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (M) => {
    const I = Math.random() * 16 | 0;
    return (M === "x" ? I : I & 3 | 8).toString();
  });
}
const I3 = ["id", "d", "stroke", "stroke-width"], M3 = { class: "draw-params" }, g3 = { class: "draw-params-block" }, A3 = /* @__PURE__ */ f("span", { class: "demonstration" }, "\u7EBF\u6761\u989C\u8272:", -1), t3 = { class: "draw-params-block" }, D3 = /* @__PURE__ */ f("span", { class: "demonstration" }, "\u7EBF\u6761\u7C97\u7EC6:", -1), e3 = { class: "draw-params-block" }, i3 = /* @__PURE__ */ f("span", { class: "demonstration" }, "\u5BBD\u5EA6:", -1), N3 = { class: "draw-params-block" }, C3 = /* @__PURE__ */ f("span", { class: "demonstration" }, "\u9AD8\u5EA6:", -1), u3 = { class: "draw-params-block" }, j3 = /* @__PURE__ */ Zg(" \u6E05\u7A7A\u753B\u5E03 "), n3 = {
  name: "Paper"
}, L3 = /* @__PURE__ */ eI({
  ...n3,
  props: Ii,
  setup(M) {
    const I = M, A = h(((y) => y[Math.floor(Math.random() * y.length)])([
      "#A975FF",
      "#FB5151",
      "#FD9170",
      "#FFCB6B",
      "#68CEF8",
      "#80CBC4",
      "#9DEF8F"
    ])), t = h(2), D = h(), e = h(), i = h([]), N = h(!1), C = h(Ho()), u = h(), j = h("100%"), n = h("300px");
    function L() {
      I.updateAttributes({
        lines: []
      });
    }
    function o() {
      requestAnimationFrame(() => {
        var y;
        (y = e.value) == null || y.attr("d", (x) => {
          const a = $f().curve(qf)(x), z = I.node.attrs.lines.filter((c) => c.id !== C.value);
          return I.updateAttributes({
            lines: [
              ...z,
              {
                id: C.value,
                color: A.value,
                size: t.value,
                path: a
              }
            ]
          }), a;
        });
      });
    }
    function T() {
      var y, x, a;
      (y = D.value) == null || y.on("mousemove", null), (x = D.value) == null || x.on("touchmove", null), N.value && (N.value = !1, (a = D.value) == null || a.select(`#id-${C.value}`).remove(), C.value = Ho());
    }
    function s(y) {
      y.preventDefault(), i.value.push(jP(y)[0]), o();
    }
    function S(y) {
      var a, z;
      N.value = !0, i.value = [], e.value = (a = D.value) == null ? void 0 : a.append("path").data([i.value]).attr("id", `id-${C.value}`).attr("stroke", A.value).attr("stroke-width", t.value);
      const x = y.type === "mousedown" ? "mousemove" : "touchmove";
      (z = D.value) == null || z.on(x, s);
    }
    return RI(() => {
      D.value = CP(u.value), D.value.on("mousedown", S).on("mouseup", T).on("mouseleave", T).on("touchstart", S).on("touchend", T).on("touchleave", T);
    }), (y, x) => {
      const a = nh, z = PD, c = Ej;
      return Y(), DI(r(qe), { class: "draw" }, {
        default: F(() => [
          MI(c, {
            visible: y.editor.isActive("paper"),
            placement: "top",
            width: "max-content",
            trigger: "click",
            teleported: !1
          }, {
            reference: F(() => [
              (Y(), $("svg", {
                ref_key: "canvas",
                ref: u,
                class: "draw-svg",
                viewBox: "0 0 100 100",
                style: BI({ width: j.value, height: n.value })
              }, [
                (Y(!0), $(iM, null, eA(y.node.attrs.lines, (E) => (Y(), $(iM, null, [
                  E.id !== C.value ? (Y(), $("path", {
                    id: `id-${E.id}`,
                    key: E.id,
                    class: "draw-svg_path",
                    d: E.path,
                    stroke: E.color,
                    "stroke-width": E.size
                  }, null, 8, I3)) : TI("", !0)
                ], 64))), 256))
              ], 4))
            ]),
            default: F(() => [
              f("div", M3, [
                f("div", g3, [
                  A3,
                  MI(a, {
                    modelValue: A.value,
                    "onUpdate:modelValue": x[0] || (x[0] = (E) => A.value = E)
                  }, null, 8, ["modelValue"])
                ]),
                f("div", t3, [
                  D3,
                  ig(f("input", {
                    "onUpdate:modelValue": x[1] || (x[1] = (E) => t.value = E),
                    class: "cus-input",
                    type: "number",
                    min: "1",
                    max: "10"
                  }, null, 512), [
                    [cC, t.value]
                  ])
                ]),
                f("div", e3, [
                  i3,
                  ig(f("input", {
                    "onUpdate:modelValue": x[2] || (x[2] = (E) => j.value = E),
                    class: "cus-input",
                    placeholder: "\u8BF7\u8F93\u5165\u5BBD\u5EA6"
                  }, null, 512), [
                    [cC, j.value]
                  ])
                ]),
                f("div", N3, [
                  C3,
                  ig(f("input", {
                    "onUpdate:modelValue": x[3] || (x[3] = (E) => n.value = E),
                    class: "cus-input",
                    placeholder: "\u8BF7\u8F93\u5165\u9AD8\u5EA6"
                  }, null, 512), [
                    [cC, n.value]
                  ])
                ]),
                f("div", u3, [
                  MI(z, {
                    type: "primary",
                    link: "",
                    onClick: L
                  }, {
                    default: F(() => [
                      j3
                    ]),
                    _: 1
                  })
                ])
              ])
            ]),
            _: 1
          }, 8, ["visible"])
        ]),
        _: 1
      });
    };
  }
});
const o3 = JI.create({
  name: "paper",
  group: "block",
  atom: !0,
  addAttributes() {
    return {
      lines: {
        default: []
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="paper"]'
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["div", OI(M, { "data-type": "paper" })];
  },
  addNodeView() {
    return Mi(L3);
  }
}), T3 = /* @__PURE__ */ f("div", {
  class: "highlight-block_emoji",
  contenteditable: "false",
  draggable: "true",
  "data-drag-handle": ""
}, " \u{1F389} ", -1), s3 = /* @__PURE__ */ eI({
  __name: "HighLightBlock",
  props: Ii,
  setup(M) {
    return (I, g) => (Y(), DI(r(qe), { class: "highlight-block" }, {
      default: F(() => [
        T3,
        MI(r(Wu), { class: "content" })
      ]),
      _: 1
    }));
  }
});
const S3 = JI.create({
  name: "highlightBlock",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: !0,
  draggable: !0,
  addCommands() {
    return {
      setHighlightBlock: (M) => ({ commands: I }) => I.wrapIn(this.name)
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="highlight-block"]'
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["div", OI(this.options.HTMLAttributes, M, { "data-type": "highlight-block" }), 0];
  },
  addNodeView() {
    return Mi(s3);
  }
  class: "attachment",
  contenteditable: "false"
}, l3 = { class: "icon-box" }, y3 = { class: "icon file-icon" }, c3 = ["xlink:href"], x3 = { class: "content" }, r3 = { class: "name" }, w3 = { class: "size" }, E3 = { class: "icon-box download-icon" }, d3 = ["href"], z3 = { class: "icon" }, m3 = ["xlink:href"], b3 = {
  name: "Attachment"
}, Y3 = /* @__PURE__ */ eI({
  ...b3,
  props: Ii,
  setup(M) {
    const I = M, g = h(Ea);
    return RI(() => {
    }), (A, t) => (Y(), DI(r(qe), { class: "attachment-content" }, {
      default: F(() => [
        f("div", a3, [
          f("div", l3, [
            (Y(), $("svg", y3, [
              f("use", {
                "xlink:href": `${g.value}#ri-file-code-fill`
              }, null, 8, c3)
            ]))
          ]),
          f("div", x3, [
            f("div", r3, IM(I.node.attrs.name), 1),
            f("div", w3, IM(I.node.attrs.size), 1)
          ]),
          f("div", E3, [
            f("a", {
              href: I.node.attrs.src,
              target: "_blank"
            }, [
              (Y(), $("svg", z3, [
                f("use", {
                  "xlink:href": `${g.value}#ri-download-line`
                }, null, 8, m3)
              ]))
            ], 8, d3)
          ])
        ]),
        MI(r(Wu), { class: "content" })
      ]),
      _: 1
    }));
  }
});
const pg = (M, I) => {
  const g = M.__vccOpts || M;
  for (const [A, t] of I)
    g[A] = t;
  return g;
}, p3 = /* @__PURE__ */ pg(Y3, [["__scopeId", "data-v-a3f9ace0"]]), Q3 = JI.create({
  name: "attachment",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return {
      name: {
        default: null
      },
      size: {
        default: null
      },
      src: {
        default: null
      }
    };
  },
  group: "block",
  draggable: !0,
  addCommands() {
    return {
      setAttachment: (M) => ({ commands: I }) => I.insertContent({
        type: this.name,
        attrs: M
      })
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="attachment"]'
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["div", OI(this.options.HTMLAttributes, M, { "data-type": "attachment" })];
  },
  addNodeView() {
    return Mi(p3);
  }
});
let Au, tu;
if (typeof WeakMap < "u") {
  let M = /* @__PURE__ */ new WeakMap();
  Au = (I) => M.get(I), tu = (I, g) => (M.set(I, g), g);
} else {
  let M = [], I = 10, g = 0;
  Au = (A) => {
    for (let t = 0; t < M.length; t += 2)
      if (M[t] == A)
        return M[t + 1];
  }, tu = (A, t) => (g == I && (g = 0), M[g++] = A, M[g++] = t);
}
class pD {
  constructor(I, g, A, t) {
    this.left = I, this.top = g, this.right = A, this.bottom = t;
  }
}
class FI {
  constructor(I, g, A, t) {
    this.width = I, this.height = g, this.map = A, this.problems = t;
  }
  findCell(I) {
    for (let g = 0; g < this.map.length; g++) {
      let A = this.map[g];
      if (A != I)
        continue;
      let t = g % this.width, D = g / this.width | 0, e = t + 1, i = D + 1;
      for (let N = 1; e < this.width && this.map[g + N] == A; N++)
        e++;
      for (let N = 1; i < this.height && this.map[g + this.width * N] == A; N++)
        i++;
      return new pD(t, D, e, i);
    }
    throw new RangeError("No cell with offset " + I + " found");
  }
  colCount(I) {
    for (let g = 0; g < this.map.length; g++)
      if (this.map[g] == I)
        return g % this.width;
    throw new RangeError("No cell with offset " + I + " found");
  }
  nextCell(I, g, A) {
    let {
      left: t,
      right: D,
      top: e,
      bottom: i
    } = this.findCell(I);
    return g == "horiz" ? (A < 0 ? t == 0 : D == this.width) ? null : this.map[e * this.width + (A < 0 ? t - 1 : D)] : (A < 0 ? e == 0 : i == this.height) ? null : this.map[t + this.width * (A < 0 ? e - 1 : i)];
  }
  rectBetween(I, g) {
    let {
      left: A,
      right: t,
      top: D,
      bottom: e
    } = this.findCell(I), {
      left: i,
      right: N,
      top: C,
      bottom: u
    } = this.findCell(g);
    return new pD(Math.min(A, i), Math.min(D, C), Math.max(t, N), Math.max(e, u));
  }
  cellsInRect(I) {
    let g = [], A = {};
    for (let t = I.top; t < I.bottom; t++)
      for (let D = I.left; D < I.right; D++) {
        let e = t * this.width + D, i = this.map[e];
        A[i] || (A[i] = !0, (D != I.left || !D || this.map[e - 1] != i) && (t != I.top || !t || this.map[e - this.width] != i) && g.push(i));
      }
    return g;
  }
  positionAt(I, g, A) {
    for (let t = 0, D = 0; ; t++) {
      let e = D + A.child(t).nodeSize;
      if (t == I) {
        let i = g + I * this.width, N = (I + 1) * this.width;
        for (; i < N && this.map[i] < D; )
          i++;
        return i == N ? e - 1 : this.map[i];
      }
      D = e;
    }
  }
  static get(I) {
    return Au(I) || tu(I, h3(I));
  }
}
function h3(M) {
  if (M.type.spec.tableRole != "table")
    throw new RangeError("Not a table node: " + M.type.name);
  let I = O3(M), g = M.childCount, A = [], t = 0, D = null, e = [];
  for (let C = 0, u = I * g; C < u; C++)
    A[C] = 0;
  for (let C = 0, u = 0; C < g; C++) {
    let j = M.child(C);
    u++;
    for (let o = 0; ; o++) {
      for (; t < A.length && A[t] != 0; )
        t++;
      if (o == j.childCount)
        break;
      let T = j.child(o), {
        colspan: s,
        rowspan: S,
        colwidth: y
      } = T.attrs;
      for (let x = 0; x < S; x++) {
        if (x + C >= g) {
          (D || (D = [])).push({
            type: "overlong_rowspan",
            pos: u,
            n: S - x
          });
          break;
        }
        let a = t + x * I;
        for (let z = 0; z < s; z++) {
          A[a + z] == 0 ? A[a + z] = u : (D || (D = [])).push({
            type: "collision",
            row: C,
            pos: u,
            n: s - z
          });
          let c = y && y[z];
          if (c) {
            let E = (a + z) % I * 2, m = e[E];
            m == null || m != c && e[E + 1] == 1 ? (e[E] = c, e[E + 1] = 1) : m == c && e[E + 1]++;
          }
        }
      }
      t += s, u += T.nodeSize;
    }
    let n = (C + 1) * I, L = 0;
    for (; t < n; )
      A[t++] == 0 && L++;
    L && (D || (D = [])).push({
      type: "missing",
      row: C,
      n: L
    }), u++;
  }
  let i = new FI(I, g, A, D), N = !1;
  for (let C = 0; !N && C < e.length; C += 2)
    e[C] != null && e[C + 1] < g && (N = !0);
  return N && k3(i, e, M), i;
}
function O3(M) {
  let I = -1, g = !1;
  for (let A = 0; A < M.childCount; A++) {
    let t = M.child(A), D = 0;
    if (g)
      for (let e = 0; e < A; e++) {
        let i = M.child(e);
        for (let N = 0; N < i.childCount; N++) {
          let C = i.child(N);
          e + C.attrs.rowspan > A && (D += C.attrs.colspan);
        }
      }
    for (let e = 0; e < t.childCount; e++) {
      let i = t.child(e);
      D += i.attrs.colspan, i.attrs.rowspan > 1 && (g = !0);
    }
    I == -1 ? I = D : I != D && (I = Math.max(I, D));
  }
  return I;
}
function k3(M, I, g) {
  M.problems || (M.problems = []);
  for (let A = 0, t = {}; A < M.map.length; A++) {
    let D = M.map[A];
    if (t[D])
      continue;
    t[D] = !0;
    let e = g.nodeAt(D), i = null;
    for (let N = 0; N < e.attrs.colspan; N++) {
      let C = (A + N) % M.width, u = I[C * 2];
      u != null && (!e.attrs.colwidth || e.attrs.colwidth[N] != u) && ((i || (i = P3(e.attrs)))[N] = u);
    }
    i && M.problems.unshift({
      type: "colwidth mismatch",
      pos: D,
      colwidth: i
    });
  }
}
function P3(M) {
  if (M.colwidth)
    return M.colwidth.slice();
  let I = [];
  for (let g = 0; g < M.colspan; g++)
    I.push(0);
  return I;
}
function mM(M) {
  let I = M.cached.tableNodeTypes;
  if (!I) {
    I = M.cached.tableNodeTypes = {};
    for (let g in M.nodes) {
      let A = M.nodes[g], t = A.spec.tableRole;
      t && (I[t] = A);
    }
  }
  return I;
}
const cA = new TM("selectingCells");
function GD(M) {
  for (let I = M.depth - 1; I > 0; I--)
    if (M.node(I).type.spec.tableRole == "row")
      return M.node(0).resolve(M.before(I + 1));
  return null;
}
function f3(M) {
  for (let I = M.depth; I > 0; I--) {
    const g = M.node(I).type.spec.tableRole;
    if (g === "cell" || g === "header_cell")
      return M.node(I);
  }
  return null;
}
function Qg(M) {
  let I = M.selection.$head;
  for (let g = I.depth; g > 0; g--)
    if (I.node(g).type.spec.tableRole == "row")
      return !0;
  return !1;
}
function TC(M) {
  let I = M.selection;
  return I.$anchorCell ? I.$anchorCell.pos > I.$headCell.pos ? I.$anchorCell : I.$headCell : I.node && I.node.type.spec.tableRole == "cell" ? I.$anchor : GD(I.$head) || G3(I.$head);
}
function G3(M) {
  for (let I = M.nodeAfter, g = M.pos; I; I = I.firstChild, g++) {
    let A = I.type.spec.tableRole;
    if (A == "cell" || A == "header_cell")
      return M.doc.resolve(g);
  }
  for (let I = M.nodeBefore, g = M.pos; I; I = I.lastChild, g--) {
    let A = I.type.spec.tableRole;
    if (A == "cell" || A == "header_cell")
      return M.doc.resolve(g - I.nodeSize);
  }
}
function Du(M) {
  return M.parent.type.spec.tableRole == "row" && M.nodeAfter;
}
function W3(M) {
  return M.node(0).resolve(M.pos + M.nodeAfter.nodeSize);
}
function Qj(M, I) {
  return M.depth == I.depth && M.pos >= I.start(-1) && M.pos <= I.end(-1);
}
function da(M, I, g) {
  let A = M.start(-1), D = FI.get(M.node(-1)).nextCell(M.pos - A, I, g);
  return D == null ? null : M.node(0).resolve(A + D);
}
function nM(M, I, g) {
  let A = {};
  for (let t in M)
    A[t] = M[t];
  return A[I] = g, A;
}
function Et(M, I, g = 1) {
  let A = nM(M, "colspan", M.colspan - g);
  return A.colwidth && (A.colwidth = A.colwidth.slice(), A.colwidth.splice(I, g), A.colwidth.some((t) => t > 0) || (A.colwidth = null)), A;
}
function za(M, I, g = 1) {
  let A = nM(M, "colspan", M.colspan + g);
  if (A.colwidth) {
    A.colwidth = A.colwidth.slice();
    for (let t = 0; t < g; t++)
      A.colwidth.splice(I, 0, 0);
  }
  return A;
}
function Z3(M, I, g) {
  let A = mM(I.type.schema).header_cell;
  for (let t = 0; t < M.height; t++)
    if (I.nodeAt(M.map[g + t * M.width]).type != A)
      return !1;
  return !0;
}
class EI extends uI {
  constructor(I, g = I) {
    let A = I.node(-1), t = FI.get(A), D = I.start(-1), e = t.rectBetween(I.pos - D, g.pos - D), i = I.node(0), N = t.cellsInRect(e).filter((u) => u != g.pos - D);
    N.unshift(g.pos - D);
    let C = N.map((u) => {
      let j = A.nodeAt(u), n = u + D + 1;
      return new e4(i.resolve(n), i.resolve(n + j.content.size));
    });
    super(C[0].$from, C[0].$to, C), this.$anchorCell = I, this.$headCell = g;
  }
  map(I, g) {
    let A = I.resolve(g.map(this.$anchorCell.pos)), t = I.resolve(g.map(this.$headCell.pos));
    if (Du(A) && Du(t) && Qj(A, t)) {
      let D = this.$anchorCell.node(-1) != A.node(-1);
      return D && this.isRowSelection() ? EI.rowSelection(A, t) : D && this.isColSelection() ? EI.colSelection(A, t) : new EI(A, t);
    }
    return LI.between(A, t);
  }
  content() {
    let I = this.$anchorCell.node(-1), g = FI.get(I), A = this.$anchorCell.start(-1), t = g.rectBetween(this.$anchorCell.pos - A, this.$headCell.pos - A), D = {}, e = [];
    for (let N = t.top; N < t.bottom; N++) {
      let C = [];
      for (let u = N * g.width + t.left, j = t.left; j < t.right; j++, u++) {
        let n = g.map[u];
        if (!D[n]) {
          D[n] = !0;
          let L = g.findCell(n), o = I.nodeAt(n), T = t.left - L.left, s = L.right - t.right;
          if (T > 0 || s > 0) {
            let S = o.attrs;
            T > 0 && (S = Et(S, 0, T)), s > 0 && (S = Et(S, S.colspan - s, s)), L.left < t.left ? o = o.type.createAndFill(S) : o = o.type.create(S, o.content);
          }
          if (L.top < t.top || L.bottom > t.bottom) {
            let S = nM(o.attrs, "rowspan", Math.min(L.bottom, t.bottom) - Math.max(L.top, t.top));
            L.top < t.top ? o = o.type.createAndFill(S) : o = o.type.create(S, o.content);
          }
          C.push(o);
        }
      }
      e.push(I.child(N).copy(G.from(C)));
    }
    const i = this.isColSelection() && this.isRowSelection() ? I : e;
    return new K(G.from(i), 1, 1);
  }
  replace(I, g = K.empty) {
    let A = I.steps.length, t = this.ranges;
    for (let e = 0; e < t.length; e++) {
      let {
        $from: i,
        $to: N
      } = t[e], C = I.mapping.slice(A);
      I.replace(C.map(i.pos), C.map(N.pos), e ? K.empty : g);
    }
    let D = uI.findFrom(I.doc.resolve(I.mapping.slice(A).map(this.to)), -1);
    D && I.setSelection(D);
  }
  replaceWith(I, g) {
    this.replace(I, new K(G.from(g), 0, 0));
  }
  forEachCell(I) {
    let g = this.$anchorCell.node(-1), A = FI.get(g), t = this.$anchorCell.start(-1), D = A.cellsInRect(A.rectBetween(this.$anchorCell.pos - t, this.$headCell.pos - t));
    for (let e = 0; e < D.length; e++)
      I(g.nodeAt(D[e]), t + D[e]);
  }
  isColSelection() {
    let I = this.$anchorCell.index(-1), g = this.$headCell.index(-1);
    if (Math.min(I, g) > 0)
      return !1;
    let A = I + this.$anchorCell.nodeAfter.attrs.rowspan, t = g + this.$headCell.nodeAfter.attrs.rowspan;
    return Math.max(A, t) == this.$headCell.node(-1).childCount;
  }
  static colSelection(I, g = I) {
    let A = FI.get(I.node(-1)), t = I.start(-1), D = A.findCell(I.pos - t), e = A.findCell(g.pos - t), i = I.node(0);
    return D.top <= e.top ? (D.top > 0 && (I = i.resolve(t + A.map[D.left])), e.bottom < A.height && (g = i.resolve(t + A.map[A.width * (A.height - 1) + e.right - 1]))) : (e.top > 0 && (g = i.resolve(t + A.map[e.left])), D.bottom < A.height && (I = i.resolve(t + A.map[A.width * (A.height - 1) + D.right - 1]))), new EI(I, g);
  }
  isRowSelection() {
    let I = FI.get(this.$anchorCell.node(-1)), g = this.$anchorCell.start(-1), A = I.colCount(this.$anchorCell.pos - g), t = I.colCount(this.$headCell.pos - g);
    if (Math.min(A, t) > 0)
      return !1;
    let D = A + this.$anchorCell.nodeAfter.attrs.colspan, e = t + this.$headCell.nodeAfter.attrs.colspan;
    return Math.max(D, e) == I.width;
  }
  eq(I) {
    return I instanceof EI && I.$anchorCell.pos == this.$anchorCell.pos && I.$headCell.pos == this.$headCell.pos;
  }
  static rowSelection(I, g = I) {
    let A = FI.get(I.node(-1)), t = I.start(-1), D = A.findCell(I.pos - t), e = A.findCell(g.pos - t), i = I.node(0);
    return D.left <= e.left ? (D.left > 0 && (I = i.resolve(t + A.map[D.top * A.width])), e.right < A.width && (g = i.resolve(t + A.map[A.width * (e.top + 1) - 1]))) : (e.left > 0 && (g = i.resolve(t + A.map[e.top * A.width])), D.right < A.width && (I = i.resolve(t + A.map[A.width * (D.top + 1) - 1]))), new EI(I, g);
  }
  toJSON() {
    return {
      type: "cell",
      anchor: this.$anchorCell.pos,
      head: this.$headCell.pos
    };
  }
  static fromJSON(I, g) {
    return new EI(I.resolve(g.anchor), I.resolve(g.head));
  }
  static create(I, g, A = g) {
    return new EI(I.resolve(g), I.resolve(A));
  }
  getBookmark() {
    return new hj(this.$anchorCell.pos, this.$headCell.pos);
  }
}
EI.prototype.visible = !1;
uI.jsonID("cell", EI);
class hj {
  constructor(I, g) {
    this.anchor = I, this.head = g;
  }
  map(I) {
    return new hj(I.map(this.anchor), I.map(this.head));
  }
  resolve(I) {
    let g = I.resolve(this.anchor), A = I.resolve(this.head);
    return g.parent.type.spec.tableRole == "row" && A.parent.type.spec.tableRole == "row" && g.index() < g.parent.childCount && A.index() < A.parent.childCount && Qj(g, A) ? new EI(g, A) : uI.near(A, 1);
  }
}
function v3(M) {
  if (!(M.selection instanceof EI))
    return null;
  let I = [];
  return M.selection.forEachCell((g, A) => {
    I.push(zM.node(A, A + g.nodeSize, {
      class: "selectedCell"
    }));
  }), qI.create(M.doc, I);
}
function U3({
  $from: M,
  $to: I
}) {
  if (M.pos == I.pos || M.pos < M.pos - 6)
    return !1;
  let g = M.pos, A = I.pos, t = M.depth;
  for (; t >= 0 && !(M.after(t + 1) < M.end(t)); t--, g++)
    ;
  for (let D = I.depth; D >= 0 && !(I.before(D + 1) > I.start(D)); D--, A--)
    ;
  return g == A && /row|table/.test(M.node(t).type.spec.tableRole);
}
function J3({
  $from: M,
  $to: I
}) {
  let g, A;
  for (let t = M.depth; t > 0; t--) {
    let D = M.node(t);
    if (D.type.spec.tableRole === "cell" || D.type.spec.tableRole === "header_cell") {
      g = D;
      break;
    }
  }
  for (let t = I.depth; t > 0; t--) {
    let D = I.node(t);
    if (D.type.spec.tableRole === "cell" || D.type.spec.tableRole === "header_cell") {
      A = D;
      break;
    }
  }
  return g !== A && I.parentOffset === 0;
}
function B3(M, I, g) {
  let A = (I || M).selection, t = (I || M).doc, D, e;
  if (A instanceof CI && (e = A.node.type.spec.tableRole)) {
    if (e == "cell" || e == "header_cell")
      D = EI.create(t, A.from);
    else if (e == "row") {
      let i = t.resolve(A.from + 1);
      D = EI.rowSelection(i, i);
    } else if (!g) {
      let i = FI.get(A.node), N = A.from + 1, C = N + i.map[i.width * i.height - 1];
      D = EI.create(t, N + 1, C);
    }
  } else
    A instanceof LI && U3(A) ? D = LI.create(t, A.from) : A instanceof LI && J3(A) && (D = LI.create(t, A.$from.start(), A.$from.end()));
  return D && (I || (I = M.tr)).setSelection(D), I;
}
function R3(M) {
  if (!M.size)
    return null;
  let {
    content: I,
    openStart: g,
    openEnd: A
  } = M;
  for (; I.childCount == 1 && (g > 0 && A > 0 || I.firstChild.type.spec.tableRole == "table"); )
    g--, A--, I = I.firstChild.content;
  let t = I.firstChild, D = t.type.spec.tableRole, e = t.type.schema, i = [];
  if (D == "row")
    for (let N = 0; N < I.childCount; N++) {
      let C = I.child(N).content, u = N ? 0 : Math.max(0, g - 1), j = N < I.childCount - 1 ? 0 : Math.max(0, A - 1);
      (u || j) && (C = eu(mM(e).row, new K(C, u, j)).content), i.push(C);
    }
  else if (D == "cell" || D == "header_cell")
    i.push(g || A ? eu(mM(e).row, new K(I, g, A)).content : I);
  else
    return null;
  return H3(e, i);
}
function H3(M, I) {
  let g = [];
  for (let t = 0; t < I.length; t++) {
    let D = I[t];
    for (let e = D.childCount - 1; e >= 0; e--) {
      let {
        rowspan: i,
        colspan: N
      } = D.child(e).attrs;
      for (let C = t; C < t + i; C++)
        g[C] = (g[C] || 0) + N;
    }
  }
  let A = 0;
  for (let t = 0; t < g.length; t++)
    A = Math.max(A, g[t]);
  for (let t = 0; t < g.length; t++)
    if (t >= I.length && I.push(G.empty), g[t] < A) {
      let D = mM(M).cell.createAndFill(), e = [];
      for (let i = g[t]; i < A; i++)
        e.push(D);
      I[t] = I[t].append(G.from(e));
    }
  return {
    height: I.length,
    width: A,
    rows: I
  };
}
function eu(M, I) {
  let g = M.createAndFill();
  return new ou(g).replace(0, g.content.size, I).doc;
}
function V3({
  width: M,
  height: I,
  rows: g
}, A, t) {
  if (M != A) {
    let D = [], e = [];
    for (let i = 0; i < g.length; i++) {
      let N = g[i], C = [];
      for (let u = D[i] || 0, j = 0; u < A; j++) {
        let n = N.child(j % N.childCount);
        u + n.attrs.colspan > A && (n = n.type.create(Et(n.attrs, n.attrs.colspan, u + n.attrs.colspan - A), n.content)), C.push(n), u += n.attrs.colspan;
        for (let L = 1; L < n.attrs.rowspan; L++)
          D[i + L] = (D[i + L] || 0) + n.attrs.colspan;
      }
      e.push(G.from(C));
    }
    g = e, M = A;
  }
  if (I != t) {
    let D = [];
    for (let e = 0, i = 0; e < t; e++, i++) {
      let N = [], C = g[i % I];
      for (let u = 0; u < C.childCount; u++) {
        let j = C.child(u);
        e + j.attrs.rowspan > t && (j = j.type.create(nM(j.attrs, "rowspan", Math.max(1, t - j.attrs.rowspan)), j.content)), N.push(j);
      }
      D.push(G.from(N));
    }
    g = D, I = t;
  }
  return {
    width: M,
    height: I,
    rows: g
  };
}
function F3(M, I, g, A, t, D, e) {
  let i = M.doc.type.schema, N = mM(i), C, u;
  if (t > I.width)
    for (let j = 0, n = 0; j < I.height; j++) {
      let L = g.child(j);
      n += L.nodeSize;
      let o = [], T;
      L.lastChild == null || L.lastChild.type == N.cell ? T = C || (C = N.cell.createAndFill()) : T = u || (u = N.header_cell.createAndFill());
      for (let s = I.width; s < t; s++)
        o.push(T);
      M.insert(M.mapping.slice(e).map(n - 1 + A), o);
    }
  if (D > I.height) {
    let j = [];
    for (let o = 0, T = (I.height - 1) * I.width; o < Math.max(I.width, t); o++) {
      let s = o >= I.width ? !1 : g.nodeAt(I.map[T + o]).type == N.header_cell;
      j.push(s ? u || (u = N.header_cell.createAndFill()) : C || (C = N.cell.createAndFill()));
    }
    let n = N.row.create(null, G.from(j)), L = [];
    for (let o = I.height; o < D; o++)
      L.push(n);
    M.insert(M.mapping.slice(e).map(A + g.nodeSize - 2), L);
  }
  return !!(C || u);
}
function Vo(M, I, g, A, t, D, e, i) {
  if (e == 0 || e == I.height)
    return !1;
  let N = !1;
  for (let C = t; C < D; C++) {
    let u = e * I.width + C, j = I.map[u];
    if (I.map[u - I.width] == j) {
      N = !0;
      let n = g.nodeAt(j), {
        top: L,
        left: o
      } = I.findCell(j);
      M.setNodeMarkup(M.mapping.slice(i).map(j + A), null, nM(n.attrs, "rowspan", e - L)), M.insert(M.mapping.slice(i).map(I.positionAt(e, o, g)), n.type.createAndFill(nM(n.attrs, "rowspan", L + n.attrs.rowspan - e))), C += n.attrs.colspan - 1;
    }
  }
  return N;
}
function Fo(M, I, g, A, t, D, e, i) {
  if (e == 0 || e == I.width)
    return !1;
  let N = !1;
  for (let C = t; C < D; C++) {
    let u = C * I.width + e, j = I.map[u];
    if (I.map[u - 1] == j) {
      N = !0;
      let n = g.nodeAt(j), L = I.colCount(j), o = M.mapping.slice(i).map(j + A);
      M.setNodeMarkup(o, null, Et(n.attrs, e - L, n.attrs.colspan - (e - L))), M.insert(o + n.nodeSize, n.type.createAndFill(Et(n.attrs, 0, e - L))), C += n.attrs.rowspan - 1;
    }
  }
  return N;
}
function Xo(M, I, g, A, t) {
  let D = g ? M.doc.nodeAt(g - 1) : M.doc, e = FI.get(D), {
    top: i,
    left: N
  } = A, C = N + t.width, u = i + t.height, j = M.tr, n = 0;
  function L() {
    D = g ? j.doc.nodeAt(g - 1) : j.doc, e = FI.get(D), n = j.mapping.maps.length;
  }
  F3(j, e, D, g, C, u, n) && L(), Vo(j, e, D, g, N, C, i, n) && L(), Vo(j, e, D, g, N, C, u, n) && L(), Fo(j, e, D, g, i, u, N, n) && L(), Fo(j, e, D, g, i, u, C, n) && L();
  for (let o = i; o < u; o++) {
    let T = e.positionAt(o, N, D), s = e.positionAt(o, C, D);
    j.replace(j.mapping.slice(n).map(T + g), j.mapping.slice(n).map(s + g), new K(t.rows[o - i], 0, 0));
  }
  L(), j.setSelection(new EI(j.doc.resolve(g + e.positionAt(i, N, D)), j.doc.resolve(g + e.positionAt(u - 1, C - 1, D)))), I(j);
}
const X3 = du({
  ArrowLeft: wi("horiz", -1),
  ArrowRight: wi("horiz", 1),
  ArrowUp: wi("vert", -1),
  ArrowDown: wi("vert", 1),
  "Shift-ArrowLeft": Ei("horiz", -1),
  "Shift-ArrowRight": Ei("horiz", 1),
  "Shift-ArrowUp": Ei("vert", -1),
  "Shift-ArrowDown": Ei("vert", 1),
  Backspace: di,
  "Mod-Backspace": di,
  Delete: di,
  "Mod-Delete": di
});
function Bi(M, I, g) {
  return g.eq(M.selection) ? !1 : (I && I(M.tr.setSelection(g).scrollIntoView()), !0);
}
function wi(M, I) {
  return (g, A, t) => {
    let D = g.selection;
    if (D instanceof EI)
      return Bi(g, A, uI.near(D.$headCell, I));
    if (M != "horiz" && !D.empty)
      return !1;
    let e = ma(t, M, I);
    if (e == null)
      return !1;
    if (M == "horiz")
      return Bi(g, A, uI.near(g.doc.resolve(D.head + I), I));
    {
      let i = g.doc.resolve(e), N = da(i, M, I), C;
      return N ? C = uI.near(N, 1) : I < 0 ? C = uI.near(g.doc.resolve(i.before(-1)), -1) : C = uI.near(g.doc.resolve(i.after(-1)), 1), Bi(g, A, C);
    }
  };
}
function Ei(M, I) {
  return (g, A, t) => {
    let D = g.selection;
    if (!(D instanceof EI)) {
      let i = ma(t, M, I);
      if (i == null)
        return !1;
      D = new EI(g.doc.resolve(i));
    }
    let e = da(D.$headCell, M, I);
    return e ? Bi(g, A, new EI(D.$anchorCell, e)) : !1;
  };
}
function di(M, I) {
  let g = M.selection;
  if (!(g instanceof EI))
    return !1;
  if (I) {
    let A = M.tr, t = mM(M.schema).cell.createAndFill().content;
    g.forEachCell((D, e) => {
      D.content.eq(t) || A.replace(A.mapping.map(e + 1), A.mapping.map(e + D.nodeSize - 1), new K(t, 0, 0));
    }), A.docChanged && I(A);
  }
  return !0;
}
function K3(M, I) {
  let g = M.state.doc, A = GD(g.resolve(I));
  return A ? (M.dispatch(M.state.tr.setSelection(new EI(A))), !0) : !1;
}
function _3(M, I, g) {
  if (!Qg(M.state))
    return !1;
  let A = R3(g), t = M.state.selection;
  if (t instanceof EI) {
    A || (A = {
      width: 1,
      height: 1,
      rows: [G.from(eu(mM(M.state.schema).cell, g))]
    });
    let D = t.$anchorCell.node(-1), e = t.$anchorCell.start(-1), i = FI.get(D).rectBetween(t.$anchorCell.pos - e, t.$headCell.pos - e);
    return A = V3(A, i.right - i.left, i.bottom - i.top), Xo(M.state, M.dispatch, e, i, A), !0;
  } else if (A) {
    let D = TC(M.state), e = D.start(-1);
    return Xo(M.state, M.dispatch, e, FI.get(D.node(-1)).findCell(D.pos - e), A), !0;
  } else
    return !1;
}
function $3(M, I) {
  if (I.ctrlKey || I.metaKey)
    return;
  let g = Ko(M, I.target), A;
  if (I.shiftKey && M.state.selection instanceof EI)
    t(M.state.selection.$anchorCell, I), I.preventDefault();
  else if (I.shiftKey && g && (A = GD(M.state.selection.$anchor)) != null && C0(M, I).pos != A.pos)
    t(A, I), I.preventDefault();
  else if (!g)
    return;
  function t(i, N) {
    let C = C0(M, N), u = cA.getState(M.state) == null;
    if (!C || !Qj(i, C))
      if (u)
        C = i;
      else
        return;
    let j = new EI(i, C);
    if (u || !M.state.selection.eq(j)) {
      let n = M.state.tr.setSelection(j);
      u && n.setMeta(cA, i.pos), M.dispatch(n);
    }
  }
  function D() {
    M.root.removeEventListener("mouseup", D), M.root.removeEventListener("dragstart", D), M.root.removeEventListener("mousemove", e), cA.getState(M.state) != null && M.dispatch(M.state.tr.setMeta(cA, -1));
  }
  function e(i) {
    let N = cA.getState(M.state), C;
    if (N != null)
      C = M.state.doc.resolve(N);
    else if (Ko(M, i.target) != g && (C = C0(M, I), !C))
      return D();
    C && t(C, i);
  }
  M.root.addEventListener("mouseup", D), M.root.addEventListener("dragstart", D), M.root.addEventListener("mousemove", e);
}
function ma(M, I, g) {
  if (!(M.state.selection instanceof LI))
    return null;
  let {
    $head: A
  } = M.state.selection;
  for (let t = A.depth - 1; t >= 0; t--) {
    let D = A.node(t);
    if ((g < 0 ? A.index(t) : A.indexAfter(t)) != (g < 0 ? 0 : D.childCount))
      return null;
    if (D.type.spec.tableRole == "cell" || D.type.spec.tableRole == "header_cell") {
      let i = A.before(t), N = I == "vert" ? g > 0 ? "down" : "up" : g > 0 ? "right" : "left";
      return M.endOfTextblock(N) ? i : null;
    }
  }
  return null;
}
function Ko(M, I) {
  for (; I && I != M.dom; I = I.parentNode)
    if (I.nodeName == "TD" || I.nodeName == "TH")
      return I;
}
function C0(M, I) {
  let g = M.posAtCoords({
    left: I.clientX,
    top: I.clientY
  });
  return g && g ? GD(M.state.doc.resolve(g.pos)) : null;
}
const q3 = new TM("fix-tables");
function ba(M, I, g, A) {
  let t = M.childCount, D = I.childCount;
  I:
    for (let e = 0, i = 0; e < D; e++) {
      let N = I.child(e);
      for (let C = i, u = Math.min(t, e + 3); C < u; C++)
        if (M.child(C) == N) {
          i = C + 1, g += N.nodeSize;
          continue I;
        }
      A(N, g), i < t && M.child(i).sameMarkup(N) ? ba(M.child(i), N, g + 1, A) : N.nodesBetween(0, N.content.size, A, g + 1), g += N.nodeSize;
    }
}
function Ya(M, I) {
  let g, A = (t, D) => {
    t.type.spec.tableRole == "table" && (g = IG(M, t, D, g));
  };
  return I ? I.doc != M.doc && ba(I.doc, M.doc, 0, A) : M.doc.descendants(A), g;
}
function IG(M, I, g, A) {
  let t = FI.get(I);
  if (!t.problems)
    return A;
  A || (A = M.tr);
  let D = [];
  for (let N = 0; N < t.height; N++)
    D.push(0);
  for (let N = 0; N < t.problems.length; N++) {
    let C = t.problems[N];
    if (C.type == "collision") {
      let u = I.nodeAt(C.pos);
      for (let j = 0; j < u.attrs.rowspan; j++)
        D[C.row + j] += C.n;
      A.setNodeMarkup(A.mapping.map(g + 1 + C.pos), null, Et(u.attrs, u.attrs.colspan - C.n, C.n));
    } else if (C.type == "missing")
      D[C.row] += C.n;
    else if (C.type == "overlong_rowspan") {
      let u = I.nodeAt(C.pos);
      A.setNodeMarkup(A.mapping.map(g + 1 + C.pos), null, nM(u.attrs, "rowspan", u.attrs.rowspan - C.n));
    } else if (C.type == "colwidth mismatch") {
      let u = I.nodeAt(C.pos);
      A.setNodeMarkup(A.mapping.map(g + 1 + C.pos), null, nM(u.attrs, "colwidth", C.colwidth));
    }
  }
  let e, i;
  for (let N = 0; N < D.length; N++)
    D[N] && (e == null && (e = N), i = N);
  for (let N = 0, C = g + 1; N < t.height; N++) {
    let u = I.child(N), j = C + u.nodeSize, n = D[N];
    if (n > 0) {
      let L = "cell";
      u.firstChild && (L = u.firstChild.type.spec.tableRole);
      let o = [];
      for (let s = 0; s < n; s++)
        o.push(mM(M.schema)[L].createAndFill());
      let T = (N == 0 || e == N - 1) && i == N ? C + 1 : j - 1;
      A.insert(A.mapping.map(T), o);
    }
    C = j;
  }
  return A.setMeta(q3, {
    fixTables: !0
  });
}
function Fg(M) {
  let I = M.selection, g = TC(M), A = g.node(-1), t = g.start(-1), D = FI.get(A), e;
  return I instanceof EI ? e = D.rectBetween(I.$anchorCell.pos - t, I.$headCell.pos - t) : e = D.findCell(g.pos - t), e.tableStart = t, e.map = D, e.table = A, e;
}
function pa(M, {
  map: I,
  tableStart: g,
  table: A
}, t) {
  let D = t > 0 ? -1 : 0;
  Z3(I, A, t + D) && (D = t == 0 || t == I.width ? null : 0);
  for (let e = 0; e < I.height; e++) {
    let i = e * I.width + t;
    if (t > 0 && t < I.width && I.map[i - 1] == I.map[i]) {
      let N = I.map[i], C = A.nodeAt(N);
      M.setNodeMarkup(M.mapping.map(g + N), null, za(C.attrs, t - I.colCount(N))), e += C.attrs.rowspan - 1;
    } else {
      let N = D == null ? mM(A.type.schema).cell : A.nodeAt(I.map[i + D]).type, C = I.positionAt(e, t, A);
      M.insert(M.mapping.map(g + C), N.createAndFill());
    }
  }
  return M;
}
function MG(M, I) {
  if (!Qg(M))
    return !1;
  if (I) {
    let g = Fg(M);
    I(pa(M.tr, g, g.left));
  }
  return !0;
}
function gG(M, I) {
  if (!Qg(M))
    return !1;
  if (I) {
    let g = Fg(M);
    I(pa(M.tr, g, g.right));
  }
  return !0;
}
function AG(M, {
  map: I,
  table: g,
  tableStart: A
}, t) {
  let D = M.mapping.maps.length;
  for (let e = 0; e < I.height; ) {
    let i = e * I.width + t, N = I.map[i], C = g.nodeAt(N);
    if (t > 0 && I.map[i - 1] == N || t < I.width - 1 && I.map[i + 1] == N)
      M.setNodeMarkup(M.mapping.slice(D).map(A + N), null, Et(C.attrs, t - I.colCount(N)));
    else {
      let u = M.mapping.slice(D).map(A + N);
      M.delete(u, u + C.nodeSize);
    }
    e += C.attrs.rowspan;
  }
}
function tG(M, I) {
  if (!Qg(M))
    return !1;
  if (I) {
    let g = Fg(M), A = M.tr;
    if (g.left == 0 && g.right == g.map.width)
      return !1;
    for (let t = g.right - 1; AG(A, g, t), t != g.left; t--)
      g.table = g.tableStart ? A.doc.nodeAt(g.tableStart - 1) : A.doc, g.map = FI.get(g.table);
    I(A);
  }
  return !0;
}
function DG(M, I, g) {
  let A = mM(I.type.schema).header_cell;
  for (let t = 0; t < M.width; t++)
    if (I.nodeAt(M.map[t + g * M.width]).type != A)
      return !1;
  return !0;
}
function Qa(M, {
  map: I,
  tableStart: g,
  table: A
}, t) {
  let D = g;
  for (let N = 0; N < t; N++)
    D += A.child(N).nodeSize;
  let e = [], i = t > 0 ? -1 : 0;
  DG(I, A, t + i) && (i = t == 0 || t == I.height ? null : 0);
  for (let N = 0, C = I.width * t; N < I.width; N++, C++)
    if (t > 0 && t < I.height && I.map[C] == I.map[C - I.width]) {
      let u = I.map[C], j = A.nodeAt(u).attrs;
      M.setNodeMarkup(g + u, null, nM(j, "rowspan", j.rowspan + 1)), N += j.colspan - 1;
    } else {
      let u = i == null ? mM(A.type.schema).cell : A.nodeAt(I.map[C + i * I.width]).type;
      e.push(u.createAndFill());
    }
  return M.insert(D, mM(A.type.schema).row.create(null, e)), M;
}
function eG(M, I) {
  if (!Qg(M))
    return !1;
  if (I) {
    let g = Fg(M);
    I(Qa(M.tr, g, g.top));
  }
  return !0;
}
function iG(M, I) {
  if (!Qg(M))
    return !1;
  if (I) {
    let g = Fg(M);
    I(Qa(M.tr, g, g.bottom));
  }
  return !0;
}
function NG(M, {
  map: I,
  table: g,
  tableStart: A
}, t) {
  let D = 0;
  for (let N = 0; N < t; N++)
    D += g.child(N).nodeSize;
  let e = D + g.child(t).nodeSize, i = M.mapping.maps.length;
  M.delete(D + A, e + A);
  for (let N = 0, C = t * I.width; N < I.width; N++, C++) {
    let u = I.map[C];
    if (t > 0 && u == I.map[C - I.width]) {
      let j = g.nodeAt(u).attrs;
      M.setNodeMarkup(M.mapping.slice(i).map(u + A), null, nM(j, "rowspan", j.rowspan - 1)), N += j.colspan - 1;
    } else if (t < I.width && u == I.map[C + I.width]) {
      let j = g.nodeAt(u), n = j.type.create(nM(j.attrs, "rowspan", j.attrs.rowspan - 1), j.content), L = I.positionAt(t + 1, N, g);
      M.insert(M.mapping.slice(i).map(A + L), n), N += j.attrs.colspan - 1;
    }
  }
}
function CG(M, I) {
  if (!Qg(M))
    return !1;
  if (I) {
    let g = Fg(M), A = M.tr;
    if (g.top == 0 && g.bottom == g.map.height)
      return !1;
    for (let t = g.bottom - 1; NG(A, g, t), t != g.top; t--)
      g.table = g.tableStart ? A.doc.nodeAt(g.tableStart - 1) : A.doc, g.map = FI.get(g.table);
    I(A);
  }
  return !0;
}
function _o(M) {
  let I = M.content;
  return I.childCount == 1 && I.firstChild.isTextblock && I.firstChild.childCount == 0;
}
function uG({
  width: M,
  height: I,
  map: g
}, A) {
  let t = A.top * M + A.left, D = t, e = (A.bottom - 1) * M + A.left, i = t + (A.right - A.left - 1);
  for (let N = A.top; N < A.bottom; N++) {
    if (A.left > 0 && g[D] == g[D - 1] || A.right < M && g[i] == g[i + 1])
      return !0;
    D += M, i += M;
  }
  for (let N = A.left; N < A.right; N++) {
    if (A.top > 0 && g[t] == g[t - M] || A.bottom < I && g[e] == g[e + M])
      return !0;
    t++, e++;
  }
  return !1;
}
function $o(M, I) {
  let g = M.selection;
  if (!(g instanceof EI) || g.$anchorCell.pos == g.$headCell.pos)
    return !1;
  let A = Fg(M), {
    map: t
  } = A;
  if (uG(t, A))
    return !1;
  if (I) {
    let D = M.tr, e = {}, i = G.empty, N, C;
    for (let u = A.top; u < A.bottom; u++)
      for (let j = A.left; j < A.right; j++) {
        let n = t.map[u * t.width + j], L = A.table.nodeAt(n);
        if (!e[n])
          if (e[n] = !0, N == null)
            N = n, C = L;
          else {
            _o(L) || (i = i.append(L.content));
            let o = D.mapping.map(n + A.tableStart);
            D.delete(o, o + L.nodeSize);
          }
      }
    if (D.setNodeMarkup(N + A.tableStart, null, nM(za(C.attrs, C.attrs.colspan, A.right - A.left - C.attrs.colspan), "rowspan", A.bottom - A.top)), i.size) {
      let u = N + 1 + C.content.size, j = _o(C) ? N + 1 : u;
      D.replaceWith(j + A.tableStart, u + A.tableStart, i);
    }
    D.setSelection(new EI(D.doc.resolve(N + A.tableStart))), I(D);
  }
  return !0;
}
function qo(M, I) {
  const g = mM(M.schema);
  return jG(({
    node: A
  }) => g[A.type.spec.tableRole])(M, I);
}
function jG(M) {
  return (I, g) => {
    let A = I.selection, t, D;
    if (A instanceof EI) {
      if (A.$anchorCell.pos != A.$headCell.pos)
        return !1;
      t = A.$anchorCell.nodeAfter, D = A.$anchorCell.pos;
    } else {
      if (t = f3(A.$from), !t)
        return !1;
      D = GD(A.$from).pos;
    }
    if (t.attrs.colspan == 1 && t.attrs.rowspan == 1)
      return !1;
    if (g) {
      let e = t.attrs, i = [], N = e.colwidth;
      e.rowspan > 1 && (e = nM(e, "rowspan", 1)), e.colspan > 1 && (e = nM(e, "colspan", 1));
      let C = Fg(I), u = I.tr;
      for (let n = 0; n < C.right - C.left; n++)
        i.push(N ? nM(e, "colwidth", N && N[n] ? [N[n]] : null) : e);
      let j;
      for (let n = C.top; n < C.bottom; n++) {
        let L = C.map.positionAt(n, C.left, C.table);
        n == C.top && (L += t.nodeSize);
        for (let o = C.left, T = 0; o < C.right; o++, T++)
          o == C.left && n == C.top || u.insert(j = u.mapping.map(L + C.tableStart, 1), M({
            node: t,
            row: n,
            col: o
          }).createAndFill(i[T]));
      }
      u.setNodeMarkup(D, M({
        node: t,
        row: C.top,
        col: C.left
      }), i[0]), A instanceof EI && u.setSelection(new EI(u.doc.resolve(A.$anchorCell.pos), j && u.doc.resolve(j))), g(u);
    }
    return !0;
  };
}
function nG(M, I) {
  return function(g, A) {
    if (!Qg(g))
      return !1;
    let t = TC(g);
    if (t.nodeAfter.attrs[M] === I)
      return !1;
    if (A) {
      let D = g.tr;
      g.selection instanceof EI ? g.selection.forEachCell((e, i) => {
        e.attrs[M] !== I && D.setNodeMarkup(i, null, nM(e.attrs, M, I));
      }) : D.setNodeMarkup(t.pos, null, nM(t.nodeAfter.attrs, M, I)), A(D);
    }
    return !0;
  };
}
function LG(M) {
  return function(I, g) {
    if (!Qg(I))
      return !1;
    if (g) {
      let A = mM(I.schema), t = Fg(I), D = I.tr, e = t.map.cellsInRect(M == "column" ? new pD(t.left, 0, t.right, t.map.height) : M == "row" ? new pD(0, t.top, t.map.width, t.bottom) : t), i = e.map((N) => t.table.nodeAt(N));
      for (let N = 0; N < e.length; N++)
        i[N].type == A.header_cell && D.setNodeMarkup(t.tableStart + e[N], A.cell, i[N].attrs);
      if (D.steps.length == 0)
        for (let N = 0; N < e.length; N++)
          D.setNodeMarkup(t.tableStart + e[N], A.header_cell, i[N].attrs);
      g(D);
    }
    return !0;
  };
}
function IT(M, I, g) {
  const A = I.map.cellsInRect({
    left: 0,
    top: 0,
    right: M == "row" ? I.map.width : 1,
    bottom: M == "column" ? I.map.height : 1
  });
  for (let t = 0; t < A.length; t++) {
    const D = I.table.nodeAt(A[t]);
    if (D && D.type !== g.header_cell)
      return !1;
  }
  return !0;
}
function ve(M, I) {
  return I = I || {
    useDeprecatedLogic: !1
  }, I.useDeprecatedLogic ? LG(M) : function(g, A) {
    if (!Qg(g))
      return !1;
    if (A) {
      let t = mM(g.schema), D = Fg(g), e = g.tr, i = IT("row", D, t), N = IT("column", D, t), u = (M === "column" ? i : M === "row" ? N : !1) ? 1 : 0, j = M == "column" ? new pD(0, u, 1, D.map.height) : M == "row" ? new pD(u, 0, D.map.width, 1) : D, n = M == "column" ? N ? t.cell : t.header_cell : M == "row" ? i ? t.cell : t.header_cell : t.cell;
      D.map.cellsInRect(j).forEach((L) => {
        const o = L + D.tableStart, T = e.doc.nodeAt(o);
        T && e.setNodeMarkup(o, n, T.attrs);
      }), A(e);
    }
    return !0;
  };
}
ve("row", {
  useDeprecatedLogic: !0
});
ve("column", {
  useDeprecatedLogic: !0
});
let oG = ve("cell", {
  useDeprecatedLogic: !0
});
function TG(M, I) {
  if (I < 0) {
    let g = M.nodeBefore;
    if (g)
      return M.pos - g.nodeSize;
    for (let A = M.index(-1) - 1, t = M.before(); A >= 0; A--) {
      let D = M.node(-1).child(A);
      if (D.childCount)
        return t - 1 - D.lastChild.nodeSize;
      t -= D.nodeSize;
    }
  } else {
    if (M.index() < M.parent.childCount - 1)
      return M.pos + M.nodeAfter.nodeSize;
    let g = M.node(-1);
    for (let A = M.indexAfter(-1), t = M.after(); A < g.childCount; A++) {
      let D = g.child(A);
      if (D.childCount)
        return t + 1;
      t += D.nodeSize;
    }
  }
}
function MT(M) {
  return function(I, g) {
    if (!Qg(I))
      return !1;
    let A = TG(TC(I), M);
    if (A != null) {
      if (g) {
        let t = I.doc.resolve(A);
        g(I.tr.setSelection(LI.between(t, W3(t))).scrollIntoView());
      }
      return !0;
    }
  };
}
function sG(M, I) {
  let g = M.selection.$anchor;
  for (let A = g.depth; A > 0; A--)
    if (g.node(A).type.spec.tableRole == "table")
      return I && I(M.tr.delete(g.before(A), g.after(A)).scrollIntoView()), !0;
  return !1;
}
class SG {
  constructor(I, g) {
    this.node = I, this.cellMinWidth = g, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table")), this.colgroup = this.table.appendChild(document.createElement("colgroup")), iu(I, this.colgroup, this.table, g), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(I) {
    return I.type != this.node.type ? !1 : (this.node = I, iu(I, this.colgroup, this.table, this.cellMinWidth), !0);
  }
  ignoreMutation(I) {
    return I.type == "attributes" && (I.target == this.table || this.colgroup.contains(I.target));
  }
}
function iu(M, I, g, A, t, D) {
  let e = 0, i = !0, N = I.firstChild, C = M.firstChild;
  for (let u = 0, j = 0; u < C.childCount; u++) {
    let {
      colspan: n,
      colwidth: L
    } = C.child(u).attrs;
    for (let o = 0; o < n; o++, j++) {
      let T = t == j ? D : L && L[o], s = T ? T + "px" : "";
      e += T || A, T || (i = !1), N ? (N.style.width != s && (N.style.width = s), N = N.nextSibling) : I.appendChild(document.createElement("col")).style.width = s;
    }
  }
  for (; N; ) {
    let u = N.nextSibling;
    N.parentNode.removeChild(N), N = u;
  }
  i ? (g.style.width = e + "px", g.style.minWidth = "") : (g.style.width = "", g.style.minWidth = e + "px");
}
const eg = new TM("tableColumnResizing");
function aG({
  handleWidth: M = 5,
  cellMinWidth: I = 25,
  View: g = SG,
  lastColumnResizable: A = !0
} = {}) {
  return new XI({
    key: eg,
    state: {
      init(D, e) {
        return this.spec.props.nodeViews[mM(e.schema).table.name] = (i, N) => new g(i, I, N), new ae(-1, !1);
      },
      apply(D, e) {
        return e.apply(D);
      }
    },
    props: {
      attributes(D) {
        return eg.getState(D).activeHandle > -1 ? {
          class: "resize-cursor"
        } : null;
      },
      handleDOMEvents: {
        mousemove(D, e) {
          lG(D, e, M, I, A);
        },
        mouseleave(D) {
          yG(D);
        },
        mousedown(D, e) {
          cG(D, e, I);
        }
      },
      decorations(D) {
        let e = eg.getState(D);
        if (e.activeHandle > -1)
          return zG(D, e.activeHandle);
      },
      nodeViews: {}
    }
  });
}
class ae {
  constructor(I, g) {
    this.activeHandle = I, this.dragging = g;
  }
  apply(I) {
    let g = this, A = I.getMeta(eg);
    if (A && A.setHandle != null)
      return new ae(A.setHandle, null);
    if (A && A.setDragging !== void 0)
      return new ae(g.activeHandle, A.setDragging);
    if (g.activeHandle > -1 && I.docChanged) {
      let t = I.mapping.map(g.activeHandle, -1);
      Du(I.doc.resolve(t)) || (t = null), g = new ae(t, g.dragging);
    }
    return g;
  }
}
function lG(M, I, g, A, t) {
  let D = eg.getState(M.state);
  if (!D.dragging) {
    let e = rG(I.target), i = -1;
    if (e) {
      let {
        left: N,
        right: C
      } = e.getBoundingClientRect();
      I.clientX - N <= g ? i = gT(M, I, "left") : C - I.clientX <= g && (i = gT(M, I, "right"));
    }
    if (i != D.activeHandle) {
      if (!t && i !== -1) {
        let N = M.state.doc.resolve(i), C = N.node(-1), u = FI.get(C), j = N.start(-1);
        if (u.colCount(N.pos - j) + N.nodeAfter.attrs.colspan - 1 == u.width - 1)
          return;
      }
      ha(M, i);
    }
  }
}
function yG(M) {
  let I = eg.getState(M.state);
  I.activeHandle > -1 && !I.dragging && ha(M, -1);
}
function cG(M, I, g) {
  let A = eg.getState(M.state);
  if (A.activeHandle == -1 || A.dragging)
    return !1;
  let t = M.state.doc.nodeAt(A.activeHandle), D = xG(M, A.activeHandle, t.attrs);
  M.dispatch(M.state.tr.setMeta(eg, {
    setDragging: {
      startX: I.clientX,
      startWidth: D
    }
  }));
  function e(N) {
    window.removeEventListener("mouseup", e), window.removeEventListener("mousemove", i);
    let C = eg.getState(M.state);
    C.dragging && (wG(M, C.activeHandle, AT(C.dragging, N, g)), M.dispatch(M.state.tr.setMeta(eg, {
      setDragging: null
    })));
  }
  function i(N) {
    if (!N.which)
      return e(N);
    let C = eg.getState(M.state), u = AT(C.dragging, N, g);
    EG(M, C.activeHandle, u, g);
  }
  return window.addEventListener("mouseup", e), window.addEventListener("mousemove", i), I.preventDefault(), !0;
}
function xG(M, I, {
  colspan: g,
  colwidth: A
}) {
  let t = A && A[A.length - 1];
  if (t)
    return t;
  let D = M.domAtPos(I), i = D.node.childNodes[D.offset].offsetWidth, N = g;
  if (A)
    for (let C = 0; C < g; C++)
      A[C] && (i -= A[C], N--);
  return i / N;
}
function rG(M) {
  for (; M && M.nodeName != "TD" && M.nodeName != "TH"; )
    M = M.classList.contains("ProseMirror") ? null : M.parentNode;
  return M;
}
function gT(M, I, g) {
  let A = M.posAtCoords({
    left: I.clientX,
    top: I.clientY
  });
  if (!A)
    return -1;
  let {
    pos: t
  } = A, D = GD(M.state.doc.resolve(t));
  if (!D)
    return -1;
  if (g == "right")
    return D.pos;
  let e = FI.get(D.node(-1)), i = D.start(-1), N = e.map.indexOf(D.pos - i);
  return N % e.width == 0 ? -1 : i + e.map[N - 1];
}
function AT(M, I, g) {
  let A = I.clientX - M.startX;
  return Math.max(g, M.startWidth + A);
}
function ha(M, I) {
  M.dispatch(M.state.tr.setMeta(eg, {
    setHandle: I
  }));
}
function wG(M, I, g) {
  let A = M.state.doc.resolve(I), t = A.node(-1), D = FI.get(t), e = A.start(-1), i = D.colCount(A.pos - e) + A.nodeAfter.attrs.colspan - 1, N = M.state.tr;
  for (let C = 0; C < D.height; C++) {
    let u = C * D.width + i;
    if (C && D.map[u] == D.map[u - D.width])
      continue;
    let j = D.map[u], {
      attrs: n
    } = t.nodeAt(j), L = n.colspan == 1 ? 0 : i - D.colCount(j);
    if (n.colwidth && n.colwidth[L] == g)
      continue;
    let o = n.colwidth ? n.colwidth.slice() : dG(n.colspan);
    o[L] = g, N.setNodeMarkup(e + j, null, nM(n, "colwidth", o));
  }
  N.docChanged && M.dispatch(N);
}
function EG(M, I, g, A) {
  let t = M.state.doc.resolve(I), D = t.node(-1), e = t.start(-1), i = FI.get(D).colCount(t.pos - e) + t.nodeAfter.attrs.colspan - 1, N = M.domAtPos(t.start(-1)).node;
  for (; N.nodeName != "TABLE"; )
    N = N.parentNode;
  iu(D, N.firstChild, N, A, i, g);
}
function dG(M) {
  let I = [];
  for (let g = 0; g < M; g++)
    I.push(0);
  return I;
}
function zG(M, I) {
  let g = [], A = M.doc.resolve(I), t = A.node(-1), D = FI.get(t), e = A.start(-1), i = D.colCount(A.pos - e) + A.nodeAfter.attrs.colspan;
  for (let N = 0; N < D.height; N++) {
    let C = i + N * D.width - 1;
    if ((i == D.width || D.map[C] != D.map[C + 1]) && (N == 0 || D.map[C - 1] != D.map[C - 1 - D.width])) {
      let u = D.map[C], j = e + u + t.nodeAt(u).nodeSize - 1, n = document.createElement("div");
      n.className = "column-resize-handle", g.push(zM.widget(j, n));
    }
  }
  return qI.create(M.doc, g);
}
function mG({
  allowTableNodeSelection: M = !1
} = {}) {
  return new XI({
    key: cA,
    state: {
      init() {
        return null;
      },
      apply(I, g) {
        let A = I.getMeta(cA);
        if (A != null)
          return A == -1 ? null : A;
        if (g == null || !I.docChanged)
          return g;
        let {
          deleted: t,
          pos: D
        } = I.mapping.mapResult(g);
        return t ? null : D;
      }
    },
    props: {
      decorations: v3,
      handleDOMEvents: {
        mousedown: $3
      },
      createSelectionBetween(I) {
        if (cA.getState(I.state) != null)
          return I.state.selection;
      },
      handleTripleClick: K3,
      handleKeyDown: X3,
      handlePaste: _3
    },
    appendTransaction(I, g, A) {
      return B3(A, Ya(A, g), M);
    }
  });
}
function tT(M, I, g, A, t, D) {
  let e = 0, i = !0, N = I.firstChild;
  const C = M.firstChild;
  for (let u = 0, j = 0; u < C.childCount; u += 1) {
    const { colspan: n, colwidth: L } = C.child(u).attrs;
    for (let o = 0; o < n; o += 1, j += 1) {
      const T = t === j ? D : L && L[o], s = T ? `${T}px` : "";
      e += T || A, T || (i = !1), N ? (N.style.width !== s && (N.style.width = s), N = N.nextSibling) : I.appendChild(document.createElement("col")).style.width = s;
    }
  }
  for (; N; ) {
    const u = N.nextSibling;
    N.parentNode.removeChild(N), N = u;
  }
  i ? (g.style.width = `${e}px`, g.style.minWidth = "") : (g.style.width = "", g.style.minWidth = `${e}px`);
}
class bG {
  constructor(I, g) {
    this.node = I, this.cellMinWidth = g, this.dom = document.createElement("div"), this.dom.className = "tableWrapper", this.table = this.dom.appendChild(document.createElement("table")), this.colgroup = this.table.appendChild(document.createElement("colgroup")), tT(I, this.colgroup, this.table, g), this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(I) {
    return I.type !== this.node.type ? !1 : (this.node = I, tT(I, this.colgroup, this.table, this.cellMinWidth), !0);
  }
  ignoreMutation(I) {
    return I.type === "attributes" && (I.target === this.table || this.colgroup.contains(I.target));
  }
}
function DT(M, I) {
  return I ? M.createChecked(null, I) : M.createAndFill();
}
function YG(M) {
  if (M.cached.tableNodeTypes)
    return M.cached.tableNodeTypes;
  const I = {};
  return Object.keys(M.nodes).forEach((g) => {
    const A = M.nodes[g];
    A.spec.tableRole && (I[A.spec.tableRole] = A);
  }), M.cached.tableNodeTypes = I, I;
}
function pG(M, I, g, A, t) {
  const D = YG(M), e = [], i = [];
  for (let C = 0; C < g; C += 1) {
    const u = DT(D.cell, t);
    if (u && i.push(u), A) {
      const j = DT(D.header_cell, t);
      j && e.push(j);
    }
  }
  const N = [];
  for (let C = 0; C < I; C += 1)
    N.push(D.row.createChecked(null, A && C === 0 ? e : i));
  return D.table.createChecked(null, N);
}
function QG(M) {
  return M instanceof EI;
}
const zi = ({ editor: M }) => {
  const { selection: I } = M.state;
  if (!QG(I))
    return !1;
  let g = 0;
  const A = $4(I.ranges[0].$from, (D) => D.type.name === "table");
  return A == null || A.node.descendants((D) => {
    if (D.type.name === "table")
      return !1;
    ["tableCell", "tableHeader"].includes(D.type.name) && (g += 1);
  }), g === I.ranges.length ? (M.commands.deleteTable(), !0) : !1;
}, hG = JI.create({
  name: "table",
  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: !1,
      handleWidth: 5,
      cellMinWidth: 25,
      View: bG,
      lastColumnResizable: !0,
      allowTableNodeSelection: !1
    };
  },
  content: "tableRow+",
  tableRole: "table",
  isolating: !0,
  group: "block",
  parseHTML() {
    return [
      { tag: "table" }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["table", OI(this.options.HTMLAttributes, M), ["tbody", 0]];
  },
  addCommands() {
    return {
      insertTable: ({ rows: M = 3, cols: I = 3, withHeaderRow: g = !0 } = {}) => ({ tr: A, dispatch: t, editor: D }) => {
        const e = pG(D.schema, M, I, g);
        if (t) {
          const i = A.selection.anchor + 1;
          A.replaceSelectionWith(e).scrollIntoView().setSelection(LI.near(A.doc.resolve(i)));
        }
        return !0;
      },
      addColumnBefore: () => ({ state: M, dispatch: I }) => MG(M, I),
      addColumnAfter: () => ({ state: M, dispatch: I }) => gG(M, I),
      deleteColumn: () => ({ state: M, dispatch: I }) => tG(M, I),
      addRowBefore: () => ({ state: M, dispatch: I }) => eG(M, I),
      addRowAfter: () => ({ state: M, dispatch: I }) => iG(M, I),
      deleteRow: () => ({ state: M, dispatch: I }) => CG(M, I),
      deleteTable: () => ({ state: M, dispatch: I }) => sG(M, I),
      mergeCells: () => ({ state: M, dispatch: I }) => $o(M, I),
      splitCell: () => ({ state: M, dispatch: I }) => qo(M, I),
      toggleHeaderColumn: () => ({ state: M, dispatch: I }) => ve("column")(M, I),
      toggleHeaderRow: () => ({ state: M, dispatch: I }) => ve("row")(M, I),
      toggleHeaderCell: () => ({ state: M, dispatch: I }) => oG(M, I),
      mergeOrSplit: () => ({ state: M, dispatch: I }) => $o(M, I) ? !0 : qo(M, I),
      setCellAttribute: (M, I) => ({ state: g, dispatch: A }) => nG(M, I)(g, A),
      goToNextCell: () => ({ state: M, dispatch: I }) => MT(1)(M, I),
      goToPreviousCell: () => ({ state: M, dispatch: I }) => MT(-1)(M, I),
      fixTables: () => ({ state: M, dispatch: I }) => (I && Ya(M), !0),
      setCellSelection: (M) => ({ tr: I, dispatch: g }) => {
        if (g) {
          const A = EI.create(I.doc, M.anchorCell, M.headCell);
          I.setSelection(A);
        }
        return !0;
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.goToNextCell() ? !0 : this.editor.can().addRowAfter() ? this.editor.chain().addRowAfter().goToNextCell().run() : !1,
      "Shift-Tab": () => this.editor.commands.goToPreviousCell(),
      Backspace: zi,
      "Mod-Backspace": zi,
      Delete: zi,
      "Mod-Delete": zi
    };
  },
  addProseMirrorPlugins() {
    return [
      ...this.options.resizable && this.editor.isEditable ? [aG({
        handleWidth: this.options.handleWidth,
        cellMinWidth: this.options.cellMinWidth,
        View: this.options.View,
        lastColumnResizable: this.options.lastColumnResizable
      })] : [],
      mG({
        allowTableNodeSelection: this.options.allowTableNodeSelection
      })
    ];
  },
  extendNodeSchema(M) {
    const I = {
      name: M.name,
      options: M.options,
      storage: M.storage
    };
    return {
      tableRole: lI(AI(M, "tableRole", I))
    };
  }
}), OG = JI.create({
  name: "tableHeader",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (M) => {
          const I = M.getAttribute("colwidth");
          return I ? [parseInt(I, 10)] : null;
        }
      }
    };
  },
  tableRole: "header_cell",
  isolating: !0,
  parseHTML() {
    return [
      { tag: "th" }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["th", OI(this.options.HTMLAttributes, M), 0];
  }
}), kG = JI.create({
  name: "tableRow",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "(tableCell | tableHeader)*",
  tableRole: "row",
  parseHTML() {
    return [
      { tag: "tr" }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["tr", OI(this.options.HTMLAttributes, M), 0];
  }
}), PG = JI.create({
  name: "tableCell",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (M) => {
          const I = M.getAttribute("colwidth");
          return I ? [parseInt(I, 10)] : null;
        }
      }
    };
  },
  tableRole: "cell",
  isolating: !0,
  parseHTML() {
    return [
      { tag: "td" }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["td", OI(this.options.HTMLAttributes, M), 0];
  }
}), fG = PG.extend({
  addAttributes() {
    var M;
    return {
      ...(M = this.parent) == null ? void 0 : M.call(this),
      backgroundColor: {
        default: null,
        parseHTML: (I) => I.getAttribute("data-background-color"),
        renderHTML: (I) => ({
          "data-background-color": I.backgroundColor,
          style: `background-color: ${I.backgroundColor}`
        })
      }
    };
  }
}), GG = [
  hG,
  OG,
  kG,
  fG
], WG = zg.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (M) => M.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["span", OI(this.options.HTMLAttributes, M), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: M, commands: I }) => {
        const g = pu(M, this.type);
        return Object.entries(g).some(([, t]) => !!t) ? !0 : I.unsetMark(this.name);
      }
    };
  }
}), ZG = tM.create({
  name: "color",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (M) => {
              var I;
              return (I = M.style.color) === null || I === void 0 ? void 0 : I.replace(/['"]+/g, "");
            },
            renderHTML: (M) => M.color ? {
              style: `color: ${M.color}`
            } : {}
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setColor: (M) => ({ chain: I }) => I().setMark("textStyle", { color: M }).run(),
      unsetColor: () => ({ chain: M }) => M().setMark("textStyle", { color: null }).removeEmptyTextStyle().run()
    };
  }
}), vG = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))$/, UG = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))/g, JG = zg.create({
  name: "highlight",
  addOptions() {
    return {
      multicolor: !1,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return this.options.multicolor ? {
      color: {
        default: null,
        parseHTML: (M) => M.getAttribute("data-color") || M.style.backgroundColor,
        renderHTML: (M) => M.color ? {
          "data-color": M.color,
          style: `background-color: ${M.color}`
        } : {}
      }
    } : {};
  },
  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["mark", OI(this.options.HTMLAttributes, M), 0];
  },
  addCommands() {
    return {
      setHighlight: (M) => ({ commands: I }) => I.setMark(this.name, M),
      toggleHighlight: (M) => ({ commands: I }) => I.toggleMark(this.name, M),
      unsetHighlight: () => ({ commands: M }) => M.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
    };
  },
  addInputRules() {
    return [
      lt({
        find: vG,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      GA({
        find: UG,
        type: this.type
      })
    ];
  }
});
function eT(M) {
  const I = /(#[0-9a-f]{3,6})\b/ig, g = [];
  return M.descendants((A, t) => {
    !A.text || Array.from(A.text.matchAll(I)).forEach((D) => {
      const e = D[0], i = D.index || 0, N = t + i, C = N + e.length, u = zM.inline(N, C, {
        class: "color",
        style: `--color: ${e}`
      });
      g.push(u);
    });
  }), qI.create(M, g);
}
const BG = tM.create({
  name: "colorHighlighter",
  addProseMirrorPlugins() {
    return [
      new XI({
        state: {
          init(M, { doc: I }) {
            return eT(I);
          },
          apply(M, I) {
            return M.docChanged ? eT(M.doc) : I;
          }
        },
        props: {
          decorations(M) {
            return this.getState(M);
          }
        }
      })
    ];
  }
}), RG = [
  JG.configure({ multicolor: !0 }),
  WG,
  ZG.configure({ types: ["textStyle"] }),
  BG
], HG = /^\s*(\[([( |x])?\])\s$/, VG = JI.create({
  name: "taskItem",
  addOptions() {
    return {
      nested: !1,
      HTMLAttributes: {}
    };
  },
  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },
  defining: !0,
  addAttributes() {
    return {
      checked: {
        default: !1,
        keepOnSplit: !1,
        parseHTML: (M) => M.getAttribute("data-checked") === "true",
        renderHTML: (M) => ({
          "data-checked": M.checked
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ node: M, HTMLAttributes: I }) {
    return [
      "li",
      OI(this.options.HTMLAttributes, I, {
        "data-type": this.name
      }),
      [
        "label",
        [
          "input",
          {
            type: "checkbox",
            checked: M.attrs.checked ? "checked" : null
          }
        ],
        ["span"]
      ],
      ["div", 0]
    ];
  },
  addKeyboardShortcuts() {
    const M = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
    return this.options.nested ? {
      ...M,
      Tab: () => this.editor.commands.sinkListItem(this.name)
    } : M;
  },
  addNodeView() {
    return ({ node: M, HTMLAttributes: I, getPos: g, editor: A }) => {
      const t = document.createElement("li"), D = document.createElement("label"), e = document.createElement("span"), i = document.createElement("input"), N = document.createElement("div");
      return D.contentEditable = "false", i.type = "checkbox", i.addEventListener("change", (C) => {
        if (!A.isEditable && !this.options.onReadOnlyChecked) {
          i.checked = !i.checked;
          return;
        }
        const { checked: u } = C.target;
        A.isEditable && typeof g == "function" && A.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: j }) => {
          const n = g(), L = j.doc.nodeAt(n);
          return j.setNodeMarkup(n, void 0, {
            ...L == null ? void 0 : L.attrs,
            checked: u
          }), !0;
        }).run(), !A.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(M, u) || (i.checked = !i.checked));
      }), Object.entries(this.options.HTMLAttributes).forEach(([C, u]) => {
        t.setAttribute(C, u);
      }), t.dataset.checked = M.attrs.checked, M.attrs.checked && i.setAttribute("checked", "checked"), D.append(i, e), t.append(D, N), Object.entries(I).forEach(([C, u]) => {
        t.setAttribute(C, u);
      }), {
        dom: t,
        contentDOM: N,
        update: (C) => C.type !== this.type ? !1 : (t.dataset.checked = C.attrs.checked, C.attrs.checked ? i.setAttribute("checked", "checked") : i.removeAttribute("checked"), !0)
      };
    };
  },
  addInputRules() {
    return [
      IC({
        find: HG,
        type: this.type,
        getAttributes: (M) => ({
          checked: M[M.length - 1] === "x"
        })
      })
    ];
  }
}), FG = JI.create({
  name: "taskList",
  addOptions() {
    return {
      itemTypeName: "taskItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ HTMLAttributes: M }) {
    return ["ul", OI(this.options.HTMLAttributes, M, { "data-type": this.name }), 0];
  },
  addCommands() {
    return {
      toggleTaskList: () => ({ commands: M }) => M.toggleList(this.name, this.options.itemTypeName)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTaskList()
    };
  }
}), XG = [
  FG,
  VG.configure({
    nested: !0
  })
];
var Oj = { exports: {} };
function kj(M) {
  return M instanceof Map ? M.clear = M.delete = M.set = function() {
    throw new Error("map is read-only");
  } : M instanceof Set && (M.add = M.clear = M.delete = function() {
    throw new Error("set is read-only");
  }), Object.freeze(M), Object.getOwnPropertyNames(M).forEach(function(I) {
    var g = M[I];
    typeof g == "object" && !Object.isFrozen(g) && kj(g);
  }), M;
}
Oj.exports = kj;
Oj.exports.default = kj;
class iT {
  constructor(I) {
    I.data === void 0 && (I.data = {}), this.data = I.data, this.isMatchIgnored = !1;
  }
  ignoreMatch() {
    this.isMatchIgnored = !0;
  }
}
function Oa(M) {
  return M.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function YA(M, ...I) {
  const g = /* @__PURE__ */ Object.create(null);
  for (const A in M)
    g[A] = M[A];
  return I.forEach(function(A) {
    for (const t in A)
      g[t] = A[t];
  }), g;
}
const KG = "</span>", NT = (M) => !!M.scope || M.sublanguage && M.language, _G = (M, { prefix: I }) => {
  if (M.includes(".")) {
    const g = M.split(".");
    return [
      `${I}${g.shift()}`,
      ...g.map((A, t) => `${A}${"_".repeat(t + 1)}`)
    ].join(" ");
  }
  return `${I}${M}`;
};
class $G {
  constructor(I, g) {
    this.buffer = "", this.classPrefix = g.classPrefix, I.walk(this);
  }
  addText(I) {
    this.buffer += Oa(I);
  }
  openNode(I) {
    if (!NT(I))
      return;
    let g = "";
    I.sublanguage ? g = `language-${I.language}` : g = _G(I.scope, { prefix: this.classPrefix }), this.span(g);
  }
  closeNode(I) {
    !NT(I) || (this.buffer += KG);
  }
  value() {
    return this.buffer;
  }
  span(I) {
    this.buffer += `<span class="${I}">`;
  }
}
const CT = (M = {}) => {
  const I = { children: [] };
  return Object.assign(I, M), I;
};
class Pj {
  constructor() {
    this.rootNode = CT(), this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  add(I) {
    this.top.children.push(I);
  }
  openNode(I) {
    const g = CT({ scope: I });
    this.add(g), this.stack.push(g);
  }
  closeNode() {
    if (this.stack.length > 1)
      return this.stack.pop();
  }
  closeAllNodes() {
    for (; this.closeNode(); )
      ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  walk(I) {
    return this.constructor._walk(I, this.rootNode);
  }
  static _walk(I, g) {
    return typeof g == "string" ? I.addText(g) : g.children && (I.openNode(g), g.children.forEach((A) => this._walk(I, A)), I.closeNode(g)), I;
  }
  static _collapse(I) {
    typeof I != "string" && (!I.children || (I.children.every((g) => typeof g == "string") ? I.children = [I.children.join("")] : I.children.forEach((g) => {
      Pj._collapse(g);
    })));
  }
}
class qG extends Pj {
  constructor(I) {
    super(), this.options = I;
  }
  addKeyword(I, g) {
    I !== "" && (this.openNode(g), this.addText(I), this.closeNode());
  }
  addText(I) {
    I !== "" && this.add(I);
  }
  addSublanguage(I, g) {
    const A = I.root;
    A.sublanguage = !0, A.language = g, this.add(A);
  }
  toHTML() {
    return new $G(this, this.options).value();
  }
  finalize() {
    return !0;
  }
}
function Ue(M) {
  return M ? typeof M == "string" ? M : M.source : null;
}
function ka(M) {
  return Yt("(?=", M, ")");
}
function IW(M) {
  return Yt("(?:", M, ")*");
}
function MW(M) {
  return Yt("(?:", M, ")?");
}
function Yt(...M) {
  return M.map((g) => Ue(g)).join("");
}
function gW(M) {
  const I = M[M.length - 1];
  return typeof I == "object" && I.constructor === Object ? (M.splice(M.length - 1, 1), I) : {};
}
function fj(...M) {
  const I = gW(M);
  return "(" + (I.capture ? "" : "?:") + M.map((A) => Ue(A)).join("|") + ")";
}
function Pa(M) {
  return new RegExp(M.toString() + "|").exec("").length - 1;
}
function AW(M, I) {
  const g = M && M.exec(I);
  return g && g.index === 0;
}
const tW = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function Gj(M, { joinWith: I }) {
  let g = 0;
  return M.map((A) => {
    g += 1;
    const t = g;
    let D = Ue(A), e = "";
    for (; D.length > 0; ) {
      const i = tW.exec(D);
      if (!i) {
        e += D;
        break;
      }
      e += D.substring(0, i.index), D = D.substring(i.index + i[0].length), i[0][0] === "\\" && i[1] ? e += "\\" + String(Number(i[1]) + t) : (e += i[0], i[0] === "(" && g++);
    }
    return e;
  }).map((A) => `(${A})`).join(I);
}
const DW = /\b\B/, fa = "[a-zA-Z]\\w*", Wj = "[a-zA-Z_]\\w*", Ga = "\\b\\d+(\\.\\d+)?", Wa = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", Za = "\\b(0b[01]+)", eW = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", iW = (M = {}) => {
  const I = /^#![ ]*\//;
  return M.binary && (M.begin = Yt(
    I,
    /.*\b/,
    M.binary,
    /\b.*/
  )), YA({
    scope: "meta",
    begin: I,
    end: /$/,
    relevance: 0,
    "on:begin": (g, A) => {
      g.index !== 0 && A.ignoreMatch();
    }
  }, M);
}, Je = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
}, NW = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [Je]
}, CW = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [Je]
}, uW = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
}, sC = function(M, I, g = {}) {
  const A = YA(
    {
      scope: "comment",
      begin: M,
      end: I,
      contains: []
    },
    g
  );
  A.contains.push({
    scope: "doctag",
    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: !0,
    relevance: 0
  });
  const t = fj(
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
    /[A-Za-z]+[-][a-z]+/,
    /[A-Za-z][a-z]{2,}/
  );
  return A.contains.push(
    {
      begin: Yt(
        /[ ]+/,
        "(",
        t,
        /[.]?[:]?([.][ ]|[ ])/,
        "){3}"
      )
    }
  ), A;
}, jW = sC("//", "$"), nW = sC("/\\*", "\\*/"), LW = sC("#", "$"), oW = {
  scope: "number",
  begin: Ga,
  relevance: 0
}, TW = {
  scope: "number",
  begin: Wa,
  relevance: 0
}, sW = {
  scope: "number",
  begin: Za,
  relevance: 0
}, SW = {
  begin: /(?=\/[^/\n]*\/)/,
  contains: [{
    scope: "regexp",
    begin: /\//,
    end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      Je,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [Je]
      }
    ]
  }]
}, aW = {
  scope: "title",
  begin: fa,
  relevance: 0
}, lW = {
  scope: "title",
  begin: Wj,
  relevance: 0
}, yW = {
  begin: "\\.\\s*" + Wj,
  relevance: 0
}, cW = function(M) {
  return Object.assign(
    M,
    {
      "on:begin": (I, g) => {
        g.data._beginMatch = I[1];
      },
      "on:end": (I, g) => {
        g.data._beginMatch !== I[1] && g.ignoreMatch();
      }
    }
  );
};
var mi = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MATCH_NOTHING_RE: DW,
  IDENT_RE: fa,
  UNDERSCORE_IDENT_RE: Wj,
  NUMBER_RE: Ga,
  C_NUMBER_RE: Wa,
  BINARY_NUMBER_RE: Za,
  RE_STARTERS_RE: eW,
  SHEBANG: iW,
  BACKSLASH_ESCAPE: Je,
  APOS_STRING_MODE: NW,
  QUOTE_STRING_MODE: CW,
  PHRASAL_WORDS_MODE: uW,
  COMMENT: sC,
  C_LINE_COMMENT_MODE: jW,
  C_BLOCK_COMMENT_MODE: nW,
  HASH_COMMENT_MODE: LW,
  NUMBER_MODE: oW,
  C_NUMBER_MODE: TW,
  BINARY_NUMBER_MODE: sW,
  REGEXP_MODE: SW,
  TITLE_MODE: aW,
  UNDERSCORE_TITLE_MODE: lW,
  METHOD_GUARD: yW,
  END_SAME_AS_BEGIN: cW
});
function xW(M, I) {
  M.input[M.index - 1] === "." && I.ignoreMatch();
}
function rW(M, I) {
  M.className !== void 0 && (M.scope = M.className, delete M.className);
}
function wW(M, I) {
  !I || !M.beginKeywords || (M.begin = "\\b(" + M.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", M.__beforeBegin = xW, M.keywords = M.keywords || M.beginKeywords, delete M.beginKeywords, M.relevance === void 0 && (M.relevance = 0));
}
function EW(M, I) {
  !Array.isArray(M.illegal) || (M.illegal = fj(...M.illegal));
}
function dW(M, I) {
  if (!!M.match) {
    if (M.begin || M.end)
      throw new Error("begin & end are not supported with match");
    M.begin = M.match, delete M.match;
  }
}
function zW(M, I) {
  M.relevance === void 0 && (M.relevance = 1);
}
const mW = (M, I) => {
  if (!M.beforeMatch)
    return;
  if (M.starts)
    throw new Error("beforeMatch cannot be used with starts");
  const g = Object.assign({}, M);
  Object.keys(M).forEach((A) => {
    delete M[A];
  }), M.keywords = g.keywords, M.begin = Yt(g.beforeMatch, ka(g.begin)), M.starts = {
    relevance: 0,
    contains: [
      Object.assign(g, { endsParent: !0 })
    ]
  }, M.relevance = 0, delete g.beforeMatch;
}, bW = [
  "of",
  "and",
  "for",
  "in",
  "not",
  "or",
  "if",
  "then",
  "parent",
  "list",
  "value"
], YW = "keyword";
function va(M, I, g = YW) {
  const A = /* @__PURE__ */ Object.create(null);
  return typeof M == "string" ? t(g, M.split(" ")) : Array.isArray(M) ? t(g, M) : Object.keys(M).forEach(function(D) {
    Object.assign(
      A,
      va(M[D], I, D)
    );
  }), A;
  function t(D, e) {
    I && (e = e.map((i) => i.toLowerCase())), e.forEach(function(i) {
      const N = i.split("|");
      A[N[0]] = [D, pW(N[0], N[1])];
    });
  }
}
function pW(M, I) {
  return I ? Number(I) : QW(M) ? 0 : 1;
}
function QW(M) {
  return bW.includes(M.toLowerCase());
}
const uT = {}, ot = (M) => {
  console.error(M);
}, jT = (M, ...I) => {
  console.log(`WARN: ${M}`, ...I);
}, Gt = (M, I) => {
  uT[`${M}/${I}`] || (console.log(`Deprecated as of ${M}. ${I}`), uT[`${M}/${I}`] = !0);
}, GN = new Error();
function Ua(M, I, { key: g }) {
  let A = 0;
  const t = M[g], D = {}, e = {};
  for (let i = 1; i <= I.length; i++)
    e[i + A] = t[i], D[i + A] = !0, A += Pa(I[i - 1]);
  M[g] = e, M[g]._emit = D, M[g]._multi = !0;
}
function hW(M) {
  if (!!Array.isArray(M.begin)) {
    if (M.skip || M.excludeBegin || M.returnBegin)
      throw ot("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), GN;
    if (typeof M.beginScope != "object" || M.beginScope === null)
      throw ot("beginScope must be object"), GN;
    Ua(M, M.begin, { key: "beginScope" }), M.begin = Gj(M.begin, { joinWith: "" });
  }
}
function OW(M) {
  if (!!Array.isArray(M.end)) {
    if (M.skip || M.excludeEnd || M.returnEnd)
      throw ot("skip, excludeEnd, returnEnd not compatible with endScope: {}"), GN;
    if (typeof M.endScope != "object" || M.endScope === null)
      throw ot("endScope must be object"), GN;
    Ua(M, M.end, { key: "endScope" }), M.end = Gj(M.end, { joinWith: "" });
  }
}
function kW(M) {
  M.scope && typeof M.scope == "object" && M.scope !== null && (M.beginScope = M.scope, delete M.scope);
}
function PW(M) {
  kW(M), typeof M.beginScope == "string" && (M.beginScope = { _wrap: M.beginScope }), typeof M.endScope == "string" && (M.endScope = { _wrap: M.endScope }), hW(M), OW(M);
}
function fW(M) {
  function I(e, i) {
    return new RegExp(
      Ue(e),
      "m" + (M.case_insensitive ? "i" : "") + (M.unicodeRegex ? "u" : "") + (i ? "g" : "")
    );
  }
  class g {
    constructor() {
      this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
    }
    addRule(i, N) {
      N.position = this.position++, this.matchIndexes[this.matchAt] = N, this.regexes.push([N, i]), this.matchAt += Pa(i) + 1;
    }
    compile() {
      this.regexes.length === 0 && (this.exec = () => null);
      const i = this.regexes.map((N) => N[1]);
      this.matcherRe = I(Gj(i, { joinWith: "|" }), !0), this.lastIndex = 0;
    }
    exec(i) {
      this.matcherRe.lastIndex = this.lastIndex;
      const N = this.matcherRe.exec(i);
      if (!N)
        return null;
      const C = N.findIndex((j, n) => n > 0 && j !== void 0), u = this.matchIndexes[C];
      return N.splice(0, C), Object.assign(N, u);
    }
  }
  class A {
    constructor() {
      this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
    }
    getMatcher(i) {
      if (this.multiRegexes[i])
        return this.multiRegexes[i];
      const N = new g();
      return this.rules.slice(i).forEach(([C, u]) => N.addRule(C, u)), N.compile(), this.multiRegexes[i] = N, N;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    addRule(i, N) {
      this.rules.push([i, N]), N.type === "begin" && this.count++;
    }
    exec(i) {
      const N = this.getMatcher(this.regexIndex);
      N.lastIndex = this.lastIndex;
      let C = N.exec(i);
      if (this.resumingScanAtSamePosition() && !(C && C.index === this.lastIndex)) {
        const u = this.getMatcher(0);
        u.lastIndex = this.lastIndex + 1, C = u.exec(i);
      }
      return C && (this.regexIndex += C.position + 1, this.regexIndex === this.count && this.considerAll()), C;
    }
  }
  function t(e) {
    const i = new A();
    return e.contains.forEach((N) => i.addRule(N.begin, { rule: N, type: "begin" })), e.terminatorEnd && i.addRule(e.terminatorEnd, { type: "end" }), e.illegal && i.addRule(e.illegal, { type: "illegal" }), i;
  }
  function D(e, i) {
    const N = e;
    if (e.isCompiled)
      return N;
    [
      rW,
      dW,
      PW,
      mW
    ].forEach((u) => u(e, i)), M.compilerExtensions.forEach((u) => u(e, i)), e.__beforeBegin = null, [
      wW,
      EW,
      zW
    ].forEach((u) => u(e, i)), e.isCompiled = !0;
    let C = null;
    return typeof e.keywords == "object" && e.keywords.$pattern && (e.keywords = Object.assign({}, e.keywords), C = e.keywords.$pattern, delete e.keywords.$pattern), C = C || /\w+/, e.keywords && (e.keywords = va(e.keywords, M.case_insensitive)), N.keywordPatternRe = I(C, !0), i && (e.begin || (e.begin = /\B|\b/), N.beginRe = I(N.begin), !e.end && !e.endsWithParent && (e.end = /\B|\b/), e.end && (N.endRe = I(N.end)), N.terminatorEnd = Ue(N.end) || "", e.endsWithParent && i.terminatorEnd && (N.terminatorEnd += (e.end ? "|" : "") + i.terminatorEnd)), e.illegal && (N.illegalRe = I(e.illegal)), e.contains || (e.contains = []), e.contains = [].concat(...e.contains.map(function(u) {
      return GW(u === "self" ? e : u);
    })), e.contains.forEach(function(u) {
      D(u, N);
    }), e.starts && D(e.starts, i), N.matcher = t(N), N;
  }
  if (M.compilerExtensions || (M.compilerExtensions = []), M.contains && M.contains.includes("self"))
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  return M.classNameAliases = YA(M.classNameAliases || {}), D(M);
}
function Ja(M) {
  return M ? M.endsWithParent || Ja(M.starts) : !1;
}
function GW(M) {
  return M.variants && !M.cachedVariants && (M.cachedVariants = M.variants.map(function(I) {
    return YA(M, { variants: null }, I);
  })), M.cachedVariants ? M.cachedVariants : Ja(M) ? YA(M, { starts: M.starts ? YA(M.starts) : null }) : Object.isFrozen(M) ? YA(M) : M;
}
var WW = "11.6.0";
class ZW extends Error {
  constructor(I, g) {
    super(I), this.name = "HTMLInjectionError", this.html = g;
  }
}
const u0 = Oa, nT = YA, LT = Symbol("nomatch"), vW = 7, UW = function(M) {
  const I = /* @__PURE__ */ Object.create(null), g = /* @__PURE__ */ Object.create(null), A = [];
  let t = !0;
  const D = "Could not find the language '{}', did you forget to load/include a language module?", e = { disableAutodetect: !0, name: "Plain text", contains: [] };
  let i = {
    ignoreUnescapedHTML: !1,
    throwUnescapedHTML: !1,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    __emitter: qG
  };
  function N(l) {
    return i.noHighlightRe.test(l);
  }
  function C(l) {
    let w = l.className + " ";
    w += l.parentNode ? l.parentNode.className : "";
    const Q = i.languageDetectRe.exec(w);
    if (Q) {
      const k = p(Q[1]);
      return k || (jT(D.replace("{}", Q[1])), jT("Falling back to no-highlight mode for this block.", l)), k ? Q[1] : "no-highlight";
    }
    return w.split(/\s+/).find((k) => N(k) || p(k));
  }
  function u(l, w, Q) {
    let k = "", B = "";
    typeof w == "object" ? (k = l, Q = w.ignoreIllegals, B = w.language) : (Gt("10.7.0", "highlight(lang, code, ...args) has been deprecated."), Gt("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), B = l, k = w), Q === void 0 && (Q = !0);
    const iI = {
      code: k,
      language: B
    };
    H("before:highlight", iI);
    const aI = iI.result ? iI.result : j(iI.language, iI.code, Q);
    return aI.code = iI.code, H("after:highlight", aI), aI;
  }
  function j(l, w, Q, k) {
    const B = /* @__PURE__ */ Object.create(null);
    function iI(d, b) {
      return d.keywords[b];
    }
    function aI() {
      if (!Z.keywords) {
        oI.addText(q);
        return;
      }
      let d = 0;
      Z.keywordPatternRe.lastIndex = 0;
      let b = Z.keywordPatternRe.exec(q), v = "";
      for (; b; ) {
        v += q.substring(d, b.index);
        const II = fI.case_insensitive ? b[0].toLowerCase() : b[0], rI = iI(Z, II);
        if (rI) {
          const [$I, WD] = rI;
          if (oI.addText(v), v = "", B[II] = (B[II] || 0) + 1, B[II] <= vW && (GI += WD), $I.startsWith("_"))
            v += b[0];
          else {
            const ZD = fI.classNameAliases[$I] || $I;
            oI.addKeyword(b[0], ZD);
          }
        } else
          v += b[0];
        d = Z.keywordPatternRe.lastIndex, b = Z.keywordPatternRe.exec(q);
      }
      v += q.substring(d), oI.addText(v);
    }
    function kI() {
      if (q === "")
        return;
      let d = null;
      if (typeof Z.subLanguage == "string") {
        if (!I[Z.subLanguage]) {
          oI.addText(q);
          return;
        }
        d = j(Z.subLanguage, q, !0, bM[Z.subLanguage]), bM[Z.subLanguage] = d._top;
      } else
        d = L(q, Z.subLanguage.length ? Z.subLanguage : null);
      Z.relevance > 0 && (GI += d.relevance), oI.addSublanguage(d._emitter, d.language);
    }
    function jI() {
      Z.subLanguage != null ? kI() : aI(), q = "";
    }
    function sI(d, b) {
      let v = 1;
      const II = b.length - 1;
      for (; v <= II; ) {
        if (!d._emit[v]) {
          v++;
          continue;
        }
        const rI = fI.classNameAliases[d[v]] || d[v], $I = b[v];
        rI ? oI.addKeyword($I, rI) : (q = $I, aI(), q = ""), v++;
      }
    }
    function PI(d, b) {
      return d.scope && typeof d.scope == "string" && oI.openNode(fI.classNameAliases[d.scope] || d.scope), d.beginScope && (d.beginScope._wrap ? (oI.addKeyword(q, fI.classNameAliases[d.beginScope._wrap] || d.beginScope._wrap), q = "") : d.beginScope._multi && (sI(d.beginScope, b), q = "")), Z = Object.create(d, { parent: { value: Z } }), Z;
    }
    function KI(d, b, v) {
      let II = AW(d.endRe, v);
      if (II) {
        if (d["on:end"]) {
          const rI = new iT(d);
          d["on:end"](b, rI), rI.isMatchIgnored && (II = !1);
        }
        if (II) {
          for (; d.endsParent && d.parent; )
            d = d.parent;
          return d;
        }
      }
      if (d.endsWithParent)
        return KI(d.parent, b, v);
    }
    function UI(d) {
      return Z.matcher.regexIndex === 0 ? (q += d[0], 1) : (P = !0, 0);
    }
    function rM(d) {
      const b = d[0], v = d.rule, II = new iT(v), rI = [v.__beforeBegin, v["on:begin"]];
      for (const $I of rI)
        if (!!$I && ($I(d, II), II.isMatchIgnored))
          return UI(b);
      return v.skip ? q += b : (v.excludeBegin && (q += b), jI(), !v.returnBegin && !v.excludeBegin && (q = b)), PI(v, d), v.returnBegin ? 0 : b.length;
    }
    function sM(d) {
      const b = d[0], v = w.substring(d.index), II = KI(Z, d, v);
      if (!II)
        return LT;
      const rI = Z;
      Z.endScope && Z.endScope._wrap ? (jI(), oI.addKeyword(b, Z.endScope._wrap)) : Z.endScope && Z.endScope._multi ? (jI(), sI(Z.endScope, d)) : rI.skip ? q += b : (rI.returnEnd || rI.excludeEnd || (q += b), jI(), rI.excludeEnd && (q = b));
      do
        Z.scope && oI.closeNode(), !Z.skip && !Z.subLanguage && (GI += Z.relevance), Z = Z.parent;
      while (Z !== II.parent);
      return II.starts && PI(II.starts, d), rI.returnEnd ? 0 : b.length;
    }
    function SM() {
      const d = [];
      for (let b = Z; b !== fI; b = b.parent)
        b.scope && d.unshift(b.scope);
      d.forEach((b) => oI.openNode(b));
    }
    let DM = {};
    function aM(d, b) {
      const v = b && b[0];
      if (q += d, v == null)
        return jI(), 0;
      if (DM.type === "begin" && b.type === "end" && DM.index === b.index && v === "") {
        if (q += w.slice(b.index, b.index + 1), !t) {
          const II = new Error(`0 width match regex (${l})`);
          throw II.languageName = l, II.badRule = DM.rule, II;
        }
        return 1;
      }
      if (DM = b, b.type === "begin")
        return rM(b);
      if (b.type === "illegal" && !Q) {
        const II = new Error('Illegal lexeme "' + v + '" for mode "' + (Z.scope || "<unnamed>") + '"');
        throw II.mode = Z, II;
      } else if (b.type === "end") {
        const II = sM(b);
        if (II !== LT)
          return II;
      }
      if (b.type === "illegal" && v === "")
        return 1;
      if (_I > 1e5 && _I > b.index * 3)
        throw new Error("potential infinite loop, way more iterations than matches");
      return q += v, v.length;
    }
    const fI = p(l);
    if (!fI)
      throw ot(D.replace("{}", l)), new Error('Unknown language: "' + l + '"');
    const HM = fW(fI);
    let NM = "", Z = k || HM;
    const bM = {}, oI = new i.__emitter(i);
    SM();
    let q = "", GI = 0, WI = 0, _I = 0, P = !1;
    try {
      for (Z.matcher.considerAll(); ; ) {
        _I++, P ? P = !1 : Z.matcher.considerAll(), Z.matcher.lastIndex = WI;
        const d = Z.matcher.exec(w);
        if (!d)
          break;
        const b = w.substring(WI, d.index), v = aM(b, d);
        WI = d.index + v;
      }
      return aM(w.substring(WI)), oI.closeAllNodes(), oI.finalize(), NM = oI.toHTML(), {
        language: l,
        value: NM,
        relevance: GI,
        illegal: !1,
        _emitter: oI,
        _top: Z
      };
    } catch (d) {
      if (d.message && d.message.includes("Illegal"))
        return {
          language: l,
          value: u0(w),
          illegal: !0,
          relevance: 0,
          _illegalBy: {
            message: d.message,
            index: WI,
            context: w.slice(WI - 100, WI + 100),
            mode: d.mode,
            resultSoFar: NM
          },
          _emitter: oI
        };
      if (t)
        return {
          language: l,
          value: u0(w),
          illegal: !1,
          relevance: 0,
          errorRaised: d,
          _emitter: oI,
          _top: Z
        };
      throw d;
    }
  }
  function n(l) {
    const w = {
      value: u0(l),
      illegal: !1,
      relevance: 0,
      _top: e,
      _emitter: new i.__emitter(i)
    };
    return w._emitter.addText(l), w;
  }
  function L(l, w) {
    w = w || i.languages || Object.keys(I);
    const Q = n(l), k = w.filter(p).filter(U).map(
      (jI) => j(jI, l, !1)
    );
    k.unshift(Q);
    const B = k.sort((jI, sI) => {
      if (jI.relevance !== sI.relevance)
        return sI.relevance - jI.relevance;
      if (jI.language && sI.language) {
        if (p(jI.language).supersetOf === sI.language)
          return 1;
        if (p(sI.language).supersetOf === jI.language)
          return -1;
      }
      return 0;
    }), [iI, aI] = B, kI = iI;
    return kI.secondBest = aI, kI;
  }
  function o(l, w, Q) {
    const k = w && g[w] || Q;
    l.classList.add("hljs"), l.classList.add(`language-${k}`);
  }
  function T(l) {
    let w = null;
    const Q = C(l);
    if (N(Q))
      return;
    if (H(
      "before:highlightElement",
      { el: l, language: Q }
    ), l.children.length > 0 && (i.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(l)), i.throwUnescapedHTML))
      throw new ZW(
        "One of your code blocks includes unescaped HTML.",
        l.innerHTML
      );
    w = l;
    const k = w.textContent, B = Q ? u(k, { language: Q, ignoreIllegals: !0 }) : L(k);
    l.innerHTML = B.value, o(l, Q, B.language), l.result = {
      language: B.language,
      re: B.relevance,
      relevance: B.relevance
    }, B.secondBest && (l.secondBest = {
      language: B.secondBest.language,
      relevance: B.secondBest.relevance
    }), H("after:highlightElement", { el: l, result: B, text: k });
  }
  function s(l) {
    i = nT(i, l);
  }
  const S = () => {
    a(), Gt("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };
  function y() {
    a(), Gt("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }
  let x = !1;
  function a() {
    if (document.readyState === "loading") {
      x = !0;
      return;
    }
    document.querySelectorAll(i.cssSelector).forEach(T);
  }
  function z() {
    x && a();
  }
  typeof window < "u" && window.addEventListener && window.addEventListener("DOMContentLoaded", z, !1);
  function c(l, w) {
    let Q = null;
    try {
      Q = w(M);
    } catch (k) {
      if (ot("Language definition for '{}' could not be registered.".replace("{}", l)), t)
        ot(k);
      else
        throw k;
      Q = e;
    }
    Q.name || (Q.name = l), I[l] = Q, Q.rawDefinition = w.bind(null, M), Q.aliases && V(Q.aliases, { languageName: l });
  }
  function E(l) {
    delete I[l];
    for (const w of Object.keys(g))
      g[w] === l && delete g[w];
  }
  function m() {
    return Object.keys(I);
  }
  function p(l) {
    return l = (l || "").toLowerCase(), I[l] || I[g[l]];
  }
  function V(l, { languageName: w }) {
    typeof l == "string" && (l = [l]), l.forEach((Q) => {
      g[Q.toLowerCase()] = w;
    });
  }
  function U(l) {
    const w = p(l);
    return w && !w.disableAutodetect;
  }
  function gI(l) {
    l["before:highlightBlock"] && !l["before:highlightElement"] && (l["before:highlightElement"] = (w) => {
      l["before:highlightBlock"](
        Object.assign({ block: w.el }, w)
      );
    }), l["after:highlightBlock"] && !l["after:highlightElement"] && (l["after:highlightElement"] = (w) => {
      l["after:highlightBlock"](
        Object.assign({ block: w.el }, w)
      );
    });
  }
  function R(l) {
    gI(l), A.push(l);
  }
  function H(l, w) {
    const Q = l;
    A.forEach(function(k) {
      k[Q] && k[Q](w);
    });
  }
  function W(l) {
    return Gt("10.7.0", "highlightBlock will be removed entirely in v12.0"), Gt("10.7.0", "Please use highlightElement now."), T(l);
  }
  Object.assign(M, {
    highlight: u,
    highlightAuto: L,
    highlightAll: a,
    highlightElement: T,
    highlightBlock: W,
    configure: s,
    initHighlighting: S,
    initHighlightingOnLoad: y,
    registerLanguage: c,
    unregisterLanguage: E,
    listLanguages: m,
    getLanguage: p,
    registerAliases: V,
    autoDetection: U,
    inherit: nT,
    addPlugin: R
  }), M.debugMode = function() {
    t = !1;
  }, M.safeMode = function() {
    t = !0;
  }, M.versionString = WW, M.regex = {
    concat: Yt,
    lookahead: ka,
    either: fj,
    optional: MW,
    anyNumberOfTimes: IW
  };
  for (const l in mi)
    typeof mi[l] == "object" && Oj.exports(mi[l]);
  return Object.assign(M, mi), M;
};
var Be = UW({}), JW = Be;
Be.HighlightJS = Be;
Be.default = Be;
var BW = JW;
function Ba(M, I = []) {
  return M.map((g) => {
    const A = [
      ...I,
      ...g.properties ? g.properties.className : []
    ];
    return g.children ? Ba(g.children, A) : {
      text: g.value,
      classes: A
    };
  }).flat();
}
function oT(M) {
  return M.value || M.children || [];
}
function RW(M) {
  return Boolean(BW.getLanguage(M));
}
function TT({ doc: M, name: I, lowlight: g, defaultLanguage: A }) {
  const t = [];
  return m0(M, (D) => D.type.name === I).forEach((D) => {
    let e = D.pos + 1;
    const i = D.node.attrs.language || A, N = g.listLanguages(), C = i && (N.includes(i) || RW(i)) ? oT(g.highlight(i, D.node.textContent)) : oT(g.highlightAuto(D.node.textContent));
    Ba(C).forEach((u) => {
      const j = e + u.text.length;
      if (u.classes.length) {
        const n = zM.inline(e, j, {
          class: u.classes.join(" ")
        });
        t.push(n);
      }
      e = j;
    });
  }), qI.create(M, t);
}
function HW(M) {
  return typeof M == "function";
}
function VW({ name: M, lowlight: I, defaultLanguage: g }) {
  if (!["highlight", "highlightAuto", "listLanguages"].every((t) => HW(I[t])))
    throw Error("You should provide an instance of lowlight to use the code-block-lowlight extension");
  const A = new XI({
    key: new TM("lowlight"),
    state: {
      init: (t, { doc: D }) => TT({
        doc: D,
        name: M,
        lowlight: I,
        defaultLanguage: g
      }),
      apply: (t, D, e, i) => {
        const N = e.selection.$head.parent.type.name, C = i.selection.$head.parent.type.name, u = m0(e.doc, (n) => n.type.name === M), j = m0(i.doc, (n) => n.type.name === M);
        return t.docChanged && ([N, C].includes(M) || j.length !== u.length || t.steps.some((n) => n.from !== void 0 && n.to !== void 0 && u.some((L) => L.pos >= n.from && L.pos + L.node.nodeSize <= n.to))) ? TT({
          doc: t.doc,
          name: M,
          lowlight: I,
          defaultLanguage: g
        }) : D.map(t.mapping, t.doc);
      }
    },
    props: {
      decorations(t) {
        return A.getState(t);
      }
    }
  });
  return A;
}
const FW = ds.extend({
  addOptions() {
    var M;
    return {
      ...(M = this.parent) === null || M === void 0 ? void 0 : M.call(this),
      lowlight: {},
      defaultLanguage: null
    };
  },
  addProseMirrorPlugins() {
    var M;
    return [
      ...((M = this.parent) === null || M === void 0 ? void 0 : M.call(this)) || [],
      VW({
        name: this.name,
        lowlight: this.options.lowlight,
        defaultLanguage: this.options.defaultLanguage
      })
    ];
  }
}), XW = (M) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: M.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      M.APOS_STRING_MODE,
      M.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: M.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z][A-Za-z0-9_-]*/
  }
}), KW = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "p",
  "q",
  "quote",
  "samp",
  "section",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], _W = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  ];