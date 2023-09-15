const { DataTypes } = require("sequelize");

module.exports = (sequelize, _DataTypes) => {
  
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        field: 'post_id',
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        field: 'category_id',
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };
  
  return PostCategory;
};
