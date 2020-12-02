"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Objeto extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: _sequelize2.default.STRING,
        descricao: _sequelize2.default.STRING,
        status: _sequelize2.default.INTEGER,
        destaque: _sequelize2.default.BOOLEAN,
        codigo_categoria: _sequelize2.default.INTEGER,
        codigo_instituicao: _sequelize2.default.INTEGER,
        codigo_local: _sequelize2.default.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "objeto",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Categoria, { foreignKey: "codigo_categoria" });
    this.belongsTo(models.Instituicao, { foreignKey: "codigo_instituicao" });
    this.belongsTo(models.Local, { foreignKey: "codigo_local" });
  }
}

exports. default = Objeto;
