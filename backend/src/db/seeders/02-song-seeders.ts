'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Songs';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 3, // demo user
        title: "Summer Vibes",
        description: "A tropical house track perfect for beach days",
        previewImage: "https://djbeats-bucket.s3.amazonaws.com/previews/summer-vibes.jpg",
        filepath: "https://djbeats-bucket.s3.amazonaws.com/songs/summer-vibes.mp3",
        duration: 180 // 3 minutes
      },
      {
        ownerId: 3, // demo user
        title: "Midnight Dreams",
        description: "A chill lofi beat for late night coding sessions",
        previewImage: "https://djbeats-bucket.s3.amazonaws.com/previews/midnight-dreams.jpg",
        filepath: "https://djbeats-bucket.s3.amazonaws.com/songs/midnight-dreams.mp3",
        duration: 240 // 4 minutes
      },
      {
        ownerId: 1, // SpongeBob
        title: "Under the Sea",
        description: "An underwater themed electronic track",
        previewImage: "https://djbeats-bucket.s3.amazonaws.com/previews/under-the-sea.jpg",
        filepath: "https://djbeats-bucket.s3.amazonaws.com/songs/under-the-sea.mp3",
        duration: 210 // 3.5 minutes
      }
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Songs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['Summer Vibes', 'Midnight Dreams', 'Under the Sea'] }
    }, {});
  }
}; 