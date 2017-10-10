module.exports = function(sequelize, DataTypes) {
    var schedules = sequelize.define("schedules", {
        schedule_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
<<<<<<< HEAD
          schedule_period: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              len: [1,2]
            }
          },
=======
>>>>>>> master
    },
  { timestamps: false });
    schedules.associate = function(models) {
          schedules.belongsTo(models.students, {
<<<<<<< HEAD
              onDelete: "CASCADE",
=======
                onDelete: "CASCADE"
>>>>>>> master
          })
          schedules.belongsTo(models.classes, {
            onDelete: "CASCADE"
          });
        };
    return schedules;
  };
