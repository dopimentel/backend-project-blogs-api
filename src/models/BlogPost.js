module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
  'BlogPost',
  {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        foreignKey: true,
      },
      published: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'published',
      },
      updated: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated',
      },
  },
  
  {
    timestamps: false,
    underscored: true,
  },
);

BlogPost.associate = (models) => {

  BlogPost.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
};

  return BlogPost;
};
