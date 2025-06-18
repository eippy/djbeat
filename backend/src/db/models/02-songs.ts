
import {
  Association,
  CreationOptional,
  DataTypes,
  Model,
  Optional,
  Sequelize,
} from "sequelize";

type SongAttributes = {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  previewImage: string;
  filepath: string;
  duration?: number;
};

type SongCreationAttributes = Optional<SongAttributes, "id">;

module.exports = (sequelize: any, DataTypes: any) => {
  class Song extends Model<SongAttributes, SongCreationAttributes> {
    declare id: CreationOptional<number>;
    declare ownerId: number;
    declare title: string;
    declare description: string;
    declare previewImage: string;
    declare filepath: string;
    declare duration: CreationOptional<number>;

    static associate(models: any) {
      Song.belongsTo(models.User, { foreignKey: "ownerId" });
      Song.hasMany(models.Comment, { foreignKey: "songId" });
    }
  }

  Song.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    previewImage: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
{ 
    sequelize,
    modelName: 'Song',
    defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
      }
  }
  }
  );
    return Song;
};
