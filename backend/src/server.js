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
});

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDescription: String,
  registeredUsers: [{ type: String, ref: 'User' }],
});

const User = mongoose.model('User', userSchema, 'users');
const Event = mongoose.model('Event', eventSchema, 'events');

app.post('/api/login', async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = new User({ username, email });
    await user.save();

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { email, eventId } = req.body;

    // Update the event with the registered user
    const event = await Event.findOneAndUpdate(
      { _id: eventId },
      { $addToSet: { registeredUsers: email } },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
