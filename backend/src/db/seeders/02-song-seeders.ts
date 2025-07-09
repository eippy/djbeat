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
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/songs/city-star-ra-main-version-34935-01-57.mp3",
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
          duration: 30,
        },
        {
          ownerId: 4,
          title: "Boba Tea",
          description: "kawaii house bubbly edm",
          previewImage:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/previews/Screenshot+2025-07-08+175405.png",
          filepath:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/songs/bubble-tea-dark-cat-main-version-33774-04-03.mp3",
          duration: 50,
        },
        {
          ownerId: 5,
          title: "Dark Cat",
          description: "bubbly house music for people who enjoy happy vibes",
          previewImage:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/previews/Screenshot+2025-07-08+175347.png",
          filepath:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/songs/stars-align-dark-cat-main-version-32336-03-14.mp3",
          duration: 40,
        },
        {
          ownerId: 6,
          title: "Future Trance",
          description: "Uplifting trance with melodies and driving rhythms",
          previewImage:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/previews/Screenshot+2025-07-08+175323.png",
          filepath:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/songs/spaceship-nori-main-version-33814-02-29.mp3",
          duration: 37,
        },
        {
          ownerId: 7,
          title: "Tech House ",
          description: " tech house with deep basslines",
          previewImage:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/previews/Screenshot+2025-07-08+175255.png",
          filepath:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/songs/blowing-clouds-fonss-main-version-39694-02-18.mp3",
          duration: 36,
        },
        {
          ownerId: 8,
          title: "Drum & Bass",
          description: "Fast-paced drum and bass with rhythms and heavy bass",
          previewImage:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/previews/Screenshot+2025-07-08+175534.png",
          filepath:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/songs/you-make-me-smile-tatami-main-version-38664-02-19.mp3",
          duration: 40,
        },
        {
          ownerId: 1,
          title: "Electro Pop",
          description:
            "Catchy electro pop with vocal hooks and danceable beats",
          previewImage:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/previews/Screenshot+2025-07-08+175423.png",
          filepath:
            "https://djbeats-bucket.s3.us-east-1.amazonaws.com/songs/kawaii-girl-pecan-pie-main-version-26355-01-30.mp3",
          duration: 38,
        },
      ],
      {}
    );
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Songs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['City Lights', 'Midnight Dreams', 'Under the Sea', 'Boba Tea', 'Dark Cat', 'Future Trance', 'Tech House', 'Drum & Bass', 'Electro Pop'] }
    }, {});
  }
}; 