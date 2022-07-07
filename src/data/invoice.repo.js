'use-strict'

const mysql = require('mysql');
const provider = require('./providers/postgres_provider');
const uuid = require('uuid');
const { pdfResource } = require('../resources');

const InvoiceRepo = () => {
    const createInvoice = async ({ date_of_sale, date_of_invoice, buyer_name, buyer_id, buyer_mail, buyer_address, buyer_city, buyer_phone_number, buyer_turnover, payment_condition, delivery_condition, seller_name, seller_mail, invoice_price, shipment_taxes, import_taxes, items }) => {
        try {
            let invoiceQuery = mysql.format("INSERT INTO invoices(date_of_sale, date_of_invoice, buyer_name, buyer_id, buyer_mail, buyer_address, buyer_city, buyer_phone_number, buyer_turnover, payment_condition, delivery_condition, seller_name, seller_mail, invoice_price, shipment_taxes, import_taxes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING invoice_id", [ date_of_sale, date_of_invoice, buyer_name, buyer_id, buyer_mail, buyer_address, buyer_city, buyer_phone_number, buyer_turnover, payment_condition, delivery_condition, seller_name, seller_mail, invoice_price, shipment_taxes, import_taxes ])
            const invoiceResult = await provider.query(invoiceQuery);
            if (invoiceResult.rowCount > 0) {
                const invoiceId = invoiceResult.rows[0].invoice_id;
                items.forEach((element) => {
                    let x = 0;
                    Object.entries(element).forEach( async () => {
                      if ( x == 0 ) {
                        const queryEntries = [].concat(Object.values(element));
                        return itemQuery = mysql.format("INSERT INTO items(invoice_id, item_name, item_price, item_count) VALUES (?, ?, ?, ?) RETURNING item_id", [invoiceId, queryEntries[0], queryEntries[1], queryEntries[2]]);
                      }
                      x = 1;
                    });
                });
                const itemResult = await provider.query(itemQuery);
                let filePath = "http://127.0.0.1:5000/invoices/factura_" + invoiceId + ".pdf";
                const fileQuery = mysql.format("INSERT INTO invoices_files(invoice_id, file_uuid, file_path) VALUES (?,?,?)", [invoiceId,uuid.v1(),filePath]);
                const fileResult = await provider.query(fileQuery);
                const document = await pdfResource.create({ invoiceId, date_of_sale, date_of_invoice, buyer_name, buyer_id, buyer_mail, buyer_address, buyer_city, buyer_phone_number, buyer_turnover, payment_condition, delivery_condition, seller_name, seller_mail, invoice_price, shipment_taxes, import_taxes, items });

                let salida = [itemResult, document, fileResult];
                return salida;
            } else {
                return null;
            }
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

    const nullifyInvoice = async ( id ) => {
        try {
            let query = mysql.format("UPDATE invoices SET nullify=true WHERE invoice_id=?", id);
            const result = await provider.query(query);
            return result;
        } catch (err) {
            console.error(err);
            Promise.reject(err);
        }
    }

    const invoicePdf = async ( uuid ) => {
        try {
            let query =  mysql.format('SELECT file_path FROM invoices_files WHERE file_uuid=?', uuid);
            const result = await provider.query(query);
            return result.rowCount > 0 ? result.rows : null;
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