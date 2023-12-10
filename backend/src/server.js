const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb+srv://shubhbansal44:mRdPJkyew7QiQwh2@jwc-events.t1x2tjr.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(bodyParser.json());
app.use(cors()); 
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  location: { type: String, default: 'none' }, // Added location field with default value 'none'
});

const eventSchema = new mongoose.Schema({
  eventId: { type: String, unique: true },
  eventName: String,
  eventDescription: String,
  totalSeats: { type: Number, default: 0 },
  registeredUsers: [{ type: String, ref: 'User' }],
});

const brStatusSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  brStatus: { type: Number, default: 0 },
});
const BRStatus = mongoose.model('BRStatus', { email: String, brStatus: { type: Number, default: 0 } });

const User = mongoose.model('User', userSchema, 'users');
const Event = mongoose.model('Event', eventSchema, 'events');

app.post('/api/login', async (req, res) => {
  try {
    const { username, email, location } = req.body;

    const user = new User({ username, email, location });
    await user.save();

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/add-br-status', async (req, res) => {
  try {
    const { email, brStatus } = req.body;

    const newBRStatus = new BRStatus({ email, brStatus: brStatus || 0 });
    await newBRStatus.save();

    res.status(200).json({ success: true, message: 'BR Status added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/update-location', async (req, res) => {
  try {
    const { email, location } = req.body;

    // Update the user's location
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { location } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ success: true, message: 'Location updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/user-location', async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, location: user.location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// GET request to fetch user name
app.get('/api/user-name', async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// GET request to fetch user BR status
app.get('/api/user-br-status', async (req, res) => {
  try {
    const { email } = req.query;

    const brStatus = await BRStatus.findOne({ email });
    if (!brStatus) {
      res.status(404).json({ success: false, message: 'BR Status not found' });
      return;
    }

    res.status(200).json({ success: true, brStatus: brStatus.brStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
app.post('/api/create-event', async (req, res) => {
  try {
    const { eventId, eventName } = req.body;

    // Check if event with the given eventId already exists
    const existingEvent = await Event.findOne({ eventId });
    if (existingEvent) {
      res.status(400).json({ success: false, message: 'Event with the provided ID already exists' });
      return;
    }

    // Create a new event
    const newEvent = new Event({ eventId, eventName });
    await newEvent.save();

    res.status(200).json({ success: true, message: 'Event created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
app.post('/api/update-event-registration', async (req, res) => {
  try {
    const { eventId, email } = req.body;

    // Update the event with the registered user
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId },
      { $addToSet: { registeredUsers: email } },
      { new: true }
    );

    if (updatedEvent) {
      res.status(200).json({ success: true, message: 'Event registration updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
