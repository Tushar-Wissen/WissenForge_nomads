const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const trainingRoutes = require('./routes/trainings');
const userRoutes = require('./routes/users');
const { seedDatabase } = require('./scripts/seed');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/users', userRoutes);

// Sync DB and Start Server
sequelize.sync({ force: false }).then(async () => {
    console.log('Database synced');
    // Check if we need to seed
    // await seedDatabase(); // Uncomment to seed on start if needed
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
