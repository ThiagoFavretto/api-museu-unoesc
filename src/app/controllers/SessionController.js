import * as Yup from "yup";
import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";

import Usuario from "../models/Usuario";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().required(),
      senha: Yup.string().required(),
      codigo_instituicao: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "DADOS INCORRETOS" });
    }

    const { login, senha, codigo_instituicao } = req.body;

    const usuario = await Usuario.findOne({
      where: { login, codigo_instituicao },
    });

    if (!usuario) {
      return res.status(401).json({ error: "USUÁRIO NÃO ENCONTRADO" });
    }

    if (!(await usuario.checkPassword(senha))) {
      return res.status(401).json({ error: "SENHA NÃO CONFERE" });
    }

    const { id, nome } = usuario;

    return res.json({
      usuario: {
        id,
        nome,
        login,
        codigo_instituicao,
      },
      token: jwt.sign({ codigo_instituicao }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
