'use-strict'

const fs = require('fs');
const PDFDocument = require('pdfkit-table');

const PdfResource = () => {
    const createPdf = ({ invoiceId, date_of_sale, date_of_invoice, buyer_name, buyer_id, buyer_mail, buyer_address, buyer_city, buyer_phone_number, buyer_turnover, payment_condition, delivery_condition, seller_name, seller_mail, invoice_price, shipment_taxes, import_taxes, items }) => {
        try {
            let doc = new PDFDocument({margin: 30, size: 'A4'});
            let documentPathName = "./invoices/" + "factura_" + invoiceId + ".pdf";
            doc.pipe(fs.createWriteStream(documentPathName));

            const itemsArray = [];
            let total_price = 0;
            for (let i = 0; i < items.length; i++) {
                let total = items[i].item_price * items[i].item_count;
                itemsArray.push([
                    items[i].item_name,
                    "$"+items[i].item_price,
                    items[i].item_count,
                    "$"+total
                ]);
                total_price += total;
            }

            total_price += ( parseInt(import_taxes) + parseInt(shipment_taxes) );

            const invoiceDates = {
                headers: ["Fecha de compra", "Fecha de facturación"],
                rows: [ [ date_of_sale, date_of_invoice ] ]
            }

            const buyerInfo = {
                headers: ["Nombre comprador", "RUN", "Correo electrónico", "Dirección", "Ciudad", "Teléfono", "Giro"],
                rows: [ [ buyer_name, buyer_id, buyer_mail, buyer_address, buyer_city, buyer_phone_number, buyer_turnover ] ]
            }

            const sellerInfo = {
                headers: ["Nombre vendedor", "Correo", "Método de pago", "Método de entrega"],
                rows: [ [ seller_name, seller_mail, payment_condition, delivery_condition ] ]
            }

            const itemsInfo = {
                headers: ["Nombre producto", "Precio unitario", "Cantidad", "Total"],
                rows: itemsArray
            }

            const pricesInfo = {
                headers: ["Impuesto importación", "Impuesto envío", "Total a pagar"],
                rows: [ [ "$"+import_taxes, "$"+shipment_taxes, "$"+total_price] ]
            }

            doc.table( invoiceDates, { width: 500 });
            doc.moveDown();

            doc.table( buyerInfo, { width: 500 });
            doc.moveDown();

            doc.table( sellerInfo, { width: 500 });
            doc.moveDown();

            doc.table( itemsInfo, { width: 500 });
            doc.moveDown();

            doc.table( pricesInfo, { width: 500 });
            doc.moveDown();

            doc.end();
        } catch (err) {
            console.error(err);
        }
    }

    return {
        create: createPdf
    }
}

module.exports = PdfResource();