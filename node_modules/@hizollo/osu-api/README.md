# @hizollo/osu-api
[![npm version](https://img.shields.io/npm/v/@hizollo/osu-api.svg?maxAge=3600)](https://www.npmjs.com/package/@hizollo/osu-api)
[![Downloads](https://img.shields.io/npm/dt/@hizollo/osu-api.svg?maxAge=3600)](https://www.npmjs.com/package/@hizollo/osu-api)
[![Last Commit](https://img.shields.io/github/last-commit/HiZollo/osu-api)](https://github.com/HiZollo/osu-api)
[![Code Size](https://img.shields.io/github/languages/code-size/HiZollo/osu-api)](https://github.com/HiZollo/osu-api)
![License](https://img.shields.io/github/license/HiZollo/osu-api)

## About
This library is a node.js wrapper of [osu!api](https://osu.ppy.sh/wiki/en/osu!api) v1.

## Documentation
You can look up the documentation [here](https://hizollo.github.io/osu-api).

## Installation
```
npm install @hizollo/osu-api
yarn add @hizollo/osu-api
```

## Examples
Import the package:
```ts
// CommonJS
const { Client } = require('@hizollo/osu-api')

// ESM
import { Client } from '@hizollo/osu-api'
```
Create a client to interact with [osu!api](https://osu.ppy.sh/wiki/en/osu!api):
```ts
const osu = new Client({
    apiKey: 'your-osu-api-key'
})
```
Get a user's data:
```ts
const user = await osu.users.getUser({ 
    user: 'Cookiezi'
})
```
Get a player's top 5 play:
```ts
const bp = await osu.users.getUserBest({
    user: '214187',
    type: UserRequestType.Id,
    mode: GameMode.Catch,
    limit: 5
})
```
Fetch a player's banner:
```ts
// Fetch directly
const bannerURL = await osu.users.fetchBanner({
    id: '7823498'
})

// ... or if you have the user object
const bannerURL = await user.fetchBanner();
```

## License
This package is published under the MIT license.