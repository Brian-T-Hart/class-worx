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
      class_period: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1,2]
        }
      },  
    class_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
{ timestamps: false });
    classes.associate = function(models) {
          classes.belongsTo(models.teachers, {
            onDelete: "CASCADE"
          }),
          classes.hasMany(models.schedules, {
            onDelete: "CASCADE"
          });
        };
    return classes;
  };