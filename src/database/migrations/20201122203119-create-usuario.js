module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("usuario", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      senha_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      papel: {
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
    await queryInterface.dropTable("usuario");
  },
};
