"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class Usuario extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        senha: _sequelize2.default.VIRTUAL,
        senha_hash: _sequelize2.default.STRING,
        nome: _sequelize2.default.STRING,
        login: _sequelize2.default.INTEGER,
        papel: _sequelize2.default.INTEGER,
        codigo_instituicao: _sequelize2.default.INTEGER,
      },
      {
        hooks: {
          beforeCreate: async (usuario) => {
            usuario.senha_hash = await _bcryptjs2.default.hash(usuario.senha, 8);
          },
          beforeUpdate: async (usuario) => {
            if (usuario.senha)
              usuario.senha_hash = await _bcryptjs2.default.hash(usuario.senha, 8);
          },
        },
        sequelize,
        freezeTableName: true,
        tableName: "usuario",
      }
    );
  }

  checkPassword(password) {
    return _bcryptjs2.default.compare(password, this.senha_hash);
  }

  static associate(models) {
    this.belongsTo(models.Instituicao, { foreignKey: "codigo_instituicao" });
  }
}

exports. default = Usuario;
