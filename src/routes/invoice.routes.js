'use-strict'

const router = require('express').Router();
const { invoiceService } = require('../services');

// CREATE
// to insert on db new invoice
router.post('/', async function (req, res) {
    try {
        let body = req.body;
        let data = await invoiceService.create(body);
        return res.json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// READ
// to query the selected invoice in db
router.get('/', async function (req, res) {
    try {
        let body = req.body;
        let data = await invoiceService.find(body);
        return res.json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// UPDATE
// to nullify the selected invoice on db
router.put('/nullify/:id', async function (req, res) {
    try {
        let data = await invoiceService.nullify(req.params);
        return res.json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// READ
// to return the invoice's pdf
router.get('/pdf/', function (req, res) {
    return res.send("Visualizar factura");
});
module.exports = router;