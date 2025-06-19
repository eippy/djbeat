'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Songs';
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 3,
          title: "City Lights",
          description: "driving nights are the best",
          previewImage:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/previews/Screenshot+2025-06-17+195519.png",
          filepath:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/songs/dream-on-nori-main-version-27305-02-07.mp3",
          duration: 38,
        },
        {
          ownerId: 3,
          title: "Midnight Dreams",
          description: "A chill lofi beat for late night coding sessions",
          previewImage:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/previews/Screenshot+2025-06-17+195612.png",
          filepath:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/songs/dream-on-nori-main-version-27305-02-07.mp3",
          duration: 38,
        },
        {
          ownerId: 1,
          title: "Under the Sea",
          description: "An underwater themed electronic track",
          previewImage:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/previews/Screenshot+2025-06-17+195706.png",
          filepath:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/songs/spectral-swoop-main-version-01-21-14327.mp3",
          duration: 45,
        },
      ],
      {}
    );
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Songs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['City Lights', 'Midnight Dreams', 'Under the Sea'] }
    }, {});
  }
}; 