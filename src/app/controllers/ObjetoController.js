import * as Yup from "yup";
import Objeto from "../models/Objeto";
import Local from "../models/Local";
import Arquivo from "../models/Arquivo";

class ObjetoController {
  async index(req, res) {
    const objeto = await Objeto.findAll({
      where: {
        codigo_categoria: req.params.id,
      },
      order: [["created_at", "DESC"]],
      attributes: ["id", "nome", "descricao", "status", "destaque"],
      include: [
        {
          model: Local,
          attributes: ["id", "descricao", "complemento"],
        },
        {
          model: Arquivo,
          where: {
            tipo: 1,
          },
          attributes: ["id", "url"],
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

    const objetoExiste = await Objeto.findOne({
      where: {
        nome: req.body.descricao,
        codigo_instituicao: req.instituicaoId,
      },
    });

    if (objetoExiste) {
      return res.status(400).json({ error: "LOCAL JÁ EXISTE" });
    }

    await Objeto.create({
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

    const objeto = await Objeto.findByPk(req.body.id);

    if (nome && nome !== objeto.nome) {
      const objetoExiste = await Objeto.findOne({
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
    await Objeto.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(true);
  }

  async adquirirObjeto(req, res) {
    const objeto = await Objeto.findByPk(req.params.id, {
      include: [
        {
          model: Local,
          attributes: ["id", "descricao", "complemento"],
        },
      ],
    });

    return res.json(objeto);
  }

  async adquirirObjetoNome(req, res) {
    
  }
}

export default new ObjetoController();
