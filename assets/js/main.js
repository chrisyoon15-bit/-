/* 평촌 글로벌어학원 — 모바일 메뉴, 프로그램 탭, 상담 폼 */
(function () {
  "use strict";

  /* ---- 모바일 메뉴 ---- */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("site-nav");

  if (burger && nav) {
    var setOpen = function (open) {
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      if (window.matchMedia("(max-width: 760px)").matches) {
        nav.hidden = !open;
      } else {
        nav.hidden = false;
      }
    };

    var syncToViewport = function () {
      if (window.matchMedia("(max-width: 760px)").matches) {
        setOpen(burger.getAttribute("aria-expanded") === "true");
      } else {
        nav.hidden = false;
      }
    };

    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        burger.focus();
      }
    });

    window.addEventListener("resize", syncToViewport);
    setOpen(false);
  }

  /* ---- 프로그램 탭 ---- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));

  if (tabs.length) {
    var select = function (tab, moveFocus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.setAttribute("tabindex", on ? "0" : "-1");
        var p = document.getElementById(t.getAttribute("aria-controls"));
        if (p) p.hidden = !on;
      });
      if (moveFocus) tab.focus();
    };

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
  }

  /* ---- 현재 보고 있는 섹션을 메뉴에 표시 ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (targets.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + entry.target.id;
          if (on) { a.setAttribute("aria-current", "true"); }
          else { a.removeAttribute("aria-current"); }
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---- 상담 폼 ----
     배포된 Netlify 사이트에서는 폼이 그대로 전송된다(Netlify Forms).
     미리보기/로컬에서는 받는 쪽이 없으므로 안내만 보여준다. */
  var form = document.getElementById("consult-form");

  if (form) {
    var isNetlify = /\.netlify\.(app|com)$/.test(location.hostname) ||
                    form.dataset.liveHost === location.hostname;

    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) return; // 브라우저 기본 검증에 맡김
      if (isNetlify) return;             // 실제 배포본 → 그대로 전송

      e.preventDefault();
      var msg = document.getElementById("form-msg");
      if (msg) {
        msg.hidden = false;
        msg.textContent =
          "미리보기에서는 상담 신청이 전송되지 않습니다. Netlify에 배포하면 Netlify Forms로 접수되어 관리자 화면에서 확인할 수 있습니다.";
        msg.focus();
      }
    });
  }
})();
