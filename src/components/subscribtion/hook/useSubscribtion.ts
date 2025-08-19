import { useState } from 'react';

// Хелпер для конвертації ключа
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export const useSubscridtion = (userId: number) => {
  const [subscribed, setSubscribed] = useState(false);

  async function subscribe() {
    // Реєстрація service worker
    const registration = await navigator.serviceWorker.register('/sw.js');

    // Підписка на push
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });

    await fetch(`/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, subscription }),
    });

    setSubscribed(true);
  }

  return {
    subscribe,
    subscribed,
  };
};
