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
    },
  { timestamps: false });
    schedules.associate = function(models) {
          schedules.belongsTo(models.students, {
              onDelete: "CASCADE",
              foreignKey: 'student_id'
          })
          schedules.belongsTo(models.classes, {
            foreignKey: 'class_id',
            onDelete: "CASCADE"
          });
        };
    return schedules;
  };
