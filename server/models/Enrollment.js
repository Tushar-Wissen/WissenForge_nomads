const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Training = require('./Training');

const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM('Enrolled', 'Completed', 'Cancelled'),
        defaultValue: 'Enrolled'
    },
    attendance_marked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

User.belongsToMany(Training, { through: Enrollment });
Training.belongsToMany(User, { through: Enrollment });
User.hasMany(Enrollment);
Enrollment.belongsTo(User);
Training.hasMany(Enrollment);
Enrollment.belongsTo(Training);

module.exports = Enrollment;
