const https = require('https');
const data = JSON.stringify({
    exemplo: 'valor'
})
const options = {
    hostname: 'https://pipedream.com/@trrodrigo',
    port: 443,
    path: '/data-stores/ds_X3u3bN',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}
const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    })
})
req.on('error', (error) => {
    console.error(error);
})
req.write(data);
req.end();    
