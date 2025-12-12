const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Training = sequelize.define('Training', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Open', 'Mandatory', 'Departmental'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        defaultValue: 'Pending' // Only relevant for Mandatory trainings requiring Super Admin approval
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    target_audience: {
        type: DataTypes.STRING, // 'All', 'Department:HR', 'User:1,2,3'
        allowNull: true
    }
});

module.exports = Training;
