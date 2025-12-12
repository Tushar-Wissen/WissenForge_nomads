const express = require('express');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Training = require('../models/Training');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get User Profile (with enrollments)
router.get('/:id/profile', authMiddleware(), async (req, res) => {
    try {
        // Allow users to view their own profile, or Managers/Admins to view others
        if (req.user.role === 'Employee' && parseInt(req.params.id) !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Enrollment,
                include: [Training]
            }]
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// List Users (Admin only - for assignment)
router.get('/', authMiddleware(['Admin', 'Super Admin']), async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role', 'department']
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
