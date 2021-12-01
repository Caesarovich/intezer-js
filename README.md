# ![Logo](https://camo.githubusercontent.com/53a66a70e587c71f7b629dbec796402d4e95566546461dcb581c15a501980bf9/68747470733a2f2f692e696d6775722e636f6d2f4f6879546a4b4b2e706e67) Intezer-js

### An **unofficial** Node.JS wrapper for [Intezer Analyze](https://analyze.intezer.com/)'s API.

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

### Get an access token

```js
import { getAccessToken } from 'intezer-js';

//...

const token = await getAccessToken('API_KEY').catch(console.error);
```

###
