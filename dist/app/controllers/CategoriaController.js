"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Categoria = require('../models/Categoria'); var _Categoria2 = _interopRequireDefault(_Categoria);

class CategoriaController {
  async index(req, res) {
    const categorias = await _Categoria2.default.findAll({
      order: [["created_at", "ASC"]],
      attributes: ["id", "nome"],
    });

    return res.json(categorias);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "NOME DA CATEGORIA NÃO INFORMADO" });
    }

    const categoriaExiste = await _Categoria2.default.findOne({
      where: {
        nome: req.body.nome,
        codigo_instituicao: req.instituicaoId,
      },
    });

    if (categoriaExiste) {
      return res.status(400).json({ error: "CATEGORIA JÁ EXISTE" });
    }

    await _Categoria2.default.create({
      ...req.body,
      codigo_instituicao: req.instituicaoId,
    });

    return res.json(true);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "NOME CATEGORIA NÃO INFORMADO" });
    }

    const { id, nome } = req.body;

    const categoria = await _Categoria2.default.findByPk(id);

    if (nome !== categoria.nome) {
      const categoriaExiste = await _Categoria2.default.findOne({
        where: { nome, codigo_instituicao: req.instituicaoId },
      });

      if (categoriaExiste) {
        return res.status(400).json({ error: "NOME DA CATEGORIA JÁ EXISTE" });
      }
    }

    await categoria.update(req.body);

    return res.json(true);
  }

  async delete(req, res) {
    await _Categoria2.default.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(true);
  }
}

exports. default = new CategoriaController();
