'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        songId: 1,
        comment: "This beat is so groovy!"
      },
      {
        userId: 2,
        songId: 1,
        comment: "I love the vibes in this one!"
      },
      {
        userId: 3,
        songId: 2,
        comment: "This is exactly what I needed for my late night coding sessions."
      },
      {
        userId: 1,
        songId: 3,
        comment: "This reminds me of home! Great work!"
      }
    ], {});
  },

  down: async (queryInterface: any, Sequelize: any) => {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      songId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
}; 