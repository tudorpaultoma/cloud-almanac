/* Price module — overview + per-service comparison pages. */
(function () {
  'use strict';

  var SCALE = 80; // chart axis: −80% … +80%

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function money(v) {
    var dec = v < 1000 ? 2 : 0;
    return '$' + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function pct(d) {
    if (d === 0) return '0%';
    return (d < 0 ? '\u2212' : '+') + Math.abs(d) + '%';
  }
  function tone(d) { return d < 0 ? 'cheaper' : d > 0 ? 'dearer' : 'level'; }
  function pos(d) { // 0..100 along the axis, clipped
    var c = Math.max(-SCALE, Math.min(SCALE, d));
    return ((c + SCALE) / (2 * SCALE)) * 100;
  }
  function median(arr) {
    var s = arr.slice().sort(function (a, b) { return a - b; });
    var m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  }

  function serviceRanges(ds) {
    var map = {};
    ds.pages.forEach(function (p) {
      p.groups.forEach(function (g) {
        (map[g.svc] = map[g.svc] || []);
        g.rows.forEach(function (r) { map[g.svc].push(r.d); });
      });
    });
    return map;
  }

  /* ---------- shared pieces ---------- */

  function toolbar(ds, sub) {
    var tabs = [{ id: 'overview', tab: 'Overview' }].concat(ds.pages);
    return '' +
      '<div class="pc-bar">' +
        '<label class="pc-select"><span class="muted">Comparison</span>' +
          '<select aria-label="Comparison set"><option>' + esc(ds.label) + '</option>' +
          '<option disabled>More providers — coming soon</option></select></label>' +
        '<div class="pc-meta">' +
          '<span>' + esc(ds.basis) + '</span><span class="dot"></span>' +
          '<span>' + esc(ds.currency + ' ' + ds.unit) + '</span><span class="dot"></span>' +
          '<span>Retrieved ' + esc(ds.retrieved) + '</span>' +
        '</div>' +
      '</div>' +
      '<nav class="pc-tabs" aria-label="Price pages">' + tabs.map(function (t) {
        return '<a href="#/price/' + t.id + '"' + (t.id === sub ? ' aria-current="page"' : '') + '>' + esc(t.tab) + '</a>';
      }).join('') + '</nav>';
  }

  function legend(ds) {
    return '<div class="pc-legend">' +
      '<span><i class="sw cheaper"></i>' + esc(ds.providers.a) + ' cheaper</span>' +
      '<span><i class="sw dearer"></i>' + esc(ds.providers.b) + ' cheaper</span>' +
      '<span class="muted">Δ = ' + esc(ds.providers.a) + ' list price vs ' + esc(ds.providers.b) + ' list price, same scenario</span>' +
    '</div>';
  }

  function takeaway(text) {
    return '<div class="pc-takeaway"><b>Key takeaway</b><p>' + esc(text) + '</p></div>';
  }

  function notes(list, source) {
    return '<details class="pc-notes"><summary>Methodology & sources</summary><ul>' +
      list.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') +
      (source ? '<li class="src"><b>Source</b> ' + esc(source) + '</li>' : '') +
      '</ul></details>';
  }

  /* ---------- overview ---------- */

  function overview(ds, sort) {
    var ranges = serviceRanges(ds);
    var svcs = ds.services.slice();
    if (sort === 'median') svcs.sort(function (a, b) { return a.median - b.median; });

    var kpis = ds.summary.kpis.map(function (k) {
      return '<div class="kpi"><div class="kpi-v">' + esc(k.value) + '</div>' +
        '<div class="kpi-l">' + esc(k.label) + '</div><div class="kpi-s">' + esc(k.sub) + '</div></div>';
    }).join('');

    var lastCat = null;
    var rows = svcs.map(function (s) {
      var r = ranges[s.id] || [];
      var lo = r.length ? Math.min.apply(null, r) : null;
      var hi = r.length ? Math.max.apply(null, r) : null;
      var head = '';
      if (sort !== 'median' && s.cat !== lastCat) { head = '<div class="rc-cat">' + esc(s.cat) + '</div>'; lastCat = s.cat; }
      var bar = '';
      if (lo !== null) {
        var l = pos(lo), h = pos(hi);
        bar = '<span class="rc-range" style="left:' + l + '%;width:' + Math.max(h - l, 0.6) + '%"></span>' +
          (lo < -SCALE ? '<span class="rc-clip l">\u2039</span>' : '') +
          (hi > SCALE ? '<span class="rc-clip r">\u203A</span>' : '');
      }
      var dot = '<span class="rc-med ' + tone(s.median) + '" style="left:' + pos(s.median) + '%"></span>';
      var tag = s.page ? 'a href="#/price/' + s.page + '"' : 'div';
      var endTag = s.page ? 'a' : 'div';
      var rangeTxt = lo === null ? 'Detail pending' : lo === hi ? 'Same in all ' + r.length : pct(lo) + ' to ' + pct(hi);
      return head + '<' + tag + ' class="rc-row' + (s.page ? '' : ' static') + '"' + (s.pending ? ' title="' + esc(s.pending) + '"' : '') + '>' +
        '<div class="rc-name"><b>' + esc(s.name) + '</b><span>' + esc(s.vs) + '</span></div>' +
        '<div class="rc-track" role="img" aria-label="' + esc(s.name + ': median ' + pct(s.median) + (lo !== null ? ', range ' + rangeTxt : '')) + '">' +
          '<span class="rc-zero"></span>' + bar + dot + '</div>' +
        '<div class="rc-val ' + tone(s.median) + '">' + pct(s.median) + '</div>' +
        '<div class="rc-rng">' + esc(rangeTxt) + '</div>' +
      '</' + endTag + '>';
    }).join('');

    return '' +
      '<div class="kpis">' + kpis + '</div>' +
      '<section class="panel pc-chart">' +
        '<div class="pc-chart-head">' +
          '<div><h2>Executive summary · ' + esc(ds.providers.a) + ' vs ' + esc(ds.providers.b) + '</h2>' +
          '<p class="muted">Every scenario per service; the dot marks the median. Select a service for detail.</p></div>' +
          '<div class="seg" role="group" aria-label="Sort">' +
            '<button data-sort="deck"' + (sort !== 'median' ? ' aria-pressed="true"' : '') + '>By category</button>' +
            '<button data-sort="median"' + (sort === 'median' ? ' aria-pressed="true"' : '') + '>By median</button>' +
          '</div>' +
        '</div>' +
        legend(ds) +
        '<div class="rc">' +
          '<div class="rc-row rc-axis" aria-hidden="true"><div class="rc-name"><span>Service · ' + esc(ds.providers.a) + ' vs ' + esc(ds.providers.b) + '</span></div>' +
            '<div class="rc-track"><span style="left:0">\u2212' + SCALE + '%</span><span style="left:50%">0</span><span style="left:100%">+' + SCALE + '%</span></div>' +
            '<div class="rc-val">Median</div><div class="rc-rng">Range</div></div>' +
          rows +
        '</div>' +
      '</section>' +
      takeaway(ds.summary.takeaway) +
      notes([ds.summary.note].concat(ds.sources), null);
  }

  /* ---------- service page ---------- */

  function servicePage(ds, p) {
    var st = p.stats;
    var stats = '' +
      '<div class="kpi"><div class="kpi-v ' + tone(st.median.d) + '">' + pct(st.median.d) + '</div><div class="kpi-l">median across ' + st.median.n + ' comparisons</div><div class="kpi-s">' + esc(ds.providers.a) + ' list price vs ' + esc(ds.providers.b) + ' list price, same scenario</div></div>' +
      '<div class="kpi"><div class="kpi-v ' + tone(st.best.d) + '">' + pct(st.best.d) + '</div><div class="kpi-l">best case on this page</div><div class="kpi-s">' + esc(st.best.label) + '</div></div>' +
      '<div class="kpi"><div class="kpi-v">' + esc(st.saving.value) + '</div><div class="kpi-l">largest saving per year</div><div class="kpi-s">' + esc(st.saving.label) + '</div></div>';

    var groups = p.groups.map(function (g) {
      var rows = g.rows.map(function (r) {
        var w = Math.min(Math.abs(r.d), SCALE) / SCALE * 50;
        var bar = '<span class="db-bar ' + tone(r.d) + '" style="' + (r.d < 0 ? 'right:50%' : 'left:50%') + ';width:' + w + '%"></span>';
        return '<tr>' +
          '<th scope="row">' + esc(r.s) + '</th>' +
          '<td class="num">' + money(r.a) + '</td>' +
          '<td class="num">' + money(r.b) + '</td>' +
          '<td class="delta"><span class="db" aria-hidden="true"><span class="db-zero"></span>' + bar + '</span>' +
            '<span class="dv ' + tone(r.d) + '">' + pct(r.d) + '</span></td>' +
        '</tr>';
      }).join('');
      return '<section class="panel sc">' +
        '<header class="sc-head"><div><h3>' + esc(g.title) + '</h3><p class="muted">' + esc(g.sub) + '</p></div></header>' +
        '<div class="sc-skus">' +
          '<div><span class="pv">' + esc(ds.providers.a) + '</span><b>' + esc(g.a) + '</b></div>' +
          '<div><span class="pv">' + esc(ds.providers.b) + '</span><b>' + esc(g.b) + '</b></div>' +
        '</div>' +
        '<div class="tbl-wrap"><table class="ptbl">' +
          '<thead><tr><th scope="col">Scenario</th><th scope="col" class="num">' + esc(ds.providers.a) + '</th><th scope="col" class="num">' + esc(ds.providers.b) + '</th><th scope="col" class="delta">Δ</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table></div>' +
      '</section>';
    }).join('');

    return '' +
      '<div class="pc-title"><h2>' + esc(p.title) + '</h2><p class="muted">' + esc(p.sub) + '</p></div>' +
      '<div class="kpis">' + stats + '</div>' +
      legend(ds) +
      '<div class="sc-grid">' + groups + '</div>' +
      takeaway(p.takeaway) +
      notes(p.notes, p.source);
  }

  /* ---------- entry ---------- */

  var sortMode = 'deck';

  function render(el, sub) {
    var ds = ((window.CA_DATA || {}).price || [])[0];
    if (!ds) { el.innerHTML = '<p class="muted">No price data loaded.</p>'; return; }
    var page = null;
    ds.pages.forEach(function (p) { if (p.id === sub) page = p; });
    if (!page) sub = 'overview';

    el.innerHTML = '' +
      '<div class="page-head"><div><h1>Price</h1><p>Like-for-like list-price comparison per service, scenario by scenario.</p></div></div>' +
      toolbar(ds, sub) +
      '<div class="pc-body">' + (page ? servicePage(ds, page) : overview(ds, sortMode)) + '</div>';

    el.querySelectorAll('.seg button').forEach(function (b) {
      b.addEventListener('click', function () { sortMode = b.dataset.sort; render(el, 'overview'); });
    });
    return page ? page.tab : 'Overview';
  }

  (window.CA_VIEWS = window.CA_VIEWS || {}).price = render;
})();
