import Sequelize, { Model } from "sequelize";

class Instituicao extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        endereco: Sequelize.STRING,
        numero_telefone: Sequelize.STRING,
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

export default Instituicao;
