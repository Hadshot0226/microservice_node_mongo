const db = require('./db');
const express = require('express');
const app = express();
const port = 3000;

// Serialização e desserialização correta do body das requisições HTTP
app.use(express.json());

// Definindo as rotas
const router = express.Router();

router.get('/', (req, res) => res.json({
    message:'Working!'
}));

router.get('/clients', async function(req, res) {
    try {
        res.json(await db.findCustomers());
    } catch (ex) {
        console.log(ex);
        res.status(500).json({erro: `${ex}`});
    }
});

router.get('/clients/:id?', async function(req, res) {
    try {
        if (req.params.id)
            res.json(await db.findCustomer(req.params.id))
        else
            res.json(await db.findCustomers());
    } catch (ex) {
        console.log(ex);
        res.status(500).json({erro: `${ex}`});
    }
});

router.post('/clients', async function(req, res, next) {
    try {
        const customer= req.body;
        await db.insertCustomer(customer);
        res.json({
            message:"Cliente cadastrado com sucesso"
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({erro: `${ex}`});
    }
});

router.put('/clients/:id', async function(req, res, next) {
    try {
        const customer = req.body;
        await db.updateCustomer(req.params.id, customer);
        res.json({message: "Cliente atualizado com sucesso"});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({erro: `${ex}`});
    }
});

router.patch('/clients/:id', async function(req, res, next) {
    try {
        await db.patchCustomer(req.params.id, req.body);
        res.json({message: "Cliente atualizado com sucesso"});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({erro: `${ex}`});
    }
});

router.delete('/clients/:id', async function(req, res, next) {
    try {
        await db.deleteCustomer(req.params.id);
        res.json({message: "Cliente excluído com sucesso"});
    } catch (ex) {
        console.log(ex);
        res.status(500).json({erro: `${ex}`});
    }
});

app.use('/', router);

// Inicia o servidor
app.listen(port);
console.log('API working')