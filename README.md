TripExplorer – Monorepo (root)

Ce dépôt contient deux projets:
- backend/ (Django + DRF + MongoEngine)
- frontend/ (Next.js + TypeScript)

Prérequis
- Node.js 18+
- Python 3.11+
- MongoDB 6+
- Yarn (ou npm) et un shell POSIX

Démarrage rapide
1) Backend
   - Voir backend/README.md pour l’installation et le lancement de l’API.
2) Frontend
   - Voir frontend/README.md pour l’application web.

Variables d’environnement (résumé)
- Frontend
  - MAPS_PLATFORM_API_KEY (exposé comme NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
- Backend
  - GOOGLE_PLACES_API_KEY

Architecture (haut niveau)
- Django/DRF (API REST) + MongoEngine (Attraction, Compilation, User)
- Next.js (Search, Attraction, Trips). Google Maps/Directions/Photos côté front.

Développement
- Lancer les deux services en parallèle dans deux terminaux:
  - API: cd backend && make run (ou instructions du README backend)
  - Web: cd frontend && yarn dev

Git – organisation des dépôts
- Si vous souhaitez publier le sous-dossier frontend dans un dépôt distant séparé, utilisez git subtree:
  - git remote add frontend <URL_REMOTE_FRONTEND>
  - git subtree push --prefix frontend frontend main
  - Répéter la commande pour pousser les mises à jour ultérieures.

License
- Usage académique / démonstration.


