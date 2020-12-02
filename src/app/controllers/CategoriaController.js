import * as Yup from "yup";
import Categoria from "../models/Categoria";

class CategoriaController {
  async index(req, res) {
    const categorias = await Categoria.findAll({
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

    const categoriaExiste = await Categoria.findOne({
      where: {
        nome: req.body.nome,
        codigo_instituicao: req.instituicaoId,
      },
    });

    if (categoriaExiste) {
      return res.status(400).json({ error: "CATEGORIA JÁ EXISTE" });
    }

    await Categoria.create({
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

    const categoria = await Categoria.findByPk(id);

    if (nome !== categoria.nome) {
      const categoriaExiste = await Categoria.findOne({
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
    await Categoria.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(true);
  }
}

export default new CategoriaController();
