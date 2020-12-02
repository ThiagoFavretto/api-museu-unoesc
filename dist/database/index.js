"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

var _Arquivo = require('../app/models/Arquivo'); var _Arquivo2 = _interopRequireDefault(_Arquivo);
var _Categoria = require('../app/models/Categoria'); var _Categoria2 = _interopRequireDefault(_Categoria);
var _Instituicao = require('../app/models/Instituicao'); var _Instituicao2 = _interopRequireDefault(_Instituicao);
var _Local = require('../app/models/Local'); var _Local2 = _interopRequireDefault(_Local);
var _Objeto = require('../app/models/Objeto'); var _Objeto2 = _interopRequireDefault(_Objeto);
var _Usuario = require('../app/models/Usuario'); var _Usuario2 = _interopRequireDefault(_Usuario);

const models = [_Arquivo2.default, _Categoria2.default, _Instituicao2.default, _Local2.default, _Objeto2.default, _Usuario2.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

exports. default = new Database();
