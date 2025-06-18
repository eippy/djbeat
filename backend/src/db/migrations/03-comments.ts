"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable(
      "Comments",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
          },
          onDelete: "CASCADE",
        },
        songId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Songs",
          },
          onDelete: "CASCADE",
        },
        comment: {
          type: Sequelize.STRING(1000),
          allowNull: false,
          validate: {
            len: [1, 1000],
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allownull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },

  down: async (queryInterface: any, Sequelize: any) => {
    options.tableName = "Comments";
    return queryInterface.dropTable(options);
  },
}
