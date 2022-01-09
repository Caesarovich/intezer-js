# ![Logo](https://camo.githubusercontent.com/53a66a70e587c71f7b629dbec796402d4e95566546461dcb581c15a501980bf9/68747470733a2f2f692e696d6775722e636f6d2f4f6879546a4b4b2e706e67) Intezer-js

### An **unofficial** Node.JS wrapper for [Intezer Analyze](https://analyze.intezer.com/)'s API.

### 📕 Complete documentation [➡️ here](https://caesarovich.github.io/intezer-js/)

### To-do / API Coverage:

This is a list of things that needs to be done before considering this library 'complete' (Objective v3.0)

API wrapping:

- Community endpoints ✅
- Premium endpoints ❌

Client:

- Analysis wrapping: ✅
- SubAnalysis wrapping: ✅ / ❌
- Families: ❌
- Premium features: ❌
- Client Options: ✅

Other:

- Error wrapping/handling: ❌
- Usage flexibility (resolvables): ✅
- Make a user guide: ❌

Please feel free to contribute !

## 📥 Installation

### Option 1 - **Install from NPM**

```sh
npm install --save intezer-js
```

### Option 2 - **Clone and build from source**

```sh
# Clone the repo in your project directory
git clone https://github.com/Caesarovich/intezer-js

# Build the library
cd "intezer-js" && npm run build && cd ../

# Then install it to your project
npm install intezer-js
```

## ⏳ Quickstart

Follow these example to quickly start using the library.

> Note: You first need to [create an account](https://analyze.intezer.com/create-account) and get your [API Key](https://analyze.intezer.com/account-details).

## Retrieve an analysis using the **Client**

```js
import { Client } from 'intezer-js';

//...

// Instanciate a client with an API Key and initialise it.
const client = await new Client('API_KEY').init().catch(console.error);

// Retrieve an Analysis with an ID
const analysis = await client.analyses.get('ANALYSIS_ID').catch(console.error);
```

### Or with the **raw API**

> Note: _It is recommended to use the **Client** over the **API** because it provides much ease of use._

```js
import { API } from 'intezer-js';

//...

// Fetch an AccessToken using an API Key
const token = await API.getAccessToken('API_KEY').catch(console.error);

// Retrieve AnalysisData using the AccessToken and analysis ID.
const analysis = await API.getAnalysis(token, 'ANALYSIS_ID').catch(console.error);
```

## 📕 Documentation

#### READ THE FULL DOCUMENTATION **[HERE](https://caesarovich.github.io/intezer-js/)**

## 📔 Reference documentation

I used **[Intezer Analyze's API Documentation](https://analyze.intezer.com/api/docs/documentation)** as reference for this wrapper.

### 📄 Disclosure

This library is unofficial and not supported nor sustained by Intezer. Use it at your own risk !
