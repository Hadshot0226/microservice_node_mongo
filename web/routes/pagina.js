var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pagina', { 
        title: 'Programação para Internet',
        exibirDiv: true
    });
});

module.exports = router;