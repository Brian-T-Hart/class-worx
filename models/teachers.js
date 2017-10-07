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
          len: [4,12]
        }
      },
      teacher_password: {
        type: DataTypes.STRING,
<<<<<<< HEAD
        allowNull: false
=======
        allowNull: false,
>>>>>>> 218101f9b8255d19da7748d98dd5a954ee3c9bc4
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
