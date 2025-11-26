const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('./database');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});