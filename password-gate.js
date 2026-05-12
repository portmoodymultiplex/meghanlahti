// Password gate — redirects to preview-access.html if not authorized.
// Loaded by every page except preview-access.html itself.
(function () {
  // Don't run on the gate page itself
  if (window.location.pathname.toLowerCase().endsWith('/preview-access.html')) {
    return;
  }

  // If user has not entered the password yet, send them to the gate
  if (sessionStorage.getItem('lahti_preview') !== 'granted') {
    // Remember where they were trying to go so we can return after auth
    sessionStorage.setItem(
      'lahti_redirect',
      window.location.pathname + window.location.search
    );
    window.location.replace('/preview-access.html');
  }
})();
