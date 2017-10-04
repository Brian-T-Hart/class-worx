// module.exports = function(sequelize, DataTypes) {
    var classes = sequelize.define("classes", {
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              len: [1]
            }
          },
        class_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      class_subject: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      class_period: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      class_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          len: [1]
        }
      },
    });
    classes.associate = function(models) {
          classes.hasMany(models.students, {
            onDelete: "CASCADE"
          });
        };
    return classes;
  };
