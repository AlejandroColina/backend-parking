const express = require('express');
const cors = require('cors');
const router = express.Router();
const { db } = require('../db');
router.use(express.json());
router.use(cors());

const { Vehiculo } = db.models;

router.get('/:placa/:placa2', async (req, res) => {

    try {
        const { placa, placa2 } = req.params;
        if (placa.length < 5 || placa.length > 6) return res.status(404).json({ msg: 'Placa incompleta' });
        if (placa2.length < 5 || placa2.length > 6) return res.status(404).json({ msg: 'Placa incompleta' });

        let consulta = await Vehiculo.findAll({ where: { placa: placa } });

        if (consulta.length) {
            await Vehiculo.update({ placa: placa2 }, { where: { placa: placa } });
            res.json({ msg: 'Placa actualizada.' })
        } else {
            res.status(404).json({ msg: 'La placa no existe.' });
        }
    } catch (error) {

    }

});

module.exports = router;