import * as Yup from "yup";
import Instituicao from "../models/Instituicao";

class InstituicaoController {
  async index(req, res) {
    const instituicao = await Instituicao.findAll({
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

    const instituicaoExiste = await Instituicao.findOne({
      where: {
        descricao: req.body.nome,
      },
    });

    if (instituicaoExiste) {
      return res.status(400).json({ error: "INSTITUIÇÃO JÁ EXISTE" });
    }

    await Instituicao.create(req.body);

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

    const instituicao = await Instituicao.findByPk(id);

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
    const instituicao = await Instituicao.findOne({
      order: [["created_at", "DESC"]],
      attributes: ["id", "nome", "endereco", "numero_telefone"],
    });
    return res.json(instituicao);
  }
}

export default new InstituicaoController();
