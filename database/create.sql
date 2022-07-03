CREATE TABLE IF NOT EXISTS invoices(
    invoice_id SERIAL,
    date_of_sale TIMESTAMP NOT NULL,
    date_of_invoice TIMESTAMP NOT NULL,
    buyer_name VARCHAR(128) NOT NULL,
    buyer_id VARCHAR(12) NOT NULL,
    buyer_mail VARCHAR(128),
    buyer_address VARCHAR(128) NOT NULL,
    buyer_city VARCHAR(32) NOT NULL,
    buyer_phone_number VARCHAR(12) NOT NULL,
    buyer_turnover VARCHAR(128) NOT NULL,
    payment_condition VARCHAR(32) NOT NULL,
    delivery_condition VARCHAR(32) NOT NULL,
    seller_name VARCHAR(128) NOT NULL,
    seller_mail VARCHAR(128) NOT NULL,
    invoice_price INT NOT NULL,
    shipment_taxes INT,
    import_taxes INT,
    nullify BOOLEAN DEFAULT false,
    PRIMARY KEY (invoice_id)
);

CREATE TABLE IF NOT EXISTS items(
    item_id SERIAL,
    invoice_id INT NOT NULL,
    item_name VARCHAR(128) NOT NULL,
    item_price INT NOT NULL,
    item_count INT NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (item_id, invoice_id)
);