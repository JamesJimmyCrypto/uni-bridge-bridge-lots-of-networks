![Bridge Screenshot](./screenshot/bridge.png)

# UNI Bridge for All BlockChains

## Intro

UNI Bridge is a decentralized bridge for connecting different blockchains. It allows users to transfer assets between all blockchains(currently support ETH, AVAX, THOR, BTC, LTC, BNB, BSC, BCH, GAIA, DOGE, more chains support are coming soon) without having to use any centralized. It includes stake, bridge, trade modules(Currently only the bridge module is available).

Our mission is to provide a decentralized bridge for connecting different blockchains and take over the centralized exchange platforms.

## Quick Link

- [Video demo](#)
- [Online product link](https://ub.rwa-wallet.com/bridge)
- [Source code](https://github.com/HelloRWA/uni-bridge)
- [A bscscan log of the example of using Swapkit to make a swap on BSC chain](https://bscscan.com/tx/0x739059b894d0d31e9f05d87542431b39f681c5627e5a6a7120f9164bc3374fbe)


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