// Builds the Upcoming Shows cards from data/shows.json.
// Shows are sorted by date, and a show disappears automatically the day after it happens.
(function () {
  var grid = document.getElementById('show-grid');
  var empty = document.getElementById('show-empty');
  if (!grid) return;

  function parseLocal(value) {
    // "2026-10-15T19:30" -> local date (no timezone shifting)
    var m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/.exec(value || '');
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 19), +(m[5] || 30));
  }

  function formatDate(d) {
    var day = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    var time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return day + ' at ' + time;
  }

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text) node.textContent = text;
    return node;
  }

  function card(show) {
    var li = el('li', { 'class': 'show-card' });
    var status = show.status || 'On Sale';
    var name = show.comedian || show.title;

    if (show.poster) {
      li.appendChild(el('img', {
        src: show.poster, alt: 'Show poster: ' + name,
        width: '960', height: '1200', loading: 'lazy'
      }));
    }

    var tagClass = status === 'On Sale' ? 'tag tag-sale' : (status === 'Sold Out' ? 'tag tag-sold' : 'tag tag-soon');
    li.appendChild(el('span', { 'class': tagClass }, status));

    var meta = el('div', { 'class': 'show-meta' });
    meta.appendChild(el('h3', { 'class': 'show-title' }, show.title));
    if (show._date) meta.appendChild(el('p', { 'class': 'show-when' }, formatDate(show._date)));
    li.appendChild(meta);

    if (status === 'On Sale' && show.ticket_url) {
      li.appendChild(el('a', { 'class': 'btn btn-primary', href: show.ticket_url, target: '_blank', rel: 'noopener' }, 'Buy Tickets'));
    } else if (status === 'Sold Out') {
      li.appendChild(el('span', { 'class': 'btn btn-outline btn-disabled', 'aria-disabled': 'true' }, 'Sold Out'));
    } else {
      li.appendChild(el('a', { 'class': 'btn btn-outline', href: '#alerts' }, 'Notify Me'));
    }
    return li;
  }

  fetch('/data/shows.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);
      var shows = (data.shows || [])
        .map(function (s) { s._date = parseLocal(s.date); return s; })
        .filter(function (s) { return !s._date || s._date >= startOfToday; })
        .sort(function (a, b) { return (a._date || 0) - (b._date || 0); });

      shows.forEach(function (s) { grid.appendChild(card(s)); });
      if (!shows.length && empty) empty.hidden = false;
    })
    .catch(function () {
      if (empty) empty.hidden = false;
    });
})();
