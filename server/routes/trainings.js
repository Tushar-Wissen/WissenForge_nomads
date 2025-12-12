const express = require('express');
const Training = require('../models/Training');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const { Op } = require('sequelize');

const router = express.Router();

// Get all trainings (filtered by role/visibility)
router.get('/', authMiddleware(), async (req, res) => {
    try {
        const { role, id } = req.user;
        let where = {};

        if (role === 'Employee') {
            // Employees see Open trainings, or assigned ones
            // For simplicity in MVP, showing all Open and Mandatory (Approved)
            where = {
                [Op.or]: [
                    { type: 'Open' },
                    { type: 'Mandatory', status: 'Approved' },
                    { type: 'Departmental' } // Simplified: show all departmental for now, or filter by user dept
                ]
            };
        } else if (role === 'Admin') {
            // Admins see everything they created or all? Let's show all for MVP simplicity
        }

        // Super Admin sees everything including Pending Mandatory

        const trainings = await Training.findAll({ where });
        res.json(trainings);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Create Training (Admin only)
router.post('/', authMiddleware(['Admin', 'Super Admin']), async (req, res) => {
    try {
        const { title, description, date, type, target_audience } = req.body;
        const status = type === 'Mandatory' ? 'Pending' : 'Approved'; // Mandatory needs approval

        const training = await Training.create({
            title, description, date, type, status, target_audience,
            created_by: req.user.id
        });

        res.status(201).json(training);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Approve Training (Super Admin only)
router.patch('/:id/approve', authMiddleware(['Super Admin']), async (req, res) => {
    try {
        const training = await Training.findByPk(req.params.id);
        if (!training) return res.status(404).json({ message: 'Training not found' });

        training.status = 'Approved';
        await training.save();

        res.json(training);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Enroll (Employee)
router.post('/:id/enroll', authMiddleware(['Employee']), async (req, res) => {
    try {
        const training = await Training.findByPk(req.params.id);
        if (!training) return res.status(404).json({ message: 'Training not found' });

        // Check if already enrolled
        const existing = await Enrollment.findOne({
            where: {
                UserId: req.user.id,
                TrainingId: training.id
            }
        });

        if (existing) return res.status(400).json({ message: 'Already enrolled' });

        await Enrollment.create({
            UserId: req.user.id,
            TrainingId: training.id,
            status: 'Enrolled'
        });

        res.json({ message: 'Enrolled successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
