"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

var _Usuario = require('../models/Usuario'); var _Usuario2 = _interopRequireDefault(_Usuario);

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().required(),
      senha: Yup.string().required(),
      codigo_instituicao: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "DADOS INCORRETOS" });
    }

    const { login, senha, codigo_instituicao } = req.body;

    const usuario = await _Usuario2.default.findOne({
      where: { login, codigo_instituicao },
    });

    if (!usuario) {
      return res.status(401).json({ error: "USUÁRIO NÃO ENCONTRADO" });
    }

    if (!(await usuario.checkPassword(senha))) {
      return res.status(401).json({ error: "SENHA NÃO CONFERE" });
    }

    const { id, nome } = usuario;

    return res.json({
      usuario: {
        id,
        nome,
        login,
        codigo_instituicao,
      },
      token: _jsonwebtoken2.default.sign({ codigo_instituicao }, _auth2.default.secret, {
        expiresIn: _auth2.default.expiresIn,
      }),
    });
  }
}

exports. default = new SessionController();
