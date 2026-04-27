import e, { useEffect as t, useState as n } from "react";
import { createPortal as r } from "react-dom";
//#region \0rolldown/runtime.js
var i = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), a = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
//#endregion
//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function o(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = o(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function s() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = o(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/.pnpm/tailwind-merge@3.5.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var c = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, l = (e, t) => ({
	classGroupId: e,
	validator: t
}), u = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), d = "-", f = [], p = "arbitrary..", m = (e) => {
	let t = _(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return g(e);
			let n = e.split(d);
			return h(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? c(i, t) : t : i || f;
			}
			return n[e] || f;
		}
	};
}, h = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = h(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(d) : e.slice(t).join(d), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, g = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? p + r : void 0;
})(), _ = (e) => {
	let { theme: t, classGroups: n } = e;
	return v(n, t);
}, v = (e, t) => {
	let n = u();
	for (let r in e) {
		let i = e[r];
		y(i, n, r, t);
	}
	return n;
}, y = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		ee(i, t, n, r);
	}
}, ee = (e, t, n, r) => {
	if (typeof e == "string") {
		b(e, t, n);
		return;
	}
	if (typeof e == "function") {
		te(e, t, n, r);
		return;
	}
	x(e, t, n, r);
}, b = (e, t, n) => {
	let r = e === "" ? t : S(t, e);
	r.classGroupId = n;
}, te = (e, t, n, r) => {
	if (C(e)) {
		y(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(l(n, e));
}, x = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		y(o, S(t, a), n, r);
	}
}, S = (e, t) => {
	let n = e, r = t.split(d), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = u(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, C = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, ne = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, w = "!", T = ":", re = [], E = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), D = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === T) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(w) ? (c = s.slice(0, -1), l = !0) : s.startsWith(w) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return E(t, l, c, u);
	};
	if (t) {
		let e = t + T, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : E(re, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, O = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, k = (e) => ({
	cache: ne(e.cacheSize),
	parseClassName: D(e),
	sortModifiers: O(e),
	...m(e)
}), A = /\s+/, j = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a } = t, o = [], s = e.trim().split(A), c = "";
	for (let e = s.length - 1; e >= 0; --e) {
		let t = s[e], { isExternal: l, modifiers: u, hasImportantModifier: d, baseClassName: f, maybePostfixModifierPosition: p } = n(t);
		if (l) {
			c = t + (c.length > 0 ? " " + c : c);
			continue;
		}
		let m = !!p, h = r(m ? f.substring(0, p) : f);
		if (!h) {
			if (!m) {
				c = t + (c.length > 0 ? " " + c : c);
				continue;
			}
			if (h = r(f), !h) {
				c = t + (c.length > 0 ? " " + c : c);
				continue;
			}
			m = !1;
		}
		let g = u.length === 0 ? "" : u.length === 1 ? u[0] : a(u).join(":"), _ = d ? g + w : g, v = _ + h;
		if (o.indexOf(v) > -1) continue;
		o.push(v);
		let y = i(h, m);
		for (let e = 0; e < y.length; ++e) {
			let t = y[e];
			o.push(_ + t);
		}
		c = t + (c.length > 0 ? " " + c : c);
	}
	return c;
}, M = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = N(n)) && (i && (i += " "), i += r);
	return i;
}, N = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = N(e[r])) && (n && (n += " "), n += t);
	return n;
}, P = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = k(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = j(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(M(...e));
}, ie = [], F = (e) => {
	let t = (t) => t[e] || ie;
	return t.isThemeGetter = !0, t;
}, I = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, L = /^\((?:(\w[\w-]*):)?(.+)\)$/i, R = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, ae = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, oe = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, z = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, se = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, B = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, V = (e) => R.test(e), H = (e) => !!e && !Number.isNaN(Number(e)), U = (e) => !!e && Number.isInteger(Number(e)), ce = (e) => e.endsWith("%") && H(e.slice(0, -1)), W = (e) => ae.test(e), le = () => !0, G = (e) => oe.test(e) && !z.test(e), K = () => !1, q = (e) => se.test(e), ue = (e) => B.test(e), de = (e) => !J(e) && !X(e), fe = (e) => Z(e, Oe, K), J = (e) => I.test(e), Y = (e) => Z(e, ke, G), pe = (e) => Z(e, Ae, H), me = (e) => Z(e, Me, le), he = (e) => Z(e, je, K), ge = (e) => Z(e, Ee, K), _e = (e) => Z(e, De, ue), ve = (e) => Z(e, Ne, q), X = (e) => L.test(e), ye = (e) => Q(e, ke), be = (e) => Q(e, je), xe = (e) => Q(e, Ee), Se = (e) => Q(e, Oe), Ce = (e) => Q(e, De), we = (e) => Q(e, Ne, !0), Te = (e) => Q(e, Me, !0), Z = (e, t, n) => {
	let r = I.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Q = (e, t, n = !1) => {
	let r = L.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Ee = (e) => e === "position" || e === "percentage", De = (e) => e === "image" || e === "url", Oe = (e) => e === "length" || e === "size" || e === "bg-size", ke = (e) => e === "length", Ae = (e) => e === "number", je = (e) => e === "family-name", Me = (e) => e === "number" || e === "weight", Ne = (e) => e === "shadow", Pe = /* @__PURE__ */ P(() => {
	let e = F("color"), t = F("font"), n = F("text"), r = F("font-weight"), i = F("tracking"), a = F("leading"), o = F("breakpoint"), s = F("container"), c = F("spacing"), l = F("radius"), u = F("shadow"), d = F("inset-shadow"), f = F("text-shadow"), p = F("drop-shadow"), m = F("blur"), h = F("perspective"), g = F("aspect"), _ = F("ease"), v = F("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], ee = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], b = () => [
		...ee(),
		X,
		J
	], te = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], x = () => [
		"auto",
		"contain",
		"none"
	], S = () => [
		X,
		J,
		c
	], C = () => [
		V,
		"full",
		"auto",
		...S()
	], ne = () => [
		U,
		"none",
		"subgrid",
		X,
		J
	], w = () => [
		"auto",
		{ span: [
			"full",
			U,
			X,
			J
		] },
		U,
		X,
		J
	], T = () => [
		U,
		"auto",
		X,
		J
	], re = () => [
		"auto",
		"min",
		"max",
		"fr",
		X,
		J
	], E = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], D = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], O = () => ["auto", ...S()], k = () => [
		V,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...S()
	], A = () => [
		V,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...S()
	], j = () => [
		V,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...S()
	], M = () => [
		e,
		X,
		J
	], N = () => [
		...ee(),
		xe,
		ge,
		{ position: [X, J] }
	], P = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ie = () => [
		"auto",
		"cover",
		"contain",
		Se,
		fe,
		{ size: [X, J] }
	], I = () => [
		ce,
		ye,
		Y
	], L = () => [
		"",
		"none",
		"full",
		l,
		X,
		J
	], R = () => [
		"",
		H,
		ye,
		Y
	], ae = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], oe = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], z = () => [
		H,
		ce,
		xe,
		ge
	], se = () => [
		"",
		"none",
		m,
		X,
		J
	], B = () => [
		"none",
		H,
		X,
		J
	], G = () => [
		"none",
		H,
		X,
		J
	], K = () => [
		H,
		X,
		J
	], q = () => [
		V,
		"full",
		...S()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [W],
			breakpoint: [W],
			color: [le],
			container: [W],
			"drop-shadow": [W],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [de],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [W],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [W],
			shadow: [W],
			spacing: ["px", H],
			text: [W],
			"text-shadow": [W],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				V,
				J,
				X,
				g
			] }],
			container: ["container"],
			columns: [{ columns: [
				H,
				J,
				X,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: b() }],
			overflow: [{ overflow: te() }],
			"overflow-x": [{ "overflow-x": te() }],
			"overflow-y": [{ "overflow-y": te() }],
			overscroll: [{ overscroll: x() }],
			"overscroll-x": [{ "overscroll-x": x() }],
			"overscroll-y": [{ "overscroll-y": x() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: C() }],
			"inset-x": [{ "inset-x": C() }],
			"inset-y": [{ "inset-y": C() }],
			start: [{
				"inset-s": C(),
				start: C()
			}],
			end: [{
				"inset-e": C(),
				end: C()
			}],
			"inset-bs": [{ "inset-bs": C() }],
			"inset-be": [{ "inset-be": C() }],
			top: [{ top: C() }],
			right: [{ right: C() }],
			bottom: [{ bottom: C() }],
			left: [{ left: C() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				U,
				"auto",
				X,
				J
			] }],
			basis: [{ basis: [
				V,
				"full",
				"auto",
				s,
				...S()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				H,
				V,
				"auto",
				"initial",
				"none",
				J
			] }],
			grow: [{ grow: [
				"",
				H,
				X,
				J
			] }],
			shrink: [{ shrink: [
				"",
				H,
				X,
				J
			] }],
			order: [{ order: [
				U,
				"first",
				"last",
				"none",
				X,
				J
			] }],
			"grid-cols": [{ "grid-cols": ne() }],
			"col-start-end": [{ col: w() }],
			"col-start": [{ "col-start": T() }],
			"col-end": [{ "col-end": T() }],
			"grid-rows": [{ "grid-rows": ne() }],
			"row-start-end": [{ row: w() }],
			"row-start": [{ "row-start": T() }],
			"row-end": [{ "row-end": T() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": re() }],
			"auto-rows": [{ "auto-rows": re() }],
			gap: [{ gap: S() }],
			"gap-x": [{ "gap-x": S() }],
			"gap-y": [{ "gap-y": S() }],
			"justify-content": [{ justify: [...E(), "normal"] }],
			"justify-items": [{ "justify-items": [...D(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...D()] }],
			"align-content": [{ content: ["normal", ...E()] }],
			"align-items": [{ items: [...D(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...D(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": E() }],
			"place-items": [{ "place-items": [...D(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...D()] }],
			p: [{ p: S() }],
			px: [{ px: S() }],
			py: [{ py: S() }],
			ps: [{ ps: S() }],
			pe: [{ pe: S() }],
			pbs: [{ pbs: S() }],
			pbe: [{ pbe: S() }],
			pt: [{ pt: S() }],
			pr: [{ pr: S() }],
			pb: [{ pb: S() }],
			pl: [{ pl: S() }],
			m: [{ m: O() }],
			mx: [{ mx: O() }],
			my: [{ my: O() }],
			ms: [{ ms: O() }],
			me: [{ me: O() }],
			mbs: [{ mbs: O() }],
			mbe: [{ mbe: O() }],
			mt: [{ mt: O() }],
			mr: [{ mr: O() }],
			mb: [{ mb: O() }],
			ml: [{ ml: O() }],
			"space-x": [{ "space-x": S() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": S() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: k() }],
			"inline-size": [{ inline: ["auto", ...A()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...A()] }],
			"max-inline-size": [{ "max-inline": ["none", ...A()] }],
			"block-size": [{ block: ["auto", ...j()] }],
			"min-block-size": [{ "min-block": ["auto", ...j()] }],
			"max-block-size": [{ "max-block": ["none", ...j()] }],
			w: [{ w: [
				s,
				"screen",
				...k()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...k()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...k()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...k()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...k()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...k()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				ye,
				Y
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Te,
				me
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				ce,
				J
			] }],
			"font-family": [{ font: [
				be,
				he,
				t
			] }],
			"font-features": [{ "font-features": [J] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				X,
				J
			] }],
			"line-clamp": [{ "line-clamp": [
				H,
				"none",
				X,
				pe
			] }],
			leading: [{ leading: [a, ...S()] }],
			"list-image": [{ "list-image": [
				"none",
				X,
				J
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				X,
				J
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: M() }],
			"text-color": [{ text: M() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...ae(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				H,
				"from-font",
				"auto",
				X,
				Y
			] }],
			"text-decoration-color": [{ decoration: M() }],
			"underline-offset": [{ "underline-offset": [
				H,
				"auto",
				X,
				J
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: S() }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				X,
				J
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				X,
				J
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: N() }],
			"bg-repeat": [{ bg: P() }],
			"bg-size": [{ bg: ie() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						U,
						X,
						J
					],
					radial: [
						"",
						X,
						J
					],
					conic: [
						U,
						X,
						J
					]
				},
				Ce,
				_e
			] }],
			"bg-color": [{ bg: M() }],
			"gradient-from-pos": [{ from: I() }],
			"gradient-via-pos": [{ via: I() }],
			"gradient-to-pos": [{ to: I() }],
			"gradient-from": [{ from: M() }],
			"gradient-via": [{ via: M() }],
			"gradient-to": [{ to: M() }],
			rounded: [{ rounded: L() }],
			"rounded-s": [{ "rounded-s": L() }],
			"rounded-e": [{ "rounded-e": L() }],
			"rounded-t": [{ "rounded-t": L() }],
			"rounded-r": [{ "rounded-r": L() }],
			"rounded-b": [{ "rounded-b": L() }],
			"rounded-l": [{ "rounded-l": L() }],
			"rounded-ss": [{ "rounded-ss": L() }],
			"rounded-se": [{ "rounded-se": L() }],
			"rounded-ee": [{ "rounded-ee": L() }],
			"rounded-es": [{ "rounded-es": L() }],
			"rounded-tl": [{ "rounded-tl": L() }],
			"rounded-tr": [{ "rounded-tr": L() }],
			"rounded-br": [{ "rounded-br": L() }],
			"rounded-bl": [{ "rounded-bl": L() }],
			"border-w": [{ border: R() }],
			"border-w-x": [{ "border-x": R() }],
			"border-w-y": [{ "border-y": R() }],
			"border-w-s": [{ "border-s": R() }],
			"border-w-e": [{ "border-e": R() }],
			"border-w-bs": [{ "border-bs": R() }],
			"border-w-be": [{ "border-be": R() }],
			"border-w-t": [{ "border-t": R() }],
			"border-w-r": [{ "border-r": R() }],
			"border-w-b": [{ "border-b": R() }],
			"border-w-l": [{ "border-l": R() }],
			"divide-x": [{ "divide-x": R() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": R() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...ae(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...ae(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: M() }],
			"border-color-x": [{ "border-x": M() }],
			"border-color-y": [{ "border-y": M() }],
			"border-color-s": [{ "border-s": M() }],
			"border-color-e": [{ "border-e": M() }],
			"border-color-bs": [{ "border-bs": M() }],
			"border-color-be": [{ "border-be": M() }],
			"border-color-t": [{ "border-t": M() }],
			"border-color-r": [{ "border-r": M() }],
			"border-color-b": [{ "border-b": M() }],
			"border-color-l": [{ "border-l": M() }],
			"divide-color": [{ divide: M() }],
			"outline-style": [{ outline: [
				...ae(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				H,
				X,
				J
			] }],
			"outline-w": [{ outline: [
				"",
				H,
				ye,
				Y
			] }],
			"outline-color": [{ outline: M() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				we,
				ve
			] }],
			"shadow-color": [{ shadow: M() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				we,
				ve
			] }],
			"inset-shadow-color": [{ "inset-shadow": M() }],
			"ring-w": [{ ring: R() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: M() }],
			"ring-offset-w": [{ "ring-offset": [H, Y] }],
			"ring-offset-color": [{ "ring-offset": M() }],
			"inset-ring-w": [{ "inset-ring": R() }],
			"inset-ring-color": [{ "inset-ring": M() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				we,
				ve
			] }],
			"text-shadow-color": [{ "text-shadow": M() }],
			opacity: [{ opacity: [
				H,
				X,
				J
			] }],
			"mix-blend": [{ "mix-blend": [
				...oe(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": oe() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [H] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": z() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": z() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": M() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": M() }],
			"mask-image-t-from-pos": [{ "mask-t-from": z() }],
			"mask-image-t-to-pos": [{ "mask-t-to": z() }],
			"mask-image-t-from-color": [{ "mask-t-from": M() }],
			"mask-image-t-to-color": [{ "mask-t-to": M() }],
			"mask-image-r-from-pos": [{ "mask-r-from": z() }],
			"mask-image-r-to-pos": [{ "mask-r-to": z() }],
			"mask-image-r-from-color": [{ "mask-r-from": M() }],
			"mask-image-r-to-color": [{ "mask-r-to": M() }],
			"mask-image-b-from-pos": [{ "mask-b-from": z() }],
			"mask-image-b-to-pos": [{ "mask-b-to": z() }],
			"mask-image-b-from-color": [{ "mask-b-from": M() }],
			"mask-image-b-to-color": [{ "mask-b-to": M() }],
			"mask-image-l-from-pos": [{ "mask-l-from": z() }],
			"mask-image-l-to-pos": [{ "mask-l-to": z() }],
			"mask-image-l-from-color": [{ "mask-l-from": M() }],
			"mask-image-l-to-color": [{ "mask-l-to": M() }],
			"mask-image-x-from-pos": [{ "mask-x-from": z() }],
			"mask-image-x-to-pos": [{ "mask-x-to": z() }],
			"mask-image-x-from-color": [{ "mask-x-from": M() }],
			"mask-image-x-to-color": [{ "mask-x-to": M() }],
			"mask-image-y-from-pos": [{ "mask-y-from": z() }],
			"mask-image-y-to-pos": [{ "mask-y-to": z() }],
			"mask-image-y-from-color": [{ "mask-y-from": M() }],
			"mask-image-y-to-color": [{ "mask-y-to": M() }],
			"mask-image-radial": [{ "mask-radial": [X, J] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": z() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": z() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": M() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": M() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": ee() }],
			"mask-image-conic-pos": [{ "mask-conic": [H] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": z() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": z() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": M() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": M() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: N() }],
			"mask-repeat": [{ mask: P() }],
			"mask-size": [{ mask: ie() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				X,
				J
			] }],
			filter: [{ filter: [
				"",
				"none",
				X,
				J
			] }],
			blur: [{ blur: se() }],
			brightness: [{ brightness: [
				H,
				X,
				J
			] }],
			contrast: [{ contrast: [
				H,
				X,
				J
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				we,
				ve
			] }],
			"drop-shadow-color": [{ "drop-shadow": M() }],
			grayscale: [{ grayscale: [
				"",
				H,
				X,
				J
			] }],
			"hue-rotate": [{ "hue-rotate": [
				H,
				X,
				J
			] }],
			invert: [{ invert: [
				"",
				H,
				X,
				J
			] }],
			saturate: [{ saturate: [
				H,
				X,
				J
			] }],
			sepia: [{ sepia: [
				"",
				H,
				X,
				J
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				X,
				J
			] }],
			"backdrop-blur": [{ "backdrop-blur": se() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				H,
				X,
				J
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				H,
				X,
				J
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				H,
				X,
				J
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				H,
				X,
				J
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				H,
				X,
				J
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				H,
				X,
				J
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				H,
				X,
				J
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				H,
				X,
				J
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": S() }],
			"border-spacing-x": [{ "border-spacing-x": S() }],
			"border-spacing-y": [{ "border-spacing-y": S() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				X,
				J
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				H,
				"initial",
				X,
				J
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				X,
				J
			] }],
			delay: [{ delay: [
				H,
				X,
				J
			] }],
			animate: [{ animate: [
				"none",
				v,
				X,
				J
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				X,
				J
			] }],
			"perspective-origin": [{ "perspective-origin": b() }],
			rotate: [{ rotate: B() }],
			"rotate-x": [{ "rotate-x": B() }],
			"rotate-y": [{ "rotate-y": B() }],
			"rotate-z": [{ "rotate-z": B() }],
			scale: [{ scale: G() }],
			"scale-x": [{ "scale-x": G() }],
			"scale-y": [{ "scale-y": G() }],
			"scale-z": [{ "scale-z": G() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: K() }],
			"skew-x": [{ "skew-x": K() }],
			"skew-y": [{ "skew-y": K() }],
			transform: [{ transform: [
				X,
				J,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: b() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: q() }],
			"translate-x": [{ "translate-x": q() }],
			"translate-y": [{ "translate-y": q() }],
			"translate-z": [{ "translate-z": q() }],
			"translate-none": ["translate-none"],
			accent: [{ accent: M() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: M() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				X,
				J
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scroll-m": [{ "scroll-m": S() }],
			"scroll-mx": [{ "scroll-mx": S() }],
			"scroll-my": [{ "scroll-my": S() }],
			"scroll-ms": [{ "scroll-ms": S() }],
			"scroll-me": [{ "scroll-me": S() }],
			"scroll-mbs": [{ "scroll-mbs": S() }],
			"scroll-mbe": [{ "scroll-mbe": S() }],
			"scroll-mt": [{ "scroll-mt": S() }],
			"scroll-mr": [{ "scroll-mr": S() }],
			"scroll-mb": [{ "scroll-mb": S() }],
			"scroll-ml": [{ "scroll-ml": S() }],
			"scroll-p": [{ "scroll-p": S() }],
			"scroll-px": [{ "scroll-px": S() }],
			"scroll-py": [{ "scroll-py": S() }],
			"scroll-ps": [{ "scroll-ps": S() }],
			"scroll-pe": [{ "scroll-pe": S() }],
			"scroll-pbs": [{ "scroll-pbs": S() }],
			"scroll-pbe": [{ "scroll-pbe": S() }],
			"scroll-pt": [{ "scroll-pt": S() }],
			"scroll-pr": [{ "scroll-pr": S() }],
			"scroll-pb": [{ "scroll-pb": S() }],
			"scroll-pl": [{ "scroll-pl": S() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				X,
				J
			] }],
			fill: [{ fill: ["none", ...M()] }],
			"stroke-w": [{ stroke: [
				H,
				ye,
				Y,
				pe
			] }],
			stroke: [{ stroke: ["none", ...M()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
}), Fe = /* @__PURE__ */ i(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), Ie = /* @__PURE__ */ i(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === re ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case ee: return "Profiler";
				case y: return "StrictMode";
				case S: return "Suspense";
				case C: return "SuspenseList";
				case T: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case te: return e.displayName || "Context";
				case b: return (e._context.displayName || "Context") + ".Consumer";
				case x:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case ne: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case w:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === w) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function o() {
			var e = E.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (D.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				A || (A = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return j[e] || (j[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, a, s, u) {
			var f = n.children;
			if (f !== void 0) if (a) if (O(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (D.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", P[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), P[f + a] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), c(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && l(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, i, o(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === w && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = a("react"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), ee = Symbol.for("react.profiler"), b = Symbol.for("react.consumer"), te = Symbol.for("react.context"), x = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), T = Symbol.for("react.activity"), re = Symbol.for("react.client.reference"), E = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = Object.prototype.hasOwnProperty, O = Array.isArray, k = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var A, j = {}, M = h.react_stack_bottom_frame.bind(h, s)(), N = k(i(s)), P = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > E.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : M, r ? k(i(e)) : N);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > E.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : M, r ? k(i(e)) : N);
		};
	})();
})), $ = (/* @__PURE__ */ i(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = Fe() : t.exports = Ie();
})))();
function Le(...e) {
	return Pe(s(e));
}
var Re = e.forwardRef(({ className: e, variant: t = "primary", size: n = "md", isLoading: r, leftIcon: i, rightIcon: a, children: o, disabled: s, ...c }, l) => /* @__PURE__ */ (0, $.jsxs)("button", {
	ref: l,
	disabled: s || r,
	className: Le("inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer", {
		primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md active:scale-95",
		secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-sm active:scale-95",
		outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:scale-95",
		ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-95"
	}[t], {
		sm: "px-3 py-1.5 text-sm gap-1.5",
		md: "px-5 py-2.5 text-base gap-2",
		lg: "px-8 py-3.5 text-lg font-semibold gap-2.5"
	}[n], e),
	...c,
	children: [
		r ? /* @__PURE__ */ (0, $.jsx)("div", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }) : i && /* @__PURE__ */ (0, $.jsx)("span", {
			className: "inline-flex shrink-0",
			children: i
		}),
		o,
		!r && a && /* @__PURE__ */ (0, $.jsx)("span", {
			className: "inline-flex shrink-0",
			children: a
		})
	]
}));
Re.displayName = "Button";
//#endregion
//#region src/components/Accordion.tsx
function ze(...e) {
	return Pe(s(e));
}
var Be = ({ items: e, allowMultiple: t = !1, className: r }) => {
	let [i, a] = n([]), o = (e) => {
		a(t ? (t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e] : (t) => t.includes(e) ? [] : [e]);
	};
	return /* @__PURE__ */ (0, $.jsx)("div", {
		className: ze("w-full border-t border-slate-800", r),
		children: e.map((e) => {
			let t = i.includes(e.id);
			return /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "border-b border-slate-800",
				children: [/* @__PURE__ */ (0, $.jsxs)("button", {
					onClick: () => o(e.id),
					className: "w-full flex items-center justify-between py-4 text-left font-medium transition-colors hover:text-indigo-400 group",
					children: [/* @__PURE__ */ (0, $.jsx)("span", { children: e.title }), /* @__PURE__ */ (0, $.jsx)("svg", {
						className: ze("w-4 h-4 text-slate-500 transition-transform duration-200", t && "rotate-180 text-indigo-500"),
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24",
						children: /* @__PURE__ */ (0, $.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: "2",
							d: "M19 9l-7 7-7-7"
						})
					})]
				}), /* @__PURE__ */ (0, $.jsx)("div", {
					className: ze("overflow-hidden transition-all duration-300 ease-in-out", t ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"),
					children: /* @__PURE__ */ (0, $.jsx)("div", {
						className: "text-slate-400 text-sm leading-relaxed",
						children: e.content
					})
				})]
			}, e.id);
		})
	});
};
//#endregion
//#region src/components/Dialog.tsx
function Ve(...e) {
	return Pe(s(e));
}
var He = ({ isOpen: e, onClose: n, title: i, description: a, children: o, footer: s, className: c }) => (t(() => {
	if (e) {
		document.body.style.overflow = "hidden";
		let e = (e) => {
			e.key === "Escape" && n();
		};
		return window.addEventListener("keydown", e), () => {
			document.body.style.overflow = "unset", window.removeEventListener("keydown", e);
		};
	}
}, [e, n]), e ? r(/* @__PURE__ */ (0, $.jsxs)("div", {
	className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
	children: [/* @__PURE__ */ (0, $.jsx)("div", {
		className: "absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300",
		onClick: n
	}), /* @__PURE__ */ (0, $.jsxs)("div", {
		className: Ve("relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300", c),
		onClick: (e) => e.stopPropagation(),
		children: [/* @__PURE__ */ (0, $.jsx)("button", {
			onClick: n,
			className: "absolute right-4 top-4 p-2 text-slate-500 hover:text-slate-200 transition-colors rounded-full hover:bg-slate-800",
			children: /* @__PURE__ */ (0, $.jsx)("svg", {
				className: "w-5 h-5",
				fill: "none",
				stroke: "currentColor",
				viewBox: "0 0 24 24",
				children: /* @__PURE__ */ (0, $.jsx)("path", {
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeWidth: "2",
					d: "M6 18L18 6M6 6l12 12"
				})
			})
		}), /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "p-8",
			children: [
				i && /* @__PURE__ */ (0, $.jsx)("h3", {
					className: "text-xl font-bold text-slate-50 tracking-tight mb-2",
					children: i
				}),
				a && /* @__PURE__ */ (0, $.jsx)("p", {
					className: "text-sm text-slate-400 mb-6 font-medium",
					children: a
				}),
				/* @__PURE__ */ (0, $.jsx)("div", {
					className: "text-slate-200",
					children: o
				}),
				s && /* @__PURE__ */ (0, $.jsx)("div", {
					className: "mt-8 flex justify-end gap-3 pt-6 border-t border-slate-800",
					children: s
				})
			]
		})]
	})]
}), document.body) : null);
//#endregion
//#region src/components/FormInput.tsx
function Ue(...e) {
	return Pe(s(e));
}
var We = ({ label: t, variant: r = "text", error: i, helperText: a, value: o, onChange: s, className: c, ...l }) => {
	let [u, d] = n(!1), [f, p] = n(o || "");
	return e.useEffect(() => {
		o !== void 0 && p(o);
	}, [o]), /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "w-full space-y-1.5 group",
		children: [
			t && /* @__PURE__ */ (0, $.jsx)("div", {
				className: "mb-2",
				children: /* @__PURE__ */ (0, $.jsx)("label", {
					className: "text-sm font-semibold text-slate-300 ml-1 transition-colors group-focus-within:text-indigo-400",
					children: t
				})
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "relative flex items-center",
				children: [/* @__PURE__ */ (0, $.jsx)("input", {
					type: r === "password" ? u ? "text" : "password" : r === "email" ? "email" : "text",
					value: f,
					onChange: (e) => {
						let t = e.target.value;
						if (r === "numeric") t = t.replace(/[^0-9]/g, "");
						else if (r === "alphabet") t = t.replace(/[^a-zA-Z\s]/g, "");
						else if (r === "currency") {
							let e = t.replace(/[^0-9]/g, "");
							t = e ? `Rp ${new Intl.NumberFormat("id-ID").format(parseInt(e))}` : "";
						} else r === "phone" && (t = t.replace(/[^0-9+]/g, ""));
						o === void 0 && p(t), s && s({
							...e,
							target: {
								...e.target,
								value: t
							}
						});
					},
					className: Ue("w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all", "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm", i ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "hover:border-slate-700", r === "password" ? "pr-11" : "", c),
					...l
				}), r === "password" && /* @__PURE__ */ (0, $.jsx)("button", {
					type: "button",
					onClick: () => d(!u),
					className: "absolute right-3 p-1.5 text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-800",
					children: u ? /* @__PURE__ */ (0, $.jsxs)("svg", {
						className: "w-5 h-5",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24",
						children: [/* @__PURE__ */ (0, $.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: "2",
							d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						}), /* @__PURE__ */ (0, $.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: "2",
							d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
						})]
					}) : /* @__PURE__ */ (0, $.jsx)("svg", {
						className: "w-5 h-5",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24",
						children: /* @__PURE__ */ (0, $.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: "2",
							d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.04m4.066-1.516A9.95 9.95 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21m-2.101-2.101L3 3m9 9a3 3 0 100-6 3 3 0 000 6z"
						})
					})
				})]
			}),
			(i || a) && /* @__PURE__ */ (0, $.jsx)("p", {
				className: Ue("text-xs ml-1 font-medium", i ? "text-red-500 animate-in fade-in slide-in-from-top-1" : "text-slate-500"),
				children: i || a
			})
		]
	});
};
//#endregion
export { Be as Accordion, Re as Button, He as Dialog, We as FormInput };
