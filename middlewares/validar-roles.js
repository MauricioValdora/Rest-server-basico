const { response } = require("express")


const esAdminRole = (req, res = response, next) => {


    if (!req.usuario) {
        return res.status(500).json({
            msg: 'se quiere verificar el rol sin tener el token'
        })
    }

    const { rol, name } = req.usuario

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es administrador por ende no puede hacer eso`
        })
    }

}


const tieneRole = (...roles) => {
    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }


        next();
    }
}
module.exports = {
    esAdminRole,
    tieneRole
}

