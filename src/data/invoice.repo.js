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

    const findInvoice = async ({ id, date_of_sale, date_of_invoice }) => {
        try {
            if (!id) {
                if (!date_of_sale) {
                    if (!date_of_invoice) {
                        console.error("parameters are empty");
                        return { error: true, message: "at least one parameter is required" }
                    } else {
                        let query = mysql.format("SELECT * FROM invoices WHERE date_of_invoice=?", date_of_invoice);
                        const result = await provider.query(query);
                        return result.rows;
                    }
                } else {
                    let query = mysql.format("SELECT * FROM invoices WHERE date_of_sale=?", date_of_sale);
                    const result = await provider.query(query);
                    return result.rows;
                }
            } else {
                let query = mysql.format("SELECT * FROM invoices WHERE invoice_id=?", id);
                const result = await provider.query(query);
                return result.rows;
            }
        } catch (err) {
            console.error(err);
            Promise.reject(err);
        }
    }

    const nullifyInvoice = async ({ id }) => {
        try {
            let query = mysql.format("UPDATE invoices SET nullify=true WHERE invoice_id=?", [id]);
            const result = await provider.query(query);
            return "facura anulada";
        } catch (err) {
            console.error(err);
            Promise.reject(err);
        }
    }

    const invoicePdf = async () => {
        try {
            let query = mysql.format();
            const result = await provider.query(query);
            return result.rows;
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