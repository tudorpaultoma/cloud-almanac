/* Price module — renders any provider pair from the normalized pricebook. */
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
  function deltaOf(row, a, b) {
    var pa = row.prices[a], pb = row.prices[b];
    if (pa == null || pb == null) return null;
    return Math.round((pa - pb) / pb * 100);
  }

  function svcRanges(cmp, book) {
    var map = {}, a = cmp.pair[0], b = cmp.pair[1];
    book.services.forEach(function (svc) {
      svc.tiers.forEach(function (t) {
        t.rows.forEach(function (r) {
          var d = deltaOf(r, a, b);
          if (d !== null) (map[svc.id] = map[svc.id] || []).push(d);
        });
      });
    });
    return map;
  }

  function prov(cmp, i) { return window.CA_DATA.providers[cmp.pair[i]]; }
  function pairLabel(cmp) { return prov(cmp, 0).name + ' vs ' + prov(cmp, 1).name + ' · Frankfurt'; }

  /* ---------- shared pieces ---------- */

  function toolbar(cmp, sub) {
    var tabs = [{ id: 'overview', tab: 'Overview' }].concat(cmp.pages, [{ id: 'catalogue', tab: 'All services' }]);
    return '' +
      '<div class="pc-bar">' +
        '<label class="pc-select"><span class="muted">Comparison</span>' +
          '<select aria-label="Comparison pair">' +
            '<option selected>' + esc(pairLabel(cmp)) + '</option>' +
            '<option disabled>Azure vs AWS — not priced yet</option>' +
            '<option disabled>Google Cloud vs AWS — not priced yet</option>' +
            '<option disabled>Tencent Cloud vs Azure — not priced yet</option>' +
            '<option disabled>Alibaba Cloud vs AWS — not priced yet</option>' +
          '</select></label>' +
        '<div class="pc-meta">' +
          '<span>' + esc(cmp.basis) + '</span><span class="dot"></span>' +
          '<span>USD per month</span><span class="dot"></span>' +
          '<span>Retrieved 2 Oct 2026</span>' +
        '</div>' +
      '</div>' +
      '<nav class="pc-tabs" aria-label="Price pages">' + tabs.map(function (t) {
        return '<a href="#/price/' + t.id + '"' + (t.id === sub ? ' aria-current="page"' : '') + '>' + esc(t.tab) + '</a>';
      }).join('') + '</nav>';
  }

  function legend(cmp) {
    var a = prov(cmp, 0), b = prov(cmp, 1);
    return '<div class="pc-legend">' +
      '<span><i class="sw cheaper"></i>' + esc(a.name) + ' cheaper</span>' +
      '<span><i class="sw dearer"></i>' + esc(b.name) + ' cheaper</span>' +
      '<span class="muted">Δ = ' + esc(a.name) + ' list price vs ' + esc(b.name) + ' list price, same scenario</span>' +
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

  function overview(cmp, book, sort) {
    var ranges = svcRanges(cmp, book);
    var svcs = cmp.services.slice();
    if (sort === 'median') svcs.sort(function (x, y) { return x.median - y.median; });

    var kpis = cmp.summary.kpis.map(function (k) {
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

    var a = prov(cmp, 0), b = prov(cmp, 1);
    return '' +
      '<div class="kpis">' + kpis + '</div>' +
      '<section class="panel pc-chart">' +
        '<div class="pc-chart-head">' +
          '<div><h2>Executive summary · ' + esc(a.name) + ' vs ' + esc(b.name) + '</h2>' +
          '<p class="muted">Every scenario per service; the dot marks the median. Select a service for detail.</p></div>' +
          '<div class="seg" role="group" aria-label="Sort">' +
            '<button data-sort="deck"' + (sort !== 'median' ? ' aria-pressed="true"' : '') + '>By category</button>' +
            '<button data-sort="median"' + (sort === 'median' ? ' aria-pressed="true"' : '') + '>By median</button>' +
          '</div>' +
        '</div>' +
        legend(cmp) +
        '<div class="rc">' +
          '<div class="rc-row rc-axis" aria-hidden="true"><div class="rc-name"><span>Service · ' + esc(a.name) + ' vs ' + esc(b.name) + '</span></div>' +
            '<div class="rc-track"><span style="left:0">\u2212' + SCALE + '%</span><span style="left:50%">0</span><span style="left:100%">+' + SCALE + '%</span></div>' +
            '<div class="rc-val">Median</div><div class="rc-rng">Range</div></div>' +
          rows +
        '</div>' +
      '</section>' +
      takeaway(cmp.summary.takeaway) +
      notes([cmp.summary.note].concat(cmp.sources), null);
  }

  /* ---------- service page ---------- */

  function servicePage(cmp, book, p) {
    var pa = cmp.pair[0], pb = cmp.pair[1];
    var A = prov(cmp, 0), B = prov(cmp, 1);
    var st = p.stats;
    var stats = '' +
      '<div class="kpi"><div class="kpi-v ' + tone(st.median.d) + '">' + pct(st.median.d) + '</div><div class="kpi-l">median across ' + st.median.n + ' comparisons</div><div class="kpi-s">' + esc(A.name) + ' list price vs ' + esc(B.name) + ' list price, same scenario</div></div>' +
      '<div class="kpi"><div class="kpi-v ' + tone(st.best.d) + '">' + pct(st.best.d) + '</div><div class="kpi-l">best case on this page</div><div class="kpi-s">' + esc(st.best.label) + '</div></div>' +
      '<div class="kpi"><div class="kpi-v">' + esc(st.saving.value) + '</div><div class="kpi-l">largest saving per year</div><div class="kpi-s">' + esc(st.saving.label) + '</div></div>';

    var groups = '';
    p.serviceIds.forEach(function (sid) {
      var svc = book.services.find(function (s) { return s.id === sid; });
      if (!svc) return;
      svc.tiers.forEach(function (t) {
        var rows = t.rows.map(function (r) {
          var va = r.prices[pa], vb = r.prices[pb];
          var d = deltaOf(r, pa, pb);
          var bar = '';
          if (d !== null) {
            var w = Math.min(Math.abs(d), SCALE) / SCALE * 50;
            bar = '<span class="db-bar ' + tone(d) + '" style="' + (d < 0 ? 'right:50%' : 'left:50%') + ';width:' + w + '%"></span>';
          }
          return '<tr>' +
            '<th scope="row">' + esc(r.label) + '</th>' +
            '<td class="num">' + (va == null ? '<span class="muted">—</span>' : money(va)) + '</td>' +
            '<td class="num">' + (vb == null ? '<span class="muted">—</span>' : money(vb)) + '</td>' +
            '<td class="delta">' + (d === null ? '<span class="muted">—</span>' :
              '<span class="db" aria-hidden="true"><span class="db-zero"></span>' + bar + '</span>' +
              '<span class="dv ' + tone(d) + '">' + pct(d) + '</span>') + '</td>' +
          '</tr>';
        }).join('');
        groups += '<section class="panel sc">' +
          '<header class="sc-head"><div><h3>' + esc(t.label) + '</h3><p class="muted">' + esc(t.sub) + '</p></div></header>' +
          '<div class="sc-skus">' +
            '<div><span class="pv">' + esc(A.name) + '</span><b>' + esc(t.products[pa] || '—') + '</b></div>' +
            '<div><span class="pv">' + esc(B.name) + '</span><b>' + esc(t.products[pb] || '—') + '</b></div>' +
          '</div>' +
          '<div class="tbl-wrap"><table class="ptbl">' +
            '<thead><tr><th scope="col">Scenario</th><th scope="col" class="num">' + esc(A.name) + '</th><th scope="col" class="num">' + esc(B.name) + '</th><th scope="col" class="delta">Δ</th></tr></thead>' +
            '<tbody>' + rows + '</tbody></table></div>' +
        '</section>';
      });
    });

    return '' +
      '<div class="pc-title"><h2>' + esc(p.title) + '</h2><p class="muted">' + esc(p.sub) + '</p></div>' +
      '<div class="kpis">' + stats + '</div>' +
      legend(cmp) +
      '<div class="sc-grid">' + groups + '</div>' +
      takeaway(p.takeaway) +
      notes(p.notes, p.source);
  }

  /* ---------- catalogue ---------- */

  var STATUS = {
    ok:     { label: 'Match',        hint: 'Close 1:1 match' },
    review: { label: 'Review',       hint: 'Partial match or different billing model — needs manual review' },
    none:   { label: 'No match',     hint: 'No AWS equivalent' },
    skip:   { label: 'Out of scope', hint: 'Not a metered cloud service' }
  };
  var catFilter = { status: 'all', category: 'all', q: '' };

  function catalogue(cat) {
    var counts = { ok: 0, review: 0, none: 0, skip: 0, priced: 0, total: 0 };
    cat.categories.forEach(function (c) {
      c.items.forEach(function (it) {
        counts[it[2]]++; counts.total++;
        if (it[4]) counts.priced++;
      });
    });

    var stats = '<div class="cat-stats">' +
      '<span><b>' + counts.total + '</b> services</span>' +
      '<span class="pill ok">' + counts.ok + ' match</span>' +
      '<span class="pill review">' + counts.review + ' review</span>' +
      '<span class="pill none">' + counts.none + ' no match</span>' +
      '<span class="pill priced">' + counts.priced + ' priced</span>' +
    '</div>';

    var seg = ['all', 'ok', 'review', 'none'].map(function (s) {
      return '<button data-status="' + s + '"' + (catFilter.status === s ? ' aria-pressed="true"' : '') + '>' +
        (s === 'all' ? 'All' : STATUS[s].label) + '</button>';
    }).join('');

    var cats = ['all'].concat(cat.categories.map(function (c) { return c.name; }));
    var sel = cats.map(function (c) {
      return '<option' + (catFilter.category === c ? ' selected' : '') + '>' + (c === 'all' ? 'All categories' : esc(c)) + '</option>';
    }).join('');

    var rows = '';
    cat.categories.forEach(function (c) {
      if (catFilter.category !== 'all' && c.name !== catFilter.category) return;
      var items = c.items.filter(function (it) {
        if (catFilter.status !== 'all' && it[2] !== catFilter.status) return false;
        if (catFilter.q) {
          var q = catFilter.q.toLowerCase();
          return it[0].toLowerCase().indexOf(q) >= 0 || (it[1] || '').toLowerCase().indexOf(q) >= 0;
        }
        return true;
      });
      if (!items.length) return;
      rows += '<tr class="cat-cat"><th colspan="4" scope="colgroup">' + esc(c.name) + ' <span class="muted">' + items.length + '</span></th></tr>';
      items.forEach(function (it) {
        var st = STATUS[it[2]];
        rows += '<tr>' +
          '<th scope="row">' + esc(it[0]) + '</th>' +
          '<td>' + (it[1] ? esc(it[1]) : '<span class="muted">—</span>') +
            (it[3] ? '<span class="cat-note">' + esc(it[3]) + '</span>' : '') + '</td>' +
          '<td><span class="pill ' + it[2] + '" title="' + esc(st.hint) + '">' + st.label + '</span></td>' +
          '<td>' + (it[4] ? '<a class="cat-link" href="#/price/' + it[4] + '">Priced</a>' : '<span class="muted">Pending</span>') + '</td>' +
        '</tr>';
      });
    });
    if (!rows) rows = '<tr><td colspan="4" class="muted" style="text-align:center;padding:24px">No services match these filters.</td></tr>';

    return '' +
      '<div class="pc-title"><h2>All services · ' + esc(cat.a) + ' vs ' + esc(cat.b) + '</h2>' +
      '<p class="muted">Full product catalogue with equivalence mapping. Rows marked <b>Review</b> are the manual-review queue; <b>Priced</b> rows link to the detailed comparison. Source: ' + esc(cat.source) + '.</p></div>' +
      stats +
      '<div class="cat-bar">' +
        '<div class="seg" role="group" aria-label="Filter by match status">' + seg + '</div>' +
        '<label class="pc-select"><span class="muted">Category</span><select class="cat-cat-select" aria-label="Filter by category">' + sel + '</select></label>' +
        '<input class="cat-search" type="search" placeholder="Filter by name…" value="' + esc(catFilter.q) + '" aria-label="Filter by name">' +
      '</div>' +
      '<section class="panel"><div class="tbl-wrap"><table class="ptbl cat-tbl">' +
        '<thead><tr><th scope="col">' + esc(cat.a) + ' service</th><th scope="col">' + esc(cat.b) + ' equivalent</th><th scope="col" style="width:110px">Match</th><th scope="col" style="width:90px">Pricing</th></tr></thead>' +
        '<tbody>' + rows + '</tbody></table></div></section>' +
      takeaway('The Review and No match rows are the manual-review queue — confirm the AWS equivalent (or confirm there is none), then pricing can be filled in batch by batch in the same card format as the priced pages.') +
      notes(['Mapping source: Tencent Cloud International product index (' + cat.source + '). AWS equivalents from the AWS service catalogue.', 'Pricing is imported per service only from sourced material (e.g. comparison decks); "Pending" rows have no prices yet by design.'], null);
  }

  /* ---------- entry ---------- */

  var sortMode = 'deck';

  function render(el, sub) {
    var cmp = ((window.CA_DATA || {}).comparisons || [])[0];
    var book = ((window.CA_DATA || {}).pricebooks || [])[0];
    if (!cmp || !book) { el.innerHTML = '<p class="muted">No price data loaded.</p>'; return; }

    var page = null, isCatalogue = sub === 'catalogue';
    cmp.pages.forEach(function (p) { if (p.id === sub) page = p; });
    if (!page && !isCatalogue) sub = 'overview';

    var body;
    if (isCatalogue) {
      var cat = ((window.CA_DATA || {}).catalogue || [])[0];
      body = cat ? catalogue(cat) : '<p class="muted">Catalogue data not loaded.</p>';
    } else if (page) {
      body = servicePage(cmp, book, page);
    } else {
      body = overview(cmp, book, sortMode);
    }

    el.innerHTML = '' +
      '<div class="page-head"><div><h1>Price</h1><p>Like-for-like list-price comparison per service, scenario by scenario.</p></div></div>' +
      toolbar(cmp, isCatalogue ? 'catalogue' : sub) +
      '<div class="pc-body">' + body + '</div>';

    el.querySelectorAll('.seg button[data-sort]').forEach(function (b) {
      b.addEventListener('click', function () { sortMode = b.dataset.sort; render(el, 'overview'); });
    });
    if (isCatalogue) {
      el.querySelectorAll('.seg button[data-status]').forEach(function (b) {
        b.addEventListener('click', function () { catFilter.status = b.dataset.status; render(el, 'catalogue'); });
      });
      el.querySelector('.cat-cat-select').addEventListener('change', function (e) { catFilter.category = e.target.value; render(el, 'catalogue'); });
      var s = el.querySelector('.cat-search');
      s.addEventListener('input', function (e) { catFilter.q = e.target.value; render(el, 'catalogue'); });
      s.focus();
      s.setSelectionRange(s.value.length, s.value.length);
    }
    return isCatalogue ? 'All services' : page ? page.tab : 'Overview';
  }

  (window.CA_VIEWS = window.CA_VIEWS || {}).price = render;
})();
