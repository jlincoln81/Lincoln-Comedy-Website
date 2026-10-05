// Website form extras:
//  - Meta Pixel events: show alerts signup -> Lead, contact form -> Contact
//  - Contact form: if "Also sign me up for show alerts" is checked,
//    the person is also added to the Kit email list (form 10005433).
(function () {
  var KIT_URL = 'https://app.kit.com/forms/10005433/subscriptions';

  function hook(name, eventName) {
    var form = document.querySelector('form[name="' + name + '"]');
    if (!form) return;
    form.addEventListener('submit', function () {
      if (window.fbq) fbq('track', eventName);
    });
  }
  hook('show-alerts', 'Lead');
  hook('contact', 'Contact');

  // Contact form -> Kit, only when the checkbox is ticked
  var contact = document.querySelector('form[name="contact"]');
  if (!contact) return;
  contact.addEventListener('submit', function () {
    var box = contact.querySelector('input[name="show-alerts"]');
    var email = contact.querySelector('input[name="email"]');
    var name = contact.querySelector('input[name="name"]');
    if (!box || !box.checked || !email || !email.value) return;

    var data = new FormData();
    data.append('email_address', email.value.trim());
    if (name && name.value.trim()) data.append('fields[first_name]', name.value.trim().split(/\s+/)[0]);

    // sendBeacon finishes even as the page moves on to the thank-you page
    var sent = false;
    try { sent = navigator.sendBeacon && navigator.sendBeacon(KIT_URL, data); } catch (e) {}
    if (!sent) {
      try { fetch(KIT_URL, { method: 'POST', body: data, mode: 'no-cors', keepalive: true }); } catch (e) {}
    }
    if (window.fbq) fbq('track', 'Lead');
  });
})();
