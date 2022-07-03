const express = require('express');
const cors = require('cors');
const router = express.Router();
const { db } = require('../db');
const date = require('../hourUTC-5')
router.use(express.json());
router.use(cors());

const { Vehiculo, Facturas, Calendar } = db.models;

router.get('/:placa', async (req, res) => {
    try {
        let { placa } = req.params;

        let consulta = await Vehiculo.findOne({ where: { placa: placa } });
        if (!consulta) { consulta = await Vehiculo.create({ placa: placa }) }

        let placaId = consulta?.dataValues.id;
        let calendar = await Calendar.findAll({
            where: { VehiculoId: placaId }, order: [['id', 'DESC']]
        });

        if (calendar.length) {
            calendar = calendar[0];

            if (!calendar.dataValues.horaS) {
                await calendar.update({ horaS: date() }, { where: { VehiculoId: placaId } });

                let hora = 60000 * 60;
                let time = calendar.dataValues.horaS.getTime() - calendar.dataValues.horaE.getTime();
                time = (parseInt(time / hora) + 1) * 1000

                let factura = await Facturas.create({
                    total: time,
                    fecha: date(),
                    VehiculoId: placaId
                })

                return res.json({ factura, consulta, calendar });
            }
        }

        await Calendar.create({ horaE: date(), VehiculoId: placaId })
        res.json({ msg: 'Registro creado.' });

    } catch (error) {
        throw error
    }
});

module.exports = router;