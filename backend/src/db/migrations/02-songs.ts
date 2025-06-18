"use strict";


import { OptionsInterface } from "../../typings/seeders";


let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}


module.exports = {
    up: async (queryInterface: any, Sequelize: any) => {
        return queryInterface.createTable("Songs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ownerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                },
                onDelete: 'CASCADE'
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
                validate: {
                    len: [1, 100]
                }
            },
            description: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            previewImage: {
                type: Sequelize.STRING(250),
                allowNull: false
            },
            filepath: {
                type: Sequelize.STRING(250),
                allowNull: false
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNull: true,
                validate: {
                    min: 0
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allownull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        }, options);
    },


    down: async (queryInterface: any, Sequelize: any) => {
        options.tableName = "Songs";
        return queryInterface.dropTable(options);
    }
}
