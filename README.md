RUTAS BACKEND PARKING

/add/:placa -->
Crea placa con hora de entrada.
si existe y no tiene horaS la registra.
crea factura si existe horaE y horaS
retorna factura.

/placas/ --> Toda la info de tabla VEHICULO de BD.
/placas/:placa--> Toda la info de una placa específica.

/factura/ --> Toda la info de tabla FACTURAS de BD.
/factura/:id --> Toda la info de una factura específica.
/factura/:placa--> info de la factura de una placa específica.

/update/:placa/:placa2 --> actualiza la placa de la tabla vehículo.

(router.delete)
/delete/:placa --> Elimina una placa