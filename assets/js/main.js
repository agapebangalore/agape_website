/* Agape Bible Church — shared interactions */
(function () {
  "use strict";

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav-main");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("is-open");
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); ro.unobserve(en.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -24px 0px" });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Animated counters — data-count="1000" data-suffix="+" */
  var counters = document.querySelectorAll("[data-count]");
  function animate(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-IN") + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = parseInt(el.getAttribute("data-count"), 10).toLocaleString("en-IN") + (el.getAttribute("data-suffix") || "");
    });
  }

  /* Sermon filters */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var sermons = document.querySelectorAll("[data-category]");
  var countEl = document.getElementById("sermon-count");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var cat = btn.getAttribute("data-filter");
      var shown = 0;
      sermons.forEach(function (card) {
        var show = cat === "all" || card.getAttribute("data-category") === cat;
        card.style.display = show ? "" : "none";
        if (show) shown++;
      });
      if (countEl) countEl.textContent = shown + (shown === 1 ? " sermon" : " sermons");
    });
  });

  /* Copy buttons — data-copy="value" */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var val = btn.getAttribute("data-copy");
      function done() {
        btn.classList.add("is-copied");
        var label = btn.querySelector("span");
        if (label) { var prev = label.textContent; label.textContent = "Copied"; setTimeout(function () { label.textContent = prev; btn.classList.remove("is-copied"); }, 1800); }
      }
      if (navigator.clipboard) { navigator.clipboard.writeText(val).then(done); }
      else {
        var ta = document.createElement("textarea");
        ta.value = val; document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta); done();
      }
    });
  });

  /* Prayer form — composes email or WhatsApp message, no backend needed */
  var prayerForm = document.getElementById("prayer-form");
  if (prayerForm) {
    var anonBox = document.getElementById("pf-anon");
    var contactFields = document.getElementById("pf-contact-fields");
    if (anonBox && contactFields) {
      anonBox.addEventListener("change", function () {
        contactFields.style.display = anonBox.checked ? "none" : "";
        contactFields.querySelectorAll("input").forEach(function (i) { i.required = !anonBox.checked && i.dataset.req === "1"; });
      });
    }
    function buildMessage() {
      var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
      var anon = anonBox && anonBox.checked;
      var lines = [];
      lines.push((document.getElementById("pf-type-testimony") && document.getElementById("pf-type-testimony").checked) ? "TESTIMONY" : "PRAYER REQUEST");
      lines.push("Category: " + (v("pf-category") || "General Prayer"));
      lines.push("Urgency: " + (v("pf-urgency") || "Normal"));
      if (!anon) {
        lines.push("Name: " + v("pf-name"));
        if (v("pf-email")) lines.push("Email: " + v("pf-email"));
        if (v("pf-phone")) lines.push("Phone: " + v("pf-phone"));
        var fu = document.getElementById("pf-followup");
        lines.push("Follow-up requested: " + (fu && fu.checked ? "Yes" : "No"));
      } else {
        lines.push("Submitted anonymously");
      }
      lines.push("");
      lines.push(v("pf-request"));
      return lines.join("\n");
    }
    prayerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var body = buildMessage();
      var via = (e.submitter && e.submitter.getAttribute("data-via")) || "email";
      if (via === "whatsapp") {
        window.open("https://wa.me/919901613901?text=" + encodeURIComponent(body), "_blank", "noopener");
      } else {
        location.href = "mailto:jim@agapebangalore.org?subject=" + encodeURIComponent("Prayer Request — Agape Bible Church Website") + "&body=" + encodeURIComponent(body);
      }
      var note = document.getElementById("pf-sent-note");
      if (note) note.hidden = false;
    });
  }

  /* Current year */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
