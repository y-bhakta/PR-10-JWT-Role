# PR-10-JWT-Role

**Project Overview:**
- **PR-10-JWT-Role** is a small Express.js application demonstrating JWT-based authentication and simple role management (Admin, Manager, Employee). It provides both JSON API endpoints (under `/api`) and server-rendered views (EJS) for client interaction.

**Table of Contents**
- **Overview:** Short description
- **Configuration:** Env vars and important configs
- **Project Structure:** Files and folders
- **Authentication & Roles:** JWT and role behavior
- **Notes & Improvements:** Known issues and suggestions

**Configuration**
- **Database:** [configs/db.js](configs/db.js) connects to MongoDB using `MONGO_URL` via Mongoose.
- **JWT secret:** Currently hardcoded as `myTokenKey` in [middlewares/clientAuth.js](middlewares/clientAuth.js) and [controller/userctl.js](controller/userctl.js). Move this to an environment variable (e.g., `JWT_SECRET`) for security.

**Project Structure (high level)**
- **index.js:** App entrypoint; sets up Express, middleware, static assets, EJS views, mounts routers. See [index.js](index.js).
- **package.json:** Scripts (`start`, `dev`) and dependencies. See [package.json](package.json).
- **configs/**
	- `dotenv.js` — loads env variables
	- `db.js` — Mongoose connection
	- `axios.js` — configured axios instance
- **router/**
	- `index.js` — API root router
	- `userrouter.js` — `/api/user` REST endpoints
	- `clientrout.js` — view routes and pages for the client UI
- **controller/**
	- `userctl.js` — JSON API handlers for user CRUD and login/logout
	- `clientctl.js` — server-rendered pages, form handlers and calls to the API
- **middlewares/**
	- `clientAuth.js` — cookie-based JWT verification used for view routes
- **models/**
	- `usermodel.js` — Mongoose schema for users (`name`, `email`, `password`, `role`) with `role` enum: `['Admin','Manager','Employee']`.
- **views/** and **public/** — EJS templates and static assets (CSS, JS, images, third-party libs).

**Authentication & Roles**
- Authentication uses JWTs (`jsonwebtoken`). Tokens are created in `userctl.loginuser` and currently signed with the static key `myTokenKey`.
- The client-side flow (in `clientctl`) posts credentials to the API, receives a token, and sets it as a cookie named `token`.
- `middlewares/clientAuth.js` reads the `token` cookie, verifies it, then looks up the user and attaches it to `res.locals.user` for use in views.
- Roles are defined on the user model (`role` enum). Controllers like `clientctl` use `.role` to filter/manipulate managers vs employees and to promote users.

**Database**
- Uses Mongoose (see [configs/db.js](configs/db.js)). Ensure `MONGO_URL` points at a running MongoDB instance.

**Important Notes & Recommendations**
- Port mismatch: The Express app listens on `PORT` (default `3259`), but `configs/axios.js` and some `fetch` calls target `http://localhost:8547/api`. For correct behavior, set `PORT=8547` in your `.env` or change `configs/axios.js` and client `fetch` URLs to the port you run the server on.
- Security: Move `myTokenKey` into an environment variable (e.g., `JWT_SECRET`) and update signing/verification to use it.
- Error handling: API handlers currently return raw errors in responses; enforce consistent HTTP status codes and messages for production.
- Tests: No tests included. Add unit/integration tests for auth and critical routes.

**Development Tips**
- Use `npm run dev` (nodemon) during development.
- To seed users quickly, call `POST /api/user` with `name`, `email`, `password`, and `role` (password will be hashed by the controller).
- Inspect cookies in your browser to confirm the `token` cookie is set after login.

**Contributing**
- Fork, create a branch, and send a PR. Outline breaking changes and include tests where appropriate.

**License**
- ISC (see `package.json`).

If you'd like, I can also:
- Add a `.env.example` file and move the JWT secret to an env var.
- Fix the port mismatch by aligning `index.js` and `configs/axios.js`.

**Admin Access**

Email:- yash@gmail.com
Password:- 123

**Live Link**

https://pr-10-jwt-role.vercel.app/login
