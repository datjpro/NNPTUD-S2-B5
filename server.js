const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userRoleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

app.use('/users', userRoutes);
app.use('/roles', roleRoutes);

// Special routes for enable/disable
app.post('/enable', async (req, res) => {
  const { email, username } = req.body;
  try {
    const User = require('./models/User');
    const user = await User.findOne({ email, username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.status = true;
    await user.save();
    res.json({ message: 'User enabled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/disable', async (req, res) => {
  const { email, username } = req.body;
  try {
    const User = require('./models/User');
    const user = await User.findOne({ email, username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.status = false;
    await user.save();
    res.json({ message: 'User disabled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});