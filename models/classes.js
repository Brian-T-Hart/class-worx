module.exports = function(sequelize, DataTypes) {
    var classes = sequelize.define("classes", {
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              len: [1,4]
            }
          },
        class_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      class_subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          len: [1,10]
        }
      },
    class_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
    classes.associate = function(models) {
          classes.belongsTo(models.teachers, {
            foreignKey: 'teacher_id'
          }),
          classes.belongsToMany(models.schedules, {
            foreignKey: 'schedule_period',
            onDelete: "CASCADE"
          });
        };
    return classes;
  };