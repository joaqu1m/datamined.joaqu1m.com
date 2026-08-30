/* Comum a todas as páginas: tema claro/escuro e troca de idioma.
 * O tema já foi aplicado por um script inline no <head> (evita flash). */
(function () {
  var P = window.Peak;

  // escuro e o padrao; claro so por escolha explicita (salva em localStorage)
  var btn = document.getElementById("theme-toggle");
  if (btn) {
    var apply = function (t) {
      if (t === "light") document.documentElement.setAttribute("data-theme", "light");
      else document.documentElement.removeAttribute("data-theme");
      // o botao mostra PARA ONDE se vai, nao onde se esta
      btn.textContent = t === "light" ? "🌙" : "☀️";
    };
    try { apply(localStorage.getItem("peak-theme")); } catch (e) { apply(null); }
    btn.onclick = function () {
      var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      try { localStorage.setItem("peak-theme", next); } catch (e) {}
      apply(next);
    };
  }

  // seletor de idioma: navega para a MESMA página na outra língua
  var sel = document.getElementById("lang-select");
  if (sel) {
    sel.onchange = function () {
      try { localStorage.setItem("peak-lang", sel.value); } catch (e) {}
      var url = sel.options[sel.selectedIndex].dataset.href;
      if (url) location.href = url;
    };
  }

  // Detecção de idioma: SÓ na home em inglês (raiz), só na primeira visita e
  // só quando o navegador pede outra língua. Uma escolha explícita no seletor
  // (localStorage) desliga isto para sempre.
  if (window.PEAK_AUTOLANG) {
    var saved = null;
    try { saved = localStorage.getItem("peak-lang"); } catch (e) {}
    if (!saved) {
      var avail = window.PEAK_AUTOLANG;   // {hreflang-lower: url}
      var cands = (navigator.languages || [navigator.language || ""]);
      for (var i = 0; i < cands.length; i++) {
        var c = String(cands[i]).toLowerCase();
        var hit = avail[c] || avail[c.split("-")[0]];
        if (hit && hit.slug !== "en") { location.replace(hit.url); return; }
        if (hit) break;   // navegador em inglês: fica
      }
    }
  }
})();
