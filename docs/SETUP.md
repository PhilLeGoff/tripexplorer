# Local development

A normal `git clone https://github.com/PhilLeGoff/tripexplorer.git` contains both applications. No submodule checkout is required.

## Backend

Use Python 3.11+ and a local MongoDB service.

```sh
cd backend
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py runserver 127.0.0.1:8000
```

Set your server-side `GOOGLE_PLACES_API_KEY` in the ignored `.env`. The existing backend currently fixes MongoDB to `mongodb://localhost:27017/tripadvisor` in its settings; an environment override for this connection is not implemented. The preserved Django configuration is a development scaffold, including its insecure development signing default and permissive development settings; it is not a production deployment recipe. Do not reuse development defaults in a deployed service.

## Frontend

Use the existing Yarn lockfile and a Node.js version compatible with the installed Next.js 16 release (Node.js 22+ is a practical choice).

```sh
cd frontend
yarn install --frozen-lockfile
cp .env.example .env.local
yarn dev
```

`NEXT_PUBLIC_API_URL` defaults to `http://localhost:8000/api`. Supply a restricted Google browser key through `MAPS_PLATFORM_API_KEY`; the existing configuration exposes it as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`. Restrict browser keys by API and development/production origin. Keep server-only secrets out of frontend variables.

See `backend/backend/settings.py` for the preserved MongoDB configuration. Neither `.env` file is committed.

## Checks

```sh
cd frontend
yarn build
```

The existing Next.js configuration skips TypeScript errors during the production build. A successful build is therefore not a clean type-check result. The imported application is a prototype; use the separate verification report for the results observed during consolidation.
