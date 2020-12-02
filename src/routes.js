import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import CategoriaController from "./app/controllers/CategoriaController";
import ObjetoController from "./app/controllers/ObjetoController";
import UsuarioController from "./app/controllers/UsuarioController";
import SessionController from "./app/controllers/SessionController";
import LocalController from "./app/controllers/LocalController";
import InstituicaoController from "./app/controllers/InstituicaoController";
import ArquivoController from "./app/controllers/ArquivoController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/sessions", SessionController.store);

routes.get("/instituicao", InstituicaoController.index);
routes.get("/objeto/categoria/:id", ObjetoController.index);
routes.get("/objeto/categoria/:nome", ObjetoController.adquirirObjetoNome);
routes.get("/objeto/:id", ObjetoController.adquirirObjeto);
routes.get("/categoria", CategoriaController.index);
routes.get("/local", LocalController.index);
// routes.post("/imagens", upload.single("imagem"), ArquivoController.store);

routes.use(authMiddleware);

//USUARIO
routes.get("/usuario", UsuarioController.index);
routes.post("/usuario", UsuarioController.store);
routes.put("/usuario", UsuarioController.update);
routes.delete("/usuario", UsuarioController.delete);

//CATEGORIA
routes.post("/categoria", CategoriaController.store);
routes.put("/categoria", CategoriaController.update);
routes.delete("/categoria/:id", CategoriaController.delete);

//LOCAL
routes.post("/local", LocalController.store);
routes.put("/local", LocalController.update);
routes.delete("/local/:id", LocalController.delete);

//Instituicao
routes.post("/instituicao", InstituicaoController.store);
routes.put("/instituicao", InstituicaoController.update);
routes.delete("/instituicao/:id", InstituicaoController.delete);

//OBJETO
routes.post("/objeto", ObjetoController.store);
routes.put("/objeto", ObjetoController.update);
routes.delete("/bojeto/:id", ObjetoController.delete);

export default routes;
