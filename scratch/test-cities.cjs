process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const http = require('https');

const candidates = {
  alabama: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80', // Downtown city buildings
  alaska: 'https://images.unsplash.com/photo-1548685913-fe6678babe8d?auto=format&fit=crop&w=600&q=80', // Anchorage city
  arkansas: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=600&q=80', // Little Rock city
  idaho: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', // Boise city building
  louisiana: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=600&q=80', // New Orleans city
  nebraska: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=600&q=80', // Omaha city
  texas: 'https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?auto=format&fit=crop&w=600&q=80', // Austin city
  virginia: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80', // Richmond city
};

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
  const promises = Object.entries(candidates).map(([state, url]) => checkUrl(state, url));
  const results = await Promise.all(promises);
  console.log('City Candidates Status:', JSON.stringify(results, null, 2));
}

main().catch(console.error);
