import Sequelize, { Model } from "sequelize";

class Local extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
        complemento: Sequelize.STRING,
        codigo_instituicao: Sequelize.INTEGER,
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

export default Local;
