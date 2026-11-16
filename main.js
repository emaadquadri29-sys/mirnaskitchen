/* Mirna's Kitchen RCB — interactions. Content lives in js/site-data.js */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var data = window.SITE_DATA || {};
  var biz = data.business || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  /* ---------- Contact details ---------- */
  function bindContact() {
    $$('[data-bind="street"]').forEach(function (el) { el.textContent = biz.street; });
    $$('[data-bind="city"]').forEach(function (el) { el.textContent = biz.city; });
    $$('[data-bind="maps-link"]').forEach(function (el) { el.href = biz.mapsUrl; });

    $$('[data-bind="phone"]').forEach(function (el) {
      if (biz.phoneVerified) {
        el.innerHTML = '<a href="tel:' + esc(biz.phone.replace(/[^\d+]/g, "")) + '">' + esc(biz.phone) + "</a>";
      } else {
        el.innerHTML = esc(biz.phone) + ' <span class="tag">placeholder</span>';
      }
    });

    var callBtn = $('[data-bind="phone-link"]');
    if (callBtn) {
      if (biz.phoneVerified) callBtn.href = "tel:" + biz.phone.replace(/[^\d+]/g, "");
      else callBtn.hidden = true; // hide "Call Us" until a real number exists
    }

    // Hours table
    var body = $("#hours-body");
    var hours = data.hours || [];
    var todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
    if (body) {
      body.innerHTML = hours.map(function (h) {
        return '<tr' + (h.day === todayName ? ' class="today"' : "") + '><td>' + esc(h.day) + "</td><td>" + esc(h.time) + "</td></tr>";
      }).join("");
    }
    var tag = $('[data-bind="hours-tag"]');
    if (tag && data.hoursVerified) tag.hidden = true;

    var short = $('[data-bind="hours-short"]');
    if (short) {
      var today = hours.filter(function (h) { return h.day === todayName; })[0];
      short.textContent = data.hoursVerified && today ? "Today " + today.time : "Coming soon";
    }
  }

  /* ---------- Menu ---------- */
  function buildMenu() {
    var tabs = $("#menu-tabs"), panels = $("#menu-panels");
    var cats = data.menu || [];
    if (!tabs || !panels || !cats.length) return;

    tabs.innerHTML = cats.map(function (c, i) {
      return '<button class="menu-tab" role="tab" id="tab-' + esc(c.id) + '" aria-controls="panel-' + esc(c.id) +
        '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(c.label) + "</button>";
    }).join("");

    panels.innerHTML = cats.map(function (c, i) {
      var items = c.items.map(function (it) {
        return '<article class="menu-item">' +
          '<div class="menu-item-top"><h4>' + esc(it.name) + '</h4><span class="leader" aria-hidden="true"></span>' +
          '<span class="price">' + esc(it.price) + "</span></div>" +
          (it.desc ? "<p>" + esc(it.desc) + "</p>" : "") +
          (it.placeholder ? '<span class="tag">Sample · placeholder</span>' : "") +
          "</article>";
      }).join("");
      return '<div class="menu-panel" role="tabpanel" id="panel-' + esc(c.id) + '" aria-labelledby="tab-' + esc(c.id) + '" tabindex="0"' +
        (i === 0 ? "" : " hidden") + ">" +
        '<div class="menu-panel-head"><h3>' + esc(c.label) + "</h3>" + (c.note ? "<p>" + esc(c.note) + "</p>" : "") + "</div>" +
        '<div class="menu-list">' + items + "</div></div>";
    }).join("");

    var tabEls = $$(".menu-tab", tabs);
    function select(i, focus) {
      tabEls.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        $("#" + t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tabEls[i].focus();
      tabEls[i].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    }
    tabEls.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        var n = tabEls.length, k = e.key;
        if (k === "ArrowRight") { e.preventDefault(); select((i + 1) % n, true); }
        else if (k === "ArrowLeft") { e.preventDefault(); select((i - 1 + n) % n, true); }
        else if (k === "Home") { e.preventDefault(); select(0, true); }
        else if (k === "End") { e.preventDefault(); select(n - 1, true); }
      });
    });
  }

  /* ---------- Navigation ---------- */
  function initNav() {
    var header = $(".site-header");
    var toggle = $(".nav-toggle");
    var menu = $("#nav-menu");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("open", open);
    }
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    document.addEventListener("click", function (e) {
      if (menu.classList.contains("open") && !header.contains(e.target)) setOpen(false);
    });

    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Active link highlighting
    if ("IntersectionObserver" in window) {
      var links = $$(".nav-links a");
      var map = {};
      links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && map[en.target.id]) {
            links.forEach(function (l) { l.classList.remove("active"); l.removeAttribute("aria-current"); });
            map[en.target.id].classList.add("active");
            map[en.target.id].setAttribute("aria-current", "true");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  }

  /* ---------- Image fallback (if a stock photo fails to load) ---------- */
  function initImageFallback() {
    $$("img").forEach(function (img) {
      function fail() { var p = img.closest(".g-item, .hero-media, .band-media, .about-media"); if (p) p.classList.add("img-fallback"); }
      if (img.complete && img.naturalWidth === 0 && img.src) fail();
      img.addEventListener("error", fail);
    });
  }

  /* ---------- Gallery lightbox ---------- */
  function initLightbox() {
    var lb = $("#lightbox"), img = $("#lb-img"), cap = $("#lb-cap");
    var items = $$(".g-item");
    var idx = 0, lastFocus = null;

    function show(i) {
      idx = (i + items.length) % items.length;
      var src = $("img", items[idx]);
      img.src = src.src.replace(/w=\d+/, "w=1600");
      img.alt = src.alt;
      cap.textContent = src.alt;
    }
    function open(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = "hidden"; $(".lb-close", lb).focus(); }
    function close() { lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }

    items.forEach(function (it, i) { $(".g-btn", it).addEventListener("click", function () { open(i); }); });
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-prev", lb).addEventListener("click", function () { show(idx - 1); });
    $(".lb-next", lb).addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(idx + 1);
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "Tab") { // simple focus trap
        var f = $$("button", lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  bindContact();
  buildMenu();
  initNav();
  initReveal();
  initImageFallback();
  initLightbox();
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
