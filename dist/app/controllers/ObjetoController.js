"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Objeto = require('../models/Objeto'); var _Objeto2 = _interopRequireDefault(_Objeto);
var _Local = require('../models/Local'); var _Local2 = _interopRequireDefault(_Local);
var _sequelize = require('sequelize');

class ObjetoController {
  async index(req, res) {
    const objeto = await _Objeto2.default.findAll({
      where: {
        codigo_categoria: req.params.id,
      },
      order: [["created_at", "DESC"]],
      attributes: ["id", "nome", "descricao", "status", "destaque"],
      include: [
        {
          model: _Local2.default,
          attributes: ["id", "descricao", "complemento"],
        },
      ],
    });
    return res.json(objeto);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      descricao: Yup.string().required(),
      codigo_categoria: Yup.number().required(),
      codigo_local: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "DADOS INCORRETOS" });
    }

    const objetoExiste = await _Objeto2.default.findOne({
      where: {
        nome: req.body.descricao,
        codigo_instituicao: req.instituicaoId,
      },
    });

    if (objetoExiste) {
      return res.status(400).json({ error: "LOCAL JÁ EXISTE" });
    }

    await _Objeto2.default.create({
      ...req.body,
      codigo_instituicao: req.instituicaoId,
    });

    return res.json(true);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      nome: Yup.string().required(),
      descricao: Yup.string().required(),
      codigo_categoria: Yup.number().required(),
      codigo_local: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "DADOS INCORRETOS" });
    }

    const { nome } = req.body;

    const objeto = await _Objeto2.default.findByPk(req.body.id);

    if (nome && nome !== objeto.nome) {
      const objetoExiste = await _Objeto2.default.findOne({
        where: { nome, codigo_instituicao: req.instituicaoId },
      });

      if (objetoExiste) {
        return res.status(400).json({ error: "LOCAL JÁ EXISTE" });
      }
    }

    await objeto.update(req.body);

    return res.json(true);
  }

  async delete(req, res) {
    await _Objeto2.default.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(true);
  }

  async adquirirObjeto(req, res) {
    const objeto = await _Objeto2.default.findByPk(req.params.id, {
      include: [
        {
          model: _Local2.default,
          attributes: ["id", "descricao", "complemento"],
        },
      ],
    });

    return res.json(objeto);
  }

  async adquirirObjetoNome(req, res) {
    const { nome, categoria } = req.body;
    console.log(nome, categoria);
    const objeto = await _Objeto2.default.findAll({
      where: {
        nome: {
          [_sequelize.Op.like]: `%${nome}%`,
        },
        codigo_categoria: categoria,
      },
      order: [["created_at", "DESC"]],
      attributes: ["id", "nome", "descricao", "status", "destaque"],
      include: [
        {
          model: _Local2.default,
          attributes: ["id", "descricao", "complemento"],
        },
      ],
    });
    return res.json(objeto);
  }

  async all(req, res) {
    const t = await _Objeto2.default.findAll();

    return res.json(t);
  }
}

exports. default = new ObjetoController();
