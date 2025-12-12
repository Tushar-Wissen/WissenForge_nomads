const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('Employee', 'Admin', 'Super Admin'),
        defaultValue: 'Employee'
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tech_stack: {
        type: DataTypes.STRING, // JSON string or comma separated
        allowNull: true
    }
});

module.exports = User;
