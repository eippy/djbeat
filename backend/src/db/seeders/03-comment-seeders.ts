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
      },
      {
        userId: 4,
        songId: 1,
        comment: "Perfect driving music! 🚗"
      },
      {
        userId: 5,
        songId: 2,
        comment: "This is my new study playlist favorite!"
      },
      {
        userId: 6,
        songId: 3,
        comment: "Love the underwater vibes! "
      },
      {
        userId: 7,
        songId: 4,
        comment: "Boba tea vibes are immaculate!"
      },
      {
        userId: 8,
        songId: 4,
        comment: "Kawaii house is the best!"
      },
      {
        userId: 1,
        songId: 5,
        comment: "Dark Cat never disappoints!"
      },
      {
        userId: 2,
        songId: 5,
        comment: "So bubbly and happy! Love it!"
      },
      {
        userId: 3,
        songId: 6,
        comment: "Future trance vibes are unreal!"
      },
      {
        userId: 4,
        songId: 6,
        comment: "This takes me to another dimension!"
      },
      {
        userId: 5,
        songId: 7,
        comment: "Tech house groove is fire!"
      },
      {
        userId: 6,
        songId: 7,
        comment: "Perfect for the club!"
      },
      {
        userId: 7,
        songId: 8,
        comment: "Drum & bass energy is insane!"
      },
      {
        userId: 8,
        songId: 8,
        comment: "This makes me want to dance!"
      },
      {
        userId: 1,
        songId: 9,
        comment: "Electro pop perfection!"
      },
      {
        userId: 2,
        songId: 9,
        comment: "Kawaii girl vibes are everything!"
      },
      {
        userId: 3,
        songId: 4,
        comment: "Bubble tea and music - perfect combo!"
      },
      {
        userId: 5,
        songId: 6,
        comment: "Spaceship vibes are out of this world!"
      },
      {
        userId: 6,
        songId: 8,
        comment: "You make me smile indeed!"
      },
      {
        userId: 7,
        songId: 1,
        comment: "City lights are calling!"
      },
      {
        userId: 8,
        songId: 2,
        comment: "Midnight dreams are the best!"
      },
      {
        userId: 1,
        songId: 7,
        comment: "Tech house is my jam!"
      },
      {
        userId: 2,
        songId: 3,
        comment: "Under the sea vibes!"
      }
    ], {});
  },

  down: async (queryInterface: any, Sequelize: any) => {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      songId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {});
  }
}; 