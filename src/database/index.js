import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import Arquivo from "../app/models/Arquivo";
import Categoria from "../app/models/Categoria";
import Instituicao from "../app/models/Instituicao";
import Local from "../app/models/Local";
import Objeto from "../app/models/Objeto";
import Usuario from "../app/models/Usuario";

const models = [Arquivo, Categoria, Instituicao, Local, Objeto, Usuario];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
