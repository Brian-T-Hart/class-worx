module.exports = function(sequelize, DataTypes) {
    var schedules = sequelize.define("schedules", {
        schedule_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
        
    });
    schedules.associate = function(models) {
          schedules.hasMany(models.classes, {
            onDelete: "CASCADE"
          });
        };
    return classes;
  };
