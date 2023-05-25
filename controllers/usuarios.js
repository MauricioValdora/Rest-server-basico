const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = async (req = request, res = response) => {

  const { limite, desde } = req.query;
  const query = { estado: true }

  // const usuarios = await Usuario.find(query)
  //   .limit(parseInt(limite))
  //   .skip(parseInt(desde))
  //   const total = await Usuario.countDocuments(query)

  const [total, usuarios] = await Promise.all([

    Usuario.countDocuments(query),

    Usuario.find(query)
      .limit(parseInt(limite))
      .skip(parseInt(desde))

  ])

  res.json({
    total,
    usuarios
  })
}

const usuariosPost = async (req, res = response) => {


  const { name, email, password, rol } = req.body;
  const usuario = new Usuario({ name, email, password, rol });

  //verificar si el correo existe

  //encriptar contraseña

  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt)

  //guardar en db
  await usuario.save();

  res.json({
    usuario
  })
}


const usuariosPut = async (req, res = response) => {

  const id = req.params.id;
  const { _id, password, google, email, ...resto } = req.body;

  //validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt)
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto)

  res.json(
    usuario
  )
}



const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "msg- Patch happy"
  })
}



const usuariosDelete =async (req, res = response) => {

  const id = req.params.id;

  //borrarlo fisicamente NO SE RECOMIENDA
  // const usuario = await Usuario.findByIdAndDelete(id)

  const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

  res.json({
    usuario
  })
}

module.exports = {

  usuariosGet
  , usuariosPost
  , usuariosPut
  , usuariosPatch
  , usuariosDelete

}