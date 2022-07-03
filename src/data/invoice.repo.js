'use-strict'

const mysql = require('mysql');
const provider = require('./providers/postgres_provider');

const InvoiceRepo = () => {
    const createInvoice = async () => {
        try {
            let query = mysql.format("SELECT * FROM invoices");
            const result = await provider.query(query);
            return result.rowCount > 0 ? {
                id: result.rows[0].id
            } : null;
        } catch (err) {
            console.error(err);
            Promise.reject(err);
        }
    }

    const findInvoice = async ({ id }) => {
        try {
            let query = mysql.format("SELECT * FROM invoices WHERE invoice_id=?", [id]);
            console.log(query);
            const result = await provider.query(query);
            return result.rows;
        } catch (err) {
            console.error(data);
            Promise.reject(err);
        }
    }

    const nullifyInvoice = async () => {
        try {
            let query = mysql.format();
            const result = await provider.query(query);
            return result.rowCount > 0 ? {
                id: result.rows[0].id
            } : null;
        } catch (err) {
            console.error(err);
            Promise.reject(err);
        }
    }

    const invoicePdf = async () => {
        try {
            let query = mysql.format();
            const result = await provider.query(query);
            return result.rows
        } catch (err) {
            console.error(err);
            Promise.reject(err);
        }
    }

    return {
        create: createInvoice,
        find: findInvoice,
        nullify: nullifyInvoice,
        pdf: invoicePdf
    }
}

module.exports = InvoiceRepo();