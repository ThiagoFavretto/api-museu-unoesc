"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Instituicao = require('../models/Instituicao'); var _Instituicao2 = _interopRequireDefault(_Instituicao);

class InstituicaoController {
  async index(req, res) {
    const instituicao = await _Instituicao2.default.findAll({
      order: [["created_at", "DESC"]],
      attributes: ["id", "nome", "endereco", "numero_telefone"],
    });
    return res.json(instituicao);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      endereco: Yup.string().required(),
      numero_telefone: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "DADOS INCORRETOS" });
    }

    const instituicaoExiste = await _Instituicao2.default.findOne({
      where: {
        descricao: req.body.nome,
      },
    });

    if (instituicaoExiste) {
      return res.status(400).json({ error: "INSTITUIÇÃO JÁ EXISTE" });
    }

    await _Instituicao2.default.create(req.body);

    return res.json(true);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      nome: Yup.string().required(),
      endereco: Yup.string().required(),
      numero_telefone: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "DADOS INCORRETOS" });
    }

    const { id, nome } = req.body;

    const instituicao = await _Instituicao2.default.findByPk(id);

    if (nome && nome !== instituicao.nome) {
      const instituicaoExiste = await Local.findOne({
        where: { descricao, codigo_instituicao: req.instituicaoId },
      });

      if (instituicaoExiste) {
        return res.status(400).json({ error: "LOCAL JÁ EXISTE" });
      }
    }

    await local.update(req.body);

    return res.json(true);
  }

  async delete(req, res) {
    await Local.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(true);
  }

  async buscar(req, res) {
    const instituicao = await _Instituicao2.default.findOne({
      order: [["created_at", "DESC"]],
      attributes: ["id", "nome", "endereco", "numero_telefone"],
    });
    return res.json(instituicao);
  }
}

exports. default = new InstituicaoController();
