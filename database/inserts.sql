INSERT INTO invoices(date_of_sale, date_of_invoice, buyer_name, buyer_id, buyer_mail, buyer_address, buyer_city, buyer_phone_number, buyer_turnover, payment_condition, delivery_condition, seller_name, seller_mail, invoice_price, shipment_taxes, import_taxes) VALUES
	(NOW(), NOW(), 'Juan Perez', '19.526.842-0', 'juan@gmail.com', 'Lynch 256', 'Osorno', '912345678', 'Particular', 'Efectivo', 'Entrega en tienda', 'Rene Perez', 'rene@empresa.com', 12390, 0, 0),
	(NOW(), NOW(), 'Martin Fernandez', '20.456.214-8', 'martin@gmail.com', 'Rodriguez 1254', 'Osorno', '91076854', 'Particular', 'Transferencia electrónica', 'Entrega en tienda', 'Rene Perez', 'rene@empresa.com', 23990, 0, 0),
	(NOW(), NOW(), 'Esteban Martinez', '9.652.884-5', '', 'Cesar Ercilla 1074', 'Osorno', '956124577', 'Particular', 'Tarjeta de crédito', 'Envío por carrier', 'Rene Perez', 'rene@empresa.com', 65890, 0, 0);
	
INSERT INTO items(invoice_id, item_name, item_price, item_count) VALUES
	(1, 'Cable UTP Cat5e + Conectores RJ45 - 0.6mts Azul', 2995, 2),
	(1, 'Cable Coaxial de 5M Hembra RP-SMA a Macho Tipo N', 6400, 1),
	(2, 'Audífono DJ Hercules HDP DJ45', 23990, 1),
	(3, 'Webcam JS-290 Ultra HD 4K - Enfoque Automático', 32945, 2);