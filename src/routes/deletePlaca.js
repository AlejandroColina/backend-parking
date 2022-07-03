const express = require('express');
const cors = require('cors');
const router = express.Router();
const { db } = require('../db');
router.use(express.json());
router.use(cors());

const { Vehiculo } = db.models;

router.delete('/:placa', async (req, res) => {

    try {

        const { placa } = req.params;
        if (placa.length < 5 || placa.length > 6) return res.status(404).json({ msg: 'Placa incompleta' });

        let consulta = await Vehiculo.findOne({ where: { placa: placa } });
        if (!consulta) return res.status(404).json({ msg: 'No existe esta placa en BD.' });

        await Vehiculo.destroy({ where: { placa: placa } });
        return res.json({ msg: 'Placa eliminada.' })

    } catch (error) {
        throw error
    }

});

module.exports = router;