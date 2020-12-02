import Sequelize, { Model } from "sequelize";

class Arquivo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        caminho: Sequelize.STRING,
        codigo_instituicao: Sequelize.INTEGER,
        codigo_objeto: Sequelize.INTEGER,
        tipo: Sequelize.INTEGER,
        url: {
          type: Sequelize.VIRTUAL,
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

export default Arquivo;
