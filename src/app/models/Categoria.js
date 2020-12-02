import Sequelize, { Model } from "sequelize";

class Categoria extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        codigo_instituicao: Sequelize.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "categoria",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Instituicao, { foreignKey: "codigo_instituicao" });
  }
}

export default Categoria;
