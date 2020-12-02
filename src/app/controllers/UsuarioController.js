import * as Yup from "yup";
import Usuario from "../models/Usuario";

class UsuarioController {
  async index(req, res) {
    const usuarios = await Usuario.findAll({
      where: {
        codigo_instituicao: req.instituicaoId,
      },
      order: [["created_at", "DESC"]],
      attributes: ["id", "nome", "papel"],
    });
    return res.json(usuarios);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      login: Yup.string().required(),
      papel: Yup.number().required(),
      codigo_instituicao: Yup.number().required(),
      senha: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "DADOS INCORRETOS" });
    }

    const usuarioExiste = await Usuario.findOne({
      where: {
        login: req.body.login,
        codigo_instituicao: req.body.codigo_instituicao,
      },
    });

    if (usuarioExiste) {
      return res.status(400).json({ error: "USUÁRIO JÁ EXISTE" });
    }

    await Usuario.create(req.body);

    return res.json(true);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      nome: Yup.string().required(),
      login: Yup.string().required(),
      papel: Yup.number().required(),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .min(6)
        .when("password", (password, field) =>
          password ? field.required().oneOf([Yup.ref("password")]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "DADOS INCORRETOS" });
    }

    const { login, oldPassword } = req.body;

    const usuario = await Usuario.findByPk(req.id);

    if (login && login !== usuario.login) {
      const usuarioExiste = await Usuario.findOne({
        where: { login, codigo_instituicao: req.instituicaoId },
      });

      if (usuarioExiste) {
        return res
          .status(400)
          .json({ error: "ESTE LOGIN JÁ ESTA SENDO USADO" });
      }
    }

    if (oldPassword && !(await Usuario.checkPassword(oldPassword))) {
      return res.status(400).json({ error: "SENHA NÃO CONFERE" });
    }

    await usuario.update(req.body);

    return res.json(true);
  }

  async delete(req, res) {
    await Usuario.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(true);
  }
}

export default new UsuarioController();
