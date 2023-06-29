const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarjwt');


const login = async (req, res = response) => {
    const { email, password } = req.body

    try {

        //verificar si el email existe 
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {

            return res.status(400).json({ message: 'El usuario no existe' });
        }
        //verificar si el status esta activo
        if (!usuario.estado) {

            return res.status(400).json({ message: 'El estado del estado es false' });
        }
        //veridicar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'La contraseña es incorrecta' });
        }

        //generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}