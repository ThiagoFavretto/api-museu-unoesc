
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("arquivo", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      caminho: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      codigo_instituicao: {
        type: Sequelize.INTEGER,
        references: { model: "instituicao", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false,
      },
      codigo_objeto: {
        type: Sequelize.INTEGER,
        references: { model: "objeto", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("arquivo");
  },
};
