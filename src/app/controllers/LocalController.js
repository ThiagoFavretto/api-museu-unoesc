import * as Yup from "yup";
import Local from "../models/Local";

class LocalController {
  async index(req, res) {
    const local = await Local.findAll({
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

    const localExiste = await Local.findOne({
      where: {
        descricao: req.body.descricao,
        codigo_instituicao: req.instituicaoId,
      },
    });

    if (localExiste) {
      return res.status(400).json({ error: "LOCAL JÁ EXISTE" });
    }

    await Local.create({
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

    const local = await Local.findByPk(req.body.id);

    if (descricao && descricao !== local.descricao) {
      const localExiste = await Local.findOne({
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
    await Local.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(true);
  }
}

export default new LocalController();
