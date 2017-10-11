module.exports = function(sequelize, DataTypes) {
var students = sequelize.define("students", {
    student_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    student_lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1,50]
    }
  },
  student_firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1,50]
    }
  },
  student_phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [7,14]
    }
  },
  student_email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
        isEmail: true,
    }
  },
  student_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  student_gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  student_gradeLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  student_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      len: [1,10]
    }
  },
  student_hallPass: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  },
  student_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
},
{ timestamps: false });
students.associate = function(models) {
      students.hasMany(models.schedules, {
        onDelete: "CASCADE",
      });
    };
return students;
};