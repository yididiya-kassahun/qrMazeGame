document.addEventListener("DOMContentLoaded", () => {
  const e = document.getElementById("nameInput"),
    t = document.getElementById("generateBtn"),
    n = document.getElementById("loading"),
    o = document.getElementById("qrCanvasVisible"),
    a = document.getElementById("qrCanvasOffscreen"),
    r = document.getElementById("mazeCanvas"),
    l =
      (document.getElementById("game-container"),
      document.getElementById("overlay-message")),
    c = r.getContext("2d"),
    i = a.getContext("2d"),
    d = o.getContext("2d"),
    s = document.getElementById("share-container"),
    g = document.getElementById("share-twitter"),
    m = document.getElementById("share-facebook"),
    h = document.getElementById("share-whatsapp"),
    u = document.getElementById("copy-link-btn"),
    f = document.getElementById("copy-feedback"),
    p = document.getElementById("startGameBtn"),
    w = document.getElementById("pauseGameBtn"),
    y = document.getElementById("downloadQrBtn"),
    R = 21,
    v = Math.floor(r.width / R);
  (r.width = v * R), (r.height = v * R);
  const b = "#333333",
    I = "#cccccc",
    C = "#f0f0f0",
    E = "#3498db",
    L = "#2ecc71",
    M = "#e74c3c",
    S = 200,
    k = 15,
    B = Math.max(1, Math.floor(0.08 * v));
  let Q = [],
    x = { r: 1, c: 1 },
    z = { r: R - 2, c: R - 2 },
    $ = null,
    U = !1,
    P = !1,
    G = !1,
    A = "",
    D = null,
    T = !1;
  function q(e, t) {
    3 == (e = e.replace(/^\s*#|\s*$/g, "")).length &&
      (e = e.replace(/(.)/g, "$1$1"));
    let n = parseInt(e.substr(0, 2), 16),
      o = parseInt(e.substr(2, 2), 16),
      a = parseInt(e.substr(4, 2), 16);
    return (
      (t /= 100),
      (n = Math.min(255, Math.floor(n * (1 + t)))),
      (o = Math.min(255, Math.floor(o * (1 + t)))),
      (a = Math.min(255, Math.floor(a * (1 + t)))),
      "#" +
        n.toString(16).padStart(2, "0") +
        o.toString(16).padStart(2, "0") +
        a.toString(16).padStart(2, "0")
    );
  }
  function F(e, t) {
    3 == (e = e.replace(/^\s*#|\s*$/g, "")).length &&
      (e = e.replace(/(.)/g, "$1$1"));
    let n = parseInt(e.substr(0, 2), 16),
      o = parseInt(e.substr(2, 2), 16),
      a = parseInt(e.substr(4, 2), 16);
    return (
      (t /= 100),
      (n = Math.max(0, Math.floor(n * (1 - t)))),
      (o = Math.max(0, Math.floor(o * (1 - t)))),
      (a = Math.max(0, Math.floor(a * (1 - t)))),
      "#" +
        n.toString(16).padStart(2, "0") +
        o.toString(16).padStart(2, "0") +
        a.toString(16).padStart(2, "0")
    );
  }
  function N() {}
  async function O() {}
  function _(e, t = "", n = !1) {}
  function V() {}
  function W(e) {}
  function Y() {}
  function j(e, t) {}
  function H() {
    c.clearRect(0, 0, r.width, r.height);
    for (let e = 0; e < R; e++)
      for (let t = 0; t < R; t++) {
        const n = t * v,
          o = e * v;
        if (1 === Q[e][t]) {
          const a = J(e, t),
            r = F(a, k),
            l = q(a, k);
          (c.fillStyle = a),
            c.fillRect(n, o, v, v),
            c.beginPath(),
            e > 0 &&
              0 === Q[e - 1][t] &&
              ((c.fillStyle = r), c.fillRect(n, o, v, B)),
            t > 0 &&
              0 === Q[e][t - 1] &&
              ((c.fillStyle = r), c.fillRect(n, o, B, v)),
            e < R - 1 &&
              0 === Q[e + 1][t] &&
              ((c.fillStyle = l), c.fillRect(n, o + v - B, v, B)),
            t < R - 1 &&
              0 === Q[e][t + 1] &&
              ((c.fillStyle = l), c.fillRect(n + v - B, o, B, v)),
            c.closePath();
        } else (c.fillStyle = C), c.fillRect(n, o, v, v);
      }
    (c.fillStyle = L),
      c.fillRect(1 * v, 1 * v, v, v),
      (c.fillStyle = M),
      c.fillRect(z.c * v, z.r * v, v, v);
  }
  function J(e, t) {}
  function K() {}
  function X(e) {}
  function N() {
    (y.disabled = !$),
      G || !Q.length || !1 === n.classList.contains("hidden")
        ? ((p.disabled = !0), (w.disabled = !0))
        : U
          ? ((p.disabled = !0), (w.disabled = !1))
          : P || T
            ? ((p.disabled = !1), (w.disabled = !0))
            : ((p.disabled = !0), (w.disabled = !0));
  }
  async function O() {
    const a = e.value.trim();
    if (a) {
      (A = a),
        console.log("Resetting game state for generation..."),
        D && (clearInterval(D), (D = null)),
        _(!1),
        n.classList.remove("hidden"),
        (t.disabled = !0),
        s.classList.add("hidden"),
        f.classList.add("hidden"),
        (G = !1),
        (U = !1),
        (P = !1),
        (T = !1),
        (Q = []),
        ($ = null),
        d.clearRect(0, 0, o.width, o.height),
        c.clearRect(0, 0, r.width, r.height),
        N();
      try {
        console.log("Generating QR Code..."),
          await W(a),
          console.log("Generating Maze Grid..."),
          Y(),
          console.log("Drawing Maze..."),
          H(),
          (x = { r: 1, c: 1 }),
          K(),
          n.classList.add("hidden"),
          X(a),
          s.classList.remove("hidden"),
          console.log("Starting countdown..."),
          V();
      } catch (e) {
        console.error("Error during maze generation process:", e),
          alert(
            "Could not generate the maze. Please check the console for details."
          ),
          n.classList.add("hidden"),
          (t.disabled = !1),
          N();
      }
    } else alert("Please enter a name!");
  }
  function _(e, t = "", n = !1) {
    e
      ? ((l.textContent = t),
        (l.style.display = "flex"),
        n ? l.classList.add("win-message") : l.classList.remove("win-message"))
      : ((l.style.display = "none"),
        (l.textContent = ""),
        l.classList.remove("win-message"));
  }
  function V() {
    D && clearInterval(D);
    let e = 3;
    (T = !1),
      (U = !1),
      (P = !1),
      _(!0, e),
      N(),
      (D = setInterval(() => {
        e--,
          e > 0
            ? _(!0, e)
            : 0 === e
              ? _(!0, "Go!")
              : (clearInterval(D),
                (D = null),
                _(!1),
                (T = !0),
                (U = !1),
                (P = !1),
                (t.disabled = !1),
                N(),
                console.log("Countdown finished. Press Start to play."));
      }, 1e3));
  }
  function W(e) {
    return (
      ($ = null),
      N(),
      new Promise((t, n) => {
        try {
          console.log("QRious: Creating QR for:", e);
          const n = new QRious({
            element: a,
            value: e,
            size: S,
            level: "L",
            padding: 0,
            foreground: "black",
            background: "white",
          });
          console.log("QRious: QR drawn to offscreen canvas."),
            (o.width = n.size),
            (o.height = n.size),
            d.drawImage(a, 0, 0),
            console.log("QRious: Copied QR to visible canvas."),
            ($ = i.getImageData(0, 0, n.size, n.size)),
            console.log(
              "QRious: Extracted image data.",
              $ ? "Success" : "Failed"
            ),
            N(),
            t();
        } catch (e) {
          console.error(
            "QRious generation or image data extraction failed:",
            e
          ),
            ($ = null),
            N(),
            n(e);
        }
      })
    );
  }
  function Y() {
    Q = Array(R)
      .fill(0)
      .map(() => Array(R).fill(1));
    const e = [];
    for (Q[1][1] = 0, e.push({ r: 1, c: 1 }); e.length > 0; ) {
      const t = e[e.length - 1],
        n = j(t.r, t.c);
      if (n.length > 0) {
        const o = n[Math.floor(Math.random() * n.length)],
          a = t.r + (o.r - t.r) / 2,
          r = t.c + (o.c - t.c) / 2;
        (Q[a][r] = 0), (Q[o.r][o.c] = 0), e.push(o);
      } else e.pop();
    }
    (Q[1][1] = 0), (Q[z.r][z.c] = 0);
  }
  function j(e, t) {
    const n = [],
      o = [
        { dr: -2, dc: 0 },
        { dr: 2, dc: 0 },
        { dr: 0, dc: -2 },
        { dr: 0, dc: 2 },
      ];
    for (const a of o) {
      const o = e + a.dr,
        r = t + a.dc;
      o > 0 &&
        o < R - 1 &&
        r > 0 &&
        r < R - 1 &&
        1 === Q[o][r] &&
        n.push({ r: o, c: r });
    }
    return n;
  }
  function J(e, t) {
    if (!$) return b;
    const n = Math.floor((t / R) * $.width),
      o = Math.floor((e / R) * $.height),
      a = Math.max(0, Math.min(n, $.width - 1)),
      r = 4 * (Math.max(0, Math.min(o, $.height - 1)) * $.width + a);
    return $.data[r] < 128 ? b : I;
  }
  function K() {
    const e = x.c * v,
      t = x.r * v;
    c.fillStyle = E;
    const n = 0.1 * v,
      o = 0.8 * v;
    c.fillRect(e + n, t + n, o, o);
  }
  function X(e) {
    const t = `${window.location.origin + window.location.pathname}?name=${encodeURIComponent(e)}`,
      n = `Check out this QR Code Maze I generated for "${e}"! Try to solve it:`;
    (g.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(t)}&text=${encodeURIComponent(n)}`),
      (m.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(t)}`),
      (h.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(n + " " + t)}`);
  }
  t.addEventListener("click", O),
    u.addEventListener("click", async function () {
      if (!A)
        return void console.warn(
          "No current maze name to generate share link."
        );
      const e = `${window.location.origin + window.location.pathname}?name=${encodeURIComponent(A)}`;
      if (!navigator.clipboard)
        return (
          alert("Clipboard access not available."),
          void console.warn("navigator.clipboard API not supported/available.")
        );
      try {
        await navigator.clipboard.writeText(e),
          console.log("Link copied to clipboard:", e),
          f.classList.remove("hidden"),
          setTimeout(() => {
            f.classList.add("hidden");
          }, 2e3);
      } catch (e) {
        console.error("Failed to copy link to clipboard: ", e),
          alert("Failed to copy the link automatically.");
      }
    }),
    document.addEventListener("keydown", function (e) {
      if (!U || G || !Q.length) return;
      let t = x.r,
        n = x.c,
        o = !1;
      switch (e.key) {
        case "ArrowUp":
        case "w":
          t--, (o = !0);
          break;
        case "ArrowDown":
        case "s":
          t++, (o = !0);
          break;
        case "ArrowLeft":
        case "a":
          n--, (o = !0);
          break;
        case "ArrowRight":
        case "d":
          n++, (o = !0);
      }
      o &&
        (e.preventDefault(),
        t >= 0 &&
          t < R &&
          n >= 0 &&
          n < R &&
          0 === Q[t][n] &&
          ((x.r = t),
          (x.c = n),
          H(),
          K(),
          x.r === z.r &&
            x.c === z.c &&
            (console.log("Player reached the end!"),
            (G = !0),
            (U = !1),
            (P = !1),
            (T = !1),
            _(!0, "You Won! 🎉", !0),
            N())));
    }),
    p.addEventListener("click", function () {
      (T || P) &&
        ((U = !0),
        (P = !1),
        (T = !1),
        console.log("Game Started / Resumed"),
        _(!1),
        N());
    }),
    w.addEventListener("click", function () {
      U &&
        ((U = !1),
        (P = !0),
        (T = !1),
        console.log("Game Paused"),
        _(!0, "Paused"),
        N());
    }),
    y.addEventListener("click", function () {
      if (!o || !A)
        return (
          console.error(
            "Cannot download QR: Canvas reference or current maze name is missing."
          ),
          void alert("Cannot download QR code. Please generate a maze first.")
        );
      if (o.width <= 0 || o.height <= 0)
        return (
          console.error(
            "Cannot download QR: Canvas has no dimensions or content."
          ),
          void alert("Cannot download QR code. The QR image seems empty.")
        );
      try {
        const e = document.createElement("a"),
          t = A.replace(/[^a-z0-9]/gi, "_").toLowerCase();
        (e.download = `qrcode_${t || "maze"}.png`),
          (e.href = o.toDataURL("image/png")),
          e.click(),
          console.log("QR Code download initiated as:", e.download);
      } catch (e) {
        console.error("Error generating data URL or triggering download:", e),
          alert("Could not prepare the QR code for download.");
      }
    }),
    (function () {
      const t = new URLSearchParams(window.location.search).get("name");
      if (t)
        try {
          const n = decodeURIComponent(t);
          (e.value = n),
            console.log(`Name "${n}" found in URL, generating maze...`),
            setTimeout(O, 50);
        } catch (t) {
          console.error("Error decoding name from URL:", t), (e.value = "");
        }
    })(),
    N();
});
