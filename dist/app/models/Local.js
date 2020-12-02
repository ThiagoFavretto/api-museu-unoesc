"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Local extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        descricao: _sequelize2.default.STRING,
        complemento: _sequelize2.default.STRING,
        codigo_instituicao: _sequelize2.default.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "local",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Instituicao, { foreignKey: "codigo_instituicao" });
  }
}

exports. default = Local;
