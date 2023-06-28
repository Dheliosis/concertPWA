// Écouter l'événement d'installation du Service Worker
self.addEventListener('install', event => {
	console.log('Service Worker installé.');
	// Effectuer des opérations supplémentaires lors de l'installation si nécessaire
});

// Écouter l'événement d'activation du Service Worker
self.addEventListener('activate', event => {
	console.log('Service Worker activé.');
	// Nettoyer les anciennes ressources mises en cache si nécessaire
});

// Écouter l'événement fetch
self.addEventListener('fetch', event => {
	const isOnline = navigator.onLine;
	console.log('En ligne :', isOnline);

	// Effectuer des opérations en fonction de l'état en ligne/hors ligne
	if (isOnline) {
		// La page est en ligne, continuer la récupération de la ressource
		event.respondWith(fetch(event.request));
	} else {
		// La page est hors ligne, renvoyer une réponse personnalisée
		event.respondWith(new Response('Vous êtes hors ligne.'));
	}
});
