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

    const findInvoice = async (id) => {
        try {
            return await invoiceRepo.find(id);
        } catch (error) {
            return Promise.reject({ error: true, message: error });
        }
    }

    const nullifyInvoice = () => {
        let data = {}
        return data;
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