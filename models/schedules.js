module.exports = function(sequelize, DataTypes) {
    var schedules = sequelize.define("schedules", {
        schedule_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
    },
  { timestamps: false });
    schedules.associate = function(models) {
          schedules.belongsTo(models.students, {
                onDelete: "CASCADE"
          })
          schedules.belongsTo(models.classes, {
            onDelete: "CASCADE"
          });
        };
    return schedules;
  };
