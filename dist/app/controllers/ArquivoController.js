"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Arquivo = require('../models/Arquivo'); var _Arquivo2 = _interopRequireDefault(_Arquivo);

class ArquivoController {
  async store(req, res) {
    const { originalname: nome, filename: caminho } = req.file;

    const arquivo = await _Arquivo2.default.create({
      nome,
      caminho,
      codigo_instituicao: req.instituicaoId,
      codigo_objeto: req.body.objeto,
      tipo: req.body.tipo,
    });

    return res.json(arquivo);
  }
}

exports. default = new ArquivoController();
