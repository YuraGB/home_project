self.addEventListener('push', function (event) {
  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/vercel.svg', // свій логотип
       data: { url: data.url }
    }),
  );
});
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url) // відкриє твій лінк
  );
});
