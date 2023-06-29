const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        const usuarioEncontrado = await Usuario.findById(uid)

        //verificar si el uid tiene estado en true

        if (!usuarioEncontrado) {
            return res.status(401).json({
                msg: 'el usuario no existe colta'
            })
        }

        if (!usuarioEncontrado.estado) {
            return res.status(401).json({
                msg: 'token no valido - usuraio con esado false'
            })
        }



        req.usuario = usuarioEncontrado;
        next();

    } catch (error) {
        return res.status(400).json({
            msg: 'token no valido'
        })
    }

}

module.exports = {
    validarJWT
}
