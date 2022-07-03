'use-strict'

const { invoiceRepo } = require('../data');

const InvoiceService = () => {
    const createInvoice = async ({ date_of_sale, date_of_invoice, buyer_name, buyer_id, buyer_mail, buyer_address, buyer_city, buyer_phone_number, buyer_turnover, payment_condition, delivery_condition, seller_name, seller_mail, invoice_price, shipment_taxes, import_taxes, items }) => {
        try {
            if (!date_of_sale) {
                console.error("invoiceService.createInvoice date_of_sale is empty")
                return { error: true, message: "date_of_sale is required" }
            }
            if (!date_of_invoice) {
                console.error("invoiceService.createInvoice date_of_invoice is empty")
                return { error: true, message: "date_of_invoice is required" }
            }
            if (!buyer_name) {
                console.error("invoiceService.createInvoice buyer_name is empty")
                return { error: true, message: "buyer_name is required" }
            }
            if (!buyer_id) {
                console.error("invoiceService.createInvoice buyer_id is empty")
                return { error: true, message: "buyer_id is required" }
            }
            if (!buyer_mail) {
                console.error("invoiceService.createInvoice buyer_mail is empty")
                return { error: true, message: "buyer_mail is required" }
            }
            if (!buyer_address) {
                console.error("invoiceService.createInvoice buyer_address is empty")
                return { error: true, message: "buyer_address is required" }
            }
            if (!buyer_city) {
                console.error("invoiceService.createInvoice buyer_city is empty")
                return { error: true, message: "buyer_city is required" }
            }
            if (!buyer_phone_number) {
                console.error("invoiceService.createInvoice buyer_phone_number is empty")
                return { error: true, message: "buyer_phone_number is required" }
            }
            if (!buyer_turnover) {
                console.error("invoiceService.createInvoice buyer_turnover is empty")
                return { error: true, message: "buyer_turnover is required" }
            }
            if (!payment_condition) {
                console.error("invoiceService.createInvoice payment_condition is empty")
                return { error: true, message: "payment_condition is required" }
            }
            if (!delivery_condition) {
                console.error("invoiceService.createInvoice delivery_condition is empty")
                return { error: true, message: "delivery_condition is required" }
            }
            if (!seller_name) {
                console.error("invoiceService.createInvoice seller_name is empty")
                return { error: true, message: "seller_name is required" }
            }
            if (!seller_mail) {
                console.error("invoiceService.createInvoice seller_mail is empty")
                return { error: true, message: "seller_mail is required" }
            }
            if (items.length != 0) {
                items.forEach((element) => {
                    Object.entries(element).forEach(([key, value]) => {
                        if (!value) {
                            console.error("invoiceService.createInvoice " + key + " is empty")
                            return { error: true, message: key + " is required" }
                        }
                    });
                });
            }
            
            return await invoiceRepo.create({ date_of_sale, date_of_invoice, buyer_name, buyer_id, buyer_mail, buyer_address, buyer_city, buyer_phone_number, buyer_turnover, payment_condition, delivery_condition, seller_name, seller_mail, invoice_price, shipment_taxes, import_taxes, items });
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