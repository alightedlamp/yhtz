module.exports = function(sequelize, DataTypes) {
  var Milestone = sequelize.define("Milestone", {
    title: {
    	type: DataTypes.STRING,
    	allowNull: false,
      validate: {
    	  len: [2, 140]
      }
	  },
    target_completion_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true  // only allow date strings
      }
    }
  });
  return Milestone;
};