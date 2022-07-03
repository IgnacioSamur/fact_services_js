'use-strict'

const { invoiceRepo } = require('../data');

const InvoiceService = () => {
    const createInvoice = async () => {
        try {
            return await invoiceRepo.create();
        } catch (error) {
            return Promise.reject({ error: true, message: error });
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
                        return await invoiceRepo.find({ id, date_of_sale, date_of_invoice });
                    }
                } else {
                    return await invoiceRepo.find({ id, date_of_sale, date_of_invoice });
                }
            } else {
                return await invoiceRepo.find({ id, date_of_sale, date_of_invoice });
            }
        } catch (error) {
            return Promise.reject({ error: true, message: error });
        }
    }

    const nullifyInvoice = async (id) => {
        try {
            return await invoiceRepo.nullify(id);
        } catch (error) {
            return Promise.reject({ error: true, message: error });
        }
    }

    const invoicePdf = () => {
        let data = {}
        return data;
    }

    return {
        create: createInvoice,
        find: findInvoice,
        nullify: nullifyInvoice,
        pdf: invoicePdf
    }
}

module.exports = InvoiceService();