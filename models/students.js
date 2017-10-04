// module.exports = function(sequelize, DataTypes) {
var students = sequelize.define("students", {
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
    student_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1]
    }
  },
  student_phone: {
    type: DataTypes.STRING,
    allowNull: false,
    len: [1]
  },
  student_email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isEmail: true,
    }
  },
  student_image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isUrl: true,
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
students.associate = function(models) {
      students.belongsTo(models.classes, {
        onDelete: "CASCADE",
        foreignKey: {
            allowNull: false
        }
      });
    };
return students;
};