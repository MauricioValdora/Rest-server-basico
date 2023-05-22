const { response, request } = require('express')

const usuariosGet = (req, res = response) => {
  
  const params = req.query
  res.json({
    msg: "msg- get happy",
    params
  })
}
const usuariosPost = (req, res = response) => {

  const body = req.body;

  res.json({
    msg: "msg- Post happy",
    body
  })
}
const usuariosPut = (req, res = response) => {

  const id = req.params.id;
  res.json({
    msg: "msg- Put happy",
    id
  })
}
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "msg- Patch happy"
  })
}
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "msg- Delete sadness"
  })
}

module.exports = {

  usuariosGet
  , usuariosPost
  , usuariosPut
  , usuariosPatch
  , usuariosDelete

}