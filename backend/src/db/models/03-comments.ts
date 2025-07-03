import { Model, DataTypes, Optional } from 'sequelize';

interface CommentAttributes {
    id: number;
    userId: number;
    songId: number;
    comment: string;
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {
    class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
        static associate(models: any) {
            Comment.belongsTo(models.User, { foreignKey: 'userId' });
            Comment.belongsTo(models.Song, { foreignKey: 'songId' });
        }
    }

    Comment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            songId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            comment: {
                type: DataTypes.STRING(1000),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Comment',
           
        }
    );

    return Comment;
};
