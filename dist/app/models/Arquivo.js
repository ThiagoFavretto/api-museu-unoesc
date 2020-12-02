"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Arquivo extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: _sequelize2.default.STRING,
        caminho: _sequelize2.default.STRING,
        codigo_instituicao: _sequelize2.default.INTEGER,
        codigo_objeto: _sequelize2.default.INTEGER,
        tipo: _sequelize2.default.INTEGER,
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/imagens/${this.caminho}`;
          },
        },
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "arquivo",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Instituicao, { foreignKey: "codigo_instituicao" });
  }
}

exports. default = Arquivo;
