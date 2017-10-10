'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teachers', [{
      teacher_lastName: 'Hart',
      teacher_firstName: 'Brian',
      student_email: 'fake@gmail.com',
      teacher_userName: 'username1',
      teacher_password: 'password1',
    }],
  {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('students', null, {});
  }
};
