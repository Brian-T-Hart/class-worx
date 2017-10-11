module.exports = function(sequelize, DataTypes) {
    var teachers = sequelize.define("teachers", {
        teacher_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
              len: [1,4]
            }
          },
        teacher_lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,50]
        }
      },
        teacher_firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,50]
        }
      },
        teacher_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
      },
      teacher_userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4,50]
        }
      },
      teacher_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  { timestamps: false });
    teachers.associate = function(models) {
          teachers.hasMany(models.classes, {
            onDelete: "CASCADE"
          });
        };
    return teachers;
  };
