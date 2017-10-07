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
          }
    },
  { timestamps: false });
    schedules.associate = function(models) {
          schedules.belongsTo(models.students, {
                onDelete: "CASCADE"
            // foreignKey: 'student_id'
          })
          // schedules.hasOne(models.classes, {
          //   foreignKey: 'class_id',
          //   onDelete: "CASCADE"
          // });
        };
    return schedules;
<<<<<<< HEAD
  };
=======
  };
>>>>>>> 218101f9b8255d19da7748d98dd5a954ee3c9bc4
