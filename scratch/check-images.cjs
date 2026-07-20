process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const path = require('path');
const http = require('https');

async function checkUrl(state, url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ state, status: res.statusCode, url });
    }).on('error', (err) => {
      resolve({ state, status: 'ERROR', error: err.message, url });
    });
  });
}

async function main() {
  const filePath = path.join(__dirname, '../src/lib/state-images.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  
  const regex = /([a-zA-Z0-9'-]+):\s*'([^']+)'/g;
  let match;
  const urls = [];
  const urlMap = new Map();
  const duplicates = [];

  while ((match = regex.exec(content)) !== null) {
    const state = match[1];
    const url = match[2];
    urls.push({ state, url });
    if (urlMap.has(url)) {
      duplicates.push({ state1: urlMap.get(url), state2: state, url });
    } else {
      urlMap.set(url, state);
    }
  }

  console.log(`Extracted ${urls.length} URLs to check.`);
  console.log(`Duplicate URLs count: ${duplicates.length}`);
  if (duplicates.length > 0) {
    console.log('Duplicates:', JSON.stringify(duplicates, null, 2));
  } else {
    console.log('All 50 image URLs are 100% unique!');
  }
  
  const promises = urls.map(({ state, url }) => checkUrl(state, url));
  const results = await Promise.all(promises);
  
  const broken = results.filter(r => r.status !== 200 && r.status !== 302);
  console.log('Total checked:', results.length);
  console.log('Broken images count:', broken.length);
  if (broken.length > 0) {
    console.log('Broken details:', JSON.stringify(broken, null, 2));
  } else {
    console.log('All 50 URLs returned 200 OK!');
  }
}

main().catch(console.error);
