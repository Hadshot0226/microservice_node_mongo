const http = require('http');
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Olá Mundo!\n');
})
server.listen(port, () => {
    console.log(`Servidor iniciou em http://localhost:${port}/`);
})

//Duarte, Luiz. Node.js e Microservices: Um Guia Prático (pp. 101-102). LuizTools. Edição do Kindle. 