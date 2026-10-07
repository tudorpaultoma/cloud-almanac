(function () {
  'use strict';

  var ICONS = {
    infrastructure: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"/></svg>',
    features: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/><path d="M6 9h1M6 13h1M17 9h1M17 13h1"/></svg>',
    price: '<svg viewBox="0 0 24 24"><path d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9-9-9Z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
    support: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/></svg>',
    'free-tier': '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8S10.5 3.5 8 4.5 9 8 12 8Zm0 0s1.5-4.5 4-3.5S15 8 12 8Z"/></svg>',
    promotions: '<svg viewBox="0 0 24 24"><path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1ZM17 9a4 4 0 0 1 0 6"/></svg>',
    certifications: '<svg viewBox="0 0 24 24"><path d="M12 3 4.5 6v6c0 4.4 3.2 7.8 7.5 9 4.3-1.2 7.5-4.6 7.5-9V6L12 3Z"/><path d="m8.8 12.2 2.2 2.2 4.3-4.6"/></svg>'
  };

  var PROVIDERS = [
    { id: 'aws', name: 'AWS', mono: 'AWS' },
    { id: 'azure', name: 'Microsoft Azure', mono: 'AZ' },
    { id: 'gcp', name: 'Google Cloud', mono: 'GC' },
    { id: 'tencent', name: 'Tencent Cloud', mono: 'TC' },
    { id: 'alibaba', name: 'Alibaba Cloud', mono: 'AC' }
  ];

  var GROUPS = [
    {
      label: 'Coverage',
      items: [
        {
          id: 'infrastructure', title: 'Infrastructure',
          desc: 'Regions, availability zones, edge locations and network footprint across providers.',
          plan: [
            ['Global region map', 'Every public region plotted, filterable by provider and country.'],
            ['Availability zones', 'AZ counts and layout per region, side by side.'],
            ['Edge & CDN nodes', 'Points of presence and edge compute locations.'],
            ['Sovereign & special regions', 'Government, isolated and partner-operated regions.']
          ]
        },
        {
          id: 'features', title: 'Features',
          desc: 'Service catalogue comparison and cross-provider equivalence mapping.',
          plan: [
            ['Service equivalence matrix', 'Map a service to its closest match on every provider.'],
            ['Category browser', 'Compute, storage, database, network, AI, security and more.'],
            ['Capability notes', 'Where equivalent services differ in limits and behaviour.'],
            ['Regional availability', 'Which regions actually offer each service.']
          ]
        }
      ]
    },
    {
      label: 'Commercial',
      items: [
        {
          id: 'price', title: 'Price',
          desc: 'Like-for-like price comparison for each service, by region and configuration.',
          plan: [
            ['Instance price lookup', 'Matching vCPU / memory shapes, per region, per hour and month.'],
            ['Storage & egress', 'Object, block and data transfer pricing.'],
            ['Commitment models', 'On-demand vs. reserved, savings plans and committed use.'],
            ['Currency normalisation', 'Compare in USD, EUR or CNY.']
          ]
        },
        {
          id: 'support', title: 'Support',
          desc: 'Support plans, response-time commitments and enterprise engagement models.',
          plan: [
            ['Plan tiers', 'From basic to enterprise, with entry pricing.'],
            ['Response targets', 'Initial response times by severity.'],
            ['Account engagement', 'TAM, architects and dedicated support coverage.'],
            ['Languages & hours', 'Regional language support and 24/7 availability.']
          ]
        },
        {
          id: 'free-tier', title: 'Free Tier',
          desc: 'Always-free services, trial credits and time-limited free offers.',
          plan: [
            ['Always-free services', 'Services with a permanent free allowance.'],
            ['Trial credits', 'New-account credits, duration and eligibility.'],
            ['12-month offers', 'Time-limited free usage after sign-up.'],
            ['Limits at a glance', 'Usage caps normalised for comparison.']
          ]
        },
        {
          id: 'promotions', title: 'Promotions',
          desc: 'Live promotions, discounts and credit programmes, kept up to date.',
          plan: [
            ['Live campaigns', 'Current discounts per provider and region.'],
            ['Programme credits', 'Startup, partner and migration credit programmes.'],
            ['Expiry tracking', 'What ends soon, with start and end dates.'],
            ['Source links', 'Every promotion linked to its official page.']
          ]
        }
      ]
    },
    {
      label: 'Trust',
      items: [
        {
          id: 'certifications', title: 'Certifications',
          desc: 'Compliance certifications and attestations, compared by provider and region.',
          plan: [
            ['Global standards', 'ISO 27001 family, SOC reports, PCI DSS and CSA STAR.'],
            ['Regional frameworks', 'Country- and sector-specific certifications.'],
            ['Scope by region', 'Which regions and services each certification covers.'],
            ['Validity dates', 'Issue and expiry dates with links to evidence.']
          ]
        }
      ]
    }
  ];

  var PAGES = {};
  GROUPS.forEach(function (g) { g.items.forEach(function (p) { PAGES[p.id] = p; }); });

  var app = document.querySelector('.app');
  var nav = document.getElementById('nav');
  var content = document.getElementById('content');
  var crumb = document.getElementById('crumb');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  nav.innerHTML = GROUPS.map(function (g) {
    return '<div class="nav-label">' + esc(g.label) + '</div>' + g.items.map(function (p) {
      return '<a href="#/' + p.id + '" data-id="' + p.id + '">' + ICONS[p.id] + '<span>' + esc(p.title) + '</span></a>';
    }).join('');
  }).join('');

  function render() {
    var parts = (location.hash.replace(/^#\/?/, '') || 'infrastructure').split('?')[0].split('/');
    var id = parts[0], sub = parts[1] || '';
    var p = PAGES[id] || PAGES.infrastructure;

    nav.querySelectorAll('a').forEach(function (a) {
      if (a.dataset.id === p.id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    crumb.textContent = p.title;
    document.title = p.title + ' · Cloud Almanac';

    var view = (window.CA_VIEWS || {})[p.id];
    if (view) {
      var subTitle = view(content, sub);
      crumb.innerHTML = '<a href="#/' + p.id + '">' + esc(p.title) + '</a>' +
        (subTitle ? '<span class="sep">/</span><span>' + esc(subTitle) + '</span>' : '');
      if (subTitle) document.title = subTitle + ' · ' + p.title + ' · Cloud Almanac';
      app.classList.remove('nav-open');
      return;
    }

    var chips = PROVIDERS.map(function (v) {
      return '<span class="chip"><i aria-hidden="true">' + esc(v.mono) + '</i>' + esc(v.name) + '</span>';
    }).join('');

    var plan = p.plan.map(function (it, i) {
      return '<li><span class="n">' + (i + 1) + '</span><div><b>' + esc(it[0]) + '</b><span>' + esc(it[1]) + '</span></div></li>';
    }).join('');

    content.innerHTML =
      '<div class="page-head"><div><h1>' + esc(p.title) + '</h1><p>' + esc(p.desc) + '</p></div></div>' +
      '<div class="providers" aria-label="Providers in scope">' + chips + '</div>' +
      '<section class="panel soon-panel">' +
        '<div class="soon-main">' +
          '<div class="soon-icon">' + ICONS[p.id] + '</div>' +
          '<span class="status">In design</span>' +
          '<h2>Coming soon</h2>' +
          '<p>This module is being designed. The comparison view for ' + esc(p.title.toLowerCase()) + ' will appear here across all five providers.</p>' +
        '</div>' +
        '<div class="soon-plan"><h3>Planned for this module</h3><ul class="plan-list">' + plan + '</ul></div>' +
      '</section>';

    app.classList.remove('nav-open');
    content.focus({ preventScroll: true });
  }

  window.addEventListener('hashchange', render);
  render();

  document.getElementById('themeBtn').addEventListener('click', function () {
    var root = document.documentElement;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ca-theme', next);
  });

  document.getElementById('menuBtn').addEventListener('click', function () { app.classList.toggle('nav-open'); });
  document.getElementById('scrim').addEventListener('click', function () { app.classList.remove('nav-open'); });
})();
