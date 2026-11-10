/* =========================================================
   MIO Software — main.js  (bağımlılık yok, ~hafif)
   ========================================================= */
(() => {
  "use strict";

  const d = document;
  const root = d.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));

  /* ---------- Load state ---------- */
  setTimeout(() => root.classList.add("is-loaded"), reduce ? 0 : 280);
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Header: scrolled / hide on scroll down ---------- */
  const header = $(".header");
  const parallaxEls = $$("[data-parallax]");
  let lastY = scrollY;
  let ticking = false;

  function onScroll() {
    const y = scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 12);
      const hide = y > lastY && y > 480 && !root.classList.contains("menu-open");
      header.classList.toggle("is-hidden", hide);
    }
    lastY = y;
    if (!reduce) {
      parallax();
      timelineProgress();
    }
    ticking = false;
  }
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  function parallax() {
    const vh = innerHeight;
    parallaxEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const f = parseFloat(el.dataset.parallax) || 0.15;
      const off = (r.top + r.height / 2 - vh / 2) * f;
      el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
    });
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = $(".menu-btn");
  function setMenu(open) {
    root.classList.toggle("menu-open", open);
    if (!menuBtn) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
  }
  menuBtn?.addEventListener("click", () => setMenu(!root.classList.contains("menu-open")));
  d.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("menu-open")) { setMenu(false); menuBtn?.focus(); }
  });
  $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  matchMedia("(min-width: 861px)").addEventListener?.("change", (e) => e.matches && setMenu(false));

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      if (e.target.dataset.count !== undefined) countUp(e.target);
      revealIO.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  function observeReveal(scope = d) {
    $$("[data-reveal]:not(.is-in), [data-count]:not(.is-in), .step:not(.is-in), .tl-item:not(.is-in)", scope)
      .forEach((el) => revealIO.observe(el));
  }

  /* ---------- Counters ---------- */
  function countUp(el) {
    const to = parseInt(el.dataset.count, 10) || 0;
    const suf = el.dataset.suffix || "";
    if (reduce || to === 0) { el.textContent = to + suf; return; }
    const t0 = performance.now();
    const dur = 1400;
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Pause offscreen / hidden-tab animations ---------- */
  const pauseIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle("is-paused", !e.isIntersecting));
  });
  $$("[data-anim]").forEach((el) => pauseIO.observe(el));
  d.addEventListener("visibilitychange", () => root.classList.toggle("tab-hidden", d.hidden));

  /* ---------- Hero mini-game score ---------- */
  const scoreEl = $("[data-score]");
  const heroVisual = $(".hero-visual");
  if (scoreEl && !reduce) {
    let score = 0;
    setInterval(() => {
      if (d.hidden || heroVisual?.classList.contains("is-paused")) return;
      score = (score + 1) % 1000;
      scoreEl.textContent = String(score).padStart(3, "0");
    }, 1000);
  }

  /* ---------- Projects ---------- */
  const ICONS = {
    game: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4"/><circle cx="15.5" cy="11" r=".6" fill="currentColor"/><circle cx="17.5" cy="13" r=".6" fill="currentColor"/></svg>',
    app: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    images: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="13" height="16" rx="2"/><path d="M8 2h11a2 2 0 0 1 2 2v13"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>'
  };
  const STATUS = { live: "Yayında", soon: "Yakında", beta: "Beta" };
  const LINKS = [
    ["appstore", "App Store", ICONS.download],
    ["playstore", "Google Play", ICONS.download],
    ["steam", "Steam", ICONS.download],
    ["web", "Web Sitesi", ICONS.arrow]
  ];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function cardHTML(p, i) {
    const c = p.cover || {};
    const idx = projects.indexOf(p);
    const screens = Array.isArray(p.screens) ? p.screens : [];
    const shot = (s, cls) => s ? `<img class="sc ${cls}" src="${esc(s.src)}" alt="" loading="lazy" decoding="async" width="420" height="900">` : "";
    const cover = screens.length
      ? `<div class="cover-art art-dots" aria-hidden="true"></div>
         <button class="cover-screens" type="button" data-gallery="${idx}" aria-label="${esc(p.title)} ekran görüntülerini aç (${screens.length})">
           ${shot(screens[1], "sc--l")}${shot(screens[2], "sc--r")}${shot(screens[0], "sc--c")}
           <span class="cover-hint mono">${ICONS.images}${screens.length} ekran</span>
         </button>`
      : p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.title)} ekran görüntüsü" loading="lazy" decoding="async" width="800" height="600">`
      : `<div class="cover-art art-${esc(c.art || "dots")}" aria-hidden="true"></div>
         <div class="cover-shape ${c.shape === "circle" ? "cover-shape--circle" : ""}" aria-hidden="true"></div>
         <span class="cover-glyph" aria-hidden="true">${esc(c.glyph || p.title.slice(0, 2))}</span>`;
    const links = LINKS.filter(([k]) => p.links && p.links[k])
      .map(([k, label, icon]) => `<a class="store-btn" href="${esc(p.links[k])}" target="_blank" rel="noopener">${icon}${label}<span class="sr-only"> — ${esc(p.title)}</span></a>`)
      .join("") + (screens.length
        ? `<button type="button" class="store-btn store-btn--ghost" data-gallery="${idx}">${ICONS.images}Ekranlar<span class="sr-only"> — ${esc(p.title)}</span></button>`
        : "");
    const style = `--c1:${esc(c.bg || "#0D0D0F")};--c2:${esc(c.fg || "#C8C9CC")};--c3:${esc(c.accent || "#FFC83D")};--i:${i % 3}`;
    const cls = ["card", p.featured ? "card--featured" : "", screens.length ? "card--screens" : ""].join(" ").trim();
    return `
      <article class="${cls}" data-reveal style="${style}">
        <div class="card-cover">
          <span class="card-tag mono">${ICONS[p.type] || ""}${p.type === "game" ? "Oyun" : "Uygulama"}</span>
          <span class="card-status mono ${p.status === "live" ? "is-live" : ""}">${esc(STATUS[p.status] || p.status || "")}</span>
          ${cover}
        </div>
        <div class="card-body">
          <div class="card-head"><h3>${esc(p.title)}</h3><span class="card-year mono">${esc(p.year)}</span></div>
          <p>${esc(p.tagline)}</p>
          <ul class="platforms" aria-label="Platformlar">${(p.platforms || []).map((x) => `<li class="mono" lang="en">${esc(x)}</li>`).join("")}</ul>
          <div class="card-links">${links || `<span class="store-btn is-soon">${ICONS.clock}Çok yakında</span>`}</div>
        </div>
      </article>`;
  }

  const projects = Array.isArray(window.MIO_PROJECTS) ? window.MIO_PROJECTS : [];
  const grid = $("#projects-grid");
  const filters = $(".filters");

  // Hero / filter counts
  const counts = {
    all: projects.length,
    game: projects.filter((p) => p.type === "game").length,
    app: projects.filter((p) => p.type === "app").length,
    platform: new Set(projects.flatMap((p) => p.platforms || [])).size
  };
  $$("[data-stat]").forEach((el) => {
    const n = counts[el.dataset.stat] ?? 0;
    if (n === 0) { el.closest(".stat")?.setAttribute("hidden", ""); return; } // henüz yoksa gösterme
    el.dataset.count = n; el.textContent = "0";
  });
  $$("[data-filter-count]").forEach((el) => (el.textContent = counts[el.dataset.filterCount] ?? 0));

  function render(type) {
    if (!grid) return;
    const list = type === "all" ? projects : projects.filter((p) => p.type === type);
    grid.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : `<p class="projects-empty">${type === "game"
          ? "<strong>Oyunlar yolda.</strong> İlk oyun çok yakında burada olacak."
          : "Bu kategoride henüz proje yok, yakında burada."}</p>`;
    observeReveal(grid);
    bindTilt();
  }

  function moveIndicator(btn) {
    const ind = $(".filters-indicator", filters);
    if (!ind || !btn) return;
    ind.style.width = btn.offsetWidth + "px";
    ind.style.transform = `translateX(${btn.offsetLeft}px)`;
  }

  if (grid) {
    render("all");
    if (filters) {
      const active = () => $('[aria-pressed="true"]', filters);
      requestAnimationFrame(() => moveIndicator(active()));
      addEventListener("resize", () => moveIndicator(active()));
      d.fonts?.ready.then(() => moveIndicator(active()));
      filters.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-filter]");
        if (!btn || btn.getAttribute("aria-pressed") === "true") return;
        $$("button", filters).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        moveIndicator(btn);
        if (reduce) return render(btn.dataset.filter);
        grid.classList.add("is-switching");
        setTimeout(() => {
          render(btn.dataset.filter);
          grid.classList.remove("is-switching");
        }, 320);
      });
    }
  }

  /* ---------- Card tilt (fine pointer only) ---------- */
  function bindTilt() {
    if (!finePointer || reduce || !grid) return;
    $$(".card", grid).forEach((card) => {
      let raf = 0;
      card.addEventListener("pointermove", (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          const k = card.classList.contains("card--featured") ? 0.4 : 1;
          card.classList.add("is-tilting");
          card.style.transform = `perspective(1000px) rotateX(${(-y * 6 * k).toFixed(2)}deg) rotateY(${(x * 7 * k).toFixed(2)}deg) translateY(-6px)`;
        });
      });
      card.addEventListener("pointerleave", () => {
        cancelAnimationFrame(raf);
        card.classList.remove("is-tilting");
        card.style.transform = "";
      });
    });
  }

  /* ---------- Screenshot gallery (native <dialog>) ---------- */
  let gallery = null;
  function getGallery() {
    if (gallery) return gallery;
    gallery = d.createElement("dialog");
    gallery.className = "gallery";
    gallery.setAttribute("aria-labelledby", "gallery-title");
    gallery.innerHTML = `
      <div class="gallery-head">
        <h2 id="gallery-title"></h2>
        <span class="gallery-count mono" aria-live="polite"></span>
        <button type="button" class="icon-btn" data-close aria-label="Galeriyi kapat">${ICONS.close}</button>
      </div>
      <div class="gallery-track" tabindex="0" aria-label="Ekran görüntüleri"></div>
      <div class="gallery-foot">
        <div class="gallery-dots" aria-hidden="true"></div>
        <div class="gallery-nav">
          <button type="button" class="icon-btn" data-dir="-1" aria-label="Önceki ekran">${ICONS.prev}</button>
          <button type="button" class="icon-btn" data-dir="1" aria-label="Sonraki ekran">${ICONS.next}</button>
        </div>
      </div>`;
    d.body.appendChild(gallery);

    const track = $(".gallery-track", gallery);
    let current = 0;
    const figs = () => $$("figure", track);
    const update = () => {
      const list = figs();
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0, dist = Infinity;
      list.forEach((f, n) => {
        const dd = Math.abs(f.offsetLeft + f.offsetWidth / 2 - mid);
        if (dd < dist) { dist = dd; best = n; }
      });
      current = best;
      list.forEach((f, n) => f.classList.toggle("is-current", n === best));
      $(".gallery-count", gallery).textContent = `${best + 1} / ${list.length}`;
      $$(".gallery-dots i", gallery).forEach((dot, n) => dot.classList.toggle("is-active", n === best));
      $('[data-dir="-1"]', gallery).disabled = best === 0;
      $('[data-dir="1"]', gallery).disabled = best === list.length - 1;
    };
    const go = (n) => {
      const f = figs()[n];
      if (f) track.scrollTo({ left: f.offsetLeft + f.offsetWidth / 2 - track.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
    };
    let st = 0;
    track.addEventListener("scroll", () => { cancelAnimationFrame(st); st = requestAnimationFrame(update); }, { passive: true });
    gallery.addEventListener("click", (e) => {
      const dir = e.target.closest("[data-dir]");
      if (dir) return go(current + Number(dir.dataset.dir));
      if (e.target.closest("[data-close]")) return gallery.close();
      const r = gallery.getBoundingClientRect();
      const out = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      if (out) gallery.close();
    });
    gallery.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
    });
    gallery.addEventListener("close", () => {
      root.classList.remove("has-dialog");
      gallery._opener?.focus();
    });
    gallery._fill = (p) => {
      $("#gallery-title", gallery).textContent = p.title;
      track.innerHTML = p.screens.map((s, n) => `
        <figure>
          <img src="${esc(s.src)}" alt="${esc(s.alt || `${p.title} ekran ${n + 1}`)}" width="420" height="900" decoding="async">
        </figure>`).join("");
      $(".gallery-dots", gallery).innerHTML = p.screens.map(() => "<i></i>").join("");
      track.scrollLeft = 0;
      requestAnimationFrame(update);
    };
    return gallery;
  }

  function openGallery(p, opener) {
    if (!p || !Array.isArray(p.screens) || !p.screens.length) return;
    const g = getGallery();
    g._opener = opener;
    g._fill(p);
    root.classList.add("has-dialog");
    g.showModal();
    $(".gallery-track", g).focus({ preventScroll: true });
  }

  grid?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-gallery]");
    if (btn) openGallery(projects[Number(btn.dataset.gallery)], btn);
  });

  /* ---------- Timeline progress ---------- */
  const timeline = $(".timeline");
  function timelineProgress() {
    if (!timeline) return;
    const r = timeline.getBoundingClientRect();
    const start = innerHeight * 0.75;
    const p = Math.min(Math.max((start - r.top) / r.height, 0), 1);
    timeline.style.setProperty("--p", p.toFixed(3));
  }
  if (timeline && reduce) timeline.style.setProperty("--p", "1");

  /* ---------- Contact form ---------- */
  const form = $("#contact-form");
  if (form) {
    const rules = {
      name: (v) => v.trim().length >= 2 || "Lütfen adını yaz (en az 2 karakter).",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Geçerli bir e-posta adresi gir (ör. ad@alan.com).",
      message: (v) => v.trim().length >= 10 || "Mesajın en az 10 karakter olmalı."
    };
    const validate = (input) => {
      const rule = rules[input.name];
      if (!rule) return true;
      const res = rule(input.value);
      const field = input.closest(".field");
      const err = $(".field-error", field);
      const ok = res === true;
      field.classList.toggle("has-error", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      if (err) err.textContent = ok ? "" : res;
      return ok;
    };
    Object.keys(rules).forEach((n) => {
      const input = form.elements[n];
      input.addEventListener("blur", () => input.value && validate(input));
      input.addEventListener("input", () => input.closest(".field").classList.contains("has-error") && validate(input));
    });

    const status = $(".form-status", form);
    const submit = $('button[type="submit"]', form);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      const invalid = Object.keys(rules).map((n) => form.elements[n]).filter((i) => !validate(i));
      if (invalid.length) { invalid[0].focus(); return; }
      if (form.elements.website?.value) return; // bot tuzağı

      const data = new FormData(form);
      const endpoint = form.dataset.endpoint;
      submit.disabled = true;
      form.classList.add("is-sending");

      try {
        if (endpoint) {
          const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
          if (!res.ok) throw new Error("Gönderilemedi");
        } else {
          const subject = `[${data.get("topic") || "Genel"}] ${data.get("name")} — MIO Software iletişim`;
          const body = `${data.get("message")}\n\n— ${data.get("name")}\n${data.get("email")}`;
          location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
        form.classList.add("is-sent");
        form.reset();
        $(".form-success .btn", form)?.focus();
      } catch {
        status.textContent = "Mesaj gönderilemedi. Lütfen tekrar dene ya da doğrudan e-posta gönder.";
      } finally {
        submit.disabled = false;
        form.classList.remove("is-sending");
      }
    });

    $(".form-success .btn", form)?.addEventListener("click", () => {
      form.classList.remove("is-sent");
      form.elements.name.focus();
    });
  }

  /* ---------- Page transitions ---------- */
  if (!reduce) {
    d.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || a.target || a.hasAttribute("download")) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.protocol !== location.protocol) return;
      if (url.pathname === location.pathname) return; // aynı sayfa: anchor kaydırma
      e.preventDefault();
      setMenu(false);
      root.classList.add("is-leaving");
      setTimeout(() => (location.href = url.href), 430);
    });
  }
  addEventListener("pageshow", (e) => {
    if (e.persisted) { root.classList.remove("is-leaving"); setMenu(false); }
  });

  /* ---------- Init ---------- */
  observeReveal();
  onScroll();
})();
