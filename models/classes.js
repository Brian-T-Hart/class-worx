module.exports = function(sequelize, DataTypes) {
    var classes = sequelize.define("classes", {
        class_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
            validate: {
              len: [1,10]
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
<<<<<<< HEAD
  });
    // classes.associate = function(models) {
    //       classes.belongsTo(models.teachers, {
    //         foreignKey: 'teacher_id'
    //       }),
    //       classes.belongsToMany(models.schedules, {
    //         foreignKey: 'schedule_period',
    //         onDelete: "CASCADE"
    //       });
    //     };
=======
  },
{ timestamps: false });
    classes.associate = function(models) {
          classes.belongsTo(models.teachers, {
            onDelete: "CASCADE"
            // foreignKey: 'teacher_id'
          }),
          classes.hasMany(models.schedules, {
            // foreignKey: 'schedule_period',
            onDelete: "CASCADE"
          });
        };
>>>>>>> 218101f9b8255d19da7748d98dd5a954ee3c9bc4
    return classes;
  };