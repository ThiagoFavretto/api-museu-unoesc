"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("objeto", {
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
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      destaque: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      codigo_categoria: {
        type: Sequelize.INTEGER,
        references: { model: "categoria", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false,
      },
      codigo_instituicao: {
        type: Sequelize.INTEGER,
        references: { model: "instituicao", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false,
      },
      codigo_local: {
        type: Sequelize.INTEGER,
        references: { model: "local", key: "id" },
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
    await queryInterface.dropTable("objeto");
  },
};
