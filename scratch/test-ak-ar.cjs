process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const http = require('https');
const fs = require('fs');
const path = require('path');

const candidates = {
  alaska1: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
  alaska2: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80',
  alaska3: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=600&q=80',
  arkansas1: 'https://images.unsplash.com/photo-1477959858617-67f30ac78b00?auto=format&fit=crop&w=600&q=80',
  arkansas2: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80',
  arkansas3: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80',
};

async function checkUrl(key, url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ key, status: res.statusCode, url });
    }).on('error', (err) => {
      resolve({ key, status: 'ERROR', error: err.message, url });
    });
  });
}

async function main() {
  const promises = Object.entries(candidates).map(([key, url]) => checkUrl(key, url));
  const results = await Promise.all(promises);
  console.log('Candidates Status:', JSON.stringify(results, null, 2));
}

main().catch(console.error);
