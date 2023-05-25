const mongoose = require('mongoose');
const Role = require('../models/role')
const Usuario = require('../models/usuario')



const esRolValido = async(rol ='') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error('No es un rol permitido');
    }

}

const emailExist = async(email='')=>{
    const emailExist = await Usuario.findOne({ email });
    if (emailExist) {
        throw new Error('El email ya existe');
    }
    
}

// const existeUsuarioId = async(id='')=>{
//     const existeUsuario = await Usuario.findById( id );
//     if (!existeUsuario) {
//         throw new Error(`El id no existe`);
//     }
    
// }

const existeUsuarioId = async (id = '') => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('El id no es válido');
  }

  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error('El id no existe');
  }
};
module.exports = {
    esRolValido,
    emailExist,
    existeUsuarioId
}