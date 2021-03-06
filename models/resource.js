module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define('Resource', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 140]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true // checks for url format
      }
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    priority: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    }
  });

  Resource.associate = function(models) {
    Resource.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });
  };

  return Resource;
};
