let newWorker;
// The click event on the notification
document.getElementById('updateAvailable').addEventListener('click', function () {
  newWorker.postMessage({ action: 'skipWaiting' });
});

if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('/sw-boiler.js')
    .then(reg => {
      console.log("Service Worker Registered", reg);

      reg.addEventListener('updatefound', () => {
        console.log("an update was detected");
        // An updated service worker has appeared in reg.installing!
        newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          // Has service worker state changed?
          switch (newWorker.state) {
            case 'installed':
              // There is a new service worker available, show the notification
              if (navigator.serviceWorker.controller) {
                let notification = document.getElementById('updateAvailable');
                notification.classList.add('show');
              }
              break;
          }
        });
      })
    }).catch(err => {
      console.log("did not register", err)
    })

  let refreshing;
  // The event listener that is fired when the service worker updates
  // Here we reload the page
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}
