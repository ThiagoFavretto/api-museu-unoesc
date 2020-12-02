"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Instituicao extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: _sequelize2.default.STRING,
        endereco: _sequelize2.default.STRING,
        numero_telefone: _sequelize2.default.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "instituicao",
      }
    );

    return this;
  }
}

exports. default = Instituicao;
