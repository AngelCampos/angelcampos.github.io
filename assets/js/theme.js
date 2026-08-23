/*
 * Light / dark theme toggle
 *
 * Ported from the updated academicpages template, rewritten without jQuery and
 * kept OUT of assets/js/main.min.js on purpose: that bundle is a build artifact
 * (npm run build:js), so keeping this standalone means no rebuild is needed.
 *
 * Contract (same as upstream): localStorage["theme"] is "dark" or "light";
 * dark mode = data-theme="dark" on <html>, light = attribute removed. With no
 * stored choice the OS preference wins and is followed live.
 */

(function () {
  var STORAGE_KEY = "theme";
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function stored() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === "dark" || value === "light" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function currentTheme() {
    return stored() || (media && media.matches ? "dark" : "light");
  }

  function applyTheme(theme) {
    var root = document.documentElement;

    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    /* the icon shows what a click will do: sun while dark, moon while light */
    var icon = document.getElementById("theme-icon");
    if (icon) {
      icon.className = "fas " + (theme === "dark" ? "fa-sun" : "fa-moon");
    }

    var button = document.getElementById("theme-toggle");
    if (button) {
      button.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  applyTheme(currentTheme());

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(currentTheme());

    var button = document.getElementById("theme-toggle");
    if (!button) {
      return;
    }

    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* private mode: the choice just won't persist */
      }
      applyTheme(next);
    });
  });

  /* follow the OS while the visitor has not made an explicit choice */
  if (media) {
    var onSystemChange = function (event) {
      if (!stored()) {
        applyTheme(event.matches ? "dark" : "light");
      }
    };

    if (media.addEventListener) {
      media.addEventListener("change", onSystemChange);
    } else if (media.addListener) {
      media.addListener(onSystemChange);
    }
  }
})();
