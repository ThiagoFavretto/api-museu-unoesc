"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Local = require('../models/Local'); var _Local2 = _interopRequireDefault(_Local);

class LocalController {
  async index(req, res) {
    const local = await _Local2.default.findAll({
      order: [["created_at", "DESC"]],
      attributes: ["id", "descricao", "complemento"],
    });
    return res.json(local);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
      complemento: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "DADOS INCORRETOS" });
    }

    const localExiste = await _Local2.default.findOne({
      where: {
        descricao: req.body.descricao,
        codigo_instituicao: req.instituicaoId,
      },
    });

    if (localExiste) {
      return res.status(400).json({ error: "LOCAL JÁ EXISTE" });
    }

    await _Local2.default.create({
      ...req.body,
      codigo_instituicao: req.instituicaoId,
    });

    return res.json(true);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      descricao: Yup.string().required(),
      complemento: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "DADOS INCORRETOS" });
    }

    const { descricao } = req.body;

    const local = await _Local2.default.findByPk(req.body.id);

    if (descricao && descricao !== local.descricao) {
      const localExiste = await _Local2.default.findOne({
        where: { descricao, codigo_instituicao: req.instituicaoId },
      });

      if (localExiste) {
        return res.status(400).json({ error: "LOCAL JÁ EXISTE" });
      }
    }

    await local.update(req.body);

    return res.json(true);
  }

  async delete(req, res) {
    await _Local2.default.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(true);
  }
}

exports. default = new LocalController();
