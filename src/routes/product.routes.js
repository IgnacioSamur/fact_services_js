'use-strict'

const router = require('express').Router();

// /users/
router.get('/', function (req, res) {
    res.send("Listado de todos los productos");
});
// CREATE
// /users/
router.post('/', function (req, res) {
    res.send("Crear un usuario producto");
});
// READ
// /users/:id
router.get('/:id', function (req, res) {
    res.send("Obtener producto ID=" + req.params.id);
});
// UPDATE
// /users/:id
router.put('/:id', function (req, res) {
    res.send("Modificar producto ID=" + req.params.id);
});
// DELETE
// /users/:id
router.delete('/:id', function (req, res) {
    res.send("Eliminar producto ID=" + req.params.id);
});

module.exports = router;