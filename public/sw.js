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
  console.log(event.notification.data)
  event.waitUntil(
    clients.openWindow(event.notification.data.url) // відкриє твій лінк
  );
});

self.addEventListener('pushsubscriptionchange', async () => {
  console.log('🔄 Subscription expired, creating new one...');
  // public key
  const applicationServerKey = urlB64ToUint8Array('BBFbkRmthDinCCyEVhSDbI8-9h1AIdDudkHE4xmJvaO_XwWJ2xzsKS6-Ijexgt7glPHfJcTXuRsG09wfiyPBqkw');
  const newSubscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });
  // відправляєш newSubscription на свій бекенд
  await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(newSubscription),
    headers: { 'Content-Type': 'application/json' }
  });
});

