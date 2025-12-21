# johnnyraper.github.io

Personal website build pipeline using HTML + Sass, compiled into a static site served from the `docs/` directory.  
Includes a local development server with live reload via BrowserSync.

This repo is intentionally simple and old-school: no framework, no bundler, just Sass, file copying, and static output.

---

## Requirements

- **Node.js 16** (required)
- npm
- macOS / Linux / WSL recommended

> ⚠️ This project will **not** install correctly on newer Node versions (18 / 20+) due to legacy dependencies.

---

## Node version management

This repo uses a fixed Node version to avoid dependency issues.

```bash
nvm install 16
nvm use
```
