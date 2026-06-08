# HTTPS and Deployment Notes

This app is served in two different ways:

- Development: `npm start` runs the React dev server on port `3001`.
- Production: Caddy serves the built React files over HTTPS.

## Setup Summary

Done. `https://sensoratemp.online` is live.

What changed:

- Installed and started Caddy.
- Caddy obtained a Let's Encrypt cert successfully.
- HTTP `http://sensoratemp.online` now redirects to HTTPS.
- Frontend is served from `/var/www/rebuskate`.
- Backend routes `/posts*` and `/users*` are proxied over the same HTTPS domain to `localhost:3000`.
- Stopped the old `react-scripts start` process that was using port `80`.
- Changed `package.json` start port from `80` to `3001`.
- Changed `.env` to use same-origin API calls.
- Rebuilt and deployed the React app.

Verified:

- `https://sensoratemp.online` returns `HTTP/2 200`.
- `http://sensoratemp.online` returns `308` redirect to HTTPS.
- `https://sensoratemp.online/posts` returns `HTTP/2 200` from Express.
- Caddy service is active and enabled on boot.

## Current Production Setup

Public site:

```text
https://sensoratemp.online
```

HTTP also exists, but only redirects to HTTPS:

```text
http://sensoratemp.online
```

Caddy listens on:

- Port `80` for HTTP redirects and Let's Encrypt renewal
- Port `443` for HTTPS

The current Caddy config is:

```text
/etc/caddy/Caddyfile
```

A copy is also kept in this repo:

```text
Caddyfile
```

The production React files are served from:

```text
/var/www/rebuskate
```

The backend is still running on:

```text
localhost:3000
```

Caddy proxies API routes to the backend:

```text
/posts* -> localhost:3000
/users* -> localhost:3000
```

This lets the frontend call the API with relative URLs, avoiding HTTPS mixed-content problems.

## Files Changed

`package.json`:

```json
"start": "PORT=3001 react-scripts start"
```

This moved the React dev server away from port `80`, because Caddy now owns public HTTP/HTTPS.

`.env`:

```env
REACT_APP_BACKEND_SERVER=
```

This makes frontend API calls use same-origin paths like `/posts` and `/users/signin`.

Several old hard-coded LAN API URLs were changed to relative paths, for example:

```js
fetch('/posts', requestOptions)
fetch('/users/signup', requestOptions)
```

## Development Workflow

For live development with hot reload:

```bash
cd /root/rebuskate/rebuskate
npm start
```

Then open:

```text
http://sensoratemp.online:3001
```

Changes should update immediately in the browser.

This is not the production HTTPS site. It is the React development server.

## Production Deployment Workflow

After changing React code and testing it, build the production files:

```bash
cd /root/rebuskate/rebuskate
npm run build
```

Then replace the deployed files:

```bash
find /var/www/rebuskate -mindepth 1 -delete
cp -a build/. /var/www/rebuskate/
```

Caddy does not need to restart for normal frontend changes. It will serve the new static files immediately.

## Caddy Service Commands

Check if Caddy is running:

```bash
systemctl status caddy --no-pager
```

Check if Caddy starts on boot:

```bash
systemctl is-enabled caddy
```

Restart Caddy after changing `/etc/caddy/Caddyfile`:

```bash
systemctl restart caddy
```

Validate a Caddyfile before restarting:

```bash
caddy validate --config /etc/caddy/Caddyfile
```

## Verification Commands

Check that HTTP redirects to HTTPS:

```bash
curl -I http://sensoratemp.online
```

Expected result:

```text
HTTP/1.1 308 Permanent Redirect
Location: https://sensoratemp.online/
```

Check the HTTPS frontend:

```bash
curl -I https://sensoratemp.online
```

Expected result:

```text
HTTP/2 200
```

Check the backend proxy through HTTPS:

```bash
curl -I https://sensoratemp.online/posts
```

Expected result:

```text
HTTP/2 200
```

## Important Notes

- Keep ports `80` and `443` available for Caddy.
- Do not run the React dev server on port `80`.
- If the public IP changes, update the `bind` line in `Caddyfile`.
- The current public IPv4 used in Caddy is `163.245.217.37`.
- If you edit the repo `Caddyfile`, copy it to `/etc/caddy/Caddyfile`, validate it, then restart Caddy.
