import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../../config/auth";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "TOKEN NÃO INFORMADO" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.instituicaoId = decoded.codigo_instituicao;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "TOKEN INVALIDO" });
  }
};
