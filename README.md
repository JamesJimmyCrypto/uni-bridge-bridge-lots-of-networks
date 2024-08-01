![nuxt-ui-dashboard-social-card](./screenshot/bridge.png)

# Nuxt UI Pro - Dashboard template

[![Nuxt UI Pro](https://img.shields.io/badge/Made%20with-Nuxt%20UI%20Pro-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com/pro)

- [Live demo](https://dashboard-template.nuxt.dev/)
- [Play on Stackblitz](https://stackblitz.com/github/nuxt-ui-pro/dashboard)
- [Documentation](https://ui.nuxt.com/pro/getting-started)

## Quick Start

```bash [Terminal]
npx nuxi init -t github:nuxt-ui-pro/dashboard
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.


## Features

- [ ] Uni Connect modules
  - [ ] connect wallet btn
  - [ ] connect wallet modal
    - [ ] user can see a list of supported chains
    - [ ] user can select a chain
      - [ ] list corresponding wallet app (filter by the tag of the chain)
      - [ ] auto detect all the supported wallet app is installed or not
        - [ ] if not installed: user can click the "Click to install" btn to install the missing wallet app
        - [ ] if installed: user can click wallet btn to connect with the wallet app