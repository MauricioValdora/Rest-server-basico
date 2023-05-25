const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost, usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExist, existeUsuarioId } = require('../helpers/db-validators');

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', [
    // check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut)

router.post('/', [
    check('name', 'el Nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio y debe tener mas de 6 letras').isLength({ min: 6 }),
    check('email', 'el Correo ingresado no es valido').isEmail(),
    check('email').custom(emailExist),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost)

router.delete('/:id',[
    check('id').custom(existeUsuarioId),
    validarCampos
],

    usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router