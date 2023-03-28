var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET new page */
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Cadastro de Cliente', doc: {}, action: "/new" });
});

/* POST edit page. */
router.post('/edit/:id', async function(req, res) {
  const id = req.params.id;
  const name = req.body.name;
  const age = parseInt(req.body.age);
  const uf = req.body.uf;
  await db.update(id, {name, age, uf});
  console.log('alterou');
  res.redirect('/?edit=true');
})

/* GET delete page. */
router.get('/delete/:id', async function(req, res) {
  const id = req.params.id;
  await db.deleteOne(id);
  res.redirect('/?delete=true');
})

/* GET edit page. */ 
router.get('/edit/:id', async function(req, res, next) { 
  const id = req.params.id; 
  const doc = await db.findOne(id); 
  console.log(doc);
  res.render('new', { 
      title: 'Edição de Cliente', 
      doc, 
      action: '/edit/' + doc._id
  });
});

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { docs: await db.findAll() });
});

/* POST new page */
router.post("/new", async function(req, res, next) {
  const name = req.body.name;
  const age = parseInt(req.body.age);
  const uf = req.body.uf;
  await db.insert({name, age, uf});

  res.redirect('/?new=true');
});

module.exports = router;
