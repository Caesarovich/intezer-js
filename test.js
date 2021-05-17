import * as intezer from './index.js';

// Provide an API Key
const apiKey = process.argv[2];

// Client

const client = new intezer.Client(apiKey);

async function main() {
  try {
    // Sends 'test.exe' for analysis
    const url = await client.analyze('./test.exe');

    console.log(`See the analysis results here: ${url}`);
  } catch (error) {
    console.error(error);
  }
}

main();
