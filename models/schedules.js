module.exports = function(sequelize, DataTypes) {
    var schedules = sequelize.define("schedules", {
        schedule_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          schedule_period: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              len: [1,2]
            }
          },
          schedule_startTime: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          schedule_endTime: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    });
    schedules.associate = function(models) {
          schedules.belongsTo(models.students, {
            foreignKey: 'student_id'
          })
          schedules.hasOne(models.classes, {
            foreignKey: 'class_id',
            onDelete: "CASCADE"
          });
        };
    return schedules;
  };