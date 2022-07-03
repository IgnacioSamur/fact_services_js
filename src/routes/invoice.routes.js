'use-strict'

const router = require('express').Router();
const { invoiceService } = require('../services');

// CREATE
// to insert on db new invoice
router.post('/', async function (req, res) {
    try {
        let data = await invoiceService.create(req.body);

        if (!data) {
            return res.status(400).json("Error al insertar registro.");
        }

        if (data.error) {
            return res.status(400).json(data.message);
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// READ
// to query the selected invoice in db
router.get('/', async function (req, res) {
    try {
        let data = await invoiceService.find(req.body);

        if (!data) {
            return res.status(400).json("Error al consultar registro.");
        }

        if (data.error) {
            return res.status(400).json(data.message);
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// UPDATE
// to nullify the selected invoice on db
router.put('/nullify/:id', async function (req, res) {
    try {
        let data = await invoiceService.nullify(req.params);
        if (!data) {
            return res.status(400).json("Error al anular registro.");
        }

        if (data.error) {
            return res.status(400).json(data.message);
        }

        return res.status(201).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// READ
// to return the invoice's pdf
router.get('/pdf/', function (req, res) {
    try {
        let data = await invoiceService.find(req.body);

        if (!data) {
            return res.status(400).json("Error al consultar registro.");
        }

        if (data.error) {
            return res.status(400).json(data.message);
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = router;