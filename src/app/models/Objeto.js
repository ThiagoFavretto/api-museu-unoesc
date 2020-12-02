import Sequelize, { Model } from "sequelize";

class Objeto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        status: Sequelize.INTEGER,
        destaque: Sequelize.BOOLEAN,
        codigo_categoria: Sequelize.INTEGER,
        codigo_instituicao: Sequelize.INTEGER,
        codigo_local: Sequelize.INTEGER,
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
    this.hasMany(models.Arquivo, { foreignKey: "codigo_objeto" });
  }
}

export default Objeto;
