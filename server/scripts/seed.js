const sequelize = require('../config/database');
const User = require('../models/User');
const Training = require('../models/Training');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset DB

        const hashedPassword = await bcrypt.hash('password123', 10);

        // Create Users
        const users = await User.bulkCreate([
            {
                name: 'Super Admin',
                email: 'super@wissen.com',
                password: hashedPassword,
                role: 'Super Admin',
                department: 'Management'
            },
            {
                name: 'Admin User',
                email: 'admin@wissen.com',
                password: hashedPassword,
                role: 'Admin',
                department: 'HR'
            },
            {
                name: 'John Doe',
                email: 'john@wissen.com',
                password: hashedPassword,
                role: 'Employee',
                department: 'Engineering',
                tech_stack: 'React, Node.js'
            },
            {
                name: 'Jane Smith',
                email: 'jane@wissen.com',
                password: hashedPassword,
                role: 'Employee',
                department: 'Sales',
                tech_stack: 'Salesforce'
            }
        ]);

        // Create Trainings
        await Training.bulkCreate([
            {
                title: 'React Basics',
                description: 'Introduction to React',
                date: new Date(),
                type: 'Open',
                status: 'Approved',
                created_by: 2 // Admin
            },
            {
                title: 'Security Compliance',
                description: 'Annual Security Training',
                date: new Date(),
                type: 'Mandatory',
                status: 'Approved', // Pre-approved for seed
                created_by: 2
            },
            {
                title: 'Advanced Leadership',
                description: 'For managers',
                date: new Date(),
                type: 'Mandatory',
                status: 'Pending', // Needs approval
                created_by: 2
            }
        ]);

        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    }
};

if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase };
