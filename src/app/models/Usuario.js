import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        nome: Sequelize.STRING,
        login: Sequelize.INTEGER,
        papel: Sequelize.INTEGER,
        codigo_instituicao: Sequelize.INTEGER,
      },
      {
        hooks: {
          beforeCreate: async (usuario) => {
            usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
          },
          beforeUpdate: async (usuario) => {
            if (usuario.senha)
              usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
          },
        },
        sequelize,
        freezeTableName: true,
        tableName: "usuario",
      }
    );
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.senha_hash);
  }

  static associate(models) {
    this.belongsTo(models.Instituicao, { foreignKey: "codigo_instituicao" });
  }
}

export default Usuario;
