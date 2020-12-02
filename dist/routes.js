"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _CategoriaController = require('./app/controllers/CategoriaController'); var _CategoriaController2 = _interopRequireDefault(_CategoriaController);
var _ObjetoController = require('./app/controllers/ObjetoController'); var _ObjetoController2 = _interopRequireDefault(_ObjetoController);
var _UsuarioController = require('./app/controllers/UsuarioController'); var _UsuarioController2 = _interopRequireDefault(_UsuarioController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _LocalController = require('./app/controllers/LocalController'); var _LocalController2 = _interopRequireDefault(_LocalController);
var _InstituicaoController = require('./app/controllers/InstituicaoController'); var _InstituicaoController2 = _interopRequireDefault(_InstituicaoController);
var _ArquivoController = require('./app/controllers/ArquivoController'); var _ArquivoController2 = _interopRequireDefault(_ArquivoController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

routes.post("/sessions", _SessionController2.default.store);

routes.get("/instituicao", _InstituicaoController2.default.index);
routes.get("/objeto/categoria/:id", _ObjetoController2.default.index);
routes.post("/objeto/nome", _ObjetoController2.default.adquirirObjetoNome);
routes.get("/objeto/:id", _ObjetoController2.default.adquirirObjeto);
routes.get("/categoria", _CategoriaController2.default.index);
routes.get("/local", _LocalController2.default.index);
routes.post("/usuario", _UsuarioController2.default.store);
routes.post("/instituicao", _InstituicaoController2.default.store);

routes.use(_auth2.default);

//USUARIO
routes.get("/usuario", _UsuarioController2.default.index);
routes.put("/usuario", _UsuarioController2.default.update);
routes.delete("/usuario", _UsuarioController2.default.delete);

//CATEGORIA
routes.post("/categoria", _CategoriaController2.default.store);
routes.put("/categoria", _CategoriaController2.default.update);
routes.delete("/categoria/:id", _CategoriaController2.default.delete);

//LOCAL
routes.post("/local", _LocalController2.default.store);
routes.put("/local", _LocalController2.default.update);
routes.delete("/local/:id", _LocalController2.default.delete);

//Instituicao
routes.put("/instituicao", _InstituicaoController2.default.update);
routes.delete("/instituicao/:id", _InstituicaoController2.default.delete);
routes.get("/buscarinstituicao", _InstituicaoController2.default.buscar);

//OBJETO
routes.post("/objeto", _ObjetoController2.default.store);
routes.put("/objeto", _ObjetoController2.default.update);
routes.delete("/bojeto/:id", _ObjetoController2.default.delete);
routes.get("/all", _ObjetoController2.default.all);

exports. default = routes;
