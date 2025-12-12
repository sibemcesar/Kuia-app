// Service Worker para Firebase Cloud Messaging
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Configuração do Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBgEfuLNpU5j9EIcvQ9Qs_reEvtXGPIbO0",
  authDomain: "gameplus-59458.firebaseapp.com",
  databaseURL: "https://gameplus-59458-default-rtdb.firebaseio.com",
  projectId: "gameplus-59458",
  storageBucket: "gameplus-59458.firebasestorage.app",
  messagingSenderId: "450449493424",
  appId: "1:450449493424:web:c8ffa9fee810330761da75",
  measurementId: "G-8J63PTNPZ5"
});

const messaging = firebase.messaging();

// Handler para notificações em background
messaging.onBackgroundMessage((payload) => {
  console.log('Notificação recebida em background:', payload);

  const notificationTitle = payload.notification.title || 'Portal Digital';
  const notificationOptions = {
    body: payload.notification.body || 'Nova notificação',
    icon: payload.notification.icon || '/icon.png',
    badge: '/badge.png',
    tag: payload.data?.tag || 'default',
    data: payload.data,
    requireInteraction: false,
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handler para cliques nas notificações
self.addEventListener('notificationclick', (event) => {
  console.log('Notificação clicada:', event);
  event.notification.close();

  // Abrir ou focar na aplicação
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Se já tiver uma janela aberta, focar nela
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.indexOf(self.location.origin) !== -1 && 'focus' in client) {
          return client.focus();
        }
      }
      // Caso contrário, abrir nova janela
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

