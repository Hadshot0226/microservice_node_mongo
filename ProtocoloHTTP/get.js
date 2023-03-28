const https = require('https');
const options = {
    hostname: 'https://pipedream.com/',
    port: 443,
    path: '/@trrodrigo/',
    method: 'GET'
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
req.end();
