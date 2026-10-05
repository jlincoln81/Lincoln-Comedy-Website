// Meta Pixel events for the website's forms.
// Show alerts signup -> Lead. Contact form -> Contact.
(function () {
  function hook(name, eventName) {
    var form = document.querySelector('form[name="' + name + '"]');
    if (!form) return;
    form.addEventListener('submit', function () {
      if (window.fbq) fbq('track', eventName);
    });
  }
  hook('show-alerts', 'Lead');
  hook('contact', 'Contact');
})();
